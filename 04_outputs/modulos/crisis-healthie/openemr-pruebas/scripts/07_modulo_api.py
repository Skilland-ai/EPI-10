"""Prototipo del módulo oe-module-epi10: lo que la API estándar no cubre, ahora por API.

Journey de una paciente ficticia nueva («Marta», alta tras el pago):
  1. alta por la API estándar (POST /api/patient);
  2. acceso al portal + enlace mágico de un solo uso (POST /api/patient/:pid/epi10_portal_access);
  3. asignar consentimiento y cuestionario desde el repositorio (POST /api/patient/:pid/epi10_portal_template);
  4. mensaje del equipo a la bandeja del portal (POST /api/patient/:pid/epi10_portal_message);
  5. consulta periódica de cambios (GET /api/epi10_changes?since=…) y de mensajes de pacientes (GET /api/epi10_portal_message?since=…).
El enlace mágico se guarda solo en un archivo temporal (ENLACE_FILE) para que portal_ui.mjs lo abra; no va a la evidencia.
"""
import os
from datetime import datetime, timedelta, timezone

from oe_common import API, Evidencia, paso_http, token

ev = Evidencia("07_modulo_api")
tok = token("users", modulo=True)
sufijo = os.environ.get("ALTA_SUFIJO", "modulo")
marca = (datetime.now(timezone.utc) - timedelta(minutes=int(os.environ.get("MARCA_MIN", "2")))).strftime("%Y-%m-%dT%H:%M:%SZ")

# 1. alta
code, body = paso_http(ev, "Alta de la paciente (API estándar)", "POST", f"{API}/patient", tok, json_body={
    "title": "", "fname": "Marta", "mname": "", "lname": f"Prueba módulo ({sufijo})", "street": "", "postal_code": "",
    "city": "", "state": "", "country_code": "ES", "phone_contact": "", "DOB": "1990-06-15", "sex": "Female",
    "race": "", "ethnicity": "", "email": f"marta.{sufijo}@correo-ficticio.test"})
pid = (body.get("data") or {}).get("pid") if isinstance(body, dict) else None
if not pid:
    ev.guardar()
    raise SystemExit("sin pid")

# 2. acceso al portal + enlace mágico
code, body = paso_http(ev, "Acceso al portal y enlace mágico (módulo)", "POST", f"{API}/patient/{pid}/epi10_portal_access", tok,
                       json_body={"username": f"marta-{sufijo}", "expires_hours": 48})
if isinstance(body, dict) and body.get("magic_link"):
    enlace = body["magic_link"]
    if os.environ.get("ENLACE_FILE"):
        with open(os.environ["ENLACE_FILE"], "w") as f:
            f.write(enlace)
    ev.pasos[-1]["respuesta"]["body"]["magic_link"] = enlace.split("?")[0] + "?<token de un solo uso>"

# 3. plantillas
for nombre in ("Consentimiento EPI10 Salud", "Hábitos de vida EPI10"):
    paso_http(ev, f"Asignar «{nombre}» (módulo)", "POST", f"{API}/patient/{pid}/epi10_portal_template", tok,
              json_body={"template": nombre})

# 4. mensaje del equipo
paso_http(ev, "Equipo → bandeja del portal (módulo)", "POST", f"{API}/patient/{pid}/epi10_portal_message", tok,
          json_body={"title": "Bienvenida a EPI10", "body": "Hola Marta, ya tienes tu espacio. Empieza por el consentimiento."})

# 5. consulta periódica
code, b = paso_http(ev, f"Cambios desde {marca} (módulo, sustituto de webhooks)", "GET", f"{API}/epi10_changes", tok,
                    params={"since": marca})
if isinstance(b, dict):
    ev.pasos[-1]["nota"] = ", ".join(f"{k}={len(v)}" for k, v in b.items() if isinstance(v, list))
paso_http(ev, f"Mensajes escritos por pacientes desde {marca} (módulo)", "GET", f"{API}/epi10_portal_message", tok,
          params={"since": marca})

# Control: sin el scope del módulo, la ruta se rechaza
tok_sin = token("users", modulo=False)
paso_http(ev, "Control: la misma ruta sin scope epi10 → 401/403", "GET", f"{API}/epi10_changes", tok_sin,
          params={"since": marca}, ok_codes=(401, 403))

ev.guardar()
print("pid", pid)
