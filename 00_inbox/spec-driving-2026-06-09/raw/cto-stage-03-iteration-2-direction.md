# CTO-001 - Stage 03 Iteration 2 Direction

Date: 2026-06-11

Type: Human/CTO operator direction for Stage 03 iteration 2.

Status: Approved direction for Stage 03 v2. This source does not reopen Stage
02 scope. It refines the technical and strategic framing of the already
approved MVP scope.

## Core Direction

Stage 03 v1 passed the generic spec-driving review, but the human/CTO review
found it too generic. The v1 framing around "integration layer /
automations" does not express what EPI10 Salud should build and sell.

The Stage 03 v2 direction is:

> La Fase 1 no consiste simplemente en conectar Healthie con Odoo. Consiste en
> desarrollar una primera capa software propia de EPI10 Salud, desplegada en
> AWS España, que orquesta web/pago, Healthie, Odoo, estados, tareas,
> documentos, produccion asistida del informe final, entrega y trazabilidad.

## Approved Scope That Must Not Change

Maintain Stage 02 v2:

- Healthie as primary portal candidate.
- ContinuousCare/equivalent as fallback if Healthie fails by cost, DPA,
  residency, language, or API.
- Odoo as operational backoffice.
- Web/payment connected with portal/Odoo.
- Forms, consents, questionnaires, labs/documents, communication, and final
  report delivery centralized in the client portal.
- Operational automations to reduce Aitor/team manual load.
- Basic operational dashboard in Odoo.
- One 3-hour operational kickoff workshop with a preparation checklist.
- Preliminary estimate of external recurring costs.
- TellmeGen as external, non-integrated system in Phase 1 because no current
  API exists.
- TellmeGen integration only as conditional Phase 2 if the provider enables a
  real API.

## Strategic Reframing

Use this commercial/technical narrative in Stage 03 v2 and the handoff to Stage
04:

- Phase 1 is not only SaaS configuration. It includes a first proprietary
  software layer for EPI10 Salud, hosted in AWS España, that orchestrates the
  web, Healthie client portal and Odoo.
- This layer automates states and tasks, reduces operational load, and enables
  traceable delivery of the final report.
- It is designed as an expandable base for future phases: more automations,
  TellmeGen integration if a real API appears, portal evolution, advanced
  report automation, reporting, analysis modules and long-term EPI10 digital
  twin capabilities.
- The intent is to use existing tools to accelerate the MVP while building a
  proprietary software base that can absorb critical business capabilities as
  EPI10 grows.

## CTO Decisions

| ID | Decision | Result |
| --- | --- | --- |
| D1 | Runtime operativo | Microservicio propio |
| D2 | n8n | Fuera del core; opcional futuro |
| D3 | Stack preferido | TypeScript / NestJS |
| D4 | Base de datos tecnica | PostgreSQL minima |
| D5 | Infraestructura | AWS España |
| D6 | Portal cliente | Healthie como hipotesis principal |
| D7 | Integracion portal | Healthie API/webhooks obligatorios |
| D8 | Backoffice | Odoo via API |
| D9 | Informe final | EPI10 Informe Final Copilot |
| D10 | Borrador LLM | Si, anonimizado/pseudonimizado y con revisión humana |
| D11 | Ejecucion Copilot | Aitor/equipo EPI10 desde sus entornos corporativos |
| D12 | Subida informe | Automatica a Healthie si API lo permite |
| D13 | Código | Activo propio de EPI10 |
| D14 | Documentacion | Tecnica y operativa, para mantenimiento futuro |
| D15 | Soporte | Incluido hasta final de año / 6 meses |
| D16 | TellmeGen | Sistema externo no integrado en Fase 1 |
| D17 | AWS coste | Coste externo recurrente a incluir |
| D18 | Healthie API/add-on | Coste externo pendiente de cotizacion |
| D19 | LLM/API Copilot | Coste externo posible a estimar |

## Required Artifacts

Create these files without overwriting Stage 03 v1:

- `artifacts/03_technical_presales_blueprint_v2.md`
- `artifacts/03_cto_decision_docket_v1.md`
- `artifacts/03_commercial_technical_framing_v1.md`
- `artifacts/03_epi10_salud_mvp_1_0_blueprint_v1.md`
- `artifacts/03_informe_final_copilot_blueprint_v1.md`
- `artifacts/03_external_cost_inputs_v1.md`
- `reviews/stage_03_review_iter_02.md`

## Reviewer Must Fail If Missing

The review must not pass if any of these are missing or contradicted:

- EPI10 Salud MVP 1.0.
- EPI10 Informe Final Copilot.
- Software propio / desarrollo a medida.
- AWS España.
- TypeScript / NestJS.
- PostgreSQL tecnico minimo.
- Healthie API/webhooks as necessary if Healthie is selected.
- Odoo API.
- Code as EPI10 deliverable asset.
- Support until year end / approximately 6 months.
- AWS as external recurring cost.
- LLM/API Copilot as possible external recurring cost.
- Anonymization with checklist and proprietary script.
- Mandatory human review of the final report.
- TellmeGen remains out of Phase 1 integration.
- n8n/Make/Zapier are not core runtime.
- Stage 03 does not become Stage 06 execution plan, atomic backlog, repository
  tree, or final commercial proposal.
