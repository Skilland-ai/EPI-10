# Nueva sección Journey Operativo — Guion de slides v0

## Enfoque general

Eliminar las slides actuales 13–17 y sustituirlas por una sección paso a paso.

La nueva sección debe funcionar como walkthrough operativo del nuevo proceso EPI10. No debe comprimir cada tramo en cuatro columnas. Cada slide debe explicar un momento concreto del flujo, con:

* título claro;
* explicación breve;
* visual de sistemas implicados;
* estado resultante;
* idea clave o decisión cuando aplique.

No incluir inventarios técnicos de implementación salvo que ayuden a entender una decisión. No convertirlo en una spec técnica. El objetivo es que Carmen, Aitor y Tomás entiendan qué pasa, quién interviene, qué ve el cliente y qué queda trazado.

---

# Tramo 1 — Entrada y activación del caso

## Slide 13 — Tramo 1: qué se decide aquí

**Título**
Tramo 1 — Entrada y activación del caso

**Claim**
El primer punto crítico es decidir por dónde entra el cliente y cómo se crea el caso operativo.

**Visual sugerido**
Diagrama simple con dos rutas:

* Vía A: Web EPI10 + pago actual → Orquestación → Odoo → Healthie.
* Vía B: Web EPI10 → Healthie → Orquestación → Odoo.

**Contenido clave**

* Hay dos vías posibles para arrancar el proceso.
* En ambas, el resultado debe ser el mismo: caso creado en Odoo y cliente activado en Healthie.
* La decisión del workshop aquí no es técnica infinita: es elegir Vía A o Vía B.

**Idea clave inferior**
Decisión del workshop: elegir Vía A o Vía B.

---

## Slide 14 — Vía A: web y pago actuales

**Título**
Vía A — Web EPI10 + pago actual → Odoo → Healthie

**Claim**
Mantiene la entrada comercial actual y añade automatización justo después del pago.

**Visual sugerido**
Línea simple: Cliente → Web EPI10 → Pago → Orquestación → Odoo → Healthie.

**Qué ve el cliente**

* Entra en la web de EPI10.
* Rellena el formulario principal.
* Paga en la pasarela actual.
* Después del pago recibe acceso o invitación a Healthie.

**Qué ocurre por detrás**

* Odoo crea o actualiza contacto.
* Odoo crea caso operativo EPI10.
* Se registra pago confirmado.
* Se crea o vincula cliente en Healthie.

**Idea clave inferior**
Vía más prudente: cambia menos la captación y activa Healthie desde el inicio post-compra.

---

## Slide 15 — Vía B: Healthie-first

**Título**
Vía B — Healthie-first

**Claim**
Healthie absorbe antes la experiencia: cuenta, formulario, pago y onboarding.

**Visual sugerido**
Cliente → Web comercial → Healthie → Orquestación → Odoo.

**Qué ve el cliente**

* Entra en la web de EPI10.
* Hace clic en comenzar o comprar.
* Pasa a Healthie.
* Crea cuenta, completa intake, paga y sigue el onboarding.

**Qué ocurre por detrás**

* Healthie crea o activa cliente.
* Healthie recoge formulario/intake.
* Odoo recibe datos y crea caso operativo.
* Odoo guarda el vínculo con Healthie.

**Idea clave inferior**
Vía más ambiciosa: más experiencia unificada, pero más cambio operativo/comercial.

---

## Slide 16 — Resultado común del tramo 1

**Título**
Resultado común — El caso arranca sin alta manual

**Claim**
Independientemente de la vía, el caso nace trazado y conectado.

**Visual sugerido**
Tres tarjetas grandes:

* Odoo: caso operativo creado.
* Healthie: cliente activado.
* Equipo: primera tarea operativa.

**Contenido clave**

* Se elimina el alta manual inicial.
* El cliente queda vinculado a Healthie desde el inicio.
* Odoo se convierte en el lugar donde se gobierna el caso.
* El equipo recibe el siguiente paso operativo sin tener que reconstruir contexto.

**Idea clave inferior**
Odoo gobierna el caso. Healthie activa la experiencia. El equipo deja de picar el arranque a mano.

---

# Tramo 2 — Activación Healthie y preparación del test

## Slide 17 — Tramo 2: activación de la experiencia cliente

**Título**
Tramo 2 — Healthie activa al cliente; Odoo prepara la operación

