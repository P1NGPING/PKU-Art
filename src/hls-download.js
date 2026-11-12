import { createMp4Writer } from './mp4-writer.js';

const HLS_TEMP_FILE_PREFIX = 'pku-art-hls-';

function parseHlsAttributes(line) {
    const attributes = {};
    const content = line.slice(line.indexOf(':') + 1);
    const pattern = /([A-Z0-9-]+)=("[^"]*"|[^,]*)/g;
    let match;
    while ((match = pattern.exec(content))) {
        const value = match[2];
        attributes[match[1]] = value.startsWith('"') ? value.slice(1, -1) : value;
    }
    return attributes;
}

function parseHlsIv(value) {
    const normalized = value.replace(/^0x/i, '').padStart(32, '0');
    if (!/^[0-9a-f]{32}$/i.test(normalized)) {
        throw new Error(`不支持的 HLS IV：${value}`);
    }
    return new Uint8Array(normalized.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)));
}

function createHlsSequenceIv(sequence) {
    const iv = new Uint8Array(16);
    let value = BigInt(sequence);
    for (let index = iv.length - 1; index >= 0; index -= 1) {
        iv[index] = Number(value & 0xffn);
        value >>= 8n;
    }
    return iv;
}

function waitWithAbort(delay, signal) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(signal.reason || new DOMException('下载已取消', 'AbortError'));
            return;
        }

        const onAbort = () => {
            clearTimeout(timer);
            reject(signal.reason || new DOMException('下载已取消', 'AbortError'));
        };
        const timer = setTimeout(() => {
            signal?.removeEventListener('abort', onAbort);
            resolve();
        }, delay);
        signal?.addEventListener('abort', onAbort, { once: true });
    });
}

async function fetchHlsResource(url, signal, responseType = 'arrayBuffer', options = {}) {
    const {
        maxAttempts = 8,
        omitCredentialsAfterFailure = false,
        maxRetryDelay = 30_000,
        requestTimeout = 45_000,
        onRetry = null,
    } = options;
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        if (signal?.aborted) {
            throw signal.reason || new DOMException('下载已取消', 'AbortError');
        }
        const attemptController = new AbortController();
        const forwardAbort = () => attemptController.abort(signal.reason);
        signal?.addEventListener('abort', forwardAbort, { once: true });
        const timeout = setTimeout(
            () => attemptController.abort(new DOMException('HLS 请求超时', 'TimeoutError')),
            requestTimeout,
        );
        try {
            // 播放列表和分片本身不需要登录态。首次请求仍复用快速的粘滞节点；
            // 一旦失败，后续请求不携带 HttpOnly INGRESSCOOKIE，避免一直命中故障节点。
            const credentials = omitCredentialsAfterFailure && attempt > 1 ? 'omit' : 'include';
            const response = await fetch(url, {
                credentials,
                signal: attemptController.signal,
            });
            if (!response.ok) {
                const error = new Error(`HTTP ${response.status} ${response.statusText}`);
                error.httpStatus = response.status;
                throw error;
            }
            return responseType === 'text' ? await response.text() : await response.arrayBuffer();
        } catch (error) {
            if (error.name === 'AbortError' || signal?.aborted) {
                throw error;
            }
            lastError = error;
            // 持续出现这些状态时，等待不会使资源恢复，避免无限循环。
            if ([400, 401, 403, 404].includes(error.httpStatus) && attempt >= 3) {
                break;
            }
            if (attempt < maxAttempts) {
                // 限流时给网关充足的恢复窗口，抖动可避免多个分片同时重试。
                const retryDelay =
                    Math.min(1000 * 2 ** Math.min(attempt - 1, 6), maxRetryDelay) +
                    Math.floor(Math.random() * 1000);
                onRetry?.({ attempt, retryDelay, error });
                await waitWithAbort(retryDelay, signal);
            }
        } finally {
            clearTimeout(timeout);
            signal?.removeEventListener('abort', forwardAbort);
        }
    }
    throw new Error(`获取 HLS 资源失败：${url}\n${lastError?.message || lastError}`);
}

