# Workshop EPI10 Salud — Guion de slides v1

## Contexto de uso

Este documento recoge el guion de contenidos para producir el deck del workshop operativo de EPI10 Salud. No es un texto cerrado para pegar literalmente en cada slide, sino una guía de enfoque, narrativa, claims y estructura para que Cloudesign/Claude maquete la presentación con el branding de Skilland y la línea visual de los entregables previos de EPI10.

El tono general debe ser:

- ejecutivo, claro y premium;
- orientado a sesión de trabajo, no a venta agresiva;
- continuidad natural del dossier comercial ya enviado;
- foco en proceso real, decisiones y ejecución;
- poco texto por slide, mucho apoyo visual y espacio para explicación oral.

Frase eje del workshop:

> No venimos a empezar de cero. Venimos a ordenar, validar y cerrar cómo se construye bien la Fase 1.

---

# Bloque introductorio

## Slide 1 — Portada

**Título principal**  
Workshop EPI10 Salud  
Diseño operativo de la Fase 1

**Claim principal**  
De proceso manual a sistema operativo trazable, conectado y preparado para crecer.

**Notas para Claude**  
Mantener continuidad visual con los entregables previos de EPI10: portada sobria, premium, tecnológica y sanitaria. Debe sentirse como una extensión natural del dossier comercial, no como una presentación nueva sin relación visual.

---

## Slide 2 — Bienvenida / anclaje de expectativas

**Título sugerido**  
Hoy no venimos a empezar de cero. Venimos a cerrar cómo se construye bien.

**Idea principal**  
Durante la preventa ya hemos analizado el proceso, identificado el peso operativo que hoy recae sobre Carmen, Aitor y el equipo, y definido una dirección clara: ordenar la operación, mejorar la experiencia cliente y construir una base funcional que no haya que rehacer mañana.

**Mensaje de la slide**  
El workshop sirve para profundizar juntos en el proceso real de hoy, validar el journey operativo de la Fase 1 de mañana, cerrar decisiones y preparar la ejecución con menos incertidumbre.

**Claims cortos posibles**

- Validar el proceso real de hoy.
- Diseñar el journey operativo de mañana.
- Cerrar decisiones de alcance y arquitectura funcional.
- Preparar la ejecución con menos incertidumbre.

**Notas para Claude**  
No hacer una slide densa. Debe funcionar como anclaje emocional y operativo. Una frase grande arriba y 3–4 ideas de apoyo abajo. Tono: “ya hemos avanzado mucho; hoy venimos a ordenar y decidir”.

---

## Slide 3 — Índice del workshop

**Título sugerido**  
Tres bloques para salir con una Fase 1 lista para ejecutar.

**Bloque 1 — EPI10 hoy**  
Revisamos el flujo actual y hacemos deep dive en web/formulario/pago y Odoo.

**Bloque 2 — EPI10 mañana**  
Presentamos el nuevo journey operativo, la arquitectura funcional y el papel de Odoo, Healthie y Copilot.

**Bloque 3 — Cierre y próximos pasos**  
Validamos decisiones, pendientes técnicos y siguiente fase de ejecución.

**Notas para Claude**  
Diseñar como mapa de sesión, no como índice aburrido. Tres columnas o tres tarjetas. Cada bloque debe tener título, objetivo y una mini descripción. El Bloque 2 debe ser visualmente el bloque central/pesado del workshop.

---

# Bloque 1 — EPI10 hoy

## Slide 4 — Portada de bloque

**Título principal**  
Bloque 1 — EPI10 hoy

**Claim principal**  
Antes de automatizar, necesitamos mirar de frente cómo funciona hoy el proceso real.

**Idea de apoyo**  
El objetivo de este bloque no es volver a analizar desde cero, sino alinear en sala el flujo actual, detectar dónde se concentra la carga manual y confirmar qué piezas técnicas necesitamos revisar para construir bien la Fase 1.

**Claims cortos posibles**

- Flujo real, no flujo ideal.
- Sistemas actuales, fricciones actuales.
- Carga manual visible.
- Decisiones técnicas con proceso delante.

