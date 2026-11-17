# Estrategia y propuesta de valor de la app de EPI10 · v1

17 de noviembre de 2026 · Skilland para EPI10 Salud · CON-577 · documento interno de trabajo, base del workshop de diciembre

Cómo leerlo: la sección 1 basta para conocer la propuesta. El resto la justifica. Las marcas indican la solidez de cada afirmación: **[D]** dato con fuente, **[H]** hipótesis nuestra, **[?]** hueco que debe cerrar EPI10.

---

## 1. La respuesta, en una página

**Tesis.** EPI10 no vende informes ni suplementos: vende un **plan personal que se cumple**. El informe es el momento en que EPI10 conoce al cliente mejor que nadie; el portal convierte ese conocimiento en hábitos y en compra recurrente.

**Lo que proponemos:**

1. **Una sola escalera, no tres productos.** Los tipos A, B y C no son tres clientes: son tres puertas de entrada al mismo portal.
   - **B es la entrada gratuita.** Chatbot y cuestionario, sin test. Recibe una orientación y una fórmula. Es captación, no negocio.
   - **A es el núcleo.** Test, informe y plan. Es quien paga y de quien EPI10 sabe más. Se empieza por aquí.
   - **C es una variante de A sin kit.** En la v1 se atiende a mano y solo con resultados de TellmeGen, que EPI10 ya sabe leer. No se construye nada específico.
2. **El informe cambia de papel, no de valor.** Deja de ser el final del servicio y pasa a ser el principio de la relación. Sigue siendo lo que hace creíble todo lo demás.
3. **La v1 del portal es «Mi plan».** Tres prioridades, pocos hábitos con semáforo, la suplementación recomendada con compra y recompra, y una revisión mensual. Nada más.
4. **El chatbot es un cuestionario conversacional con reglas.** No es una IA que opina de salud. Usa el cuestionario multifórmula que EPI10 ya tiene escrito, con sus filtros de seguridad.
5. **El banco de datos se diseña desde el primer día**, con consentimiento aparte y exportación prevista. El modelo de recomendación llega después: primero las reglas de Aitor, luego los datos, luego el modelo.

**El argumento que alinea a Carmen, Aitor y Tomás.** Los dos informes reales que hemos revisado se titulan «Tus complementos recomendados». Recomiendan creatina, omega-3, colágeno y vitamina D3 + K2. **Ninguno recomienda una fórmula de EPI10** [D: informes anonimizados I y II]. Es decir:

- Tomás acierta: el informe ya es, de hecho, una recomendación de suplementación. Hoy esa venta se la lleva otra tienda.
- Carmen y Aitor aciertan: el rigor del informe es lo único que distingue a EPI10 de una tienda de suplementos. Sin él, la recomendación no vale nada.

No hay que elegir entre informe y suplementación. Hay que **cerrar el circuito** entre los dos.

**Tres renuncias en la v1:** app móvil nativa, dietas y menús, y modelo de recomendación con IA entrenada. Detalle en la sección 7.

**Tres avisos que cambian el plan si no se atienden:**

- El test de EPI10 es **genético, no epigenético** [D: canon de marca, §3.1]. La genética no cambia; lo que se sigue en el tiempo son los hábitos. Afecta al nombre, al cliente C y al banco de datos.
- **La recurrencia no viene sola.** En suscripciones de suplementos, de cada 100 clientes que hacen un primer pedido, solo 34 repiten tres veces y 6 repiten doce [D: Recharge]. El portal existe para mejorar esa curva.
- **Recomendar con datos genéticos y vender lo recomendado** exige cuidar tres frentes legales: declaraciones de salud, consentimiento y publicidad. Detalle en la sección 9.

---

## 2. Punto de partida: qué sabemos

