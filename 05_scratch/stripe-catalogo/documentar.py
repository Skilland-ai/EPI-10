import json
from pathlib import Path
root=Path.cwd();base=root/'04_outputs/modulos/stripe';config=json.loads((base/'config/catalogo_demo.json').read_text());e=json.loads((base/'evidencias/2026-09-15_catalogo_verificado.json').read_text())
(base/'docs/catalogo_stripe.md').write_text(f'''# Catálogo de Stripe creado y verificado

**Fecha:** {config['verified_at']} · **Resultado: PASS** · [Módulo](../README.md).

## Recursos creados

| Recurso | Valor verificado |
| --- | --- |
| Cuenta del sandbox | `{config['account_id']}` |
| Producto | NutriWell · DEMO |
| ID de producto | `{config['product_id']}` |
| ID de precio predeterminado | `{config['price_id']}` |
| Importe y moneda | 10000 céntimos EUR = 100 € ficticios |
| Modalidad | `one_time`, sin recurrencia ni importe ajustable |
| Disponibilidad | Producto y precio activos |
| Modo | `livemode=false` en producto, precio y enlace de imagen |
| Imagen | Nuevo logo EPI10 azul; archivo `{config['branding_file_id']}` |
| Duplicados | Un producto y un precio en el sandbox, consulta completa |

La descripción conserva las cinco inclusiones y el aviso de demostración de la
[ficha de producto](producto_demo.md). No se ha creado un checkout ni realizado
ningún pago. El logo está asociado a la imagen de producto; la personalización
general del checkout corresponde a SKI-49.

## Configuración reutilizable

[config/catalogo_demo.json](../config/catalogo_demo.json) guarda los IDs no
secretos y los valores que debe usar el siguiente paso. Incluye cantidad 1,
importe fijo, modo pago único y preferencias de checkout sin impuesto automático
ni generación de factura. **`checkout_settings_applied=false`** distingue esos
valores previstos de una configuración ya aplicada a Stripe.

La cantidad se define en las líneas del checkout; no es una propiedad del
producto/precio. SKI-49 aplicará `quantity=1` y desactivará cantidad ajustable.
Se aclaró el criterio de SKI-48 en Linear para reflejar esa dependencia técnica.

## Procedimiento ejecutado

1. Consultar cuenta y catálogo con el CLI autorizado; comprobar el ID del sandbox.
2. Buscar un producto existente para reutilizarlo. La consulta inicial estaba vacía.
3. Crear producto y precio predeterminado en una petición, con ID de producto
   estable e idempotencia para evitar repetir la creación tras un fallo de red.
4. Subir el PNG azul a Stripe como `business_logo`, con un enlace público al logo.
   Asociar ese enlace a `images[0]` del producto.
5. Releer producto, precio y catálogo completo. Descargar la imagen sin
   autenticación y comparar sus píxeles con el original.
6. Guardar esta documentación, la configuración y la evidencia.

Consultas de lectura para comprobarlo de nuevo:

```sh
npx --yes @stripe/cli@1.50.11 get /v1/products/{config['product_id']} --stripe-context {config['account_id']}
npx --yes @stripe/cli@1.50.11 get /v1/prices/{config['price_id']} --stripe-context {config['account_id']}
```

## Incidencia resuelta durante la subida del logo

`stripe files create -d file=@ruta` devolvió `Invalid object`, parámetro `file`:
esta llamada del CLI envió un formulario de texto, sin la transferencia binaria
necesaria. No creó un archivo en ese intento.

Se completó la subida con una petición `multipart/form-data` a la API de archivos,
usando en memoria la autorización existente del CLI y fijando contexto sandbox
con `Stripe-Livemode=false`. No se mostró ni persistió el token en este repo.
El script de esta operación está en `05_scratch/stripe-catalogo/upload_logo.py`;
lee únicamente las entradas de la sesión Stripe ya autorizada.

La descarga desde Stripe tiene un SHA256 diferente porque su representación
binaria cambió. Dimensiones y canales coinciden (824 × 293, RGBA) y la comparación
con ImageMagick devuelve **0 píxeles diferentes**. El original local no se modificó.

## Evidencia y límites

- [E07 — respuesta de API y comprobaciones](../evidencias/2026-09-15_catalogo_verificado.json).
- QA del catálogo: `05_scratch/stripe-catalogo/qa-catalogo.json`, 13 comprobaciones correctas.
- Verificación de imagen: HTTP 200, `image/png`, transparencia y píxeles conservados.
- `tax_behavior=unspecified` y sin código fiscal asignado. Esta demo no determina
  el régimen fiscal del servicio real ni modifica los ajustes de alta de la cuenta.
- Cantidad fija, impuestos/facturación del checkout y compra de prueba: pendientes
  de configurar y verificar en sus pasos correspondientes.

Referencias oficiales consultadas: [producto y precio predeterminado](https://docs.stripe.com/api/products/create),
[precio](https://docs.stripe.com/api/prices/create),
[idempotencia](https://docs.stripe.com/api/idempotent_requests),
[carga de archivos](https://docs.stripe.com/api/files/create?lang=node) y
[enlaces de archivos](https://docs.stripe.com/api/file_links/create?lang=node).
''')

