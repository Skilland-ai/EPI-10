# Stripe — evidencias de configuración

Capturas aportadas por Raúl en la conversación del **2026-09-15**, copiadas sin
modificaciones. Revisión visual: contienen pantallas de configuración y panel, sin claves,
credenciales ni datos sanitarios. No son capturas de pagos ejecutados.

[Volver al módulo](../README.md) · [Bitácora](../docs/bitacora.md)

| ID | Archivo | Qué acredita | Qué sigue pendiente |
| --- | --- | --- | --- |
| E01 | [Descripción de empresa](2026-09-15_01_descripcion_empresa.png) | Campo web con epi10.es; texto de ejemplo de diseño de logotipos | Descripción final guardada y titularidad de cuenta |
| E02 | [Pagos y facturas](2026-09-15_02_pagos_y_facturas.png) | Pagos por Internet y Enviar facturas aparecen marcados | Comprobar que se aplicó la recomendación de desmarcar facturas |
| E03 | [Ventas internacionales](2026-09-15_03_ventas_internacionales.png) | Ambas opciones sin seleccionar; recargo de Managed Payments visible | Comprobar elección guardada; la llegada posterior al Dashboard consta en E06 |
| E04 | [Funciones adicionales](2026-09-15_04_funciones_adicionales.png) | El encabezado menciona selección de pagos online; Enviar facturas y Cobrar impuestos marcados | Comprobar que ambas quedaron desmarcadas como se recomendó |
| E05 | [Configurar desde Dashboard](2026-09-15_05_configuracion_dashboard.png) | Configurar desde el Dashboard seleccionado | La llegada al panel se acredita en E06 posterior |
| E06 | [Dashboard en pruebas](2026-09-15_06_dashboard_pruebas.png) | Nombre EPI10 Salud, entorno de prueba visible y acceso al panel; introducción de configuración | IDs, titularidad legal, permisos y configuración guardada; catálogo y pagos sin acreditar |

| E07 | [Catálogo verificado por API](2026-09-15_catalogo_verificado.json) | Cuenta sandbox, producto/precio activos, 100 EUR no recurrentes, logo asociado y comparación de píxeles | Checkout y pagos; no acredita aceptación de Carmen |

| E08 | [Checkout verificado por API](2026-09-15_checkout_api.json) | Enlace de pruebas, precio, cantidad, tarjeta, marca, campos y confirmación configurados; 17 comprobaciones | Pago y confirmación tras pagar |
| E09 | [Checkout abierto en navegador](2026-09-15_checkout_navegador.json) | DOM en español, total, logo cargado, estilos y campos; sin selector de cantidad | Captura no disponible; revisión móvil, pago y recorrido desde la página |

| E10 | [Refinamiento API](2026-09-15_checkout_refinamiento_api.json) | Copy breve, portada como imagen del producto, logo de cabecera y precio conservados | Pago y recorrido completo |
| E11 | [Refinamiento en navegador](2026-09-15_checkout_refinamiento_navegador.json) | Nuevo texto y portada cargados; logo pequeño y modo de pruebas conservados | Captura automática y revisión móvil |

| E12 | [Imagen ampliada, API](2026-09-15_checkout_imagen_ampliada_api.json) | Portada cuadrada aplicada; precio, descripción y logo de cabecera conservados | Pago y recorrido completo |
| E13 | [Imagen ampliada, navegador](2026-09-15_checkout_imagen_ampliada_navegador.json) | Antes 212 × 300, después 300 × 300 px; imagen cargada y límites de tamaño medidos | Captura automática y revisión móvil |

| E14 | [Pantalla publicada](2026-09-15_pantalla_demo_publicada.json) | Publicación privada correcta, build, TypeScript y enlaces/metadatos del HTML servido | Revisión visual del navegador y pago completo |
| E15 | [Acceso público y legibilidad](2026-09-15_pantalla_publica_legibilidad.json) | Publicación pública, HTTP 200 anónimo, tipografía ampliada y CTA de 64 px sin desbordamientos en cinco anchos | Captura visual no disponible; pago completo pendiente |
| E16 | [Publicación Vercel](2026-09-15_vercel_publicacion.json) | READY, acceso público sin sesión, diseño conservado, metadatos y CTA al checkout comprobados | Pago completo y aceptación de Carmen pendientes |

| E17 | [Confirmación y recuperación](2026-09-15_confirmacion_recuperacion.json) | Pago de pruebas, abandono, rechazo y recuperación; mismo checkout, referencia, estado verificado, tests y Vercel | Receptor de eventos, devolución, 3DS, resto de matriz y Carmen |
| E18 | [Notificación verificada](2026-09-15_webhook_verificado.json) | Receptor público, dos entregas reales Stripe, firma verificada y un único registro persistente; firmas inválidas sin cambios, concurrencia y 21 tests | Devolución real de sandbox, 3DS, doble intento completo, revisión móvil final y Carmen |
| E19 | [Matriz funcional y visual](2026-09-15_pruebas_funcionales.json) | 3DS fallido/correcto, dos pestañas, dos pagos/devoluciones, eventos y capturas móvil/escritorio; mismo código publicado | Guion SKI-53, Carmen y cuenta real; wallets/dispositivos físicos no validados, observación QA52-03 |
| E20 | [Ensayo técnico previo](2026-09-17_ensayo_previo.json) | Compra nueva de sandbox: sesión complete/paid, PaymentIntent succeeded, cargo pagado, una entrega webhook y una actuación de negocio; HTTP 200, 21/21 tests y build correcto | Guion, capturas de respaldo y ensayo oral para cerrar SKI-53; pago aún no devuelto |

## Procedencia

- E01: adjunto `/tmp/codex-clipboard-otCyt7.png`.
- E02: adjunto `/tmp/codex-clipboard-zDgVW6.png`.
- E03: adjunto `/tmp/codex-clipboard-JOUAeC.png`.
- E04: adjunto `/tmp/codex-clipboard-oXi7YL.png`.
- E05: adjunto `/tmp/codex-clipboard-dW5Lt7.png`.
- E06: adjunto `/tmp/codex-clipboard-Mdlp2n.png`.

Los archivos temporales son la procedencia original; los enlaces anteriores
apuntan a las copias conservadas en el repo.

## Siguientes evidencias

Después de verificar cada paso, incorporar la identidad del sandbox, producto y
precio, recorrido de checkout, resultado de las pruebas y eventos. Guardar solo
lo necesario para revisar el resultado; no incluir secretos ni datos personales
o sanitarios reales. Actualizar este índice con qué demuestra cada archivo.
