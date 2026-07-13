# 05 - Healthie UI Documents, Lab And Final Report Evidence v1

## Result

- Task status: `Verified` for document privacy and client delivery in UI.
- Evidence type: direct backoffice and Android client operation reported by
  Raul on 2026-07-12.
- API/GraphQL automation: not tested.
- Test documents contain no real clinical or personal data.

## Guiding Question

Can Healthie serve as a clean channel for document and final-report delivery?

Yes for the tested UI flow. Healthie supports private client-specific storage,
controlled visibility, explicit sharing, email notification and consumption
from the Android client experience.

## Test Fixtures

- `05_scratch/healthie-ui-documents/pdf/TEST_laboratorio_EPI10.pdf`
- `05_scratch/healthie-ui-documents/pdf/TEST_informe_final_EPI10.pdf`

Both are one-page fictitious PDFs marked as test-only and without clinical
validity.

## Test 1 - Private Laboratory Document

The laboratory test PDF was uploaded to the test client's record and marked
`Not Visible to Client`.

Observed:

- upload completed successfully;
- backoffice retained the document in the client record;
- the document did not appear in the Android client application.

This validates the UI baseline for an internal laboratory/provider document
that must not yet be exposed to the client.

## Test 2 - Final Report Delivery

The final-report test PDF was uploaded initially as `Not Visible to Client`.

Observed sequence:

1. The client could not see it while not visible.
2. `Make Visible to Client` made it available under client `Documents`.
3. The client could open/consume it inside the Android app.
4. The client could also open it in a Healthie-hosted browser viewer.

## Visibility Versus Sharing

The current UI exposes two distinct actions:

- `Make Visible to Client`: changes access/visibility but did not send a
  notification in the test.
- `Share`: shares the document and sends an email to the client.

The observed email stated:

```text
Primary provider has shared a document with you
```

This distinction is central to the future EPI10 delivery workflow. A report can
exist privately, become visible silently, or be explicitly shared with an email
notification.

## Confirmed UI Chain

```text
Upload client-specific PDF
-> Not Visible to Client
-> internal review/hold
-> Share
-> client email
-> document available in Android Documents
-> in-app or Healthie-hosted browser consumption
```

`Make Visible` is available as a separate silent-publication path.

## EPI10 Interpretation

The tested UI supports the intended conceptual boundary:

- laboratory/result input may remain private during processing;
- the final approved EPI10 report can be stored privately before release;
- mandatory human approval remains outside the publication action;
- explicit `Share` is the preferred client-delivery action because it both
  exposes the document and sends email;
- Odoo remains the operational source of truth for readiness, approval,
  delivery state and retry/error handling.

Changing Client Group is not required to solve the baseline document
notification. Group-driven communication remains a separate hypothesis for the
customer journey.

## Remaining Unknowns

- Upload, visibility and `Share` operations through API/GraphQL.
- Webhook/event emitted for upload, visibility change, share or client access.
- Document identifier returned for Odoo correlation.
- Whether email copy, subject, sender and language can be customized.
- Whether the email also produces push/in-app notification.
- Whether client opening/downloading can be observed reliably.
- Replacement/versioning behavior for a corrected final report.
- Retention, deletion, audit log and access-export behavior.
- Healthie-hosted viewer URL lifetime and access controls.

## Decision

Task 05 is closed for UI discovery. Healthie is a viable UI channel for private
document storage and notified final-report delivery. API automation and
compliance gates remain open.

## Sources

- Raul's direct Healthie UI and Android client operation on 2026-07-12.
- `healthie-documentation/healthie_help/markdown/ehr-billing/charting/185-store-and-share-a-document-with-client-phi-in-healthie.md`
- `healthie-documentation/healthie_help/markdown/engagement/documents/36-overview-healthie-documents-platform.md`
