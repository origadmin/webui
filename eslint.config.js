import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactPluginHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

const reactConfig = {
  ...reactPlugin.configs.flat.recommended,
  files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
  plugins: {
    react: reactPlugin,
    "react-hooks": reactPluginHooks,
  },
  rules: {
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
  }, // settings: {
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

const eslintConfig = {
  files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
};

const tseslintConfig = {
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  settings: {
    react: { version: "detect" },
  },
  files: ["**/*.{ts,tsx}"],
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
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
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
    rules: {
      "classnames-order": "warn",
      "enforces-negative-arbitrary-values": "warn",
      "enforces-shorthand": "warn",
      "migration-from-tailwind-2": "warn",
      "no-arbitrary-value": "off",
      "no-contradicting-classname": "error",
      "no-custom-classname": "warn",
      "no-unnecessary-arbitrary-value": "warn", //recommended
      // "stylelint/annotation-no-unknown": "error",
      // "stylelint/at-rule-descriptor-no-unknown": "error",
      // "stylelint/at-rule-descriptor-value-no-unknown": "error",
      // "stylelint/at-rule-no-deprecated": "error",
      // "stylelint/at-rule-no-unknown": "error",
      // "stylelint/at-rule-prelude-no-invalid": ["error", { ignoreAtRules: ["media"] }],
      // "stylelint/block-no-empty": "error",
      // "stylelint/comment-no-empty": "error",
      // "stylelint/custom-property-no-missing-var-function": "error",
      // "stylelint/declaration-block-no-duplicate-custom-properties": "error",
      // "stylelint/declaration-block-no-duplicate-properties": [
      //   "error",
      //   {
      //     ignore: ["consecutive-duplicates-with-different-syntaxes"],
      //   },
      // ],
      // "stylelint/declaration-block-no-shorthand-property-overrides": "error",
      // "stylelint/declaration-property-value-keyword-no-deprecated": "error",
      // "stylelint/declaration-property-value-no-unknown": "error",
      // "stylelint/font-family-no-duplicate-names": "error",
      // "stylelint/font-family-no-missing-generic-family-keyword": "error",
      // "stylelint/function-calc-no-unspaced-operator": "error",
      // "stylelint/keyframe-block-no-duplicate-selectors": "error",
      // "stylelint/keyframe-declaration-no-important": "error",
      // "stylelint/media-feature-name-no-unknown": "error",
      // "stylelint/media-feature-name-value-no-unknown": "error",
      // "stylelint/media-query-no-invalid": "error",
      // "stylelint/named-grid-areas-no-invalid": "error",
      // "stylelint/no-descending-specificity": "error",
      // "stylelint/no-duplicate-at-import-rules": "error",
      // "stylelint/no-duplicate-selectors": "error",
      // "stylelint/no-empty-source": "error",
      // "stylelint/no-invalid-double-slash-comments": "error",
      // "stylelint/no-invalid-position-at-import-rule": "error",
      // "stylelint/no-irregular-whitespace": "error",
      // "stylelint/property-no-unknown": "error",
      // "stylelint/selector-anb-no-unmatchable": "error",
      // "stylelint/selector-pseudo-class-no-unknown": "error",
      // "stylelint/selector-pseudo-element-no-unknown": "error",
      // "stylelint/selector-type-no-unknown": [
      //   "error",
      //   {
      //     ignore: ["custom-elements"],
      //   },
      // ],
      // "stylelint/string-no-newline": ["error", { ignore: ["at-rule-preludes", "declaration-values"] }],
    },
  },
};

const prettierPluginConfig = {
  ...prettierConfig,
  plugins: {
    ...prettierConfig.plugins,
    prettier: prettierPlugin,
  },
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: false,
      },
    },
  },
  rules: {
    ...prettierConfig.rules,
    "prettier/prettier": ["error"], // Don't add anything, it will load .prettierrc
  },
};

export default tseslint.config([
  {
    ignores: ["dist/", "node_modules/"],
  },
  eslint.configs.recommended,
  eslintConfig,
  ...tseslint.configs.recommended,
  tseslintConfig,
  prettierConfig, // prettierPlugin.configs.recommended,
  prettierPluginConfig, // reactPlugin.configs.recommended,
  reactConfig, // ...tailwindcss.configs["flat/recommended"],
  // tailwindcssConfig,
]);
