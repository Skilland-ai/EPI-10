# Architecture System Design Mermaid v1

Visual redesign for the Fer CTO weekly on 2026-06-25. This document restates the current EPI10 Salud MVP 1.0 architecture package as renderable Mermaid diagrams. It does not change architecture decisions, provider assumptions or delivery scope.

## Overview

EPI10 MVP 1.0 is a small owned orchestration layer, not a full healthcare platform. Web/pago emits lead and payment events. The EPI10-owned TypeScript/NestJS service in AWS Espana validates events, applies idempotency, records technical metadata in PostgreSQL, coordinates Odoo operational state and integrates Healthie only where API/webhook/DPA/cost validation permits.

Odoo remains the operational source of truth for cases, states, tasks, owners, dashboard and manual TellmeGen milestones. Healthie is the customer portal hypothesis for onboarding, forms, consents, documents, communication and report delivery. TellmeGen stays external/manual in Fase 1. EPI10 Informe Final Copilot is controlled draft support with pseudonymization and mandatory human review.

## Diagram 0 - Big Picture Simplified

This first diagram is intentionally shallow. Its only job is to make the boundary obvious at a glance: actors and web/pago sit outside the custom runtime, the EPI10-owned service and PostgreSQL live inside AWS Espana, SaaS/provider tools stay outside AWS, and TellmeGen remains a manual/out-of-system boundary in Fase 1.

```mermaid
flowchart LR
  classDef actor fill:#F8FAFC,stroke:#475569,color:#111827;
  classDef entry fill:#ECFDF5,stroke:#047857,color:#111827;
  classDef aws fill:#E7F0FF,stroke:#1D4ED8,color:#111827;
  classDef data fill:#DBEAFE,stroke:#1D4ED8,color:#111827;
  classDef saas fill:#ECFDF5,stroke:#047857,color:#111827;
  classDef gated fill:#FEF9C3,stroke:#A16207,color:#111827;
  classDef manual fill:#FFF7ED,stroke:#C2410C,color:#111827;
  classDef error fill:#FEE2E2,stroke:#B91C1C,color:#111827;

  subgraph Actors["Actors / users"]
    Cliente0["Cliente final"]:::actor
    Equipo0["Aitor / equipo EPI10"]:::actor
    Fer0["Fer<br/>CTO review gates"]:::gated
  end

  subgraph Entry0["Outside AWS - entry"]
    WebPago0["web/pago<br/>lead_created<br/>payment_success"]:::entry
  end

  subgraph AWS0["Inside AWS Espana - EPI10-owned MVP"]
    API0["API intake<br/>schema + auth/signature"]:::aws
    Core0["Orchestration core<br/>idempotency<br/>state engine<br/>task engine"]:::aws
    Clients0["Provider clients<br/>Odoo client<br/>Healthie client if valid<br/>report handoff"]:::aws
    PG0[("PostgreSQL tecnico<br/>IDs, event metadata<br/>state snapshots<br/>retries/errors only")]:::data
    Ops0["Reliability + support<br/>retry queue<br/>dead-letter<br/>observability"]:::error
  end

  subgraph SaaS0["Outside AWS - SaaS / providers"]
    Odoo0["Odoo<br/>operational backoffice<br/>cases, states, tasks, dashboard"]:::saas
    Healthie0["Healthie<br/>portal hypothesis<br/>forms, consents, docs, delivery<br/>API/DPA/cost gated"]:::gated
    Copilot0["Copilot / approved LLM tools<br/>pseudonymized draft support<br/>human review required"]:::manual
  end

  subgraph Manual0["Outside AWS - manual boundary"]
    TellmeGen0["TellmeGen B2B<br/>manual only in Fase 1<br/>no API automation"]:::manual
    Recovery0["Manual recovery / fallback<br/>visible as Odoo task"]:::error
  end

  Cliente0 --> WebPago0
  WebPago0 -->|"events"| API0
  API0 --> Core0
  Core0 --> PG0
  Core0 --> Ops0
  Core0 --> Clients0
  Clients0 -->|"case/state/task"| Odoo0
  Clients0 -. "invite/sync if validated" .-> Healthie0
  Healthie0 -. "webhook/poll if validated" .-> API0
  Equipo0 -. "manual lab work" .-> TellmeGen0
  TellmeGen0 -. "manual milestone" .-> Odoo0
  Odoo0 -->|"ready for report"| Equipo0
  Equipo0 -->|"pseudonymized package"| Copilot0
  Copilot0 -->|"draft only"| Equipo0
  Equipo0 -. "final report if API permits" .-> Healthie0
  Ops0 -->|"dead-letter / alert"| Recovery0
  Recovery0 --> Odoo0
  Fer0 --> Core0
  Fer0 --> Odoo0
  Fer0 --> Healthie0
```

