# 02 - Healthie UI Branding And Client Entry Evidence v1

## Result

- Overall task status: `Partial`.
- Backoffice branding status: `Verified` by direct UI operation reported by
  Raul on 2026-07-12.
- Client entry experience: deferred until `EPI10-TEST-001` exists.
- Screenshot evidence: not provided in the repo.

## Guiding Question

To what extent can the client feel they are in EPI10 rather than a generic
tool?

## Completed In Backoffice

Raul configured the branding controls available under `Settings > Brand` using
the EPI10 working brand assets stored in:

- `02_context/EPI10-branding/`

The working brand package contains a logo and an explicitly non-official proxy
palette. It is suitable for discovery configuration but must not be presented
as a formally approved EPI10 brand manual.

## Letterheads

The `Letterheads` capability was reviewed. It controls branding and contact
information on PDFs generated from Healthie charting notes and on e-faxes. It
does not rebrand an externally generated EPI10 final-report PDF uploaded to
Healthie.

Decision:

- do not set a new production default during this task;
- reconsider only if later document/charting discovery establishes a Fase 1
  use case for Healthie-generated PDFs.

## Deferred Client-Facing Checks

After creating `EPI10-TEST-001`, verify:

- client login and welcome experience;
- organization name, logo and colors as seen by the client;
- visible Healthie branding;
- personalized client portal link, if used;
- web versus mobile differences;
- support/contact email visible to the client;
- email sender and notification branding;
- any plan/add-on gate for semi/full white-label.

Android observation on 2026-07-12:

- EPI10 Salud company name, logo and configured brand were visible;
- no Healthie wordmark or logo was observed;
- the interface appeared in English with no client-side language control;
- web domain/portal and email-surface white-label checks remain pending.

## Before Continuing

- Retain one screenshot of the completed `Settings > Brand` screen with
  sensitive information excluded.
- Record the exact logo filename and HEX values applied.
- Do not configure DNS, custom sending domain, SSO or paid white-label options.
- Do not treat the working proxy palette as formally client-approved branding.

## Remaining Unknowns

- Exact client-facing result of the configured branding.
- Current plan/add-on coverage for branding controls.
- Semi/full white-label requirement and commercial fit.
- Custom domain/subdomain and email-sending options.
- Mobile branding behavior.
- Whether Healthie-generated charting PDFs require an EPI10 letterhead.

## Critical Gate

Raul marked white-label as crucial for the EPI10 decision on 2026-07-12. It
must be evaluated explicitly from the client side after `EPI10-TEST-001` is
created, covering login, portal, emails and mobile visibility. Do not close
Task 02 or reduce white-label to an optional cosmetic improvement before that
evidence exists.

## Sources

- Raul's direct Healthie UI operation on 2026-07-12.
- `healthie-documentation/healthie_help/markdown/platform/getting-started/125-setting-up-your-brand-company-information-and-colors.md`
- `healthie-documentation/healthie_help/markdown/platform/branding/1286-create-a-custom-letterhead.md`
- `healthie-documentation/healthie_help/markdown/platform/branding/941-compare-semi-and-full-white-label.md`
