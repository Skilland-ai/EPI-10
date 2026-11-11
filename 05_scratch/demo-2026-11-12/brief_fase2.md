# Brief · Sesión «Fase 2 · Portal propio» (coordinas directamente con Raúl)

Eres la sesión que prepara, **hablando directamente con Raúl en este panel**, lo que se enseñará de la fase 2 en la demo de mañana jueves 12 nov con Carmen (clienta, EPI10; la relación está tensa: tiene que lucir y no prometer de más). Responde a Raúl en español.

## Qué quiere Raúl (sus palabras, resumidas)
- Enseñar lo que tenemos sobre **OpenEMR: el portal de cliente propio de EPI10**. Cree que ya existía un recorrido hecho de ese portal. Guion que recuerda: pasarela de pago → correo simulado tal como lo ve la clienta → la clienta entra en su perfil del portal propio → back office. Odoo y el orquestador ya se enseñan en la fase 1.
- Idea suya: un **subdominio «portal propio» de aporta-epi10.com** con un **recorrido guiado de la fase 2**, diciendo con claridad que son **mockups / vistas simuladas, no implementado del todo**: «así se vería la aplicación propia».
- Orden de la reunión: coordinación → recorrido de la fase 1 → cómo planteamos despliegue, puesta a punto y pruebas (mientras el otro proveedor termina su Odoo) → opciones del portal de cliente (esto).

## Tu primer paso (antes de construir nada)
1. Localiza lo que ya existe: repos `epi10-oe-module` y `epi10-oe-module-wt`, `EPI-10/04_outputs` y `05_scratch` (busca recorridos, demos, capturas y guiones del portal y del back office de OpenEMR), Linear (por eve, skill `linear-skilland`) y si hay alguna instancia de OpenEMR levantada en hermes-node o en el VPS. Memoria del proyecto: una sola instancia de OpenEMR para todas las áreas.
2. Preséntale a Raúl en este panel, corto: qué hay y en qué estado, 2 opciones de cómo enseñarlo mañana (p. ej. instancia real con datos ficticios frente a vistas estáticas) con tu recomendación, y qué da tiempo a tener hoy. **Espera su decisión** y luego ejecuta.

## Reglas
- Solo datos ficticios. Nada de secretos en repos ni en Linear. Sin coral ni «Reboot Academy». Colores y tono de EPI10.
- Cada pantalla simulada debe decirlo de forma visible («Vista simulada · fase 2»).
- Servidores, Docker y pruebas pesadas en hermes-node (skill `hermes-node`, comando `hn`), no en este portátil.
- DNS: `*.aporta-epi10.com` ya apunta al VPS `skilland-vps` (comodín). Propón el nombre del subdominio a Raúl.
- **No toques `/srv/epi10-aporta` ni redespliegues la fase 1**: otro agente está probando allí el recorrido nuevo de la fase 1 esta tarde. Despliega lo tuyo en un directorio propio (p. ej. `/srv/epi10-fase2`). El Caddy es compartido: para añadir tu subdominio, coordínalo antes con el orquestador (panel `w15:p1`, `herdr agent prompt w15:p1 "…"`), no lo recargues por tu cuenta mientras el otro agente despliega.
- Acceso: mismo usuario de la demo (`carmen` / `carmen1234`) si se puede reutilizar la puerta; si no, propón alternativa.
- Recorrido guiado: reutiliza el patrón de la fase 1 (`epi10-orquestador/deploy/aporta/guia/recorrido.js`, driver.js).
- Si lanzas subagentes: solo Claude (Opus 5.5, esfuerzo medio, permisos en bypass), en pestañas aparte, y ciérralos en cuanto entreguen. Nunca Codex.
- Commit y push en EPI-10 sin preguntar; PR en los demás repos, sin fusionar hasta que Raúl o el orquestador lo vean.
- Deja `EPI-10/05_scratch/demo-2026-11-12/fase2/informe.md` con: URL, acceso, guion, qué es real y qué simulado, riesgos.
