# Diagram Content Inventory v1

Source package:

- `architecture_system_design_blueprint_link.md`
- `supporting/system_design_draft_v1.md`
- `supporting/adr_inventory_v1.md`
- `architecture_briefing_v1.md`

Purpose: prove that the redesigned Excalidraw and Mermaid outputs preserve the information depth of the existing architecture package while improving visual readability. This inventory is a coverage map only; it does not introduce new architecture decisions.

## Coverage Map

| Information group | Source evidence | Excalidraw representation | Mermaid representation |
| --- | --- | --- | --- |
| Actors: cliente final, Aitor/equipo EPI10, Carmen/direction, Raul, Fer and external providers | System design `Actors`; Blueprint brief; Architecture briefing | Left lane `Actors and entry`, reviewer callout, provider lane labels | Overview text; Diagram 1 `Actors` subgraph; Diagram 2 participants; QA section |
| Entry point: web/pago with `lead_created` and `payment_success` | System design Flow 1; Blueprint brief; Architecture briefing | Left lane `web/pago` card with two event chips and Flow 1 arrow | Diagram 1 web/pago node; Diagram 2 messages `lead_created` and `payment_success`; Diagram 4 entry boundary |
| EPI10 MVP orchestration service in AWS Espana using TypeScript/NestJS | System design Proposed Components; Architecture briefing; ADR-003/ADR-005 | Center lane main owned component card with internal module callouts and AWS Espana / NestJS label | Diagram 1 central subgraph; Diagram 2 `MVP`; Diagram 4 owned runtime boundary |
| PostgreSQL technical DB | System design PostgreSQL Technical DB; Data Classes; ADR-004 | Center lower `PostgreSQL tecnico` store with allowed-only list and no-raw-data warning | Diagram 1 DB node; Diagram 2 event ledger/state/retry messages; Diagram 4 data boundary node |
| Healthie portal/API/webhook boundary | System design Healthie Portal; Integration Contracts; ADR-006 | Right lane Healthie external/SaaS card with API/webhook gate callout | Diagram 1 Healthie node; Diagram 2 Healthie webhook/polling messages; Diagram 4 Healthie storage boundary |
| Odoo operational backoffice | System design Odoo Backoffice; Architecture briefing; ADR-007 | Right lane Odoo card marked operational source of truth for cases/states/tasks | Diagram 1 Odoo node; Diagram 2 Odoo case/state/task updates; Diagram 3 state surface note; Diagram 4 Odoo boundary |
| EPI10 Informe Final Copilot | System design Copilot boundary; Flow 4; ADR-009 | Right lane Copilot card with pseudonymized draft support and human review gate | Diagram 1 Copilot node; Diagram 2 Flow 4 messages; Diagram 4 pseudonymized package and human review path |
| TellmeGen external/manual boundary | System design Flow 3; Non-goals; ADR-008 | Right lane manual TellmeGen card with red manual/no API boundary | Diagram 1 TellmeGen manual node; Diagram 2 Flow 3 manual notes; Diagram 4 no raw genetic storage rule |
| Flow 1: lead/payment to operational case | System design Flow 1; Architecture briefing first vertical slice | Numbered arrow path `1` from cliente/web-pago to MVP, PostgreSQL, Odoo and Healthie gate | Diagram 2 section `Flow 1`; Diagram 1 numbered edge labels |
| Flow 2: portal onboarding to Odoo state | System design Flow 2 | Numbered arrow path `2` from Healthie to MVP to Odoo plus recovery task branch | Diagram 2 section `Flow 2`; Diagram 1 Healthie webhook edge |
| Flow 3: TellmeGen external/manual | System design Flow 3; ADR-008 | Numbered manual path `3` from Aitor/equipo to TellmeGen and Odoo milestone | Diagram 2 section `Flow 3`; Diagram 1 manual dashed edge |
| Flow 4: report production and delivery | System design Flow 4; Copilot boundary; Architecture briefing | Numbered path `4` through ready-for-report, pseudonymization, Copilot draft, human review, Healthie/fallback delivery and Odoo status | Diagram 2 section `Flow 4`; Diagram 4 Copilot/data path |
| State model draft | System design State Model Draft | Bottom rail `State lifecycle draft` with grouped state sequence and `incident` side state | Diagram 3 `stateDiagram-v2` with full draft lifecycle and incident state |
| Integration contracts to define | System design Integration Contracts; ADR Inventory | Bottom/right `Contracts to validate` panel covering web/pago, Healthie, Odoo, Copilot/LLM, TellmeGen | Diagram 1 gate callouts; Markdown section `Contracts and Gates`; QA text |
| Data classes and storage boundaries | System design Data Classes table; Security Notes; ADR-004/ADR-010 | Bottom rail `Data posture` panel and sensitive boundary banner across PostgreSQL/Odoo/Copilot | Diagram 4 data classes and allowed/forbidden storage; QA text |
| Idempotency, retries, dead-letter, alerts and manual recovery | System design Idempotency and Retries; Failure Modes; Architecture briefing | Center module callouts `idempotency`, `retry queue`, `dead-letter`, `alerts`, `manual recovery`; red recovery arrows to Odoo/equipo | Diagram 2 retry/dead-letter messages; Diagram 4 recovery path with alert/manual recovery |
| Observability/support | System design Observability and Support; Architecture briefing risks | Bottom rail `Observability/support` panel with event counts, failures, retry depth, last sync, report markers and support boundaries | Diagram 4 observability node; Markdown section `Observability and Support` |
| Failure modes | System design Failure Modes | Bottom rail `Failure modes` panel with malformed event, duplicate payment, provider down, missing webhook, Copilot input, log leak, TellmeGen milestone | Diagram 4 failure/recovery flow; Markdown section `Failure Modes Preserved As Text` |
| Security/privacy notes | System design Security and Privacy Notes; ADR-010 | Sensitive data boundary banner and callouts: no request bodies in logs, secrets, least privilege, retention, DPO/legal review | Diagram 4 security boundary; QA section |
| Solo-developer sequencing | System design Solo-Developer Sequencing; Architecture briefing; ADR-011 | Bottom rail `Raul solo + Fer gates` sequence: ADRs, vertical slice, Healthie gate, recovery, Copilot procedure, TellmeGen manual | Markdown section `Solo-Developer Sequencing`; Diagram 1 Fer/Raul governance callout |
| ADRs accepted and ADRs to formalize | ADR Inventory Accepted Decisions and Implicit Decisions | Right/bottom `ADR/Gates` panel listing ADR themes and do-not-reopen constraints | Markdown section `ADR and Review Gates`; Diagram 1 Fer review node; QA section |
| Fer validation questions | Architecture briefing Decisions To Validate With Fer; System design Open Questions For Fer; ADR Inventory | Fer reviewer node connected to ADRs, data boundary, state model and first slice | Markdown section `Fer Review Questions`; Diagram 1 Fer review edges |
| Workshop-bound decisions | System design Open Questions For Workshop; ADR Inventory Decisions To Defer | Bottom/right `Workshop decisions` panel | Markdown section `Workshop Decisions`; QA section |
| Unresolved unknowns | System design Open Questions; Architecture briefing Open Unknowns; ADR Inventory Unresolved Unknowns; Blueprint limitations | Bottom/right `Unknown / gated` panel with Healthie, Odoo, web/pago, report template, data retention, volume/manual hours | Markdown section `Unresolved Unknowns`; QA section |

