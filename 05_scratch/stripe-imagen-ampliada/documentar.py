from pathlib import Path
import json
R=Path.cwd();M=R/'04_outputs/modulos/stripe';S=R/'05_scratch/stripe-imagen-ampliada'
b=json.loads((M/'evidencias/2026-09-15_checkout_imagen_ampliada_navegador.json').read_text())
def edit(p,a,z):
 s=p.read_text();assert a in s,(str(p),a);p.write_text(s.replace(a,z))
def app(p,s):
 with p.open('a') as f:f.write(s)
p=M/'config/checkout_demo.json';c=json.loads(p.read_text());c.update(presentation_verified_at=b['verified_at'],browser_evidence='../evidencias/2026-09-15_checkout_imagen_ampliada_navegador.json',presentation_api_evidence='../evidencias/2026-09-15_checkout_imagen_ampliada_api.json');p.write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n')
edit(M/'README.md','portada NutriWell como imagen de producto','portada NutriWell adaptada a cuadrado (300 × 300 px en pantalla) como imagen de producto')
edit(M/'docs/producto_demo.md','[portada del folleto](../assets/nutriwell-portada-brochure.jpg), extraída de su\nprimera página sin editar.','[versión cuadrada de la portada](../assets/nutriwell-portada-cuadrada-v2.jpg),\nadaptada con IA desde la portada original para aprovechar los 300 × 300 px\npermitidos por Stripe; [fuente y prompt](../assets/README.md).')
edit(M/'docs/marca.md','la imagen de producto es la [portada del folleto](../assets/nutriwell-portada-brochure.jpg);','la imagen de producto es la [portada adaptada a cuadrado](../assets/nutriwell-portada-cuadrada-v2.jpg);')
edit(M/'docs/guia_cliente.md','Como imagen de producto usamos la portada del folleto NutriWell: la imagen de\nproducto puede ser distinta al logo de la cuenta.','Como imagen de producto usamos una adaptación cuadrada de la portada NutriWell:\nla imagen de producto puede ser distinta al logo de la cuenta. En el checkout\ncomprobado, Stripe limita esa imagen a 300 × 300 px. El formato cuadrado y los\ntextos grandes aprovechan mejor ese espacio; subir más resolución no amplía\nla caja de presentación.')
edit(M/'docs/catalogo_stripe.md','| Imagen vigente tras refinamiento | Portada del folleto NutriWell; archivo `file_1UG0ZDRrJS0VSqzs4VzU5LOj` |','| Imagen vigente tras ampliación | Portada NutriWell cuadrada; archivo `file_1UG0kdRrJS0VSqzsppDdZm7t` |')
app(M/'docs/checkout_stripe.md','''
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
''')
edit(M/'evidencias/README.md','## Procedencia','| E12 | [Imagen ampliada, API](2026-09-15_checkout_imagen_ampliada_api.json) | Portada cuadrada aplicada; precio, descripción y logo de cabecera conservados | Pago y recorrido completo |\n| E13 | [Imagen ampliada, navegador](2026-09-15_checkout_imagen_ampliada_navegador.json) | Antes 212 × 300, después 300 × 300 px; imagen cargada y límites de tamaño medidos | Captura automática y revisión móvil |\n\n## Procedencia')
edit(M/'docs/bitacora.md','## Plantilla para el siguiente paso\n\n### S19 — Fecha y acción concreta','''## S19 — Ampliar imagen dentro del límite de Stripe

- **Petición:** Raúl quiere una imagen más grande y legible, aprovechando el ancho.
- **Hallazgo:** Stripe fija máximos de 300 × 300 px; la portada vertical usaba 212 × 300.
- **Acción:** adaptar la portada a cuadrado con el editor integrado de imágenes,
  con retrato/título/descriptor grandes; publicar el JPEG como imagen de producto.
- **Resultado:** 300 × 300 px en el mismo checkout, 41,5 % más ancho. Logo de
  cabecera, copy, precio y avisos de demo conservados. API y DOM correctos.
- **Evidencia:** E12/E13, [activo y prompt](../assets/README.md). Captura automática
  no disponible; portada revisada a tamaño de presentación. Sin pagos.
- **Límite:** no se amplía la caja de Stripe más allá de 300 px de alto/ancho.
  La adaptación derivada con IA no se presenta como la portada original íntegra.
- **Siguiente paso:** la página propia SKI-37 permanece pendiente para después.

## Plantilla para el siguiente paso

### S20 — Fecha y acción concreta''')
edit(M/'docs/decisiones.md','## Motivo de D06','| D21 | Adaptar portada a cuadrado con título/descriptor grandes para aprovechar el límite real de 300 × 300 px de Stripe | Aplicado y verificado | S19, E12/E13; versión derivada con IA, 41,5 % más ancha |\n\n## Motivo de D06')
edit(R/'03_specs/now/011_now.md','- [ ] Aprovechar más ancho para la imagen NutriWell y mejorar legibilidad dentro','- [x] Aprovechar más ancho para la imagen NutriWell y mejorar legibilidad dentro')
app(R/'03_specs/now/011_now.md','\nAmpliación de imagen: portada adaptada a cuadrado con editor integrado,\n300 × 300 px verificados frente a 212 × 300 anteriores. Este es el límite\nobservado de la imagen alojada por Stripe; página propia pendiente. E12/E13.\n')
edit(R/'02_context/01_estado_actual.md','sustituyen el bloque de texto largo y el logo grande; cabecera con logo nuevo conservada.','sustituyen el bloque de texto largo y el logo grande; cabecera con logo nuevo conservada.\nDespués se adapta la portada a cuadrado con IA: 300 × 300 px en pantalla frente a\n212 × 300 anteriores, el máximo medido en este checkout. Página propia pendiente.')
print('Ampliación, límite de Stripe y procedencia de la adaptación documentados.')
