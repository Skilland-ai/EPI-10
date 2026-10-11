# Área 1 · Acceso e inicio del portal y selector del back office: diseño, datos e integración (v1)

Fecha: 2026-10-11 · Linear: SKI2-231 (hija de SKI2-230) · Fase A cerrada y fase B en integración (el orquestador adelantó la fase B: la base del área 0 ya estaba lista)
Entrada: [feedback de Raúl](../2026-10-11_feedback_vistas_openemr_v1.md) §1.1, §1.2, §1.10, §2.1 y §2.2 · [guía de la base](00_base_interfaz.md) · contrato v1 (`CONTRATO.md`, rama `ski2-210`) · etapas del caso en Odoo ([contrato de Odoo §2.2](../../odoo/2026-10-03_contrato_api_odoo_v1.md))
Código: rama `renove-area-1` de `Skilland-ai/epi10-oe-module` (sale de `renove-area-0`), carpeta `oe-module-epi10-ui/`. Último commit: `61239e4`.

## Resumen

- **Sin laboratorio aparte.** La base del área 0 ya traía el shell en los dos logins y en el inicio del portal, así que el trabajo se hizo directamente sobre ella, en la rama `renove-area-1`. Antes de instalar se probó sin tocar la instancia (ver «Pruebas»). La instalación la hace el área 0, según el protocolo de integración.
- **Inicio del portal:** se conservan las tarjetas y se añade una tarjeta grande **«Estás en · Siguiente»** con un indicador de 5 tramos. Su botón lleva a la tarjeta que toca. Las tarjetas avisan de lo pendiente («2 pendientes», «Disponible»). Ajustes, Ayuda y Cerrar sesión ya estaban en el menú de usuario (área 0).
- **Inicio del back office:** página propia con un **selector de funcionalidades** (Clientes, Mensajes, Calendario, Documentos e informes, Ajustes) y el **panel «Hoy»** con cuatro bloques sacados de OpenEMR. Es la **primera pestaña tras el login** por configuración nativa (`default_open_tabs`). El calendario deja de abrirse solo.
- **Login del portal:** el enlace mágico pasa a ser la vía principal («Entra con tu enlace»). Debajo, usuario y contraseña, **sin el campo de correo**. Login del back office: el del área 0, sin cambios.
- **Fase del caso:** la deduce OpenEMR con el interior del contrato v1 (formularios, informe publicado y cita). Las etapas que solo conoce el monolito (test pedido, recibido, muestra…) ya tienen su texto, a la espera de un dato que hoy no llega. Propongo la tabla `epi10_fase_caso` y una operación compatible para después de la demo (v1.1).
- **Sin tocar el núcleo ni el contrato.** Ids intactos (`#documents-go`, `#messages-go`, `#appointments-go`, `#reports-go`, `#quickstart_dashboard`, `#authUser`, `#uname`…), con `data-epi10-*` al lado.

## Comparativa corta (patrones de inicio)

La base de componentes ya está decidida (EPI10 UI, área 0). Lo que había que elegir es el **patrón** de cada inicio.

| Referencia | Qué aporta | Qué se toma |
|---|---|---|
| Healthie, portal del cliente (referencia de Raúl) | Inicio con «siguiente acción» arriba y tarjetas de tareas debajo | Tarjeta destacada con el siguiente paso y un único CTA |
| Medplum Foo Medical (portal de pacientes open source, Apache-2.0; React + Mantine) | Inicio con tarjetas grandes de «acción requerida» y accesos | Avisos de estado en las tarjetas (pendiente, disponible) |
| Bloques de dashboard de shadcn/ui (MIT: `dashboard-01`, tarjetas de sección y KPI) | KPI con número grande, título y ayuda, y listas compactas | Anatomía del panel «Hoy»: título, ayuda, total y lista de 8 con «y N más» |
| Lanzador de apps (Google Workspace, Odoo, la home de Odoo que ya usan) | Cuadrícula de iconos grandes para elegir función | Selector del back office: 5 baldosas, 2 columnas en el móvil |
| Stepper de seguimiento de envíos o pedidos | Fases discretas con «estás aquí» | `epi-steps` (área 0) en 5 tramos, con el actual a medias |
| Plantillas de dashboard de clínicas (Medjestic, Clinova…) | — | Descartadas: de pago, y ensucian con KPI clínicos que EPI10 no usa |

