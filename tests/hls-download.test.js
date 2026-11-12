import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createCipheriv, randomBytes } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createMp4Writer } from '../src/mp4-writer.js';
import { downloadHlsVideo } from '../src/hls-download.js';

const hasFfmpeg = ['ffmpeg', 'ffprobe'].every((command) => spawnSync(command, ['-version']).status === 0);
const directory = mkdtempSync(path.join(tmpdir(), 'pku-art-mp4-test-'));
after(() => {
    assert.equal(path.dirname(directory), tmpdir());
    assert.ok(path.basename(directory).startsWith('pku-art-mp4-test-'));
    rmSync(directory, { recursive: true, force: true });
});

let fixture;
function getFixture() {
    if (fixture) return fixture;
    execFileSync('ffmpeg', [
        '-v', 'error', '-f', 'lavfi', '-i', 'testsrc=size=160x90:rate=25',
        '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000',
        '-t', '3', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-g', '25', '-bf', '2',
        '-c:a', 'aac', '-hls_time', '1', '-hls_segment_filename', path.join(directory, 'segment%d.ts'),
        path.join(directory, 'playlist.m3u8'),
    ]);
    fixture = {
        playlist: readFileSync(path.join(directory, 'playlist.m3u8'), 'utf8'),
        segments: [0, 1, 2].map((index) => readFileSync(path.join(directory, `segment${index}.ts`))),
    };
    return fixture;
}

