#!/usr/bin/env bash
#
# One-command bootstrap + run for the Hibit AI assessment workspace.
# Verifies pnpm, creates .env from the template, installs deps if needed,
# then spins up the server (:4000) and client (:5173) together.
#
# Usage: pnpm start   (or: bash scripts/dev-up.sh)
set -euo pipefail

# Resolve repo root regardless of where the script is invoked from.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

info() { printf '\033[1;36m▶ %s\033[0m\n' "$1"; }
warn() { printf '\033[1;33m⚠ %s\033[0m\n' "$1"; }

# 1. Node version — scripts rely on Node's native --env-file-if-exists (>= 20.6).
if command -v node >/dev/null 2>&1; then
  NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
  if [ "$NODE_MAJOR" -lt 20 ]; then
    warn "Node $(node -v) detected; this project needs Node >= 20.6. Continuing anyway."
  fi
else
  warn "Node not found on PATH. Install Node >= 20.6: https://nodejs.org"
  exit 1
fi

# 2. pnpm — enable via corepack if it isn't already available.
if ! command -v pnpm >/dev/null 2>&1; then
  info "pnpm not found — enabling via corepack…"
  corepack enable >/dev/null 2>&1 || {
    warn "Could not enable pnpm automatically. Install it: https://pnpm.io/installation"
    exit 1
  }
fi

# 3. Environment — create .env from the template on first run. The app boots
#    without a key; only POST /analyze needs OPENROUTER_API_KEY.
if [ ! -f .env ]; then
  cp .env.example .env
  info "Created .env from .env.example."
  warn "Add OPENROUTER_API_KEY to .env to enable POST /analyze (optional — everything else works without it)."
fi

# 4. Dependencies — install only when missing so re-runs are fast.
if [ ! -d node_modules ]; then
  info "Installing dependencies…"
  pnpm install
fi

# 5. Run. The database auto-seeds on first boot, so the workspaces have data
#    immediately. `pnpm dev` runs server + client in parallel.
info "Starting server (:4000) and client (:5173) — Vite will print the client URL."
exec pnpm dev
