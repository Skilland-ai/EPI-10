---
name: initial-context-building
description: Bootstrap the full context layer at project start. Reads everything available (00_inbox, existing 02_context files, 01_harness files, root README and any root-level .md) and builds the initial context layer in one pass. Also seeds 03_specs/backlog.md and 03_specs/decisions.md when sufficient context exists, and writes a gap report to 05_scratch/. Invoke this skill when starting a new project, when context files are empty or stub-only, or before running write-spec for the first time.
---

# Goal
Build the complete initial context layer in one pass: read all available sources, create or update the project context shape, seed the spec pipeline, and report what was built and what is still unknown.

# Load level
Heavy — read this file in full before acting. This skill reads more files than any other. Do not shortcut the read phase.

# Inputs (read all before writing anything)

Priority order:
1. `00_inbox/` — all files, recursively, any format
2. `02_context/` — any existing files (may be empty stubs or partially filled)
3. `01_harness/RULES.md`, `01_harness/TASKFLOW.md`, `01_harness/STACK.md`
4. Root `README.md` (if present)
5. Any `.md` file in the project root not already covered above
6. `03_specs/backlog.md`, `03_specs/decisions.md` — read before writing to avoid overwriting existing content

# Outputs

Create or update the context shape that fits the project:
- Preferred when the repo already uses one: a compact pack such as `02_context/00_intake_context_pack.md`
- Valid for new projects: split files for brief, facts, constraints, links, and glossary when that is clearer
- `03_specs/backlog.md` — initialize or append with inferred candidate tasks (one line each, prefix `[inferred]`)
- `03_specs/decisions.md` — initialize or append with implicit decisions made explicit (prefix `[inferred]`)
- `05_scratch/YYYY-MM-DD_initial-context-report.md` — gap report (required, see format below)

# Procedure

1. Read every file listed under Inputs. **Do not write anything yet.**
2. Cluster all content by topic across all sources. If two sources contradict each other, note the conflict; resolve in favour of the more specific or more recent source, or mark confidence as low if unresolvable.
3. Choose the context shape. If `02_context/` already has an active pack, update that pack. If the project is new, choose either one compact pack or split files for brief, facts, constraints, links, and glossary.
4. Fill the selected context artifact(s). For any field that cannot be answered from sources, write `Unknown — [what specifically is missing]` rather than guessing.
5. Extract only verifiable claims; tag each with the source file and confidence level. Group assumptions and unknowns into a clear section.
6. Capture constraints, links actually present in source files, and domain terms needed to avoid ambiguity.
7. Preserve existing context files that are outside the chosen update path unless the active spec explicitly says to replace them.
8. Seed `03_specs/backlog.md` with 3–10 candidate tasks inferred from context. Prefix each inferred item with `[inferred]`. Preserve any existing items unchanged.
9. Seed `03_specs/decisions.md` with any architectural or scope decisions implicit in the sources. Prefix each inferred item with `[inferred]`. Preserve any existing entries unchanged.
10. Write the gap report to `05_scratch/YYYY-MM-DD_initial-context-report.md` using the format below.

# Gap Report Format

```
# Initial Context Report — YYYY-MM-DD

## What was built
- [context file]: [one-line summary of what was filled]

## Gaps and unknowns
- [specific missing information and which file it blocked]

## Conflicts found
- [source A] vs [source B]: [what conflicted and how it was handled]

## Suggested next action
One sentence: what to do immediately after reading this report.
Examples: "Run write-spec — context is complete."
          "Resolve 3 unknowns in the context pack before writing a spec."
```

# Anti-patterns
- Writing to `02_context/` before finishing all reads.
- Filling `Unknown` fields with plausible-sounding guesses. If it is not in the sources, it is Unknown.
- Copying raw inbox dumps verbatim into context files.
- Mixing facts with opinions or assumptions without explicit labelling.
- Skipping the gap report. It is a required output, not optional.
- Adding backlog or decision items without the `[inferred]` prefix.
- Using this skill for routine inbox processing. Use `distill-context` for that; this skill is for project bootstrapping only.
