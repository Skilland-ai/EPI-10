# Encargo · Portal de clientes de EPI10 v0.2 (CON-578)

Eres el diseñador de producto de Skilland para EPI10 Salud. Tu tarea es proponer la **versión 0.2 de la maqueta del portal de clientes**, adaptada al nuevo enfoque de la fase 2. Se enseña en el workshop con el cliente a primeros de diciembre. Es una maqueta navegable para enseñar, no producción.

## Lee primero (en este orden)
Todas las rutas están dentro de `/home/reboot/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/`.
1. `EPI-10/04_outputs/fase-2/01_estrategia/estrategia_app_epi10_v1.md` y `para_los_siguientes_agentes.md`. **La estrategia manda**: la tesis «un plan personal que se cumple», la escalera de tres puertas (A, B y C) y la v1 «Mi plan».
2. `EPI-10/04_outputs/fase-2/02_investigacion-apps/investigacion_apps_v1.md` y `recomendaciones_portal_e_informe.md`: los patrones visuales que hay que aplicar.
3. `EPI-10/04_outputs/fase-2/03_informe/`: el sistema visual del informe rediseñado. El portal y el informe deben hablar el mismo idioma visual (semáforos, rueda, etc.). Reutiliza sus componentes.
4. **El diseño actual del portal (v0.1), sobre el que se construye:**
   - `EPI-10/04_outputs/entrega-epi10-2026-10-27/05_propuesta-portal-propio/`: la propuesta, en HTML y PDF, con sus vistas `clienta/` (portal de cliente) y `equipo/` (back office).
   - El código real sobre OpenEMR: `epi10-oe-module/` (módulos `oe-module-epi10` y `oe-module-epi10-ui`). Se ve desplegado en https://portal-propio.aporta-epi10.com (usuario `carmen`, contraseña `carmen1234`).
5. `EPI10_POSTDEMO_CONTEXTO.md`, sección «Fase 2»: lo que pidió el cliente.
6. Marca de EPI10: `EPI-10/02_context/EPI10-branding/`, con el canon `EPI10-Phase-2-Brand-Canon-v1.md` y el design system.

## Qué hay que hacer
- **El cuidado va al portal de cliente.** Proponer las pantallas de la v0.2 a partir de las de la v0.1. Pantallas a cubrir:
  - inicio o «Mi plan»;
  - prioridades;
  - hábitos con semáforo y su seguimiento;
  - suplementación recomendada con compra y recompra;
  - el informe visual dentro del portal;
  - revisión mensual;
  - entrada desde el chatbot (puerta B) y desde un informe externo (puerta C);
  - consentimiento de investigación.
  
  Que sea muy visual: paneles, gráficos, cuerpo humano y semáforos, según la investigación.
- **Back office:** solo los ajustes mínimos para que sea coherente con el portal nuevo (qué ve el equipo de EPI10 del plan y de los hábitos del cliente). No lo rediseñes entero.
- Mantén lo que funciona de la v0.1. Marca qué es nuevo y qué cambia.
- Usa datos ficticios. Por ejemplo, la clienta Marta de la demo. Nunca datos reales.

## Entregables
En `/home/reboot/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/EPI-10/04_outputs/fase-2/04_portal-v02/`:
- `maqueta/`: maqueta navegable en HTML, CSS y JS estáticos, que se abra con doble clic. Incluye un índice de pantallas con un recorrido guiado para el workshop.
- `capturas/`: PNG de cada pantalla, en escritorio y móvil, para un dosier.
- `propuesta_portal_v02.md`: qué cambia respecto a la v0.1 y por qué (enlazado a la estrategia y a la investigación), el mapa de pantallas, qué se puede construir sobre OpenEMR y qué haría falta desarrollar, y las preguntas para el workshop.

## Reglas
- Trabaja en autónomo. Toma tú las decisiones de diseño y anota los supuestos.
- **No toques** `epi10-oe-module/` ni ningún despliegue: solo lectura. Nada de servidores en este equipo. Para las capturas, usa un navegador sin interfaz sobre los ficheros locales.
- No escribas al cliente, no publiques nada y no toques Linear.
- No hagas `git commit` ni `git push`. Nunca uses `herdr notification`.
- Al terminar, responde solo con las rutas y un resumen de 5 líneas.
