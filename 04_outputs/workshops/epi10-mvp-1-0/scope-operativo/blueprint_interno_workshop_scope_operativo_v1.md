# Blueprint interno workshop scope operativo v1

## Proposito

Disenar una sesion presencial de 3 horas para cerrar el scope funcional-operativo de EPI10 Salud MVP 1.0 desde el proceso real del cliente/paciente, no desde las herramientas.

Este documento es para Raul/equipo. Debe servir para conducir la conversacion, obtener decisiones utiles y transformar lo aprendido despues en backlog, arquitectura funcional, integraciones, automatizaciones y entregables sin generar Stage 06.

## Tres niveles de entrega

| Nivel | Archivo | Audiencia | Uso |
| --- | --- | --- | --- |
| blueprint interno | `blueprint_interno_workshop_scope_operativo_v1.md` | Raul/equipo Skilland/Reboot | Preparar, facilitar y controlar scope durante el workshop. |
| paquete previo cliente | `draft_email_envio_agenda_workshop.md` y `ficha_orden_dia_workshop_epi10.md` | Tomas, Carmen, Aitor | Enviar una preparacion ligera y amable antes de la sesion. |
| materiales presenciales | `materiales_ejecucion_presencial_v1.md` | Facilitador + participantes | Capturar journey, estados, roles, decisiones, datos, sistemas, automatizaciones y exclusiones en sala. |

## Nota de orientacion

### Vendido y firmado

- EPI10 Salud MVP 1.0 esta vendido y firmado; la primera factura ya esta emitida.
- Fase 1 incluye un workshop operativo de 3 horas, portal cliente, Odoo backoffice, EPI10 Salud MVP 1.0 como software propio en AWS Espana, EPI10 Informe Final Copilot, documentacion, formacion y soporte inicial.
- Healthie es la hipotesis principal de portal cliente, pero no esta validado definitivamente.
- Odoo es el backoffice operativo previsto, pero su estado real sigue `Unknown`.
- Web/pago se espera como punto de entrada; el contrato tecnico exacto de eventos, schema, auth e idempotencia sigue `Unknown`.
- TellmeGen queda como sistema externo/manual en Fase 1 por falta de API operativa confirmada.
- Copilot debe tratarse como `Copilot Harness` interno EPI10-owned dentro de AWS Espana: subagents, skills, workflow/scripts, checklist, anonimization/pseudonymization y human review obligatorio. Runtime, modelo, App Codigo, IAM, retencion, logs y coste siguen `Unknown`.

### Que Fase 1 debe resolver

- Ordenar la experiencia cliente desde interes/pago hasta informe final y seguimiento.
- Reducir carga manual de Aitor/equipo donde sea controlable.
- Definir estados oficiales, responsables, tareas, documentos, datos y canales.
- Separar que vive en web, Odoo, Healthie/equivalente, WhatsApp/email, TellmeGen y Copilot Harness.
- Convertir decisiones operativas en base para arquitectura funcional e integraciones.
- Mantener Fase 1 ejecutable para Raul como ejecutor principal con Fer en CTO review semanal.

### Que debe quedar fuera de Fase 1

- Integracion automatica TellmeGen por API.
- Creacion automatica de usuarios, tests, barcodes, polling de estado o descarga de PDF TellmeGen.
- Ingesta estructurada automatica de resultados geneticos.
- Dashboard genetica.
- Diagnostico automatico, interpretacion genetica autonoma o aprobacion final por IA.
- Plataforma sanitaria completa desde cero.
- Stage 06, `06_execution_plan_v1.md` o backlog atomico completo.
- Nuevas condiciones comerciales, presupuesto, factura, contrato o promesas fuera del scope firmado.

### Como enmarcar cada pieza

| Pieza | Framing correcto en workshop |
| --- | --- |
| Proceso real | Punto de partida. Primero se congela como ocurre hoy y como debe operar el MVP. |
| Web/pago | Entrada del journey. Debe emitir o facilitar eventos minimos; contrato tecnico `Unknown`. |
| Odoo | Backoffice operativo y vista de estados/tareas/responsables. No repositorio genetico ni portal cliente. |
| Healthie/equivalente | Portal cliente candidato para onboarding, formularios, consentimientos, documentos, comunicacion, informe y seguimiento. Gate pendiente. |
| WhatsApp/email | Canales actuales o fallback. Deben identificarse, minimizarse y no convertirse en sistema principal de datos sensibles. |
| TellmeGen | Externo/manual, sin API operativa confirmada. Puede generar hitos manuales en Odoo. |
| Copilot Harness | Apoyo interno a borrador de informe con datos minimizados y revision humana. No diagnostica, no sustituye criterio profesional. |
| AWS/PostgreSQL/MVP | Capa tecnica propia para eventos, IDs, estados, idempotencia, retries, logs minimizados y marcadores operativos. No almacena raw genetic data. |

