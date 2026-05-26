# FACTS

## Repo and workflow

- Fact: The workspace follows the sequence Seed -> Distill -> Spec -> Ship -> QA, with `00_inbox/` as the raw-material entry point and `02_context/` as the distilled context layer.
  Source: `01_harness/TASKFLOW.md`, `README.md`
  Confidence: high
- Fact: Final deliverables belong in `04_outputs/`, working debris belongs in `05_scratch/`, and active execution should center on one spec in `03_specs/now/`.
  Source: `01_harness/RULES.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`
  Confidence: high
- Fact: The context schema enforced by the harness is `BRIEF.md`, `FACTS.md`, `CONSTRAINTS.md`, `GLOSSARY.md` and `LINKS.md`.
  Source: `01_harness/TASKFLOW.md`, `AGENTS.md`, `CLAUDE.md`
  Confidence: high

## Project purpose and phase

- Fact: This repo exists to prepare an internal technical/commercial response to EPI10 Salud.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The current phase is described as Fase 0 interna de preventa, and the client-facing sale is expected to start later with Fase 1: implantación del MVP operativo.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The repo is meant to help understand the problem, research viable tools, compare options, define an MVP PRD, design an initial architecture, estimate effort/costs/risks and prepare a defendable commercial proposal.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium

## Client need and target solution

- Fact: The client named in the sources is EPI10 Salud.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The brief frames EPI10 Salud as a health/genetics/supplementation initiative that may evolve toward a digital-twin model, but whose immediate need is a much more grounded operational first phase.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The stated immediate need is an initial operating system to manage clients, consents, questionnaires, genetic results, follow-up, communication, documentation and integration with internal tools.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The brief says the client wants to start operating soon, avoid building everything from scratch, use existing tools, integrate systems, keep scope bounded, work securely with sensitive data and understand real license/support/integration/maintenance costs.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The requested ecosystem to evaluate includes the current or in-progress website, Odoo open source, the laboratory genetic-results platform, the TellmeGen API if available and tools such as Healthie or Continuous Care.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The brief explicitly asks for secure infrastructure hosted in Spain or the European Union.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium

## Required coverage and research scope

- Fact: The minimum operational scope listed in the brief includes client portal, forms, consents, questionnaires, follow-up, secure communication, document/report delivery, Odoo sync, genetic-results integration, semi-automations, minimal custom development, secure Spain/UE infrastructure and visibility into external costs.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The expected repo outputs include tool research, a build-vs-buy matrix, an MVP PRD, a recommended architecture, effort estimates, external cost estimates, risks/dependencies/open questions and a commercial proposal for Fase 1.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The brief defines five initial research tracks: Healthie, Continuous Care, Odoo, TellmeGen and possible MVP architectures.
  Source: `00_inbox/what-is-this-repo-about.md`
  Confidence: medium
- Fact: The file `00_inbox/texto-epi-10-real.md` exists but currently contains no content.
  Source: `00_inbox/texto-epi-10-real.md`
  Confidence: high
- Fact: No URLs appear in the current source files used for this initial context build.
  Source: `00_inbox/README.md`, `00_inbox/what-is-this-repo-about.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `01_harness/RULES.md`, `01_harness/STACK.md`, `01_harness/TASKFLOW.md`
  Confidence: high

## Unknowns and Assumptions

- Unknown: No primary client email, meeting notes, screenshots or third-party product documentation are present in `00_inbox/`, so the internal brief cannot yet be cross-checked against original source material.
- Unknown: No exact deadline, internal budget ceiling or expected client volume is stated.
- Unknown: The current website status/stack, the actual Odoo deployment/modules/hosting, and the real availability/scope of the TellmeGen API are not documented in the sources.
- Unknown: Legal/privacy specifics beyond the high-level GDPR/Spain-EU requirement are not documented; there is no evidence of DPO/legal guidance in the inbox.
- Assumption: `00_inbox/what-is-this-repo-about.md` is the main working brief and currently the most authoritative project-context source.
