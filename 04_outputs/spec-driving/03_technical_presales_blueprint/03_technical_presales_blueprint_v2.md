# 03 - Technical Pre-Sales Blueprint v2

## Blueprint Summary

Este blueprint sustituye la formulacion demasiado generica de Stage 03 v1. La
Fase 1 de EPI10 Salud no debe presentarse como una simple conexion entre
Healthie y Odoo ni como una automatizacion low-code. Debe presentarse como
**EPI10 Salud MVP 1.0**: una primera capa software propia de EPI10, desplegada
en AWS España, que orquesta web/pago, Healthie, Odoo, estados, tareas,
documentos, produccion asistida del informe final, entrega y trazabilidad.
[CTO-001]

La decision de scope de Stage 02 v2 se mantiene: Healthie como hipotesis
principal de portal cliente; ContinuousCare/equivalente como alternativa; Odoo
como backoffice operativo; web/pago conectado; automatizaciones para reducir la
carga de Aitor/equipo; informe final sistematizado; TellmeGen externo/no
integrado en Fase 1; workshop unico de 3 horas; y estimacion preliminar de
costes externos. [SRC-001, SRC-002]

Este documento sigue siendo preventa tecnica. No es propuesta comercial final,
presupuesto cerrado, Stage 06 execution plan, backlog atomico ni estructura de
repositorio.

## Grounding in Approved Scope

| Approved Stage 02 v2 Decision | Stage 03 v2 Translation | Source |
| --- | --- | --- |
| Healthie candidato principal | Healthie sigue como portal cliente principal si valida plan, coste, DPA, residencia, idioma y API/webhooks. | SRC-001, SRC-002 |
| ContinuousCare/equivalente alternativa | Mantener alternativa si Healthie falla por coste, DPA, residencia, idioma o API. | SRC-001, SRC-002 |
| Odoo backoffice | Odoo queda como backoffice operativo via API y configuracion, no como repositorio de datos geneticos crudos. | SRC-001, SRC-002, CTO-001 |
| Web/pago conectado | Web/pago dispara eventos hacia EPI10 Salud MVP 1.0 para alta, pago, tareas y onboarding. | SRC-002, CTO-001 |
| Automatizaciones QoL | Las automatizaciones viven en software propio, con logica de estados, tareas, idempotencia, retries y trazabilidad. | SRC-002, CTO-001 |
| Informe final sistematizado | Se incorpora EPI10 Informe Final Copilot para borrador asistido, anonimizado/pseudonimizado y revisado por humano. | SRC-002, CTO-001 |
| TellmeGen fuera de Fase 1 | TellmeGen se mantiene como sistema externo consultado por EPI10; integracion solo futura si aparece API real. | SRC-002, CTO-001 |
| Workshop acotado | Una unica sesion de 3 horas dentro de Fase 1, con checklist previo y outputs operativos. | SRC-002 |
| Costes externos | Stage 04 debe incluir Healthie/API/add-ons, Odoo, AWS España, LLM/API Copilot, legal/DPO si aplica y soporte. | SRC-001, CTO-001 |

## Commercial Technical Narrative

La Fase 1 no consiste unicamente en configurar herramientas SaaS. Incluye el
desarrollo de una primera capa propia de software para EPI10 Salud, alojada en
AWS España, que orquesta la web, el portal cliente Healthie y Odoo, automatiza
estados y tareas, reduce carga operativa y habilita la entrega trazable del
informe final. [CTO-001]

Esta capa queda disenada como una base ampliable para futuras fases. A
diferencia de una simple conexion puntual entre herramientas, permite ir
incorporando progresivamente nuevas capacidades: mas automatizaciones,
integracion genetica si TellmeGen habilita API, evolucion del portal cliente,
automatizacion avanzada del informe, reporting, modulos de analisis y, a largo
plazo, capacidades propias relacionadas con el gemelo digital de EPI10.
[CTO-001]

La idea es usar herramientas existentes para acelerar el MVP, pero construir
desde el inicio una base software propia que pueda ir absorbiendo capacidades
criticas del negocio conforme EPI10 crezca. [CTO-001]

## Target Architecture

