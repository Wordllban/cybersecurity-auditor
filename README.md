# Hibit AI Assessment Workspace

A product slice that takes a security reviewer through the **evidence → observation →
finding** pipeline for demo customer **Hibit**. Preloaded customer files become evidence
items; `POST /analyze` extracts structured observations and proposes draft findings; the
reviewer edits, accepts, rejects, and deletes findings, and everything survives a refresh.

Domain language lives in [`CONTEXT.md`](CONTEXT.md); every design decision is recorded in
[`docs/DECISIONS.md`](docs/DECISIONS.md) with deeper rationale in [`docs/adr/`](docs/adr/).

---

## How to run

Prereqs: **Node ≥ 20** (the npm scripts use Node's native `--env-file-if-exists`, so 20.6+;
developed on Node 24) and **pnpm** (`corepack enable` if you don't have it).

**One command** — bootstrap and run everything:

```bash
pnpm start            # checks pnpm, creates .env, installs deps, runs server + client
```

`pnpm start` (`scripts/dev-up.sh`) is idempotent: it only creates `.env` and installs deps
when missing, so re-runs go straight to launching the **server on :4000** and **client on
:5173** (Vite prints the URL). Or do it by hand:

```bash
pnpm install          # install the workspace
pnpm dev              # server on :4000, client on :5173
```

Open the client URL. The database auto-seeds on first boot (7 Hibit markdown files become
evidence), so the **Evidence** and **Observations** workspaces have data immediately — no
key, no extra steps.

Other commands:

```bash
pnpm seed             # re-seed manually (idempotent, keyed by sourceFileName)
pnpm test             # unit + API integration (Vitest + supertest) — no key, no browser
pnpm test:e2e         # one Playwright E2E (installs Chromium on first run, see below)
pnpm typecheck        # tsc across all packages
pnpm build            # build server + client
```

For `pnpm test:e2e` you need the Playwright browser once:

```bash
pnpm --filter @hibit/client exec playwright install chromium
```

### Environment & secrets

The app **boots and runs without any secrets**. A key is only needed to run `POST /analyze`
against a real model (ADR-0004).

Copy [`.env.example`](.env.example) to `.env` (repo root _or_ `server/`) and fill it in:

```bash
cp .env.example .env
```

| Variable             | Required            | Purpose                                                |
| -------------------- | ------------------- | ------------------------------------------------------ |
| `OPENROUTER_API_KEY` | only for `/analyze` | OpenRouter key — get one at https://openrouter.ai/keys |
| `OPENROUTER_MODEL`   | no                  | Model id (default `openai/gpt-oss-120b:free`)          |
| `PORT`               | no                  | API port (default `4000`)                              |
| `DATABASE_PATH`      | no                  | SQLite file path (default `./data/hibit.db`)           |

`.env` is **gitignored and never committed** — only `.env.example` is tracked. Env files
are loaded via Node's native `--env-file-if-exists`; real shell/CI env vars take precedence.
The client reads `VITE_API_URL` (defaults to `http://localhost:4000`).

**No key?** Every GET endpoint and all three workspaces work on stored data. Only `/analyze`
fails, and it fails loudly: a missing/invalid key returns `503` and the UI renders an
unmistakable error with a manual retry — nothing in the store is touched.

---

## Stack

- **Monorepo:** pnpm workspaces — `client/`, `server/`, `packages/shared/`.
- **Backend:** Express + TypeScript, layered `routes → services → repository`.
- **Frontend:** Vite + React + TypeScript, **MUI**, **TanStack Query** (server state,
  loading/error, mutation + invalidation) + **TanStack Router** (type-safe navigation).
- **Validation:** **Zod**, schemas in `packages/shared` as the single source of truth
  (entity types via `z.infer`, consumed as raw TS — no build step).
- **Persistence:** **SQLite** (`better-sqlite3`) behind an async repository interface.
- **AI:** OpenRouter (provider-agnostic) for `/analyze`.
- **Tests:** Vitest (unit), Vitest + supertest (API integration), Playwright (one E2E).

NestJS was rejected as overkill and as friction against the required Zod validation; TanStack
AI was cut (no chat/streaming surface). Rationale in `docs/DECISIONS.md`.

---

## What works

- **Evidence workspace** — all 7 preloaded Hibit files as evidence items (name, source type,
  preview); click through to a detail page with full text, extracted observations, and the
  findings that cite the item.
- **Observation workspace** — every observation with text, type, confidence, framework area,
  and a link back to its source evidence.
- **Findings workspace** — list + detail with title, severity, status, summary, related
  observations and evidence (linked), suggested remediation, confidence, and timestamps.
- **`POST /analyze`** — sends evidence to the model, Zod-validates the output, persists
  observations, and returns **draft findings** (never persisted server-side).
- **Reviewer actions** — edit, change status, accept a draft (`POST /findings`), reject a
  draft, delete a finding. Loading and error states throughout.
- **Persistence across refresh** — persisted findings are server-backed; **draft** findings
  survive refresh via `localStorage` (TanStack Query persistence).
- **Tests** — 33 unit/integration tests + 3 Playwright E2E specs, all green. The E2E proves
  the graded behavior: _edit a finding → reload → the edit persists_ (plus loading/error).

## What doesn't / known limitations

- **No optimistic updates.** Mutations `PATCH`/`DELETE` then `invalidateQueries`; the server
  stays the single source of truth. This is deliberate — optimistic-without-rollback is the
  footgun behind the "stale after refresh" bug class the spec probes (see "improve next").
- **No auto-retry** on `/analyze` failures — the UI offers a manual retry instead.
- **Confidence is model-self-reported**, not calibrated; Zod only enforces the `0–1` range.
- **Single customer** (`hibit`), seeded. Multi-tenant isolation is out of scope (below).

---

## What was cut from the spec, and why

Scope discipline is graded, so these are deliberate:

- **Binary artifacts (`.docx`/`.pptx`/`.xlsx`/`.pdf`).** ~4 parsing libraries for low
  marginal value — the 7 markdown files already exercise every observation type and the
  cross-source contradictions. Explicitly optional in the spec. (ADR-0001)
- **File upload.** The spec accepts a documented preload; a committed seed manifest keeps the
  app self-contained and reproducible on a grader's machine.
- **Multi-tenancy / auth.** `customerId` is threaded through every query and derived
  server-side (never trusted from the client), so the seam exists — but isolation, authz, and
  tenancy are deferred to the live session per the spec.
- **Concurrent edits / optimistic updates.** Last-write-wins; no conflict handling. The spec
  raises concurrent-edit handling as a _live discussion_ topic, not a written deliverable.
- **Real Firestore adapter.** Building one needs cloud creds or the emulator toolchain just
  to see data — the external dependency SQLite deliberately avoids. The spec asks for a
  _migration plan_, not a deployment (below).

---

## Architecture

```
packages/shared   Zod schemas + z.infer types  ── single source of truth
        │  (imported by both server and client as raw TS)
        ▼
server  routes ──► services ──► repository ──► SQLite (better-sqlite3)
         (HTTP)   (lifecycle    (CRUD only,     │
                   rules)        no SQL leaks)   │  llm/  → OpenRouter (/analyze)
        ▲
        │  REST (JSON; ApiError carries status + code)
        ▼
client  TanStack Router (pages) ──► TanStack Query (server state)
                                     └─ localStorage persistence (draft findings only)
```

Key decisions (full set in `docs/DECISIONS.md`):

- **Three layers, cardinality enforced.** One evidence item → many observations; one
  observation cites exactly one evidence item; one finding groups ≥1 observation.
  `contradiction` is not an observation type — contradictions surface at the finding level.
- **`relatedEvidenceIds` is derived, never stored** — computed from the related observations'
  `evidenceId` (each cites one item), so cardinality stays honest automatically.
- **`relatedObservationIds` is a `finding_observations` join table** — makes "which findings
  reference this observation?" cheap, which the reference-counted deletes need (and maps
  directly to a Firestore `array-contains` index after migration).
