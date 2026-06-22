# Draft findings persist on the client, not the server

Suggested (draft) findings returned by `/analyze` are persisted in the browser
(`localStorage`, via TanStack Query's persistence) so they survive a page refresh or
browser close — but they are **never persisted server-side**. Accept = `POST /findings`;
reject = drop from `localStorage`.

## Why client-side and not a server table

The spec is explicit: "Suggested findings are drafts only. They are not persisted by
`/analyze`." The reason is the gatekeeper principle — un-reviewed model output must not
become stored findings (note the `draft` value of `Finding.status` is for a *persisted*
finding the reviewer saved, a different concept from an un-accepted machine suggestion).
Persisting drafts server-side (a `draft_findings` table, or findings rows with
`status: "draft"`) would either cross that line or add new endpoints and lifecycle we
weren't asked for.

The detail that makes client-side persistence sufficient: the expensive part of analysis —
the **observations** — is already persisted server-side (ADR-0002). A draft finding is just
a lightweight proposal (title, severity, summary, a list of observation IDs) over data that
still exists. So we never risk losing the analysis work, only the grouping suggestion — and
that we keep on the client.

This honors the spec (the server stays a pure gatekeeper; `localStorage` is a client
convenience cache, not stored findings), solves the "lost my drafts to an accidental
refresh" UX problem, and adds zero tables and zero endpoints.

## Consequences

- A re-analyze can delete observations a stale `localStorage` draft still references
  (reference-counted cleanup, ADR-0002). Handled gracefully: **`POST /findings` validates
  that every `relatedObservationId` still exists** and rejects with a clear error
  otherwise — a stale draft fails cleanly on accept rather than corrupting anything.
- Drafts are per-browser, not shared across devices or reviewers — acceptable for a
  single-reviewer PoC.
