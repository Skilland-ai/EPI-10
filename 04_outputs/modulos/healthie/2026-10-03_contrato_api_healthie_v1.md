# Contrato de la API de Healthie para el módulo `healthie` (v1)

Fecha: 2026-10-03 · Issues: SKI2-170 (cliente de la API), SKI2-171 (webhooks) · Bloqueo: SKI2-101 (add-on de API sin activar, sin clave)
Contexto: [ADR del orquestador](../integracion/2026-10-03_adr_orquestador_v1.md) · [Journey v2 congelado](../journey/2026-10-03_customer_journey_mvp_v2.md)

**Estado:** preparación documental. No se ha hecho ninguna llamada a la API. Nada de este documento está probado contra Healthie. Lo que la documentación no confirma se marca como **Unknown**. Lo que hay que comprobar en el sandbox en cuanto haya clave se marca como **Verificar**.

Fuentes (copia local de la documentación pública, descargada entre junio y julio de 2026):

- Guías: `~/Escritorio/healthie-documentation/healthie_docs/raw/guides/` (`api-concepts/*`, `patient`, `chat`, `documents`, `forms`, `filled_out_forms`, `user_accounts`, `webhooks`, `webhooks/event-reference`).
- Referencia del esquema, versión `2026-01-01`: `.../healthie_docs/raw/reference/2026-01-01/`.
- Centro de ayuda: `.../healthie_help/markdown/platform/api/` (943, 1095, 1117, 1142, 1231, 1366) y artículos 156, 157 y 1006.
- Discovery de la interfaz (julio de 2026): `04_outputs/discovery/healthie-ui/evidence/03`, `04`, `05` y `06a`.

---

## 1. Acceso: autenticación, entornos, versiones y límites

### 1.1 Autenticación

| Punto | Qué dice la documentación | Implicación para el monolito |
|---|---|---|
| Tipo | Clave de API ligada a **una cuenta de usuario** de Healthie. La clave hereda los permisos de esa cuenta. Lo que se hace con ella queda registrado como hecho por ese usuario. | Hace falta una cuenta de profesional dedicada (por ejemplo «EPI10 Sistema») o usar la de Aitor. Lo decide Raúl (ver §4). |
| Cabeceras | `Authorization: Basic <API_KEY>` y `AuthorizationSource: API` | La guía de versionado muestra `Bearer` en un ejemplo. Usar `Basic`, que es lo que dice la guía de autenticación. **Verificar.** |
| Shard | `AuthorizationShard: <id>` solo si los datos están en un shard («lo sabrás si es tu caso»). | **Unknown.** Preguntar a Healthie. |
| Alta de la clave | Ajustes › Developer › API Key, en la interfaz de cada entorno. Hace falta el permiso «Can view and manage developer features». Una clave no se puede pasar a otro usuario. | La genera Raúl o EPI10 al activar el add-on. Se guarda en el `.env` del servidor y nunca en el repositorio. |
| Rotación | No hay política de rotación ni lista de IP permitidas para las llamadas salientes (FAQ del artículo 943). | — |

Permisos que necesita la cuenta de la clave (deducidos de las guías): crear y editar clientes, cambiar su grupo, subir y compartir documentos, y escribir en sus conversaciones. Para listar las conversaciones de un cliente del que no es miembro, `conversationMemberships(client_id)` exige ser **administrador de la organización**.

### 1.2 Entornos

| Entorno | URL GraphQL | Notas |
|---|---|---|
| Sandbox (staging) | `https://staging-api.gethealthie.com/graphql` | Prohibido meter datos reales (PHI); solo datos ficticios. Menos recursos y más latencia. Cuenta propia: se da de alta en `securestaging.gethealthie.com` (artículo 1095), aunque el artículo 943 dice que hay que pedir acceso a hello@gethealthie.com. |
| Producción | `https://api.gethealthie.com/graphql` | La cuenta Group actual de EPI10. |

- Los dos entornos están **totalmente separados**. No se copian datos ni configuración entre ellos. Los **IDs cambian** (grupos, flujos de onboarding, profesionales, formularios). Todos los IDs van en la configuración por entorno, nunca escritos en el código.
- Hay que recrear en producción a mano lo que se configure en el sandbox (grupos, flujo de onboarding, tipo de cita, webhooks).

### 1.3 Versiones

- Cabecera obligatoria `Healthie-GraphQL-API-Version: <fecha de versión>`. Si falta, hoy se usa la versión base `2024-06-01`, ya obsoleta.
- **El 31 de enero de 2027** se rechazarán las peticiones sin cabecera y las de versiones anteriores a `2026-07-01`. La copia local es de la versión `2026-01-01`, que caduca en esa misma fecha.
- **Decisión técnica:** el monolito fija la versión `2026-07-01` (o la más reciente al construir) en su configuración. La copia local no incluye el esquema de `2026-07-01`, así que hay que **revisar sus cambios incompatibles** en docs.gethealthie.com antes de construir. Hoy: **Unknown**.
- Si una respuesta trae `extensions.warnings` con `API_VERSION_SUNSET_WARNING` o `MISSING_API_VERSION_HEADER`, se registra en el log como aviso.