No se añade ninguna librería: todo son componentes `epi-` del área 0 y una sección de CSS nueva (`Área 1 · inicio`).

## Las cuatro vistas

### 1. Login del portal (`portal/index.php`, PHP del núcleo)

- Se mantiene el envoltorio JS del área 0 (`epi10-login-portal.js`), que **mueve** el formulario del núcleo dentro del shell sin clonarlo.
- Encima del formulario va el bloque **«Entra con tu enlace»**: «Te lo enviamos por correo. Ábrelo desde el móvil o el ordenador y entrarás sin contraseña». Debajo, «o con tu usuario y contraseña» y el formulario de dos campos. Al pie, «¿Problemas para entrar? Escríbenos».
- **Correo fuera** (`enforce_signin_email = 0`, `sql/acceso_portal_simple.sql`). **Decisión documentada:** el correo no es un segundo factor. Es un dato que cualquiera que conozca el usuario suele conocer, y que la clienta ya usó para recibir el enlace. La seguridad real no cambia: contraseña aleatoria que nunca sale de OpenEMR, enlace de un solo uso con caducidad y bloqueo por intentos fallidos (`password_max_failed_logins = 20`). Se puede deshacer con `acceso_portal_simple_quitar.sql`.
- **Pedir un enlace nuevo desde el login no existe en v1.** Hoy el monolito puede volver a llamar a `crear_acceso`. Propuesta para después de la demo: «¿Tu enlace ha caducado? Te mandamos otro» → un formulario de correo que llame al monolito, que es quien envía los correos. No es OpenEMR quien lo envía.

### 2. Login del back office (`interface/login/login.php`)

Lo hace el área 0 con `TemplatePageEvent` (`@epi10/login/backoffice.html.twig`): la misma base que el portal, sin enlace de licencias ni selector de idioma. El área 1 lo da por bueno y no lo cambia.

### 3. Inicio del portal «Tu espacio EPI10» (`portal/home.php`)

```text
┌ cabecera: logo · (volver) · [LP Lucía ▾] → Ajustes · Ayuda · Cerrar sesión ┐
│ HOLA, LUCÍA                                                               │
│ Tu espacio EPI10                                                          │
│ Aquí tienes todo tu proceso NutriWell…                                    │
│ ┌──────────────── tarjeta destacada (azul) ───────────────┐               │
│ │ PASO 3 DE 5 · TU TEST                                    │               │
│ │ Estás en  Test recibido                                  │               │
│ │ Siguiente Haz el test en casa… o pide cita               │               │
│ │ [ Ver citas → ]                                          │               │
│ │ ▬▬▬ ▬▬▬ ▬▬░ ░░░ ░░░  Bienvenida · Documentos · Test …    │               │
│ └──────────────────────────────────────────────────────────┘               │
│ [Mis documentos · 2 pendientes] [Citas] [Mensajes ③] [Mi informe] [Tienda] │
└────────────────────────────────────────────────────────────────────────────┘
```

- El bloque va dentro del `<template id="epi10-cabecera-inicio">` del área 0, que sustituye al «Dashboard» del núcleo.
- El botón del siguiente paso **pulsa la tarjeta correspondiente** (`data-epi10-ir="appointments-go"`). Así el núcleo abre su sección como siempre y la tarjeta queda marcada (`data-epi10-siguiente`).
- **Destinos de las tarjetas** (`config.php › destinos_tarjetas`): Citas → `oe-module-epi10-ui/public/portal/citas.php` (área 5) y Mensajes → `oe-module-epi10-ui/public/portal/mensajes.php` (área 3). Las dos son URL finales que han dado esas áreas. Solo se usan **si el archivo existe** en la instalación; si no, la tarjeta abre la sección del núcleo. «Mis documentos» y «Mi informe» siguen en el núcleo, porque el ensayo E2E de SKI2-210 entra por `#documents-go`. Las áreas 2 y 4 añaden su URL cuando la tengan.

