import json
import pathlib
import re

root = pathlib.Path(__file__).resolve().parents[2]
folder = root / '04_outputs/planificacion/linear'
old = json.loads((root / '05_scratch/planificacion-linear/fuentes-snapshot.json').read_text())
now = json.loads((root / '05_scratch/planificacion-linear/fuentes-snapshot-actual.json').read_text())
plan = json.loads((root / '05_scratch/stripe-remodelacion/plan.json').read_text())
issues = now['issues']['issues']
by_id = {i['id']: i for i in issues}
old_refs = {}
for ref, wave, title in re.findall(r'\*\*(T\d+) · (OL\d+)\*\* — `([^`]+)`', old['documents'][1]['content']):
    title = re.sub(r'^OL\d+ \[[^\]]+\] ', '', title).removesuffix(' | EPI10 MVP Fase 1')
    original = next(i for i in old['issues']['issues'] if i['title'] == title)
    old_refs[original['id']] = ref
assert set(old_refs) == set(by_id)
milestones = sorted(now['milestones']['milestones'], key=lambda m: m['name'])
snapshot = now['consultedAt']
project = now['project']
history = '../../../00_inbox/linear-2026-09-15-previo-stripe/snapshot-original-163505Z.zip'
speedrun = '../../modulos/stripe/docs/linear_speedrun.md'
table = []
for m in milestones:
    group = [i for i in issues if i['projectMilestone']['id'] == m['id']]
    period = re.search(r'\*\*Periodo:\*\* ([^\n]+)', m['description'])[1]
    original_count = re.search(r'\*\*Tareas:\*\* (\d+)', m['description'])[1]
    archived = sum(bool(i['archivedAt']) for i in group)
    canceled = sum(i['statusType'] == 'canceled' for i in group)
    table.append(f'| {m["name"].strip()} | {period} | {m["targetDate"]} | {original_count} | {len(group)} | {canceled} | {archived} |')

