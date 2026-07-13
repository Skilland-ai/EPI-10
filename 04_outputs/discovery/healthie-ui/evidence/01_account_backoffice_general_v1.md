# 01 - Healthie UI Account And Backoffice Evidence v1

## Result

- Task status: `Verified` for UI configuration discovery.
- Evidence type: direct UI observation reported by Raul on 2026-07-12.
- Screenshot evidence: not provided in the repo.
- Effective login test with an Aitor-like member: not executed.

## Guiding Question

How can Healthie be configured as a minimum workspace for EPI10?

## Observed

Within `Organization > Members`, Healthie exposes four predefined member role
designations:

- `Owner`
- `Admin`
- `Standard`
- `Support`

The UI also allows custom permission configurations through `Permission
Templates`. Raul observed that permissions can be tailored rather than relying
only on the four predefined designations.

## EPI10 Interpretation

Healthie provides enough visible permission granularity to continue evaluating
a least-privilege internal profile for EPI10.

Working direction:

- `Owner`: single accountable account owner.
- `Admin`: restricted to people who must manage organization-wide settings and
  member permissions.
- `Standard` or `Support`: candidates for operational users depending on
  whether they need client ownership, provider/calendar behavior or only
  coordination access.
- Custom `Permission Template`: preferred mechanism for an eventual Aitor-like
  access profile after his required actions are frozen.

This is not yet a final role assignment for Aitor.

## Odoo Boundary

The observed permission flexibility does not change the architecture boundary:

- Odoo governs operational case states, tasks, owners and reporting.
- Healthie permissions govern access to the client-facing workspace and its
  resources.
- The complete Aitor workflow must not be recreated in Healthie.

## Confirmed Capability

- Predefined member designations are visible in the UI.
- Custom permission templates are available in the observed account UI.
- Member permissions appear configurable with meaningful granularity.

## Remaining Unknowns

- Exact Healthie plan/add-on dependency for the observed configuration.
- Effective permissions after login as an Aitor-like `Standard` or `Support`
  member.
- Whether the current account has an existing template that should be cloned or
  whether EPI10 should create a new template.
- Final minimum set of actions Aitor needs in Healthie.
- Seat and billing impact of adding the future internal member.

## Decision

Task 01 is closed for UI discovery. Do not create or invite Aitor yet. Define
and test the final Aitor permission template only after Tasks 03-08 reveal the
client, document, communication and appointment actions he actually needs.

## Sources

- Raul's direct observation in the Healthie UI on 2026-07-12.
- `healthie-documentation/healthie_help/markdown/platform/onboarding/548-account-settings.md`
- `healthie-documentation/healthie_help/markdown/organizations/team-member-management/801-deep-dive-organization-settings.md`
- `healthie-documentation/healthie_help/markdown/organizations/team-member-management/944-standard-vs-support-roles.md`
- `healthie-documentation/healthie_help/markdown/organizations/team-member-management/995-account-admins-in-healthie.md`