**Claim**
El cliente empieza su experiencia en Healthie mientras Odoo mantiene el control operativo.

**Visual sugerido**
Odoo + Healthie en paralelo, conectados por orquestación.

**Punto de entrada**

* Caso EPI10 creado en Odoo.
* Cliente creado o vinculado en Healthie.
* Cliente invitado a Healthie.

**Contenido clave**

* Healthie abre portal/app, comunicaciones y formularios.
* Odoo mantiene checklist, estados e hitos.
* El equipo solo interviene donde hay revisión o acción física.

**Idea clave inferior**
Healthie recoge experiencia; Odoo ordena operación.

---

## Slide 18 — Cliente recibe acceso a Healthie

**Título**
Paso 2.1 — El cliente recibe acceso a Healthie

**Claim**
El portal deja de ser solo entrega final: empieza a acompañar al cliente desde el inicio.

**Visual sugerido**
Cliente → Healthie. Debajo, Odoo con estado “Healthie creado / invitación enviada”.

**Qué ve el cliente**

* Recibe invitación o enlace de activación.
* Activa su cuenta.
* Entra en portal web o app.
* Ve su espacio EPI10.

**Qué ocurre en Odoo**

* Pago confirmado.
* Healthie creado/vinculado.
* Invitación enviada.
* Portal pendiente de activación o activado.

**Qué ocurre en Healthie**

* Cliente creado.
* Grupo inicial EPI10.
* Portal listo.

**Idea clave inferior**
El cliente ya tiene un espacio propio donde recibir comunicaciones, formularios y documentos.

---

## Slide 19 — Onboarding ampliado o formularios iniciales

**Título**
Paso 2.2 — Onboarding y formularios iniciales

**Claim**
Healthie puede activar formularios y consentimientos sin sobrecargar la web inicial.

**Visual sugerido**
Healthie como tarjeta principal con módulos: consentimiento, formulario, cuestionario, documento.

**Contenido clave**

* Si entra en Fase 1, Healthie lanza onboarding ampliado.
* Si no entra, queda preparado para formularios puntuales.
* Esto no rompe el flujo: es un módulo enchufable.

**Qué puede incluir**

* Consentimiento.
* Formulario adicional.
* Cuestionario de hábitos.
* Subida de documentos si aplica.
* Confirmación de datos básicos.

**Idea clave inferior**
Decisión de workshop: qué onboarding/formularios entran ya y cuáles quedan para después.

---

## Slide 20 — Formularios adicionales para enriquecer el informe

**Título**
Paso 2.3 — Formularios adicionales para enriquecer el informe

**Claim**
La información complementaria puede pedirse en Healthie de forma ordenada y opcional.

**Visual sugerido**
Healthie en el centro con tarjetas de categorías.

**Formularios candidatos**

* Hábitos alimentarios.
* Estilo de vida.
* Objetivos personales.
* Actividad física.
* Restricciones o preferencias.
* Síntomas/contexto.
* Medicación o suplementos si aplica.
* Consentimientos específicos.

**Qué ocurre**

* Healthie solicita formulario.
* Cliente lo completa.
* Healthie registra respuesta.
* Odoo puede marcar el hito como completado.

**Idea clave inferior**
Más información útil para el informe, sin convertir la web inicial en un formulario interminable.

---

## Slide 21 — Odoo actualiza checklist operativo

**Título**
Paso 2.4 — Odoo convierte actividad del cliente en estado operativo

**Claim**
Lo que el cliente completa en Healthie debe traducirse en claridad operativa para el equipo.

**Visual sugerido**
Checklist grande en Odoo.

**Checklist candidato**

* Pago confirmado.
* Cliente Healthie creado.
* Cliente Healthie invitado.
* Portal activado.
* Consentimiento completado.
* Formulario principal recibido.
* Formulario adicional recibido.
* Documentos adicionales recibidos.
* Listo para pedir test.

**Contenido clave**

* No todo tiene que ser estado principal.
* Muchos puntos son checks o hitos.
* Lo importante es que el equipo vea qué falta y qué toca.

**Idea clave inferior**
Odoo no replica todo Healthie: convierte eventos relevantes en hitos operativos.

---

## Slide 22 — Preparación del pedido del test

**Título**
Paso 2.5 — El caso queda listo para pedir el test

