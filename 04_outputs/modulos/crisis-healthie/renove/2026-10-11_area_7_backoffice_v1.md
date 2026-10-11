# Área 7 · Back office de Aitor: menús por omisión, lista de clientes y ficha EPI10 (v1)

Fecha: 2026-10-11 · Linear: SKI2-236 (hija de SKI2-230) · Estado: **fase A terminada** (research, prototipo y configuración aplicada en la instancia); fase B en curso sobre la base del área 0
Entrada: [feedback de Raúl](../2026-10-11_feedback_vistas_openemr_v1.md) §2.2, 2.3, 2.4 y 2.7 · [guía de la base](00_base_interfaz.md) · [informe SKI2-207](../2026-10-07_openemr_headless_v1.md) §3.4
Código: repo `Skilland-ai/epi10-oe-module`, rama `renove-area-7` (`config-instancia/area-7/`, `lab/area-7/`)

## En cinco líneas

1. **Los menús se esconden con configuración nativa de OpenEMR, sin código**: un menú propio (`custom_menus`), un menú de ficha propio y un grupo ACL «EPI10 Operaciones». Ya está aplicado a `operaciones.prueba`; admin no cambia.
2. **El recorte anterior (MenuEvent del prototipo) era la causa del «solo veo Clientes»**: comparaba etiquetas en inglés que OpenEMR ya había traducido. SKI2-210 lo ha quitado del módulo.
3. **Lista de clientes y ficha EPI10 son vistas propias**, no el dashboard clínico recortado. El layout DEM de OpenEMR es global (no hay layout por grupo), así que recortarlo habría recortado también a admin.
4. **La fase del journey se deduce de lo que OpenEMR ya sabe** (acceso al portal, formularios, informe publicado). El contrato v1 no cambia. Lo que vive en Odoo (kit, cita, laboratorio) se marca como «seguimiento en Odoo».
5. **Prototipo funcionando en la instancia** con 19 comprobaciones de Playwright en verde, escritorio y móvil sin scroll horizontal.

## 1. Comparativa corta y elección

### Menús (tabla 2.7)

| Opción | Cómo | Pros | Contras | Veredicto |
|---|---|---|---|---|
| `MenuEvent` en un módulo (prototipo SKI2-207) | PHP filtra el menú por usuario | Flexible | Código; las etiquetas llegan **ya traducidas**, así que el filtro por «Calendar» falla en español; hay que mantenerlo en cada versión | Descartado (retirado de `oe-module-epi10`) |
| **Menú propio de OpenEMR** (`sites/default/documents/custom_menus/*.json` + `users.main_menu_role`) | JSON con las entradas, asignado por usuario en Administración › Usuarios | Nativo, sin código; vive en el volumen `sites` y sobrevive a la actualización de la imagen; respeta las ACL de cada entrada | Por usuario, no por grupo (se asigna al dar de alta a Aitor y Carmen) | **Elegido** |
| Solo ACL | Quitar permisos | Seguridad real | Deja huecos raros y no renombra («Finder», «Paciente») | **Complemento**: grupo ACL «EPI10 Operaciones» |

### Ficha de cliente

| Opción | Pros | Contras | Veredicto |
|---|---|---|---|
| Layout DEM recortado (campos con `uor = 0`) | Nativo | **Global**: también lo pierde admin. Comprobado en 8.4.1: `grp_aco_spec` solo lo respetan los formularios LBF, no la demografía | Descartado para el día a día |
| Dashboard Context Manager (módulo incluido en 8.4) | Oculta tarjetas del dashboard por usuario | Sigue siendo el «Medical Record Dashboard», con su cabecera clínica y su menú de ficha | Red de seguridad opcional (no aplicado) |
| **Vista propia** (lista + ficha con 5 pestañas) que lee `patient_data` y los servicios internos de `oe-module-epi10` | Solo lo que EPI10 usa, con la base del área 0; el resto sigue en OpenEMR | Hay que mantener 3 páginas | **Elegido** (lo deja abierto la issue: «vista propia o layout recortado») |

### Componentes de interfaz

