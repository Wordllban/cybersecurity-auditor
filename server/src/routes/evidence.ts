import { Router } from "express";
import { DEFAULT_CUSTOMER_ID } from "../config";
import type { EvidenceService } from "../services/evidenceService";

export function evidenceRouter(service: EvidenceService): Router {
  const router = Router();

  router.get("/evidence", async (_req, res, next) => {
    try {
      res.json(await service.list(DEFAULT_CUSTOMER_ID));
    } catch (err) {
      next(err);
    }
  });

  router.get("/evidence/:id", async (req, res, next) => {
    try {
      const item = await service.get(req.params.id);
      if (!item || item.customerId !== DEFAULT_CUSTOMER_ID) {
        res.status(404).json({ error: "Evidence item not found" });
        return;
      }
      res.json(item);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
