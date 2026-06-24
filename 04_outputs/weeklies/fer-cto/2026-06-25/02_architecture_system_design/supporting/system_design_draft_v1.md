# System Design Draft v1 - EPI10 Salud MVP 1.0

## Purpose

Draft for Fer CTO weekly on 2026-06-25. This is a review artifact, not Stage 06,
not a detailed execution plan and not a backlog.

The design assumes the accepted Fase 1 framing: a small EPI10-owned
orchestration service in AWS Espana, Healthie as portal hypothesis, Odoo as
operational backoffice, EPI10 Informe Final Copilot as internal draft support,
and TellmeGen as external/manual in Fase 1.

## System Goals

- Create a controlled operational path from web/pago to case creation, portal
  onboarding, Odoo state/task visibility and report delivery.
- Reduce Aitor/equipo manual coordination without pretending TellmeGen is
  integrated.
- Keep the custom software layer small: state, idempotency, integration logic,
  retries, errors, technical traceability and report handoff.
- Keep sensitive content in the right systems and minimize what the custom
  PostgreSQL database and logs store.
- Make the first production-worthy slice feasible for Raul as solo developer
  with Fer reviewing weekly.

## Non-Goals

- No full custom healthcare platform in Fase 1.
- No automated TellmeGen users, tests, barcodes, status polling, PDF download or
  structured genetic result ingestion.
- No genetic dashboard.
- No autonomous diagnosis or automatic genetic interpretation.
- No Copilot final report without mandatory human review.
- No Odoo storage of raw genetic data.
- No PostgreSQL storage of raw genetic data or document bodies.
- No Stage 06 plan from this document.

## Actors

| Actor | Role in the system |
| --- | --- |
| Cliente final | Enters via web/pago, completes portal onboarding, uploads documents/analytics, receives report and follow-up. |
| Aitor / equipo EPI10 | Operates cases, uses TellmeGen manually, reviews inputs, executes report process, handles incidents. |
| Carmen / direction | Reviews service control, customer experience, cost and operational visibility. |
| Raul | Primary builder/operator during delivery. Needs a small, reviewable architecture. |
| Fer | Weekly CTO reviewer. Validates ADRs, scope, data boundaries and sequencing. |
| External providers | Healthie, Odoo, web/pago provider, AWS, LLM/tool providers and TellmeGen. |

## Module Boundaries

| Boundary | Owns | Must not own |
| --- | --- | --- |
| Web/pago | Lead/payment capture and payment event emission. | Long-running case state, clinical data, report production. |
| EPI10 MVP orchestration service | Event intake, auth/signature validation, idempotency, state routing, provider clients, retries, technical logs, ID mapping. | Portal UI, Odoo UI, raw genetic data, clinical document repository. |
| PostgreSQL tecnico | Cross-system IDs, idempotency keys, event timestamps, operational state snapshot, retry/error records. | Raw genetic results, full documents, report contents, sensitive prompts. |
| Healthie | Client portal, onboarding, forms, consents, questionnaires, documents, communication, report delivery if API permits. | Internal source of truth for operational tasks and owners. |
| Odoo | Contacts, case/service records, states, tasks, owners, dashboard and manual TellmeGen milestones. | Portal experience, raw genetic data, report authoring. |
| EPI10 Informe Final Copilot | Pseudonymized draft package, draft support, review workflow, export preparation. | Autonomous diagnosis, final approval, runtime transaction processing. |
| TellmeGen | External B2B platform used manually by EPI10. | Fase 1 API integration. |

## Proposed Components

### EPI10 MVP Orchestration Service

- Backend: TypeScript / NestJS.
- Deployment: AWS Espana, lightweight Fase 1 setup.
- API endpoints:
  - `POST /events/web-payment` for `lead_created` and `payment_success`.
  - `POST /webhooks/healthie/*` if Healthie webhooks validate.
  - internal/admin endpoint or script for controlled replay/manual recovery.
- Clients:
  - Healthie API client.
  - Odoo API client.
  - optional web/pago verification client if provider supports it.
- Internal modules:
  - auth/signature validation;
  - idempotency;
  - state engine;
  - task engine;
  - retry/dead-letter handling;
  - technical logging/observability;
  - report upload handoff.

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

### EPI10 Informe Final Copilot

Initial boundary:

- checklist of inputs;
- anonymization/pseudonymization script;
- pseudonymized working package;
- prompts/skills/scripts in an authorized corporate environment;
- draft output only;
- mandatory human review;
- final report handoff to Healthie/Odoo if API allows.

## Event and Data Flow

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
3. Anonymization/pseudonymization script creates a minimized working package.
4. Copilot generates an internal draft.
5. Human review approves or rejects the draft.
6. Final report is delivered through Healthie if API permits, otherwise through
   the approved fallback channel.
7. MVP/Odoo records delivery state/date and follow-up task.

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
- Every state transition needs source event, actor/provider and timestamp.

## Integration Contracts To Define

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

### Copilot / LLM Tools

- Approved corporate environment.
- Allowed input classes after pseudonymization.
- Prompt/log retention.
- Human review checklist.
- Versioning and final approval record.
- Provider/API cost if any.

### TellmeGen

- No API integration in Fase 1.
- Manual status vocabulary.
- Who updates Odoo.
- Which result artifacts may be used for report preparation.
- What future evidence would reopen Fase 2 API design.

