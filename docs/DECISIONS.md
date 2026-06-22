# Decisions — Hibit AI Assessment Workspace

A single record of the design decisions made during the grilling session for the PRD
([issue #1](https://github.com/Wordllban/cybersecurity-auditor/issues/1)). Each decision
links to its ADR where one exists. Domain vocabulary lives in [`/CONTEXT.md`](../CONTEXT.md).

## Stack & structure

- **Backend:** Express + TypeScript, layered `routes → services → repository`. NestJS
  rejected as overkill for the scope and as friction against the required Zod validation.
- **Frontend:** Vite + React + TypeScript, **TanStack Query** (server state, loading/error,
  mutation + invalidation) + **TanStack Router** (type-safe navigation) + **MUI**.
  TanStack AI considered and cut — no streaming/chat surface, and OpenRouter already provides
  provider-agnosticism.
- **Monorepo:** pnpm workspaces — `client/`, `server/`, `packages/shared/`. `shared` holds
  the entity Zod schemas + `z.infer` types, consumed as raw TS (no build step). Apps live at
  the root; the shared library lives under `packages/`.
- **Validation:** Zod, schemas as the single source of truth (TS types via `z.infer`).

## Domain model

- **Evidence item = one whole preloaded file** (PoC). Citation precision is carried on
  `Observation.text`. → [ADR-0001](adr/0001-evidence-item-granularity.md)
- **Three layers, cardinality enforced:** one evidence item → many observations; one
  observation cites exactly one evidence item; one finding groups ≥1 observation.
  `contradiction` is not an observation type — contradictions surface at the finding level.

## Observation persistence & lifecycle → [ADR-0002](adr/0002-observation-persistence-lifecycle.md)

- `/analyze` **persists observations** but **does not persist findings** (returns drafts).
- **Validate-before-write:** Zod validates the entire analyze payload before any observation
  is written — never a partial/invalid batch.
- **Re-analyze** deletes an evidence item's observations *not referenced by any persisted
  finding*, then inserts fresh — no duplicate buildup, no orphaning of grouped observations.
- **Finding deletion** removes its observations *only if no other finding references them*
  (reference-counted); shared observations survive.

## The /analyze validation boundary → [ADR-0003](adr/0003-analyze-validation-boundary.md)

- Zod validation is **confined to `/analyze`** — the only untrusted input and the only
  validation the spec grades. Other endpoints get light/no validation.
- **Two schemas:** the LLM-output schema (validated) is distinct from the storage schema.
  The model returns **content only** — never `id`, `customerId`, `evidenceId`, or timestamps.
- **Server-owned IDs (Option B):** observations carry throwaway local keys; draft findings
  group by those keys; after Zod passes, the server mints real IDs, persists, and rewrites
  the drafts' `relatedObservationIds`. Rejected the "model supplies IDs" option because it
  makes `/analyze` *less* reliable and entangles identity with the prompt.
- **JSON extraction:** request `response_format: json_object`, strip fences, `JSON.parse`,
  then Zod is the real gate. Parse/Zod failure → reject, persist nothing, clear error.
- **Confidence:** Zod enforces 0–1; otherwise trusted as model-self-reported (not calibrated).

## LLM failure handling & no-key degradation → [ADR-0004](adr/0004-analyze-failure-handling-and-no-key-degradation.md)

- App **boots and runs without an OpenRouter key** — all GETs and workspaces work on stored
  data; only `/analyze` needs a key.
- **Error taxonomy:** missing/invalid key → `503` (must be **visually unmistakable** in the
  UI); upstream down/timeout/5xx/429 → `502`; unparseable/Zod-invalid output → `422`. Store
  untouched in all cases; UI offers manual retry.
- **No auto-retry** in the PoC (production: bounded backoff on `502`/`429` only). Timeout ~60s.
- Model env-configurable via `OPENROUTER_MODEL`.

## Persistence → [ADR-0005](adr/0005-sqlite-behind-async-repository.md)

- **SQLite** (file-based) behind an **async repository interface** (`Promise`-returning even
  though the driver is sync) so a Firestore swap touches only repo implementations.
- Chosen over Firestore-from-start for **zero-setup local run** (graders run on their own
  machines); the spec accepts SQLite and defers tenancy/security to the live session.
- **Thin repos** (CRUD + `findFindingsReferencingObservation`); **services hold lifecycle
  rules**. No SQL leaks past the repository.
- Firestore migration documented (collections, modeling, `array-contains` index).

## Draft finding persistence → [ADR-0006](adr/0006-client-side-draft-finding-persistence.md)

- Draft findings persist **client-side** (`localStorage` via TanStack Query) so they survive
  refresh/browser-close — but are **never persisted server-side** (the server stays a pure
  gatekeeper). Observations (the expensive part) are already server-persisted.
- Accept = `POST /findings` (server validates all `relatedObservationIds` still exist);
  reject = drop from `localStorage`.

## Frontend data flow

- **Server is the single source of truth.** Mutations call `PATCH`/`DELETE` then
  `invalidateQueries`. **No optimistic updates** in the PoC — they're the footgun behind the
  "stale after refresh" bug class the spec probes. (Optimistic-with-rollback → "improve next.")
- **Draft findings = ephemeral-but-client-persisted** (above). "Preserve data after refresh"
  means persisted findings survive (server-backed); drafts persist via localStorage.

## Testing → [ADR-0007](adr/0007-test-strategy-three-seams.md)

- **Three seams:** Zod unit (Vitest) · API integration (Vitest + supertest, fresh temp SQLite
  file per run, OpenRouter mocked) · **one Playwright E2E** (edit finding → reload → persists,
  + loading/error states) for the frontend cache-coherence behavior no other seam can reach.
- `pnpm test` = fast unit/integration (default, no key/browser); `pnpm test:e2e` = Playwright.

## Ingestion / seeding

- **Preload all 7 markdown files** (3 policies → `policy`, 3 interviews → `interview`, IR plan
  → `other`) — they cover every observation type and the cross-source contradictions.
- Seed data **committed** under `server/seed/data/` with a `filename → sourceType` manifest;
  app is self-contained.
- **Auto-seed-if-empty on startup** (idempotent, keyed by `sourceFileName`) **and** a
  `pnpm seed` command.
- **Binary artifacts** (`.docx`/`.pptx`/`.xlsx`/`.pdf`) **out of scope**: high parsing cost
  (~4 libraries), low marginal value (markdown already covers the pipeline), explicitly
  optional per spec, and a poor fit for whole-file granularity. → [ADR-0001](adr/0001-evidence-item-granularity.md)

## Micro-decisions

- **IDs:** `crypto.randomUUID()`, server-generated.
- **Timestamps:** ISO-8601 strings, server-set (`createdAt` on insert, `updatedAt` on write).
- **`customerId`:** single seeded `"hibit"`; every query scoped by it; derived server-side,
  never trusted from the client.
- **`PATCH /findings/:id`:** partial update, always bumps `updatedAt`; status change is a PATCH.
- **Editable finding fields:** `title`, `severity`, `summary`, `suggestedRemediation`,
  `status`. Read-only: `id`, `customerId`, timestamps, `confidence`, relation arrays.
- **`relatedEvidenceIds`:** derived from related observations at accept time (each observation
  cites one evidence item) — keeps cardinality honest automatically.
