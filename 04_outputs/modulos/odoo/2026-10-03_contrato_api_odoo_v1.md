# Contrato de la API de Odoo — v1

Fecha: 2026-10-03 · Linear: SKI2-164, SKI2-165, SKI2-163 (Odoo simulado) · Depende de: SKI2-104 · Estado: **propuesta para revisión del orquestador**

Base: [ADR del orquestador](../integracion/2026-10-03_adr_orquestador_v1.md) (monolito NestJS + PostgreSQL; Odoo solo por API, sin módulos propios) y [journey v2](../journey/2026-10-03_customer_journey_mvp_v2.md) (congelado).

Fuentes: documentación oficial de Odoo 16–20 y código fuente de `odoo/odoo` en GitHub, consultados el 3 oct 2026 (ver [Fuentes](#fuentes)). Lo que no se ha podido verificar figura como **Unknown**.

## Resumen

| Tema | Conclusión |
|---|---|
| Alojamiento | El ADR despliega el monolito **en el mismo servidor que Odoo**. Eso solo es posible si Odoo está en **servidor propio**. En Odoo Online u Odoo.sh no podemos ejecutar nuestro contenedor: habría que cambiar el despliegue del ADR, aunque la integración seguiría igual. |
| Acceso a la API | En Odoo Online y en Enterprise, la API externa **solo está incluida en el plan Custom**. En Community no hay esa restricción. |
| Protocolo | **JSON-RPC** (`/jsonrpc`) funciona de la 16 a la 21. **JSON-2** (`/json/2/...`) existe desde la 19. XML-RPC y JSON-RPC desaparecen en Odoo 22 (otoño de 2028) y en Online 21.1 (invierno de 2027). El adaptador habla JSON en los dos casos, así que no hace falta una librería XML. |
| Claves de API | A partir de la 18 caducan: **máximo 90 días** para un usuario interno (configurable por el administrador). En la 16 y la 17 no caducan. |
| Modelo del caso | **`project.task` dentro de un proyecto propio «Casos EPI10»**. Existe en Community y en Enterprise, de la 16 a la 20, con etapas por proyecto y actividades. Plan B: `crm.lead`. Plan C: modelo `x_` propio. |
| Hitos de Aitor | Aitor los marca **moviendo la etapa** en el kanban. Una sola regla de automatización avisa al monolito cuando cambia `stage_id`. |
| Webhook saliente | Disponible **desde la 17**, con la acción «Enviar notificación de webhook» (módulo estándar `base_automation`). Odoo **no firma ni reintenta**: espera 1 s y descarta. En la 17 y la 18 el aviso sale **antes del commit**. → El aviso solo sirve para despertar al monolito: este vuelve a leer el registro por API y además reconcilia cada cierto tiempo. |
| Odoo 16 | No tiene acción de webhook. Plan B: consultar cada 1–2 min por `write_date`. |

---

## 1. API externa por versión

### 1.1 Protocolos

| Versión | XML-RPC `/xmlrpc/2/*` | JSON-RPC `/jsonrpc` | JSON-2 `/json/2/<modelo>/<método>` | Webhook saliente |
|---|---|---|---|---|
| 16 | Sí | Sí | No | No |
| 17 | Sí | Sí | No | Sí (antes del commit) |
| 18 | Sí | Sí | No | Sí (antes del commit) |
| 19 | Obsoleto | Obsoleto | **Sí (nuevo)** | Sí (después del commit) |
| 20 | Obsoleto; servicio `db` eliminado | Obsoleto; servicio `db` eliminado | Sí | Sí (después del commit) |
| 22 (otoño 2028) | Eliminado (`common` y `object`) | Eliminado | Sí | — |

En Odoo Online las versiones SaaS van por delante: el servicio `db` se eliminó en Online 19.1 y `common` y `object` desaparecen en Online 21.1 (invierno de 2027). En las páginas SaaS 18.1–18.4 de la documentación no aparece JSON-2. Si EPI10 está en Online, JSON-2 es obligatorio a corto plazo. **Unknown:** en qué versión SaaS exacta se introdujo JSON-2.

Para saber la versión: `GET /web/version` devuelve `{"version_info": [19,0,0,"final",0,""], "version": "19.0"}` (documentado en la 19). En la 16–18, el servicio `common.version()`.

### 1.2 Autenticación con usuario técnico

**JSON-RPC (16–21):**

```json
POST /jsonrpc
{"jsonrpc":"2.0","method":"call","id":1,
 "params":{"service":"common","method":"authenticate",
           "args":["<db>","epi10-integracion","<api_key>",{}]}}
→ {"jsonrpc":"2.0","id":1,"result":17}        // uid, o false si falla

POST /jsonrpc
{"jsonrpc":"2.0","method":"call","id":2,
 "params":{"service":"object","method":"execute_kw",
           "args":["<db>",17,"<api_key>","project.task","search_read",
                   [[["project_id","=",5]]],
                   {"fields":["name","stage_id"],"limit":50,"context":{"lang":"es_ES"}}]}}
→ {"jsonrpc":"2.0","id":2,"result":[{"id":42,"name":"…","stage_id":[7,"Test pedido"]}]}
```

- La clave de API **sustituye a la contraseña**; el login se mantiene.
- En Odoo Online los usuarios no tienen contraseña local. Hay que fijarle una al usuario técnico desde Ajustes ▸ Usuarios ▸ Acción ▸ Cambiar contraseña, o bien usar una clave.
- El formato del error de JSON-RPC (`{"error":{"code":200,"message":"Odoo Server Error","data":{"name":"odoo.exceptions.AccessError","message":…}}}`) no aparece en la página de la API. Hay que **contrastarlo con un Odoo real** antes de fijar el parser.

**JSON-2 (19+):**

```http
POST /json/2/project.task/search_read
Authorization: bearer <api_key>
X-Odoo-Database: <db>          ← solo si el servidor tiene varias bases y dbfilter no usa el Host
Content-Type: application/json; charset=utf-8
User-Agent: epi10-monolito/1.0

{"domain":[["project_id","=",5]],"fields":["name","stage_id"],"limit":50,"context":{"lang":"es_ES"}}
```

- Si va bien: `200` con el valor de retorno en JSON. Si falla: `4xx/5xx` con `{name, message, arguments, context, debug}`. Ejemplo: `401` con `"Invalid apikey"`.
- Todos los argumentos van **con nombre**: `ids`, `context` y los parámetros del método (`domain`, `fields`, `vals_list`, `vals`…). No hay argumentos posicionales.
- No hace falta `uid`. Para conocer el propio ID se llama a `res.users/context_get` sin `ids`.
- **Cada llamada es una transacción.** No se pueden encadenar varias llamadas en una sola transacción. Para el flujo «crear contacto + caso + actividad» esto obliga a que el monolito sea idempotente y reintente cada paso (ver 2.6).

**Claves de API:**

| Versión | Caducidad | Rotación |
|---|---|---|
| 16–17 | Sin caducidad | Manual |
| 18 | Obligatoria para quien no es administrador. Máximo: el mayor `api_key_duration` de los grupos del usuario. «Usuario interno» trae **90 días**. Un administrador puede crear claves sin caducidad, pero solo para sí mismo. | Manual |
| 19–20 | Igual; la documentación de la 19 dice «no más de tres meses» | También por API: `res.users.apikeys/generate` y `revoke`. Para quien no sea administrador hace falta `base.enable_programmatic_api_keys = True`. Límite: 10 claves por usuario. |

La clave se crea en Preferencias ▸ Seguridad de la cuenta ▸ Nueva clave de API, con la sesión del propio usuario técnico. Hay dos opciones: el mantenedor entra una vez como ese usuario, o se le pone una contraseña temporal que después se borra. La documentación de la 19 recomienda dejar vacía la contraseña de los bots.

**Permisos mínimos del usuario `epi10-integracion`:** usuario interno con Proyecto ▸ Usuario y creación de contactos. Sin Ajustes ni administración. **Unknown:** si en Enterprise ocupa una licencia de usuario de pago.

### 1.3 Diferencias que el adaptador debe aislar

| Diferencia | 16 | 17–18 | 19–20 | Cómo aislarla |
|---|---|---|---|---|
| Transporte | JSON-RPC | JSON-RPC | JSON-2 (preferente) o JSON-RPC | Interfaz `OdooTransport` con `call(model, method, {ids, ...kwargs})`. Las implementaciones `JsonRpcTransport` y `Json2Transport` se eligen con `ODOO_PROTOCOL`. |
| Autenticación | uid + clave | uid + clave | bearer | Dentro del transporte. El uid se cachea. |
| Errores | `error.data.name` | igual | estado HTTP + `name` | Se traducen a errores propios: `OdooAuthError`, `OdooAccessError`, `OdooValidationError`, `OdooUnavailable` (reintentable). |
| `project.task.date_deadline` | `Date` | `Datetime` | `Datetime` | No lo usamos. Las fechas propias van en campos `x_`. |
| Estado de la tarea | `kanban_state` | `state` | `state` | No lo usamos. Nos guiamos por `stage_id`. |
| `name_get` | existe | eliminado | eliminado | Usar `read([...,'display_name'])`. |
| Etapas de CRM (plan B) | `crm.stage.team_id` | `team_id` | `team_ids` (en la 19; en la 20, Unknown) | Solo si se usa `crm.lead`. |
| Webhook saliente | no existe | antes del commit | después del commit | Ver 4. El receptor es el mismo: siempre vuelve a leer el registro. |
| Many2one en la lectura | `[id, "nombre"]` | igual | igual | Normalizar a `id` en el adaptador. |
| Valores vacíos | `false` (incluso en campos de texto) | igual | igual | Convertir `false` a `null` en el adaptador. |

### 1.4 Odoo Online, Odoo.sh y servidor propio

| | Odoo Online | Odoo.sh | Servidor propio |
|---|---|---|---|
| Edición | Enterprise (SaaS) | Enterprise | Community o Enterprise |
| API externa | Solo plan Custom | Odoo.sh requiere plan Custom, que incluye la API | Community: sin restricción. Enterprise fuera de Online: plan Custom. |
| ¿Monolito en el mismo servidor? | **No** (no hay acceso al servidor) | **No** (la plataforma no ejecuta nuestro Docker) | **Sí** (lo que asume el ADR) |
| Campos `x_`, reglas y vistas por configuración | Sí | Sí | Sí |
| Webhook saliente | Necesita una URL pública con HTTPS | Necesita una URL pública con HTTPS | Puede ir por la red interna (localhost o red Docker), sin salir a Internet. Topología: Unknown. |
| Versión | SaaS (va por delante; JSON-RPC desaparece antes) | La que elija el cliente | La que mantenga su mantenedor |

Lo que Carmen ha dicho («Odoo open source») apunta a Community en servidor propio, pero **nadie lo ha confirmado** (`00_inbox/.../fuente-primaria-carmen-brief-inicial.md`).

---

## 2. Modelo del caso

### 2.1 Recomendación: `project.task` en un proyecto «Casos EPI10»

| Opción | Disponible | A favor | En contra |
|---|---|---|---|
| **`project.task`** (recomendada) | Community y Enterprise, 16–20 (app Proyecto) | Etapas propias del proyecto (`project.task.type.project_ids`), así que no interfiere con otros usos. Kanban natural para Aitor. Hereda `mail.thread` y `mail.activity.mixin`. Tiene `partner_id` y `user_ids`. Las reglas de automatización tienen el disparador «Etapa establecida en». | Exige la app Proyecto. `user_ids` es many2many. Cambian algunos campos entre versiones, pero no los usamos. |
| `crm.lead` (plan B) | Community y Enterprise (app CRM) | Muchas empresas ya la tienen. Responsable único (`user_id`). | Semántica comercial (ganado/perdido, probabilidad, ingresos), así que ensucia los informes de ventas. Las etapas solo se aíslan por equipo de ventas, y el campo cambia en la 19. Un caso ya pagado no es una oportunidad. |
| `helpdesk.ticket` | **Solo Enterprise** (no está en el repositorio Community) | Equipos con etapas propias y SLA. | Ata el diseño a la edición. Solo tiene sentido si ya lo usan. |
| Modelo `x_epi10_caso` (plan C) | Cualquier edición: `ir.model` con `state='manual'`, `is_mail_thread=True`, `is_mail_activity=True` | Independiente de las apps instaladas. | Hay que crear por API un modelo de etapas, las vistas, el menú y los permisos (`ir.model.access`). Es lo que más configuración exige y lo más frágil en una migración. Los modelos manuales no admiten métodos. |

Si el proyecto no está instalado, activar la app estándar Proyecto **no es instalar un módulo propio**. Aun así, lo tiene que aprobar el mantenedor (SKI2-104). Si no lo aprueba y tienen CRM, se usa el plan B; si no hay ninguna de las dos, el plan C.

### 2.2 Etapas (`project.task.type` del proyecto «Casos EPI10»)

Cada etapa lleva un código estable `x_epi10_code`. El monolito identifica las etapas por ese código y no por el nombre, que puede traducirse o renombrarse.

| Sec. | Etapa (nombre visible) | `x_epi10_code` | Quién la pone | Journey | Qué hace el monolito al entrar |
|---|---|---|---|---|---|
| 10 | Nuevo · pago confirmado | `nuevo` | Sistema | 1.2–1.3 | — |
| 20 | Onboarding en curso | `onboarding` | Sistema | 2.1–2.2 | — |
| 30 | Listo para pedir test | `listo_test` | Sistema (D3) | 2.3 | Crea la actividad «Pedir test» |
| 40 | Test pedido | `test_pedido` | **Aitor** | 3.1 | Envía en Healthie «tu caso está en marcha» |
| 50 | Test recibido · pendiente de cita | `test_recibido` | **Aitor** (o el sistema, si se cancela la cita) | 3.3 | Cambia el grupo en Healthie y envía «agenda tu cita» |
| 60 | Cita agendada | `cita` | Sistema (Healthie) | 3.4 | Rellena la fecha de la cita |
| 70 | Test realizado | `test_realizado` | **Aitor** | 4.1 | Comprueba `x_epi10_codigo_barras` (D8). Si falta, crea una actividad. |
| 80 | Muestra enviada · esperando laboratorio | `muestra_enviada` | **Aitor** | 4.2 | Envía en Healthie «muestra enviada» |
| 90 | Entregable disponible · informe en preparación | `entregable` | **Aitor** | 4.3–4.5 | Pone el caso en la lista del módulo `informes`. No avisa al cliente. |
| 100 | Informe entregado | `entregado` | Sistema | 5.1 | Crea la actividad «Revisar cierre» (D10) |
| 110 | Cerrado (plegada) | `cerrado` | **Aitor o Carmen** | 5.3 | Marca el caso como cerrado en `core` |

Reglas del monolito para las etapas:

- Si Aitor salta o retrocede una etapa, el monolito no ejecuta efectos hacia el cliente. Crea la actividad «Revisar etapa del caso» para Carmen o Aitor.
- Las incidencias (fallo de Healthie, cita cancelada) **no son etapas**: son actividades. Así el kanban solo refleja el avance real.
- Una cita cancelada devuelve el caso a `test_recibido`, deja `x_epi10_cita_estado = cancelada` y crea la actividad «Pendiente de reagendar».

### 2.3 Campos `x_`

En `project.task`:

| Campo | Tipo (`ttype`) | Quién escribe | Uso |
|---|---|---|---|
| `x_epi10_case_id` | `char` (index) | Monolito | `case_id` de `core`. Sirve para buscar antes de crear y evitar duplicados. |
| `x_epi10_healthie_id` | `char` | Monolito | ID del cliente en Healthie (solo como referencia) |
| `x_epi10_onboarding_ok` | `boolean` | Monolito | Check de D3 |
| `x_epi10_onboarding_fecha` | `datetime` | Monolito | Cuándo se completó el onboarding |
| `x_epi10_cita_fecha` | `datetime` | Monolito | Fecha de la cita (desde Healthie) |
| `x_epi10_cita_estado` | `selection`: `programada`, `cambiada`, `cancelada` | Monolito | Estado de la cita |
| `x_epi10_codigo_barras` | `char` | **Aitor** | Código de la muestra (D8) |
| `x_epi10_url_informes` | `char` | Monolito | Enlace a la pantalla de informes del caso |

En `project.task.type`: `x_epi10_code` (`char`).

Fuera de Odoo (en `core`): IDs de Stripe, eventos, estados técnicos de sincronización y errores. En Odoo solo van el contacto (`res.partner`: nombre, email, teléfono), los hitos y las tareas. **Nunca datos genéticos ni de salud.**

### 2.4 Cómo crearlos: script `odoo:setup` del repositorio

Lo ejecuta una sola vez el mantenedor, o nosotros con una clave de administrador temporal (1 día). Primero en staging y después en producción. Es idempotente: busca antes de crear.

1. Busca `ir.model` de `project.task` y `project.task.type` para obtener `model_id`.
2. Crea los campos con `ir.model.fields/create`, `state: "manual"`. Ejemplo:
   ```json
   {"vals_list":[{"model_id":312,"name":"x_epi10_case_id","field_description":"Caso EPI10",
     "ttype":"char","state":"manual","index":true}]}
   ```
   Los campos `selection` usan `selection_ids: [[0,0,{"value":"programada","name":"Programada","sequence":1}], …]`. El campo `selection` en texto está marcado como obsoleto.
   Límites documentados: el nombre empieza por `x_`; no se pueden crear campos calculados, valores por defecto ni onchange.
3. Crea el proyecto «Casos EPI10» y sus etapas, cada una con su `x_epi10_code`.
4. Crea los tipos de actividad propios (ver 3), o reutiliza «Por hacer».
5. Crea una vista heredada (`ir.ui.view` con `inherit_id` = formulario de tarea y un `arch` con `xpath`) para que Aitor vea los campos `x_`. Sin esta vista, los campos existen pero no aparecen en pantalla. Es configuración en la base de datos, no un módulo, pero conviene revisarla en cada migración. Nombre: `epi10.project.task.form`.
6. Crea la regla de automatización del webhook (ver 4).
7. Comprueba el resultado con `fields_get` sobre `project.task` y lee las etapas.

Alternativa sin script: Ajustes ▸ Técnico ▸ Campos y Automatizaciones, en modo desarrollador. En Enterprise, con Studio, aunque Studio pone el prefijo `x_studio_`. El script es preferible porque se puede repetir y queda en el repositorio.

### 2.5 Operaciones del adaptador (contrato hacia `core`)

| Operación | Llamadas a Odoo |
|---|---|
| `findOrCreateContact(email, nombre, tel)` | `res.partner/search_read [["email","=ilike",email]]`. Si hay 0, `create`. Si hay 1, se usa. Si hay más de 1, se usa el más reciente y se crea la actividad «Revisar contacto duplicado». |
| `findOrCreateCase(caseId, partnerId)` | `project.task/search_read [["x_epi10_case_id","=",caseId]]`. Si no existe, `create {project_id, name:"EPI10 · <caseId>", partner_id, stage_id:<nuevo>, x_epi10_case_id}`. |
| `moveStage(taskId, code)` | `write {stage_id}` usando el mapa código → id que se cachea al arrancar |
| `setFields(taskId, vals)` | `write` solo con campos `x_epi10_*` |
| `createActivity(...)` | Ver 3 |
| `readCase(taskId)` | `read [stage_id, x_epi10_*, write_date, write_uid]` |
| `listChangedSince(cursor)` | Ver 4.4 |

### 2.6 Idempotencia sin transacciones

Cada llamada es atómica por separado, así que cada paso se escribe para que se pueda repetir sin efectos dobles:

- **Buscar antes de crear**, usando `x_epi10_case_id` como clave.
- Guardar en `core` el ID de Odoo justo después de cada paso.
- Si un `create` falla por tiempo de espera, la operación puede haberse aplicado. Por eso el reintento vuelve a buscar antes de crear.

---

## 3. Actividades (`mail.activity`) para Aitor

**Creación directa** (es igual en la 16–20 y no depende de métodos de conveniencia):

```json
POST /json/2/mail.activity/create          (o execute_kw "mail.activity","create",[[{…}]])
{"vals_list":[{
   "res_model_id": <id de ir.model 'project.task'>,
   "res_id": 42,
   "activity_type_id": <id de 'EPI10 · Pedir test' o de 'Por hacer'>,
   "summary": "Pedir test",
   "note": "<p>Caso EPI10-2026-0001. Pedir el test a TellmeGen y mover a «Test pedido».</p>",
   "date_deadline": "2026-10-06",
   "user_id": <id de res.users de Aitor>
 }],
 "context": {"mail_activity_quick_update": false}}
```

- `res_model` se calcula a partir de `res_model_id`. El `id` de `ir.model` se busca una vez y se cachea.
- **Asignación:** `user_id` = Aitor. Se configura en el monolito como `ODOO_USER_AITOR_ID` y se resuelve al arrancar por login. Si el usuario técnico crea la actividad para otra persona, Odoo le **envía una notificación por correo** al asignado y lo suscribe como seguidor de la tarea. Con `context.mail_activity_quick_update = true` no se envía el correo (comprobado en el código de la 17). Recomendación: dejar la notificación activada, salvo que Aitor prefiera no recibir correos.
- `note` es HTML: solo el código del caso y la instrucción, sin datos de salud.
- **Sin duplicados:** antes de crear, se busca `mail.activity` con `[["res_model","=","project.task"],["res_id","=",42],["activity_type_id","=",T]]`.
- **Cerrarla desde el monolito** (si hiciera falta): `mail.activity/action_feedback` con `ids:[…]` y `feedback`. En la 17+, si el tipo tiene `keep_done`, la actividad hecha se archiva en lugar de borrarse.
- `activity_schedule` (método de la tarea que acepta el XML ID del tipo) también existe y es público, pero se recomienda `create`, que es explícito e igual en todas las versiones.

Tipos de actividad propuestos (los crea el script; modelo `project.task`):

| Tipo | Lo crea | Origen |
|---|---|---|
| EPI10 · Pedir test | Monolito | Etapa `listo_test` (D3) |
| EPI10 · Alta manual en Healthie | Monolito | Fallo o ausencia de la API de Healthie (ADR) |
| EPI10 · Completar código de barras | Monolito | `test_realizado` sin `x_epi10_codigo_barras` (D8) |
| EPI10 · Pendiente de reagendar | Monolito | Cita cancelada |
| EPI10 · Revisar informe | Monolito | Borrador generado en `informes` |
| EPI10 · Revisar cierre | Monolito | Etapa `entregado` (D10) |
| EPI10 · Revisar caso | Monolito | Reintentos agotados, etapa incoherente o contacto duplicado |

---

## 4. Webhooks salientes (SKI2-165)

### 4.1 Qué ofrece Odoo

- **Versión mínima: 17.** La acción de servidor `webhook` («Send Webhook Notification») no existe en la 16.
- Vive en `base_automation` (Reglas de automatización), un **módulo estándar de Community**. Hay que comprobar que está instalado. En Enterprise lo instala Studio; en Community se gestiona desde Ajustes ▸ Técnico ▸ Automatizaciones, en modo desarrollador.
- Tanto la regla (`base.automation`) como su acción (`ir.actions.server`) se pueden crear por API con un usuario administrador. Lo hace el script `odoo:setup`.

### 4.2 Lo que envía (comprobado en el código de la 17, 18, 19 y 20)

```http
POST <webhook_url>
Content-Type: application/json            ← única cabecera; sin firma ni autenticación

{"_action": "EPI10 · hito → monolito(#123)",
 "_id": 42,
 "_model": "project.task",
 "id": 42,
 "stage_id": 7,
 "write_date": "2026-10-03 16:20:11",
 "write_uid": 9,
 "x_epi10_case_id": "EPI10-2026-0001",
 "x_epi10_codigo_barras": false}
```

- Fijos: `_model`, `_id`, `_action`. Además, los campos elegidos en `webhook_field_ids`, leídos con `load=None`. Por eso los many2one llegan como **id entero**, sin nombre.
- Las fechas se serializan con `str()`: `"YYYY-MM-DD HH:MM:SS"` en UTC, sin zona horaria. Los vacíos llegan como `false`.
- Odoo no deja incluir campos restringidos por grupos.
- **Tiempo de espera: 1 s, sin reintentos.** Si falla o tarda más, solo deja un aviso en el log del servidor.
- **17 y 18:** la llamada se hace **dentro de la transacción**, antes del commit. Si la escritura falla después, el monolito puede recibir un aviso de un cambio que nunca se guardó.
- **19 y 20:** se envía **después del commit**, y no se envía si hay rollback.
- La documentación de usuario de la 18 muestra `model`/`id` en el ejemplo de webhook entrante. El código de la 17–20 usa `_model`/`_id`, y es lo que vale.

### 4.3 Configuración de la regla

| Campo | Valor |
|---|---|
| Modelo | `project.task` |
| Disparador | `on_create_or_write` («Al crear y editar»), con `trigger_field_ids = [stage_id, x_epi10_codigo_barras]`. Sin campos de disparo, la regla se ejecuta en cada guardado. |
| Filtro (`filter_domain`, después del cambio) | `[("project_id","=",<Casos EPI10>), ("write_uid","!=",<uid de epi10-integracion>)]`. Excluir los cambios del propio monolito **evita bucles**. Hay que verificarlo en staging. |
| Acción | `state = "webhook"`, `webhook_url`, `webhook_field_ids = [stage_id, write_date, write_uid, x_epi10_case_id, x_epi10_codigo_barras]` |

Alternativa: una regla por etapa con «Etapa establecida en» (`on_stage_set`). Habría 5 reglas en lugar de una, sin ninguna ventaja.

### 4.4 Receptor `POST /webhooks/odoo/:token`

1. **Autenticación:** Odoo no permite añadir cabeceras ni firmas. Por eso el secreto va **en la URL** (token aleatorio de 32 bytes o más, comparado en tiempo constante). Además, si es posible, se restringe por red: Odoo y el monolito están en el mismo servidor y el webhook puede ir por la red interna. Así la ruta de Odoo no tiene que estar en Internet.
2. **Contestar en menos de 1 s:** se valida el token, se guarda el evento en la outbox y se devuelve `200`. Nada más.
3. **No fiarse del contenido:** el trabajo vuelve a leer la tarea por API (`readCase`) y actúa sobre lo que lee. Esto protege de payloads falsos y de avisos enviados antes de un commit fallido (17 y 18).
4. **Clave de idempotencia:** `odoo:{_id}:{stage_id}:{write_date}`. Además, `core` solo actúa si la etapa leída es distinta de la última que conoce.

### 4.5 Plan B y red de seguridad: consulta por `write_date`

Se usa como plan B en la 16, o si no se permite el webhook. **También se recomienda como reconciliación en todas las versiones**, porque el webhook no reintenta. La misma rutina sirve para los dos casos, con distinta frecuencia:

| Modo | Frecuencia |
|---|---|
| Sin webhook (16, o webhook no permitido) | Cada 60–120 s |
| Con webhook | Cada 10–15 min, solo para recuperar avisos perdidos |

```json
project.task/search_read
{"domain":[["project_id","=",5],["write_date",">=","<cursor − 5 s>"]],
 "fields":["stage_id","write_date","write_uid","x_epi10_case_id","x_epi10_codigo_barras"],
 "order":"write_date asc, id asc","limit":200}
```

- El cursor es el mayor `write_date` **devuelto por Odoo**, no la hora local. Se resta un solape de 5 s y se deduplica.
- `write_date` cambia con cualquier escritura, incluidas las del monolito. Para saber si hubo un cambio real, se compara con la etapa guardada en `core`.
- No detecta borrados. Si un caso desaparece, `readCase` devuelve vacío y `core` lo registra como alerta. No se puede crear una actividad en una tarea que ya no existe.

---

## 5. Odoo simulado (SKI2-163)

Objetivo: que la porción vertical «pago → caso» y las pruebas de `odoo` funcionen sin un Odoo real, con el mismo contrato del adaptador. Es un servicio pequeño (un controlador NestJS o Express) con almacén en memoria y semilla en JSON.

### 5.1 Endpoints

| Endpoint | Comportamiento |
|---|---|
| `GET /web/version` | `{"version_info":[ODOO_MOCK_VERSION,0,0,"final",0,""],"version":"19.0"}`. La versión se configura. |
| `POST /jsonrpc` · `common.authenticate` | Con login y clave correctos devuelve el uid; si no, `false`. |
| `POST /jsonrpc` · `object.execute_kw` | Pasa al despachador común. Los errores siguen la forma `{"error":{"code":200,"message":"Odoo Server Error","data":{"name":"odoo.exceptions.AccessError","message":"…"}}}`. |
| `POST /json/2/:model/:method` | `Authorization: bearer`. Sin clave o con una inválida: `401 {"name":"werkzeug.exceptions.Unauthorized","message":"Invalid apikey"}`. Pasa al mismo despachador. Los errores devuelven `4xx/5xx` con `{name, message, arguments, context, debug}`. |

### 5.2 Modelos y métodos a imitar

| Modelo | Métodos | Notas |
|---|---|---|
| `res.partner` | `search_read`, `create`, `write`, `read` | `email` con `=ilike` |
| `project.project` | `search_read` | Semilla: «Casos EPI10» (id 5) |
| `project.task.type` | `search_read` | Semilla: las 11 etapas con `x_epi10_code` |
| `project.task` | `search`, `search_read`, `read`, `create`, `write`, `fields_get` | Mantiene `write_date` y `write_uid`. Devuelve `stage_id` como `[id, nombre]` en `read`. Rechaza campos desconocidos con `ValueError: Invalid field 'x' on model 'project.task'`. |
| `mail.activity` | `create`, `search_read`, `action_feedback` | Exige `res_model_id`, `res_id`, `date_deadline` |
| `mail.activity.type` | `search_read` | Semilla: «Por hacer» y los tipos EPI10 |
| `ir.model` | `search_read` | `project.task` → id 312 |
| `res.users` | `search_read`, `context_get` | Semilla: `epi10-integracion` (uid 9) y Aitor (uid 12) |

Dominios: basta con `=`, `!=`, `in`, `>=`, `>`, `=ilike` y `&` implícito. No hace falta un intérprete completo.

Respuestas que hay que respetar: `create` devuelve una lista de IDs en JSON-2 (`vals_list`) y un ID suelto si en JSON-RPC se pasa un único diccionario. `write` devuelve `true`. Los vacíos se devuelven como `false`.

### 5.3 Webhook saliente simulado

Al hacer `write` sobre `stage_id` o `x_epi10_codigo_barras` de una tarea del proyecto 5, cuando `write_uid` no es el bot, el simulador hace `POST` a `MOCK_WEBHOOK_URL` con el payload de 4.2 y un tiempo de espera de 1 s, sin reintentos.

### 5.4 Endpoints de control (solo en pruebas)

| Endpoint | Para qué |
|---|---|
| `POST /__mock/reset` y `POST /__mock/seed` | Estado limpio o una semilla concreta |
| `GET /__mock/state` | Inspeccionar tareas, actividades y llamadas recibidas |
| `POST /__mock/aitor/move-stage {taskId, code}` | Simular que Aitor mueve la etapa (escribe con uid 12 y dispara el webhook) |
| `POST /__mock/faults {method, mode}` | Fallos programados: `http500`, `timeout` (responde a los 35 s), `auth`, `drop_webhook`, `duplicate_webhook`, `webhook_before_rollback` (envía el aviso y no guarda el cambio, como la 17–18) |

### 5.5 Escenarios mínimos de prueba

1. Pago → contacto nuevo + caso en `nuevo` (y, con un contacto existente, que lo reutilice).
2. Webhook de Stripe repetido: un solo caso.
3. Fallo temporal en `create` → reintento → sin duplicado.
4. `listo_test` → actividad «Pedir test» asignada a Aitor (uid 12), sin duplicarla.
5. Aitor pasa a `test_pedido` → webhook → evento en `core` → lectura por API → trabajo de Healthie encolado.
6. Webhook perdido → la reconciliación lo detecta.
7. Webhook antes de un rollback → la lectura no confirma el cambio → no se hace nada.
8. `test_realizado` sin código de barras → actividad «Completar código de barras».
9. Escritura del propio monolito → no sale webhook (filtro por `write_uid`).
10. Token de webhook inválido → `401` y nada en la outbox.

---

## 6. Preguntas para la sesión con el mantenedor (SKI2-104)

Amplían el correo del 3 oct (`04_outputs/2026-10-03_correo_carmen_odoo_v1.md`) sin repetirlo.

1. **Versión exacta:** el resultado de `GET /web/version`. Si es Online, la versión SaaS. ¿Hay migraciones previstas en los próximos 12 meses?
2. **Plan:** si es Enterprise, ¿qué plan tienen (Custom o Standard)? ¿Ocupa licencia de pago el usuario técnico?
3. **Apps instaladas:** ¿Proyecto, CRM, Helpdesk, Reglas de automatización (`base_automation`), Studio? Si no hay Proyecto, ¿aceptan activarlo?
4. **Uso actual:** ¿usan ya Proyecto o CRM para otra cosa? ¿Podemos crear un proyecto «Casos EPI10» con etapas propias?
5. **Configuración por API:** ¿aceptan que un script nuestro cree campos `x_epi10_*`, etapas, tipos de actividad, una vista heredada y una regla de automatización, todo sin módulo? ¿Lo ejecutan ellos o nos dan una clave de administrador temporal?
6. **Usuario técnico** `epi10-integracion`: ¿con qué grupos? (propuesta: Proyecto ▸ Usuario + creación de contactos). ¿Quién genera la clave? En la 18+ caduca a los 90 días como máximo: ¿rotación manual cada 90 días, o un grupo con un `api_key_duration` mayor?
7. **Red:** ¿Odoo puede llamar al monolito por red interna (mismo host o red Docker)? ¿Hay cortafuegos de salida? ¿Hay proxy inverso? ¿Varias bases de datos o `dbfilter` (para saber si hace falta `X-Odoo-Database`)?
8. **Usuarios:** ¿Aitor y Carmen tienen usuario en Odoo? ¿Cuál es su login? ¿Hay servidor de correo saliente configurado (para las notificaciones de actividades)?
9. **Staging:** ¿hay una copia neutralizada donde probar el script y las reglas antes de producción? La documentación de Odoo lo recomienda para los webhooks.
10. **Conflictos:** ¿hay reglas de automatización o desarrollos a medida sobre `project.task` o `res.partner` que puedan chocar con las nuestras?
11. **Logs:** ¿podemos ver los avisos del servidor de Odoo (`Webhook call failed/timed out`) o nos los pasan si hay incidencias?
12. **Multiempresa, idioma y zona horaria** de la base de datos (afecta a `company_id`, a los nombres de las etapas y a las fechas de las actividades).

## Decisiones para Raúl

- **Validar `project.task` como modelo del caso** y las 11 etapas de 2.2.
- **Cómo marca Aitor los hitos.** Propuesta: moviendo la etapa en el kanban. La alternativa son casillas `x_` por hito, que exigen más campos y más reglas. Conviene confirmarlo con Aitor.
- **Notificaciones por correo** de las actividades a Aitor: activadas (propuesta) o desactivadas.

## Unknown

- Versión, edición, plan y alojamiento del Odoo de EPI10 (SKI2-104).
- Apps instaladas, en particular Proyecto y `base_automation`.
- Si el usuario técnico consume licencia.
- En qué versión SaaS de Online se introdujo JSON-2.
- Formato exacto del error de JSON-RPC: no figura en la página de la API y hay que contrastarlo con un Odoo real.
- Si el filtro `write_uid != bot` en `filter_domain` evita el bucle en todos los casos: hay que verificarlo en staging.
- `crm.stage` en la 20 (solo verificado hasta la 19).
- Topología de red entre Odoo y el monolito en el servidor de EPI10.

## Fuentes

- External API 16.0, 17.0, 18.0: <https://www.odoo.com/documentation/17.0/developer/reference/external_api.html> (misma ruta para 16.0 y 18.0).
- External JSON-2 API 19.0 y 20.0: <https://www.odoo.com/documentation/19.0/developer/reference/external_api.html>, <https://www.odoo.com/documentation/20.0/developer/reference/external_api.html>.
- Automation rules: <https://www.odoo.com/documentation/19.0/applications/studio/automated_actions.html> (y 16.0, 17.0, 18.0).
- Webhooks entrantes: <https://www.odoo.com/documentation/18.0/applications/studio/automated_actions/webhooks.html> (y 19.0).
- Planes: <https://www.odoo.com/pricing-plan>.
- Código de `odoo/odoo` (ramas 16.0–20.0):
  - `odoo/addons/base/models/ir_actions.py`: `_run_action_webhook` y `_check_webhook_field_ids`.
  - `addons/base_automation/models/base_automation.py`: disparadores, `trigger_field_ids`, `filter_domain`, `record_getter`.
  - `odoo/addons/base/models/res_users.py`: claves, `_check_expiration_date`, `generate`/`revoke`.
  - `odoo/addons/base/security/base_groups.xml`: `api_key_duration` = 90.
  - `addons/mail/models/mail_activity.py`: `create`, `action_notify`, `mail_activity_quick_update`.
  - `addons/mail/models/mail_activity_mixin.py`: `activity_schedule`.
  - `addons/project/models/project_task.py`: `stage_id`, `user_ids`, `state`, `date_deadline`.
  - `addons/crm/models/crm_stage.py`: `team_id` y `team_ids`.
  - `addons/mail/models/ir_model.py`: `is_mail_thread`, `is_mail_activity`.
  - `addons/helpdesk` no existe en el repositorio Community.