**Notas para Claude**  
Slide de apertura de bloque. Debe marcar cambio de ritmo: entramos en modo diagnóstico operativo. Mantener estética sobria y clara, con una frase grande y 3–4 conceptos de apoyo. No convertirla en texto largo.

---

## Slide 5 — Mapa del flujo actual a mano

**Título sugerido**  
El flujo actual: una operación que funciona, pero consume demasiada coordinación, calendario y ancho de banda mental.

**Idea principal**  
Hoy EPI10 ya tiene un proceso operativo real: cliente, web, pago, Odoo, test, laboratorio, TellmeGen, informe y entrega. El problema no es que no exista proceso; el problema es que demasiadas conexiones dependen de intervención humana, memoria operativa y comunicación dispersa. Esa carga satura al equipo y le quita espacio para dedicar más energía a criterio experto, mejora del servicio y crecimiento.

**Diagrama recomendado**  
Representar el flujo actual de punta a punta:

Cliente  
→ Web / formulario / pago  
→ alta manual en Odoo  
→ pedido del test  
→ recepción del test  
→ cita con cliente  
→ test realizado  
→ envío al laboratorio  
→ TellmeGen manual  
→ descarga de resultados  
→ elaboración del informe  
→ entrega al cliente

**Leyenda visual sugerida**

- Cliente
- Aitor
- Carmen / equipo EPI10
- Web
- Pago
- Odoo
- TellmeGen / Termillén
- Email / WhatsApp
- PDF / informe

**Claim de cierre de slide**  
El objetivo no es señalar errores: es identificar qué partes del proceso deben dejar de depender de memoria, doble entrada y seguimiento manual.

**Notas para Claude**  
Debe ser una slide visual, no una slide de texto. Usar un diagrama horizontal o tipo journey. Destacar con color diferente los puntos donde interviene el equipo manualmente. Esta slide debe servir para conversación en sala: “corregidnos el mapa”.

---

## Slide 6 — Deep dive: web, formulario, base de datos y pago

**Título sugerido**  
La entrada del caso: dónde nace el cliente EPI10.

**Idea principal**  
Para automatizar bien el inicio del flujo, necesitamos entender con precisión cómo entra hoy el cliente: web, formulario, base de datos y pago.

**Puntos a revisar en sala**

- Qué web usan y quién la mantiene.
- Dónde vive el formulario principal.
- Qué campos recoge el formulario.
- Qué base de datos usa: tipo, estructura básica y responsable técnico.
- Dónde se guardan las respuestas.
- Qué pasarela de pago usan.
- Qué ocurre hoy después del pago.

**Caja inferior — To-dos técnicos**

- Pedir acceso o documentación técnica de la web.
- Pedir acceso o documentación técnica del formulario.
- Pedir acceso o documentación técnica de la base de datos.
- Identificar quién mantiene la web/formulario/pago.

**Notas para Claude**  
Diseñar como slide de trabajo simple. No usar preguntas guía. Usar dos áreas: revisión en sala y to-dos técnicos. Debe ser muy práctica, orientada a conseguir accesos y entender la entrada del caso sin abrir un debate infinito.

---

## Slide 7 — Deep dive: Odoo actual

**Título sugerido**  
Odoo hoy: de herramienta actual a centro operativo de Fase 1.

**Idea principal**  
Odoo ya forma parte del proceso. En esta sesión necesitamos entender lo suficiente para saber cómo convertirlo en el centro operativo del nuevo journey sin sobrediseñar ni cargar al equipo con trabajo innecesario.

**Puntos a revisar en sala**

- Versión y modalidad actual de Odoo.
- Módulos principales que usan.
- Vistas principales relacionadas con EPI10.
- Campos principales que hoy utilizan.
- Estados actuales, si existen.
- Tareas reales que hacen Carmen, Aitor y el equipo dentro o fuera de Odoo.
- Documentos o adjuntos que ya guardan en Odoo.

**Caja inferior — To-dos técnicos**

