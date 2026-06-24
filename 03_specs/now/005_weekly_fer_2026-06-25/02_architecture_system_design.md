# 005.02 - Weekly Fer CTO: arquitectura y system design

## Status
- Sub-spec of `03_specs/now/005_now.md`.
- Execute in a dedicated `/goal` session.
- This is the heavier weekly-prep sub-spec.
- Do not execute Stage 06.

## Objective
Preparar el segundo bloque de la weekly Fer CTO del 2026-06-25: ADR inventory,
primer borrador de arquitectura/system design, briefing de arquitectura y
diagrama Blueprint editable.

The session should work in one `/goal`, ask the user when blocked, and continue
until all four outputs are produced or a blocking dependency is explicitly
reported.

## Output Path
Write outputs under:

- `04_outputs/weeklies/fer-cto/2026-06-25/02_architecture_system_design/`

Required files:

- `supporting/adr_inventory_v1.md`
- `supporting/system_design_draft_v1.md`
- `architecture_briefing_v1.md`
- `architecture_system_design_blueprint_link.md`

## Inputs To Read
- `AGENTS.md`
- `01_harness/RULES.md`
- `01_harness/STACK.md`
- `01_harness/TASKFLOW.md`
- `02_context/00_intake_context_pack.md`
- `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`
- `04_outputs/spec-driving/03_technical_presales_blueprint/03_technical_presales_blueprint_v2.md`
- `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_cto_decision_docket_v1.md`
- `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_epi10_salud_mvp_1_0_blueprint_v1.md`
- `04_outputs/spec-driving/03_technical_presales_blueprint/supporting/03_informe_final_copilot_blueprint_v1.md`
- `04_outputs/spec-driving/04_commercial_proposal/supporting/04_scope_inclusions_exclusions_v1.md`
- `04_outputs/spec-driving/99_final/epi10-salud-propuesta-tecnica-economica.md`
- `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md`

Use other spec-driving files if needed to resolve contradictions.

## Required MCP Setup
Use Codex MCP, not Claude Code.

Install/register Blueprint MCP if it is not already available:

```bash
codex mcp add blueprint --env BLUEPRINT_API_KEY=bp_1V661IRLZ3GAWCmJqldCufikj1EjTIErvdmUf6OI -- npx -y systemsdesign-mcp
```

Validate:

```bash
codex mcp list
codex mcp get blueprint
```

The Blueprint API key is intentionally present here because the user explicitly
authorized saving it in the repo or local Codex config for this workflow.

If the MCP cannot be installed or used, stop and ask the planner/user before
using Mermaid, Markdown-only diagrams, Excalidraw, or any fallback.

## Work Steps

### 1. ADR inventory
Create `supporting/adr_inventory_v1.md`.

Include:

- accepted decisions;
- implicit decisions that need ADR;
- decisions to validate with Fer;
- decisions to defer until workshop;
- decision source path;
- risk if wrong.

At minimum cover:

- software propio vs SaaS/low-code;
- NestJS/TypeScript;
- PostgreSQL tecnico minimo;
- AWS Espana;
- Healthie portal/API/webhooks;
- Odoo API/backoffice;
- TellmeGen external/no integration;
- EPI10 Informe Final Copilot;
- data minimization/logs/retention;
- solo developer + Fer weekly CTO.

### 2. System design draft
Create `supporting/system_design_draft_v1.md`.

Include:

- system goals and non-goals;
- actors;
- module boundaries;
- proposed components;
- event/data flow;
- state model draft;
- integration contracts to define;
- data classes and storage boundaries;
- idempotency/retries;
- observability/support;
- failure modes;
- security/privacy notes;
- solo-developer sequencing;
- open questions for Fer/workshop.

This is a draft for the weekly, not a final execution plan.

### 3. Architecture briefing
Create `architecture_briefing_v1.md`.

It must be meeting-ready and didactic for Fer:

- architecture in 5 minutes;
- why software propio exists;
- what is core vs commodity;
- biggest CTO risks;
- decisions to validate with Fer;
- recommended first vertical slice;
- what not to build yet.

### 4. Blueprint diagram
Use Blueprint/System Design MCP to produce an editable system design whiteboard
link.

Create `architecture_system_design_blueprint_link.md` with:

- Blueprint link;
- prompt or design brief used to generate it;
- what the diagram shows;
- known limitations;
- follow-up edits to make with Fer.

The diagram should represent:

- web/pago;
- EPI10 MVP orchestration service;
- PostgreSQL technical DB;
- Healthie;
- Odoo;
- EPI10 Informe Final Copilot;
- TellmeGen external/manual;
- actors and operational states;
- sensitive data boundaries;
- events, retries, errors and manual fallback paths.