| Hecho | Fuente |
|---|---|
| El producto actual es NutriWell: test genético, cuestionario de hábitos, informe e interpretación. Precio de brochure: 399 €, pago único. | [D] Auditoría de marca §3.4. Precio por verificar [?] |
| El informe tiene entre 44 y 50 páginas. El propio Aitor dice que es demasiado largo y difícil de leer. | [D] Informes anonimizados; anotaciones de Aitor |
| Las primeras 15 páginas son el plan (prioridades, hábitos, complementos). El resto es ancestralidad, rasgos, farmacogenética y vulnerabilidades. | [D] Índice de los informes |
| EPI10 tiene seis fórmulas propias: Lesinot, Lipix, Forticum, Inarticum, Nocticum y Oxinot. | [D] Auditoría de marca §3.2 |
| Existe un cuestionario multifórmula que recomienda esas fórmulas **sin test**, solo con un correo, con reglas de puntuación y de seguridad ya escritas. | [D] Cuestionario multifórmula y comentarios de Aitor |
| El cuestionario de hábitos tiene unas 50 preguntas: alimentación, actividad, emocional, sueño, salud y seguridad. | [D] Cuestionario de hábitos |
| El canon de marca aprobado en julio descartaba «lanzar un catálogo amplio de suplementos» y el papel de «vendedor agresivo de suplementos». | [D] Canon de marca §10.2 y §17 |
| El portal actual no guarda los resultados de TellmeGen: se procesan, se seudonimizan y se borran. | [D] Propuesta del portal propio, 27 oct |
| Número de clientes, precios y márgenes de las fórmulas, canales de venta actuales. | [?] EPI10 |

Tres consecuencias:

- **El cliente B ya está medio diseñado.** El cuestionario multifórmula es exactamente «cuenta sin informe que recibe recomendaciones». Falta ponerle interfaz y portal.
- **La nueva dirección contradice dos decisiones anteriores**: el canon de marca (suplementos fuera del lanzamiento) y la arquitectura de datos (no guardar resultados genéticos). No es un problema, pero hay que decidirlo de forma expresa en el workshop.
- **No hemos podido ver el catálogo.** La web epi10.es muestra hoy un blog de noticias, sin tienda ni precios. La web publiservic.com es de publicidad exterior, no de productos naturales [D: consulta del 17 nov]. El catálogo y el canal de venta de las fórmulas son el primer dato que hay que pedir.

---

## 3. Qué quiere conseguir cada tipo de cliente

Nadie quiere un informe, y nadie quiere un bote de cápsulas. Lo que se «contrata» es un progreso.

| | A · Sin informe, lo contrata | B · Cuenta sin informe | C · Trae resultados de otra empresa |
|---|---|---|---|
| **Quién es** | Persona que ya se cuida y siente que lo genérico no le basta [D: canon §4.2] | Curioso. Ha visto un anuncio o una fórmula en la farmacia | Ya pagó un test genético y se quedó con un PDF que no usa |
| **Qué quiere de verdad** | «Dime qué es lo importante para mí y por dónde empiezo» | «Dime algo útil sobre mí, rápido y sin compromiso» | «Ya tengo los datos. Dime qué hago con ellos» |
| **Qué teme** | Pagar 399 € y recibir un documento que no entiende | Que solo quieran venderle | Tener que pagar otra vez por lo mismo |
| **Qué usa hoy** | Prueba y error, consejos de gimnasio, redes, suplementos acumulados | Nada, o lo que le recomiendan en la farmacia | El informe automático de su proveedor |
| **Qué le haría volver** | Ver que avanza y que alguien revisa su plan | Que la orientación gratuita acierte | Lo mismo que A |
| **Cuánto sabe EPI10 de él** | Todo: genética, 50 preguntas, analítica opcional | Poco: 10 a 20 respuestas | Depende del formato que traiga |

Lectura:

- **A y C quieren lo mismo**: un plan. Solo cambia de dónde vienen los datos.
- **B no quiere un plan todavía.** Quiere una prueba de que EPI10 acierta. Por eso B es captación.
- El cliente del informe de ejemplo ya tomaba seis suplementos. Su problema no era qué comprar, sino **qué dejar de comprar** [D: informe I]. Ese es el trabajo real: poner orden. EPI10 puede decir «te sobran tres y te falta uno», y eso no lo dice ninguna tienda.

---

## 4. Los tres tipos de cliente, resueltos

### Recomendación: una escalera con tres puertas

```
PUERTA B                PUERTA A                    PUERTA C
Chatbot y cuestionario  Compra del test             «Ya tengo mi test»
(gratis)                (399 €)                     (informe sin kit)
      │                       │                           │
      ▼                       ▼                           ▼
 Cuenta gratuita ──────► Informe y sesión ◄───────────────┘
 Orientación + fórmula        │
                              ▼
                          MI PLAN
              hábitos · suplementación · revisión mensual
                              │
                              ▼
                 Compra recurrente y servicios
```

### Por qué empezar por A

