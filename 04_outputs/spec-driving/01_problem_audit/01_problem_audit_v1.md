# 01 - Problem Audit v1

## Audit Summary

El problema central detectado no es simplemente "falta una API de TellmeGen". El problema operativo de fondo es que EPI10 aún no tiene un sistema operativo mínimo y trazable para coordinar captación, pago, onboarding, documentos, test, resultados externos, producción del informe final, entrega y seguimiento. [SRC-002]

La evidencia apunta a una Fase 1 potencialmente valiosa si se centra en ordenar lo que EPI10 sí puede controlar: portal cliente, backoffice, estados, tareas, documentos, comunicación, informe final y automatizaciones alrededor de web/Odoo/Healthie. La integración genética automática con TellmeGen no es resoluble en MVP mientras no exista API operativa disponible. [SRC-001, SRC-002]

Esta auditoría no decide todavía el alcance MVP. Eso corresponde a Stage 02. Aquí se separan problemas reales de deseos, ideas de implementación y supuestos no cerrados.

## Problems Actually Present

| Problem | Who Feels It | Cause | Impact | Evidence | MVP Relevance | Unknowns |
| --- | --- | --- | --- | --- | --- | --- |
| P1. El flujo operativo depende demasiado de trabajo manual de Aitor/equipo | Aitor, equipo EPI10, Carmen | Web, pago, Odoo, TellmeGen, cliente, documentos, analíticas, informe y seguimiento no están coordinados en un sistema único | Cuello de botella humano, riesgo de errores, lentitud, baja escalabilidad y dependencia de memoria individual | Stage 00 identifica que Aitor actúa como middleware humano y que muchas acciones clave son manuales. [SRC-002] | Alto: reducir pasos manuales alrededor de portal/backoffice/documentos/tareas es una base clara de MVP | Horas actuales por cliente, volumen esperado, tareas exactas que consume cada rol |
| P2. No existe una capa cliente única y profesionalizada | Cliente final, Carmen, Aitor | Interacción dispersa entre web, email, TellmeGen, formularios/documentos y comunicaciones manuales | Experiencia menos profesional, pérdida de documentos, comunicación dispersa o insegura, más carga operativa | Carmen pide portal, formularios, consentimientos, cuestionarios, seguimiento, comunicación segura y entrega de documentos/informes. [SRC-001] Stage 00 recoge fragmentación actual. [SRC-002] | Alto: Healthie/ContinuousCare/equivalente puede resolver gran parte si se valida proveedor | Herramienta final, plan/coste/API, idioma, DPA/GDPR, residencia de datos |
| P3. Formularios, consentimientos y cuestionarios no están centralizados ni trazados | Cliente final, equipo EPI10, Carmen | La herramienta cliente aún no está decidida/configurada y el flujo definitivo no está cerrado | Riesgo operativo/legal, falta de trazabilidad, onboarding incompleto, tareas manuales | Carmen menciona explícitamente formularios, consentimientos y cuestionarios como parte de la capa cliente esperada. [SRC-001] | Alto: es un bloque natural de portal cliente en MVP | Contenido final de formularios, consentimientos requeridos, versión legal/DPO, sistema final |
| P4. Analíticas y documentos opcionales parecen gestionarse manualmente | Cliente final, Aitor, equipo EPI10 | No hay canal único validado para subida, recepción, revisión y trazabilidad documental | Pérdida de tiempo, documentos dispersos, riesgo de canal inseguro, falta de estado operativo | Stage 00 identifica analíticas opcionales y documentos como inputs que actualmente se reciben/procesan manualmente. [SRC-002] | Alto: subida documental en portal + estado/tarea en backoffice es resoluble en MVP | Qué analíticas se piden, formato, obligatoriedad, retención, permisos, proceso de revisión |
| P5. El informe final EPI10 no está suficientemente sistematizado | Cliente final, Aitor/equipo, Carmen | El informe combina resultados TellmeGen, criterio experto, inputs opcionales y plantilla propia, pero el proceso/entrega parece manual y por email | Riesgo de errores/versiones, carga manual, trazabilidad débil, entrega menos profesional | Stage 00 recoge que el informe final se construye con outputs TellmeGen, criterio EPI10 e inputs opcionales, y que parece entregarse por correo. [SRC-002] | Alto pero parcial: se puede sistematizar checklist, estados, plantilla, entrega y trazabilidad; no automatizar todo el análisis genético sin API | Plantilla actual, tiempo de producción, responsables, formato, partes fijas vs expertas, sistema de versionado |
| P6. TellmeGen no ofrece API operativa actual para partners | Carmen, Aitor, equipo técnico/preventa | El proveedor solo ofrece plataforma profesional actual; API futura sin fecha | Bloquea creación automática de usuarios/tests/barcodes, consulta de estados/resultados, descarga PDF e ingesta genética automática | Stage 00 registra confirmación de TellmeGen: no hay API actual; existe posible presupuesto antiguo y deseo futuro de API sin deadline. [SRC-002] | Crítico como restricción: no debe ser Fase 1 integrada; puede ser Fase 2 condicionada | Presupuesto/API antiguo, endpoints contemplados, coste/plazo, decisión de nuevo director IT, alternativas de exportación |
| P7. Odoo no está confirmado como backoffice operativo robusto | Carmen, Aitor, equipo EPI10 | Odoo existe o está previsto, pero no se conoce configuración completa, módulos, hosting ni API | Falta de estados, tareas, responsables, reporting, seguimiento y control operativo | Stage 00 indica que Odoo existe o está previsto, pero su estado/configuración real no está completamente cerrado. [SRC-002] | Alto: configurar Odoo como backoffice operativo parece resoluble si su estado lo permite | Versión/modalidad, módulos, API, hosting, permisos, conexión con web/pago, alcance de facturación |
| P8. Web/pago no tiene contrato operativo confirmado con backoffice/portal | Cliente final, Aitor, Carmen, equipo técnico | Web en construcción; no se sabe cómo dispara alta, pago, onboarding, tareas o registros | Riesgo de duplicar datos, perder leads/pagos, retrasar onboarding y depender de avisos manuales | Stage 00 recoge que la web está en construcción, tendrá formulario/pago probable y su integración real es Unknown. [SRC-002] | Alto si la web puede emitir eventos o integrarse; si no, puede bloquear parte del MVP | Tecnología web, pasarela de pago, responsable técnico, webhooks/API, datos recogidos, estado de implementación |
| P9. No hay dashboard operativo central de estados y tareas | Carmen, Aitor, equipo EPI10 | Estados del servicio, documentos pendientes, informe, test, seguimiento y responsables no parecen vivir en una vista única | Baja visibilidad, tareas olvidadas, dependencia de memoria, dificultad para dirección y escalado | Stage 00 identifica falta de vista operativa central y necesidad de estados/tareas/reporting. [SRC-002] | Medio-alto: probablemente resoluble en Odoo con estados, tareas y vistas | Estados definitivos, reporting deseado, quién usa dashboards, KPIs operativos |
| P10. Datos sensibles pueden estar circulando por canales o sistemas no validados | Cliente final, Carmen, EPI10, equipo técnico | Datos personales, salud, genéticos, analíticas e informes; parte del flujo parece usar email/procesos manuales | Riesgo de protección de datos, baja confianza, trazabilidad débil, necesidad de DPA/roles/retención | Carmen pide infraestructura segura España/UE. Stage 00 lista datos sensibles y necesidad de minimización/DPA/GDPR. [SRC-001, SRC-002] | Alto como restricción transversal; parcialmente resoluble con canal cliente adecuado, roles y minimización | Revisión legal/DPO, contratos, residencia real de proveedores, política de retención, permisos |
| P11. Healthie/ContinuousCare no está decidido ni validado | Carmen, equipo técnico, Aitor | Se han identificado herramientas candidatas, pero faltan plan, coste, API, residencia, DPA, idioma y encaje | Presupuesto incierto, riesgo de elegir herramienta que no cubra integración, datos o UX | Stage 00 marca Healthie como candidato fuerte pero no decisión cerrada; ContinuousCare sigue como alternativa. [SRC-001, SRC-002] | Alto como decisión habilitante del MVP, pero requiere validación antes de prometer detalle | Pricing, plan API, DPA/GDPR, residencia, soporte, español, webhooks, entrega documental |
| P12. El flujo operativo definitivo todavía no está cerrado | Carmen, Aitor, equipo EPI10, equipo técnico | Hay reconstrucción del flujo actual, pero el detalle final de MVP debe diseñarse con EPI10 | Riesgo de sobrediseñar preventa, prometer microdetalle incorrecto o dejar huecos operativos | Stage 00 recoge que el workshop inicial de flujo operativo es candidato y que faltan estados definitivos. [SRC-002] | Medio-alto: debe abordarse al inicio de Fase 1 o como dependencia clara | Duración/talleres, participantes, decisiones operativas, mapas de estados finales |

