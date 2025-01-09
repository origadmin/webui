import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';

export default defineConfig({
    server: {
        base: '/',
        htmlFallback: 'index',
    },
    dev: {
        writeToDisk: false,
    },
    html: {
        template: './src/assets/index.html',
    },
    source: {
        entry: {
            index: './src/index.tsx',
            dashboard: './src/index.tsx',
            login: './src/index.tsx',
        },
    },
    output: {
        copy: [
            // `./src/assets/image.png` -> `./dist/image.png`
            {from: './public'},
        ],
    },
    plugins: [pluginReact()],
});