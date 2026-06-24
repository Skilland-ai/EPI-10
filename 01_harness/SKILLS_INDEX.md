# SKILLS_INDEX

- `initial-context-building` (heavy/bootstrap): reads all available sources (inbox, harness files, root docs, existing context) and builds the initial context layer as either one compact pack or split files. Seeds backlog and decisions without overwriting existing entries. Produces a gap report. Run once at project start.
- `distill-context` (heavy/manual): distills raw inbox into concise context in `02_context/`; this repo uses `00_intake_context_pack.md`.
- `write-spec` (light): creates one SDD-light spec from distilled context.
- `ship-output` (light): produces final deliverables under `04_outputs/`, following the active spec path such as `04_outputs/spec-driving/`.
- `qa-review` (light): validates output against acceptance checklist.
- `skill-creator` (strategic/heavy): creates and iterates skills with eval loop.
