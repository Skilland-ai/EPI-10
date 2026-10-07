"""Punto 2 · Consentimiento con firma.

La firma se hace en el portal (portal_ui.mjs firmar "Consentimiento EPI10 Salud": firma dibujada + casillas + «Enviar a EPI10»).
Aquí se comprueba desde fuera:
  a) API estándar/FHIR: ¿hay algún recurso para el documento firmado del portal? (onsite_documents no se expone: Consent no existe);
  b) módulo: GET /api/epi10_changes → portal_documents con patient_signed_status y patient_signed_time;
  c) tras archivarlo en la ficha (acción «Chart to Onsite Portal Reviewed» del equipo, o el mismo código desde el módulo),
     el PDF firmado aparece como DocumentReference y se descarga como Binary.
"""
import os

from oe_common import API, FHIR, Evidencia, call, paso_http, resumen_peticion, token

ev = Evidencia("02_consentimiento")
tok = token("users", modulo=True)
PUUID = os.environ.get("LUCIA_UUID", "2dece1c2-c262-11f1-8cf7-d2bcb2e767ca")

paso_http(ev, "FHIR Consent (recurso no soportado en 8.4.1)", "GET", f"{FHIR}/Consent", tok, params={"patient": PUUID},
          ok_codes=(200,), nota="Sin recurso Consent: el consentimiento firmado vive en onsite_documents")
code, b = paso_http(ev, "Documentos firmados en el portal (módulo, epi10_changes)", "GET", f"{API}/epi10_changes", tok,
                    params={"since": "2026-10-07T00:00:00Z"})
if isinstance(b, dict):
    firmados = [d for d in b.get("portal_documents", []) if "Consentimiento" in d.get("doc_type", "")]
    ev.pasos[-1]["nota"] = f"consentimientos: {[(d['pid'], d['patient_signed_status'], d['patient_signed_time'], d['status']) for d in firmados]}"
code, bundle = paso_http(ev, "PDF del consentimiento firmado, archivado en la ficha (FHIR DocumentReference)", "GET",
                         f"{FHIR}/DocumentReference", tok, params={"patient": PUUID})
url = None
if isinstance(bundle, dict):
    for e in bundle.get("entry", []):
        att = e["resource"]["content"][0]["attachment"]
        if "Consentimiento" in (att.get("title") or ""):
            url = att.get("url")
if url:
    code, body, headers = call("GET", url, tok, accept="application/pdf")
    ev.paso("Descargar el PDF firmado (FHIR Binary)", resumen_peticion("GET", url), {"status": code, "body": body},
            "✅" if code == 200 else "❌")
ev.guardar()
