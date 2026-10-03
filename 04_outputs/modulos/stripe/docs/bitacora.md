# Stripe — bitácora interna

**Sesión:** 2026-09-15 · **Responsable de ejecución en navegador:** Raúl.

Este registro reconstruye lo acreditado en la conversación y las capturas. La
hora de los pasos no consta: `Unknown`. La recomendación de una opción no
equivale a comprobar que se guardó. Cada entrada conserva el siguiente paso
previsto en ese momento; las posteriores registran el avance confirmado.

[Volver al módulo](../README.md) · [Decisiones](decisiones.md) · [Pruebas](pruebas.md)

## S01 — Foco de trabajo

- **Acción:** revisar el proyecto EPI10 Salud MVP de Linear y elegir Stripe como
  bloque para esta sesión.
- **Resultado:** el usuario pide ejecutar el mockup en una sentada y documentar
  el proceso a medida que se realiza. El bloque tiene 21 tareas en OL1–OL4.
- **Evidencia:** conversación del 2026-09-15 y
  [snapshot de planificación](../../../planificacion/linear/README.md).
- **Decisión:** trabajar Stripe y fundar espacios de módulos en el repo;
  documentación y planificación se preparan en paralelo por petición expresa.
- **Siguiente paso:** terminar la preparación del entorno de pruebas.

## S02 — Producto de demostración

- **Acción:** proponer un producto y un precio tras la petición «Proponme algo tú de prueba».
- **Resultado:** propuesta **«EPI10 — Servicio inicial · DEMO», pago único de
  100 EUR ficticios**. No hay creación de producto o precio acreditada.
- **Evidencia:** propuesta registrada en la conversación.
- **Decisión:** utilizarla como propuesta de configuración de demo; la
  denominación, precio y fiscalidad comerciales definitivos siguen `Unknown`.
- **Siguiente paso:** crear el producto cuando el sandbox esté identificado.

## S03 — Cuenta propia y registro en navegador

- **Acción:** explorar inicialmente la vía de sandbox anónimo del CLI.
  El único comando ejecutado en esa exploración fue
  `npx @stripe/cli@1.50.11 sandbox create --help`.
- **Resultado:** se consultó ayuda. No se ejecutó una creación real de sandbox,
  no se obtuvieron claves y no se acredita autenticación en una cuenta.
  El usuario descartó la vía anónima y eligió registrarse él mismo en navegador.
- **Evidencia:** conversación: «nono quiero registrar la cuenta no? no es mejor?»
  y «lo puedo hacer yo desde navegador sin problema»; capturas posteriores de onboarding.
- **Decisión:** conservar el entorno bajo una cuenta gestionada por el usuario.
  Se recomendó mantener Skilland como titular real de la demo.
- **Siguiente paso:** verificar el registro terminado y la identidad del entorno.

**Nota de acceso interno:** la consulta al runtime de navegador no mostró
navegadores disponibles. No hubo control automatizado de la UI; el acompañamiento
se ha realizado a partir de capturas del usuario. El acceso CLI/API autenticado
y los IDs de cuenta/sandbox eran `Unknown` en ese punto. El acceso manual al Dashboard y
el entorno de pruebas quedan confirmados posteriormente en S10.

## S04 — Descripción de actividad

- **Acción:** revisar la pantalla «Describe tu empresa en pocas palabras».
- **Resultado observado:** el campo web muestra `https://www.epi10.es/` y el
  campo de actividad contiene un texto de ejemplo de diseño de logotipos. La
  captura no contiene aún la descripción propuesta para EPI10.
- **Evidencia:** [E01 — descripción de empresa](../evidencias/2026-09-15_01_descripcion_empresa.png).
- **Decisión recomendada:** describir con transparencia el servicio representado
  y el uso exclusivo de pruebas; mantener Skilland como titular real.
- **Siguiente paso:** confirmar qué descripción quedó guardada.

Texto recomendado en la conversación:

> Estamos preparando una demostración de cobro para EPI10 Salud: un servicio de
> bienestar personalizado que combina test genético, cuestionario de hábitos,
> informe personalizado y sesión de interpretación con un profesional. El cliente
> contrata mediante un pago único online. Por ahora utilizaremos exclusivamente
> el entorno de pruebas.

El texto es una propuesta para describir la demo, no una oferta comercial aprobada.

## S05 — Pagos por Internet y facturas

- **Acción:** revisar las recomendaciones de configuración del onboarding.
- **Resultado observado:** aparecen marcadas **«Aceptar pagos por Internet»**
  y **«Enviar facturas»**.
- **Evidencia:** [E02 — opciones de cobro](../evidencias/2026-09-15_02_pagos_y_facturas.png).
- **Decisión recomendada:** dejar pagos por Internet y desmarcar Enviar facturas
  para el mockup de checkout con pago único.
- **Siguiente paso:** comprobar la configuración final. La captura conserva el
  estado anterior a esa recomendación; no acredita que se haya desmarcado facturas.

Esto no resuelve quién emitirá la factura comercial del servicio EPI10 ni la
factura del módulo adicional prevista en SKI-81.

## S06 — Gestión de ventas internacionales

- **Acción:** revisar la pantalla con Managed Payments y «Elige lo que necesitas».
  El usuario pide considerar también el futuro EPI10 real.
- **Resultado observado:** ambas opciones están sin marcar. La opción Managed
  Payments muestra un recargo del 3,5 % por transacción.
