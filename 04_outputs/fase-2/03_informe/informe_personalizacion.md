# Informe de cierre · personalización del informe visual 2.0 (CON-584)

26 nov 2026 · interno · encargo: `BRIEF_personalizacion.md`

## Qué se ha hecho

1. **Versiones de mujer y de hombre.** Un solo informe que cambia con `persona.sexo`: figura, linaje paterno («No aplica»), notas de etapa, filtro `solo` y concordancia de los textos. Misma marca.
2. **Librería de figuras** en SVG generado: mujer, hombre y neutra, en cinco complexiones. El mapa del cuerpo usa la que toca y recoloca los marcadores.
3. **Progresión «de dónde partes → a dónde vas»** según el objetivo, en la página 4.
4. **Otros componentes variables:** ficha «Tú, hoy» (edad, talla y peso, actividad, objetivo) y notas de tu etapa.
5. **La skill elige sola** (versión 0.2.0): bloque `persona` en el JSON, reglas en `render.py`, avisos al generar y reglas documentadas en `references/personalizacion.md`.
6. **Ejemplos:** Lucía (mujer, 46 años, IMC 20,1, ganar músculo, perimenopausia) y Álex (hombre, 34 años, IMC 27,1, bajar grasa).
7. **Catálogo de componentes** de 12 páginas, con 21 fichas, y exportación de figuras sueltas.

## Rutas

Todo bajo `EPI-10/04_outputs/fase-2/03_informe/`.

| Qué | Ruta |
|---|---|
| Entrega para el cliente | `entrega-2026-11-26/` |
| · Informe de mujer | `entrega-2026-11-26/informe_visual_ejemplo_mujer.pdf` |
| · Informe de hombre | `entrega-2026-11-26/informe_visual_ejemplo_hombre.pdf` |
| · Catálogo | `entrega-2026-11-26/componentes/catalogo_componentes.pdf` |
| · Figuras sueltas (16 SVG y 16 PNG) | `entrega-2026-11-26/componentes/figuras/` |
| · Guía para EPI10 | `entrega-2026-11-26/LEEME.md` |
| HTML y PDF de trabajo | `ejemplo_informe_visual.html/.pdf` (Álex), `ejemplo_informe_visual_mujer.html/.pdf`, `catalogo_componentes.html/.pdf` |
| Skill 0.2.0 | `skill/` |
| · Reglas de personalización | `skill/references/personalizacion.md` |
| · Datos de ejemplo | `skill/ejemplo/datos_ejemplo.json` (hombre), `skill/ejemplo/datos_ejemplo_mujer.json` |
| · Vista móvil | `skill/ejemplo/ejemplo_pantalla.html`, `skill/ejemplo/ejemplo_pantalla_mujer.html` |
| · Scripts nuevos | `skill/scripts/catalogo.py`, `skill/scripts/exportar_figuras.py` |
| Pendiente de validar | `notas_personalizacion.md` |

## Comprobado

- Los tres PDF tienen 12 páginas A4 y se han mirado página a página en imagen: nada cortado ni fuera del pie.
- El JSON de Álex **sin** `persona` (formato de la 0.1) genera 12 páginas con la figura neutra.
- Caso extremo: mujer de 67 años, complexión 5, progresión de tres figuras, ocho marcadores, tres notas de etapa, sin consentimiento sensible. Genera 11 páginas y todo cabe.
- `render.py` vacía el linaje paterno de una mujer y quita un marcador `solo: hombre`, y avisa de las dos cosas.
- Vista móvil a 390 px con la versión de mujer: ficha, mapa y progresión se leen sin desplazamiento lateral.
- Búsqueda en el texto de los PDF: sin «previene», «cura», «epigenético», «usted», «sobrepeso» ni nombres de somatotipo. «Complexión 1 a 5» solo aparece en el catálogo.
- Las tres referencias de PubMed del caso de Lucía existen y son del tema (API de NCBI).

## Supuestos

- **No hay informe de mujer en el material**: los dos informes anonimizados y el volcado de TellmeGen son de hombre. Lucía es un caso ficticio completo. Lo dicen la portada, el `LEEME.md` y las notas.
- En Álex son inventados la edad, la talla, el peso y el objetivo. El resto sigue saliendo del informe anonimizado I.
- Cortes de IMC, lista de objetivos, reglas de la progresión, niveles de actividad y nota de los 65 años: propuestas nuestras. Detalle en `notas_personalizacion.md`.
- Los nombres de somatotipo de la issue no se enseñan al cliente: la escala es de complexión, sin nombre.
- La progresión va en la página 4 para mantener las 12 páginas.
- El ejemplo de hombre es el de Álex ampliado, no un caso nuevo.

## Lo que no se ha podido comprobar

- El **literal** de las tres declaraciones de salud del caso de Lucía contra el registro de la UE.
- Qué rasgos y predisposiciones entrega TellmeGen según el sexo: no hay volcado de mujer.
- Impresión en papel y lectura con lector de pantalla.
- La vista móvil del ejemplo de hombre y la del catálogo (el catálogo solo existe en A4).

## Lo que no se ha tocado

- Linear, el cliente y cualquier publicación. No se ha usado `herdr notification`.
- `02_context/01_estado_actual.md` y el registro del módulo: `01_estado_actual.md` tiene cambios ajenos sin confirmar y el encargo pide no tocarlos. Queda pendiente de quien lleve ese archivo.
- El resto de cambios sin confirmar del repositorio.

## Siguiente paso

Enviar `entrega-2026-11-26/` al equipo de EPI10 y recoger las seis respuestas del `LEEME.md`. Con ellas se cierran los cortes de IMC, la pregunta del objetivo y los textos de etapa.
