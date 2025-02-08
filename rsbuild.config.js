// const { pluginReact } = require('@rsbuild/plugin-react');
// const { defineConfig } = require('@rsbuild/core');
// const postcssOptions = require('./postcss.config');
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
import postcssOptions from "./postcss.config.js";


/** @type {import("@rsbuild/core").RsbuildConfig} */
const config = defineConfig({
  server: {
    base: "/",
    htmlFallback: "index",
    proxy: {
      "/api": process.env.NODE_ENV === "development" ? "http://localhost:25100" : "",
    },
  },
  dev: {
    writeToDisk: true,
  },
  html: {
    template: "index.html",
    templateParameters: {
      APP_TITLE: "OrigAdmin WebUI",
      INDEX_CSS: process.env.NODE_ENV === "development" ? "index.css" : "index.min.css",
      LOADING_SCRIPT: process.env.NODE_ENV === "development" ? "static/js/loading.js" : "static/js/loading.min.js",
      BASE_URL: process.env.BASE_URL || "",
    },
    favicon: "./public/favicon.ico",
    appIcon: {
      name: "OrigAdmin WebUI",
      icons: [
        { src: "./src/assets/icons/icon-128x128.png", size: 128 },
        { src: "./src/assets/icons/icon-192x192.png", size: 192 },
        { src: "./src/assets/icons/icon-256x256.png", size: 256 },
        // { src: "./src/assets/icons/icon-512x512.png", size: 512 },
      ],
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
      index: "./src/main.tsx",
    },
  },
  output: {
    copy: [
      // `./src/assets/image.png` -> `./dist/image.png`
      { from: "./public" },
      process.env.NODE_ENV === "development" ? { from: "./resources/docs/", to: "docs/" } : {},
    ],
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({
          quoteStyle: "double",
          generatedRouteTree: "./src/routes.gen.ts",
          semicolons: true,
          // virtualRouteConfig: "./src/routes.ts",
        }),
      ],
    },
  },
});

export default config;
