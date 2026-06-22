import express, { type Express } from "express";
import cors from "cors";
import type { Repositories } from "./repositories/types";
import { healthRouter } from "./routes/health";

export interface AppDeps {
  repositories: Repositories;
}

/**
 * Build the Express app from its dependencies. Kept free of side effects (no
 * listen, no DB open) so integration tests can drive it over HTTP with supertest
 * against an isolated database (ADR-0007).
 */
export function createApp({ repositories }: AppDeps): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(healthRouter(repositories));

  return app;
}
