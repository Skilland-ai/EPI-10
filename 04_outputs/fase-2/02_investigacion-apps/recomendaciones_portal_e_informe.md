# Recomendaciones para el portal v0.2 y el informe rediseñado

17 de noviembre de 2026 · Skilland para EPI10 Salud · CON-580 → CON-578 y CON-582 · documento interno

Sale de `investigacion_apps_v1.md`. Los números entre paréntesis (P1 a P25) remiten a su catálogo de patrones. Las capturas citadas están en `capturas/`.

---

## 1. Las cuatro ideas que mandan

1. **Resumen primero.** Toda pantalla importante abre con un recuento y una acción. El detalle se abre a demanda (P6).
2. **Un mismo semáforo en todas partes**, siempre con palabra y frase (P7).
3. **Cada recomendación enseña su porqué**: una respuesta de la clienta o un dato de su test (P4, P22).
4. **El motivo para volver es la revisión**, y llega antes de que se acabe el bote (P21).

## 2. El sistema visual común

Son seis componentes. Sirven igual en el chatbot, el informe, el PDF y el portal. Conviene que CON-578 y CON-582 los definan una sola vez.

| Componente | Cómo es | De dónde sale |
|---|---|---|
| **Semáforo** | Punto de color + palabra + una frase. Estados: **En marcha** (verde), **A mejorar** (ámbar), **Prioridad** (rojo apagado, tirando a terracota) y **Sin datos todavía** (gris). Nunca un color solo | WHOOP, Oura, Function (P7) |
| **Recuento** | «De 5 áreas: 2 en marcha, 2 a mejorar, 1 prioridad», con una barra de tres tramos | Function, Superpower (P6) |
| **Rueda de áreas** | Cinco sectores con su color. Siempre junto a la lista de las cinco áreas en texto. Cada sector se puede tocar | Propio. Nadie de la muestra usa rueda: todos usan listas (P8) |
| **Doble marca** | En cada área: «Lo que traes» (genética, fija, en gris) y «Lo que haces» (hábitos, el semáforo) | 23andMe y el manual de TellmeGen (P10) |
| **Tira de evolución** | Un punto de semáforo por revisión, hasta doce. Sin ejes | Function, Daylio (P19) |
| **Tarjeta de recomendación** | Estado + qué es + «Te lo recomendamos porque…» + chips con el dato + evidencia en texto + cómo tomarlo + acción | Care/of, InsideTracker, Superpower (P22) |

Tres reglas de redacción:

- **Las palabras orientan, no juzgan.** «A mejorar», no «deficiente». «Merece una mirada», no «has empeorado».
- **Dos vocabularios que no se mezclan.** Hábitos y áreas: en marcha, a mejorar, prioridad. Suplementación: tomar, mantener, dejar.
- **La evidencia va en texto** («sólida», «prometedora», «uso tradicional»), no en color. Así no se confunde con el semáforo.

## 3. Portal v0.2: qué incorporar, por prioridad

### Prioridad 1 · Las cuatro pantallas navegables del workshop

**a) Resultado del chatbot** (P1 a P5)

- Una pregunta por burbuja, con dos a cinco tarjetas pulsables. Contador «Pregunta 4 de 12 · al final, tus 3 semáforos».
- El porqué solo en las preguntas delicadas. Primera burbuja: «Soy un asistente guiado. No diagnostico. Tu informe lo firma un profesional».
- Resultado en tres capas: «Tu punto de partida, Marta» con tres semáforos → una tarjeta por semáforo «Nos dijiste que… → Te sugerimos…» → la fórmula sugerida con su porqué.
- Si un semáforo sale verde: «Aquí no necesitas nada». Si salta una bandera de seguridad, según las reglas de Aitor: semáforos sí, fórmula no, y «háblalo con el profesional».
- El correo se pide después del resultado: «Guárdalo y te avisamos de tu revisión». Precio del informe visible, sin cuenta atrás.
- Referencias: `m1_careof_resultado.jpg`, `m1_careof_por-que-preguntamos.jpg`.

**b) Mi plan** (P6, P7, P11, P15, P16, P22 a P24)

Orden de la pantalla en el móvil, de arriba abajo:

```
┌──────────────────────────────────────┐
│ Hola, Lucía                          │
│ De 5 áreas: 2 en marcha · 2 a        │
│ mejorar · 1 prioridad    [▓▓▒▒░]     │
├──────────────────────────────────────┤
│ TUS 3 PRIORIDADES                    │
│ 1 ● Descanso · EMPIEZA POR AQUÍ      │
│ 2 ● Estrés y energía                 │
│ 3 ● Movimiento                       │
├──────────────────────────────────────┤
│ ESTA SEMANA              5 de 7 días │
│              L  M  X  J  V  S  D     │
│ Cenar antes  ■  ■  □  ■  ■  ·  ·     │
│ Caminar 30'  ■  ■  ■  □  ■  ·  ·     │
│ Sin pantalla ■  □  ■  ■  ■  ·  ·     │
│ (tocar celda: Sí · No · Saltar)      │
├──────────────────────────────────────┤
│ TU SUPLEMENTACIÓN                    │
│ TOMAR     Nocticum    porque…  [Ver] │
│ MANTENER  Omega-3     porque…        │
│ DEJAR     Melatonina  porque…        │
│ Te quedan ~7 días · [Pedir de nuevo] │
├──────────────────────────────────────┤
│ Próxima revisión: 3 dic · 2 minutos  │
└──────────────────────────────────────┘
```

- **Hábitos.** Rejilla semanal de siete celdas con «Sí, No, Saltar». Progreso como «5 de 7» y «tu mes: 78 %». Sin rachas de días. Botón «Pausar mi plan».
- **Ritmo.** Al activar el plan: «¿Una cosa o hasta cinco?». El primer mes, uno o dos hábitos activos. El resto se suma tras la primera revisión.
- **Suplementación.** Tres estados. La tarjeta «dejar» pesa lo mismo que «tomar». Lo que EPI10 no vende sale con la misma tarjeta y «No lo vendemos. Búscalo así…». Botón «Ver» antes que «Comprar».
- **El plan no acaba siempre en la tienda.** Al menos una prioridad debe resolverse sin producto.
- Referencias: `m4_wayoflife_cadenas.png`, `m3_superpower_marketplace.jpg`, `m5_ritual_panel-cuenta.jpg`.

**c) Revisión mensual** (P17 a P21)

- Cinco o seis preguntas, una por área, con pulsadores de 1 a 5 y palabra. Más una pregunta sobre la señal concreta de cada fórmula: «¿Cómo has dormido con Nocticum?».
- Al terminar, en este orden: (1) tarjeta por área con «antes → ahora» y el semáforo que cambia; (2) dos bloques, «Sigue así» y «Merece una mirada»; (3) «Tu suplementación del mes que viene: mantener, cambiar o dejar», con el botón de recompra; (4) «¿En qué te centras este mes?».
- Lo que baja lleva una acción, un plazo y dos salidas: «Ajustar mi plan» y «Hablar con mi profesional». Dispara la alerta del back office.
- La primera revisión se compara con el cuestionario inicial.
- **Cuándo.** Unos diez días antes de que se acabe el bote. La segunda, antes del día 60: la baja media en el sector llega hacia el día 77.
- Referencias: `m4_whoop_mpa_sueno_mes_vs_mes.png`, `m3_apple_trends.jpg`, `m4_daylio_checkin_animo_caras.png`.

**d) Mi informe, versión visual** (ver sección 4)

### Prioridad 2 · Lo que hace que el circuito funcione

5. **Avisos que salen a buscar a la clienta** (P20). Correo, o WhatsApp si el cliente lo usa, con una frase-resumen y un enlace. Solo a quien no ha rellenado. A los 90 días, «lo que más has mejorado».
6. **«Ajustar mi plan» antes que la baja** (P25). Cuatro opciones del mismo peso: cambiar de fórmula, espaciar, saltar un envío y darme de baja. Cada motivo lleva a una respuesta útil, no a un descuento.
7. **Tarjeta «Próximo envío»** con tres fechas y aviso 15 días antes del cobro (P24). Solo si hay suscripción. Con recompra manual basta «Te quedan unos 7 días».
8. **Portal sin informe.** Los tres semáforos del chatbot, dos hábitos en la rejilla y la fórmula sugerida. La invitación al informe enseña una vista previa de la rueda con la doble marca: «Esto es lo que añade tu genética».
9. **Espera del informe.** Los mismos dos hábitos ya activos, y un tutorial de tres tarjetas: qué mide un test genético, qué no puede decir y qué parte depende de ti (TellmeGen y 23andMe usan tutoriales así).
10. **Back office.** La tira de evolución por clienta y un filtro «semáforos que han bajado». Es la misma pieza visual que ve la clienta.

### Prioridad 3 · Boceto, o después de la v1

11. **Resultados sensibles con «sí, quiero verlo»** (P12). Pantalla de aviso antes de farmacogenética y vulnerabilidades.
12. **Resumen de los 90 días y resumen anual.** Una tarjeta con cinco filas por doce meses.
13. **Ilustración por área** (P14). Es la respuesta a «imágenes del cuerpo humano» sin cuerpo interactivo.
14. **Barras «ayuda / perjudica»** por hábito, como WHOOP. Solo cuando haya datos suficientes, y con el aviso de que es una pista, no una prueba.

