"""Puntos 3 y 4 · Encuesta de hábitos (FHIR Questionnaire) y lectura de las respuestas desde fuera.

Montaje: el Questionnaire FHIR (datos/cuestionario_habitos_epi10.json) se importa al repositorio de OpenEMR y se asigna a la paciente
como plantilla «{Questionnaire:…}» (módulo: POST /api/patient/:pid/epi10_portal_template). La paciente lo rellena en el portal
(portal_ui.mjs encuesta "Hábitos de vida EPI10").
Lectura desde fuera:
  a) FHIR Questionnaire (lista) y QuestionnaireResponse?patient=… con token del equipo;
  b) lo mismo con el token de la paciente (SMART patient/*);
  c) respuestas aplanadas (linkId → valor) para el monolito.
"""
import os

from oe_common import FHIR, Evidencia, paso_http, token

ev = Evidencia("03_encuesta")
tok = token("users")
tok_pac = token("patient")
PUUID = os.environ.get("LUCIA_UUID", "2dece1c2-c262-11f1-8cf7-d2bcb2e767ca")

paso_http(ev, "Cuestionarios disponibles (FHIR Questionnaire)", "GET", f"{FHIR}/Questionnaire", tok)
code, b = paso_http(ev, "Respuestas de la paciente (FHIR QuestionnaireResponse, equipo)", "GET", f"{FHIR}/QuestionnaireResponse",
                    tok, params={"patient": PUUID})
plano = {}
if isinstance(b, dict):
    for e in b.get("entry", []):
        r = e["resource"]

        def walk(items):
            for it in items or []:
                for a in it.get("answer", []) or []:
                    v = next((a[k] for k in a if k.startswith("value")), None)
                    if isinstance(v, dict):
                        v = v.get("display") or v.get("code")
                    plano[f"{it.get('linkId')} {it.get('text', '')[:40]}"] = v
                walk(it.get("item"))
        walk(r.get("item"))
        ev.pasos[-1]["nota"] = f"status={r.get('status')} authored={r.get('authored')} questionnaire={r.get('questionnaire')}"
ev.paso("Respuestas aplanadas para el monolito", {"origen": "QuestionnaireResponse.item[].answer[]"}, plano,
        "✅" if plano else "❌")
paso_http(ev, "Respuestas con el token de la paciente (SMART patient/QuestionnaireResponse.read)", "GET",
          f"{FHIR}/QuestionnaireResponse", tok_pac)
ev.guardar()
