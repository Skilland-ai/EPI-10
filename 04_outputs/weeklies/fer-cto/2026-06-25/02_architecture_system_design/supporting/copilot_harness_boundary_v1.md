# Copilot Harness Boundary v1

## Purpose

`Copilot Harness` supports the EPI10 team in preparing internal drafts of the
final report. It organizes inputs, checks readiness, applies anonymization or
pseudonymization, runs subagents, skills and workflow/scripts, produces draft
support and routes the result through mandatory human review.

It is not SaaS, not an external provider system and not the architectural
ownership boundary for generic model/tool usage.

It is not the final medical or genetic authority. EPI10 humans approve or reject
any final report before delivery.

## Ownership And Boundary

| Boundary item | Position |
| --- | --- |
| Architectural owner | EPI10-owned |
| System boundary | Inside AWS Espana / EPI10-owned system boundary |
| Product shape | Internal harness/workflow |
| Interaction surface | App Codigo or equivalent internal UI is possible, but `Unknown` |
| Runtime/services | `Unknown` |
| LLM/model/provider | `Unknown` |
| Storage/logging/retention | `Unknown` until data ADR |
| Final approval | Human review by EPI10 |

The harness may call a model or tool later, but that dependency is not the
architectural owner. The owned workflow boundary remains EPI10/AWS.

## Expected Harness Components

- Input checklist.
- Anonymization/pseudonymization step.
- Subagents for structured report-assistance tasks.
- Skills for repeatable domain/report operations.
- Workflow/scripts for preparation, validation, draft assembly and export.
- Draft generation/support step.
- Human review gate.
- Approval/rejection record.
- Export/handoff procedure to Healthie if permitted, or approved fallback.
- Odoo/MVP delivery marker update.

## Data Inputs

Allowed only after readiness and minimization gates:

- report template or approved example;
- required section checklist;
- TellmeGen-derived notes reviewed manually by EPI10;
- customer documents/analytics references or minimized excerpts;
- relevant questionnaire/form facts;
- authorized internal review notes;
- EPI10 review criteria;
- final human approval decision.

Forbidden or gated:

- raw genetic data in PostgreSQL;
- raw genetic data in Odoo;
- unnecessary direct identifiers in harness packages;
- sensitive request bodies in logs;
- prompt/log retention without approved policy;
- autonomous diagnosis or automatic genetic interpretation;
- final report delivery without human review.

## Gate Sequence

1. Odoo marks the case `ready_for_report`.
2. Equipo confirms the input checklist.
3. Harness applies anonymization/pseudonymization.
4. Harness runs subagents, skills and workflow/scripts for draft support.
5. EPI10 performs human review and approves or rejects.
6. Approved report is exported/handoff to Healthie if API permits, otherwise to
   an approved fallback.
7. MVP/Odoo records only delivery markers, dates, status and follow-up tasks.

## Responsibilities

| Area | Harness responsibility | Human responsibility |
| --- | --- | --- |
| Input readiness | Enforce checklist and missing-input flags. | Decide whether source material is sufficient. |
| Data minimization | Run anonymization/pseudonymization workflow/scripts. | Confirm the package is safe enough to use. |
| Draft support | Use subagents, skills and workflow/scripts to assemble a draft. | Review content, reasoning, tone, disclaimers and risks. |
| Approval | Capture approval/rejection marker after review. | Make the actual approval decision. |
| Handoff | Prepare export and status update procedure. | Confirm delivery channel and final report. |

## Unknowns To Close Later

- Exact AWS runtime/services.
- Exact App Codigo interface and deployment model.
- Exact LLM/model/provider/residency.
- Prompt/log retention and audit policy.
- IAM/secrets design.
- Temporary package storage location and retention.
- Cost model for harness execution.
- Final report template and review rubric.

## Failure Modes

| Failure | Response |
| --- | --- |
| Required input missing | Block draft workflow and create Odoo task. |
| Pseudonymization fails | Stop workflow, record sanitized marker and require manual recovery. |
| Subagent/skill/workflow produces unsafe or low-confidence output | Keep draft internal and route to human rejection/rework. |
| Runtime/model unavailable | Use manual fallback; do not block report delivery forever. |
| App Codigo interaction unavailable | Use documented internal procedure if approved. |
| Sensitive data appears in logs/prompts | Treat as incident; pause harness use until reviewed. |
| Human review not completed | No final report delivery. |

## Fer Review Questions

- What is the minimum ADR set before the harness touches real data?
- Which AWS runtime choices are acceptable for a small Raul-owned build?
- What may enter the harness package, logs and temporary storage?
- What is the required human review checklist?
- What is the fallback if App Codigo or the model/runtime is unavailable?
- Which evidence would allow deeper automation later?