**Claim**
Cuando el caso tiene lo necesario, Odoo activa la siguiente tarea operativa.

**Visual sugerido**
Odoo → Equipo EPI10.

**Qué ocurre en Odoo**

* Estado: listo para pedir test.
* Se crea tarea para el equipo.
* El caso pasa de onboarding a operación.

**Qué hace el equipo**

* Revisa si el caso está listo.
* Valida información mínima.
* Prepara el pedido del test.

**Qué ve el cliente**

* Puede recibir mensaje de “caso en marcha” si se decide.
* No necesita intervenir todavía.

**Idea clave inferior**
El flujo pasa de experiencia cliente a operación interna sin perder trazabilidad.

---

# Tramo 3 — Pedido, recepción y cita

## Slide 23 — Tramo 3: decisión de alcance

**Título**
Tramo 3 — Pedido, recepción y cita

**Claim**
Quitamos fricción sin convertir la logística física en un proyecto aparte.

**Visual sugerido**
Tres bloques: Odoo registra hitos mínimos · logística física como caja negra · Healthie agenda cita.

**Principio del tramo**

* Odoo registra hitos operativos mínimos.
* Healthie gestiona comunicación y agenda.
* La logística física entre pedido y recepción queda fuera de Fase 1.

**Idea clave inferior**
No gastamos Fase 1 en tracking físico complejo.

---

## Slide 24 — Casos listos para pedir test

**Título**
Paso 3.1 — Odoo muestra casos listos para pedir test

**Claim**
El equipo ve qué casos están preparados y qué acción toca.

**Visual sugerido**
Vista tipo tablero/lista de Odoo.

**Qué ocurre en Odoo**

* Vista “casos listos para pedir test”.
* Cliente, estado Healthie, estado onboarding, siguiente acción y owner.
* Estado: listo para pedir test.

**Qué hace el equipo**

* Revisa casos listos.
* Decide pedir el test.
* Marca siguiente hito cuando corresponda.

**Idea clave inferior**
Odoo funciona como tablero de próximos pasos, no como simple registro administrativo.

---

## Slide 25 — Test pedido: hito mínimo

**Título**
Paso 3.2 — Test pedido: registramos el hito, no toda la logística

**Claim**
El equipo marca “test pedido” y la logística física queda como caja negra.

**Visual sugerido**
Odoo → caja “logística física externa” → Odoo.

**Qué hace el equipo**

* Pide el test fuera del sistema.
* Usa el proceso/proveedor actual.
* Si agrupa pedidos, lo gestiona como hoy.
* Marca en Odoo “test pedido”.

**Qué NO registramos en Fase 1**

* Tracking.
* Lote.
* Proveedor de envío.
* Fecha estimada.
* Revisiones intermedias.

**Idea clave inferior**
Menos carga para el equipo: registramos solo el hito que aporta trazabilidad real.

---

## Slide 26 — Comunicación durante la espera

**Título**
Paso 3.3 — Comunicación durante la espera

**Claim**
Healthie reduce ansiedad del cliente sin prometer tracking físico.

**Visual sugerido**
Healthie messaging con plantillas.

**Qué ve el cliente**

* Mensaje: “tu caso está en marcha”.
* Respuestas por Healthie si pregunta.
* Aviso de que se le notificará cuando el test esté disponible.

**Qué ocurre en Healthie**

* Plantillas de comunicación.
* Canal de dudas.
* Escalado a revisión humana si hace falta.

**Qué ocurre en Odoo**

* Estado: test pedido / esperando recepción.
* Posible tarea si una consulta requiere revisión.

**Idea clave inferior**
Comunicación profesional sin construir un módulo de tracking físico.

---

## Slide 27 — Test recibido físicamente

**Título**
Paso 3.4 — Test recibido: nuevo hito operativo

**Claim**
La llegada física del test sigue siendo manual, pero queda registrada.

**Visual sugerido**
Equipo → Odoo → Healthie.

**Qué hace el equipo**

* Recibe el test físicamente.
* Identifica el caso.
* Marca en Odoo “test recibido”.
* Introduce barcode si aplica.

**Qué ocurre en Odoo**

* Estado: test pedido / esperando recepción → test recibido / pendiente de cita.
* Fecha de recepción.
* Barcode opcional.
* Listo para agendar cita.

**Idea clave inferior**
El sistema no adivina la logística física: registra el hito cuando ocurre.

