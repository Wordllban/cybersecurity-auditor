# Observation persistence & lifecycle

`/analyze` persists observations but does **not** persist findings; it returns draft
findings for the reviewer to accept. This asymmetry is taken directly from the
assignment: "Observation creation and deletion happen as a side effect of `/analyze`
and finding deletion" and "Suggested findings are drafts only. They are not persisted
by `/analyze`." There are no separate observation mutation endpoints — the only ways
observations come into and out of existence are analysis and finding deletion.

Three rules make this model safe rather than rot-prone, and each exists for a reason:

1. **Validate-before-write.** Zod validates the *entire* analyze payload before a single
   observation is written. *Why:* the spec explicitly grades that malformed model output
   must never touch stored data. Validating first guarantees we never persist a partial
   or invalid batch.

2. **Re-analyze refreshes only loose observations.** Re-running `/analyze` on an evidence
   item deletes that evidence's existing observations *that are not referenced by any
   persisted finding*, then inserts the fresh batch. *Why:* naive append accumulates
   duplicates in the observation workspace on every re-run; deleting everything would
   orphan observations already grouped into findings (breaking `relatedObservationIds`).
   Reference-counting splits the difference — the workspace stays clean, accepted work is
   never destroyed.

3. **Reference-counted deletes on finding deletion.** `DELETE /findings/:id` removes the
   observations that finding cited *only if no other persisted finding references them*;
   shared observations survive. *Why:* the spec ties observation deletion to finding
   deletion, but also allows an observation to belong to more than one finding
   ("uncommon"). A blind cascade would delete observations another finding still cites,
   corrupting that finding.

## Consequences

- The repository layer needs a "is this observation referenced by any finding?" query;
  cheap in SQL today, and a documented access pattern for the Firestore migration.
- Observations produced by `/analyze` but never grouped into a finding are intentionally
  long-lived — they populate the observation workspace independently of findings.

## Considered and rejected

- **Append-only `/analyze` (duplicates as a documented limitation).** Simpler, but
  produces a visibly broken workspace on the second analyze run; rejected because the
  reference-counted version is not much more code.
- **Persist findings at `/analyze` time.** Directly contradicts the spec; would also put
  un-reviewed model output into stored findings.