```text
Cliente final
   |
   v
Web EPI10 + pago
   |
   | lead_created / payment_success
   v
AWS España
   |
   v
EPI10 Salud MVP 1.0
Software propio / capa de orquestacion
TypeScript / NestJS / PostgreSQL
   |                         |
   v                         v
Healthie API/Webhooks         Odoo API
portal cliente                backoffice operativo
   |                         |
   v                         v
formularios                   contactos
consentimientos               casos/servicios
cuestionarios                 estados
analiticas/documentos         tareas
comunicacion                  responsables
informe final                 dashboard operativo
seguimiento                   reporting

EPI10 Informe Final Copilot
   |
   v
inputs anonimizados/pseudonimizados
   |
   v
borrador asistido con LLM / agentes / skills / scripts
   |
   v
revisión humana obligatoria
   |
   v
informe final validado
   |
   v
subida automatica a Healthie si API lo permite
   |
   v
actualizacion de estado en Odoo

TellmeGen B2B
= sistema externo no integrado en Fase 1
= equipo EPI10 lo consulta/usa como input externo
= integracion futura solo si TellmeGen habilita API real
```

## CTO Decisions for Proposal

| ID | Decision | Result |
| --- | --- | --- |
| D1 | Runtime operativo | Microservicio propio |
| D2 | n8n | Fuera del core; opcional futuro |
| D3 | Stack preferido | TypeScript / NestJS |
| D4 | Base de datos tecnica | PostgreSQL minima |
| D5 | Infraestructura | AWS España |
| D6 | Portal cliente | Healthie como hipotesis principal |
| D7 | Integracion portal | Healthie API/webhooks obligatorios |
| D8 | Backoffice | Odoo via API |
| D9 | Informe final | EPI10 Informe Final Copilot |
| D10 | Borrador LLM | Si, anonimizado/pseudonimizado y con revisión humana |
| D11 | Ejecucion Copilot | Aitor/equipo EPI10 desde sus entornos corporativos |
| D12 | Subida informe | Automatica a Healthie si API lo permite |
| D13 | Código | Activo propio de EPI10 |
| D14 | Documentacion | Tecnica y operativa, para mantenimiento futuro |
| D15 | Soporte | Incluido hasta final de año / 6 meses |
| D16 | TellmeGen | Sistema externo no integrado en Fase 1 |
| D17 | AWS coste | Coste externo recurrente a incluir |
| D18 | Healthie API/add-on | Coste externo pendiente de cotizacion |
| D19 | LLM/API Copilot | Coste externo posible a estimar |

## EPI10 Salud MVP 1.0

Terminos obligatorios de esta iteracion: software propio, desarrollo a medida,
AWS España, TypeScript / NestJS, PostgreSQL, Healthie API/webhooks, Odoo API,
código como activo entregable de EPI10, EPI10 Informe Final Copilot,
anonimización/pseudonimización y revisión humana obligatoria. [CTO-001]

EPI10 Salud MVP 1.0 es una aplicacion/capa software propia desarrollada a
medida. Su funcion es orquestar eventos, estados, tareas, documentos, informe
final y trazabilidad entre la web/pago, Healthie y Odoo. [CTO-001]

Componentes internos previstos:

- servicio backend TypeScript / NestJS;
- endpoints para eventos web/pago;
- endpoints para webhooks Healthie;
- cliente API Healthie;
- cliente API Odoo;
- logica de estados;
- logica de tareas;
- logica de sincronizacion;
- control de errores;
- idempotencia;
- retries;
- logs tecnicos minimizados;
- base PostgreSQL tecnica;
- mapeo de IDs Web/Healthie/Odoo;
- modulo de subida de informe final;
- integracion con EPI10 Informe Final Copilot.

Limites:

- no es plataforma sanitaria completa;
- no sustituye Healthie ni Odoo en Fase 1;
- no almacena datos geneticos crudos;
- no integra TellmeGen en Fase 1;
- si deja una base ampliable para futuras fases.

## EPI10 Informe Final Copilot

EPI10 Informe Final Copilot es parte central de Fase 1. Asiste al equipo EPI10
en la produccion del borrador interno del informe final: ordena inputs, aplica
checklist, anonimiza/pseudonimiza datos, usa prompts/skills/subagentes/scripts,
genera borrador preliminar, exige revisión humana y facilita la subida del
informe final aprobado a Healthie si la API lo permite. [CTO-001]

Incluye:

- checklist de preparacion de inputs;
- script propio de anonimization/pseudonymization;
- prompts/skills/subagentes;
- estructura de carpetas o assets;
- generacion de borrador;
- validacion humana obligatoria;
- export final;
- integracion con subida a Healthie;
- actualizacion de estado en Odoo;
- formacion al equipo EPI10.

