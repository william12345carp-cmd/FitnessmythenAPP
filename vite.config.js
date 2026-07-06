import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // Nur pure Functions unter Test — kein DOM nötig.
    environment: "node",
    include: ["src/**/*.test.js"],
    // Deterministische Datums-Tests aus Sicht deutscher Nutzer (lokale Mitternacht, §5.3).
    env: { TZ: "Europe/Berlin" },
  },
});
