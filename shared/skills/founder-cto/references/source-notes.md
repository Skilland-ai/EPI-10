# Source Notes

These notes capture transferable ideas from external sources. They are not project facts.

## cs-cto-advisor

Source: https://github.com/alirezarezvani/claude-skills/blob/main/agents/c-level/cs-cto-advisor.md

Transferable ideas:
- CTO guidance should connect technology strategy, architecture governance, team capacity, vendor selection, operational excellence, and business priorities.
- Technical debt, engineering metrics, ADRs, and vendor evaluation are useful governance surfaces.
- CTO outputs should be actionable for executives and engineering teams, not just technically correct.

## cs-fullstack-engineer

Source: https://github.com/alirezarezvani/claude-skills/blob/main/agents/engineering/cs-fullstack-engineer.md

Transferable ideas:
- Do not scaffold or choose stacks blindly; ask forcing questions that shape cost, delivery, and risk.
- Route specialist concerns rather than pretending one agent owns every technical subdomain.
- Return concise digests with success criteria, approvers, and next specialist steps.

## system-design-primer

Source: https://github.com/donnemartin/system-design-primer

Transferable ideas:
- Start system design from use cases, constraints, inputs/outputs, traffic, data volume, and read/write patterns.
- Move from high-level design to core components, then identify bottlenecks and tradeoffs.
- Treat scale and reliability choices as tradeoffs tied to explicit constraints.

## ponytail

Source: https://github.com/DietrichGebert/ponytail/blob/main/AGENTS.md

Transferable ideas:
- Efficient engineering starts by asking whether anything needs to be built.
- Reuse existing code, standard libraries, platform features, and installed dependencies before writing new code.
- Small diffs are only good when they fix the right layer after understanding the real flow.
- Non-trivial logic should leave behind a small runnable check.
