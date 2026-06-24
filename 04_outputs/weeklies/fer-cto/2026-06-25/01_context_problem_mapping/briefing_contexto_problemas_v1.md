# Weekly Fer CTO 2026-06-25 - Bloque 1

## Para Fer en 5 minutos

- EPI10 quiere lanzar una Fase 1 practica, acotada y basada en herramientas existentes: web/pago, portal cliente tipo Healthie/ContinuousCare, Odoo y TellmeGen como proveedor genetico. Fuente: `04_outputs/spec-driving/00_intake/00_intake_context_pack.md`.
- El hallazgo que cambia el scope: TellmeGen no tiene API operativa actual para partners. Por tanto, TellmeGen queda fuera de integracion automatizada en Fase 1 salvo nueva evidencia real, documentada y autorizada. Fuentes: `04_outputs/spec-driving/00_intake/00_intake_context_pack.md`, `04_outputs/spec-driving/01_problem_audit/01_problem_audit_v1.md`.
- El problema real no es "falta una API"; es que EPI10 no tiene aun un sistema operativo minimo y trazable para coordinar cliente, pago, documentos, test externo, informe final y seguimiento. Fuente: `04_outputs/spec-driving/01_problem_audit/01_problem_audit_v1.md`.
- La Fase 1 propuesta intenta resolver lo controlable: portal cliente, Odoo como backoffice, estados/tareas, documentos, comunicacion, informe final, trazabilidad y automatizaciones operativas. Fuente: `04_outputs/spec-driving/02_mvp_scope_decision/02_mvp_scope_decision_v2.md`.
- La propuesta comercial ya encaja con la necesidad del cliente, pero el riesgo actual es de readiness de ejecucion/arquitectura: Healthie/Odoo sin validar, contrato tecnico web/pago pendiente, datos sensibles, Copilot y capacidad real de Raul como ejecutor principal con Fer en review semanal. Fuente: `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md`.
- No generar Stage 06: el diagnostico CTO recomienda HOLD para Stage 06 completo y GO solo para discovery postventa, workshop, ADRs y primer slice vertical. Fuente: `04_outputs/spec-driving/100_cto-advisor_diagnosis/100_cto_advisor_diagnosis_v1.md`.

## Que pidio el cliente

| Pedido / expectativa | Lectura operativa |
| --- | --- |
| Lanzar una primera fase practica, segura y ejecutable. | Evitar plataforma sanitaria completa desde cero. |
| Usar herramientas existentes. | Healthie/ContinuousCare para cliente, Odoo para operacion, TellmeGen como proveedor externo. |
| Profesionalizar portal, formularios, consentimientos, cuestionarios, documentos, seguimiento e informes. | La capa cliente no puede ser solo un formulario web. |
| Considerar costes de licencias, integracion, soporte, mantenimiento e infraestructura. | Stage 02 exige estimar costes externos y no inventar precios cerrados. |
| Integracion con TellmeGen/laboratorio. | Deseo inicial contradicho por la falta de API actual; mover a Fase 2 condicionada. |

## Problema real detectado

EPI10 esta intentando lanzar un servicio premium con una operacion todavia fragmentada:

```text
Cliente -> Web/pago -> avisos/manualidad -> Odoo / portal / email / TellmeGen / informe / seguimiento
```

Dolor central:

- Aitor/equipo actuan como middleware humano entre sistemas.
- No hay vista unica de estado, documentos pendientes, test externo, informe y seguimiento.
- Formularios, consentimientos, analiticas y documentos no estan suficientemente centralizados.
- El informe final es el entregable clave, pero el proceso sigue poco sistematizado.
- Los datos son sensibles: salud, genetica, analiticas e informes.
- TellmeGen bloquea la integracion genetica automatizada, pero no bloquea ordenar la operacion de EPI10.

Decision de framing:

- Vender Fase 1 como sistema operativo inicial de EPI10.
- No vender Fase 1 como integracion genetica automatizada.
- No vender "semimanual TellmeGen" como si fuera API.

## Actores y dolores