- Crear usuario de revisión para Skilland.
- Compartir acceso/documentación de la configuración actual.
- Valorar migración o clon del entorno Odoo para desarrollo.
- Confirmar si podemos crear campos, vistas, acciones y módulos necesarios para Fase 1.

**Claim de cierre de bloque**  
Si Odoo va a ser el centro operativo, necesitamos entender su estado actual y preparar un entorno donde podamos trabajar con seguridad.

**Notas para Claude**  
Slide de trabajo muy práctica. No convertirla en auditoría pesada. Debe transmitir: “necesitamos ver lo principal, pedir accesos y preparar la base para construir”.

---

# Bloque 2 — EPI10 mañana / Fase 1

## Slide 8 — Portada de bloque

**Título principal**  
Bloque 2 — EPI10 mañana

**Claim principal**  
Una Fase 1 acotada, diseñada como base software acumulativa.

**Idea principal**  
La propuesta no es añadir más herramientas ni crear una plataforma completa desde el primer día. Es ordenar el proceso alrededor de una arquitectura funcional clara: una capa de orquestación operativa apoyada en Odoo, Healthie como experiencia cliente y Copilot como apoyo a la producción del informe final.

**Claims cortos posibles**

- Menos carga manual.
- Más trazabilidad.
- Mejor experiencia cliente.
- Base propia para seguir construyendo.
- Sin parches que mañana haya que rehacer.

**Notas para Claude**  
Slide de transición hacia la solución. Debe sentirse como continuidad directa de la tesis comercial: no es un apaño, no son automatizaciones sueltas, es una primera base operativa acumulativa que permite lanzar bien y crecer sin construir en falso.

---

## Slide 9 — Mapa del nuevo flujo

**Título sugerido**  
Un nuevo flujo operativo: más cohesivo, más trazable y menos dependiente de memoria humana.

**Idea principal**  
El nuevo journey conecta entrada, operación, portal cliente, laboratorio manual, Copilot de informe y entrega final sin convertir Fase 1 en una plataforma sobredimensionada.

**Diagrama recomendado**  
Representar el nuevo flujo simplificado:

Cliente  
→ Web EPI10 / Healthie  
→ Odoo crea caso operativo  
→ Healthie activa experiencia cliente  
→ Carmen, Aitor y el equipo operan con estados y tareas claras  
→ el equipo pide y recibe test  
→ Healthie agenda cita  
→ el equipo realiza test y envía muestra  
→ TellmeGen manual  
→ el equipo sube entregable  
→ Copilot genera borradores  
→ revisión humana  
→ Odoo publica informe final en Healthie  
→ cliente accede al informe  
→ cierre operativo en Odoo

**Claims de diseño**

- Odoo gobierna el caso.
- Healthie gobierna la experiencia cliente.
- TellmeGen sigue manual, pero controlado dentro del proceso.
- Copilot acelera borradores; la validación final sigue siendo humana.

**Notas para Claude**  
Slide visual. Debe ser el espejo del mapa “EPI10 hoy”, pero mostrando un flujo más ordenado. Usar leyenda con logos/iconos: Cliente, Carmen/Aitor/equipo, Odoo, Healthie, TellmeGen, Copilot, PDF/informe. Mantenerlo simplificado: no meter todos los microestados.

---

## Slide 10 — Capa de orquestación lógica integrada en Odoo

**Título sugerido**  
La capa de orquestación: lógica de negocio integrada en el centro operativo.

**Idea principal**  
La Fase 1 no se limita a configurar Odoo. Diseña una capa de lógica operativa que ordena estados, hitos, tareas y responsables. La integramos en Odoo porque es el lugar natural para operar el caso, pero el valor está en la orquestación del proceso.

**Claims cortos**

- Un caso único por cliente.
- Estados e hitos visibles.
- Tareas claras para Carmen, Aitor y el equipo.
- Menos doble entrada y menos pasos olvidados.
- Menos dependencia de memoria, WhatsApp y correos.
- Base para automatizaciones futuras.

