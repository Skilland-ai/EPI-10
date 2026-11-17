# M1 · Cuestionario conversacional / onboarding que acaba en resultado y lleva a compra o cuenta

Investigación web hecha el 17 nov 2026. Momento EPI10: el «chatbot de la web» (5 min, 10-15 preguntas → 3 semáforos + fórmula sugerida → crear cuenta).

**Leyenda de evidencia**
- **[V]** = lo he leído yo en la fuente abierta (texto de la página) o lo he visto en una captura abierta.
- **[R]** = solo lo he visto en el resumen de un buscador; **no abrí la fuente**. Tratar como pista, no como dato.
- **[I]** = inferencia mía.

**Aviso general sobre las cifras.** Casi todos los datos de conversión de quizzes vienen de proveedores de software de quizzes (Interact, ConvertFlow, Octane AI, Typeform). Son observacionales, sin muestra publicada y con interés comercial. No encontré ningún estudio independiente y controlado sobre dónde poner la petición de correo.

---

## 1) Estado de cada empresa (a 17 nov 2026)

| Empresa | Estado | Fuente |
|---|---|---|
| **Noom** | Activa. Ha girado hacia GLP-1 (programa «microdose», compra de la farmacia Tailor Made Compounding en abr 2026). Despidos confirmados, fecha no clara. | [R] https://cbinsights.com/company/noom · https://athletechnews.com/noom-launches-119-microdose-glp-1-weight-loss-program/ |
| **Care/of** | **Cerrada.** Canceló suscripciones el 17 jun 2024 y cesó el 3 jul 2024 tras retirar Bayer la financiación. No encontré relanzamiento en 2025-2026. | [R] https://www.nutraingredients.com/Article/2024/06/07/Care-of-to-close-operations/ |
| **ZOE** | Activa pero reducida. **Ya no tiene quiz gratuito**: zoe.com/quiz y zoe.com/quiz/home muestran una página de venta de app + test intestinal. App desde 9,99 £/mes; test 149 £ solo con membresía. Asistente IA «Ziggie». Recortes en 2024; plantilla estimada 365 (mar 2026, estimación de tercero). | [V] https://zoe.com/quiz · https://zoe.com/quiz/home · [R] https://www.reveliolabs.com/companies/zoe/employees |
| **Bioniq** | Activa. Herbalife acordó comprarla en mar 2026 (cifras contradictorias: hasta 150 M$ / 55 M$). No confirmé el cierre de la operación. | [R] https://tech.eu/2026/03/26/bioniq-cashes-in-on-personalised-health-boom-with-150m-herbalife-acquisition/ |
| **Persona Nutrition** | Activa (Nestlé Health Science desde 2019). La página de inicio del assessment funciona. Sin noticias de venta o cierre en 2026. | [V] https://www.personanutrition.com/start/ |
| **Rootine** | Un agregador dice «adquirida por Rhodium en feb 2025». **No verificado** con nota de prensa. | [R] https://www.cbinsights.com/company/rootine |
| **Thorne** | Activa (L Catterton desde 2023). **Lanzó «Taia», asesor IA de bienestar, en ene 2026.** En thorne.com/quizzes ya no hay quizzes descritos: el chat ha sustituido al quiz como entrada. | [V] https://www.thorne.com/featured/taia · https://www.thorne.com/quizzes · https://www.glossy.co/beauty/wellness/how-thorne-is-leveraging-an-ai-powered-wellness-advisor-chatbot-in-the-chatgpt-era/ |
| **HUM Nutrition** | No comprobé su estado actual. El teardown que uso es de 2022. | — |
| **Hims & Hers** | Activa. **Demandada por la FTC (29 jul 2026)** junto con California y Utah: cobro durante el intake, cancelación difícil, datos de salud compartidos con Meta y Snap. Hims lo niega; no está probado. | [R] https://www.lowenstein.com/news-insights/publications/client-alerts/ftc-california-and-utah-target-deceptive-billing-and-health-data-sharing-data-privacy |
| **Function Health** | Activa. Chat IA propio y, desde ago 2026, conector de datos hacia ChatGPT, Claude y Perplexity. | [V] https://www.functionhealth.com/legal/supplemental-chat-terms · [R] https://longevity.technology/news/function-connects-your-lab-results-to-the-ai-health-chatbot-you-use/ |
| **Superpower** | Activa. ~199 $/año. IA propia con «escalado a revisión humana». | [V] https://superpower.com/blog/superpower-ai-a-new-kind-of-health-intelligence |
| **Ritual, Viome, InsideTracker** | **No encontré quiz gratuito con resultado antes de la compra** en ninguna. No investigados a fondo. | [R] búsquedas sin resultado útil |

---

## 2) Ficha breve por app

### Noom (referencia de quiz largo)
- **Qué es:** programa de pérdida de peso por suscripción. Embudo web → app.
- **Longitud real:** hasta **113 pantallas**, 10-15 min, según el teardown de RevenueCat (abr 2026; la autora probó ~20 rutas) [V]. Choice (Australia) contó «más de 70 preguntas» al registrarse (ene 2023) [V].
- **Frecuencia de uso:** diaria (no es el caso EPI10).
- **Pantallas clave vistas en captura [V]:** interludio «You're in trusted hands»; pregunta con el porqué encima; aviso de embarazo en modal; perfil conductual («Peak Performer»); cargador por secciones con preguntas emergentes; puntuación de estrés con recomendación.
- **Correo:** a un tercio del recorrido, justo antes del gráfico de resultado. Botón «See my results» [V].
- **Precio:** se revela al final; prueba de 14 días «paga lo que quieras» [V].
- **Qué copiar:** el porqué en la misma pantalla, la frase de alivio tras la pregunta delicada, el cargador que enseña en qué se basa el resultado, el bloqueo de respuestas poco saludables.
- **Qué evitar:** longitud, precio escondido, cuenta atrás de 15 min, datos de 2021 sin actualizar.
- Fuente principal: https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel

