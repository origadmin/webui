import {defineConfig} from '@rspack/cli';

const config = defineConfig({
    entry: {
        main: './src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: "postcss.config.ts",
                        },
                    },
                ],
                type: 'css/auto',
            },
        ],
    }
});

export default config;