## Diagram 1 - Architecture Context

This context view separates the customer entry path, EPI10-owned orchestration, SaaS/external systems, manual boundaries and CTO review gates. Yellow nodes are gated or Unknown, not assumed capabilities.

```mermaid
flowchart LR
  classDef owned fill:#E7F0FF,stroke:#1D4ED8,color:#111827;
  classDef data fill:#DBEAFE,stroke:#1D4ED8,color:#111827;
  classDef external fill:#ECFDF5,stroke:#047857,color:#111827;
  classDef manual fill:#FFF7ED,stroke:#C2410C,color:#111827;
  classDef gated fill:#FEF9C3,stroke:#A16207,color:#111827;
  classDef sensitive fill:#FCE7F3,stroke:#BE185D,color:#111827;
  classDef error fill:#FEE2E2,stroke:#B91C1C,color:#111827;
  classDef actor fill:#F8FAFC,stroke:#475569,color:#111827;

  subgraph A["Actors and review"]
    Cliente["Cliente final"]:::actor
    Equipo["Aitor / equipo EPI10"]:::actor
    Carmen["Carmen / direction"]:::actor
    Raul["Raul<br/>solo builder/operator"]:::actor
    Fer["Fer<br/>CTO reviewer"]:::actor
  end

  subgraph Entry["Entry events"]
    WebPago["web/pago<br/>lead_created<br/>payment_success"]:::external
  end

  subgraph Owned["EPI10-owned MVP layer - AWS Espana"]
    MVP["MVP orchestration service<br/>TypeScript / NestJS"]:::owned
    Modules["Internal modules<br/>auth/signature<br/>idempotency<br/>state engine<br/>task engine<br/>provider clients<br/>retry + dead-letter<br/>observability<br/>report handoff"]:::owned
    PG[("PostgreSQL tecnico<br/>IDs, event metadata<br/>state snapshots<br/>idempotency<br/>retries/errors<br/>sanitized audit markers")]:::data
    Recovery["Manual replay / recovery<br/>by event id or case id"]:::error
  end

  subgraph SaaS["SaaS / external systems"]
    Odoo["Odoo backoffice<br/>contacts, cases, states<br/>tasks, owners, dashboard<br/>manual TellmeGen milestones"]:::external
    Healthie["Healthie portal hypothesis<br/>onboarding, forms, consents<br/>documents, communication<br/>report delivery if API permits"]:::gated
    TellmeGen["TellmeGen B2B<br/>external/manual Fase 1<br/>no API automation"]:::manual
    Copilot["EPI10 Informe Final Copilot<br/>pseudonymized draft support<br/>mandatory human review"]:::manual
    Providers["External providers<br/>AWS, web/pago, LLM/tools"]:::external
  end

  subgraph Boundaries["Data and decision boundaries"]
    Sensitive["Sensitive data posture<br/>no raw genetic data in Odoo or PostgreSQL<br/>no document bodies or prompts in PostgreSQL<br/>no request bodies in logs"]:::sensitive
    Gates["Gates / Unknowns<br/>Healthie API-webhooks-DPA-cost<br/>Odoo modality/API/fields<br/>web/pago schema/auth/idempotency<br/>report template and retention matrix"]:::gated
    ADRs["ADR review themes<br/>custom layer scope<br/>PostgreSQL data boundary<br/>Healthie fallback<br/>Odoo model<br/>Copilot/LLM policy<br/>support boundaries"]:::gated
  end

  Cliente -->|"1 lead/payment"| WebPago
  WebPago -->|"1 events"| MVP
  MVP --> Modules
  MVP -->|"event ledger + state snapshot"| PG
  MVP -->|"create/update case/state/task"| Odoo
  MVP -. "invite/sync if validated" .-> Healthie
  Healthie -. "2 webhook or polling if validated" .-> MVP
  Equipo -. "3 manual use" .-> TellmeGen
  Equipo -->|"manual milestone"| Odoo
  Odoo -->|"4 ready for report"| Equipo
  Equipo -->|"authorized inputs"| Copilot
  Copilot -->|"draft only + human review"| Equipo
  Equipo -->|"final report delivery if allowed"| Healthie
  MVP -->|"delivery marker / follow-up task"| Odoo
  MVP -->|"retry exhaustion"| Recovery
  Recovery -->|"manual recovery task"| Odoo
  Fer --> ADRs
  Fer --> Gates
  Fer --> Sensitive
  Fer -->|"first vertical slice"| MVP
  Raul --> MVP
  Carmen -->|"service control, CX, cost visibility"| Odoo
  Sensitive --- PG
  Sensitive --- Odoo
  Sensitive --- Copilot
  Gates --- Healthie
  Gates --- Odoo
  Gates --- WebPago
  Providers --- MVP
```

