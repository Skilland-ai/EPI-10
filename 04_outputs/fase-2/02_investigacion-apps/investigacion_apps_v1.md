# Investigación de apps de salud y hábitos · v1

17 de noviembre de 2026 · Skilland para EPI10 Salud · CON-580 · documento interno de trabajo

Alimenta el portal de clientes v0.2 (CON-578) y el informe rediseñado (CON-582). El filtro es la estrategia aprobada (`../01_estrategia/estrategia_app_epi10_v1.md`).

**Cómo leerlo.** La sección 1 basta para conocer las conclusiones. La sección 3 es el catálogo de patrones, ordenado por los cinco momentos que pidió la estrategia. La lista priorizada para el portal y el informe está aparte, en `recomendaciones_portal_e_informe.md`.

**Marcas de solidez.**

- **[V]** visto o leído en la fuente: una captura abierta, una demo, un PDF de muestra o un artículo.
- **[R]** leído solo en el resumen de un buscador; la página no se abrió o dio error. Vale como pista.
- **[I]** inferencia nuestra.

**Etiquetas de aplicación:** COPIAR, ADAPTAR o EVITAR.

**Capturas.** Hay 64 imágenes de referencia en `capturas/`, con su índice en `capturas/INDICE.md`. Son capturas de terceros y de prensa: sirven como referencia interna, no para publicar ni para enseñar al cliente sin citar el origen.

---

## 1. Resumen en una página

**La conclusión.** Los mejores productos del mundo hacen lo mismo que propone la estrategia: muchos datos detrás, un plan corto delante y una revisión que da motivo para volver. La investigación no cambia la estrategia. La afina en nueve puntos.

1. **La portada es un resumen, no un índice.** Los mejor valorados abren con un recuento y una acción. Function: «130 biomarcadores: 89 en rango, 19 fuera, 22 otros». GlycanAge: una cifra y «tu plan está listo» [V]. TellmeGen, que es lo que la clienta de EPI10 ve hoy, abre con seis tarjetas sin datos y una lista de 59 condiciones, casi todas «Riesgo medio» [V]. Ahí está el hueco de EPI10.
2. **El semáforo nunca va solo.** Oura pone número, etiqueta y una frase. WHOOP tiene una frase de acción por color, y su rojo dice «probablemente tu cuerpo necesita descanso», no «mal» [V]. Superpower, Function y Zoe evitan el rojo puro: usan rosa, terracota o ámbar [V].
3. **Pocas acciones está validado.** InsideTracker pregunta el ritmo: una acción o hasta cinco. El resto queda detrás de «editar plan» [V]. Su estudio con más de 20.000 usuarios asocia crear el plan con mejorar más. Es observacional y lo publica la propia empresa [V].
4. **Nadie de la muestra usa una rueda.** Usan listas de áreas con barra o nota (Oura, Viome, Superpower, Neko) [V]. La rueda puede ser la firma visual de EPI10, pero siempre con la lista de las cinco áreas al lado.
5. **El cuerpo humano ilustra, no navega.** Solo SelfDecode navega con una silueta, y necesita una pestaña «lista» al lado. Superpower y Neko lo usan como imagen de marca [V]. Para EPI10: una ilustración por área, más adelante.
6. **Para los hábitos, una rejilla semanal.** Way of Life es un semáforo literal: una fila por hábito, siete celdas verde o rojo, y marcado con «Sí, No, Saltar» [V]. Mejor «5 de 7» que una racha de días: las rachas castigan el primer fallo [V].
7. **La revisión se ata a la recompra.** 9amHealth abre una encuesta corta 13 días antes de reponer la medicación [V]. Es el precedente más claro de la «revisión mensual de dos minutos». Se copia el momento, no el bloqueo.
8. **La tarjeta de fórmula dice por qué y con qué evidencia.** Care/of: «nos dijiste que… → te recomendamos…», y una ficha con número de estudios, años y doble ciego «sí o no» [V]. Nadie que venda suplementos dice «deja de tomar esto». El estado «dejar» sería diferencial de EPI10 [I].
9. **La baja se convierte en ajuste, con la baja a la vista.** En la pantalla de cancelación, vuelve a comprar el 66 % de quien cambia de producto, el 53 % de quien retrasa y menos del 2 % de quien cancela (Recharge) [V]. Esconder la baja ya tiene demanda: la FTC contra Hims & Hers, julio de 2026 [V].

**Tres avisos.**

- **Edad biológica y puntuación global: no.** Una misma muestra dio casi 15 años de diferencia en la misma empresa (Kaeberlein, marzo de 2026) [V]. Y el test de EPI10 es genético: no puede calcularla.
- **El sector es frágil.** Care/of cerró en 2024. Zoe facturó la mitad y bajó la cuota un 60 % [V]. La explicación que se repite: «cuando ya has aprendido, el valor cae». La revisión mensual tiene que dar algo nuevo cada vez.
- **No hemos localizado dónde se venden las fórmulas de EPI10.** No aparecen en ninguna web pública [V]. El botón de compra no tiene hoy a dónde apuntar. Hay que cerrarlo con el cliente antes de diseñar la recompra.

**Límite de este trabajo.** Es investigación de escritorio. No hemos usado las apps con cuenta propia ni consultado Mobbin o Page Flows, que son de pago. Varias webs bloquearon el acceso (WHOOP, Apple, Examine). Lo no verificado está en la sección 5.

---

## 2. Fichas breves por familia

Una línea por app: qué es, su estado hoy y qué tomamos de ella. El detalle de cada una está en los anexos.

### Genética, epigenética y edad biológica

| App | Estado (nov 2026) | Qué enseña | Para EPI10 |
|---|---|---|---|
| **TellmeGen** (proveedor de EPI10) | Activa. Demo pública de resultados [V] | Seis tarjetas de categoría, listas planas, etiqueta de riesgo en cinco niveles, campana de Gauss, jerga (loci, SNP). Sin resumen ni «qué hago ahora» [V] | Es el contraejemplo. Copiar solo el bloqueo de ítems y su dibujo «factores genéticos / otros factores» |
| **23andMe** | Quebró en 2025. Sigue vendiendo como entidad sin ánimo de lucro (TTAM) [R] | Resultados sensibles con consentimiento por capas. Tres curvas de riesgo según estilo de vida. Cierre con «háblalo con un profesional» [V] | Copiar las capas y la idea de las curvas |
| **GlycanAge** | Activa. App nueva en 2026 [V] | PDF apaisado de 38 páginas con resumen ejecutivo, barra segmentada, foco primario y secundario, «cuándo repetir» [V] | El mejor informe imprimible de la muestra. Copiar la estructura |
| **Tally Health** | Activa. Comprada por Infinite Epigenetics en abril de 2026 [R] | Test epigenético, plan y suplementos con retest. No vimos pantallas | Solo como modelo de «medición que se repite» |
| **Elysium Index** | Activa [V] | Edad biológica y nueve «edades de sistema». Admite hasta 9 años de variación entre repeticiones [V] | Argumento para no usar edad biológica |
| **Muhdo** | Activa. App nueva [V] | Cifras grandes sin escala («Health Score 106») y tienda bajo el resultado [V] | Evitar |
| **Viome** | Activa. App rehecha en 2026 [V] | Zonas de salud con puntuación y «Mantener / Mejorar», sello «Empieza aquí», foco único, alimentos por categorías [V] | Copiar «empieza por aquí». Evitar 400 alimentos clasificados |
| **24Genetics** | Activa [V] | PDF de 54 páginas. Resumen con unos 50 deslizadores de color en una página [V] | Contraejemplo de resumen sin prioridad |
| **SelfDecode** | Web activa. App sin actualizar desde 2022 [V] | Silueta humana como menú, con pestaña «lista» al lado. Iconos de persona [V] | El único cuerpo navegable. No convence |

