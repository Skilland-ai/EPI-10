# Architecture Briefing v1 - Weekly Fer CTO 2026-06-25

## Architecture In 5 Minutes

EPI10 Salud MVP 1.0 should be understood as a small orchestration layer, not as a
full healthcare platform.

The customer enters through web/pago. A small EPI10-owned backend in AWS Espana
receives the event, validates it, applies idempotency, creates or updates the
operational case in Odoo, and coordinates the customer portal in Healthie if the
API/webhooks validate.

Healthie owns the customer-facing portal: onboarding, forms, consents,
questionnaires, documents, communication and report delivery where possible.

Odoo owns the internal operation: contact, case, state, tasks, owner, dashboard,
manual TellmeGen milestones and follow-up.

PostgreSQL is only a technical database for IDs, event metadata, state snapshot,
idempotency, retry/error records and sanitized audit markers. It must not become
a clinical, genetic or document repository.

TellmeGen remains outside the system in Fase 1. Aitor/equipo use it manually and
update Odoo milestones. This is a deliberate boundary, not a missing feature.

EPI10 Informe Final Copilot is an internal draft-support flow: inputs are
anonymized/pseudonymized, a draft is generated in an authorized environment, and
EPI10 performs mandatory human review before any final report is delivered.

## Why Software Propio Exists

The custom layer exists because the core problem is not "connect two SaaS tools".
The core problem is operating a sensitive, multi-step service with clear states,
responsibilities, retries, fallbacks and traceability.

If all logic lives in SaaS configuration or low-code glue, EPI10 risks scattered
state, duplicated data, weak recovery paths and no durable asset. If too much is
built custom, Raul inherits a platform too large for the phase.

The right compromise is a small owned service that does only the business-critical
orchestration:

- event intake;
- identity mapping;
- idempotency;
- state transitions;
- Odoo/Healthie integration;
- retries and errors;
- report delivery handoff;
- sanitized operational traceability.

Everything else should remain commodity unless proven otherwise.

## Core vs Commodity

| Area | Core for EPI10 | Commodity / vendor-owned |
| --- | --- | --- |
| Operational state and case progress | Yes. Must be visible and controlled. | Odoo can provide UI/storage, but state semantics belong to EPI10. |
| Customer portal UX | Not core in Fase 1. | Healthie or equivalent should cover it if terms/API pass. |
| Forms, consents, documents | Mostly commodity in Fase 1. | Healthie should own the customer/document surface. |
| Integration contracts and retries | Core. | Should live in owned MVP layer, not ad hoc manual work. |
| Genetic lab workflow | Not automatable in Fase 1. | TellmeGen stays external/manual. |
| Informe final process | Core as process and quality control. | LLM/tools can assist drafts, never own final judgment. |
| Raw data storage | Not a product feature. | Minimize and keep in the right vendor/system. |

## Biggest CTO Risks

| Risk | CTO concern | Recommended stance |
| --- | --- | --- |
| Scope exceeds Raul solo capacity | The signed package is broad: Healthie, Odoo, AWS, Copilot, QA and support. | Force vertical slices and weekly Fer gates. |
| Healthie is not validated | API/webhooks/DPA/residency/cost are still unknown. | Treat Healthie as a gate, not a fact. |
| Odoo reality is unknown | API, fields, permissions and hosting may differ from the proposal. | Audit before designing final model. |
| Custom layer grows too much | "Software propio" can become platform creep. | Keep MVP layer to orchestration and traceability. |
| Sensitive data leaks into logs/DB/LLM | Harm profile is high. | ADR for data classes, retention, logs and LLM use. |
| Copilot is overpromised | It can be misread as diagnosis or automatic report generation. | Position as draft support with human approval. |
| TellmeGen sneaks back in | The provider has no current operational API. | Keep manual boundary visible in Odoo. |
| Support becomes open-ended | Six months support without severity/channel limits can consume delivery capacity. | Define support boundaries early. |

## Decisions To Validate With Fer

- Confirm first vertical slice: `web/pago -> MVP -> PostgreSQL -> Odoo` with one
  case, one state transition, idempotency and observable failure.
- Confirm NestJS/TypeScript + PostgreSQL remains the right boring stack for
  Raul solo.
- Confirm Odoo is the operational source of truth and PostgreSQL is only
  technical support state.
- Confirm Healthie gate and fallback rule.
- Confirm minimal required ADRs before real data enters the system.
- Confirm Copilot starts as checklist + anonymizer + human-review workflow
  before deeper automation.
- Confirm support severity/channel boundaries.

## Recommended First Vertical Slice

Build discussion should start around one thin slice:

1. Web/pago sends `payment_success`.
2. MVP validates schema/auth and idempotency.
3. MVP records technical event metadata in PostgreSQL.
4. MVP creates/updates one Odoo contact/case.
5. MVP sets one operational state and one owner task.
6. Failure produces a sanitized error, retry/dead-letter entry and manual
   recovery task.

Why this slice:

- proves the custom layer has a reason to exist;
- proves idempotency and operational state before vendor complexity;
- gives Fer something concrete to review;
- gives EPI10 visible value without waiting for Copilot or full Healthie scope;
- keeps Raul's WIP small.

Healthie should come immediately after its gate passes. Copilot should stay
procedural until the report template, data policy and human-review rubric are
closed.

## What Not To Build Yet

- Do not build Stage 06 from this weekly package.
- Do not build automated TellmeGen integration.
- Do not build a genetic dashboard.
- Do not build a custom portal while Healthie/equivalent remains viable.
- Do not build a broad bidirectional sync before one vertical slice works.
- Do not build Copilot against real sensitive data before the data/retention/LLM
  ADR is accepted.
- Do not build advanced reporting before operational state is reliable.
- Do not design for a fake multi-person delivery team; design for Raul with Fer
  reviewing weekly.

## Fer Review Agenda

1. Validate the architecture boundary: custom orchestration vs SaaS ownership.
2. Review ADR inventory and identify mandatory pre-build ADRs.
3. Challenge the first vertical slice.
4. Challenge the data boundary and logging/retention policy.
5. Decide Healthie/Odoo gate criteria.
6. Decide how Copilot should enter Fase 1 safely.
7. Set the next weekly CTO checkpoint.

## Open Unknowns To Keep Visible

- Healthie plan/API/webhooks/DPA/residency/cost.
- Odoo modality/API/permissions/fields.
- Web/pago event schema/auth/idempotency.
- Report template and "ready for report" rule.
- Data retention and LLM/provider policy.
- Case volume and current manual hours per case.
