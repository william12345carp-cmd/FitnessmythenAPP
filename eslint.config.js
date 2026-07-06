import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

export default [
  // Supabase Edge Functions laufen unter Deno (eigene Globals/Imports) —
  // sie werden separat via `deno check` geprüft, nicht von ESLint.
  { ignores: ["dist", "node_modules", "supabase/functions"] },

  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactRefresh.configs.vite,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Prototyp nutzt bewusst kein PropTypes/TypeScript (V1-Entscheidung).
      "react/prop-types": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // Der Store exportiert Provider, Hooks und Reducer gemeinsam — bewusste
  // Architektur (eine Datei = eine State-Quelle). Kostet nur HMR-Granularität.
  {
    files: ["src/store/**"],
    rules: { "react-refresh/only-export-components": "off" },
  },

  // Node-Kontext für Konfigurationsdateien
  {
    files: ["*.config.js"],
    languageOptions: { globals: globals.node },
  },

  // Prettier zuletzt: deaktiviert alle rein stilistischen Regeln.
  prettier,
];
