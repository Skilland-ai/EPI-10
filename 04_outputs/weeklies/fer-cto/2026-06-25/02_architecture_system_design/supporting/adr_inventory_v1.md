# ADR Inventory v1 - EPI10 Salud MVP 1.0

## Purpose

Inventory for the Fer CTO weekly on 2026-06-25. It separates decisions already
used in the signed/pre-sales package from decisions that still need ADRs, Fer
validation, or workshop closure before any future execution planning.

Rigor dial: regulated/sensitive. The system touches personal, health, genetic,
documentary and report data, so architecture decisions must privilege data
minimization, auditability, human review and explicit fallback paths.

## Accepted Decisions

| ID | Decision | Current position | Decision source path | Risk if wrong |
| --- | --- | --- | --- | --- |
| ADR-001 | Fase 1 is an operational MVP, not automated TellmeGen integration. | Accepted scope. Sell/operate as portal + backoffice + orchestration + report process. | `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`; `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | If wrong, the proposal promises value around the wrong bottleneck and leaves the real operation fragmented. |
| ADR-002 | Build a small software propio layer instead of only SaaS/low-code automations. | Accepted for proposal, but needs formal ADR before build. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_cto_decision_docket_v1.md`; `04_outputs/spec-driving/99_final/epi10-salud-propuesta-tecnica-economica.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | If overbuilt, Raul inherits platform complexity. If underbuilt, business logic is scattered across brittle tool automations. |
| ADR-003 | TypeScript / NestJS is the default backend stack. | Accepted technical default. Validate with Fer as "boring enough" for one developer. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_cto_decision_docket_v1.md`; `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md` | If wrong, maintenance cost rises or the stack does not fit delivery capacity. |
| ADR-004 | PostgreSQL tecnico minimo stores IDs, state, event metadata, idempotency, retries and errors only. | Accepted boundary. Must become a data ADR. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_epi10_salud_mvp_1_0_blueprint_v1.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | If wrong, sensitive clinical/genetic data may be duplicated into an unnecessary custom store. |
| ADR-005 | AWS Espana is the base infrastructure for the custom orchestration service. | Accepted in commercial proposal and technical blueprint. Scope must remain light. | `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md`; `04_outputs/spec-driving/99_final/epi10-salud-propuesta-tecnica-economica.md` | If wrong, cost/security/ops assumptions change and the 44 USD/month estimate may be misleading. |
| ADR-006 | Healthie is the portal hypothesis; Healthie API/webhooks are required if Healthie is selected. | Accepted as hypothesis, not final vendor decision. | `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`; `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md` | If API/DPA/residency/cost fail, the architecture loses its customer portal and event source. |
| ADR-007 | Odoo is the operational backoffice via API, not a clinical/genetic repository. | Accepted role. Odoo reality still gated. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_cto_decision_docket_v1.md`; `04_outputs/spec-driving/04_commercial_proposal/supporting/04_scope_inclusions_exclusions_v1.md` | If wrong, the team either lacks operational visibility or stores sensitive data in the wrong system. |
| ADR-008 | TellmeGen remains external/manual in Fase 1. | Accepted exclusion. | `02_context/00_intake_context_pack.md`; `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`; `04_outputs/spec-driving/04_commercial_proposal/supporting/04_scope_inclusions_exclusions_v1.md` | If wrong, the project commits to an unavailable API and creates delivery/commercial risk. |
| ADR-009 | EPI10 Informe Final Copilot is an internal draft support flow with anonymization/pseudonymization and mandatory human review. | Accepted, but data and operating rules need ADR. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_informe_final_copilot_blueprint_v1.md`; `04_outputs/spec-driving/99_final/epi10-salud-propuesta-tecnica-economica.md` | If wrong, the system may be perceived as automated diagnosis or may process sensitive data without sufficient controls. |
| ADR-010 | Data minimization, clean logs, short retention and controlled provider boundaries are non-negotiable. | Accepted principle. Needs concrete matrix. | `02_context/00_intake_context_pack.md`; `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | If wrong, legal, reputational and incident risk becomes disproportionate to the MVP. |
| ADR-011 | Real delivery baseline is Raul as solo developer with Fer in weekly CTO review. | Accepted from CTO diagnosis/user answer, not reflected in `99_final`. | `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md`; `03_specs/decisions.md` | If wrong, sequencing, QA, support and scope assumptions will be unrealistic. |

## Implicit Decisions That Need ADR

| ADR | Decision to write down | Why it needs ADR | Source path | Risk if wrong |
| --- | --- | --- | --- | --- |
| ADR-001 | Software propio vs SaaS/low-code: the custom layer owns state, idempotency, integration contracts and traceability; SaaS owns portal/backoffice UI. | This is the central build-vs-buy tension in the project. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_cto_decision_docket_v1.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | Building too much creates maintenance debt; building too little produces brittle automations. |
| ADR-002 | NestJS/TypeScript as implementation default. | It affects velocity, testing, deployment and future maintainability. | `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md` | A poor stack choice increases solo-developer risk. |
| ADR-003 | PostgreSQL tecnico minimo: schema classes, retention, encryption/backups and explicit no raw genetic data. | The DB boundary is the main privacy control for custom software. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_epi10_salud_mvp_1_0_blueprint_v1.md` | The MVP becomes an unnecessary sensitive data repository. |
| ADR-004 | AWS Espana minimal deployment model and what "44 USD/month" does and does not cover. | Cost, backups, logs, secrets and monitoring expectations must be concrete. | `04_outputs/spec-driving/99_final/epi10-salud-propuesta-tecnica-economica.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | Under-scoped infra can fail silently or be more expensive than promised. |
| ADR-005 | Healthie portal/API/webhooks gate and fallback if Healthie fails. | Healthie is not fully validated yet. | `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | Vendor failure blocks customer onboarding and report delivery. |
| ADR-006 | Odoo API/backoffice model: entities, fields, permissions, dashboard and manual TellmeGen status fields. | Odoo is the operational source of truth but its real configuration is unknown. | `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | The system may create duplicate, partial or unusable operations data. |
| ADR-007 | TellmeGen external/no integration policy for Fase 1. | This exclusion protects the project from an unavailable dependency. | `02_context/00_intake_context_pack.md`; `04_outputs/spec-driving/04_commercial_proposal/supporting/04_scope_inclusions_exclusions_v1.md` | Commercial pressure may reintroduce a non-existent integration. |
| ADR-008 | EPI10 Informe Final Copilot operating boundary. | It touches high-risk data and must remain draft support with human review. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_informe_final_copilot_blueprint_v1.md` | The Copilot becomes unsafe, overpromised or legally ambiguous. |
| ADR-009 | Sensitive data, logs, retention and LLM/provider policy. | The current documents state principles, not a concrete matrix. | `02_context/00_intake_context_pack.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | Incidents become hard to detect, contain and explain. |
| ADR-010 | Solo developer + Fer weekly CTO governance. | Scope must match actual capacity, not the team table in `99_final`. | `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | The project tries to build all blocks in parallel and accumulates debt. |

