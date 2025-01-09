import {fixupConfigRules} from '@eslint/compat';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import pluginReact from "eslint-plugin-react"
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
    {languageOptions: {globals: globals.browser}},
    js.configs.recommended,
    ...ts.configs.recommended,
    ...fixupConfigRules([
        {
            ...pluginReact.configs.recommended,
            settings: {
                react: {version: 'detect'},
            },
        },
        pluginReact.configs["jsx-runtime"],
    ]),
    {
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
        },
    },
    {ignores: ['dist/', 'node_modules/']},
];
