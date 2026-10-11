# Feedback de Raúl vista por vista: portal y back office de OpenEMR

Fecha: 2026-10-11 · Linear: SKI2-208 → SKI2-209 · Instancia: http://localhost:4896 (tema EPI10 y módulo `oe-module-epi10` del prototipo de SKI2-207)

Prioridad para la demo del 13 oct: **P1** = imprescindible el martes · **P2** = conviene · **P3** = después de la demo.

## Resumen ejecutivo

- **Veredicto global de Raúl:** la funcionalidad está, la interfaz no. Portal: «de las peores», «horrible», «foro de 2005», «aplicación de 2002». Back office: «del año del catapún», «abrumador, inusable», «me pongo de mal humor».
- **Lo que se salva:** el inicio del portal («no está del todo mal», se conserva el planteamiento de tarjetas), el calendario del back office («se puede quedar así») y la tienda (redirige a la web de EPI10, sin trabajo).
- **Las cinco decisiones de Raúl:**
  1. **Una base de interfaz moderna y open source para toda la app** (shadcn/ui o plantilla de nicho de portal de salud), no retoques pantalla a pantalla.
  2. **Portal y back office comparten esa base.** El portal tiene que estar **precioso**; el back office tiene que ser **usable**.
  3. **Nunca se mezclan idiomas.** Todo en español.
  4. **Por omisión, no por adición:** al cliente solo se le enseña lo que EPI10 le desbloquea; a Aitor solo los menús y campos que EPI10 usa. Lo demás se esconde (no se borra), accesible desde Ajustes.
  5. **La primera vista del back office es un selector de funcionalidades**, como el inicio del portal; nunca el calendario.
- **Trabajo en áreas temáticas** (abajo), con un agente por área. El área 0 va primero.

## Organización por áreas temáticas (propuesta del orquestador, 11 oct)

0 · Base de interfaz y armazón (primero) · 1 · Acceso e inicio · 2 · Tareas y documentos firmables · 3 · Chat · 4 · Biblioteca e informe · 5 · Calendario · 6 · Tienda · 7 · Back office de Aitor

## Parte 1 · Portal del cliente (Lucía)

### 1.1 Acceso (login)
- **No me gusta:** aunque lleva el tema EPI10, se ve que es un formulario antiguo con un retoque, no una app moderna. Además pide tres campos (usuario, contraseña y correo), que es mucho para entrar.
- **Idea, y la conclusión general desde la primera vista:** hay que buscar **una base de interfaz open source y moderna para TODA la aplicación**, montada encima de OpenEMR, en lugar de retocar pantalla por pantalla. Dos líneas de búsqueda:
  - **en general:** shadcn/ui y kits de componentes o plantillas hechos sobre él;
  - **de nicho:** plantillas o proyectos open source de **portal de pacientes o cliente de salud**, al estilo Healthie.
- **Prioridad:** P1. Condiciona todo el lavado de cara (SKI2-209).
### 1.2 Inicio · «Tu espacio EPI10»
- **Me gusta:** «No está del todo mal». La estructura en tarjetas (documentos, citas, mensajes, informe, tienda) y los textos sirven como base.
- **Idea:** que la nueva base de interfaz la lleve a «pinta de app moderna súper guapa», sin cambiar el planteamiento.
- *Observaciones del orquestador para el arquitecto, sin validar por Raúl:*
  - la cuadrícula es irregular: Ajustes, Ayuda y Cerrar sesión ocupan tarjetas grandes y vacías, mejor en un menú de usuario;
  - no se ve en qué fase está el caso ni cuál es el siguiente paso de Lucía.
- **Prioridad:** P2. Se conserva el planteamiento; el pulido llega con la nueva base.
### 1.3 Mis documentos («Documentos y cuestionarios»)
- **No me gusta:**
  - **es fea** y **no se entiende qué hay que hacer**: «si yo fuera cliente, no me entero»;
  - **no hay jerarquía**: lo más grande es el saludo («Hola, Lucía Peñalver…») y las instrucciones;
  - **lo importante está escondido**: «Elegir documento», que es la acción principal, va arriba como un botón más entre Firma, Historial, Recargar, Adjuntar y Volver;
  - la cabecera está duplicada («Volver a mi espacio» dos veces) y aparece una barra «Editando» sin sentido para el cliente.