### 1.4 Límites y errores

| Límite | Valor documentado |
|---|---|
| Peticiones | 250 por segundo; 100 inicios de sesión por minuto (artículo 943). La guía añade que el límite es dinámico. |
| Complejidad | Máximo 2000 por consulta. Las listas sin `first` cuentan como 100 elementos, así que hay que poner siempre `first`. |
| Profundidad | Máximo 25 niveles. |
| Exceso de peticiones | Error GraphQL con `extensions.code = "TOO_MANY_REQUESTS"`: reintentar con espera creciente (outbox del `core`). |
| Errores de validación | Las mutaciones devuelven `messages: [{ field, message }]`. **Una respuesta HTTP 200 con `messages` no vacío es un fallo** y debe tratarse como tal. |
| HTTP | La API intenta usar códigos HTTP correctos. Algunos 404 no siguen el formato GraphQL (la propia documentación lo reconoce). |
| Soporte | 5 h al mes con un Solutions Engineer, incluidas en el add-on de API (artículo 943). |

Volumen previsto del MVP: muy por debajo de estos límites.

---

## 2. Operaciones del journey

Convenciones:

- Todas las operaciones se lanzan con la clave del sistema y piden **solo los campos mínimos**.
- No se piden respuestas de formularios (`form_answers`). Odoo no puede guardar datos sanitarios y el monolito solo guarda IDs y estados.
- Los IDs entre `<>` son configuración por entorno: `HEALTHIE_GROUP_NUEVO`, `HEALTHIE_GROUP_TEST_RECIBIDO`, `HEALTHIE_GROUP_INFORME`, `HEALTHIE_PROVIDER_ID`.

Tabla resumen (operación del ADR → GraphQL):

| # | Paso del journey | Operación | Tipo |
|---|---|---|---|
| 2.1 | Buscar cliente por email | `users(keywords, first)` | query |
| 2.2 | Crear cliente (dispara la invitación) | `createClient` | mutation |
| 2.3 | Asignar o cambiar grupo | `updateClient(user_group_id)` | mutation |
| 2.4 | Enviar mensaje | `conversationMemberships` + `createNote` (o `createConversation`) | query + mutation |
| 2.5 | Publicar el PDF del informe | `createDocument(rel_user_id, share_with_rel)` | mutation |
| 2.6 | Estado del onboarding y formularios | `user` + `onboardingFlow(user_id)` + `requestedFormCompletions` | query |
| 2.7 | Citas | `appointment(id, include_deleted)` / `appointments(user_id)` | query |

### 2.1 Buscar cliente por email

```graphql
query findClientByEmail($keywords: String, $first: Int) {
  users(keywords: $keywords, first: $first, active_status: "active") {
    total_count
    nodes { id email first_name last_name user_group_id set_password_link }
  }
}
```

```json
{ "keywords": "cliente@example.com", "first": 5 }
```

Resultado esperado: `{ "data": { "users": { "total_count": 1, "nodes": [ { "id": "45678", "email": "cliente@example.com", ... } ] } } }`

Reglas:

- El argumento `email` de `users` está documentado como **«Does nothing»**. Hay que buscar con `keywords`, que busca por nombre, email, fecha de nacimiento, etc.
- `keywords` no garantiza una coincidencia exacta. El monolito **filtra en su código** por `email` igual, sin distinguir mayúsculas.
- Según el resultado:
  - **0 coincidencias:** se crea el cliente (2.2).
  - **1 coincidencia:** se vincula. Se guarda `id` en `core` y se asigna el grupo (2.3).
  - **Más de 1:** **no se crea ni se vincula**. Se abre una actividad en Odoo para que una persona resuelva.
- Hay que buscar también entre los clientes archivados (`active_status: "archived"`), en una segunda llamada. **Verificar** si conviene reactivar o crear de nuevo.
- `set_password_link` distinto de null indica que el cliente aún no ha activado la cuenta. Solo lo ve un administrador. Sirve para decidir si se reenvía la invitación (2.2, `resend_welcome`).

### 2.2 Crear cliente

```graphql
mutation createClient($input: createClientInput) {
  createClient(input: $input) {
    user { id email user_group_id }
    messages { field message }
  }
}
```