## Diagram 2 - Event and Data Flow

The sequence view keeps the four source flows explicit. It also shows bounded retries, dead-letter/manual recovery and the rule that TellmeGen data does not enter MVP/PostgreSQL automatically in Fase 1.

```mermaid
sequenceDiagram
  autonumber
  actor Cliente as Cliente final
  participant WebPago as web/pago
  participant MVP as EPI10 MVP service
  participant PG as PostgreSQL tecnico
  participant Odoo as Odoo backoffice
  participant Healthie as Healthie portal
  actor Equipo as Aitor/equipo EPI10
  participant TellmeGen as TellmeGen manual
  participant Copilot as Informe Final Copilot

  rect rgb(231, 240, 255)
    Note over Cliente,Healthie: Flow 1 - lead/payment to operational case
    Cliente->>WebPago: Form submission or payment
    WebPago->>MVP: lead_created or payment_success
    MVP->>MVP: Validate schema, auth/signature and idempotency key
    MVP->>PG: Store sanitized event metadata and idempotency status
    MVP->>Odoo: Create/update contact, case, state, owner task
    alt Healthie API/webhooks validated
      MVP->>Healthie: Create/invite client
    else Healthie gate not passed
      MVP->>Odoo: Record portal fallback task/flag
    end
  end

  rect rgb(236, 253, 245)
    Note over Cliente,Odoo: Flow 2 - portal onboarding to Odoo state
    Cliente->>Healthie: Complete onboarding, forms, consents, documents
    alt webhook available and signed
      Healthie->>MVP: Portal completion/document event
    else webhook unavailable
      MVP->>Healthie: Poll validated API endpoint or mark manual check
    end
    MVP->>PG: Map Healthie event to internal case and Odoo ID
    MVP->>Odoo: Update state, dates, flags and next tasks
  end

  rect rgb(255, 247, 237)
    Note over Equipo,Odoo: Flow 3 - TellmeGen external/manual
    Equipo->>TellmeGen: Use B2B platform manually
    TellmeGen-->>Equipo: Result/status visible outside MVP
    Equipo->>Odoo: Update manual TellmeGen milestone
    Note over MVP,PG: No automated TellmeGen users, tests, barcodes, polling, PDF download or raw genetic ingestion in Fase 1
  end

  rect rgb(254, 249, 195)
    Note over Odoo,Healthie: Flow 4 - report production and delivery
    Odoo->>Equipo: Case ready_for_report
    Equipo->>Equipo: Prepare authorized inputs from Healthie, TellmeGen and internal review
    Equipo->>Copilot: Pseudonymized working package only
    Copilot-->>Equipo: Draft support output
    Equipo->>Equipo: Mandatory human review and approval/rejection
    alt Healthie report delivery API permits
      Equipo->>Healthie: Deliver final report
    else approved fallback channel
      Equipo->>Cliente: Deliver final report through approved fallback
    end
    Equipo->>Odoo: Record delivery date/status and follow-up task
    MVP->>PG: Store delivery marker only, not report content
  end

  rect rgb(254, 226, 226)
    Note over MVP,Odoo: Retry, dead-letter and recovery pattern
    MVP->>MVP: Bounded retry for provider call failure
    alt retry succeeds
      MVP->>PG: Mark operation completed
    else retry exhausted
      MVP->>PG: Store sanitized failure class in retry/error record
      MVP->>Odoo: Create manual recovery task
      MVP-->>Equipo: Alert owner for high-severity failure
    end
  end
```

