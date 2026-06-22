import { Router } from "express";
import type { Repositories } from "../repositories/types";

/** Health route — also proves DB access flows through the async repository layer. */
export function healthRouter(repositories: Repositories): Router {
  const router = Router();

  router.get("/health", async (_req, res) => {
    try {
      const evidenceCount = await repositories.evidence.count();
      res.json({ status: "ok", db: { connected: true, evidenceCount } });
    } catch {
      res.status(500).json({ status: "error", db: { connected: false } });
    }
  });

  return router;
}