Reglas:

- no vender como generacion automatica de informe genetico;
- no vender como diagnostico automatico;
- no vender como interpretacion genetica autonoma;
- el output es borrador interno;
- la version final requiere revisión y aprobacion humana;
- inputs anonimizados/pseudonimizados;
- script anonimizador como parte del software propio de EPI10;
- Claude/OpenAI/Codex/Claude Code u otras herramientas solo segun configuracion
  y entorno corporativo;
- costes LLM/API, si aplican, como costes externos/recurrentes.

## Anonymization and Sensitive Data Handling

La anonimization/pseudonymization no es solo una recomendacion operativa. Debe
formar parte del proceso y del software del MVP mediante checklist y script
propio. [CTO-001]

Controles requeridos:

- checklist de anonimization/pseudonymization;
- script propio anonimizador;
- pseudonimizar inputs;
- eliminar identificadores directos;
- revisión previa antes de enviar inputs al Copilot;
- logs sin datos sensibles;
- no raw genetic data en Odoo;
- no raw genetic data en la base tecnica PostgreSQL del MVP;
- retencion minima de paquetes temporales;
- revisión legal/DPO si EPI10 lo exige.

## Healthie API and Webhooks

Healthie sigue siendo la hipotesis principal de portal cliente. Si Healthie se
selecciona, Healthie API/webhooks son necesarios para el alcance de Fase 1; no
deben tratarse como opcionales decorativos. [CTO-001]

Capacidades a validar y contemplar:

- crear cliente o preparar invitacion;
- invitar onboarding;
- recibir eventos;
- detectar formulario completado;
- detectar consentimiento completado;
- detectar documento/analitica subida;
- gestionar entrega del informe final;
- sincronizar estados con Odoo mediante EPI10 Salud MVP 1.0.

Referencia externa revisada el 2026-06-11: Healthie publica API como add-on
disponible para Group/Enterprise; tambien documenta webhooks para eventos en
tiempo real. El coste del add-on/API no debe inventarse y debe cotizarse.

## Odoo API

Odoo queda como backoffice operativo via API. Debe concentrar control interno,
estados, tareas, responsables, seguimiento y dashboard operativo basico.
[SRC-002, CTO-001]

Debe cubrir:

- crear/actualizar contacto;
- crear caso/servicio;
- actualizar estados;
- crear tareas;
- asignar responsables;
- registrar entrega de informe;
- alimentar dashboard operativo basico;
- seguimiento.

Default: Odoo API + configuracion de modelos/campos/vistas. No modulo custom de
Odoo como default. Modulo custom solo si durante ejecucion se demuestra
necesario.

## AWS Spain Infrastructure

AWS España es la decision base de infraestructura para EPI10 Salud MVP 1.0.
[CTO-001]

Componentes alojados o gestionados:

- backend EPI10 Salud MVP 1.0;
- PostgreSQL tecnico;
- logs tecnicos minimizados;
- secrets/config;
- backups;
- monitorizacion;
- endpoint para webhooks;
- posible storage temporal.

Reglas:

- infraestructura pagada por EPI10 como coste externo recurrente;
- no almacenar raw genetic data;
- no usar AWS como repositorio documental principal si Healthie gestiona
  documentos;
- incluir soporte de despliegue/operacion inicial hasta final de año /
  aproximadamente 6 meses.

## Code Ownership and Deliverable Asset

Todo código desarrollado especificamente para EPI10 se entregara a EPI10 como
activo propio. [CTO-001]

Incluye:

- EPI10 Salud MVP 1.0;
- EPI10 Informe Final Copilot;
- script propio de anonimization/pseudonymization;
- clientes/integraciones propias con Healthie/Odoo/web/pago;
- documentacion tecnica;
- documentacion operativa.

Cualquier equipo tecnico futuro autorizado por EPI10 debe poder trabajar sobre
el sistema. El software queda disenado para ser mantenible y ampliable.

Esto no es una configuracion desechable. Es la primera base software propia que
EPI10 podra seguir desarrollando.

## Included Support Period

Fase 1 debe incluir soporte hasta final de año / aproximadamente 6 meses.
[CTO-001]

Cobertura:

- EPI10 Salud MVP 1.0;
- EPI10 Informe Final Copilot;
- despliegue AWS;
- integraciones Healthie/Odoo/Web;
- correccion de incidencias;
- acompanamiento en uso inicial;
- formacion al equipo.

