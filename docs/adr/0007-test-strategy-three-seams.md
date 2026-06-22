# Test strategy: three seams, each covering what the others can't

Tests are split across three seams, deliberately chosen so each proves a graded behavior
no other seam can reach:

1. **Zod unit (Vitest)** — the `/analyze`-output schema rejects malformed payloads
   (missing field, bad enum, `confidence` out of 0–1, dangling observation reference,
   non-JSON) and accepts valid ones. This is the spec's explicitly named, graded behavior.
2. **API integration (Vitest + supertest)** — drives the Express app over HTTP against a
   fresh temp SQLite file per run: findings CRUD (`PATCH` bumps `updatedAt`), the
   persistence proxy (write via API → reopen repository → data present), and `/analyze`
   happy path with OpenRouter mocked. The workhorse suite — fast, offline, no key.
3. **One Playwright E2E** — edits a finding in the real UI, reloads the page, and asserts
   the change persisted (plus that loading and error states render).

## Why a whole Playwright toolchain for essentially one test

The bug the spec actively probes — "edit a finding, refresh, the old value comes back" — is
a **frontend cache-coherence** bug living in TanStack Query invalidation. The API
integration test proves persistence at the *repository* seam but cannot see the React
layer; only a real-browser test can prove the refresh actually shows server truth. It is
the single most-probed graded behavior, so it earns the one heavyweight seam.

It is kept to one (maybe two) tests on purpose: Playwright is slow and flaky if overused,
so supertest remains the workhorse for CRUD/validation. The crown-jewel flow deliberately
**does not exercise `/analyze`** (seed/POST a finding, then edit→refresh), so E2E needs no
OpenRouter key.

## Consequences

- `pnpm test` runs the fast unit/integration suite (dependency-light, the default for
  graders); `pnpm test:e2e` runs Playwright (requires `playwright install`). Playwright's
  `webServer` config auto-starts client + server.
- The integration suite uses a temp DB file (not `:memory:`) so the "reopen → data
  persists" assertion is meaningful against the real driver.