## Decisions To Validate With Fer

| Decision | Proposed validation question | Why Fer should review it | Risk if wrong |
| --- | --- | --- | --- |
| First vertical slice | Should the first slice be `web/pago -> MVP -> Odoo` with idempotency and one state transition? | CTO diagnosis recommends this as the safest first architecture slice. | Starting with Copilot or full Healthie/Odoo parity increases WIP and integration risk. |
| Custom service scope | What is the minimum runtime boundary for the NestJS service in week one? | Prevents custom software from absorbing SaaS responsibilities. | MVP becomes a platform too early. |
| Data matrix | Which data classes may enter PostgreSQL, logs, LLM tools, Healthie and Odoo? | Sensitive data is the main harm profile. | Wrong boundary creates legal/reputation risk. |
| Odoo model | Should Odoo be the case/state/task source of truth even for manual TellmeGen milestones? | This decision controls operational visibility. | Aitor remains middleware without shared visibility. |
| Healthie gate | What is the stop/fallback rule if API/webhooks/DPA/cost fail? | Healthie is still a hypothesis. | The project burns time around a vendor that cannot support scope. |
| Copilot phase | Should Copilot start as a documented procedure + anonymizer before deeper automation? | Solo-developer capacity and data risk argue for a gated start. | Copilot becomes the riskiest part before core operations work. |
| Support boundaries | Which severities, channels and response expectations fit 6 months of included support? | Support can consume the solo developer if undefined. | Delivery success turns into open-ended support load. |

## Decisions To Defer Until Workshop

| Decision | Workshop output needed | Source path | Risk if guessed now |
| --- | --- | --- | --- |
| Final operational states and owners | State list, owner per state, manual TellmeGen milestones and blocked-state rules. | `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`; `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | The state model will not match how EPI10 actually works. |
| Forms, consents and questionnaires | Inventory, canonical owner and where each item lives. | `02_context/00_intake_context_pack.md` | Healthie/Odoo fields are designed around incomplete assumptions. |
| Report template and "ready for report" definition | Required inputs, review criteria, final format and delivery channel. | `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_informe_final_copilot_blueprint_v1.md` | Copilot and report delivery automate the wrong preparation flow. |
| Odoo fields/views/dashboard details | Current Odoo modality, fields, views, permissions and dashboard needs. | `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | Custom fields or API calls may not be possible or useful. |
| Web/pago event contract details | Schema, auth, idempotency key, sandbox, owner and error behavior. | `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md` | Duplicate or lost customers after payment. |
| Healthie plan/API details | Plan, API add-on, webhook list, report upload support, DPA/GDPR and cost. | `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md` | The architecture assumes capabilities that are not bought or allowed. |

## Do Not Reopen Without New Evidence

- Do not design automated TellmeGen integration for Fase 1.
- Do not turn Odoo into a raw genetic or clinical document repository.
- Do not present Copilot output as diagnosis, autonomous genetic interpretation
  or final report without human approval.
- Do not create Stage 06 or a detailed execution plan from this inventory.
- Do not optimize for a multi-person delivery team; the current baseline is Raul
  as primary executor with Fer weekly CTO review.

## Unresolved Unknowns

- Healthie plan/API/webhooks/DPA/residency/cost.
- Odoo modality/API/permissions/model and real hosting/cost.
- Exact web/pago event schema and auth model.
- Final report template, inputs, review rubric and delivery mechanics.
- Data retention matrix and DPO/legal documentation, even if the user has said
  DPO is "tranquilo".
- Monthly volume and current manual hours per case.
