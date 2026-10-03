# Catálogo de Stripe creado y verificado

**Fecha:** 2026-09-15T17:22:31.006742+00:00 · **Resultado: PASS** · [Módulo](../README.md).

## Recursos creados

| Recurso | Valor verificado |
| --- | --- |
| Cuenta del sandbox | `acct_1UFzBqRrJS0VSqzs` |
| Producto | NutriWell · DEMO |
| ID de producto | `prod_epi10_nutriwell_demo_v1` |
| ID de precio predeterminado | `price_1UG00zRrJS0VSqzs4Uhv6g9Q` |
| Importe y moneda | 10000 céntimos EUR = 100 € ficticios |
| Modalidad | `one_time`, sin recurrencia ni importe ajustable |
| Disponibilidad | Producto y precio activos |
| Modo | `livemode=false` en producto, precio y enlace de imagen |
| Imagen inicial | Nuevo logo EPI10 azul; archivo `file_1UG02ERrJS0VSqzs5X1MupI8` |
| Imagen vigente tras ampliación | Portada NutriWell cuadrada; archivo `file_1UG0kdRrJS0VSqzsppDdZm7t` |
| Duplicados | Un producto y un precio en el sandbox, consulta completa |

La descripción conserva las cinco inclusiones y el aviso de demostración de la
[ficha de producto](producto_demo.md). Al cerrar el catálogo todavía no existía
un checkout. Actualización posterior: [checkout creado y verificado](checkout_stripe.md)
con marca EPI10 en SKI-49. No se ha realizado ningún pago.

## Configuración reutilizable

[config/catalogo_demo.json](../config/catalogo_demo.json) guarda los IDs no
secretos y los valores que debe usar el siguiente paso. Incluye cantidad 1,
importe fijo, modo pago único y preferencias de checkout sin impuesto automático
ni generación de factura. Inicialmente `checkout_settings_applied=false`; tras
SKI-49 es **`true`** y se incluyen ID y URL del Payment Link comprobado.

La cantidad se define en las líneas del checkout; no es una propiedad del
producto/precio. SKI-49 aplicó `quantity=1` y desactivó cantidad ajustable.
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
npx --yes @stripe/cli@1.50.11 get /v1/products/prod_epi10_nutriwell_demo_v1 --stripe-context acct_1UFzBqRrJS0VSqzs
npx --yes @stripe/cli@1.50.11 get /v1/prices/price_1UG00zRrJS0VSqzs4Uhv6g9Q --stripe-context acct_1UFzBqRrJS0VSqzs
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
- Cantidad fija y opciones de impuestos/facturación del checkout verificadas
  después en SKI-49; compra de prueba aún pendiente.

Referencias oficiales consultadas: [producto y precio predeterminado](https://docs.stripe.com/api/products/create),
[precio](https://docs.stripe.com/api/prices/create),
[idempotencia](https://docs.stripe.com/api/idempotent_requests),
[carga de archivos](https://docs.stripe.com/api/files/create?lang=node) y
[enlaces de archivos](https://docs.stripe.com/api/file_links/create?lang=node).

Actualización posterior: Raúl solicita mejorar el resumen visual; descripción
abreviada y portada del folleto aplicadas. Los IDs de producto, precio y enlace
se conservan. [Refinamiento verificado](checkout_stripe.md#refinamiento-de-texto-e-imagen).