readme = f'''# Planificación de EPI10 en Linear

**Instantánea vigente: {snapshot}.** Proyecto: [EPI10 Salud MVP]({project['url']}), ID `{project['id']}`.

**Stripe se reorganizó el 15 de septiembre por petición de Raúl.** Su backlog vigente está en [tareas](tareas.md) y en [la reorganización del speedrun](../../modulos/stripe/docs/linear_speedrun.md). Las copias `00_situacion.md`, `01_roadmap_funcional.md` y `02_roadmap_cronologico.md`, actualizadas en la fuente el 7 de septiembre, se conservan íntegras como **baseline histórica para Stripe**: sus títulos, distribución y descomposición originales ya no describen ese bloque vigente.

El horizonte general registrado sigue del **31 de agosto al 13 de noviembre de 2026**: MVP integrado, validado y listo para demo. El despliegue productivo, mantenimiento y Fase 2 quedan después. TellmeGen/laboratorio sigue externo y manual; Stripe gestiona el pago, Healthie la experiencia del cliente, Odoo el caso operativo y Copilot los borradores con revisión humana.

## Entradas

- [Inventario vigente de las 106 tareas](tareas.md): ID, título actual, milestone, estado, responsable, fecha, parentesco devuelto y archivado.
- [Speedrun de Stripe en Linear]({speedrun}): tareas concretas, sustituciones y continuidad con Carmen/EPI10.
- [Sandbox por módulos](../../modulos/README.md): ejecución y evidencias locales.
- [Situación original](00_situacion.md), [roadmap funcional original](01_roadmap_funcional.md) y [roadmap cronológico original](02_roadmap_cronologico.md): documentos íntegros, con sus fechas e IDs fuente.
- [Snapshot anterior completo, 16:35:05 UTC]({history}): ZIP con las cinco entregas originales, datos fuente y QA; [procedencia y comprobación](../../../00_inbox/linear-2026-09-15-previo-stripe/README.md).

## Stripe después de la reorganización

- **12 tareas vigentes, asignadas a Raúl:** nueve de demo para el **15 de septiembre** en OL3; SKI-74 para feedback, ajustes y validación de Carmen el **16 de septiembre**, también en OL3; SKI-77 para réplica y entrega en EPI10 y su subtarea SKI-81 para facturación, ambas en OL4 sin fecha individual.
- SKI-28 está `Done` tras verificar el acceso CLI; SKI-26 está `In Progress` y las otras diez, `Todo`. La evidencia de acceso figura en el módulo Stripe; no declara terminada la demo.
- **Nueve tareas sustituidas** permanecen visibles como `Canceled`, sin responsable y en sus oleadas originales: SKI-27, 38, 39, 73, 75, 76, 78, 79 y 80. El inventario enlaza sus tareas de destino.
- Las referencias T001–T106 se conservan **por el ID histórico de cada tarea**; no implican que su título ni su oleada actuales coincidan con los documentos originales.

## Oleadas: calendario y distribución

Los periodos originales y deadlines de los ocho hitos se conservan. La distribución de tareas incorpora los movimientos de Stripe; las descripciones de los milestones aún contienen sus listados originales.

| Oleada / milestone | Periodo original | Deadline del hito | Tareas originales | Tareas actuales | Canceled | Archivadas |
| --- | --- | --- | ---: | ---: | ---: | ---: |
{chr(10).join(table)}
| **Total** | **11 semanas** | **2026-11-13** | **106** | **106** | **9** | **2** |

`Canceled` y archivado son campos distintos: las nueve canceladas siguen sin archivar. Las 106 incluyen la subtarea SKI-81, contada una sola vez.

**Fechas individuales:** siete tareas conservan 2026-09-11; nueve de la demo Stripe tienen 2026-09-15; SKI-74 tiene 2026-09-16; 89 no tienen fecha individual. No se rellenan fechas a partir del deadline del hito.

## Estado de esta instantánea

- **104 sin archivar:** 85 `Todo`, 7 `In Progress`, 3 `Done` y 9 `Canceled`.
- **2 archivadas:** SKI-34 (`Todo`) y SKI-35 (`Done`), ambas en OL1.
- **13 asignadas a Raúl:** las 12 Stripe vigentes y SKI-1. **93 sin responsable**, de las cuales 91 están sin archivar.
- **Parentesco verificado por MCP:** SKI-81 devuelve `parentId=SKI-77`. El campo se solicitó para todas las tareas; el MCP lo omite en las otras 105.

**Unknown:** avance que aún no esté registrado en Linear, motivo de los dos archivados y parentesco no informado en las otras 105 tareas. El estado del tablero no sustituye la evidencia de ejecución o la aceptación de Carmen.

## Fuente de verdad y actualización

Linear mantiene planificación, estados y responsables. Esta carpeta es una copia fechada; el módulo Stripe conserva las decisiones y evidencias. La reorganización ya registrada en Linear prevalece para Stripe sobre los documentos originales del 7 de septiembre. Esta actualización documental se realizó con lecturas MCP y no modificó tareas remotas.

1. Conservar el snapshot previo antes de refrescar inventarios. Leer proyecto, documentos que hayan cambiado y milestones por ID.
2. Listar todas las tareas con `includeArchived=true` y campos explícitos: `id`, `uuid`, `title`, `projectMilestone`, `status`, `statusType`, `url`, `assignee`, `assigneeId`, `dueDate`, `archivedAt`, `parentId`, `createdAt` y `updatedAt`. Recorrer cursores hasta `hasNextPage=false`.
3. Contrastar con `includeArchived=false` y `assignee="null"`. No interpretar un campo omitido como vacío confirmado; documentar `Unknown` cuando no pueda verificarse.
4. Regenerar por **ID**, manteniendo las referencias históricas y distinguiendo cancelación, archivado, subtareas, fecha individual y deadline del hito. Mantener visible qué copias documentales quedaron históricas.
5. Actualizar fecha y conteos; verificar enlaces, campos y diferencias frente al snapshot previo. Registrar la ejecución en el módulo correspondiente sin inferir tareas terminadas.

## Verificación

- 106 IDs y URLs únicos, con la misma identidad que el snapshot original; ningún ID perdido.
- Ocho hitos; distribución actual: 10 + 10 + 26 + 12 + 18 + 14 + 9 + 7 = 106.
- Consultas completas de 106 tareas, 104 sin archivar y 93 sin asignar; todas con `hasNextPage=false`.
- Las 12 tareas vigentes y nueve canceladas de Stripe contrastadas con la reorganización; SKI-81 aparece una vez, con padre SKI-77.
- Documentos originales y snapshot anterior preservados. Verificador actual: `05_scratch/planificacion-linear/verificar_actual.py`; se conserva el verificador original en el ZIP histórico y en scratch.

La verificación cubre la sincronización documental del backlog, sin declarar completada la demo ni la réplica en EPI10.
'''
(folder / 'README.md').write_text(readme)

