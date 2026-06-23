---
name: run-project
description: Set up and run the Hibit AI assessment workspace locally with one command. Use when the user wants to start, boot, spin up, set up, or run the project (server + client together), or asks how to get it running.
---

# Run the Hibit AI Assessment Workspace

This monorepo (pnpm workspaces: `client/`, `server/`, `packages/shared/`) spins up
with a single command. The database auto-seeds on first boot, so the workspaces have
data immediately and **no OpenRouter key is required** — only `POST /analyze` needs one.

## The one command

```bash
pnpm start
```

This runs `scripts/dev-up.sh`, which:

1. Checks Node (>= 20.6 — needed for native `--env-file-if-exists`) and pnpm
   (enables it via `corepack` if missing).
2. Creates `.env` from `.env.example` on first run (never overwrites an existing one).
3. Runs `pnpm install` only if `node_modules` is absent.
4. Starts the **server on `:4000`** and the **client on `:5173`** in parallel
   (`pnpm dev`). Vite prints the client URL.

Stop everything with `Ctrl-C`.

## When the user asks to run/start the project

1. From the repo root, run `pnpm start` (background it if you need the terminal back).
2. Tell the user the client URL (`http://localhost:5173`) and that the API is on `:4000`.
3. If they want `POST /analyze` to work, point them to `.env` and the `OPENROUTER_API_KEY`
   line (get a key at https://openrouter.ai/keys). Everything else works without it.

## Optional follow-ups

- `pnpm seed` — re-seed the database manually (idempotent).
- `pnpm test` — unit + API integration (no key, no browser).
- `pnpm test:e2e` — Playwright E2E. First run needs the browser once:
  `pnpm --filter @hibit/client exec playwright install chromium`.
- `pnpm build` / `pnpm typecheck` — build / type-check all packages.

## Notes

- `.env` is gitignored — never commit it. Only `.env.example` is tracked.
- Default model is `openai/gpt-oss-120b:free` (`OPENROUTER_MODEL` in `.env`).
- Full setup, architecture, and the Firestore migration plan live in `README.md`.