**Notas para Claude**  
Slide tipo “pilar de arquitectura”. El énfasis visual debe estar en la capa de orquestación, no solo en el logo de Odoo. Puede representarse como un tablero operativo o una capa lógica encima de Odoo. Debe sonar a software operativo a medida, no a simple configuración de CRM.

---

## Slide 11 — Healthie como experiencia cliente

**Título sugerido**  
Healthie no es solo donde dejamos el informe: es la capa de experiencia cliente.

**Idea principal**  
Tras revisar alternativas, proponemos Healthie porque permite resolver el portal cliente de Fase 1 sin disparar el coste y, al mismo tiempo, abre muchas más posibilidades funcionales: app, documentos, formularios, comunicaciones, agenda, recordatorios, permisos, API rica y futuras líneas de servicio.

**Claims cortos**

- Portal y app para el cliente.
- Documentos e informe final centralizados.
- Formularios y onboarding si se activan.
- Comunicación más profesional.
- Agenda y recordatorios.
- API rica y preparada para integración.
- Base para futuras líneas de servicio.

**Nota sobre elección de Healthie**  
No es una decisión neutra ni improvisada: la proponemos porque combina experiencia cliente, capacidades operativas, documentación técnica potente y margen de evolución funcional sin multiplicar herramientas ni penalizar de forma relevante el coste.

**Notas para Claude**  
Slide comercial-técnica. No saturar. Usar logo Healthie, una captura/recurso de documentación técnica reconstruida y 4–6 claims. Debe transmitir: “lo elegimos porque permite más ahora y abre más posibilidades después”. Incluir visualmente el contraste: no solo portal, también plataforma de crecimiento.

---

## Slide 12 — Copilot del informe

**Título sugerido**  
Copilot del informe: acelerar borradores sin sustituir criterio experto.

**Idea principal**  
El informe final es el producto central del servicio. La Fase 1 no automatiza decisiones clínicas ni sustituye al equipo experto: ordena inputs, sistematiza el proceso y genera borradores revisables para reducir carga y ganar consistencia.

**Claims cortos**

- Generación asistida de borradores.
- Inputs más ordenados.
- Revisión humana obligatoria.
- Informe final validado por EPI10.
- Más consistencia y capacidad de escala.
- Base para mejorar el proceso informe a informe.

**Notas para Claude**  
Slide clara y responsable. Debe evitar cualquier sensación de “IA diagnóstica”. Usar lenguaje de apoyo, borrador, revisión y validación humana. Visualmente puede mostrar un flujo simple: entregable TellmeGen → Copilot → borradores → revisión humana → informe final.

---

# Journey operativo propuesto

## Slide 13 — Tramo 1: Entrada y activación del caso

**Título sugerido**  
Tramo 1 — Entrada y activación del caso

**Idea principal**  
El cliente entra por la web actual o por Healthie, pero en ambos escenarios se elimina el alta manual y se crea un caso operativo en Odoo con cliente vinculado en Healthie desde el inicio.

**Estructura de contenido recomendada**

**Qué ve el cliente**

- Opción A: entra por Web EPI10, rellena formulario, paga y recibe acceso a Healthie.
- Opción B: entra desde la web comercial y pasa directamente a Healthie para cuenta, formulario, pago y onboarding.

**Qué ocurre en Odoo**

- Se crea o actualiza el contacto.
- Se crea el caso operativo EPI10.
- Se registra el pago confirmado.
- Se guarda el vínculo con Healthie.
- Se crea la primera tarea operativa.

**Qué ocurre en Healthie**

- Se crea o vincula el cliente.
- Se activa el portal/app.
- El cliente queda listo para recibir onboarding, formularios, mensajes, documentos y citas.

**Qué deja de hacer manualmente el equipo**

- Alta manual del cliente.
- Reconciliación manual entre formulario, pago y caso operativo.
- Primer arranque disperso del caso.

**Idea clave**  
Decisión del workshop: elegir vía A o vía B.