### Care/of (cerrada; fue la referencia del sector)
- **Qué era:** packs diarios de vitaminas personalizados por quiz. Más de 5 millones de quizzes completados desde 2016, según Optimonk [V].
- **Longitud real:** el contador de la captura marca **«20 of 63»** y «25 of 64» [V]. Optimonk contó 60 preguntas [V]. Aun así prometían «menos de cinco minutos» [V].
- **Pantallas clave [V en captura]:** círculos Sí/No enormes; chips multiselección de objetivos con la frase «We ask about 3 to 5 questions per goal»; enlace «Why we ask» abajo que abre un modal; resultado «Made for Sarah»; tarjeta por producto «You told us that… / We recommend…»; ficha de evidencia con nº de estudios, años y «Double-blind placebo: No».
- **Correo:** nombre y datos de contacto al principio, según Optimonk [V]. Barrel no lo detalla.
- **Qué copiar:** «Why we ask», la frase que une respuesta y recomendación, la ficha de evidencia honesta.
- **Qué evitar:** 60 preguntas. Y la lección de negocio: el mejor quiz del sector no evitó el cierre.
- Fuentes: http://www.dtcpatterns.com/dtc-patterns-articles/this-care-of-quiz-helps-you-skip-the-confusion-in-the-vitamin-aisle · https://www.optimonk.com/careof-marketing-strategy

### HUM Nutrition
- **Qué es:** complementos con «nutricionista personal» asignado tras el quiz.
- **Longitud:** el contador de la captura marca **«13 of 13»**, pero cada paso agrupa varias preguntas en la misma pantalla [V].
- **Correo:** **muro antes del resultado.** Pantalla «LAST STEP»: nombre, apellido, correo y contraseña; botón «View my results»; casilla premarcada «Get $10 off by signing up for our weekly newsletter» [V en captura].
- **Resultado [V en captura]:** saludo por nombre, foto y nombre de la nutricionista, «3 formulas», productos **ya metidos en la cesta** («Is in bag», «Your bag (4)») y **cuenta atrás** del cupón (00:59:50).
- **Qué copiar:** el resumen de «qué te llevas» junto a la barra de progreso; la persona con nombre y cara que firma la recomendación; el porqué en línea («This helps us determine your iron needs»).
- **Qué evitar:** muro con contraseña, casilla premarcada, cesta prellenada, cuenta atrás.
- Fuente: https://www.dtcpatterns.com/dtc-patterns-articles/hum-nutrition-provides-a-personal-health-coach-through-their-quiz · captura de resultado (no guardada): https://cdn.prod.website-files.com/5f3add15d7959255726cc5fd/622cda6c3774c61f3afb8d30_3qyMuLW8Md_igd1QNcNGRiqCYPfbABT434MdkJl5W3EuNhGpkSe_l_24FqU9U2bqPh3JaLvVqOoybXwLjBjKsZ3i3txNHviVNCZ8HZN25ExC4zgTC3VP9EVG6Ltr862JodGLMppX.jpeg

### Bioniq GO
- **Qué es:** fórmula personalizada en gránulos a partir de un cuestionario (GO) o de analítica de sangre (PRO).
- **Longitud:** **29 preguntas, ~10 min** (reseña de Athletech News, abr 2024) [V].
- **Precio:** GO 75 $/mes; PRO 199 $/mes [V, misma reseña; puede haber cambiado].
- **Resultado:** la reseña dice que la mayoría de nutrientes superaban el 100 % del valor recomendado; no describe la pantalla [V]. **No vi la pantalla de fórmula.**
- **Críticas:** precio; no se puede añadir ni quitar un nutriente; una reseña duda de cuánto personaliza un cuestionario online [V / R].
- **Qué copiar:** poco verificable. Sirve como dato de longitud.
- Fuente: https://athletechnews.com/bioniq-personalized-supplements-review/

### Persona Nutrition
- **Qué es:** packs diarios personalizados; propiedad de Nestlé.
- **Longitud:** ~5 min según reseñas de terceros [R]. No vi las preguntas.
- **Seguridad [V]:** «Every recommendation checked against 4,000+ interactions»; «If something conflicts with a medication you're taking, it's flagged and adjusted automatically»; «Our pharmacists are available at no extra charge».
- **Qué copiar:** convertir la pregunta de medicación en argumento de confianza, no en trámite.
- Fuente: https://www.personanutrition.com/start/

### Thorne · Taia (asistente IA que lleva a producto)
- **Qué es:** chatbot de IA generativa en la portada de thorne.com, lanzado en ene 2026 [V].
- **Cómo se usa [V]:** texto libre o «pill options» sugeridas. Da recomendaciones según objetivos, explica ingredientes y dosis, compara productos, enlaza artículos. Si hay sesión iniciada, recuerda conversaciones.
- **Límites [V]:** «Taia does not diagnose or replace medical care» (CEO). Glossy: «not allowed to give medical advice»; tampoco sigue pedidos. Se presenta como «AI wellness advisor» desde el titular.
- **Resultados:** 200.000+ mensajes, 350.000+ recomendaciones en seis meses y ~8 % más de ticket medio en usuarios que lo usan. Dato de la empresa vía prensa, citado por un blog de proveedor; **sesgo de selección** [V del blog, no de la fuente original].
- **Queja principal, según su director científico:** «confusion over Taia's offering» (la gente no sabe qué puede pedirle) [V].
- **Qué copiar:** las opciones pulsables bajo el chat; decir «IA» en el nombre.
- Fuentes: https://www.thorne.com/featured/taia · https://www.thorne.com/faq/what-is-taia-and-what-can-it-do · https://www.glossy.co/beauty/wellness/how-thorne-is-leveraging-an-ai-powered-wellness-advisor-chatbot-in-the-chatgpt-era/ · https://alhena.ai/blog/health-wellness-ai-deployments-census/

