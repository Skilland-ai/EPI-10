# Notas para el workshop · informe visual (CON-582)

17 nov 2026 · interno · workshop desde el 9 dic

## Qué enseñar (15 minutos)

1. **El antes y el después, en papel.** El informe anonimizado I (50 páginas) al lado de `ejemplo_informe_visual.pdf` (12 páginas). Mismo cliente, mismo contenido de Aitor. Frase: «no hemos quitado nada: lo hemos ordenado».
2. **Página 2, «Tu plan en una página».** La rueda, las tres prioridades y el siguiente paso. Pregunta a Carmen y Aitor: ¿esto es lo que queréis que el cliente recuerde?
3. **Página 6, «Tu complementación hoy».** «Tomas 6 → mantén 3, revisa 3, añade 1.» Es lo que ninguna tienda dice y une a Tomás con Carmen y Aitor: el rigor decide y la venta viene detrás.
4. **Página 4, el mapa genética × hábitos.** Explica por qué algo es prioridad. Es lo que justifica los 399 €.
5. **Páginas 8 y 11.** La revisión mensual y el portal como continuación, y lo sensible tratado aparte, con candado y derivación al médico.
6. **El móvil** (`skill/ejemplo/ejemplo_pantalla.html`, a 390 px): los mismos componentes son la vista «Mi informe» del portal. El informe y el portal son un solo sistema.
7. **La skill.** Aitor rellena menos texto y más estructurado. Un agente lo convierte en minutos. Enseñar el JSON del ejemplo, sin entrar en el detalle técnico.

## Qué preguntar a Aitor

1. **Prioridades.** ¿Puedes escribir tres prioridades ordenadas en cada informe? Hoy no existen; en el ejemplo las hemos deducido de tus conclusiones (sueño, recuperación y simplificar). ¿Están bien?
2. **Estado por área.** ¿Aceptas poner verde, ámbar o rojo a cada una de las cinco áreas? ¿Quién lo decide: tú o una regla que tú firmas?
3. **Puntuación de hábitos (1–5).** Hemos propuesto una regla que sale de las respuestas de frecuencia del cuestionario (`skill/references/de-texto-a-datos.md`). ¿La validas o prefieres la tuya?
4. **Señal genética (1–3) por área.** ¿Qué hallazgos cuentan como «señal alta»?
5. **Indicadores de cada hábito.** Los del ejemplo («noches que duermes bien, de 7») son nuestros. ¿Cuáles usarías en la revisión mensual?
6. **Nivel de evidencia** de cada complemento (alta, moderada, preliminar). ¿Lo puedes indicar en cada ficha?
7. **Rasgos de la capa 2.** ¿Usamos tus tablas «Tus aspectos clave» y dejamos fuera el volcado completo de TellmeGen (40 a 60 filas), o lo enlazamos como anexo descargable?
8. **«Edad epigenética aumentada»** sale en el volcado de rasgos del informe I. ¿Lo mostramos? Choca con el «genético, no epigenético» del canon.
9. **Textos históricos** de ancestralidad y neandertales (unas 8 páginas): los hemos reducido a cifras y una línea del tiempo. ¿Te parece bien?
10. **Erratas detectadas en la plantilla**: «subhaplogrupo materno» en el linaje paterno, «Ibércia», «atlántrica», «Redifiniendo», «aquellas aquellas» y la mezcla de tú y usted. Conviene corregirlas en la `.odt` ya.

## Decisiones abiertas

| Decisión | Hipótesis con la que hemos trabajado | Quién decide |
|---|---|---|
| Áreas de la rueda | Nutrición, movimiento, descanso, estrés y energía, complementación | Aitor y Carmen |
| ¿«Disponible en EPI10» en la tarjeta de complemento? | El hueco existe (`complementos[].epi10`) pero el ejemplo no lo usa: ningún informe real recomienda hoy una fórmula propia | Workshop (Tomás, Aitor) |
| Botón de compra en el PDF | «Pídelo desde tu portal o donde prefieras». Sin precios ni enlaces de tienda | Workshop |
| URL o QR del portal en el PDF | Sin URL: el portal definitivo no tiene dominio | Skilland, cuando haya dominio |
| ¿El PDF incluye la capa 2 o va aparte? | Todo en un PDF, con la capa 2 como anexo. El renderizador permite sacar solo «Tu plan» (`--sin-capa2`) | Carmen |
| Información sensible | Una sola página, solo con consentimiento expreso (`consentimiento: true`) | Carmen y el asesor legal |
| Título | «Tu plan», en lugar de «Tus complementos recomendados» | Carmen |
| Nombre del producto | Se mantiene «NutriWell», provisional según el canon | Carmen |
| Tipografía | Manrope, la del portal actual. El canon dejaba la familia para la fase 3 | Skilland, si hay revisión de marca |
| Revisión a seis meses | Aparece en «Lo que viene ahora» | Negocio (pregunta 11 de la estrategia) |

## Supuestos y límites de este trabajo

- Ejemplo construido con el **informe anonimizado I**, con nombre ficticio («Álex») y código inventado. Los datos genéticos son los del documento anonimizado.
- **Estados de complementos, literales de Aitor**: tres verdes y tres amarillos, sin rojos. No hemos «endurecido» ninguno.
- Lo que es **propuesta nuestra**, pendiente de validar: el orden de las prioridades, las puntuaciones de hábitos y de señal genética, los indicadores mensuales, el nivel de evidencia y el estado de cada área.
- El mapa del cuerpo es **estático**. El interactivo queda fuera de la v1, como dice la estrategia.
- Hemos generado el PDF con Chromium sin interfaz y en local, sin levantar servidores. Las fuentes van incrustadas.
- No hemos tocado Linear, no hemos escrito al cliente y no hemos publicado nada.
