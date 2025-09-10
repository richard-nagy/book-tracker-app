import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "@stylistic": stylistic,
            react,
        },
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs["recommended-latest"],
            prettier,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tseslint.parser,
        },
        rules: {
            "no-extra-boolean-cast": [
                "error"
            ],
            "prefer-const": [
                "error"
            ],
            "no-unsafe-finally": [
                "error"
            ],
            "no-empty": [
                "off"
            ],
            camelcase: "error",
            "no-undef": "error",
            "no-const-assign": "error",
            "no-extra-boolean-cast": "error",
            eqeqeq: "error",
            curly: "error",
            "default-case": "error",
            "no-useless-escape": "error",
            "no-nested-ternary": "error",
            "no-console": [
                "error",
                {
                    allow: ["warn", "error"],
                },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            // "@stylistic/multiline-ternary": "error",
            // "@stylistic/no-extra-parens": ["error"],
            "@stylistic/spaced-comment": [
                "error",
                "always",
                {
                    markers: ["#region", "#endregion", "/", "//", "**"],
                },
            ],
            "no-multiple-empty-lines": [
                "error",
                {
                    max: 1,
                },
            ],
            "require-await": ["error"],
            "no-dupe-keys": ["error"],
            "no-duplicate-case": ["error"],
            "react/react-in-jsx-scope": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/display-name": "off",
            "react/no-unescaped-entities": [
                "off"
            ],
        },
    },
]);