## Data Classes and Storage Boundaries

| Data class | Preferred location | MVP/PostgreSQL treatment | Notes |
| --- | --- | --- | --- |
| Public/commercial copy | Web/CMS/proposal docs | Not relevant | No architecture risk. |
| Client identity/contact | Odoo + Healthie | IDs and minimum references only | Avoid unnecessary replication. |
| Payment status | Web/pasarela + Odoo | Payment event id/status/timestamp only | No card/payment sensitive data. |
| Forms/consents/questionnaires | Healthie | Completion flags/dates only | Odoo can show status, not full content by default. |
| Documents/analytics | Healthie | Reference/status only | Avoid email and custom blob storage if Healthie covers it. |
| Raw genetic results | TellmeGen/manual review | Do not store | Fase 1 exclusion. |
| Report draft package | Controlled Copilot workspace | Do not store by default | Pseudonymized and short retention. |
| Final report | Healthie delivery + Odoo reference | Delivery marker only | Report content should not live in PostgreSQL. |
| Logs/errors | AWS logging/monitoring | Sanitized failure class only | No sensitive payloads. |

## Idempotency and Retries

- Every inbound event must carry or derive an idempotency key.
- Duplicate events should be safe: same customer/payment cannot create duplicate
  Odoo cases or Healthie clients.
- Provider calls need operation-level idempotency where possible.
- Retries must be bounded and visible.
- Retry exhaustion creates:
  - sanitized error record;
  - Odoo task/manual recovery item;
  - alert to owner for high-severity failures.
- Manual replay should operate by event id/case id without exposing sensitive
  payloads in logs.

## Observability and Support

Minimum observability:

- Count of inbound events by source/type/status.
- Failed provider calls by provider/failure class.
- Retry queue depth.
- Dead-letter/manual recovery list.
- Last successful Healthie/Odoo sync time.
- Report delivery success/failure markers.
- Support dashboard or queryable report for Raul.

Support posture:

- Define severity classes before delivery.
- Separate bug fixes from new features.
- Define support channel and response expectations.
- Keep a weekly Fer review path during build, not during all 6 months of
  support unless explicitly agreed.

## Failure Modes

| Failure | Impact | Design response |
| --- | --- | --- |
| Web/pago sends duplicate `payment_success`. | Duplicate case/customer. | Idempotency key and identity map before side effects. |
| Web/pago event is malformed. | Case not created. | Reject with clear error, log sanitized reason, notify owner. |
| Odoo API unavailable. | Operational state/task not updated. | Retry, then dead-letter and manual recovery task. |
| Healthie API unavailable or API not purchased. | Portal invite/report upload cannot automate. | Gate vendor; use explicit fallback and do not hide it as automation. |
| Healthie webhook missing event. | Odoo state stale. | Polling/manual check fallback if available; dashboard stale marker. |
| Copilot receives non-pseudonymized inputs. | Sensitive data risk. | Human checklist and script gate before draft generation. |
| LLM/tool stores prompts unexpectedly. | Compliance/reputation risk. | Use only approved corporate tools and document retention terms. |
| TellmeGen result status is not updated manually. | Report readiness unclear. | Odoo manual milestone owner and reminder task. |
| Logs contain sensitive payload. | Security/privacy incident. | Structured logs with redaction and payload-free error classes. |

## Security and Privacy Notes

- Treat personal, health and genetic data as sensitive.
- Default to data minimization.
- Do not store raw genetic data in Odoo or PostgreSQL.
- Do not log request bodies from Healthie, web/pago or report flows.
- Use secrets management for provider credentials.
- Use least-privilege provider/API credentials.
- Document retention for PostgreSQL event metadata, logs and Copilot working
  packages.
- Require human review before final report delivery.
- Escalate legal/DPO review for provider terms, retention, LLM use and cross
  system data sharing.

## Solo-Developer Sequencing

Recommended architecture sequence for discussion with Fer, not a Stage 06 plan:

1. Close ADRs and data boundaries before real data.
2. Build the smallest vertical slice: `web/pago -> MVP -> PostgreSQL -> Odoo`
   with one case, one state transition and idempotency.
3. Add Healthie only after API/webhooks/DPA/cost are validated.
4. Add retry/dead-letter/manual recovery before adding broad state coverage.
5. Start Copilot as checklist + anonymizer + documented human-review process;
   deepen automation only after the report template and data policy are fixed.
6. Keep TellmeGen manual and visible in Odoo.

## Open Questions For Fer

- Is NestJS/PostgreSQL still the right level of custom software for Raul solo,
  or should the first slice be even thinner?
- What is the minimum ADR set before any build starts?
- Which data classes are categorically forbidden from PostgreSQL, logs and LLM
  tooling?
- Should Odoo or PostgreSQL be the authoritative state source during retries?
- What is the Healthie fallback rule if API/webhooks or DPA fail?
- Which support signals are enough for the 6-month included support without
  overbuilding observability?

## Open Questions For Workshop

- Final operational states, owners and blocked-state rules.
- Real Odoo version/modalidad/API/permissions/fields.
- Healthie plan/API/webhook/report upload/DPA/cost.
- Web/pago provider, event schema, auth and sandbox.
- Report template, readiness rule and final approval rubric.
- Manual TellmeGen milestones and owner.
- Volume, expected cases/month and current manual hours/case.
