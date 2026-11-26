# Encargo · Informe 2.0 de EPI10: versiones hombre y mujer y componentes variables (CON-584)

26 nov 2026. Eres el diseñador de información de Skilland para EPI10 Salud. Raúl ha validado el rediseño común (CON-582) y quiere **enviar hoy** al equipo de EPI10 (Carmen, Aitor y Andrea) una primera entrega para que la revisen: el ejemplo del informe visual en **versión mujer** y **una carpeta con los componentes**.

## Lee primero
1. `EPI-10/04_outputs/fase-2/03_informe/`: `skill/SKILL.md` y sus `references/`, `ejemplo_informe_visual.pdf` (ábrelo y míralo página a página), `notas_para_el_workshop.md` y `analisis_informe_actual.md`. **Lo que hay es la base validada: se amplía, no se rehace.**
2. La issue, copiada aquí:
   - **Versiones heredadas del 2.0**, como mínimo una para hombres y otra para mujeres.
   - **Diagramas de anatomía variables:** un modelo de cuerpo según el sexo; varias complexiones, de ectomorfo a endomorfo, según el IMC; una progresión «de dónde partes → a dónde vas» según el objetivo (si quiere bajar de peso, de más a menos; si quiere ganar, de ectomorfo hacia arriba).
   - **Otros componentes variables** según los datos del cliente: edad, objetivo, nivel de actividad, etc.
   - Todo dentro de la skill, que pasa a ser la **maquetadora del informe 2.0**: elige sola la versión y los componentes según el JSON del cliente.
3. Material real anonimizado: `EPI-10-project/DOCUMENTOS-AITOR-GENERADOR-BORRADORES-INFORMES/` (informes, cuestionarios, TellmeGen). Mira si hay un informe de mujer; si lo hay, la versión mujer sale de él. Si no, construye el caso con datos ficticios coherentes y dilo.
4. Marca: `EPI-10/02_context/EPI10-branding/` (canon `EPI10-Phase-2-Brand-Canon-v1.md`). Marca EPI10, nunca Skilland.

## Qué hay que hacer
1. **Versión mujer y versión hombre** del informe: qué cambia de verdad entre una y otra (modelo de cuerpo, linaje paterno «No aplica», lenguaje, rangos y referencias que dependan del sexo, secciones que solo aplican a uno). Sin tópicos: nada de rosa y azul; la marca es la misma.
2. **Librería de figuras de anatomía** en SVG propio, del mismo trazo que los iconos de la skill: cuerpo de mujer y de hombre, complexiones según IMC y la progresión «de dónde partes → a dónde vas» según el objetivo. Sobrias, respetuosas y neutras; nada que juzgue un cuerpo. El mapa del cuerpo actual debe usar la figura que toque.
3. **Otros componentes variables** que aporten: por edad, objetivo, nivel de actividad… Pocos y buenos; cada uno con su regla de cuándo aparece.
4. **La skill elige sola**: amplía el esquema del JSON (`sexo`, IMC o talla y peso, objetivo, actividad, edad…), `render.py`, los componentes y la plantilla, y documenta las reglas en `references/`. Sube la versión de la skill. Lo sensible y los límites de `voz-y-limites.md` se mantienen.
5. **Ejemplos**: como mínimo una mujer y un hombre, con IMC y objetivos distintos. Nombres ficticios y `meta.ejemplo: true`. El ejemplo actual de «Álex» debe seguir generándose bien.
6. **Catálogo de componentes** para que lo revise gente no técnica: un PDF (y su HTML) que enseñe cada componente con su nombre, para qué sirve, cuándo aparece y sus variantes (las figuras, la rueda, semáforos, tarjetas de complemento, progresión…). Es lo que Raúl llama «la carpeta con los componentes».

## Entrega de hoy
Carpeta `EPI-10/04_outputs/fase-2/03_informe/entrega-2026-11-26/`, pensada para adjuntarla a un correo al cliente:
- `informe_visual_ejemplo_mujer.pdf` (lo principal).
- `informe_visual_ejemplo_hombre.pdf`.
- `componentes/`: `catalogo_componentes.pdf` y las figuras sueltas en PNG o SVG con nombres claros.
- `LEEME.md` de una página, en español llano, para el equipo de EPI10: qué es cada archivo, qué queremos que miren y **qué preguntas queremos que nos contesten** (pocas y concretas). Deja claro que es una primera versión para revisar y que los datos son de ejemplo.
Todo lo demás (JSON, HTML, fuentes de la skill) se queda en `skill/` y `03_informe/`.

## Calidad
- Abre cada PDF y **míralo página a página** antes de darlo por bueno: nada cortado, nada que se salga del pie, figuras proporcionadas, textos sin erratas. Pasa la lista de revisión del `SKILL.md`.
- Si un componente no queda bien, mejóralo o quítalo; no entregues relleno.
- Sé honesto con lo que es propuesta nuestra pendiente de validar por Aitor (reglas de IMC, complexiones, rangos): anótalo en `notas_personalizacion.md`, junto a `notas_para_el_workshop.md`.

## Reglas
- Trabaja en autónomo y sin recortar alcance: decide tú el diseño y anota los supuestos.
- No escribas al cliente, no publiques nada, no toques Linear, no uses `herdr notification`.
- Render en local y ligero (Chromium sin servidor, como ya hace `exportar_pdf.sh`).
- Git: al terminar, `git add` solo de tus carpetas, commit y push a master de `EPI-10` (el repo tiene cambios ajenos sin confirmar: no los toques).
- Al terminar, escribe `EPI-10/04_outputs/fase-2/03_informe/informe_personalizacion.md` (qué has hecho, rutas, supuestos, qué no has podido comprobar) y responde con las rutas y un resumen de 5 líneas.
