# Validación funcional y visual — SKI-52

**15 de septiembre de 2026 · Demo de pruebas · Resultado: PASS del recorrido con tarjeta.**
[Evidencia E19](../evidencias/2026-09-15_pruebas_funcionales.json) · [Matriz](pruebas.md) · [Módulo](../README.md).

## Qué se ha comprobado

| Caso | Resultado observado |
| --- | --- |
| Autenticación 3DS fallida | La pantalla de verificación aparece; al pulsar Fail, Stripe devuelve payment_intent_authentication_failure. Compra open/unpaid y sin registro de cobro. |
| Reintento 3DS correcto | Al repetir y pulsar Complete, la misma sesión y PaymentIntent pasan a paid/succeeded. El cargo registra challenge/authenticated, 3DS 2.1.0. |
| Dos pestañas | Los CTA superior e inferior abren la misma sesión para la misma compra. Un clic posterior al pago vuelve a su confirmación; una sesión, un pago y un registro de negocio. |
| Notificación automática | Cada nuevo pago llega por webhook a Vercel y coincide con la referencia de la pantalla, importe y PaymentIntent. |
| Devolución completa | Dos pagos de 100 EUR devueltos en el sandbox; refund succeeded, registro actualizado a refunded y pantalla «Prueba devuelta». Se conserva el registro del pago original. |
| Compra móvil | Entrada por CTA inferior, checkout de tarjeta, pago con 4242, regreso a confirmación y devolución. |
| Vista adaptable | Página sin desbordamientos en 320, 390, 768 y 1440 px. Botones de compra de al menos 62,8 px de alto; imágenes cargadas. |
| Resultados | Capturas de confirmación en móvil/escritorio y devolución en móvil revisadas; texto principal móvil de 18 px. |

Rechazo de tarjeta, abandono y recuperación ya comprobados en E17. Firma inválida,
repetición y concurrencia comprobadas en E18. Se conserva el mismo código y el
mismo despliegue de SKI-51; no fue necesario corregir ni republicar la aplicación.
Las 21 pruebas automatizadas de ese paso siguen siendo la base técnica, sin
presentarlas como una ejecución nueva de esta matriz.

## Referencias de estas pruebas

| Dato | Compra con 3DS | Compra desde vista móvil |
| --- | --- | --- |
| Compra | NW-60E20C9B | NW-F9F117C9 |
| PaymentIntent | pi_3UG3LdRrJS0VSqzs0JzNNa2f | pi_3UG3R2RrJS0VSqzs0PeXc4bY |
| Evento de pago | evt_1UG3O1RrJS0VSqzsjO4Tasle | evt_1UG3R3RrJS0VSqzs1UPYAxIm |
| Devolución | re_3UG3LdRrJS0VSqzs0EAY0YAZ | re_3UG3R2RrJS0VSqzs0V4KOezp |
| Importe | 100 EUR ficticios, devueltos íntegros | 100 EUR ficticios, devueltos íntegros |

## Capturas revisadas

- [Página completa en escritorio](../evidencias/2026-09-15_pruebas/landing-desktop.png).
- [Página completa en móvil](../evidencias/2026-09-15_pruebas/landing-mobile.png).
- [Checkout móvil](../evidencias/2026-09-15_pruebas/checkout-mobile.png).
- [Confirmación móvil](../evidencias/2026-09-15_pruebas/paid-mobile.png).
- [Confirmación escritorio](../evidencias/2026-09-15_pruebas/paid-desktop.png).
- [Devolución móvil](../evidencias/2026-09-15_pruebas/refunded-mobile.png).

## Incidencias y límites

- **QA52-01, resuelta:** falla la captura del navegador integrado. Capturas obtenidas
  con Agent Browser en una sesión independiente de Chromium.
- **QA52-02, resuelta:** se esperaba cargar el logo del pie antes de entrar en
  pantalla. La comprobación ahora desplaza la vista y espera su carga diferida.
- **QA52-03, observación no bloqueante:** el botón de Apple Pay aparece recortado
  en una captura y ausente en [otra revisión](../evidencias/2026-09-15_pruebas/checkout-mobile-review.png)
  del navegador automatizado. Causa sin determinar. El formulario de tarjeta funciona;
  Apple Pay y Link no se han validado como métodos de pago. Si se habilitan en el
  servicio real, comprobarlos en dispositivos compatibles durante SKI-77.
- Los anchos móviles se han probado en Chromium; no equivalen a un teléfono
  físico ni a una prueba de Safari. Los pagos son ficticios y no inician servicios.

## Repetir las comprobaciones

Usar la [URL pública](https://epi10-nutriwell-demo.vercel.app), iniciar una prueba
y pagar con una tarjeta de test. Para 3DS: **4000 0000 0000 3220**, fecha futura y
CVC de tres cifras. El simulador permite Fail o Complete. Tras una devolución,
actualizar `/compra` para consultar el estado vigente. «Iniciar otra prueba»
prepara una compra nueva; volver al CTA de una compra pagada recupera su resultado.
[Tarjetas de prueba oficiales](https://docs.stripe.com/testing#test-3d-secure-authentication).

Las devoluciones se realizaron por API, con verificación previa de cuenta, importe,
modo y estado, y clave de idempotencia por pago. [API de devoluciones](https://docs.stripe.com/api/refunds/create).
Script y comprobaciones reproducibles: `05_scratch/stripe-pruebas/check-payment.mjs`
y `responsive.py`; los secretos se leen del entorno local, nunca de esta guía.

**Siguiente:** preparar guion, recorrido de presentación y preguntas para Carmen
(SKI-53). El feedback y la aprobación externa solo se registran cuando ocurran.