---

## Slide 28 — Agenda de cita en Healthie

**Título**
Paso 3.5 — Healthie permite agendar la cita del test

**Claim**
Cuando el test está disponible, el cliente agenda sin depender de mensajes cruzados.

**Visual sugerido**
Odoo → Healthie → Cliente → cita confirmada → Odoo.

**Qué ve el cliente**

* Aviso: “tu test ya está disponible”.
* Acceso a agenda.
* Selección de día y hora.
* Confirmación y recordatorios.

**Qué ocurre en Healthie**

* Appointment.
* Recordatorios.
* Calendario.
* Comunicación con el cliente.

**Qué ocurre en Odoo**

* Cita recibida/sincronizada.
* Estado: cita agendada.
* Notificación interna al equipo.

**Idea clave inferior**
Healthie gestiona la cita; Odoo mantiene el estado operativo.

---

# Tramo 4 — Cita, laboratorio, Copilot e informe

## Slide 29 — Tramo 4: del test al informe validado

**Título**
Tramo 4 — Del test realizado al informe validado

**Claim**
Este tramo protege el producto principal: el cliente solo recibe informe final validado.

**Visual sugerido**
Equipo → laboratorio manual → Copilot → revisión humana → Healthie.

**Principios del tramo**

* TellmeGen sigue manual.
* Copilot genera borradores.
* La revisión humana es obligatoria.
* Healthie solo publica el informe final validado.

**Idea clave inferior**
No publicamos resultados brutos. Publicamos criterio experto validado.

---

## Slide 30 — Cliente acude y se realiza el test

**Título**
Paso 4.1 — Cita realizada y test completado

**Claim**
La cita pasa de experiencia cliente a hito operativo.

**Visual sugerido**
Healthie appointment → Equipo → Odoo.

**Qué ve el cliente**

* Acude a la cita.
* Se realiza el test.
* Recibe confirmación si se decide.

**Qué hace el equipo**

* Recibe al cliente.
* Realiza el test.
* Confirma barcode si aplica.
* Marca en Odoo “test realizado”.

**Qué ocurre en Odoo**

* Estado: cita agendada → test realizado / muestra pendiente de envío.

**Idea clave inferior**
La acción física sigue siendo humana; el hito queda trazado.

---

## Slide 31 — Muestra enviada al laboratorio

**Título**
Paso 4.2 — Muestra enviada al laboratorio

**Claim**
El envío se registra como hito; la logística física sigue fuera de Fase 1.

**Visual sugerido**
Equipo → TellmeGen/Laboratorio, con Odoo registrando hito.

**Qué hace el equipo**

* Prepara la muestra.
* Envía al laboratorio.
* Marca en Odoo “muestra enviada”.

**Qué ocurre en Odoo**

* Estado: muestra enviada / esperando laboratorio.
* Fecha de envío.
* Lab status: esperando resultados/entregable.

**Qué ve el cliente**

* Mensaje: “tu muestra ha sido enviada; te avisaremos cuando tu informe esté disponible”.

**Idea clave inferior**
No prometemos tracking ni fecha exacta: mantenemos comunicación útil y control operativo.

---

## Slide 32 — Espera de laboratorio

**Título**
Paso 4.3 — Espera de laboratorio

**Claim**
El laboratorio procesa fuera del sistema, pero Odoo mantiene el estado y Healthie canaliza dudas.

**Visual sugerido**
TellmeGen como caja externa manual + Odoo estado + Healthie comunicación.

**Qué ocurre**

* TellmeGen/laboratorio procesa la muestra.
* Odoo mantiene “muestra enviada / esperando laboratorio”.
* Healthie puede responder dudas con plantillas.
* Si hace falta, se crea tarea de revisión.

**Qué NO ocurre**

* No hay API TellmeGen.
* No hay polling automático.
* No se avisa al cliente de resultados brutos.

**Idea clave inferior**
TellmeGen queda manual, pero ya no queda fuera del mapa operativo.

---

## Slide 33 — Entregable TellmeGen listo

**Título**
Paso 4.4 — Entregable TellmeGen listo: se activa el equipo, no el cliente

**Claim**
Cuando el laboratorio tiene el entregable, todavía no hay nada que publicar al cliente.

**Visual sugerido**
TellmeGen → Equipo → Odoo.

**Qué ocurre**

