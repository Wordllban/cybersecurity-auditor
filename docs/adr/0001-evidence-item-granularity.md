# Evidence item granularity is whole-file (PoC)

An evidence item maps to one whole preloaded file rather than a sub-file chunk
(paragraph, quote, spreadsheet row). We chose this because it matches the schema's
center of gravity (`sourceFileName` + `fullText`) and the assignment's worked example
(which treats "the policy" and "the interview" as the evidence items), and because
sub-file chunking is real scope — a chunking strategy, character offsets, and
re-assembly — that doesn't earn its place in a 2–3 hr slice. Citation precision is
preserved by carrying the specific quote on `Observation.text`.

## Considered options

- **Whole file (chosen)** — simplest faithful model; large files become large
  `fullText` and large LLM payloads.
- **Section-level (split markdown by headings)** — more faithful to the spec's "policy
  paragraph", bounds LLM payload size, but adds ingestion complexity.
- **Arbitrary chunking with offsets** — most precise citations, most complex; rejected
  outright for the timebox.

## Consequences / future improvements (out of scope for this PoC)

- **Section-level evidence**: split files on markdown headings so an evidence item is a
  coherent section; this is an *additive* ingestion change, not a schema rewrite.
- **Sub-file citation anchors**: store character/line offsets so an observation links to
  the exact span in `fullText`, enabling highlight-on-source in the UI.
- **Binary artifact ingestion**: parse the `.docx` / `.pptx` / `.xlsx` / `.pdf` demo
  files (spreadsheet rows as evidence items, etc.) — currently markdown-only.
- **Token-cost handling**: whole-file payloads are mitigated by analyzing one evidence
  item at a time and a documented `fullText` truncation cap; section-level evidence would
  remove the need for truncation.