| Criterio | A | B | C |
|---|---|---|---|
| Paga desde el primer día | Sí | No | Sí, menos |
| Datos para recomendar bien | Completos | Escasos | Variables |
| Confianza para comprar lo recomendado | Alta: ha hablado con Aitor | Baja | Media |
| Trabajo de construcción | Poco: el recorrido ya existe | Medio: chatbot y cuenta abierta | Alto si se automatiza |
| Volumen posible | Bajo | Alto | Muy bajo [H] |
| Riesgo | Depende de las horas de Aitor | Coste sin ingreso; riesgo regulatorio del chatbot | Formatos distintos; calidad desigual |

- **A es la cabeza de playa.** Los clientes ya existen, el recorrido está construido y es donde la recomendación tiene más fundamento. Si el circuito informe → plan → recompra no funciona con A, no funcionará con nadie.
- **B se construye en la misma v1, pero pequeño.** Sin B no hay forma de crecer: 399 € es mucho para una primera compra en frío. B es el escalón que falta. Su objetivo no es vender fórmulas, es llevar gente a A.
- **C no se construye. Se atiende.** En la v1 es un botón «Ya tengo mi test» que abre una solicitud. Aitor la revisa a mano. Se acepta solo TellmeGen: su test se vende directo al público desde 94,99 € [D: tienda de TellmeGen] y el generador de EPI10 ya procesa sus resultados. Si en seis meses llegan suficientes solicitudes, se automatiza.

### Qué se decide sobre el precio de B

Recomendamos **gratis, con cuenta**. Una cuenta «barata» junta lo peor de las dos opciones: frena la entrada y no paga el coste. Lo que se cobra es el siguiente escalón. Los precios concretos son una decisión aparte que no cerramos aquí.

---

## 5. Propuesta de valor y posicionamiento

### Propuesta de valor

**General.** «Entiéndete primero. Después, cuídate con criterio.» EPI10 te conoce (genética, hábitos, contexto), te dice las tres cosas que más importan en tu caso y te acompaña para cumplirlas.

Es compatible con la frase del canon de marca, «Lleva tu bienestar al siguiente nivel comprendiendo lo que te hace único». Solo añade lo que faltaba: **qué pasa después de comprender**.

| Puerta | Promesa | Prueba |
|---|---|---|
| **B** | «En cinco minutos, una primera orientación hecha para ti. Gratis.» | Resultado inmediato, con avisos de seguridad y sin obligación de compra |
| **A** | «Tu genética y tus hábitos, convertidos en un plan de tres prioridades que revisamos contigo.» | Informe visual, sesión con un profesional y plan vivo en el portal |
| **C** | «Ya tienes tus datos. Te ayudamos a usarlos.» | Mismo plan, sin repetir el test |
| **Miembro** (todos, después) | «Tu plan se ajusta contigo. Y solo te recomendamos lo que encaja.» | Revisión mensual, semáforos de avance, aviso de lo que sobra |

### Frente a qué compite EPI10

| Alternativa | Qué ofrece | Qué le falta | Dónde gana EPI10 |
|---|---|---|---|
| **Test genéticos directos** (TellmeGen 95–330 €; 24Genetics 199–299 €) [D] | Datos e informe automático, baratos | Interpretación, prioridades, seguimiento. No venden suplementos | No competir en el test. Competir en lo que pasa después |
| **Apps de hábitos y salud** | Seguimiento diario, bien diseñado | No saben nada de tu biología. Retención muy baja: 3 a 8 % de usuarios activos el día 30 [D: Business of Apps, Adjust] | No intentar ser una app de uso diario. Ser un plan con revisión mensual |
| **Suplementos personalizados por suscripción** (Bioniq, Viome, Tally Health) | Fórmula a medida y envío mensual | Caro (75 a 199 $ al mes [D: fuentes secundarias]) y frágil. Care/of cerró en 2024 con 225 M$ invertidos por Bayer [D] | Gama corta y fija de seis fórmulas. Sin fabricación a medida |
| **Consulta tradicional** (nutricionista, médico integrativo) | Confianza y trato personal | Sin datos genéticos, sin continuidad digital, cara por sesión | Misma confianza (Aitor), con datos y con portal |
| **No hacer nada / seguir probando** | Es gratis | El coste es invisible: suplementos que no encajan | «Te decimos lo que te sobra» |

### Posición recomendada