### 4. Inicio del back office (`oe-module-epi10-ui/public/backoffice/inicio.php`)

```text
DOMINGO, 11 DE OCTUBRE
Hola, Aitor
[Clientes] [Mensajes ①] [Calendario] [Documentos e informes ⑧] [Ajustes]
Hoy                                            Se actualiza al abrir el inicio.
┌ Casos nuevos            10 ┐ ┌ Consentimientos y cuestionarios   8 ┐
│ Marta … · Alta · hoy 21:03 │ │ Lucía … · Consentimiento firmado · 7 oct │
└────────────────────────────┘ └─────────────────────────────────────┘
┌ Mensajes sin responder   1 ┐ ┌ Informes por publicar             4 ┐
```

- Se abre como pestaña de `main.php`, en modo compacto: la barra de OpenEMR ya está arriba y los menús son del área 7.
- Cada baldosa y cada fila del panel abre su destino **en una pestaña de OpenEMR** (`top.navigateTab` + `activateTabByName`), igual que el menú. Fuera de `main.php`, es un enlace normal.
- Destinos (`config.php › selector_backoffice` y `ficha_cliente`): se usa la **primera URL instalada**. Clientes y Documentos → `clientes.php` del área 7, o el buscador del núcleo. Mensajes → `backoffice/mensajes.php` del área 3, o el Message Center. Las filas del panel → `ficha.php?set_pid=` del área 7, en la pestaña que toca (`#resumen`, `#documentos` o `#mensajes`), o la ficha del núcleo.
- Sin permiso `patients/demo`, el panel no se pinta y queda solo el selector.

## Modelo de datos

### Fase del caso (`src/Inicio/FaseCaso.php`, función pura, y `DatosCaso.php`, lectura)

La fuente de verdad del estado del caso es **Odoo** (etapas con `x_epi10_code`). OpenEMR solo sabe una parte. Por eso hay dos niveles:

| Origen | Cuándo | Qué da |
|---|---|---|
| **Explícito** | Si existe la fila de la clienta en `epi10_fase_caso` (propuesta) o, en la demo, en `config.php › fases_muestra` | Cualquiera de las 11 etapas |
| **Deducido de OpenEMR** | Siempre que no haya dato explícito | `nuevo` (sin formularios asignados) → `onboarding` (alguno sin completar) → `listo_test` (todos completados) o `cita` (además, cita futura no cancelada) → `entregado` (hay un informe publicado) |

Los formularios se leen con `Portal\Formularios::estado()` y los informes con `Informes::publicados()`, del interior del contrato v1. Son las mismas reglas que `estado_formularios` y R4, sin copiarlas. Las citas salen de `openemr_postcalendar_events`.

| Tramo del journey (lo que ve la clienta) | Etapas de Odoo | «Estás en» → «Siguiente» (ejemplos) | Botón |
|---|---|---|---|
| 1 · Bienvenida | `nuevo` | Pago confirmado → Firma tu consentimiento | Mis documentos |
| 2 · Tus documentos | `onboarding` | Tus documentos → el primer formulario sin completar | Mis documentos |
| 3 · Tu test | `listo_test`, `test_pedido`, `test_recibido`, `cita`, `test_realizado` | Test recibido → Haz el test en casa… o pide cita | Citas (en `test_recibido` y `cita`) |
| 4 · Laboratorio | `muestra_enviada`, `entregable` | Informe en preparación → El equipo está preparando tu informe | Mensajes (en `entregable`) |
| 5 · Tu informe | `entregado`, `cerrado` | Informe listo → Ya puedes leer tu informe | Mi informe |

**Propuesta para SKI2-210, después de la demo del 13 oct (contrato v1.1, cambio compatible; aprobada por el orquestador el 11 oct):**

