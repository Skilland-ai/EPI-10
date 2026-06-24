# Copilot Harness Reassessment v1

## Verdict

The architecture/system-design v1 package is superseded for the Copilot boundary.
The useful operational architecture remains valid, but the v1 visual and some
text interpretations are wrong or too ambiguous when they place `EPI10 Informe
Final Copilot` near generic LLM tooling, vendor lanes or out-of-AWS surfaces.

Canonical correction: `Copilot Harness` is an internal EPI10-owned workflow
inside AWS Espana. It is composed of subagents, skills, workflow/scripts,
data-preparation gates, anonymization/pseudonymization and mandatory human
review gates. Runtime, model/provider, App Codigo interaction, storage,
logging, retention, IAM and cost are `Unknown` until formal ADR/workshop closure.

## Artifact Audit

| Artifact reviewed | Incorrect or risky v1 framing | Required v2 correction | Affects |
| --- | --- | --- | --- |
| `supporting/adr_inventory_v1.md` | ADR-009 treats Copilot as internal draft support, but the ADR does not explicitly place the harness inside AWS Espana/EPI10-owned. It also frames LLM/provider policy without separating the internal harness from possible model dependencies. | Add a corrected Copilot Harness ADR: internal AWS/EPI10-owned harness; subagents, skills and workflow/scripts are part of the owned system; model/runtime/App Codigo/retention are `Unknown`; human review is mandatory. | ADRs, data boundary, open questions |
| `supporting/system_design_draft_v1.md` | Module boundary lists Copilot as its own boundary without explicitly placing it inside the AWS/EPI10-owned system. Contracts section says `Copilot / LLM Tools`, which can read as generic tooling rather than an owned harness. Flow 4 uses Copilot after a script step but does not make the whole harness boundary clear. | Make `Copilot Harness` an internal AWS/EPI10-owned component next to the MVP orchestration service and PostgreSQL. Flow 4 must run checklist, pseudonymization, subagents, skills and workflow/scripts inside the harness before human review. | Architecture, data boundaries, report flow, failure modes, open questions |
| `architecture_briefing_v1.md` | Briefing says Copilot is internal draft support, but does not clearly say the harness belongs inside the AWS/EPI10-owned boundary. Core-vs-commodity table says LLM/tools assist drafts, which can mislead Fer into thinking the architecture boundary is external. | Explain that v1 was wrong/ambiguous on this boundary. Put report harness ownership in the core EPI10-owned layer while keeping any model/provider/runtime details `Unknown`. | Briefing, CTO risks, sequencing |
| `architecture_system_design_blueprint_link.md` | Blueprint brief says Copilot uses authorized LLM/agent tools and shows Copilot as an architecture boundary, but does not state that the harness is inside AWS Espana/EPI10-owned. | Mark the Blueprint interpretation as superseded for Copilot boundary. Future board should draw Copilot Harness inside AWS/EPI10-owned and keep provider/model details unknown. | Blueprint interpretation, visual redesign |
| `visual_redesign/supporting/diagram_content_inventory_v1.md` | Inventory maps Copilot to `External SaaS / provider systems` in Excalidraw and the SaaS subgraph in Mermaid. | v2 inventory must map Copilot Harness to the AWS/EPI10-owned lane, not SaaS/provider/manual lanes. | Diagram inventory |
| `visual_redesign/architecture_system_design_mermaid_v1.md` | Diagram 0 places Copilot in a SaaS/provider subgraph. Diagram 1 places Copilot in `SaaS / external systems`. Data/security diagram treats Copilot as a workspace outside the owned AWS boundary. | Mermaid v2 must place Copilot Harness in the AWS/EPI10-owned subgraph with subagents, skills, workflow/scripts, gates and `Unknown` runtime/model/retention/App Codigo. | Mermaid diagrams |
| `visual_redesign/architecture_system_design_excalidraw_v1.excalidraw` | Extracted labels place `EPI10 Informe Final Copilot / approved LLM tools` under the `External SaaS / provider systems` lane. | Excalidraw v2 must draw Copilot Harness inside the AWS Espana/EPI10-owned boundary and move model/runtime/App Codigo/retention to Unknown/gated notes. | Excalidraw |

## Decisions Unchanged

- Fase 1 remains an operational MVP, not automated TellmeGen integration.
- The custom layer remains small and focused on orchestration, traceability,
  idempotency, retries, state and report handoff.
- TypeScript/NestJS remains the boring default for the MVP service unless Fer
  changes it.
- PostgreSQL remains technical metadata only: IDs, event metadata, state
  snapshots, idempotency, retries/errors and sanitized audit markers.
- Healthie remains the portal hypothesis/gate for onboarding, forms, consents,
  documents, communication and report delivery if capabilities validate.
- Odoo remains operational backoffice and source of operational visibility.
- TellmeGen remains external/manual in Fase 1.
- No raw genetic data in Odoo or PostgreSQL.
- No autonomous diagnosis, no automatic genetic interpretation and no final
  approval by Copilot Harness.
- Raul remains the primary delivery baseline with Fer reviewing weekly.
- Stage 06 remains out of scope.

## New v2 Deliverables Required

- `supporting/copilot_harness_boundary_v1.md`
- `supporting/adr_inventory_v2.md`
- `supporting/system_design_draft_v2.md`
- `architecture_briefing_v2.md`
- `visual_redesign/supporting/diagram_content_inventory_v2.md`
- `visual_redesign/architecture_system_design_mermaid_v2.md`
- `visual_redesign/architecture_system_design_excalidraw_v2.excalidraw`
