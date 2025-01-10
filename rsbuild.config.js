const { pluginReact } = require('@rsbuild/plugin-react');
const { defineConfig } = require('@rsbuild/core');
const postcssOptions = require('./postcss.config');

const config = defineConfig({
  server: {
    base: '/',
    htmlFallback: 'index',
  },
  dev: {
    writeToDisk: true,
  },
  html: {
    template: './src/assets/index.html',
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
  plugins: [pluginReact()],
});
export default config;
