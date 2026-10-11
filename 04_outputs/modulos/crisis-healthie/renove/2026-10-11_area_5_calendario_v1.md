# Área 5 · Calendario de citas: componente del portal y limpieza del back office (v1, fase A)

Fecha: 2026-10-11 · Linear: SKI2-235 (hija de SKI2-230) · Entrada: [feedback de Raúl](../2026-10-11_feedback_vistas_openemr_v1.md) §1.8 y §2.6 · [base del área 0](2026-10-11_base_interfaz_decision_v1.md) · repo `Skilland-ai/epi10-oe-module`, rama `renove-area-5`, módulo `oe-module-epi10-ui/`. Prototipo de la fase A: [`openemr-pruebas/evidencia/renove/05-calendario-laboratorio/`](../openemr-pruebas/evidencia/renove/05-calendario-laboratorio/README.md).
Estado: **fase A y fase B terminadas; PR abierto** (ver abajo). Fase B integrada en la instancia (rama `renove-area-5`, sobre la base del área 0; instala el área 0 desde `renove-integracion`). Laboratorio `epi10-lab-5` quitado de la instancia el 11 oct. Prototipo funcionando en la instancia de hermes-node con datos ficticios y probado de punta a punta con Playwright. La fase B (montarlo sobre la base del área 0 y limpiar el back office) espera a la guía `00_base_interfaz.md`.

## Resumen

- **Elección: isla Preact + htm propia, con Cally 0.9.2 (MIT, <9 KB) como rejilla del mes.** Encaja en la base ratificada (islas sin build, CSS plano con prefijo `epi-`). FullCalendar, Schedule-X y react-big-calendar son calendarios de *eventos*; lo que pide Raúl es un *selector de reserva* («elegir día → hueco → confirmar»), como el de Healthie.
- **Sin backend nuevo de datos**: la disponibilidad es la del propio OpenEMR. El equipo marca bloques «En consulta» en su calendario de siempre y el portal calcula los huecos con la misma regla que el núcleo. Las citas se guardan en `openemr_postcalendar_events` con el servicio del núcleo (`AppointmentService`), así que el equipo las ve en su calendario y el monolito puede leerlas por FHIR `Appointment`.
- **El contrato v1 no cambia**: el calendario usa la sesión de la clienta en el portal, no la API OAuth del monolito. Las citas siguen «fuera de v1» (CONTRATO.md).
- **Probado**: reservar, rechazo de una segunda cita (409), escritura sin CSRF (403), cancelar, móvil sin scroll horizontal y ningún texto en inglés (incluidos los del componente).
- **Back office**: el calendario de OpenEMR se queda (Raúl: «se puede quedar así»). En la fase B solo se limpia: «Your Clinic Name Here» → «EPI10 Salud», «Facultativos» → «Equipo», «ingreso»/«SALIDA» → «En consulta»/«Fuera de consulta» y las fechas en inglés de la rejilla.

## Comparativa corta

| Candidato | Licencia | Encaje con la base (islas Preact, sin build, OpenEMR) | Para reservar (día → hueco → confirmar) | Veredicto |
|---|---|---|---|---|
| **Cally 0.9.2** + isla propia | MIT | Web component ES, 38 KB sin comprimir, sin dependencias; se estiliza por `::part` y marca días con `getDayParts` / `isDateDisallowed`; accesible (teclado, lectores de pantalla) | La rejilla del mes es justo el primer paso; los huecos y la confirmación son 150 líneas de Preact | **Elegido** |
| FullCalendar 7 | MIT el estándar; *Premium* de pago (desde 480 $) | Bundle vanilla grande; temas propios | Calendario de eventos (semana/día con franjas). En móvil es una rejilla de horas, no un selector | Descartado para el portal. Sería la opción si algún día se rehace el calendario del back office |
| Schedule-X 2/3 | MIT el núcleo; plugins *Premium* de pago | Usa Preact por dentro; buena pinta | Calendario de eventos; crear arrastrando es de pago | Descartado: mismo problema de forma, más peso |
| react-big-calendar | MIT | Necesita React y build | Calendario de eventos estilo Google Calendar | Descartado: rompe la regla de «sin build» |
| Cal.com embebido | AGPLv3 (núcleo) + `ee` comercial; informes de que el repo pasó a privado en abril de 2026 (**Unknown**) | Otra aplicación entera (Next.js + Postgres) con su propia base de datos de citas | Es exactamente el flujo de Healthie | Descartado: duplica las citas fuera de OpenEMR, obliga a sincronizar, no cabe en el HP y añade otro sistema con datos de salud |
| Rejilla de mes propia (sin Cally) | — | Cero dependencias | Igual | Plan B si Cally da problemas: ~80 líneas más y la accesibilidad corre de nuestra cuenta |