### Biomarcadores y analíticas con recomendaciones

| App | Estado (nov 2026) | Qué enseña | Para EPI10 |
|---|---|---|---|
| **InsideTracker** | Activa. Gira a B2B [V] | Barra de zonas con «tu zona óptima», plan de acción con «ritmo», recomendaciones con estrellas de evidencia, aviso «consulta a tu médico» [V] | La mejor tarjeta de recomendación. Copiar ritmo y evidencia |
| **Function Health** | En expansión. Compró Ezra y SuppCo [R] | Recuento en tres cifras, lista por órgano con icono, mini-gráfico de puntos por marcador, notas del clínico que empiezan por «tus fortalezas» [V] | Copiar el recuento y el mini-gráfico |
| **Superpower** | Activa. 199 $ al año [R] | Maniquí 3D con lista de sistemas y nota en letra, barra de tres segmentos, objetivos «1 de 3», tienda con «Recomendado porque» [V] | Copiar «Recomendado porque». Evitar que el plan acabe siempre en la tienda |
| **Levels** | Activa. Cambió de modelo [R] | Puntuación de glucosa con un texto por banda [V] | Poco aplicable sin sensor |
| **Lumen** | Sin verificar | Nivel diario de 1 a 5 difícil de traducir en acción [R] | Evitar la cifra sin acción |
| **Zoe** | Viva y encogida. Ingresos de 66,1 a 34,1 M£; cuota de 24,99 a 9,99 £ [V] | Bandas sin rojo («no está prohibido»), contador «15 de 30 plantas esta semana» [V] | Copiar el lenguaje y el contador. Lección: el valor cae al aprender |
| **Neko Health** | En expansión [R] | Barra «Vigilar / Normal / Óptimo» y tarjetas con órgano ilustrado [V] | Modelo para ilustrar áreas |

### Hábitos, coaching y wearables

| App | Estado (nov 2026) | Qué enseña | Para EPI10 |
|---|---|---|---|
| **Oura** | Activa [V] | Puntuación con arco, etiqueta y titular humano. Factores que la componen. Informes semanal, mensual y de «aniversario» [V] | Copiar número + palabra + frase, y el informe que abre con una frase |
| **WHOOP** | Activa. Retiró su informe mensual en 2025 y los usuarios lo reclaman [V] | Semáforo literal con frase por color. Diario de sí o no en una página. Barras «ayuda / perjudica». Mes contra mes [V] | Copiar frases por color y el «antes → ahora» |
| **Apple Fitness** | Vigente | Tendencias: «Sigue así» y «Merece una mirada», con plazo para dar la vuelta a la flecha. Pausar anillos [V, captura de 2019] | El mejor modelo para cuando algo empeora |
| **Way of Life** | Activa. 4,8 de valoración [V] | Rejilla semanal verde y rojo con «Sí, No, Saltar» [V] | Copiar tal cual |
| **Streaks** | Activa [V] | Pocos hábitos por diseño. Objetivos «3 veces por semana». Recordatorio solo si falta [V] | Copiar el objetivo semanal |
| **Daylio** | Activa [V] | Check-in de cinco caras en dos toques. Calendario de puntos de color [V] | Adaptar a pulsadores sobrios |
| **Fabulous** | Activa, en declive [R] | Empieza con un solo hábito. Onboarding largo y quejas de cobros [R] | Copiar el arranque con uno. Evitar el resto |
| **Noom** | Activa. Gira a GLP-1 [R] | Quiz de hasta 113 pantallas con «por qué te lo preguntamos», interludios y cargador [V]. Pagó 62 M$ por suscripciones difíciles de cancelar [V] | Copiar la mecánica del quiz. Evitar longitud, precio oculto y urgencia |
| **Habitica, Finch** | Activas | Juego de rol y mascota [V/R] | Evitar: infantiliza a este público [I] |
| **Welltory, Lumen, Withings** | Sin pantallas vistas | — | Sin conclusiones |

### Suplementación personalizada y recompra

| App | Estado (nov 2026) | Qué enseña | Para EPI10 |
|---|---|---|---|
| **Care/of** | **Cerrada** en julio de 2024. Bayer retiró la financiación [V] | Quiz de una pregunta por pantalla, resultado «Hecho para Sarah», tarjeta «nos dijiste / te recomendamos», ficha de evidencia honesta [V] | La referencia de quiz y de tarjeta. Su cierre recuerda que el quiz no sostiene el negocio |
| **Persona Nutrition** | Activa [V] | Cruza cada recomendación con interacciones de medicamentos y bloquea lo que no encaja. Reevaluación cada 3 a 6 meses [V] | Precedente de «esto no es para ti» |
| **Viome Precision Supplements** | Activa. 119 $ al mes [V] | «Cada ingrediente se conecta con tus puntuaciones». Retest que actualiza la fórmula [V] | Copiar la frase. Evitar la opacidad que le critican |
| **Bioniq** | En integración con Herbalife [V] | GO: 29 preguntas y fórmula cerrada que no se puede ajustar [V/R] | Evitar la fórmula que no cambia |
| **Ritual** | Activa [V] | Tarjeta «próximo envío» con tres fechas. Posponer antes de cancelar. Encuesta de motivos de baja [V] | Copiar la tarjeta. Evitar el descuento creciente al irse |
| **Hims & Hers** | Demandada por la FTC en julio de 2026 [V] | Baja escondida tras «añadir o quitar artículos» [V] | Contraejemplo |
| **9amHealth, Ro** | Activas [V] | Revisión corta antes de cada reposición [V] | El patrón clave de la recompra |
| **Thorne (Taia)** | Activa. Chat de IA desde enero de 2026 [V] | Asistente con «IA» en el nombre, opciones pulsables y límites claros [V] | Copiar el aviso y las opciones |
| **Baze, Rootine, Arivale** | Baze y Rootine sin confirmar; Arivale cerró en 2019 [R] | — | Confirman la fragilidad del modelo |

---

## 3. Catálogo de patrones (25)

Ordenado por momento. Cada patrón: qué es, quién lo usa, por qué funciona y cómo lo aplicaríamos.

### A · Cuestionario conversacional que acaba en resultado (el chatbot de la web)

**1. Pregunta ligera: una por pantalla, con su porqué y un contador honesto** · COPIAR

- **Qué es.** Una pregunta por pantalla. Respuestas grandes que se pulsan y avanzan solas. En las preguntas delicadas, una línea encima que dice por qué se pregunta. Un contador que dice cuánto queda y qué te llevas al final.
- **Quién.** Care/of (círculos «Sí / No», enlace «Por qué lo preguntamos», contador «20 de 63»). Noom («Las hormonas influyen en cómo metabolizamos» encima de la pregunta del sexo). HUM («13 de 13» junto a la lista de lo que se gana) [V].
- **Por qué funciona.** El porqué evita la sensación de «me están sacando datos» [V, teardown de RevenueCat]. Un proveedor de quizzes da la mejor conversión a los de 9 a 12 preguntas (11,0 %); es dato de parte, sin muestra publicada [V].
- **EPI10.** Burbuja de pregunta y de dos a cinco tarjetas pulsables. Sin teclado salvo edad y nombre. El porqué solo en medicación, embarazo, enfermedad y peso. Contador «Pregunta 4 de 12» con el recordatorio «al final, tus 3 semáforos».
- **Capturas:** `m1_careof_por-que-preguntamos.jpg`, `m1_noom_porque-y-aviso-embarazo.png`, `m1_hum_progreso-y-puerta-correo.jpg`.
- **Fuentes:** https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel · http://www.dtcpatterns.com/dtc-patterns-articles/this-care-of-quiz-helps-you-skip-the-confusion-in-the-vitamin-aisle · https://www.convertflow.com/blog/how-to-fix-ecommerce-quiz-funnel-drop-off-in-2026

