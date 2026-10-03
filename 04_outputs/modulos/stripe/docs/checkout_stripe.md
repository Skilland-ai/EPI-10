# Checkout Stripe de NutriWell · DEMO

**Actualización SKI-50:** los botones de Vercel usan Checkout Sessions creadas
por el servidor y una confirmación propia verificada. Pago, abandono y reintento
ya probados. [Recorrido vigente](confirmacion_recuperacion.md). Los registros
anteriores de esta página conservan el estado de su momento.


**Verificado el 2026-09-15:** configuración por API y formulario en navegador.
No se han introducido datos ni completado un pago.

[Abrir checkout en español](https://buy.stripe.com/test_fZufZj1Nyg7mfNQ7BkeME00?locale=es)
· [Módulo](../README.md) · [Catálogo](catalogo_stripe.md)

## Resultado

| Dato | Valor comprobado |
| --- | --- |
| Entorno | Sandbox `acct_1UFzBqRrJS0VSqzs`, `livemode=false` |
| Integración | Payment Link alojado en Stripe |
| Enlace | `plink_1UG0GhRrJS0VSqzsQkUTzzah` |
| Producto | NutriWell · DEMO, `prod_epi10_nutriwell_demo_v1` |
| Precio | `price_1UG00zRrJS0VSqzs4Uhv6g9Q`, 100 EUR ficticios, pago único |
| Cantidad | 1; ajuste desactivado en la creación y sin selector en el formulario |
| Métodos | `card`; el formulario puede ofrecer Link o wallets de tarjeta según el navegador |
| Campos observados | Email, tarjeta, titular y país; sin teléfono, envío ni campos sanitarios |
| Impuestos automáticos / facturas / promociones | Desactivados en este enlace de demo |
| Marca | EPI10 Salud · DEMO; logo azul 01, fondo #F8F5EF y botón #044799 |
| Resultado posterior | Confirmación alojada en Stripe, configurada; pendiente verla tras pagar |

## Elección técnica

Payment Link proporciona una URL reutilizable para el botón de la futura página
y una confirmación nativa que no depende de tener esa página publicada. La
configuración del enlace y sus líneas permanece en Stripe; el navegador no
decide el precio. [Personalización oficial](https://docs.stripe.com/payment-links/customize).

Este enlace genérico permite compras independientes. Todavía no identifica una
compra de nuestra aplicación entre varios intentos, ni implementa su recuperación
o deduplicación. SKI-50 y SKI-51 deben resolver esa correlación y comprobar el
estado en Stripe antes de actuar. Si esos requisitos necesitan más control desde
servidor, se podrá pasar a Checkout Sessions conservando el catálogo. La
idempotencia de creación del enlace no equivale a evitar pagos duplicados.

## Procedimiento ejecutado

1. Consultar la cuenta del sandbox, el precio y los enlaces existentes.
2. Aplicar al sandbox el logo ya subido, el fondo marfil, el botón azul y el
   nombre visible «EPI10 Salud · DEMO». Releer los ajustes de cuenta.
3. Crear un enlace con el precio existente, cantidad 1 no ajustable, tarjeta y
   campos mínimos. Añadir aviso de prueba y confirmación nativa. Se reutiliza
   un enlace existente identificado con `metadata.linear_issue=SKI-49`.
4. Releer enlace y líneas: 17 comprobaciones API correctas. Registrar configuración
   y respuestas sin credenciales.
5. Abrir la URL con `?locale=es`. Comprobar texto en español, importe, producto,
   banner de pruebas, carga y proporciones del logo, colores y campos visibles.
6. Consultar la sesión abierta: 100 EUR, pruebas, `unpaid`. No rellenar ni pagar
   durante esta verificación de configuración.

El [script de preparación](../scripts/prepare_checkout.py) usa Python 3 y el CLI
autorizado 1.50.11, fijando el contexto del sandbox. Requiere el catálogo y los
ajustes de marca anteriores; crea o reutiliza el enlace y guarda evidencia API.
Su reejecución exige volver a comprobar el navegador: deja `browser_verified=false`
hasta efectuar esa revisión. No ejecuta pagos ni altera una cuenta productiva.

## Textos aplicados

Antes del botón:

> Demostración de EPI10 Salud. Usa únicamente datos de prueba. No se realiza
> ningún cobro real ni se contrata el servicio.

Confirmación configurada:

> Pago de prueba completado. Has completado la compra de demostración de NutriWell.
> No se ha realizado ningún cobro real ni contratado el servicio.

Esta confirmación no promete emails, kits ni altas en otras aplicaciones.
[Opciones posteriores al pago](https://docs.stripe.com/payment-links/post-payment).

## Evidencia y límites

- [Configuración reutilizable](../config/checkout_demo.json).
- [E08: respuestas de API y comprobaciones](../evidencias/2026-09-15_checkout_api.json).
- [E09: DOM renderizado y estilos calculados](../evidencias/2026-09-15_checkout_navegador.json).
- Sesión abierta, filtrada: `05_scratch/stripe-checkout/opened_sessions.json`.
- La captura de pantalla no estuvo disponible; E09 acredita DOM, carga de
  imágenes y estilos, no una revisión de píxeles ni del diseño móvil.
- Pago, rechazo, abandono, reintento, duplicados, devolución y webhooks siguen
  pendientes en la [matriz de pruebas](pruebas.md). La página de producto es SKI-37.
- Oferta/precio comerciales, fiscalidad, cuenta productiva y validación de Carmen:
  pendientes. Los ajustes de este enlace solo describen la demo.

Referencias de API: [crear Payment Link](https://docs.stripe.com/api/payment-link/create)
y [actualizar marca de cuenta](https://docs.stripe.com/api/accounts/update).

## Refinamiento de texto e imagen

Raúl revisa el checkout y pide mejorar el texto y sustituir el logo grande por
una imagen de NutriWell, dejando la página para el siguiente paso.

- **Descripción aplicada:** Conoce tu biología y cuida tus hábitos. Incluye test
  genético, cuestionario, informe personalizado, plan de acción y sesión profesional.
- **Formato observado:** la descripción se presenta en un único `div` con
  `white-space: normal`; los saltos de línea de texto no forman una lista.
  Se elige copy breve. Listas y jerarquía de contenidos se diseñarán en la página.
- **Imagen de producto:** [portada original del folleto NutriWell](../assets/nutriwell-portada-brochure.jpg),
  extraída de la página 1; [procedencia](../assets/README.md). Archivo Stripe
  `file_1UG0ZDRrJS0VSqzs4VzU5LOj`. No se modifica el logo de marca de la cuenta.
- **Publicación de la imagen:** archivo de marca del sandbox con propósito API
  `business_logo`, enlace público asociado a `product.images[0]`. Este propósito
  del archivo no lo asigna automáticamente al logo de cabecera. La cuenta conserva
  `file_1UG02ERrJS0VSqzs5X1MupI8` como `settings.branding.logo`.
- **Verificación:** API confirma texto/imagen y precio original; DOM muestra el
  texto, portada cargada de 212 × 300 px y logo de cabecera de 79 × 28 px. Ambos
  conservan proporciones. El banner de pruebas y aviso junto al botón permanecen.
- **Límite:** no se obtuvo captura automática; la descarga de la portada se
  revisó visualmente y el checkout por DOM/estilos. No se introdujeron datos ni pagó.

[E10: verificación API](../evidencias/2026-09-15_checkout_refinamiento_api.json) ·
[E11: comprobación de navegador](../evidencias/2026-09-15_checkout_refinamiento_navegador.json).
Las evidencias E07–E09 conservan la presentación inicial del catálogo/checkout.

## Imagen más ancha y legible

Raúl pide ampliar la portada y aprovechar el espacio lateral. El DOM del checkout
establece `max-width: 300px` y `max-height: 300px` para la imagen. La portada
vertical ocupaba 212 × 300 px aunque la columna tiene 380 px. No hay un ajuste de
tamaño de producto expuesto en la personalización documentada del checkout alojado.

Se prepara una [versión cuadrada](../assets/nutriwell-portada-cuadrada-v2.jpg) con
el editor de imágenes integrado, derivada de la portada: retrato más cercano,
título NutriWell y descriptor grandes. Se elimina microtexto. Es una adaptación
con IA, no una extracción literal ni una ampliación proporcional de toda la portada.
[Original, PNG y prompt](../assets/README.md).

**Resultado comprobado:** 300 × 300 px, un 41,5 % más de ancho que antes, sin
modificar el logo de cabecera. La imagen carga, conserva proporciones y el precio,
copy y avisos de prueba se mantienen. Archivo Stripe `file_1UG0kdRrJS0VSqzsppDdZm7t`.
API y DOM verificados; sin pago ejecutado. La altura sigue siendo 300 px. Para
ocupar un área mayor se necesitará la página propia, que permanece pendiente.

[E12: API](../evidencias/2026-09-15_checkout_imagen_ampliada_api.json) ·
[E13: medidas antes/después](../evidencias/2026-09-15_checkout_imagen_ampliada_navegador.json).
La imagen generada y su versión descargada se revisan a tamaño de presentación;
la captura automática del checkout sigue sin estar disponible.

Referencia: [opciones de apariencia de Stripe](https://docs.stripe.com/payments/checkout/customization/appearance).
