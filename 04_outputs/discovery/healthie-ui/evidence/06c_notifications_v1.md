# 06C - Healthie UI Notifications Evidence v1

## Result

- Subtask status: `Verified` for provider/client preference inventory, real
  email evidence and delivery history.
- Real push payload/lock-screen behavior: not tested.
- Real SMS delivery: not tested; deferred to appointments.
- No notification preference was modified.

## Objective

Map which actors can receive which event notifications, through which channels,
with what visible content and what delivery trace.

## Channel Model Observed

Provider web settings and client Android settings expose two configurable
columns:

- `Mobile Push`
- `Email`

No separate SMS or in-app column was visible in those preference screens.
In-app prompts/content exist elsewhere in the product but were not represented
as a preference channel in this UI.

## Provider Preferences

Path: `Settings > Personal > Notifications`.

Observed categories and channel availability:

| Category | Push-capable events observed | Email-capable events observed |
|---|---|---|
| Client Activity | New comment | Comments, journals, packages, new client, intake start/completion, form/program completion |
| Chat | 1:1 and community message | 1:1 and community message |
| Appointments | Five-minute reminder | Reminder, booking, cancellation, reschedule and appointment requests |
| Payments | None visible | Failed scheduled payment and subscription receipt |
| Documents | None visible | New document and folder shared with provider |
| Faxing | None visible | New fax and failed fax |
| Insurance | None visible | Expiry and new-insurance events |

Not every email-capable event was enabled in the current account. No checkbox
was changed during discovery.

## Client Android Preferences

Path: `Settings > Notifications`.

Observed:

| Category | Push | Email |
|---|---:|---:|
| Journal comment/emoji | Configurable | Configurable |
| 1:1/community chat | Configurable | Configurable |
| Document/folder shared | No control visible | Configurable |
| Program module | Configurable | Configurable |
| Goal reminder | Configurable | Configurable |
| Marketing | One unchecked control; channel not identifiable from evidence | Unknown |

Android operating-system notification permission was not inspected. An enabled
Healthie push preference does not prove the device permits delivery.

## Event Matrix From Existing Tests

| Event | Recipient | Email | Push | In-app |
|---|---|---|---|---|
| Client invited | Client | Observed | Not observed | Not observed |
| Intake assigned | Client | Not observed | Not observed | Observed |
| Intake completed | Provider | Configurable/enabled | No control visible | Not observed |
| Document shared | Client | Observed/configurable | No control visible | Not isolated |
| Provider chat message | Client | Configurable/enabled, delivery not observed | Configurable/enabled, delivery not observed | Message observed |
| Client chat response | Provider | Configurable/enabled, delivery not observed | Configurable/enabled, delivery not observed | Message observed |

`Configurable` means a UI control exists, not that channel delivery occurred in
the test.

## Email Content And Privacy

### Client Invite

Observed:

- EPI10 name/logo;
- client and provider names;
- Healthie in subject, CTA and body;
- sender domain/infrastructure on Healthie;
- reply-to routed to Reboot.

This email is not fully white-labeled and exposes the provider-client
relationship plus the Healthie platform name.

### Document Shared

Observed:

- EPI10 name/logo;
- client greeting;
- generic document-sharing copy and `View Document` CTA;
- Healthie mobile-app and HIPAA references;
- Healthie sender infrastructure.

The received subject/body did not expose the filename, document content,
clinical content or report text. This is a positive data-minimization finding.
The filename was visible to authorized staff in backoffice Notification History.

## Notification History

`Client Profile > Notification History` exposed filters for type, status and
date range. Observed records:

- client invitation: `DELIVERED`;
- three final-report document shares: `DELIVERED`.

The history displayed event type, relevant document name, timestamp/timezone,
email icon and delivery state. It did not show recipient open, CTA click or
read state. No separate push history was observed.

## SMS/Appointment Inventory

`Settings > Appointments` showed:

- appointment email events for scheduled/confirmed, booked, updated and
  canceled;
- email reminder active one day before;
- text reminders set to `None`;
- appointment intake reminder active;
- SMS confirmation/cancellation disabled;
- client confirmation, appointment requests and SMS behavior configurable in
  appointment settings.

This confirms UI configuration exists. It does not confirm SMS delivery,
sender, language or plan entitlement in this account.

## Confirmed Versus Unverified

Confirmed:

- separate provider and client preferences;
- email and push are distinct configurable channels;
- channel availability varies by event;
- chat exposes email and push controls for both actors;
- client document notifications are email-only in the inspected settings;
- real invite/document emails used EPI10 branding and Healthie infrastructure;
- email delivery status is auditable as `DELIVERED`;
- appointment SMS controls exist and are currently disabled.

Unverified:

- real push delivery and payload;
- lock-screen privacy and deep-link target;
- Android OS permission interaction;
- actual provider email for intake completion;
- actual chat email/push delivery;
- push delivery/history representation;
- real SMS delivery, copy, sender and opt-out;
- which transactional notifications cannot be disabled;
- API visibility/control for all channels.

## EPI10 Interpretation

- Use Notification History as delivery evidence, not proof of reading.
- Preserve generic/minimized email copy for sensitive documents.
- White-label remains critical because Healthie is visible across invitation,
  sender infrastructure, app references and legal copy.
- Push payloads must be tested before allowing sensitive production use.
- Odoo should track required operational events and delivery outcomes, not
  assume a checked preference means a notification was delivered.
- SMS remains appointment-specific until broader evidence exists.

## API Discovery Handoff

Test whether API/GraphQL can:

1. read and update provider/client notification preferences;
2. retrieve notification history and delivery/bounce status;
3. identify channel and event type reliably;
4. trigger or suppress event notifications;
5. customize push payloads, deep links and privacy-safe text;
6. receive delivery/bounce/open/click webhooks where supported;
7. expose push delivery results;
8. configure and trigger appointment SMS;
9. create new notification types or channel rules;
10. correlate notification events with Healthie client/document/conversation IDs
    and the Odoo case without copying sensitive content.

All API capabilities remain `Unknown`.

## Decision

Subtask 06C is closed for UI inventory. Task 06 communication discovery is
closed across Email, Secure Chat and Notifications. Real push testing remains a
cross-cutting follow-up; real SMS testing moves to Task 07 appointments.

## Sources

- Raul's direct Healthie provider/client UI and email inspection on 2026-07-12.
- `healthie-documentation/healthie_help/markdown/engagement/e-mails-and-notifications/89-adjust-your-notifications-settings.md`
- `healthie-documentation/healthie_help/markdown/engagement/e-mails-and-notifications/307-notifcations-in-healthie.md`
- `healthie-documentation/healthie_help/markdown/engagement/e-mails-and-notifications/90-text-message-notifications.md`
- `healthie-documentation/healthie_help/markdown/ehr-billing/charting/564-keeping-track-of-sent-client-notifications.md`
