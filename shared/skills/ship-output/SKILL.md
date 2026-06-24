---
name: ship-output
description: Produce the requested deliverable from the active spec and place it under 04_outputs, following the spec-defined path. Use when a spec is approved and ready to execute.
---

# Goal
Ship a complete deliverable aligned with the active spec.

# Inputs
- `03_specs/now/*`
- `02_context/*`

# Output
- A spec-defined path under `04_outputs/`
- For standalone deliverables, use a predictable filename such as `YYYY-MM-DD_topic_v1.md`

# Procedure
1. Read active spec and acceptance criteria.
2. Draft deliverable in final format.
3. Verify all criteria before finalizing.
4. Save only deliverable artifacts under `04_outputs/`, preserving any stage folders or manifest-driven layout required by the spec.

# Anti-patterns
- Shipping from memory without reading the current spec.
- Writing final output into scratch folders.
