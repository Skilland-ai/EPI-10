# Output Templates

Use these compact templates for pasteable CTO artifacts. Keep Spanish output by default unless the user asks for another language.

## CTO Brief

```markdown
# CTO Brief - [topic]

## Context
- Goal:
- Users/stakeholders:
- Rigor dial:
- Current state:

## CTO View
- Recommendation:
- Why now:
- What not to build:

## Decisions
- [decision]: [rationale]

## Risks and Unknowns
- Risk:
- Unknown:

## Next Action
- [smallest useful action]
```

## Decision Docket

```markdown
# Decision Docket - [decision]

## Decision Needed
- [one sentence]

## Options
- Option A:
- Option B:
- Option C:

## Evaluation
| Criterion | A | B | C |
|---|---|---|---|
| Speed | | | |
| Cost | | | |
| Maintainability | | | |
| Risk | | | |
| Reversibility | | | |

## Recommendation
- Choose:
- Rationale:
- Conditions that change the decision:

## Follow-up
- Owner:
- Date/trigger:
```

## ADR

```markdown
# ADR - [title]

## Status
Proposed | Accepted | Superseded

## Context
- Problem:
- Constraints:
- Rigor dial:

## Decision
- [decision]

## Consequences
- Positive:
- Negative:
- Mitigations:

## Alternatives Considered
- [alternative]: [reason rejected]
```

## Build-vs-Buy Memo

```markdown
# Build-vs-Buy Memo - [capability]

## Job To Be Done
- [what must be achieved]

## Options
- Build:
- Buy:
- Reuse:
- Defer:

## Comparison
| Dimension | Build | Buy | Reuse | Defer |
|---|---|---|---|---|
| Time to value | | | | |
| Strategic control | | | | |
| Total cost | | | | |
| Data/control risk | | | | |
| Reversibility | | | | |

## Recommendation
- Path:
- Rationale:
- First validation step:
```

## Spec Critique

```markdown
# Spec Critique - [spec]

## Verdict
Ready | Ready with edits | Hold

## Missing Decisions
- [decision]

## Ambiguities
- [ambiguous point]

## Acceptance Criteria Gaps
- [gap]

## Risks
- [risk and mitigation]

## Suggested Spec Edits
- [edit]

## Executor Readiness
- Can execute now:
- Must resolve first:
```

## Execution Readiness Gate

```markdown
# Execution Readiness Gate - [task]

## Verdict
Go | Go with constraints | Hold | Stop

## Required Inputs
- Active spec:
- Context:
- Dependencies:
- Commands:

## Gate Checks
- Scope:
- Acceptance criteria:
- Tests/checks:
- Rollback/fallback:
- Owner/support:

## Blockers
- [blocker]

## Next Action
- [action]
```

## Risk Register

```markdown
# Risk Register - [project]

| Risk | Severity | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| | | | | | |

## Top CTO Concerns
- [concern]

## Debt Policy
- Pay now:
- Defer:
- Do not accept:
```

## Handoff Prompt for Executor

```markdown
Work in [repo/path].

Objective: [specific outcome].

Before editing:
1. Read [repo instructions].
2. Read [context/spec files].
3. Run [status/check command].

Execution constraints:
- Do:
- Do not:
- Preserve:

Acceptance criteria:
- [criterion]

Validation before closing:
- [command/check]

Return:
- Files changed.
- Checks run.
- Unknowns and risks.
```