- **Evidencia:** [E03 — ventas internacionales](../evidencias/2026-09-15_03_ventas_internacionales.png).
- **Decisión recomendada:** elegir **«Elige lo que necesitas»**. Según la
  [elegibilidad oficial](https://docs.stripe.com/payments/managed-payments/eligibility),
  Managed Payments excluye bienes físicos y servicios profesionales con
  intervención humana. La combinación de test e interpretación profesional
  descrita para EPI10 es el motivo de nuestra recomendación. Stripe anuncia
  [un 3,5 % adicional](https://stripe.com/managed-payments) sobre el procesamiento habitual.
- **Siguiente paso:** confirmar selección y finalización del onboarding. La
  fiscalidad y oferta definitivas de EPI10 permanecen `Unknown`.

## S07 — Base documental por módulos

- **Acción:** crear el [índice de módulos](../../README.md), este historial,
  decisiones, guía editable, pruebas pendientes e índice de capturas.
- **Resultado:** el trabajo puede retomarse desde el README de Stripe y servir
  como fuente de una futura guía breve con marca Skilland.
- **Evidencia:** archivos enlazados en el [README de Stripe](../README.md).
- **Decisión:** registrar cada paso significativo mientras se ejecuta; separar
  historial interno e instrucciones para el cliente.
- **Siguiente paso:** continuar el onboarding, verificar resultados y actualizar
  estas fuentes. El PDF y una skill de maquetación todavía no se han creado.

## S08 — Funciones adicionales de facturación e impuestos

- **Acción:** revisar la siguiente pantalla de recomendaciones de Stripe.
- **Resultado observado:** el encabezado indica «según tu selección de Aceptar
  pagos por Internet». **«Enviar facturas»** y **«Cobrar impuestos»** aparecen
  preseleccionados. Acredita avance en onboarding y la referencia a pagos online;
  no acredita todas las opciones guardadas en pantallas anteriores.
- **Evidencia:** [E04 — funciones adicionales](../evidencias/2026-09-15_04_funciones_adicionales.png).
- **Decisión recomendada:** desmarcar ambas y continuar para esta demo de pago
  único ficticio. Facturación y tratamiento fiscal reales de EPI10 siguen pendientes.
- **Siguiente paso:** revisar su estado final desde la cuenta; desmarcado pendiente
  de verificar.

## S09 — Configuración desde el Dashboard

- **Acción:** revisar «Elige cómo configurar Stripe».
- **Resultado observado:** **«Configurar desde el Dashboard»** está seleccionado;
  también se ofrece «Empezar con una herramienta de IA».
- **Evidencia:** [E05 — configuración Dashboard](../evidencias/2026-09-15_05_configuracion_dashboard.png).
- **Decisión recomendada:** mantener Dashboard y continuar; conectar herramientas
  de desarrollo más adelante si hace falta.
- **Siguiente paso:** acceder al panel. La captura E05 no prueba la pulsación de
  Continuar; E06 posterior sí acredita llegada al Dashboard.

## S10 — Dashboard y entorno de pruebas confirmados

- **Acción:** Raúl completa el recorrido hasta el Dashboard y comparte la pantalla.
- **Resultado observado:** el usuario confirma «listo. ya en el dashboard». La
  captura muestra **EPI10 Salud**, banner **«Entorno de prueba»** y texto que
  explica que los cambios no afectarán a clientes ni pagos reales. Aparece la
  introducción «Después, configura los pagos», con botón «Entendido».
- **Evidencia:** [E06 — Dashboard en pruebas](../evidencias/2026-09-15_06_dashboard_pruebas.png).
- **Decisión:** registrar acceso al panel y entorno de pruebas como observados.
  IDs de cuenta/sandbox, titularidad legal y permisos siguen `Unknown`; no hay
  evidencia de producto, checkout ni pago creados.
- **Siguiente paso:** cerrar la introducción, revisar el entorno y preparar el
  catálogo y el checkout con la marca de demo.

## S11 — Objetivo de demo para Carmen y propuesta NutriWell

- **Acción:** el usuario solicita un listado de ejecución rápida para mostrar
  mañana un mockup funcional con marca, información y producto EPI10.
- **Resultado:** objetivo operativo para **2026-09-16**, sin cambio de las fechas
  registradas en Linear. La aceptación externa aún no ha ocurrido. Se propone
  actualizar el nombre genérico inicial a **«NutriWell · DEMO»**, conservando
  el importe ficticio de 100 EUR y el pago único.
- **Evidencia:** conversación del 2026-09-15 y
  [speedrun de la demo](speedrun_demo.md), que enlaza la fuente de marca/producto.
- **Decisión:** NutriWell es la propuesta actual para representar el producto
  EPI10; nombre todavía provisional, sin producto creado ni oferta comercial
  aprobada. Preparar la demostración y documentar cada avance.
- **Siguiente paso:** ejecutar el primer tramo del plan y registrar qué se creó.

## S12 — Logos EPI10 actualizados

- **Acción:** Raúl aporta la carpeta `02_context/EPI10-branding/Nuevos-logos-de-EPI10/`
  antes de empezar el diseño. Se revisan sus seis archivos y sus metadatos.
- **Resultado observado:** seis PNG transparentes de 824 × 293 píxeles:
  logotipo completo y variante abreviada, cada uno en azul, blanco y negro.
  Azul leído en los archivos: #044799.
- **Evidencia:** [inventario de marca](marca.md) y originales enlazados en él.
  Inspección con `view_image`, `file` e `identify`; sin modificar los originales.
- **Decisión:** usar estos nuevos activos como referencia vigente de logos para
  la demo. Aplicación propuesta: 01 azul sobre claro y 02 blanco sobre oscuro.
- **Siguiente paso:** aplicar la marca a la página/checkout durante el speedrun.
  La carga de logos no acredita que ya estén configurados en Stripe.

## S13 — Remodelación de las tareas Stripe en Linear

- **Acción:** sustituir el desglose genérico por tareas concretas del speedrun,
  a petición de Raúl, conservando feedback con Carmen y réplica final en EPI10.
- **Resultado verificado:** 12 tareas vigentes: nueve de demo, feedback, réplica
  y una subtarea de facturación dentro de la réplica. Nueve tareas anteriores
  canceladas por consolidación, con explicación y enlaces de sustitución.
  Dependencias reconstruidas y conexión con SKI-105 conservada a través de SKI-77.
- **Evidencia:** [plan operativo](linear_speedrun.md), enlaces de Linear y
  snapshots anterior/posterior en `05_scratch/stripe-remodelacion/`.
- **Decisión:** concentrar demo en OL3 (15 de septiembre), feedback el 16 y
  réplica en OL4 tras validación. Asignar las tareas vigentes a Raúl. Una tarea
  sustituida queda cancelada, sin hacer pasar su trabajo por terminado.
- **Siguiente paso:** sincronizar inventario documental y ejecutar las tareas.

## S14 — CLI autorizado y acceso API comprobado

- **Acción:** completar el flujo de dispositivo del CLI con autorización en el
  navegador; consultar cuenta, productos, precios y eventos desde terminal.
- **Resultado verificado:** CLI 1.50.11 autorizado para «Entorno de prueba de
  EPI10 Salud · sandbox», cuenta `acct_1UFzBqRrJS0VSqzs`. Cuatro lecturas correctas;
  catálogo vacío y evento devuelto con `livemode=false`.
- **Evidencia:** [acceso documentado](acceso_stripe.md) y resumen filtrado de
  consultas enlazado allí. No se copiaron credenciales al repo.
- **Decisión:** operar con CLI/API en este sandbox; el acceso ya cumple los
  criterios de SKI-28. Las escrituras se verificarán al ejecutarlas.
- **Cierre de tarea:** SKI-28 actualizada a Done y releída para confirmarlo.
- **Siguiente paso:** cerrar la ficha demo y crear producto/precio. Ningún
  producto, checkout o pago se da por creado.

## S15 — Ficha y reglas de NutriWell · DEMO preparadas

- **Acción:** contrastar el contenido con el Brand Canon y preparar una ficha
  única para página y checkout, a partir del primer paso del speedrun.
- **Resultado:** nombre provisional, 100 EUR ficticios, cantidad 1, cinco
  inclusiones, textos de compra/resultado y reglas de recuperación/duplicados.
  Imagen inicial de catálogo: nuevo logotipo azul aportado; blanco para oscuro.
- **Evidencia:** [ficha de producto](producto_demo.md), fuentes y activos enlazados.
- **Decisión:** usar el logo como imagen inicial de catálogo; resolver fotografía
  editorial en la página (SKI-37). La demo termina en confirmación y permite
  otra prueba; no promete entrega de kit, emails o cuentas creadas.
- **Cierre:** SKI-26 Done, releída en Linear; QA de ficha PASS, sin recursos Stripe creados.
- **Siguiente paso:** crear producto y precio en Stripe (SKI-48). Oferta comercial
  pendiente de Carmen; reglas definidas, aún sin implementar ni probar.

## S16 — Producto, precio e imagen creados en Stripe

- **Acción:** comprobar sandbox/catálogo, crear producto y precio predeterminado,
  subir logo y asociar su enlace a la imagen del producto; releer todo por API.
- **Resultado verificado:** `prod_epi10_nutriwell_demo_v1` y `price_1UG00zRrJS0VSqzs4Uhv6g9Q`;
  10000 céntimos EUR, `one_time`, activos, `livemode=false`. Un producto y un
  precio en el catálogo. Logo público correcto: 824 × 293 RGBA, 0 píxeles distintos.
- **Incidencia resuelta:** el CLI rechazó `file=@ruta` como `Invalid object`.
  Subida binaria completada mediante API con la misma autorización mantenida
  en memoria. Stripe cambió la codificación del PNG, conservando los píxeles.
- **Evidencia:** [catálogo y procedimiento](catalogo_stripe.md), E07 y configuración JSON.
- **Decisión:** cantidad 1 y opciones previstas guardadas; aplicación real en
  checkout durante SKI-49. No se configura fiscalidad comercial ni se hacen pagos.
- **Cierre:** SKI-48 Done, confirmado por relectura del MCP de Linear.
- **Siguiente paso:** configurar checkout con marca EPI10 (SKI-49).

## S17 — Checkout Stripe configurado y abierto

- **Acción:** aplicar marca al sandbox, crear Payment Link con el precio existente,
  cantidad 1, tarjeta, campos mínimos y confirmación nativa; releer y abrirlo.
- **Resultado:** 17 comprobaciones API correctas; formulario en español con
  NutriWell · DEMO, 100 EUR, logo azul, fondo marfil y botón #044799. Sin selector
  de cantidad, teléfono ni envío. Sesión abierta en pruebas, `unpaid`.
- **Evidencia:** [checkout](checkout_stripe.md), E08 API y E09 DOM/estilos. No se
  introdujeron datos ni se pagó; captura no disponible, revisión móvil pendiente.
- **Incidencia resuelta:** Stripe rechazó declarar ambas opciones de recogida
  adicional de nombres como falsas; se omitió ese bloque opcional. El primer
  intento no creó un enlace.
- **Decisión:** Payment Link con confirmación nativa; la correlación entre
  intentos y deduplicación se implementan en SKI-50/51. La URL es reutilizable.
- **Cierre:** SKI-49 Done a las 17:49:25 UTC, confirmado por relectura del MCP.
- **Siguiente paso:** construir la página NutriWell y conectar su botón (SKI-37).

## S18 — Texto más claro y portada NutriWell como imagen de producto

- **Petición:** Raúl revisa la pantalla y pide mejorar copy/formato y sustituir
  el logo grande por una imagen del informe; deja la página para después.
- **Acción:** revisar el folleto, extraer su portada sin edición, publicarla como
  imagen de producto y actualizar la descripción con una frase más breve.
- **Resultado:** nuevo copy y portada cargados en el mismo Payment Link; logo
  pequeño de cabecera y precio de 100 EUR conservados. API y DOM verificados.
- **Evidencia:** E10, E11 y [procedencia del activo](../assets/README.md).
- **Incidencia resuelta:** primera lectura de la subida devolvió 401. Tras consultar
  la cuenta con el CLI, la autorización permitió completar la subida sin nueva acción
  humana ni guardar credenciales. Captura automática no disponible.
- **Decisión:** descripción concisa en texto plano; portada original de NutriWell
  para representar el producto y logo nuevo en cabecera. No se hacen pagos.
- **Seguimiento:** SKI-49 actualizada en Linear y releída, conserva Done; QA PASS.
- **Siguiente paso:** SKI-37, página NutriWell; se mantiene pendiente por petición de Raúl.

## S19 — Ampliar imagen dentro del límite de Stripe

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
- **Seguimiento:** SKI-49 actualizada y releída en Linear; QA PASS en
  `05_scratch/stripe-imagen-ampliada/qa-imagen-ampliada.json`.
- **Siguiente paso:** la página propia SKI-37 permanece pendiente para después.

## S20 — Pantalla de entrada al mockup NutriWell

- **Petición:** Raúl exige una maquetación muy cuidada; aclara que la web definitiva
  pertenece al otro proveedor. Se acota SKI-37 a una vista demostrativa.
- **Acción:** crear la vista editorial con logos, foto, cinco inclusiones,
  experiencia, precio ficticio y dos CTA al checkout; preparar publicación privada.
- **Resultado:** implementación y compilación completas, TypeScript y ocho
  comprobaciones del HTML servido correctas. Sin pagos ni prueba de UI en navegador.
- **Evidencia:** [pantalla de demo](pantalla_demo.md), código en app/ y
  `05_scratch/stripe-pantalla/`.
- **Decisión:** publicación privada y documentación de alcance para el proveedor.
  Un subagente prepara únicamente la tarjeta social; fuente del sitio controlada
  por el agente principal.
- **Cierre:** publicación privada confirmada a las 18:29:52 UTC (E14). SKI-37
  Done a las 18:33:50 UTC, confirmada por relectura del MCP conservada en
  `05_scratch/stripe-pantalla/linear_ski37.json`.
- **Siguiente paso:** resultado/recuperación en SKI-50 y eventos en SKI-51;
  revisión visual y pago completo en SKI-52.

## S21 — Acceso público, tipografía y CTA de compra

- **Petición:** publicar para compartir con Carmen y ampliar la letra pequeña;
  revisar el bloque de compra inferior.
- **Acción:** texto principal 18 px, secundario 16 px y etiquetas mínimas 14 px;
  precio separado, botón centrado de 64 px y tarjeta adaptada a móvil estrecho.
- **Resultado:** DOM/medidas correctos en cinco anchos; build y TypeScript correctos.
  Acceso público revision 2 y publicación succeeded a las 18:48:20 UTC.
- **Evidencia:** E15, HTTP 200 sin autenticación y navegación real desde el CTA
  inferior al checkout de NutriWell por 100 EUR. Detalle en stripe-legibilidad/.
- **Límite:** capturas no disponibles; ningún pago realizado. La primera lectura
  con urllib devolvió 403; curl sin credenciales devolvió 200 con la versión nueva.
- **Decisión:** compartir mediante enlace público por petición expresa de Raúl;
  conservar indicaciones de demo y la separación respecto a la web del proveedor.
- **Siguiente paso:** resultado/recuperación y eventos, después pago completo.

## S22 — Publicación en Vercel

- **Petición:** Raúl prefiere Vercel para presentar una dirección más neutra.
- **Acción:** reutilizar la sesión CLI de Raúl, crear el proyecto NutriWell,
  añadir compilación Next.js y actualizar el origen de metadatos sociales.
- **Resultado:** publicación de producción READY y URL pública
  https://epi10-nutriwell-demo.vercel.app. Build/TypeScript y HTTP 200 anónimo
  correctos; imágenes/estilos accesibles y CTA al checkout de 100 EUR comprobado.
- **Evidencia:** E16, qa-conservacion.json y qa-publicacion.json en stripe-vercel/.
- **Decisión:** Vercel es el enlace vigente de presentación. No se volvió a
  publicar en Sites; la publicación anterior conserva su estado.
- **Límite:** sin pago ejecutado; la comprobación de logs no devolvió errores,
  pero no constituye monitorización continua ni auditoría de dependencias.
- **Siguiente paso:** resultado/recuperación y eventos, después pago completo.

## Plantilla para el siguiente paso

### S23 — Alcance de configuración Stripe por entornos

- **Petición:** aclarar dónde queda la configuración administrativa y operativa
  de Stripe y si hace falta completarla para continuar la demo.
- **Acción:** desglosar configuración por fases y ampliar los criterios de SKI-77;
  añadir a SKI-74 las decisiones de Carmen que puedan cambiar el recorrido.
- **Resultado:** demo y configuración real diferenciadas; SKI-74/77 releídas,
  ambas Todo. No se modifica ninguna cuenta ni ajuste de Stripe en este paso.
- **Evidencia:** configuracion_entornos.md y relecturas en
  `05_scratch/stripe-configuracion-fases/`.
- **Decisión:** resolver ahora confirmación, recuperación y eventos de prueba;
  configurar la cuenta propia de EPI10 con sus datos antes del cobro real.
- **Siguiente paso:** continuar SKI-50; mantener visibles los pendientes de SKI-77.

### S24 — Confirmación, abandono y recuperación

- **Acción:** conectar Checkout Sessions desde servidor y resultado `/compra`;
  cookie firmada, referencia estable, idempotencia y consulta real del pago.
- **Acceso:** Raúl aporta clave sandbox de aplicación; guardada localmente en
  archivo ignorado y en Vercel como variable sensible. Cuenta comprobada.
- **Resultado:** entrada → abandono → misma sesión → rechazo → reintento correcto
  → confirmación. Compra NW-D8418096, 100 EUR ficticios, un pago correcto.
- **Repetición:** pulsar compra después del pago vuelve a la confirmación;
  «Iniciar otra prueba» genera NW-60E20C9B sin confundir ambas compras.
- **Validación:** diez tests, build/TypeScript y lint sin errores. Resultado
  revisado por DOM/geometría en cuatro anchos; URL inventada no acredita pago.
- **Evidencia:** E17; detalle en `05_scratch/stripe-confirmacion/`.
- **Decisión:** conservar Payment Link como referencia y presentar el recorrido
  desde Vercel. Stripe es el registro duradero de compras para este sandbox.
- **Cierre:** SKI-50 Done a las 19:50:55 UTC, confirmada por relectura.
- **Límites:** cinco avisos de optimización de imágenes en lint; sin capturas
  visuales. Receptor, firmas, duplicación de eventos, devolución y 3DS pendientes.
- **Siguiente paso:** SKI-51; después completar SKI-52 y preparar SKI-53.

### S25 — Notificación de pago verificada — SKI-51

- **Acción:** publicar receptor en Vercel, configurar endpoint Stripe y conectar
  Upstash Redis mediante Vercel Marketplace, plan gratuito.
- **Resultado:** firma sobre cuerpo original, consulta de estado en Stripe y
  registro persistente de evento/compra/pago. La escritura conjunta evita
  duplicar la actuación de demo; un segundo pago queda para revisión.
- **Prueba real:** reenviado dos veces desde Stripe el evento del pago NW-D8418096;
  dos entregas y un registro de negocio. No se hizo otro pago.
- **Pruebas adicionales:** dos reenvíos HTTP firmados localmente (uno por despliegue),
  cuatro variantes de firma inválida sin alteración de datos, 21 tests correctos
  con dos tests contra Redis real. Build/TypeScript y lint del código nuevo correctos.
- **Incidencia resuelta:** tipado del resultado de Redis eval corregido antes del
  build; fallo asíncrono de una sesión complete/unpaid cubierto por una prueba propia.
- **Evidencia:** E18; configuración no secreta y procedimiento en webhook_stripe.md;
  detalle reproducible en `05_scratch/stripe-webhook/`.
- **Límites:** pruebas de devolución/3DS y recorrido completo de doble intento
  aún en SKI-52. Sin altas reales en Healthie/Odoo; aceptación de Carmen pendiente.
- **Siguiente paso:** SKI-52; después, guion y paquete SKI-53.

### S26 — Matriz funcional y visual — SKI-52

- **Acción:** ejecutar 3DS fallido/correcto, dos pestañas, devoluciones y recorrido
  móvil contra el despliegue público; verificar Stripe y registro persistente.
- **Resultado:** dos pagos nuevos de 100 EUR ficticios, dos devoluciones completas,
  confirmaciones coherentes y notificaciones automáticas. Una sesión/pago por compra.
- **Visual:** capturas de página, checkout, confirmación y devolución; geometría
  sin desbordamientos en cuatro anchos. Móvil emulado en Chromium, no teléfono físico.
- **Incidencias:** captura IAB fallida resuelta con Agent Browser; carga diferida
  del logo verificada tras desplazamiento. Apple Pay irregular en capturas, causa
  sin determinar; observación QA52-03 no bloqueante para la demo con tarjeta.
- **Evidencia:** E19 y validacion_demo.md; detalle en `05_scratch/stripe-pruebas/`.
- **Código:** conservado el despliegue SKI-51; no se han requerido correcciones
  ni nueva publicación. La suite de 21 tests anterior se conserva como evidencia previa.
- **Siguiente:** SKI-53, guion y paquete; después ensayo del usuario y Carmen.

### S27 — Auditoría y ordenación de Linear — 2026-09-16

- **Petición:** Raúl no veía reflejado el trabajo del 15 de septiembre y pide
  asignarse absolutamente todas las issues del proyecto EPI10 Salud MVP.
- **Acción:** releer el proyecto completo en Linear, asignar a Raúl las 106
  issues —incluidas canceladas y archivadas—, actualizar las descripciones de
  OL3 y OL4 y publicar un estado del proyecto con el resumen del bloque Stripe.
- **Resultado:** relectura completa con `hasNextPage=false`: 106 de 106 issues
  asignadas a Raúl; ocho milestones y distribución 10 + 10 + 26 + 12 + 18 +
  14 + 9 + 7. OL3 muestra ocho tareas Stripe Done y los siguientes pasos;
  OL4 distingue seis activas de seis canceladas por consolidación. Las ocho
  issues Stripe terminadas contienen ahora un comentario individual con su
  resultado, comprobaciones y ruta de evidencia.
- **Evidencia:** actualización de proyecto Linear `af9fc37f-0247-4e01-b3de-fcd6607c548d`,
  creada el 2026-09-16 a las 08:41:56 UTC; relectura final sin asignaciones
  ausentes. Comentarios releídos en SKI-26, 28, 37, 48, 49, 50, 51 y 52: uno
  por issue. Estados conservados: 11 Done, 79 Todo, 6 In Progress, 9 Canceled
  y 1 In Review.
- **Decisión:** no crear duplicados para aparentar actividad. Los IDs existentes
  describen resultados concretos y el estado del proyecto hace visible el
  trabajo ejecutado. SKI-53, SKI-74, SKI-77 y SKI-81 continúan abiertas.
- **Siguiente:** ejecutar SKI-53, preparar guion y paquete; después ensayo de
  Raúl y revisión con Carmen en SKI-74.

### S28 — Reunir Stripe en OL4 y retirar versiones antiguas — 2026-09-16

- **Petición:** la vista de OL4 hacía parecer que no se había trabajado porque
  contenía versiones antiguas canceladas, mientras el speedrun ejecutado estaba
  en OL3. Raúl pide reunir Stripe en su oleada y eliminar los históricos.
- **Acción:** trasladar a OL4 SKI-26, 28, 37, 48–53 y 74; conservar allí SKI-77
  y SKI-81; retirar del proyecto SKI-27, 38, 39, 73, 75, 76, 78, 79 y 80 y
  eliminar todas sus relaciones con las tareas vigentes.
- **Resultado:** OL4 contiene 16 issues: las 12 del speedrun Stripe —8 Done y
  4 Todo— y cuatro specs transversales. OL3 contiene 16 tareas no Stripe. El
  proyecto devuelve 97 issues, cero Canceled y todas asignadas a Raúl.
- **Evidencia:** relectura completa con `hasNextPage=false`; distribución
  9 + 8 + 16 + 16 + 18 + 14 + 9 + 7. Los nueve IDs retirados devuelven
  `projectId=null` y relaciones vacías.
- **Límite:** los nueve registros siguen existiendo fuera del proyecto en estado
  Canceled. El conector no ofrece borrado y el runtime no encontró navegador
  conectado; la eliminación física solicitada sigue pendiente.
- **Decisión:** no afirmar que están borrados. La vista del proyecto queda limpia
  ahora; completar el borrado cuando exista una sesión de navegador controlable.
- **Siguiente:** borrar físicamente los nueve IDs; después continuar SKI-53.

### S29 — Ensayo técnico previo — SKI-53 — 2026-09-17

- **Acción del usuario:** Raúl completa desde la demo pública una compra ficticia
  para comprobar el recorrido antes de la presentación.
- **Verificación:** consulta directa de Stripe y del registro Redis. Referencia
  NW-8B1611D4; sesión complete/paid, PaymentIntent succeeded, cargo pagado de
  100 EUR ficticios y `livemode=false`.
- **Evento:** `checkout.session.completed` recibido una vez; una única actuación
  `demo.payment_recorded`. No hay duplicación ni error de pago.
- **Control técnico:** URL pública HTTP 200 en 0,42 s; 21/21 tests correctos;
  build Vercel y TypeScript correctos, sin defectos críticos.
- **Evidencia:** E20 y salida reproducible en
  `05_scratch/stripe-demo-2026-09-17/checkout-verificado.json`.
- **Decisión:** GO técnico. El pago permanece sin devolver; no ejecutar refund
  sin petición de Raúl. SKI-53 pasa a In Progress, no Done.
- **Siguiente:** cerrar guion, seleccionar respaldo y hacer ensayo oral de
  3–5 minutos; después decidir si conservar o devolver el pago de sandbox.
