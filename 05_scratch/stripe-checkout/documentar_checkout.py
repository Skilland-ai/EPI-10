from pathlib import Path
R=Path.cwd()
M=R/'04_outputs/modulos/stripe'
def edit(path, pairs):
    p=R/path
    s=p.read_text()
    for old,new in pairs:
        assert old in s, (path,old)
        s=s.replace(old,new)
    p.write_text(s)
def mod(path,pairs): edit('04_outputs/modulos/stripe/'+path,pairs)
mod('README.md',[
 ('Checkout y pagos pendientes.','Checkout de pruebas creado y comprobado en navegador; página y pagos pendientes.'),
 ('Nuevo logo azul asociado al producto; personalización del checkout pendiente','Nuevo logo azul en producto y checkout; fondo marfil y botón azul'),
 ('| Checkout / pagos | Sin implementar ni ejecutar |','| Checkout / pagos | [Enlace de prueba](https://buy.stripe.com/test_fZufZj1Nyg7mfNQ7BkeME00?locale=es) configurado y abierto; ningún pago ejecutado |'),
 ('## Documentación\n','## Documentación\n\n- [Checkout creado](docs/checkout_stripe.md): enlace, marca, campos y verificación API/navegador.\n'),
 ('capturas de onboarding y verificación API del catálogo.','onboarding, catálogo y verificación del checkout.'),
 ('3. Construir checkout, página, confirmación y receptor de eventos.','3. Checkout creado y verificado (SKI-49); siguiente: página NutriWell (SKI-37).\n4. Conectar resultado/recuperación y receptor de eventos.'),
 ('4. Ejecutar las pruebas','5. Ejecutar las pruebas')])
mod('docs/speedrun_demo.md',[
 ('Checkout, página y pagos pendientes.','Checkout de pruebas creado y verificado; página y pagos pendientes.'),
 ('no acredita un cambio ya creado en Stripe.','ya creado en el catálogo de pruebas.'),
 ('Cantidad fija se aplicará al checkout en SKI-49.','Cantidad fija aplicada después en SKI-49.'),
 ('Enlace de cobro test funcional, producto correcto y coherencia visual. Ruta técnica definitiva pendiente.','**Hecho — SKI-49:** Payment Link, cantidad 1, tarjeta, logo y colores; [enlace y evidencia](checkout_stripe.md). Confirmación nativa configurada, aún sin pagar.'),
 ('- Tipo final de checkout, imagen de producto y dirección de la demo.','- Fotografía editorial y dirección final de la página; Payment Link de demo ya disponible.'),
 ('con cada operación. Cuenta sandbox y acceso de lectura ya comprobados.','con cada operación. Cuenta sandbox, catálogo y checkout ya comprobados.')])