- **`/analyze` is the only validation boundary** (ADR-0003). Two schemas: the model returns
  **content only** (throwaway local keys, never real ids/timestamps); after Zod passes, the
  server mints ids, persists observations, and rewrites the drafts' references. Parse/Zod
  failure → reject, persist nothing, `422`.
- **Failure taxonomy** (ADR-0004): no/invalid key → `503`; upstream down/timeout/5xx/429 →
  `502`; unparseable/invalid output → `422`. The store is left untouched in every case.
- **Observation lifecycle** (ADR-0002): `/analyze` persists observations but not findings;
  re-analyze refreshes an item's observations _except those a persisted finding cites_;
  deleting a finding removes its observations _only if no other finding references them_
  (reference-counted, transactional).

### `/analyze` implementation (Option A — real model)

- **Prompts** are built in `server/src/llm/prompt.ts`: a system message fixes the
  observation taxonomy and the exact JSON shape; the user message lists each evidence item
  labeled with a `ref` the model must cite. `response_format: json_object` is requested.
- **Validation:** strip any fences → `JSON.parse` → **Zod is the real gate**. The LLM-output
  schema is distinct from the storage schema.
- **No corruption:** validation runs _before any write_; on any failure nothing is persisted
  and a specific HTTP status is returned. Server mints all ids and timestamps.

