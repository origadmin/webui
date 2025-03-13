// const { pluginReact } = require('@rsbuild/plugin-react');
// const { defineConfig } = require('@rsbuild/core');
// const postcssOptions = require('./postcss.config');
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack';
import postcssOptions from './postcss.config.js';
import tsrConfig from './tsr.config.json' with { type: 'json' };

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@rsbuild/core').RsbuildConfig} */
const config = defineConfig({
  server: {
    base: '/',
    htmlFallback: 'index',
    proxy: dev && {
      '/api': {
        target: 'http://localhost:25100',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    },
  },
  dev: {
    writeToDisk: true,
  },
  html: {
    template: 'index.html',
    templateParameters: {
      APP_TITLE: 'OrigAdmin WebUI',
      INDEX_CSS: dev ? 'index.css' : 'index.min.css',
      LOADING_SCRIPT: dev ? 'static/js/loading.js' : 'static/js/loading.min.js',
      BASE_URL: process.env.BASE_URL || '',
    },
    favicon: './public/favicon.ico',
    appIcon: {
      name: 'OrigAdmin WebUI',
      icons: [
        {src: './src/assets/icons/icon-128x128.png', size: 128},
        {src: './src/assets/icons/icon-192x192.png', size: 192},
        {src: './src/assets/icons/icon-256x256.png', size: 256},
        {src: './src/assets/icons/icon-512x512.png', size: 512},
      ],
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: postcssOptions,
            },
          },
        ],
        type: 'css/auto',
      },
    ],
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  output: {
    copy:
        [
          // `./src/assets/image.png` -> `./dist/image.png`
          {from: './public'},
          ...(dev ? [{from: './resources/docs/', to: 'docs/'}] : []),
        ],
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack(tsrConfig)],
    },
  },
});

export default config;
