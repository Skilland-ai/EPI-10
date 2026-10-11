# Laboratorio del área 2 (SKI2-232, fase A)

El prototipo aislado de «Tus documentos» y de la plantilla única de tarea, con datos ficticios en el navegador (sin OpenEMR). Ha salido del repo del módulo: el código bueno está en `Skilland-ai/epi10-oe-module`, rama `renove-area-2`, carpeta `oe-module-epi10-ui/` (isla `public/ui/islas/tareas.mjs`).

- `index.html`: shell provisional y enrutado por *hash* (`#/`, `#/tarea/consentimiento`).
- `tareas.mjs`: primera versión de la isla, con estilos propios (`epi10-tareas.css`) antes de que existiera la base del área 0.
- `adaptador-demo.mjs`: datos de demostración en `localStorage`, con la forma de la API real.
- `vendor/`: `htm/preact/standalone` 3.1.1 (Apache-2.0 + MIT) y `signature_pad` 5.1.4 (MIT), con sus licencias.

Se sirve como estático: en la instancia de prueba estuvo en `/portal/epi10-lab-2/`. El documento de decisión es [2026-10-11_area_2_tareas_firmables_v1.md](../../../../renove/2026-10-11_area_2_tareas_firmables_v1.md).
