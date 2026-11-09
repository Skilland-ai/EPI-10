#!/usr/bin/env bash
# Despliega web de compra, portada y pack de casos ficticios en skilland-vps.
# Se lanza desde el ASUS (el VPS no tiene acceso a GitHub). Se puede repetir.
#   ORQUESTADOR=/ruta/al/repo ./desplegar.sh
set -euo pipefail

AQUI=$(cd "$(dirname "$0")" && pwd)
ORQUESTADOR=${ORQUESTADOR:-$AQUI/../../../../../epi10-orquestador}
CASOS="$ORQUESTADOR/test/fixtures/informes/casos-demo"
VPS=skilland-vps
BASE=/srv/epi10-aporta

ssh "$VPS" "test -f $BASE/caddy/Caddyfile" || { echo "Falta la base común en el VPS" >&2; exit 1; }
ssh "$VPS" "mkdir -p $BASE/compra/app $BASE/portada"

# Web de compra: sin .env, dependencias ni artefactos de otros despliegues.
rsync -a --delete \
  --exclude node_modules --exclude .next --exclude dist --exclude '.env*' \
  --exclude .vercel --exclude .vinext --exclude .wrangler --exclude .openai \
  --exclude '*.tsbuildinfo' --exclude vite.config.ts \
  "$AQUI/../app/" "$VPS:$BASE/compra/app/"
rsync -a "$AQUI/Dockerfile" "$AQUI/compose.yaml" "$AQUI/configurar-webhook.mjs" \
  "$AQUI/compra.caddy" "$AQUI/portada.caddy" "$AQUI/vps.sh" "$VPS:$BASE/compra/"

# Clave de prueba de Stripe, una sola vez y sin pasar por la pantalla.
if ! ssh "$VPS" "grep -qs '^STRIPE_SECRET_KEY=sk_test_' $BASE/compra/.env"; then
  hn sh "docker inspect epi10-demo-app-1 --format '{{range .Config.Env}}{{println .}}{{end}}' | grep '^STRIPE_SECRET_KEY=sk_test_'" \
    | grep '^STRIPE_SECRET_KEY=sk_test_' \
    | ssh "$VPS" "umask 077; touch $BASE/compra/.env; grep -v '^STRIPE_SECRET_KEY=' $BASE/compra/.env > $BASE/compra/.env.tmp || true; cat >> $BASE/compra/.env.tmp; mv $BASE/compra/.env.tmp $BASE/compra/.env; chmod 600 $BASE/compra/.env"
fi

# Portada y ZIP de casos. Solo los PDF de cada carpeta, con fechas fijas.
DESCARGAS=$(mktemp -d)
trap 'rm -rf "$DESCARGAS"' EXIT
crear_zip() {
  local carpeta=$1 destino=$2
  [ "$(find "$CASOS/$carpeta" -maxdepth 1 -name '*.pdf' | wc -l)" -eq 7 ] || { echo "$carpeta no tiene 7 PDF" >&2; exit 1; }
  local tmp; tmp=$(mktemp -d "$DESCARGAS/tmp.XXXXXX")
  cp "$CASOS/$carpeta"/*.pdf "$tmp/"
  touch -d '2026-10-20 12:00:00 UTC' "$tmp"/*.pdf
  (cd "$tmp" && LC_ALL=C TZ=UTC zip -X -q "$DESCARGAS/$destino" $(ls -1 *.pdf | LC_ALL=C sort))
  rm -rf "$tmp"
}
crear_zip caso-a-lucia caso-a-lucia-ferrer.zip
crear_zip caso-b-javier caso-b-javier-ortega.zip

rsync -a --delete --exclude descargas "$AQUI/portada/" "$VPS:$BASE/portada/"
ssh "$VPS" "mkdir -p $BASE/portada/descargas"
rsync -a --delete "$DESCARGAS/" "$VPS:$BASE/portada/descargas/"
ssh "$VPS" "chmod -R a+rX $BASE/portada"

ssh "$VPS" "bash $BASE/compra/vps.sh"
