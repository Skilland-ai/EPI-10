# Notificaciones de Stripe y registro de pagos

Implementación de **SKI-51**, 15 de septiembre de 2026.
[Módulo](../README.md) · [Matriz de pruebas](pruebas.md) ·
[Configuración reproducible](../config/webhook_demo.json).

## Resultado

Stripe envía la notificación a la aplicación de Vercel. El receptor comprueba
su firma, consulta el estado de la compra y guarda un registro persistente.
Funciona aunque el comprador cierre el navegador o no vuelva a la confirmación.
La terminal no tiene que permanecer abierta.

La actuación de esta demo es **registrar el pago una vez por compra**. No crea
clientes ni casos en Healthie/Odoo, envía invitaciones o solicita kits.

## Configuración

| Elemento | Valor |
| --- | --- |
| Sandbox | `acct_1UFzBqRrJS0VSqzs` |
| Receptor | `https://epi10-nutriwell-demo.vercel.app/api/webhooks/stripe` |
| Endpoint Stripe | `we_1UG2wvRrJS0VSqzsL52DmF4u` |
| API de eventos | `2026-08-26.dahlia` |
| Persistencia | Upstash Redis, recurso `epi10-stripe-events-demo` |
| Recurso Vercel | `store_pLsMKu4pJymUMifN` |
| Plan y región | Free, `iad1`; provisionado con autoUpgrade=false y eviction=false |
| Registro | Hash privado `epi10:stripe:sandbox:v1`, sin caducidad automática |

La integración se creó desde el Marketplace de Vercel y se conectó al entorno
de producción de la **web de demo**. Los pagos siguen siendo exclusivamente
de pruebas. SDK `@upstash/redis@1.38.4`.

Variables de servidor: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`KV_REST_API_URL`, `KV_REST_API_TOKEN` y `DEMO_COOKIE_SECRET`. No llevan prefijo
NEXT_PUBLIC. Sus valores están en el entorno de Vercel y en archivos locales
ignorados por Git; no forman parte de esta documentación.

## Eventos seleccionados

| Evento | Tratamiento |
| --- | --- |
| `checkout.session.completed` | Consultar la compra; registrar cobro solo si sesión, PaymentIntent y cargo confirman 100 EUR |
| `checkout.session.async_payment_succeeded` | La misma comprobación, para un posible pago diferido |
| `checkout.session.async_payment_failed` | Registrar fallo sin actuar como compra cobrada |
| `checkout.session.expired` | Registrar caducidad sin activar una compra |
| `charge.refunded` | Localizar la sesión del pago y verificar su devolución completa; no generar otra actuación de compra |

La demo admite tarjeta. Los estados diferidos están cubiertos en pruebas
automatizadas, no mediante un método de pago diferido real. La devolución real
del sandbox sigue pendiente en SKI-52; su manejo de estado está preparado.
Las devoluciones parciales requieren revisión y no se presentan como completas.

## Firma, persistencia y duplicados

1. Leer el cuerpo original y comprobar `Stripe-Signature` con el secreto del
   endpoint. Firma ausente, incorrecta, caducada o cuerpo alterado: HTTP 400.
2. Exigir modo de pruebas y contexto de cuenta correcto. Los tipos no admitidos
   se ignoran; los checkouts ajenos se registran como ignorados, sin una compra.
3. Consultar Stripe y validar referencia, producto/precio, cantidad, EUR,
   importe, PaymentIntent y cargo. Un evento de checkout completado por sí solo
   no demuestra que el pago esté cobrado.
4. Ejecutar la decisión y escritura juntas en Redis mediante Lua y un único
   HSET. Así no queda un evento marcado como terminado antes de su registro.
5. Responder HTTP 200 después de guardar. Si Stripe o el almacén fallan,
   responder HTTP 503 para permitir reintento.

Se conservan cuatro clases de registros, con referencias técnicas y estados:

- `event:<evt_id>`: tipo, fecha, resultado y contador de entregas.
- `order:<order_id>`: estado, importe, moneda y pago asociado.
- `payment:<pi_id>`: estado del pago y enlace a compra/sesión.
- `effect:<order_id>`: único registro `demo.payment_recorded` de esa compra.

