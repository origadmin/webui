import {fixupConfigRules} from '@eslint/compat';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import ts from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier'
import path from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: ts.configs['recommended'],
});

export default [
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
    // ...fixupConfigRules([
    //     {
    //         // ...pluginReact.configs.recommended,
    //         // settings: {
    //         //     react: {version: 'detect'},
    //         // },
    //     },
    //     // pluginReact.configs['jsx-runtime'],
    // ]),
    {

        settings: {
            react: {version: 'detect'},
        },
        // plugins: {
        //     '@typescript-eslint': ts,
        //     'react': pluginReact,
        //     'react-hooks': reactHooks,
        // },
        // extends: [
        //     'plugin:@typescript-eslint/recommended',
        //     'plugin:react/recommended',
        //     'plugin:react-hooks/recommended',
        // ],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    // ...compat.plugins('eslint-plugin-react-hooks'),
    ...compat.config({

        // jsxRuntime: pluginReact.configs['jsx-runtime'],
        extends: ['plugin:@typescript-eslint/recommended'],
        // recommended: {
        //     ...js.configs.recommended,
        //     ...ts.configs.recommended,
        // },
        // reactHooks: reactHooks,
        plugins: ['react-hooks', '@typescript-eslint', 'eslint-plugin-react', 'eslint-plugin-react-hooks'],
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...ts.configs.recommended.rules,
            // ...pluginReact.configs.recommended.rules,
            ...prettier.rules,
        },
    }),
    prettier,
    {
        ignores: ['dist/', 'node_modules/'],
    },
];