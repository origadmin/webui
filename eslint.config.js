import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

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
  {
    settings: {
      react: { version: 'detect' },
    },
    files: ['**/*.{ts,tsx}'],
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
  ...compat.config({
    extends: ['plugin:@typescript-eslint/recommended'],
    plugins: ['react-hooks', '@typescript-eslint', 'eslint-plugin-react', 'eslint-plugin-react-hooks'],
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...prettier.rules,
    },
  }),
  prettier,
  {
    ignores: ['dist/', 'node_modules/'],
  },
];
