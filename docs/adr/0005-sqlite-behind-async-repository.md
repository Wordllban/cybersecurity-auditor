# SQLite behind an async repository interface

Persistence is SQLite (file-based), accessed only through an **async repository
interface** — `Promise`-returning methods even though the SQLite driver is synchronous.
A Firestore migration is documented (collections, modeling, indexes) but not built.

## Why SQLite and not Firestore from the start

The deciding factor is the spec's "we will run the app on our own machines using your
documented setup." SQLite runs with **zero external setup** (`pnpm install && pnpm dev`,
file-based). Firestore would require either provisioned cloud credentials/secrets or the
emulator toolchain (Java + firebase-tools) just to see any data — re-introducing the hard
external dependency we deliberately avoided for OpenRouter (see ADR-0004). The spec lists
SQLite as acceptable, asks for a migration plan *only if not using Firestore*, and says
the security/tenancy aspects of the migration are discussed **live, not in writing** — so
the intended deliverable is a credible plan plus a conversation, not a finished Firestore
deployment. Building a real Firestore adapter too would be the scope creep the assignment
warns against (the 6-hour negative signal).

## Why the interface is async despite a synchronous driver

`better-sqlite3` is synchronous; Firestore is asynchronous. If repository methods returned
values directly, a Firestore swap would force an async rewrite up through every service.
Returning `Promise`s now means the migration touches **only the repository
implementations**, never the services or the API. This is the single detail that makes the
abstraction a genuine drop-in seam rather than a hopeful one.

## Structure

- **Thin repositories** expose per-entity CRUD plus one non-CRUD primitive:
  `findFindingsReferencingObservation(id)` — a SQL `WHERE`/join today, a Firestore
  `array-contains` query (one composite index) after migration.
- **Services hold the lifecycle rules** (the reference-counted deletes and re-analyze
  refresh from ADR-0002), orchestrating repositories. No SQL leaks past the repository
  layer.

## Consequences

- The reference-counted delete should be transactional; trivial in SQLite, a transaction /
  batched write in Firestore. The async interface lets each implementation own its own
  transaction strategy.
- The migration plan documents the `array-contains` index as a required Firestore index.