mod('docs/guia_cliente.md',[
 ('está creado y verificado; checkout y recorrido de pago pendientes.','y el checkout están creados y verificados; recorrido de pago pendiente.'),
 ('en la imagen del catálogo: verificada para el logo azul. Personalización del\ncheckout y revisión visual del recorrido: pendientes.','en catálogo y checkout: logo azul verificado; fondo marfil y botón azul EPI10.\nLa continuidad con la futura página y la revisión móvil siguen pendientes.'),
 ('La configuración propuesta es:','La configuración aplicada al cobro de demo es:'),
 ('**Catálogo verificado; preparación del checkout pendiente:**','**Catálogo y checkout verificados:**'),
 ('2. Prepara el checkout. Una opción para esta primera prueba es **Payment Link**:\n   un enlace que abre una página de pago alojada por Stripe. Desde Payment Links,\n   crea un enlace y selecciona el producto de demo. Esta opción todavía debe\n   concretarse para el mockup. [Crear un Payment Link](https://docs.stripe.com/payment-links/create)',
  '2. Utiliza **Payment Link**, un enlace que abre una página de pago alojada por\n   Stripe. En nuestra demo ya existe: [abrir checkout en español](https://buy.stripe.com/test_fZufZj1Nyg7mfNQ7BkeME00?locale=es).\n   Para reproducirlo en otro sandbox, crea un enlace y selecciona el producto.\n   [Crear un Payment Link](https://docs.stripe.com/payment-links/create)'),
 ('4. Configura la confirmación posterior al pago. Puede mostrar un mensaje o\n   redirigir a una página definida para la demo.',
  '4. Aplica el logo completo azul, fondo marfil #F8F5EF y botón azul #044799.\n   Configura tarjeta como método de pago. El formulario pide email, tarjeta,\n   titular y país; no hemos añadido teléfono ni dirección de envío.\n5. Configura la confirmación alojada en Stripe con el mensaje de demo indicado\n   debajo. Es la opción ya guardada para este enlace.'),
 ('5. Abre el enlace desde la entrada prevista','6. Abre el enlace desde la entrada prevista'),
 ('Mensaje de confirmación propuesto:\n\n> Pago de prueba completado. Esta demostración no genera un cargo real ni inicia\n> la prestación del servicio.',
  'Mensaje de confirmación configurado:\n\n> Pago de prueba completado. Has completado la compra de demostración de NutriWell.\n> No se ha realizado ningún cobro real ni contratado el servicio.'),
 ('**Comprobación de esta sección:** producto, imagen y precio revisados por API.\nEntrada al checkout, cantidad fija y confirmación todavía pendientes de ejecutar.',
  '**Comprobación de esta sección:** producto, precio, cantidad fija y configuración\nrevisados por API; formulario abierto en español con logo, colores y total de\n100 EUR. La confirmación está configurada, pero todavía no se ha realizado un\npago para verla. Entrada desde la futura página y recuperación pendientes.\n[Registro de la configuración](checkout_stripe.md).')])
mod('docs/producto_demo.md',[('checkout y pagos aún pendientes.','[checkout configurado y abierto](checkout_stripe.md); pagos aún pendientes.')])
mod('docs/marca.md',[
 ('  Personalización del checkout y página todavía pendientes.','  Checkout con logo azul, fondo #F8F5EF y botón #044799 configurado y comprobado\n  por DOM y estilos; [evidencia](checkout_stripe.md). Página todavía pendiente.'),
 ('- Pendiente comprobar contraste, tamaño aparente y continuidad de marca una vez\n  estén aplicados al recorrido real.','- Logo cargado y proporciones conservadas en el formulario. Pendiente revisión\n  visual completa, móvil y continuidad de marca con la página.')])
mod('docs/acceso_stripe.md',[
 ('Checkout y webhooks se verificarán al implementarlos. La identidad legal y la','Marca de cuenta y Payment Link también escritos y releídos; [checkout](checkout_stripe.md).\nPagos y webhooks pendientes. La identidad legal y la')])
mod('docs/catalogo_stripe.md',[
 ('[ficha de producto](producto_demo.md). No se ha creado un checkout ni realizado\nningún pago. El logo está asociado a la imagen de producto; la personalización\ngeneral del checkout corresponde a SKI-49.',
  '[ficha de producto](producto_demo.md). Al cerrar el catálogo todavía no existía\nun checkout. Actualización posterior: [checkout creado y verificado](checkout_stripe.md)\ncon marca EPI10 en SKI-49. No se ha realizado ningún pago.'),
 ('ni generación de factura. **`checkout_settings_applied=false`** distingue esos\nvalores previstos de una configuración ya aplicada a Stripe.',
  'ni generación de factura. Inicialmente `checkout_settings_applied=false`; tras\nSKI-49 es **`true`** y se incluyen ID y URL del Payment Link comprobado.'),
 ('producto/precio. SKI-49 aplicará `quantity=1` y desactivará cantidad ajustable.','producto/precio. SKI-49 aplicó `quantity=1` y desactivó cantidad ajustable.'),
 ('- Cantidad fija, impuestos/facturación del checkout y compra de prueba: pendientes\n  de configurar y verificar en sus pasos correspondientes.',
  '- Cantidad fija y opciones de impuestos/facturación del checkout verificadas\n  después en SKI-49; compra de prueba aún pendiente.')])