**2. Preguntas de seguridad que cambian el resultado** · ADAPTAR

- **Qué es.** Embarazo, medicación y enfermedad se preguntan pronto. La respuesta cambia lo que se recomienda.
- **Quién.** Noom enseña un aviso y pide aceptar un descargo; el teardown lo critica por fácil de saltar [V]. Persona cruza cada recomendación con una base de interacciones con medicamentos, ajusta sola y ofrece farmacéuticos gratis [V].
- **Por qué funciona.** Persona convierte la pregunta de medicación en argumento de confianza, no en trámite [I].
- **EPI10.** Se aplican tal cual las reglas de seguridad del cuestionario multifórmula de Aitor. El patrón solo dice cómo enseñarlo: si salta una bandera, el resultado muestra los semáforos de hábitos, no sugiere fórmula y ofrece hablar con el profesional. Mejor que un descargo.
- **Fuentes:** https://www.personanutrition.com/start/ · https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel

**3. Asistente guiado: dice lo que es y ofrece opciones, no una caja vacía** · COPIAR

- **Qué es.** El asistente se presenta como IA desde el nombre. Bajo el chat hay opciones pulsables. Declara lo que no hace.
- **Quién.** Thorne «Taia» («no diagnostica ni sustituye la atención médica»). Function lo deja en sus términos legales [V].
- **Por qué funciona.** La queja principal que reconoce Thorne es que la gente no sabe qué pedirle a un chat abierto [V]. Las opciones lo resuelven.
- **EPI10.** Confirma la decisión de la estrategia: chat guiado por reglas, sin texto libre. Primera burbuja, en una línea: qué es, qué no hace y quién firma el informe. La redacción legal la valida el asesor. No hemos leído el texto oficial del artículo 50 del Reglamento de IA [R].
- **Fuentes:** https://www.thorne.com/featured/taia · https://www.glossy.co/beauty/wellness/how-thorne-is-leveraging-an-ai-powered-wellness-advisor-chatbot-in-the-chatgpt-era/ · https://www.functionhealth.com/legal/supplemental-chat-terms

**4. Resultado en tres capas: tu nombre → «nos dijiste / te sugerimos» → evidencia** · COPIAR

- **Qué es.** Primera pantalla: «Hecho para Sarah» y sus objetivos devueltos en negrita. Después, un carrusel de tarjetas: «Nos dijiste que te cuesta dormir → Te recomendamos magnesio». Cada tarjeta abre una ficha con la evidencia.
- **Quién.** Care/of [V].
- **Por qué funciona.** Cada recomendación se ve nacer de una respuesta propia. Un proveedor da mejor conversión a los resultados con uno a tres productos (10,6 %) que a los de once o más (7,1 %); dato de parte [V].
- **EPI10.** «Tu punto de partida, Marta» con los tres semáforos. Una tarjeta por semáforo: «Nos dijiste que… → Te sugerimos…». Al final, la fórmula sugerida con su porqué. Es el antepasado directo del «porqué» de Mi plan. Si un semáforo sale verde, no se sugiere producto: «aquí no necesitas nada».
- **Capturas:** `m1_careof_resultado.jpg`, `m1_careof_ficha-ingrediente.jpg`.
- **Fuente:** http://www.dtcpatterns.com/dtc-patterns-articles/this-care-of-quiz-helps-you-skip-the-confusion-in-the-vitamin-aisle

**5. Primero el resultado, después el correo** · ADAPTAR (hipótesis que hay que medir)

- **Qué es.** Tres escuelas. Noom pide el correo a un tercio del quiz, antes del gráfico. HUM pone un muro con contraseña justo antes del resultado. Care/of lo pedía al principio [V].
- **Por qué importa.** El único dato disponible es de un proveedor: el muro antes del resultado capta más correos pero pierde entre el 30 y el 50 % de quienes terminan [V]. No hay estudio independiente.
- **EPI10.** Enseñar los tres semáforos sin muro. Pedir el correo después, con un motivo concreto: «guárdalo y te avisamos de tu revisión». La métrica de EPI10 es la segunda compra, no el número de correos [I]. Conviene probar las dos variantes.
- **Captura:** `m1_hum_progreso-y-puerta-correo.jpg` (el contraejemplo).
- **Fuentes:** https://www.dtcpatterns.com/dtc-patterns-articles/hum-nutrition-provides-a-personal-health-coach-through-their-quiz · https://tryinteract.com/blog/quiz-conversion-rate-report/

### B · Resultado complejo convertido en pocas prioridades (el informe)

**6. Portada-resumen con recuento por estado** · COPIAR

- **Qué es.** Antes de cualquier detalle, un recuento: cuántas cosas están bien y cuántas piden atención. Y una sola llamada a la acción.
- **Quién.** Function («130 biomarcadores»: 89 / 19 / 22 con tres bloques proporcionales). Superpower (barra de tres segmentos: 87 óptimos, 36 normales, 6 fuera de rango). Neko (barra «Vigilar / Normal / Óptimo»). GlycanAge («34 frente a 41» y «tu plan está listo») [V].
- **Por qué funciona.** El primer mensaje es que casi todo está bien. Baja la alarma antes de enseñar lo que no [I]. En TellmeGen hay que leer 59 filas para descubrir cuáles se salen de «medio» [V].
- **EPI10.** Portada del informe y de Mi plan: «De 5 áreas: 2 en marcha, 2 a mejorar, 1 prioridad». En la parte genética: «De N rasgos analizados, X merecen tu atención».
- **Capturas:** `m3_function_panel-resumen.jpg`, `m3_superpower_gemelo-digital.png`, `m2_neko_resultados_por_organo.jpg`, `m2_tellmegen_lista_riesgo.png` (contraejemplo).
- **Fuentes:** https://healnourishgrow.com/function-health-review/ · https://wellworthy.com/2026/05/05/my-honest-review-of-superpowers-100-biomarker-blood-test/ · https://www.tellmegen.com/ (demo Advanced)

**7. Semáforo con palabra y frase de acción** · ADAPTAR

- **Qué es.** El color nunca va solo. Lleva una palabra y una frase que dice qué hacer.
- **Quién.** WHOOP: verde «estás recuperado y listo para rendir»; amarillo «tu cuerpo se mantiene»; rojo «probablemente tu cuerpo necesita descanso» [V]. Oura: arco, «88», «Óptimo» y el titular «A por ello» [V]. Viome y Neko nombran la acción: «Mantener / Mejorar», «Vigilar / Normal / Óptimo» [V].
- **Detalle.** Casi nadie usa rojo puro. Superpower usa rosa, Function terracota, Zoe se queda en ámbar con «no está prohibido» [V]. Function añade un gris «Otros» para lo que no tiene juicio claro [V].
- **Por qué funciona.** El texto interpreta. El color es redundante, y eso lo hace accesible [I].
- **EPI10.** Tres estados con nombre de acción: **En marcha** (verde), **A mejorar** (ámbar), **Prioridad** (rojo apagado). Un cuarto gris: **Sin datos todavía**. Tres frases fijas, una por color, redactadas como necesidad y no como nota. Los colores de semáforo son solo para estados, como pide la marca.
- **Capturas:** `m3_oura_readiness-card.png`, `m2_viome_health_zones.jpg`.
- **Fuentes:** https://developer.whoop.com/docs/whoop-101 · https://support.ouraring.com/hc/en-us/articles/360025589793-Readiness-Score · https://help.joinzoe.com/en/articles/11093062-food-score-colours-explained-new-zoe-app

**8. Las áreas con sus factores: la rueda, siempre con lista** · ADAPTAR