| Necesidad | Candidatos | Elección |
|---|---|---|
| Lista legible de 2.000 clientes | DataTables (ya en OpenEMR, lo usa el Finder: letra pequeña y estética de 2015) · Tabulator 6 (MIT, ~100 KB y su propio CSS) · Grid.js (MIT, ligero, estilos aparte) · TanStack Table (exige React y build) | **Tabla del kit `epi-table` + búsqueda en el servidor + 60 líneas de JS** (búsqueda en vivo a los 300 ms, filtros por estado, paginación). En móvil, la fila pasa a tarjeta. Sin librería: nada que vendorizar |
| Pestañas de la ficha | Tabs de shadcn/ui (Radix) · Basecoat tabs | Anatomía de shadcn Tabs: `role="tablist"`, flechas, Inicio/Fin y `#ancla` para volver a la misma pestaña |
| Fase del journey | Stepper propio | 5 tramos del journey v2, con los tramos 3–4 marcados juntos (Odoo) |
| Referencias de patrón | Ficha de cliente de Healthie (Overview · Documents · Chat · Appointments), página de paciente de Medplum, ejemplo «Tasks» de tabla de datos de shadcn | Solo como referencia |

## 2. Qué se ha aplicado en la instancia (fase A)

Script reproducible e idempotente: `config-instancia/area-7/aplicar.sh` (`--menu-principal`, `--lab`, `--revertir`). No reinicia OpenEMR.

| Pieza | Estado |
|---|---|
| Grupo ACL «EPI10 Operaciones» (`epi10_operaciones`, hijo de «OpenEMR Users»): `write` en `patients/demo`, `docs`, `notes`, `appt` y `patientportal/portal` | ✅ `operaciones.prueba` sale de Front Office y entra aquí. Nada clínico, de facturación ni de administración |
| Menú principal «EPI10 Operaciones» | ✅ asignado a `operaciones.prueba` |
| Menú de la ficha «EPI10 Operaciones» (Ficha EPI10 · Documentos) | ✅ asignado |
| Prototipo en `/portal/epi10-lab-7/` (lista, ficha, funciones avanzadas) | ✅ (OpenEMR bloquea las rutas de módulos sin registrar; por eso va bajo `/portal`, pero con la sesión del equipo) |
| admin y usuario técnico del contrato | Sin cambios (comprobado: admin conserva su menú completo) |

### Menú resultante frente a la tabla 2.7

| Menú de OpenEMR | Decisión de Raúl | Resultado |
|---|---|---|
| Calendario | Se queda | **Calendario** |
| Finder | Se queda como «Buscador» | **Buscador** → lista de clientes a pantalla completa |
| Mensajes | Se queda | **Mensajes** → vista de equipo del chat del área 3 (`/portal/epi10-lab-3/equipo.php`) |
| Paciente | Se queda como «Clientes» | **Clientes** › Ficha del cliente · Citas del cliente |
| Informes | Dudoso, revisar | **Informes** › Listado de clientes · Citas. Los clínicos y financieros, escondidos |
| — | Ajustes con «Funciones avanzadas» | **Ajustes** › Mis preferencias · Cambiar contraseña · **Funciones avanzadas** |
| Flujo, Recalls, Honorarios, Modules, Procedimientos, Administrador, Varios | Esconder | Escondidos. Los que permitan las ACL del usuario aparecen en «Funciones avanzadas» |
| Menús emergentes | Esconder salvo Citas; valorar Etiqueta de dirección y Barcode Label | Citas pasa a «Clientes › Citas del cliente». Etiquetas: escondidas y disponibles en «Funciones avanzadas» (requieren activar `addr_label_type` / `barcode_label_type`) |

**Funciones avanzadas** lee el menú estándar de OpenEMR y aplica las mismas restricciones de ACL y globals que el núcleo: cada persona ve lo que sus permisos le dejan abrir, nada se ha borrado. Con un cliente abierto, ofrece además la ficha clínica completa de OpenEMR.

## 3. Inventario funcional de la ficha (para que Raúl lo valide)

Todo lo que no está en esta lista no se enseña en la ficha EPI10. Sigue en OpenEMR (ficha completa, en «Funciones avanzadas»).

