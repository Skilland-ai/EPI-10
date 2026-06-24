# System Design Draft v2 - EPI10 Salud MVP 1.0

## Purpose

Draft for Fer CTO weekly on 2026-06-25. This is a review artifact, not Stage 06,
not a detailed execution plan and not a backlog.

v2 supersedes v1 for the `Copilot Harness` boundary. The corrected design keeps
EPI10 Informe Final Copilot inside the AWS Espana / EPI10-owned system boundary
as an internal harness composed of subagents, skills, workflow/scripts,
data-preparation gates and mandatory human review gates.

## System Goals

- Create a controlled operational path from web/pago to case creation, portal
  onboarding, Odoo state/task visibility and report delivery.
- Reduce Aitor/equipo manual coordination without pretending TellmeGen is
  integrated.
- Keep the custom software layer small: state, idempotency, integration logic,
  retries, errors, technical traceability and report handoff.
- Keep the Copilot Harness owned by EPI10 inside AWS Espana while leaving
  runtime/model/App Codigo/retention details as `Unknown` until ADR closure.
- Keep sensitive content in the right systems and minimize what PostgreSQL,
  logs and temporary harness packages store.
- Make the first production-worthy slice feasible for Raul as solo developer
  with Fer reviewing weekly.

## Non-Goals

- No full custom healthcare platform in Fase 1.
- No automated TellmeGen users, tests, barcodes, status polling, PDF download or
  structured genetic result ingestion.
- No genetic dashboard.
- No autonomous diagnosis or automatic genetic interpretation.
- No Copilot Harness final approval without mandatory human review.
- No Odoo storage of raw genetic data.
- No PostgreSQL storage of raw genetic data, document bodies, report contents
  or sensitive prompts.
- No final AWS runtime, LLM/model/provider, App Codigo, IAM, retention or cost
  design in this draft; these remain `Unknown`.
- No Stage 06 plan from this document.

## Actors

| Actor | Role in the system |
| --- | --- |
| Cliente final | Enters via web/pago, completes portal onboarding, uploads documents/analytics, receives report and follow-up. |
| Aitor / equipo EPI10 | Operates cases, uses TellmeGen manually, reviews inputs, executes report process, handles incidents. |
| Carmen / direction | Reviews service control, customer experience, cost and operational visibility. |
| Raul | Primary builder/operator during delivery. Needs a small, reviewable architecture. |
| Fer | Weekly CTO reviewer. Validates ADRs, scope, data boundaries, Copilot Harness boundary and sequencing. |
| External providers | Healthie, Odoo, web/pago provider, AWS infrastructure, possible model/tool dependencies and TellmeGen. |

## Module Boundaries

| Boundary | Owns | Must not own |
| --- | --- | --- |
| Web/pago | Lead/payment capture and payment event emission. | Long-running case state, clinical data, report production. |
| AWS Espana / EPI10-owned runtime | MVP orchestration service, PostgreSQL technical support state, Copilot Harness workflow boundary, retries, observability and controlled report handoff. | Customer portal UI, Odoo UI, TellmeGen automation, final clinical judgment. |
| EPI10 MVP orchestration service | Event intake, auth/signature validation, idempotency, state routing, provider clients, retries, technical logs, ID mapping, Odoo/Healthie handoff. | Portal UI, Odoo UI, raw genetic data, clinical document repository, report authoring judgment. |
| PostgreSQL tecnico | Cross-system IDs, idempotency keys, event timestamps, operational state snapshot, retry/error records, sanitized audit markers. | Raw genetic results, full documents, report contents, sensitive prompts, harness packages by default. |
| Copilot Harness | Input checklist, anonymization/pseudonymization workflow, subagents, skills, workflow/scripts, draft support, human review gate, export/handoff procedure markers. | Autonomous diagnosis, final approval, raw genetic repository, customer portal, Odoo source of truth. |
| Healthie | Client portal, onboarding, forms, consents, questionnaires, documents, communication, report delivery if API permits. | Internal source of truth for operational tasks and owners. |
| Odoo | Contacts, case/service records, states, tasks, owners, dashboard and manual TellmeGen milestones. | Portal experience, raw genetic data, report authoring. |
| TellmeGen | External B2B platform used manually by EPI10. | Fase 1 API integration. |

## Proposed Components

### EPI10 MVP Orchestration Service

