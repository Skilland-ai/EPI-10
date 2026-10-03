# Tareas vigentes de EPI10 Salud MVP

**Instantánea: 2026-09-15 17:04:31 UTC.** [Fuente: proyecto Linear](https://linear.app/skilland/project/epi10-salud-mvp-928812c268de), lectura MCP completa con archivadas incluidas: **106 IDs únicos, 104 sin archivar y 2 archivadas**. Entre las no archivadas hay nueve `Canceled` por sustitución de tareas Stripe.

**Actualización posterior verificada (17:49:25 UTC):** SKI-49 Done: checkout
Payment Link con cantidad 1 y marca EPI10, verificado por API y navegador.
[Configuración y evidencia](../../modulos/stripe/docs/checkout_stripe.md).
Los totales de la instantánea de las 17:04:31 conservan su fecha.

**Actualización posterior verificada (17:25:33 UTC):** SKI-48 Done: producto,
precio e imagen de demo creados y comprobados. Véase el
[catálogo Stripe](../../modulos/stripe/docs/catalogo_stripe.md). Los totales del
snapshot de las 17:04:31 se conservan con su fecha.


**Actualización posterior verificada (17:13:41 UTC):** SKI-26 pasó a Done al
preparar la [ficha de demo](../../modulos/stripe/docs/producto_demo.md). El inventario
y los totales de la instantánea de las 17:04:31 se conservan con su fecha; estado
operativo Stripe actualizado en el [módulo](../../modulos/stripe/docs/linear_speedrun.md).

[Planificación](README.md) · [Speedrun Stripe](../../modulos/stripe/docs/linear_speedrun.md) · [Snapshot previo](../../../00_inbox/linear-2026-09-15-previo-stripe/snapshot-original-163505Z.zip) · [Módulos](../../modulos/README.md)

## Cómo leer el inventario

- **Ref. origen:** T001–T106 de la planificación original, conservadas por ID. Son referencias históricas: para Stripe ya no prometen correspondencia de título ni de oleada con el [roadmap funcional original](01_roadmap_funcional.md).
- **Milestone:** sección correspondiente al hito actual de Linear. Periodo y deadline se citan como datos del hito; sus descripciones conservan listas originales anteriores a la reorganización.
- **Estado:** valor exacto de Linear. `Canceled` registra sustitución en este bloque y no equivale a trabajo terminado ni archivado.
- **Responsable:** `Sin asignar` contrastado mediante filtro `assignee="null"`.
- **Fecha individual:** `dueDate`; `Sin fecha` es `null` explícito y no hereda el deadline del hito.
- **Padre:** SKI-81 devuelve SKI-77. **— significa Unknown: campo `parentId` solicitado, pero no informado por el MCP**; no afirma ausencia de padre.
- **Archivada:** `No` corresponde a `archivedAt=null`; `Sí` incluye su timestamp UTC.

La última actualización de tarea en esta consulta es **2026-09-15T17:03:39.096Z**. Unknown: trabajo realizado fuera del tablero, motivo de los dos archivados y parentesco no devuelto.

## Sustituciones de Stripe

Las tareas originales permanecen en `Canceled`. Su trabajo se integra en las siguientes tareas vigentes, conservando la trazabilidad de los IDs:

| Tarea sustituida | Trabajo integrado en |
| --- | --- |
| [SKI-27](https://linear.app/skilland/issue/SKI-27/inventariar-escenarios-y-reglas-de-pago) | [SKI-26](https://linear.app/skilland/issue/SKI-26/cerrar-la-ficha-y-reglas-de-compra-de-nutriwell-demo-100-eur) |
| [SKI-38](https://linear.app/skilland/issue/SKI-38/disenar-wireframes-y-copy-del-checkout) | [SKI-49](https://linear.app/skilland/issue/SKI-49/configurar-el-checkout-stripe-con-los-nuevos-logos-epi10-y-cobro-de) |
| [SKI-39](https://linear.app/skilland/issue/SKI-39/definir-matriz-de-pruebas-y-excepciones-de-pago) | [SKI-52](https://linear.app/skilland/issue/SKI-52/probar-nutriwell-pago-rechazo-reintento-duplicados-devolucion-y-movil) |
| [SKI-73](https://linear.app/skilland/issue/SKI-73/revisar-internamente-el-mockup-completo) | [SKI-53](https://linear.app/skilland/issue/SKI-53/dejar-el-enlace-y-el-guion-de-demo-nutriwell-listos-para-carmen) |
| [SKI-75](https://linear.app/skilland/issue/SKI-75/incorporar-feedback-aprobado) | [SKI-74](https://linear.app/skilland/issue/SKI-74/revisar-el-mockup-con-carmen-aplicar-feedback-y-validar-la-version) |
| [SKI-76](https://linear.app/skilland/issue/SKI-76/acompanar-alta-y-verificacion-de-la-cuenta-epi10) | [SKI-77](https://linear.app/skilland/issue/SKI-77/replicar-el-mockup-validado-en-la-cuenta-epi10-y-entregar-el-modulo) |
| [SKI-78](https://linear.app/skilland/issue/SKI-78/configurar-credenciales-enlaces-y-webhooks-del-entorno-epi10) | [SKI-77](https://linear.app/skilland/issue/SKI-77/replicar-el-mockup-validado-en-la-cuenta-epi10-y-entregar-el-modulo) |
| [SKI-79](https://linear.app/skilland/issue/SKI-79/ejecutar-pruebas-de-aceptacion-en-epi10) | [SKI-77](https://linear.app/skilland/issue/SKI-77/replicar-el-mockup-validado-en-la-cuenta-epi10-y-entregar-el-modulo) |
| [SKI-80](https://linear.app/skilland/issue/SKI-80/entregar-y-documentar-el-modulo-stripe) | [SKI-77](https://linear.app/skilland/issue/SKI-77/replicar-el-mockup-validado-en-la-cuenta-epi10-y-entregar-el-modulo) |

## OL1 - Apertura de frentes

Milestone ID: `8d71b126-b347-4569-b6cd-99dfbc69f88a`. Periodo original: **2026-08-31 — 2026-09-04**. Deadline: **2026-09-04**. Distribución actual: **10 tareas**, 8 sin archivar, 2 archivadas; 1 con estado `Canceled`.

| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |
| --- | --- | --- | --- | --- | --- | --- |
| T002 | [SKI-27 — Inventariar escenarios y reglas de pago](https://linear.app/skilland/issue/SKI-27/inventariar-escenarios-y-reglas-de-pago) | Canceled | Sin asignar | 2026-09-11 | — | No |
| T004 | [SKI-29 — Coordinar contratación inicial del plan Group](https://linear.app/skilland/issue/SKI-29/coordinar-contratacion-inicial-del-plan-group) | In Progress | Sin asignar | 2026-09-11 | — | No |
| T005 | [SKI-30 — Solicitar cotización Enterprise y Mobile White Label](https://linear.app/skilland/issue/SKI-30/solicitar-cotizacion-enterprise-y-mobile-white-label) | In Progress | Sin asignar | 2026-09-11 | — | No |
| T006 | [SKI-31 — Ordenar accesos, owners y soporte de contratación](https://linear.app/skilland/issue/SKI-31/ordenar-accesos-owners-y-soporte-de-contratacion) | In Progress | Sin asignar | 2026-09-11 | — | No |
| T007 | [SKI-32 — Solicitar ficha técnica y accesos del entorno actual](https://linear.app/skilland/issue/SKI-32/solicitar-ficha-tecnica-y-accesos-del-entorno-actual) | In Progress | Sin asignar | 2026-09-11 | — | No |
| T008 | [SKI-33 — Coordinar sesión técnica con el mantenedor de Odoo](https://linear.app/skilland/issue/SKI-33/coordinar-sesion-tecnica-con-el-mantenedor-de-odoo) | In Progress | Sin asignar | 2026-09-11 | — | No |
| T009 | [SKI-34 — Definir estrategia de copia, backup y sandbox](https://linear.app/skilland/issue/SKI-34/definir-estrategia-de-copia-backup-y-sandbox) | Todo | Sin asignar | Sin fecha | — | Sí · 2026-09-07T05:33:28.716Z |
| T010 | [SKI-35 — Preparar discovery operativo del informe con Aitor](https://linear.app/skilland/issue/SKI-35/preparar-discovery-operativo-del-informe-con-aitor) | Done | Sin asignar | Sin fecha | — | Sí · 2026-09-07T05:32:58.092Z |
| T011 | [SKI-1 — Consolidar fuentes vigentes y baseline del journey](https://linear.app/skilland/issue/SKI-1/consolidar-fuentes-vigentes-y-baseline-del-journey) | In Progress | Raúl | 2026-09-11 | — | No |
| T012 | [SKI-36 — Abrir control de alcance, decisiones, riesgos y dependencias](https://linear.app/skilland/issue/SKI-36/abrir-control-de-alcance-decisiones-riesgos-y-dependencias) | Done | Sin asignar | Sin fecha | — | No |

## OL2 - Artefactos y diagnóstico

Milestone ID: `4a85a52d-9b70-471a-a759-ba9daafe25d7`. Periodo original: **2026-09-07 — 2026-09-11**. Deadline: **2026-09-11**. Distribución actual: **10 tareas**, 10 sin archivar, 0 archivadas; 2 con estado `Canceled`.

| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |
| --- | --- | --- | --- | --- | --- | --- |
| T014 | [SKI-38 — Diseñar wireframes y copy del checkout](https://linear.app/skilland/issue/SKI-38/disenar-wireframes-y-copy-del-checkout) | Canceled | Sin asignar | Sin fecha | — | No |
| T015 | [SKI-39 — Definir matriz de pruebas y excepciones de pago](https://linear.app/skilland/issue/SKI-39/definir-matriz-de-pruebas-y-excepciones-de-pago) | Canceled | Sin asignar | Sin fecha | — | No |
| T016 | [SKI-40 — Validar plan, API, DPA, residencia y límites de cuenta](https://linear.app/skilland/issue/SKI-40/validar-plan-api-dpa-residencia-y-limites-de-cuenta) | Todo | Sin asignar | Sin fecha | — | No |
| T017 | [SKI-41 — Inventariar módulos y capacidades disponibles](https://linear.app/skilland/issue/SKI-41/inventariar-modulos-y-capacidades-disponibles) | Todo | Sin asignar | Sin fecha | — | No |
| T018 | [SKI-42 — Diagnosticar versión, módulos, hosting y permisos](https://linear.app/skilland/issue/SKI-42/diagnosticar-version-modulos-hosting-y-permisos) | Todo | Sin asignar | Sin fecha | — | No |
| T019 | [SKI-43 — Obtener y restaurar una copia sanitizada de desarrollo](https://linear.app/skilland/issue/SKI-43/obtener-y-restaurar-una-copia-sanitizada-de-desarrollo) | Todo | Sin asignar | Sin fecha | — | No |
| T020 | [SKI-44 — Realizar entrevista de discovery con Aitor](https://linear.app/skilland/issue/SKI-44/realizar-entrevista-de-discovery-con-aitor) | Todo | Sin asignar | Sin fecha | — | No |
| T021 | [SKI-45 — Recopilar plantillas e informes anonimizados](https://linear.app/skilland/issue/SKI-45/recopilar-plantillas-e-informes-anonimizados) | Todo | Sin asignar | Sin fecha | — | No |
| T022 | [SKI-46 — Mapear actores, owners y fuentes de verdad](https://linear.app/skilland/issue/SKI-46/mapear-actores-owners-y-fuentes-de-verdad) | Todo | Sin asignar | Sin fecha | — | No |
| T023 | [SKI-47 — Actualizar registro de accesos, bloqueos y unknowns](https://linear.app/skilland/issue/SKI-47/actualizar-registro-de-accesos-bloqueos-y-unknowns) | Done | Sin asignar | Sin fecha | — | No |

## OL3 - Validación y preparación

Milestone ID: `a747423d-3ef0-414d-953f-0b3c264c9806`. Periodo original: **2026-09-14 — 2026-09-18**. Deadline: **2026-09-18**. Distribución actual: **26 tareas**, 26 sin archivar, 0 archivadas; 0 con estado `Canceled`.

| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |
| --- | --- | --- | --- | --- | --- | --- |
| T001 | [SKI-26 — Cerrar la ficha y reglas de compra de NutriWell · DEMO (100 EUR)](https://linear.app/skilland/issue/SKI-26/cerrar-la-ficha-y-reglas-de-compra-de-nutriwell-demo-100-eur) | In Progress | Raúl | 2026-09-15 | — | No |
| T003 | [SKI-28 — Conectar el CLI al entorno de pruebas EPI10 y verificar acceso](https://linear.app/skilland/issue/SKI-28/conectar-el-cli-al-entorno-de-pruebas-epi10-y-verificar-acceso) | Done | Raúl | 2026-09-15 | — | No |
| T013 | [SKI-37 — Construir la página NutriWell con marca EPI10 y botón al checkout](https://linear.app/skilland/issue/SKI-37/construir-la-pagina-nutriwell-con-marca-epi10-y-boton-al-checkout) | Todo | Raúl | 2026-09-15 | — | No |
| T024 | [SKI-48 — Crear en Stripe NutriWell · DEMO: 100 EUR, pago único y una unidad](https://linear.app/skilland/issue/SKI-48/crear-en-stripe-nutriwell-demo-100-eur-pago-unico-y-una-unidad) | Todo | Raúl | 2026-09-15 | — | No |
| T025 | [SKI-49 — Configurar el checkout Stripe con los nuevos logos EPI10 y cobro de 100 EUR](https://linear.app/skilland/issue/SKI-49/configurar-el-checkout-stripe-con-los-nuevos-logos-epi10-y-cobro-de) | Todo | Raúl | 2026-09-15 | — | No |
| T026 | [SKI-50 — Conectar confirmación, abandono y reintento de la compra NutriWell](https://linear.app/skilland/issue/SKI-50/conectar-confirmacion-abandono-y-reintento-de-la-compra-nutriwell) | Todo | Raúl | 2026-09-15 | — | No |
| T027 | [SKI-51 — Recibir el evento de pago Stripe con firma verificada y deduplicación](https://linear.app/skilland/issue/SKI-51/recibir-el-evento-de-pago-stripe-con-firma-verificada-y-deduplicacion) | Todo | Raúl | 2026-09-15 | — | No |
| T028 | [SKI-52 — Probar NutriWell: pago, rechazo, reintento, duplicados, devolución y móvil](https://linear.app/skilland/issue/SKI-52/probar-nutriwell-pago-rechazo-reintento-duplicados-devolucion-y-movil) | Todo | Raúl | 2026-09-15 | — | No |
| T029 | [SKI-53 — Dejar el enlace y el guion de demo NutriWell listos para Carmen](https://linear.app/skilland/issue/SKI-53/dejar-el-enlace-y-el-guion-de-demo-nutriwell-listos-para-carmen) | Todo | Raúl | 2026-09-15 | — | No |
| T030 | [SKI-54 — Congelar journey MVP end-to-end](https://linear.app/skilland/issue/SKI-54/congelar-journey-mvp-end-to-end) | Todo | Sin asignar | Sin fecha | — | No |
| T031 | [SKI-55 — Definir estados, hitos y transiciones del caso](https://linear.app/skilland/issue/SKI-55/definir-estados-hitos-y-transiciones-del-caso) | Todo | Sin asignar | Sin fecha | — | No |
| T032 | [SKI-56 — Definir modelo operativo y próximos pasos](https://linear.app/skilland/issue/SKI-56/definir-modelo-operativo-y-proximos-pasos) | Todo | Sin asignar | Sin fecha | — | No |
| T033 | [SKI-57 — Definir campos, IDs y referencias mínimas](https://linear.app/skilland/issue/SKI-57/definir-campos-ids-y-referencias-minimas) | Todo | Sin asignar | Sin fecha | — | No |
| T034 | [SKI-58 — Asignar responsabilidades entre Stripe, Healthie, Odoo y Copilot](https://linear.app/skilland/issue/SKI-58/asignar-responsabilidades-entre-stripe-healthie-odoo-y-copilot) | Todo | Sin asignar | Sin fecha | — | No |
| T035 | [SKI-59 — Clasificar datos, documentos y ubicaciones permitidas](https://linear.app/skilland/issue/SKI-59/clasificar-datos-documentos-y-ubicaciones-permitidas) | Todo | Sin asignar | Sin fecha | — | No |
| T036 | [SKI-60 — Crear estructura demo de grupos, tags y clientes](https://linear.app/skilland/issue/SKI-60/crear-estructura-demo-de-grupos-tags-y-clientes) | Todo | Sin asignar | Sin fecha | — | No |
| T037 | [SKI-61 — Configurar branding base, idioma y experiencia de entrada](https://linear.app/skilland/issue/SKI-61/configurar-branding-base-idioma-y-experiencia-de-entrada) | Todo | Sin asignar | Sin fecha | — | No |
| T038 | [SKI-62 — Definir roles y permisos del entorno](https://linear.app/skilland/issue/SKI-62/definir-roles-y-permisos-del-entorno) | Todo | Sin asignar | Sin fecha | — | No |
| T039 | [SKI-63 — Prototipar invitación y onboarding inicial](https://linear.app/skilland/issue/SKI-63/prototipar-invitacion-y-onboarding-inicial) | Todo | Sin asignar | Sin fecha | — | No |
| T040 | [SKI-64 — Crear entorno seguro de desarrollo](https://linear.app/skilland/issue/SKI-64/crear-entorno-seguro-de-desarrollo) | Todo | Sin asignar | Sin fecha | — | No |
| T041 | [SKI-65 — Validar estrategia de configuración y módulos custom mínimos](https://linear.app/skilland/issue/SKI-65/validar-estrategia-de-configuracion-y-modulos-custom-minimos) | Todo | Sin asignar | Sin fecha | — | No |
| T042 | [SKI-66 — Sintetizar discovery y decisiones del informe](https://linear.app/skilland/issue/SKI-66/sintetizar-discovery-y-decisiones-del-informe) | Todo | Sin asignar | Sin fecha | — | No |
| T043 | [SKI-67 — Definir inputs, outputs y límites del Copilot](https://linear.app/skilland/issue/SKI-67/definir-inputs-outputs-y-limites-del-copilot) | Todo | Sin asignar | Sin fecha | — | No |
| T044 | [SKI-68 — Celebrar checkpoint de alineación y desbloqueo](https://linear.app/skilland/issue/SKI-68/celebrar-checkpoint-de-alineacion-y-desbloqueo) | Todo | Sin asignar | Sin fecha | — | No |
| T045 | [SKI-69 — Definir excepciones y recuperación manual del journey](https://linear.app/skilland/issue/SKI-69/definir-excepciones-y-recuperacion-manual-del-journey) | Todo | Sin asignar | Sin fecha | — | No |
| T050 | [SKI-74 — Revisar el mockup con Carmen, aplicar feedback y validar la versión final](https://linear.app/skilland/issue/SKI-74/revisar-el-mockup-con-carmen-aplicar-feedback-y-validar-la-version) | Todo | Raúl | 2026-09-16 | — | No |

## OL4 - Specs y cierre de Stripe

Milestone ID: `cd56f54e-02ec-480b-b621-b678f7d831b0`. Periodo original: **2026-09-21 — 2026-09-25**. Deadline: **2026-09-25**. Distribución actual: **12 tareas**, 12 sin archivar, 0 archivadas; 6 con estado `Canceled`.

| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |
| --- | --- | --- | --- | --- | --- | --- |
| T046 | [SKI-70 — Redactar specs ejecutables de Healthie](https://linear.app/skilland/issue/SKI-70/redactar-specs-ejecutables-de-healthie) | Todo | Sin asignar | Sin fecha | — | No |
| T047 | [SKI-71 — Redactar specs ejecutables de Odoo](https://linear.app/skilland/issue/SKI-71/redactar-specs-ejecutables-de-odoo) | Todo | Sin asignar | Sin fecha | — | No |
| T048 | [SKI-72 — Cerrar contratos de datos e integración](https://linear.app/skilland/issue/SKI-72/cerrar-contratos-de-datos-e-integracion) | Todo | Sin asignar | Sin fecha | — | No |
| T049 | [SKI-73 — Revisar internamente el mockup completo](https://linear.app/skilland/issue/SKI-73/revisar-internamente-el-mockup-completo) | Canceled | Sin asignar | Sin fecha | — | No |
| T051 | [SKI-75 — Incorporar feedback aprobado](https://linear.app/skilland/issue/SKI-75/incorporar-feedback-aprobado) | Canceled | Sin asignar | Sin fecha | — | No |
| T052 | [SKI-76 — Acompañar alta y verificación de la cuenta EPI10](https://linear.app/skilland/issue/SKI-76/acompanar-alta-y-verificacion-de-la-cuenta-epi10) | Canceled | Sin asignar | Sin fecha | — | No |
| T053 | [SKI-77 — Replicar el mockup validado en la cuenta EPI10 y entregar el módulo Stripe](https://linear.app/skilland/issue/SKI-77/replicar-el-mockup-validado-en-la-cuenta-epi10-y-entregar-el-modulo) | Todo | Raúl | Sin fecha | — | No |
| T054 | [SKI-78 — Configurar credenciales, enlaces y webhooks del entorno EPI10](https://linear.app/skilland/issue/SKI-78/configurar-credenciales-enlaces-y-webhooks-del-entorno-epi10) | Canceled | Sin asignar | Sin fecha | — | No |
| T055 | [SKI-79 — Ejecutar pruebas de aceptación en EPI10](https://linear.app/skilland/issue/SKI-79/ejecutar-pruebas-de-aceptacion-en-epi10) | Canceled | Sin asignar | Sin fecha | — | No |
| T056 | [SKI-80 — Entregar y documentar el módulo Stripe](https://linear.app/skilland/issue/SKI-80/entregar-y-documentar-el-modulo-stripe) | Canceled | Sin asignar | Sin fecha | — | No |
| T057 | [SKI-81 — Emitir y registrar la factura del módulo Stripe tras su entrega](https://linear.app/skilland/issue/SKI-81/emitir-y-registrar-la-factura-del-modulo-stripe-tras-su-entrega) | Todo | Raúl | Sin fecha | [SKI-77](https://linear.app/skilland/issue/SKI-77/replicar-el-mockup-validado-en-la-cuenta-epi10-y-entregar-el-modulo) | No |
| T058 | [SKI-82 — Cerrar especificación funcional y rúbrica del informe](https://linear.app/skilland/issue/SKI-82/cerrar-especificacion-funcional-y-rubrica-del-informe) | Todo | Sin asignar | Sin fecha | — | No |

## OL5 - Construcción funcional

Milestone ID: `debcfedd-2e22-45fc-b050-4109d887a8dd`. Periodo original: **2026-09-28 — 2026-10-09**. Deadline: **2026-10-09**. Distribución actual: **18 tareas**, 18 sin archivar, 0 archivadas; 0 con estado `Canceled`.

| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |
| --- | --- | --- | --- | --- | --- | --- |
| T059 | [SKI-83 — Configurar cuenta, organización y preferencias base](https://linear.app/skilland/issue/SKI-83/configurar-cuenta-organizacion-y-preferencias-base) | Todo | Sin asignar | Sin fecha | — | No |
| T060 | [SKI-84 — Configurar grupos, tags y segmentación operativa](https://linear.app/skilland/issue/SKI-84/configurar-grupos-tags-y-segmentacion-operativa) | Todo | Sin asignar | Sin fecha | — | No |
| T061 | [SKI-85 — Configurar ficha de cliente y campos necesarios](https://linear.app/skilland/issue/SKI-85/configurar-ficha-de-cliente-y-campos-necesarios) | Todo | Sin asignar | Sin fecha | — | No |
| T062 | [SKI-86 — Implementar consentimientos y formulario principal](https://linear.app/skilland/issue/SKI-86/implementar-consentimientos-y-formulario-principal) | Todo | Sin asignar | Sin fecha | — | No |
| T063 | [SKI-87 — Implementar cuestionarios adicionales de Fase 1](https://linear.app/skilland/issue/SKI-87/implementar-cuestionarios-adicionales-de-fase-1) | Todo | Sin asignar | Sin fecha | — | No |
| T064 | [SKI-88 — Configurar subida y gestión de documentos](https://linear.app/skilland/issue/SKI-88/configurar-subida-y-gestion-de-documentos) | Todo | Sin asignar | Sin fecha | — | No |
| T065 | [SKI-89 — Configurar comunicaciones, emails y notificaciones](https://linear.app/skilland/issue/SKI-89/configurar-comunicaciones-emails-y-notificaciones) | Todo | Sin asignar | Sin fecha | — | No |
| T066 | [SKI-90 — Configurar agenda y citas del test](https://linear.app/skilland/issue/SKI-90/configurar-agenda-y-citas-del-test) | Todo | Sin asignar | Sin fecha | — | No |
| T067 | [SKI-91 — Implementar modelo de caso EPI10 y pipeline](https://linear.app/skilland/issue/SKI-91/implementar-modelo-de-caso-epi10-y-pipeline) | Todo | Sin asignar | Sin fecha | — | No |
| T068 | [SKI-92 — Implementar estados, hitos y checklist operativo](https://linear.app/skilland/issue/SKI-92/implementar-estados-hitos-y-checklist-operativo) | Todo | Sin asignar | Sin fecha | — | No |
| T069 | [SKI-93 — Implementar tareas automáticas, owners y próximos pasos](https://linear.app/skilland/issue/SKI-93/implementar-tareas-automaticas-owners-y-proximos-pasos) | Todo | Sin asignar | Sin fecha | — | No |
| T070 | [SKI-94 — Implementar vistas, filtros y tablero operativo](https://linear.app/skilland/issue/SKI-94/implementar-vistas-filtros-y-tablero-operativo) | Todo | Sin asignar | Sin fecha | — | No |
| T071 | [SKI-95 — Implementar hitos manuales de test y laboratorio](https://linear.app/skilland/issue/SKI-95/implementar-hitos-manuales-de-test-y-laboratorio) | Todo | Sin asignar | Sin fecha | — | No |
| T072 | [SKI-96 — Implementar documentos, informe y marcadores de entrega](https://linear.app/skilland/issue/SKI-96/implementar-documentos-informe-y-marcadores-de-entrega) | Todo | Sin asignar | Sin fecha | — | No |
| T073 | [SKI-97 — Implementar incidencias, bloqueos y cierre del caso](https://linear.app/skilland/issue/SKI-97/implementar-incidencias-bloqueos-y-cierre-del-caso) | Todo | Sin asignar | Sin fecha | — | No |
| T074 | [SKI-98 — Crear estructura base del harness y repositorio](https://linear.app/skilland/issue/SKI-98/crear-estructura-base-del-harness-y-repositorio) | Todo | Sin asignar | Sin fecha | — | No |
| T075 | [SKI-99 — Implementar ingesta y pseudonimización](https://linear.app/skilland/issue/SKI-99/implementar-ingesta-y-pseudonimizacion) | Todo | Sin asignar | Sin fecha | — | No |
| T076 | [SKI-100 — Implementar flujo inicial de generación de borradores](https://linear.app/skilland/issue/SKI-100/implementar-flujo-inicial-de-generacion-de-borradores) | Todo | Sin asignar | Sin fecha | — | No |

## OL6 - Superficies de integración y QA individual

Milestone ID: `232da221-e198-45b0-99bf-6cf20c23b305`. Periodo original: **2026-10-12 — 2026-10-23**. Deadline: **2026-10-23**. Distribución actual: **14 tareas**, 14 sin archivar, 0 archivadas; 0 con estado `Canceled`.

| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |
| --- | --- | --- | --- | --- | --- | --- |
| T077 | [SKI-101 — Validar invitación, activación y onboarding](https://linear.app/skilland/issue/SKI-101/validar-invitacion-activacion-y-onboarding) | Todo | Sin asignar | Sin fecha | — | No |
| T078 | [SKI-102 — Validar formularios, documentos y agenda](https://linear.app/skilland/issue/SKI-102/validar-formularios-documentos-y-agenda) | Todo | Sin asignar | Sin fecha | — | No |
| T079 | [SKI-103 — Configurar soporte post-informe y escalado](https://linear.app/skilland/issue/SKI-103/configurar-soporte-post-informe-y-escalado) | Todo | Sin asignar | Sin fecha | — | No |
| T080 | [SKI-104 — Configurar publicación del informe final](https://linear.app/skilland/issue/SKI-104/configurar-publicacion-del-informe-final) | Todo | Sin asignar | Sin fecha | — | No |
| T081 | [SKI-105 — Implementar entrada desde web y pago](https://linear.app/skilland/issue/SKI-105/implementar-entrada-desde-web-y-pago) | Todo | Sin asignar | Sin fecha | — | No |
| T082 | [SKI-106 — Implementar referencias y sincronización con Healthie](https://linear.app/skilland/issue/SKI-106/implementar-referencias-y-sincronizacion-con-healthie) | Todo | Sin asignar | Sin fecha | — | No |
| T083 | [SKI-107 — Implementar regla de listo para pedir test y tareas asociadas](https://linear.app/skilland/issue/SKI-107/implementar-regla-de-listo-para-pedir-test-y-tareas-asociadas) | Todo | Sin asignar | Sin fecha | — | No |
| T084 | [SKI-108 — Implementar acción de publicación del informe](https://linear.app/skilland/issue/SKI-108/implementar-accion-de-publicacion-del-informe) | Todo | Sin asignar | Sin fecha | — | No |
| T085 | [SKI-109 — Validar seguridad, permisos, auditoría y backup](https://linear.app/skilland/issue/SKI-109/validar-seguridad-permisos-auditoria-y-backup) | Todo | Sin asignar | Sin fecha | — | No |
| T086 | [SKI-110 — Implementar plantilla, checklist y rúbrica](https://linear.app/skilland/issue/SKI-110/implementar-plantilla-checklist-y-rubrica) | Todo | Sin asignar | Sin fecha | — | No |
| T087 | [SKI-111 — Configurar agentes, skills y prompts](https://linear.app/skilland/issue/SKI-111/configurar-agentes-skills-y-prompts) | Todo | Sin asignar | Sin fecha | — | No |
| T088 | [SKI-112 — Implementar revisión humana y control de versiones](https://linear.app/skilland/issue/SKI-112/implementar-revision-humana-y-control-de-versiones) | Todo | Sin asignar | Sin fecha | — | No |
| T089 | [SKI-113 — Construir dataset de evaluación y ejecutar evals](https://linear.app/skilland/issue/SKI-113/construir-dataset-de-evaluacion-y-ejecutar-evals) | Todo | Sin asignar | Sin fecha | — | No |
| T090 | [SKI-114 — Configurar logs seguros, errores y retención](https://linear.app/skilland/issue/SKI-114/configurar-logs-seguros-errores-y-retencion) | Todo | Sin asignar | Sin fecha | — | No |

## OL7 - Integración completa

Milestone ID: `eb0e1016-d3f4-485f-8a8b-0db95dd377a7`. Periodo original: **2026-10-26 — 2026-11-06**. Deadline: **2026-11-06**. Distribución actual: **9 tareas**, 9 sin archivar, 0 archivadas; 0 con estado `Canceled`.

| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |
| --- | --- | --- | --- | --- | --- | --- |
| T091 | [SKI-115 — Integrar alta desde Stripe/web hacia Odoo y Healthie](https://linear.app/skilland/issue/SKI-115/integrar-alta-desde-stripeweb-hacia-odoo-y-healthie) | Todo | Sin asignar | Sin fecha | — | No |
| T092 | [SKI-116 — Integrar onboarding Healthie con hitos Odoo](https://linear.app/skilland/issue/SKI-116/integrar-onboarding-healthie-con-hitos-odoo) | Todo | Sin asignar | Sin fecha | — | No |
| T093 | [SKI-117 — Integrar preparación y pedido manual del test](https://linear.app/skilland/issue/SKI-117/integrar-preparacion-y-pedido-manual-del-test) | Todo | Sin asignar | Sin fecha | — | No |
| T094 | [SKI-118 — Integrar agenda Healthie con estado de cita en Odoo](https://linear.app/skilland/issue/SKI-118/integrar-agenda-healthie-con-estado-de-cita-en-odoo) | Todo | Sin asignar | Sin fecha | — | No |
| T095 | [SKI-119 — Integrar hitos de laboratorio con activación del Copilot](https://linear.app/skilland/issue/SKI-119/integrar-hitos-de-laboratorio-con-activacion-del-copilot) | Todo | Sin asignar | Sin fecha | — | No |
| T096 | [SKI-120 — Integrar borrador, revisión y aprobación del informe](https://linear.app/skilland/issue/SKI-120/integrar-borrador-revision-y-aprobacion-del-informe) | Todo | Sin asignar | Sin fecha | — | No |
| T097 | [SKI-121 — Integrar publicación final en Healthie y cierre en Odoo](https://linear.app/skilland/issue/SKI-121/integrar-publicacion-final-en-healthie-y-cierre-en-odoo) | Todo | Sin asignar | Sin fecha | — | No |
| T098 | [SKI-122 — Implementar idempotencia, reintentos y recuperación](https://linear.app/skilland/issue/SKI-122/implementar-idempotencia-reintentos-y-recuperacion) | Todo | Sin asignar | Sin fecha | — | No |
| T099 | [SKI-123 — Ejecutar replay end-to-end del caso demo](https://linear.app/skilland/issue/SKI-123/ejecutar-replay-end-to-end-del-caso-demo) | Todo | Sin asignar | Sin fecha | — | No |

## OL8 - Cierre técnico del MVP

Milestone ID: `c07f086b-1a16-461a-aaf6-44dae0d4c52e`. Periodo original: **2026-11-09 — 2026-11-13**. Deadline: **2026-11-13**. Distribución actual: **7 tareas**, 7 sin archivar, 0 archivadas; 0 con estado `Canceled`.

| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |
| --- | --- | --- | --- | --- | --- | --- |
| T100 | [SKI-124 — Ejecutar regresión consolidada y corregir bloqueos](https://linear.app/skilland/issue/SKI-124/ejecutar-regresion-consolidada-y-corregir-bloqueos) | Todo | Sin asignar | Sin fecha | — | No |
| T101 | [SKI-125 — Completar QA de seguridad, privacidad y datos sensibles](https://linear.app/skilland/issue/SKI-125/completar-qa-de-seguridad-privacidad-y-datos-sensibles) | Todo | Sin asignar | Sin fecha | — | No |
| T102 | [SKI-126 — Cerrar documentación técnica, runbook y evidencias](https://linear.app/skilland/issue/SKI-126/cerrar-documentacion-tecnica-runbook-y-evidencias) | Todo | Sin asignar | Sin fecha | — | No |
| T103 | [SKI-127 — Cerrar blockers y pendientes imprescindibles del MVP](https://linear.app/skilland/issue/SKI-127/cerrar-blockers-y-pendientes-imprescindibles-del-mvp) | Todo | Sin asignar | Sin fecha | — | No |
| T104 | [SKI-128 — Consolidar release notes y paquete de aceptación](https://linear.app/skilland/issue/SKI-128/consolidar-release-notes-y-paquete-de-aceptacion) | Todo | Sin asignar | Sin fecha | — | No |
| T105 | [SKI-129 — Preparar guion, datos y entorno de demo del MVP](https://linear.app/skilland/issue/SKI-129/preparar-guion-datos-y-entorno-de-demo-del-mvp) | Todo | Sin asignar | Sin fecha | — | No |
| T106 | [SKI-130 — Realizar go-no-go interno y declarar MVP listo para demo](https://linear.app/skilland/issue/SKI-130/realizar-go-no-go-interno-y-declarar-mvp-listo-para-demo) | Todo | Sin asignar | Sin fecha | — | No |

## Actualización puntual — 2026-09-15, 18:33:50 UTC

SKI-37 cambia a Done con el título «Maquetar la pantalla de entrada al mockup
Stripe con marca EPI10». Publicación privada y relectura MCP verificadas;
evidencia en `05_scratch/stripe-pantalla/linear_ski37.json`.
La tabla anterior conserva la instantánea completa de las 17:04:31 UTC.
El [estado operativo Stripe](../../modulos/stripe/docs/linear_speedrun.md) suma
cinco Done y siete Todo; pruebas visuales y del pago siguen pendientes.
