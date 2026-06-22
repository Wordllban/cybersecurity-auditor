import express, { type Express } from "express";
import cors from "cors";
import type { Repositories } from "./repositories/types";
import { EvidenceService } from "./services/evidenceService";
import { healthRouter } from "./routes/health";
import { evidenceRouter } from "./routes/evidence";

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

  const evidenceService = new EvidenceService(repositories);

  app.use(healthRouter(repositories));
  app.use(evidenceRouter(evidenceService));

  // Centralised error handler — routes forward failures via next(err).
  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error("[server] unhandled route error:", err);
      res.status(500).json({ error: "Internal server error" });
    },
  );

  return app;
}
