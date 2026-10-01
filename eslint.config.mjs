/* Copyright Elysia © 2025. All rights reserved */

import pluginJs from "@eslint/js";
import nodePlugin from "eslint-plugin-n";
import simpleHeader from "eslint-plugin-simple-header";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    {
        ignores: ["dist/", "scripts/", "**/*.js"],
    },
    { languageOptions: { globals: globals.node } },
    { files: ["src/renderer/**/*.{ts,tsx}"], languageOptions: { globals: globals.browser } },
    // Configs
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    // nodePlugin.configs["flat/recommended-script"],
    // Rules
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
            "unused-imports": unusedImports,
            "simple-header": simpleHeader,
            n: nodePlugin,
        },
        rules: {
            "simple-header/header": [
                "error",
                {
                    files: ["assets/header.txt"],
                    templates: { author: [".*", "Elysia"] },
                },
            ],
            "n/exports-style": ["error", "module.exports"],
            "no-unused-vars": [
                "warn",
                {
                    args: "none",
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    args: "none",
                    caughtErrors: "all",
                    ignoreRestSiblings: false,
                },
            ],
            "no-useless-escape": "error",
            "no-case-declarations": "off",
            "@typescript-eslint/no-explicit-any": "error",
            "linebreak-style": "off",
            "arrow-spacing": [
                "warn",
                {
                    before: true,
                    after: true,
                },
            ],
            "comma-dangle": ["error", "always-multiline"],
            "comma-spacing": "error",
            "comma-style": "error",
            curly: ["error", "multi-line", "consistent"],
            "dot-location": ["error", "property"],
            "handle-callback-err": "off",
            "keyword-spacing": "error",
            "max-nested-callbacks": [
                "error",
                {
                    max: 5,
                },
            ],
            "max-statements-per-line": [
                "error",
                {
                    max: 2,
                },
            ],
            "no-console": "off",
            "no-empty-function": "error",
            "no-floating-decimal": "error",
            "no-inline-comments": "warn",
            "no-lonely-if": "error",
            "no-multiple-empty-lines": [
                "error",
                {
                    max: 2,
                    maxEOF: 1,
                    maxBOF: 0,
                },
            ],
            "no-shadow": ["error", { allow: ["err", "resolve", "reject"] }],
            "no-var": "warn",
            "no-unreachable": "error",
            "prefer-const": "error",
            "space-before-blocks": "error",
            "space-before-function-paren": [
                "warn",
                {
                    anonymous: "always",
                    named: "always",
                    asyncArrow: "always",
                },
            ],
            "space-infix-ops": "error",
            "space-unary-ops": "error",
            quotes: ["error", "double", { avoidEscape: true }],
            "jsx-quotes": ["error", "prefer-double"],
            "no-mixed-spaces-and-tabs": "error",
            indent: ["error", 4, { SwitchCase: 1 }],
            "arrow-parens": ["error", "as-needed"],
            "eol-last": ["error", "always"],
            "no-multi-spaces": "error",
            "no-trailing-spaces": "error",
            "no-whitespace-before-property": "error",
            semi: ["error", "always"],
            "semi-style": ["error", "last"],
            "space-in-parens": ["error", "never"],
            "block-spacing": ["error", "always"],
            "object-curly-spacing": ["error", "always"],
            eqeqeq: ["error", "always", { null: "ignore" }],
            "spaced-comment": ["error", "always", { markers: ["!"] }],
            yoda: "error",
            "prefer-destructuring": [
                "error",
                {
                    VariableDeclarator: { array: false, object: true },
                    AssignmentExpression: { array: false, object: false },
                },
            ],
            "operator-assignment": ["error", "always"],
            "no-useless-computed-key": "error",
            "no-unneeded-ternary": ["error", { defaultAssignment: false }],
            "no-invalid-regexp": "error",
            "no-constant-condition": ["error", { checkLoops: false }],
            "no-duplicate-imports": "error",
            "no-extra-semi": "error",
            "dot-notation": "error",
            "no-fallthrough": "error",
            "for-direction": "error",
            "no-async-promise-executor": "error",
            "no-cond-assign": "error",
            "no-dupe-else-if": "error",
            "no-duplicate-case": "error",
            "no-irregular-whitespace": "error",
            "no-loss-of-precision": "error",
            "no-misleading-character-class": "error",
            "no-prototype-builtins": "error",
            "no-regex-spaces": "error",
            "no-shadow-restricted-names": "error",
            "no-unexpected-multiline": "error",
            "no-unsafe-optional-chaining": "error",
            "no-useless-backreference": "error",
            "use-isnan": "error",
            "prefer-spread": "error",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "unused-imports/no-unused-imports": "error",
            "path-alias/no-relative": "off",
        },
    },
];