```json
{
  "input": {
    "first_name": "Nombre",
    "last_name": "Apellido",
    "email": "cliente@example.com",
    "dietitian_id": "<HEALTHIE_PROVIDER_ID>",
    "user_group_id": "<HEALTHIE_GROUP_NUEVO>",
    "timezone": "Europe/Madrid",
    "metadata": "{\"epi10_case_id\":\"EPI10-000123\"}",
    "dont_send_welcome": false
  }
}
```

Resultado esperado: `{ "data": { "createClient": { "user": { "id": "45678", ... }, "messages": [] } } }`. Healthie emite el webhook `patient.created`.

- **Invitación:** `createClient` **envía la invitación por defecto**. Se desactiva con `dont_send_welcome: true`. No hace falta otra mutación. Lo confirman la guía de pacientes, la descripción del campo y el discovery de la interfaz, donde la invitación se envió y funcionó.
- **Onboarding:** al crear el cliente directamente en el grupo, recibe el flujo de onboarding asociado a ese grupo. El grupo «EPI10 · nuevo cliente» debe tener asignado el flujo de onboarding de D3. Es un solo paso: la mutación crea al cliente, le asigna el grupo y le envía la invitación.
- `dietitian_id` es el profesional principal. Por defecto es el usuario dueño de la clave. Todo cliente necesita uno, y determina la conversación automática (2.4). Su ID: **Unknown** (Aitor o una cuenta de sistema, ver §4).
- `metadata` guarda solo el `case_id`, que no es un dato personal. Sirve para cuadrar registros si se pierde la respuesta.
- **No es idempotente.** Si la llamada se corta, el reintento puede crear un duplicado. Antes de reintentar, el trabajo vuelve a ejecutar 2.1.
- **Duplicados:** en Healthie, un cliente es único por la combinación de espacio de la organización, email, nombre y apellidos. Si el email existe con otro nombre, `createClient` **no falla**: crea otra cuenta **vinculada** al mismo email (artículos 1006 y `user_accounts`). Por eso la búsqueda previa es obligatoria.
- Campos opcionales que no se envían: `phone_number`, `dob`, `gender` y `ssn` (minimización de datos).

### 2.3 Asignar o cambiar grupo

```graphql
mutation setClientGroup($input: updateClientInput) {
  updateClient(input: $input) {
    user { id user_group_id }
    messages { field message }
  }
}
```

```json
{ "input": { "id": "45678", "user_group_id": "<HEALTHIE_GROUP_TEST_RECIBIDO>" } }
```

Resultado esperado: `user.user_group_id` con el nuevo ID y `messages: []`. Healthie emite `patient.updated` con `changed_fields` que incluye el grupo (nombre exacto del campo: **Verificar**).

- Un cliente solo puede estar en **un grupo** a la vez. Asignar uno nuevo lo saca del anterior.
- Cambiar de grupo **no envía ningún correo** al cliente (artículo 157). Si el nuevo grupo tiene un flujo de onboarding con formularios nuevos, se le pedirán la próxima vez que entre. Los grupos «test recibido» e «informe entregado» **no deben tener flujo nuevo** salvo que se quiera.
- No mezclar `user_group_id` con `resend_welcome` ni `send_form_request_reminder` en la misma llamada. La guía dice que los campos que envían correos tienen prioridad y el resto de cambios se ignora.
- Hay alternativa en lote: `bulkUpdateClients(ids, user_group_id)`, con `suppress_patient_updated_webhooks`. No hace falta en el MVP.
- Reenviar la invitación a un cliente vinculado que no la activó: `updateClient(input: { id, resend_welcome: true })`, en una llamada aparte.
- Grupos del journey: «EPI10 · nuevo cliente», un grupo intermedio al marcar «test recibido» (nombre: **Unknown**; propuesta: «EPI10 · test recibido») e «EPI10 · informe entregado».

### 2.4 Enviar mensaje

En la API, un chat es una `Conversation` y cada mensaje es una `Note`. Healthie crea **automáticamente** una conversación de dos personas entre el cliente y su profesional principal.

Paso 1. Localizar la conversación del cliente:

```graphql
query clientConversations($client_id: String, $first: Int) {
  conversationMemberships(client_id: $client_id, conversation_type: "individual", first: $first) {
    nodes { id convo { id name } }
  }
}
```

```json
{ "client_id": "45678", "first": 5 }
```

Paso 2. Escribir el mensaje:

```graphql
mutation sendMessage($input: createNoteInput) {
  createNote(input: $input) {
    note { id conversation_id created_at }
    messages { field message }
  }
}
```

```json
{ "input": { "conversation_id": "13000", "content": "<p>Tu caso está en marcha.</p>" } }
```

Resultado esperado: `note.id` y `messages: []`. Healthie emite `message.created` con `resource_id_type: "Note"`.

Si el cliente aún no tiene conversación, se crea con el primer mensaje incluido:

```graphql
mutation startConversation($input: createConversationInput) {
  createConversation(input: $input) {
    conversation { id }
    messages { field message }
  }
}
```

```json
{
  "input": {
    "owner_id": "<HEALTHIE_PROVIDER_ID>",
    "simple_added_users": "<doc_share_id del cliente>",
    "name": "EPI10 Salud",
    "note": { "content": "<p>Tu caso está en marcha.</p>" }
  }
}
```

- `simple_added_users` usa el `doc_share_id` del cliente (campo de `User`), no su `id`. El ejemplo de la guía tiene la forma `user-1`. **Verificar** el valor real.
- `content` es HTML con un subconjunto de etiquetas permitidas. Los saltos de línea se hacen con `<p>` o `\n`.
- El mensaje aparece **como enviado por el usuario de la clave**. Si la clave es de una cuenta de sistema, el cliente verá ese nombre.
- Si quien escribe no es el dueño de la conversación, hay que enviar `org_chat: true`. Por eso conviene que la clave sea del profesional principal o de un administrador.
- **Unknown:** si `createNote` por API avisa al cliente por correo o notificación push igual que un mensaje escrito en la interfaz. Depende de sus preferencias de notificación (discovery 06c). **Verificar.**
- Los textos fijos de los mensajes («tu caso está en marcha», «tu test está listo, agenda tu cita», «muestra enviada», «tu informe está disponible») viven en el monolito, en español. No dependen de plantillas de Healthie.

### 2.5 Publicar el PDF del informe

```graphql
mutation publishReport($input: createDocumentInput) {
  createDocument(input: $input) {
    document { id display_name rel_user_id shared }
    messages { field message }
  }
}
```

Variables con el archivo en base64 (forma del ejemplo oficial de subida):

```json
{
  "input": {
    "rel_user_id": "45678",
    "share_with_rel": true,
    "display_name": "Informe EPI10.pdf",
    "file_string": "data:application/pdf;base64,JVBERi0xLjQK..."
  }
}
```

Alternativa recomendada para archivos grandes: `file` de tipo `Upload`, enviado como `multipart/form-data` según la especificación de subida de archivos de GraphQL. Resultado esperado: `document.id`, `rel_user_id` = cliente, `shared: true` y `messages: []`. Healthie emite `document.created`.

- `rel_user_id` asocia el documento a un cliente concreto, como documento privado. `share_with_rel: true` lo hace visible para ese cliente.
- No se puede cambiar el contenido de un documento ya creado. Para corregirlo hay que crear uno nuevo y, si procede, borrar el anterior con `deleteDocument`. Así funciona la «republicación» del tramo 5.2.
- **Unknown:** si `share_with_rel: true` equivale al botón «Share» de la interfaz, que envía un correo («Primary provider has shared a document with you»), o a «Make Visible», que publica en silencio (discovery 05). El monolito ya envía su propio mensaje «tu informe está disponible», así que lo ideal es publicar en silencio. **Verificar** en el sandbox si llegan dos avisos.
- **Unknown:** tamaño máximo de archivo.
- `Document.expiring_url` da un enlace de descarga válido 10 segundos. Sirve para comprobar la publicación sin guardar el PDF.
- Después de publicar, el monolito borra su copia del PDF y del borrador, según la regla de datos del ADR.

### 2.6 Estado del onboarding y de los formularios

Healthie **no tiene un evento de «onboarding completado»** (ver §3). El estado se consulta así:

```graphql
query onboardingStatus($id: ID) {
  user(id: $id) {
    id
    user_group_id
    any_incomplete_onboarding_steps
    has_forms_to_complete
    next_onboarding_step { id display_name }
  }
}
```

```json
{ "id": "45678" }
```

Resultado esperado cuando ha terminado: `any_incomplete_onboarding_steps: false`, `next_onboarding_step: null` y `has_forms_to_complete: false`.

Regla propuesta para D3 («listo para pedir test»): `any_incomplete_onboarding_steps == false` y `next_onboarding_step == null`. **Verificar** en el sandbox que estos campos se comportan así, incluidos los pasos que el cliente se puede saltar (`is_skippable`).

Detalle por paso, para marcar los checks del caso en Odoo:

```graphql
query onboardingDetail($user_id: ID) {
  onboardingFlow(user_id: $user_id) {
    id
    name
    onboarding_items { id display_name item_type is_skippable completed_onboarding_item { id skipped } }
  }
}
```

```json
{ "user_id": "45678" }
```

- La referencia dice que `completed_onboarding_item` se resuelve «para el user id de los argumentos». **Unknown** si toma el `user_id` de `onboardingFlow`. **Verificar.**
- Para un paso concreto, tras el webhook: `completedOnboardingItem(id) { id onboarding_item_id user_id skipped item_type }`.

