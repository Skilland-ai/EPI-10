#!/bin/sh
# Instala o actualiza oe-module-epi10 en la instancia de prueba de hermes-node SIN reiniciar OpenEMR.
# Prototipo: copia al contenedor (se pierde si se recrea). En producción: imagen derivada (FROM openemr/openemr:<versión>)
# con COPY del módulo, o volumen montado en interface/modules/custom_modules/oe-module-epi10.
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
C=epi10-openemr-prueba-openemr-1
DEST=/var/www/localhost/htdocs/openemr/interface/modules/custom_modules/oe-module-epi10
tar -C "$HERE" -czf - oe-module-epi10 | ssh hermes-node "docker exec -i $C sh -c 'rm -rf $DEST && tar -C /var/www/localhost/htdocs/openemr/interface/modules/custom_modules -xzf - && chown -R apache:apache $DEST'"
ssh hermes-node 'cd ~/Projects/epi10-openemr-prueba && ./oe-sql.sh' < "$HERE/oe-module-epi10/sql/registrar_modulo.sql"
for f in traducciones_es plantilla_ayuda_es; do ssh hermes-node 'cd ~/Projects/epi10-openemr-prueba && ./oe-sql.sh' < "$HERE/oe-module-epi10/sql/$f.sql"; done
echo "módulo instalado"
