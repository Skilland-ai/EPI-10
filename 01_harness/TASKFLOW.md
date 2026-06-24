# TASKFLOW

Phases to follow in order. Complete each phase before moving to the next.

## 1. Seed

Drop all raw material (docs, links, notes) into `00_inbox/`.
For the current migrated run, source material is in `00_inbox/spec-driving-2026-06-09/raw/`.

## 2. Distill

Read `00_inbox/` and populate or update compact context in `02_context/`.
For this repo, the active context is `02_context/00_intake_context_pack.md`.
Future projects may use either one compact context pack or split files such as brief, facts, constraints, glossary, and links.

Use skill: `shared/skills/distill-context/`

## 3. Spec

Create one execution-ready spec in `03_specs/now/`.
- Define objective, scope, acceptance criteria
- Park future items in `03_specs/backlog.md`

Use skill: `shared/skills/write-spec/`

## 4. Ship

Execute the active spec. Write deliverables to the spec-defined path under `04_outputs/`.
For this repo, staged deliverables live under `04_outputs/spec-driving/`.
Use `05_scratch/` for working files.

Use skill: `shared/skills/ship-output/`

## 5. QA

Before closing, run the QA gate:
- Verify each acceptance criterion
- List unresolved unknowns
- State risks and next steps

Use skill: `shared/skills/qa-review/`
