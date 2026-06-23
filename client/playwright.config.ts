import { defineConfig, devices } from "@playwright/test";

/**
 * E2E config (ADR-0007). Dedicated ports + a separate DATABASE_PATH isolate the
 * run from any dev server and the dev DB. `globalSetup` seeds a deterministic
 * finding before the web servers start; the flow never touches /analyze, so no
 * OpenRouter key is needed.
 */
const SERVER_PORT = 4100;
const CLIENT_PORT = 5273;
const API_URL = `http://localhost:${SERVER_PORT}`;
const BASE_URL = `http://localhost:${CLIENT_PORT}`;

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "pnpm --filter @hibit/server dev",
      env: { PORT: String(SERVER_PORT), DATABASE_PATH: "./data/e2e.db" },
      url: `${API_URL}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    {
      command: `pnpm exec vite --port ${CLIENT_PORT} --strictPort`,
      env: { VITE_API_URL: API_URL },
      url: BASE_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