### Riesgos a controlar en sala

- Derivar a wishlist de features en vez de proceso operativo.
- Reabrir TellmeGen API como promesa de Fase 1.
- Discutir herramientas antes de entender estados, responsables y datos.
- Convertir Copilot en "IA clinica" o aprobacion automatica.
- Normalizar WhatsApp/email como canal principal de datos sensibles.
- Salir sin decision log ni owner por estado.
- Cerrar demasiadas decisiones tecnicas sin conocer Healthie, Odoo y web/pago reales.

## Principio de facilitacion

Pregunta central:

> Desde que una persona muestra interes hasta que recibe su informe final y seguimiento, que decisiones, datos, documentos, estados, responsables y comunicaciones ocurren, y cuales queremos automatizar o controlar en esta Fase 1?

Regla de traduccion: cada idea debe acabar en una de estas categorias:

- proceso;
- estado;
- owner;
- dato/documento;
- sistema fuente;
- automatizacion;
- validacion humana;
- excepcion;
- exclusion explicita.

## 1. Ordenar las piezas del sistema EPI10 MVP 1.0

### 1.1 Journey cliente/paciente

Modelo de partida a validar:

1. Persona muestra interes o llega desde canal comercial.
2. Completa formulario y/o pago en web.
3. Se crea caso operativo en Odoo.
4. Se invita o activa portal cliente en Healthie/equivalente si valida.
5. Cliente completa onboarding, formularios, consentimiento y cuestionarios.
6. Cliente sube documentos o analiticas si aplica.
7. Equipo EPI10 coordina test/laboratorio y usa TellmeGen manualmente.
8. Aitor/equipo actualiza hitos manuales en Odoo.
9. Caso queda `ready_for_report` cuando inputs minimos estan listos.
10. Copilot Harness ayuda a preparar borrador interno con pseudonimizacion y human review.
11. EPI10 aprueba informe final.
12. Informe se entrega por Healthie si se permite o por fallback aprobado.
13. Odoo registra marcador de entrega y seguimiento.
14. Caso pasa a seguimiento activo, cerrado o incidencia.

Hechos:

- El informe final es entregable central.
- TellmeGen no tiene API operativa confirmada.
- El dolor principal es coordinacion manual y falta de trazabilidad.

Unknown:

- Proceso exacto actual con casos reales.
- Que canales de captacion existen hoy.
- Si pago ya esta implementado y con que pasarela.
- Plantilla final de informe y regla concreta de `ready_for_report`.

### 1.2 Estados oficiales candidatos

Estos estados son candidatos; deben cerrarse en workshop:

| Grupo | Estados candidatos | Decision a cerrar |
| --- | --- | --- |
| entrada | lead recibido, pago pendiente, pago confirmado | Cual es el primer estado oficial y que evento lo dispara. |
| portal | invitacion pendiente, invitacion enviada, onboarding iniciado/completado | Que vive en Healthie y que se refleja en Odoo. |
| consentimientos/cuestionarios | consentimiento pendiente/completado, cuestionario pendiente/completado | Que bloquea avance y quien revisa. |
| documentos | documento/analitica pendiente, recibido, necesita revision | Que documentos son imprescindibles vs deseables. |
| laboratorio/TellmeGen | test pendiente, muestra coordinada, resultado externo pendiente/disponible | Que hitos manuales se registran en Odoo y quien los actualiza. |
| informe | listo para informe, informe en preparacion, en revision humana, aprobado, entregado | Regla de listo, checklist, human review y canal de entrega. |
| seguimiento | seguimiento activo, cerrado | Criterio de cierre y proximo paso. |
| control | incidencia, bloqueado, esperando cliente, esperando proveedor | Como se detecta, owner y recuperacion. |

### 1.3 Roles y responsabilidades