```sql
CREATE TABLE IF NOT EXISTS `epi10_fase_caso` (
  `pid` BIGINT NOT NULL PRIMARY KEY,
  `codigo` VARCHAR(32) NOT NULL,           -- x_epi10_code de la etapa de Odoo
  `actualizado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

Operación nueva `fijar_fase` · `POST /api/epi10_v1_fase` `{"pid": 12, "codigo": "test_recibido"}` (scope `user/epi10_v1_fase.c`, idempotente). El monolito ya reacciona a los cambios de etapa en Odoo, así que la llamaría en el mismo punto. Por las reglas del contrato, sube la versión a 1.1.0 sin romper nada. Mientras no exista, el código del área 1 la ignora: comprueba si la tabla existe.

### Panel «Hoy» (`src/Inicio/PanelHoy.php`, solo lectura)

| Bloque | Consulta | Regla |
|---|---|---|
| Casos nuevos | `epi10_referencias` ⨝ `patient_data` | Altas del contrato (`crear_acceso`) de los últimos 7 días (`dias_casos_nuevos`) |
| Consentimientos y cuestionarios | `onsite_documents` ⨝ `document_templates` | Enviados por la clienta (`denial_reason = 'In Review'`) y aún sin revisar (al revisarlos, el núcleo los pasa a «Locked»). Distingue consentimiento firmado o enviado sin firma, y cuestionario |
| Mensajes sin responder | `onsite_mail` ⨝ `patient_access_onsite` | Conversaciones cuyo **último** mensaje (copia del equipo) es de la clienta. Coincide con el hilo que construye el área 3 |
| Informes por publicar | `epi10_fase_caso` (`entregable`) o, sin ella, aproximación | Exacto con la tabla propuesta. Hoy: formularios completos y sin informe publicado. **El borrador o la validación del informe viven en el monolito**, así que el bloque lo dice en su ayuda («Documentos completos y sin informe publicado») |

Cada bloque enseña 8 filas y «y N más». En los datos de la instancia hay 10 casos nuevos, 8 documentos, 1 mensaje y 4 informes. Los totales alimentan los contadores del selector.

## Cómo se engancha sin tocar el núcleo

| Pieza | Mecanismo | Dónde |
|---|---|---|
| Entrada del back office tras login | **Configuración nativa**: `main_screen.php` abre las pestañas de la lista `default_open_tabs` (`list_options`). Se añade «Inicio» (`epi10`, seq 1) con la página del módulo y se desactivan `cal` y `msg`. `DefaultTabsFilter` del núcleo valida que la ruta exista | `sql/inicio_backoffice.sql` (y `_quitar.sql`) |
| Login del back office | `TemplatePageEvent` (área 0) | `@epi10/login/backoffice.html.twig` |
| Login del portal | `ScriptFilterEvent` + CSS (área 0) y global `enforce_signin_email` | `epi10-login-portal.js`, `sql/acceso_portal_simple.sql` |
| Fase del caso en el inicio del portal | Funciones Twig `epi10_caso()` y `epi10_destino()`, registradas en `TwigEnvironmentEvent` (el núcleo no pasa estos datos a `home.html.twig`) | `src/Inicio/FuncionesTwig.php`, `templates/sobrescritas/portal/header.html.twig` |
| Tarjetas del portal | Sobrescritura de `portal/partial/_nav_icon.html.twig` (área 0) con avisos y destinos | `templates/sobrescritas/portal/partial/_nav_icon.html.twig` |
| Inicio del back office | Página propia con `Vista::backoffice()` | `public/backoffice/inicio.php`, `@epi10/paginas/inicio-backoffice.html.twig` |

Descartado: redirigir con un listener de login o tocar `main.php`. La lista de pestañas es la vía prevista por OpenEMR, se administra desde «Listas» y sobrevive a las actualizaciones.

## Selectores `data-epi10-*` nuevos (Playwright)

