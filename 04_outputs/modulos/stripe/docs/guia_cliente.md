# EPI10 — guía de cobro de prueba con Stripe

**Preparado por Skilland · Versión de trabajo · 15 de septiembre de 2026**

Esta guía prepara una demostración de pago único con dinero ficticio. El acceso
al Dashboard y el entorno de pruebas ya se han observado. El catálogo de demo
y el checkout están creados y verificados. Pago, rechazo, abandono y recuperación
ya probados en el sandbox. Las elecciones de onboarding
que se indican son las recomendadas para la demo.

## 1. Preparar la cuenta y el entorno

1. Registra la cuenta en [Stripe](https://dashboard.stripe.com/register) y verifica
   el correo. Usa los datos reales del responsable de la cuenta. Para una demo
   gestionada por Skilland, conserva esa titularidad; el nombre EPI10 puede
   identificar el servicio representado.
2. Describe el propósito de la prueba. Texto orientativo:

   > Estamos preparando una demostración de cobro para EPI10 Salud, con un pago
   > único online por un servicio de bienestar personalizado. Por ahora
   > utilizaremos exclusivamente el entorno de pruebas.

3. En la selección de funciones, deja **«Aceptar pagos por Internet»** y desmarca
   **«Enviar facturas»** para este mockup.
4. En gestión de ventas internacionales, selecciona **«Elige lo que necesitas»**.
   Es la opción recomendada para la oferta descrita, que incluye test y atención
   profesional. Managed Payments exige productos digitales elegibles y excluye
   servicios con intervención humana. [Elegibilidad](https://docs.stripe.com/payments/managed-payments/eligibility)
5. Si aparecen funciones adicionales, desmarca **«Enviar facturas»** y
   **«Cobrar impuestos»** para este primer mockup. La facturación y el tratamiento
   fiscal del servicio real se concretarán por separado.
6. Cuando Stripe pregunte cómo configurarlo, elige **«Configurar desde el Dashboard»**
   y continúa hasta el panel.
7. Termina el onboarding. Desde el selector de cuenta del panel, accede a
   **Sandboxes** y abre o crea el entorno de pruebas. Comprueba su nombre y que
   estás trabajando en pruebas antes de crear productos o pagos. Un sandbox
   permite simular pagos sin mover dinero. [Sandboxes de Stripe](https://docs.stripe.com/sandboxes)

**Comprobación de esta sección:** acceso al Dashboard «EPI10 Salud» y banner
«Entorno de prueba» observados; identidad del sandbox y acceso técnico verificados.
Las opciones guardadas de onboarding todavía requieren revisión si se reutiliza
esta cuenta para otra configuración.

## 2. Preparar el cobro de demostración

Utiliza los [logos vigentes de EPI10](marca.md): versión completa azul sobre
fondos claros y blanca sobre fondos oscuros, conservando proporciones. Revisa
que la misma marca aparezca en la entrada de compra y en el checkout. Aplicación
en cabecera del checkout: logo azul verificado; fondo marfil y botón azul EPI10.
Como imagen de producto usamos una adaptación cuadrada de la portada NutriWell:
la imagen de producto puede ser distinta al logo de la cuenta. En el checkout
comprobado, Stripe limita esa imagen a 300 × 300 px. El formato cuadrado y los
textos grandes aprovechan mejor ese espacio; subir más resolución no amplía
la caja de presentación.
La continuidad con la página de demostración está comprobada. La revisión
completa de móvil y autenticación de tarjeta permanece en la matriz de pruebas.

La configuración aplicada al cobro de demo es:

| Campo | Valor de demo |
| --- | --- |
| Nombre | NutriWell · DEMO |
| Descripción | Conoce tu biología y cuida tus hábitos. Incluye test genético, cuestionario, informe personalizado, plan de acción y sesión profesional. |
| Importe | 100 EUR ficticios |
| Frecuencia | Pago único |
| Cantidad | Una unidad |

NutriWell es el nombre provisional propuesto para representar el producto EPI10.
El nombre y el precio comerciales definitivos se definirán por separado.

**Catálogo y checkout verificados:**

1. Comprueba si ya existe el producto para evitar duplicarlo. En esta demo ya
   está creado **NutriWell · DEMO**, con la portada de su folleto y precio de 100 EUR
   de pago único. Si reproduces el procedimiento en otro sandbox, crea el
   producto y su precio con los mismos valores ficticios.
   [Catálogo y configuración técnica](catalogo_stripe.md).
2. Abre la [página de NutriWell](https://epi10-nutriwell-demo.vercel.app) y pulsa
   **«Probar compra»**. El equipo técnico ha conectado la página al checkout de
   Stripe, conservando una referencia para cada compra de prueba.
3. Comprueba nombre con DEMO, cantidad de una unidad, pago único y total de
   100 EUR. Esta simulación no añade impuestos, envíos, descuentos ni facturas.
4. Revisa el logo completo azul, fondo marfil #F8F5EF y botón azul #044799.
   El formulario pide email, tarjeta, titular y país; no añadimos teléfono ni
   dirección de envío.
5. Tras pagar, regresarás a NutriWell y verás **«Prueba completada»**, el importe
   y la referencia. Esta pantalla consulta el pago en Stripe antes de confirmarlo.
6. Si sales sin pagar, verás **«Puedes continuar»**. El botón retoma la misma
   compra. Si la tarjeta se rechaza, puedes corregirla en el checkout.

El enlace de pago independiente creado al principio queda como referencia del
catálogo. Para presentar la confirmación y recuperación nuevas, empieza siempre
por la página de NutriWell. [Detalle del recorrido](confirmacion_recuperacion.md).

Para mejorar el resumen de compra, edita la descripción y la imagen del producto.
El logo de cabecera se configura por separado en la marca de la cuenta. En el
formulario comprobado, la descripción se compacta en un párrafo; usamos un texto
breve y dejamos el desarrollo por apartados para la página del producto.

**Comprobación de esta sección:** catálogo y formulario revisados; recorrido
público completo ejecutado con abandono, recuperación, rechazo y pago correcto.
La confirmación muestra la referencia de la compra y no promete correos,
invitaciones ni entrega del servicio que la demo no realiza.

## 3. Probar y revisar el resultado

Usa exclusivamente los datos de prueba publicados por Stripe. Para un pago
correcto con tarjeta puedes usar **4242 4242 4242 4242**, una fecha futura y un CVC
de tres cifras. Para probar rechazos, utiliza el caso correspondiente de la
[documentación de pruebas](https://docs.stripe.com/testing).

| Prueba | Qué revisar |
| --- | --- |
| Pago correcto | Confirmación visible y pago de 100 EUR registrado como correcto en el panel de pruebas |
| Rechazo | Mensaje comprensible y posibilidad de volver a intentarlo |
| Abandono | Salir del checkout no se muestra como una compra pagada |
| Reintento | Se puede completar después de un rechazo o abandono sin duplicar la compra |
| Doble intento | Dos intentos de la misma compra reciben el tratamiento previsto y dejan trazabilidad |
| Reembolso | El pago de prueba muestra la devolución y su importe en el panel |

Para revisar o devolver un pago de Payment Link, localízalo en la sección de pagos
del mismo sandbox. Abre sus detalles y, para la devolución de prueba, utiliza la
opción de reembolso. [Gestión posterior al pago](https://docs.stripe.com/payment-links/post-payment)

La notificación del pago ya se ha verificado: la aplicación comprueba su origen
y conserva un registro. Recibir dos veces la misma notificación deja un único
registro de compra cobrada. La confirmación que ve el comprador y el registro
del pago deben contar la misma historia.

**Estado de validación:** pago, rechazo, abandono y recuperación comprobados.
También están comprobadas las notificaciones, repetición, doble intento,
devolución y 3DS. La vista móvil se ha revisado en Chromium. La demo validada usa
tarjeta; Apple Pay y Link requieren sus propias pruebas si se incluyen. Antes de usar la
cuenta productiva de EPI10 se concretarán su titularidad, catálogo, precio,
configuración fiscal y aceptación del recorrido.

## Pantalla para presentar la demostración

La [vista NutriWell](https://epi10-nutriwell-demo.vercel.app) explica
la propuesta y ofrece dos accesos al checkout. Es una pantalla de presentación
de la pasarela; la web definitiva corresponde al proveedor del cliente.
El precio indicado es ficticio y no inicia la prestación del servicio.

Acceso público: Carmen puede abrir el enlace sin iniciar sesión. El botón
«Probar compra» abre el checkout de NutriWell por 100 EUR ficticios; la navegación
ya está comprobada, incluido el regreso tras pagar o abandonar. Puedes usar
«Iniciar otra prueba» después de completar una compra para repetir la demostración.

## Preparar la cuenta propia de EPI10

El cierre de la demo no exige terminar todos los ajustes administrativos de
Stripe. Antes del cobro real se prepara la cuenta EPI10, su operativa y la
configuración aprobada en SKI-77. [Configuración por fases y responsables](configuracion_entornos.md).