### Function Health y Superpower (intake + IA)
- **Function:** el intake es un formulario de historial tras pagar (condiciones, medicación, complementos, cirugías, familia), obligatorio antes de reservar la extracción [R]. Términos del chat IA [V]: «AI CHAT IS NOT A HUMAN»; «NOT DESIGNED TO PROVIDE ANY MEDICAL, PSYCHOLOGICAL, OR OTHER CLINICAL ADVICE»; «DOES NOT GUARANTEE THAT ANY RESPONSES WILL BE HELPFUL OR ACCURATE»; emergencias → 911. Actualizados el 25 may 2025.
- **Superpower:** la IA «can escalate to human review when needed»; «AI doesn't replace our clinicians». La página **no** dice que no sea consejo médico [V].
- **No vi las pantallas de intake de ninguna de las dos.**
- Fuentes: https://www.functionhealth.com/legal/supplemental-chat-terms · https://superpower.com/blog/superpower-ai-a-new-kind-of-health-intelligence

### Hims / Hers (intake médico)
- Sin teardown fiable. La única descripción detallada es de un proveedor competidor y casi nada lleva fuente: una pregunta por pantalla, 12-40 preguntas ramificadas, 6-9 min, revisión clínica asíncrona [V del blog, sin respaldo].
- Dato sólido: la demanda de la FTC de jul 2026 por cobrar durante el intake y dificultar la baja [R].
- Fuente: https://getperspective.ai/blog/hims-hers-ai-patient-intake-5b-telehealth-replaced-forms

---

## 3) Patrones

### P1 · Una pregunta por pantalla con respuestas grandes y pulsables
- **Qué es:** pantalla casi vacía. Pregunta centrada en serif. Dos círculos blancos grandes «Yes / No» (Care/of) o botones a todo el ancho apilados (Noom). Tocar avanza solo; el botón «Next» solo aparece en multiselección [V en capturas].
- **Quién:** Care/of, Noom, HUM (botones en rejilla 2×N).
- **Por qué funciona:** Typeform atribuye a este formato su mejor finalización, pero es su filosofía, no un experimento [R]. Octane AI dice que los quizzes con imágenes rinden un 20 % mejor en finalización (dato de proveedor, sin método) [R].
- **EPI10 — copiar.** Encaja con «chatbot por reglas»: burbuja de pregunta + 2-5 tarjetas pulsables. Sin teclado salvo edad y nombre.
- Fuentes: capturas `m1_careof_por-que-preguntamos.jpg`, `m1_noom_porque-y-aviso-embarazo.png`.

### P2 · El porqué de la pregunta, en la misma pantalla
- **Qué es:** dos variantes vistas.
  - Noom: una línea **encima** de la pregunta. «Hormones impact how our bodies metabolize food.» y debajo «What sex were you assigned at birth?» [V].
  - Care/of: enlace subrayado «Why we ask» al pie. Abre un modal con un dato («Did you know: your skin is your largest organ…») y botón «Got it» [V].
  - HUM: paréntesis bajo la pregunta. «(This helps us determine your iron needs)» [V].
- **Por qué funciona:** el teardown de RevenueCat lo señala como la clave de confianza en las preguntas íntimas: «it doesn't feel like a random data grab» [V, opinión de la autora, sin cifra].
- **EPI10 — copiar.** Usar la variante Noom (línea encima) solo en las 3-4 preguntas delicadas: medicación, embarazo, enfermedades, peso. En el resto sobra.

### P3 · Frase de alivio justo después de la pregunta difícil
- **Qué es:** tras dar el peso: «Thank you for sharing. That's an important and hard first step.» Tras marcar una enfermedad: pantalla verde agua con «We're really glad you shared» y la misión de la marca. El mensaje es **el mismo** sea cual sea la respuesta [V].
- **Quién:** Noom.
- **Por qué funciona:** se siente personal sin ramificar el texto. Coste de producción mínimo [V, juicio de la autora].
- **EPI10 — adaptar.** En un chat queda natural: una burbuja corta de respuesta. Cuidado con el tono: en España el exceso de calidez suena a guion. Una frase, no una pantalla.

### P4 · Indicador de progreso que dice cuánto queda (y qué te llevas)
- **Qué es:** tres formas vistas.
  - Care/of: barra inferior oscura con contador «20 of 63» [V].
  - Noom: barra por **secciones** con rombos y el nombre de la sección arriba («DEMOGRAPHIC PROFILE», «WEIGHT LOSS GOALS»). En el quiz conductual: «(1/10)» [V].
  - HUM: barra fina + «13 of 13: Demographics» + a la derecha la lista de lo que se gana: «HUM Recommendations · $10 Coupon · Your Free Nutritionist» [V].
- **Por qué funciona:** responde a la pregunta silenciosa «¿cuánto va a durar esto?» [V, RevenueCat]. ConvertFlow afirma que «Paso 3 de 5» rinde mejor que un porcentaje, **sin dato** [V]. La cifra de «+10-20 % de conversión por barras de carga» que circula sobre Noom **no tiene fuente primaria** [R].
- **EPI10 — copiar** la versión HUM adaptada: «Pregunta 4 de 12» + recordatorio fijo de lo que viene («tus 3 semáforos»). Con 12 preguntas el contador honesto juega a favor; con 63 jugaba en contra.

### P5 · Interludio de confianza entre bloques
- **Qué es:** pantalla sin pregunta. Fondo salmón, titular «You're in trusted hands», ilustración de collage (una mano con dos escaladores sobre una línea de gráfico), un dato en negrita («3,627,436 people») y la letra pequeña que define el dato («subscribers who lost at least 2%… as of October 2021»). Botón «Continue» [V].
- **Quién:** Noom. Justinmind ya veía prueba social en los pasos 5 y 11 en 2018 [V].
- **Por qué funciona:** rompe la monotonía y da un «pequeño triunfo». El dato funciona por específico y por definir su mínimo [V, juicio de la autora].
- **Lo que falla:** la fecha de 2021 «undermines the message» [V].
- **EPI10 — adaptar.** Como mucho **un** interludio en 12 preguntas, hacia la mitad. EPI10 no tiene millones de usuarios: usar un dato verdadero y pequeño (quién revisa el informe, qué laboratorio analiza) en lugar de un número grande. Ponerle fecha y mantenerla al día.

