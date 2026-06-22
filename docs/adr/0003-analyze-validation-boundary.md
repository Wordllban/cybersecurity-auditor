# The /analyze validation boundary

Runtime validation with Zod is confined to **one place — the `/analyze` response** —
because that is the only untrusted input in the system and the only validation the
assignment names and grades ("reject malformed analysis output before it touches stored
data"). Other endpoints get light or no schema validation; gold-plating every endpoint
would be scope we were not asked for.

At that boundary the model produces **content only, never identity or tenancy**:

- **Two schemas, not one.** The LLM-output schema (what we validate the model response
  against) is distinct from the storage schema (the spec's `EvidenceItem` / `Observation`
  / `Finding`). The model never returns `id`, `customerId`, `evidenceId`, or timestamps —
  the server stamps all of those.
- **Server-owned IDs via correlation keys (Option B).** Observations in the model output
  carry a throwaway local key (`"1"`, `"2"`, …); draft findings group by those keys. After
  Zod passes, the server mints real observation IDs, persists, builds a
  `localKey → realId` map, and rewrites the draft findings' `relatedObservationIds` to real
  IDs before returning. The returned drafts are therefore valid input to `POST /findings`.
- **JSON extraction.** Request JSON from OpenRouter (`response_format: json_object`) to
  bias toward well-formed output, strip markdown fences defensively, `JSON.parse`, then Zod
  is the real gate — `response_format` is never trusted on its own. Parse failure or Zod
  failure → reject, persist nothing, return a clear error.
- **Confidence** is enforced by Zod to be 0–1 but is otherwise trusted as a
  model-self-reported value; it is not calibrated, and that is documented for the reviewer.

## Why not let the model supply IDs (the rejected "simple" option)

It looks simpler (one schema, no remap) but the simplicity is largely an illusion:

- It asks the model to do reliable unique-ID generation and cross-referencing — something
  LLMs are bad at — so malformed references make the *whole* `/analyze` call fail Zod more
  often. The graded behavior (`/analyze` reliability) gets *worse*.
- A within-response uniqueness check can't prevent cross-run collisions (models reliably
  re-emit `obs-1`, `obs-2`), so ID handling just relocates to insert-conflict handling.
- Persistence identity becomes entangled with the prompt, complicating the Firestore
  migration and the multi-tenancy story (guessable, model-controlled IDs).

The remap (~5–8 lines) costs about the same as the conflict-handling the simple path would
need, while removing those failure modes — so Option B is the more robust choice at
comparable effort.
