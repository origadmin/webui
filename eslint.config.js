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
  ...reactPlugin.configs.flat.recommended,
  plugins: {
    react: reactPlugin,
    "react-hooks": reactPluginHooks,
  },
  rules: {
    // ...reactPlugin.rules.all,
    // ...reactPluginHooks.rules,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  languageOptions: {
    ...reactPlugin.configs.flat.recommended.languageOptions,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  // settings: {
  //   react: {
  //     createClass: "createReactClass", // Regex for Component Factory to use,
  //     // default to "createReactClass"
  //     pragma: "React", // Pragma to use, default to "React"
  //     fragment: "Fragment", // Fragment to use (may be a property of <pragma>), default to "Fragment"
  //     version: "detect", // React version. "detect" automatically picks the version you have installed.
  //     // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
  //     // Defaults to the "defaultVersion" setting and warns if missing, and to "detect" in the future
  //     defaultVersion: "", // Default React version to use when the version you have installed cannot be detected.
  //     // If not provided, defaults to the latest React version.
  //     flowVersion: "0.53", // Flow version
  //   },
  //   propWrapperFunctions: [
  //     // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
  //     "forbidExtraProps",
  //     { property: "freeze", object: "Object" },
  //     { property: "myFavoriteWrapper" },
  //     // for rules that check exact prop wrappers
  //     { property: "forbidExtraProps", exact: true },
  //   ],
  //   componentWrapperFunctions: [
  //     // The name of any function used to wrap components, e.g. Mobx `observer` function. If this isn't set, components wrapped by these functions will be skipped.
  //     "observer", // `property`
  //     { property: "styled" }, // `object` is optional
  //     { property: "observer", object: "Mobx" },
  //     { property: "observer", object: "<pragma>" }, // sets `object` to whatever value `settings.react.pragma` is set to
  //   ],
  //   formComponents: [
  //     // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
  //     "CustomForm",
  //     { name: "SimpleForm", formAttribute: "endpoint" },
  //     { name: "Form", formAttribute: ["registerEndpoint", "loginEndpoint"] }, // allows specifying multiple properties if necessary
  //   ],
  //   linkComponents: [
  //     // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
  //     "Hyperlink",
  //     { name: "MyLink", linkAttribute: "to" },
  //     { name: "Link", linkAttribute: ["to", "href"] }, // allows specifying multiple properties if necessary
  //   ],
  // },
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
  // reactPlugin.configs.recommended,
  reactConfig,
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
]);
