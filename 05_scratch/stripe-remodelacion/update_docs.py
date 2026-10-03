import json
from pathlib import Path
root=Path.cwd()
p=root/'05_scratch/stripe-remodelacion'
plan=json.loads((p/'plan.json').read_text())
after=json.loads((p/'after.json').read_text())
by={x['id']:x for x in after}
active=plan['payloads']
errors=[]
for task in active:
 v=by[task['id']]
 expected='Done' if task['id']=='SKI-28' else task['state']
 for field,ok in [('title',v['title']==task['title']),('state',v['status']==expected),('owner',v['assigneeId']==task['assignee']),('milestone',v['projectMilestone']['id']==task['milestone']),('dueDate',v.get('dueDate')==task['dueDate']),('parentId',v.get('parentId')==task['parentId']),('blockedBy',{x['id'] for x in v['relations']['blockedBy']}==set(task['blockedBy']))]:
  if not ok: errors.append([task['id'],field])
for old,new in plan['merged'].items():
 v=by[old]
 if v['status']!='Canceled' or v['relations']['blocks'] or v['relations']['blockedBy'] or new not in {x['id'] for x in v['relations']['relatedTo']}:errors.append([old,'cancellation'])
if {x['id'] for x in by['SKI-105']['relations']['blockedBy']}!={'SKI-77','SKI-72','SKI-91','SKI-92'}:errors.append(['SKI-105','preserve dependencies'])
visiting=set(); visited=set()
def visit(k):
 if k in visiting: errors.append([k,'cycle']);return
 if k in visited:return
 visiting.add(k)
 for dep in by[k]['relations']['blockedBy']:
  if dep['id'] in by:visit(dep['id'])
 visiting.remove(k);visited.add(k)
for k in by:visit(k)
assert not errors,errors
qa={'result':'PASS','checked_issues':22,'stripe_retained':12,'stripe_canceled':9,'demo':9,'feedback':1,'replica':1,'invoice_child':1,'access_done':True,'cycles':False,'external_dependencies_preserved':True,'errors':errors}
(p/'qa-remodelacion.json').write_text(json.dumps(qa,ensure_ascii=False,indent=2)+'\n')
base=root/'04_outputs/modulos/stripe'
link=lambda k:f'[{k}](https://linear.app/skilland/issue/{k})'
rows=[]
for task in active:
 v=by[task['id']]; phase='Demo · OL3' if v['id'] not in {'SKI-74','SKI-77','SKI-81'} else {'SKI-74':'Feedback · OL3','SKI-77':'Réplica · OL4','SKI-81':'Subtarea de SKI-77 · OL4'}[v['id']]
 deps=', '.join(x['id'] for x in v['relations']['blockedBy']) or '—'
 rows.append(f"| {link(v['id'])} | {v['title']} | {phase} | {v['status']} | {deps} |")