## Cómo funciona

### Portal: «Tus citas»

Una sola pantalla con el calendario a la izquierda (arriba en móvil) y el panel del día a la derecha (debajo en móvil):

1. **Elegir día.** Los días con huecos salen marcados en cian; tu cita, en verde; el resto, apagados y sin poder pulsarse. Si ya tienes cita, la pantalla abre en ese día.
2. **Elegir hueco.** Botones de hora agrupados en «Mañana» y «Tarde». Sin facultativo, sin AM/PM, sin duración ni «razón».
3. **Confirmar.** Resumen («Jueves, 15 de octubre, de 10:00 a 10:30», lugar) y un solo botón: «Confirmar cita». Aparece «¡Cita reservada!» con «Añadir a mi calendario» (archivo `.ics`).
4. **Ver y cancelar** desde el mismo calendario: al pulsar tu día sale tu cita con «Cancelar cita» y una confirmación en línea («¿Cancelamos tu cita del jueves, 15 de octubre a las 10:00?»). Si queda menos de 24 h, en lugar de cancelar se ofrece escribir por Mensajes.

Reglas de producto (en `config.php`, ajustables sin tocar código): una cita futura por clienta (el test mixto tiene una cita opcional), reservar y cancelar hasta 24 h antes, 60 días hacia delante, citas de 30 min (categoría nueva «Cita EPI10»).

Capturas del prototipo y del «antes»: `openemr-pruebas/evidencia/capturas/renove/05-calendario/` (`antes_*`, `lab_*`, `despues_backoffice_*`).

**URL de la vista** (tarjeta «Citas» del inicio, área 1): `/interface/modules/custom_modules/oe-module-epi10-ui/public/portal/citas.php`. El colapsable de citas del núcleo (`#appointmentcard`, con Future/Past Appointments y el formulario técnico) se sustituye por una plantilla sin inglés que redirige a esa vista. El laboratorio `epi10-lab-5` queda como evidencia hasta la demo.

### Integración con OpenEMR (sin tocar el núcleo)

```text
Portal (sesión de la clienta)
  citas.php ──► isla calendario.mjs (Preact + htm + Cally) ──fetch──► citas_api.php
                                                                         │ verify_session.php (sesión del portal)
                                                                         │ CSRF propio (asunto «epi10-citas»)
                                                                         ▼
                                                               Agenda.php (módulo)
                     fetchEvents / fetchAppointments (library/appointments.inc.php)
                     AppointmentService::insert · addPnote (aviso al equipo)
                                                                         ▼
                                       openemr_postcalendar_events  ◄── calendario del back office
```

