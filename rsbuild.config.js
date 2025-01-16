// const { pluginReact } = require('@rsbuild/plugin-react');
// const { defineConfig } = require('@rsbuild/core');
// const postcssOptions = require('./postcss.config');
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import postcssOptions from "./postcss.config.js";

/** @type {import('@rsbuild/core').RsbuildConfig} */
const config = defineConfig({
  server: {
    base: "/",
    htmlFallback: "index",
  },
  dev: {
    writeToDisk: true,
  },
  html: {
    template: "index.html",
    templateParameters: {
      APP_TITLE: "OrigAdmin Panel",
      // eslint-disable-next-line no-undef
      BASE_URL: process.env.BASE_URL || "",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: postcssOptions,
            },
          },
        ],
        type: "css/auto",
      },
    ],
  },
  source: {
    entry: {
      index: "./src/index.tsx",
    },
  },
  output: {
    copy: [
      // `./src/assets/image.png` -> `./dist/image.png`
      { from: "./public" },
    ],
  },
  plugins: [pluginReact()],
});

export default config;