| Persona/rol | Uso deliberado en workshop | Decision esperada |
| --- | --- | --- |
| Aitor | Fuente de verdad del proceso real, fricciones, excepciones y ejemplos recientes. | Pasos reales, tareas manuales, puntos de bloqueo y estados manuales TellmeGen. |
| Carmen | Calidad, experiencia paciente, validacion profesional/funcional y criterio de informe. | Que debe ver/hacer el paciente, que necesita revision humana y que experiencia no puede fallar. |
| Tomas | Prioridad de negocio, exito, tradeoffs, coste/valor y limites de scope. | Que es imprescindible en Fase 1, que puede ser deseable, Fase 2 o fuera de alcance. |
| Raul/equipo | Facilitacion, traduccion a sistemas, estados, owner, datos y automatizaciones. | Decision log, mapa operativo y material para arquitectura/backlog posterior. |

### 1.4 Sistemas y fuentes de verdad

| Pieza | Fuente de verdad esperada | Limite |
| --- | --- | --- |
| Web/pago | Entrada comercial, lead, payment status | No debe almacenar proceso clinico ni datos sensibles innecesarios. |
| Odoo | Estado operativo, tareas, responsables, milestones TellmeGen, dashboard | No raw genetic data, no repositorio documental clinico. |
| Healthie/equivalente | Portal cliente, formularios, consentimientos, cuestionarios, documentos, comunicacion, informe entregado | Gate pendiente: plan/API/DPA/residencia/coste. |
| WhatsApp/email | Canal actual o fallback identificado | Minimizar; no debe ser sistema principal si hay datos sensibles. |
| TellmeGen | Plataforma externa de laboratorio/proveedor | Manual en Fase 1, sin API, sin promesa de automatizacion. |
| Copilot Harness | Workflow interno de borrador con datos minimizados | No diagnostica, no aprueba, no sustituye human review. |
| PostgreSQL tecnico | IDs, eventos, idempotency, retries, snapshots y audit markers sanitizados | No documentos, no report contents, no prompts sensibles, no raw genetic data. |

### 1.5 Documentos, forms, templates y reports

Hay que obtener inventario minimo:

- formularios actuales;
- consentimientos;
- cuestionarios;
- analiticas/documentos solicitados;
- plantilla o ejemplo de informe final;
- textos o disclaimers aprobados;
- comunicaciones frecuentes;
- criterios internos de revision;
- casos recientes representativos.

Decision clave: que documento vive en Healthie, que solo se referencia en Odoo, que puede entrar minimizado al Copilot Harness y que nunca debe circular por WhatsApp/email salvo fallback aprobado.

### 1.6 Automatizaciones candidatas

No se deben prometer en sala; se deben clasificar:

| Candidata | Tipo | Gate |
| --- | --- | --- |
| alta post-pago a Odoo | Fase 1 imprescindible si web/pago emite evento integrable | contrato web/pago |
| invitacion portal | Fase 1 imprescindible/deseable segun Healthie | API/plan Healthie |
| tareas por estado | Fase 1 imprescindible | modelo Odoo |
| avisos de documentos pendientes | Fase 1 deseable | portal + Odoo |
| registro manual TellmeGen | Fase 1 imprescindible como proceso, no API | owner y estados manuales |
| subida informe final a Healthie | Fase 1 deseable/imprescindible segun scope y API | API Healthie |
| Copilot Harness borrador | Fase 1 con gate de datos y human review | template, pseudonimizacion, ADR datos |

### 1.7 Excepciones y casos raros

Capturar al menos:

- pago duplicado, fallido o reembolsado;
- cliente no completa formularios;
- documento ilegible o incompleto;
- consentimiento no firmado;
- analitica pendiente;
- retraso de TellmeGen;
- resultado no disponible;
- cliente quiere abandonar;
- informe requiere revision extra;
- entrega del informe falla;
- incidencia de datos sensibles.

Cada excepcion debe mapearse a estado, owner, sistema, tarea de recuperacion y criterio de cierre.

### 1.8 Definicion de exito para Fase 1

Propuesta a validar:

- EPI10 puede ver cada caso por estado, owner y proximo paso.
- El cliente tiene un canal claro para onboarding, documentos, comunicacion, informe y seguimiento.
- Aitor/equipo deja de depender de memoria y seguimiento manual disperso para lo repetitivo.
- TellmeGen manual queda controlado con estados y tareas, aunque no integrado.
- El informe final tiene checklist, regla de listo, revision humana y canal de entrega.
- Los datos sensibles tienen ubicacion y permisos claros.
- El primer slice es viable para Raul y revisable por Fer.

