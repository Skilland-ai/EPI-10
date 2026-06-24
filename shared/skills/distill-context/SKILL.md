---
name: distill-context
description: Distill raw materials from 00_inbox into concise context files in 02_context and prepare 03_specs inputs. Use when inbox is noisy, long, duplicated, or unstructured.
---

# Goal
Turn raw context into a concise 5-minute context layer.

# Inputs
- `00_inbox/`

# Outputs
- A compact context artifact in `02_context/`, such as `00_intake_context_pack.md`
- Or split context files when the project/spec calls for them, such as brief, facts, constraints, links, and glossary

# Procedure
1. Read all inbox files and cluster by topic.
2. Extract facts with source reference.
3. Separate assumptions and unknowns.
4. Write concise context with no duplication, using the current repo's context shape when one already exists.
5. Propose candidate scope for next spec.

# Anti-patterns
- Copying inbox dumps into context files.
- Mixing facts and opinions without labels.