- **Qué es.** Bajo la puntuación, los factores que la componen, cada uno con su barra y su palabra.
- **Quién.** Oura («contributors»: el factor que falla sale en rojo con «presta atención»). Viome (seis zonas con puntuación). Superpower (lista de sistemas con nota A o B). InsideTracker (anillos por categoría) [V].
- **Hallazgo.** Nadie de la muestra usa una rueda o un radar. Todos usan listas [V]. Un medidor circular ocupa mucho y no se alinea para comparar [I].
- **Por qué funciona.** Convierte «tienes un 62» en «te falta sueño».
- **EPI10.** La rueda de cinco áreas es la firma visual del informe y del portal. Pero cada sector debe poder tocarse, y al lado o debajo va la lista de las cinco áreas con su estado en palabras. Bajo cada área, dos o tres factores con barra.
- **Fuentes:** https://ouraring.com/blog/readiness-score/ · App Store, ficha de Viome (id 1206984146)

**9. Barra segmentada con marcador, y el marcador anterior en gris** · ADAPTAR

- **Qué es.** Una barra horizontal partida en tramos de color, con un globo que marca tu valor. Admite un segundo marcador en el mismo eje.
- **Quién.** GlycanAge (edad biológica y cinco índices, con la edad cronológica como segundo marcador). InsideTracker (barra vertical con «tu zona óptima»). Superpower (banda óptima con los puntos de cada analítica) [V].
- **Por qué funciona.** Se lee sin leyenda, cabe en una fila y sirve igual en pantalla y en papel. Se ve la distancia al objetivo, no solo el estado [I].
- **EPI10.** Para el detalle de cada área del cuestionario, con el marcador de la revisión anterior en gris. No usarla en genética: un genotipo no se mueve.
- **Capturas:** `m2_glycanage_edad_biologica.png`, `m2_glycanage_indices_percentil.png`, `m3_insidetracker_vitamina-d-zona-y-recomendaciones.jpg`, `m3_superpower_biomarcadores.jpg`.
- **Fuente:** https://glycanage.com/personal-report-female.pdf

**10. «Lo que traes» y «lo que haces»: genética frente a hábitos** · ADAPTAR (diferencial)

- **Qué es.** Un dibujo que separa lo que viene de los genes de lo que depende del estilo de vida.
- **Quién.** 23andMe Premium: tres curvas de probabilidad de diabetes tipo 2 con la edad (estilo de vida sano 10 %, el tuyo 12 %, poco sano 15 %). Es el único que dibuja cuánto mueven los hábitos [V]. TellmeGen tiene un buen dibujo de dos píldoras y un ejemplo excelente (riesgo genético alto de cáncer de pulmón y no fuma, frente a riesgo bajo y fuma), pero enterrados en un manual PDF de 32 páginas [V]. InsideTracker usa barras «perjudica / ayuda» para los hábitos [V].
- **Por qué funciona.** Responde al miedo de fondo: «¿está todo decidido?». No.
- **EPI10.** EPI10 tiene las dos fuentes: test y cuestionario. Cada área de la rueda lleva dos marcas. «Lo que traes»: fija, en gris, viene del ADN. «Lo que haces»: el semáforo, que cambia con cada revisión. Ningún competidor de la muestra junta los dos datos así [I]. Sin curvas de probabilidad: EPI10 no tiene riesgo absoluto con fuente.
- **Capturas:** `m2_23andme_plan_accion_curvas.jpg`, `m2_tellmegen_manual_genes_vs_factores.png`.
- **Fuentes:** https://app.tellmegen.com/files/manual-interpretacion-esp.pdf · App Store, ficha de 23andMe (id 952516687)

**11. Foco único, «empieza por aquí» y ritmo** · COPIAR

- **Qué es.** Entre varias prioridades, una va marcada como la primera. El usuario elige cuánto abarca.
- **Quién.** Viome (sello «Empieza aquí» y selector de un solo foco). GlycanAge («foco primario / foco secundario»). Superpower («Objetivo 1 de 3»). InsideTracker («centrado» añade una acción; «a por todas», hasta cinco; la lista completa queda tras «editar plan») [V]. Fabulous empieza con un solo hábito y abre el siguiente al cumplir [R].
- **Por qué funciona.** InsideTracker asocia crear el plan con más mejora (más de 20.000 usuarios; observacional y de la propia empresa) [V]. No hay ensayo que compare uno a tres hábitos frente a más: la evidencia es indirecta [V].
- **EPI10.** Las tres prioridades, con una marcada «Empieza por aquí». Una pregunta al activar el plan: «¿Una cosa o hasta cinco?». Activar uno o dos hábitos el primer mes y sumar el resto tras la primera revisión.
- **Capturas:** `m2_viome_health_zones.jpg`, `m2_glycanage_plan_accion.png`.
- **Fuentes:** https://info.insidetracker.com/hubfs/Step%20by%20step%20instructions%20for%20creating%20an%20action%20plan.pdf · https://insider.fitt.co/?p=24932

**12. Resultados sensibles por capas, con «sí, quiero verlo»** · ADAPTAR

- **Qué es.** Lo que puede angustiar no se enseña por defecto.
- **Quién.** 23andMe, en tres capas: eliges incluir o no los informes de salud; cuatro informes (Alzheimer, Parkinson, BRCA, MUTYH) piden una elección adicional, con aviso sobre ansiedad; se puede cambiar después [V]. TellmeGen hace lo contrario: todo visible salvo que lo bloquees antes, y la farmacogenética se abre sin pantalla previa [V].
- **Por qué funciona.** La decisión de saber queda en manos de la persona [I].
- **EPI10.** Mantener el control granular que ya pide la estrategia, con el modelo de 23andMe: farmacogenética y vulnerabilidades cerradas por defecto, con una pantalla de aviso y la invitación a verlo en la sesión. El resumen visual y Mi plan solo enseñan lo accionable.
- **Capturas:** `m2_23andme_informe_alzheimer_muestra.jpg`, `m2_tellmegen_farmacogenetica.png`, `m2_tellmegen_manual_bloqueo_items.png`.
- **Fuente:** https://support.23andme.org/hc/en-150/articles/42962348280983-Getting-Started-With-Your-Health-Predisposition-Reports

**13. PDF con el resumen delante y la ciencia detrás** · COPIAR

- **Qué es.** El PDF no es un volcado de la pantalla. Es un documento propio: resumen ejecutivo, plan, detalle y anexo científico.
- **Quién.** GlycanAge: 38 páginas apaisadas, índice clicable, páginas a dos columnas (el dato a la izquierda, «qué indica» a la derecha) y versión del informe [V]. Contraejemplos: 24Genetics (54 páginas, unos 50 deslizadores en el resumen) y TellmeGen (el PDF exporta lo mismo que la pantalla) [V].
- **Por qué funciona.** El PDF sirve para llevarlo al médico, para guardarlo y para sentir que se ha recibido algo [I]. Y es una garantía: 23andMe quebró y Atlas Biomed desapareció con los datos de sus clientes [R].
- **EPI10.** Orden: rueda y tres prioridades → plan → detalle por área → perfil completo y método. Coincide con las dos capas que propone la estrategia.
- **Capturas:** `m2_glycanage_plan_accion.png`, `m2_24genetics_resumen_semaforo.png`.
- **Fuentes:** https://glycanage.com/personal-report-female.pdf · https://24genetics.com/docs/24G_XY_EN_Nutrition.pdf

**14. El cuerpo humano como ilustración, no como menú** · ADAPTAR (después de la v1)

