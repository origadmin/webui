import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactPluginHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

const reactConfig = {
  files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
  plugins: {
    react: reactPlugin,
    "react-hooks": reactPluginHooks,
  },
  rules: {
    ...reactPlugin.rules.all,
    ...reactPluginHooks.rules,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
};

const eslintConfig = {};

const tseslintConfig = {
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  settings: {
    react: { version: "detect" },
  },
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
  },
};

const tailwindcssConfig = {
  plugins: {
    tailwindcss,
  },
  files: ["**/*.{css,ts,tsx}"],
  languageOptions: {
    parserOptions: {
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    tailwindcss: {
      // These are the default values but feel free to customize
      callees: ["classnames", "clsx", "ctl", "cn", "cva"],
      config: "tailwind.config.js", // returned from `loadConfig()` utility if not provided
      cssFiles: ["**/*.css", "!**/node_modules", "!**/.*", "!**/dist", "!**/build"],
      cssFilesRefreshRate: 5_000,
      removeDuplicates: true,
      skipClassAttribute: false,
      whitelist: [],
      tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
      classRegex: "^class(Name)?$", // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
    },
    rules: tailwindcss.rules,
  },
};

const prettierPluginConfig = {
  plugins: {
    prettier: prettierPlugin,
  },
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    ...prettierConfig.rules,
    "prettier/prettier": [
      "error",
      {
        parser: "flow",
      },
    ],
  },
};

export default tseslint.config([
  {
    ignores: ["dist/", "node_modules/"],
  },
  prettierConfig,
  prettierPluginConfig,
  eslint.configs.recommended,
  eslintConfig,
  tseslint.configs.recommended,
  tseslintConfig,
  ...tailwindcss.configs["flat/recommended"],
  tailwindcssConfig,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-vars": "error",
      "unused-imports/no-unused-imports": "error",
    },
  },
  reactConfig,
]);
