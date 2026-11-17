# Para los siguientes agentes · investigación, portal e informe

17 nov 2026 · sale de `estrategia_app_epi10_v1.md` (CON-577). Lee la sección 1 de ese documento antes de empezar.

## Lo que tenéis que saber los tres

- **Tesis.** EPI10 vende un plan personal que se cumple. El informe abre la relación; el portal la mantiene; la suplementación la paga.
- **Una escalera, tres puertas.** B: cuenta gratuita, vía chatbot. A: test e informe, el núcleo; se empieza por aquí. C: «ya tengo mi test», atendido a mano. Las tres acaban en la misma pantalla: **Mi plan**.
- **Lo que la v1 debe demostrar:** que el circuito informe → plan → recompra funciona. Métrica: segunda compra de suplementación en 90 días.
- **Concepto visual común: el semáforo de hábitos.** Verde, ámbar, rojo. Aparece igual en el chatbot, el informe y el portal. Segundo concepto: la rueda con las áreas del perfil. Áreas propuestas, por validar: nutrición, movimiento, descanso, estrés y energía, complementación.
- **El plan son datos, no texto.** Tres prioridades, tres a cinco hábitos y una lista de suplementación con tres estados: tomar, mantener, dejar. El informe lo genera y el portal lo enseña.
- **Regla de marca:** «recomendamos también lo que no vendemos». Nada de venta agresiva. Tono del canon de marca: científico pero humano, prudente, en segunda persona.
- **Límites que no se cruzan:**
  - No se diagnostica, ni se dice que algo previene, trata o cura.
  - Solo declaraciones de salud autorizadas en la UE.
  - Con medicación, embarazo o enfermedad: aviso y derivación al profesional.
  - El chatbot dice que es una IA.
- **Vocabulario:** el test es **genético**, no epigenético. «Complementos alimenticios» o «fórmulas», no «medicamentos» ni «tratamiento». En las maquetas, datos ficticios.
- **Fórmulas de EPI10:** Lesinot (musculoesquelético), Inarticum (movilidad articular), Forticum (rendimiento y vitalidad), Nocticum (descanso), Lipix (equilibrio metabólico), Oxinot (protección celular). Precios y canal: sin confirmar.
- **Fuera de la v1:** app nativa, dietas y menús, comunidad, relojes y pulseras, cuerpo humano interactivo, modelo de recomendación entrenado, chat libre de salud, automatización del cliente C.

## Investigación de apps de salud y hábitos (CON-580)

No hace falta un catálogo de apps. Buscad **patrones para cinco momentos concretos**:

| Momento | Qué buscar | Dónde mirar |
|---|---|---|
| Cuestionario conversacional que acaba en resultado | Cómo hacen ligeras 10 o 15 preguntas; cómo enseñan el resultado; cómo piden el correo | Noom, Zoe, Bioniq GO, cuestionarios de marcas de suplementos |
| Resultado complejo convertido en pocas prioridades | Semáforos, puntuaciones, ruedas; cómo pasan del dato a «haz esto» | InsideTracker, Zoe, Oura, Whoop, Muhdo, GlycanAge |
| Plan de pocos hábitos con seguimiento semanal | Marcado rápido, rachas sin infantilizar, vista de la semana | Fabulous, Oura, Whoop, Streaks |
| Revisión periódica | Check-in de dos minutos; cómo enseñan la evolución; qué pasa cuando empeoras | Whoop (diario), Noom, apps de seguimiento de síntomas |
| Suplementación recomendada con recompra | «Por qué te lo recomendamos», pausa y ajuste en lugar de baja, aviso de lo que sobra | Bioniq, Tally Health, Viome, Persona |

Además:

- **Buscad también lo que falla.** Care/of cerró en 2024 y Zoe recortó plantilla por abandono de clientes. Interesa saber por qué se va la gente a los tres meses.
- **Frecuencia de uso.** Nuestra hipótesis es semanal y mensual, no diaria. Buscad productos que funcionen así y cómo llaman al usuario para que vuelva: correo, WhatsApp, notificación.
- **Entregable útil:** capturas anotadas por momento, con «copiar», «adaptar» o «evitar». No fichas por app.
- **Pendiente de la estrategia:** no pudimos ver el catálogo real. Las webs epi10.es y publiservic.com no muestran tienda de complementos. Si localizáis dónde se venden hoy las fórmulas, anotadlo.

## Portal de clientes v0.2 (CON-578)

Se construye sobre el portal actual (OpenEMR). El recorrido de compra, consentimiento, cuestionario, kit, mensajes, citas e informe **se mantiene**. Lo nuevo, por orden de importancia:

1. **Mi plan** (la pantalla principal tras el informe). Tres prioridades arriba. Hábitos con semáforo. Suplementación con «tomar, mantener, dejar», el porqué de cada una y botón de compra. Próxima revisión.
2. **Revisión mensual.** Dos minutos, cinco o seis preguntas con pulsador. Al terminar, los semáforos cambian y se ve la evolución.
3. **Portal sin informe** (cuenta gratuita). Perfil con tres semáforos, fórmula sugerida, dos hábitos para empezar e invitación al informe. Tiene que parecer útil, no vacío.
4. **Chatbot de entrada**, en la web. Conversación guiada sobre el cuestionario multifórmula (`DOCUMENTOS-AITOR-GENERADOR-BORRADORES-INFORMES/Cuestionarios/`). Usad sus reglas de puntuación y de seguridad tal cual. Termina en resultado y creación de cuenta.
5. **Mi informe, versión visual.** Resumen con rueda y semáforos; detalle por capas; PDF descargable. Coordinad con CON-582.
6. **Espera del informe.** Qué ve la clienta entre la compra y el informe: hábitos iniciales y «qué vas a descubrir».
7. **«Ya tengo mi test»** (puerta C). Solo un formulario de solicitud con subida de archivo. Nada más.
8. **Consentimiento para investigación.** Pantalla aparte del consentimiento del servicio, opcional y por finalidades.
9. **Back office.** Vista de planes activos, revisiones pendientes, alertas cuando un semáforo empeora y recompras.

Criterios:

- **Móvil primero.** Es web, pero se usará desde el teléfono.
- **Poco por pantalla.** Regla del feedback anterior: por omisión, no por adición.
- **Datos estructurados.** Respuestas, plan, cumplimiento y compras se guardan como campos, seudonimizados y exportables (CSV o JSON) para quien haya consentido.
- **Resultados sensibles.** Farmacogenética y vulnerabilidades siguen con control granular: solo si la clienta pidió verlos.
- **Para el workshop** importa enseñar cuatro pantallas navegables: resultado del chatbot, Mi plan, revisión mensual e informe visual. El resto puede ser boceto.

## Rediseño del informe (CON-582)

Punto de partida: `Informes Anonimizados/` (44 a 50 páginas) y la plantilla `.odt`. El contenido de Aitor es bueno y prudente. El problema es de forma y de orden.

- **Dos capas.**
  - **Capa 1, «Tu plan» (4 a 6 páginas):** lo que hoy son las páginas 5 a 15. Es lo que se lee, lo que se comenta en la sesión y lo que pasa al portal.
  - **Capa 2, «Tu perfil completo»:** ancestralidad, rasgos, farmacogenética y vulnerabilidades. Material de consulta, como anexo o sección plegada.
- **Piezas visuales que proponer:**
  - **Rueda del perfil:** las áreas, cada una con su color de semáforo.
  - **Semáforo de hábitos:** la tabla «Aspectos a optimizar», convertida en tarjetas con color, impacto y acción.
  - **Tres prioridades:** portada del plan, una frase cada una.
  - **Tarjeta de complemento:** qué, dosis, por qué en tu caso, cómo tomarlo y nivel de evidencia.
  - **«Tu complementación hoy»:** lo que ya tomas, marcado como mantener, ajustar o dejar. Es la pieza más diferencial: casi nadie dice lo que sobra.
  - **Genética + hábitos:** un gráfico sencillo que enseñe qué viene de los genes y qué de los hábitos.
- **Lo que no se toca:** los avisos (no es diagnóstico), las declaraciones autorizadas, las referencias científicas y el control de resultados sensibles. Se pueden resumir y enlazar, no quitar.
- **Salida doble.** El mismo contenido tiene que servir para el PDF y para la vista del portal. Diseñad componentes, no páginas. El plan debe poder extraerse como datos (prioridades, hábitos, complementos) para alimentar «Mi plan».
- **Fórmulas propias.** Hoy los informes recomiendan genéricos (creatina, omega-3, colágeno, vitamina D). Preved en la tarjeta de complemento un espacio opcional «disponible en EPI10», sin forzarlo. Si se usa y cómo se decide en el workshop.
- **Marca.** Dirección del canon: azul profundo, cian, marfil y fotografía editorial. Los colores de semáforo son funcionales y solo para estados.

## Preguntas abiertas que os afectan

Se cierran en el workshop (desde el 9 dic). Mientras, trabajad con la hipótesis indicada:

| Pregunta | Hipótesis de trabajo |
|---|---|
| ¿La cuenta gratuita es gratis del todo? | Sí |
| ¿Las fórmulas se venden online desde el portal? | Sí, con Stripe; preved la alternativa «dónde comprarlo» |
| ¿Áreas de la rueda? | Las cinco propuestas arriba |
| ¿Se guardan los resultados genéticos estructurados? | Solo con consentimiento de investigación |
| ¿Se recomiendan fórmulas propias en el informe? | Espacio previsto, contenido por decidir |
| ¿Genético o epigenético? | Genético |
