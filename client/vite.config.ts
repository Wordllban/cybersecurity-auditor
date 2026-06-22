import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Consume the shared package as raw TS source (no build step) so the Zod
      // schemas are a true single source of truth across client and server.
      "@hibit/shared": fileURLToPath(
        new URL("../packages/shared/src/index.ts", import.meta.url),
      ),
    },
  },
  server: {
    port: 5173,
  },
});
