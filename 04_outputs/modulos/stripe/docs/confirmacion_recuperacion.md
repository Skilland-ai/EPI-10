# Confirmación y recuperación — NutriWell

Implementado el **2026-09-15**, en el sandbox EPI10. Tarea
[SKI-50](https://linear.app/skilland/issue/SKI-50).
[Demo pública](https://epi10-nutriwell-demo.vercel.app) · [Pruebas](pruebas.md).

## Recorrido vigente

1. «Probar compra» crea o recupera una Checkout Session desde el servidor.
2. Stripe muestra NutriWell · DEMO, una unidad y **100 EUR ficticios**, con la
   misma marca e imagen del catálogo existente.
3. Tanto el regreso sin pagar como la finalización llevan a `/compra`.
4. El servidor consulta Stripe y muestra el resultado verdadero con referencia.
5. Una compra pagada vuelve a su confirmación. «Iniciar otra prueba» es la acción
   explícita que crea otra compra independiente.

El Payment Link anterior permanece como referencia independiente. Para enseñar
este recorrido se debe empezar en la página de Vercel, no en aquel enlace.

## Qué ve la persona

| Estado comprobado | Pantalla y acción |
| --- | --- |
| Compra abierta sin pagar | «Puedes continuar»; vuelve al mismo checkout |
| Tarjeta rechazada | Stripe explica el rechazo y permite cambiar la tarjeta |
| Pago confirmado | «Prueba completada», 100 EUR, referencia y siguiente paso |
| Confirmación pendiente | Esperar y comprobar de nuevo; sin otro intento automático |
| Sesión caducada sin pagar | Otro intento de la misma compra, después de consultar los anteriores |
| Devolución completa confirmada | «Prueba devuelta»; implementación preparada, prueba de devolución pendiente en SKI-52 |
| Error de consulta | «Aún no podemos confirmarlo»; nunca se presenta como éxito |
| Sin compra en este navegador | Volver a NutriWell o al navegador de origen |

La demo termina tras la confirmación. No solicita kits, crea cuentas en Healthie,
envía invitaciones ni contrata el servicio. El siguiente paso comercial se
concretará con Carmen.

## Comprobaciones implementadas

- Cookie firmada HttpOnly, Secure y SameSite=Lax; referencia estable durante 30 días.
- La URL no decide el estado ni admite un importe, precio o sesión arbitrarios.
- Validación de modo de pruebas, producto/precio, cantidad, moneda, importe,
  referencia de compra, intento, PaymentIntent y cargo pagado.
- Idempotencia al crear la sesión: los clics repetidos usan la misma clave por
  compra e intento. El botón se desactiva mientras responde el servidor.
- Consulta paginada de sesiones en Stripe para recuperar respuestas perdidas y
  no depender solo de la última cookie. Varios pagos para una compra requieren
  revisión; no se genera otra actuación de negocio.
- No hay una base de datos propia en este paso. El límite de búsqueda es 1000
  sesiones desde que empezó la compra; si se supera, se detiene la operación.
  El registro de eventos y un índice de compras corresponden a la siguiente fase.
- La creación inicial sin registro en Stripe se limita a 23 horas; después hay
  que iniciar otra prueba explícitamente. Las sesiones ya existentes se recuperan.
- Los errores no incluyen datos de cliente, respuestas Stripe ni credenciales en logs.

## Evidencia ejecutada

El 15 de septiembre se recorrió desde la URL pública:
**entrada → abandono → recuperación → rechazo → pago correcto → confirmación**.

| Referencia | Valor |
| --- | --- |
| Compra visible | `NW-D8418096` |
| Compra completa | `d8418096-9e96-49cf-a6f0-554cad32ddc3` |
| Checkout Session | `cs_test_a14oYvFfs7Av2nu5r8Ko8nmSzITwr9a0QJ7VsvteboUqTCYvXhiK7T0f1R` |
| PaymentIntent | `pi_3UG2EtRrJS0VSqzs1JKNBbyq` |
| Cargo correcto | `ch_3UG2EtRrJS0VSqzs1taKlaUI` |
| Importe / moneda / modo | `10000` céntimos / `eur` / `livemode=false` |

Stripe confirmó el rechazo `card_declined / generic_decline`, mantuvo abierta
la sesión y después confirmó `succeeded / paid` en esa misma compra.
Diez pruebas automatizadas de estados y recuperación correctas; build y
TypeScript correctos. Geometría del resultado revisada en 320, 390, 768 y 1440 px.
Evidencia detallada en `05_scratch/stripe-confirmacion/`.

La firma y repetición se verificaron después en [SKI-51](webhook_stripe.md).
Devolución, autenticación 3DS y capturas visuales se completaron después en
[SKI-52](validacion_demo.md), con los límites de dispositivos allí indicados.

## Acceso y reproducción técnica

- SDK de servidor: `stripe@22.6.2`; clave de aplicación del sandbox aportada por Raúl.
- Clave y secreto de cookie en `.env.local` ignorado por Git, permisos 0600;
  variables sensibles de servidor en Vercel. No forman parte de este documento.
- El CLI continúa disponible para operar el sandbox. La aplicación no depende
  de que la terminal permanezca abierta ni de su token de sesión temporal.
- Código: `app/lib/purchase.ts`, `app/lib/order.ts`, `app/app/actions/purchase.ts`,
  `app/app/compra/page.tsx` y `app/proxy.ts`.

Desde `04_outputs/modulos/stripe/app/`:

```sh
node --experimental-strip-types --test tests/purchase.test.mjs
npm run build:vercel
```

Referencias: [Checkout Sessions](https://docs.stripe.com/api/checkout/sessions/create),
[consulta de sesión](https://docs.stripe.com/api/checkout/sessions/retrieve),
[tarjetas oficiales de prueba](https://docs.stripe.com/testing).
