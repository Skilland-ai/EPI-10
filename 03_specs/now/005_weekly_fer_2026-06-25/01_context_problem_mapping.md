# 005.01 - Weekly Fer CTO: contexto, problemas y bloqueos

## Status
- Sub-spec of `03_specs/now/005_now.md`.
- Execute in a dedicated `/goal` session.
- Do not execute Stage 06.

## Objective
Preparar el primer bloque de la weekly Fer CTO del 2026-06-25: explicar de
forma didactica, visual y de maxima senal el contexto inicial de EPI10, el
problema real, los actores, los bloqueos y la matriz de criticidad.

## Output Path
Write outputs under:

- `04_outputs/weeklies/fer-cto/2026-06-25/01_context_problem_mapping/`

Required files:

- `briefing_contexto_problemas_v1.md`
- `context_problem_map.excalidraw`

If Excalidraw tooling is unavailable, stop and ask the planner/user before using
another visual format.

## Inputs To Read
- `AGENTS.md`
- `01_harness/RULES.md`
- `01_harness/STACK.md`
- `01_harness/TASKFLOW.md`
- `02_context/00_intake_context_pack.md`
- `04_outputs/spec-driving/00_intake/`
- `04_outputs/spec-driving/01_problem_audit/`
- `04_outputs/spec-driving/02_mvp_scope_decision/`
- `04_outputs/spec-driving/99_final/`
- `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md`

Use `03_technical_presales_blueprint/` only as supporting context if the problem
map needs architecture references.

## Content Requirements

### `briefing_contexto_problemas_v1.md`
Keep it very short and high-signal. Fer should understand the situation in
about 5 minutes.

Required sections:

- `Para Fer en 5 minutos`
- `Que pidio el cliente`
- `Problema real detectado`
- `Actores y dolores`
- `Bloqueos / Unknowns`
- `Matriz de criticidad`
- `Que necesitamos de Fer`

Rules:

- Spanish.
- No commercial fluff.
- Prefer bullets and tables over prose.
- Cite source artifact paths for non-obvious claims.
- Make clear that TellmeGen API is out of Fase 1 unless new evidence appears.
- Make clear that current risk is execution/architecture readiness, not client
  fit alone.

### `context_problem_map.excalidraw`
Create a visual map suitable for a meeting.

It should show:

- input situation from Carmen/EPI10;
- actors: Carmen, Aitor, cliente final, EPI10 team, TellmeGen, Reboot/Skilland;
- current fragmented flow;
- main operational pains;
- blockers/unknowns;
- what Fase 1 tries to solve;
- what is explicitly out of scope.

Use a clear layout and avoid dense text.

## `/goal` Prompt

```text
/goal
Trabaja en /home/reboot/Escritorio/EPI-10.

Objetivo: ejecutar 03_specs/now/005_weekly_fer_2026-06-25/01_context_problem_mapping.md para preparar el bloque 1 de la weekly Fer CTO del 2026-06-25.

Lee los inputs indicados en la sub-spec. Produce:
- 04_outputs/weeklies/fer-cto/2026-06-25/01_context_problem_mapping/briefing_contexto_problemas_v1.md
- 04_outputs/weeklies/fer-cto/2026-06-25/01_context_problem_mapping/context_problem_map.excalidraw

Prioriza claridad visual y maxima senal. Fer tiene poco contexto. No reescribas la propuesta comercial; explica el problema real, actores, bloqueos, unknowns y criticidad. Si Excalidraw no esta disponible, para y pregunta antes de usar otro formato.

No generes Stage 06. No modifiques 00_inbox/, 02_context/00_intake_context_pack.md ni outputs existentes de 04_outputs/spec-driving/.
```

## Acceptance Criteria
- [x] Output folder exists.
- [x] `briefing_contexto_problemas_v1.md` exists.
- [x] `context_problem_map.excalidraw` exists, or execution stopped to ask for
      fallback because Excalidraw was unavailable.
- [x] Briefing includes all required sections.
- [x] Briefing is short, didactic, and focused on Fer's first 5 minutes.
- [x] Briefing includes a criticidad matrix.
- [x] Visual map covers actors, current flow, pains, blockers, Fase 1 solution,
      and explicit out-of-scope.
- [x] No existing `04_outputs/spec-driving/` artifacts are modified.
- [x] No `06_execution_plan_v1.md` is created.

## Validation Commands

```bash
test -f 04_outputs/weeklies/fer-cto/2026-06-25/01_context_problem_mapping/briefing_contexto_problemas_v1.md
test -f 04_outputs/weeklies/fer-cto/2026-06-25/01_context_problem_mapping/context_problem_map.excalidraw
rg -n "Para Fer en 5 minutos|Que pidio el cliente|Problema real detectado|Actores y dolores|Bloqueos / Unknowns|Matriz de criticidad|Que necesitamos de Fer" 04_outputs/weeklies/fer-cto/2026-06-25/01_context_problem_mapping/briefing_contexto_problemas_v1.md
git status --short -- 00_inbox 02_context/00_intake_context_pack.md 04_outputs/spec-driving
find . -path '*06_execution_plan_v1.md' -print
```

If Excalidraw is unavailable and execution stopped before creating the visual,
report that as blocked rather than forcing another format.