| Campo | Columna de OpenEMR | Quién lo rellena | En la ficha EPI10 |
|---|---|---|---|
| Nombre | `patient_data.fname` | El pago (Stripe) → contrato `crear_acceso` | Cabecera y Datos (editable) |
| Apellidos | `lname` | Igual | Cabecera y Datos |
| Fecha de nacimiento | `DOB` | Cliente (opcional en el pago) | Datos |
| Correo | `email` | El pago → contrato | Cabecera y Datos |
| Teléfono | `phone_cell` | Cliente o Aitor (**Unknown**: si Stripe lo recoge) | Cabecera y Datos |
| Dirección de envío del kit | `street`, `postal_code`, `city`, `state` | Cliente o Aitor | Datos |
| Código del kit | `usertext1` (campo de usuario que ya existe y está oculto en el layout DEM; no se crea columna) | Aitor al registrar el test (D8). **La fuente es Odoo**: ver la pregunta abajo | Datos |
| Estado del caso / fase del journey | — (se deduce, no se guarda) | El sistema | Cabecera (insignia y stepper) y Resumen (siguiente paso) |
| Enlace al caso en Odoo | — (`epi10_referencias.referencia` = `case_id`) | El sistema | Resumen: código del caso; botón «Abrir en Odoo» cuando haya URL (**Unknown**) |

**Preguntas para Raúl:** ¿el código del kit se duplica en OpenEMR o solo se consulta en Odoo? (por omisión, propongo no duplicarlo); ¿«Más datos» plegado en la ficha, o basta con «Funciones avanzadas»?

### Cómo se deduce la fase (sin tocar el contrato)

| Estado en la lista | Tramo del journey | Regla |
|---|---|---|
| Alta | 1 · Compra y alta | Sin formularios asignados (con o sin acceso al portal) |
| Onboarding | 2 · Onboarding | Algún formulario asignado y no completado (misma regla que `estado_formularios`, usando la clase interna `Portal\Formularios`) |
| Test en curso | 3–4 · Test, cita, laboratorio | Formularios completos (D3) y sin informe publicado. El detalle del kit está en Odoo |
| Informe entregado | 5 · Entrega | Hay un informe publicado por el contrato (`epi10_informes_publicados`) |

## 4. Ficha y lista (prototipo)

- **Lista** (`clientes.php`): buscador grande encima (nombre, apellidos, correo, teléfono), filtros por estado con recuento, columnas nombre · correo · estado del caso · última actividad, fila entera pulsable, 25 por página, nunca la ventana flotante. Última actividad = lo más reciente de ficha, mensajes del portal, documentos del portal y documentos.
- **Ficha** (`ficha.php`): «← Clientes» (vuelve a la lista con la misma búsqueda), cabecera con iniciales, nombre, correo, teléfono, insignia de estado y stepper de 5 tramos. Pestañas:
  - **Resumen**: siguiente paso (frase), código del caso y lista «Cómo va» (acceso, consentimiento, cuestionario, informe, próxima cita).
  - **Documentos**: los tres documentos con su estado. Hueco `data-epi10-slot="documentos"` para la isla del área 4.
  - **Mensajes**: hilo del cliente con la isla del área 3 (`equipo.php?pid=…&solo=1`), con contador de no leídos en la pestaña.
  - **Citas**: próximas y anteriores; «Nueva cita» abre el editor de citas del núcleo en su diálogo.
  - **Datos**: solo el inventario, en lectura; «Editar» abre el formulario de esos campos (CSRF y ACL `patients/demo` write).
- **Nada clínico**: ni Medical Record Dashboard, ni encuentros, alergias o medicación. El recorrido lo comprueba.
- **Navegación**: Buscador → cliente → ficha; «← Clientes» vuelve. La ficha fija el cliente en la cabecera de OpenEMR sin abrir la pestaña de encuentros que abre el núcleo.

Capturas de la fase A: `openemr-pruebas/evidencia/capturas/renove/07-backoffice/fase-a/` (escritorio 1440 px y móvil 390 px) y `recorrido.json`.

### Prueba (`lab/area-7/pruebas/recorrido.mjs`, Playwright)

19/19 en verde el 11 oct: menú de operaciones exacto y sin las entradas escondidas; lista con 15 clientes y columnas legibles; búsqueda en vivo «Lucía» → 1; ficha con nombre, fase y las 5 pestañas; nada clínico a la vista; teclado en las pestañas; formulario de Datos con los 10 campos del inventario; «← Clientes» conserva la búsqueda; Funciones avanzadas con 5 grupos; móvil sin scroll horizontal en lista, ficha y datos; admin con el menú estándar completo; sin errores de JavaScript.

