/**
 * Single seeded customer for the PoC. The schema supports many via `customerId`,
 * but multi-tenant isolation is out of scope (reserved for the live session).
 */
export const DEFAULT_CUSTOMER_ID = "hibit";

export interface AppConfig {
  port: number;
  databasePath: string;
  openRouterApiKey: string | undefined;
  openRouterModel: string;
}

export function loadConfig(): AppConfig {
  return {
    port: Number(process.env.PORT ?? 4000),
    databasePath: process.env.DATABASE_PATH ?? "./data/hibit.db",
    openRouterApiKey: process.env.OPENROUTER_API_KEY || undefined,
    openRouterModel: process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-sonnet",
  };
}
