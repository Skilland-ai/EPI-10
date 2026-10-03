# Imagen de producto NutriWell

## Versión vigente: cuadrada para el checkout

- [JPEG publicado](nutriwell-portada-cuadrada-v2.jpg), 1254 × 1254 px.
- [PNG generado](nutriwell-portada-cuadrada-v2.png) y [prompt exacto](nutriwell-portada-cuadrada-v2.prompt.txt).
- Adaptación con el editor de imágenes integrado (`image_gen`), usando la portada
  original como referencia. Es una composición derivada con IA; no se afirma
  identidad de píxeles con la fotografía original. JPEG exportado para Stripe.
- Se conserva la dirección visual del folleto, con retrato, azul/cian, título
  NutriWell y descriptor grandes. Se elimina microtexto para facilitar la lectura.
- La cabecera del checkout sigue usando el logo nuevo azul 01 por separado.
- La imagen anterior medía 212 × 300 px en pantalla. Stripe fija un máximo
  de 300 × 300 px: el formato cuadrado aprovecha ese espacio.

## Fuente y versión anterior

[Portada extraída](nutriwell-portada-brochure.jpg), JPEG 1055 × 1491 px.

- Fuente: primera página del [folleto NutriWell aportado al repo](../../../../02_context/EPI10-branding/Ejemplo-Brochure-Informe-Epigenetico-EPI10-Salud.pdf).
- Extracción con `pdfimages -f 1 -l 1 -j`; sin recrear, recortar ni editar la composición.
- Uso solicitado por Raúl: sustituir el logo grande de la imagen de producto en
  el checkout. El logo pequeño de cabecera conserva el activo nuevo azul 01.
- Es una portada comercial de ejemplo, sin resultados individuales ni datos de pacientes.
- Stripe sirve una versión JPEG recodificada; conserva 1055 × 1491 px. Descarga
  revisada visualmente. No se afirma identidad de píxeles tras la compresión.
- Registro técnico y evidencia en [checkout](../docs/checkout_stripe.md#refinamiento-de-texto-e-imagen).