### P6 · Cargador que enseña en qué se basa el resultado
- **Qué es:** tres variantes vistas.
  - Por secciones: lista de barras de colores («Demographic profile 100 % · Weight loss goals 100 % · Eating & nutrition 80 %…») que se llenan una a una, con preguntas Sí/No emergentes mientras carga [V].
  - Con dato: barra «Preparing results… 70 %» bajo un gráfico de dos barras «2x» [V].
  - Conversacional: pantallas casi vacías con una línea, «Based on your answers, Daphne…» → «we've created a personalized plan» [V].
- **Quién:** Noom. Care/of usaba una pausa «Analyzing your answers…» [R].
- **Por qué funciona:** hace que el resultado parezca ganado. Según el blog de Noom, una página de resultados nueva sola no movió la conversión; junto con una página de carga nueva la subió un 25 %. **No pude abrir esa fuente (404)**; lo vi solo en un resumen [R].
- **EPI10 — adaptar.** Dos o tres segundos con el listado de las 5 áreas de la rueda marcándose («Nutrición ✓ · Movimiento ✓ · Descanso ✓…»). Sin preguntas emergentes ni porcentajes inventados: es teatro y choca con la regla de marca.

### P7 · Resultado en tres capas: titular con nombre → «me dijiste / te recomiendo» → evidencia
- **Qué es (Care/of, visto en captura):**
  1. Pantalla de entrada: «RECOMMENDATION · Made for Sarah». Un párrafo que repite los objetivos en negrita («Energy, Skin, Heart, Stress…»). Flecha «Let's go».
  2. Carrusel de tarjetas. Cada una: foto del producto sobre fondo de color, tres iconos de áreas, la frase «**You told us that** you have trouble sleeping and care about muscle recovery», la etiqueta «WE RECOMMEND» y el nombre, y «Learn more».
  3. Ficha: «Research and benefits», bloque oscuro con «Number of studies: 8 · Years of studies: 2007-2017 · **Double-blind placebo: No**».
- **Por qué funciona:** Barrel destaca que cada producto dice si está bien respaldado por la ciencia y enseña los estudios [V]. Decir «No» en doble ciego es justo el tipo de honestidad que EPI10 quiere como marca [I].
- **EPI10 — copiar** la estructura, cambiando el contenido: (1) «Tu punto de partida, Marta» + 3 semáforos; (2) una tarjeta por semáforo con «Nos dijiste que… → Te sugerimos…»; (3) la fórmula sugerida con su porqué y su nivel de evidencia. La tarjeta «me dijiste / te sugiero» es el antepasado directo del «porqué de cada una» de «Mi plan».

### P8 · Puntuación simple + recomendación que se puede quitar
- **Qué es:** «Your Mental Wellness Score». Una barra horizontal ámbar con un número (4) o con la etiqueta «NEEDS SUPPORT (2)». Texto: «A lower score indicates where you could benefit from extra support». Siguiente pantalla «Your Recommendation»: tarjeta con icono, franja verde «You may need support in this area», tres ventajas con check, botón «Yes, add it to my plan», enlace «No, I don't need help…» y la línea «You can always remove this enhancement later» [V].
- **Quién:** Noom.
- **Por qué funciona:** baja la presión de la venta cruzada [V, juicio de la autora].
- **Lo que chirría:** con 4/5 (bien) el texto **también** propone añadirlo. Y el mini-quiz de estrés sale aunque no lo hayas pedido [V].
- **EPI10 — adaptar.** Buen modelo para un semáforo: barra + etiqueta en palabras + una frase. **Evitar** recomendar producto cuando el semáforo sale verde: ahí la regla «recomendamos también lo que no vendemos» pide decir «aquí no necesitas nada».

### P9 · «Tu perfil» con nombre propio
- **Qué es:** tras 10 deslizadores, cargador corto «Analysing your profile…» (pieza de puzle sobre círculo verde) y pantalla verde petróleo: icono redondo rosa, «YOUR BEHAVIOURAL PROFILE», nombre del arquetipo «Peak Performer», tres líneas de descripción y «Next steps» [V].
- **Quién:** Noom.
- **Por qué funciona:** la autora probó respuestas extremas y negativas y el resultado se formula siempre de forma constructiva, sin reforzar la vergüenza [V].
- **EPI10 — adaptar con cuidado.** Un arquetipo simpático puede sonar a horóscopo y resta seriedad a un producto de 399 € con informe profesional [I]. Si se usa, que sea descriptivo («Duermes poco y lo compensas con café») y no una etiqueta de personalidad.

### P10 · Gráfico de proyección personal (Noom)
- **Qué es, según el texto del teardown (no lo vi en captura):** una línea de tendencia descendente y estable frente al «efecto yoyó» de la dieta restrictiva; después, pantalla de resultado con fecha objetivo, marcador del evento personal y proyección «realista». A lo largo del quiz el gráfico vuelve y la fecha se adelanta cada vez que respondes más [V texto].
- **Aviso:** las imágenes del gráfico en ese artículo están rotas (sirven gráficos de otro post). **No tengo captura del gráfico de Noom** y no lo describo más allá de lo que dice el texto.
- **Por qué funciona:** el competidor que dibuja no es otra app, es «hacer dieta por tu cuenta». Repiten a propósito «0,5-1 kg por semana» en tres sitios para fijar expectativas antes de cobrar [V].
- **Lo que chirría:** el ritmo elegido no cambiaba la fecha; la fecha **siempre** mejora, incluso con respuestas negativas [V].
- **EPI10 — evitar** la proyección numérica: EPI10 no diagnostica ni puede prometer una curva. **Adaptar** la idea de fondo: enseñar en el resultado la línea de tiempo del plan («hoy → revisión al mes → 90 días») como camino, no como predicción.