## 5. Integración (fase B)

| Pieza | Fase A (prototipo) | Fase B (base del área 0) |
|---|---|---|
| Páginas | `/portal/epi10-lab-7/*.php`, CSS propio aislado (`body.epi-lab7`) | `oe-module-epi10-ui/public/backoffice/{clientes,ficha,avanzadas}.php` con `Vista::backoffice(..., compacto)` y plantillas `@epi10/paginas/*.html.twig`; componentes del kit (`epi-table`, `epi-tabs`, `epi-badge`, `epi-steps`, `epi-list`) |
| Lógica | `src/FaseCaso.php`, `Clientes.php`, `Ficha.php` | Las mismas clases en `oe-module-epi10-ui/src/Backoffice/` |
| Menús | JSON apuntando al laboratorio | Mismo JSON apuntando al módulo de interfaz; se vuelve a aplicar con `aplicar.sh` |
| Ficha clínica del núcleo | Solo en «Funciones avanzadas» | **Propuesta**: listener de `patientDemographics.view` que lleve a la ficha EPI10 a quien esté en «EPI10 Operaciones» (cuando llega desde el calendario), salvo que venga de «Funciones avanzadas». Va en el Bootstrap del módulo de interfaz: se coordina con el área 0 |
| Inicio (selector) | — | Lo hace el área 1; el menú añadirá «Inicio» cuando exista |

Lo que no cambia: el contrato v1 (solo se leen sus servicios internos: `Portal\Formularios`, `epi10_informes_publicados`, `epi10_referencias`) y los ids del núcleo.

## 6. Riesgos y Unknown

| # | Riesgo o Unknown | Mitigación |
|---|---|---|
| R1 | El estado se calcula por cliente al listar (tope 300 por búsqueda). Con miles de clientes, el filtro por estado se vuelve lento | Para producción: calcularlo en una consulta agregada o cachearlo por `pid` al cambiar formularios o informes |
| R2 | **Fechas con dos zonas horarias en la instancia**: OpenEMR abre la BD en hora de Madrid, pero hay filas escritas en UTC (rutas de la API o scripts). «Última actividad» puede desviarse hasta 2 h | Revisar con SKI2-210 en qué rutas se escribe con `NOW()` en UTC; Unknown |
| R3 | `main_menu_role` es por usuario: un usuario nuevo de operaciones ve el menú estándar si nadie se lo asigna | `aplicar.sh` con `USUARIOS=…` en el alta; anotarlo en la guía de despliegue |
| R4 | Si la cabecera del área 0 cambia el modelo de vista de las pestañas de OpenEMR, la ficha deja de fijar el cliente en la cabecera | Envuelto en `try/catch`: la ficha sigue funcionando |
| R5 | En «Funciones avanzadas» aparecen etiquetas del núcleo sin traducir («Posting Payments», «Lab Overview») | Es la zona avanzada; las que vea Aitor se añaden a `i18n/openemr_es.tsv` |
| U1 | URL de Odoo para abrir un caso por `x_epi10_case_id` | Una redirección en el monolito (`/casos/<case_id>/odoo`) sería lo más limpio; fuera del contrato v1 |
| U2 | Si el código del kit se duplica en OpenEMR | Pregunta a Raúl (§3) |
| U3 | Qué informes de OpenEMR usará de verdad Aitor | Hoy quedan Listado de clientes y Citas |

## 7. Coordinación

- **SKI2-210**: quitado `simplifyMenu` y sus claves de `config.php` (commit c41f29f del PR #1), reinstalado y contrato 35/35.
- **Área 3**: ACL del chat del equipo (`patients/notes` y `patients/docs`) en el grupo; su E2E pasa 12/12 con `operaciones.prueba`. Menú «Mensajes» y pestaña Mensajes enchufados a su vista.
- **Área 5**: el nombre del centro «EPI10 Salud», la categoría «Cita EPI10» y la agenda de demo son suyos (`renove-area-5`); este script no los toca.
- **Área 0**: la página del back office usa su base en la fase B; la redirección desde el dashboard clínico se le propone a ella.
