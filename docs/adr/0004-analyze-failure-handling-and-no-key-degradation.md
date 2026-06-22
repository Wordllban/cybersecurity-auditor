# /analyze failure handling and no-key degradation

The app **boots and runs without an OpenRouter API key**. Every `GET` endpoint and all
three workspaces work against stored/seeded data; only `POST /analyze` requires a key.
We chose graceful degradation over refuse-to-start so graders can run the whole app,
see preloaded evidence and seeded findings, and only need a key to exercise *live*
analysis.

`/analyze` failures map to distinct HTTP statuses so the UI can render a specific,
actionable error state rather than a generic one:

- **Missing / invalid key → `503`** — message "OpenRouter API key not configured —
  set `OPENROUTER_API_KEY` to run analysis." This case must be **visually unmistakable
  and distinct** from a transient failure; it is a setup problem, not the reviewer's
  fault, and tells the grader exactly what to do.
- **Upstream down / timeout / OpenRouter 5xx / 429 → `502`** — "analysis temporarily
  unavailable, retry."
- **Unparseable or Zod-invalid model output → `422`** — "analysis produced invalid
  output." Nothing is persisted (see ADR-0003).

In every case the store is untouched and the UI offers a manual retry.

## Consequences

- **No automatic server-side retry in the PoC** — fail fast, surface the error, let the
  reviewer retry from the UI. Production would add bounded retry with backoff on the
  transient class (`502`/`429`) only — never on `422`, since retrying invalid output just
  burns tokens.
- Request timeout ~60s (LLM latency; short timeouts cause false failures).
- Model is env-configurable (`OPENROUTER_MODEL`), defaulting to a capable
  instruction-following model for structured extraction.
