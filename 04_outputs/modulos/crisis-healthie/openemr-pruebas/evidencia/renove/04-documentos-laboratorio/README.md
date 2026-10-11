# Laboratorio del área 4 (SKI2-234): Mi informe, visor PDF y pestaña Documentos

Laboratorio aislado de la fase A. Monta en `/portal/epi10-lab-4/` de la instancia de hermes-node **el mismo código** que va en
`oe-module-epi10-ui` (rama `renove-area-4` de `Skilland-ai/epi10-oe-module`), sin instalar nada en el módulo.

- `cargar.php`, `*.php`, `equipo/*.php`: puntos de entrada del laboratorio (cambian rutas y la base `epi10.ui`).
- `desplegar-lab-4.sh <checkout de epi10-oe-module>`: lo despliega. Quitarlo: `ssh hermes-node "docker exec epi10-openemr-prueba-openemr-1 rm -rf /var/www/localhost/htdocs/openemr/portal/epi10-lab-4"`.
- `datos/`: informe **ficticio** de Lucía (HTML → PDF con Playwright) y `publicar-informe.py` (publica por `POST epi10_v1_informe`).
- `pruebas/biblioteca_e2e.mjs`: E2E Playwright. `MODO=modulo` la pasa contra las páginas instaladas del módulo (fase B).

Documento: `04_outputs/modulos/crisis-healthie/renove/2026-10-11_area_4_biblioteca_documentos_v1.md`.
- Las fuentes y logos de `datos/informe-ficticio.html` se cargan con rutas relativas a un checkout de `epi10-oe-module` (`../../../oe-module-epi10-ui/…`): cópialo junto a él para regenerar el PDF.
