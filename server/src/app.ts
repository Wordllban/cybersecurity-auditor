import express, { type Express } from "express";
import cors from "cors";
import type { Repositories } from "./repositories/types";
import type { AnalyzeLlm } from "./llm/openRouterClient";
import { EvidenceService } from "./services/evidenceService";
import { ObservationService } from "./services/observationService";
import { AnalyzeService } from "./services/analyzeService";
import { healthRouter } from "./routes/health";
import { evidenceRouter } from "./routes/evidence";
import { observationsRouter } from "./routes/observations";
import { analyzeRouter } from "./routes/analyze";

export interface AppDeps {
  repositories: Repositories;
  /** The analysis LLM. Injected so tests can supply a mock and run offline (ADR-0007). */
  llm: AnalyzeLlm;
}

/**
 * Build the Express app from its dependencies. Kept free of side effects (no
 * listen, no DB open) so integration tests can drive it over HTTP with supertest
 * against an isolated database (ADR-0007).
 */
export function createApp({ repositories, llm }: AppDeps): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const evidenceService = new EvidenceService(repositories);
  const observationService = new ObservationService(repositories);
  const analyzeService = new AnalyzeService(repositories, llm);

  app.use(healthRouter(repositories));
  app.use(evidenceRouter(evidenceService));
  app.use(observationsRouter(observationService));
  app.use(analyzeRouter(analyzeService));

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