> Para personas que ya se cuidan y quieren dejar de probar a ciegas, EPI10 es el **servicio de bienestar personalizado** que convierte tu genética y tus hábitos en un plan corto, revisado por un profesional, con la suplementación justa. A diferencia de un test genético, no te deja solo con un PDF. A diferencia de una tienda de suplementos, primero te entiende y te dice también lo que no necesitas.

**Lo difícil de copiar** no es el test (es de TellmeGen) ni las fórmulas. Es la combinación de tres cosas: el criterio de Aitor convertido en reglas, los datos del cliente acumulados en el tiempo y la relación personal. Los tres crecen con el uso.

**La regla que protege la marca: «recomendamos también lo que no vendemos».** Si el plan pide creatina y EPI10 no la fabrica, se dice. Es lo que hace el informe hoy, y es lo que permite vender las fórmulas propias sin convertirse en el «vendedor agresivo» que el canon descarta. También es el argumento para Carmen y Aitor: su forma de trabajar no se toca, se aprovecha.

---

## 6. Modelo de negocio: del informe a la venta recurrente

### Cómo entra el dinero

| Escalón | Qué es | Tipo de ingreso | Papel |
|---|---|---|---|
| 0 · Cuenta gratuita | Chatbot, orientación, una fórmula sugerida | Ninguno, o primera compra de fórmula | Captación |
| 1 · Informe y plan | Test, informe visual, sesión, plan en el portal | Pago único (399 € hoy [?]) | Cualificación y confianza |
| 2 · Suplementación | Fórmulas del plan, con recompra programada | **Recurrente** | El negocio |
| 3 · Servicios | Sesión de revisión, plan de nutrición, seguimiento con profesional | Puntual o cuota | Margen y retención |

### Tres hechos que condicionan el modelo

1. **El informe solo no escala.** Cada informe consume horas de Aitor. El generador de borradores las reduce, pero el ingreso sigue siendo único. Cuántas horas por informe: [?].
2. **Hoy la recomendación y el catálogo no encajan.** Los informes recomiendan productos que EPI10 no vende. Hay dos salidas, y las dos son legítimas:
   - que las reglas de recomendación incluyan las fórmulas propias cuando de verdad encajan;
   - ampliar el catálogo con lo que más se recomienda: omega-3, creatina, vitamina D. Aquí puede entrar la distribución de Tomás [?].
   
   Sin una de las dos, el portal recomendará bien y venderá poco.
3. **La recompra se cae pronto.** De cada 100 clientes que hacen un primer pedido por suscripción, 75 repiten una vez, 49 dos veces, 34 tres veces y solo 6 llegan a doce repeticiones, más o menos un año. El paso más débil es del segundo al tercer pedido [D: Recharge, unas 1.750 marcas]. El portal tiene que actuar justo ahí, entre el segundo y el tercer mes.

### Qué hace el portal por la recurrencia

- **Da un motivo para volver cada mes**: la revisión («¿cómo vas?») ajusta el plan y coincide con la recompra.
- **Enseña el avance**: semáforos que cambian de color. Quien ve progreso, sigue.
- **Convierte la cancelación en ajuste**: «¿no notas nada con Nocticum? Lo revisamos», en lugar de un botón de baja.

### La medición que se repite

La genética se mide una vez. Las empresas que sostienen la recurrencia repiten una medición: Tally Health y Muhdo envían un test epigenético cada seis meses [D]. EPI10 tiene dos opciones:

- **Ahora:** lo que se repite es el cuestionario de hábitos, en versión corta, cada mes. Cuesta cero y ya da una curva de evolución.
- **Más adelante, con Eurofins:** una analítica de sangre periódica, o un test epigenético de verdad. Sería el «antes y después» objetivo. Es una decisión de negocio que conviene abrir en el workshop, sin comprometerla. Aviso: la fiabilidad de los test de edad biológica de consumo está discutida por los propios investigadores [D: Levine; Stanford].

### Las cifras que no tenemos

No hacemos proyección de ingresos porque faltan los cuatro datos que la sostienen: clientes actuales al mes, precio y margen de cada fórmula, canal de venta actual (online, farmacia, ambos) y horas de Aitor por informe. Van en la lista de la sección 10.

---

## 7. El viaje del cliente, de punta a punta

