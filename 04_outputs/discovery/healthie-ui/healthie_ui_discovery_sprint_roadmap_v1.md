# EPI10 Healthie UI Discovery Sprint - Roadmap v1

## Purpose

Convert the ten sprint tasks maintained outside the repo into an evidence-led
UI discovery sequence. The outcome is a grounded decision about how Healthie
could serve as EPI10's client-facing layer without moving operational control
away from Odoo.

This roadmap documents discovery work. It is not an implementation roadmap and
does not enable Stage 06.

## Sprint Outcome

At close, the team should be able to show:

- what was actually verified in the Healthie UI;
- what an admin, an Aitor-like user and a client can see or do;
- what is available, partial, blocked by plan/add-on or still `Unknown`;
- which capabilities are relevant to Fase 1, candidates or future only;
- what data should and should not be duplicated from Odoo;
- which questions require Healthie, EPI10 or API discovery;
- a realistic replay of the test case `EPI10-TEST-001`.

## Fixed Boundaries

- Odoo remains the center for operational states, tasks, owners and case
  control.
- Healthie is evaluated as the client experience and document/communication
  layer.
- No real personal, health or genetic data may be used.
- TellmeGen remains external/manual; no automated integration is promised.
- Features blocked by plan or add-on are recorded as dependencies, not defects.
- A visible UI capability does not prove API support.
- Lateral features do not enter Fase 1 merely because they demo well.

## Evidence And Classification

Each task must leave a compact evidence record containing:

| Field | Required record |
|---|---|
| Result | `Verified`, `Partial`, `Blocked` or `Unknown` |
| View | Admin, Aitor-like internal user or client |
| Path | Navigation path and configuration tested |
| Evidence | Screenshot or reproducible observation, when permitted |
| Demo change | User, form, document, appointment or setting created/changed |
| Dependency | Plan, add-on, permission or external configuration shown |
| EPI10 fit | `Core`, `Candidate`, `Lateral/Fase 2` or `Not recommended` |
| Odoo boundary | What remains governed by Odoo |
| Follow-up | Question for Healthie, EPI10 or API discovery |
| Cleanup | Demo artifact to retain, disable or remove |

Do not record inferred capabilities as `Verified`. Use `Unknown` when evidence
is missing.

## Execution Sequence

The roadmap is dependency-ordered. Calendar duration and target dates remain
`Unknown` until account access, plan/add-ons and sprint capacity are confirmed.

### Block A - Workspace And Safe Demo Foundation

#### 01. Healthie UI - Base de cuenta / backoffice general

**Status:** `Verified` for UI configuration discovery on 2026-07-12. Effective
login testing for the future Aitor-like profile remains deferred until its
required actions are known. Evidence:
`evidence/01_account_backoffice_general_v1.md`.

**Guiding question:** How is Healthie configured as the minimum viable
workspace for EPI10?

Explore organization/account settings, workspace structure, internal users,
permissions and roles. Compare the admin view with what an Aitor-like user
could see. Do not model the full EPI10 operation here.

Exit evidence:

- account/workspace settings map;
- internal-user and role observations;
- admin versus Aitor-like visibility comparison;
- plan, add-on and permission blockers;
- explicit Odoo boundary.

#### 02. Healthie UI - Branding y experiencia de entrada del cliente

**Status:** `Partial` on 2026-07-12. Backoffice branding under
`Settings > Brand` is configured; client login, portal, email and white-label
experience are deferred until `EPI10-TEST-001` exists. Evidence:
`evidence/02_branding_client_entry_v1.md`.

**Critical gate:** Raul considers white-label crucial. Client-side evidence
must cover where Healthie branding remains visible and what plan/add-on would
be required to deliver an acceptable EPI10 experience.

**Guiding question:** To what extent can the client feel they are in EPI10
rather than a generic tool?

Explore organization name, logo, colors, portal, white-label options,
domain/subdomain, own-domain email when visible, login and onboarding entry.
Test what access permits and mark locked options as requiring a plan/add-on.

Exit evidence:

- screenshots of brand configuration where permitted;
- observed client login/entry experience where accessible;
- list of configurable, fixed and plan/add-on-dependent elements;
- branding questions still `Unknown`.

#### 03. Healthie UI - Cliente de prueba / ficha de cliente

**Status:** `Verified` for creation and initial profile discovery on
2026-07-12. Web portal, Spanish localization and final group-state design remain
open. Evidence: `evidence/03_test_client_profile_v1.md`.

**Guiding question:** What does the Healthie client record look like, and what
information makes sense to duplicate from Odoo?

Create or review only this test case, using fictitious data:

```text
Case ID: EPI10-TEST-001
Client: Raul self-test client
Email: test address controlled by Raul and different from provider login
```

Review profile tabs, documents, forms, communications, history, groups and
tags. Do not enter real personal, health or genetic information.

Exit evidence:

- test client created or verified;
- profile surface map;
- proposed minimal Odoo-to-Healthie identity fields;
- list of data that should not be duplicated;
- cleanup/retention decision for the test client.

### Block B - Core Client Journey Validation

#### 04. Healthie UI - Formularios, intake flows, consentimientos y cuestionarios

**Status:** `Verified` for end-to-end UI onboarding on 2026-07-12. The tested
chain covers group activation, notification, combined intake, consent,
signature, completion and CSV export. Spanish localization and API/webhook
integration remain gates. Evidence:
`evidence/04_forms_intake_consents_questionnaires_v1.md`.

**Guiding question:** Can Healthie handle EPI10 onboarding and forms without a
custom portal?

Create test intake/questionnaire and non-valid test consent artifacts. Test
required/optional behavior, client preview, completion state and response
export/visibility.

This is a critical sprint box.

Exit evidence:

- two compact test forms covering intake/questionnaire and consent;
- admin and client experience captured;
- required/optional and completion behavior verified;
- response visibility and permissions recorded;
- Fase 1 fit and API questions identified.

#### 05. Healthie UI - Documentos, laboratorio demo e informe final

**Status:** `Verified` for client-specific document privacy and delivery on
2026-07-12. `Make Visible` publishes silently; `Share` publishes and sends an
email. API automation and audit/compliance behavior remain open. Evidence:
`evidence/05_documents_lab_final_report_v1.md`.

**Guiding question:** Can Healthie serve as a clean channel for document and
final-report delivery?

Use only test documents with fictitious content:

- test laboratory PDF;
- test EPI10 final report.

Test upload, visible/not visible behavior, client sharing, email/notification
behavior and the portal/app client view.

This is critical for the future Odoo-to-Healthie flow.

Exit evidence:

- both demo documents uploaded or blocker recorded;
- visibility and sharing states tested;
- client notification behavior observed;
- client-side access captured where permitted;
- questions for Odoo-to-Healthie API discovery listed.

#### 06. Healthie UI - Comunicacion: chat, emails y notificaciones

This task is executed as three independent channel reviews:

1. `06A - Email`
2. `06B - Secure chat`
3. `06C - Notifications`

**06A status:** `Verified` on 2026-07-12. Editable templates, dynamic
variables, branded transactional email, technical sender/reply-to and delivery
history were inspected. Own-domain sending, Spanish/fixed copy and white-label
remain production gates. Evidence: `evidence/06a_email_v1.md`.

**06A API handoff:** test whether API access can edit additional native emails,
create templates or email types, trigger transactional sends, send one-off
emails, define new email automations, or suppress/replace native emails. All are
currently `Unknown`.

**06B status:** `Verified` on 2026-07-12. One-to-one bidirectional chat, read
indicator, links/PDF access, scheduled delivery and visible
autoresponder/welcome controls were validated. Advanced group actions and all
API/webhook behavior remain open. Evidence: `evidence/06b_secure_chat_v1.md`.

**06C status:** `Verified` for provider/client preference inventory, real email
evidence and delivery history on 2026-07-12. Real push payload/lock-screen
behavior remains untested; real SMS testing is deferred to appointments.
Evidence: `evidence/06c_notifications_v1.md`.

**Task 06 status:** `Verified` for core UI discovery across Email, Secure Chat
and Notifications, with the explicit push, SMS, localization, white-label and
API gates recorded in the three evidence files.

**Guiding question:** Which client-professional communication can Healthie
support without relying only on external email?

Test secure chat/message where available. Review notification preferences,
automatic emails, push/SMS options when visible, and what content can or cannot
be customized. Capture internal and client experiences.

Exit evidence:

- at least one safe demo communication attempted;
- channels and notification preferences mapped;
- customizable versus fixed content recorded;
- admin/Aitor-like and client views compared;
- plan/add-on and consent questions listed.

### Block C - Candidate And Lateral Capabilities

#### 07. Healthie UI - Citas y calendario

**Guiding question:** Do appointments add Fase 1 value, or are they mainly a
demo/future capability?

Explore appointment types, calendar, availability, reminders,
cancellation/rescheduling and client booking. Create a demo appointment only
when safe and useful.

Default classification: `Candidate`, not `Core`, unless observed evidence and
a later EPI10 decision justify promotion.

Exit evidence:

- appointment/calendar surface mapped;
- client booking and reminder experience observed where possible;
- operational value and Odoo boundary stated;
- recommendation remains `Candidate` or is explicitly justified.

#### 08. Healthie UI - Operativa ligera: tags, groups, tasks, workflows

**Guiding question:** What lightweight operational support exists without
moving the operational center out of Odoo?

Test one tag, one group and one simple task/workflow where available. Do not
recreate Aitor's full workflow or turn Healthie into the EPI10 CRM/ERP.

Exit evidence:

- tag and group behavior observed;
- task/workflow behavior observed or blocker recorded;
- useful lightweight helpers identified;
- states, tasks and ownership retained explicitly in Odoo.

#### 09. Healthie UI - Laterales utiles: pagos, packages, labs, programs, goals, metrics

**Guiding question:** Which lateral capabilities could add future value without
entering current scope?

Time permitting, inspect payments/packages. Review labs conceptually only and
do not promise TellmeGen integration. Inspect programs, goals, metrics and care
plans only as future potential.

Default classification: `Lateral/Fase 2`.

Exit evidence:

- observed lateral capabilities listed without scope commitment;
- plan/add-on dependencies recorded;
- TellmeGen boundary preserved;
- each item classified as demo lateral, candidate or Fase 2.

### Block D - Replay And Sprint Close

#### 10. Healthie UI - Replay completo EPI10-TEST-001 y cierre de sprint

**Guiding question:** What can be shown to Carmen, Aitor and Tomas as a
realistic demo, and what remains pending for API discovery?

Replay the case using verified sprint artifacts:

```text
account/branding
-> test client
-> intake/form
-> consent/questionnaire
-> demo documents
-> demo final report
-> notification/message
-> candidate capabilities only when they add value
```

Exit evidence:

- coherent end-to-end replay completed or gaps marked;
- useful screenshots grouped in sequence;
- configuration to replicate in the real EPI10 account listed;
- questions for Healthie listed;
- questions for EPI10 listed;
- API discovery points listed;
- demo cleanup completed or assigned.

## Dependency Map

| Task | Depends on | Why |
|---|---|---|
| 01 | Account access | Establishes workspace, roles and safe testing boundaries |
| 02 | 01 | Branding options may depend on organization settings and plan |
| 03 | 01 | Requires an authorized internal role and Raul-controlled test email |
| 04 | 03 | Forms and responses need the test client |
| 05 | 03 | Document visibility and delivery need the test client |
| 06 | 03 | Communication needs safe internal/client identities |
| 07 | 03 | Client booking should use the test identity if tested |
| 08 | 01, 03 | Groups/tasks require workspace context and a test client |
| 09 | 01 | Lateral availability may depend on plan/add-ons |
| 10 | 02-09 as verified | Replay uses only observed, relevant capabilities |

Tasks 04, 05 and 06 can be explored in parallel after Task 03. Tasks 07, 08
and 09 must not delay the critical core findings from Tasks 04 and 05.

## Decision Gates

| Gate | Decision enabled by the evidence |
|---|---|
| Workspace gate | Minimum Healthie setup and internal roles for EPI10 |
| Branding gate | Acceptable EPI10 client identity and required plan/add-on |
| Data gate | Minimum identity/state references shared with Odoo |
| Onboarding gate | Whether forms/consents/questionnaires fit Fase 1 |
| Document gate | Whether Healthie is suitable for final-report delivery |
| Communication gate | Which channel Healthie can own in Fase 1 |
| Appointment gate | `Core`, `Candidate` or future |
| Operations gate | Which helpers are useful without duplicating Odoo |
| Lateral gate | Explicit Fase 2 parking lot |
| API gate | Concrete operations and unknowns for subsequent API discovery |

## Sprint Close Package

The sprint is complete only when these artifacts exist:

1. Evidence grouped by the ten tasks.
2. Capability matrix with result, EPI10 fit, plan dependency and Odoo boundary.
3. `EPI10-TEST-001` replay with gaps clearly marked.
4. Configuration proposed for replication in the real EPI10 account.
5. Separate question lists for Healthie, EPI10 and API discovery.
6. Cleanup record for demo users, documents, messages and appointments.

## Current Unknowns

- Healthie account credentials and access level.
- Raul-controlled test identity and email different from the provider login.
- Current Healthie plan and enabled add-ons.
- Availability of a sandbox or safe demo workspace.
- Ability to switch between admin, Aitor-like and client views.
- Screenshot/export restrictions.
- Sprint duration, team capacity and target completion date.

These items affect scheduling and evidence coverage. They do not change the
ten-task scope.