`data-epi10-region="fase-caso"` con `data-epi10-fase` (código) y `data-epi10-origen` (`openemr` o `monolito`) · `data-epi10-accion="siguiente-paso"` + `data-epi10-ir` · `data-epi10-siguiente` en la tarjeta que toca · `data-epi10-estado` en los avisos de las tarjetas · `data-epi10-vista="inicio-backoffice"` · `data-epi10-region="selector"` y `"hoy"` · `data-epi10-funcion` y `data-epi10-accion="abrir-<función>"` · `data-epi10-hoy="<bloque>"` con `data-epi10-total` · `data-epi10-accion="abrir-cliente"` · `data-epi10-region="enlace-magico"` en el login.

## Pruebas (sin instalar, 11 oct)

- `php -l` de todas las clases y páginas en el contenedor de OpenEMR 8.4.1: sin errores.
- Lectura real como `apache`, con las clases cargadas desde una carpeta temporal y luego borradas. Lucía (pid 1): `listo_test`, tramo 3, «Documentos completados». pid 12, 16 y 17: `entregado`, tramo 5. Etapas explícitas: `test_recibido` → tramo 3 con botón a Citas; `muestra_enviada` → tramo 4 sin botón. Panel «Hoy»: 10 · 8 · 1 · 4, y los mensajes de Lucía ya respondidos no salen.
- Render Twig de las tres plantillas sobrescritas o nuevas con el entorno de OpenEMR: sin errores, 4 bloques y 5 funciones.
- Capturas «antes» (escritorio y móvil) en `openemr-pruebas/evidencia/capturas/renove/01-acceso-inicio/antes_*.png` con `scripts/capturas-area-1.mjs`. Las «después» se sacarán cuando el área 0 instale la rama.

## Riesgos y Unknown

| # | Riesgo o Unknown | Mitigación |
|---|---|---|
| R1 | Las plantillas sobrescritas llaman a `epi10_caso()`: si se instalan sin `src/Inicio`, Twig da error en el inicio del portal | Va todo en el mismo módulo y la misma rama; lo he avisado al área 0 |
| R2 | Quitar el correo del login rompe scripts que rellenan `#passaddon` sin tolerar que falte (`openemr-pruebas/scripts/portal_ui.mjs:32`) | No exportar `PORTAL_EMAIL`, o añadir `.catch`. El E2E de SKI2-210 entra por enlace mágico y no le afecta |
| R3 | `default_open_tabs` es global: también admin entra en el inicio | Es lo que pidió Raúl («nunca el calendario», también como admin). Se deshace con `inicio_backoffice_quitar.sql` |
| R4 | La fase deducida no ve las etapas 40–90 (test, muestra, laboratorio): con formularios completos dirá «Documentos completados» aunque el test ya esté en casa | `fases_muestra` para la demo y `epi10_fase_caso` + `fijar_fase` (v1.1) para producción |
| R5 | «Informes por publicar» es una aproximación hasta que exista `epi10_fase_caso` | El bloque lo dice en su texto de ayuda |
| R6 | Dos clases de fase (área 1 `Inicio\FaseCaso`, área 7 `Backoffice\FaseCaso`) | **Acordado con el área 7:** su clase delegará en `Inicio\FaseCaso::calcular()` y `DatosCaso::paraPaciente()` al integrar. Solo conserva los textos para el equipo. `calcular()` devuelve el tramo y los formularios |
| R7 | Rendimiento del panel con miles de clientes («informes por publicar» calcula el estado de las candidatas, tope 100) | Con `epi10_fase_caso` pasa a ser una sola consulta |
| U1 | Correo de soporte para «¿Problemas para entrar? Escríbenos» | Hoy, la web de EPI10 (`config.php › ayuda_url`) |
| U2 | URL final de las vistas de las áreas 2 y 4 (las de 3, 5 y 7 ya están en `config.php`) | `destinos_tarjetas` y `selector_backoffice` aceptan varias URL y se usa la primera instalada |
| U3 | Que el área 7 añada «Inicio» a su menú «EPI10 Operaciones» | Comprometido por el área 7 en cuanto `inicio.php` esté instalado |