| # | Momento | Qué ve el cliente | Qué pasa por detrás | Qué se mide |
|---|---|---|---|---|
| 1 | **Web** | «Entiéndete primero.» Un botón: «Empieza por conocerte» | — | Visitas que inician el chatbot |
| 2 | **Chatbot** | Conversación de 5 minutos: edad, objetivos, hábitos, seguridad | Cuestionario multifórmula, con sus reglas. El lenguaje es de IA; la recomendación, de reglas | Conversaciones terminadas |
| 3 | **Orientación gratuita** | Tres semáforos (por ejemplo descanso, energía, movimiento), una fórmula sugerida y un aviso si hay medicación o embarazo | Puntuación y filtros de seguridad | — |
| 4 | **Cuenta** | «Guarda tu perfil y sigue tu avance.» Correo y contraseña | Alta en el portal como cuenta gratuita | Cuentas creadas |
| 5 | **Portal sin informe** | Su perfil, la fórmula sugerida con compra, dos hábitos para empezar y una invitación: «¿Quieres saber qué dice tu genética?» | — | Paso a informe; primera compra |
| 6 | **Compra del informe** | Pago, consentimiento, cuestionario completo (ya medio relleno), kit a casa o laboratorio | Recorrido de la fase 1: Stripe, orquestador, Odoo | Compras |
| 7 | **Espera** (semanas) | El portal no está vacío: hábitos iniciales y contenido corto, «qué vas a descubrir» | Laboratorio; borrador con el generador; revisión de Aitor | Accesos durante la espera |
| 8 | **Informe** | Primero el resumen visual: tres prioridades, semáforos y la rueda. Debajo, el detalle. PDF completo descargable | Publicación desde el back office | Informes abiertos |
| 9 | **Sesión** | 30 minutos con el profesional. Se acuerda el plan | Cita en el portal | Sesiones hechas |
| 10 | **Mi plan** | Tres prioridades. Tres a cinco hábitos. La suplementación: qué tomar, qué mantener, qué dejar. Botón de compra | El plan sale del informe como datos, no como texto | Planes activados |
| 11 | **Primera compra** | Fórmulas del plan, con opción «recíbelo cada mes» | Stripe y Odoo | Conversión del plan a compra |
| 12 | **Revisión mensual** | Dos minutos: «¿cómo has dormido?, ¿has cumplido?». Los semáforos se actualizan | Cuestionario corto. Alerta a Aitor si algo empeora | Revisiones completadas |
| 13 | **Recompra y ajuste** | «Tu plan del mes que viene», con cambios si procede | Regla o revisión humana | **Recompra en el tercer mes** |
| 14 | **Revisión a seis meses** | Sesión de revisión; más adelante, nueva medición | — | Renovación |

Los dos momentos críticos:

- **Pasos 8 a 10.** Es donde hoy se acaba el servicio. Es donde debe empezar la relación.
- **Pasos 12 y 13.** Es donde se cae la recompra en todo el sector.

**La métrica principal de la v1:** porcentaje de clientes con informe que hacen una segunda compra de suplementación en los 90 días siguientes. Si esa cifra es baja, el modelo de Tomás no se sostiene y hay que saberlo pronto.

---

## 8. Qué entra en la v1 y qué no

Criterio: la v1 tiene que demostrar una sola cosa, que el circuito **informe → plan → recompra** funciona. Lo que no ayuda a demostrarlo espera.

| Entra en la v1 | Se congela (después de la v1) | No se hace | Se deja de prometer |
|---|---|---|---|
| Chatbot guiado en la web, sobre el cuestionario multifórmula | Automatizar al cliente C | App móvil nativa: el portal es web y se usa bien en el móvil | «Test epigenético», si lo que se mide es genética |
| Cuenta gratuita con orientación y fórmula sugerida | Imagen interactiva del cuerpo humano | Dietas, menús y recetas | Que la IA recomienda por sí sola |
| **Mi plan**: prioridades, hábitos con semáforo, suplementación con compra y recompra | Integración con relojes y pulseras | Comunidad, foros, retos | Resultados de salud garantizados |
| Informe en versión visual dentro del portal, más PDF | Segunda medición (analítica, epigenética) con Eurofins | Tienda de productos de terceros sin criterio de recomendación | |
| Revisión mensual de dos minutos | Modelo de recomendación entrenado con datos | Fórmulas fabricadas a medida para cada persona | |
| Consentimiento para investigación y datos estructurados listos para exportar | Programa para farmacias y profesionales | Chat libre de salud con IA | |
| Back office: ver planes, alertas y recompras | Suscripción de pago al portal | | |

Notas:

- **Semáforos, sí. Rueda, sí. Cuerpo humano, después.** El semáforo de hábitos es el concepto central: se entiende sin explicación y sirve igual en el chatbot, el informe y el portal. La rueda resume las áreas del perfil. La imagen del cuerpo es cara de hacer bien y no cambia la decisión de compra [H].
- **Pocos hábitos.** Tres a cinco, no veinte. El uso diario de las apps de salud se desploma en un mes [D]. El portal no debe pedir entrar cada día: basta una vez por semana para marcar los hábitos y una vez al mes para la revisión.
- **Una alternativa sin construir para cada pieza.** La revisión mensual se puede empezar con un correo y un formulario antes de programarla. El cliente C se atiende a mano. La recompra puede ser al principio un recordatorio con enlace de pago. Lo que funcione, se construye.
- **La web nueva** forma parte del mismo paquete, pero su alcance se decide en el workshop. Para esta estrategia solo importa una cosa: que la portada lleve al chatbot, no a la ficha del test.

---

## 9. El banco de datos para investigación

### Qué hace falta decidir ahora

| Decisión | Recomendación | Por qué |
|---|---|---|
| **Consentimiento** | Aparte del consentimiento del servicio. Opcional, por finalidades, revocable. No condiciona ni el precio ni el servicio | Los datos genéticos y de salud son categoría especial. Investigar es una finalidad distinta de prestar el servicio |
| **Qué se guarda** | Respuestas de cuestionarios como datos codificados, plan asignado, compras, revisiones mensuales. Resultados genéticos estructurados **solo** de quien consienta | Hoy los resultados de TellmeGen no se guardan [D]. Guardarlos es un cambio de arquitectura y de compromiso con el cliente |
| **Cómo se guarda** | Seudonimizado, con la identidad separada. En el servidor de EPI10, en la UE | Ya es el criterio de la fase 1 |
| **Exportación** | Formatos abiertos (CSV, JSON) con diccionario de datos. Solo de quien ha consentido. Con registro de cada exportación | Tomás prevé que los investigadores la pidan |
| **Gobierno** | Un responsable en EPI10, acuerdo escrito con cada universidad y evaluación de impacto antes de la primera cesión | Es la pregunta que hará cualquier comité de ética |

### El orden realista

1. **Reglas.** El criterio de Aitor, escrito como reglas, recomienda desde el primer día. El cuestionario multifórmula ya es eso.
2. **Datos.** Cada cliente deja una fila completa: perfil, plan, cumplimiento y cómo evoluciona.
3. **Modelo.** Con volumen suficiente, los datos mejoran las reglas. No antes.

Dos advertencias:

- **El volumen manda.** Con decenas o pocos cientos de clientes no se entrena un modelo fiable. Los datos comprados dan volumen de genética, pero no dicen qué le funcionó a cada persona.
- **Lo valioso es el resultado, no el genoma.** Lo que EPI10 tendrá y nadie más tiene es la serie completa: este perfil, esta recomendación, este cumplimiento, este cambio. Por eso la revisión mensual es también la pieza clave del banco de datos. Sin ella, solo hay fotos de partida.

La ciencia pide prudencia al comunicarlo. El mayor ensayo europeo de nutrición personalizada encontró que el consejo personalizado mejora la dieta, pero que añadir la genética no aportó mejora adicional [D: Food4Me]. Es un argumento a favor de esta estrategia: **el valor está en personalizar y acompañar, no en el gen**. Y es una hipótesis de investigación honesta para proponer a una universidad.

### Lo legal, en corto

No somos asesores jurídicos. Estos puntos tiene que confirmarlos el asesor legal o el delegado de protección de datos de EPI10 antes de construir:

- **Declaraciones de salud.** De un complemento solo se puede decir lo que está en la lista autorizada de la UE, y nunca que previene, trata o cura (Reglamento 1924/2006; RD 1487/2009). Vale también para lo que escriba el chatbot. Los informes de Aitor ya lo respetan con cuidado [D].
- **Publicidad.** El RD 1907/1996 limita la publicidad con pretendida finalidad sanitaria. Revisar cómo se nombran las «fórmulas propias».
- **Análisis genéticos.** La Ley 14/2007 regula los análisis genéticos, su consentimiento y su uso en investigación. TellmeGen exige en España prescripción médica para sus test más completos [D]. Hay que confirmar cómo está cubierto hoy EPI10.
- **Chatbot.** Debe avisar de que es una IA. Si diagnostica o aconseja sobre tratamientos, entra en terreno de producto sanitario. De ahí la recomendación: orienta con reglas y deriva al profesional.