text='''# Stripe — planificación operativa en Linear

Actualizada y verificada el **2026-09-15**, después de conectar el CLI.
[Módulo](../README.md) · [Speedrun](speedrun_demo.md) · [Inventario completo](../../../planificacion/linear/tareas.md).

## Desglose vigente

Las 21 tareas originales se han consolidado en **12 tareas vigentes**: nueve para
construir y probar la demo, una para feedback con Carmen, una para réplica/entrega
con la cuenta EPI10 y una subtarea de facturación dentro de esa entrega.
Todas están asignadas a **Raúl**. Las nueve de demo tienen objetivo **15 de
septiembre**; la revisión con Carmen, **16 de septiembre**. La réplica y factura
permanecen en OL4, sin vencimiento individual nuevo, después de validar el mockup.

SKI-28 ya está **Done** por autorización y consultas verificadas. SKI-26 está
**In Progress**; las diez restantes están **Todo**. La demo todavía no está
implementada. Cada tarea remota contiene un resultado concreto y criterios de
terminado; los pasos se cierran con evidencia durante la ejecución.

| Tarea | Resultado concreto | Tramo | Estado | Depende de |
| --- | --- | --- | --- | --- |
'''+ '\n'.join(rows)+'''

## Tareas anteriores sustituidas

Nueve tareas figuran como **Canceled**, con explicación, descripción original y
relación a la tarea que absorbe su trabajo. Se han quitado sus dependencias de
bloqueo para que no frenen el nuevo recorrido. Se conserva su historial.

| Tarea anterior | Trabajo incluido ahora en |
| --- | --- |
'''+ '\n'.join(f'| {link(old)} | {link(new)} |' for old,new in plan['merged'].items())+'''

La entrada de web/pago de Odoo (SKI-105) depende ahora de SKI-77; conserva sus
otras dependencias SKI-72, SKI-91 y SKI-92. No se remodelaron los otros bloques.

## Alcance y continuidad

- Demo: NutriWell · DEMO, 100 EUR ficticios, pago único, una unidad y nuevos logos.
- Feedback: mostrar el mockup, recoger observaciones, aplicarlas y registrar la
  validación de Carmen antes de la réplica.
- Réplica: preparar la cuenta del cliente, trasladar la versión validada,
  configurar credenciales/eventos, probar y entregar la guía actualizada.
- Facturación: conservar SKI-81 como subtarea comercial de la entrega, pendiente.

Los tres documentos fuente del 7 de septiembre siguen íntegros como línea base
histórica. Para el bloque Stripe, este desglose y el inventario actualizado
reflejan la remodelación solicitada después. Las referencias T originales
permiten rastrear el origen de las tareas; no definen sus títulos actuales.

## Verificación

Se releyeron las 21 tareas Stripe y SKI-105 tras aplicar los cambios. Se verificó
estado, título, responsable, oleada, fecha, parentesco, sustituciones y
relaciones; no hay ciclos en el subgrafo revisado ni tareas canceladas bloqueando
la ejecución. Después se releyó SKI-28 para confirmar su cierre.

- [Snapshot anterior](../../../../05_scratch/stripe-remodelacion/before.json).
- [Plan aplicado](../../../../05_scratch/stripe-remodelacion/plan.json).
- [Snapshot posterior](../../../../05_scratch/stripe-remodelacion/after.json).
- [Resultado QA](../../../../05_scratch/stripe-remodelacion/qa-remodelacion.json).
- [Acceso CLI verificado](acceso_stripe.md).
'''
(base/'docs/linear_speedrun.md').write_text(text)
(base/'README.md').write_text('''# Stripe — mockup de cobro EPI10

**Actualizado:** 2026-09-15. **Estado:** CLI conectado al sandbox EPI10 y acceso
API comprobado. Plan de Linear remodelado. Producto, checkout y pagos pendientes.

[Módulos](../README.md) · [Planificación Linear](../../planificacion/linear/README.md) ·
[Spec 011](../../../03_specs/now/011_now.md)

## Objetivo

Una demo funcional con marca, información y producto EPI10 para mostrar a Carmen
el **16 de septiembre**: página de producto → checkout → confirmación → pago
verificable en Stripe. Después, feedback con Carmen y réplica de la versión
validada en su cuenta EPI10.

## Punto de continuidad

| Dato | Estado comprobado |
| --- | --- |
| Alta | Raúl registra la cuenta desde navegador; Dashboard de pruebas observado en E06 |
| Acceso técnico | CLI 1.50.11 autorizado; cuenta, catálogo y eventos consultados correctamente |
| Contexto | Entorno de prueba de EPI10 Salud · sandbox |
| Cuenta del sandbox | `acct_1UFzBqRrJS0VSqzs` |
| Catálogo | Vacío en la consulta del 15 de septiembre |
| Propuesta demo | NutriWell · DEMO, 100 EUR ficticios, pago único y una unidad |
| Marca | Seis nuevos logos aportados por Raúl y revisados; aplicación pendiente |
| Checkout / pagos | Sin implementar ni ejecutar |
| Titularidad legal / cuenta productiva | Unknown; el nombre del sandbox no acredita estos datos |

La configuración recomendada del onboarding fue pagos por Internet, sin Managed
Payments ni módulos adicionales de facturación/impuestos para la demo. Las
capturas no acreditan todas las opciones guardadas. El producto y precio reales,
la fiscalidad y la aceptación de Carmen siguen pendientes.

## Documentación

- [Plan operativo de Linear](docs/linear_speedrun.md): tareas vigentes, dependencias y sustituciones.
- [Acceso Stripe](docs/acceso_stripe.md): autorización CLI y comprobaciones, sin credenciales.
- [Speedrun de la demo](docs/speedrun_demo.md): recorrido de implementación.
- [Marca y logos](docs/marca.md): activos y aplicación prevista.
- [Bitácora interna](docs/bitacora.md): acciones, resultados y siguiente paso.
- [Decisiones](docs/decisiones.md): acuerdos y cuestiones abiertas.
- [Guía para cliente](docs/guia_cliente.md): procedimiento reutilizable, base de futura guía Skilland.
- [Pruebas](docs/pruebas.md): acceso verificado; casos de pago pendientes.
- [Evidencias](evidencias/README.md): capturas del onboarding y panel.

## Próximos pasos

1. Cerrar la ficha y reglas de NutriWell · DEMO (SKI-26).
2. Crear producto y precio de pruebas por CLI/API (SKI-48).
3. Construir checkout, página, confirmación y receptor de eventos.
4. Ejecutar las pruebas, preparar el enlace y el guion para Carmen.

Actualizar la documentación tras cada avance según el
[modelo continuo](../README.md#documentar-mientras-trabajamos).

## Tareas de Linear

Desglose remoto verificado: **nueve tareas de demo + feedback + réplica**, y una
subtarea de facturación dentro de la réplica. Nueve tareas anteriores canceladas
por consolidación. SKI-28 **Done**, SKI-26 **In Progress**, diez **Todo**.

Ver [tabla de tareas vigentes y anteriores](docs/linear_speedrun.md). Los criterios
concretos viven también en cada tarea remota; no se marca implementación como
terminada por haber documentado el plan.
''')
# Targeted updates to existing continuous documentation.
def change(path,old,new):
 f=root/path;s=f.read_text();assert old in s,(path,old[:90]);f.write_text(s.replace(old,new))
