# 06B - Healthie UI Secure Chat Evidence v1

## Result

- Subtask status: `Verified` for one-to-one UI communication and scheduled
  sending.
- Evidence type: direct backoffice and client operation reported by Raul on
  2026-07-12.
- API/webhook behavior: not tested.
- No autoresponder or welcome automation was enabled.

## Objective

Determine whether Healthie can support direct client-professional communication
without relying only on external email.

Yes for the tested manual UI flow, with basic scheduling and configurable
autoresponder/welcome capabilities visible in settings.

## Verified One-To-One Flow

```text
Provider backoffice
-> individual conversation
-> client receives and reads
-> client responds
-> response synchronizes to backoffice
```

The conversation displayed message content, timestamps, participant identity
and visual differentiation between provider and client messages.

## Read State And Navigation

Observed:

- eye indicator beside a provider message;
- `All`, `Unread` and `Read` filters;
- `Active`, `Scheduled`, `Archived` and `Closed` navigation sections;
- conversation search;
- `Individual` and `Community` type filters.

The test confirms a visible read-state indicator. Its exact semantics and API
representation remain unverified.

## Content And Attachments

Confirmed in the tested interface:

- formatted text;
- clickable links;
- access to the test final-report PDF;
- image/media/file controls;
- audio-message microphone control;
- video-call button.

The test PDF opened in a browser viewer. Its file URL used Healthie production
storage on Amazon S3 with temporary authorization/signature parameters. No
signed URL or token is stored in this repo.

The composer showed controls for bold, italic, underline, lists and links. A
lightbulb control was visible; `Smart Phrases` also exists under
`Settings > Features > Smart Phrases`.

## Scheduled Message

A message was scheduled for the following minute and delivered successfully.
Before delivery, Chat exposed a dedicated `Scheduled` section. After delivery,
no scheduled item remained pending.

This verifies scheduled UI delivery. Editing or canceling while pending was not
tested.

## Client Context In Chat

The side panel exposed significant client context, including contact details,
location/local time, group, created date, last activity and client identifier.
Visible tabs/areas included:

- General
- Goals
- Entries
- Metrics
- Forms
- Vitals
- Tasks
- Quick notes

This is relevant to the future least-privilege profile for Aitor: Chat access
may expose more client and health context than message handling alone requires.

## Chat Settings Observed

`Settings > Chat` exposed:

### One-Time Autoresponder

- enable/disable;
- always on or scheduled start/end dates;
- rich-text response editor;
- Chat Notifications toggle;
- one-time response overrides weekly response;
- no autoresponse in Community Chats.

### Recurring/Weekly Autoresponder

- enable/disable;
- weekdays;
- all-day or start/end times;
- multiple time periods;
- rich-text response editor;
- Chat Notifications toggle.

No explicit timezone selector was observed in this screen.

### Auto Welcome Message

- enable/disable;
- editable welcome message;
- automatic send after client account creation;
- skipped when chat is disabled for the client.

These controls were inspected but not activated.

## Confirmed Versus Not Verified

Confirmed:

- individual bidirectional chat;
- synchronized client response;
- visible read indicator and read filters;
- clickable links and PDF access;
- scheduled send;
- attachment/media/audio controls visible;
- Community category/filter visible;
- autoresponder and automatic welcome configuration visible;
- video-call entry point;
- Smart Phrases location visible.

Not verified:

- Message Blast;
- Announcements;
- actual Community Chat execution;
- rename/add participant/delete message actions;
- task creation from a conversation;
- edit/cancel of a pending scheduled message;
- audio-message send/playback;
- attachment upload limits and retention;
- archive/close/reopen behavior;
- provider/client notification configuration, deferred to 06C.

## EPI10 Interpretation

Healthie Chat is a viable client-professional communication channel for manual
Fase 1 interaction. Scheduled messages, welcome copy and autoresponders can
reduce repetitive coordination, but they are not a general workflow engine.

Operational boundary:

- Healthie owns the client conversation surface and message history.
- Odoo continues to own case state, responsibility, SLA/escalation and next
  operational action.
- Do not duplicate full message content into Odoo by default.
- Later design should determine whether Odoo needs only conversation IDs,
  unread/escalation flags and timestamps.
- Emergency/response-time wording requires approved operational and legal copy.

## API Discovery Handoff

Test whether API/GraphQL can:

1. create or locate a one-to-one conversation;
2. send and schedule messages;
3. edit/cancel scheduled messages;
4. read conversation/message history;
5. expose delivered/read/seen state;
6. upload and retrieve attachments safely;
7. manage participants and care-team visibility;
8. configure or trigger welcome messages/autoresponders;
9. use or manage Smart Phrases/templates;
10. receive webhooks for new client messages;
11. correlate a conversation to Healthie client ID and Odoo case ID;
12. create an Odoo escalation/task without copying sensitive message content.

All API capabilities remain `Unknown`.

## Decision

Subtask 06B is closed for core UI discovery. Continue Task 06 with notification
channels/preferences as a separate 06C review.

## Sources

- Raul's direct Healthie UI/client operation on 2026-07-12.
- `healthie-documentation/healthie_help/markdown/engagement/chat-secure-messaging/82-overview-chatting-with-a-client.md`
- `healthie-documentation/healthie_help/markdown/engagement/chat-secure-messaging/670-scheduling-a-chat-message.md`
- `healthie-documentation/healthie_help/markdown/engagement/chat-secure-messaging/460-chat-autoresponder-out-of-office.md`
- `healthie-documentation/healthie_help/markdown/engagement/chat-secure-messaging/508-chat-on-mobile.md`