async function resolveHlsMediaPlaylist(playlistUrl, signal, depth = 0) {
    if (depth > 3) {
        throw new Error('HLS 播放列表嵌套过深');
    }

    const text = await fetchHlsResource(playlistUrl, signal, 'text', {
        omitCredentialsAfterFailure: true,
    });
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    const variants = [];
    for (let index = 0; index < lines.length; index += 1) {
        if (!lines[index].startsWith('#EXT-X-STREAM-INF:')) continue;
        const attributes = parseHlsAttributes(lines[index]);
        const variantPath = lines.slice(index + 1).find((line) => !line.startsWith('#'));
        if (variantPath) {
            variants.push({
                bandwidth: Number(attributes.BANDWIDTH || 0),
                url: new URL(variantPath, playlistUrl).href,
            });
        }
    }

    if (variants.length > 0) {
        variants.sort((left, right) => right.bandwidth - left.bandwidth);
        return resolveHlsMediaPlaylist(variants[0].url, signal, depth + 1);
    }

    let mediaSequence = 0;
    let currentKey = null;
    let pendingDuration = 0;
    let discontinuity = false;
    let startTime = 0;
    const segments = [];

    for (const line of lines) {
        if (line.startsWith('#EXT-X-MEDIA-SEQUENCE:')) {
            mediaSequence = Number.parseInt(line.split(':')[1], 10) || 0;
        } else if (line.startsWith('#EXT-X-KEY:')) {
            const attributes = parseHlsAttributes(line);
            if (attributes.METHOD === 'NONE') {
                currentKey = null;
            } else if (attributes.METHOD === 'AES-128' && attributes.URI) {
                currentKey = {
                    method: attributes.METHOD,
                    url: new URL(attributes.URI, playlistUrl).href,
                    iv: attributes.IV ? parseHlsIv(attributes.IV) : null,
                };
            } else {
                throw new Error(`不支持的 HLS 加密方式：${attributes.METHOD || '未知'}`);
            }
        } else if (line.startsWith('#EXTINF:')) {
            pendingDuration = Number.parseFloat(line.slice('#EXTINF:'.length)) || 0;
        } else if (line === '#EXT-X-DISCONTINUITY') {
            discontinuity = true;
        } else if (line.startsWith('#EXT-X-BYTERANGE:') || line.startsWith('#EXT-X-MAP:')) {
            throw new Error('暂不支持 Byte Range 或 fMP4 格式的 HLS 录播');
        } else if (!line.startsWith('#')) {
            segments.push({
                url: new URL(line, playlistUrl).href,
                sequence: mediaSequence + segments.length,
                duration: pendingDuration,
                startTime,
                discontinuity,
                key: currentKey ? { ...currentKey } : null,
            });
            startTime += pendingDuration;
            pendingDuration = 0;
            discontinuity = false;
        }
    }

    if (segments.length === 0) {
        throw new Error('HLS 播放列表中没有视频分片');
    }

    return { playlistUrl, segments };
}

async function cleanStaleHlsFiles(root) {
    try {
        const staleBefore = Date.now() - 24 * 60 * 60 * 1000;
        for await (const [name, handle] of root.entries()) {
            if (!name.startsWith(HLS_TEMP_FILE_PREFIX) || handle.kind !== 'file') continue;
            const file = await handle.getFile();
            if (file.lastModified < staleBefore) {
                await root.removeEntry(name);
            }
        }
    } catch (error) {
        console.warn('[PKU Art] 清理 HLS 临时文件失败', error);
    }
}

async function createHlsOutput(fileName) {
    if (window.top === window.self && typeof window.showSaveFilePicker === 'function') {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types: [
                {
                    description: 'MP4 视频',
                    accept: { 'video/mp4': ['.mp4'] },
                },
            ],
        });
        const writable = await fileHandle.createWritable();
        return {
            type: 'file-picker',
            write: (chunk) => writable.write(chunk),
            close: () => writable.close(),
            abort: () => writable.abort(),
        };
    }

    if (!navigator.storage?.getDirectory) {
        throw new Error('当前浏览器不支持大文件流式写入，请使用最新版 Chrome/Edge/Safari');
    }

    const root = await navigator.storage.getDirectory();
    void cleanStaleHlsFiles(root);
    const tempName = `${HLS_TEMP_FILE_PREFIX}${Date.now()}-${crypto.randomUUID?.() || Math.random()}.mp4`;
    const fileHandle = await root.getFileHandle(tempName, { create: true });
    const writable = await fileHandle.createWritable();
    let isClosed = false;

    return {
        type: 'browser-download',
        async write(chunk) {
            await writable.write(chunk);
        },
        async close() {
            await writable.close();
            isClosed = true;
            const file = await fileHandle.getFile();
            const objectUrl = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            link.remove();

            // 等浏览器下载管理器打开文件后再清理 OPFS 中的临时副本。
            setTimeout(async () => {
                URL.revokeObjectURL(objectUrl);
                try {
                    await root.removeEntry(tempName);
                } catch (error) {
                    console.warn('[PKU Art] 清理 HLS 临时文件失败', error);
                }
            }, 5 * 60 * 1000);
        },
        async abort() {
            if (!isClosed) {
                await writable.abort().catch(() => {});
            }
            await root.removeEntry(tempName).catch(() => {});
        },
    };
}