## 2. Definir que hay que saber/sacar del workshop

### Tabla de decisiones de alta senal

| Pieza | Decision/informacion a sacar | Preguntas de workshop | Pedir ejemplos/casos recientes | Mapea a | Boundary |
| --- | --- | --- | --- | --- | --- |
| Journey actual | Pasos reales desde interes a seguimiento. | "Contad un caso reciente de principio a fin: que paso, quien hizo que y donde se atasco?" | Un caso normal y uno problematico. | proceso, owner, excepcion | Fase 1 imprescindible |
| Entrada web/pago | Evento inicial y datos minimos. | "Que ocurre exactamente cuando alguien deja datos o paga?" | Ultimo lead/pago real. | dato, sistema, automatizacion | Fase 1 imprescindible |
| Estados Odoo | Lista oficial y transiciones. | "Que estados necesitais ver para saber que toca hacer sin preguntar a nadie?" | Captura actual o lista informal. | estado, owner, sistema | Fase 1 imprescindible |
| Owners | Responsable por fase y backup. | "Quien es dueno de cada paso y quien actua si esa persona no esta?" | Situacion donde algo quedo pendiente. | owner, tarea, validacion | Fase 1 imprescindible |
| Healthie/portal | Acciones visibles para paciente. | "Que debe poder hacer el paciente en el portal para que la experiencia sea premium y ordenada?" | Documentos/forms actuales. | sistema, dato, proceso | Fase 1 imprescindible si valida |
| Formularios/consentimientos | Inventario y bloqueos. | "Que formularios o consentimientos bloquean el avance si faltan?" | Versiones actuales. | dato, estado, validacion | Fase 1 imprescindible |
| Documentos/analiticas | Obligatorio vs opcional. | "Que documentos son necesarios para empezar, para informe y para seguimiento?" | Caso con analitica faltante. | dato, estado, human validation | Fase 1 imprescindible/deseable |
| TellmeGen | Hitos manuales y responsable. | "Que hace Aitor hoy en TellmeGen y que estado minimo debe reflejarse en Odoo?" | Ultimo test gestionado. | proceso, estado, owner | Fase 1 manual; API Fase 2 |
| Informe final | Regla de listo, template, revision. | "Cuando un caso esta listo para informe y quien puede aprobar la version final?" | Plantilla o informe anonimizado si disponible. | validacion, dato, estado | Fase 1 imprescindible |
| Copilot Harness | Inputs permitidos y human review. | "Que partes del informe pueden beneficiarse de borrador asistido y que siempre debe revisar una persona?" | Fragmentos o secciones no sensibles. | dato, workflow, human validation | Fase 1 gated |
| Comunicaciones | Canales actuales y deseados. | "Que se comunica por WhatsApp/email hoy y que deberia moverse al portal?" | Mensajes tipo, sin datos sensibles. | sistema, dato, exclusion | Fase 1 imprescindible |
| Automatizaciones | Repetitivo vs criterio humano. | "Que tareas repetis siempre y cuales requieren criterio profesional?" | Tarea que se olvida o retrasa. | automatizacion, human validation | Fase 1/deseable |
| Excepciones | Casos raros reales. | "Que casos han roto el flujo o suelen obligar a improvisar?" | 2-3 excepciones. | excepcion, owner, tarea | Fase 1 si frecuente |
| Datos sensibles | Ubicacion y permisos. | "Que datos no deben estar en Odoo, logs, email o paquetes de Copilot?" | No usar datos reales en sala si no hace falta. | dato, permiso, exclusion | Fase 1 imprescindible |
| Exito | Criterio de valor para Tomas/Carmen/Aitor. | "Al final de Fase 1, que deberia haber cambiado para decir que esto funciona?" | Dolor actual medible si existe. | scope, prioridad | Fase 1 imprescindible |

### Reglas de facilitacion para preguntas

- No hacer preguntas si no cambian proceso, estado, owner, dato, sistema, automatizacion, human validation o exclusion.
- No preguntar por features sueltas sin pedir "en que paso del journey vive".
- Si aparece una idea, clasificarla inmediatamente: Fase 1 imprescindible, Fase 1 deseable, Fase 2 o fuera de alcance.
- Si falta evidencia, escribir `Unknown`; no cerrar por intuicion.
- Si algo depende de API Healthie, Odoo, web/pago o TellmeGen, marcar gate.