function verifyMp4(buffer, name) {
    const file = path.join(directory, name);
    writeFileSync(file, buffer);
    assert.equal(buffer.toString('ascii', 4, 8), 'ftyp');
    const boxes = [];
    for (let offset = 0; offset < buffer.length;) {
        const length = buffer.readUInt32BE(offset);
        assert.ok(length >= 8, 'valid MP4 box size');
        boxes.push(buffer.toString('ascii', offset + 4, offset + 8));
        offset += length;
        assert.ok(offset <= buffer.length);
    }
    assert.equal(boxes.filter((box) => box === 'moov').length, 1);
    assert.equal(boxes.filter((box) => box === 'moof').length, 6, 'one audio and one video fragment per segment');
    const info = JSON.parse(execFileSync('ffprobe', [
        '-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', file,
    ], { encoding: 'utf8' }));
    const video = info.streams.find((stream) => stream.codec_type === 'video');
    const audio = info.streams.find((stream) => stream.codec_type === 'audio');
    assert.equal(video.codec_name, 'h264');
    assert.equal(audio.codec_name, 'aac');
    assert.equal(Number(video.nb_read_frames), 75, 'all input video frames survive');
    assert.ok(Math.abs(Number(info.format.duration) - 3) < 0.15, 'duration remains correct');
    const decodeLog = execFileSync('ffmpeg', [
        '-v', 'error', '-xerror', '-i', file, '-f', 'null', '-',
    ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    assert.equal(decodeLog, '');
    // Seek near the end and actually decode a frame, rather than only probing metadata.
    const frame = execFileSync('ffmpeg', [
        '-v', 'error', '-ss', '2.5', '-i', file, '-frames:v', '1', '-an', '-f', 'rawvideo', '-',
    ]);
    assert.equal(frame.length, 160 * 90 * 3 / 2);
}

function memoryOutput() {
    const chunks = [];
    return {
        chunks, closed: false, aborted: false,
        async write(data) { chunks.push(Buffer.from(data)); },
        async close() { this.closed = true; },
        async abort() { this.aborted = true; },
    };
}

function installPicker(t, output) {
    const pickerCalls = [];
    const window = {
        async showSaveFilePicker(options) {
            pickerCalls.push(options);
            return { async createWritable() { return output; } };
        },
    };
    window.top = window.self = window;
    const previous = Object.getOwnPropertyDescriptor(globalThis, 'window');
    Object.defineProperty(globalThis, 'window', { configurable: true, value: window });
    t.after(() => {
        if (previous) Object.defineProperty(globalThis, 'window', previous);
        else delete globalThis.window;
    });
    return pickerCalls;
}

function mockPlaylist(t, { encrypted = false, explicitIv = false, discontinuity = false, onSegment } = {}) {
    const { playlist, segments } = getFixture();
    const sequence = 9;
    const key = randomBytes(16);
    const explicit = Buffer.alloc(16, 0x42);
    const resources = new Map();
    let text = playlist.replace('#EXT-X-MEDIA-SEQUENCE:0', `#EXT-X-MEDIA-SEQUENCE:${sequence}`);
    if (encrypted) {
        text = text.replace('#EXTINF:', `#EXT-X-KEY:METHOD=AES-128,URI="key.bin"${explicitIv ? `,IV=0x${explicit.toString('hex')}` : ''}\n#EXTINF:`);
        resources.set('key.bin', key);
    }
    if (discontinuity) text = text.replace(/(#EXTINF:[^\n]+\nsegment1.ts)/, '#EXT-X-DISCONTINUITY\n$1');
    const requestOrder = [];
    segments.forEach((segment, index) => {
        if (encrypted) {
            const iv = explicitIv ? explicit : Buffer.alloc(16);
            if (!explicitIv) iv.writeBigUInt64BE(BigInt(sequence + index), 8);
            const cipher = createCipheriv('aes-128-cbc', key, iv);
            segment = Buffer.concat([cipher.update(segment), cipher.final()]);
        }
        resources.set(`segment${index}.ts`, segment);
    });
    resources.set('playlist.m3u8', text);
    // Exercise variant selection and relative playlist/segment/key URLs too.
    resources.set('master.m3u8', '#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=1000\nplaylist.m3u8');
    t.mock.method(globalThis, 'fetch', async (url, { signal }) => {
        signal.throwIfAborted();
        const name = new URL(url).pathname.split('/').pop();
        if (name.startsWith('segment')) {
            const index = Number(name.match(/\d+/)[0]);
            await new Promise((resolve) => setTimeout(resolve, (3 - index) * 5));
            onSegment?.(index);
            signal.throwIfAborted();
            requestOrder.push(index);
        }
        assert.ok(resources.has(name), `unexpected request: ${url}`);
        return new Response(resources.get(name));
    });
    return requestOrder;
}

test('rejects invalid input instead of saving a renamed TS or empty MP4', async () => {
    const output = memoryOutput();
    const mp4 = createMp4Writer(output);
    await assert.rejects(mp4.write(new Uint8Array(188)), /无法.*MP4/);
    await assert.rejects(mp4.close(), /没有可保存/);
    assert.equal(output.closed, false);
    mp4.dispose();
});

test('streams TS into a seekable MP4 with complete H.264 and AAC tracks', { skip: !hasFfmpeg }, async () => {
    const output = memoryOutput();
    const mp4 = createMp4Writer(output);
    for (const segment of getFixture().segments) await mp4.write(segment);
    await mp4.close();
    mp4.dispose();
    assert.equal(output.closed, true);
    verifyMp4(Buffer.concat(output.chunks), 'stream.mp4');
});

for (const explicitIv of [false, true]) {
    test(`downloads encrypted HLS with ${explicitIv ? 'explicit' : 'sequence'} IV, preserving segment order`, { skip: !hasFfmpeg }, async (t) => {
        const output = memoryOutput();
        const calls = installPicker(t, output);
        const completionOrder = mockPlaylist(t, { encrypted: true, explicitIv });
        const progress = [];
        const result = await downloadHlsVideo({
            playlistUrl: 'https://example.test/course/master.m3u8', fileName: '课程.mp4',
            signal: new AbortController().signal, onProgress: (value) => progress.push(value),
        });
        assert.equal(result.segmentCount, 3);
        assert.equal(result.outputType, 'file-picker');
        assert.deepEqual(completionOrder, [2, 1, 0], 'network completes out of order');
        assert.equal(calls[0].suggestedName, '课程.mp4');
        assert.deepEqual(calls[0].types[0].accept, { 'video/mp4': ['.mp4'] });
        assert.equal(progress.at(-1).stage, '正在保存 MP4 文件…');
        assert.equal(output.aborted, false);
        verifyMp4(Buffer.concat(output.chunks), `encrypted-${explicitIv}.mp4`);
    });
}

test('cancellation during a segment request aborts output and never saves success', { skip: !hasFfmpeg }, async (t) => {
    const output = memoryOutput();
    installPicker(t, output);
    const controller = new AbortController();
    mockPlaylist(t, { onSegment() { controller.abort(); } });
    await assert.rejects(downloadHlsVideo({
        playlistUrl: 'https://example.test/playlist.m3u8', fileName: 'cancel.mp4',
        signal: controller.signal, onProgress() {},
    }), { name: 'AbortError' });
    assert.equal(output.aborted, true);
    assert.equal(output.closed, false);
});

test('write failures abort the output instead of keeping an incomplete MP4', { skip: !hasFfmpeg }, async (t) => {
    const output = memoryOutput();
    output.write = async () => { throw new Error('disk full'); };
    installPicker(t, output);
    mockPlaylist(t);
    await assert.rejects(downloadHlsVideo({
        playlistUrl: 'https://example.test/playlist.m3u8', fileName: 'error.mp4',
        signal: new AbortController().signal, onProgress() {},
    }), /disk full/);
    assert.equal(output.aborted, true);
    assert.equal(output.closed, false);
});

test('iframe/OPFS fallback downloads MP4 and removes its temporary file', { skip: !hasFfmpeg }, async (t) => {
    const output = memoryOutput();
    installPicker(t, output);
    // An embedded player cannot show the top-level save picker.
    globalThis.window.top = {};
    mockPlaylist(t);
    const removed = [];
    const names = [];
    const root = {
        async *entries() {},
        async getFileHandle(name) {
            names.push(name);
            return {
                async createWritable() { return output; },
                async getFile() { return new Blob(output.chunks, { type: 'video/mp4' }); },
            };
        },
        async removeEntry(name) { removed.push(name); },
    };
    const storageDescriptor = Object.getOwnPropertyDescriptor(navigator, 'storage');
    Object.defineProperty(navigator, 'storage', { configurable: true, value: { getDirectory: async () => root } });
    t.after(() => {
        if (storageDescriptor) Object.defineProperty(navigator, 'storage', storageDescriptor);
        else delete navigator.storage;
    });
    const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
    const link = { style: {}, click() { this.clicked = true; }, remove() {} };
    Object.defineProperty(globalThis, 'document', {
        configurable: true,
        value: { body: { appendChild() {} }, createElement: () => link },
    });
    t.after(() => {
        if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument);
        else delete globalThis.document;
    });
    let cleanup;
    const originalSetTimeout = globalThis.setTimeout;
    t.mock.method(globalThis, 'setTimeout', (callback, delay, ...args) => {
        if (delay === 5 * 60 * 1000) { cleanup = callback; return 0; }
        return originalSetTimeout(callback, delay, ...args);
    });
    const result = await downloadHlsVideo({
        playlistUrl: 'https://example.test/playlist.m3u8', fileName: '课程.mp4',
        signal: new AbortController().signal, onProgress() {},
    });
    assert.equal(result.outputType, 'browser-download');
    assert.ok(names[0].endsWith('.mp4'));
    assert.equal(link.download, '课程.mp4');
    assert.equal(link.clicked, true);
    await cleanup();
    assert.deepEqual(removed, names);
    verifyMp4(Buffer.concat(output.chunks), 'opfs.mp4');
});

test('timestamp discontinuities preserve a continuous MP4 timeline', { skip: !hasFfmpeg }, async () => {
    const output = memoryOutput();
    const mp4 = createMp4Writer(output);
    // Repeating a standalone TS segment resets its original transport timestamps.
    for (let index = 0; index < 3; index++) {
        await mp4.write(getFixture().segments[0], { discontinuity: index > 0, startTime: index });
    }
    await mp4.close();
    mp4.dispose();
    verifyMp4(Buffer.concat(output.chunks), 'discontinuity.mp4');
});