Formularios pedidos fuera del onboarding (si se usan):

```graphql
query requestedForms($user_id: ID, $first: Int) {
  requestedFormCompletions(user_id: $user_id, first: $first) {
    nodes { id status custom_module_form_id form_answer_group_id }
  }
}
```

Valores posibles de `status`: **Unknown**.

### 2.7 Citas

El cliente reserva la cita en Healthie (D4). El monolito **no crea citas**: solo las lee al recibir un webhook.

```graphql
query appointmentById($id: ID) {
  appointment(id: $id, include_deleted: true) {
    id
    date
    length
    pm_status
    deleted_at
    updated_at
    appointment_type { id name }
    user_id
    provider { id }
  }
}
```

```json
{ "id": "67890" }
```

Resultado esperado: la cita con `date` (ISO 8601), `pm_status` («Occurred», «No-Show», «Re-Scheduled», «Cancelled»; según la configuración, también «Late Cancellation» y «Checked-In») y `deleted_at` (null si no se ha borrado).

Comprobación periódica o de respaldo:

```graphql
query clientAppointments($user_id: ID, $first: Int) {
  appointments(user_id: $user_id, filter: "future", first: $first) {
    nodes { id date pm_status appointment_type { id } }
  }
}
```

- Se ignoran las citas cuyo tipo no sea «Realización test EPI10» (ID por entorno: **Unknown** hasta configurarlo).
- `user_id` solo viene relleno en citas individuales. En citas de grupo es null y hay que usar `attendees`. El MVP solo usa citas individuales.

---

## 3. Webhooks (SKI2-171)

### 3.1 Configuración

- Se crean en la interfaz: Ajustes › Developer › Webhook. Cada uno lleva una URL y al menos un evento. **Un webhook puede tener varios eventos** y un evento puede enviarse a varias URL.
- También hay una consulta `webhooks` en la API (aparece en la lista de paginación). No sabemos si se pueden crear por API: **Unknown**.
- Se configura uno por entorno: sandbox → monolito en hermes-node (necesita una URL pública temporal) y producción → `https://<subdominio>/webhooks/healthie`.
- Si se usan suborganizaciones, el webhook de la organización principal recibe los eventos de todas.

### 3.2 Eventos que necesita el journey

| Evento | Para qué | Notas |
|---|---|---|
| `completed_onboarding_item.created` | Marcar el check en Odoo y comprobar D3 (consulta de 2.6) | Es la señal de onboarding. No existe «onboarding completado»: se recibe un evento por paso. |
| `completed_onboarding_item.updated` / `.deleted` | Volver a calcular el estado | Healthie los lanza internamente. Es raro, pero puede reabrir un paso. |
| `form_answer_group.created` | Respaldo: formulario enviado | Si `finished` es false, no cuenta. No se leen las respuestas. |
| `appointment.created` | Fecha de la cita en Odoo | Lo lanzan `createAppointment` y `completeCheckout`, es decir, también las reservas del cliente. |
| `appointment.updated` | Cambio de fecha o de estado | Una cancelación llega como `updated` con `pm_status` en `changed_fields` y valor «Cancelled». Un cambio de hora llega con `date` en `changed_fields`. |
| `appointment.deleted` | La cita se ha borrado | Leer con `include_deleted: true`. En Odoo: «pendiente de reagendar». |
| `patient.created` / `patient.updated` | Opcional: comprobar el alta y detectar cambios de email | No es imprescindible en el MVP. |
| `message.created` | Opcional: dudas del cliente (D5) | Fuera del alcance mínimo. Se escalan a mano. |

- Los eventos de cita solo se lanzan **por defecto para citas no recurrentes**. Para las recurrentes hay que pedírselo a Healthie. El MVP no las usa.
- El artículo 1117 y la guía técnica no usan los mismos nombres de evento (por ejemplo, `request_form_creation.*` frente a `requested_form_completion.*`). Se toma como válida la guía técnica (`webhooks/event-reference`). **Verificar** con la lista que muestra la interfaz.

### 3.3 Formato del cuerpo

Llega **solo el ID** («thin payload»), nunca el recurso completo:

```json
{
  "resource_id": "67890",
  "resource_id_type": "Appointment",
  "event_type": "appointment.updated",
  "changed_fields": ["date", "pm_status"],
  "resource_organization_id": "org_123"
}
```

