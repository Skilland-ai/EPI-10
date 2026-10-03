# Stripe — decisiones y propuestas

**Actualizado:** 2026-09-15. Este registro diferencia instrucciones del usuario,
recomendaciones del acompañamiento y elecciones todavía abiertas.

[Volver al módulo](../README.md) · [Bitácora](bitacora.md)

| ID | Elección y motivo | Estado | Alcance / evidencia |
| --- | --- | --- | --- |
| D01 | Trabajar el bloque Stripe en esta sesión y documentarlo mientras se ejecuta | Decidido por el usuario | Mockup y base documental; S01 y S07 |
| D02 | Registrar una cuenta gestionada por Raúl desde su navegador, para conservar el entorno | Decidido por el usuario; Dashboard y entorno de pruebas observados en E06 | Vía anónima descartada antes de crear nada; titularidad legal: Unknown; ID comprobado después en S14; S03 y S10 |
| D03 | Mantener Skilland como titular real de la cuenta de demo | Recomendado; titular guardado: Unknown | EPI10 representa el servicio del mockup; no acredita cuenta productiva del cliente; S03–S04 |
| D04 | Probar «EPI10 — Servicio inicial · DEMO» por 100 EUR ficticios, pago único | Propuesta inicial de nombre sustituida por D12; importe conservado | No establece nombre ni precio comercial real; S02 |
| D05 | Activar pagos por Internet y desmarcar Enviar facturas | Recomendado; guardado pendiente de verificar | Configuración de este mockup; facturación comercial futura: Unknown; S05 |
| D06 | Elegir «Elige lo que necesitas», sin Managed Payments | Recomendado; guardado pendiente de verificar | Demo y orientación para EPI10 con test y servicio profesional; S06 |
| D07 | Utilizar un entorno de pruebas y datos ficticios para los pagos de demostración | Acuerdo de alcance; banner de pruebas observado en E06 | Cuenta sandbox identificada en S14; sin cobros reales ni datos sanitarios reales |
| D08 | Resolver la primera compra con Checkout alojado o Payment Link | Concretado en D19 | Payment Link configurado; eventos pendientes |
| D09 | Mantener guía cliente editable separada de bitácora, pruebas e incidencias | Decidido para la documentación solicitada | Fuente futura de PDF Skilland; no se ha generado el PDF ni una skill |
| D10 | Desmarcar Enviar facturas y Cobrar impuestos en funciones adicionales | Recomendado; guardado pendiente de verificar | Solo demo; configuración fiscal real pendiente; S08 |
| D11 | Continuar con Configurar desde el Dashboard | Selección observada en E05; acceso al panel observado en E06 | Herramientas de desarrollo se conectarán si hacen falta; S09–S10 |
| D12 | Usar «NutriWell · DEMO» como nombre actual de propuesta, con 100 EUR ficticios y pago único | Creado para demo; oferta comercial definitiva pendiente | Representar el producto EPI10 para demo del 2026-09-16; S11 y speedrun |
| D13 | Adoptar los seis logos actualizados aportados por Raúl; 01 azul sobre claro y 02 blanco sobre oscuro como aplicación prevista | Activos verificados; logo aplicado a catálogo y checkout, página pendiente | S12 e [inventario de marca](marca.md); sustituyen los logos anteriores de la demo |

| D14 | Sustituir tareas genéricas de Stripe por nueve de demo, feedback y réplica; facturación como subtarea de entrega | Aplicado en Linear y verificado | S13 y [desglose](linear_speedrun.md); nueve anteriores canceladas con trazabilidad |
| D15 | Operar por CLI/API en el sandbox que autorizó Raúl en navegador | Autorización y cuatro lecturas verificadas | S14 y [acceso](acceso_stripe.md); SKI-28 Done; escrituras posteriores verificadas en S16–S17 |

| D16 | Ficha única de demo: NutriWell, 100 EUR, cinco inclusiones y reglas de pago/recuperación; logo nuevo como imagen inicial de catálogo | Preparado para implementación; oferta real pendiente de Carmen | S15 y [ficha](producto_demo.md); fotografía editorial durante SKI-37 |

| D17 | Producto y precio predeterminado creados una sola vez; nuevo logo azul servido por Stripe | Verificado por API, descarga y comparación de píxeles | S16 y [catálogo](catalogo_stripe.md) |
| D18 | Guardar cantidad 1 y opciones de checkout como configuración prevista; aplicarlas en SKI-49 | Aplicado y verificado después en S17 | La cantidad no pertenece al objeto producto/precio; criterio de SKI-48 aclarado |