- **Idea:**
  - tiene que ser **didáctica**: una lista clara de lo que le toca a Lucía, por ejemplo «1. Consentimiento · pendiente» y «2. Cuestionario de hábitos · pendiente», cada uno con su estado y su botón de acción;
  - el resto (historial, adjuntar, recargar) queda en segundo plano;
  - las instrucciones, cortas o integradas en cada paso.
- **Prioridad:** P1. Es la primera tarea que hace el cliente tras pagar.
### 1.4 Consentimiento (firma)
- **Veredicto: «de las peores», «horrible», «no tiene ni pies ni cabeza».** Es de las primeras vistas que ve el cliente y no se entiende nada.
- **No me gusta:**
  - **no da la sensación de estar firmando un documento**: ni qué firmo, ni cómo se firma, ni qué tengo que hacer después;
  - **el CTA, «Enviar a EPI10», está perdido** como un botón más de la barra (Firma, Elegir documento, Guardar borrador, Enviar, Historial, Recargar, Volver);
  - ruido técnico a la vista del cliente: «Editando… New Version: Dated:… Status: In Review», «Borrar documento» en rojo y dos botones «Cerrar»;
  - textos mezclados en inglés.
- **Idea:**
  - **por fuera, la misma interfaz que el resto de la app**, para que se note que seguimos en ella;
  - **por dentro, un visor de documento**: el documento como un papel legible, la zona de firma clara («Firma aquí» con el dedo o el ratón) y **un único CTA grande**, «Firmar y enviar a EPI10»;
  - pasos claros: leer → aceptar → firmar → enviar → confirmación;
  - **ver cómo lo resuelven las aplicaciones open source** de formularios, consentimiento y firma, porque esto ya lo tiene resuelto alguien.
- **Prioridad:** P1. Primera acción del cliente y núcleo legal (consentimiento para datos de salud).
### 1.5 Cuestionario de hábitos
- **Veredicto:** algo mejor que el consentimiento, porque rellenar opciones de un formulario se entiende solo, pero **tiene los mismos problemas, que son comunes a todas las vistas de documentos**.
- **No me gusta:**
  - **no hay título claro** de qué estoy haciendo ni por qué; el «Documento: Hábitos de vida EPI10» parece un campo editable;
  - **no me guía «de la manita»**: ni progreso, ni pasos, ni por qué se piden estos datos;
  - **la interfaz no es coherente** con el resto de la app;
  - **el CTA no está claro**: es la misma barra de siete botones;
  - **ruido técnico**: «Editando… New Version… Status: In Review», Recargar e Historial;
  - textos en inglés en las opciones («Yes»).
- **Idea:** la misma plantilla de vista de documento que en 1.4:
  - por fuera, la app;
  - título y propósito claros («Cuéntanos tus hábitos para personalizar tu informe · 2 min»);
  - una pregunta por pantalla o por bloques, con **barra de progreso**;
  - un único CTA, «Enviar a EPI10»;
  - pantalla de confirmación.
- **Prioridad:** P1. Común con 1.3 y 1.4: **una sola plantilla de «documento o tarea» para consentimiento, cuestionario y lo que venga.**
### 1.6 Mensajes
- **Veredicto:** «en teoría no está tan mal», pero **no parece un componente de mensajería moderno**. Funciona, pero «si se lo enseño a Carmen, me lo va a echar para atrás».
- **No me gusta:**
  - es una **bandeja de correo** (Recibidos, Sent, All, Archivados, Acciones, «1–0 of 0»), no un chat;
  - textos en inglés: Sent, All, «Compose New Message», To;
  - **la ventana de «Escribir mensaje» es lo peor**: destinatario, asunto, barra de formato (negrita, cursiva, listas…) y un área enorme. «Parece que escribes en un foro de internet de 2005, un foro hispano».
- **Idea:**
  - un **componente de chat moderno**: un hilo único con el equipo de EPI10, burbujas, caja de texto abajo, adjuntar, enviado o leído y hora;
  - sin asunto ni destinatario, que siempre es «el equipo»;
  - no hace falta que sea en tiempo real, **pero tiene que parecerlo**. Una actualización periódica sirve;
  - investigar **componentes open source de chat** y hasta qué punto se puede **camuflar el backend** de OpenEMR (mensajes `onsite_mail` con asunto) detrás de una interfaz de chat. Probablemente el asunto se fija por defecto y el hilo se construye agrupando.
