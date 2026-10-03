# Speedrun — demo Stripe para Carmen

Preparado el 2026-09-15. Objetivo de presentación: **2026-09-16**.
Estado: acceso verificado y catálogo con producto, precio e imagen creado.
Checkout y pantalla publicados en Vercel; pago, rechazo, abandono y recuperación
verificados. Receptor de eventos, firma y repetición también comprobados.
Matriz de tarjeta, 3DS, doble intento y devolución comprobada, con capturas.
Siguiente: guion de presentación.

[Módulo Stripe](../README.md) · [Bitácora](bitacora.md) · [Pruebas](pruebas.md)

## Resultado que queremos enseñar

Una persona conoce la oferta de EPI10, pulsa el botón de contratación, completa
un pago de prueba en Stripe y recibe una confirmación comprensible. El equipo
encuentra el pago y sus referencias en el Dashboard. Se puede repetir la demo
y mostrar un rechazo con recuperación sin mover dinero real.

Recorrido: **página de producto EPI10 → checkout de Stripe → confirmación →
comprobación del pago en el panel**.

## Base de marca y producto

Propuesta para esta demo, pendiente de validación comercial con Carmen:

- Marca: EPI10 Salud; [logos actualizados aportados por Raúl](marca.md):
  logotipo completo azul sobre claro y blanco sobre oscuro.
- Producto: **NutriWell · DEMO**, nombre provisional usado en los documentos de
  marca. Sustituye la etiqueta genérica propuesta al empezar, para representar
  la oferta real en la presentación; ya creado en el catálogo de pruebas.
- Precio: **100 EUR ficticios**, pago único y una unidad.
- Oferta que explicaremos: test genético integral, cuestionario de hábitos y
  contexto, informe personalizado, plan de acción y sesión de interpretación
  profesional. No presentarlo como test epigenético ni prometer diagnósticos.
- Dirección visual: azul de logo #044799, cian, marfil cálido, logos actualizados y
  fotografía editorial humana. Elegir una imagen existente adecuada del repo
  o preparar una visual de producto coherente si no la hay.
- La indicación de demo y precio de prueba debe ser visible sin dificultar
  la lectura del producto.

Fuentes locales:

- [Brand canon](../../../../02_context/EPI10-branding/EPI10-Phase-2-Brand-Canon-v1.md).
- [Brand essentials](../../../../02_context/EPI10-branding/EPI10-Claude-Design-System-v2-creative-reset-ready/EPI10-Claude-Design-System-v2-creative/UPLOAD-ONLY-THESE/EPI10-BRAND-ESSENTIALS.md).
- [Inventario y aplicación de los nuevos logos](marca.md), prioritarios para
  la demo frente al logo del paquete anterior.

## Orden de ejecución

| Paso | Trabajo | Salida / comprobación |
| --- | --- | --- |
| 0 · Acceso | Entrar al Dashboard en el entorno de pruebas. | **Verificado** por captura y CLI; contexto documentado en [acceso](acceso_stripe.md). |
| 1 · Oferta y recursos | Preparar nombre, descripción breve, inclusiones, logo, imagen y precio ficticio. | [Ficha preparada](producto_demo.md): textos, cinco inclusiones, logo como imagen inicial de catálogo y reglas de compra. Fotografía editorial en paso 5. |
| 2 · Acceso de trabajo | Elegir la vía operativa para configurar el mockup: Dashboard del usuario y, si hace falta para la integración, autenticar el CLI en esa misma cuenta de pruebas. | **Hecho — SKI-28:** CLI autorizado y cuatro consultas API correctas. Credenciales fuera del chat y documentación. |
| 3 · Catálogo | Crear producto, precio de 100 EUR, pago único y cantidad fija; registrar IDs públicos. | **Hecho — SKI-48:** producto y precio de pruebas con logo; [IDs y evidencia](catalogo_stripe.md). Cantidad fija aplicada después en SKI-49. |
| 4 · Checkout | Configurar checkout alojado en Stripe, con nombre, descripción, logo, colores y campos mínimos. Empezar por Payment Link si cubre el recorrido; usar Checkout Sessions si necesitamos controlar retornos y referencias desde la página. | **Hecho — SKI-49:** Payment Link, cantidad 1, tarjeta, logo y colores; [enlace y evidencia](checkout_stripe.md). Confirmación nativa configurada, aún sin pagar. |
| 5 · Pantalla de entrada | Maquetar una vista de demo con marca, imagen, cinco inclusiones, experiencia y CTA al pago; la web definitiva corresponde al otro proveedor. | Implementada; [alcance, URL y validación](pantalla_demo.md). Publicada con acceso público en Vercel; revisión visual móvil y recorrido completo en SKI-52. |
| 6 · Resultado y recuperación | Preparar confirmación y siguiente paso, errores y forma de volver/reintentar. Usar las superficies nativas de Stripe cuando cubran el caso; crear páginas propias donde sea necesario. | **Hecho — SKI-50:** resultado verificado en servidor, referencia, abandono y reintento de la misma compra; [evidencia](confirmacion_recuperacion.md). |
| 7 · Evidencia técnica | Recibir la notificación del pago, verificar firma y guardar referencias sin duplicar la actuación. | **Hecho — SKI-51:** dos entregas reales de Stripe, un registro persistente; firmas inválidas rechazadas. [Procedimiento y evidencia](webhook_stripe.md). |
| 8 · Pruebas | Ejecutar compra correcta, rechazo, reintento, abandono, doble intento, repetición, devolución, 3DS y revisión móvil. | **Hecho — SKI-52:** [validación y capturas](validacion_demo.md). Recorrido con tarjeta operativo; observación no bloqueante de Apple Pay en navegador automatizado. |
| 9 · Enlace y replay | Dejar la demo accesible desde el navegador de presentación y repetir el recorrido completo con la URL final. | Enlace estable, acceso comprobado y pago de prueba verificable desde el Dashboard. |
| 10 · Paquete para Carmen | Preparar guion de 3–5 minutos, capturas de respaldo, datos ficticios de prueba y preguntas de validación. Actualizar guía y bitácora. | Demo presentable y documentación reutilizable; la presentación/aprobación se registra cuando ocurra. |