## Diagram 3 - Operational State Lifecycle

The state model is a draft for workshop validation. Odoo is the visible operational state surface; PostgreSQL may store technical state snapshots for idempotency/replay; Healthie contributes portal signals; TellmeGen milestones remain manual in Odoo.

```mermaid
stateDiagram-v2
  [*] --> lead_received
  lead_received --> payment_pending
  payment_pending --> payment_confirmed: payment_success
  payment_confirmed --> portal_invite_pending
  portal_invite_pending --> portal_invite_sent
  portal_invite_sent --> onboarding_started
  onboarding_started --> onboarding_completed
  onboarding_completed --> consent_pending
  consent_pending --> consent_completed
  consent_completed --> questionnaire_pending
  questionnaire_pending --> questionnaire_completed
  questionnaire_completed --> documents_pending
  documents_pending --> documents_received
  documents_received --> tellmegen_manual_pending
  tellmegen_manual_pending --> tellmegen_result_available: manual Odoo milestone
  tellmegen_result_available --> ready_for_report
  ready_for_report --> report_in_preparation
  report_in_preparation --> report_in_human_review
  report_in_human_review --> report_approved: human approval
  report_in_human_review --> report_in_preparation: rework
  report_approved --> report_delivered
  report_delivered --> follow_up_active
  follow_up_active --> closed
  closed --> [*]

  lead_received --> incident: malformed event
  payment_confirmed --> incident: provider failure
  portal_invite_pending --> incident: Healthie gate/failure
  documents_pending --> incident: missing or stale portal signal
  tellmegen_manual_pending --> incident: manual milestone missing
  report_in_preparation --> incident: unsafe Copilot input
  incident --> manual_recovery
  manual_recovery --> payment_confirmed: replay/retry fixed
  manual_recovery --> portal_invite_pending: portal recovery
  manual_recovery --> documents_pending: document follow-up
  manual_recovery --> tellmegen_manual_pending: milestone follow-up
  manual_recovery --> report_in_preparation: report recovery
```

## Diagram 4 - Data Boundaries, Security And Recovery

This view highlights what each system may hold, what must not be stored, and how failures become observable recovery work. It intentionally treats provider capabilities as gates where the source architecture says Unknown.