- Backend: TypeScript / NestJS.
- Deployment: AWS Espana, lightweight Fase 1 setup.
- API endpoints:
  - `POST /events/web-payment` for `lead_created` and `payment_success`;
  - `POST /webhooks/healthie/*` if Healthie webhooks validate;
  - internal/admin endpoint or script for controlled replay/manual recovery.
- Clients:
  - Healthie API client;
  - Odoo API client;
  - optional web/pago verification client if provider supports it.
- Internal modules:
  - auth/signature validation;
  - idempotency;
  - state engine;
  - task engine;
  - retry/dead-letter handling;
  - technical logging/observability;
  - report delivery marker/handoff.

### PostgreSQL Technical DB

Minimum tables to discuss, not final schema:

- `external_identity_map`: internal case id, web id, payment id, Healthie id,
  Odoo id, timestamps.
- `event_ledger`: event id, source, type, idempotency key, status, timestamps,
  sanitized error reference.
- `case_state_snapshot`: internal case id, current operational state, last
  event, Odoo case id, timestamps.
- `retry_queue`: provider, operation, status, retry count, next retry at,
  sanitized failure class.
- `audit_marker`: non-sensitive markers such as report delivered, human review
  completed, anonymization completed.

### Copilot Harness Inside AWS Espana / EPI10-Owned

Conceptual components, not final implementation design:

- input checklist;
- anonymization/pseudonymization workflow/scripts;
- subagents for structured draft-assistance tasks;
- skills for repeatable report preparation operations;
- workflow/scripts for validation, assembly and export support;
- draft generation/support step;
- human review and approval/rejection gate;
- export/handoff procedure to Healthie if API permits or approved fallback;
- Odoo/MVP status marker update.

Known Unknowns:

- exact AWS runtime/services;
- exact App Codigo interaction surface and deployment model;
- exact LLM/model/provider/residency;
- IAM/secrets model;
- prompt/log retention;
- temporary package storage and retention;
- cost model.

### Odoo Backoffice

Expected entities/fields to validate:

- Contact/customer.
- Case/service record.
- Operational state.
- Responsible owner.
- Tasks/next actions.
- Manual TellmeGen milestone fields.
- Report delivery date/status.
- Incident/blocker flags.
- Dashboard by state and owner.

### Healthie Portal

Capabilities to validate before depending on them:

- client creation or invitation;
- onboarding;
- forms/questionnaires;
- consent completion signal;
- document upload event or polling;
- report upload/delivery via API;
- webhooks;
- DPA/GDPR/residency and plan/API cost.

## Event And Data Flow

### Flow 1 - Lead/payment to operational case

1. Cliente final submits form or completes payment on web/pago.
2. Web/pago sends `lead_created` or `payment_success` to the MVP service.
3. MVP validates schema, auth/signature and idempotency key.
4. MVP stores a sanitized event ledger record.
5. MVP creates/updates Odoo contact and case.
6. MVP creates/invites Healthie client if API permits.
7. MVP sets initial Odoo state and task for Aitor/equipo.

### Flow 2 - Portal onboarding to Odoo state

1. Cliente final completes onboarding/forms/consents/documents in Healthie.
2. Healthie emits webhook or MVP polls validated API endpoints.
3. MVP maps Healthie event to internal case and Odoo case.
4. MVP updates Odoo state, dates, flags and next tasks.
5. If data is missing or provider call fails, MVP creates a recovery task.

### Flow 3 - TellmeGen external/manual

1. Aitor/equipo uses TellmeGen B2B outside the MVP.
2. Test/result milestones are updated manually in Odoo.
3. Odoo state controls whether the case is ready for report.
4. No automated TellmeGen data enters MVP/PostgreSQL in Fase 1.

### Flow 4 - Report production and delivery

1. Odoo marks case as ready for report.
2. Equipo prepares authorized inputs from Healthie, TellmeGen and internal
   review.
3. AWS/EPI10-owned Copilot Harness runs checklist, anonymization or
   pseudonymization, subagent/skill workflow and draft-support steps.
4. Human review approves or rejects.
5. Final report is delivered through Healthie if permitted or approved fallback.
6. Odoo/MVP records delivery marker only: state/date/status/follow-up marker,
   not report contents.

## State Model Draft

Draft states to validate in workshop:

- `lead_received`
- `payment_pending`
- `payment_confirmed`
- `portal_invite_pending`
- `portal_invite_sent`
- `onboarding_started`
- `onboarding_completed`
- `consent_pending`
- `consent_completed`
- `questionnaire_pending`
- `questionnaire_completed`
- `documents_pending`
- `documents_received`
- `tellmegen_manual_pending`
- `tellmegen_result_available`
- `ready_for_report`
- `report_in_preparation`
- `report_in_human_review`
- `report_approved`
- `report_delivered`
- `follow_up_active`
- `closed`
- `incident`

State principles:

- Odoo is the visible operational state surface.
- PostgreSQL may store the technical state snapshot for idempotency and replay.
- Healthie states are customer/portal signals, not the internal source of truth.
- TellmeGen states are manual milestones in Odoo until an API exists.
- Copilot Harness markers are non-sensitive operational markers: checklist
  done, pseudonymization done, human review done, approved/rejected.
- Every state transition needs source event, actor/provider and timestamp.

## Contracts To Define

### Web/pago

- Event names and schemas.
- Required fields and forbidden sensitive fields.
- Auth/signature or shared secret.
- Idempotency key.
- Sandbox/test event support.
- Retry behavior and timeout expectations.
- Owner and contact path for event failures.

### Healthie

- API plan/add-on and cost.
- Client creation/invitation endpoint.
- Form/consent/questionnaire completion signals.
- Document upload signal.
- Report upload/delivery support.
- Webhook signing, retries and event payload shape.
- DPA/GDPR/residency terms.
- Rate limits and sandbox availability.

### Odoo

- Edition/modalidad/version.
- API auth method.
- Object model and custom fields.
- Permission model.
- Backups/hosting owner.
- Required views/dashboard.
- Task creation model.
- Manual TellmeGen status fields.

### Copilot Harness Internal Contract

- Input checklist and `ready_for_report` rule.
- Allowed data classes after anonymization/pseudonymization.
- Forbidden inputs and stop conditions.
- Subagents, skills and workflow/scripts catalog.
- App Codigo or equivalent internal UI: `Unknown`.
- Runtime/model/provider/residency: `Unknown`.
- Prompt/log retention and audit markers: `Unknown`.
- Human review checklist.
- Versioning and final approval record.
- Export/handoff procedure.

### TellmeGen

- No API integration in Fase 1.
- Manual status vocabulary.
- Who updates Odoo.
- Which result artifacts may be used for report preparation.
- What future evidence would reopen Fase 2 API design.

## Data Classes And Storage Boundaries

| Data class | Preferred location | MVP/PostgreSQL treatment | Copilot Harness treatment |
| --- | --- | --- | --- |
| Public/commercial copy | Web/CMS/proposal docs | Not relevant | Not relevant |
| Client identity/contact | Odoo + Healthie | IDs and minimum references only | Direct identifiers removed or replaced before draft support |
| Payment status | Web/pasarela + Odoo | Payment event id/status/timestamp only | Not used |
| Forms/consents/questionnaires | Healthie | Completion flags/dates only | Minimized facts only after checklist and pseudonymization |
| Documents/analytics | Healthie | Reference/status only | Minimized excerpts only if allowed by data ADR |
| Raw genetic results | TellmeGen/manual review | Do not store | Do not use unless explicitly allowed and minimized by future policy |
| Report draft package | Copilot Harness temporary package | Do not store by default | Temporary, pseudonymized, retention `Unknown` until ADR |
| Final report | Healthie delivery + Odoo reference | Delivery marker only | No final approval authority |
| Logs/errors | AWS logging/monitoring | Sanitized failure class only | No sensitive prompts/payloads without approved policy |

## Idempotency And Retries

- Every inbound event must carry or derive an idempotency key.
- Duplicate events should be safe: same customer/payment cannot create duplicate
  Odoo cases or Healthie clients.
- Provider calls need operation-level idempotency where possible.
- Copilot Harness operations need case-level run identifiers to prevent
  duplicate draft/export runs.
- Retries must be bounded and visible.
- Retry exhaustion creates:
  - sanitized error record;
  - Odoo task/manual recovery item;
  - alert to owner for high-severity failures.
- Manual replay should operate by event id/case id/run id without exposing
  sensitive payloads in logs.

## Observability And Support

Minimum observability:

- Count of inbound events by source/type/status.
- Failed provider calls by provider/failure class.
- Retry queue depth.
- Dead-letter/manual recovery list.
- Last successful Healthie/Odoo sync time.
- Copilot Harness checklist, pseudonymization, draft, human review and export
  markers without sensitive content.
- Report delivery success/failure markers.
- Support dashboard or queryable report for Raul.

Support posture:

- Define severity classes before delivery.
- Separate bug fixes from new features.
- Define support channel and response expectations.
- Keep weekly Fer review path during build, not during all 6 months of support
  unless explicitly agreed.

## Failure Modes

| Failure | Impact | Design response |
| --- | --- | --- |
| Web/pago sends duplicate `payment_success`. | Duplicate case/customer. | Idempotency key and identity map before side effects. |
| Web/pago event is malformed. | Case not created. | Reject with clear error, log sanitized reason, notify owner. |
| Odoo API unavailable. | Operational state/task not updated. | Retry, then dead-letter and manual recovery task. |
| Healthie API unavailable or API not purchased. | Portal invite/report upload cannot automate. | Gate vendor; use explicit fallback and do not hide it as automation. |
| Healthie webhook missing event. | Odoo state stale. | Polling/manual check fallback if available; dashboard stale marker. |
| Copilot Harness receives non-pseudonymized inputs. | Sensitive data risk. | Stop workflow; create recovery task; require human checklist review. |
| Copilot Harness runtime/model unavailable. | Draft support unavailable. | Use manual report preparation fallback. |
| Subagent/skill/workflow creates unsafe draft. | Report quality risk. | Keep draft internal; human review rejects and sends to rework. |
| Prompt/log retention policy not approved. | Compliance/reputation risk. | Do not process real sensitive material until policy is accepted. |
| TellmeGen result status is not updated manually. | Report readiness unclear. | Odoo manual milestone owner and reminder task. |
| Logs contain sensitive payload. | Security/privacy incident. | Structured logs with redaction and payload-free error classes. |

## Security And Privacy Notes

- Treat personal, health and genetic data as sensitive.
- Default to data minimization.
- Do not store raw genetic data in Odoo or PostgreSQL.
- Do not log request bodies from Healthie, web/pago, report or harness flows.
- Use secrets management for provider credentials and model/tool credentials
  when the exact model/tool path is selected.
- Use least-privilege provider/API credentials.
- Document retention for PostgreSQL event metadata, logs and Copilot Harness
  temporary packages.
- Require human review before final report delivery.
- Escalate legal/DPO review for provider terms, retention, model/tool use and
  cross-system data sharing.

## Solo-Developer Sequencing

Recommended architecture sequence for discussion with Fer, not a Stage 06 plan:

1. Close ADRs and data boundaries before real data.
2. Build the smallest vertical slice: `web/pago -> MVP -> PostgreSQL -> Odoo`
   with one case, one state transition and idempotency.
3. Add Healthie only after API/webhooks/DPA/cost are validated.
4. Add retry/dead-letter/manual recovery before adding broad state coverage.
5. Start Copilot Harness as checklist + pseudonymization + subagents/skills
   workflow behind documented human review; deepen automation only after report
   template, runtime, data policy and review rubric are fixed.
6. Keep TellmeGen manual and visible in Odoo.

## Open Questions For Fer

- Is NestJS/PostgreSQL still the right level of custom software for Raul solo?
- What is the minimum ADR set before any build starts?
- Which data classes are categorically forbidden from PostgreSQL, logs and
  Copilot Harness packages?
- Should Odoo or PostgreSQL be the authoritative state source during retries?
- What is the Healthie fallback rule if API/webhooks or DPA fail?
- What is the minimum safe Copilot Harness runtime surface?
- Is App Codigo only an interaction surface for the harness, and what remains
  `Unknown` until implementation design?
- Which support signals are enough for 6-month included support without
  overbuilding observability?

## Open Questions For Workshop

- Final operational states, owners and blocked-state rules.
- Real Odoo version/modalidad/API/permissions/fields.
- Healthie plan/API/webhook/report upload/DPA/cost.
- Web/pago provider, event schema, auth and sandbox.
- Report template, readiness rule and final approval rubric.
- Copilot Harness subagents, skills, workflow/scripts and human review checklist.
- Manual TellmeGen milestones and owner.
- Volume, expected cases/month and current manual hours/case.