No cerrar todavia mantenimiento posterior. Al final del periodo incluido se
valorara continuidad si procede.

## Roles and Users

| Role | Expected Use | Systems |
| --- | --- | --- |
| Cliente final | Completa onboarding, formularios, consentimientos, cuestionarios, sube documentos, recibe informe y seguimiento. | Web, Healthie/portal |
| Carmen / direccion funcional | Valida experiencia, control operativo, seguridad, costes y propuesta. | Propuesta, Odoo dashboard, reporting |
| Aitor / equipo operativo | Gestiona casos, revisa estados, coordina TellmeGen externo, prepara/revisa informe y seguimiento. | Odoo, Healthie, Copilot, TellmeGen externo |
| Equipo administrativo | Apoya tareas, pedidos/facturacion si aplica y seguimiento operativo. | Odoo |
| Administrador tecnico/proyecto | Configura permisos, integraciones, AWS, soporte y documentacion. | MVP 1.0, AWS, Odoo, Healthie |
| Tomas / comprador economico | Evalua coste, valor, ROI operativo y capacidad de escalar. | Propuesta comercial |

## Core Workflows

### W1. Alta post-formulario/pago

1. Cliente completa formulario o pago en web.
2. Web/pago emite evento hacia EPI10 Salud MVP 1.0.
3. MVP valida evento, aplica idempotencia y registra trazabilidad.
4. MVP crea/actualiza contacto y caso en Odoo.
5. MVP crea/invita cliente en Healthie si API lo permite.
6. Odoo crea tarea interna y estado inicial.

### W2. Onboarding, consentimientos y cuestionarios

1. Cliente completa onboarding en Healthie.
2. Healthie emite webhook o expone estado via API.
3. MVP actualiza Odoo con estado/fecha/flag operativo.
4. Odoo crea tarea si falta informacion o requiere revision.

### W3. Documentos y analiticas

1. Cliente sube documentos/analiticas al portal.
2. Healthie notifica evento o permite consulta.
3. MVP sincroniza estado operativo con Odoo.
4. Aitor/equipo revisa y usa input autorizado en el proceso del informe.

### W4. TellmeGen externo

1. Aitor/equipo usa TellmeGen B2B fuera del MVP.
2. Estados de test/resultados se reflejan en Odoo manualmente o con tareas
   internas.
3. No hay creacion automatica de usuarios/tests/barcodes ni descarga automatica
   de resultados en Fase 1.

### W5. Produccion asistida y entrega de informe final

1. Odoo marca caso listo para informe.
2. Equipo prepara inputs y ejecuta checklist de anonimization/pseudonymization.
3. EPI10 Informe Final Copilot genera borrador interno.
4. EPI10 revisa y aprueba humanamente la version final.
5. MVP sube informe final a Healthie si API lo permite.
6. MVP actualiza estado y fecha de entrega en Odoo.

### W6. Seguimiento y cierre

1. Entrega del informe activa seguimiento.
2. Healthie centraliza comunicacion y documentos.
3. Odoo mantiene tareas, fechas, responsables y estado.
4. Caso pasa a seguimiento activo, cerrado o incidencia.

## Data Objects

| Object | Preferred System | Notes |
| --- | --- | --- |
| Cliente/contacto | Odoo + Healthie | Datos minimos sincronizados. |
| Pedido/pago | Web/pasarela + Odoo | Depende de tecnologia web/pago. |
| Caso/servicio EPI10 | Odoo | Unidad operativa principal. |
| Formularios/consentimientos/cuestionarios | Healthie | Odoo recibe estado/fecha/flag. |
| Analiticas/documentos | Healthie | Evitar email; Odoo recibe referencia/estado. |
| Resultado TellmeGen | TellmeGen externo | No integrar ni duplicar en Fase 1. |
| Informe final EPI10 | Healthie + Odoo reference | Documento final en portal; Odoo registra entrega. |
| Estado/tarea | Odoo + MVP 1.0 | Odoo es vista operativa; MVP orquesta sincronizacion. |
| ID mapping | PostgreSQL tecnico | Web/Healthie/Odoo/case ids. |
| Copilot draft package | Entorno controlado EPI10 | Anonimizado/pseudonimizado y con retencion minima. |

## States and Event Triggers

Modelo sugerido a cerrar en workshop de 3 horas:

- lead recibido;
- pago pendiente;
- pago confirmado;
- cliente creado/invitado en portal;
- onboarding enviado/iniciado/completado;
- consentimiento pendiente/completado;
- cuestionario pendiente/completado;
- analitica/documento pendiente/recibido;
- test pendiente/coordinado;
- resultado externo pendiente/disponible;
- informe en preparacion;
- informe en revisión humana;
- informe aprobado;
- informe entregado en portal;
- seguimiento activo;
- cerrado;
- incidencia.

Triggers:

- `lead_created`;
- `payment_success`;
- `healthie_client_created`;
- `healthie_form_completed`;
- `healthie_consent_completed`;
- `healthie_document_uploaded`;
- `report_draft_ready`;
- `report_human_approved`;
- `report_uploaded_to_healthie`;
- `odoo_state_updated`;
- `incident_detected`.

## Dependencies and Constraints

| Dependency | Impact |
| --- | --- |
| Healthie plan/API/add-on/DPA/residencia | Determina si Healthie puede ser portal e integrarse. |
| Healthie API/webhooks | Necesario para la automatizacion de Fase 1 si Healthie se elige. |
| Odoo API/version/modalidad | Determina esfuerzo real de backoffice e integracion. |
| Web/pago events | Determina calidad del alta automatica. |
| AWS account/region/security | Determina despliegue y coste recurrente. |
| Report template and process | Determina alcance real del Copilot. |
| LLM/API policy | Determina coste, datos y entorno permitido para Copilot. |
| Legal/DPO | Determina limites de datos, consentimientos, proveedores y retencion. |

## External Cost Inputs for Stage 04

Stage 04 debe contemplar:

- Healthie licencia;
- Healthie API/add-on;
- Healthie usuarios/add-ons;
- ContinuousCare/equivalente como alternativa;
- Odoo hosting/licencias/mantenimiento si aplica;
- AWS España: compute, PostgreSQL, logs/monitorizacion, backups, secrets,
  storage temporal si aplica;
- LLM/API para EPI10 Informe Final Copilot si aplica;
- revisión legal/DPO si EPI10 la requiere;
- soporte incluido hasta final de año / aproximadamente 6 meses.

No inventar precios definitivos. Usar estimaciones preliminares o rangos y
marcar cotizaciones pendientes.

## Risks

| Risk | Severity | Handling |
| --- | --- | --- |
| Healthie no valida API/DPA/coste/residencia | High | Mantener ContinuousCare/equivalente como alternativa. |
| Healthie API/add-on encarece el MVP | Medium | Cotizar y separar como coste externo. |
| Odoo API/configuracion requiere mas esfuerzo | Medium | Auditar modalidad real antes de cerrar precio. |
| Web/pago no emite eventos fiables | High | Definir contrato minimo y alternativa puente explicita. |
| Copilot se percibe como diagnostico automatico | High | Framing: borrador interno, anonimizado y con revisión humana. |
| Datos sensibles en logs o sistemas incorrectos | High | Minimization, script anonimizador, logs limpios, DPO si aplica. |
| TellmeGen se reintroduce como promesa Fase 1 | High | Mantener exclusion y roadmap condicionado. |
| Scope creep hacia plataforma completa | High | Reforzar MVP 1.0 como primera base, no plataforma final. |

## Assumptions

- Healthie sera la hipotesis principal de portal, pero no decision final hasta
  validar plan, coste, API, DPA, residencia e idioma.
- Odoo podra exponer API suficiente para contactos, casos, estados y tareas.
- Web/pago podra emitir al menos un evento integrable.
- EPI10 aceptara TellmeGen como sistema externo en Fase 1 si la propuesta
  explica el valor del MVP operativo.
- El informe final puede asistirse con Copilot sin sustituir revision experta.
- EPI10 habilitara entorno corporativo y politica de datos para Copilot.

## Deliverables

Entregables de Fase 1:

1. Workshop de arranque operativo de 3 horas con checklist previo.
2. Configuracion de Healthie como portal cliente, si se valida como herramienta.
3. Configuracion de Odoo como backoffice operativo.
4. Desarrollo de EPI10 Salud MVP 1.0.
5. Despliegue de EPI10 Salud MVP 1.0 en AWS España.
6. Base PostgreSQL tecnica minima.
7. Integracion web/pago -> EPI10 Salud MVP 1.0.
8. Integracion EPI10 Salud MVP 1.0 -> Healthie API.
9. Integracion EPI10 Salud MVP 1.0 -> Odoo API.
10. Webhooks/eventos Healthie -> MVP -> Odoo.
11. Modelo de estados y tareas.
12. Dashboard operativo basico en Odoo.
13. EPI10 Informe Final Copilot.
14. Checklist de inputs del informe.
15. Script propio de anonimization/pseudonymization.
16. Prompts/skills/subagentes/scripts del Copilot.
17. Flujo de revisión humana obligatoria.
18. Subida automatica del informe final a Healthie si API lo permite.
19. Actualizacion de estado en Odoo tras informe entregado.
20. Documentacion tecnica.
21. Documentacion operativa.
22. Formacion inicial.
23. Soporte hasta final de año / aproximadamente 6 meses.

## Phase Breakdown

### Fase 1A - Arranque y validacion corta

- Workshop operativo de 3 horas.
- Validacion Healthie/API/add-ons/DPA/coste.
- Revision Odoo/web/pago.
- Confirmacion estados, roles, documentos e informe.

### Fase 1B - Configuracion base

- Healthie portal cliente.
- Odoo backoffice.
- Estados, tareas, responsables y dashboard operativo.
- Estructura de documentos, formularios e informe.

### Fase 1C - Desarrollo MVP 1.0 e integraciones

- Backend TypeScript/NestJS.
- PostgreSQL tecnico.
- AWS España.
- Web/pago -> MVP.
- MVP -> Healthie API/Webhooks.
- MVP -> Odoo API.
- Idempotencia, retries, logs minimizados y trazabilidad.

### Fase 1D - Copilot, entrega y handoff

- EPI10 Informe Final Copilot.
- Script anonimizador.
- Revisión humana obligatoria.
- Subida del informe a Healthie si API lo permite.
- Actualizacion de estado en Odoo.
- Documentacion, formacion y soporte inicial.

Esta division es preventa. No es backlog atomico ni Stage 06 execution plan.

## Roadmap Expandable

### Fase 2

- Integracion TellmeGen si aparece API real, documentada, autorizada y viable.
- Mejora del Copilot.
- Mejor automatizacion documental.
- Reporting avanzado.
- Mas validaciones.
- Mas capacidades Healthie/Odoo.
- Revision de automatizaciones con datos reales.

### Fase 3

- Evolucion del portal cliente propio.
- Posible reduccion de dependencia de Healthie si EPI10 decide internalizar
  capacidades.
- Posible reduccion de dependencia de Odoo si EPI10 decide construir entorno
  propio completo.
- Modulos propios de analisis.
- Research medico asistido.
- Integracion de papers/evidencia cientifica.
- Gemelo digital como vision futura.

## Intentionally Not Built Yet

No se construye ni se vende en Fase 1:

- propuesta comercial final Stage 04;
- presupuesto final;
- plan de ejecucion Stage 06;
- backlog atomico;
- repo structure detallada como entregable independiente;
- integracion TellmeGen Fase 1;
- dashboard genetica;
- diagnostico o interpretacion automatica;
- cumplimiento legal absoluto;
- Healthie cerrado al 100% sin validar plan/coste/API/DPA;
- API/add-on Healthie incluido sin cotizacion;
- n8n/Make/Zapier como core;
- Codex/Claude Code como runtime transaccional de negocio.

## Handoff to Next Stage

Stage 04 debe convertir este blueprint en propuesta comercial.

Debe mantener:

- Fase 1 como EPI10 Salud MVP 1.0, software propio en AWS España;
- narrativa de base software ampliable, no conexion SaaS puntual;
- Healthie como hipotesis principal y ContinuousCare/equivalente como
  alternativa;
- Healthie API/webhooks como necesarios si Healthie se selecciona;
- Odoo API como backoffice operativo;
- EPI10 Informe Final Copilot como borrador asistido, anonimizado y con
  revisión humana obligatoria;
- TellmeGen externo/no integrado en Fase 1;
- workshop de 3 horas como arranque acotado;
- costes externos: Healthie, API/add-ons, Odoo, AWS España, LLM/API si aplica,
  legal/DPO si aplica;
- soporte incluido hasta final de año / aproximadamente 6 meses;
- código y documentacion como activo entregable de EPI10.

Stage 04 no debe inventar alcance tecnico fuera de este blueprint ni convertir
riesgos/unknowns en promesas comerciales.
