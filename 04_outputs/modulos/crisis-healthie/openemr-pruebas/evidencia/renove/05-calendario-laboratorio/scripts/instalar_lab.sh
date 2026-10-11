#!/bin/sh
# Instala el laboratorio del área 5 en la instancia de prueba de hermes-node, SIN reiniciar OpenEMR
# y sin tocar oe-module-epi10: va en su propia carpeta (no se registra en el module manager).
# URL: /interface/modules/custom_modules/epi10-lab-5/public/portal/citas.php (con sesión del portal).
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
C=epi10-openemr-prueba-openemr-1
DEST=/var/www/localhost/htdocs/openemr/interface/modules/custom_modules/epi10-lab-5
tar -C "$HERE" --exclude=scripts -czf - . | ssh hermes-node "docker exec -i $C sh -c 'rm -rf $DEST && mkdir -p $DEST && tar -C $DEST -xzf - && chown -R apache:apache $DEST'"
cat "$HERE/scripts/registrar_lab.sql" "$HERE/scripts/categoria_cita.sql" | ssh hermes-node "cd ~/Projects/epi10-openemr-prueba && ./oe-sql.sh"
echo "laboratorio del área 5 instalado en $DEST"