- **Qué es.** Una figura humana asociada a los resultados.
- **Quién.** SelfDecode: silueta con puntos de color como selector, con pestaña «lista» al lado [V]. Superpower: maniquí 3D gris y neutro con un halo de color; la navegación real es la lista de sistemas [V]. Neko: órganos en 3D como ilustración de cada tarjeta [V]. Function, Prenuvo e InsideTracker no usan cuerpo [V].
- **Por qué funciona, y por qué no.** Aporta identidad y calidez. Como navegación aporta poco: SelfDecode necesita la lista [I]. Funciona cuando el dato es físico y local, como la piel o el corazón. «Estrés y energía» o «complementación» no tienen sitio en el cuerpo [I]. Hay quejas del avatar realista de Neko; no pudimos abrir la fuente [R].
- **EPI10.** Para atender la petición del cliente sin cuerpo interactivo: una ilustración propia por área, en la cabecera de cada área y en el PDF. Si se hace figura, maniquí neutro y nunca parecido al usuario. Coincide con la estrategia: después de la v1.
- **Capturas:** `m2_selfdecode_cuerpo_e_iconos_personas.jpg`, `m2_superpower_home_figura_cuerpo.jpg`, `m3_superpower_gemelo-digital.png`, `m2_neko_resultados_por_organo.jpg`.

### C · Plan de pocos hábitos con seguimiento semanal

**15. Rejilla semanal: una fila por hábito, siete celdas** · COPIAR

- **Qué es.** Arriba, la semana de lunes a domingo. Cada hábito es una fila con siete celdas: verde, rojo o gris. Al tocar una celda sale una bandeja con «Borrar, Sí, No, Saltar».
- **Quién.** Way of Life [V]. WHOOP usa una variante: preguntas de sí o no en una sola página [V].
- **Por qué funciona.** Se lee la semana entera de un vistazo. Dos toques. La reseña más destacada la prefiere porque «las demás apps me dan ansiedad» [V]. 4,8 de valoración tras 16 años [V].
- **EPI10.** Es el «semáforo de hábitos» hecho pantalla. Con tres a cinco hábitos cabe en un móvil sin desplazarse. Encaja con el uso semanal: se pueden rellenar los siete días de golpe el domingo. «Saltar» no penaliza.
- **Capturas:** `m4_wayoflife_rejilla_verde_rojo.png`, `m4_wayoflife_cadenas.png`, `m4_whoop_journal_preguntas.png`.
- **Fuente:** https://apps.apple.com/us/app/way-of-life-habit-tracker/id393159800

**16. «5 de 7» y porcentaje del mes, no racha de días. Y pausa** · COPIAR

- **Qué es.** El progreso se cuenta como proporción, no como días seguidos. Hay salidas dignas: saltar un día o pausar el plan.
- **Quién.** Daylio («73 % de cumplimiento» junto a la racha). Streaks (objetivos «3 veces por semana»). Way of Life (barras de porcentaje por mes). Zoe («15 de 30 plantas esta semana»). Apple (pausar los anillos sin romper la racha, desde iOS 18) [V].
- **Por qué funciona.** Un fallo baja un poco el porcentaje; no lo pone a cero. Un estudio de UCL encontró que fallar una ocasión no afecta de forma significativa al hábito [V]. En Finch, una racha de 234 días volvió a cero por dos días sin entrar [V]. Duolingo admite que perder la racha desmotiva [V].
- **EPI10.** Texto «5 de 7 días esta semana» y «tu mes: 78 %». Sin contador de días seguidos. Botón «Pausar mi plan» para viajes o enfermedad, de modo que la revisión no pinte un rojo injusto.
- **Capturas:** `m4_daylio_objetivo_semana.png`, `m4_wayoflife_graficas_tendencia.png`, `m3_zoe_app-2025-pantallas.jpg`.
- **Fuentes:** https://mobbin.com/blog/streaks-are-about-losing-a-study-of-859-streak-designs · https://blog.duolingo.com/how-duolingo-streak-builds-habit · https://appbot.co/blog/finch-app-reviews-emotional-attachment-user-retention-product-loyalty/

### D · Revisión periódica

**17. Check-in de cinco o seis pulsadores con palabra** · ADAPTAR

- **Qué es.** Una escala de cinco con icono, color y etiqueta de texto. Un toque por pregunta.
- **Quién.** Daylio (cinco caras con color y palabra; «dos toques») [V]. WHOOP (sí o no) [V]. Calm (emoji tras la sesión) [V].
- **Por qué funciona.** En Calm, usar el check-in se asocia a más uso la semana siguiente, sobre todo en usuarios inactivos (2.600 suscriptores). El efecto no dura más de una semana [V].
- **EPI10.** Una pregunta por área de la rueda. Pulsadores sobrios de 1 a 5 con palabra («muy mal… muy bien») en lugar de caras. Siempre con texto: el color solo no es accesible. Nadie publica cuánto tarda su check-in; los «dos minutos» son objetivo nuestro [I].
- **Capturas:** `m4_daylio_checkin_animo_caras.png`, `m4_whoop_journal_preguntas.png`.
- **Fuentes:** https://daylio.net/ · https://mhealth.jmir.org/2021/4/e27106/

**18. El cierre: «antes → ahora», «Sigue así / Merece una mirada» y un objetivo** · COPIAR

- **Qué es.** Justo al terminar, el titular es el cambio, no el valor. Lo que mejora y lo que baja van en bloques separados. Lo que baja lleva una acción y un plazo.
- **Quién.** WHOOP: dos barras, abril y mayo, con el cambio rotulado en grande («+2 %») [V]. Apple Tendencias: «Sigue así» y «Merece una mirada»; para la flecha que baja escribe una acción con cifra y «en unas 11 semanas deberías darle la vuelta, Jason» [V, pantalla de 2019]. WeightWatchers: dato → reflexión → informe → un objetivo para la semana siguiente [V].
- **Por qué funciona.** Nombra lo malo con neutralidad, da una acción concreta y pone un plazo realista.
- **EPI10.** Al acabar la revisión: una tarjeta por área con «antes → ahora» y el semáforo que cambia. Dos bloques: «Sigue así» y «Merece una mirada». Nunca «has empeorado». Para lo que baja, dos salidas: «Ajustar mi plan» y «Hablar con mi profesional». Cierre: «¿En qué te centras este mes?». La primera revisión se compara con el cuestionario inicial, para que no quede vacía.
- **Capturas:** `m4_whoop_mpa_sueno_mes_vs_mes.png`, `m3_apple_trends.jpg`.
- **Fuentes:** https://www.macworld.com/article/3429077/ios-13-and-apple-watch-activity-trends-give-you-the-big-picture.html · https://www.weightwatchers.com/uk/blog/benefits-of-weighing-in-app-card

**19. La evolución en puntos de color** · COPIAR

- **Qué es.** Un mini-gráfico sin ejes junto a cada elemento: de dos a cuatro puntos, cada uno con el color de su estado.
- **Quién.** Function (junto a cada biomarcador) [V]. A escala de año: Daylio («el año en píxeles») y WHOOP (calendarios de calor) [V].
- **Por qué funciona.** Con pocas mediciones no hace falta eje. El color ya cuenta la historia.
- **EPI10.** Una tira por área: un punto de semáforo por revisión, hasta doce. Cinco filas por doce meses resumen el año en una tarjeta. Sirve en Mi plan, en el informe de revisión y en el back office.
- **Capturas:** `m3_function_nutrientes-tendencia.jpg`, `m4_daylio_year_in_pixels.png`, `m4_whoop_mpa_heatmaps_anuales.png`.
- **Fuente:** https://healnourishgrow.com/function-health-review/

**20. El resumen que sale a buscarte y abre con una frase** · ADAPTAR

- **Qué es.** Un informe periódico: una frase, un gráfico y una explicación. Queda archivado.
- **Quién.** Oura: semanal, mensual, trimestral, anual y de «aniversario» cada seis meses (lo que más mejoró) [V]. WHOOP retiró su informe mensual en 2025 y los usuarios lo siguen reclamando [V].
- **Por qué importa.** Ninguno lo manda por correo: sus usuarios abren la app a diario [V]. EPI10 no tendrá uso diario. La retención a día 30 en apps de salud ronda el 3,9 % en iOS [V].
- **EPI10.** El resumen tiene que salir: correo, o WhatsApp si el cliente lo usa, con la frase-resumen y un enlace. Recordatorio solo a quien aún no ha rellenado, como hace Streaks [V]. A los 90 días, un resumen de «lo que más mejoró», que coincide con la ventana de la segunda compra. No hay datos fiables de qué canal funciona mejor; hay que medirlo.
- **Captura:** `m3_oura_informe-semanal.jpg`.
- **Fuentes:** https://support.ouraring.com/hc/en-us/articles/360046061373 · https://www.community.whoop.com/t/mpa-monthly-performance-assessment-update-july-2025/4821.md · https://www.braze.com/resources/articles/mobile-app-retention