---

## 10. Riesgos y supuestos

| # | Riesgo o supuesto | Si falla… | Cómo se reduce | Quién lo cierra |
|---|---|---|---|---|
| 1 | Los clientes con informe comprarán las fórmulas de EPI10 [H] | No hay negocio recurrente | Probarlo ya con clientes actuales: plan por correo con enlace de compra, antes de construir | Tomás, Aitor |
| 2 | Las fórmulas encajan con lo que el informe recomienda [H] | El portal recomienda lo que no vende | Cruzar los últimos 20 informes con el catálogo | Aitor |
| 3 | El cliente no percibe conflicto entre «te aconsejo» y «te vendo» [H] | Se pierde la confianza, que es el activo | Regla «recomendamos también lo que no vendemos» | Carmen |
| 4 | La cuenta gratuita lleva gente al informe [H] | B es coste sin retorno | Medir el paso de B a A desde el primer día. Cortar si no se mueve | Skilland |
| 5 | La gente vuelve al portal cada mes [H] | No hay seguimiento ni datos | Revisión de dos minutos, ligada a la recompra | Skilland |
| 6 | Aitor puede atender más planes sin más horas [H] | Cuello de botella | Reglas y generador; él revisa excepciones | Aitor |
| 7 | El marco legal permite cruzar datos genéticos con venta de suplementos [?] | Rediseño del consentimiento o del circuito | Consulta legal antes de construir | Carmen |
| 8 | Carmen y Aitor aceptan el cambio de papel del informe | Bloqueo interno | Presentarlo como «el informe gana un después» | Workshop |
| 9 | Hay volumen para el banco de datos [?] | El modelo no llega | Tratarlo como proyecto a varios años | Tomás |

**Qué nos haría cambiar la recomendación:**

- Si menos de uno de cada cinco clientes con informe compra una fórmula tras recibir su plan [H: umbral por acordar], el problema está en el catálogo o en el precio, no en el portal. Habría que parar y revisar la oferta.
- Si EPI10 no puede o no quiere vender online al consumidor (por ejemplo, porque el canal es la farmacia), el paso 11 del viaje cambia entero y el portal pasa a recomendar y derivar.
- Si la consulta legal limita el uso de datos genéticos para recomendar productos, el plan se apoyaría en hábitos y cuestionario, y la genética quedaría como contexto.

---

## 11. Preguntas para cerrar en el workshop

**Negocio**

1. ¿Cuántos informes se venden hoy al mes? ¿A qué precio real?
2. ¿Cuáles son el precio, el margen y el canal de cada fórmula? ¿Se venden ya online?
3. ¿Qué papel tiene la distribución de Tomás? ¿Se puede ampliar el catálogo con lo que más recomienda el informe?
4. ¿Cuántas horas dedica Aitor a cada informe, con el generador?
5. ¿Aceptamos la métrica principal: segunda compra en 90 días?

**Clientes**

6. ¿Validamos la escalera: B gratis, A núcleo, C a mano?
7. ¿Qué recibe exactamente el cliente gratuito, y dónde está el límite con el de pago?
8. ¿Hay clientes actuales a quienes ofrecer el plan como prueba antes de febrero?

**Producto**

9. ¿La recomendación puede incluir fórmulas propias? ¿Con qué reglas y quién las firma?
10. ¿Mantenemos «recomendamos también lo que no vendemos»?
11. ¿La sesión de interpretación sigue incluida? ¿Se añade una revisión a seis meses?
12. Semáforos y rueda: ¿qué áreas? Propuesta: nutrición, movimiento, descanso, estrés y energía, complementación.

**Marca y ciencia**

13. ¿Genético o epigenético? ¿Cómo lo llamamos en la web?
14. ¿Se revisa el canon de marca de julio, que dejaba los suplementos fuera del lanzamiento?
15. Eurofins: ¿solo recogida de muestra, o también una segunda medición periódica?

**Datos y legal**

16. ¿Quién es el asesor legal o delegado de protección de datos que valida el consentimiento y el chatbot?
17. ¿Aceptamos guardar los resultados genéticos estructurados de quien consienta?
18. ¿Con qué universidades se habla y qué formato de datos piden?

---

## 12. Supuestos de este documento

