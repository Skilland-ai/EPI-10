# 03 - Healthie UI Test Client And Client Profile Evidence v1

## Result

- Task status: `Verified` for test-client creation and initial profile discovery.
- Evidence type: direct UI operation reported by Raul on 2026-07-12.
- Test case label used by the discovery: `EPI10-TEST-001`.
- Test subject: Raul using an email different from the provider login.
- Screenshot evidence: not provided in the repo.

No email address, telephone number or other personal value is recorded in this
evidence file.

## Guiding Question

What does the Healthie client record look like, and what information makes
sense to duplicate from Odoo?

## Creation Flow Observed

The `Add Client` UI exposed:

- first name;
- last name;
- mobile number;
- email;
- `Client Group`;
- `Primary Provider`;
- option to send the client invitation email to set up the account.

Raul created a dedicated test group before creating the client. The test client
was assigned to that group and to Raul as `Primary Provider`. Healthie sent the
invitation automatically, the link worked, and the client account was activated
by creating a password.

## Meaning Of Key Relationships

- Every client must have a `Primary Provider`. This is the principal assigned
  professional/member and affects visibility, activity and communication.
- `Client Group` is available at creation time.
- The new EPI10 customer journey intends to use groups as part of its state
  logic. The definitive group taxonomy and transition model must not be frozen
  until that newer system is migrated into this repo.
- Healthie documentation states that a client can belong to only one group at a
  time.

## Invitation And Mobile Client Experience

Observed in the invitation/client experience:

- the invitation identified Raul as `Primary Provider`;
- the client was invited to participate in the EPI10 organization;
- EPI10 Salud company name, logo and configured branding appeared;
- no Healthie wordmark or logo was observed in the Android client experience;
- the client was prompted to download/use the mobile app;
- the Android client interface appeared in English;
- no client-side language control was observed.

Do not infer from the Android observation that all web, email or system surfaces
are fully white-labeled.

## Backoffice Client Profile

The backoffice displayed the assigned provider and the client information. Raul
observed these main areas:

- Overview
- Care Plans
- Journal
- Metrics
- Goals
- Fullscript
- Charting
- Billing
- Actions

Within `Actions > Client Info`, the provider can view and manage personal and
health-related client information. This is a sensitive-data and least-privilege
consideration for the future Aitor permission template.

## Client Portal Configuration

The profile exposes per-client portal controls. Observed and documented
capabilities include controlling access to areas such as:

- billing;
- appointments;
- goals;
- journal entries;
- documents;
- intake forms;
- care plans;
- programs;
- packages;
- activity and metric tracking/viewing.

The documented precedence is:

```text
Global settings
-> overridden by Client Group settings
-> overridden by individual Client settings
-> overridden by an active Care Plan
```

This hierarchy is relevant to the planned customer-journey group logic, but its
final EPI10 design remains pending the newer journey migration.

## Metrics Clarification

No biometric data was present in the new account. Do not assume that metrics
come only from forms. Depending on configuration, metrics may be entered or
tracked through the client, provider, connected form fields or integrations.
This will be explored in the relevant later task.

## Identity And Odoo Boundary

Potential minimum cross-system references remain a discovery hypothesis:

- Odoo-owned EPI10 case identifier;
- Healthie-generated user identifier;
- client group/state reference;
- assigned provider/care-team reference where operationally required;
- invitation/account activation status where available.

The local Healthie guide states that the Healthie User ID is generated
automatically and appears in the client-profile URL. Raul reported seeing an
editable identifier-related setting, but the exact field label was not captured.
Treat editability of the Healthie User ID as `Unknown` until the UI field is
identified precisely.

## Deferred Checks

- Web client portal domain and URL.
- Healthie branding visibility on the web portal.
- Whether Spanish UI localization can be configured by the provider/account.
- Exact invitation email template customization; move to Task 06.
- Exact sender identity and remaining Healthie branding in email surfaces.
- Final client-group state model after the new journey is migrated.
- Exact minimum data duplicated from Odoo.

## Decision

Task 03 is closed for initial client creation/profile discovery. The same test
client will be reused for forms, documents, communication, appointments and
later client-side verification. Do not create additional test clients without a
specific test need.

## Sources

- Raul's direct Healthie UI and Android client operation on 2026-07-12.
- `healthie-documentation/healthie_help/markdown/platform/onboarding/160-overview-inviting-a-client-to-healthie.md`
- `healthie-documentation/healthie_help/markdown/ehr-billing/client-management-groups-tags/157-client-groups.md`
- `healthie-documentation/healthie_help/markdown/ehr-billing/client-management-groups-tags/1053-client-healthie-user-id.md`
- `healthie-documentation/healthie_help/markdown/engagement/working-with-clients-on-healthie/656-client-portal-settings.md`
- `healthie-documentation/healthie_help/markdown/engagement/working-with-clients-on-healthie/402-entries-settings-global-group-and-client.md`