### P11 · Preguntas de seguridad: avisar, confirmar, limitar
- **Qué es (Noom, visto en captura):**
  - Embarazo: «Are you pregnant?» Sí/No. Si «Sí», modal «We want you to know»: «Noom Weight is not currently designed to support pregnant people. **We are not healthcare providers and do not provide medical advice.** We recommend seeking advice from your healthcare provider…». Para seguir hay que leer el «liability waiver» [V].
  - Trastorno alimentario: mismo modal, con un paso previo de confirmación («Thank you for sharing. We know this can be sensitive. Please confirm that your answer is correct.») [V, captura vista y descartada del set final].
  - Enfermedades: lista multiselección con «Other» y «None»; diabetes abre hasta dos preguntas más [V].
  - Bloqueo duro: no deja seguir con un peso objetivo poco saludable ni con un peso clasificado como bajo [V].
- **Persona:** cruza cada recomendación con una base de 4.000+ interacciones fármaco-nutriente, ajusta sola y ofrece farmacéuticos gratis [V].
- **Crítica:** el aviso + waiver «doesn't feel sufficient» y es demasiado fácil de saltar; si dices «no», no pregunta por antecedentes [V].
- **EPI10 — adaptar.** Tres preguntas de seguridad al principio (embarazo o lactancia, medicación, enfermedad diagnosticada), cada una con su porqué. Si alguna es «sí»: el chat **no sugiere fórmula**, enseña igual los semáforos de hábitos y ofrece hablar con el profesional. Eso es mejor que el waiver de Noom y es coherente con «no diagnosticar». La redacción legal debe validarla un abogado; aquí no hay asesoramiento jurídico.

### P12 · Decir que es IA y qué no hace
- **Qué es:**
  - Thorne: la palabra IA va en el nombre y el titular («your personal AI wellness advisor»). Saludo: «Have questions about a new supplement or want to adjust your daily routine? Ask me – I'm here to help!» [V en imagen]. Tiene una FAQ «Is Taia a human?» (no pude leer la respuesta).
  - Function: lo deja en términos legales en mayúsculas, no en la interfaz que yo haya visto [V].
  - Un despliegue descrito por Alhena: el widget avisa de que las respuestas pueden ser generadas por IA, enlaza privacidad y lleva una marca de agente IA [V del blog de proveedor].
- **Marco legal UE:** el art. 50 del Reglamento de IA obliga a informar de que se habla con una IA; varias fuentes dicen que aplica desde el **2 ago 2026** [R; no abrí el texto oficial]. A comprobar: si un chatbot **por reglas** (sin IA) entra en la definición. [I] Probablemente no, pero presentarlo como «asistente guiado» y no como persona es prudente igualmente.
- **EPI10 — copiar** el aviso en la primera burbuja, en una línea: qué es, qué no hace, quién revisa. Ej. de estructura (no texto legal): «Soy un asistente guiado, no una persona ni un médico. No diagnostico. Tu informe lo escribe un profesional».

### P13 · Chat libre frente a opciones guiadas
- **Qué es:** Taia admite texto libre y también «pill options» sugeridas [V]. La queja principal que reconoce Thorne es que la gente no sabe qué pedirle [V].
- **EPI10 — evitar** el chat abierto en la v1 y **copiar** las opciones pulsables. Confirma la decisión de «guiado por reglas»: el usuario nunca se queda ante una caja vacía.

### P14 · Dónde pedir el correo
- Ver sección 3 bis.

---

## 3 bis) Respuestas directas a las seis preguntas

### 1. ¿Cómo hacen ligeras 10-15 preguntas?
- Una pregunta por pantalla y respuestas que se pulsan (P1).
- El porqué solo donde duele (P2) y una frase de alivio después (P3).
- Contador honesto y recordatorio de lo que se gana (P4).
- Agrupar: Care/of avisa «We ask about 3 to 5 questions per goal» al elegir objetivos, así el usuario controla la longitud [V].
- Simplificar el dato: Noom pide la edad por décadas («twenties, thirties…») y HUM por tramos [V].
- Dar salida: opciones «I haven't decided», «None», «Prefer not to say» [V].
- Un interludio (P5) y un cargador con contenido (P6).
- [I] Con 12 preguntas, EPI10 necesita P1, P2, P4 y P6. P3 y P5 con moderación.

### 2. ¿Cómo enseñan el resultado?
- **Primera pantalla:** el nombre de la persona y sus propias palabras devueltas («Made for Sarah… based on your goals to focus on Energy, Skin…») [V].
- **Segunda:** tarjetas «me dijiste → te recomiendo» (P7).
- **Gráficos vistos:** barra de puntuación con etiqueta (P8); gráfico de dos barras «2x»; línea de proyección (solo descrita).
- **Cuánto regalan:** Care/of y Noom enseñan el resultado completo gratis (Noom tras correo). HUM lo esconde tras crear cuenta con contraseña. Ninguno de los vistos cobra por ver el resultado del quiz.
- **Dato:** ConvertFlow dice que una sola página de resultado con 1-3 productos convierte al 10,6 % frente al 7,1 % cuando hay 11 o más páginas de resultado (dato de plataforma, sin muestra) [V].
- [I] «3 semáforos + 1 fórmula» está dentro de ese rango de 1-3 elementos.

### 3. ¿Cuándo y cómo piden el correo?
| Quién | Cuándo | Cómo | Evidencia |
|---|---|---|---|
| Noom | A un tercio, tras un cargador y **antes** del gráfico | Botón «See my results»; consentimiento comercial en paso aparte | [V] |
| HUM | Al final, **antes** del resultado | Nombre, apellido, correo y contraseña; casilla de newsletter premarcada con 10 $ | [V captura] |
| Care/of | Al principio (nombre y contacto) | El nombre se reutiliza en todo el quiz | [V Optimonk] |
| Thorne Taia | No vi que lo pida para chatear | Con sesión, recuerda conversaciones | [V parcial] |

