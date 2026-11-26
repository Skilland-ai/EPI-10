# Del informe de Aitor a los datos

El informe actual (plantilla `Plantilla Informe Nutrigenético.odt`, 44–50 páginas) tiene siempre las mismas secciones. Esta tabla dice de dónde sale cada campo del JSON.

| Sección del informe actual | Campo del JSON | Cómo se convierte |
|---|---|---|
| Cuestionario de hábitos, sección 1 y formulario femenino | `persona` | Sexo al nacer (P3), edad desde la fecha de nacimiento (P2), peso y altura (P5 y P6), actividad (P19–P22) y etapa (P45–P48). **El objetivo no está en el cuestionario**: sale de lo que escriba el profesional o se deja vacío. Reglas en `personalizacion.md` |
| «Tus resultados» (prosa de hábitos) | `perfil_habitos[]` | Una ficha por tema: actividad, alimentación, pescado, sueño, estrés, alcohol y tabaco, complementos y medicación. Valor en menos de 10 palabras. Estado según la regla de puntuación |
| «Tus resultados» (analítica) | `analitica` | Solo si se aportó. Copia la frase de «sin interpretación clínica» |
| «Lo más relevante de tu perfil» (tabla de 5–6 áreas) | `areas[]` | Agrupa en las cinco áreas de la rueda. `genetica_txt` sale de «Tu tendencia» (lo genético); `habitos_txt`, de lo declarado; `frase`, de «¿Qué implica?» resumido |
| «Aspectos a optimizar» (tabla) | `habitos[]` | Una tarjeta por fila. `vemos.genetica` y `vemos.habitos` se separan de «Impacto en tu salud»; `accion` sale de «Estrategia de mejora» en imperativo y con 30 palabras como máximo. Añade un hábito verde con lo que ya hace bien |
| Fichas de complementos (1, 2, 3…) | `complementos[]` | Dosis tal cual. `por_que` separado en genética y hábitos. `como` desde «¿Cómo tomarlo?». `declaracion`: la frase autorizada UE, **literal**. `referencias`: los enlaces. `evidencia`: ver reglas |
| «Tu resumen de recomendación» | — | No se repite: ya está en las tarjetas |
| «Revisión de tu complementación actual» | `complementacion_actual[]` | Un elemento por producto. **El estado es el color de Aitor**: verde, mantener; amarillo, revisar; rojo, dejar. Lo nuevo que recomiende, como `anadir` |
| Aviso de medicación | `medicacion` | Si declara medicación. Conserva «las indicaciones de tu médico van primero» |
| «Conclusiones» | `resumen.frase`, `prioridades[]` | La frase resume la conclusión en dos ideas. Las prioridades salen de «La recomendación principal» y de las áreas destacadas |
| Ancestralidad, linajes, neandertal | `capa2.ancestralidad` | Porcentajes de la tabla. Haplogrupos: el grupo principal y el subgrupo. `ruta`: la cadena de haplogrupos con su «hace X años» (punto medio si es un intervalo). Los textos históricos largos **no** se copian |
| «Salud, rasgos y fitness» y «Rasgos personales» | `capa2.rasgos[]` | Usa las tablas «Tus aspectos clave» de Aitor, no el volcado de TellmeGen. Cada rasgo con su tendencia en la escala de 5 pasos. `significa`: la columna «Qué significa», en una frase |
| Farmacogenética | `capa2.sensible.farmacogenetica[]` | Una tarjeta por familia de fármacos. `relevancia`: cuándo importa |
| Vulnerabilidad genética | `capa2.sensible.predisposiciones[]` | Agrupada por sistema, con el nivel de riesgo en la escala neutra |
| Condiciones hereditarias | `capa2.sensible.hereditarias[]` | Variante presente y qué significa |
| Contacto | `contacto` | Datos públicos de EPI10 |

## Reglas de conversión

**Áreas de la rueda.** Las cinco de trabajo: `nutricion`, `movimiento`, `descanso`, `estres` y `complementacion`. Están pendientes de validar en el workshop.

**Estado de un área** (semáforo): lo decide el profesional. Si no lo indica, propón uno:
- rojo: hábitos ≤ 2 y señal genética ≥ 2,5;
- ámbar: hábitos ≤ 3, o señal genética ≥ 2 con hábitos ≤ 4;
- verde: el resto.

Si tu propuesta contradice el texto de Aitor, manda el texto.

**Puntuación de hábitos (1–5).** Sale de las respuestas del cuestionario de frecuencia: «nunca o casi nunca» 1, «pocas veces» 2, «a veces o de vez en cuando» 3, «frecuentemente» 4, «siempre o casi siempre» 5. Si la pregunta es negativa, como el estrés, se invierte. Si hay varias preguntas por área, se hace la media redondeada. **Es una propuesta de Skilland pendiente de validar con Aitor.**

**Señal genética (1–3).** 1: sin hallazgos relevantes en el área. 2: tendencias medias o «ligeramente» altas o bajas. 3: hallazgos «alto» o variantes relevantes (por ejemplo MTHFR en dos copias o HFE). Se admiten decimales para colocar el punto en el mapa.

**Escala neutra.** bajo 1 · ligeramente bajo 2 · medio o normal 3 · ligeramente alto 4 · alto 5. Las variantes («dos copias», «una copia», «sin variantes») van como etiqueta, no en la escala.

**Evidencia (1–3).** Se toma de cómo la describe Aitor. 3, alta: metaanálisis consistentes o declaración UE directa. 2, moderada: «prometedora», resultados mixtos. 1, preliminar: estudios pequeños.

**Indicadores.** Cada hábito lleva un indicador que se pueda marcar en el portal: «Noches que duermes bien, de 7» o «Etiqueta revisada». Si Aitor no lo da, se propone y se marca para validar.

**Mujeres biológicas.** `persona.sexo: "mujer"` y `linaje_paterno: null`. Lo pidió Aitor: no tienen cromosoma Y. Si se olvida, `render.py` lo vacía y avisa. Los textos del JSON, en femenino.

**Resultados propios de un sexo.** Si el volcado de TellmeGen trae rasgos o predisposiciones que solo tienen sentido para un sexo (próstata, mama, ovario), márcalos con `"solo"`.

**Objetivo.** Si el informe o el profesional no lo dicen, no lo deduzcas del IMC ni de la genética. Sin objetivo no hay progresión, y es correcto.

**Erratas del original.** Se corrigen sin cambiar el sentido. Por ejemplo, el linaje paterno que dice «subhaplogrupo materno».

**Usted y tú.** Todo en segunda persona del singular: tú.