Repetir un evento incrementa su contador, sin crear otra actuación. Otro evento
del mismo pago tampoco la duplica. Un segundo pago distinto de la misma compra
queda identificado como `duplicate_payment` y requiere revisión. Los avisos
antiguos no degradan un pago confirmado o devuelto a pendiente.

No se guardan cuerpos completos, emails, nombres, tarjetas ni datos sanitarios.
El registro no tiene una ruta pública de lectura: GET al receptor devuelve 405.
La firma se comprueba antes de consultar Stripe o escribir en el registro.

## Comprobación ejecutada

Se reenvió desde Stripe el evento del pago de SKI-50, sin realizar otro cobro:

| Referencia | Valor |
| --- | --- |
| Evento | `evt_1UG2FgRrJS0VSqzseygOV73y` |
| Compra visible | `NW-D8418096` |
| Sesión | `cs_test_a14oYvFfs7Av2nu5r8Ko8nmSzITwr9a0QJ7VsvteboUqTCYvXhiK7T0f1R` |
| Pago | `pi_3UG2EtRrJS0VSqzs1JKNBbyq` |
| Resultado | 100 EUR ficticios, una compra, un pago y una actuación registrada |

- Primera entrega real: HTTP 200 y `payment_recorded`, contador 1.
- Segunda entrega real de Stripe: contador 2, mismo registro de negocio.
- Dos pruebas HTTP adicionales firmadas localmente con ese evento (una por
  despliegue): `duplicate_event`, sin otra actuación; se distinguen de las dos
  entregas originadas por Stripe. Contador final: 4, un registro de negocio.
- Cuatro firmas inválidas: HTTP 400 y registro íntegro sin cambios.
- 21 pruebas automatizadas correctas, incluidas dos contra Redis real con
  claves de QA aisladas. Se probaron seis entregas simultáneas, dos eventos
  distintos del mismo pago, un segundo pago y estados que llegan desordenados.
- Las pruebas sintéticas no generan pagos en Stripe ni actúan en sistemas externos.

Detalle en `05_scratch/stripe-webhook/`; evidencia E18 en el índice del módulo.

## Reproducir y consultar

Desde `04_outputs/modulos/stripe/app/`, con `.env.local` configurado:

```sh
# Pruebas de compra, firma y almacén; las claves aisladas de QA se limpian al terminar.
node --env-file=.env.local --experimental-strip-types --test tests/*.test.mjs

# Leer referencias y resultados del registro privado.
node --env-file=.env.local --experimental-strip-types scripts/read-stripe-ledger.mjs

# Comprobar el endpoint existente. --create lo crea solo si falta.
node --env-file=.env.local --experimental-strip-types scripts/configure-webhook.mjs

# Pedir a Stripe que vuelva a entregar el evento real al endpoint registrado.
npx --yes @stripe/cli@1.50.11 events resend evt_1UG2FgRrJS0VSqzseygOV73y --webhook-endpoint we_1UG2wvRrJS0VSqzsL52DmF4u --confirm

# Pruebas HTTP de firma y repetición; no crean otro pago.
node --env-file=.env.local --experimental-strip-types scripts/verify-webhook.mjs evt_1UG2FgRrJS0VSqzseygOV73y
```

El reenvío incrementa el contador de entregas. Para otra cuenta deben cambiarse
los IDs, claves, destino y secreto de firma, y repetirse las pruebas.
La integración real con sistemas externos necesitará su propio procesamiento
fiable; el registro simulado de esta demo no acredita esas altas o entregas.

Fuentes: [webhooks de Stripe](https://docs.stripe.com/webhooks),
[configuración del endpoint](https://docs.stripe.com/api/webhook_endpoints/create),
[persistencia de Upstash](https://upstash.com/docs/redis/features/durability) y
[ejecución Lua](https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval).

## Validación posterior — SKI-52

Dos pagos nuevos han generado sus notificaciones automáticas y se han devuelto
íntegramente. Los eventos charge.refunded actualizan compra/pago a refunded y
conservan la actuación original. Confirmación, registro y Stripe coinciden.
La devolución real del sandbox ya está comprobada; [E19 y detalle](validacion_demo.md).