- **Datos (todos de proveedor):**
  - ConvertFlow: el muro antes del resultado capta más correos pero **pierde un 30-50 % de quienes terminan**; después del resultado capta menos y lleva más gente a la cesta (sin cifra) [V].
  - Interact: de quienes empiezan un quiz, el 65 % lo termina y el 40,1 % deja sus datos (ecommerce: 55,5 % y 37,6 %). Sin tamaño de muestra [V].
  - Octane AI (casos elegidos por el proveedor): un quiz con correo **opcional** logró 91 % de finalización y 20 % de alta; otros, 43-79 % de alta [R].
- **Lectura para EPI10 [I]:** la métrica es la segunda compra a 90 días, no el número de correos. Enseñar los 3 semáforos sin muro y pedir el correo **después**, con un motivo concreto («guárdalo y te avisamos de la revisión del mes»), es lo que encaja con la marca. Es una hipótesis que conviene medir con un test A/B; la evidencia publicada no lo zanja.

### 4. ¿Cómo tratan seguridad y avisos legales?
- Ver P11 y P12.
- Texto tipo en complementos (EE. UU.): «These statements have not been evaluated by the FDA… not intended to diagnose, treat, cure, or prevent any disease» en el pie (Thorne, Persona) [V]. Es norma estadounidense: **no trasladar tal cual**; en España aplica el marco europeo de declaraciones de salud [I, no investigado aquí].
- Noom mete en la misma caja de la pregunta: «The results of this survey are not guaranteed and Noom users typically lose 0.5-1 kg per week» [V captura].
- ZOE: no vi ningún aviso médico en su página de venta [V].

### 5. Longitud real y tasas de finalización
| Producto | Longitud | Fuente |
|---|---|---|
| Noom | hasta 113 pantallas, 10-15 min; «más de 70 preguntas» | [V] RevenueCat 2026; Choice 2023 |
| Care/of | 63-64 pasos en el contador; 60 preguntas; «<5 min» prometidos | [V] captura; Optimonk |
| Bioniq GO | 29 preguntas, ~10 min | [V] Athletech 2024 |
| HUM | 13 pasos, varias preguntas por paso | [V] captura |
| Persona | ~5 min | [R] |
| Hims | 12-40 preguntas, 6-9 min | [V] blog de proveedor, sin respaldo |
| 24 apps de salud y fitness | media 6,2 pantallas de pregunta; mediana 4,5; máx. 21 | [V] Lazyweb, jul 2026 (recuento automático; es un suelo) |

- **Finalización publicada:**
  - Ninguna de las marcas investigadas publica su tasa. **No hay dato de Noom ni de Care/of.**
  - Interact: 65 % de finalización media [V].
  - Typeform: 47 % (cifra antigua) o 57 % (nueva) de media; menos del 50 % cuando hay más de seis preguntas [R; el centro de ayuda me devolvió 403].
  - ConvertFlow: conversión por longitud 9,8 % (1-5 preguntas), 10,4 % (6-8), **11,0 % (9-12)**, 9,9 % (13+) [V]. Diferencias pequeñas.
  - Un blog sin fuente: 65-85 % (3-7 preguntas), 45-65 % (8-15), 25-45 % (16+) [R, no fiable].
- **Lectura [I]:** 10-15 preguntas está en la franja que los proveedores dan por buena. Un objetivo razonable de partida es 55-65 % de finalización; por debajo del 50 % hay que recortar.

### 6. Qué critican los usuarios
- **Quiz eterno con el precio al final.** Choice: hay que contestar «dozens of questions before the price will be revealed» [V]. Reseñas: «100 annoying and repetitive questions» para descubrir el pago por adelantado [R].
- **Sensación de trampa en el cobro.** Noom pagó 62 M$ por las renovaciones automáticas; más de 1.200 quejas ante el BBB por pruebas gratuitas engañosas [R].
- **Personalización que no se nota.** En Noom, las restricciones dietéticas o limitaciones físicas no generan ninguna respuesta; el ritmo elegido no cambia la fecha [V]. Healthline sobre Care/of: las recomendaciones «aren't 100% tailored» [R].
- **Caro.** Care/of, «one of the more expensive ways to take vitamins» [R]; Bioniq, el precio es la pega principal [V].
- **No se puede ajustar.** Bioniq GO no deja añadir ni quitar un nutriente [V].
- **Chat IA confuso.** «The biggest complaint is confusion over Taia's offering» [V].
- **No vi reseñas de Reddit ni de Trustpilot directamente**; lo de arriba viene de medios y teardowns.

---

## 4) Qué falla y qué evitar

| Qué falla | Dónde | Para EPI10 |
|---|---|---|
| Precio oculto hasta la última pantalla | Noom [V] | **Evitar.** Decir 399 € y el precio de la fórmula antes o en el resultado. |
| Urgencia fabricada: cuenta atrás de 15 min o de 1 h | Noom [V], HUM [V captura] | **Evitar.** Choca con «nada de venta agresiva». |
| Cesta prellenada con lo recomendado | HUM [V captura] | **Evitar.** |
| Casilla de newsletter premarcada | HUM [V captura] | **Evitar.** Además, en la UE el consentimiento premarcado no vale [I]. |
| Muro de cuenta con contraseña antes del resultado | HUM [V] | **Evitar.** Resultado primero; cuenta después. |
| Recomendar el extra aunque la puntuación salga bien | Noom [V] | **Evitar.** En verde: «no necesitas nada aquí». |
| Preguntar algo y no usarlo | Noom [V] | **Evitar.** Cada una de las 12 preguntas debe verse reflejada en un semáforo o en la fórmula. |
| Proyección que siempre mejora | Noom [V] | **Evitar** predicciones numéricas. |
| Datos de prueba social caducados | Noom (2021) [V] | Fechar y mantener. |
| Aviso de seguridad fácil de saltar | Noom [V] | Si hay bandera, no sugerir fórmula y derivar al profesional. |
| Chat abierto sin guía | Thorne [V] | Opciones pulsables siempre visibles. |
| Cobrar durante el intake, baja difícil | Hims (alegación FTC) [R] | Recompra con un toque, sin suscripción escondida. |
| Quiz excelente, negocio inviable | Care/of [R] | El quiz no sostiene el negocio; la recompra sí. Coherente con la métrica de 90 días. |
| No enseñar nunca el producto por dentro | Noom [V] | **Adaptar:** enseñar en el resultado una vista previa de «Mi plan» y de la rueda. |

