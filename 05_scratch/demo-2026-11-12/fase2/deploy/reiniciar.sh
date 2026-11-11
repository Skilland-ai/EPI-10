#!/bin/sh
# Devuelve la demo de la fase 2 al punto de la instantánea: Marta sin onboarding, Lucía con su
# informe publicado. Uso en el VPS: /srv/epi10-fase2/reiniciar.sh   (≈1 min sin servicio)
set -eu
cd /srv/epi10-fase2
test -f instantanea/db.tgz && test -f instantanea/sites.tgz
docker compose stop openemr mysql
for v in db sites; do
  docker run --rm -v epi10-fase2_$v:/v -v "$PWD/instantanea":/i alpine sh -c "find /v -mindepth 1 -delete && tar xzf /i/$v.tgz -C /v"
done
docker compose start mysql openemr
i=0
until docker compose exec -T web wget -q -O /dev/null http://epi10-fase2-openemr/interface/login/login.php 2>/dev/null; do
  i=$((i+1)); [ $i -gt 40 ] && { echo "OpenEMR no responde"; exit 1; }; sleep 3
done
echo "Demo reiniciada ($(date '+%F %T'))"
