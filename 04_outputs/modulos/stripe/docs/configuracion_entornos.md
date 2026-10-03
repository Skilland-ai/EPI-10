# Stripe — configuración por fases

**Aclarado el 15 de septiembre de 2026.** Podemos continuar el speedrun con
el sandbox actual. La configuración real de la cuenta EPI10 se trabaja en
[SKI-77](https://linear.app/skilland/issue/SKI-77), después del feedback de Carmen.
Su estado sigue pendiente: la demo no acredita una cuenta lista para cobrar.

## Qué hacemos en cada fase

| Fase | Alcance | Estado |
| --- | --- | --- |
| Demo actual | Acceso, producto, precio ficticio, marca y checkout | Verificados |
| Cierre de demo · SKI-50/51/52 | Confirmación, abandono, reintento, receptor de eventos y pruebas | Confirmación/abandono/reintento, firma/deduplicación, 3DS, doble intento, devolución y revisión visual comprobados; guion en SKI-53 |
| Feedback · SKI-74 | Confirmar oferta, modalidad/precio, datos de compra y qué sucede después del pago | Pendiente con Carmen |
| Cuenta EPI10 · SKI-77 | Configuración comercial, operativa y técnica; réplica y aceptación | Pendiente cuando exista su cuenta y la versión validada |

Stripe permite probar servicios en un sandbox antes de activar el uso real.
La verificación del negocio y los requisitos de activación se resuelven para
operar en vivo. [Configuración oficial de la cuenta](https://docs.stripe.com/get-started/account/set-up).

## Configuración de la cuenta EPI10 — SKI-77

Lista de trabajo y decisiones por concretar; no representa ajustes ya aplicados.

| Área | Qué cerrar | Quién aporta o decide |
| --- | --- | --- |
| Titularidad y activación | País, entidad, actividad, datos fiscales, representante y verificaciones que solicite Stripe | EPI10 y sus personas autorizadas |
| Banco y transferencias | Cuenta bancaria receptora, moneda y calendario disponible de transferencias | EPI10; equipo técnico configura lo autorizado |
| Accesos | Propietario, roles, segundo factor, permisos de implementación y responsable de operación | EPI10 + equipo técnico |
| Datos visibles al comprador | Nombre comercial, logo, web, contacto de soporte y texto del cargo en el extracto | Carmen/EPI10 valida; equipo técnico aplica |
| Oferta y cobro | Producto, importe definitivo, moneda, pago único u otra modalidad y métodos admitidos | Carmen/EPI10 |
| Impuestos y facturación | Tratamiento fiscal, datos que pedir, sistema que emite la factura y configuración de recibos | EPI10 y su asesoría; equipo técnico implementa la decisión |
| Operación | Políticas y procedimiento de devolución, cancelaciones, disputas, avisos y responsables | EPI10 define; equipo técnico documenta/configura |
| Integración y entrega | URLs de la web del proveedor, retorno del checkout, credenciales, webhooks, referencias y siguiente paso operativo | Equipo técnico, proveedor web y EPI10 |

Se revisan los ajustes que correspondan al flujo aprobado; no se activan por
defecto Billing, Tax, nuevos métodos o servicios adicionales. Un recibo de pago
y la factura comercial son documentos distintos: debe concretarse cómo se
resuelve cada uno. La fiscalidad definitiva sigue siendo **Unknown**.

La factura que Skilland emite por entregar este módulo es SKI-81; es diferente
de las facturas o recibos que EPI10 emita a sus compradores.

Datos públicos y accesos: [guía de cuenta Stripe](https://docs.stripe.com/get-started/account/set-up).
Áreas de preparación: [checklist oficial](https://docs.stripe.com/get-started/account/checklist).

## Cómo trasladamos la demo

1. Guardar la versión validada, sus textos, recursos y configuración reproducible.
2. Preparar la cuenta y el entorno de pruebas de EPI10 con sus permisos.
3. Recrear o copiar lo admitido del catálogo y del flujo; registrar los IDs del
   destino y generar los enlaces y credenciales correspondientes a ese entorno.
4. Configurar y verificar los webhooks propios, las URLs y el retorno; coordinar
   el botón y el siguiente paso con el proveedor de la web definitiva.
5. Repetir las pruebas en la cuenta del cliente y preparar su configuración en
   vivo con los datos comerciales aprobados antes de abrir el cobro real.

La migración reutiliza el trabajo validado. No supone cambiar únicamente una
clave ni trasladar los pagos ficticios. Pruebas y modo activo tienen objetos
y claves separados; los secretos de firma pertenecen a cada webhook.
[Entornos de prueba](https://docs.stripe.com/testing-use-cases),
[claves y firmas](https://docs.stripe.com/keys).

## Decisiones que pueden afectar al mockup

En el feedback conviene detectar cambios como suscripción frente a pago único,
necesidad de envío del kit, datos obligatorios de compra y siguiente paso tras
el pago. Si cambian el flujo, se ajusta y valida la demo antes de replicarla.
No hace falta resolver ahora todos los ajustes administrativos del Dashboard.

## Métodos de pago y dispositivos — observación de QA

La matriz SKI-52 valida tarjeta en Chromium, incluidos 3DS y anchos móviles.
Apple Pay/Link no se han probado como métodos de pago. El botón de Apple Pay
apareció irregular en capturas automatizadas (QA52-03). Si EPI10 los habilita,
verificar disponibilidad, representación y pago en dispositivos compatibles en
SKI-77. [Evidencia y límites](validacion_demo.md).
