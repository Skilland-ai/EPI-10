"""Punto 6 · Subir el informe en PDF y que la paciente lo vea y descargue.

Qué prueba:
  a) subir un PDF ficticio a la carpeta «Medical Record» de la paciente (POST /api/patient/:pid/document?path=/medical_record, campo `document`; la ruta va en minúsculas y con guiones bajos);
  b) listarlo (GET /api/patient/:puuid/document?path=...) y leerlo como FHIR DocumentReference (token del equipo);
  c) que la paciente lo vea con SU token: GET /fhir/DocumentReference (patient/*.read) y descargue el Binary;
  d) descargarlo por la API estándar (GET /api/patient/:puuid/document/:did) y comparar el hash.
La visualización en el portal web se comprueba aparte con portal_ui.mjs documentos / descargar.
"""
import hashlib
import io
import os
import zlib

from oe_common import API, FHIR, Evidencia, call, paso_http, resumen_peticion, token

ev = Evidencia("05_informe_pdf")
tok = token("users")
tok_pac = token("patient")
PUUID = os.environ.get("LUCIA_UUID", "2dece1c2-c262-11f1-8cf7-d2bcb2e767ca")
PID = int(os.environ.get("LUCIA_PID", "1"))  # la API estándar de documentos usa el pid numérico
NOMBRE = os.environ.get("INFORME_NOMBRE", "informe_epi10_prueba.pdf")


def pdf_minimo(texto: str) -> bytes:
    """PDF de una página con texto, sin dependencias externas."""
    contenido = f"BT /F1 14 Tf 72 740 Td ({texto}) Tj ET".encode("latin-1")
    objetos = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
        b"<< /Length " + str(len(contenido)).encode() + b" >>stream\n" + contenido + b"\nendstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ]
    out = io.BytesIO()
    out.write(b"%PDF-1.4\n")
    offsets = []
    for i, obj in enumerate(objetos, 1):
        offsets.append(out.tell())
        out.write(f"{i} 0 obj\n".encode() + obj + b"\nendobj\n")
    xref = out.tell()
    out.write(f"xref\n0 {len(objetos)+1}\n0000000000 65535 f \n".encode())
    for off in offsets:
        out.write(f"{off:010d} 00000 n \n".encode())
    out.write(f"trailer\n<< /Size {len(objetos)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode())
    return out.getvalue()


pdf = pdf_minimo("Informe EPI10 Salud - PRUEBA - datos ficticios - Lucia Penalver")
sha = hashlib.sha256(pdf).hexdigest()

# a) subir
code, body = paso_http(ev, "Subir el PDF del informe (API estándar)", "POST", f"{API}/patient/{PID}/document", tok,
                       files={"document": (NOMBRE, pdf, "application/pdf")},
                       params={"path": "/medical_record"},
                       nota=f"sha256 del PDF subido: {sha[:16]}…")
did = None
if isinstance(body, dict):
    data = body.get("data") or {}
    did = data.get("document_id") or data.get("id") or data.get("uuid")

# b) listar y leer como FHIR DocumentReference con token del equipo
paso_http(ev, "Listar documentos de la carpeta (API estándar)", "GET", f"{API}/patient/{PID}/document", tok,
          params={"path": "/medical_record"})
code, bundle = paso_http(ev, "Buscar DocumentReference de la paciente (FHIR, equipo)", "GET", f"{FHIR}/DocumentReference", tok,
                         params={"patient": PUUID})
docref_uuid = None
binary_url = None
if isinstance(bundle, dict):
    for e in bundle.get("entry", []):
        r = e["resource"]
        if any(NOMBRE in (c.get("attachment", {}).get("title") or "") for c in r.get("content", [])):
            docref_uuid = r["id"]
            binary_url = r["content"][0]["attachment"].get("url")
    if not docref_uuid and bundle.get("entry"):
        docref_uuid = bundle["entry"][-1]["resource"]["id"]
        binary_url = bundle["entry"][-1]["resource"]["content"][0]["attachment"].get("url")

# c) la paciente lo ve y lo descarga con su propio token
code, bundle_pac = paso_http(ev, "La paciente lista sus DocumentReference (FHIR, token de paciente)", "GET",
                             f"{FHIR}/DocumentReference", tok_pac)
if binary_url:
    url = binary_url if binary_url.startswith("http") else f"{FHIR}/{binary_url}"
    code, bin_body, headers = call("GET", url, tok_pac, accept="application/pdf")
    ev.paso("La paciente descarga el Binary del informe (FHIR, token de paciente)",
            resumen_peticion("GET", url), {"status": code, "body": bin_body,
                                           "content_type": headers.get("Content-Type")},
            "✅" if code == 200 else "❌")
    if code == 200 and isinstance(bin_body, dict) and bin_body.get("_binario"):
        pass  # el hash se comprueba abajo con la API estándar, que devuelve el fichero completo

# d) descarga por la API estándar y comparación de hash
if did:
    import requests
    r = requests.get(f"{API}/patient/{PID}/document/{did}", headers={"Authorization": f"Bearer {tok}"}, timeout=120)
    igual = hashlib.sha256(r.content).hexdigest() == sha
    ev.paso("Descargar el PDF por la API estándar y comparar el hash", resumen_peticion("GET", f"{API}/patient/{PID}/document/{did}"),
            {"status": r.status_code, "bytes": len(r.content), "content_type": r.headers.get("Content-Type"),
             "sha256_igual": igual}, "✅" if (r.status_code == 200 and igual) else "❌")

ev.guardar()
