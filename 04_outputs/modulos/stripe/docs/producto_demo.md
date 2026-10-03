# NutriWell · DEMO — ficha de producto y reglas

**Versión:** 2026-09-15 · **Uso:** mockup de Stripe para Carmen.
Esta ficha fija la propuesta de demo. La oferta comercial definitiva se valida
con Carmen en SKI-74. Crear y probar los recursos Stripe corresponde a los pasos
siguientes. Actualización: [catálogo ya creado y verificado](catalogo_stripe.md);
[checkout configurado y abierto](checkout_stripe.md);
[pago y recuperación probados](confirmacion_recuperacion.md).

[Módulo](../README.md) · [Speedrun](speedrun_demo.md) · [Tarea SKI-26](https://linear.app/skilland/issue/SKI-26).

## Ficha compartida por página y checkout

| Campo | Contenido de la demo |
| --- | --- |
| Marca | EPI10 Salud |
| Nombre de catálogo | NutriWell · DEMO |
| Descriptor | Test genético integral con informe personalizado |
| Precio mostrado | 100 € · pago único de prueba |
| Importe de implementación | 10000 céntimos, moneda EUR, cantidad fija 1 |
| Modalidad | Pago único; sin suscripción |
| Total de demo | 100 €; sin impuestos, envío, descuentos ni extras añadidos en esta simulación |
| Botón de compra | Probar compra · 100 € |
| Aviso junto al precio y al botón | Demostración · pago de prueba. No se realiza ningún cobro real. |

El total ficticio de la demo no define el tratamiento fiscal del servicio real.

## Texto de la página

### Comprende lo que te hace único

Un test genético integral acompañado de un informe personalizado, un plan de
acción priorizado y una sesión profesional para comprender tus resultados.

### Qué incluye

1. **Test genético integral.** El punto de partida para conocer tu información genética.
2. **Cuestionario de hábitos y contexto.** Tu día a día ayuda a dar contexto a los resultados.
3. **Informe personalizado.** Una explicación comprensible de la información relevante.
4. **Plan de acción priorizado.** Orientaciones de bienestar organizadas para saber por dónde empezar.
5. **Sesión profesional de interpretación.** Acompañamiento para comprender resultados y prioridades.

### Cómo es la experiencia del servicio

1. Contratación y recogida de hábitos y contexto.
2. Recogida de muestra y análisis externo.
3. Interpretación, informe, plan y sesión profesional.

Estos pasos describen la oferta representada. La demo permite probar la compra;
no ejecuta recogida de muestras, cuestionarios sanitarios ni entrega del servicio.
No se publicarán duraciones o plazos que aún no estén confirmados.

## Descripción breve para Stripe

> Conoce tu biología y cuida tus hábitos. Incluye test genético, cuestionario,
> informe personalizado, plan de acción y sesión profesional.

Aplicado el 2026-09-15 a petición de Raúl. Avisos de demo en nombre, banner y
junto al botón de pago. Stripe muestra esta descripción como un párrafo.

## Marca e imagen de catálogo

La imagen inicial fue el logotipo azul. Tras revisar el checkout, Raúl pide
sustituir el logo grande por material de NutriWell. Imagen vigente:
[versión cuadrada de la portada](../assets/nutriwell-portada-cuadrada-v2.jpg),
adaptada con IA desde la portada original para aprovechar los 300 × 300 px
permitidos por Stripe; [fuente y prompt](../assets/README.md). El [logo actualizado azul](../../../../02_context/EPI10-branding/Nuevos-logos-de-EPI10/Logos_EPI10-01.png)
permanece en la cabecera. Texto alternativo mostrado por Stripe: **NutriWell · DEMO**.

Para superficies oscuras se usará el
[logotipo blanco](../../../../02_context/EPI10-branding/Nuevos-logos-de-EPI10/Logos_EPI10-02.png).
Azul de marca: **#044799**. Véase el [inventario de marca](marca.md).

La fotografía editorial de la página se resolverá durante SKI-37. Las imágenes
«Imagen pegada» revisadas son composiciones web con texto incrustado; se conservan
como referencias visuales. Esta ficha ya dispone de un activo de catálogo utilizable.

## Confirmación y recuperación

| Situación | Mensaje visible |
| --- | --- |
| Pago verificado | **Pago de prueba completado.** Has completado la compra de demostración de NutriWell. No se ha realizado ningún cobro real ni contratado el servicio. |
| Siguiente acción tras el éxito | **Volver a NutriWell** o **Iniciar otra prueba** |
| Verificación todavía pendiente | **Estamos comprobando tu pago de prueba.** Espera la confirmación antes de iniciar otro intento. |
| Rechazo | **El pago no se ha completado.** Revisa los datos de prueba o utiliza otra tarjeta de prueba para reintentarlo. |
| Abandono confirmado sin pago | **La compra de prueba sigue pendiente.** Puedes volver al checkout para continuar. |
| Doble clic o pago ya completado | Mostrar el intento abierto o su confirmación; permitir una nueva prueba solo mediante una acción explícita. |
| Reembolso verificado | **Pago de prueba devuelto.** La devolución de esta demostración está registrada. |

No afirmar que se ha enviado un email, creado una cuenta de cliente, reservado
una sesión o solicitado un kit. El paso operativo del servicio real se acordará
con Carmen antes de la réplica.

## Reglas para implementar y probar

| Caso | Regla de la demo |
| --- | --- |
| Pago correcto | Mostrar éxito cuando Stripe confirme el pago de 100 EUR de la compra correspondiente. Una visita a la URL de confirmación no es prueba de pago. |
| Rechazo | Mantener la compra sin pagar y permitir reintento; no crear una entrega de servicio. |
| Abandono | Conservar el intento para volver. Consultar el estado antes de afirmar que no existe pago. |
| Reintento | Continuar la misma compra; si su sesión expiró, abrir otra vinculada a esa compra y comprobar antes que no esté pagada. |
| Doble intento de una compra | Usar una referencia de compra estable y bloquear envíos repetidos. Reutilizar el intento abierto; si ya está pagado, mostrar su resultado. |
| Dos cobros distintos para la misma compra | Detectar y registrar el segundo; no duplicar la actuación de negocio. Resolver con devolución de prueba del cobro adicional y registrar su referencia. La devolución automática queda fuera de esta demo. |
| Evento repetido | Registrar cada ID de evento procesado para que su repetición no repita la actuación. Comprobar también la compra/pago: eventos diferentes pueden describir el mismo resultado. |
| Evento sin firma válida | Rechazarlo sin actualizar la compra. |
| Devolución | Ejecutar una devolución completa de prueba desde terminal; mostrar estado devuelto solo cuando esté verificado. No abrir un flujo de devoluciones comerciales para clientes. |
| Nueva demostración | Crear una compra nueva con una acción explícita; varias pruebas independientes no son un duplicado. |

Confirmación, abandono, recuperación e idempotencia del checkout implementados
en SKI-50. Receptor de eventos y deduplicación verificados en [SKI-51](webhook_stripe.md).
Devolución y doble intento comprobados en [SKI-52](validacion_demo.md).

## Datos del recorrido

Para esta demo, usar email ficticio y datos de tarjeta de prueba en el checkout.
No solicitar teléfono, dirección de envío ni información sanitaria en la página.
Los campos adicionales imprescindibles del método de pago se revisarán al
configurar Stripe. No introducir un cuestionario clínico en este speedrun.

## Fuente y pendientes comerciales

Oferta, cinco inclusiones y tono contrastados con el
[Brand Canon](../../../../02_context/EPI10-branding/EPI10-Phase-2-Brand-Canon-v1.md),
secciones 0, 2, 3, 8 y 11. Nuevos logos aportados por Raúl prevalecen sobre los
anteriores. El contenido describe la oferta de los documentos; no añade promesas
de diagnóstico, resultados garantizados ni exclusividad del laboratorio.

Pendientes de Carmen: nombre y precio definitivos, alcance contractual, impuestos,
envío, plazos, comunicaciones, siguiente paso del servicio y condiciones reales
de compra/devolución. Estas decisiones no bloquean la simulación acordada.
