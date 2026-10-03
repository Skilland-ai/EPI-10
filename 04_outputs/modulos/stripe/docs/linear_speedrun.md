# Stripe — planificación operativa en Linear

Actualizada y verificada el **2026-09-16**, tras reunir el speedrun en OL4 y
releer las 97 issues que permanecen en el proyecto.
[Módulo](../README.md) · [Speedrun](speedrun_demo.md) · [Inventario histórico](../../../planificacion/linear/tareas.md).

## Desglose vigente

Las 21 tareas originales se han consolidado en **12 tareas vigentes**, todas en
**OL4 — Specs y cierre de Stripe**: nueve para
construir y probar la demo, una para feedback con Carmen, una para réplica/entrega
con la cuenta EPI10 y una subtarea de facturación dentro de esa entrega.
Todas están asignadas a **Raúl**. Ocho tareas de implementación/prueba están
Done; guion, revisión con Carmen, réplica y factura siguen Todo. OL3 queda sin
tareas Stripe. Las 97 issues que permanecen en el proyecto están asignadas a
Raúl y su estado resume el trabajo completado.

SKI-28 está **Done** por autorización y consultas verificadas. SKI-26 está
**Done** por la [ficha y reglas preparadas](producto_demo.md). SKI-48 está **Done**
por el [catálogo verificado](catalogo_stripe.md). SKI-49 está **Done** por el
[checkout verificado](checkout_stripe.md). SKI-37 está **Done** por la
[pantalla de entrada publicada](pantalla_demo.md). SKI-50 está **Done** por la
[confirmación y recuperación probadas](confirmacion_recuperacion.md). SKI-51 está
**Done** por [firma, recepción y repetición verificadas](webhook_stripe.md). SKI-52 está
**Done** por la [matriz funcional y visual](validacion_demo.md). SKI-53 está
**In Progress** tras el ensayo técnico E20; SKI-74, 77 y 81 siguen **Todo**.
Queda cerrar el guion antes de Carmen. Cada tarea remota contiene un resultado concreto y criterios de
terminado; los pasos se cierran con evidencia durante la ejecución.