def update(path,old,new):
 p=root/path;s=p.read_text();assert old in s,(path,old[:70]);p.write_text(s.replace(old,new))
update('04_outputs/modulos/stripe/README.md','API comprobado. Plan de Linear remodelado. Producto, checkout y pagos pendientes.','API comprobado. Producto, precio de 100 EUR e imagen creados y verificados.\nCheckout y pagos pendientes.')
update('04_outputs/modulos/stripe/README.md','| Catálogo | Vacío en la consulta del 15 de septiembre |','| Catálogo | NutriWell · DEMO, un producto y un precio único de 100 EUR verificados |')
update('04_outputs/modulos/stripe/README.md','| Marca | Seis nuevos logos aportados por Raúl y revisados; aplicación pendiente |','| Marca | Nuevo logo azul asociado al producto; personalización del checkout pendiente |')
update('04_outputs/modulos/stripe/README.md','- [Ficha de NutriWell','- [Catálogo creado](docs/catalogo_stripe.md): IDs, configuración, procedimiento y evidencia.\n- [Ficha de NutriWell')
update('04_outputs/modulos/stripe/README.md','2. Crear producto y precio de pruebas por CLI/API (SKI-48).','2. Producto, precio e imagen creados y verificados (SKI-48).')
update('04_outputs/modulos/stripe/README.md','- [Evidencias](evidencias/README.md): capturas del onboarding y panel.','- [Evidencias](evidencias/README.md): capturas de onboarding y verificación API del catálogo.')
update('04_outputs/modulos/stripe/docs/marca.md','- Logos todavía no cargados en Stripe ni implementados en una página.','- Logo azul 01 subido a Stripe y asociado al producto; [verificación](catalogo_stripe.md).\n  Personalización del checkout y página todavía pendientes.')
update('04_outputs/modulos/stripe/docs/producto_demo.md','siguientes; esta ficha no acredita que ya existan.','siguientes. Actualización: [catálogo ya creado y verificado](catalogo_stripe.md);\ncheckout y pagos aún pendientes.')
update('04_outputs/modulos/stripe/docs/acceso_stripe.md','La prueba actual acredita autenticación y lectura. Las operaciones de escritura,\ncheckout y webhooks se verificarán al implementarlos.','La primera prueba acreditó autenticación y lectura. Después se verificó también\nla escritura de producto, precio e imagen; véase [catálogo](catalogo_stripe.md).\nCheckout y webhooks se verificarán al implementarlos.')
update('04_outputs/modulos/stripe/docs/speedrun_demo.md','Estado: acceso al Dashboard y al CLI/API de pruebas verificado; implementación pendiente.','Estado: acceso verificado y catálogo con producto, precio e imagen creado.\nCheckout, página y pagos pendientes.')
update('04_outputs/modulos/stripe/docs/speedrun_demo.md','Producto y precio visibles en el entorno correcto.','**Hecho — SKI-48:** producto y precio de pruebas con logo; [IDs y evidencia](catalogo_stripe.md). Cantidad fija se aplicará al checkout en SKI-49.')
update('04_outputs/modulos/stripe/docs/pruebas.md','- Producto, precio y enlace o sesión de checkout creados: `Unknown`.','- Producto, precio de 100 EUR e imagen creados y verificados: [catálogo](catalogo_stripe.md).\n  Enlace o sesión de checkout: pendiente; P01 sigue pendiente por el recorrido completo.')
update('04_outputs/modulos/stripe/docs/pruebas.md','**Unknown abiertos:** IDs de producto, precio, checkout y pagos','**Unknown abiertos:** IDs de checkout y pagos')
p=base/'docs/decisiones.md';s=p.read_text().replace('## Motivo de D06','| D17 | Producto y precio predeterminado creados una sola vez; nuevo logo azul servido por Stripe | Verificado por API, descarga y comparación de píxeles | S16 y [catálogo](catalogo_stripe.md) |\n| D18 | Guardar cantidad 1 y opciones de checkout como configuración prevista; aplicarlas en SKI-49 | Configuración guardada; checkout aún no creado | La cantidad no pertenece al objeto producto/precio; criterio de SKI-48 aclarado |\n\n## Motivo de D06');s=s.replace('Propuesto; no creado ni definitivo | Representar el producto','Creado para demo; oferta comercial definitiva pendiente | Representar el producto');p.write_text(s)
p=base/'docs/bitacora.md';s=p.read_text();s=s[:s.index('## Plantilla para el siguiente paso')]+f'''## S16 — Producto, precio e imagen creados en Stripe

- **Acción:** comprobar sandbox/catálogo, crear producto y precio predeterminado,
  subir logo y asociar su enlace a la imagen del producto; releer todo por API.
- **Resultado verificado:** `{config['product_id']}` y `{config['price_id']}`;
  10000 céntimos EUR, `one_time`, activos, `livemode=false`. Un producto y un
  precio en el catálogo. Logo público correcto: 824 × 293 RGBA, 0 píxeles distintos.
- **Incidencia resuelta:** el CLI rechazó `file=@ruta` como `Invalid object`.
  Subida binaria completada mediante API con la misma autorización mantenida
  en memoria. Stripe cambió la codificación del PNG, conservando los píxeles.
- **Evidencia:** [catálogo y procedimiento](catalogo_stripe.md), E07 y configuración JSON.
- **Decisión:** cantidad 1 y opciones previstas guardadas; aplicación real en
  checkout durante SKI-49. No se configura fiscalidad comercial ni se hacen pagos.
- **Siguiente paso:** configurar checkout con marca EPI10 (SKI-49).

## Plantilla para el siguiente paso

### S17 — Fecha y acción concreta

- **Acción:** pendiente de registrar.
- **Resultado:** observado o pendiente de verificar.
- **Evidencia:** archivo, ID o referencia revisable, sin secretos.
- **Decisión:** elección confirmada o recomendación.
- **Siguiente paso:** acción ejecutable para continuar.
''';p.write_text(s)
p=base/'evidencias/README.md';s=p.read_text().replace('# Stripe — evidencias del onboarding','# Stripe — evidencias de configuración');s=s.replace('## Procedencia','| E07 | [Catálogo verificado por API](2026-09-15_catalogo_verificado.json) | Cuenta sandbox, producto/precio activos, 100 EUR no recurrentes, logo asociado y comparación de píxeles | Checkout y pagos; no acredita aceptación de Carmen |\n\n## Procedencia');p.write_text(s)
# Keep the reusable guide clear about what has actually been verified.
p=base/'docs/guia_cliente.md';s=p.read_text().replace('al Dashboard y el entorno de pruebas ya se han observado. El catálogo, checkout\ny recorrido completo están pendientes de validar; las elecciones de onboarding','al Dashboard y el entorno de pruebas ya se han observado. El catálogo de demo\nestá creado y verificado; checkout y recorrido de pago pendientes. Las elecciones de onboarding')
s=s.replace('«Entorno de prueba» observados. Quedan por registrar los identificadores del\nentorno y revisar las opciones guardadas. En la introducción «Después, configura\nlos pagos», pulsa «Entendido» para continuar con la preparación.','«Entorno de prueba» observados; identidad del sandbox y acceso técnico verificados.\nLas opciones guardadas de onboarding todavía requieren revisión si se reutiliza\nesta cuenta para otra configuración.')
s=s.replace('en Stripe y revisión visual del recorrido: pendientes.','en la imagen del catálogo: verificada para el logo azul. Personalización del\ncheckout y revisión visual del recorrido: pendientes.')
s=s.replace('| Descripción | Simulación de contratación del servicio inicial. Prueba sin prestación ni cobro real. |','| Descripción | Test genético, cuestionario, informe personalizado, plan y sesión profesional. DEMO sin cobro real ni contratación del servicio. |')
s=s.replace('**Procedimiento propuesto, pendiente de ejecutar:**','**Catálogo verificado; preparación del checkout pendiente:**')
s=s.replace('1. En el sandbox, crea el producto con los valores anteriores.','1. Comprueba si ya existe el producto para evitar duplicarlo. En esta demo ya\n   está creado **NutriWell · DEMO**, con el nuevo logo azul y precio de 100 EUR\n   de pago único. Si reproduces el procedimiento en otro sandbox, crea el\n   producto y su precio con los mismos valores ficticios.\n   [Catálogo y configuración técnica](catalogo_stripe.md).')
s=s.replace('3. Revisa la vista previa: nombre con DEMO, pago único, moneda y total esperado','3. Fija cantidad en **una unidad**, sin ajuste de cantidad, y no añadas impuestos\n   automáticos ni generación de facturas para esta demo. Revisa la vista previa:\n   nombre con DEMO, pago único, moneda y total esperado')
s=s.replace('**Comprobación de esta sección:** producto y precio revisados, entrada al checkout\noperativa y confirmación preparada. Resultado de esta sesión: pendiente de ejecutar.','**Comprobación de esta sección:** producto, imagen y precio revisados por API.\nEntrada al checkout, cantidad fija y confirmación todavía pendientes de ejecutar.')
p.write_text(s)
p=root/'02_context/01_estado_actual.md';s=p.read_text().replace('cuatro lecturas API: cuenta, productos, precios y eventos. Catálogo vacío; evento\ndevuelto con `livemode=false`. SKI-28 está Done con evidencia, releída en Linear.\nNo se ha creado todavía producto, checkout ni pago.','cuatro lecturas API: cuenta, productos, precios y eventos. SKI-28 está Done.\nDespués se ha creado y verificado el catálogo de demo: un producto NutriWell,\nun precio de 100 EUR no recurrente y el logo nuevo asociado. Todos en pruebas.\nNo se ha creado checkout ni realizado un pago.')
s=s.replace('logo azul) y reglas de compra. No se han creado recursos Stripe.','logo azul) y reglas de compra. Recursos e IDs en el\n[catálogo verificado](../04_outputs/modulos/stripe/docs/catalogo_stripe.md) y\n`04_outputs/modulos/stripe/config/catalogo_demo.json`.')
s=s.replace('Siguiente paso: crear producto/precio por CLI/API (SKI-48) y seguir el','Siguiente paso: configurar el checkout (SKI-49), aplicar cantidad 1 y marca, y seguir el')
s=s.replace('creó un sandbox anónimo. Las escrituras se comprobarán al ejecutarlas.','creó un sandbox anónimo. Escrituras de catálogo e imagen verificadas; operaciones\nde checkout y pago pendientes.')
p.write_text(s)
p=root/'03_specs/now/011_now.md';s=p.read_text().replace('- [ ] Producto, precio, moneda y configuración de demo creados y documentados.','- [x] Producto, precio de 100 EUR, modalidad de pago único e imagen de catálogo\n  creados y verificados. Cantidad fija y opciones de checkout se aplican en SKI-49.')
s=s.replace('Unknown actuales: titularidad legal, permisos de escritura por comprobar al\nejecutar operaciones, producto comercial','Unknown actuales: titularidad legal, capacidades de checkout/webhook por comprobar\nal ejecutarlas, producto comercial')
s+='''\n### Catálogo Stripe — 2026-09-15\n\nProducto, precio predeterminado e imagen creados en el sandbox. Trece comprobaciones\nAPI/imagen correctas en `05_scratch/stripe-catalogo/qa-catalogo.json`; evidencia E07\nen el módulo y valores reutilizables en `config/catalogo_demo.json`. Cantidad fija\ny opciones de checkout guardadas como previstas, todavía no aplicadas.\n\nIncidencia de subida CLI resuelta mediante multipart con la sesión ya autorizada;\nsin copiar credenciales al repo. El PNG descargado conserva todos los píxeles del\noriginal, aunque cambia su codificación. Siguiente paso: SKI-49.\n''';p.write_text(s)
print('Documentación y configuración actualizadas')
