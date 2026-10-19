import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  eslintPluginTailwindcss.configs["flat/recommended"] ||
    eslintPluginTailwindcss.configs.recommended,
  {
    extends: [
      ...nextCoreWebVitals,
      ...nextTypescript,
      ...compat.extends("prettier"),
      ...compat.extends("plugin:@tanstack/eslint-plugin-query/recommended"),
    ],
    settings: {
      tailwindcss: {
        cssConfigPath: "./app/globals.css",
      },
    },
  },
]);
