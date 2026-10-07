"""Punto 1 · Alta de paciente con acceso al portal.

Qué prueba:
  a) crear una paciente ficticia por FHIR (POST /fhir/Patient) y por la API estándar (POST /api/patient);
  b) leerla de vuelta (GET /fhir/Patient/:uuid);
  c) darle credenciales del portal por API → no existe ruta (se documenta la respuesta);
  d) darle credenciales del portal con el servicio PHP de OpenEMR (PatientAccessOnsiteService),
     que es lo que haría un módulo propio o la interfaz de administración.
"""
import json
import os
import subprocess
import sys

from oe_common import API, FHIR, Evidencia, paso_http, token, fail

ev = Evidencia("01_alta_paciente")
tok = token("users")
sufijo = os.environ.get("ALTA_SUFIJO", "api")

# a) FHIR Patient
paciente_fhir = {
    "resourceType": "Patient",
    "active": True,
    "name": [{"use": "official", "family": f"Prueba FHIR ({sufijo})", "given": ["Marta"]}],
    "gender": "female",
    "birthDate": "1990-06-15",
    "telecom": [{"system": "email", "value": f"marta.{sufijo}@correo-ficticio.test", "use": "home"}],
    "communication": [{"language": {"coding": [{"system": "urn:ietf:bcp:47", "code": "es"}]}, "preferred": True}],
}
code, body = paso_http(ev, "Crear paciente por FHIR", "POST", f"{FHIR}/Patient", tok, json_body=paciente_fhir,
                       headers={"Content-Type": "application/fhir+json"})
uuid_fhir = body.get("id") if isinstance(body, dict) else None

# b) leerla
if uuid_fhir:
    paso_http(ev, "Leer la paciente creada por FHIR", "GET", f"{FHIR}/Patient/{uuid_fhir}", tok)

# a') API estándar (devuelve pid numérico, necesario para documentos y mensajes)
paciente_api = {
    "title": "", "fname": "Marta", "mname": "", "lname": f"Prueba API ({sufijo})",
    "street": "", "postal_code": "", "city": "", "state": "", "country_code": "ES",
    "phone_contact": "", "DOB": "1990-06-15", "sex": "Female", "race": "", "ethnicity": "",
    "email": f"marta.api.{sufijo}@correo-ficticio.test",
}
code, body = paso_http(ev, "Crear paciente por la API estándar", "POST", f"{API}/patient", tok, json_body=paciente_api)
pid_api = None
puuid_api = None
if isinstance(body, dict) and body.get("data"):
    pid_api = body["data"].get("pid")
    puuid_api = body["data"].get("uuid")

# c) credenciales del portal por API: no hay ruta
if puuid_api:
    paso_http(ev, "Dar acceso al portal por API (ruta inexistente)", "POST",
              f"{API}/patient/{puuid_api}/portal_credentials", tok, ok_codes=(200, 201),
              json_body={"username": f"marta-{sufijo}"},
              nota="No existe ningún endpoint REST, FHIR ni del portal para crear credenciales del portal")

# d) credenciales con el servicio PHP (lo que haría un módulo propio)
if pid_api and os.environ.get("OE_PHP_RUNNER"):
    php = f"""<?php
use OpenEMR\\Services\\PatientAccessOnsiteService;
$svc = new PatientAccessOnsiteService();
$pwd = $svc->getRandomPortalPassword();
$svc->saveCredentials({int(pid_api)}, $pwd, "marta-{sufijo}", "marta-{sufijo}", true);
$row = sqlQuery("select pid, portal_username, portal_login_username, portal_pwd_status, length(portal_pwd) hashlen from patient_access_onsite where pid = ?", [{int(pid_api)}]);
echo json_encode($row);
"""
    r = subprocess.run([os.environ["OE_PHP_RUNNER"]], input=php, text=True, capture_output=True)
    try:
        out = json.loads(r.stdout.strip().splitlines()[-1])
    except Exception:
        out = {"stdout": r.stdout[-500:], "stderr": r.stderr[-500:]}
    ok = isinstance(out, dict) and out.get("portal_username") == f"marta-{sufijo}"
    ev.paso("Dar acceso al portal con el servicio PHP de OpenEMR (módulo propio o CLI)",
            {"php": "PatientAccessOnsiteService::saveCredentials(pid, pwd, user, user, forced_reset_disable=true)"},
            out, "◐" if ok else "❌",
            "Funciona, pero no es API: exige código PHP dentro de OpenEMR (módulo) o la interfaz de administración")

ev.guardar()
