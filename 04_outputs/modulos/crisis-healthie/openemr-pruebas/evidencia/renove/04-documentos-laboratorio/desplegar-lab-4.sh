#!/bin/sh
# Laboratorio del área 4 (Mi informe, visor PDF y pestaña Documentos): monta esta carpeta + el código del área 4 de
# oe-module-epi10-ui (src/Biblioteca, plantillas, public/ui) en /portal/epi10-lab-4/ de la instancia de prueba de hermes-node.
# Uso: ./desplegar-lab-4.sh <checkout de epi10-oe-module en la rama renove-area-4> [contenedor]
# Solo añade esa carpeta: no toca el núcleo, ni los módulos instalados, ni reinicia OpenEMR. Se pierde si se recrea el contenedor.
# Quitarlo: ssh hermes-node "docker exec epi10-openemr-prueba-openemr-1 rm -rf /var/www/localhost/htdocs/openemr/portal/epi10-lab-4"
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
REPO=$(cd "${1:?falta la ruta del checkout de epi10-oe-module}" && pwd)
C=${2:-epi10-openemr-prueba-openemr-1}
DEST=/var/www/localhost/htdocs/openemr/portal/epi10-lab-4
UI=$REPO/oe-module-epi10-ui
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
cp -r "$HERE/." "$TMP/"
rm -rf "$TMP/datos" "$TMP/pruebas" "$TMP/desplegar-lab-4.sh" "$TMP/README.md"
mkdir -p "$TMP/src" "$TMP/templates/epi10/paginas" "$TMP/templates/epi10/componentes"
cp -r "$UI/src/Biblioteca" "$TMP/src/"
cp "$UI/templates/epi10/paginas/biblioteca.html.twig" "$UI/templates/epi10/paginas/biblioteca-documento.html.twig" \
   "$UI/templates/epi10/paginas/ficha-documentos.html.twig" "$TMP/templates/epi10/paginas/"
cp "$UI/templates/epi10/componentes/documentos_ficha.html.twig" "$TMP/templates/epi10/componentes/"
cp -r "$UI/public/ui" "$TMP/ui"
cp -r "$UI/public/fonts" "$TMP/fonts"
tar -C "$TMP" -czf - . | ssh hermes-node "docker exec -i $C sh -c 'rm -rf $DEST.nuevo && mkdir -p $DEST.nuevo && tar -C $DEST.nuevo -xzf - && chown -R apache:apache $DEST.nuevo && rm -rf $DEST && mv $DEST.nuevo $DEST && for f in \$(find $DEST -name \"*.php\"); do php -l \$f >/dev/null || exit 1; done'"
echo "laboratorio del área 4 desplegado en /portal/epi10-lab-4/"
