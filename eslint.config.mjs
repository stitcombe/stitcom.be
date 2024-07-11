import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/dist",
        "**/.eslintrc.cjs",
        "**/node_modules/",
        "**/build/",
        "**/coverage/",
        "**/html/",
        "**/vite-env.d.ts",
        "**/vite.config.ts",
    ],
}, ...fixupConfigRules(compat.extends(
    "airbnb",
    "airbnb-typescript",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
)), {
    plugins: {
        "react-refresh": reactRefresh,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(_import),
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.eslint.json",
        },
    },

    files: ['**/*.ts', '**/*.tsx'],

    rules: {
        "react-refresh/only-export-components": ["warn", {
            allowConstantExport: true,
        }],
    },
}];