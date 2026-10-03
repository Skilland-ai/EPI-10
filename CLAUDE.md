# EPI-10 — Claude Code Instructions

Read these files in order before starting any task:

1. `01_harness/RULES.md` — always-on constraints
2. `01_harness/STACK.md` — tech stack reference
3. `01_harness/TASKFLOW.md` — workflow phases
4. `02_context/01_estado_actual.md` — current focus, active spec and next step

## Quick reference

- **Context**: `02_context/00_intake_context_pack.md` is the current active context pack
- **Raw sources**: `00_inbox/spec-driving-2026-06-09/raw/`
- **Active spec**: `03_specs/now/` — work from one spec at a time
- **Deliverables**: `04_outputs/spec-driving/` for this migrated run
- **Run state**: `04_outputs/spec-driving/_run_state/`
- **Scratch/WIP**: `05_scratch/`
- **Skills**: `shared/skills/` — load only when needed
- **Agents**: `shared/agents/` — delegate via subagent definitions

## Current modular execution

- Active spec: `03_specs/now/011_now.md`; older specs are historical or paused.
- Planning: `04_outputs/planificacion/linear/README.md`.
- Modules: `04_outputs/modulos/README.md`.
- After each meaningful step update the active module's log with action,
  observed result, evidence, decision and next step. Separate recommendations
  from confirmed execution. Keep client guides separate from internal logs.
- Before ending a session update `02_context/01_estado_actual.md` and the active
  spec checklist. Never store credentials or sensitive customer data.
