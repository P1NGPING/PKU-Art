import muxjs from 'mux.js';

/** Remux one decrypted TS segment at a time, awaiting disk writes for backpressure. */
export function createMp4Writer(output) {
    let initialization = null;
    let pendingChunks = [];
    let segmentCount = 0;

    const onData = ({ initSegment, data }) => {
        if (initialization === null) {
            initialization = initSegment;
            pendingChunks.push(initSegment);
        } else if (
            initialization.length !== initSegment.length ||
            initialization.some((byte, index) => byte !== initSegment[index])
        ) {
            // A single initialization section cannot describe changing track configurations.
            throw new Error('录播中的音视频编码参数发生变化，无法合并为单个 MP4 文件');
        }
        pendingChunks.push(data);
    };
    const createTransmuxer = (startTime = 0) => {
        const instance = new muxjs.mp4.Transmuxer({
            remux: true,
            keepOriginalTimestamps: false,
            baseMediaDecodeTime: Math.round(startTime * 90_000),
        });
        instance.on('data', onData);
        return instance;
    };
    let transmuxer = createTransmuxer();

    return {
        async write(chunk, { discontinuity = false, startTime = 0 } = {}) {
            if (discontinuity) {
                // Recreate the parser so track clocks and buffered GOPs reset together.
                transmuxer.dispose();
                transmuxer = createTransmuxer(startTime);
            }
            transmuxer.push(new Uint8Array(chunk));
            transmuxer.flush();
            if (pendingChunks.length === 0) {
                throw new Error('无法将录播分片封装为 MP4，目前支持 H.264 视频和 AAC 音频');
            }
            const chunks = pendingChunks;
            pendingChunks = [];
            for (const data of chunks) {
                await output.write(data);
            }
            segmentCount += 1;
        },
        async close() {
            if (segmentCount === 0) {
                throw new Error('没有可保存的 MP4 音视频数据');
            }
            await output.close();
        },
        dispose() {
            pendingChunks = [];
            transmuxer.dispose();
        },
    };
}