- **Prioridad:** P1. Carmen lo va a ver, y es la principal vía de contacto con el cliente.
### 1.7 Mi informe
**Es una de las vistas más importantes: «es el delivery de nuestro producto».**

**a) Menú «Mi informe»** (Resumen de mi historial · Descargar mis documentos · Ayuda)
- **Quitar «Resumen de mi historial».** Es el resumen clínico de OpenEMR (datos demográficos, seguro, facturación, alergias, medicamentos…): no aporta nada y no queremos enseñárselo al cliente.
- Además, desde «Resumen de mi historial» **no hay botón para volver** a Mi informe. Solo se puede salir a «Tu espacio EPI10».
- **Regla:** al cliente solo se le enseña lo que EPI10 le **desbloquea ad hoc**: el informe final y lo que decidamos.

**b) «Descargar mis documentos»**
- **Horrible e ininteligible**, nada didáctica, con **inglés por todas partes**: «Download Documents From Medical Record», «Medical Record/», «Onsite Portal/Reviewed/», «Your files will download as a zip file».
- **Lo peor de todo:**
  - **solo se puede descargar**;
  - **y encima en un ZIP**: «usabilidad de mierda, una aplicación del año 2002».
- **Idea:**
  - **una biblioteca de «Mis documentos»** con el **estado de interacción** de cada uno: nuevo o sin ver, visto, pendiente de acción. Que avise cuando hay algo nuevo o pendiente (notificación o insignia);
  - un **visor de PDF integrado** para leer el informe sin descargarlo, y descarga directa en PDF como opción secundaria, **nunca en ZIP**;
  - buscar cómo resuelven las mejores interfaces la lista de documentos con estados (layout de referencia).
- **Prioridad:** P1. Es la entrega del producto.

> Nota técnica: el módulo 1.0.0 de SKI2-210 ya restringe esta lista a los informes publicados por el contrato (R4) y cambia el ZIP por un PDF directo. Falta el visor y los estados.
### 1.8 Citas
- **Veredicto:** «No le vamos a sacar mucho partido»: la cita es opcional en el test mixto. **No es lo más prioritario, pero estaría guay hacerlo bien.**
- **No me gusta:**
  - listas vacías (Future / Past Appointments);
  - **inglés por todas partes**: Future Appointments, Schedule A New Appointment, No Past Appointments, Request New Appointment, See Availability, Cancel;
  - el formulario de petición es técnico: «Facultativo», hora a mano con AM/PM, duración y «Razón».
- **Idea:**
  - una vista como la de Healthie: un **componente de calendario interactivo** con bloques de hueco disponibles, y las acciones (reservar, ver mi cita) **incrustadas en el propio calendario**;
  - reservar = elegir día → elegir hueco libre → confirmar. Sin campos técnicos.
- **Prioridad:** P2 (Raúl: «no nos cuesta nada poner a un agente»). Área temática propia: **calendario interactivo** enganchado a las citas de OpenEMR.
### 1.9 Tienda EPI10
- **Decisión:** se deja como está. La tarjeta **redirige a la web de EPI10**; no se construye tienda dentro del portal.
- **Prioridad:** sin trabajo. Solo que el enlace apunte a la web real y el texto encaje con la base nueva.
### 1.10 Ajustes, ayuda y cierre de sesión
- No revisadas en detalle. Criterio heredado de 1.2: fuera de las tarjetas grandes, dentro de un **menú de usuario** (avatar arriba a la derecha). Ajustes mínimos: datos de contacto, contraseña, idioma. Ayuda = enlace a «Mensajes» o a la web de EPI10.
- **Prioridad:** P2 (área 1).

### 1.11 Vista en móvil
- No revisada por Raúl. Requisito del área 0: **todo responsive**; el cliente usará el portal desde el móvil. El arquitecto incluye capturas en móvil del antes y el después.
- **Prioridad:** P1 (área 0).

## Parte 2 · Back office (Aitor)

