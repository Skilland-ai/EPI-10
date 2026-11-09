#!/usr/bin/env bash
# Parte del despliegue que corre en el VPS. La lanza desplegar.sh. Es idempotente:
# conserva los secretos existentes y solo crea los que faltan. Nunca los imprime.
set -euo pipefail
umask 077

BASE=/srv/epi10-aporta
COMPRA="$BASE/compra"
ENV_FILE="$COMPRA/.env"

touch "$ENV_FILE"
chmod 600 "$ENV_FILE"

valor() { grep -E "^$1=" "$ENV_FILE" | head -1 | cut -d= -f2- || true; }
poner() { # poner NOMBRE VALOR (el valor llega por argumento interno, sin registrarlo)
  local tmp; tmp=$(mktemp "$COMPRA/.env.XXXXXX")
  grep -vE "^$1=" "$ENV_FILE" > "$tmp" || true
  printf '%s=%s\n' "$1" "$2" >> "$tmp"
  mv "$tmp" "$ENV_FILE"
  chmod 600 "$ENV_FILE"
}

# Stripe: solo modo prueba.
case "$(valor STRIPE_SECRET_KEY)" in
  sk_test_*) ;;
  *) echo "STRIPE_SECRET_KEY ausente o no es de prueba" >&2; exit 1 ;;
esac

[ -n "$(valor DEMO_COOKIE_SECRET)" ] || poner DEMO_COOKIE_SECRET "$(openssl rand -hex 32)"
[ -n "$(valor KV_REST_API_TOKEN)" ] || poner KV_REST_API_TOKEN "$(openssl rand -hex 32)"
[ "$(valor KV_REST_API_URL)" = "http://kv-rest:80" ] || poner KV_REST_API_URL "http://kv-rest:80"

cd "$COMPRA"
docker compose build --quiet web

# El secreto de firma solo se escribe si Stripe acaba de crearlo.
SECRETO=$(docker run --rm -i --env-file .env --network epi10-aporta -w /app --entrypoint node \
  epi10-compra-web:local --input-type=module < configurar-webhook.mjs)
[ -z "$SECRETO" ] || poner STRIPE_WEBHOOK_SECRET "$SECRETO"
unset SECRETO
[ -n "$(valor STRIPE_WEBHOOK_SECRET)" ] || { echo "Falta STRIPE_WEBHOOK_SECRET" >&2; exit 1; }

docker compose up -d --remove-orphans

# Sitios de Caddy: el acceso lo da la puerta (deploy/aporta/puerta en epi10-orquestador).
for sitio in compra portada; do
  cp "$COMPRA/$sitio.caddy" "$BASE/caddy/conf.d/$sitio.caddy"
  chmod 644 "$BASE/caddy/conf.d/$sitio.caddy"
done
docker exec -w /etc/caddy epi10-aporta-caddy caddy validate --config /etc/caddy/Caddyfile
docker exec -w /etc/caddy epi10-aporta-caddy caddy reload --config /etc/caddy/Caddyfile
docker compose ps --format '{{.Service}} {{.Status}}'
