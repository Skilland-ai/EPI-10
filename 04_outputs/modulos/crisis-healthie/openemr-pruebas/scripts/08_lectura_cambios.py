"""Cierre del journey: el monolito lee desde fuera, por consulta periódica, todo lo que ha hecho la paciente en el portal.

  GET /api/epi10_portal_message?since=…  → mensajes escritos por pacientes (módulo);
  GET /api/epi10_changes?since=…         → documentos del portal (consentimiento firmado, cuestionario enviado),
                                            respuestas de cuestionario, mensajes, documentos de la ficha y actividad.
Con el cursor `now` de cada respuesta se hace la siguiente consulta (sin webhooks).
"""
import os

from oe_common import API, Evidencia, paso_http, token

ev = Evidencia("08_lectura_cambios")
tok = token("users", modulo=True)
marca = os.environ.get("MARCA", "2026-10-07T00:00:00Z")
code, b = paso_http(ev, f"Mensajes de pacientes desde {marca} (módulo)", "GET", f"{API}/epi10_portal_message", tok, params={"since": marca})
if isinstance(b, dict):
    ev.pasos[-1]["nota"] = f"{b.get('count')} mensajes: " + "; ".join(f"pid {m['pid']} «{m['title']}»" for m in b.get("data", []))
code, b = paso_http(ev, f"Cambios desde {marca} (módulo)", "GET", f"{API}/epi10_changes", tok, params={"since": marca})
cursor = None
if isinstance(b, dict):
    cursor = b.get("now")
    ev.pasos[-1]["nota"] = ", ".join(f"{k}={len(v)}" for k, v in b.items() if isinstance(v, list)) + f" · cursor siguiente={cursor}"
if cursor:
    code, b2 = paso_http(ev, "Segunda consulta con el cursor devuelto (debe venir vacía si nadie ha hecho nada)", "GET",
                         f"{API}/epi10_changes", tok, params={"since": cursor.replace(" ", "T") + "Z"})
    if isinstance(b2, dict):
        ev.pasos[-1]["nota"] = ", ".join(f"{k}={len(v)}" for k, v in b2.items() if isinstance(v, list))
ev.guardar()