- Trabajamos con dos informes anonimizados, dos cuestionarios, el brochure, el canon de marca y las notas de la demo. No hemos hablado con clientes finales.
- No hemos podido ver el catálogo ni los precios de las fórmulas. Las webs indicadas no muestran esa información.
- No fijamos precios. Solo decimos qué se cobra y qué no.
- Las cifras de mercado son de Estados Unidos o globales, y varias vienen de fuentes secundarias. Valen como orden de magnitud, no como objetivo para EPI10.
- La parte legal es una lista de puntos para revisar, no un dictamen.

## 13. Fuentes

**Internas** (repositorio del proyecto)

- `EPI10_POSTDEMO_CONTEXTO.md`: notas de la demo del 12 nov.
- `02_context/EPI10-branding/`: canon de marca v1, auditoría de marca y brochure de NutriWell.
- `DOCUMENTOS-AITOR-GENERADOR-BORRADORES-INFORMES/`: informes anonimizados I y II, cuestionario de hábitos, cuestionario multifórmula y anotaciones de Aitor.
- `04_outputs/entrega-epi10-2026-10-27/05_propuesta-portal-propio/`: propuesta del portal, 27 oct.

**Mercado y competidores** (consultadas el 17 nov 2026)

- TellmeGen, tienda: https://shop.tellmegen.com/es/
- 24Genetics, tienda: https://24genetics.es/tienda/
- Tally Health: https://tallyhealth.com/ · compra por Infinite Epigenetics: https://nutraingredients.com/Article/2026/04/29/infinite-epigenetics-acquires-tally-health-in-largest-epigenetic-testing-deal-to-date
- Muhdo: https://muhdo.com/
- Cierre de Care/of: https://www.nutraingredients.com/Article/2024/06/07/Care-of-to-close-operations/ · https://www.nutraingredients.com/Article/2024/06/28/The-rise-and-fall-of-Care-of-A-financial-perspective
- Recortes en Zoe y abandono en el sector: https://www.nutraingredients.com/Article/2024/04/16/zoe-staff-cuts-reflect-industry-wide-customer-churn-challenge
- Cierre de Arivale: https://www.geekwire.com/2019/arivale-shut-doors-inside-surprise-closure-ambitious-scientific-wellness-startup/
- Bioniq (reseña, fuente secundaria): https://athletechnews.com/bioniq-personalized-supplements-review/
- Viome (fuente secundaria): https://www.innerbuddies.com/blogs/gut-health/best-personalized-nutrition-companies

**Benchmarks**

- Recharge, retención de suscripciones: https://getrecharge.com/?p=27176
- Retención de apps de salud: https://businessofapps.com/data/health-fitness-app-benchmarks · https://www.adjust.com/blog/get-the-mobile-app-retention-benchmarks-for-2023/
- RevenueCat, State of Subscription Apps 2025: https://www.revenuecat.com/state-of-subscription-apps-2025/

**Ciencia**

- Food4Me: https://academic.oup.com/ije/article/46/2/578/2614369
- Academy of Nutrition and Dietetics, 2021: https://eatrightpro.org/practice/guidelines-and-positions/consensus-reports/incorporating-genetic-testing-into-nutrition-care
- Fiabilidad de los test de edad biológica: https://www.foundmyfitness.com/episodes/consumer-epigenetic-age-tests-reliable · https://news.stanford.edu/stories/2026/09/biological-age-tests-tips-advice

**Regulación**

- AESAN, complementos y declaraciones: https://www.aesan.gob.es/AECOSAN/web/seguridad_alimentaria/subdetalle/etiquetado_complementos.htm · https://www.aesan.gob.es/AECOSAN/web/seguridad_alimentaria/detalle/declaraciones_nutricionales_saludables.htm
- RD 1907/1996: https://www.boe.es/eli/es/rd/1996/08/02/1907/con
- Ley 14/2007 de Investigación Biomédica: https://www.boe.es/buscar/act.php?id=BOE-A-2007-12945
- RGPD: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- Transparencia en el Reglamento de IA: https://www.raps.org/resource/european-commission-publishes-guideline-on-transparency-obligations-under-ai-act.html

**Marcos usados**

- Christensen, *Competing Against Luck* (trabajo por hacer).
- Moore, *Crossing the Chasm* (cabeza de playa).
- Rumelt, *Good Strategy / Bad Strategy* (diagnóstico, política y renuncias).
- Dunford, *Obviously Awesome* (posicionamiento frente a alternativas).
- Torres, *Continuous Discovery Habits* (supuestos y pruebas).