| Pieza | Cómo |
|---|---|
| **Disponibilidad** | La del núcleo: el equipo crea en su calendario bloques «En consulta» (categoría 2) y «Fuera de consulta» (3), normalmente repetidos de lunes a viernes. Cualquier otra cita, comida o festivo ocupa tiempo. Es la regla de `portal/find_appt_popup_user.php`, portada con tres mejoras: por día y minutos locales (no se descuadra con el cambio de hora), **las citas canceladas liberan su hueco** (en el núcleo no) y se cruzan varios miembros del equipo. |
| **Reservar** | Se vuelve a comprobar el hueco dentro de un bloqueo con nombre (`GET_LOCK`) para que dos reservas simultáneas no se pisen. Se asigna el primer miembro del equipo libre a esa hora. La cita nace con estado `-` (reservada): los huecos solo existen donde el equipo ha dicho que está. Con `estado_inicial = '^'` nace «pendiente», como en el portal de OpenEMR. |
| **Cancelar** | Estado `x` (Cancelada), igual que el portal de OpenEMR: no se borra y queda en el historial. |
| **Aviso al equipo** | Nota en la ficha asignada al miembro del equipo (lo mismo que hace el portal de OpenEMR): «Reserva desde el portal: Lucía … ha reservado una cita el 15/10/2026 a las 10:00». Sale en Mensajes del back office (área 3 decide cómo se ve). |
| **Seguridad** | Solo la sesión del portal; el `pid` sale de la sesión, nunca de la petición; la clienta solo puede cancelar sus citas; escrituras con token CSRF; errores en español sin detalles internos. |
| **Dónde vive** | Hoy, en el laboratorio `epi10-lab-5` (módulo mínimo registrado: OpenEMR solo sirve scripts de módulos activos, devuelve 401 si no). En la fase B, en `oe-module-epi10-ui` del área 0: `src/Citas/`, `public/portal/citas.php`, `public/ui/islas/calendario.mjs`, `public/ui/vendor/`. La tarjeta «Citas» del inicio del portal apuntará a esta página (con el área 1). |
| **Datos que crea la instalación** | Categoría «Cita EPI10» (30 min, `pc_constant_id = epi10_cita`). En la demo, además, una agenda ficticia L–V 9–14 y 16–19 (`disponibilidad_demo.sql`, se quita con un script). |

### Back office (2.6): limpieza, no rediseño

El calendario de OpenEMR se queda tal cual (vistas día/semana/mes, huecos por persona). Inventario de lo que se ve hoy (`antes_backoffice_calendario_*.png`) y cómo se arregla en la fase B, sin núcleo:

| Hoy | Después | Cómo | Estado |
|---|---|---|---|
| «Your Clinic Name Here» (leyenda y lugar de la cita) | «EPI10 Salud» | Dato del centro (`facility.name`), no código | **Hecho** (11 oct, decisión del orquestador) |
| «Facultativos», «Facultativo», «Todos los Usuarios» | «Equipo», «Profesional», «Todo el equipo» | Traducción propia en `lang_definitions` + `lang_custom` (sobrevive a actualizaciones). Global: es lo que se quiere | **Hecho** |
| «ingreso», «SALIDA» (constantes `IN`/`OUT` de los bloques) y *In Office* / *Out Of Office* | «En consulta», «Fuera de consulta» | Igual, `lang_custom` | **Hecho** |
| Cabeceras «Mon 10/05» | «lun 05/10» | El núcleo lo genera con `date('D m/d')` en `CalendarRenderDataBuilder` y luego `xlt` sobre la cadena entera: no se puede traducir. Plantilla Twig sobrescrita desde el módulo o JS pequeño | Fase B |
| Mini calendario «M T W T F S S» | «L M X J V S D» | `dayNames` de `_mini_calendar.html.twig`; mismo camino | Fase B |
| «Office Visit», «New Patient», «Group Therapy»… | Ocultas | `pc_active = 0` en las categorías clínicas (reversible) | Después de la demo (el orquestador limita el back office a textos) |
| «(ficticio), Aitor» | Nombre y apellido | Formato de nombre de OpenEMR (ajuste global) o dato | Después de la demo |
| Es la vista de entrada del back office | Una tarjeta del selector | Área 1 |

## Riesgos y Unknown

| Riesgo | Mitigación |
|---|---|
| Si el equipo no marca bloques «En consulta», el portal no enseña huecos | Mensaje claro en el portal («Escríbenos por Mensajes y te buscamos uno»). Para la demo, agenda ficticia sembrada. Se documenta en la guía de Aitor |
| **Zona horaria**: la instancia iba en UTC (`gbl_time_zone` vacío) | **Resuelto el 11 oct**: `Atlantic/Canary`, porque EPI10 está en Canarias (pendiente de que Raúl lo ratifique). Antes pasó por `Europe/Madrid`, acordado con SKI2-210. Comprobado: reservas y notas en hora de Canarias. Lo anterior conserva su hora. SQL: `oe-module-epi10-ui/sql/zona_horaria.sql` |
| Una actualización de OpenEMR cambia `fetchEvents`, `AppointmentService::insert` o `addPnote` | Son funciones estables desde hace años; la prueba Playwright lo detecta en staging |
| Cally está en 0.x | Vendorizado y fijado; la isla solo usa 4 propiedades. Plan B: rejilla propia |
| Dos personas reservan el mismo hueco a la vez | Bloqueo con nombre y nueva comprobación dentro; la segunda recibe «Ese hueco acaba de ocuparse» |
| En móvil, la confirmación es una hoja inferior fija | El panel reserva espacio debajo para que no tape las últimas horas |
| Confirmación manual de cada cita por el equipo | **Fuera del MVP** (orquestador, 11 oct): mejora para después. Ya se puede activar con `estado_inicial = '^'` |
| **Unknown**: lugar y tipo de la cita presencial del test mixto (SKI2-186) | El lugar sale del centro de OpenEMR o de `config.php` |