## Visual Encoding Commitments

| Semantic category | Excalidraw encoding | Mermaid encoding |
| --- | --- | --- |
| EPI10-owned components | Blue fill and center lane | `classDef owned` |
| External/SaaS systems | Green fill and right lane | `classDef external` |
| Manual process | Orange fill or dashed arrows | `classDef manual`; dashed labels in text |
| Sensitive data boundary | Pink/red outline and banner | `classDef sensitive`; Diagram 4 storage rules |
| Unknown/gated decision | Yellow fill and gate labels | `classDef gated`; `Unknown` text |
| Error/retry/recovery path | Red arrows/callouts | `classDef error`; Diagram 2/4 dead-letter and manual recovery |

## Source Constraints Preserved

| Constraint | How it is preserved |
| --- | --- |
| Do not redesign architecture | Outputs restate the existing accepted boundaries and gates only. |
| Do not invent provider capabilities | Healthie, Odoo, web/pago, Copilot/LLM and TellmeGen are shown with validation gates or manual boundaries where source says Unknown. |
| No automated TellmeGen in Fase 1 | Both outputs show TellmeGen as external/manual with no users, tests, barcodes, polling, PDF download or structured result ingestion. |
| No raw genetic data in Odoo or PostgreSQL | Both outputs state this explicitly and place PostgreSQL as technical metadata only. |
| Copilot is not final authority | Both outputs show pseudonymization and mandatory human review before delivery. |
| No Stage 06 | Outputs are visual redesign and briefing artifacts only; no execution plan is generated. |