**21. La revisión llega antes de que se acabe el bote** · ADAPTAR (el patrón clave)

- **Qué es.** Antes de reponer, el usuario contesta una encuesta corta. Aparece como tarea en la pantalla de inicio unos días antes.
- **Quién.** 9amHealth: el «check-in de reposición» se abre 13 días antes [V]. Ro: revisión mensual con el profesional [V]. Viome, Bioniq y Persona atan la fórmula a un reanálisis cada 3 a 12 meses [V/R].
- **Por qué funciona.** La revisión tiene fecha y motivo. Y el momento importa: quien se da de baja de una suscripción mensual de suplementos lo hace, de media, hacia el día 77 [V, Recharge].
- **EPI10.** Lanzar la revisión unos diez días antes de que se acabe el bote. Resultado: «Tu suplementación del mes que viene: mantener X, dejar Y». Ahí va el botón de recompra. La segunda revisión, antes del día 60. No se copia el bloqueo: en una clínica es obligación médica; en EPI10 es invitación.
- **Fuentes:** https://join9am.com/blog/how-to-ensure-a-smooth-prescription-renewal-bny · https://getrecharge.com/?p=27176

### E · Suplementación recomendada con recompra

**22. La tarjeta de fórmula: estado, porqué, dato y evidencia** · COPIAR

- **Qué es.** Cada producto recomendado explica por qué es para ti y con qué respaldo.
- **Quién.**
  - Care/of: etiqueta de evidencia en texto («Buena investigación», «Uso tradicional») y, por beneficio, número de estudios, años y «doble ciego con placebo: sí o no» [V].
  - InsideTracker: acción con cantidad, una línea de porqué, estrellas de evidencia de 1 a 5 y «consulta a tu médico» dentro de la tarjeta [V].
  - Superpower: etiqueta «Recomendado porque», el motivo en negrita y chips con los marcadores que lo justifican [V].
  - Viome: «Cada ingrediente se conecta con tus puntuaciones» [V].
- **Por qué funciona.** Convierte «respaldado por la ciencia» en algo contable. Admitir un «no» da crédito al «sí». Cuando falta el porqué, los usuarios lo reclaman: a Viome le critican la opacidad [R].
- **EPI10.** Estado (tomar, mantener, dejar) + «Te lo recomendamos porque dijiste… / porque tu test indica…» + chips con el dato + nivel de evidencia en texto, no en color, para no chocar con los semáforos + cómo tomarlo + cuándo valorar si funciona. El botón dice «Ver» antes que «Comprar». Si no hay dato que lo justifique, no se recomienda. Pie con las advertencias legales de complementos.
- **Capturas:** `m1_careof_ficha-ingrediente.jpg`, `m3_insidetracker_vitamina-d-zona-y-recomendaciones.jpg`, `m3_superpower_marketplace.jpg`.
- **Fuentes:** https://web.archive.org/web/20220124061018/https://www.takecareof.com/products/ashwagandha · https://blog.insidetracker.com/star-rating-system · https://www.viome.com/products/precision-supplements

**23. «Dejar» y «no lo vendemos»: los dos estados que nadie enseña** · COPIAR (diferencial)

- **Qué es.** Decir lo que sobra y recomendar lo que no se vende.
- **Quién.** No encontramos a nadie que diga «deja de tomar X» de forma destacada. Lo más cercano: Persona bloquea un suplemento si interacciona con tu medicación, y un nutricionista explica por qué [V]. InsideTracker recomienda sin vender, según terceros [R]. Function compró SuppCo, que analiza lo que ya tomas y presume de no ganar con la venta [R].
- **Por qué funciona.** La independencia es el argumento de confianza. Es lo que protege la regla de marca «recomendamos también lo que no vendemos».
- **EPI10.** «Tu complementación hoy»: lo que ya tomas, marcado como mantener, ajustar o dejar, con el motivo en una línea. Para lo que EPI10 no vende, la misma tarjeta con «No lo vendemos. Búscalo así: forma y dosis orientativa». Sin enlaces de afiliado.
- **Fuentes:** https://www.personanutrition.com/Frequently-Asked-Questions · https://nutraingredients.com/Article/2026/06/15/function-acquires-suppco-to-connect-supplement-recommendations-with-health-data

**24. «Próximo envío» con tres fechas, y aviso antes de cobrar** · COPIAR

- **Qué es.** Una tarjeta que responde a tres preguntas: cuándo me cobran, cuándo sale y cuándo llega. Con un solo botón: cambiar fecha. Y un correo de aviso unos días antes.
- **Quién.** Ritual («Llega antes del 11 feb · Se cobra el 3 · Sale el 6», botón «Cambiar fecha de entrega») [V]. Care/of avisaba por correo antes de cada envío [V].
- **Por qué importa.** En España, la Ley 10/2025 obliga a avisar al menos 15 días antes de cobrar una renovación y a facilitar la baja; lo hemos leído en la nota del Ministerio, no en el BOE [V].
- **EPI10.** En Mi plan, bajo la suplementación: «Te quedan unos 7 días · Próximo cobro 3 dic · Llega antes del 8 dic · Cambiar fecha». Aviso a 15 días y recordatorio a 3 o 5, los dos con «cambiar, saltar o ajustar» en un toque. Si la v1 arranca con recompra manual, como sugiere la estrategia, la tarjeta queda en «Te quedan unos 7 días · Pedir de nuevo».
- **Capturas:** `m5_ritual_panel-cuenta.jpg`, `m5_ritual_correo-pedido-actualizado.jpg`.
- **Fuentes:** http://www.dtcpatterns.com/dtc-patterns-articles/get-better-gut-health-daily-with-rituals-subscription-program · https://www.dsca.gob.es/consumo/novedades/nota-informativa-nueva-regulacion-suscripciones-ley-servicios-atencion-clientela

**25. «Ajustar mi plan» antes que la baja, con la baja a la vista** · ADAPTAR

- **Qué es.** Al ir a cancelar, primero se ofrecen alternativas. La baja sigue visible, con su nombre.
- **Quién.** Ritual: «Posponer mi pedido» encima de «Continuar con la baja», y una encuesta «¿Qué ha fallado?» con siete motivos [V].
- **Por qué funciona.** En la pantalla de cancelación vuelve a comprar el 66 % de quien cambia de producto, el 53 % de quien retrasa, el 49 % con descuento, el 44 % de quien salta y menos del 2 % de quien cancela [V, Recharge]. Los motivos del formulario de Ritual son la taxonomía del sector: «no noto los beneficios», «se me acumulan», «solo quería un mes», «ya no encaja con mis necesidades» [V].
- **EPI10.** Cuatro opciones del mismo peso: cambiar de fórmula, espaciar, saltar un envío y darme de baja. Cada motivo lleva a una respuesta útil, no a un descuento: «no noto nada» → enseñar la evolución y ofrecer revisión; «se me acumula» → espaciar; «ya no lo necesito» → pasar a «dejar» y celebrarlo.
- **Qué no copiar.** El descuento que crece al irse (25 % y luego 40 % en Ritual) [V]: enseña a darse de baja para pagar menos y choca con «nada de venta agresiva» [I].
- **Capturas:** `m5_ritual_posponer-antes-de-baja.jpg`, `m5_ritual_baja-motivos-y-oferta.jpg`, `m5_ritual_correo-baja-40-descuento.jpg` (lo que evitar).
- **Fuente:** https://getrecharge.com/?p=27176