export async function downloadHlsVideo({ playlistUrl, fileName, signal, onProgress }) {
    const output = await createHlsOutput(fileName);
    const mp4 = createMp4Writer(output);
    let outputClosed = false;
    const requestController = new AbortController();
    const forwardAbort = () => requestController.abort(signal.reason);
    if (signal.aborted) {
        forwardAbort();
    } else {
        signal.addEventListener('abort', forwardAbort, { once: true });
    }
    const requestSignal = requestController.signal;

    try {
        onProgress({ stage: '正在读取视频信息…' });
        const { segments } = await resolveHlsMediaPlaylist(playlistUrl, requestSignal);
        const keyPromises = new Map();
        let downloadedBytes = 0;
        let completedSegments = 0;
        const startedAt = Date.now();
        const concurrency = 8;
        const prefetchWindow = concurrency * 3;

        const reportProgress = (stage, status = 'active') => {
            const elapsedSeconds = Math.max((Date.now() - startedAt) / 1000, 0.1);
            const speed = downloadedBytes / elapsedSeconds;
            const remainingSeconds =
                speed && completedSegments > 0
                    ? Math.round(((segments.length - completedSegments) / completedSegments) * elapsedSeconds)
                    : null;
            onProgress({
                stage,
                completedSegments,
                totalSegments: segments.length,
                downloadedBytes,
                bytesPerSecond: speed,
                remainingSeconds,
                status,
            });
        };

        const getCryptoKey = (keyUrl) => {
            if (!keyPromises.has(keyUrl)) {
                keyPromises.set(
                    keyUrl,
                    fetchHlsResource(keyUrl, requestSignal).then((rawKey) => {
                        if (rawKey.byteLength !== 16) {
                            throw new Error(`HLS 密钥长度异常：${rawKey.byteLength} 字节`);
                        }
                        return crypto.subtle.importKey('raw', rawKey, { name: 'AES-CBC' }, false, ['decrypt']);
                    }),
                );
            }
            return keyPromises.get(keyUrl);
        };

        const downloadSegment = async (segment, index) => {
            const encrypted = await fetchHlsResource(segment.url, requestSignal, 'arrayBuffer', {
                maxAttempts: Number.POSITIVE_INFINITY,
                omitCredentialsAfterFailure: true,
                requestTimeout: 30_000,
                onRetry({ attempt, retryDelay }) {
                    reportProgress(
                        `分片 ${index + 1} 响应较慢，${Math.ceil(retryDelay / 1000)} 秒后切换节点（第 ${attempt} 次重试）…`,
                        'warning',
                    );
                },
            });
            if (!segment.key) {
                return encrypted;
            }
            const key = await getCryptoKey(segment.key.url);
            const iv = segment.key.iv || createHlsSequenceIv(segment.sequence);
            return crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, encrypted);
        };

        // 8 路并发 + 24 个分片的有界预取窗口：慢分片不会立即让其他连接空闲，
        // 同时不会像一次性拉取全部分片那样无界占用内存。
        const waitingTasks = [];
        let activeTasks = 0;
        const pumpTasks = () => {
            while (activeTasks < concurrency && waitingTasks.length > 0) {
                const task = waitingTasks.shift();
                activeTasks += 1;
                Promise.resolve()
                    .then(task.run)
                    .then(
                        (chunk) => task.resolve({ chunk }),
                        (error) => task.resolve({ error }),
                    )
                    .finally(() => {
                        activeTasks -= 1;
                        pumpTasks();
                    });
            }
        };
        const scheduleSegment = (segment, index) =>
            new Promise((resolve) => {
                waitingTasks.push({ run: () => downloadSegment(segment, index), resolve });
                pumpTasks();
            });

        const segmentDownloads = new Array(segments.length);
        const initialWindowSize = Math.min(prefetchWindow, segments.length);
        for (let index = 0; index < initialWindowSize; index += 1) {
            segmentDownloads[index] = scheduleSegment(segments[index], index);
        }

        for (let index = 0; index < segments.length; index += 1) {
            if (signal.aborted) {
                throw new DOMException('下载已取消', 'AbortError');
            }

            const result = await segmentDownloads[index];
            if (result.error) {
                throw result.error;
            }
            const { chunk } = result;
            const nextIndex = index + prefetchWindow;
            if (nextIndex < segments.length) {
                segmentDownloads[nextIndex] = scheduleSegment(segments[nextIndex], nextIndex);
            }
            segmentDownloads[index] = null;

            if (signal.aborted) {
                throw new DOMException('下载已取消', 'AbortError');
            }
            await mp4.write(chunk, segments[index]);
            downloadedBytes += chunk.byteLength;
            completedSegments += 1;

            reportProgress('正在下载并封装 MP4…');
        }

        if (signal.aborted) {
            throw new DOMException('下载已取消', 'AbortError');
        }
        onProgress({ stage: '正在保存 MP4 文件…' });
        await mp4.close();
        outputClosed = true;
        return { outputType: output.type, downloadedBytes, segmentCount: segments.length };
    } catch (error) {
        requestController.abort(error);
        if (!outputClosed) {
            await output.abort().catch(() => {});
        }
        throw error;
    } finally {
        mp4.dispose();
        signal.removeEventListener('abort', forwardAbort);
    }
}