Linear ya refleja el [desglose concreto](linear_speedrun.md): nueve tareas de
demo, feedback con Carmen y réplica/entrega en EPI10, con facturación como
subtarea. La demo tiene objetivo 15 de septiembre y el feedback el 16. Los estados
remotos se actualizan después de comprobar cada resultado; SKI-28 ya está Done.

## Criterio de «lista para mañana»

- [x] Nombre, imagen, inclusiones y precio coinciden entre página y checkout.
- [x] Se puede abrir el enlace final desde el navegador previsto para la demo.
- [x] Pago de prueba completado y comprobado en Stripe.
- [x] Confirmación con siguiente paso claro, sin afirmar que se enviaron
  invitaciones o mensajes que todavía no se han implementado.
- [x] Rechazo y reintento reproducibles; abandono no se confunde con pago.
- [x] Doble intento y repetición de evento comprobados y documentados.
- [x] Devolución de prueba comprobada.
- [x] Verificación de firma y deduplicación comprobadas en el receptor publicado.
- [x] Vista móvil, textos y logo revisados en Chromium; límites de wallets documentados.
- [ ] Guion, capturas de respaldo y documentación actualizados.

## Demostración propuesta

1. Presentar NutriWell y qué incluye.
2. Iniciar la contratación y mostrar la continuidad de marca en Stripe.
3. Completar un pago con tarjeta de prueba.
4. Enseñar la confirmación y explicar el siguiente paso previsto del servicio.
5. Mostrar el pago en el panel de EPI10 Salud y, si está verificado, el evento.
6. Mostrar un rechazo con reintento o sus capturas de respaldo.
7. Preguntar a Carmen por nombre, oferta, importe definitivo, datos necesarios
   en compra, copy de confirmación y encaje del siguiente paso.

## Acuerdos aún por cerrar

La configuración completa de la cuenta EPI10 se trabaja en SKI-77; no bloquea
el cierre de la demo. Confirmación, recuperación y webhooks de prueba sí se
resuelven ahora. Ver [configuración por fases](configuracion_entornos.md).

- Precio y nombre comerciales definitivos, fiscalidad y facturación.
- Fotografía editorial y dirección final de la página; Payment Link de demo ya disponible.
- Titularidad legal y cuenta productiva; permisos de escritura por verificar
  con cada operación. Cuenta sandbox, catálogo y checkout ya comprobados.
- Texto exacto del siguiente paso: comunicar solo lo que exista realmente.
- Feedback de Carmen y entorno productivo EPI10.

## Referencias de implementación

- [Crear un Payment Link](https://docs.stripe.com/payment-links/create).
- [Confirmación y eventos después del pago](https://docs.stripe.com/payment-links/post-payment).
- [Entornos aislados de prueba](https://docs.stripe.com/sandboxes).
- [Tarjetas y escenarios de prueba](https://docs.stripe.com/testing).
- [Recepción y verificación de webhooks](https://docs.stripe.com/webhooks).

Después de cada paso: registrar acción, resultado observado, evidencia,
decisión y siguiente paso en la bitácora. Tras verificar un procedimiento,
incorporarlo a la guía cliente. Los apuntes internos no pasan automáticamente a
la guía ni a un futuro PDF con marca Skilland.
