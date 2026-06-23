import { execSync } from "node:child_process";

/**
 * Seed a deterministic finding into the E2E database before the web servers
 * start. Delegates to the server's own seed script so persistence logic stays
 * in the server package; DATABASE_PATH matches the server webServer config.
 */
export default function globalSetup() {
  execSync("pnpm --filter @hibit/server seed:e2e", {
    stdio: "inherit",
    env: { ...process.env, DATABASE_PATH: "./data/e2e.db" },
  });
}
