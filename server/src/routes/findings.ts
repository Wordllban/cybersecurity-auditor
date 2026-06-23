import { Router } from "express";
import { createFindingInputSchema, findingUpdateSchema } from "@hibit/shared";
import { DEFAULT_CUSTOMER_ID } from "../config";
import type { FindingService } from "../services/findingService";
import { FindingValidationError } from "../services/findingErrors";

export function findingsRouter(service: FindingService): Router {
  const router = Router();

  router.get("/findings", async (req, res, next) => {
    try {
      const evidenceId =
        typeof req.query.evidenceId === "string"
          ? req.query.evidenceId
          : undefined;
      res.json(await service.list(DEFAULT_CUSTOMER_ID, evidenceId));
    } catch (err) {
      next(err);
    }
  });

  router.get("/findings/:id", async (req, res, next) => {
    try {
      const finding = await service.get(DEFAULT_CUSTOMER_ID, req.params.id);
      if (!finding) {
        res.status(404).json({ error: "Finding not found" });
        return;
      }
      res.json(finding);
    } catch (err) {
      next(err);
    }
  });

  router.post("/findings", async (req, res, next) => {
    const parsed = createFindingInputSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        code: "bad_request",
        error: parsed.error.issues[0]?.message ?? "Invalid finding payload",
      });
      return;
    }
    try {
      const finding = await service.create(DEFAULT_CUSTOMER_ID, parsed.data);
      res.status(201).json(finding);
    } catch (err) {
      if (err instanceof FindingValidationError) {
        res.status(400).json({
          code: err.code,
          error: err.message,
          missingObservationIds: err.missingObservationIds,
        });
        return;
      }
      next(err);
    }
  });

  router.patch("/findings/:id", async (req, res, next) => {
    const parsed = findingUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        code: "bad_request",
        error: parsed.error.issues[0]?.message ?? "Invalid update payload",
      });
      return;
    }
    try {
      const finding = await service.update(
        DEFAULT_CUSTOMER_ID,
        req.params.id,
        parsed.data
      );
      if (!finding) {
        res.status(404).json({ error: "Finding not found" });
        return;
      }
      res.json(finding);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/findings/:id", async (req, res, next) => {
    try {
      const deleted = await service.delete(DEFAULT_CUSTOMER_ID, req.params.id);
      if (!deleted) {
        res.status(404).json({ error: "Finding not found" });
        return;
      }
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  return router;
}