```mermaid
flowchart TB
  classDef owned fill:#E7F0FF,stroke:#1D4ED8,color:#111827;
  classDef data fill:#DBEAFE,stroke:#1D4ED8,color:#111827;
  classDef external fill:#ECFDF5,stroke:#047857,color:#111827;
  classDef manual fill:#FFF7ED,stroke:#C2410C,color:#111827;
  classDef gated fill:#FEF9C3,stroke:#A16207,color:#111827;
  classDef sensitive fill:#FCE7F3,stroke:#BE185D,color:#111827;
  classDef error fill:#FEE2E2,stroke:#B91C1C,color:#111827;

  subgraph Intake["Inbound events and contracts"]
    WebContract["web/pago contract<br/>event names + schema<br/>forbidden sensitive fields<br/>auth/signature<br/>idempotency key<br/>sandbox and retry behavior"]:::gated
    HealthieContract["Healthie contract gate<br/>plan/API/webhooks<br/>report upload<br/>DPA/GDPR/residency<br/>rate limits/sandbox"]:::gated
    OdooContract["Odoo contract gate<br/>edition/modality/version<br/>API auth<br/>object model/fields<br/>permissions/dashboard<br/>manual TellmeGen fields"]:::gated
  end

  subgraph Allowed["Allowed storage / processing"]
    PGAllowed[("PostgreSQL tecnico<br/>IDs and external identity map<br/>event metadata and timestamps<br/>state snapshots<br/>idempotency keys<br/>retry/error classes<br/>sanitized audit markers")]:::data
    HealthieAllowed["Healthie<br/>portal profile<br/>forms/consents/questionnaires<br/>documents/analytics<br/>communication<br/>report delivery if permitted"]:::external
    OdooAllowed["Odoo<br/>contact/case<br/>operational state<br/>tasks/owners/dashboard<br/>manual TellmeGen milestones<br/>report delivery marker"]:::external
    CopilotAllowed["Copilot workspace<br/>pseudonymized package<br/>draft support<br/>short retention only if approved<br/>human review checklist"]:::manual
  end

  subgraph Forbidden["Explicit forbidden or minimized data"]
    NoRaw["No raw genetic data<br/>in Odoo or PostgreSQL"]:::sensitive
    NoDocs["No document bodies, report contents<br/>or sensitive prompts in PostgreSQL"]:::sensitive
    NoLogs["No request bodies from Healthie,<br/>web/pago or report flows in logs"]:::sensitive
    NoAutoDx["No autonomous diagnosis<br/>or final report without human approval"]:::sensitive
  end

  subgraph Recovery["Errors, retries, observability and support"]
    Retry["Bounded retries<br/>operation-level idempotency where possible"]:::error
    DeadLetter["Retry exhaustion / dead-letter<br/>sanitized failure class"]:::error
    ManualTask["Odoo manual recovery task<br/>owner and next action"]:::error
    Alert["Alert owner for high-severity failure"]:::error
    Obs["Minimum observability<br/>events by source/type/status<br/>failed calls by provider/class<br/>retry queue depth<br/>dead-letter list<br/>last Healthie/Odoo sync<br/>report delivery markers<br/>Raul support dashboard/query"]:::owned
    Support["Support boundaries<br/>severity classes<br/>channel and response expectations<br/>bug fix vs new feature split"]:::gated
  end

  subgraph Governance["Governance gates"]
    FerReview["Fer review<br/>ADRs, risks, state model<br/>first vertical slice<br/>data boundary and support scope"]:::gated
    RaulSeq["Raul solo sequence<br/>ADRs first<br/>web/pago -> MVP -> PostgreSQL -> Odoo<br/>Healthie after gate<br/>recovery before broad state<br/>Copilot procedure first<br/>TellmeGen manual"]:::gated
    Unknowns["Unresolved Unknowns<br/>Healthie plan/API/DPA/cost<br/>Odoo API/fields/hosting<br/>web/pago schema/auth<br/>report template/readiness<br/>data retention + LLM policy<br/>volume and manual hours"]:::gated
  end

  WebContract --> Retry
  HealthieContract --> Retry
  OdooContract --> Retry
  Retry --> PGAllowed
  Retry --> DeadLetter
  DeadLetter --> ManualTask
  ManualTask --> OdooAllowed
  DeadLetter --> Alert
  DeadLetter --> Obs
  Obs --> Support

  PGAllowed -. "must not hold" .-> NoRaw
  PGAllowed -. "must not hold" .-> NoDocs
  PGAllowed -. "logs must avoid" .-> NoLogs
  OdooAllowed -. "must not hold" .-> NoRaw
  CopilotAllowed -. "must obey" .-> NoAutoDx
  CopilotAllowed -. "requires" .-> NoLogs
  HealthieAllowed -. "preferred document/report surface if permitted" .-> NoDocs

  FerReview --> Unknowns
  FerReview --> RaulSeq
  RaulSeq --> WebContract
  RaulSeq --> OdooContract
  RaulSeq --> HealthieContract
```

## Contracts And Gates

| Area | Still to define or validate |
| --- | --- |
| web/pago | Event names and schemas, required fields, forbidden sensitive fields, auth/signature or shared secret, idempotency key, sandbox/test events, retry behavior, timeout expectations and event failure owner. |
| Healthie | API plan/add-on and cost, client creation/invitation, form/consent/questionnaire signals, document upload signal, report upload/delivery support, webhook signing/retries/payloads, DPA/GDPR/residency, rate limits and sandbox. |
| Odoo | Edition/modalidad/version, API auth, object model and custom fields, permissions, backups/hosting owner, views/dashboard, task creation model and manual TellmeGen status fields. |
| Copilot / LLM tools | Approved environment, allowed input classes after pseudonymization, prompt/log retention, human review checklist, versioning/final approval record and provider/API cost. |
| TellmeGen | No API integration in Fase 1, manual status vocabulary, owner for Odoo updates, result artifacts allowed for report preparation and evidence that would reopen Fase 2 API design. |

## Failure Modes Preserved As Text

