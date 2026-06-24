# Architecture System Design Mermaid v2

Visual redesign v2 for the Fer CTO weekly on 2026-06-25. This version corrects
the report-harness boundary: `Copilot Harness` is inside AWS Espana /
EPI10-owned, composed of subagents, skills, workflow/scripts, data-preparation
gates and mandatory human review gates. Runtime/model/App Codigo/IAM/retention
details remain `Unknown`.

## Overview

EPI10 MVP 1.0 is a small owned orchestration system. The customer enters through
web/pago. AWS Espana contains the EPI10-owned MVP service, PostgreSQL technical
DB and Copilot Harness. Healthie and Odoo remain outside AWS as integrated
systems. TellmeGen remains manual in Fase 1.

## Diagram 0 - Big Picture

This diagram is intentionally shallow: it shows what is inside AWS/EPI10-owned,
what remains outside, and how the main relationships work.

```mermaid
flowchart LR
  classDef actor fill:#F8FAFC,stroke:#475569,color:#111827;
  classDef owned fill:#E7F0FF,stroke:#1D4ED8,color:#111827;
  classDef data fill:#DBEAFE,stroke:#1D4ED8,color:#111827;
  classDef external fill:#ECFDF5,stroke:#047857,color:#111827;
  classDef manual fill:#FFF7ED,stroke:#C2410C,color:#111827;
  classDef gated fill:#FEF9C3,stroke:#A16207,color:#111827;
  classDef error fill:#FEE2E2,stroke:#B91C1C,color:#111827;

  subgraph Actors0["Actors"]
    Cliente0["Cliente final"]:::actor
    Equipo0["Aitor / equipo EPI10"]:::actor
    Fer0["Fer<br/>CTO review"]:::gated
  end

  WebPago0["web/pago<br/>lead_created<br/>payment_success"]:::external

  subgraph AWS0["AWS Espana - EPI10-owned"]
    MVP0["MVP orchestration<br/>TypeScript / NestJS<br/>events, state, idempotency, retries"]:::owned
    PG0[("PostgreSQL tecnico<br/>IDs, event metadata,<br/>state snapshots, retries/errors")]:::data
    Harness0["Copilot Harness<br/>input checklist<br/>pseudonymization<br/>subagents + skills<br/>workflow/scripts<br/>draft support<br/>human review gates"]:::owned
    Unknown0["Unknown<br/>runtime, model/provider,<br/>App Codigo surface,<br/>IAM, retention, cost"]:::gated
    Recovery0["dead-letter<br/>manual recovery<br/>alerts"]:::error
  end

  subgraph Ext0["External systems"]
    Healthie0["Healthie<br/>portal hypothesis<br/>forms, consents, docs, delivery if permitted"]:::gated
    Odoo0["Odoo<br/>operational backoffice<br/>cases, states, tasks, dashboard"]:::external
  end

  subgraph Manual0["Manual boundary"]
    TellmeGen0["TellmeGen B2B<br/>manual Fase 1"]:::manual
  end

  Cliente0 --> WebPago0
  WebPago0 --> MVP0
  MVP0 --> PG0
  MVP0 --> Odoo0
  MVP0 -. "invite/sync if valid" .-> Healthie0
  Healthie0 -. "webhook/poll if valid" .-> MVP0
  Equipo0 -. "manual lab work" .-> TellmeGen0
  TellmeGen0 -. "manual milestone" .-> Odoo0
  Odoo0 -->|"ready_for_report"| Harness0
  Equipo0 -->|"authorized inputs"| Harness0
  Harness0 -->|"draft + human review result"| Equipo0
  Harness0 -. "delivery package if permitted" .-> Healthie0
  Harness0 -->|"marker only"| Odoo0
  MVP0 --> Recovery0
  Recovery0 --> Odoo0
  Fer0 --> MVP0
  Fer0 --> Harness0
  Unknown0 --- Harness0
```

## Diagram 1 - Architecture Context

The context view keeps ownership clear: AWS Espana contains the EPI10-owned
runtime and harness; Healthie/Odoo are integrated systems; TellmeGen is manual.

