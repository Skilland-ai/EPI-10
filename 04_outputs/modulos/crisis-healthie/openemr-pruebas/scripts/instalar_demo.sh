#!/bin/sh
# Instalación de la demo del renove (SKI2-230) en la instancia de hermes-node, desde UN commit del repo del módulo.
# Sin reiniciar OpenEMR. Se ejecuta en el ASUS (usa ssh hermes-node). Idempotente.
#
#   ./instalar_demo.sh                    → origin/main (instalación final)
#   ./instalar_demo.sh origin/renove-demo → vuelta atrás al estado verificado anterior (2bb052b)
#
# Pasos: git archive del commit → oe-module-epi10 (contrato v1, su script) → oe-module-epi10-ui (instalar-ui.sh: guarda de
# conflictos y PHP, traducciones, APCu) → configuración del back office del área 7 (aplicar.sh --menu-principal).
set -eu
REPO=${REPO:-/home/reboot/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/epi10-oe-module-wt/integracion}
REF=${1:-origin/main}
OE=${OE:-epi10-openemr-prueba-openemr-1}
DB=${DB:-epi10-openemr-prueba-mysql-1}
DEST='~/Projects/epi10-oe-module-demo'

cd "$REPO"
git fetch -q origin
SHA=$(git rev-parse --short "$REF")
echo "== Instalando $REF ($SHA)"

# 1. Copia exacta del commit al HP (nunca el árbol de trabajo).
git archive --format=tar "$REF" | ssh hermes-node "rm -rf $DEST && mkdir -p $DEST && tar -C $DEST -xf -"

# 2. Contrato v1 (oe-module-epi10), con su propio script. Ya registrado: sin --registrar.
#    SIN_CONTRATO=1 lo salta (ensayos: no pisar lo que haya instalado SKI2-210).
if [ "${SIN_CONTRATO:-0}" = "1" ]; then echo "(contrato no reinstalado: SIN_CONTRATO=1)"; else
  ssh hermes-node "cd $DEST && sh scripts/instalar-en-contenedor.sh $OE $DB"
fi

# 3. Interfaz (oe-module-epi10-ui).
ssh hermes-node "cd $DEST && sh scripts/instalar-ui.sh $OE $DB"

# 4. Back office de operaciones (área 7): ACL, menús y globals por omisión. Se ejecuta desde el ASUS.
TMP=$(mktemp -d)
git archive --format=tar "$REF" config-instancia | tar -C "$TMP" -xf -
(cd "$TMP/config-instancia/area-7" && sh aplicar.sh --menu-principal)
rm -rf "$TMP"

# 5. Humo: portal, back office y una vista propia responden.
for u in /portal/index.php?site=default /interface/login/login.php?site=default \
         /interface/modules/custom_modules/oe-module-epi10-ui/public/portal/kit.php; do
  printf '%s → ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:4896$u"
done
echo "== Instalado $SHA. Siguiente: node recorrido_demo.mjs <carpeta> > informe.md"
