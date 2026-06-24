# 03 - External Cost Inputs v1

## Purpose

Este anexo define los costes externos que Stage 04 debe contemplar como
estimacion preliminar. No es presupuesto final. Los precios definitivos requieren
cotizacion vigente, validacion de proveedor y decision comercial. [SRC-001,
CTO-001]

## Cost Categories for Stage 04

| Cost Area | How to Treat in Stage 04 | Status |
| --- | --- | --- |
| Healthie license | Usar Healthie como hipotesis principal de portal cliente. | Pendiente de validacion final. |
| Healthie users/add-ons | Incluir usuarios adicionales, premium features y posibles add-ons. | Pendiente de plan real. |
| Healthie API/add-on | Necesario si Healthie es seleccionado para la integracion prevista. | Pendiente de cotizacion; no inventar coste. |
| ContinuousCare/equivalente | Alternativa si Healthie falla por coste, DPA, residencia, idioma o API. | Pricing/API/DPA pendiente. |
| Odoo hosting/licencias/mantenimiento | Incluir si aplica segun modalidad real de Odoo. | Unknown. |
| AWS España | Incluir como infraestructura externa recurrente. | Estimar por rango; coste final depende de arquitectura y uso. |
| LLM/API Copilot | Incluir si EPI10 Informe Final Copilot usa Claude/OpenAI/u otra API. | Posible coste recurrente. |
| Legal/DPO | Incluir si EPI10 requiere revisión especializada. | No incluido salvo decision comercial. |
| Soporte incluido | Soporte hasta final de año / aproximadamente 6 meses. | Incluido en alcance de Fase 1 segun decision CTO. |
| Mantenimiento posterior | No cerrarlo aun; valorar continuidad al final del periodo incluido. | Fuera de precio cerrado inicial salvo decision comercial. |

## Healthie Baseline

Referencia publica revisada el 2026-06-11:

- Healthie publica planes Core, Essentials, Plus y Group.
- Group aparece como baseline orientativo desde `149.99 USD+/mes` en mensual y
  `135 USD+/mes` en anual.
- Miembros clinicos adicionales aparecen como `50 USD/mes` por clinician.
- Healthie API aparece como add-on disponible para Group y Enterprise.
- Healthie indica que webhooks estan disponibles para actualizaciones en tiempo
  real.
- Healthie Group vs Enterprise marca API access como optional add-on con coste
  adicional.

Fuentes publicas:

- `https://www.gethealthie.com/healthie-pricing`
- `https://help.gethealthie.com/article/943-healthies-api`
- `https://help.gethealthie.com/article/1230-healthie-group-plan-vs-enterprise-plan`

Uso en Stage 04: presentar como baseline orientativo, no como precio cerrado.
API, white-label, premium integrations, soporte enterprise y data/security
reviews deben quedar pendientes de cotizacion si aplican.

## AWS Spain Cost Inputs

Stage 04 debe incluir AWS España como coste externo recurrente. No cerrar precio
sin estimacion tecnica, pero contemplar:

- compute para backend EPI10 Salud MVP 1.0;
- PostgreSQL tecnico;
- logs y monitorizacion;
- backups;
- secrets/config;
- endpoint publico seguro para webhooks;
- posible almacenamiento temporal;
- trafico/red si aplica.

Reglas:

- AWS no debe presentarse como repositorio documental principal si Healthie
  gestiona documentos.
- No almacenar raw genetic data en AWS/PostgreSQL tecnico del MVP.
- Costes finales dependen de volumen, retencion, disponibilidad y politica de
  backups.

## LLM/API Copilot Cost Inputs

Si EPI10 Informe Final Copilot usa Claude, OpenAI u otra API:

- estimar coste mensual por volumen de casos y tokens/documentos;
- separar coste de API de coste de implantacion;
- marcarlo como recurrente externo;
- no prometer precio cerrado sin proveedor/modelo/volumen;
- confirmar condiciones de datos, logging, retencion y entorno corporativo.

Si el Copilot se ejecuta con herramientas corporativas ya contratadas por EPI10,
Stage 04 debe reflejarlo como supuesto a validar.

## Odoo Cost Inputs

Stage 04 debe contemplar Odoo segun modalidad real:

- hosting;
- licencias si aplica;
- mantenimiento;
- backups;
- soporte tecnico;
- posibles add-ons;
- esfuerzo de configuracion de modelos/campos/vistas.

Default tecnico: Odoo API + configuracion. No modulo custom de Odoo como
default, salvo que durante ejecucion se demuestre necesario. [CTO-001]

## Legal/DPO Cost Inputs

Stage 04 debe tratar revisión legal/DPO como coste potencial si EPI10 lo
requiere para:

- DPA/GDPR de proveedores;
- datos de salud/geneticos;
- consentimientos;
- retencion;
- roles y permisos;
- uso de herramientas LLM/API;
- residencia y transferencias de datos.

No prometer cumplimiento legal absoluto como resultado tecnico del MVP.

## Handoff to Next Stage

Stage 04 debe separar claramente:

1. coste de implantacion/desarrollo propio;
2. licencias y add-ons de proveedores;
3. AWS España;
4. LLM/API Copilot si aplica;
5. soporte incluido hasta final de año / aproximadamente 6 meses;
6. mantenimiento posterior como decision futura;
7. legal/DPO si EPI10 lo requiere.
