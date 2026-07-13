# 04 - Healthie UI Forms, Intake And Consent Evidence v1

## Result

- Task status: `Verified` for end-to-end UI onboarding.
- Evidence type: direct UI execution and CSV inspection reported by Raul on
  2026-07-12.
- API, GraphQL and webhook behavior: not tested.
- Raw CSV files: not stored in this repo.

## Guiding Question

Can Healthie support the EPI10 onboarding/forms experience without building a
custom portal?

For the tested baseline UI flow, yes. Production suitability still depends on
Spanish localization, legal validation, data policy and later API discovery.

## Test Artifacts

Two forms were intentionally used instead of three:

1. `TEST - Intake inicial EPI10`
2. `TEST - Consentimiento EPI10 - NO VALIDO`

They were bundled in:

- Intake Flow: `TEST - Onboarding EPI10`
- Client Group: `TEST - EPI10 UI Discovery`

The combined intake covered the initial-questionnaire test, avoiding a third
form while exercising `Default`, `Client Info` and `Charting` fields.

## Builder And Question Bank

The form editor saves automatically and displays `Form saves automatically`.
The UI exposed these Question Bank categories:

- `Default`
- `Client Info`
- `Charting`
- `Agreement`
- `HIPAA`
- `Video`

`Smart Fields` is not a UI category or field name. Current Healthie
documentation uses that term for structured fields found mainly under `Client
Info`, with some relevant fields under `Charting`.

The tested intake included:

- `Client Info > How did you hear about us?`
- custom `Default > Dropdown` for objective;
- `Charting > Food preference`;
- `Charting > Physical activity history`;
- custom `Default > Open answer (long)` for additional context.

The tested consent included:

- `Agreement > Agreement (read only)`;
- `Agreement > Require client to agree`;
- `Agreement > Signature`;
- `Default > Date picker`.

## Preview, Public Sharing And PDF

Confirmed UI capabilities:

- backoffice Preview;
- required-field asterisks;
- interactive preview matching the form structure;
- `Generate PDF` from Preview;
- `Share and Embed > Add to Website` with iframe, primary color and preview;
- `Share and Embed > Sharing Link` with direct URL and primary color;
- standalone `See live version` hosted on `secure.gethealthie.com`;
- public form surface without the administrative sidebar.

Preview, live version and PDF preserve essential structure/content but do not
have identical presentation.

Do not use public links or iframe for sensitive EPI10 data until identity,
response association, consent, security and privacy behavior are reviewed.

## Localization Findings

Custom `Default` questions can be written in Spanish. Several predefined
components remained in English, including observed examples:

- `How did you hear about us?` and its predefined options;
- `List any food preferences` / `Add a Food Preference`;
- `Physical activity history`;
- `Agreement (read only)`;
- `I hereby agree to the document above`;
- `Signature` / `Drag your mouse to e-sign`;
- `Date picker`;
- `Complete form` and `Select...`.

Mixed-language UX is a material EPI10 gate, not a cosmetic issue.

## Field Behavior

- Custom dropdowns support Spanish labels and custom options.
- `Food preference` is a specialized structured component, not a plain text
  box.
- `Physical activity history` uses a rich-text editor.
- Long open answers also use a rich-text editor.
- Configuration text entered inside editable response areas was concatenated
  with the client's response in CSV. Future production forms must keep help
  text out of answer values.
- Agreement acceptance is a checkbox tied to the displayed document.
- Signature supports mouse/touch drawing.

## Client Group To Completion Chain

The tested UI chain is verified:

```text
Client Group
-> Intake Flow
-> in-app client notification
-> combined onboarding
-> form completion
-> agreement and signature
-> completion timestamps
-> CSV export from backoffice
```

The client already belonged to the test group. Associating the new intake flow
with that group caused Healthie to notify the client and expose both forms as a
single onboarding experience.

## Completion And Export Evidence

Both forms completed successfully. Reported timestamps:

- Intake: `2026-07-12 14:26:29 WEST`
- Consent: `2026-07-12 14:26:50 WEST`

Each form exported as a separate CSV with one row per completion. Common
metadata included:

- `Unique ID`
- `Client`
- `Client Group`
- `Client Email`
- `Client Phone Number`
- `Completed`

Both exports contained the same client, group and `Unique ID`.

Observed answer representations:

- custom objective: plain text;
- physical-activity history: text;
- additional context: text;
- agreement: boolean `true`;
- signature: status `Signed`, not the drawn signature;
- date: normalized `YYYY-MM-DD`;
- referral/source: serialized structure with `ref_type`, `ref_source` and
  `ref_source_other`;
- food preference: multi-line structured value rather than a single string.

The intake export also included empty columns for other structured Client Info
fields not used/completed.

## Confirmed Versus Unverified

Confirmed:

- Question Bank categories and tested fields are available in the current UI.
- Group assignment can activate an intake flow for an existing group member.
- Client notification, completion, required acceptance, signature and date
  work from the client experience.
- Backoffice responses are exportable in CSV with client/group metadata.

Unverified:

- whether `How did you hear about us?` updated Client Info/Client Source;
- whether `Food preference` updated another profile section;
- internal persistence location of `Physical activity history`;
- meaning and stability of exported `Unique ID`;
- API/GraphQL access to forms and answers;
- completion webhooks;
- retrieval of signature image/evidence through API;
- exact signal Odoo could use for onboarding completion;
- behavior after adding new forms to an already assigned/completed flow.

## Fase 1 Interpretation

Healthie UI covers the tested basic documentary onboarding. It is a viable
Fase 1 candidate, subject to these gates:

- acceptable Spanish client experience;
- production legal/consent copy and signature-evidence review;
- sensitive-data minimization and access policy;
- API/webhook validation for Odoo orchestration;
- production form design that avoids embedded help text in answer values.

## Decision

Task 04 is closed for UI discovery. API/integration questions are handed to the
future API discovery. The next UI task is document and final-report delivery.
