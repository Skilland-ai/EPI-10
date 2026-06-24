# founder-cto Install and Use Notes

The CTO capability has two reusable parts: a skill and a subagent definition.

## Skill

Source:

- `shared/skills/founder-cto/`

Export package:

- `04_outputs/cto-agentic/founder-cto.skill`

## Subagent

Source:

- `shared/agents/founder-cto-advisor/AGENT.md`

Export copy:

- `04_outputs/cto-agentic/founder-cto-advisor/AGENT.md`

## Installation Status

No global installation was performed.

## Reuse Elsewhere

1. Install or import the `founder-cto` skill according to the target environment's skill installation flow.
2. Copy or import the `founder-cto-advisor` agent definition according to the target environment's subagent convention.
3. Verify the agent references these skills:
   - `founder-cto`
   - `write-spec`
   - `qa-review`
4. Verify the agent file remains named `AGENT.md` and its frontmatter name is `founder-cto-advisor`.

The export folder is a plain file copy, not a packaged agent format.
