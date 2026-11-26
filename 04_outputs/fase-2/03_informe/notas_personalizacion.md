# Notas de personalización · informe visual 2.0 (CON-584)

26 nov 2026 · interno · complementa `notas_para_el_workshop.md`

## Lo que es propuesta nuestra y debe validar Aitor

| Regla | Qué hemos puesto | Dónde está | Por qué hay que validarla |
|---|---|---|---|
| IMC → complexión | Menos de 18,5 → 1 · 18,5–21,9 → 2 · 22–24,9 → 3 · 25–29,9 → 4 · 30 o más → 5 | `CORTES_IMC` en `render.py` | Los cortes 18,5, 25 y 30 son los habituales del IMC. El de 22 lo hemos puesto nosotros para partir el tramo medio. Mismos cortes para mujer y hombre |
| IMC como medida de la complexión | La complexión sale del IMC salvo que el profesional la fije | `persona.complexion` | El IMC no distingue músculo de grasa. «Álex» entrena mucho y sale en la 4 |
| «De ectomorfo a endomorfo» | Cinco escalones de anchura. No usamos los nombres de somatotipo | `FIG_BASE`, `FIG_SUBE`, `FIG_BAJA` | Un somatotipo no es un tramo de IMC. La issue los equipara. Hemos dibujado una escala de complexión y no ponemos nombres al cliente |
| Proporciones de las figuras | Medidas elegidas a ojo para que se lean bien | Igual | No son antropometría. Son dibujo |
| Progresión: cuándo sale | Bajar, solo desde 4 y 5. Subir, solo desde 1 y 2. Un paso; dos si lo marca el profesional. El destino nunca pasa de la 3 | `preparar_persona()` | Es un criterio de prudencia nuestro. Puede que Aitor quiera otra lógica, o no enseñar la pieza |
| «Ganar músculo» desde la complexión 3 o más | Una sola figura y «tu objetivo no pasa por cambiar de complexión» | Igual | La escala solo tiene un eje. No sabemos dibujar «más músculo, misma talla» sin prometer de más |
| Lista de objetivos | Bajar grasa, ganar músculo, ganar peso, mantenerse, rendir más y sentirse mejor | `OBJETIVOS` | El cuestionario no pregunta el objetivo. La lista es nuestra |
| Nivel de actividad | Cuatro niveles. P19 «No» → sedentaria; si hace ejercicio, manda la intensidad (P22); con un día o menos (P20), baja un nivel | `personalizacion.md` | Conversión nuestra. Hoy se rellena a mano en el JSON |
| Nota «a partir de los 65» | Revisar los complementos con el médico | `preparar_persona()` | No está en el anexo del cuestionario. La edad de corte es nuestra |
| Textos de las notas de etapa | Redacción nuestra en tú, a partir de las reglas P45–P48 del anexo | Igual | El propio anexo dice que sus reglas están pendientes de validación clínica |
| Aviso para menores de 18 | `render.py` avisa; no bloquea | Igual | No sabemos si EPI10 hace informes a menores |

## Mujer y hombre: lo que hemos encontrado y lo que no

- **No hay ningún informe de mujer** en el material. Los informes anonimizados I y II y los resultados de TellmeGen traen linaje paterno: son de hombre. La versión mujer sale de un **caso ficticio completo** («Lucía»): genética, hábitos, complementos, ancestralidad e información sensible inventados y coherentes entre sí.
- Las tres referencias de PubMed del caso de Lucía existen y tratan de lo que decimos (comprobadas el 26 nov 2026 en la API de NCBI). Las tres declaraciones de salud son de la lista autorizada de la UE, pero **no hemos podido contrastar su literal** contra el registro: que las revise Aitor.
- **Rangos distintos por sexo: no hemos puesto ninguno.** No tenemos una fuente de EPI10 que los fije. El IMC usa los mismos cortes. Si Aitor quiere referencias distintas (hierro, masa muscular, hormonas), hay que definirlas con él.
- **Apartados solo de un sexo.** El mecanismo existe (`"solo": "mujer"` o `"hombre"`), pero no sabemos qué rasgos y predisposiciones entrega TellmeGen a cada sexo. En el ejemplo lo usan «mama y ovario» y «edad de la menopausia», que son inventados.
- **Lenguaje.** Los textos fijos no tienen género. Los del JSON dependen de quien lo rellene; nada lo comprueba de forma automática.
- **Formulario femenino.** Usamos P45 a P48. No usamos P49 a P51 (ciclo, síntomas premenstruales y diagnósticos como SOP o endometriosis): son datos de salud más delicados y el anexo los trata como «condición diagnosticada». Pendiente de decidir con Carmen.

## Decisiones de diseño que conviene conocer

- **Un informe, no dos.** Mismos colores, mismas páginas, mismo orden. Las figuras son azules: nunca semáforo.
- **El cliente no ve etiquetas sobre su cuerpo.** Ni «complexión 4», ni «sobrepeso». El IMC es un número con la palabra «orientativo».
- **La progresión comparte bloque con el mapa del cuerpo** en la página 4. Así el informe sigue teniendo 12 páginas.
- **La ficha «Tú, hoy»** va en la página 3. Para que quepa, esa página aprieta un poco los espacios cuando hay ficha.
- **Sin `persona`, todo sale como antes**, con una figura neutra. Los JSON de la versión 0.1 siguen valiendo.
- La silueta del mapa del cuerpo de la 0.1 se ha sustituido por las figuras nuevas, también en la neutra.

## Preguntas para el equipo de EPI10

Son las seis del `LEEME.md` de la entrega. Las dos que más condicionan el trabajo: si se añade la pregunta del objetivo al cuestionario y quién decide la complexión.

## Límites de este trabajo

- Las figuras son un dibujo esquemático de frente. No hay vista lateral ni interacción.
- No hemos probado el catálogo ni el informe en impresión en papel; solo en PDF.
- La vista móvil se ha comprobado a 390 px con la versión de mujer, en capturas de Chromium.
