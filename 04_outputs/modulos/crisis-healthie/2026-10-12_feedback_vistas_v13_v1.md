# Feedback de Raúl vista por vista · segunda ronda (v1.3)

Fecha: 2026-10-12, 19:00 · Sobre la instancia con main e4e2b66 (v1.2.1) · Portal y back office

## Portal

### 1. Login
- **OK.** Nada que cambiar.

### 2. Inicio «Tu espacio EPI10»
- **En general muy bien**; las tarjetas de abajo (documentos, citas, mensajes, informe, tienda) bien.
- **Mejorar el componente de pasos** de la tarjeta de fase: tal como está (cinco barras finas con etiqueta) no transmite que son pasos ni que los cuatro primeros están completos al 100 % y solo falta el informe. Hace falta un stepper reconocible: nodos numerados o con check, conectores entre ellos, el paso actual destacado y los completados marcados.
- Dos ajustes, no más.

### 3. Mis documentos
- **Muy bien**: indica sola lo que falta y lo hecho. No tocar el diseño.
- **Defecto:** los botones «Ver» de cada fila no llevan a ningún sitio. Pulsar el título (Consentimiento, Cuestionario) sí abre la tarea; «Ver» debe hacer lo mismo.

### 4. Consentimiento (tarea firmable)
- **A grandes rasgos muy bien.**
- **Componente de pasos (Leer · Aceptar · Firmar · Enviar):** mismo problema que en el inicio; cuatro barras sueltas no se leen como pasos contiguos ni como completados. Mismo stepper que se decida para el inicio (nodos con check, conectores, actual destacado).
- **Visor del documento:** no da sensación de estar viendo un documento; parece un bloque pegado. Hace falta un visor reconocible: hoja con proporción de papel y sombra, marco o barra de visor (título, páginas o «1 de 1», zoom o descargar), fondo gris de visor, el texto maquetado como documento (membrete, fecha, párrafos, pie), y el «Fin del documento» integrado como pie de página.
- **Casillas de aceptación:** están bien, pero faltan opciones que tiene que decir EPI10 (SKI2-184): dejar el bloque preparado para N casillas definidas por el equipo.
- **Firma:** no se entiende cómo se firma; «es súper raro». Hay que guiar: en estado pendiente, una zona de firma clara con texto «Firma aquí con el dedo o el ratón», línea base, icono de lápiz y ayuda; botones «Deshacer» y «Borrar» visibles; al firmar, el sello. En estado firmado (lo que se ve ahora), la firma dentro de un marco de «documento firmado» con fecha y nombre, no un trazo suelto en una caja blanca.

### 5. Cuestionario de hábitos
- **A grandes rasgos bastante bien.** Sin cambios por ahora.

### 6. Navegación (transversal, todas las vistas del portal; revisar también el back office)
- **Regla:** en todas las vistas tiene que ser facilísimo, como en una app de móvil, (a) volver atrás a la vista anterior, (b) volver a la «carpeta primaria» de la sección en la que estoy (Mis documentos, Mensajes, Mi informe, Citas) y (c) volver al espacio (inicio). Hoy hay vistas huérfanas: en una tarea no hay forma visible de ir a «Mis documentos» salvo el enlace de arriba, y en «Mis documentos» no hay enlace a la carpeta en la que estoy.
- **Bug:** en «Mis documentos», el enlace «Volver a tu espacio» de la cabecera no va al inicio: vuelve a la vista anterior (el cuestionario). Es un `history.back()` disfrazado de enlace. Callejón sin salida.
- **Solución unificada (decidir una y aplicarla en todo):** el enlace de cabecera siempre apunta a la carpeta madre con URL fija (nunca al historial); miga de pan corta bajo la cabecera: «Tu espacio › Tus documentos › Consentimiento», cada tramo pulsable; el botón atrás del navegador o del móvil sigue haciendo lo suyo; en móvil, además, un botón de inicio siempre visible. Raúl: «invéntate algo que tenga sentido, pero resuelto; no tres botones burdos».

### 7. Mensajes
- **Espectacular.** Nada que cambiar.

