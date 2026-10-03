from pathlib import Path
R=Path.cwd();M=R/'04_outputs/modulos/stripe'
def edit(p,a,b):
 s=p.read_text();assert a in s,(p,a);p.write_text(s.replace(a,b))
def app(p,s):
 with p.open('a') as f:f.write(s)
edit(M/'docs/pantalla_demo.md','**Preparada el 2026-09-15 · SKI-37**','**Publicada en privado el 2026-09-15 · SKI-37**\n\nEstado de despliegue: `succeeded`. [Evidencia E14](../evidencias/2026-09-15_pantalla_demo_publicada.json).')
edit(M/'docs/speedrun_demo.md','pantalla de entrada maquetada, publicación en curso; pagos pendientes.','pantalla de entrada publicada en privado; pagos pendientes.')
edit(M/'docs/speedrun_demo.md','Publicación privada en curso; revisión visual móvil','Publicada en privado; revisión visual móvil')
edit(M/'README.md','Checkout de pruebas creado y comprobado en navegador; página y pagos pendientes.','Checkout de pruebas creado y comprobado; pantalla de entrada publicada en privado.\nPruebas de pago y revisión visual del recorrido pendientes.')
edit(M/'README.md','Una demo funcional con marca, información y producto EPI10 para mostrar a Carmen','Una demo con marca, información y producto EPI10 para mostrar a Carmen')
edit(M/'README.md','el **16 de septiembre**: página de producto → checkout → confirmación → pago','el **16 de septiembre**: pantalla de entrada al mockup → checkout → confirmación → pago')
edit(M/'README.md','## Punto de continuidad','La web definitiva corresponde a otro proveedor. Esta vista presenta el hito de\nla pasarela: [abrir demo privada](https://epi10-nutriwell-demo.raulreboot.chatgpt.site).\n\n## Punto de continuidad')
edit(M/'README.md','## Documentación','## Documentación\n\n- [Pantalla de entrada publicada](docs/pantalla_demo.md): alcance, URL, diseño y validación.')
edit(M/'README.md','3. Checkout creado y verificado (SKI-49); siguiente: página NutriWell (SKI-37).','3. Checkout verificado (SKI-49) y pantalla de entrada publicada (SKI-37).')
edit(M/'docs/pruebas.md','  [Checkout abierto y comprobado](checkout_stripe.md); P01 parcial por faltar la página.','  [Checkout abierto y comprobado](checkout_stripe.md) y [pantalla publicada](pantalla_demo.md);\n  P01 parcial hasta recorrerlos juntos en navegador.')
edit(M/'docs/pruebas.md','PARCIAL: checkout directo verificado (E08/E09); página pendiente','PARCIAL: checkout directo verificado y pantalla publicada (E14); revisión conjunta en navegador pendiente')
edit(M/'evidencias/README.md','## Procedencia','| E14 | [Pantalla publicada](2026-09-15_pantalla_demo_publicada.json) | Publicación privada correcta, build, TypeScript y enlaces/metadatos del HTML servido | Revisión visual del navegador y pago completo |\n\n## Procedencia')
edit(R/'01_harness/STACK.md','  `04_outputs/modulos/stripe/scripts/prepare_checkout.py`. Página propia aún\n  sin framework elegido; operaciones de catálogo en','  `04_outputs/modulos/stripe/scripts/prepare_checkout.py`. Pantalla de entrada al\n  mockup en `04_outputs/modulos/stripe/app/`: Vinext/App Router, React 19, CSS y\n  Sites; publicación privada. La web definitiva corresponde a otro proveedor.\n  Operaciones de catálogo en')
edit(R/'01_harness/STACK.md','If code is introduced later, track here:\n- Runtime/framework:\n- Project layout conventions:\n- Build/test/dev commands:','Comandos desde `04_outputs/modulos/stripe/app/`:\n- Desarrollo: `npm run dev`.\n- Build: `npm run build`.\n- Tipos: `npx tsc --noEmit`.\n- Publicación: Sites, configuración en `.openai/hosting.json`; Git local dentro de app/.')
edit(R/'README.md','CLI sandbox, catálogo y checkout verificados; página y pagos pendientes;','CLI sandbox, catálogo y checkout verificados; pantalla de demo publicada en privado, pagos pendientes;')
edit(R/'03_specs/now/011_now.md','- [ ] Pantalla de entrada al mockup con maquetación cuidada, contenido EPI10,','- [x] Pantalla de entrada al mockup con maquetación cuidada, contenido EPI10,')
app(R/'03_specs/now/011_now.md','\n### Pantalla de entrada — 2026-09-15\n\nVista implementada y publicada en privado para Raúl con Sites, limitada a la\npresentación del hito Stripe. La web definitiva corresponde al otro proveedor.\nLogos actuales, fotografía, cinco inclusiones, experiencia, precio ficticio y\ndos CTA al Payment Link. Compilación, TypeScript y ocho controles semánticos\ndel HTML correctos. La revisión visual en navegador y pago completo permanecen\nen SKI-52; no se afirma que estén hechos. Evidencia E14 en el módulo Stripe.\n')
app(R/'03_specs/decisions.md','\n- 2026-09-15: Raúl acota SKI-37 a una pantalla de entrada al mockup de la pasarela; la web definitiva pertenece al otro proveedor. Exige una presentación visual cuidada. Vista editorial implementada y publicada en privado para Raúl con Sites; checkout de pruebas enlazado. Pruebas del recorrido y validación de Carmen pendientes.\n')
p=R/'02_context/01_estado_actual.md';s=p.read_text();start=s.index('## Última evidencia y siguiente paso');end=s.index('## Continuidad',start);s=s[:start]+'''## Última evidencia y siguiente paso

CLI 1.50.11 autorizado para el sandbox `acct_1UFzBqRrJS0VSqzs`; producto,
precio único de 100 EUR ficticios y Payment Link verificados. Checkout con logo
nuevo de cabecera, descripción breve e imagen de producto adaptada a cuadrado
(300 × 300 px, máximo medido en Stripe). Ningún pago realizado todavía.

Raúl aclara que la web definitiva corresponde al otro proveedor. Autoriza una
pantalla de entrada al mockup para presentar mejor el hito de la pasarela, con
maquetación especialmente cuidada. La vista ya está implementada y publicada
en privado para Raúl: [NutriWell](https://epi10-nutriwell-demo.raulreboot.chatgpt.site).
[Alcance, diseño, validación y entrega](../04_outputs/modulos/stripe/docs/pantalla_demo.md).

Build, TypeScript y enlaces/metadatos del HTML servido correctos. La pantalla se
abrió para mostrarla; no se ejecutaron pruebas de UI en navegador. Revisión
visual escritorio/móvil y pago completo permanecen en SKI-52. El servidor local
se detuvo después de la publicación; la URL privada sigue desplegada.

Siguiente: resultado y recuperación de la compra (SKI-50), receptor de eventos
(SKI-51) y pruebas de recorrido (SKI-52), manteniendo documentación continua.
El [acceso documentado](../04_outputs/modulos/stripe/docs/acceso_stripe.md) permite
continuar sin pedir claves por chat. Titularidad legal, cuenta productiva,
oferta comercial, fiscalidad y aceptación de Carmen siguen pendientes.

'''+s[end:];p.write_text(s)
print('Publicación y alcance acotado documentados; cierre remoto pendiente.')
