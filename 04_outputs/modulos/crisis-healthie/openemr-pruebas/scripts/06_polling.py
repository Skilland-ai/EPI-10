"""Punto 7 · Detectar cambios sin webhooks, por consulta periódica con filtro de fecha.

Qué prueba (token del equipo):
  a) FHIR Patient?_lastUpdated=gt<marca>            → pacientes nuevos o modificados;
  b) FHIR DocumentReference?_lastUpdated=gt<marca>  → documentos nuevos (informe subido, consentimiento firmado);
  c) FHIR QuestionnaireResponse?authored=gt<marca>  → encuestas respondidas (no hay _lastUpdated; `authored` = create_time);
  d) FHIR Appointment?date=ge<hoy>                  → citas;
  e) API estándar GET /api/patient?_lastUpdated=…  → si lo admite;
  f) el registro de actividad del portal (`onsite_portal_activity`) por SQL, como fuente de respaldo.
Con MARCA="2026-10-07T00:00:00Z" se ven los cambios del día de la prueba.
"""
import os
import subprocess
from datetime import date

from oe_common import API, FHIR, Evidencia, paso_http, token

ev = Evidencia("06_polling")
tok = token("users")
marca = os.environ.get("MARCA", "2026-10-07T00:00:00Z")


def total(b):
    return b.get("total") if isinstance(b, dict) else None


code, b = paso_http(ev, "Pacientes cambiados desde la marca (FHIR _lastUpdated)", "GET", f"{FHIR}/Patient", tok,
                    params={"_lastUpdated": f"gt{marca}", "_count": 50})
ev.pasos[-1]["nota"] = f"total={total(b)}"
code, b = paso_http(ev, "Documentos nuevos desde la marca (FHIR DocumentReference _lastUpdated)", "GET",
                    f"{FHIR}/DocumentReference", tok, params={"_lastUpdated": f"gt{marca}"})
ev.pasos[-1]["nota"] = f"total={total(b)}"
code, b = paso_http(ev, "Encuestas respondidas desde la marca (FHIR QuestionnaireResponse authored)", "GET",
                    f"{FHIR}/QuestionnaireResponse", tok, params={"authored": f"gt{marca}"})
ev.pasos[-1]["nota"] = f"total={total(b)} (no admite _lastUpdated; se filtra por authored)"
code, b = paso_http(ev, "Encuestas: ¿admite _lastUpdated?", "GET", f"{FHIR}/QuestionnaireResponse", tok,
                    params={"_lastUpdated": f"gt{marca}"}, ok_codes=(200,))
ev.pasos[-1]["nota"] = f"total={total(b)}; si devuelve todas o error, el parámetro no filtra"
code, b = paso_http(ev, "Citas desde hoy (FHIR Appointment date)", "GET", f"{FHIR}/Appointment", tok,
                    params={"date": f"ge{date.today().isoformat()}"})
ev.pasos[-1]["nota"] = f"total={total(b)}"
code, b = paso_http(ev, "API estándar: pacientes con _lastUpdated", "GET", f"{API}/patient", tok,
                    params={"_lastUpdated": f"gt{marca}"}, ok_codes=(200,))
ev.pasos[-1]["nota"] = f"filas={len(b.get('data', [])) if isinstance(b, dict) else '?'} (si no filtra, devuelve todos)"

if os.environ.get("OE_SQL_RUNNER"):
    q = ("select id, date, patient_id, activity, status, left(narrative,60) narrativa from onsite_portal_activity "
         "order by id desc limit 10;")
    r = subprocess.run([os.environ["OE_SQL_RUNNER"]], input=q, text=True, capture_output=True)
    filas = [l.split("\t") for l in r.stdout.strip().splitlines()]
    ev.paso("Registro de actividad del portal (SQL, solo como respaldo)", {"sql": q},
            [dict(zip(filas[0], f)) for f in filas[1:]] if len(filas) > 1 else [],
            "◐", "Útil para auditoría; no es API")

ev.guardar()