| D19 | Payment Link reutilizable, tarjeta, cantidad 1 y confirmación nativa; logo azul, fondo marfil y botón #044799 | Creado y verificado por API y DOM | S17 y [checkout](checkout_stripe.md); correlación de compras, recuperación y deduplicación pendientes en SKI-50/51 |

| D20 | Acortar la descripción y usar la portada del folleto NutriWell como imagen de producto; mantener el logo actualizado en cabecera | Solicitado por Raúl, aplicado y verificado | S18 y E10/E11; descripción en párrafo, página pendiente |

| D21 | Adaptar portada a cuadrado con título/descriptor grandes para aprovechar el límite real de 300 × 300 px de Stripe | Aplicado y verificado | S19, E12/E13; versión derivada con IA, 41,5 % más ancha |

| D22 | Pantalla de entrada al mockup con maquetación editorial; web definitiva a cargo del otro proveedor | Aclarado y autorizado por Raúl, implementación preparada | S20 y SKI-37; publicación privada, pruebas de recorrido pendientes |

## Motivo de D06

Stripe describe Managed Payments como solución para productos digitales y excluye
los bienes físicos y servicios profesionales con intervención humana. Para la
oferta descrita de EPI10 —test e interpretación profesional— recomendamos el
procesamiento de pagos configurable. Es una elección de producto; no acredita
el alta comercial de EPI10 en Stripe. [Requisitos oficiales](https://docs.stripe.com/payments/managed-payments/eligibility)

La pantalla de onboarding y la web oficial muestran un recargo del 3,5 % sobre
las comisiones habituales. Se registra como información consultada el
2026-09-15, no como presupuesto contratado para EPI10.
[Managed Payments](https://stripe.com/managed-payments)

## Decisiones pendientes

- Producto, precio y oferta comercial definitiva: `Unknown`.
- Configuración fiscal, facturación del servicio y datos productivos: `Unknown`.
- Cuenta productiva y titularidad legal: `Unknown`. Cuenta del sandbox y
  acceso CLI/API y escrituras de catálogo/checkout comprobados.
- Validación de wallets y dispositivos físicos, si se incluyen en el servicio real.
  Recuperación, receptor, deduplicación, doble intento, 3DS y devolución probados en SKI-50/51/52.
- Cuenta productiva EPI10 y aceptación de Carmen: `Unknown`.

Para cerrar una recomendación, registrar la elección confirmada y su evidencia
en la bitácora, actualizar esta tabla y trasladar la instrucción reutilizable a
la guía. No convertir un formulario visible en evidencia de configuración guardada.

## D23 — Publicación pública y legibilidad

Raúl pide que Carmen abra el enlace y solicita ampliar letra y ajustar el CTA
inferior. Se publica con acceso público, se aumenta la escala tipográfica y se
separa el precio del botón. Acceso y geometría verificados en E15. No supone
aceptación de Carmen ni ejecución de un pago.

## D24 — Vercel como enlace de presentación

Raúl prefiere una dirección de Vercel para compartir con Carmen. Se publica
la misma vista y se actualizan metadatos y documentación. La versión de Sites
se conserva como histórico; Vercel pasa a ser la URL vigente. Evidencia E16.

## D25 — Configuración de la cuenta EPI10 por fases

La configuración comercial y operativa completa se ejecutará en SKI-77 con la
cuenta y datos de EPI10; la demo continúa con lo necesario para cobrar en
pruebas, confirmar, recuperar y recibir eventos. En SKI-74 se detectan decisiones
que cambien el flujo antes de replicarlo. [Desglose](configuracion_entornos.md).
No se ha configurado ni activado la cuenta productiva en esta aclaración.

## D26 — Checkout Sessions y confirmación propia

La página de Vercel crea o recupera sesiones del sandbox para controlar el
retorno y una referencia de compra estable. `/compra` verifica el estado en
Stripe; no usa un parámetro de URL como prueba de pago. La aplicación utiliza
una clave de pruebas propia y no depende de la sesión temporal del CLI.
El Payment Link inicial se conserva como referencia independiente.
[Procedimiento y evidencia](confirmacion_recuperacion.md).

## D27 — Notificación verificada y registro persistente

El receptor comprueba la firma sobre el cuerpo original y consulta el estado
actual del pago en Stripe. Upstash Redis, conectado por Vercel Marketplace con
plan gratuito, conserva identificadores mínimos mediante una escritura atómica.
El reenvío incrementa su contador y conserva una única actuación de demo por
compra. Un segundo pago queda señalado para revisión. No se ejecutan altas en
Healthie/Odoo; esa integración pertenece a las oleadas posteriores.
[Contrato, límites y evidencia E18](webhook_stripe.md).
