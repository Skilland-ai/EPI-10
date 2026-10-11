# Laboratorio del área 5 · calendario de citas del portal (SKI2-235, fase A)

> Copia de evidencia (fase A). El código vivo está en `Skilland-ai/epi10-oe-module` › `oe-module-epi10-ui` (rama `renove-area-5`). Librerías de terceros no copiadas aquí (ver `public/ui/vendor/LICENCIAS.md`). El laboratorio se quitó de la instancia el 11 oct con `scripts/quitar_lab.sh`.

> **Fase B:** la vista ya vive en `oe-module-epi10-ui` (`public/portal/citas.php`, `public/portal/api/citas.php`, `src/Citas/`, isla `calendario`). Esta carpeta queda como evidencia del prototipo y para `quitar_lab.sh`.

Prototipo **aislado** del calendario interactivo del portal: elegir día → elegir hueco → confirmar, y ver o cancelar la cita en el mismo calendario. Enganchado a la agenda de OpenEMR (`openemr_postcalendar_events`) sin tocar el núcleo ni `oe-module-epi10` (contrato v1 intacto). En la fase B se mueve al módulo de interfaz del área 0 (`oe-module-epi10-ui`) y se monta sobre su layout.

Diseño, comparativa y riesgos: `EPI-10/04_outputs/modulos/crisis-healthie/renove/2026-10-11_area_5_calendario_v1.md`.

## Piezas

| Archivo | Qué hace |
|---|---|
| `src/Citas/Agenda.php` | Huecos libres (misma regla que el portal de OpenEMR: bloques «En consulta» menos lo ocupado), reservar con bloqueo, cancelar (estado `x`), aviso al equipo en la ficha |
| `public/portal/citas.php` | Página «Tus citas» con la sesión del portal (`verify_session.php`) |
| `public/portal/citas_api.php` | JSON para la isla: `GET` resumen; `POST` reservar y cancelar con `X-CSRF-Token` |
| `public/ui/islas/calendario.mjs` | Isla Preact + htm (sin build) con Cally 0.9.2 como rejilla del mes |
| `public/ui/css/epi10-citas.css` | Estilo provisional con prefijo `epi-cal-` (pasa a los componentes de la base) |
| `config.php` | Equipo, categoría, estado inicial, antelaciones, días reservables, máximo de citas |
| `openemr.bootstrap.php`, `info.txt` | Módulo mínimo: OpenEMR solo sirve scripts de módulos registrados y activos |

## Instancia de prueba (hermes-node)

```sh
scripts/instalar_lab.sh                         # copia a custom_modules/epi10-lab-5, registra el módulo y crea la categoría «Cita EPI10»
ssh hermes-node 'cd ~/Projects/epi10-openemr-prueba && ./oe-sql.sh' < scripts/disponibilidad_demo.sql   # agenda ficticia L–V 9–14 y 16–19
scripts/quitar_lab.sh [--con-disponibilidad]   # deshace todo
```

Página (con sesión de Lucía en el portal): `http://localhost:4896/interface/modules/custom_modules/epi10-lab-5/public/portal/citas.php`

## Pruebas

`scripts/prueba_citas.mjs` (Playwright): login de Lucía, huecos, reserva, segunda reserva rechazada (409), escritura sin CSRF (403), móvil sin scroll horizontal, cancelación y detector de inglés. Después, `scripts/limpiar_pruebas.sql` borra las citas y notas que deja. `scripts/captura_backoffice.mjs` captura el calendario del back office y lista los textos en inglés.

## Back office (2.6)

`sql/backoffice_calendario_es.sql`: nombre del centro «EPI10 Salud» y traducciones del calendario («Equipo», «Todo el equipo», «En consulta», «Fuera de consulta»). Aplicado en la instancia el 11 oct. Se deshace con `sql/backoffice_calendario_es_deshacer.sql`.
