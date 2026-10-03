from pathlib import Path
import json,hashlib
R=Path.cwd();M=R/'04_outputs/modulos/stripe';S=R/'05_scratch/stripe-refinamiento'
e=json.loads((M/'evidencias/2026-09-15_checkout_refinamiento_api.json').read_text());b=json.loads((M/'evidencias/2026-09-15_checkout_refinamiento_navegador.json').read_text());c=json.loads((M/'config/catalogo_demo.json').read_text())
def edit(p,a,z):
 s=p.read_text();assert a in s,(str(p),a);p.write_text(s.replace(a,z))
def app(p,s):
 with p.open('a') as f:f.write(s)
p=M/'config/checkout_demo.json';q=json.loads(p.read_text());q.update(presentation_verified_at=b['verified_at'],browser_evidence='../evidencias/2026-09-15_checkout_refinamiento_navegador.json',presentation_api_evidence='../evidencias/2026-09-15_checkout_refinamiento_api.json');p.write_text(json.dumps(q,ensure_ascii=False,indent=2)+'\n')
p=M/'assets/README.md';p.write_text('''# Imagen de producto NutriWell

[Portada extraída](nutriwell-portada-brochure.jpg), JPEG 1055 × 1491 px.

- Fuente: primera página del [folleto NutriWell aportado al repo](../../../../02_context/EPI10-branding/Ejemplo-Brochure-Informe-Epigenetico-EPI10-Salud.pdf).
- Extracción con `pdfimages -f 1 -l 1 -j`; sin recrear, recortar ni editar la composición.
- Uso solicitado por Raúl: sustituir el logo grande de la imagen de producto en
  el checkout. El logo pequeño de cabecera conserva el activo nuevo azul 01.
- Es una portada comercial de ejemplo, sin resultados individuales ni datos de pacientes.
- Stripe sirve una versión JPEG recodificada; conserva 1055 × 1491 px. Descarga
  revisada visualmente. No se afirma identidad de píxeles tras la compresión.
- Registro técnico y evidencia en [checkout](../docs/checkout_stripe.md#refinamiento-de-texto-e-imagen).
''')
edit(M/'README.md','Nuevo logo azul en producto y checkout; fondo marfil y botón azul','Nuevo logo azul en cabecera; portada NutriWell como imagen de producto; fondo marfil y botón azul')
edit(M/'docs/producto_demo.md','> Test genético integral, cuestionario de hábitos y contexto, informe personalizado,\n> plan de acción priorizado y sesión profesional de interpretación. DEMO: pago\n> único de prueba, sin cobro real ni contratación del servicio.','> Conoce tu biología y cuida tus hábitos. Incluye test genético, cuestionario,\n> informe personalizado, plan de acción y sesión profesional.\n\nAplicado el 2026-09-15 a petición de Raúl. Avisos de demo en nombre, banner y\njunto al botón de pago. Stripe muestra esta descripción como un párrafo.')
edit(M/'docs/producto_demo.md','La imagen inicial de catálogo será el\n[logotipo EPI10 azul](../../../../02_context/EPI10-branding/Nuevos-logos-de-EPI10/Logos_EPI10-01.png),\nPNG transparente de 824 × 293 px, sin modificar y presentado sobre fondo claro.\nTexto alternativo: **EPI10 Salud — NutriWell · DEMO**.','La imagen inicial fue el logotipo azul. Tras revisar el checkout, Raúl pide\nsustituir el logo grande por material de NutriWell. Imagen vigente:\n[portada del folleto](../assets/nutriwell-portada-brochure.jpg), extraída de su\nprimera página sin editar. El [logo actualizado azul](../../../../02_context/EPI10-branding/Nuevos-logos-de-EPI10/Logos_EPI10-01.png)\npermanece en la cabecera. Texto alternativo mostrado por Stripe: **NutriWell · DEMO**.')
edit(M/'docs/marca.md','usa el nuevo logo azul como imagen inicial de catálogo; fotografía editorial de\nla página pendiente de SKI-37.','usó el nuevo logo azul como imagen inicial de catálogo. Tras la revisión de Raúl,\nla imagen de producto es la [portada del folleto](../assets/nutriwell-portada-brochure.jpg);\nel logo nuevo permanece en cabecera. Fotografía de la página pendiente de SKI-37.')
edit(M/'docs/marca.md','- Logo azul 01 subido a Stripe y asociado al producto; [verificación](catalogo_stripe.md).','- Logo azul 01 subido y aplicado a la cabecera; inicialmente también al producto.\n  Imagen de producto sustituida por la portada NutriWell; [verificación](checkout_stripe.md#refinamiento-de-texto-e-imagen).')
edit(M/'docs/guia_cliente.md','en catálogo y checkout: logo azul verificado; fondo marfil y botón azul EPI10.','en cabecera del checkout: logo azul verificado; fondo marfil y botón azul EPI10.\nComo imagen de producto usamos la portada del folleto NutriWell: la imagen de\nproducto puede ser distinta al logo de la cuenta.')
edit(M/'docs/guia_cliente.md','| Descripción | Test genético, cuestionario, informe personalizado, plan y sesión profesional. DEMO sin cobro real ni contratación del servicio. |','| Descripción | Conoce tu biología y cuida tus hábitos. Incluye test genético, cuestionario, informe personalizado, plan de acción y sesión profesional. |')
edit(M/'docs/guia_cliente.md','está creado **NutriWell · DEMO**, con el nuevo logo azul y precio de 100 EUR','está creado **NutriWell · DEMO**, con la portada de su folleto y precio de 100 EUR')
edit(M/'docs/guia_cliente.md','**Comprobación de esta sección:** producto, precio, cantidad fija y configuración','Para mejorar el resumen de compra, edita la descripción y la imagen del producto.\nEl logo de cabecera se configura por separado en la marca de la cuenta. En el\nformulario comprobado, la descripción se compacta en un párrafo; usamos un texto\nbreve y dejamos el desarrollo por apartados para la página del producto.\n\n**Comprobación de esta sección:** producto, precio, cantidad fija y configuración')
edit(M/'docs/catalogo_stripe.md','| Imagen | Nuevo logo EPI10 azul; archivo `file_1UG02ERrJS0VSqzs5X1MupI8` |','| Imagen inicial | Nuevo logo EPI10 azul; archivo `file_1UG02ERrJS0VSqzs5X1MupI8` |\n| Imagen vigente tras refinamiento | Portada del folleto NutriWell; archivo `file_1UG0ZDRrJS0VSqzs4VzU5LOj` |')
app(M/'docs/catalogo_stripe.md','\nActualización posterior: Raúl solicita mejorar el resumen visual; descripción\nabreviada y portada del folleto aplicadas. Los IDs de producto, precio y enlace\nse conservan. [Refinamiento verificado](checkout_stripe.md#refinamiento-de-texto-e-imagen).\n')
app(M/'docs/checkout_stripe.md','''
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
''')
edit(M/'evidencias/README.md','## Procedencia','| E10 | [Refinamiento API](2026-09-15_checkout_refinamiento_api.json) | Copy breve, portada como imagen del producto, logo de cabecera y precio conservados | Pago y recorrido completo |\n| E11 | [Refinamiento en navegador](2026-09-15_checkout_refinamiento_navegador.json) | Nuevo texto y portada cargados; logo pequeño y modo de pruebas conservados | Captura automática y revisión móvil |\n\n## Procedencia')
edit(M/'docs/bitacora.md','## Plantilla para el siguiente paso\n\n### S18 — Fecha y acción concreta','''## S18 — Texto más claro y portada NutriWell como imagen de producto

- **Petición:** Raúl revisa la pantalla y pide mejorar copy/formato y sustituir
  el logo grande por una imagen del informe; deja la página para después.
- **Acción:** revisar el folleto, extraer su portada sin edición, publicarla como
  imagen de producto y actualizar la descripción con una frase más breve.
- **Resultado:** nuevo copy y portada cargados en el mismo Payment Link; logo
  pequeño de cabecera y precio de 100 EUR conservados. API y DOM verificados.
- **Evidencia:** E10, E11 y [procedencia del activo](../assets/README.md).
- **Incidencia resuelta:** primera lectura de la subida devolvió 401 por token
  vencido. El CLI renovó la sesión existente; subida completada sin nueva acción
  humana ni guardar credenciales. Captura automática no disponible.
- **Decisión:** descripción concisa en texto plano; portada original de NutriWell
  para representar el producto y logo nuevo en cabecera. No se hacen pagos.
- **Siguiente paso:** SKI-37, página NutriWell; se mantiene pendiente por petición de Raúl.

## Plantilla para el siguiente paso

### S19 — Fecha y acción concreta''')
edit(M/'docs/decisiones.md','## Motivo de D06','| D20 | Acortar la descripción y usar la portada del folleto NutriWell como imagen de producto; mantener el logo actualizado en cabecera | Solicitado por Raúl, aplicado y verificado | S18 y E10/E11; descripción en párrafo, página pendiente |\n\n## Motivo de D06')
edit(R/'02_context/01_estado_actual.md','confirmación nativa. Formulario abierto en español y comprobado sin realizar pagos.','confirmación nativa. Formulario abierto en español y comprobado sin realizar pagos.\nTras la revisión de Raúl, descripción abreviada y portada del folleto NutriWell\nsustituyen el bloque de texto largo y el logo grande; cabecera con logo nuevo conservada.')
edit(R/'03_specs/now/011_now.md','- [ ] Refinamiento solicitado: descripción más clara e imagen del folleto NutriWell','- [x] Refinamiento solicitado: descripción más clara e imagen del folleto NutriWell')
app(R/'03_specs/now/011_now.md','\nRefinamiento solicitado después por Raúl: descripción breve y portada original\ndel folleto como imagen de producto; logo actualizado de cabecera conservado.\nAPI y DOM correctos (E10/E11); captura no disponible. SKI-37 sigue pendiente.\n')
# Keep input screenshot as provenance, not a current-state screenshot.
import shutil
shutil.copyfile('/tmp/codex-clipboard-4POLQC.png',S/'checkout-antes-aportado-por-raul.png')
print('Copy, portada, evidencia y continuidad documentados.')
