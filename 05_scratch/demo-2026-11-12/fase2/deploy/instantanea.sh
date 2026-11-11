#!/bin/sh
# Guarda el estado actual de la demo (base de datos y sites) como punto de reinicio.
# Uso en el VPS: /srv/epi10-fase2/instantanea.sh   (≈30 s sin servicio)
set -eu
cd /srv/epi10-fase2
mkdir -p instantanea
docker compose stop openemr mysql
docker run --rm -v epi10-fase2_db:/v -v "$PWD/instantanea":/o alpine tar czf /o/db.tgz -C /v .
docker run --rm -v epi10-fase2_sites:/v -v "$PWD/instantanea":/o alpine tar czf /o/sites.tgz -C /v .
docker compose start mysql openemr
echo "Instantánea guardada en /srv/epi10-fase2/instantanea ($(date '+%F %T'))"
