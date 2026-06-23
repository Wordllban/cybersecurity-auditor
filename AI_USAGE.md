# AI usage

## Tools used

- **Tool:** Claude Code (Opus), used as the primary build agent end to end.
  - **Where it helped:** Driving a disciplined workflow — a structured grilling/domain-
    modeling pass that produced `CONTEXT.md` (the domain glossary) and `docs/DECISIONS.md`
    - ADRs _before_ any code, then one vertical slice per branch/PR (evidence → observations
      → analyze → findings → persistence → tests → docs). It was strong at boilerplate with
      sharp edges: the layered `routes → services → repository` wiring, the Zod schemas in
      `packages/shared`, the `finding_observations` join modeling, and the supertest
      integration tests.
  - **Where it failed or needed correction:** A handful of real corrections — see below.

- **Tool:** Context7 (live library docs), pulled in on demand.
  - **Where it helped:** Verifying current TanStack Query persistence APIs
    (`PersistQueryClientProvider`, `createSyncStoragePersister`, selective `shouldDehydrate
Query`) against the actual current docs rather than training-data memory.
  - **Where it failed or needed correction:** N/A — used only to confirm API surface.

## Best AI-assisted moment

- **What problem I gave the tool:** "Make findings survive a page refresh, and prove it with
  a test." The subtlety: persisted findings are server-backed, but _draft_ findings only
  exist client-side and must also survive refresh — without persisting drafts to the server
  (the server stays a pure gatekeeper).
- **How I evaluated the answer:** I checked it against the bug class the spec explicitly
  probes ("after editing and refreshing, the old value comes back"). The right design has to
  (a) persist only drafts to `localStorage`, never server-owned queries, and (b) keep edits
  server-authoritative via `invalidateQueries` rather than optimistic cache writes. I
  verified the selective-dehydration config against Context7's current TanStack docs, then
  wrote a Playwright E2E that edits a finding, reloads, and asserts the edit persists — the
  exact behavior no unit/integration seam can observe.
- **What I changed manually:** Tightened the dehydration predicate to persist _only_ the
  draft-findings query key (the first cut would have persisted server data too, reintroducing
  staleness). I also fixed a Playwright glob that intercepted the SPA document navigation —
  guarded the route mock with `resourceType() === "document"` so only the API fetch is
  delayed/failed, not the page load.

## Verification

- **What I tested myself:** Ran the full suite at each slice (33 unit/integration tests +
  3 Playwright E2E, all green), `pnpm typecheck`, and the production `pnpm build`. Manually
  exercised the no-key path (every GET and all three workspaces work; `/analyze` returns a
  loud `503`) and the refresh behavior in the browser.
- **What I refused to trust from the tool:** Anything touching secrets or untrusted input.
  I confirmed `.env` is gitignored and only `.env.example` is committed. I treated the
  `/analyze` Zod boundary as non-negotiable — the model returns _content only_, the server
  mints all ids/timestamps, and validation runs before any write so malformed output can
  never corrupt the store. I also caught and fixed a real runtime defect the agent left: the
  `.env` file was never actually loaded (no dotenv / `--env-file`), so the key was silently
  ignored until I switched the scripts to Node's native `--env-file-if-exists`.
- **What I'd inspect more deeply in production:** Multi-tenant isolation and authorization
  (today `customerId` is single-seeded and server-derived — the seam exists but the rules
  don't); concurrent-edit conflict handling (currently last-write-wins); and the model's
  self-reported `confidence`, which Zod only range-checks and is not calibrated. I would also
  add bounded backoff retry on transient OpenRouter failures before relying on `/analyze`
  under load.