**Notas para Claude**  
Usar layout de comparación A/B, muy visual. Dos rutas, una decisión. Incluir una zona común debajo: “en ambos casos: Odoo gobierna el caso, Healthie gobierna la experiencia cliente”.

---

## Slide 14 — Tramo 2: Activación Healthie y preparación del test

**Título sugerido**  
Tramo 2 — Healthie activa al cliente; Odoo prepara la operación.

**Idea principal**  
El cliente entra en Healthie y, si se decide, completa onboarding o formularios adicionales. Odoo mantiene el checklist operativo y activa la siguiente tarea para el equipo.

**Estructura de contenido recomendada**

**Qué ve el cliente**

- Acceso a portal/app Healthie.
- Mensaje de bienvenida o inicio de experiencia.
- Formularios adicionales u onboarding si se activa.
- Posible solicitud de consentimientos o información complementaria.

**Qué ocurre en Healthie**

- Cliente creado/vinculado.
- Grupo inicial EPI10.
- Onboarding o formularios disponibles.
- Registro de completados.
- Canal de comunicación abierto.

**Qué ocurre en Odoo**

- Checklist operativo actualizado.
- Estado del caso visible.
- Hitos como Healthie activado, formularios recibidos, consentimiento completado si aplica.
- Tarea para revisar nuevo caso o preparar pedido del test.

**Qué hace el equipo**

- Revisa si el caso está listo.
- Valida información mínima.
- Prepara el siguiente paso operativo: pedir el test.

**Idea clave**  
Healthie recoge experiencia; Odoo ordena operación.

**Notas para Claude**  
Usar el mismo layout que el resto de tramos. Recomendado: tres columnas o tarjetas: Cliente / Healthie / Odoo. Mantener foco en simplicidad y trazabilidad.

---

## Slide 15 — Tramo 3: Pedido, recepción y cita

**Título sugerido**  
Tramo 3 — Pedimos el test sin convertir la logística física en un proyecto aparte.

**Idea principal**  
El equipo marca los hitos clave en Odoo —test pedido y test recibido—, pero no cargamos Fase 1 con tracking físico complejo. Cuando el test llega, Healthie avisa al cliente y permite agendar la cita.

**Estructura de contenido recomendada**

**Qué ve el cliente**

- Mensaje en Healthie: “tu caso está en marcha”.
- Si pregunta durante la espera, recibe respuestas por el canal Healthie.
- Cuando el test llega, recibe aviso para agendar cita.
- Agenda desde Healthie y recibe confirmación/recordatorio.

**Qué ocurre en Odoo**

- Estado: listo para pedir test.
- El equipo marca “test pedido”.
- La logística física queda como caja negra.
- El equipo marca “test recibido”.
- Odoo activa comunicación Healthie.
- Odoo recibe la cita y notifica al equipo.

**Qué ocurre en Healthie**

- Mensaje de caso en marcha.
- Plantillas para dudas frecuentes.
- Aviso de test disponible.
- Agenda de cita.
- Confirmación, recordatorios y calendario.

**Qué hace el equipo**

- Pide el test fuera del sistema.
- Registra solo hitos mínimos.
- Ve la cita agendada sin perseguir mensajes.

**Idea clave**  
Quitamos fricción sin gastar Fase 1 en tracking físico complejo.

**Notas para Claude**  
Destacar explícitamente “caja negra logística” como decisión inteligente de alcance. No presentarlo como carencia, sino como enfoque pragmático: evitamos consumir desarrollo en tracking físico de bajo retorno para Fase 1.

---

## Slide 16 — Tramo 4: Laboratorio, Copilot e informe

**Título sugerido**  
Tramo 4 — Del test realizado al informe validado.

**Idea principal**  
TellmeGen sigue manual. Cuando el laboratorio tiene el entregable listo, no se avisa al cliente: se activa al equipo. El entregable se descarga manualmente, se sube al Copilot, se revisan borradores y solo al validar el informe final se publica en Healthie.

**Estructura de contenido recomendada**

**Qué ve el cliente**

