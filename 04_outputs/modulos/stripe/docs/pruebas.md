# Stripe — matriz de pruebas

**Actualizado:** 2026-09-15 · **Ejecución:** acceso visual y CLI/API verificados;
checkout y recorrido de pago/recuperación verificados por API y navegador.

Matriz funcional con tarjeta completada en SKI-50/51/52. Guion y revisión de presentación P11 en SKI-53.
[Validación, capturas y límites](validacion_demo.md); móvil probado en viewport de Chromium.
[Volver al módulo](../README.md) · [Bitácora](bitacora.md)

## Preparación

- Dashboard «EPI10 Salud» y banner «Entorno de prueba»: observados en E06.
  CLI/API autorizado para `acct_1UFzBqRrJS0VSqzs`; cuatro lecturas correctas.
  Véase [acceso verificado](acceso_stripe.md).
- Producto, precio de 100 EUR e imagen creados y verificados: [catálogo](catalogo_stripe.md).
  [Checkout abierto y comprobado](checkout_stripe.md) y [pantalla publicada](pantalla_demo.md);
  P01 verificado al abrir el checkout desde el CTA inferior de la URL pública.
- Configuración propuesta actual: pago único ficticio de 100 EUR por
  «NutriWell · DEMO»; confirmar importe final antes de probar.
- Datos de cliente y tarjeta: exclusivamente ficticios/de prueba.
- Recuperación e idempotencia del checkout implementadas. Receptor y deduplicación
  verificados en SKI-51. [Recorrido](confirmacion_recuperacion.md) y [eventos](webhook_stripe.md).

## Casos

| ID | Acción de prueba | Resultado esperado | Estado / evidencia |
| --- | --- | --- | --- |
| P00 — Entorno | Abrir la cuenta y el sandbox de la demo | Identidad del entorno comprobada y modo de pruebas visible | PASS: Dashboard y contexto sandbox comprobados; cuenta, catálogo y eventos consultados por CLI; [evidencia](acceso_stripe.md) |
| P01 — Entrada y catálogo | Abrir la entrada de compra y revisar el checkout | Producto DEMO, EUR, pago único y total acordado; navegación operativa | PASS: URL pública y CTA inferior al checkout NutriWell de 100 EUR comprobados; E17 acredita también el resultado posterior |
| P02 — Éxito | Completar con tarjeta de prueba válida | Pago correcto con importe esperado; confirmación coherente y referencia de transacción | PASS: pago `pi_3UG2EtRrJS0VSqzs1JKNBbyq`, 100 EUR, succeeded/paid; confirmación NW-D8418096; E17 |
| P03 — Rechazo | Usar un caso de tarjeta rechazada | Error comprensible; compra sin marcar pagada y posibilidad de reintentar | PASS: card_declined / generic_decline, sesión open/unpaid; error visible en Stripe; E17 |
| P04 — Abandono | Salir antes de confirmar el pago | Sin pago correcto ni activación de servicio; regreso posible | PASS: regreso sin pagar muestra Compra pendiente y permite continuar; E17 |
| P05 — Reintento | Tras P03 o P04, completar correctamente | Un resultado correcto y trazabilidad de intentos; sin duplicar la actuación de negocio | PASS: misma sesión y PaymentIntent tras abandono/rechazo; un pago correcto y un registro de negocio al recibir sus eventos; E17/E18 |
| P06 — Doble intento | Iniciar dos intentos de la misma compra | Aplicación de la regla acordada para compras duplicadas; detectar un segundo cobro si se produce, sin duplicar el caso operativo | PASS: dos pestañas abren la misma sesión; un clic posterior al pago vuelve a su confirmación. Una sesión, un pago y una actuación; concurrencia/segundo pago sintéticos en E18, recorrido real en E19 |
| P07 — Evento de pago | Localizar el evento y comprobar su recepción | Referencia del evento enlazada a la sesión y pago; actuación solo cuando el estado del pago lo permite | PASS: entrega real de Stripe aceptada en Vercel, vinculada a NW-D8418096 y su PaymentIntent; registro persistente; E18 |
| P08 — Repetición | Entregar de nuevo el mismo evento al receptor previsto | La repetición queda registrada y no produce una segunda actuación sobre el mismo pago | PASS: dos entregas reales de Stripe, un único registro demo.payment_recorded; también concurrencia y eventos distintos del mismo pago en tests; E18 |
| P09 — Firma | En el receptor propio, probar evento válido y firma inválida | Se acepta el válido y se rechaza el inválido sin alterar el estado de negocio | PASS: firma válida HTTP 200; ausente, incorrecta, caducada y cuerpo alterado HTTP 400 sin cambios en el registro; E18 |
| P10 — Reembolso | Devolver un pago de prueba correcto | Devolución vinculada al pago, importe revisado y estado reflejado en la demo | PASS: dos devoluciones de 100 EUR ficticios succeeded; registro refunded y pantalla Prueba devuelta; E19 |
| P11 — Revisión de demo | Recorrer compra, resultado y excepción representativa | Guion reproducible, evidencias revisables y límites de demo claros | EN CURSO: ensayo técnico nuevo PASS en E20; faltan guion final, respaldo y ensayo oral para cerrar SKI-53 |
| P12 — 3DS | Fallar la autenticación y reintentar con Complete | Sin pago al fallar; misma compra pagada al completar | PASS: authentication_failure → challenge/authenticated, mismo PaymentIntent, confirmación y evento; E19 |
| P13 — Móvil y escritorio | Revisar marca, textos, botones y recorrido | Contenido legible, sin desbordamientos, pago/resultado operativos | PASS con observación QA52-03 sobre Apple Pay no validado; capturas y geometría 320/390/768/1440, compra y devolución móvil; E19 |

