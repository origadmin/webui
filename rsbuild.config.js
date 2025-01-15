import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';

import postcssOptions from './postcss.config';

const config = defineConfig({
  server: {
    base: '/',
    htmlFallback: 'index',
  },
  dev: {
    writeToDisk: true,
  },
  html: {
    template: 'index.html',
    templateParameters: {
      APP_TITLE: 'OrigAdmin Panel',
      BASE_URL: process.env.BASE_URL || '',
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
      index: './src/index.tsx',
    },
  },
  output: {
    copy: [
      // `./src/assets/image.png` -> `./dist/image.png`
      { from: './public' },
    ],
  },
  plugins: [pluginReact(), pluginTailwindCSS()],
});

export default config;