mod('docs/pruebas.md',[
 ('pruebas del checkout y pagos pendientes.','configuración del checkout verificada por API y navegador; pagos pendientes.'),
 ('  Enlace o sesión de checkout: pendiente; P01 sigue pendiente por el recorrido completo.',
  '  [Checkout abierto y comprobado](checkout_stripe.md); P01 parcial por faltar la página.'),
 ('| P01 — Entrada y catálogo | Abrir la entrada de compra y revisar el checkout | Producto DEMO, EUR, pago único y total acordado; navegación operativa | Pendiente / Unknown |',
  '| P01 — Entrada y catálogo | Abrir la entrada de compra y revisar el checkout | Producto DEMO, EUR, pago único y total acordado; navegación operativa | PARCIAL: checkout directo verificado (E08/E09); página pendiente |'),
 ('selección final de métodos y eventos sigue pendiente.','demo admite tarjeta; selección e implementación de eventos en SKI-51 pendientes.'),
 ('**Unknown abiertos:** IDs de checkout y pagos, resultados de pruebas, receptor','**Unknown abiertos:** IDs de pagos, resultados de pruebas, receptor')])
mod('docs/decisiones.md',[
 ('| D08 | Resolver la primera compra con Checkout alojado o Payment Link | Propuesta por concretar | El mecanismo y la integración de eventos no están implementados |',
  '| D08 | Resolver la primera compra con Checkout alojado o Payment Link | Concretado en D19 | Payment Link configurado; eventos pendientes |'),
 ('Activos recibidos y verificados; aplicación todavía pendiente','Activos verificados; logo aplicado a catálogo y checkout, página pendiente'),
 ('SKI-28 Done; escrituras pendientes de implementar','SKI-28 Done; escrituras posteriores verificadas en S16–S17'),
 ('Configuración guardada; checkout aún no creado','Aplicado y verificado después en S17'),
 ('## Motivo de D06','| D19 | Payment Link reutilizable, tarjeta, cantidad 1 y confirmación nativa; logo azul, fondo marfil y botón #044799 | Creado y verificado por API y DOM | S17 y [checkout](checkout_stripe.md); correlación de compras, recuperación y deduplicación pendientes en SKI-50/51 |\n\n## Motivo de D06'),
 ('acceso CLI/API de lectura comprobados; escritura por verificar al ejecutarla.','acceso CLI/API y escrituras de catálogo/checkout comprobados.'),
 ('- Payment Link o sesión de Checkout, URLs y contrato del evento de pago: `Unknown`.','- Contrato de eventos y recuperación entre intentos: pendientes. Payment Link de demo configurado.')])
mod('evidencias/README.md',[
 ('## Procedencia','| E08 | [Checkout verificado por API](2026-09-15_checkout_api.json) | Enlace de pruebas, precio, cantidad, tarjeta, marca, campos y confirmación configurados; 17 comprobaciones | Pago y confirmación tras pagar |\n| E09 | [Checkout abierto en navegador](2026-09-15_checkout_navegador.json) | DOM en español, total, logo cargado, estilos y campos; sin selector de cantidad | Captura no disponible; revisión móvil, pago y recorrido desde la página |\n\n## Procedencia')])
mod('docs/bitacora.md',[
 ('## Plantilla para el siguiente paso\n\n### S17 — Fecha y acción concreta',
  '## S17 — Checkout Stripe configurado y abierto\n\n- **Acción:** aplicar marca al sandbox, crear Payment Link con el precio existente,\n  cantidad 1, tarjeta, campos mínimos y confirmación nativa; releer y abrirlo.\n- **Resultado:** 17 comprobaciones API correctas; formulario en español con\n  NutriWell · DEMO, 100 EUR, logo azul, fondo marfil y botón #044799. Sin selector\n  de cantidad, teléfono ni envío. Sesión abierta en pruebas, `unpaid`.\n- **Evidencia:** [checkout](checkout_stripe.md), E08 API y E09 DOM/estilos. No se\n  introdujeron datos ni se pagó; captura no disponible, revisión móvil pendiente.\n- **Incidencia resuelta:** Stripe rechazó declarar ambas opciones de recogida\n  adicional de nombres como falsas; se omitió ese bloque opcional. El primer\n  intento no creó un enlace.\n- **Decisión:** Payment Link con confirmación nativa; la correlación entre\n  intentos y deduplicación se implementan en SKI-50/51. La URL es reutilizable.\n- **Siguiente paso:** construir la página NutriWell y conectar su botón (SKI-37).\n\n## Plantilla para el siguiente paso\n\n### S18 — Fecha y acción concreta')])
