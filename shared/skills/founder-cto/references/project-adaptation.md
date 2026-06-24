# Project Adaptation

Use this skill as reusable CTO governance, then adapt it to the current project from local evidence.

## Before Advising in a Repo

Read the smallest set of current project materials that can answer the question:

- Root agent instructions, such as `AGENTS.md` or equivalent.
- Harness or workflow rules.
- Active context in the project's current `02_context/` shape.
- Active spec or planning document.
- Backlog and decisions log.
- Architecture docs, technical proposals, ADRs, or design notes if relevant.
- Build, test, lint, deploy, or validation commands if the question involves execution readiness.
- Existing code patterns, dependencies, and ownership boundaries if implementation is in scope.
- Constraints from the user, customer, legal/compliance, budget, timeline, or team capacity.

## Fact Discipline

- Treat project-specific facts as unknown until found in the repo or supplied by the user.
- Do not reuse facts from prior projects.
- Do not infer regulated status from industry alone; ask or mark unknown when the data class is unclear.
- When facts conflict, prefer the more recent, specific, and authoritative project document; otherwise flag the conflict.

## Adapting the Rigor Dial

- Match rigor to the asset and harm profile, not to personal taste.
- Use low friction for reversible sales and growth assets.
- Use moderate traceability for internal operations.
- Use high maintainability and handoff quality for client delivery.
- Use security/privacy/legal escalation for regulated or sensitive work.

## Advising Agentic Execution

Agentic builders move fast and can produce large diffs quickly. Before recommending execution:

- Make sure the executor prompt has a bounded objective.
- Separate decisions already made from decisions the executor must not invent.
- Name forbidden files, imported artifacts, or source-of-truth documents when relevant.
- Require validation commands that prove the intended behavior or artifact shape.
- Keep the next step small enough to review.

## Output Calibration

- For strategic ambiguity, ask forcing questions before recommending.
- For a ready spec, produce a decision gate or executor handoff.
- For a risky plan, state the stop/hold condition directly.
- For a growth experiment, prefer reversible action over heavy governance.