---

## 4. Qué evitar

### En el chatbot y la entrada

| Qué | Quién lo hace | Por qué evitarlo |
|---|---|---|
| Quiz eterno con el precio al final | Noom: hasta 113 pantallas [V] | Es la queja más repetida. Decir 399 € y el precio de la fórmula antes o en el resultado |
| Urgencia fabricada: cuenta atrás | Noom, HUM [V] | Choca con la marca |
| Cesta prellenada y casilla premarcada | HUM [V] | Venta agresiva. El consentimiento premarcado no vale en la UE [I] |
| Recomendar producto aunque el resultado salga bien | Noom [V] | En verde: «aquí no necesitas nada» |
| Preguntar algo y no usarlo | Noom [V] | Cada pregunta debe verse en un semáforo o en la fórmula |
| Proyección numérica que siempre mejora | Noom [V] | EPI10 no promete curvas ni resultados |
| Cobrar al enviar el cuestionario | Hims & Hers (demanda de la FTC) [V] | Riesgo legal y de confianza |
| Arquetipo simpático tipo horóscopo | Noom («Peak Performer») [V] | Resta seriedad a un servicio de 399 € [I] |

### En el informe

| Qué | Quién lo hace | Por qué evitarlo |
|---|---|---|
| **Edad biológica** | GlycanAge, InsideTracker, Function, Superpower, Elysium [V] | Casi 15 años de diferencia con la misma muestra (Kaeberlein, 2026) [V]. A una usuaria le subió cinco años por un catarro [V]. Y el test de EPI10 es genético: no puede calcularla |
| Puntuación global única | Superpower («86/100»), Muhdo («106») [V] | Volátil, opaca y roza el diagnóstico. Mejor «2 de 5 áreas en marcha» |
| Lista plana sin resumen | TellmeGen, 24Genetics [V] | Nadie sabe por dónde empezar |
| Jerga en primer plano (loci, SNP, PRS) | TellmeGen [V] | Va en la capa técnica |
| Percentil frente a «nuestros usuarios» y campana de Gauss | TellmeGen [V] | «Más riesgo que el 94 %» sobre una etiqueta «ligeramente alto» alarma sin informar |
| Iconos de persona sin riesgo absoluto detrás | SelfDecode [V] | Parece decir «5 de cada 10 lo tendrán», y no es eso |
| Umbrales «óptimos» inventados | Function, Superpower [V] | Crean falsos problemas. Explicar de dónde sale cada semáforo |
| Palabras que juzgan («desfavorable», «subóptimo») | 24Genetics, GlycanAge [V] | Mejor palabras que orientan |
| Farmacogenética a la vista sin pantalla previa | TellmeGen [V] | Capas con consentimiento |
| Tienda pegada al resultado | Muhdo [V] | El producto va dentro de la prioridad que lo justifica |

### En el plan y la revisión

| Qué | Quién lo hace | Por qué evitarlo |
|---|---|---|
| Rachas de días que vuelven a cero | Finch, Duolingo [V] | Castigan el primer fallo |
| Mascotas, vidas y puntos | Finch, Habitica [V/R] | Infantiliza a este público [I] |
| Pedir registro diario | La mayoría | Retención a día 30 cercana al 3,9 % [V]. EPI10 se mide por revisiones completadas y segunda compra |
| Puntuar alimentos | Zoe [V] | Genera culpa. Además, las dietas están fuera de la v1 |
| Correlaciones con pocos datos | WHOOP y Bearable las hacen con sensores y registro diario [V] | EPI10 no tendrá datos para hacerlas bien en la v1 |
| Cifra sin acción | Lumen [R] | Cada semáforo lleva pegada una acción |
| Quitar un informe que la gente usa | WHOOP [V] | El histórico de revisiones es el producto |

### En la suplementación y la recompra

| Qué | Quién lo hace | Por qué evitarlo |
|---|---|---|
| Esconder la baja | Hims & Hers [V]; Noom pagó 62 M$ [V] | Demandas. En España, baja «sin impedimento alguno» [V] |
| Posponer que no se respeta | Reseñas de Ritual [R] | Destruye la confianza |
| Descuento creciente al irse | Ritual [V] | Enseña a darse de baja |
| Fórmula cerrada que no cambia con la revisión | Bioniq GO [R] | Quita sentido a la revisión |
| Que el plan desemboque siempre en la tienda | Superpower: «echa para atrás», según una reseña [V] | Mezclar en el plan acciones sin producto |
| Reseñas solo de cinco estrellas | Bioniq, que lo declara [V] | — |
| Cobrar una cuota por saber | Zoe: «el valor cae tras aprender» [V] | Lo recurrente debe ser lo que cambia: revisión y ajuste |

### Por qué se va la gente a los tres meses

- **La curva.** De cada 100 primeros pedidos de suplementos por suscripción, 75 llegan al segundo, 49 al tercero, 34 al cuarto y menos de 6 al decimotercero [V, Recharge, unas 1.750 marcas]. Coincide con la cifra de la estrategia.
- **El momento.** La baja media del suscriptor mensual llega hacia el día 77 [V]. La revisión del segundo mes es la última oportunidad real.
- **Los motivos.** «No noto nada», «se me acumulan», «son demasiadas pastillas», «es caro», «ya aprendí lo que necesitaba» y «solo quería probar un mes». Salen del formulario de baja de Ritual y de reseñas [V]. No existe un estudio con porcentajes por motivo.
- **Los cierres.** Care/of cerró porque Bayer dejó de financiarla; no se publicaron cifras de retención [V]. Zoe se sobredimensionó y sus clientes dejaron de pagar al aprender [V]. Arivale cerró en 2019 por el coste de captación y de los análisis [R].
- **Lo que EPI10 hace distinto.** Gama corta y fija, sin fabricación a medida. Una revisión que cambia el plan. Y decir lo que sobra.

---

## 5. Lo que no pudimos verificar

- **Pantallas no vistas.** WHOOP (su web bloquea el acceso; sus textos por color sí son oficiales). Apple Vitals y la versión actual de Tendencias (la captura es de 2019). Tally Health, Elysium, Lumen, Welltory y Withings. Bioniq, Persona, Hims y Rootine por dentro. El gráfico de predicción de Noom.
- **Capturas antiguas.** Las de InsideTracker son de la web de 2022 o anteriores. Las de Streaks, de 2017. Las de Care/of y Ritual, de 2021 a 2023.
- **Cifras de parte.** Casi todos los datos de conversión de quizzes vienen de proveedores de software de quizzes. Los de retención, de Recharge. El estudio de InsideTracker lo firma la propia empresa.
- **Sin dato fiable.** Aperturas por canal (correo, SMS, WhatsApp). Duración real de los check-ins. Porcentajes por motivo de baja. Evidencia directa de «uno a tres hábitos».
- **Legal.** No hemos leído en el BOE la Ley 10/2025 ni el RD 1487/2009, ni el texto oficial del artículo 50 del Reglamento de IA. Todo lo legal es una lista para el asesor de EPI10, no un dictamen.
- **Fuentes de pago.** No consultamos Mobbin, Page Flows ni growth.design.
- **Estado de empresas.** Baze, Rootine, Lumen, Nebula y DNAfit, sin confirmar.

## 6. Pendiente de la estrategia: dónde se venden las fórmulas

No las hemos localizado. Las búsquedas por Lesinot, Lipix, Forticum, Inarticum, Nocticum y Oxinot no devuelven ningún producto español. `https://www.epi10.es/` no las menciona y no tiene tienda: `/tienda/`, `/shop/` y `/productos/` dan error 404 [V]. No se comprobaron Instagram, marketplaces con sesión ni el registro de AESAN.

