import { defineConfig } from 'vite';
import monkey, { util } from 'vite-plugin-monkey';
import mkcert from 'vite-plugin-mkcert';
import dotenv from 'dotenv';
import AutoImport from 'unplugin-auto-import/vite';

const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

// Public checkouts can build without the maintainer's private .env / CDN uploader.
dotenv.config();
const version = process.env.VERSION || '2.6.27.1';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        AutoImport({
            imports: [util.unimportPreset],
        }),
        mkcert(),
        monkey({
            entry: 'src/main.js',
            userscript: {
                icon: 'http://cdn.arthals.ink/Arthals-mcskin.png',
                namespace: 'arthals/pku-art',
                name: 'PKU-Art',
                description: '给你一个足够好看的北大网站。',
                match: ['*://*.pku.edu.cn/*'],
                // local development
                // match: ['*://*.pku.edu.cn/*', 'http://localhost:8000/*'],
                'run-at': 'document-start',
                'inject-into': 'page',
                version,
                // Keep this custom build from being replaced by the upstream TS version.
                updateURL: process.env.UPDATE_URL || 'none',
                downloadURL: process.env.DOWNLOAD_URL || 'none',
                supportURL: 'https://github.com/zhuozhiyongde/PKU-Art/issues',
                connect: ['pku.edu.cn'],
                license: 'GPL-3.0 license',
                author: 'Arthals',
                $extra: {
                    'author-blog': 'https://arthals.ink',
                    date,
                },
            },
            server: { mountGmApi: true },
        }),
    ],
});
