# Budget Estimation Notes v2 - EPI10 Salud

Fecha: 2026-05-26

## Enfoque De Presupuesto v2

El presupuesto debe girar alrededor de seleccionar, configurar e integrar una plataforma sanitaria cliente. La v2 no debe presupuestar un portal propio como base ni una operacion manual de resultados geneticos.

## Bolsas De Coste

| Bolsa | Incluye |
| --- | --- |
| Plataforma cliente | Licencias Healthie/ContinuousCare/equivalente, usuarios, pacientes/clientes, marca blanca, API, soporte, SMS/video si aplica |
| Odoo | Hosting o plan, configuracion, modulos, usuarios, mantenimiento, backups |
| Integracion | APIs, webhooks, middleware, mapeo de datos, monitorizacion, pruebas |
| Laboratorio API | Setup API, credenciales, seguridad, pruebas, validacion contractual, soporte del proveedor |
| Implementacion | Analisis, configuracion, flujos, permisos, plantillas, documentacion, formacion |
| Compliance/seguridad | DPA, revision legal/DPO, hardening, logs, politicas, retencion |
| Soporte | Arranque, incidencias, ajustes, mantenimiento mensual |

## Escenarios

| Escenario | Alcance | Duracion orientativa | Comentario |
| --- | --- | ---: | --- |
| Fase 1A sin integracion genetica | Plataforma cliente + Odoo + sync operativo | 5-7 semanas | Valido si no hay API laboratorio |
| Fase 1B con API laboratorio | Fase 1A + integracion API resultados | 7-10 semanas | Solo si API existe y contrato permite uso |
| Fase 1C con proveedor alternativo | Seleccion plataforma + laboratorio con API | 8-12 semanas | Si resultados geneticos son imprescindibles y TellmeGen no sirve |

## Trabajo Propio

- Evaluacion final Healthie vs ContinuousCare vs equivalente.
- Configuracion de la plataforma cliente: portal, formularios, consentimientos, cuestionarios, documentos, comunicacion, roles.
- Configuracion de Odoo: CRM, pipeline, estados, tareas, responsables, reporting.
- Integracion plataforma cliente -> Odoo.
- Integracion laboratorio API solo si cumple condiciones.
- Pruebas funcionales, seguridad basica, documentacion y formacion.
- Soporte inicial.

## Costes Externos

- Licencia Healthie/ContinuousCare/equivalente.
- Add-ons de API, white-label, SMS, video, app, soporte enterprise o data residency.
- Odoo hosting/licencias/soporte segun modalidad.
- Middleware/hosting/monitorizacion si no viene integrado.
- Coste de API laboratorio o soporte tecnico del proveedor.
- Revision legal/DPO externa.

## Reglas Comerciales

- No incluir integracion genetica si no hay API.
- No incluir trabajo de carga, descarga o asociacion manual de resultados geneticos.
- Separar claramente Fase 1A operativa de Fase 1B genetica integrada.
- No prometer coste cerrado de licencias sin cotizacion vigente del proveedor.
- No prometer cumplimiento legal; presupuestar revision experta si se requiere.