| Actor | Rol en la decision | Dolor / riesgo principal |
| --- | --- | --- |
| Carmen | Buyer funcional/estrategica | Necesita una Fase 1 clara, vendible, segura y sin sobredimensionar. |
| Aitor | Pain owner operativo | Hoy concentra mucha coordinacion manual y conocimiento del flujo real. |
| Cliente final | Usuario del servicio | Necesita onboarding, documentos, comunicacion, informe y seguimiento sin fragmentacion. |
| Equipo EPI10 | Operacion futura | Necesita estados, tareas, responsables, permisos y documentacion. |
| TellmeGen | Sistema externo genetico | Sin API actual; se usa manualmente como input externo en Fase 1. |
| Reboot / Skilland | Ejecucion y criterio tecnico | Debe convertir deuda de preventa en gates, ADRs y slices pequenos. |
| Fer | CTO review semanal | Debe revisar arquitectura, riesgos, gates y secuenciacion antes de ejecucion profunda. |

## Bloqueos / Unknowns

| Bloqueo / Unknown | Por que importa | Estado para weekly |
| --- | --- | --- |
| Healthie plan/API/webhooks/DPA/residencia/coste | Determina si el portal puede integrarse y tratar datos adecuadamente. | Gate obligatorio antes de build Healthie. |
| Odoo modalidad/API/permisos/modelos/coste | Determina si puede ser backoffice operativo real. | Gate obligatorio antes del modelo definitivo. |
| Web/pago schema/auth/idempotencia/sandbox | Aunque "puede emitir eventos", falta contrato tecnico. | Definir antes del endpoint productivo. |
| Matriz de datos sensibles, logs, retencion y LLM | Salud/genetica/informes requieren minimizacion y limites claros. | Documentar como ADR/matriz antes de datos reales. |
| Plantilla final del informe e inputs reales | Determina alcance real del Copilot y del flujo de revision humana. | No empezar Copilot completo sin esto. |
| Volumen y horas manuales actuales | Impide ROI cuantitativo y priorizacion economica fina. | Usar supuestos hasta tener datos. |
| TellmeGen API antigua / futura | Solo puede informar Fase 2. | No desbloquea Fase 1 salvo evidencia nueva. |
| Capacidad real | `99_final` describe equipo amplio; diagnostico CTO recoge que ejecuta Raul con Fer en weekly review. | Rebaselinar alcance, WIP y soporte. |
| Stage 06 | Sigue deshabilitado. | No generar plan de ejecucion completo. |

## Matriz de criticidad

| Area | Criticidad | Razon | Decision que Fer debe mirar |
| --- | --- | --- | --- |
| Capacidad real Raul + Fer weekly | Alta | Alcance vendido ambicioso con un ejecutor principal. | Reducir WIP y exigir slices verticales. |
| Healthie gate | Alta | Portal, documentos, comunicacion e integracion dependen de plan/API/DPA/coste. | Validar o activar fallback antes de construir alrededor. |
| Odoo gate | Alta | Backoffice, estados, tareas y dashboard dependen de API/modelo/permisos reales. | Auditar antes de fijar modelo operativo. |
| Datos sensibles / DPO / logs / LLM | Alta | Riesgo legal, reputacional y tecnico si se almacenan o exponen mal datos de salud/genetica. | ADR de datos antes de casos reales. |
| TellmeGen sin API | Alta como restriccion, no como scope | Bloquea automatizacion genetica pero no el MVP operativo. | Mantener fuera de Fase 1 y controlar expectativa. |
| Contrato web/pago | Media-alta | Sin schema/auth/idempotencia hay duplicados, altas perdidas o errores silenciosos. | Definir contrato minimo del primer evento. |
| Informe final / Copilot | Media-alta | Puede aportar valor, pero toca datos sensibles y criterio profesional. | Empezar como proceso asistido con revision humana; no diagnostico. |
| ROI cuantitativo | Media | Falta volumen y horas por caso. | No bloquear; usar ROI cualitativo y pedir datos. |
| Stage 06 | Alta | Un plan completo ahora puede congelar supuestos no validados. | HOLD hasta gates y decision explicita. |

## Que necesitamos de Fer

- Validar el framing: Fase 1 = sistema operativo inicial; no integracion TellmeGen.
- Revisar si la arquitectura propia minima en AWS/NestJS/PostgreSQL esta justificada frente a una alternativa mas SaaS/low-code para el primer slice.
- Forzar primer slice vertical pequeno: `web/pago -> MVP -> Odoo`, con idempotencia, un caso y un estado.
- Definir gates antes de construir: Healthie, Odoo, web/pago, datos sensibles, Copilot y capacidad.
- Rebaselinar delivery: 10 semanas habiles / 50 dias habiles, Raul como ejecutor principal, Fer en CTO review semanal.
- Acotar soporte de 6 meses: severidades, canales, tiempos, bugs vs evolutivos.
- Mantener Stage 06 bloqueado hasta que exista decision explicita y evidencia de gates.