### 2.1 Acceso
- **Lo mismo que el login del portal (1.1):** formulario antiguo con un retoque; además, el fondo partido se corta a media pantalla y hay un enlace de licencias de OpenEMR a la vista.
- **Decisión de arquitectura (Raúl):** **portal y back office comparten la misma base de interfaz.** Todo lo que se decida en el área 0 (base y armazón) aplica a las dos caras. Lo hace más fácil; el arquitecto valora si hay alguna razón técnica en contra.
- **Prioridad:** P1, dentro del área 0.
### 2.2 Inicio y menú principal
- **Veredicto: «ininteligible», «no entiendo nada».**
- **No me gusta:**
  - **al entrar se abre el calendario** a pantalla completa, no un inicio con las opciones del back office. «¿Cómo puede ser que sea el calendario y no un menú con todas las opciones?»;
  - **no se encuentran las funcionalidades**: el usuario `operaciones.prueba` (menú recortado por el prototipo de SKI2-207) solo muestra «Clientes»; el resto está oculto por permisos, y lo poco que hay (Message Center, Ajustes de Usuario) se abre como pestañas internas sin título o con «Unknown». Raúl lo percibió como un error del back office;
  - ruido: «Your Clinic Name Here», «Search by any demographic», pestañas internas con candados y recargas, barra «Portal 3» sin explicación.
- **Idea:**
  - **un inicio de verdad para Aitor**: panel con sus tareas del día (casos nuevos, consentimientos y cuestionarios recibidos, mensajes sin responder, informes por publicar) y accesos directos a las 5–6 funciones que usa;
  - **menú claro y en español** con solo lo que EPI10 necesita: Clientes, Mensajes, Documentos e informes, Calendario, Ajustes. Lo clínico que sobra, oculto por permisos pero sin dejar huecos raros;
  - quitar el sistema de pestañas internas de OpenEMR a la vista, o al menos que cada pestaña tenga título y se entienda;
  - decidir el punto de entrada: inicio propio, nunca el calendario.
- **Como `admin`** (menú completo: Calendario, Finder, Flujo, Recalls, Mensajes, Paciente, Honorarios, Modules, Procedimientos, Administrador, Informes, Varios, «Los menús emergentes»): **lo mismo, «queda raro»**. La barra de arriba con todo y el calendario abierto por defecto.
- **Decisión de Raúl:** la **primera vista del back office es un selector de funcionalidades**, como el inicio del portal: una cuadrícula de botones o tarjetas con cada función, **con la misma base de interfaz moderna que el portal del cliente**. «Punto, listo.» El calendario, una tarjeta más.
- **Prioridad:** P1 (área 7). Carmen va a ver el back office y hoy no se entiende.
### 2.3 Búsqueda y ficha de la paciente («Buscar o Añadir Paciente»)
- **Veredicto: «horrible, del año del catapún», «abrumador, feo, contraintuitivo», «inusable».**
- **No me gusta:**
  - **cientos de campos** en secciones (Quién, Contacto, Opciones, Empresa, Estadísticas, Varios, Relacionado): título, preferred name, birth name, gender identity, orientación sexual, pronombres, S.S., licencia, HIPAA, farmacia, vacunaciones, CMS portal login, publicity code, raza, empleador… «¿Aitor tiene que pegarse 17 años rellenando esto?»;
  - **mezcla de inglés y español** por todas partes;
  - la vista se llama «Buscar o Añadir Paciente» pero **es tan abrumadora que no se sabe cómo buscar a Lucía**;
  - Raúl no sabe la solución («no sé si dejarlas y que usen las que usen, o quitárselas»), **pero sabe que esto no**.
- **Idea:**
  - **ficha de cliente mínima de EPI10**: solo los campos que EPI10 usa (nombre, apellidos, fecha de nacimiento, correo, teléfono, dirección de envío del kit, código del kit, estado del caso, enlace a Odoo). Lo demás, oculto; si hace falta, en un «Más datos» plegado;
  - **la mayoría de datos los rellena el cliente** desde el portal (consentimiento y cuestionario), no Aitor. En el back office se ven, no se teclean;
  - **buscar** = una caja de búsqueda y una lista de clientes con su estado, no un formulario;
  - la ficha con pestañas claras: Datos · Documentos · Mensajes · Citas · Informe.