* TellmeGen/laboratorio indica que el entregable está listo.
* El equipo lo detecta o recibe aviso.
* Odoo pasa a “entregable disponible / pendiente Copilot”.
* Se crea tarea: descargar entregable y ejecutar Copilot.

**Qué NO ocurre**

* No se avisa al cliente.
* No se publica nada en Healthie.
* No se cambia a “cliente listo”.

**Idea clave inferior**
El hito interno no es entrega cliente: es activación del proceso de informe.

---

## Slide 34 — Descarga manual y subida al Copilot

**Título**
Paso 4.5 — El equipo sube el entregable al Copilot

**Claim**
TellmeGen sigue manual, pero el paso queda integrado en el flujo.

**Visual sugerido**
TellmeGen → Equipo → Copilot/Odoo.

**Qué hace el equipo**

* Entra en TellmeGen.
* Descarga PDF/export.
* Lo sube a la interfaz Copilot/Odoo.
* Ejecuta generación asistida.

**Qué ocurre en Odoo**

* Archivo original subido.
* Copilot en ejecución.
* Caso vinculado a la generación.

**Idea clave inferior**
No automatizamos TellmeGen; automatizamos lo que pasa después del entregable.

---

## Slide 35 — Copilot genera borradores

**Título**
Paso 4.6 — Copilot genera borradores internos

**Claim**
La IA no entrega el informe: prepara material revisable para el equipo.

**Visual sugerido**
Copilot → borradores → Odoo.

**Qué ocurre**

* Copilot procesa entregable + inputs disponibles.
* Genera uno o varios borradores.
* Guarda borradores asociados al caso.
* Odoo cambia a “borradores generados / pendiente revisión humana”.

**Qué ve el cliente**

* Nada todavía.

**Idea clave inferior**
Borrador no es informe. El control sigue en EPI10.

---

## Slide 36 — Revisión humana y validación

**Título**
Paso 4.7 — Revisión humana obligatoria

**Claim**
La versión final siempre la valida EPI10.

**Visual sugerido**
Borradores → Equipo → informe validado.

**Qué hace el equipo**

* Revisa borradores.
* Corrige si hace falta.
* Descarta versiones malas.
* Marca una versión como válida.

**Qué ocurre en Odoo**

* Informe final validado.
* Validated by.
* Fecha de validación.
* Siguiente paso: publicar en Healthie.

**Idea clave inferior**
La IA ayuda a escalar; el criterio profesional no se sustituye.

---

## Slide 37 — Publicación del informe final

**Título**
Paso 4.8 — Informe final publicado en Healthie

**Claim**
Solo cuando el informe está validado, se activa la entrega al cliente.

**Visual sugerido**
Odoo → Healthie → Cliente.

**Qué ocurre en Odoo**

* Sube/publica PDF final en Healthie.
* Cambia grupo/estado del cliente.
* Registra documento publicado.

**Qué ocurre en Healthie**

* Documento final disponible.
* Mensaje de informe disponible.
* Cliente accede desde portal/app.

**Qué ve el cliente**

* Aviso de informe disponible.
* PDF final validado.
* Acceso continuado.

**Idea clave inferior**
El cliente no ve resultados brutos: ve informe final validado.

---

# Tramo 5 — Entrega, cierre y continuidad

## Slide 38 — Tramo 5: entrega y cierre operativo

**Título**
Tramo 5 — Entrega, cierre y continuidad

**Claim**
La entrega no termina al subir el PDF: hay soporte, cierre e incidencias.

**Visual sugerido**
Healthie entrega + Odoo cierre + feedback/futuro.

**Punto de entrada**

* Informe validado.
* PDF publicado.
* Cliente avisado.
* Caso listo para cierre operativo.

**Idea clave inferior**
Healthie mantiene la experiencia; Odoo cierra el caso.

---

## Slide 39 — Cliente accede al informe

**Título**
Paso 5.1 — El cliente accede al informe en Healthie

**Claim**
El informe queda centralizado en un portal/app, no disperso por canales sueltos.

**Visual sugerido**
Healthie documento → cliente.

**Qué ve el cliente**

* Notificación de informe disponible.
* Acceso al PDF final.
* Consulta desde portal/app.
* Acceso continuado.

**Qué ocurre en Odoo**

* Documento Healthie registrado.
* Fecha de publicación.
* Estado: informe publicado.