### Persistence choice

**SQLite, file-based, behind an async (`Promise`-returning) repository interface** (ADR-0005).
Chosen over Firestore-from-the-start for a **zero-setup local run** — the spec says graders
run the app on their own machines, and SQLite needs no cloud creds or emulator. The interface
is async despite the synchronous driver so a Firestore swap touches **only the repository
implementations**, never services or routes. Services hold the lifecycle rules; no SQL leaks
past the repository.

Current schema: `evidence`, `observations`, `findings`, and the `finding_observations` join
table, with indexes on the foreign keys and customer scoping.

---

## Firestore migration plan

The async repository is the only seam that changes — swap the SQLite implementations for
Firestore ones; services and routes are untouched.

### Collections

| Collection     | Document id | Fields                                                                                                                          |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `evidence`     | `id`        | `customerId, sourceFileName, sourceType, contentPreview, fullText, uploadedAt`                                                  |
| `observations` | `id`        | `customerId, evidenceId, text, observationType, confidence, relatedFrameworkArea`                                               |
| `findings`     | `id`        | `customerId, title, severity, status, summary, suggestedRemediation, confidence, relatedObservationIds[], createdAt, updatedAt` |

### Document modeling

- **Flat top-level collections**, every document carrying `customerId` (mirrors today's
  scoping; the simplest base for the security-rule discussion in the live session).
  Alternatively, tenant-rooted subcollections (`customers/{id}/findings/...`) make isolation
  fall out of the path — a live-session tradeoff.
- **`relatedObservationIds` becomes an array field on the finding document** (replacing the
  SQL join table). This is what powers the reference-counted delete via `array-contains`.
- **`relatedEvidenceIds` stays derived** at read time from the related observations — not
  stored, exactly as today.
- The reference-counted delete becomes a **batched write / transaction** (the async interface
  lets each implementation own its transaction strategy).

### Indexes

- **`findings` where `array-contains` `relatedObservationIds` + `customerId` equality** — a
  single composite index. This is the one non-trivial index: it answers "which findings
  reference this observation?", the query the reference-counted delete depends on.
- Single-field indexes (automatic in Firestore) cover the equality filters that are explicit
  indexes in SQLite today: `observations.evidenceId`, `observations.customerId`,
  `findings.customerId`.
- `evidence` `(customerId, sourceFileName)` composite to preserve the uniqueness/idempotent-
  seed guarantee SQLite enforces with a `UNIQUE` constraint (enforce in a transaction, since
  Firestore has no unique constraints).

Security rules and tenancy are intentionally a **live-session discussion**, per the spec.

---

## What I'd improve next

- **Optimistic updates with rollback** for edits/deletes — snappier UI without reintroducing
  the stale-after-refresh bug class (the reason they were cut for the PoC).
- **Concurrent-edit handling** — `updatedAt` precondition / version check so a second
  reviewer's stale write is rejected rather than silently winning.
- **Real multi-tenant isolation** — auth + per-customer authorization, and the tenant-rooted
  collection layout above.
- **Bounded backoff retry** on `502`/`429` from OpenRouter (the PoC does manual retry only).
- **Binary artifact ingestion** and **file upload** if the product needs sources beyond the
  curated markdown set.
- **Richer finding editing** — inline observation re-grouping from the finding detail page.

---

## Tests

Three seams (ADR-0007), the highest point that can observe each behavior:

- **Zod unit** (Vitest) — schema accept/reject for the `/analyze` contract.
- **API integration** (Vitest + supertest, fresh temp SQLite per run, OpenRouter mocked) —
  endpoint behavior including the reference-counted delete and persistence across DB reopen.
- **One Playwright E2E** — _edit finding → reload → persists_ plus loading/error states, the
  cache-coherence behavior no lower seam can reach.

`pnpm test` runs the fast suites (no key, no browser); `pnpm test:e2e` runs Playwright.

See also [`AI_USAGE.md`](AI_USAGE.md) for how AI was used, verified, and where it was wrong.