```mermaid
flowchart LR
  classDef actor fill:#F8FAFC,stroke:#475569,color:#111827;
  classDef owned fill:#E7F0FF,stroke:#1D4ED8,color:#111827;
  classDef data fill:#DBEAFE,stroke:#1D4ED8,color:#111827;
  classDef external fill:#ECFDF5,stroke:#047857,color:#111827;
  classDef manual fill:#FFF7ED,stroke:#C2410C,color:#111827;
  classDef gated fill:#FEF9C3,stroke:#A16207,color:#111827;
  classDef sensitive fill:#FCE7F3,stroke:#BE185D,color:#111827;
  classDef error fill:#FEE2E2,stroke:#B91C1C,color:#111827;

  subgraph Actors["Actors and governance"]
    Cliente["Cliente final"]:::actor
    Equipo["Aitor / equipo EPI10"]:::actor
    Carmen["Carmen / direction"]:::actor
    Raul["Raul<br/>solo builder/operator"]:::actor
    Fer["Fer<br/>CTO reviewer"]:::gated
  end

  WebPago["web/pago<br/>lead_created<br/>payment_success<br/>schema/auth/idempotency Unknown"]:::external

  subgraph AWS["AWS Espana / EPI10-owned"]
    MVP["MVP orchestration service<br/>TypeScript / NestJS"]:::owned
    Modules["Modules<br/>API intake<br/>auth/signature<br/>idempotency<br/>state engine<br/>task engine<br/>provider clients<br/>retry/dead-letter<br/>observability"]:::owned
    PG[("PostgreSQL tecnico<br/>external IDs<br/>event metadata<br/>state snapshots<br/>idempotency<br/>retry/error records<br/>sanitized audit markers")]:::data
    Harness["Copilot Harness<br/>input checklist<br/>anonymization/pseudonymization<br/>subagents<br/>skills<br/>workflow/scripts<br/>draft support<br/>human review gates<br/>export/handoff procedure"]:::owned
    HarnessUnknown["Harness Unknowns<br/>runtime/services<br/>LLM/model/provider<br/>App Codigo UI<br/>IAM/secrets<br/>prompt/log retention<br/>cost"]:::gated
    Recovery["Reliability<br/>bounded retries<br/>dead-letter<br/>manual replay<br/>alerts"]:::error
  end

  subgraph External["External integrated systems"]
    Odoo["Odoo backoffice<br/>contacts, cases, states<br/>tasks, owners, dashboard<br/>manual TellmeGen milestones"]:::external
    Healthie["Healthie portal hypothesis<br/>onboarding, forms, consents<br/>documents, communication<br/>report delivery if API permits"]:::gated
  end

  subgraph Manual["Manual / out-of-system"]
    TellmeGen["TellmeGen B2B<br/>manual use in Fase 1<br/>no automated users/tests/barcodes/polling/PDF downloads"]:::manual
    HumanReport["Human report responsibility<br/>expert review<br/>approval/rejection<br/>no autonomous diagnosis"]:::manual
  end

  Sensitive["Sensitive data posture<br/>no raw genetic data in Odoo or PostgreSQL<br/>no document bodies, report contents or sensitive prompts in PostgreSQL<br/>no sensitive payloads in logs"]:::sensitive

  Cliente -->|"1 lead/payment"| WebPago
  WebPago --> MVP
  MVP --> Modules
  MVP --> PG
  MVP -->|"case/state/task"| Odoo
  MVP -. "invite/sync if validated" .-> Healthie
  Healthie -. "2 webhook/poll if validated" .-> MVP
  Equipo -. "3 manual lab work" .-> TellmeGen
  TellmeGen -. "manual milestone" .-> Odoo
  Odoo -->|"4 ready_for_report"| Harness
  Equipo -->|"authorized inputs"| Harness
  Harness -->|"draft support"| HumanReport
  HumanReport -->|"approval/rejection"| Harness
  Harness -. "final delivery if permitted" .-> Healthie
  Harness -->|"delivery marker only"| Odoo
  MVP --> Recovery
  Recovery --> Odoo
  Fer --> MVP
  Fer --> Harness
  Fer --> Sensitive
  Raul --> MVP
  Carmen --> Odoo
  HarnessUnknown --- Harness
  Sensitive --- PG
  Sensitive --- Harness
  Sensitive --- Odoo
```

## Diagram 2 - Event And Report Flow

The sequence view preserves flows 1-4. Flow 4 now runs through the AWS/EPI10-owned
Copilot Harness before human review and delivery.