## Wishes, Ideas, and Unsupported Assumptions

| Item | Classification | Why It Is Not Yet a Confirmed Problem or Scope |
| --- | --- | --- |
| Integrar TellmeGen por API en Fase 1 | Deseo inicial / restricción contradicha | Carmen lo pidió como parte del enfoque inicial, pero la evidencia posterior indica que TellmeGen no tiene API operativa actual. [SRC-001, SRC-002] |
| Crear dashboard genética alimentada por TellmeGen | Idea no viable ahora | Depende de datos genéticos estructurados/API TellmeGen, no disponible actualmente. [SRC-002] |
| Automatizar generación completa del informe genético | Implementación fantasiosa si se asume completa | Se puede sistematizar proceso e informe, pero no automatizar plenamente análisis genético sin datos estructurados ni API. [SRC-002] |
| Construir plataforma propia o app móvil propia | Sobredimensionamiento contrario al brief | Carmen pidió herramientas existentes, propuesta sencilla y desarrollos mínimos. [SRC-001] |
| Gemelo digital | Futuro/idea fuera de fase | El material lo marca como algo que no debe entrar en Fase 1. [SRC-002] |
| Healthie como decisión ya cerrada | Supuesto no confirmado | Healthie parece ganar peso, pero falta validación formal de plan, coste, API, DPA y residencia. [SRC-002] |
| Odoo ya listo como sistema operativo completo | Supuesto no confirmado | Se sabe que existe o se revisó, pero no hay estado técnico completo. [SRC-002] |
| ROI cuantitativo cerrado | Supuesto no sustentado | Faltan volumen de clientes y horas actuales por tarea/persona. [SRC-002] |