edit('01_harness/STACK.md',[
 ('- Catálogo Stripe de pruebas creado por CLI/API. IDs y valores previstos del\n  checkout: `04_outputs/modulos/stripe/config/catalogo_demo.json`. Aún sin\n  aplicación de checkout ni framework elegido; operaciones de esta sesión en',
  '- Catálogo y Payment Link Stripe de pruebas creados por CLI/API; checkout\n  alojado en Stripe, comprobado por API y DOM. IDs/configuración en\n  `04_outputs/modulos/stripe/config/`; script Python 3 reutilizable en\n  `04_outputs/modulos/stripe/scripts/prepare_checkout.py`. Página propia aún\n  sin framework elegido; operaciones de catálogo en')])
edit('README.md',[
 ('CLI sandbox autorizado y catálogo creado; checkout pendiente;','CLI sandbox, catálogo y checkout verificados; página y pagos pendientes;')])
edit('02_context/01_estado_actual.md',[
 ('No se ha creado checkout ni realizado un pago.','Después se ha creado el Payment Link con cantidad 1, tarjeta, marca EPI10 y\nconfirmación nativa. Formulario abierto en español y comprobado sin realizar pagos.'),
 ('Siguiente paso: configurar el checkout (SKI-49), aplicar cantidad 1 y marca, y seguir el',
  'Checkout y enlace en la [guía técnica](../04_outputs/modulos/stripe/docs/checkout_stripe.md).\nSiguiente paso: construir la página NutriWell (SKI-37) y seguir el'),
 ('El navegador no estaba disponible para control directo del agente; la evidencia\nvisual procede de las capturas del usuario. La cuenta la registró Raúl. No se\ncreó un sandbox anónimo. Escrituras de catálogo e imagen verificadas; operaciones\nde checkout y pago pendientes.',
  'El navegador integrado ya está disponible: checkout comprobado por DOM, carga\nde imágenes y estilos. No se consiguió una captura; revisión móvil y pago pendientes.\nLa cuenta la registró Raúl; no se creó un sandbox anónimo. Catálogo y checkout\nescritos y verificados mediante la autorización existente del CLI.')])
edit('03_specs/now/011_now.md',[
 ('- [ ] Entrada, checkout y resultado de pago probados en el entorno de Stripe.',
  '- [x] Checkout de pruebas configurado: Payment Link, cantidad 1, tarjeta, logo\n  y colores EPI10; API y formulario abierto en español verificados.\n- [ ] Entrada, checkout y resultado de pago probados en el entorno de Stripe.'),
 ('Unknown actuales: titularidad legal, capacidades de checkout/webhook por comprobar\nal ejecutarlas, producto comercial y fiscalidad definitivos, aceptación de',
  'Unknown actuales: titularidad legal, pagos y receptor webhook por comprobar\nal ejecutarlos, producto comercial y fiscalidad definitivos, aceptación de')])
with (R/'03_specs/decisions.md').open('a') as f:
    f.write('\n- 2026-09-15: Checkout de demo mediante Payment Link reutilizable: cantidad 1, tarjeta, marca EPI10 y confirmación nativa. Configuración verificada por API y DOM; sin pago ejecutado. Correlación entre intentos, recuperación y deduplicación permanecen en SKI-50/51. Procedimiento y evidencia en el módulo Stripe.\n')
print('Documentación del checkout actualizada; cierre remoto pendiente.')
