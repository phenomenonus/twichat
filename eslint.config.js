import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Ignore common generated / local folders
  globalIgnores([".vscode/", "node_modules/", "dist/"]),

  {
    // Base configs
    extends: [
      js.configs.recommended, // Core ESLint recommended rules
      ...tseslint.configs.recommended, // TypeScript recommended rules
      reactHooks.configs.flat.recommended, // React Hooks rules (rules of hooks, deps)
      reactRefresh.configs.vite, // Vite-specific React Fast Refresh safety
    ],

    // Apply config to all JS/TS files including React (JSX/TSX)
    files: ["**/*.{ts,tsx,js,jsx}"],

    // Define global variables (browser environment)
    languageOptions: {
      globals: globals.browser,
    },

    // Register plugins
    plugins: {
      perfectionist,
      "simple-import-sort": simpleImportSort, // Import sorting plugin
    },

    rules: {
      // === General code quality ===

      "@typescript-eslint/no-unused-vars": "warn",
      eqeqeq: "error", // Enforce === instead of ==
      "no-console": "warn", // Warn on console usage

      "no-debugger": "warn", // Warn on debugger statements
      // Disable base rule in favor of TS-aware version
      "no-unused-vars": "off",

      // array items
      "perfectionist/sort-array-includes": [
        "warn",
        {
          order: "asc",
          type: "alphabetical",
        },
      ],

      // Sort JSX props
      "perfectionist/sort-jsx-props": [
        "warn",
        {
          order: "asc",
          type: "alphabetical",
        },
      ],

      // object keys
      "perfectionist/sort-objects": [
        "warn",
        {
          order: "asc",
          type: "alphabetical",
        },
      ],

      // Sort exported members
      "simple-import-sort/exports": "warn",

      // === Import sorting (custom grouping) ===
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // 1. Side effect imports (e.g. polyfills, CSS)
            ["^\\u0000"],

            // 2. Node.js built-in modules
            ["^node:"],

            // 3. React core packages
            ["react", "react-dom"],

            // 4. External packages (npm)
            ["^@?\\w"],

            // 5. Internal: constants
            ["^@/constants"],

            // 6. Internal: utilities
            ["^@/utils"],

            // 7. Internal: React contexts
            ["^@/contexts"],

            // 8. Internal: custom hooks
            ["^@/hooks"],

            // 9. Internal: UI components
            ["^@/ui"],

            // 10. Internal: Theme data
            ["^@/theme"],

            // 11. Internal: TypeScript types
            ["^@/types"],

            // 12. Internal: static assets
            ["^@/assets"],

            // 13. Other internal modules (fallback)
            ["^@/"],

            // 14. Parent directory imports (../)
            ["^\\.\\./"],

            // 15. Same-folder imports (./)
            ["^\\./"],

            // 16. Index file imports
            ["^\\./?$"],
          ],
        },
      ],
    },
  },
]);