```mermaid
sequenceDiagram
  autonumber
  actor Cliente as Cliente final
  participant WebPago as web/pago
  participant MVP as MVP service in AWS
  participant PG as PostgreSQL tecnico
  participant Odoo as Odoo backoffice
  participant Healthie as Healthie portal
  actor Equipo as Aitor/equipo EPI10
  participant TellmeGen as TellmeGen manual
  participant Harness as Copilot Harness in AWS

  rect rgb(231, 240, 255)
    Note over Cliente,Healthie: Flow 1 - lead/payment to operational case
    Cliente->>WebPago: Form submission or payment
    WebPago->>MVP: lead_created or payment_success
    MVP->>MVP: Validate schema, auth/signature and idempotency key
    MVP->>PG: Store sanitized event metadata
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
    Note over MVP,PG: No automated TellmeGen data enters MVP/PostgreSQL in Fase 1
  end

  rect rgb(231, 240, 255)
    Note over Odoo,Healthie: Flow 4 - report production and delivery
    Odoo->>Harness: ready_for_report marker
    Equipo->>Harness: Authorized inputs after preparation
    Harness->>Harness: Input checklist
    Harness->>Harness: Anonymization/pseudonymization gate
    Harness->>Harness: subagents + skills + workflow/scripts draft support
    Harness-->>Equipo: Internal draft and review package
    Equipo->>Equipo: Mandatory human review and approval/rejection
    Equipo->>Harness: Human review result
    alt approved and Healthie delivery API permits
      Harness->>Healthie: Export/handoff final report
    else approved fallback channel
      Equipo->>Cliente: Deliver through approved fallback
    end
    Harness->>Odoo: Record delivery marker/date/status only
    Harness->>PG: Store sanitized audit marker only if allowed
  end

  rect rgb(254, 226, 226)
    Note over MVP,Odoo: Retry, dead-letter and manual recovery
    MVP->>MVP: Bounded retry for provider call failure
    alt retry succeeds
      MVP->>PG: Mark operation completed
    else retry exhausted
      MVP->>PG: Store sanitized failure class
      MVP->>Odoo: Create manual recovery task
      MVP-->>Equipo: Alert owner for high-severity failure
    end
    alt harness input or pseudonymization fails
      Harness->>Odoo: Create report-preparation blocker task
      Harness-->>Equipo: Stop workflow until manual recovery
    end
  end
```

## Diagram 3 - Operational State Lifecycle

The state model remains a draft for workshop validation. v2 adds explicit
harness markers without turning PostgreSQL or Odoo into report-content stores.

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
  report_in_preparation --> harness_checklist_done
  harness_checklist_done --> harness_pseudonymized
  harness_pseudonymized --> report_in_human_review
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
  report_in_preparation --> incident: unsafe harness input
  harness_checklist_done --> incident: pseudonymization failure
  incident --> manual_recovery
  manual_recovery --> payment_confirmed: replay/retry fixed
  manual_recovery --> portal_invite_pending: portal recovery
  manual_recovery --> documents_pending: document follow-up
  manual_recovery --> tellmegen_manual_pending: milestone follow-up
  manual_recovery --> report_in_preparation: report recovery
