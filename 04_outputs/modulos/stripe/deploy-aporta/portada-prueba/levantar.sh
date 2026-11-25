#!/usr/bin/env bash
# Levanta la portada con Caddy real y una puerta simulada. Uso: ./levantar.sh [puerto]
set -euo pipefail
cd "$(dirname "$0")"
export PUERTO=${1:-4131}
# El sitio del despliegue, tal cual, cambiando solo la dirección.
sed 's|^aporta-epi10.com {|:80 {|' ../portada.caddy > sitio.caddy
grep -q '^:80 {' sitio.caddy
# Dos ZIP de relleno: los de verdad los crea desplegar.sh con los PDF del orquestador.
# Se copia la portada para poder añadirlos sin tocar la carpeta del repo.
rm -rf sitio && cp -r ../portada sitio && mkdir -p sitio/descargas
for z in caso-a-lucia-ferrer caso-b-javier-ortega; do printf 'PK\005\006%018d' 0 | tr '0' '\0' > "sitio/descargas/$z.zip"; done
docker compose up -d --force-recreate
echo "http://127.0.0.1:$PUERTO"
