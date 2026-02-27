// @ts-check

import { fileURLToPath, URL } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import eslintJS from '@eslint/js';
import eslintJest from 'eslint-plugin-jest';
import { defineConfig } from 'eslint/config';
import eslintTS from 'typescript-eslint';

export default defineConfig(
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslintJS.configs.recommended,
      ...eslintTS.configs.strictTypeChecked,
      ...eslintTS.configs.stylisticTypeChecked,
      eslintJest.configs["flat/recommended"],
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/restrict-template-expressions": "warn",
    }
  }, {
  files: ["**/*.{js,cjs,mjs}"],
  extends: [
    eslintJS.configs.recommended,
  ],
});