```

## Diagram 4 - Data, Security And Recovery

This view keeps storage and recovery rules visible. The harness may process a
temporary minimized package, but exact storage, logging and retention are
`Unknown` until ADR closure.

```mermaid
flowchart TB
  classDef owned fill:#E7F0FF,stroke:#1D4ED8,color:#111827;
  classDef data fill:#DBEAFE,stroke:#1D4ED8,color:#111827;
  classDef external fill:#ECFDF5,stroke:#047857,color:#111827;
  classDef manual fill:#FFF7ED,stroke:#C2410C,color:#111827;
  classDef gated fill:#FEF9C3,stroke:#A16207,color:#111827;
  classDef sensitive fill:#FCE7F3,stroke:#BE185D,color:#111827;
  classDef error fill:#FEE2E2,stroke:#B91C1C,color:#111827;

  subgraph Contracts["Contracts and gates"]
    WebContract["web/pago<br/>schema, auth, idempotency<br/>sandbox, retry behavior<br/>Unknown details"]:::gated
    HealthieContract["Healthie<br/>API/webhooks, report delivery<br/>DPA/GDPR/residency/cost<br/>Unknown details"]:::gated
    OdooContract["Odoo<br/>API auth, fields, permissions<br/>dashboard, hosting<br/>Unknown details"]:::gated
    HarnessContract["Copilot Harness internal contract<br/>input checklist<br/>allowed/forbidden data<br/>subagents, skills, workflow/scripts<br/>human review checklist"]:::owned
    HarnessUnknowns["Harness Unknowns<br/>runtime/services<br/>LLM/model/provider<br/>App Codigo interface<br/>IAM/secrets<br/>prompt/log retention<br/>temporary storage<br/>cost"]:::gated
  end

  subgraph Storage["Allowed storage and processing"]
    PGAllowed[("PostgreSQL tecnico<br/>IDs, event metadata<br/>state snapshots<br/>idempotency keys<br/>retry/error classes<br/>sanitized audit markers")]:::data
    OdooAllowed["Odoo<br/>contact/case<br/>operational state<br/>tasks/owners/dashboard<br/>manual TellmeGen milestones<br/>delivery marker"]:::external
    HealthieAllowed["Healthie<br/>portal profile<br/>forms/consents/docs<br/>communication<br/>report delivery if permitted"]:::external
    HarnessAllowed["Copilot Harness<br/>temporary pseudonymized package<br/>draft support<br/>review package<br/>approval/rejection marker"]:::owned
  end

  subgraph Forbidden["Forbidden or minimized"]
    NoRaw["No raw genetic data<br/>in Odoo or PostgreSQL"]:::sensitive
    NoDocs["No document bodies, report contents<br/>or sensitive prompts in PostgreSQL"]:::sensitive
    NoLogs["No sensitive payloads<br/>in logs/prompts without policy"]:::sensitive
    NoAuto["No autonomous diagnosis<br/>No final approval by harness"]:::sensitive
  end

  subgraph Recovery["Recovery and support"]
    Retry["Bounded retries<br/>operation idempotency"]:::error
    DeadLetter["Retry exhaustion<br/>dead-letter<br/>sanitized failure class"]:::error
    ManualTask["Odoo manual recovery task<br/>owner + next action"]:::error
    HarnessStop["Harness stop condition<br/>missing input, unsafe input,<br/>pseudonymization failure"]:::error
    Obs["Observability<br/>events by status<br/>failed calls by provider/class<br/>retry depth<br/>dead-letter list<br/>sync markers<br/>harness markers<br/>report delivery markers"]:::owned
  end

  WebContract --> Retry
  HealthieContract --> Retry
  OdooContract --> Retry
  HarnessContract --> HarnessAllowed
  HarnessUnknowns --- HarnessAllowed
  Retry --> PGAllowed
  Retry --> DeadLetter
  DeadLetter --> ManualTask
  DeadLetter --> Obs
  ManualTask --> OdooAllowed
  HarnessAllowed --> HarnessStop
  HarnessStop --> ManualTask
  HarnessAllowed -. "must obey" .-> NoAuto
  HarnessAllowed -. "must avoid" .-> NoLogs
  PGAllowed -. "must not hold" .-> NoRaw
  PGAllowed -. "must not hold" .-> NoDocs
  OdooAllowed -. "must not hold" .-> NoRaw
  HealthieAllowed -. "preferred document/report surface if permitted" .-> NoDocs
  Obs --> ManualTask
```

## Sequencing And Gates

1. Close ADRs and data boundaries before real data.
2. Build `web/pago -> MVP -> PostgreSQL -> Odoo` first.
3. Add Healthie only after API/webhooks/DPA/cost are validated.
4. Add retry/dead-letter/manual recovery before broad state coverage.
5. Start Copilot Harness as checklist + pseudonymization + subagents/skills
   workflow behind human review.
6. Keep TellmeGen manual and visible in Odoo.

## Unresolved Unknowns

- Healthie plan/API/webhooks/DPA/residency/cost.
- Odoo modality/API/permissions/model, fields, hosting and cost.
- web/pago event schema, auth model, idempotency key and sandbox behavior.
- Report template, required inputs, readiness rule, review rubric and delivery.
- Copilot Harness runtime/services, App Codigo interface, LLM/model/provider,
  IAM/secrets, prompt/log retention, temporary storage and cost.
- Case volume and current manual hours per case.

## QA Note

This Mermaid v2 preserves actors, entry events, MVP service, PostgreSQL,
Healthie, Odoo, TellmeGen, flows 1-4, state model, contracts, data boundaries,
idempotency/retries/dead-letter/manual recovery, observability/support, failure
modes, security/privacy, solo-developer sequencing, ADR/Fer gates and Unknowns.
The corrected boundary is explicit: `Copilot Harness` is inside AWS Espana /
EPI10-owned and includes subagents, skills, workflow/scripts and human review.