## 3. Disenar la experiencia presencial de 3 horas

### Estructura timeboxed

| Tiempo | Bloque | Objetivo | Dinamica | Output |
| --- | --- | --- | --- | --- |
| 0:00-0:10 | Apertura y reglas | Alinear que el workshop congela proceso operativo, no wishlist. | Opening script y objetivos visibles. | Acuerdo de metodo y parking lot. |
| 0:10-0:45 | Journey real actual | Reconstruir un caso real de punta a punta. | Aitor narra, Carmen/Tomas completan, Raul mapea. | Journey actual con fricciones. |
| 0:45-1:20 | Journey MVP objetivo | Definir como debe operar Fase 1. | Convertir pasos en estados, owners y sistemas. | Journey objetivo y primeras decisiones. |
| 1:20-1:30 | Pausa breve | Ordenar notas. | Facilitador limpia tablero. | Lista de decisiones abiertas. |
| 1:30-2:05 | Estados, roles y fuentes de verdad | Cerrar estados candidatos, owner por fase y sistema principal. | Matriz estado/owner/sistema. | State map y responsibility matrix. |
| 2:05-2:35 | Documentos, informe, Copilot y datos sensibles | Aclarar inputs, ready_for_report, human review y limites de datos. | Checklist de informe + data boundary. | Regla de listo, validaciones y unknowns. |
| 2:35-2:50 | Automatizaciones, excepciones y scope | Clasificar automatizaciones y casos raros. | Parking Fase 1/deseable/Fase 2/fuera de alcance. | Scope board y exception log. |
| 2:50-3:00 | Cierre | Confirmar decisiones, unknowns, next step. | Leer decision log y pedir confirmacion. | Handoff operativo para arquitectura/backlog posterior. |

### Opening script

> Hoy no venimos a decidir una lista de pantallas ni a prometer integraciones. Venimos a entender y ordenar el proceso real de EPI10: desde que una persona muestra interes hasta que recibe su informe final y seguimiento. A partir de ese proceso vamos a cerrar estados, responsables, sistemas, datos, validaciones y automatizaciones posibles para Fase 1. Lo que no quepa o dependa de una evidencia que no tenemos, lo dejaremos como deseable, Fase 2, fuera de alcance o `Unknown`.

Puntos a decir explicitamente:

- TellmeGen se trata como externo/manual en Fase 1 porque no hay API operativa confirmada.
- Copilot Harness ayuda a preparar borradores internos; no diagnostica, no sustituye revision humana y no aprueba informes.
- Healthie y Odoo se validan contra capacidades reales, no se fuerzan como dogma.
- El workshop debe terminar con decisiones operativas, no con una lista infinita de ideas.

### Uso deliberado de participantes

| Participante | Como activarlo | Como evitar dispersion |
| --- | --- | --- |
| Aitor | "Cuentanos el caso real, paso a paso, con herramientas y tareas." | Si salta a solucion, pedir "en que paso del journey ocurre?" |
| Carmen | "Que necesita ver/sentir el paciente y que validacion profesional no se puede perder?" | Si se amplia scope, clasificar impacto en Fase 1 vs deseable. |
| Tomas | "Que es imprescindible para que negocio considere Fase 1 exitosa?" | Si aparece vision futura, mover a Fase 2 o roadmap. |

### Metodo anti-scope-creep

Usar cuatro columnas visibles durante toda la sesion:

- Fase 1 imprescindible.
- Fase 1 deseable.
- Fase 2.
- Fuera de alcance.

Reglas:

- Una automatizacion solo entra en Fase 1 si reduce una friccion frecuente, tiene owner claro y depende de capacidad validable.
- TellmeGen API va a Fase 2 salvo nueva evidencia documentada.
- Diagnostico autonomo, dashboard genetica y gemelo digital van fuera de alcance.
- Cualquier decision de herramienta sin proceso asociado vuelve al journey.

### Decision capture

Cada decision se captura con:

- ID;
- texto de decision;
- owner;
- sistema afectado;
- impacto en estado/dato/automatizacion;
- boundary: Fase 1 imprescindible, deseable, Fase 2 o fuera de alcance;
- `Unknown` que queda pendiente;
- proximo paso.

### Outputs que deben existir al final de la sesion