Un aviso: «Lipix» es también un producto brasileño ajeno, de la marca Vitafor [R]. Conviene vigilarlo si EPI10 vende fuera de España.

**Consecuencia.** El botón de compra del portal no tiene hoy destino. Es la primera pregunta del workshop.

---

## 7. Fuentes principales

Las listas completas, con más de 250 enlaces, están en los anexos. Aquí, las que sostienen las conclusiones. Consultadas el 17 de noviembre de 2026.

**Cuestionario y resultado**
- RevenueCat, teardown del embudo de Noom (abril de 2026): https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel
- Barrel / DTC Patterns, quiz de Care/of: http://www.dtcpatterns.com/dtc-patterns-articles/this-care-of-quiz-helps-you-skip-the-confusion-in-the-vitamin-aisle
- Barrel / DTC Patterns, quiz de HUM: https://www.dtcpatterns.com/dtc-patterns-articles/hum-nutrition-provides-a-personal-health-coach-through-their-quiz
- ConvertFlow, abandono en quizzes: https://www.convertflow.com/blog/how-to-fix-ecommerce-quiz-funnel-drop-off-in-2026
- Interact, conversión de quizzes: https://tryinteract.com/blog/quiz-conversion-rate-report/
- Thorne Taia: https://www.thorne.com/featured/taia
- Persona Nutrition: https://www.personanutrition.com/start/ · https://www.personanutrition.com/Frequently-Asked-Questions

**Genética y edad biológica**
- TellmeGen, web y demo de resultados: https://www.tellmegen.com/ · manual: https://app.tellmegen.com/files/manual-interpretacion-esp.pdf
- 23andMe, ayuda sobre informes de salud: https://support.23andme.org/hc/en-150/articles/42962348280983-Getting-Started-With-Your-Health-Predisposition-Reports · informe de muestra: https://permalinks.23andme.com/clinicians/GHR_Late-Onset-Alzheimers-Disease.pdf
- GlycanAge, informe de muestra: https://glycanage.com/personal-report-female.pdf
- 24Genetics, informe de muestra: https://24genetics.com/docs/24G_XY_EN_Nutrition.pdf
- Elysium, edades de sistema: https://www.elysiumhealth.com/blogs/aging101/system-ages
- Kaeberlein sobre los test de edad biológica: https://lifespan.io/news/when-doctors-prescribe-horoscopes-the-trouble-with-biological-age-tests/
- Fichas de App Store (capturas y valoraciones): Viome 1206984146 · 23andMe 952516687 · Function 6471280307 · Superpower 6747997159 · Neko 6751233363 · InsideTracker 1501674631 · GlycanAge 6810186381 · SelfDecode 1623925209

**Biomarcadores y puntuaciones**
- Oura, puntuación e informes: https://support.ouraring.com/hc/en-us/articles/360025589793-Readiness-Score · https://support.ouraring.com/hc/en-us/articles/360046061373 · https://ouraring.com/blog/readiness-score/
- WHOOP, documentación: https://developer.whoop.com/docs/whoop-101 · foro: https://www.community.whoop.com/t/mpa-monthly-performance-assessment-update-july-2025/4821.md
- InsideTracker, plan de acción: https://info.insidetracker.com/hubfs/Step%20by%20step%20instructions%20for%20creating%20an%20action%20plan.pdf · estrellas: https://blog.insidetracker.com/star-rating-system · estudio: https://insider.fitt.co/?p=24932
- Function Health, reseña con capturas: https://healnourishgrow.com/function-health-review/
- Superpower, reseñas: https://bgr.com/2184153/superpower-health-review · https://wellworthy.com/2026/05/05/my-honest-review-of-superpowers-100-biomarker-blood-test/
- Zoe, cuentas y app nueva: https://www.thegrocer.co.uk/news/zoe-gut-health-app-losses-swell-as-it-slashes-membership-price/718306.article · https://www.thegrocer.co.uk/news/nutrition-brand-zoe-launches-radically-redesigned-new-app/709452.article · colores: https://help.joinzoe.com/en/articles/11093062-food-score-colours-explained-new-zoe-app
- Apple Tendencias: https://www.macworld.com/article/3429077/ios-13-and-apple-watch-activity-trends-give-you-the-big-picture.html

**Hábitos y revisión**
- Way of Life: https://apps.apple.com/us/app/way-of-life-habit-tracker/id393159800
- Streaks: https://apps.apple.com/us/app/streaks/id963034692 · https://www.macstories.net/reviews/streaks-3-review/
- Daylio: https://daylio.net/
- WHOOP, diario e informe mensual: https://www.whoop.com/thelocker/the-whoop-journal/ · https://www.whoop.com/thelocker/monthly-performance-assessment (leídos en archive.org)
- Mobbin, estudio de 859 diseños de rachas: https://mobbin.com/blog/streaks-are-about-losing-a-study-of-859-streak-designs
- Duolingo, rachas: https://blog.duolingo.com/how-duolingo-streak-builds-habit
- Finch, análisis de reseñas: https://appbot.co/blog/finch-app-reviews-emotional-attachment-user-retention-product-loyalty/
- UCL, formación de hábitos: https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit
- Calm, estudio del check-in: https://mhealth.jmir.org/2021/4/e27106/
- WeightWatchers, pesaje semanal: https://www.weightwatchers.com/uk/blog/benefits-of-weighing-in-app-card
- 9amHealth, revisión antes de reponer: https://join9am.com/blog/how-to-ensure-a-smooth-prescription-renewal-bny
- Retención de apps: https://www.braze.com/resources/articles/mobile-app-retention
- Noom, acuerdo de 62 M$: https://sports.yahoo.com/noom-settles-billing-lawsuit-62-203622467.html

**Suplementación y recompra**
- Recharge, retención: https://getrecharge.com/?p=27176 · https://getrecharge.com/?p=27340 · https://getrecharge.com/blog/wellness-ification-playbook-subscription-retention/
- Care/of, ficha archivada: https://web.archive.org/web/20220124061018/https://www.takecareof.com/products/ashwagandha · cierre: https://www.nutraingredients.com/Article/2024/06/28/The-rise-and-fall-of-Care-of-A-financial-perspective
- Ritual, teardown: http://www.dtcpatterns.com/dtc-patterns-articles/get-better-gut-health-daily-with-rituals-subscription-program
- Viome: https://www.viome.com/products/precision-supplements
- Bioniq: https://bioniq.com/ · https://athletechnews.com/bioniq-personalized-supplements-review/
- Zoe y el abandono en el sector: https://www.nutraingredients.com/Article/2024/04/16/zoe-staff-cuts-reflect-industry-wide-customer-churn-challenge
- FTC contra Hims & Hers: https://www.alston.com/en/insights/publications/2026/08/ftc-lawsuit-hims-hers-rosca
- Suscripciones en España, nota del Ministerio: https://www.dsca.gob.es/consumo/novedades/nota-informativa-nueva-regulacion-suscripciones-ley-servicios-atencion-clientela
- Complementos, RD 1487/2009: https://www.boe.es/eli/es/rd/2009/09/26/1487

## 8. Anexos

En `anexos/` están las notas completas de cada línea de investigación. Cada una trae fichas más largas, respuestas pregunta a pregunta, su lista de fuentes y lo que no se pudo verificar. Usan marcas propias para «solo resumen de buscador» ([R], [S], [B] o [V*]); todas equivalen a nuestro [R].

- `anexos/m1_onboarding.md`: cuestionario y resultado.
- `anexos/m2_genetica.md`: genética, edad biológica y cuerpo humano.
- `anexos/m3_biomarcadores.md`: biomarcadores, puntuaciones y prioridades.
- `anexos/m4_habitos_revision.md`: hábitos y revisión periódica.
- `anexos/m5_suplementacion.md`: suplementación, recompra y normativa.