- Confirmación de que la muestra está enviada o en proceso.
- No recibe resultados brutos.
- Solo recibe aviso cuando el informe final está validado y disponible.

**Qué ocurre en Odoo**

- Estado: test realizado.
- Estado: muestra enviada / esperando laboratorio.
- Tarea para revisar disponibilidad del entregable.
- Estado: entregable disponible / pendiente Copilot.
- Copilot en ejecución.
- Borradores generados.
- Tarea de revisión humana.
- Informe final validado.
- Publicación en Healthie.

**Qué ocurre en Healthie**

- Comunicación de espera.
- Canal de dudas.
- Documento final publicado solo cuando está validado.
- Mensaje de informe disponible.

**Qué hace el equipo**

- Realiza test y envía muestra.
- Descarga entregable TellmeGen.
- Sube entregable al Copilot.
- Revisa borradores.
- Valida versión final.

**Idea clave**  
El cliente no ve resultados brutos: ve informe final validado.

**Notas para Claude**  
Slide importante. Debe transmitir control, criterio profesional y seguridad. Visualmente, usar flujo “manual laboratorio → Copilot → revisión humana → publicación Healthie”. Resaltar “validación humana” como garantía.

---

## Slide 17 — Tramo 5: Entrega, cierre y continuidad

**Título sugerido**  
Tramo 5 — Entregamos mejor, cerramos mejor y dejamos base para crecer.

**Idea principal**  
Healthie centraliza la entrega y el canal de dudas. Odoo controla cierre, incidencias y estado final del caso. La Fase 1 termina bien, pero deja una base clara para futuras líneas de seguimiento y servicios recurrentes.

**Estructura de contenido recomendada**

**Qué ve el cliente**

- Aviso en Healthie de informe disponible.
- Acceso al PDF final desde portal/app.
- Canal de dudas post-entrega.
- Acceso continuado al documento.

**Qué ocurre en Odoo**

- Estado: informe publicado.
- Estado: pendiente de cierre.
- Registro de incidencias si aparecen.
- Cierre del caso cuando todo queda resuelto.
- Posible marca de interés futuro si aplica.

**Qué ocurre en Healthie**

- Documento final accesible.
- Mensajes post-entrega.
- Formularios de feedback si se activan.
- Grupo “EPI10 - informe entregado”.

**Qué hace el equipo**

- Revisa incidencias.
- Responde dudas si escalan.
- Cierra caso en Odoo.
- Detecta oportunidades futuras si el cliente muestra interés.

**Idea clave**  
Cerramos mejor hoy y dejamos base para crecer mañana.

**Notas para Claude**  
Slide de cierre de journey. Debe conectar operación actual con visión futura sin vender Fase 2 como incluida.

---

## Slide 18 — Fase 2: evolución funcional y modelo de negocio

**Título sugerido**  
La Fase 1 deja preparada una nueva conversación: cómo crecer después del test.

**Idea principal**  
Healthie y la capa operativa permiten que EPI10 no se quede solo en una venta puntual. En fases posteriores, el sistema puede soportar seguimiento, programas, objetivos, contenidos, citas, pagos y servicios recurrentes.

**Oportunidades futuras**

- Programs / Courses: itinerarios de contenidos post-informe.
- Goals: objetivos personalizados y seguimiento.
- Care Plans: recomendaciones accionables después del informe.
- Journal & Metrics: hábitos, síntomas, actividad, peso, sueño u otras métricas.
- Video / citas de seguimiento: acompañamiento experto.
- Pagos y membresías: servicios recurrentes o premium.
- Paywall / entregables adicionales: nuevos productos sobre la misma base.

**Mensaje estratégico**  
Es más fácil vender seguimiento a un cliente que ya ha vivido una buena experiencia, ha recibido valor y confía en EPI10, que captar desde cero un nuevo cliente para el producto inicial.

**Notas para Claude**  
Slide de “food for thought”, no de alcance Fase 1. Debe abrir visión de negocio sin generar confusión contractual. Visualmente puede ser un mapa de oportunidades futuras alrededor del cliente EPI10.