- **Pregunta de Raúl al arquitecto:** ¿el plan renove estructural (base de interfaz) cubre también estas vistas del back office, o hay que especificarlas una a una? *Respuesta del orquestador, en el documento: ambas; ver «Ideas generales».*
- **Resultados de la búsqueda:** se abren en una **ventana flotante «horrible»**, con letra diminuta y columnas clínicas (SS, PID, días desde el último encuentro…): «no se ve absolutamente nada, hay que entrecerrar los ojos y acercarse a la pantalla». Con 10 pacientes ya cuesta; con 2.000, «Aitor se compra una lupa». → Lista de clientes legible, a pantalla completa, con nombre, correo, estado del caso y fecha, y buscador encima.
- **Ficha de la paciente («Medical Record Dashboard»):** «ininteligible, horrible, horrible, horrible; no sé ni qué hay ni qué no hay; no sé ni por dónde abordarla». Es el cuadro clínico completo: Alergias, Problemas médicos, Medicamentos, Prescripciones, Care Team, Treatment Intervention Preferences, Care Experience Preferences, Care Plan, Facturación, Seguro, Recordatorios clínicos (Papanicolaou, Tabaco), Recall, Ledger, External Data… con «Seleccione encuentro» arriba. **Nada de esto lo usa EPI10.**
- **Ficha de cliente EPI10 (propuesta del orquestador):** cabecera con nombre, correo, teléfono y **estado del caso** (las 5 fases del journey) + 5 pestañas: **Resumen** (siguiente paso, enlace al caso en Odoo), **Documentos** (consentimiento, cuestionario, informe, con estado), **Mensajes**, **Citas**, **Datos**. Todo lo clínico, oculto. Se construye como vista propia del módulo o como layout de OpenEMR recortado, lo que decida el arquitecto.
- **Prioridad:** P1 (área 7). Es la vista de trabajo diario de Aitor.
### 2.4 Documentos de la paciente (consentimiento firmado, respuestas, subir informe)
- **Veredicto: «tan absurdamente mala que no sé ni cómo llegar»**. Raúl no consiguió llegar al punto de ver el consentimiento firmado ni las respuestas: «no sé ni dónde está, tiene tanto ruido y tanta basura que no sé ni por dónde empezar. Me estoy poniendo de mal humor».
- **Lo que hay:** un árbol de categorías clínicas (Instrucción anticipada, CCD, CCDA, CCR, Eye Module, FHIR Export, Invoices, Informe del Laboratorio, Registo Médico, Onsite Portal, Información del Paciente, Patient Photograph… y entre ellas «Informes EPI10»), un «Document Uploader/Viewer» con avisos de facturación médica, Dicom, cifrado AES-256, «Drop files here», plantillas, «Fetch», «Open Patient Template or Open Module». Nada de esto es para Aitor.
- **Navegación:** tampoco está claro cómo se llega al paciente ni cómo se sale («no sé ni cómo llegar al paciente ni cómo salir del paciente»).
- **Idea:** la pestaña **Documentos** de la ficha de cliente EPI10 (ver 2.3) con **tres cosas y nada más**:
  1. **Consentimiento**: firmado o pendiente, fecha, ver PDF;
  2. **Cuestionario de hábitos**: completado o pendiente, fecha, ver respuestas;
  3. **Informe**: estado (sin informe · borrador · validado · publicado), botón único «Publicar informe», que es lo que hoy hace el monolito por el contrato (`publicar_informe`); ver PDF.
  Subir «otro documento» queda como acción secundaria, sin árbol de categorías. El visor integrado, el mismo del portal.
- **Prioridad:** P1 (área 7, con el área 4): es donde Aitor comprueba lo que ha hecho el cliente y entrega el informe.
### 2.5 Mensajes con la paciente (Message Center)
- **No es la interfaz que acordamos para el portal.** Tabla «My Messages» (Desde, Paciente, Tipo, Fecha, Estado), pestañas Mensajes / Avisos / Recalls, «Añadir Nuevo», «Eliminar» en rojo, filtros Mostrar Todo / activos / inactivo.
- **Matiz de Raúl:** **el back office no tiene que ser precioso, tiene que ser usable**. El portal del cliente sí tiene que estar precioso. Aquí «quizás haya que meterle mano y mejorarla» con el mismo componente de chat del área 3, en versión de equipo: lista de conversaciones (una por cliente, con no leídos) + hilo.
- **Prioridad:** P1 (área 3): mismo componente, dos caras.
### 2.6 Calendario y citas
- **Veredicto: «se puede quedar así».** Tiene el calendario mensual, las vistas día/semana/mes y los huecos (slots) por facultativo. Con el plan renove de la base de interfaz basta; «sin demasiado curro aquí».
- Pendientes menores: «Your Clinic Name Here» → nombre de EPI10; «Facultativos» → «Equipo»; textos en español.
- **Prioridad:** P2 (área 5): solo aplicar la base y limpiar textos; el calendario interactivo del portal (1.8) sí es trabajo nuevo.
### 2.7 Menú principal: qué se queda y qué se esconde
**Principio de Raúl: «la perfección se logra por omisión, no por adición». Se esconde todo lo que no vayan a usar Carmen y Aitor.** Esconder, no borrar: queda accesible desde Ajustes (un botón «mostrar funciones avanzadas» o similar), pero fuera de la interfaz diaria.