### 8. Mi informe
- **Lista:** el botón «Abrir» de la fila no es un enlace (o no se ve como tal); al pulsarlo «queda raro». Mismo defecto que «Ver» en documentos: el botón tiene que abrir el visor, igual que el título.
- **Visor:** «Descargar PDF» funciona. Zoom funciona. **Bug:** el botón de pasar página (‹ ›) va a ratos: a veces pasa, a veces no. Revisar la isla `visor-pdf.mjs` (estado de página, doble handler, scroll frente a botón).
- El PDF generado por el monolito tiene algún fallo de maquetación (logo pixelado y deformado en la portada, texto de la portada cortado por la barra del visor). Es del informe, no del portal: anotar para la plantilla de informes (SKI2-211).
- Resto de la vista, bien.

### 9. Citas
- **Perfecta.** Nada que cambiar.

### 10. Ajustes (menú de usuario)
- **Vista floja**, sin capa EPI10: tres enlaces sueltos en una tarjeta. Rehacer con la base.
- **Quitar «Tema»**: la clienta no elige tema.
- **«Mi firma» (firma guardada del núcleo):** así es como OpenEMR espera que se firme (guardar una firma en ajustes y luego «usar la actual» en el documento). **No gusta:** está escondido; la clienta no puede firmar el consentimiento sin pasar antes por ajustes. La firma tiene que hacerse dentro de la propia tarea (dibujar ahí, sin paso previo), y «Mi firma» desaparece de ajustes o queda como opcional.
- **«Cambiar usuario o contraseña»:** modal heredado de OpenEMR, en inglés y feo. Rehacer en español con la base (usuario, contraseña nueva y confirmación, contraseña actual), misma lógica del núcleo por debajo.

### 11. Onboarding guiado (nuevo, prioridad para la demo)
- **Raúl:** el primer onboarding tiene que ir «por carriles»: tras pagar en NutriWell se redirige o se invita a crear la cuenta del portal; al entrar, el portal lleva de la mano por los pasos obligatorios, en orden: 1 consentimiento, 2 cuestionario de hábitos, 3 **formulario logístico del pedido del test** (nombre y apellidos del destinatario, dirección de entrega, franja horaria preferida para el repartidor; lo que necesita el proveedor), y solo después queda libre en el panel. Lo que hoy existe: pago → alta automática → correo con enlace → consentimiento y cuestionario asignados; en Odoo se crea «Pedir test» al completar D3. Lo que falta: el carril forzado en el portal, el formulario logístico (y que llegue al equipo: ficha de OpenEMR y/o actividad en Odoo, y una plantilla para que Aitor lo pida por chat si falta), y la redirección desde el pago a la creación de cuenta.
- Plan acordado: terminar el repaso del back office; el orquestador reúne todo el feedback y lanza agentes para aplicarlo; después, Raúl y el orquestador pulen el paso a paso del onboarding. Antes de la demo de mañana.

## Back office

### 12. Login del back office
- Espacio muy desaprovechado («cuatrocientas hectáreas vacías»): subir el tamaño del logo y de los textos del panel azul y del formulario para que llenen la pantalla.

### 13. Inicio (cabecera y selector)
- **Logo EPI10 de la barra:** muy pequeño y al pulsarlo lleva a la página de OpenEMR. Hacerlo más grande y que lleve al inicio EPI10.
- **Cinta de menús del núcleo** (Calendario, Finder, Flujo, Recalls, Mensajes, Paciente, Honorarios, Modules, Procedimientos, Administrador, Informes, Varios, menús emergentes): **esconderla entera dentro de Ajustes**. Con la persona `operaciones.prueba` aparece completa: comprobar si el menú por rol («EPI10 Operaciones») se ha perdido en la instalación o si no se aplica; en cualquier caso la decisión es que la cinta no se vea y que el selector de tarjetas sea la única navegación.
- **Botón «Mensajes» (sobre) de arriba a la derecha:** abre el Message Center antiguo de OpenEMR. Quitarlo; solo el chat nuevo.
- **Botón «Portal» de arriba a la derecha** (Portal Mail, Audits, Payments): no aporta nada que queramos; meterlo en Ajustes o quitarlo.
- **Ajustes de usuario** (configuración nativa): se deja como está por ahora, aunque sea feo.
- La parte de abajo (tarjetas del selector y bloque «Hoy») está bien; con la parte de arriba limpia lucirá más.
- Nota: el repaso se hizo con `admin`, por eso se ve la cinta completa; con `operaciones.prueba` sale el menú «EPI10 Operaciones». La decisión de esconder la cinta aplica a todos los usuarios.