**Idea clave inferior**
La entrega gana presencia, trazabilidad y continuidad.

---

## Slide 40 — Dudas post-entrega

**Título**
Paso 5.2 — Dudas post-entrega en un canal centralizado

**Claim**
Healthie se convierte en canal profesional de soporte post-informe.

**Visual sugerido**
Cliente ↔ Healthie ↔ Equipo/Odoo.

**Qué ocurre**

* Cliente pregunta por Healthie.
* Plantillas resuelven dudas simples.
* Si requiere revisión, se crea tarea o incidencia.
* Odoo mantiene visibilidad operativa.

**Ejemplos**

* No puede acceder.
* Tiene duda sobre el informe.
* Pide corrección.
* Reporta problema de documento.

**Idea clave inferior**
El soporte deja de estar disperso entre correos, WhatsApp y memoria.

---

## Slide 41 — Incidencias y correcciones

**Título**
Paso 5.3 — Incidencias y correcciones bajo control

**Claim**
Si algo falla, el caso no se pierde: se abre, resuelve y registra.

**Visual sugerido**
Odoo incidencia → Equipo → Healthie republicación.

**Incidencias típicas**

* Cliente no puede acceder.
* No ve el informe.
* PDF equivocado.
* Solicitud de corrección.
* Fallo de publicación.
* Fallo de notificación.

**Qué ocurre**

* Se abre incidencia.
* Se asigna owner.
* Se corrige si aplica.
* Se republica nueva versión.
* Cliente recibe aviso.

**Idea clave inferior**
Cerrar bien también significa gestionar excepciones.

---

## Slide 42 — Cierre operativo en Odoo

**Título**
Paso 5.4 — Cierre operativo del caso

**Claim**
El caso se cierra cuando entrega, notificación e incidencias están resueltas.

**Visual sugerido**
Checklist de cierre en Odoo.

**Criterios de cierre**

* Informe validado.
* Informe publicado en Healthie.
* Cliente notificado.
* Sin incidencia abierta.
* Caso revisado por el equipo.

**Qué ocurre en Odoo**

* Estado: pendiente cierre → cerrado.
* Fecha de cierre.
* Cerrado por.
* Posible marca de interés futuro.

**Idea clave inferior**
El cierre ya no depende de “me acuerdo de que estaba enviado”.

---

## Slide 43 — Puerta a continuidad

**Título**
Paso 5.5 — La puerta a continuidad queda abierta

**Claim**
Fase 1 termina el caso, pero deja preparada la conversación de seguimiento.

**Visual sugerido**
Cliente EPI10 → feedback → interés futuro → Fase 2.

**Opciones ligeras**

* Formulario feedback.
* Interés en seguimiento.
* Grupo “informe entregado”.
* Grupo “interesado seguimiento”.
* Señal para futura acción comercial.

**Conexión con Fase 2**

* Programs.
* Goals.
* Care Plans.
* Metrics.
* Citas de seguimiento.
* Membresías.

**Idea clave inferior**
Cerramos mejor hoy y dejamos base para crecer mañana.

---

# Cierre de la sección journey

## Slide 44 — Resumen del journey operativo

**Título**
Journey operativo Fase 1 — de extremo a extremo

**Claim**
Cinco tramos, una lógica: menos dispersión, más trazabilidad, mejor experiencia.

**Visual sugerido**
Usar el diagrama global ya aprobado como cierre de sección, quizá más pequeño o con foco en los 5 tramos.

**Resumen**

* Tramo 1: entrada y activación.
* Tramo 2: Healthie y preparación test.
* Tramo 3: pedido, recepción y cita.
* Tramo 4: laboratorio, Copilot e informe.
* Tramo 5: entrega, cierre y continuidad.

**Idea clave inferior**
Odoo gobierna el caso operativo. Healthie gobierna la experiencia cliente. Copilot acelera borradores con revisión humana.

---

# Nueva numeración del deck

La sección journey sustituye las slides 13–17 actuales.

Quedaría así:

* Slide 13 a 44: nuevo journey paso a paso.
* La antigua slide 18 “Fase 2” pasa a Slide 45.
* La antigua slide 19 “Decisiones” pasa a Slide 46.
* La antigua slide 20 “Checklist” pasa a Slide 47.
* La antigua slide 21 “Próximos pasos” pasa a Slide 48.