text = f'''# Tareas vigentes de EPI10 Salud MVP

**Instantánea: {snapshot}.** [Fuente: proyecto Linear]({project['url']}), lectura MCP completa con archivadas incluidas: **106 IDs únicos, 104 sin archivar y 2 archivadas**. Entre las no archivadas hay nueve `Canceled` por sustitución de tareas Stripe.

[Planificación](README.md) · [Speedrun Stripe]({speedrun}) · [Snapshot previo]({history}) · [Módulos](../../modulos/README.md)

## Cómo leer el inventario

- **Ref. origen:** T001–T106 de la planificación original, conservadas por ID. Son referencias históricas: para Stripe ya no prometen correspondencia de título ni de oleada con el [roadmap funcional original](01_roadmap_funcional.md).
- **Milestone:** sección correspondiente al hito actual de Linear. Periodo y deadline se citan como datos del hito; sus descripciones conservan listas originales anteriores a la reorganización.
- **Estado:** valor exacto de Linear. `Canceled` registra sustitución en este bloque y no equivale a trabajo terminado ni archivado.
- **Responsable:** `Sin asignar` contrastado mediante filtro `assignee="null"`.
- **Fecha individual:** `dueDate`; `Sin fecha` es `null` explícito y no hereda el deadline del hito.
- **Padre:** SKI-81 devuelve SKI-77. **— significa Unknown: campo `parentId` solicitado, pero no informado por el MCP**; no afirma ausencia de padre.
- **Archivada:** `No` corresponde a `archivedAt=null`; `Sí` incluye su timestamp UTC.

La última actualización de tarea en esta consulta es **{max(i['updatedAt'] for i in issues)}**. Unknown: trabajo realizado fuera del tablero, motivo de los dos archivados y parentesco no devuelto.

## Sustituciones de Stripe

Las tareas originales permanecen en `Canceled`. Su trabajo se integra en las siguientes tareas vigentes, conservando la trazabilidad de los IDs:

| Tarea sustituida | Trabajo integrado en |
| --- | --- |
'''
for source, target in plan['merged'].items():
    text += f'| [{source}]({by_id[source]["url"]}) | [{target}]({by_id[target]["url"]}) |\n'

for milestone in milestones:
    group = sorted([i for i in issues if i['projectMilestone']['id'] == milestone['id']], key=lambda i: old_refs[i['id']])
    period = re.search(r'\*\*Periodo:\*\* ([^\n]+)', milestone['description'])[1]
    archived = sum(bool(i['archivedAt']) for i in group)
    canceled = sum(i['statusType'] == 'canceled' for i in group)
    text += f'\n## {milestone["name"].strip()}\n\nMilestone ID: `{milestone["id"]}`. Periodo original: **{period}**. Deadline: **{milestone["targetDate"]}**. Distribución actual: **{len(group)} tareas**, {len(group)-archived} sin archivar, {archived} archivadas; {canceled} con estado `Canceled`.\n\n| Ref. origen | Tarea en Linear | Estado | Responsable | Fecha individual | Padre | Archivada |\n| --- | --- | --- | --- | --- | --- | --- |\n'
    for issue in group:
        parent = issue.get('parentId')
        parent = f'[{parent}]({by_id[parent]["url"]})' if parent else '—'
        archived_value = 'Sí · ' + issue['archivedAt'] if issue['archivedAt'] else 'No'
        title = issue['title'].replace('|', '\\|')
        text += f'| {old_refs[issue["id"]]} | [{issue["id"]} — {title}]({issue["url"]}) | {issue["status"]} | {issue.get("assignee") or "Sin asignar"} | {issue["dueDate"] or "Sin fecha"} | {parent} | {archived_value} |\n'
(folder / 'tareas.md').write_text(text)
print('README.md y tareas.md actualizados; referencias históricas conservadas por ID.')
