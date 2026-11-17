#!/usr/bin/env bash
# EPI10 · Informe visual · HTML A4 → PDF con Chromium sin interfaz (sin servidor).
# Uso: scripts/exportar_pdf.sh informe.html [informe.pdf]
# Busca Chromium/Chrome en el sistema o en la caché de Playwright. Variable CHROME para forzar uno.
set -euo pipefail
IN="$(realpath "$1")"
OUT="${2:-${IN%.html}.pdf}"
OUT="$(realpath -m "$OUT")"

CHROME="${CHROME:-}"
if [[ -z "$CHROME" ]]; then
  for c in google-chrome google-chrome-stable chromium chromium-browser; do
    command -v "$c" >/dev/null 2>&1 && { CHROME="$(command -v "$c")"; break; }
  done
fi
if [[ -z "$CHROME" || "$CHROME" == /snap/* ]]; then
  # Chromium de snap no puede escribir fuera de $HOME/snap: preferimos el de Playwright si existe.
  PW="$(ls -d "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux*/chrome 2>/dev/null | sort -V | tail -1 || true)"
  [[ -n "$PW" ]] && CHROME="$PW"
fi
[[ -z "$CHROME" ]] && { echo "No encuentro Chromium. Instálalo o define CHROME=/ruta/a/chrome"; exit 1; }

"$CHROME" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
  --virtual-time-budget=4000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$OUT" "file://$IN" 2>/dev/null
echo "OK · $OUT"
command -v pdfinfo >/dev/null && pdfinfo "$OUT" | grep -E "Pages|Page size" || true
