"""Punto 5 · Mensajes en los dos sentidos.

Qué prueba:
  a) equipo → paciente por la API estándar (POST /api/patient/:pid/message): escribe en `pnotes` (notas del equipo);
  b) si ese mensaje llega al buzón del portal (tabla `onsite_mail`, que es lo que lee portal/messaging): se comprueba por SQL;
  c) paciente → equipo: el portal escribe en `onsite_mail`; se intenta leerlo desde fuera por API (no hay recurso
     Communication en FHIR ni ruta de mensajes del portal) y por SQL;
  d) el servicio PHP del portal (portal_mail.inc.php → onsite_mail) como vía de un módulo propio.
El envío desde el portal como paciente se hace con portal_ui.mjs mensaje "<asunto>" "<texto>".
"""
import json
import os
import subprocess

from oe_common import API, FHIR, Evidencia, paso_http, token, now_iso

ev = Evidencia("04_mensajes")
tok = token("users")
tok_pac = token("patient")
PUUID = os.environ.get("LUCIA_UUID", "2dece1c2-c262-11f1-8cf7-d2bcb2e767ca")
PID = int(os.environ.get("LUCIA_PID", "1"))
marca = now_iso()


def sql(q: str):
    r = subprocess.run([os.environ["OE_SQL_RUNNER"]], input=q, text=True, capture_output=True)
    filas = [l.split("\t") for l in r.stdout.strip().splitlines()]
    return [dict(zip(filas[0], f)) for f in filas[1:]] if len(filas) > 1 else []


# a) equipo → paciente por API estándar
cuerpo = {"body": f"Hola Lucía, tu caso está en marcha (mensaje de prueba {marca}).",
          "groupname": "Default", "from": "admin", "to": "lucia", "title": "Tu caso está en marcha", "message_status": "New"}
code, body = paso_http(ev, "Equipo → paciente: POST /api/patient/:pid/message (pnotes)", "POST",
                       f"{API}/patient/{PID}/message", tok, json_body=cuerpo)
mid = (body.get("data") or {}).get("mid") if isinstance(body, dict) else None

# b) ¿llega al buzón del portal?
pn = sql(f"select id, pid, title, message_status, portal_relation, left(body,80) body from pnotes where pid={PID} order by id desc limit 3;")
om = sql(f"select id, owner, sender_id, recipient_id, title, message_status, left(body,80) body from onsite_mail where owner like '%lucia%' or recipient_id like '%lucia%' order by id desc limit 5;")
ev.paso("¿El mensaje REST aparece en el buzón del portal? (pnotes frente a onsite_mail)",
        {"sql": "pnotes y onsite_mail de la paciente"}, {"pnotes": pn, "onsite_mail": om},
        "❌" if not any("marca" in (m.get("body") or "") or marca in (m.get("body") or "") for m in om) else "✅",
        "El portal lee onsite_mail; la API REST escribe en pnotes (notas internas del equipo). No son la misma bandeja.")

# c) paciente → fuera: no hay recurso ni ruta
paso_http(ev, "Leer mensajes del portal por FHIR Communication (recurso no soportado)", "GET",
          f"{FHIR}/Communication", tok, params={"patient": PUUID}, ok_codes=(200,),
          nota="OpenEMR 8.4.1 no expone Communication")
paso_http(ev, "Leer mensajes del portal por la API del portal (ruta inexistente)", "GET",
          f"{API.replace('/api', '/portal')}/patient/message", tok_pac, ok_codes=(200,),
          nota="La API del portal solo tiene patient, encounter y appointment")

# d) equipo → buzón del portal con el servicio PHP (módulo propio)
if os.environ.get("OE_PHP_RUNNER"):
    php = f"""<?php
require_once $GLOBALS['fileroot'] . "/portal/lib/portal_mail.inc.php";
// sendMail($owner, $note, $title, $to, $noteid, $sid, $sn, $rid, $rn, $status)
$id = sendMail('lucia', 'Mensaje del equipo EPI10 por servicio PHP ({marca})', 'Informe en camino', 'lucia', '', 1, 'Administrator', 1, 'Lucía Peñalver', 'New');
echo json_encode(sqlQuery("select id, owner, sender_id, recipient_id, title, message_status from onsite_mail where id=?", [$id]));
"""
    r = subprocess.run([os.environ["OE_PHP_RUNNER"]], input=php, text=True, capture_output=True)
    try:
        out = json.loads(r.stdout.strip().splitlines()[-1])
    except Exception:
        out = {"stdout": r.stdout[-400:], "stderr": r.stderr[-400:]}
    ev.paso("Equipo → buzón del portal con el servicio PHP del portal (lo que haría un módulo propio)",
            {"php": "portal/lib/portal_mail.inc.php sendMail(owner, body, title, to, …)"}, out,
            "◐" if isinstance(out, dict) and out.get("id") else "❌",
            "Funciona, pero no es API: exige código PHP dentro de OpenEMR")

ev.guardar()