change('01_harness/STACK.md','- Herramienta consultada: Stripe CLI `1.50.11` vía `npx`; solo ayuda consultada,\n  sin autenticación ni sandbox creado por el agente.','- Stripe CLI `1.50.11` vía `npx`, autorizado por navegador para el sandbox\n  «Entorno de prueba de EPI10 Salud». Lecturas API verificadas; detalles en\n  `04_outputs/modulos/stripe/docs/acceso_stripe.md`. No se creó un sandbox anónimo.')
change('04_outputs/modulos/stripe/docs/speedrun_demo.md','Estado: plan de ejecución; solo el acceso al Dashboard de pruebas está observado.','Estado: acceso al Dashboard y al CLI/API de pruebas verificado; implementación pendiente.')
change('04_outputs/modulos/stripe/docs/speedrun_demo.md','**Observado** en la captura del usuario; queda registrar nombre completo/ID del entorno sin secretos.','**Verificado** por captura y CLI; contexto documentado en [acceso](acceso_stripe.md).')
change('04_outputs/modulos/stripe/docs/speedrun_demo.md','Entorno identificado y mecanismo de acceso comprobado. No copiar claves en chat ni documentación.','**Hecho — SKI-28:** CLI autorizado y cuatro consultas API correctas. Credenciales fuera del chat y documentación.')
change('04_outputs/modulos/stripe/docs/speedrun_demo.md','El trabajo cubre la preparación del mockup de las tareas Stripe hasta SKI-73.\nPresentación/feedback, réplica a EPI10 y entrega/facturación posterior conservan\nsus dependencias en [Linear](../../../planificacion/linear/tareas.md).\nNo cambia automáticamente el estado remoto de ninguna tarea.','Linear ya refleja el [desglose concreto](linear_speedrun.md): nueve tareas de\ndemo, feedback con Carmen y réplica/entrega en EPI10, con facturación como\nsubtarea. La demo tiene objetivo 15 de septiembre y el feedback el 16. Los estados\nremotos se actualizan después de comprobar cada resultado; SKI-28 ya está Done.')
change('04_outputs/modulos/stripe/docs/speedrun_demo.md','- Cuenta/ID y acceso técnico; permisos y titularidad legal.','- Titularidad legal y cuenta productiva; permisos de escritura por verificar\n  con cada operación. Cuenta sandbox y acceso de lectura ya comprobados.')
change('04_outputs/modulos/stripe/docs/decisiones.md','titularidad legal e IDs: Unknown; S03 y S10','titularidad legal: Unknown; ID comprobado después en S14; S03 y S10')
change('04_outputs/modulos/stripe/docs/decisiones.md','IDs de entorno: Unknown; sin cobros reales ni datos sanitarios reales','Cuenta sandbox identificada en S14; sin cobros reales ni datos sanitarios reales')
change('04_outputs/modulos/stripe/docs/decisiones.md','## Motivo de D06','| D14 | Sustituir tareas genéricas de Stripe por nueve de demo, feedback y réplica; facturación como subtarea de entrega | Aplicado en Linear y verificado | S13 y [desglose](linear_speedrun.md); nueve anteriores canceladas con trazabilidad |\n| D15 | Operar por CLI/API en el sandbox que autorizó Raúl en navegador | Autorización y cuatro lecturas verificadas | S14 y [acceso](acceso_stripe.md); SKI-28 Done; escrituras pendientes de implementar |\n\n## Motivo de D06')
change('04_outputs/modulos/stripe/docs/decisiones.md','- IDs de cuenta/sandbox, permisos y acceso de implementación: `Unknown`. Acceso\n  al Dashboard «EPI10 Salud» y banner de pruebas sí observados.','- Cuenta productiva y titularidad legal: `Unknown`. Cuenta del sandbox y\n  acceso CLI/API de lectura comprobados; escritura por verificar al ejecutarla.')
change('04_outputs/modulos/stripe/docs/pruebas.md','**Actualizado:** 2026-09-15 · **Ejecución:** acceso visual al entorno observado;','**Actualizado:** 2026-09-15 · **Ejecución:** acceso visual y CLI/API verificados;')
change('04_outputs/modulos/stripe/docs/pruebas.md','  Identificadores de cuenta/sandbox y permisos: `Unknown`.','  CLI/API autorizado para `acct_1UFzBqRrJS0VSqzs`; cuatro lecturas correctas.\n  Véase [acceso verificado](acceso_stripe.md).')
change('04_outputs/modulos/stripe/docs/pruebas.md','Parcial: Dashboard EPI10 Salud y pruebas observados en [E06](../evidencias/2026-09-15_06_dashboard_pruebas.png); IDs pendientes','PASS: Dashboard y contexto sandbox comprobados; cuenta, catálogo y eventos consultados por CLI; [evidencia](acceso_stripe.md)')
pth=base/'docs/pruebas.md';s=pth.read_text();start=s.index('| Alcance, escenarios y reglas');end=s.index('## Registrar una ejecución');s=s[:start]+'''| Alcance, escenarios y reglas | [SKI-26](https://linear.app/skilland/issue/SKI-26) |
| Acceso y entorno | [SKI-28](https://linear.app/skilland/issue/SKI-28), Done |
| Matriz y ejecución funcional | [SKI-52](https://linear.app/skilland/issue/SKI-52) |
| Evento, firma y duplicados | [SKI-51](https://linear.app/skilland/issue/SKI-51), [SKI-52](https://linear.app/skilland/issue/SKI-52) |
| Evidencias, enlace y guion | [SKI-53](https://linear.app/skilland/issue/SKI-53) |
| Feedback y validación con Carmen | [SKI-74](https://linear.app/skilland/issue/SKI-74) |
| Réplica, prueba del entorno EPI10 y entrega | [SKI-77](https://linear.app/skilland/issue/SKI-77) |

Ver el [desglose vigente](linear_speedrun.md). Completar una prueba local no
acredita la aceptación de Carmen ni la prueba del entorno productivo de EPI10.

'''+s[end:];s=s.replace('todos los IDs de recursos','IDs de producto, precio, checkout y pagos');pth.write_text(s)
change('04_outputs/modulos/stripe/docs/bitacora.md','- **Siguiente paso:** registrar SKI-28 como terminada, cerrar la ficha demo y\n  crear producto/precio. Ningún producto, checkout o pago se da por creado.','- **Cierre de tarea:** SKI-28 actualizada a Done y releída para confirmarlo.\n- **Siguiente paso:** cerrar la ficha demo y crear producto/precio. Ningún\n  producto, checkout o pago se da por creado.')
print(json.dumps(qa,ensure_ascii=False))
