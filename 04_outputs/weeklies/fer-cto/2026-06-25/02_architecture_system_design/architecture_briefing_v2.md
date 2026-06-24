# Architecture Briefing v2 - Weekly Fer CTO 2026-06-25

## What Changed From v1

v1 was useful, but its Copilot interpretation was wrong or too ambiguous in the
visual package: it allowed `EPI10 Informe Final Copilot` to appear as tooling
outside the AWS/EPI10-owned architecture. v2 corrects that boundary.

`Copilot Harness` now belongs inside AWS Espana / EPI10-owned. It is an internal
workflow harness made of subagents, skills, workflow/scripts, input checklist,
anonymization/pseudonymization and human review gates. Runtime, model/provider,
App Codigo surface, retention, IAM and cost remain `Unknown`.

## Architecture In 5 Minutes

EPI10 Salud MVP 1.0 is a small owned orchestration layer plus an internal report
harness, not a full healthcare platform.

The customer enters through web/pago. A small EPI10-owned backend in AWS Espana
receives events, validates schema/auth, applies idempotency, records technical
metadata in PostgreSQL, creates or updates the operational case in Odoo, and
coordinates Healthie only if API/webhooks/DPA/cost validate.

Healthie owns the customer-facing portal hypothesis: onboarding, forms,
consents, questionnaires, documents, communication and report delivery where
possible.

Odoo owns internal operations: contact, case, state, tasks, owner, dashboard,
manual TellmeGen milestones and follow-up.

PostgreSQL is only a technical database for IDs, event metadata, state snapshot,
idempotency, retry/error records and sanitized audit markers. It must not become
a clinical, genetic, document or prompt repository.

TellmeGen remains outside the system in Fase 1. Aitor/equipo use it manually and
update Odoo milestones.

Copilot Harness is inside the AWS/EPI10-owned boundary. It prepares internal
draft support using a checklist, pseudonymization/anonymization, subagents,
skills and workflow/scripts. EPI10 performs mandatory human review before any
final report is delivered.

## Why The Harness Belongs Inside AWS/EPI10-Owned

The final report process is core to EPI10. The valuable asset is not just a model
call; it is the controlled workflow around readiness, minimization, draft
support, review and handoff.

If that workflow is treated as vendor-side or loose tool usage, EPI10 loses
control of data classes, audit markers, human review gates and operational
fallbacks. If it is overbuilt, Raul inherits too much platform complexity.

The right compromise is an owned harness with implementation details still
gated: keep the process boundary inside EPI10/AWS, keep model/runtime details
`Unknown`, and force ADRs before real sensitive data enters the path.

## Core vs Commodity After Correction

| Area | Core for EPI10 | Commodity / vendor-owned |
| --- | --- | --- |
| Operational state and case progress | Yes. State semantics and recovery must be controlled. | Odoo can provide UI/storage. |
| Customer portal UX | Not core in Fase 1. | Healthie or equivalent should cover it if terms/API pass. |
| Forms, consents, documents | Mostly commodity in Fase 1. | Healthie should own the customer/document surface. |
| Integration contracts and retries | Core. | Should live in owned MVP layer. |
| Genetic lab workflow | Not automatable in Fase 1. | TellmeGen stays external/manual. |
| Copilot Harness workflow | Core as report-process control. | A model/tool dependency may exist later, but details are `Unknown`. |
| Final report judgment | Core human responsibility. | No automated final approval. |
| Raw data storage | Not a product feature. | Minimize and keep in the right system. |

## Biggest CTO Risks After Correction

| Risk | CTO concern | Recommended stance |
| --- | --- | --- |
| Scope exceeds Raul solo capacity | The package now includes orchestration plus internal report harness. | Force vertical slices and weekly Fer gates. |
| Harness becomes platform creep | Subagents, skills and workflow/scripts can grow fast. | Start with checklist, pseudonymization and one narrow draft-support workflow. |
| Runtime/model assumptions leak in | Runtime, model/provider, App Codigo, IAM, retention and cost are `Unknown`. | Make explicit ADR gates before real data. |
| Sensitive data leaks into logs/packages/prompts | Harm profile is high. | Data matrix, redaction, retention and human checklist before use. |
| Healthie is not validated | API/webhooks/DPA/residency/cost are still unknown. | Treat Healthie as a gate, not a fact. |
| Odoo reality is unknown | API, fields, permissions and hosting may differ from proposal. | Audit before final model. |
| TellmeGen sneaks back in | Provider has no current operational API. | Keep manual boundary visible in Odoo. |
| Support becomes open-ended | Six months support can consume delivery capacity. | Define severity/channel boundaries early. |

## Decisions To Validate With Fer

- Confirm first vertical slice: `web/pago -> MVP -> PostgreSQL -> Odoo` with one
  case, one state transition, idempotency and observable failure.
- Confirm NestJS/TypeScript + PostgreSQL remains the right boring stack for
  Raul solo.
- Confirm Odoo is the operational source of truth and PostgreSQL is only
  technical support state.
- Confirm Healthie gate and fallback rule.
- Confirm Copilot Harness is inside AWS Espana / EPI10-owned and App Codigo, if
  used, is only an interaction surface.
- Confirm minimum ADRs before real data enters Copilot Harness.
- Confirm support severity/channel boundaries.

## Updated First Vertical Slice

Build discussion should still start around one thin slice:

1. Web/pago sends `payment_success`.
2. MVP validates schema/auth and idempotency.
3. MVP records technical event metadata in PostgreSQL.
4. MVP creates/updates one Odoo contact/case.
5. MVP sets one operational state and one owner task.
6. Failure produces a sanitized error, retry/dead-letter entry and manual
   recovery task.

Why this slice still comes first:

- proves the custom layer has a reason to exist;
- proves idempotency and operational state before vendor or report complexity;
- gives Fer something concrete to review;
- gives EPI10 visible value without waiting for Healthie or Copilot Harness;
- keeps Raul's WIP small.

Copilot Harness should sequence after the data boundary, report template,
pseudonymization checklist and human review rubric are accepted. Its first safe
slice should be procedural: checklist + pseudonymization + one draft-support
workflow behind human review.

## What Not To Build Yet

- Do not build Stage 06 from this weekly package.
- Do not build automated TellmeGen integration.
- Do not build a genetic dashboard.
- Do not build a custom portal while Healthie/equivalent remains viable.
- Do not build broad bidirectional sync before one vertical slice works.
- Do not run Copilot Harness against real sensitive data before data/retention,
  model/runtime and human-review ADRs are accepted.
- Do not make App Codigo the architectural owner of the report process.
- Do not build advanced reporting before operational state is reliable.
- Do not design for a fake multi-person delivery team; design for Raul with Fer
  reviewing weekly.

## Fer Review Agenda

1. Validate the architecture boundary: custom orchestration plus internal
   Copilot Harness vs vendor-owned surfaces.
2. Review ADR inventory and identify mandatory pre-build ADRs.
3. Challenge the first vertical slice.
4. Challenge the Copilot Harness boundary and data policy.
5. Decide Healthie/Odoo gate criteria.
6. Decide how Copilot Harness should enter Fase 1 safely.
7. Set the next weekly CTO checkpoint.

## Open Unknowns To Keep Visible

- Healthie plan/API/webhooks/DPA/residency/cost.
- Odoo modality/API/permissions/fields.
- Web/pago event schema/auth/idempotency.
- Report template and `ready_for_report` rule.
- Copilot Harness runtime/services, App Codigo interface, LLM/model/provider,
  prompt/log retention, IAM and cost.
- Case volume and current manual hours per case.
