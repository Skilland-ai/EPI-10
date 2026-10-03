# Stripe — mockup de cobro EPI10

**Actualizado:** 2026-09-15. **Estado:** CLI conectado al sandbox EPI10 y acceso
API comprobado. Producto, precio de 100 EUR e imagen creados y verificados.
Checkout de pruebas creado y comprobado; pantalla de entrada publicada con acceso público en Vercel.
Pago, rechazo, abandono, recuperación y recepción de eventos comprobados.
Firma y repetición verificadas con registro persistente; matriz de tarjeta, 3DS,
doble intento, devolución y revisión móvil completada. Siguiente: guion para Carmen.

[Módulos](../README.md) · [Planificación Linear](../../planificacion/linear/README.md) ·
[Spec 011](../../../03_specs/now/011_now.md)

## Objetivo

Una demo con marca, información y producto EPI10 para mostrar a Carmen
el **16 de septiembre**: pantalla de entrada al mockup → checkout → confirmación → pago
verificable en Stripe. Después, feedback con Carmen y réplica de la versión
validada en su cuenta EPI10.

La web definitiva corresponde a otro proveedor. Esta vista presenta el hito de
la pasarela: [abrir demo pública](https://epi10-nutriwell-demo.vercel.app).

## Punto de continuidad

| Dato | Estado comprobado |
| --- | --- |
| Alta | Raúl registra la cuenta desde navegador; Dashboard de pruebas observado en E06 |
| Acceso técnico | CLI 1.50.11 autorizado; cuenta, catálogo y eventos consultados correctamente |
| Contexto | Entorno de prueba de EPI10 Salud · sandbox |
| Cuenta del sandbox | `acct_1UFzBqRrJS0VSqzs` |
| Catálogo | NutriWell · DEMO, un producto y un precio único de 100 EUR verificados |
| Propuesta demo | NutriWell · DEMO, 100 EUR ficticios, pago único y una unidad |
| Marca | Nuevo logo azul en cabecera; portada NutriWell adaptada a cuadrado (300 × 300 px en pantalla) como imagen de producto; fondo marfil y botón azul |
| Checkout / pagos | Sesiones desde la página de Vercel; confirmación, abandono y reintento probados; pago de 100 EUR ficticios confirmado |
| Notificación de pago | Receptor conectado al sandbox, firma verificada y registro persistente en Redis; dos entregas de Stripe generan un único registro de negocio |
| Titularidad legal / cuenta productiva | Unknown; el nombre del sandbox no acredita estos datos |

La configuración recomendada del onboarding fue pagos por Internet, sin Managed
Payments ni módulos adicionales de facturación/impuestos para la demo. Las
capturas no acreditan todas las opciones guardadas. El producto y precio reales,
la fiscalidad y la aceptación de Carmen siguen pendientes.

## Documentación

- [Validación de la demo](docs/validacion_demo.md): matriz cerrada para tarjeta, capturas y límites de la revisión.

- [Notificaciones de Stripe](docs/webhook_stripe.md): firma, registro persistente, repetición y comprobaciones.
- [Confirmación y recuperación](docs/confirmacion_recuperacion.md): recorrido probado, referencias y funcionamiento.

- [Configuración de Stripe por fases](docs/configuracion_entornos.md): qué hace falta para la demo y qué se cierra en la cuenta EPI10.
- [Publicación en Vercel](docs/vercel.md): URL, procedimiento y verificación.

- [Pantalla de entrada publicada](docs/pantalla_demo.md): alcance, URL, diseño y validación.

- [Checkout creado](docs/checkout_stripe.md): enlace, marca, campos y verificación API/navegador.

- [Catálogo creado](docs/catalogo_stripe.md): IDs, configuración, procedimiento y evidencia.
- [Ficha de NutriWell · DEMO](docs/producto_demo.md): contenido, precio, imagen y reglas de compra.
- [Plan operativo de Linear](docs/linear_speedrun.md): tareas vigentes, dependencias y sustituciones.
- [Acceso Stripe](docs/acceso_stripe.md): autorización CLI y comprobaciones, sin credenciales.
- [Speedrun de la demo](docs/speedrun_demo.md): recorrido de implementación.
- [Marca y logos](docs/marca.md): activos y aplicación prevista.
- [Bitácora interna](docs/bitacora.md): acciones, resultados y siguiente paso.
- [Decisiones](docs/decisiones.md): acuerdos y cuestiones abiertas.
- [Guía para cliente](docs/guia_cliente.md): procedimiento reutilizable, base de futura guía Skilland.
- [Pruebas](docs/pruebas.md): recorrido con tarjeta verificado; guion y aceptación externa pendientes.
- [Evidencias](evidencias/README.md): onboarding, catálogo y verificación del checkout.

## Próximos pasos

1. Ficha y reglas preparadas en [producto_demo.md](docs/producto_demo.md) (SKI-26).
2. Producto, precio e imagen creados y verificados (SKI-48).
3. Checkout verificado (SKI-49) y pantalla de entrada publicada (SKI-37).
4. Resultado y recuperación (SKI-50), receptor de eventos y deduplicación (SKI-51) verificados.
5. Pruebas funcionales y visuales completadas (SKI-52). Preparar el guion para Carmen (SKI-53).

Actualizar la documentación tras cada avance según el
[modelo continuo](../README.md#documentar-mientras-trabajamos).

## Tareas de Linear

Desglose remoto verificado: **nueve tareas de demo + feedback + réplica**, y una
subtarea de facturación dentro de la réplica. Las 12 están reunidas en OL4.
Nueve versiones anteriores se retiraron del proyecto y perdieron sus relaciones;
su borrado físico del workspace está pendiente. SKI-28, SKI-26, SKI-48, SKI-49,
SKI-37, SKI-50, SKI-51 y SKI-52 están **Done**.
SKI-53 está **In Progress** tras el ensayo técnico; SKI-74, SKI-77 y SKI-81
siguen **Todo**.

Ver [tabla de tareas vigentes y anteriores](docs/linear_speedrun.md). Los criterios
concretos viven también en cada tarea remota; no se marca implementación como
terminada por haber documentado el plan.