| Menú de OpenEMR | Decisión | Nota |
|---|---|---|
| Calendario | **Se queda** | Como tarjeta del selector, no como vista de entrada |
| Finder | **Se queda, renombrado «Buscador»** | Lista de clientes legible (ver 2.3) |
| Flujo (Flow Board) | **Esconder** | Tablero de flujo de visitas clínicas; no se usa |
| Recalls | **Esconder** | Avisos de revisión clínica; no se usa |
| Mensajes | **Se queda** | Con la interfaz de chat del área 3, también en el back office |
| Paciente | **Se queda, como «Clientes»** | Con la ficha EPI10 (ver 2.3) |
| Honorarios | **Esconder** | Facturación clínica; el cobro es Stripe |
| Modules | **Esconder** | Administración técnica |
| Procedimientos | **Esconder** | Laboratorio clínico; el test va por Odoo |
| Administrador | **Esconder del día a día** | Solo para quien administre, en Ajustes |
| Informes | **Dudoso: Raúl cree que sí** | A revisar cuáles sirven (listados de clientes, exportaciones); los clínicos se esconden |
| Varios (Portal Dashboard, Dicom Viewer, Material educativo, Autorizaciones, Gráfico de seguimiento, Notas de la oficina, Comunicación batch, New Documents, Formularios en blanco) | **Esconder todo** salvo que algo sirva; Raúl «no lo sabe», se decide con el inventario funcional. Candidatos a salvar: *Portal Dashboard* (gestión del portal) y *Comunicación batch* (envíos masivos), si se usan | |
| Los menús emergentes (Incidencias, Exportar, Importar, Citas, Superbill, Pago, Carta, Chart Label, Barcode Label, Etiqueta de dirección) | **Esconder todo** salvo *Citas*; *Etiqueta de dirección* y *Barcode Label* se valoran para el envío del kit | |

- **Message Center del back office:** tabla «My Messages» con Desde, Paciente, Tipo, Fecha, Estado, pestañas Mensajes / Avisos / Recalls, botones «Añadir Nuevo» y «Eliminar» en rojo. Mismo diagnóstico que el portal: bandeja clínica, no chat. Se queda la función; cambia la interfaz (área 3).
- **Prioridad:** P1 (área 7): esconder menús es barato (permisos y configuración de menú) y limpia muchísimo.

## Ideas generales
- **Nunca mezclar idiomas (P1, toda la interfaz).** Si el usuario tiene la interfaz en español, todo en español; si en inglés, todo en inglés. Nada de spanglish: Sent, All, Compose, To, Yes, «Your files will…», «Medical Record/».
- **Una plantilla común de «tarea o documento»** (de 1.3, 1.4 y 1.5): por fuera, la app; por dentro, título y propósito, guía paso a paso, un solo CTA grande y confirmación.
- **Una base de interfaz moderna y open source para toda la app** (de 1.1): shadcn/ui o plantillas de nicho de portal de pacientes.
- **Al cliente solo se le enseña lo que aporta valor**, desbloqueado por EPI10. Nada del EHR clínico de OpenEMR a la vista.
- **Navegación:** desde cualquier vista se puede volver atrás, no solo a «Tu espacio».
- **Back office: dos capas de trabajo (respuesta a la pregunta de Raúl en 2.3).** La base de interfaz (área 0) resuelve el aspecto: tipografía, colores, botones, formularios, idioma. **No resuelve sola el contenido**: qué campos y qué menús ve Aitor. Eso es un **inventario funcional** (qué usa EPI10 de cada pantalla) que decide el arquitecto a partir del journey y Raúl valida. Regla: **se enseña solo lo que EPI10 usa**; el resto se oculta por permisos o configuración (layouts de OpenEMR), sin borrar nada del núcleo.
