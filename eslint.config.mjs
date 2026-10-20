import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...pluginQuery.configs["flat/recommended"],
  eslintPluginTailwindcss.configs.recommended,
  eslintConfigPrettier,
  {
    settings: {
      tailwindcss: {
        cssConfigPath: "./app/globals.css",
      },
    },
  },
  {
    rules: {
      // False positive with react-hook-form's handleSubmit
      "react-hooks/refs": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