| Tarea | Resultado concreto | Tramo | Estado | Depende de |
| --- | --- | --- | --- | --- |
| [SKI-26](https://linear.app/skilland/issue/SKI-26) | Cerrar la ficha y reglas de compra de NutriWell · DEMO (100 EUR) | Demo · OL4 | Done | — |
| [SKI-28](https://linear.app/skilland/issue/SKI-28) | Conectar el CLI al entorno de pruebas EPI10 y verificar acceso | Demo · OL4 | Done | — |
| [SKI-48](https://linear.app/skilland/issue/SKI-48) | Crear en Stripe NutriWell · DEMO: 100 EUR, pago único y una unidad | Demo · OL4 | Done | SKI-28, SKI-26 |
| [SKI-49](https://linear.app/skilland/issue/SKI-49) | Configurar el checkout Stripe con los nuevos logos EPI10 y cobro de 100 EUR | Demo · OL4 | Done | SKI-26, SKI-48 |
| [SKI-37](https://linear.app/skilland/issue/SKI-37) | Maquetar la pantalla de entrada al mockup Stripe con marca EPI10 | Demo · OL4 | Done | SKI-49, SKI-26 |
| [SKI-50](https://linear.app/skilland/issue/SKI-50) | Conectar confirmación, abandono y reintento de la compra NutriWell | Demo · OL4 | Done | SKI-37, SKI-49 |
| [SKI-51](https://linear.app/skilland/issue/SKI-51) | Recibir el evento de pago Stripe con firma verificada y deduplicación | Demo · OL4 | Done | SKI-28, SKI-49 |
| [SKI-52](https://linear.app/skilland/issue/SKI-52) | Probar NutriWell: pago, rechazo, reintento, duplicados, devolución y móvil | Demo · OL4 | Done | SKI-37, SKI-50, SKI-51 |
| [SKI-53](https://linear.app/skilland/issue/SKI-53) | Dejar el enlace y el guion de demo NutriWell listos para Carmen | Demo · OL4 | In Progress | SKI-52 |
| [SKI-74](https://linear.app/skilland/issue/SKI-74) | Revisar el mockup con Carmen, aplicar feedback y validar la versión final | Feedback · OL4 | Todo | SKI-53 |
| [SKI-77](https://linear.app/skilland/issue/SKI-77) | Replicar el mockup validado en la cuenta EPI10 y entregar el módulo Stripe | Réplica · OL4 | Todo | SKI-74 |
| [SKI-81](https://linear.app/skilland/issue/SKI-81) | Emitir y registrar la factura del módulo Stripe tras su entrega | Subtarea de SKI-77 · OL4 | Todo | SKI-77 |

## Tareas anteriores sustituidas

Nueve tareas antiguas se retiraron del proyecto y se eliminaron sus relaciones
con el bloque vigente. Se conserva su mapeo solo como evidencia local histórica.
El borrado físico del workspace permanece pendiente de una sesión de navegador.

| Tarea anterior | Trabajo incluido ahora en |
| --- | --- |
| [SKI-27](https://linear.app/skilland/issue/SKI-27) | [SKI-26](https://linear.app/skilland/issue/SKI-26) |
| [SKI-38](https://linear.app/skilland/issue/SKI-38) | [SKI-49](https://linear.app/skilland/issue/SKI-49) |
| [SKI-39](https://linear.app/skilland/issue/SKI-39) | [SKI-52](https://linear.app/skilland/issue/SKI-52) |
| [SKI-73](https://linear.app/skilland/issue/SKI-73) | [SKI-53](https://linear.app/skilland/issue/SKI-53) |
| [SKI-75](https://linear.app/skilland/issue/SKI-75) | [SKI-74](https://linear.app/skilland/issue/SKI-74) |
| [SKI-76](https://linear.app/skilland/issue/SKI-76) | [SKI-77](https://linear.app/skilland/issue/SKI-77) |
| [SKI-78](https://linear.app/skilland/issue/SKI-78) | [SKI-77](https://linear.app/skilland/issue/SKI-77) |
| [SKI-79](https://linear.app/skilland/issue/SKI-79) | [SKI-77](https://linear.app/skilland/issue/SKI-77) |
| [SKI-80](https://linear.app/skilland/issue/SKI-80) | [SKI-77](https://linear.app/skilland/issue/SKI-77) |

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

Relectura vigente del 16 de septiembre: 97 issues en el proyecto,
`hasNextPage=false`, cero Canceled y todas asignadas a Raúl. OL4 contiene las
12 tareas Stripe y cuatro specs transversales; OL3 contiene 16 tareas no Stripe.
Los nueve IDs antiguos devuelven `projectId=null`, sin relaciones. Su borrado
físico sigue pendiente por falta de una sesión de navegador conectada.

Se releyeron las 21 tareas Stripe y SKI-105 tras aplicar los cambios. Se verificó
estado, título, responsable, oleada, fecha, parentesco, sustituciones y
relaciones; no hay ciclos en el subgrafo revisado ni tareas canceladas bloqueando
la ejecución. Después se releyó SKI-28 para confirmar su cierre.

- [Snapshot anterior](../../../../05_scratch/stripe-remodelacion/before.json).
- [Plan aplicado](../../../../05_scratch/stripe-remodelacion/plan.json).
- [Snapshot posterior](../../../../05_scratch/stripe-remodelacion/after.json).
- [Resultado QA](../../../../05_scratch/stripe-remodelacion/qa-remodelacion.json).
- [Acceso CLI verificado](acceso_stripe.md).

Actualización de ejecución 17:13:41 UTC: SKI-26 cerrada tras preparar la ficha;
relectura guardada en `05_scratch/stripe-producto/linear_ski26.json`. Los snapshots
de la remodelación anterior conservan el estado de su fecha.

Actualización 17:25:33 UTC: SKI-48 Done tras verificar producto, precio e imagen.
La cantidad fija se aplicará en el checkout SKI-49. Relectura remota conservada en
`05_scratch/stripe-catalogo/linear_ski48.json`.

Actualización 17:49:25 UTC: SKI-49 Done tras 17 comprobaciones API y revisión
del formulario por DOM/estilos. Relectura remota: `05_scratch/stripe-checkout/linear_ski49.json`.
Página, pagos y eventos todavía pendientes.

Refinamiento posterior solicitado por Raúl: copy breve y portada NutriWell
como imagen de producto; logo de cabecera conservado. SKI-49 actualizada con
evidencia sin cambiar estados. Relectura: `05_scratch/stripe-refinamiento/linear_ski49.json`.
SKI-37 queda para después, como siguiente paso pendiente.

18:10:28 UTC: SKI-49 actualizada con imagen cuadrada a 300 × 300 px y comparación
con los 212 × 300 anteriores. Estado Done conservado; relectura en
`05_scratch/stripe-imagen-ampliada/linear_ski49.json`. SKI-37 pendiente.

18:33:50 UTC: SKI-37 Done y releída tras publicar la pantalla de entrada en
privado. La web definitiva corresponde al otro proveedor. Compilación,
TypeScript y controles del HTML correctos; revisión visual y pago completo
pendientes en SKI-52. Evidencia E14 y relectura remota en
`05_scratch/stripe-pantalla/linear_ski37.json`. Estado vigente: cinco Done y siete Todo.

Actualización posterior: versión 2 publicada con acceso público por petición de
Raúl. Tipografía ampliada y CTA inferior revisado, geometría comprobada en cinco
anchos y navegación al checkout verificada. E15 y relectura en
`05_scratch/stripe-legibilidad/linear_ski37.json`. SKI-37 conserva Done;
los conteos no cambian.

18:58 UTC: publicación trasladada a Vercel por petición de Raúl.
URL vigente: https://epi10-nutriwell-demo.vercel.app. E16 verifica despliegue,
acceso público, conservación del diseño y navegación al checkout. SKI-37
conserva Done; ninguna tarea de pago se da por terminada.

Aclaración de configuración: SKI-77 incluye titularidad/activación, banco y
transferencias, accesos, datos públicos, oferta/cobro, impuestos/facturación,
operación e integración. SKI-74 recoge las decisiones que puedan cambiar la
demo. Ambas tareas siguen Todo. [Desglose por fases](configuracion_entornos.md)
y relecturas en `05_scratch/stripe-configuracion-fases/`.

19:50:55 UTC: SKI-50 Done y releída tras verificar compra, abandono, rechazo,
recuperación y confirmación desde Vercel. Un pago correcto de 100 EUR ficticios;
misma sesión e intento de pago tras rechazo. Diez tests correctos, build y
TypeScript; E17. Estado vigente: seis Done y seis Todo. Receptor, matriz restante
y guion siguen pendientes. Relectura: `05_scratch/stripe-confirmacion/linear_ski50.json`.

## Verificación de SKI-51 — 2026-09-15

Receptor, firma y repetición comprobados en la URL pública. Dos entregas reales
Stripe generan un registro persistente; firmas inválidas no modifican datos.
21 tests correctos y build/TypeScript de Vercel correctos. E18 y
[procedimiento](webhook_stripe.md). Siete Done y cinco Todo; SKI-52/53 permanecen
abiertas. Relectura remota: `05_scratch/stripe-webhook/linear_ski51.json`.

## Verificación de SKI-52 — 2026-09-15

3DS fallido/correcto, dos pestañas con una sesión, dos nuevos pagos y devoluciones
completas, eventos automáticos y revisión visual en Chromium. E19 y
[detalle](validacion_demo.md). Observación de Apple Pay no bloqueante para tarjeta.
Ocho Done y cuatro Todo; siguiente SKI-53. Relectura remota:
`05_scratch/stripe-pruebas/linear_ski52.json`.