- Journey actual resumido.
- Journey MVP objetivo.
- State map candidato validado.
- Responsibility matrix por fase.
- Source-of-truth matrix por sistema.
- Inventario de documentos/forms/consentimientos/informe.
- Regla inicial de `ready_for_report`.
- Lista de automatizaciones candidatas con gates.
- Manual TellmeGen boundary y milestones en Odoo.
- Data sensitivity checklist inicial.
- Decision log.
- Unknowns y riesgos.
- Scope parking lot.

## Handoff posterior esperado

Despues del workshop, el equipo podra convertir las salidas en:

- backlog funcional de Fase 1;
- arquitectura funcional de integraciones;
- ADRs minimos para Healthie, Odoo, web/pago, datos y Copilot Harness;
- primer slice vertical recomendado para Fer: `web/pago -> MVP -> PostgreSQL -> Odoo`;
- criterios de aceptacion por flujo;
- decision de fallback si Healthie/Odoo/API no validan.

No convertir este handoff en Stage 06 ni `06_execution_plan_v1.md` sin decision explicita posterior.

## QA handoff

### Archivos producidos

- `blueprint_interno_workshop_scope_operativo_v1.md`
- `draft_email_envio_agenda_workshop.md`
- `ficha_orden_dia_workshop_epi10.md`
- `materiales_ejecucion_presencial_v1.md`

### Acceptance criteria verificados en contenido

- Output folder y cuatro archivos definidos bajo `04_outputs/workshops/epi10-mvp-1-0/scope-operativo/`.
- Este blueprint separa blueprint interno, paquete previo cliente y materiales presenciales.
- Este blueprint se organiza alrededor de: Ordenar piezas, Definir que sacar del workshop y Disenar experiencia presencial.
- Cubre journey, estados, roles, herramientas, web, Odoo, Healthie, WhatsApp/email, TellmeGen/laboratorio, documentos/forms/reports, Copilot, automatizaciones, excepciones, datos sensibles/permisos y definicion de exito Fase 1.
- Las preguntas estan mapeadas a proceso, estado, owner, dato, sistema, automatizacion, human validation o exclusion.
- La sesion incluye estructura de 3 horas, bloques, participantes, opening, control de scope, captura de decision y cierre.
- Aitor, Carmen y Tomas se usan segun sus roles.
- Los materiales presenciales incluyen journey canvas, state map, responsibility matrix, source-of-truth matrix, automation/human-validation matrix, parking lot, decision log, exceptions capture, data sensitivity checklist y close checklist.
- TellmeGen se presenta como externo/manual, sin API operativa confirmada, y Fase 2 solo si aparece evidencia.
- Copilot Harness se presenta como apoyo interno con pseudonimizacion/anonimizacion y revision humana; no diagnostica, no sustituye criterio profesional y no aprueba informes.
- Fase 1, deseable, Fase 2 y fuera de alcance quedan visibles.
- No se crea `06_execution_plan_v1.md`.

### Unknowns sin resolver

- Fecha/hora exacta y setup de sala del workshop.
- Estado real de Odoo: version, modalidad, API, permisos, campos, vistas, hosting y backups.
- Healthie: plan, API/webhooks, DPA/GDPR, residencia, idioma, coste y entrega de informe.
- Web/pago: proveedor, schema, auth, idempotency key, sandbox y owner tecnico.
- Plantilla final del informe, inputs, regla `ready_for_report`, review rubric y formato final.
- Volumen esperado y horas manuales actuales por caso.
- Matriz final de datos sensibles, retencion, logs, LLM/modelo, IAM y DPO.
- Runtime/model/provider/App Codigo/retencion/coste del Copilot Harness.
- Alcance operativo exacto del soporte incluido.

### Riesgos para el workshop real

- Que la sesion se convierta en cuestionario largo o wishlist de features.
- Que se prometan automatizaciones antes de validar Healthie/Odoo/web/pago.
- Que TellmeGen API vuelva al lenguaje de Fase 1.
- Que Copilot se entienda como IA clinica autonoma.
- Que no se capturen owners y decision log.
- Que se subestime la capacidad real: Raul como ejecutor principal y Fer en review semanal.

### Comando recomendado siguiente

```text
/goal ejecutar workshop operativo EPI10 MVP 1.0
```

Usarlo cuando ya exista fecha/sala o cuando Raul quiera preparar la ejecucion real con estos materiales como base.
