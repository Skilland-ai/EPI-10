#!/usr/bin/env python3
"""Publica un PDF FICTICIO a una paciente de prueba por el contrato v1 (`publicar_informe`), como lo haría el monolito.

Uso (en hermes-node, con el cliente OAuth de pruebas de SKI2-210):
  OE_ENV_FILE=~/.config/epi10-openemr/cliente-pruebas.env python3 publicar-informe.py <pid> <pdf> <referencia> [nombre]
Idempotente por referencia: repetirlo devuelve duplicado=true.
"""
import base64
import json
import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path

for linea in Path(os.environ["OE_ENV_FILE"]).expanduser().read_text().splitlines():
    if "=" in linea and not linea.strip().startswith("#"):
        k, v = linea.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip())

base = os.environ.get("OE_BASE", "http://127.0.0.1:4896").rstrip("/")
pid, pdf, referencia = int(sys.argv[1]), Path(sys.argv[2]), sys.argv[3]
nombre = sys.argv[4] if len(sys.argv) > 4 else "Informe EPI10.pdf"

datos = urllib.parse.urlencode({
    "grant_type": "password", "client_id": os.environ["OE_CLIENT_ID"], "client_secret": os.environ["OE_CLIENT_SECRET"],
    "user_role": "users", "username": os.environ.get("OE_USER", "admin"), "password": os.environ["OE_PASS"],
    "scope": "openid api:oemr user/epi10_v1_informe.c",
}).encode()
with urllib.request.urlopen(urllib.request.Request(f"{base}/oauth2/default/token", data=datos), timeout=60) as r:
    token = json.loads(r.read())["access_token"]

cuerpo = json.dumps({"pid": pid, "referencia": referencia, "nombre_archivo": nombre,
                     "pdf_base64": base64.b64encode(pdf.read_bytes()).decode()}).encode()
peticion = urllib.request.Request(f"{base}/apis/default/api/epi10_v1_informe", data=cuerpo, method="POST",
                                  headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
with urllib.request.urlopen(peticion, timeout=60) as r:
    print(r.status, r.headers.get("X-Epi10-Contrato"), r.read().decode())
