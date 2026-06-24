# Diagram Content Inventory v2

Purpose: prove that the v2 diagrams preserve the architecture package while
correcting the `Copilot Harness` boundary. v2 supersedes v1 only for that
boundary.

## Coverage Map

| Information group | Source evidence | Excalidraw v2 representation | Mermaid v2 representation |
| --- | --- | --- | --- |
| Boundary correction | `03_specs/now/007_now.md`; `supporting/copilot_harness_boundary_v1.md` | Large `AWS Espana / EPI10-owned` frame contains `Copilot Harness`; external/provider frames do not contain it | Diagram 0 and Diagram 1 place `Copilot Harness` in the AWS/EPI10-owned subgraph |
| Actors: cliente final, Aitor/equipo EPI10, Carmen/direction, Raul, Fer | v1 system design actors; v2 briefing | Left actor lane and Fer gate callout | Diagram 0 actors; Diagram 1 actors; Diagram 2 participants |
| Entry point: web/pago with `lead_created` and `payment_success` | v1 Flow 1 | Entry card outside AWS with event chips and arrow into MVP API intake | Diagrams 0/1 web/pago node; Diagram 2 Flow 1 |
| EPI10 MVP orchestration service in AWS Espana using TypeScript/NestJS | v1 system design; v2 system design | Main AWS-owned service card with API intake, core engines and provider clients | Diagram 0 AWS subgraph; Diagram 1 architecture context; Diagram 2 MVP participant |
| PostgreSQL technical DB | v1 system design; v2 data boundaries | PostgreSQL card inside AWS; technical metadata only | Diagrams 0/1 DB node; Diagram 4 data boundary |
| Copilot Harness components | v2 boundary doc; spec 007 | Inside AWS: input checklist, pseudonymization, subagents, skills, workflow/scripts, draft support, human review and export/handoff | Diagrams 0/1 harness nodes; Diagram 2 Flow 4; Diagram 4 data/security |
| App Codigo as possible interaction surface | spec 007; v2 boundary doc | Unknown/gated note near harness, not owner box | Diagram 4 Unknowns node |
| Runtime/model/retention Unknowns | spec 007; v2 boundary doc | Unknown/gated panel under AWS harness | Diagram 4 Unknowns node and QA text |
| Healthie portal/API/webhook boundary | v1 system design; v2 system design | External systems lane, gated Healthie card | Diagrams 0/1 external systems; Diagram 2 onboarding and delivery branches |
| Odoo operational backoffice | v1 system design; v2 system design | External systems lane, operational source-of-visibility card | Diagrams 0/1 Odoo node; Diagram 2 Odoo updates; Diagram 3 state surface |
| TellmeGen external/manual boundary | v1 system design; v2 system design | Manual/out-of-system lane, TellmeGen B2B card | Diagrams 0/1 manual node; Diagram 2 Flow 3 |
| Flow 1: lead/payment to operational case | v1/v2 system design | Numbered Flow 1 path and bottom flow card | Diagram 2 Flow 1 |
| Flow 2: portal onboarding to Odoo state | v1/v2 system design | Numbered Flow 2 path and bottom flow card | Diagram 2 Flow 2 |
| Flow 3: TellmeGen external/manual | v1/v2 system design | Numbered Flow 3 manual path and bottom flow card | Diagram 2 Flow 3 |
| Flow 4: report production and delivery | v2 system design Flow 4 | Numbered Flow 4 path through Odoo readiness, AWS harness, human review and Healthie/fallback delivery | Diagram 2 Flow 4 |
| State model draft | v1/v2 system design | Bottom state lifecycle panel | Diagram 3 `stateDiagram-v2` |
| Contracts and internal contracts | v2 system design | Contracts panel: web/pago, Healthie, Odoo, Copilot Harness, TellmeGen | Diagram 4 contracts/Unknowns |
| Data classes and storage boundaries | v2 system design data table | Sensitive data boundary panel | Diagram 4 data/security flowchart |
| Idempotency, retries, dead-letter, alerts and manual recovery | v1/v2 system design | AWS reliability card and red recovery path to Odoo task | Diagram 2 retry block; Diagram 4 recovery path |
| Observability/support | v2 system design | Observability/support panel | Diagram 4 observability node |
| Failure modes | v2 system design | Failure-mode callouts in recovery and security panels | Diagram 4 and text section |
| Security/privacy notes | v2 system design | No raw genetic data, no sensitive logs/prompts, human review required | Diagram 4 and QA section |
| Solo-developer sequencing | v2 briefing and ADR v2 | Raul/Fer sequencing panel | Mermaid `Sequencing And Gates` section |
| ADRs, Fer validation questions and workshop decisions | ADR v2; v2 briefing | ADR/Fer/Unknowns panel | Mermaid review sections and QA |

## Visual Encoding

| Semantic category | Excalidraw v2 encoding | Mermaid v2 encoding |
| --- | --- | --- |
| EPI10-owned / AWS Espana | Blue frame and blue component cards | `classDef owned` and `classDef data` |
| External systems | Green frame/cards | `classDef external` |
| Manual process | Orange frame/cards and dashed arrows | `classDef manual` |
| Sensitive data | Pink/red warning panels | `classDef sensitive` |
| Unknown/gated decision | Yellow cards | `classDef gated` |
| Error/retry/recovery | Red cards/arrows | `classDef error` |

## Source Constraints Preserved

| Constraint | v2 handling |
| --- | --- |
| Correct Copilot boundary | `Copilot Harness` is inside AWS Espana / EPI10-owned in both diagrams. |
| No provider capability invented | Healthie/Odoo/web/pago capabilities remain gated or Unknown where source says Unknown. |
| TellmeGen manual | TellmeGen remains external/manual with no Fase 1 API automation. |
| PostgreSQL technical-only | PostgreSQL stores only IDs, events, state snapshots, idempotency, retry/error records and sanitized audit markers. |
| Human review required | Harness draft support cannot approve final report. |
| Unknowns visible | Runtime/model/App Codigo/IAM/retention/cost remain `Unknown`. |
| No Stage 06 | Diagrams are review artifacts only. |
