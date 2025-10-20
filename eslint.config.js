import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginMocha from "eslint-plugin-mocha";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
	globalIgnores(["src/api/config/*", "src/ui/config/*", "eslint.config.js"]),
	{
		files: ["**/*.{js,mjs,cjs}"],
		plugins: { js, "@typescript-eslint": tseslint },
		extends: ["js/recommended"],
		languageOptions: {
			parser: tsParser,
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
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "import",
					format: ["PascalCase"],
				},
			],
			"no-unused-vars": "off",
		},
	},
]);
