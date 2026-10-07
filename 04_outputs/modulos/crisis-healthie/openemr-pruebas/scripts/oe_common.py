"""Utilidades comunes de las pruebas de cobertura de OpenEMR 8.4.1 (SKI2-207).

Configuración por variables de entorno (o archivo .env indicado en OE_ENV_FILE):
  OE_BASE           URL base de OpenEMR (p. ej. http://localhost:4896)
  OE_CLIENT_ID      cliente OAuth2 confidencial registrado en /oauth2/default/registration
  OE_CLIENT_SECRET  secreto del cliente
  OE_USER / OE_PASS usuario y contraseña del equipo (rol users)
  PORTAL_USER / PORTAL_PASS / PORTAL_EMAIL  credenciales del portal de la paciente ficticia

Las evidencias se escriben en ../evidencia/<script>.json sin tokens ni secretos.
"""
from __future__ import annotations

import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests

HERE = Path(__file__).resolve().parent
EVIDENCIA = HERE.parent / "evidencia"
EVIDENCIA.mkdir(exist_ok=True)

USER_SCOPES = (
    "openid offline_access api:oemr api:fhir "
    "user/patient.read user/patient.write user/document.read user/document.write "
    "user/message.write user/encounter.read user/appointment.read "
    "user/Patient.read user/Patient.write user/DocumentReference.read user/Binary.read "
    "user/Questionnaire.read user/QuestionnaireResponse.read"
)
# Scopes de la API propia del módulo oe-module-epi10 (solo si el cliente se registró con ellos).
MODULE_SCOPES = (
    " user/epi10_portal_access.write user/epi10_portal_message.read user/epi10_portal_message.write"
    " user/epi10_portal_template.write user/epi10_changes.read"
)
PATIENT_SCOPES = (
    "openid api:port api:fhir patient/patient.read patient/encounter.read patient/appointment.read "
    "patient/Patient.read patient/DocumentReference.read patient/Binary.read "
    "patient/Questionnaire.read patient/QuestionnaireResponse.read"
)

SECRET_KEYS = {"access_token", "refresh_token", "id_token", "client_secret", "password", "portal_pwd"}


def load_env() -> None:
    env_file = os.environ.get("OE_ENV_FILE")
    if env_file and Path(env_file).exists():
        for line in Path(env_file).read_text().splitlines():
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())


load_env()
BASE = os.environ.get("OE_BASE", "http://localhost:4896").rstrip("/")
FHIR = f"{BASE}/apis/default/fhir"
API = f"{BASE}/apis/default/api"
PORTAL_API = f"{BASE}/apis/default/portal"
TOKEN_URL = f"{BASE}/oauth2/default/token"


def redact(obj):
    """Quita secretos y recorta cadenas largas (base64, JWT) para la evidencia."""
    if isinstance(obj, dict):
        return {k: ("***" if k in SECRET_KEYS else redact(v)) for k, v in obj.items()}
    if isinstance(obj, list):
        return [redact(x) for x in obj[:20]] + (["… %d más" % (len(obj) - 20)] if len(obj) > 20 else [])
    if isinstance(obj, str) and len(obj) > 300:
        return obj[:120] + f"… [{len(obj)} caracteres]"
    return obj


class Evidencia:
    def __init__(self, nombre: str):
        self.nombre = nombre
        self.pasos: list[dict] = []
        self.inicio = datetime.now(timezone.utc).isoformat(timespec="seconds")

    def paso(self, titulo: str, peticion: dict, respuesta, veredicto: str, nota: str = ""):
        self.pasos.append({
            "titulo": titulo,
            "peticion": redact(peticion),
            "respuesta": redact(respuesta),
            "veredicto": veredicto,
            "nota": nota,
        })
        print(f"[{veredicto}] {titulo}" + (f" — {nota}" if nota else ""))

    def guardar(self):
        out = EVIDENCIA / f"{self.nombre}.json"
        out.write_text(json.dumps({
            "script": self.nombre,
            "inicio": self.inicio,
            "fin": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "openemr": BASE,
            "pasos": self.pasos,
        }, ensure_ascii=False, indent=2))
        print(f"evidencia → {out}")


def token(role: str = "users", modulo: bool = False) -> str:
    """Token por password grant (solo para la prueba; en producción, authorization_code + refresh)."""
    data = {
        "grant_type": "password",
        "client_id": os.environ["OE_CLIENT_ID"],
        "client_secret": os.environ["OE_CLIENT_SECRET"],
        "user_role": role,
    }
    if role == "users":
        data.update(username=os.environ.get("OE_USER", "admin"), password=os.environ["OE_PASS"],
                    scope=USER_SCOPES + (MODULE_SCOPES if modulo else ""))
    else:
        data.update(username=os.environ["PORTAL_USER"], password=os.environ["PORTAL_PASS"],
                    email=os.environ.get("PORTAL_EMAIL", ""), scope=PATIENT_SCOPES)
    r = requests.post(TOKEN_URL, data=data, timeout=60)
    r.raise_for_status()
    return r.json()["access_token"]


def call(method: str, url: str, tok: str, *, json_body=None, data=None, files=None, params=None,
         headers=None, accept="application/json", timeout=120) -> tuple[int, object, dict]:
    h = {"Authorization": f"Bearer {tok}", "Accept": accept}
    if headers:
        h.update(headers)
    r = requests.request(method, url, headers=h, json=json_body, data=data, files=files, params=params,
                         timeout=timeout)
    ctype = r.headers.get("Content-Type", "")
    if "json" in ctype:
        try:
            body = r.json()
        except ValueError:
            body = r.text
    elif ctype.startswith("application/pdf") or ctype.startswith("application/octet"):
        body = {"_binario": True, "bytes": len(r.content), "content_type": ctype, "cabecera": r.content[:8].hex()}
    else:
        body = r.text
    return r.status_code, body, dict(r.headers)


def resumen_peticion(method, url, **kw) -> dict:
    d = {"metodo": method, "url": url.replace(BASE, "<OE>")}
    for k in ("params", "json_body", "data"):
        if kw.get(k) is not None:
            d[k] = kw[k]
    if kw.get("files"):
        d["files"] = {k: (v[0] if isinstance(v, tuple) else str(v)) for k, v in kw["files"].items()}
    return d


def paso_http(ev: Evidencia, titulo: str, method: str, url: str, tok: str, ok_codes=(200, 201),
              nota: str = "", **kw):
    """Ejecuta una petición y la registra como paso. Devuelve (código, cuerpo)."""
    code, body, headers = call(method, url, tok, **kw)
    veredicto = "✅" if code in ok_codes else "❌"
    ev.paso(titulo, resumen_peticion(method, url, **kw), {"status": code, "body": body}, veredicto, nota)
    return code, body


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def esperar(segundos: float):
    time.sleep(segundos)


def fail(msg: str):
    print("ERROR:", msg, file=sys.stderr)
    sys.exit(1)