El receptor público verifica el cuerpo original y guarda identificadores mínimos
en Redis. No crea clientes ni casos en Healthie/Odoo. [Contrato y límites](webhook_stripe.md).

Para tarjetas, errores y devoluciones, seguir los
[casos oficiales de prueba de Stripe](https://docs.stripe.com/testing). Para
firmas, entregas repetidas y manejo de eventos, seguir la
[documentación de webhooks](https://docs.stripe.com/webhooks). Un webhook es la
notificación que Stripe envía a un receptor de la integración.

Los Payment Links generan eventos de finalización de checkout; los métodos de
pago con confirmación diferida requieren contemplar eventos adicionales. La
demo admite tarjeta; los cinco tipos seleccionados están documentados en [SKI-51](webhook_stripe.md).
[Eventos posteriores al pago](https://docs.stripe.com/payment-links/post-payment)

## Relación con Linear

| Preparación o validación | Tareas |
| --- | --- |
| Alcance, escenarios y reglas | [SKI-26](https://linear.app/skilland/issue/SKI-26) |
| Acceso y entorno | [SKI-28](https://linear.app/skilland/issue/SKI-28), Done |
| Matriz y ejecución funcional | [SKI-52](https://linear.app/skilland/issue/SKI-52) |
| Evento, firma y duplicados | [SKI-51](https://linear.app/skilland/issue/SKI-51), [SKI-52](https://linear.app/skilland/issue/SKI-52) |
| Evidencias, enlace y guion | [SKI-53](https://linear.app/skilland/issue/SKI-53) |
| Feedback y validación con Carmen | [SKI-74](https://linear.app/skilland/issue/SKI-74) |
| Réplica, prueba del entorno EPI10 y entrega | [SKI-77](https://linear.app/skilland/issue/SKI-77) |

Ver el [desglose vigente](linear_speedrun.md). Completar una prueba local no
acredita la aceptación de Carmen ni la prueba del entorno productivo de EPI10.

## Registrar una ejecución

Añadir por caso: fecha y entorno, acción exacta, resultado obtenido, aprobado/fallido,
ID no secreto de sesión/pago/evento, evidencia y siguiente acción. Conservar una
incidencia fallida aunque se repita la prueba; enlazar la repetición que la resuelve.

**Pendientes:** guion de presentación (SKI-53) y aceptación externa. Apple Pay/Link
y dispositivos físicos se validarán si forman parte del servicio real (SKI-77).

E17: [confirmación y recuperación](../evidencias/2026-09-15_confirmacion_recuperacion.json).
Detalle de ejecución en `05_scratch/stripe-confirmacion/`; diez pruebas
automatizadas correctas. No se declara terminada la matriz de SKI-52.

E18: [notificación verificada](../evidencias/2026-09-15_webhook_verificado.json).
SKI-51 añade recepción real, repetición y firmas inválidas en Vercel. La suite
completa suma 21 pruebas correctas, dos contra Redis real con claves aisladas.
Detalle en `05_scratch/stripe-webhook/`; SKI-52 permanece abierta.

## Cierre de la matriz SKI-52

E19: [pruebas funcionales y visuales](../evidencias/2026-09-15_pruebas_funcionales.json).
P06, P10, P12 y P13 comprobados. P02/P05 reforzados con dos nuevos pagos y sus
eventos automáticos; ambos pagos devueltos íntegramente. [Detalle y capturas](validacion_demo.md).
Sin cambios de código ni nueva publicación; las pruebas anteriores se conservan.
La observación QA52-03 afecta a la representación de Apple Pay en Chromium automatizado;
no bloquea el recorrido de demo con tarjeta. P11 pertenece al guion SKI-53.

## Ensayo previo — 2026-09-17

Raúl completó una nueva compra desde la demo. La CLI/SDK de servidor verificó
referencia NW-8B1611D4, Checkout Session complete/paid, PaymentIntent succeeded,
cargo pagado y `livemode=false`. El webhook llegó una vez y generó una sola
actuación `demo.payment_recorded`. URL pública HTTP 200, 21/21 tests y build
Vercel/TypeScript correctos. [E20](../evidencias/2026-09-17_ensayo_previo.json).

El pago ficticio no se ha devuelto. SKI-53 pasa a In Progress; no queda Done
hasta preparar el guion, respaldo y ensayo de 3–5 minutos.
