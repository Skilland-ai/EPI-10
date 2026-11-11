# Despliegue · Fase 2 · portal propio (CON-212)

OpenEMR 8.4.1 con los módulos `oe-module-epi10` y `oe-module-epi10-ui` (tal como estaban instalados en
hermes-node, `epi10-oe-module` main da8ff4d), en `https://portal-propio.aporta-epi10.com`, tras la
puerta de la demo. Solo datos ficticios.

| Fichero | Dónde va en el VPS | Qué es |
|---|---|---|
| `compose.yaml`, `Dockerfile` | `/srv/epi10-fase2/` | OpenEMR + MariaDB (imágenes fijadas por digest, 1,5 GB y 1 GB de tope) y un `caddy file-server` para `web/` |
| `portal-propio.caddy` | `/srv/epi10-aporta/caddy/conf.d/` | Sitio en el Caddy común: puerta, polyfill + sello + recorrido inyectados, rutas cerradas |
| `web/` | `/srv/epi10-fase2/web/` | Portada de la fase 2, correo simulado y `__fase2/` (sello, recorrido, driver.js) |
| `instantanea.sh`, `reiniciar.sh` | `/srv/epi10-fase2/` | Guardar y restaurar el estado de la demo (≈1 min) |
| `curacion.sql` | — | Cambios de datos aplicados a la copia antes de la instantánea |
| `usuario-carmen.sql` | `/srv/epi10-fase2/` | Usuario `carmen` del back office, clon de `operaciones.prueba` (el hash lo añade quien lo ejecuta; ya está en la instantánea) |

No se versionan (solo en el VPS): `.env` (secretos de MariaDB y cuentas), `modules/` (copia de los
módulos instalados), `web/__fase2/cuentas.json` (usuarios ficticios para los botones «Rellenar») e
`instantanea/`.

## Operación

- Reiniciar la demo antes de enseñarla: `ssh skilland-vps /srv/epi10-fase2/reiniciar.sh`
- Cambiar el Caddy: copiar el `.caddy`, `docker exec epi10-aporta-caddy caddy validate --config /etc/caddy/Caddyfile`
  y solo si valida, `caddy reload`. Si no valida, retirar el fichero (rompería el arranque de la fase 1).
- Apagar: `cd /srv/epi10-fase2 && docker compose down` (los volúmenes se conservan).
