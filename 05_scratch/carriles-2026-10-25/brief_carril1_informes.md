# Brief · Carril 1 · Generador de borradores de informe, listo para demo

Eres el agente principal del carril 1 (nombre en Herdr: `informes`). Orquestador: la sesión de la pestaña «Orquestador» del workspace EPI-10. Puedes lanzar subagentes con la herramienta Agent cuando haya trabajo independiente que gane yendo en paralelo, por ejemplo extraer la estructura del informe modelo mientras otro prepara los datos ficticios.

## Contexto (lee esto primero)

- EPI10 Salud vende un test nutrigenético (TellmeGen) con un informe personalizado que redacta su equipo (Aitor). El monolito `epi10-orquestador` (NestJS + PostgreSQL) ya tiene un módulo `src/modules/informes` con estas piezas: seudonimización → borrador (flujo YAML + skills en Markdown + `LlmProvider` + plantilla .docx) → pantalla de revisión (`/informes`) → publicación. Lee `src/modules/informes/borrador/README.md` y el código.
- **El miércoles 28 o el jueves 29 de octubre hay una demo ante el cliente** (Tomás y Carmen, de EPI10). Mañana se le dice que el orquestador, la integración con Odoo y el generador de borradores están casi al 90 %. **Esto tiene que verse muy bien en la demo, aunque haya partes simuladas por debajo.**
- Material de EPI10, **solo lectura y fuera del repo**: `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/DOCUMENTOS-AITOR-GENERADOR-BORRADORES-INFORMES/`
  - `Informes Anonimizados/`: dos informes finales anonimizados (PDF), la plantilla del informe nutrigenético (.odt) y las anotaciones de Aitor (.docx). **Este es el modelo de salida.**
  - `Resultados Tellmegen Anonimizados/`: los 6 informes de TellmeGen de un caso (PHARMA, TRAITS, WELLNESS, ANCESTRY, COMPLEX_DISEASES, MONOGENIC_DISEASES) y sus anotaciones. **Esta es la entrada.**
  - `Cuestionarios/`: cuestionario de hábitos de salud, cuestionario de recomendación multifórmula y comentarios. También son entrada.
  - Lee las anotaciones y los comentarios: dicen qué se usa de cada documento.
- Estética: la base **«EPI10 UI»** (shadcn/ui vía Basecoat, CSS plano con prefijo `epi-`, sin build) que ya existe en `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/epi10-oe-module/oe-module-epi10-ui/public/ui`, más la marca en `src/modules/informes/pantalla/marca`. Reutiliza el CSS y los tokens; **no menciones OpenEMR en ninguna pantalla, texto ni nombre visible.**

## Objetivo

Que en la demo alguien entre en la pantalla de informes y pase por estos pasos:
1. **Sube** el juego de resultados de una persona: los PDF de TellmeGen y los cuestionarios (arrastrar y soltar o selector).
2. Ve cómo se **seudonimiza**: qué datos se quitan, con un indicador claro.
3. Ve el **borrador generándose** sección a sección, con progreso visible.
4. **Revisa** el borrador en pantalla, maquetado **como el informe modelo de EPI10**: estructura, secciones, tablas de genes y resultados, recomendaciones, avisos y marca. Puede editar o marcar puntos de revisión.
5. **Descarga** el borrador (.docx y, si da tiempo, PDF) y lo marca como listo para publicar.

## Criterios de terminado

- [ ] Inventario corto en `docs/demo-informes.md`: qué había, qué falta y qué se ha hecho. Separa lo real de lo simulado.
- [ ] Plantilla de salida fiel al informe modelo, derivada de la plantilla .odt y de los dos PDF anonimizados.
- [ ] Extracción de los PDF de TellmeGen a una estructura de datos (genes, variantes, categorías) que alimenta el borrador.
- [ ] **Al menos 2 casos de demo ficticios** inventados con el mismo formato que el material real (personas, resultados y respuestas del cuestionario inventados), listos para subir en directo.
- [ ] Flujo completo de los 5 pasos funcionando en hermes-node, con la interfaz EPI10 UI.
- [ ] Guion de demo de 3–5 minutos en `docs/demo-informes.md`: qué clicar y qué decir.
- [ ] PR (uno o varios) contra `master` de `Skilland-ai/epi10-orquestador`, cada uno con una revisión independiente hecha por un subagente y con la evidencia de lint, typecheck y pruebas en hermes-node. **No hay CI en GitHub**: la evidencia va en el PR. **No fusiones tú**: avisa al orquestador y lo fusiona él.

## El modelo de lenguaje

- En hermes-node **no hay `ANTHROPIC_API_KEY`**. Se le ha pedido a Raúl.
- Construye todo de modo que funcione con el **proveedor falso** (`INFORMES_LLM_PROVIDER=falso`) devolviendo un **contenido de demo bien redactado** para los casos ficticios. Tiene que parecer real.
- Cuando haya clave, se cambia a `anthropic` sin tocar código.
- **Nunca envíes el material anonimizado real de EPI10 a un servicio externo.** Al modelo, solo los casos ficticios.

## Guardrails

- **Trabaja en un worktree propio:** `git -C ~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/epi10-orquestador worktree add ../epi10-orquestador-wt/demo-informes -b demo-informes origin/master`.
- **Tu zona:** `src/modules/informes/**`, sus pruebas y `docs/demo-informes.md`. Si necesitas tocar algo común (`app.module.ts`, `env.ts`, migraciones, `compose.yaml`), hazlo en cambios pequeños y dilo en el PR.
- **El carril 2** (agente `orquestador-panel`) trabaja en paralelo en el panel en vivo y la capa de interfaz común. Si los dos necesitáis la misma base CSS, **copia de momento los archivos que necesites dentro de tu módulo**; el orquestador unificará después.
- **hermes-node:** solo tiene unos 3 GB libres. **No levantes OpenEMR.** Pruebas y builds con `hn push` + `hn sh`. Mira la skill `hermes-node`. El Odoo de pruebas ya está arrancado (contenedores `epi10-odoo-pruebas-*`, puerto 4881).
- **La pila de la demo** (`compose -p epi10-demo`) la levanta el carril 2. Para tus pruebas usa tu propio proyecto de compose o el modo de desarrollo, con puertos que no choquen (usa el rango 4900–4919).
- Solo datos ficticios. Ningún secreto en prompts ni en el repo.
- **Nunca uses `herdr notification`.** Si te bloqueas por algo que solo Raúl puede dar (clave, decisión de producto), escribe en tu respuesta final o pregunta al orquestador, y sigue con lo que puedas.
- Modelo: Claude Opus 5.5. Para los subagentes de implementación, effort medium.

## Entrega

Al terminar, o si te bloqueas, escribe un informe en `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/EPI-10/05_scratch/carriles-2026-10-25/informe_carril1.md` con:
- qué está hecho, con los enlaces a los PR;
- cómo arrancar la demo, con las URL;
- qué es real y qué es simulado;
- lo que queda pendiente.

Responde solo con la ruta de ese archivo.
