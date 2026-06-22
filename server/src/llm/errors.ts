/**
 * Analyze failure taxonomy (ADR-0004). Each maps to a distinct HTTP status so the
 * client can render a specific, actionable error state. In every case the store is
 * left untouched.
 */

/** Caller asked to analyze evidence that does not exist. -> HTTP 400. */
export class AnalyzeBadRequestError extends Error {
  readonly kind = "bad_request" as const;
}

/** Missing/invalid OpenRouter key — a setup problem. -> HTTP 503. */
export class AnalyzeConfigError extends Error {
  readonly kind = "config" as const;
}

/** Upstream unavailable: timeout, network error, OpenRouter 5xx/429. -> HTTP 502. */
export class AnalyzeUpstreamError extends Error {
  readonly kind = "upstream" as const;
}

/** Model returned unparseable or schema-invalid output. -> HTTP 422. Nothing persisted. */
export class AnalyzeInvalidOutputError extends Error {
  readonly kind = "invalid_output" as const;
}