- `changed_fields` solo viene relleno en los eventos `updated` (sin `created_at` ni `updated_at`). En `created` y `deleted` va vacío.
- Algunos eventos traen campos extra, como `resource_organization_id` en las citas.
- Después de recibir el evento, el monolito **consulta el recurso por GraphQL** (§2.6 y §2.7).
- **No hay un ID de evento documentado** ni una marca de tiempo del envío. Para descartar duplicados, la clave se calcula con `event_type + resource_id + Content-Digest`. Un reintento lleva el mismo cuerpo y el mismo `Content-Digest`. **Verificar.**
  - **Corrección (SKI2-171, revisión del PR #12):** esa clave identifica el aviso, pero **no puede descartarlo para siempre**. Dos cambios distintos del mismo recurso pueden llevar el mismo cuerpo (por ejemplo, dos cambios de hora de una cita: `appointment.updated` con `changed_fields: ["date"]`). El monolito guarda el evento con esa clave y, si llega otra vez, vuelve a encolar la relectura del recurso salvo que ya haya una pendiente. Como el trabajo siempre lee el estado actual y es idempotente, procesar dos veces no hace daño.
- Orden de llegada garantizado: **Unknown**. El monolito no debe fiarse del orden: siempre lee el estado actual del recurso y no aplica lo que diga el evento.

### 3.4 Verificación de la firma

Cabeceras: `Content-Type: application/json`, `Content-Digest` (SHA-256 del cuerpo), `Signature-Input` y `Signature`. La firma es un HMAC-SHA256 con un secreto compartido de la forma `whsec_...`.

Texto que se firma, según el ejemplo oficial en JavaScript:

```text
`${method.toLowerCase()} ${path} ${query} ${contentDigest} ${contentType} ${contentLength}`
```

Donde:

- `contentDigest` es lo que va detrás del `=` en `Content-Digest`.
- `contentType` es `application/json`.
- `contentLength` es la longitud del cuerpo.
- La firma se compara en hexadecimal con lo que va detrás del `=` en `Signature` (`sig1=...`).

Cómo implementarlo en el monolito:

1. Guardar el **cuerpo en bruto**. El ejemplo oficial usa `JSON.stringify(body).length`, que puede no coincidir con el cuerpo recibido. Usar la longitud real en bytes y **verificar** cuál acepta Healthie.
2. Calcular el SHA-256 del cuerpo y compararlo con `Content-Digest`. La codificación (base64 o hexadecimal) es **Unknown**.
3. Calcular el HMAC y compararlo con una función de tiempo constante.
4. Si algo falla, responder 401 y no guardar nada.
5. Además, se puede filtrar por las IP de origen documentadas. Producción: `52.4.158.130`, `3.216.152.234`, `54.243.233.84`, `50.19.211.21`. Sandbox: `18.206.70.225`, `44.195.8.253`, `44.198.216.125`. Healthie avisaría si cambian.

**Unknown:** dónde se obtiene el secreto `whsec_` (no aparece en las capturas de la interfaz) y si es uno por webhook o por cuenta. **Unknown:** qué significa `Signature-Input` en detalle.

### 3.5 Reintentos y respuesta

- Los reintentos **hay que activarlos** al crear el webhook. Si se activan, Healthie reintenta con espera creciente **durante un máximo de 3 días**, avisa por correo a las 24 h aproximadamente y **desactiva el webhook** a los 3 días.
- Tiempo máximo de espera de la respuesta y códigos que cuentan como éxito: **Unknown**. El monolito responde 2xx en cuanto guarda el evento, y el trabajo se procesa después por el outbox del ADR.
- Si Healthie desactiva un webhook, el monolito deja de recibir eventos sin saberlo. Mitigación: una comprobación diaria con `appointments` y `user` de los casos abiertos, y una alerta si en N días no llega ningún evento.

---

## 4. Riesgos y huecos

| # | Riesgo o hueco | Qué sabemos | Mitigación o siguiente paso |
|---|---|---|---|
| R1 | Plan y add-on | Los artículos 943 y 1095 dicen que la API es un add-on de **Group y Enterprise**. El 1117 (webhooks) dice que es solo de **Enterprise**. | Pedir a Healthie, en la cotización de SKI2-101, confirmación por escrito de que Group + add-on incluye **webhooks y sandbox**. |
| R2 | Invitación | `createClient` la envía en el momento, salvo `dont_send_welcome`. No hace falta otra mutación. | Ninguna. Cuidado: si el trabajo se reintenta tras un fallo intermedio, no debe volver a crear el cliente (2.1 primero). |
| R3 | Idioma | La aplicación del cliente se vio en inglés y sin selector de idioma. Los componentes predefinidos de los formularios están en inglés. Las plantillas de correo se pueden editar y tienen variables (discovery 03, 04 y 06a). Los SMS no se pueden traducir fuera de Enterprise (artículo 90). En `updateClientInput` existe `preferred_language_code`, con efecto **Unknown**. | Traducir a mano las plantillas de invitación, solicitud de formulario y documento compartido. Preguntar a Healthie por la traducción del portal y de la aplicación, y si `preferred_language_code` cambia algo. |
| R4 | Marca | Healthie se ve en algunos correos y en la web. Sin Enterprise no hay marca blanca completa (D6, ya aceptado). | Aceptado en D6. |
| R5 | No hay evento de «onboarding completado» | Solo llega un evento por paso. | Volver a calcular con `user.any_incomplete_onboarding_steps` en cada evento (2.6). **Verificar.** |
| R6 | Duplicados y cuentas vinculadas | `createClient` con un email que ya existe y otro nombre crea una cuenta vinculada sin dar error. | Búsqueda obligatoria y bloqueo si hay varias coincidencias (2.1). |
| R7 | Búsqueda por email inexacta | El argumento `email` de `users` no hace nada. `keywords` es una búsqueda amplia. | Filtrar exactamente en el código. **Verificar** que `keywords` encuentra emails con `+` y otros símbolos. |
| R8 | Documento: ¿aviso doble? | No está documentado si `share_with_rel` avisa por correo. | Probar en el sandbox. Si avisa, decidir si se quita el mensaje propio o se publica en silencio. |
| R9 | Identidad del remitente | La clave es de un usuario. Mensajes y documentos aparecerán como suyos. | Decisión de Raúl: cuenta de sistema «EPI10 Salud» como profesional principal, o la cuenta de Aitor. La cuenta debe ser administradora (2.4). Una cuenta de profesional más puede tener coste: **Unknown**. |
| R10 | Versión de la API | Las versiones anteriores a `2026-07-01` se rechazan desde el 31 de enero de 2027. La copia local es de `2026-01-01`. | Construir directamente contra `2026-07-01` o una posterior y revisar sus cambios. |
| R11 | Firma del webhook | El ejemplo oficial calcula la longitud con `JSON.stringify`. No consta dónde se obtiene el secreto. | Probar en el sandbox con eventos reales y guardar uno de ejemplo, sin datos personales, para las pruebas automáticas. |
| R12 | Webhook desactivado en silencio | Healthie lo desactiva tras 3 días de errores. | Comprobación diaria y alerta (3.5). |
| R13 | Sandbox | No admite datos reales. Algunas integraciones no están (Zoom, Outlook). Los IDs son distintos. Para darse de alta puede hacer falta pedir acceso. | Todo con datos ficticios. Configuración por entorno. |
| R14 | Cambiar de grupo lanza formularios | Si el grupo nuevo tiene un flujo con formularios, se piden al cliente la próxima vez que entre. | Grupos intermedios sin flujo nuevo. |
| R15 | Recurrencia de citas | Los webhooks de citas no se lanzan para citas recurrentes salvo que se pida. | El tipo de cita del MVP no es recurrente. |
| R16 | Ubicación de los datos | Healthie aloja en Aptible y AWS. No se documenta la región de los datos (la UE es relevante por el RGPD). | Pregunta abierta en SKI2-101 (ya figura como Unknown en el ADR). |

### 4.1 Comprobaciones en el sandbox (primer día con clave)

1. Cabeceras: `Basic` + `AuthorizationSource` + versión. ¿Hace falta el shard?
2. `createClient` con grupo y flujo: ¿llega la invitación, el cliente queda en el grupo y ve el onboarding?
3. `users(keywords: email)`: ¿coincidencia exacta? ¿Encuentra clientes archivados y emails con `+`?
4. Completar el onboarding desde el portal: ¿llega `completed_onboarding_item.created` por cada paso? ¿Cuándo pasa `any_incomplete_onboarding_steps` a `false`? ¿Qué ocurre con los pasos que se saltan?
5. `updateClient(user_group_id)`: `changed_fields` de `patient.updated` y si el cliente recibe algo.
6. `createNote` en la conversación automática: ¿qué notificación recibe el cliente? `doc_share_id` y `createConversation`.
7. `createDocument` con `rel_user_id` y `share_with_rel`: ¿lo ve el cliente? ¿Recibe correo? Base64 frente a multipart y tamaño máximo.
8. Reservar, cambiar, cancelar y borrar una cita: eventos y `changed_fields` reales.
9. Firma: secreto, codificación del digest, longitud y reintentos (forzar un 500).

### 4.2 Preguntas para terceros

Para Healthie (las canaliza Raúl; no se ha contactado a nadie):

1. ¿El add-on de API en el plan Group incluye webhooks y sandbox? Precio y plazo de activación.
2. ¿Hace falta la cabecera `AuthorizationShard` en la cuenta de EPI10?
3. ¿Dónde se obtiene el secreto de firma de los webhooks? ¿Es uno por webhook? ¿Cuál es el tiempo de espera de la respuesta y qué códigos cuentan como éxito? ¿Hay un ID de evento?
4. ¿`share_with_rel` en `createDocument` envía el correo de «documento compartido»? ¿Se puede publicar en silencio?
5. ¿Se puede traducir al español el portal web y la aplicación? ¿`preferred_language_code` tiene algún efecto?
6. ¿En qué región se guardan los datos de una cuenta europea?
7. ¿Una cuenta de profesional de «sistema» para la clave tiene coste en el plan Group?

Para Raúl o EPI10:

1. ¿De quién es la clave y quién figura como profesional principal: una cuenta de sistema o Aitor? (R9)
2. Nombre del grupo intermedio («test recibido»).
3. Contenido del flujo de onboarding de D3 y del tipo de cita «Realización test EPI10» en Healthie.
4. ¿Se activan los reintentos de los webhooks? Recomendación: **sí**.

---

## 5. Encaje con el ADR

| ADR (módulo `healthie`) | Contrato |
|---|---|
| Crear o vincular cliente | 2.1 + 2.2 (o 2.3 si ya existe) |
| Asignar grupo «EPI10 · nuevo cliente» → invitación y onboarding | `createClient` con `user_group_id` y la invitación por defecto |
| Mensajes de los hitos de Aitor | 2.4 |
| Cambiar grupo («test recibido», «informe entregado») | 2.3 |
| Publicar el PDF validado | 2.5 |
| `POST /webhooks/healthie`: onboarding completado | §3: `completed_onboarding_item.*` + consulta de 2.6 |
| `POST /webhooks/healthie`: cita creada, cambiada o cancelada | §3: `appointment.created`, `.updated` y `.deleted` + consulta de 2.7 |
| Alternativa manual si falta la API | Sin cambios: actividad «Alta manual en Healthie» en Odoo |

---

## Nota 2026-10-04 · Configuración real en la cuenta de EPI10 (SKI2-175)

Observado en la UI de producción (plan Group, confirmado en `Settings > Subscription`), operado por Raúl.

**IDs de grupo en producción** (configuración por entorno, no en el código):

| Variable | Grupo | ID |
|---|---|---|
| `HEALTHIE_GROUP_NUEVO` | «EPI10 · nuevo cliente» | `92327` |
| `HEALTHIE_GROUP_TEST_RECIBIDO` | «EPI10 · test recibido» | `92328` |
| `HEALTHIE_GROUP_INFORME` | «EPI10 · informe entregado» | `92329` |

Los tres están creados sin flujo de onboarding (el de «nuevo cliente» se asigna en SKI2-176). Queda resuelto el nombre del grupo intermedio (§4.2, pregunta 2 de EPI10).

**Rutas reales del menú:**

- Grupos: `Clients > Groups > Create Group`. El ID aparece en la URL: `/groups/<id>/...`.
- Marca: `Settings > Business > Brand` (nombre, logo, URL del portal, color de la barra, redes y membretes).
- Plantillas de correo: `Settings > Email Templates`.
- Permisos: `Organization > Members > <miembro> > Permissions`. También hay `Permissions Template`.
- Plan: `Settings > Subscription`.

**Marca aplicada:** nombre «EPI10 Salud», logo `Logos_EPI10-01.png`, barra de navegación `#044799` con texto `#FFFFFF`. Brand solo admite el color de la barra, no hay color secundario. URL del portal: `secure.gethealthie.com/go/epi-10`. Membretes sin cambios (pregunta para Carmen).

**Idioma (R3), comprobado:** no hay ningún ajuste de idioma ni de región en Brand, en Account ni en Email Templates. Las plantillas no tienen selector de idioma.

**Plantillas de correo (R3), bloqueado:** al guardar `Client Invite` sale «Your account cannot edit custom emails» y no se guarda, aunque el usuario es Org owner y administrador, tiene «Can view and edit settings that impact the organization» activado y cerró sesión y volvió a entrar. La ayuda (artículo 88) y el asistente de Healthie dicen que hace falta Plus o superior, y la cuenta es Group. Se reporta a Healthie como bug por correo, con Carmen en copia (programado para el 5 de octubre a las 8:00). Partes fijas en inglés que no se pueden editar: «Accept this invite to start using Healthie», el botón y el pie con las apps.

- La API tiene `updateCustomEmail`, `customEmail` y `customEmails` (referencia del esquema): **Verificar** en el sandbox si sirve para editar las plantillas aunque la UI no deje.
- **Plan B**, si Healthie no lo resuelve: crear el cliente con `dont_send_welcome` y que el monolito envíe su propia invitación en español con `set_password_link` (2.1). **Verificar** que el enlace funciona y caduca bien.

**Otros:**

- *Developer features (webhooks, API keys)* sale bloqueado incluso para el owner. Probablemente depende del add-on de API (R1, SKI2-101).
- *Reply-to:* según el artículo 352, es el email con el que se inicia sesión (`info@epi10.es`). En julio era el de Reboot. Las respuestas de los clientes ya van a EPI10.
