# Decision Gates

Use these gates to tune rigor without turning every project into enterprise architecture. Apply the lightest gate that protects the business, the user, and the future maintainer.

## Rigor Dial Consequences

### sales/growth asset

- Prefer reversible choices, thin slices, existing tools, and manual backup paths.
- Keep documentation to the minimum needed for reuse or handoff.
- Accept rough edges if they do not mislead customers or create data risk.
- Avoid new infrastructure unless it directly unlocks the sale or learning goal.

### internal ops

- Require a clear owner, operating path, rollback path, and simple monitoring.
- Document inputs, outputs, dependencies, and known failure modes.
- Prefer boring tools and low maintenance overhead.
- Add lightweight checks for workflows that affect money, customer data, or daily operations.

### client delivery

- Require explicit acceptance criteria, tests or runnable checks, handoff docs, and maintainability notes.
- Document major decisions and tradeoffs.
- Avoid custom architecture unless it is justified by client value or constraints.
- Treat unclear scope, hidden dependencies, and missing ownership as blockers.

### regulated/sensitive

- Prefer privacy, security, legal review, auditability, human approval, and fail-safe behavior over speed.
- Treat personal, health, financial, biometric, employment, or regulated data as sensitive until proven otherwise.
- Require data minimization, access controls, retention posture, incident path, and explicit human review for high-impact decisions.
- Escalate legal/compliance unknowns instead of guessing.

## Build-vs-Buy Gate

Check:
- Is the capability strategically differentiating?
- Does an existing internal helper, standard library, platform feature, or installed dependency already solve it?
- Is vendor lock-in acceptable?
- What is the three-month and twelve-month cost of ownership?
- Can the decision be reversed without unacceptable customer or data migration cost?
- What is the smallest experiment that proves the need?

Pass when:
- The selected path has a clear owner, cost, risk, and reversal story.

## Architecture Gate

Check:
- Use cases and non-functional requirements are explicit.
- The design has a clear boundary between core domain logic, integrations, data storage, and user interface.
- Complexity matches team size and maintenance capacity.
- Scaling assumptions are tied to realistic usage, not imagined peak scenarios.
- Tradeoffs are recorded in an ADR or decision docket for client delivery or sensitive work.

Pass when:
- The architecture is understandable, testable, maintainable, and appropriately boring for the rigor level.

## Data, Security, and Privacy Gate

Check:
- Data classes are identified: public, internal, confidential, personal, regulated, or high-impact.
- Access controls, secrets handling, retention, deletion, audit trail, and export paths are clear.
- Third-party data sharing is explicit.
- Human review exists for sensitive automated decisions.
- Failure modes avoid data loss, unauthorized disclosure, and misleading outputs.

Pass when:
- Data risk is understood and the control set matches the rigor level.

## Maintainability Gate

Check:
- A future maintainer can locate ownership, setup, core flows, and failure points.
- The solution reuses existing patterns before adding abstractions.
- Tests or runnable checks cover non-trivial logic.
- Dependencies are justified and documented.
- Known shortcuts include their ceiling and upgrade path.

Pass when:
- The system can be changed safely by someone other than the original builder.

## Delivery Readiness Gate

Check:
- Scope is bounded.
- Acceptance criteria are observable.
- Dependencies and blockers are explicit.
- Build/test/release commands are known.
- Rollback or fallback is defined.
- Support owner and escalation route are clear.

Pass when:
- An executor can start without inventing requirements or making hidden architecture decisions.

## Observability and Support Gate

Check:
- Success and failure signals are visible.
- Logs, alerts, dashboards, or manual checks fit the rigor level.
- Support runbook covers common failures.
- Customer or stakeholder communication path is known.
- Incident response and postmortem expectations are clear for client delivery and sensitive work.

Pass when:
- The owner can detect, diagnose, and respond to the most likely failures.

## Handoff Gate

Check:
- The handoff names the goal, context, constraints, files, commands, acceptance criteria, and forbidden changes.
- Open questions are separated from decisions.
- The executor prompt has enough specificity to avoid scope drift.
- The handoff states whether the task is advisory, implementation, validation, or packaging.

Pass when:
- A fresh executor can proceed without rereading unrelated history.
