# Planificación de EPI10 en Linear

**Snapshot histórico: 2026-09-15 17:04:31 UTC.** Proyecto: [EPI10 Salud MVP](https://linear.app/skilland/project/epi10-salud-mvp-928812c268de), ID `965a6f5b-d9a2-41cb-8983-266318ca939a`.

**Estado remoto verificado — 2026-09-16, 08:55:08 UTC:** el proyecto contiene
97 issues, todas asignadas a Raúl y ninguna cancelada. Las 12 tareas vigentes
del speedrun Stripe están reunidas en OL4: ocho `Done` y cuatro `Todo`. OL3
conserva solo sus 16 tareas transversales. Se actualizaron ambas descripciones y
el [estado del proyecto](https://linear.app/skilland/project/epi10-salud-mvp-928812c268de/activity#project-update-af9fc37f)
para hacer visible el trabajo. SKI-26, 28, 37, 48, 49, 50, 51 y 52 contienen
un comentario individual de resultado y evidencia.

Las nueve versiones antiguas canceladas —SKI-27, 38, 39, 73, 75, 76, 78, 79 y
80— se retiraron del proyecto y se eliminaron sus relaciones. Siguen existiendo
fuera del proyecto como registros cancelados porque el conector no permite el
borrado físico y no había navegador conectado; eliminación definitiva pendiente.

**Actualización anterior — 2026-09-16, 08:41:56 UTC:** inicialmente se asignaron
las 106 issues del inventario histórico, se actualizaron OL3/OL4 y se publicó
un [estado del proyecto](https://linear.app/skilland/project/epi10-salud-mvp-928812c268de/activity#project-update-af9fc37f)
con el resumen Stripe. Esta situación fue reemplazada por la limpieza solicitada
después; el inventario `tareas.md` conserva aquel snapshot fechado.

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

**Stripe se reorganizó el 15 de septiembre por petición de Raúl.** Su backlog vigente está en [tareas](tareas.md) y en [la reorganización del speedrun](../../modulos/stripe/docs/linear_speedrun.md). Las copias `00_situacion.md`, `01_roadmap_funcional.md` y `02_roadmap_cronologico.md`, actualizadas en la fuente el 7 de septiembre, se conservan íntegras como **baseline histórica para Stripe**: sus títulos, distribución y descomposición originales ya no describen ese bloque vigente.

El horizonte general registrado sigue del **31 de agosto al 13 de noviembre de 2026**: MVP integrado, validado y listo para demo. El despliegue productivo, mantenimiento y Fase 2 quedan después. TellmeGen/laboratorio sigue externo y manual; Stripe gestiona el pago, Healthie la experiencia del cliente, Odoo el caso operativo y Copilot los borradores con revisión humana.

## Entradas

- [Inventario fechado del 15 de septiembre](tareas.md): 106 IDs, títulos,
  milestones, estados y responsables en el momento de aquel snapshot. La
  asignación global posterior se resume en esta página.
- [Speedrun de Stripe en Linear](../../modulos/stripe/docs/linear_speedrun.md): tareas concretas, sustituciones y continuidad con Carmen/EPI10.
- [Sandbox por módulos](../../modulos/README.md): ejecución y evidencias locales.
- [Situación original](00_situacion.md), [roadmap funcional original](01_roadmap_funcional.md) y [roadmap cronológico original](02_roadmap_cronologico.md): documentos íntegros, con sus fechas e IDs fuente.
- [Snapshot anterior completo, 16:35:05 UTC](../../../00_inbox/linear-2026-09-15-previo-stripe/snapshot-original-163505Z.zip): ZIP con las cinco entregas originales, datos fuente y QA; [procedencia y comprobación](../../../00_inbox/linear-2026-09-15-previo-stripe/README.md).

## Stripe vigente en OL4

- **12 tareas vigentes, todas en OL4 y asignadas a Raúl:** ocho resultados de
  demo completados y cuatro pasos pendientes de guion, feedback, réplica y factura.
- Ocho están `Done`: SKI-26, 28, 37, 48, 49, 50, 51 y 52. SKI-53, 74, 77
  y 81 siguen `Todo`; la evidencia figura en el módulo Stripe y no declara
  aceptación de Carmen ni réplica productiva.
- Las nueve tareas sustituidas ya no pertenecen al proyecto ni conservan
  relaciones con el bloque vigente. Su borrado definitivo del workspace requiere
  una sesión de navegador conectada.
- Las referencias T001–T106 se conservan **por el ID histórico de cada tarea**; no implican que su título ni su oleada actuales coincidan con los documentos originales.

## Oleadas: calendario y distribución

Los periodos originales y deadlines de los ocho hitos se conservan. La distribución
incorpora los movimientos de Stripe. Las descripciones remotas de OL3 y OL4 se
refrescaron el 16 de septiembre; los otros milestones conservan su texto base.

| Oleada / milestone | Periodo original | Deadline del hito | Tareas originales | Tareas actuales | Canceled | Archivadas |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| OL1 - Apertura de frentes | 2026-08-31 — 2026-09-04 | 2026-09-04 | 12 | 9 | 0 | 2 |
| OL2 - Artefactos y diagnóstico | 2026-09-07 — 2026-09-11 | 2026-09-11 | 11 | 8 | 0 | 0 |
| OL3 - Validación y preparación | 2026-09-14 — 2026-09-18 | 2026-09-18 | 22 | 16 | 0 | 0 |
| OL4 - Specs y cierre de Stripe | 2026-09-21 — 2026-09-25 | 2026-09-25 | 13 | 16 | 0 | 0 |
| OL5 - Construcción funcional | 2026-09-28 — 2026-10-09 | 2026-10-09 | 18 | 18 | 0 | 0 |
| OL6 - Superficies de integración y QA individual | 2026-10-12 — 2026-10-23 | 2026-10-23 | 14 | 14 | 0 | 0 |
| OL7 - Integración completa | 2026-10-26 — 2026-11-06 | 2026-11-06 | 9 | 9 | 0 | 0 |
| OL8 - Cierre técnico del MVP | 2026-11-09 — 2026-11-13 | 2026-11-13 | 7 | 7 | 0 | 0 |
| **Total** | **11 semanas** | **2026-11-13** | **106** | **97** | **0** | **2** |

Las 97 incluyen la subtarea SKI-81 una sola vez. Los nueve IDs históricos
retirados explican la diferencia frente a las 106 tareas del inventario original.

**Fechas individuales:** siete tareas conservan 2026-09-11; nueve de la demo Stripe tienen 2026-09-15; SKI-74 tiene 2026-09-16; 89 no tienen fecha individual. No se rellenan fechas a partir del deadline del hito.

## Estado remoto vigente — 2026-09-16

- **97 issues asignadas a Raúl**; ninguna sin responsable en el proyecto.
- Estados: 11 `Done`, 79 `Todo`, 6 `In Progress` y 1 `In Review`; cero `Canceled`.
- **2 archivadas:** SKI-34 y SKI-35; ambas también están asignadas a Raúl.
- **Parentesco verificado:** SKI-81 devuelve `parentId=SKI-77`. El campo se
  solicitó para todas las tareas; el conector lo omite en las demás.

**Unknown:** avance que aún no esté registrado en Linear, motivo de los dos archivados y parentesco no informado en las otras 105 tareas. El estado del tablero no sustituye la evidencia de ejecución o la aceptación de Carmen.

## Fuente de verdad y actualización

Linear mantiene planificación, estados y responsables. Esta carpeta conserva
snapshots fechados; el módulo Stripe conserva las decisiones y evidencias. La
reorganización registrada en Linear prevalece para Stripe sobre los documentos
originales del 7 de septiembre. El 16 de septiembre sí se modificaron datos
remotos por petición de Raúl: asignación global, descripciones OL3/OL4 y estado
del proyecto.

1. Conservar el snapshot previo antes de refrescar inventarios. Leer proyecto, documentos que hayan cambiado y milestones por ID.
2. Listar todas las tareas con `includeArchived=true` y campos explícitos: `id`, `uuid`, `title`, `projectMilestone`, `status`, `statusType`, `url`, `assignee`, `assigneeId`, `dueDate`, `archivedAt`, `parentId`, `createdAt` y `updatedAt`. Recorrer cursores hasta `hasNextPage=false`.
3. Contrastar con `includeArchived=false` y `assignee="null"`. No interpretar un campo omitido como vacío confirmado; documentar `Unknown` cuando no pueda verificarse.
4. Regenerar por **ID**, manteniendo las referencias históricas y distinguiendo cancelación, archivado, subtareas, fecha individual y deadline del hito. Mantener visible qué copias documentales quedaron históricas.
5. Actualizar fecha y conteos; verificar enlaces, campos y diferencias frente al snapshot previo. Registrar la ejecución en el módulo correspondiente sin inferir tareas terminadas.

## Verificación

- El snapshot histórico conserva 106 IDs y URLs únicos.
- Ocho hitos; distribución remota actual: 9 + 8 + 16 + 16 + 18 + 14 + 9 + 7 = 97.
- Consulta final completa de 97 tareas y 97 asignaciones a Raúl; ninguna sin
  responsable y `hasNextPage=false`.
- Las 12 tareas vigentes de Stripe están en OL4; SKI-81 aparece una vez, con
  padre SKI-77. Los nueve registros antiguos no tienen proyecto ni relaciones.
- Documentos originales y snapshot anterior preservados. Verificador actual: `05_scratch/planificacion-linear/verificar_actual.py`; se conserva el verificador original en el ZIP histórico y en scratch.

La verificación cubre la sincronización documental del backlog, sin declarar completada la demo ni la réplica en EPI10.

### Actualización puntual — 2026-09-15, 18:33:50 UTC

SKI-37, «Maquetar la pantalla de entrada al mockup Stripe con marca EPI10»,
figura Done tras publicar la vista privada y releer la tarea por MCP. Evidencia:
`05_scratch/stripe-pantalla/linear_ski37.json` y
[pantalla publicada](../../modulos/stripe/docs/pantalla_demo.md).
El bloque Stripe suma cinco Done y siete Todo. Los conteos de la instantánea
completa de las 17:04:31 UTC se conservan como históricos; la
[tabla operativa](../../modulos/stripe/docs/linear_speedrun.md) refleja estos cierres.