---

## Slide 19 — Decisiones de alcance Fase 1

**Título sugerido**  
Lo que tiene que quedar decidido hoy.

**Idea principal**  
El workshop debe cerrar las decisiones suficientes para pasar de diseño operativo a ejecución: qué entra ahora, qué queda para después y qué información necesitamos para construir.

**Tres bloques**

**Decisiones funcionales**

- Vía A o vía B para la entrada.
- Onboarding Healthie: entra o queda para después.
- Formularios adicionales: cuáles entran.
- Agenda Healthie para la cita del test.

**Decisiones operativas**

- Hitos mínimos que debe ver Odoo.
- Tareas que deben recibir Carmen, Aitor y el equipo.
- Comunicaciones que automatizamos desde Healthie.
- Incidencias que deben tener tratamiento claro.

**Decisiones de frontera / futuro**

- Qué queda expresamente fuera de Fase 1.
- Qué oportunidades de Fase 2 interesan más.
- Qué accesos y materiales se necesitan para ejecutar.

**Notas para Claude**  
Slide tipo checklist de decisiones. Muy ejecutiva. Debe servir para conducir la conversación y cerrar acuerdos, no para explicar tecnología.

---

# Bloque 3 — Cierre y próximos pasos

## Slide 20 — Checklist de objetivos del workshop

**Título sugerido**  
¿Salimos con una Fase 1 lista para ejecutar?

**Idea principal**  
El cierre del workshop debe servir para confirmar que las decisiones críticas están alineadas y que el equipo puede pasar de conversación a ejecución.

**Formato recomendado**  
Checklist visual con respuestas tipo “sí / pendiente / requiere acceso”.

**Checklist**

- ¿Hemos validado el flujo actual de EPI10?
- ¿Hemos identificado dónde se concentra la carga manual?
- ¿Hemos revisado los módulos actuales clave: web, formulario, base de datos, pago y Odoo?
- ¿Hemos elegido la vía de entrada del nuevo flujo: A o B?
- ¿Hemos validado la capa de orquestación operativa integrada en Odoo?
- ¿Hemos validado el papel de Healthie como experiencia cliente?
- ¿Hemos validado el papel del Copilot del informe?
- ¿Hemos separado qué entra en Fase 1 y qué queda para Fase 2?
- ¿Tenemos claros los accesos, materiales y responsables necesarios para empezar?

**Claim de cierre**  
Si estas respuestas están alineadas, la siguiente conversación ya no es de diseño: es de ejecución.

**Notas para Claude**  
Slide muy visual, casi como cierre de reunión. No hacerla densa. Usar checks grandes, una columna principal y quizá una franja final con el claim. Debe sentirse como “hemos aterrizado el proyecto”.

---

## Slide 21 — Próximos pasos

**Título sugerido**  
De workshop a ejecución

**Idea principal**  
Después del workshop, Skilland consolidará decisiones, pedirá los accesos y materiales acordados, actualizará el diseño funcional y preparará la planificación de ejecución.

**Secuencia propuesta**

1. Skilland enviará resumen de decisiones y pendientes.
2. EPI10 compartirá accesos y documentación acordada.
3. Se actualizará el diseño funcional de Fase 1.
4. Se cerrará el alcance operativo final.
5. Se preparará planificación de ejecución: hitos, issues y specs.
6. Comenzamos a construir.

**Materiales/accesos esperados**

- Web / formulario / base de datos.
- Pasarela de pago.
- Odoo actual.
- Healthie.
- Ejemplos de informe.
- Materiales operativos actuales.
- Contactos técnicos o responsables de cada sistema.

**Cierre sugerido**  
Gracias por abrirnos el proceso real. A partir de aquí, el objetivo es convertirlo en una operación más trazable, más automatizada y más fácil de escalar.

**Notas para Claude**  
Slide final sobria y accionable. No convertirla en una lista burocrática. Debe cerrar con sensación de avance: “ya sabemos qué construir y qué necesitamos para hacerlo”.
