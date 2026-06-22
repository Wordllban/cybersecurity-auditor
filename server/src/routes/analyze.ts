import { Router } from "express";
import { analyzeRequestSchema } from "@hibit/shared";
import { DEFAULT_CUSTOMER_ID } from "../config";
import type { AnalyzeService } from "../services/analyzeService";
import {
  AnalyzeBadRequestError,
  AnalyzeConfigError,
  AnalyzeInvalidOutputError,
  AnalyzeUpstreamError,
} from "../llm/errors";

export function analyzeRouter(service: AnalyzeService): Router {
  const router = Router();

  router.post("/analyze", async (req, res) => {
    const parsed = analyzeRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ code: "bad_request", error: "evidenceIds must be a non-empty array" });
      return;
    }

    try {
      const result = await service.analyze(DEFAULT_CUSTOMER_ID, parsed.data.evidenceIds);
      res.json(result);
    } catch (err) {
      if (err instanceof AnalyzeBadRequestError) {
        res.status(400).json({ code: err.kind, error: err.message });
      } else if (err instanceof AnalyzeConfigError) {
        res.status(503).json({ code: err.kind, error: err.message });
      } else if (err instanceof AnalyzeUpstreamError) {
        res.status(502).json({ code: err.kind, error: err.message });
      } else if (err instanceof AnalyzeInvalidOutputError) {
        res.status(422).json({ code: err.kind, error: err.message });
      } else {
        console.error("[server] /analyze unexpected error:", err);
        res.status(500).json({ code: "internal", error: "Internal server error" });
      }
    }
  });

  return router;
}