## 4. Informe rediseñado: qué incorporar

**Orden recomendado.** Es el del PDF de GlycanAge, el mejor de la muestra (P13).

| # | Página o bloque | Componentes | Referencia |
|---|---|---|---|
| 1 | **Tu resumen** | Recuento, rueda con la lista al lado y tres prioridades con «Empieza por aquí» | `m3_function_panel-resumen.jpg`, `m2_viome_health_zones.jpg` |
| 2 | **Tu plan** | Una tarjeta por prioridad: qué hacer, por qué en tu caso y cuándo lo revisamos | `m2_glycanage_plan_accion.png` |
| 3 | **Tu complementación hoy** | Tarjetas tomar, mantener y dejar, con evidencia en texto. Espacio opcional «disponible en EPI10» | `m1_careof_ficha-ingrediente.jpg` |
| 4 | **Tus áreas, una a una** | Por área: doble marca, dos o tres factores con barra y una frase | `m2_glycanage_indices_percentil.png` |
| 5 | **Genética y hábitos** | El dibujo de dos piezas y el ejemplo del fumador, adaptado | `m2_tellmegen_manual_genes_vs_factores.png` |
| 6 | **Tu perfil completo** (capa 2) | Rasgos y ancestralidad en fichas. Sensibles, solo si se pidieron | `m2_23andme_informe_alzheimer_muestra.jpg` |
| 7 | **Método, límites y referencias** | Avisos, declaraciones y bibliografía | — |

Decisiones de diseño:

- **La portada es el resumen**, no el índice ni el nombre del test.
- **Páginas a dos columnas** en la capa 1: a la izquierda el dato, a la derecha «qué significa para ti».
- **Barra con marcador** para lo que cambia (áreas del cuestionario). Para la genética, etiqueta fija de tres niveles, sin barra: un genotipo no se mueve (P9).
- **Sin** edad biológica, puntuación global, percentiles frente a otros usuarios ni campana de Gauss. La jerga (genes, variantes) va a la capa 2.
- **Cada página de la capa 1 cierra con un siguiente paso**: «lo vemos en tu sesión» o «actívalo en tu portal».
- **Cuánta confianza tiene cada resultado.** InsideTracker lo enseña con un indicador de «solidez del cálculo». Aquí bastan dos etiquetas: «viene de tu test» y «viene de tu cuestionario».
- **El plan se extrae como datos.** Lo que pinta el informe en los bloques 1 a 3 es lo mismo que pinta Mi plan.

## 5. Qué no meter

- Edad biológica, puntuación única y comparación con otros usuarios.
- Rachas de días, mascotas, puntos y retos.
- Registro diario obligatorio y puntuación de alimentos.
- Cuenta atrás, cesta prellenada, casilla premarcada y descuentos crecientes al darse de baja.
- Muro de cuenta antes del resultado del chatbot.
- Chat libre de salud.
- Cuerpo humano como menú.
- Tienda en la portada.

## 6. Decisiones abiertas para el workshop

| # | Pregunta | Nuestra recomendación |
|---|---|---|
| 1 | **¿Dónde se compran hoy las fórmulas?** No las hemos encontrado a la venta en ninguna web pública | Cerrarlo antes de diseñar la recompra. Mientras, el botón dice «Ver» y lleva a una ficha con «dónde comprarlo» |
| 2 | ¿Rojo puro o rojo apagado? El cliente pidió verde, amarillo y rojo | Rojo apagado y la palabra «Prioridad». Enseñar las dos opciones |
| 3 | ¿Nombres de los estados? | En marcha · A mejorar · Prioridad |
| 4 | ¿Suscripción o recompra manual en la v1? | Recompra manual con aviso. La suscripción obliga al aviso de 15 días y a una baja muy clara |
| 5 | ¿El correo antes o después del resultado? | Después. Medirlo |
| 6 | ¿Qué resultados sensibles entran en el portal? | Ninguno por defecto. Solo con «sí, quiero verlo» y con la sesión delante |
| 7 | ¿Por qué canal se avisa de la revisión? | Correo y, si lo usan, WhatsApp. No hay datos fiables: probar |
| 8 | ¿Aitor firma las frases fijas de cada color y los niveles de evidencia? | Sí. Son contenido profesional, no texto de interfaz |

**Aviso legal.** Los textos de avisos, las declaraciones de salud y la suscripción deben pasar por el asesor de EPI10. Aquí solo hay patrones de diseño.