**Sobre «imágenes del cuerpo humano»:** no vi ningún cuerpo humano interactivo en los quizzes ni resultados de este momento. Lo más cercano son los iconos por área (luna, pesa, hueso) en las tarjetas de Care/of.

---

## 5) Capturas guardadas

Carpeta: `/home/reboot/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/EPI-10/04_outputs/fase-2/02_investigacion-apps/capturas/`

Todas abiertas y comprobadas. Las de Noom son recortes de un tablero de análisis: llevan notas adhesivas amarillas de la autora sobre fondo azul.

| Fichero | URL de origen | Qué se ve de verdad |
|---|---|---|
| `m1_noom_interludio-prueba-social.png` | https://cdn.sanity.io/images/c3qnx9b0/production/29ce2b9acaac24d8e3be2b369e5898992e25eb2e-458x1023.png | Pantalla salmón «You're in trusted hands», collage de mano con escaladores, «3,627,436 people», botón rojo «Continue», letra pequeña con fecha oct 2021. |
| `m1_noom_porque-y-aviso-embarazo.png` | https://cdn.sanity.io/images/c3qnx9b0/production/9aeabcc43758f03a83609134d1810c5107ce20e6-1218x1334.png | Tres pantallas (sexo con el porqué encima, identidad de género, embarazo) con barra de progreso por secciones, y el modal «We want you to know» con el aviso y el waiver. |
| `m1_noom_perfil-conductual-resultado.png` | https://cdn.sanity.io/images/c3qnx9b0/production/63522346c8e71154a0397e4f2d0e7162c63e3e5e-527x730.png | Cargador «Analysing your profile…» y pantalla verde petróleo «Your behavioural profile · Peak Performer». |
| `m1_noom_cargador-por-secciones.png` | https://cdn.sanity.io/images/c3qnx9b0/production/a46f9a7c3a0d0ec84faaf3a96eac4709964aa294-1529x1077.png | Cargador con siete barras de sección y porcentaje, y preguntas Sí/No emergentes mientras carga. |
| `m1_noom_puntuacion-estres.png` | https://cdn.sanity.io/images/c3qnx9b0/production/a4d37555cac01ab55ef6bc283bd4c18d59e3fb4b-542x1175.png | «Your Mental Wellness Score» con barra ámbar (4 y «Needs support (2)») y la pantalla «Your Recommendation» con «Yes, add it to my plan». |
| `m1_careof_por-que-preguntamos.jpg` | https://cdn.prod.website-files.com/5f3add15d7959255726cc5fd/616728fdd56ee87cdf1b06e2_42DiLxgHNhz3G-88LVcIsqCw7YNHtF7jenX1Jt7mLpRlYNjLsv1OcO8w6AOeNSOhOfu_teoPm9aPqaTjwc9kI33GE2wubOq7TraaP5JoOqHNZsSMIBbaBciNzeTVZmLT15AtyRrl%3Ds0.jpeg | Pregunta con círculos Sí/No, enlace «Why we ask», contador «20 of 63», y el modal «Why we ask». |
| `m1_careof_resultado.jpg` | https://cdn.prod.website-files.com/5f3add15d7959255726cc5fd/616728fdadd90830615191ba_Jeu4QszfmL-n1U7Sg7QW9WM9wnp7VH6lyVV4VfVur_jyA3hTX3rSPAb8et1MyY66vkYCE9DduoM3qnwK9EH82nB5Fu4SVO6QjCWOdWeFw_MCTkVV9oS38ALMhdLFoJHOzAWukMYO%3Ds0.jpeg | «Recommendation · Made for Sarah» y carrusel de tarjetas «You told us that… / We recommend Magnesium». |
| `m1_careof_ficha-ingrediente.jpg` | https://cdn.prod.website-files.com/5f3add15d7959255726cc5fd/616728fd39539a738a645369_vlkUPd_AHZ0kmu3V-TLQUgYHAEx2e4fGd8EDrFg7RSkmUmyRRDXUnzdoLLaQZhU-_2taraAvBwp8vMOuzCSfe0dNRlDyNaCuYh013Dc6HXEfkNU9kNDq9QQVdc4E0VNoIWNgeWKb%3Ds0.jpeg | Ficha de Magnesio con el porqué y bloque «Research and benefits»: 8 estudios, 2007-2017, doble ciego «No». |
| `m1_hum_progreso-y-puerta-correo.jpg` | https://cdn.prod.website-files.com/5f3add15d7959255726cc5fd/622cda6c5ee72a28f140defb_Ea7ynGy6CkwvxH35FrdSsVwCqd1xSgs2RuMeWKiR9_sTus5fiwKKXC6RPzo0EyD2nw7tZrIChKLcVIiheTZYNdMiwT6qTa4UXE0boB_RAKoTg2mfW9rlhNOxF303Yg2V1RaifORg.jpeg | Paso «13 of 13» con barra y lista de lo que se gana; tramos de edad y porqué en línea; pantalla «LAST STEP» con registro y casilla premarcada. |

**Descartadas o no guardadas (solo enlace):**
- Gráfico de predicción, puerta de correo y pantalla de resultado de Noom: los enlaces del artículo sirven gráficos de otro post (cajas y bigotes, curva de crecimiento). **No hay captura válida.** Tablero Figma completo de la autora, no abierto: https://www.figma.com/board/eVPk59TBh7djQ89O3h7aJJ/Noom-Web-to-App-Breakdown
- Thorne Taia, portada del chat (titular + burbuja de saludo, sin conversación real): https://cdn.builder.io/api/v1/image/assets%2F07fe028aa80044d989d010abedbc6280%2F885b71a726444bd6ae771084badc00cb
- HUM, resultado con cuenta atrás y cesta prellenada: enlace en la ficha de HUM.
- Care/of, «Your recommendations are ready» (versión escritorio): https://web-assets.optimonk.hu/en/d9a0e9375a5a55702111091a91e8d20ce48c8eb4-1426x698.png

