#!/bin/sh
# Quita el laboratorio del área 5 de la instancia de prueba (carpeta, registro y disponibilidad de demo).
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
ssh hermes-node "docker exec epi10-openemr-prueba-openemr-1 rm -rf /var/www/localhost/htdocs/openemr/interface/modules/custom_modules/epi10-lab-5"
echo "DELETE FROM modules WHERE mod_directory = 'epi10-lab-5';" | ssh hermes-node 'cd ~/Projects/epi10-openemr-prueba && ./oe-sql.sh'
[ "$1" = "--con-disponibilidad" ] && ssh hermes-node 'cd ~/Projects/epi10-openemr-prueba && ./oe-sql.sh' < "$HERE/disponibilidad_demo_quitar.sql"
echo "laboratorio del área 5 quitado"