## Fase B: qué se ha hecho

| Pieza | Dónde (`oe-module-epi10-ui/`) |
|---|---|
| Vista «Tus citas» con el layout común (cabecera, volver, menú de usuario) | `public/portal/citas.php`, `templates/epi10/paginas/citas.html.twig` |
| JSON de la isla (sesión del portal + CSRF) | `public/portal/api/citas.php` |
| Reglas de agenda (sin cambios desde la fase A; la categoría «Cita EPI10» se crea sola si falta) | `src/Citas/Agenda.php`, `config.citas.php` |
| Isla con componentes de la base (`epi-btn`, `epi-card`, `epi-alert`, iconos Lucide); en móvil la confirmación es una hoja inferior fija | `public/ui/islas/calendario.mjs`, `calendario.css`, `vendor/cally/` |
| Tarjeta de citas del núcleo en el inicio, sin inglés, con botón a «Tus citas» (no redirige sola: evita atrapar a la clienta al volver al inicio) | `templates/sobrescritas/portal/partial/cards/_appointment_card.html.twig` |
| Back office: «Mon 10/05» → «lun 05/10», mini calendario «L M X J V S D» y avisos «Ir al DD/MM/AAAA» | `public/ui/vistas/calendario-backoffice.js` (`config.php › scripts_por_vista`). El calendario no usa el Twig con sobrescrituras: va en JS |
| Back office: **fallo del núcleo** con el cambio de hora. `CalendarViewModel::buildMiniCalendar()` suma 86 400 s por día; en el mes del cambio de octubre repite el 25 y pierde la última semana (salió al fijar una zona con cambio de hora; pasa igual con `Atlantic/Canary`) | Mismo JS: regenera las filas que faltan con las clases, ids y clic (`ChangeDate`) del núcleo. Las vistas de mes, semana y día no están afectadas. Conviene reportarlo a OpenEMR |
| Traducciones globales del área 5 | `i18n/openemr_es.tsv` (consolidadas por el área 0). Nombre del centro «EPI10 Salud»: en el script de configuración del área 7 |
| Zona horaria `Atlantic/Canary` | aplicada en la instancia; SQL `oe-module-epi10-ui/sql/zona_horaria.sql` |
| Prueba E2E | `scripts/prueba-citas.mjs` (+ `scripts/prueba-citas-limpiar.sql`) |

Comprobado en la instancia integrada (11 oct): E2E en verde y capturas `despues_*` (portal y back office, escritorio y móvil).

Estimación: fase A ~4 h (hecha); fase B 3–5 h.

## Fuentes

- FullCalendar: [licencia y Premium](https://fullcalendar.io/license), [precios](https://fullcalendar.io/premium), [cambios v7](https://v7.fullcalendar.io/changelog)
- Schedule-X: [términos de Premium](https://schedule-x.dev/terms-and-conditions), [paquete npm](https://classic.yarnpkg.com/en/package/@schedule-x/calendar)
- Cally: [README 0.9.2](https://cdn.jsdelivr.net/npm/cally@0.9.2/README.md), [ficha en Socket](https://socket.dev/npm/package/cally/overview/0.9.2)
- Cal.com: [introducción y licencia](https://mintlify.com/calcom/cal.com/introduction), [autoalojado en 2026](https://lucaberton.com/blog/cal-com-open-source-scheduling-self-hosted-2026/)
- Código de OpenEMR 8.4.1 leído en el contenedor: `portal/find_appt_popup_user.php`, `portal/add_edit_event_user.php`, `library/appointments.inc.php`, `src/Services/AppointmentService.php`, `src/Core/ModulesApplication.php`.
