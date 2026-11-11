# Fase 2 · portal propio · demo del 12 nov 2026

Sesión «Fase 2 · portal propio» (brief_fase2.md). Linear: encaja con **CON-212** (entorno, guion y ensayo de la demo del portal propio sobre OpenEMR).

## URL y acceso

- **URL:** https://portal-propio.aporta-epi10.com
- **Acceso:** la misma puerta de la demo (`carmen` / `carmen1234`). La cookie vale para todos los subdominios.
  - Si se entra directamente sin sesión, la puerta lleva a la portada `aporta-epi10.com` (su lista de destinos de vuelta no incluye `portal-propio`). Después de entrar, hay que abrir la URL otra vez. Se le ha pedido al orquestador que añada el host.
- **Cuentas de dentro** (todas ficticias). Los botones «Rellenar» del recorrido las escriben solas:
  - clientas `marta` (primera vez) y `lucia` (con el informe ya publicado)
  - equipo `operaciones.prueba`
  - las contraseñas solo están en el VPS (`/srv/epi10-fase2/.env`)
- **Antes de enseñarlo, reinicia los datos:** `ssh skilland-vps /srv/epi10-fase2/reiniciar.sh` (≈1 min). Deja a Marta sin onboarding y a Lucía con su informe.
- Funciona solo en escritorio (más de 900 px de ancho). En el móvil se ve el sello, pero no el recorrido.

## Guion (≈10 min, recorrido guiado de 27 pasos, en 5 partes)

| # | Parte | Qué se ve | Qué se dice |
|---|---|---|---|
| 1 | Inicio | Portada de la fase 2 y capturas de la pasarela de Stripe | «Es la instancia real de OpenEMR con nuestro módulo y datos ficticios. Son vistas simuladas: así se vería; no está implementado ni conectado». El pago es el de la fase 1 |
| 2 | Correo | El correo de acceso tal como le llega a la clienta (Marta) | En español, con su marca, enlace personal. Es un correo simulado: no se envía nada |
| 3 | Portal de la clienta | Login de Marta → onboarding real: fecha de nacimiento, **consentimiento firmado en pantalla**, cuestionario de 6 preguntas, test en casa o en sede, «Todo listo» → su espacio | El portal la guía; hasta que no completa los tres pasos no ve nada más |
| 4 | Su informe | Salto a Lucía → «Paso 5 de 5: informe listo» → Mi informe → visor del PDF | Solo ve los informes que el equipo ha revisado y publicado |
| 5 | Back office | Login del equipo → inicio («Hoy»: casos por etapa de Odoo; los documentos de Marta que acaba de firmar) → Clientes por fase → ficha de Lucía | OpenEMR por dentro, con la interfaz EPI10 y solo las funciones del equipo |

Cierre: «Esto es lo que funciona en laboratorio. Llevarlo a producción, conectarlo con el orquestador y Odoo y desplegarlo en vuestro servidor es el trabajo de la fase 2.»

En cada paso hay «Atrás», «Salir del recorrido» y, en los de acción, «Saltar este paso». Si se sale de la pantalla del paso, una tarjeta ofrece «Ir allí».

## Qué es real y qué es simulado

| Real (funciona de verdad en esta instancia) | Simulado o fuera de alcance |
|---|---|
| OpenEMR 8.4.1 con `oe-module-epi10` y `oe-module-epi10-ui` (`epi10-oe-module` main da8ff4d, SKI2-275) | El **correo**: es una página HTML que imita el que enviaría el sistema |
| Login del portal y del back office, onboarding, firma del consentimiento, cuestionario y elección del test (se guardan en la base de datos de OpenEMR) | El **enlace mágico** del correo: aquí se entra con usuario y contraseña de prueba |
| Espacio de la clienta, Mi informe con el visor del PDF, mensajes | El **pago**: solo capturas de la fase 1 (con un enlace a la pasarela real de la fase 1) |
| Back office: inicio, clientes, ficha, documentos y mensajes | **No hay conexión** con el orquestador ni con Odoo de la fase 1: las etapas de Odoo son datos guardados (por eso Marta no aparece en «Casos que esperan a Aitor») |
| | Datos: todos ficticios. Es una copia de la instancia de laboratorio de hermes-node, limpiada (`deploy/curacion.sql`) |

Todas las páginas del subdominio llevan el sello fijo **«Vista simulada · fase 2 · Así se vería el portal propio. Todavía no está implementado.»** abajo a la izquierda.

## Dónde está

- VPS `skilland-vps`:
  - `/srv/epi10-fase2`: compose con OpenEMR, MariaDB y `web` (caddy file-server). Topes de memoria de 1,5 GB, 1 GB y 64 MB; en reposo usa ≈0,2 GB
  - el sitio está en `/srv/epi10-aporta/caddy/conf.d/portal-propio.caddy`, validado y recargado en caliente con el visto bueno del orquestador
  - no se ha tocado nada más de `/srv/epi10-aporta`
- Código y configuración: `05_scratch/demo-2026-11-12/fase2/deploy/` (ver su README)
- La instancia de laboratorio de hermes-node (`epi10-openemr-prueba`) se ha arrancado para exportarla y se ha vuelto a parar; sigue intacta.

## Verificación (11 nov, 17:55)

- Un recorrido completo automatizado (Playwright, 1440×900) pasa los 27 pasos con **0 errores de JS y 0 respuestas 5xx**, y el sello aparece en todas las pantallas.
- Fase 1 tras cada recarga del Caddy: `aporta-epi10.com`, `odoo.`, `panel.` y `compra.` responden (302 a la puerta, como antes).
- Sin la cookie de la puerta, todo redirige al login. `cuentas.json` no se sirve sin la puerta. `/setup.php` y similares dan 404.

## Riesgos

1. **Visor del PDF:** el pdf.js del módulo usa `Map.getOrInsertComputed`, que no tienen todos los Chrome. Se ha añadido un polyfill inyectado por Caddy y ya renderiza en Chromium 141. Si mañana el PDF sale en blanco, usar «Descargar PDF».
2. **El logo de la portada del informe de Lucía sale estirado.** Viene del PDF de laboratorio, no del visor. Es cosmético; si se ve, pasar a la página 2.
3. **Hay que reiniciar los datos antes de la demo.** Si se repite el recorrido sin `reiniciar.sh`, Marta ya ha hecho el onboarding y el recorrido salta los pasos de la parte 3.
4. **Puerta:** si Carmen abre el enlace sin sesión, cae en la portada de la fase 1 y luego hay que volver a abrir la URL (ver «Acceso»).
5. **Mensaje:** la relación está tensa. El sello y el texto del recorrido dicen «no implementado». No decir que está «listo» ni dar plazos fuera de la propuesta del 27 oct.
6. El VPS es compartido con la fase 1. La fase 2 tiene topes de memoria y su propio compose; para apagarla: `cd /srv/epi10-fase2 && docker compose down`.
