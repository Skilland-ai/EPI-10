# 04 - External Costs Table v1

## Purpose

Este anexo separa los costes externos recurrentes o variables que Stage 04 debe
mostrar fuera del precio de implantación.

## External Cost Table

| Coste externo | Tratamiento en propuesta | Estado |
| --- | --- | --- |
| Healthie licencia | Healthie como hipótesis principal de portal cliente. | Baseline público orientativo; pendiente de cotización vigente. |
| Healthie API/add-on | Necesario si Healthie se confirma para el alcance vendido. | Coste pendiente de cotización; no incluido sin confirmación. |
| Healthie usuarios/add-ons | Usuarios clínicos, white-label, soporte enterprise o premium features si aplican. | Pendiente de plan real. |
| ContinuousCare/equivalente | Alternativa si Healthie falla por coste, DPA, residencia, idioma o API. | Pricing/API/DPA pendiente. |
| Odoo | Hosting, licencias, mantenimiento o soporte según modalidad real. | Unknown hasta revisión técnica. |
| AWS España | Compute, PostgreSQL, logs, monitorización, backups, secrets y endpoint de webhooks. | Coste mensual recurrente pendiente de rango final. |
| LLM/API Copilot | Claude/OpenAI/u otra API si se usa para EPI10 Informe Final Copilot. | Coste variable según proveedor, modelo y volumen. |
| Legal/DPO | Revisión especializada de datos, consentimientos, proveedores y LLM si EPI10 lo requiere. | No incluido salvo decisión comercial. |

## Healthie Public Baseline

Referencia oficial revisada el 2026-06-11:

- Healthie Group aparece desde `149.99 USD+/mes` en mensual.
- Healthie Group aparece desde `135 USD+/mes` en anual.
- Clínicos adicionales aparecen como `50 USD/mes` por clinician.
- Healthie API aparece como add-on para Group y Enterprise.
- Healthie documenta webhooks y API GraphQL.
- El coste del API add-on no debe inventarse.

Fuentes:

- `https://www.gethealthie.com/healthie-pricing`
- `https://help.gethealthie.com/article/943-healthies-api`
- `https://help.gethealthie.com/article/1230-healthie-group-plan-vs-enterprise-plan`

## AWS España Placeholder

Placeholder económico:

`[[PENDIENTE_RAUL_AWS_RANGO_MENSUAL]]`

Se completará cuando se confirme el nivel de infraestructura requerido.

## LLM/API Placeholder

Placeholder económico:

`[[PENDIENTE_RAUL_LLM_API_RANGO_MENSUAL]]`

Se completará cuando se confirme proveedor, modelo, política de datos, volumen
de casos y forma de ejecución del Copilot.

## Handoff to Next Stage

Stage 04 debe mantener estos costes visibles para revisión humana. No convertir
ningún coste externo en precio cerrado sin cotización.
