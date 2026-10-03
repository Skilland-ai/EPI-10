# Pantalla de entrada al mockup Stripe

**Actualización SKI-50:** los botones de Vercel usan Checkout Sessions creadas
por el servidor y una confirmación propia verificada. Pago, abandono y reintento
ya probados. [Recorrido vigente](confirmacion_recuperacion.md). Los registros
anteriores de esta página conservan el estado de su momento.


**Publicada en Vercel con acceso público el 2026-09-15 · SKI-37**

Estado de despliegue: `READY`. [Evidencia E16](../evidencias/2026-09-15_vercel_publicacion.json).
La revisión anterior de legibilidad consta en [E15](../evidencias/2026-09-15_pantalla_publica_legibilidad.json).
La [publicación privada inicial E14](../evidencias/2026-09-15_pantalla_demo_publicada.json) se conserva como historial.

[Vista de NutriWell](https://epi10-nutriwell-demo.vercel.app) ·
[Módulo](../README.md) · [Implementación](../app/README.md)

## Alcance acordado

Raúl aclara que la web definitiva corresponde a otro proveedor. Esta pantalla
sirve para presentar a Carmen el mockup y el hito de la pasarela de pago. No
sustituye la web comercial ni su proceso de diseño. La revisión de Carmen sigue
en SKI-74 y la réplica en su cuenta EPI10, en SKI-77.

## Qué contiene

- Portada editorial «Tu biología. Tu próximo capítulo.», fotografía protagonista
  y logos actualizados EPI10.
- Cinco inclusiones: test, cuestionario, informe, plan y sesión profesional.
- Experiencia del servicio en tres pasos, claramente separada del alcance de demo.
- Dos botones que crean o recuperan el checkout de la misma compra; precio ficticio de 100 EUR,
  pago único, una unidad y avisos de demostración.
- Preguntas desplegables sobre la prueba y el carácter provisional de la oferta.
- Navegación por anclas, foco visible, controles HTML nativos y estilos para móvil.
- Metadatos y tarjeta social específicos, con instrucciones de no indexación.

## Diseño y recursos

Marfil #F8F5EF, azul EPI10 #044799 y azul acuático #082F49. DM Sans para texto y
Instrument Serif para los acentos editoriales. Fotografía del folleto original,
encuadrada con CSS; logo azul actualizado sin recrearlo. La tarjeta social es
una adaptación derivada con IA, preparada por un subagente limitado a esa imagen.

El recurso y su prompt están en `05_scratch/stripe-pantalla/social/`; la tarjeta
usada vive en `app/public/og.png`. El propietario del sitio mantiene toda la
implementación. El subagente no accedió a Sites ni modificó sus fuentes.

## Validación de la publicación inicial

- Primera vista compilada y abierta tras HTTP 200; pestaña continua para la demo.
- Build final de despliegue correcto y comprobación TypeScript correcta.
- HTML servido: dos enlaces al checkout esperado, destinos de anclas existentes,
  imágenes locales con texto alternativo, título y metadatos sociales correctos.
- Revisión de código: no formularios, secretos Stripe ni recogida de datos;
  enlaces y desplegables nativos, foco y movimiento reducido, CSS responsive.
- No se realizaron capturas, inspección DOM ni interacción de prueba en el
  navegador de la página. La revisión visual de escritorio/móvil y el recorrido
  completo permanecen en SKI-52. No se ha ejecutado un pago en este paso.

Evidencia: `05_scratch/stripe-pantalla/primer-preview.json`, `qa-ssr.json` y
registro de publicación. La tarjeta social sí se inspeccionó visualmente.

## Entrega técnica y continuidad

Implementación en `app/`, con su propio repositorio de publicación. Se creó un
repositorio Git solo dentro de ese directorio; no se hizo un commit del repo padre.
El paquete de publicación contiene el build, no los materiales privados del repo.
Las credenciales temporales de publicación se usaron en memoria, sin guardarlas.

La publicación inicial fue privada. Raúl solicitó después acceso público para
compartir con Carmen. Desde las 18:47:50 UTC cualquiera con el enlace puede abrir
la página; no requiere invitación ni inicio de sesión. Se verificó HTTP 200 sin
cookies ni autorización. El contenido sigue marcado como demo y no indexable.

El proveedor puede tomar como referencia el contenido y los puntos de entrada
al checkout. Recuperación, correlación entre compras y eventos se implementan
por separado en SKI-50/51. La revisión final y el guion permanecen en SKI-52/53.

## Revisión de legibilidad y compra — 18:48:20 UTC

- Texto principal de 18 px, secundario de 16 px y etiquetas de al menos 14 px;
  tamaños en rem para respetar el tamaño base del lector.
- Precio en una fila propia, condiciones legibles y CTA «Probar compra» centrado,
  de 64 px de alto, con flecha separada y sin repetir el precio en el botón.
- Tarjeta en una columna hasta 1000 px; título ajustado para móviles estrechos.
- Comprobación de DOM y geometría a 320, 390, 768, 1024 y 1440 px: sin
  desbordamiento horizontal ni textos fuera de pantalla; mínimo medido 14 px.
- Botón inferior probado desde la URL pública: abre el checkout de NutriWell,
  muestra 100,00 EUR y «Entorno de prueba». Ningún dato introducido ni pago ejecutado.
- Build y TypeScript correctos. Capturas de navegador no disponibles tras dos
  intentos; no se afirma una revisión visual por imagen. La aprobación estética
  y el recorrido completo de pago siguen pendientes.

Evidencias de detalle en `05_scratch/stripe-legibilidad/`: `qa-responsive.json`,
`qa-publico.json`, `qa-navegacion.json` y `source-pushed.json`.

## Publicación en Vercel — 18:58 UTC

Raúl solicita una dirección más neutra para presentar a Carmen. La URL vigente
es https://epi10-nutriwell-demo.vercel.app. Se conserva el mismo componente, CSS,
imágenes y checkout. Next.js compila la vista para Vercel con el mismo App Router;
los metadatos sociales usan ahora el nuevo origen.

HTTP 200 anónimo, imágenes/estilos y dos enlaces correctos. Fuente y CSS
comparados por SHA256 con la versión revisada. Navegación desde el CTA inferior
al checkout de NutriWell de 100 EUR verificada. Ningún pago ejecutado.
[Procedimiento y comprobaciones de Vercel](vercel.md).
