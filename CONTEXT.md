# Hibit AI Assessment Workspace

The domain language for a workspace that helps a security reviewer turn a customer's
raw assessment files into structured, evidence-linked findings. The model has three
layers — evidence, observation, finding — each with a distinct job.

## Language

**Evidence item**:
A raw source artifact captured from a customer file — never invented by the app. In
this PoC one evidence item is one whole preloaded file. The specific quote that
matters is carried on the Observation, not modelled as sub-file evidence.
_Avoid_: document, source, file (when referring to the entity), artifact

**Observation**:
A single structured fact extracted from exactly one evidence item, classified by an
observation type. Two facts from the same topic but different sources are two
observations.
_Avoid_: note, fact, statement, extraction

**Observation type**:
The classification of an observation: requirement, practice, gap, risk, control, or
missing evidence. `contradiction` is deliberately not a type — contradictions are
relational and surface at the finding level.
_Avoid_: category, kind, label

**Finding**:
An assessment-level conclusion that groups one or more observations into something a
reviewer would write in a report. Where contradictions, gaps, and risks become
explicit by combining observations from different sources.
_Avoid_: issue, conclusion, result, insight

**Draft finding**:
A suggested grouping of observation IDs plus a proposed title, severity, and summary,
returned by analysis but not yet persisted. Becomes a Finding only when the reviewer
accepts it.
_Avoid_: suggestion, candidate, proposed finding

**Reviewer**:
The person using the workspace to analyze evidence and produce findings.
_Avoid_: user, auditor, analyst

**Customer**:
The organization being assessed (e.g. Hibit). Every evidence item, observation, and
finding is scoped to one customer.
_Avoid_: tenant, client, account, org
