import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginMocha from "eslint-plugin-mocha";

export default defineConfig([
  globalIgnores(["src/api/config/*", "src/ui/config/*"]),
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        $: "readonly",
        $$: "readonly",
        expect: "readonly",
        browser: "readonly",
        ...eslintPluginMocha.configs.all.languageOptions.globals,
      },
    },
    rules: {
			camelcase: "warn",
			"max-params": ["error", 4],
			"no-console": "error",
			"no-var": "error",
		},
  },
]);
