# Pruebas de OpenEMR 8.4.1 (SKI2-207)

Material de la prueba del 7 oct 2026 sobre la instancia de hermes-node. **Solo datos ficticios.** Conclusiones en [../2026-10-07_openemr_headless_v1.md](../2026-10-07_openemr_headless_v1.md).

## Contenido

| Carpeta | Qué hay |
|---|---|
| `scripts/` | Pruebas por API en Python (`01`–`08`), automatización del portal con Playwright (`portal_ui.mjs`) y capturas antes y después (`capturas_tema.mjs`) |
| `scripts/hermes/` | Ayudantes para ejecutar SQL (`oe-sql.sh`) y PHP con el bootstrap de OpenEMR (`oe-php.sh`) dentro de los contenedores del HP, más sus envoltorios desde el ASUS (`oesql`, `oephp`) |
| `modulo/oe-module-epi10/` | Prototipo del módulo EPI10 para el module manager: tema, logos, plantillas Twig, traducciones, tarjeta de tienda, menú de operaciones y API propia |
| `modulo/instalar_modulo.sh` | Copia el módulo al contenedor y lo registra, sin reiniciar OpenEMR |
| `datos/` | Cuestionario de hábitos como FHIR Questionnaire (provisional, a falta de SKI2-184) |
| `evidencia/*.json` | Petición y respuesta resumidas de cada paso, sin tokens ni secretos |
| `evidencia/capturas/` | Recorrido del portal (firma, cuestionario, mensajes, enlace mágico, descarga) |
| `evidencia/capturas/tema/` | Capturas `antes_*` y `despues_*` del tema EPI10 (portal y back office; `_movil` = 390 px) |

## Cómo reproducir

Requisitos: túnel `hn open 4896`, Python 3 con `requests`, Node 22 con `playwright` y un archivo de entorno local (fuera del repo) con `OE_PASS`, `PORTAL_PASS`, `OE_CLIENT_ID`, `OE_CLIENT_SECRET` y, opcionalmente, `OPS_PASS`. Las contraseñas de la instancia están en `~/Projects/epi10-openemr-prueba/.env` del HP.

```bash
# Cliente OAuth2: POST /oauth2/default/registration con los scopes de oe_common.py (+ MODULE_SCOPES) y activarlo
export OE_ENV_FILE=/ruta/local/openemr.env PORTAL_USER=lucia PORTAL_EMAIL=lucia.penalver@correo-ficticio.test
export OE_SQL_RUNNER=$PWD/hermes/oesql OE_PHP_RUNNER=$PWD/hermes/oephp
python3 01_alta_paciente.py      # alta por FHIR y API estándar; acceso al portal sin API
node portal_ui.mjs firmar "Consentimiento EPI10 Salud"
node portal_ui.mjs encuesta "Hábitos de vida EPI10"
python3 02_consentimiento.py && python3 03_encuesta.py
python3 04_mensajes.py && python3 05_informe_pdf.py && python3 06_polling.py
ENLACE_FILE=/tmp/enlace.txt python3 07_modulo_api.py      # journey completo con el módulo
ENLACE_FILE=/tmp/enlace.txt node portal_ui.mjs mensaje "Asunto" "Texto"
node portal_ui.mjs descargar informe_epi10_prueba.pdf
python3 08_lectura_cambios.py
node capturas_tema.mjs despues && node capturas_tema.mjs despues movil
```

## Cambios hechos en la instancia de prueba

- Activado el *password grant* de OAuth2 (`oauth_password_grant = 3`) solo para poder automatizar las pruebas. **En producción va desactivado**: el monolito usaría *authorization code* con *refresh token*.
- Dos clientes OAuth2 confidenciales registrados («EPI10 monolito…»).
- Módulo `oe-module-epi10` instalado y activo. Traducciones propias en `lang_definitions` y `lang_custom`, `openemr_name = EPI10 Salud`, lema del login y plantilla «Help» del portal en español.
- Plantillas «Consentimiento EPI10 Salud» y «Hábitos de vida EPI10» (paciente 1 y repositorio). Cuestionario en `questionnaire_repository`.
- Pacientes ficticias nuevas (pid 2 a 7) y usuario de back office `operaciones.prueba` (grupo Front Office, contraseña `OPS_PASS` en el `.env` del HP).
- Nada del núcleo de OpenEMR se ha modificado. El módulo se pierde si se recrea el contenedor; se reinstala con `instalar_modulo.sh`.
