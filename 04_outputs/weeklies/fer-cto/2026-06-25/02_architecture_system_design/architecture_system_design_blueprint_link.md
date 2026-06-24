# Architecture System Design Blueprint Link

## Blueprint Link

Editable Blueprint whiteboard:

https://systemsdesign.site/s/j4yO3Afq

## MCP Execution

- MCP server: `blueprint`
- Package: `systemsdesign-mcp`
- Tool used: `create_diagram`
- Diagram title: `EPI10 Salud MVP 1.0 - architecture system design - Fer CTO weekly 2026-06-25`
- Validation: `codex mcp get blueprint` returned an enabled stdio server using
  `npx -y systemsdesign-mcp`.

## Design Brief Used

Create an editable system design whiteboard for EPI10 Salud MVP 1.0, Fase 1.
The diagram must show:

- cliente final, Aitor/equipo EPI10 and Fer as reviewer;
- web/pago as the entry point for `lead_created` and `payment_success`;
- EPI10 MVP orchestration service in AWS Espana using TypeScript/NestJS;
- PostgreSQL technical DB for IDs, state snapshots, events, errors and
  idempotency only;
- Healthie as portal/API/webhook boundary for onboarding, forms, consents,
  documents, communication and report delivery;
- Odoo as operational backoffice for contacts, cases, states, tasks, owners,
  dashboard and manual TellmeGen milestones;
- EPI10 Informe Final Copilot as a controlled draft-support workspace with
  anonymization/pseudonymization, authorized LLM/agent tools and mandatory human
  review;
- TellmeGen as external/manual in Fase 1 with no automatic users, tests,
  barcodes, result polling or PDF downloads;
- sensitive data boundaries and explicit "no raw genetic data in Odoo or
  PostgreSQL" posture;
- events, retries, errors, alerts and manual recovery paths.

## What The Diagram Shows

- Main event path from web/pago to MVP, PostgreSQL, Odoo and Healthie.
- Healthie-to-MVP event/webhook path for forms, consents, documents and report
  events.
- Odoo as the visible operational state and task surface.
- Retry/dead-letter handling and manual recovery through Odoo/equipo.
- Manual TellmeGen path and its Odoo milestone update.
- Copilot path from prepared inputs to pseudonymized package, draft support,
  human review, approved report and delivery/status update.
- Fer's review role over ADRs, risks, state model and slice decisions.

## Known Limitations

- The diagram is a review draft, not a final execution architecture.
- It does not encode concrete Healthie or Odoo endpoint names because provider
  capabilities remain unvalidated.
- It does not define a final PostgreSQL schema.
- It does not define AWS service choices beyond "AWS Espana, lightweight Fase 1
  deployment".
- It shows the desired event model, but web/pago schema/auth/idempotency are
  still open.
- It shows Copilot as an architecture boundary, not a final implementation.

## Follow-Up Edits For Fer

- Confirm whether first vertical slice should be `web/pago -> MVP -> Odoo`.
- Mark mandatory ADRs directly on the board.
- Add actual Healthie/Odoo capabilities once validated.
- Replace generic state model with workshop-approved states.
- Add concrete support/observability signals after Fer validates the minimum
  operational dashboard.
- Add data retention/security annotations once the data matrix ADR is written.