---

## 6) Lista de fuentes

**Abiertas y leídas [V]**
- RevenueCat, teardown de Noom (9 abr 2026): https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel
- Choice, reseña de Noom (act. 18 ene 2023): https://www.choice.com.au/health-and-body/diet-and-fitness/weight-loss/articles/noom-weight-loss-app-review
- Justinmind, caso UX de Noom (2018): https://www.justinmind.com/blog/ux-case-study-of-noom-app-gamification-progressive-disclosure-nudges/
- Barrel / DTC Patterns, quiz de Care/of (2021): http://www.dtcpatterns.com/dtc-patterns-articles/this-care-of-quiz-helps-you-skip-the-confusion-in-the-vitamin-aisle
- Optimonk, estrategia de Care/of: https://www.optimonk.com/careof-marketing-strategy
- Barrel / DTC Patterns, quiz de HUM (2022): https://www.dtcpatterns.com/dtc-patterns-articles/hum-nutrition-provides-a-personal-health-coach-through-their-quiz
- Athletech News, reseña de Bioniq (24 abr 2024): https://athletechnews.com/bioniq-personalized-supplements-review/
- Persona Nutrition, inicio del assessment: https://www.personanutrition.com/start/
- ZOE: https://zoe.com/quiz · https://zoe.com/quiz/home
- Thorne Taia: https://www.thorne.com/featured/taia · https://www.thorne.com/faq/what-is-taia-and-what-can-it-do · https://www.thorne.com/faq/what-information-does-taia-know-how-is-taia-trained · https://www.thorne.com/quizzes
- NutraIngredients sobre Taia (12 ene 2026): https://www.nutraingredients.com/Article/2026/01/12/are-ai-powered-wellness-advisors-the-future-of-personalized-nutrition-thorne-thinks-so
- Glossy sobre Taia (26 ene 2026): https://www.glossy.co/beauty/wellness/how-thorne-is-leveraging-an-ai-powered-wellness-advisor-chatbot-in-the-chatgpt-era/
- Alhena, censo de asistentes IA en bienestar (jul 2026, blog de proveedor): https://alhena.ai/blog/health-wellness-ai-deployments-census/
- Function Health, términos del chat (25 may 2025): https://www.functionhealth.com/legal/supplemental-chat-terms
- Superpower AI (act. 26 mar 2026): https://superpower.com/blog/superpower-ai-a-new-kind-of-health-intelligence
- Perspective AI sobre el intake de Hims (12 may 2026, proveedor competidor): https://getperspective.ai/blog/hims-hers-ai-patient-intake-5b-telehealth-replaced-forms
- Interact, informe de conversión de quizzes (act. 8 sep 2026): https://tryinteract.com/blog/quiz-conversion-rate-report/
- ConvertFlow, abandono en quizzes (2026): https://www.convertflow.com/blog/how-to-fix-ecommerce-quiz-funnel-drop-off-in-2026
- Lazyweb, nº de preguntas en apps de salud (7 jul 2026): https://design.lazyweb.com/blog/how-many-quiz-questions-health-fitness-apps.md

**Vistas solo en resumen de buscador [R] (no abiertas o no accesibles)**
- Blog de Noom, «growth machine» (404 al abrir): https://web.noom.com/blog/an-introduction-to-nooms-growth-machine/
- Typeform, tasa media de finalización (403 al abrir): https://help.typeform.com/hc/en-us/articles/360029615911
- Casos de Octane AI: https://octaneai.com/case-studies
- Acuerdo de Noom por renovaciones: https://www.subscriptioninsider.com/topics/customer-service/noom-settles-subscription-auto-renewal-lawsuit-for-62m
- Quejas BBB sobre Noom: https://abc7ny.com/noom-reviews-what-is-diet/7422874/
- Cierre de Care/of: https://www.nutraingredients.com/Article/2024/06/07/Care-of-to-close-operations/
- Healthline sobre Care/of: https://www.healthline.com/nutrition/care-of-vitamins
- Bioniq / Herbalife: https://tech.eu/2026/03/26/bioniq-cashes-in-on-personalised-health-boom-with-150m-herbalife-acquisition/
- Rootine: https://www.cbinsights.com/company/rootine
- FTC contra Hims: https://www.lowenstein.com/news-insights/publications/client-alerts/ftc-california-and-utah-target-deceptive-billing-and-health-data-sharing-data-privacy
- Art. 50 del Reglamento de IA: https://artificialintelligenceact.eu/transparency-rules-article-50/
- ZOE, plantilla: https://www.reveliolabs.com/companies/zoe/employees
- Function, conector de datos: https://longevity.technology/news/function-connects-your-lab-results-to-the-ai-health-chatbot-you-use/

---

## 7) Lo que NO pude verificar

- El **gráfico de predicción de peso de Noom**, su puerta de correo y su pantalla de resultado: solo descritos en texto; las imágenes de la fuente están rotas.
- **Tasas de finalización o conversión propias** de Noom, Care/of, HUM, Bioniq, Persona o Thorne: ninguna las publica. El «+25 %» del cargador de Noom y el «+10-20 %» de las barras de carga quedan sin fuente abierta.
- El **quiz de ZOE**: ya no existe en su web y no encontré teardown ni capturas archivadas (web.archive.org no es accesible desde esta herramienta).
- Pantallas reales de **Bioniq GO, Persona, Function, Superpower, Hims, Rootine, Ritual, Viome e InsideTracker**: no vi ninguna.
- La respuesta de la FAQ «Is Taia a human?» y cualquier **conversación real** con Taia.
- **Reseñas de usuarios de primera mano** (Reddit, Trustpilot, App Store): no abrí ninguna.
- **Mobbin, Page Flows y growth.design**: no los consulté.
- El texto oficial del **art. 50** y si alcanza a un chatbot por reglas; el marco español de declaraciones de salud en complementos.
- El estado actual de **HUM** y el cierre de la compra de **Bioniq** por Herbalife.