## Interaction Rules
- Ask the user for missing information only when it materially affects system
  design, risk, sequencing, or what should be shown to Fer.
- If a question can wait for the workshop, mark it as workshop-bound and
  proceed.
- Do not silently invent provider capabilities.
- Be critical: do not rubber-stamp existing architecture.
- Keep the design feasible for one primary developer with agents.

## `/goal` Prompt

```text
/goal
Trabaja en /home/reboot/Escritorio/EPI-10.

Objetivo: ejecutar 03_specs/now/005_weekly_fer_2026-06-25/02_architecture_system_design.md para preparar el bloque 2 de la weekly Fer CTO del 2026-06-25.

Hazlo en una sola ejecucion goal, con estos cuatro pasos:
1. Recolecta ADRs y crea supporting/adr_inventory_v1.md.
2. Disena un primer system design y crea supporting/system_design_draft_v1.md.
3. Crea architecture_briefing_v1.md para explicarselo a Fer.
4. Usa Codex MCP blueprint / systemsdesign-mcp para crear un diagrama editable y guarda el enlace en architecture_system_design_blueprint_link.md.

Si el MCP blueprint no esta instalado, instalalo con:
codex mcp add blueprint --env BLUEPRINT_API_KEY=bp_1V661IRLZ3GAWCmJqldCufikj1EjTIErvdmUf6OI -- npx -y systemsdesign-mcp

Valida con:
codex mcp list
codex mcp get blueprint

La key esta autorizada por el usuario para este workflow. Si el MCP falla o no puedes crear el Blueprint link, para y pregunta antes de usar Mermaid/Markdown/Excalidraw como fallback.

Lee todos los inputs indicados en la sub-spec, especialmente el diagnosis CTO. Prioriza arquitectura, system design, mantenibilidad, datos sensibles, dependencias externas y viabilidad de Raul como unico developer principal con agentes y Fer como CTO weekly reviewer.

No generes Stage 06. No modifiques 00_inbox/, 02_context/00_intake_context_pack.md, outputs existentes de 04_outputs/spec-driving/, shared/skills/ ni shared/agents/.
```

## Acceptance Criteria
- [x] Output folder exists.
- [x] `supporting/adr_inventory_v1.md` exists.
- [x] `supporting/system_design_draft_v1.md` exists.
- [x] `architecture_briefing_v1.md` exists.
- [x] `architecture_system_design_blueprint_link.md` exists.
- [x] Blueprint MCP `blueprint` is installed or verified via `codex mcp get blueprint`.
- [x] Blueprint link file contains an editable Blueprint link or the execution
      stopped to ask for fallback.
- [x] ADR inventory covers all minimum ADR topics listed above.
- [x] System design draft covers boundaries, modules, event/data flow, state
      model, integrations, security/privacy, observability/failure modes, and
      solo-developer sequencing.
- [x] Briefing is meeting-ready for Fer.
- [x] No existing `04_outputs/spec-driving/` artifacts are modified.
- [x] No `06_execution_plan_v1.md` is created.

## Validation Commands

```bash
test -f 04_outputs/weeklies/fer-cto/2026-06-25/02_architecture_system_design/supporting/adr_inventory_v1.md
test -f 04_outputs/weeklies/fer-cto/2026-06-25/02_architecture_system_design/supporting/system_design_draft_v1.md
test -f 04_outputs/weeklies/fer-cto/2026-06-25/02_architecture_system_design/architecture_briefing_v1.md
test -f 04_outputs/weeklies/fer-cto/2026-06-25/02_architecture_system_design/architecture_system_design_blueprint_link.md
codex mcp get blueprint
rg -n "software propio|NestJS|PostgreSQL|AWS|Healthie|Odoo|TellmeGen|Copilot|solo developer|Fer" 04_outputs/weeklies/fer-cto/2026-06-25/02_architecture_system_design/supporting/adr_inventory_v1.md
rg -n "boundaries|module|event|state|integration|security|privacy|observability|failure|solo" 04_outputs/weeklies/fer-cto/2026-06-25/02_architecture_system_design/supporting/system_design_draft_v1.md
rg -n "Blueprint|http|https|link" 04_outputs/weeklies/fer-cto/2026-06-25/02_architecture_system_design/architecture_system_design_blueprint_link.md
git status --short -- 00_inbox 02_context/00_intake_context_pack.md 04_outputs/spec-driving shared/skills shared/agents
find . -path '*06_execution_plan_v1.md' -print
```

If Blueprint MCP cannot produce a link and execution stops for fallback
approval, report blocked instead of forcing a substitute.