### 14. Clientes (lista)
- Se deja así por ahora. **Deseo para después:** una vista tipo kanban por fase.

### 15. Navegación del back office (fallo gordo de UI, prioridad)
- Al abrir una clienta desde la lista, la pestaña de OpenEMR «Clientes» se convierte en la de Lucía y no hay forma de volver a la lista salvo pulsar la pestaña «Inicio». La clienta queda «seleccionada» en la cabecera del núcleo (foto, nombre, «Seleccione encuentro») aunque vuelvas al inicio.
- Las pestañas del núcleo (barra azul con «Inicio · Equipo EPI10», «Lucía…») son raras para navegar. Unificar con la misma regla que el portal: enlace fijo a la carpeta madre en cada vista (ya existe «← Clientes» en la ficha, pero hace falta también en la lista hacia el inicio), miga de pan y, si es viable, abrir ficha y lista en la misma pestaña con historial normal, y ocultar la cabecera de paciente del núcleo (foto, «Seleccione encuentro», ×) cuando se esté en vistas EPI10. Si ocultar las pestañas del núcleo es mucho lío, al menos que la ficha no «secuestre» la pestaña de la lista. Raúl: «si se puede mejorar para mañana, bien; si es mucho rollo, lo miramos».

### 16. Ficha de la clienta
- **Muy bien**: cabecera, fase, pestañas (Resumen, Documentos, Mensajes, Citas, Datos) y el historial de actividad abajo. No tocar mucho.
- **Duda de producto:** quién rellena los datos (teléfono, dirección, kit…). Cuanto más pueda poner la clienta desde su portal y menos Aitor, mejor: conectar con el onboarding guiado (formulario de datos personales y logística en el portal) y que la ficha los muestre.

### 17. Mensajes del equipo
- **Muy bien**, sin cambios en el chat. Todo el equipo ve todas las conversaciones: decisión correcta.
- **Nuevo: plantillas de mensaje.** La sección Mensajes pasa a tener dos partes: «Conversaciones» (lo de ahora) y «Plantillas». En Plantillas se crean, editan y ordenan mensajes predefinidos (los del onboarding y los que haga falta). En una conversación, Aitor elige una plantilla con un selector en el compositor y la envía tal cual o retocada. El monolito seguirá enviando solo las automáticas que tenga definidas (hard-coded, sin motor de workflows configurable por ahora); lo bajo demanda lo hace la persona desde la interfaz. Más adelante, enganchar plantillas a pasos del workflow.

### 18. Calendario del back office
- Bastante peor que el del portal. Rehacerlo con los componentes de EPI10 UI, mismas opciones que el nativo (día, semana, mes, equipo, huecos «En consulta» y «Fuera de consulta», crear cita) pero con la estética del calendario del cliente. Y, otra vez, sin forma de volver atrás: la misma solución de navegación.

### 19. Documentos e informes (tarjeta del selector)
- Hoy redirige a «Clientes», porque los documentos viven en la ficha de cada clienta (diseño del área 7). Raúl pregunta si es lo correcto: **no del todo**. Propuesta: vista propia «Documentos e informes» con dos listas transversales, «Por revisar» (consentimientos y cuestionarios enviados) e «Informes por publicar / publicados», cada fila con la clienta y enlace a su ficha › Documentos. El bloque «Hoy» del inicio ya calcula esos datos.

## Reparto para aplicar (lanzado el 12 oct por la noche)
- **Agente P (portal):** stepper reconocible (inicio y tareas), «Ver»/«Abrir» como enlaces, visor de documento con aspecto de documento, firma guiada dentro de la tarea sin pasar por ajustes, ajustes rehechos (sin Tema, cambio de usuario y contraseña en español), bug de pasar página en el visor PDF.
- **Agente N (navegación y cabeceras, portal y back office):** enlace de cabecera a la carpeta madre con URL fija, miga de pan, sin `history.back`; en el back office, que la ficha no secuestre la pestaña de la lista, ocultar la cabecera de paciente del núcleo en vistas EPI10, cinta de menús y botones Mensajes/Portal escondidos (para todos los usuarios), logo mayor que lleva al inicio, login del back office con más presencia.
- **Agente B (back office funcional):** plantillas de mensaje (sección + selector en el compositor), vista «Documentos e informes», calendario del equipo con EPI10 UI.
- **Onboarding guiado:** lo diseñan Raúl y el orquestador a continuación; se implementa después con el monolito.
