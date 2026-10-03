# EPI-10 — Codex / Agent Instructions

Read these files in order before starting any task:

1. `01_harness/RULES.md` — always-on constraints
2. `01_harness/STACK.md` — tech stack reference
3. `01_harness/TASKFLOW.md` — workflow phases
4. `02_context/01_estado_actual.md` — current focus, active spec and next step

## Context

- `02_context/` contains compact active context; in this repo use `02_context/00_intake_context_pack.md`
- Raw source material for this run lives in `00_inbox/spec-driving-2026-06-09/raw/`
- Work from one active spec at a time in `03_specs/now/`
- Final deliverables go to `04_outputs/`; in this repo use the staged tree under `04_outputs/spec-driving/`
- Working debris goes to `05_scratch/`
- Skills in `shared/skills/` — load only when needed

## Modular sandbox and continuous documentation

- Current execution spec: `03_specs/now/011_now.md`. Earlier specs are historical
  or paused; do not resume them merely because their old text says active.
- Current planning: `04_outputs/planificacion/linear/README.md`. Linear is the
  source for project scheduling and task status; local snapshots are dated.
- Modules: `04_outputs/modulos/README.md`. Keep each module's implementation,
  reusable documentation and verification evidence together under its folder.
- After every meaningful step, update the active module's log with the action,
  observed result, evidence, decision and next step. Do this during execution,
  including when the user operates the browser, rather than only at handoff.
- Distinguish recommended steps, user-reported completion and verified results.
  Never mark a payment, configuration or Linear task done from instructions alone.
- Keep client-facing guides separate from internal logs; update guides when a
  procedure is verified. Guides are the source for future branded PDFs.
- Before ending a session, refresh `02_context/01_estado_actual.md` and the active
  spec's checklist. Store no API keys, passwords or sensitive client data.
