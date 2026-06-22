import { Router } from "express";
import { DEFAULT_CUSTOMER_ID } from "../config";
import type { ObservationService } from "../services/observationService";

export function observationsRouter(service: ObservationService): Router {
  const router = Router();

  router.get("/observations", async (req, res, next) => {
    try {
      const evidenceId =
        typeof req.query.evidenceId === "string" ? req.query.evidenceId : undefined;
      res.json(await service.list(DEFAULT_CUSTOMER_ID, evidenceId));
    } catch (err) {
      next(err);
    }
  });

  return router;
}