| Failure mode | Preserved design response |
| --- | --- |
| Duplicate `payment_success` | Idempotency key and identity map before side effects. |
| Malformed web/pago event | Reject with clear error, log sanitized reason and notify owner. |
| Odoo API unavailable | Retry, then dead-letter and manual recovery task. |
| Healthie API unavailable or not purchased | Treat as vendor gate, use explicit fallback and do not describe fallback as automation. |
| Healthie webhook missing event | Use polling/manual check fallback if available and show stale marker. |
| Copilot receives non-pseudonymized inputs | Human checklist and script gate before draft generation. |
| LLM/tool stores prompts unexpectedly | Use only approved corporate tools and document retention terms. |
| TellmeGen result status not updated manually | Odoo manual milestone owner and reminder task. |
| Logs contain sensitive payload | Structured logs with redaction and payload-free error classes. |

## ADR And Review Gates

The diagrams preserve the accepted ADR direction: Fase 1 is an operational MVP, a small software propio layer exists for orchestration and traceability, TypeScript/NestJS is the default backend stack, PostgreSQL is technical-only, AWS Espana is the base infrastructure, Healthie is a portal hypothesis, Odoo is operational backoffice, TellmeGen is external/manual, Copilot is draft support with pseudonymization and human review, data minimization is non-negotiable, and the real delivery baseline is Raul solo with Fer weekly CTO review.

The diagrams also keep the ADRs still needing formalization visible: custom layer scope, stack/runtime, PostgreSQL schema/retention/encryption/backups, minimal AWS deployment model, Healthie gate/fallback, Odoo API/backoffice model, TellmeGen no-integration policy, Copilot operating boundary, sensitive data/logs/retention/LLM policy and solo-developer governance.

## Fer Review Questions

- Confirm the first vertical slice: `web/pago -> MVP -> PostgreSQL -> Odoo` with one case, one state transition, idempotency and observable failure.
- Confirm NestJS/TypeScript plus PostgreSQL is still boring enough for Raul solo.
- Confirm Odoo is the operational source of truth and PostgreSQL is only technical support state.
- Confirm Healthie gate and fallback rule.
- Confirm the minimum ADR set before real data enters the system.
- Confirm Copilot starts as checklist plus anonymizer plus human-review workflow before deeper automation.
- Confirm support severity and channel boundaries.

## Workshop Decisions

- Final operational states, owners and blocked-state rules.
- Forms, consents and questionnaires inventory and canonical owner.
- Report template, readiness rule, final format and approval rubric.
- Odoo modality, fields, views, permissions and dashboard needs.
- web/pago event schema, auth, idempotency key, sandbox, owner and error behavior.
- Healthie plan, API add-on, webhook list, report upload support, DPA/GDPR and cost.
- Manual TellmeGen milestones and owner.
- Volume, expected cases per month and current manual hours per case.

## Solo-Developer Sequencing

This is represented as governance, not a Stage 06 plan:

1. Close ADRs and data boundaries before real data.
2. Build the smallest vertical slice: `web/pago -> MVP -> PostgreSQL -> Odoo` with one case, one state transition and idempotency.
3. Add Healthie only after API/webhooks/DPA/cost are validated.
4. Add retry/dead-letter/manual recovery before broad state coverage.
5. Start Copilot as checklist plus anonymizer plus documented human-review process.
6. Keep TellmeGen manual and visible in Odoo.

## QA

The Mermaid version preserves the same architectural information as `supporting/diagram_content_inventory_v1.md`: actors, entry events, owned MVP layer, PostgreSQL, Healthie, Odoo, TellmeGen, Copilot, the four flows, state model, contracts, data boundaries, idempotency/retries/dead-letter/manual recovery, observability/support, failure modes, security/privacy, solo-developer sequencing, ADRs, Fer gates, workshop decisions and unresolved unknowns.

Information intentionally represented as text rather than only diagram: full integration contract checklists, full failure-mode table, ADR inventory themes, Fer review questions, workshop-bound decisions and solo-developer sequencing. These items are too dense for a single readable diagram and are therefore cross-referenced by diagram nodes plus preserved as tables/lists.

Unresolved Unknowns preserved from the source architecture package:

- Healthie plan/API/webhooks/DPA/residency/cost.
- Odoo modality/API/permissions/model, fields, hosting and cost.
- web/pago event schema, auth model, idempotency key and sandbox behavior.
- Report template, required inputs, readiness rule, review rubric and delivery mechanics.
- Data retention matrix, legal/DPO documentation and LLM/provider policy.
- Case volume and current manual hours per case.