## Resolvability Assessment

| Problem | Resolvable by System/Process/Automation? | Assessment |
| --- | --- | --- |
| P1. Manualidad de Aitor/equipo | Parcialmente sí | El MVP puede reducir tareas alrededor de altas, onboarding, documentos, estados, informe y seguimiento. No elimina trabajo TellmeGen sin API. |
| P2. Falta portal cliente único | Sí | Herramienta tipo Healthie/ContinuousCare puede centralizar onboarding, comunicación, documentos e informe si se valida. |
| P3. Formularios/consentimientos/cuestionarios no centralizados | Sí | Portal cliente puede resolverlo con configuración y revisión legal/operativa. |
| P4. Analíticas/documentos manuales | Sí | Subida documental en portal, tareas/notificaciones y estados en Odoo son resolubles. |
| P5. Informe final no sistematizado | Parcialmente sí | Se puede sistematizar checklist, estados, plantilla, revisión y entrega. Automatización completa depende de datos disponibles y criterio experto. |
| P6. TellmeGen sin API | No en Fase 1 | No es resoluble desde EPI10/Reboot sin capacidad del proveedor. Debe tratarse como restricción y Fase 2 condicionada. |
| P7. Odoo no robusto | Probablemente sí | Se puede configurar como backoffice si la versión/modalidad/API lo permite; falta validación. |
| P8. Web/pago no integrado | Probablemente sí | Depende de tecnología web, pasarela y capacidad de integración. |
| P9. Falta dashboard operativo | Sí | Probablemente resoluble en Odoo con estados/tareas/vistas. |
| P10. Riesgo datos sensibles | Parcialmente sí | Se puede mejorar canal, minimización, permisos y trazabilidad; cumplimiento legal requiere revisión especializada. |
| P11. Herramienta cliente no validada | Sí en preventa/arranque | Requiere validación de Healthie/ContinuousCare/equivalente antes de cerrar blueprint/precio. |
| P12. Flujo definitivo no cerrado | Sí por proceso | Requiere workshop inicial y decisiones operativas con EPI10. |

## MVP Candidates

Estos candidatos son problemas o bloques resolubles que Stage 02 deberá priorizar y convertir en decisión.

| Candidate | Supported Problems | Evidence | Caution |
| --- | --- | --- | --- |
| Portal cliente Healthie/ContinuousCare/equivalente | P2, P3, P4, P5, P10, P11 | Carmen pide portal, formularios, consentimientos, comunicación segura y entrega documental. [SRC-001] | Validar plan, coste, idioma, API, DPA/GDPR, residencia y datos genéticos. |
| Odoo como backoffice operativo | P1, P7, P9, P12 | Odoo es herramienta interna deseada y falta trazabilidad/estados/tareas. [SRC-001, SRC-002] | Validar versión, módulos, hosting, API, permisos y alcance real. |
| Integración web/pago -> Odoo/portal | P1, P8, P9 | Web en construcción con formulario/pago probable; necesidad de evitar alta manual. [SRC-002] | Depende de tecnología web/pasarela y contrato de integración. |
| Healthie/portal -> Odoo para estados/flags/tareas | P1, P4, P7, P9 | Necesidad de centralizar documentos y estado operativo sin duplicar datos sensibles. [SRC-002] | Evitar copiar datos clínicos/genéticos crudos a Odoo. |
| Proceso sistematizado de informe final | P1, P5, P10 | Informe final es entregable clave y hoy parece manual/email. [SRC-002] | No prometer automatización genética completa. |
| Dashboard operativo básico | P7, P9 | Falta vista central de clientes por estado, tareas, documentos, informe y seguimiento. [SRC-002] | Definir estados y usuarios reales. |
| Automatizaciones de calidad de vida para Aitor/equipo | P1, P4, P5, P8, P9 | El dolor principal es Aitor como middleware humano. [SRC-002] | No vender como eliminación completa de trabajo manual TellmeGen. |
| Seguridad, minimización y canal documental adecuado | P10 | Datos de salud/genéticos y petición de infraestructura segura España/UE. [SRC-001, SRC-002] | Revisión legal/DPO no sustituible por implementación técnica. |

