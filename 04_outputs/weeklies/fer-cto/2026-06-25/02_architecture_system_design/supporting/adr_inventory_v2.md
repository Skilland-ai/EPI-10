# ADR Inventory v2 - EPI10 Salud MVP 1.0

## Purpose

Inventory for the Fer CTO weekly on 2026-06-25, updated after the Copilot
boundary correction. v2 supersedes v1 only for the `Copilot Harness` boundary.
Other architecture decisions remain stable unless explicitly noted.

Rigor dial: regulated/sensitive. The system touches personal, health, genetic,
documentary and report data, so decisions must privilege minimization,
auditability, human review and explicit fallback paths.

## Accepted Decisions

| ID | Decision | Current position | Decision source path | Risk if wrong |
| --- | --- | --- | --- | --- |
| ADR-001 | Fase 1 is an operational MVP, not automated TellmeGen integration. | Accepted scope. Sell/operate as portal + backoffice + orchestration + report process. | `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`; `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | If wrong, the proposal promises value around the wrong bottleneck. |
| ADR-002 | Build a small software propio layer instead of only low-code automations. | Accepted for proposal, but needs formal ADR before build. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_cto_decision_docket_v1.md`; `04_outputs/spec-driving/99_final/epi10-salud-propuesta-tecnica-economica.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | If overbuilt, Raul inherits platform complexity. If underbuilt, logic is scattered. |
| ADR-003 | TypeScript / NestJS is the default backend stack. | Accepted technical default. Validate with Fer as boring enough for one developer. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_cto_decision_docket_v1.md`; `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md` | If wrong, maintenance cost rises or the stack does not fit capacity. |
| ADR-004 | PostgreSQL tecnico minimo stores IDs, state, event metadata, idempotency, retries and errors only. | Accepted boundary. Must become a data ADR. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_epi10_salud_mvp_1_0_blueprint_v1.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | If wrong, sensitive data may be duplicated into an unnecessary store. |
| ADR-005 | AWS Espana is the base infrastructure for EPI10-owned runtime. | Accepted in commercial proposal and technical blueprint. Scope must remain light. | `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md`; `04_outputs/spec-driving/99_final/epi10-salud-propuesta-tecnica-economica.md` | If wrong, cost/security/ops assumptions change. |
| ADR-006 | Healthie is the portal hypothesis; Healthie API/webhooks are required if selected. | Accepted as hypothesis, not final vendor decision. | `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`; `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md` | If API/DPA/residency/cost fail, the portal path needs fallback. |
| ADR-007 | Odoo is the operational backoffice via API, not a clinical/genetic repository. | Accepted role. Odoo reality still gated. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_cto_decision_docket_v1.md`; `04_outputs/spec-driving/04_commercial_proposal/supporting/04_scope_inclusions_exclusions_v1.md` | If wrong, EPI10 lacks operational visibility or stores data in the wrong place. |
| ADR-008 | TellmeGen remains external/manual in Fase 1. | Accepted exclusion. | `02_context/00_intake_context_pack.md`; `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`; `04_outputs/spec-driving/04_commercial_proposal/supporting/04_scope_inclusions_exclusions_v1.md` | If wrong, the project commits to an unavailable API. |
| ADR-009 | `Copilot Harness` is an internal AWS Espana / EPI10-owned harness for draft support. | Corrected in v2. The harness includes subagents, skills, workflow/scripts, checklist, pseudonymization/anonymization, draft support and human review. Runtime/model/App Codigo/retention are `Unknown`. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_informe_final_copilot_blueprint_v1.md`; `03_specs/now/007_now.md` | If wrong, the architecture misplaces ownership of the report process and weakens data controls. |
| ADR-010 | Data minimization, clean logs, short retention and controlled boundaries are non-negotiable. | Accepted principle. Needs concrete matrix. | `02_context/00_intake_context_pack.md`; `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | If wrong, legal, reputational and incident risk becomes disproportionate. |
| ADR-011 | Real delivery baseline is Raul as solo developer with Fer in weekly CTO review. | Accepted from CTO diagnosis/user answer, not reflected in `99_final`. | `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md`; `03_specs/decisions.md` | If wrong, sequencing, QA, support and scope assumptions become unrealistic. |

## ADRs To Formalize Before Build

| ADR | Decision to write down | Why it needs ADR | Risk if wrong |
| --- | --- | --- | --- |
| ADR-F01 | Software propio scope: orchestration, state, idempotency, provider clients, retries, traceability and Copilot Harness boundary. | This is the central build-vs-buy tension. | The MVP becomes too broad or too brittle. |
| ADR-F02 | NestJS/TypeScript runtime for the orchestration service. | Affects velocity, testing, deployment and maintenance. | Poor stack fit increases solo-developer risk. |
| ADR-F03 | PostgreSQL tecnico minimo: schema classes, retention, encryption/backups and no raw genetic data. | The DB boundary is the main privacy control. | The MVP becomes a sensitive data repository. |
| ADR-F04 | AWS Espana minimal deployment model. | Cost, backups, logs, secrets and monitoring expectations must be concrete. | Under-scoped infrastructure can fail silently. |
| ADR-F05 | Healthie portal/API/webhooks gate and fallback. | Healthie is not fully validated. | Vendor failure blocks onboarding and report delivery. |
| ADR-F06 | Odoo API/backoffice model. | Odoo is operational source of truth but real configuration is Unknown. | Operations data may be partial or unusable. |
| ADR-F07 | TellmeGen external/manual policy for Fase 1. | Protects the project from an unavailable dependency. | Commercial pressure may reintroduce a non-existent integration. |
| ADR-F08 | Copilot Harness boundary, runtime, data handling, App Codigo interaction, retention and human review gates. | It is EPI10-owned and touches high-risk report data. | The harness becomes unsafe, ambiguous or over-automated. |
| ADR-F09 | Sensitive data, logs, retention and model/tool policy. | The current documents state principles, not a matrix. | Incidents become hard to detect, contain and explain. |
| ADR-F10 | Solo developer + Fer weekly CTO governance. | Scope must match real capacity. | The project tries to build all blocks in parallel. |

## Decisions To Validate With Fer

| Decision | Proposed validation question | Why Fer should review it | Risk if wrong |
| --- | --- | --- | --- |
| First vertical slice | Should the first slice remain `web/pago -> MVP -> PostgreSQL -> Odoo` with idempotency and one state transition? | This still proves the owned layer before vendor complexity. | Starting with report harness or full portal parity increases WIP. |
| Copilot Harness phase | Should the harness start as checklist + pseudonymization + subagents/skills/workflow draft support behind human review? | v2 makes this EPI10-owned, but sequencing must stay conservative. | Report automation becomes the riskiest part before operations work. |
| App Codigo role | Is App Codigo only an interaction surface for the harness? | Prevents UI from becoming the architecture owner. | Ownership and security controls become unclear. |
| Data matrix | Which classes may enter PostgreSQL, logs, harness temporary packages, Healthie and Odoo? | Sensitive data is the main harm profile. | Wrong boundary creates legal/reputation risk. |
| Runtime/model Unknowns | Which runtime/model/provider/residency decisions must be closed before real data? | The harness boundary is known; implementation is not. | Hidden provider assumptions leak into architecture. |
| Support boundaries | Which severities, channels and response expectations fit included support? | Support can consume delivery capacity. | Delivery success becomes open-ended support load. |

## Decisions To Defer Until Workshop

| Decision | Workshop output needed | Risk if guessed now |
| --- | --- | --- |
| Final operational states and owners | State list, owner per state, manual TellmeGen milestones and blocked-state rules. | State model will not match real operations. |
| Forms, consents and questionnaires | Inventory, canonical owner and where each item lives. | Healthie/Odoo fields may be designed around incomplete assumptions. |
| Report template and ready-for-report rule | Required inputs, review criteria, final format and delivery channel. | Copilot Harness may prepare the wrong draft workflow. |
| Harness input policy | Allowed/minimized inputs, forbidden inputs, pseudonymization checklist and audit marker. | Sensitive data could enter the wrong place. |
| Odoo details | Modality, fields, views, permissions and dashboard needs. | Custom fields/API calls may not be possible or useful. |
| web/pago contract | Schema, auth, idempotency key, sandbox, owner and error behavior. | Duplicate or lost customers after payment. |
| Healthie plan/API details | Plan, API add-on, webhook list, report upload support, DPA/GDPR and cost. | Architecture assumes capabilities that are not bought or allowed. |

## Do Not Reopen Without New Evidence

- Do not design automated TellmeGen integration for Fase 1.
- Do not turn Odoo into a raw genetic or clinical document repository.
- Do not let Copilot Harness perform autonomous diagnosis, automatic genetic
  interpretation or final report approval.
- Do not treat App Codigo as the process owner.
- Do not create Stage 06 or a detailed execution plan from this inventory.
- Do not optimize for a multi-person delivery team; current baseline is Raul as
  primary executor with Fer weekly CTO review.

## Unresolved Unknowns

- Healthie plan/API/webhooks/DPA/residency/cost.
- Odoo modality/API/permissions/model and real hosting/cost.
- Exact web/pago event schema and auth model.
- Final report template, inputs, review rubric and delivery mechanics.
- Copilot Harness runtime/services, App Codigo interface, LLM/model/provider,
  retention/logging/IAM and cost.
- Monthly volume and current manual hours per case.