## Out-of-Scope or Weakly Supported Problems

| Item | Reason |
| --- | --- |
| Integración automática TellmeGen Fase 1 | Bloqueada por falta de API operativa actual confirmada. [SRC-002] |
| Creación automática de usuarios/tests/barcodes en TellmeGen | Depende de API TellmeGen no disponible. [SRC-002] |
| Consulta automática de resultados/PDF TellmeGen | Depende de API/export estructurado no disponible. [SRC-002] |
| Dashboard genética alimentada por TellmeGen | No viable sin datos estructurados/API. [SRC-002] |
| Interpretación genética automática o diagnóstico automatizado | No aparece como problema resoluble ni como petición defendible de Fase 1; además implicaría riesgo clínico/legal. [SRC-002] |
| Gemelo digital | Identificado como fuera de Fase 1 y contrario al enfoque acotado. [SRC-002] |
| Plataforma sanitaria propia completa | Contradice el brief de Carmen sobre herramientas existentes y desarrollos mínimos. [SRC-001] |
| ROI cuantitativo cerrado | Faltan datos de volumen y horas actuales. Puede aparecer luego como ROI con supuestos explícitos, no como cifra cerrada. [SRC-002] |
| Garantizar cumplimiento legal absoluto | Debe quedar condicionado a revisión legal/DPO y contratos con proveedores. [SRC-001, SRC-002] |

## Contradictions and Unknowns

### Contradictions

| Contradiction | Impact on Problem Audit |
| --- | --- |
| Carmen pide integración API TellmeGen, pero TellmeGen no tiene API actual. [SRC-001, SRC-002] | Se convierte en una restricción/problema de viabilidad para esa integración, no en razón para matar el MVP completo. |
| Healthie aparece como preferido, pero no decidido ni validado. [SRC-002] | El problema de portal cliente es real; la herramienta concreta aún no debe cerrarse sin validación. |
| Se quiere una propuesta sencilla, pero el flujo real tiene muchas piezas. [SRC-001, SRC-002] | Stage 02 tendrá que recortar con fuerza para evitar sobreingeniería. |
| Se desea seguridad/infraestructura España/UE, pero proveedores/hosting/DPA no están validados. [SRC-001, SRC-002] | Seguridad es restricción real; garantías específicas son Unknown hasta validación. |

### Unknowns That Matter Before Scope/Blueprint

- Estado real de Odoo: versión, módulos, hosting, API, permisos y mantenimiento.
- Tecnología web, pasarela de pago, responsable técnico y capacidad de webhooks/API.
- Decisión final y condiciones de Healthie/ContinuousCare/equivalente.
- Documentación o presupuesto/API antiguo de TellmeGen.
- Plantilla, formato, tiempos y responsables del informe final.
- Volumen esperado de clientes y horas manuales actuales.
- Política legal/DPO, contratos y residencia de datos.
- Campos del formulario web y qué datos sensibles recoge.

## Handoff to Next Stage

Stage 02 debe tomar una decisión de alcance MVP basada en esta auditoría.

Recomendación de entrada para Stage 02:

- Priorizar problemas que afectan a Carmen como buyer funcional/estratégica: operar pronto, no sobredimensionar, propuesta clara y segura.
- Usar el dolor de Aitor para justificar qué tareas, estados, documentos y automatizaciones hacen falta.
- Mantener a Tomás en el plano de ROI/coste/valor, sin diseñar el producto alrededor de él.
- Considerar como fuerte candidato de Fase 1: portal cliente + Odoo backoffice + integración web/pago + automatizaciones operativas + proceso de informe final + dashboard operativo.
- Mantener fuera de Fase 1 la integración automática TellmeGen, salvo que aparezca nueva evidencia de API real, disponible y autorizada.
- No convertir deseos como gemelo digital, app propia o dashboard genética en alcance MVP.
