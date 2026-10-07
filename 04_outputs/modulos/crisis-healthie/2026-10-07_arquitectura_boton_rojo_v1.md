# Arquitectura del «botón rojo»: portal propio del cliente y back office (v1)

Fecha: 2026-10-07 · Linear: SKI2-205 (opción B de la crisis de Healthie, SKI2-204) · Estado: **propuesta, pendiente de decisión de Raúl**
Contexto: [noticias de Healthie 7 oct](../healthie/2026-10-07_noticias_healthie_v1.md) · [journey v2](../journey/2026-10-03_customer_journey_mvp_v2.md) (test mixto desde el 4 oct, SKI2-186) · [ADR del orquestador](../integracion/2026-10-03_adr_orquestador_v1.md) · [contrato de Healthie](../healthie/2026-10-03_contrato_api_healthie_v1.md) · monolito `Skilland-ai/epi10-orquestador` (master `bab87af`)

**Qué es este documento.** Si EPI10 no paga la API de Healthie (475 $/mes el primer año, 950 $/mes el segundo, después 1.900 $/mes) y «a las malas» tenemos que construir nosotros lo que Healthie iba a dar, esta es la arquitectura. Está pensada para ejecutarse sin más diseño: componentes, modelo de datos, flujos, RGPD, qué se compra y qué se construye, horas e issues. Nada de lo que sigue está construido. Lo que no sabemos se marca como **Unknown**.

**Resumen en cinco líneas.**

1. **Un módulo más del monolito** (`portal`), no una app aparte: misma base de datos, mismo outbox, mismo despliegue en el servidor de EPI10. Frontend renderizado en el servidor, como la pantalla de informes, con HTMX para el chat.
2. **El monolito pasa a guardar datos de salud** (encuesta de hábitos, consentimiento firmado, informe final). Es el cambio de fondo: hoy solo guarda IDs. Se aísla en un esquema `portal` de PostgreSQL cifrado por columna, con registro de accesos y retención definida.
3. **Se compra** el correo transaccional (Scaleway TEM o Brevo, UE) y se sigue usando Stripe para cobrar. **Se construye** todo lo demás: acceso por enlace mágico, consentimiento con prueba, encuesta, chat sin tiempo real y publicación del informe. Nada de firma cualificada ni de proveedores de chat.
4. **Odoo sigue siendo el back office de operaciones.** El back office del portal (ver clientes, formularios, consentimiento, chat, publicar) es la pantalla de informes ampliada, en el mismo monolito.
5. **Coste:** MVP mínimo de **56 a 70 h** más un bloque legal de 8 a 12 h. **No cabe en lo que quede de las 110 h** (consumo actual: Unknown). Hay que renegociar alcance o presupuesto con Carmen, o aceptar la opción A (Healthie a mano) para los primeros casos mientras se construye.

---

## 1. Alcance mínimo viable

### 1.1 Qué daba Healthie y con qué se sustituye

| Función de Healthie que usábamos | Paso del journey | Sustituto en el portal propio | ¿MVP? |
|---|---|---|---|
| Alta del cliente e invitación por correo | 1.2–1.3 | El monolito crea la cuenta del portal al confirmar el pago y envía un **enlace mágico** en español | Sí |
| Onboarding (intake flow): consentimiento + datos básicos | 2.1–2.2 | **Consentimiento versionado** + **encuesta de hábitos** como formulario propio. Al completarse, D3 («listo para pedir test») se cumple dentro del monolito, sin webhook externo | Sí |
| Grupos (nuevo / test recibido / informe entregado) | 1.3, 3.3, 5.1 | Desaparecen. El estado del caso del `core` ya es la fuente de verdad; el portal lo muestra como «fase» | Sí (gratis) |
| Mensajes de hito al cliente (4 plantillas) | 3.1, 3.3, 4.2, 5.1 | Mensaje en el **hilo del caso** + correo de aviso en español | Sí |
| Chat con el cliente | 5.2 | **Hilo de mensajes** por caso, sin tiempo real: el cliente escribe en el portal, el equipo responde desde el back office, correo de aviso a ambos lados | Sí |
| Citas (D4) | 3.4 | **Fuera del MVP.** Cita opcional (test mixto): se acuerda por el hilo del caso y Aitor la anota en Odoo. Fase 2: enlace a Cal.com o Calendly, o módulo propio | No |
| Documentos: publicar el PDF del informe | 5.1 | **Informe en el portal**: PDF cifrado en PostgreSQL (o en objeto S3 UE), descarga autenticada con registro de acceso | Sí |
| Perfil del cliente (nombre, email, teléfono) | — | Lo guarda el portal, mínimo necesario. Deja de leerse de Stripe en cada trabajo | Sí |
| Marca y correos de Healthie (en inglés, restringidos) | todo | Marca EPI10 y español en todo | Sí |
| App móvil del cliente | — | Web responsive. Sin app | No |
| Venta adicional | Fuera de Fase 1 en el journey | **Catálogo mínimo** en el portal: botón «Comprar» que abre un Checkout de Stripe con el `customer` ya conocido | Sí, mínimo |

### 1.2 Funciones del cliente (MVP)

1. Entra en el portal desde el correo recibido tras pagar (enlace mágico). Sin contraseña.
2. Lee y acepta el **consentimiento** para el tratamiento de datos de salud y genéticos (texto de EPI10, versionado).
3. Rellena la **encuesta de hábitos de vida** (una sola página o pasos, guardado parcial).
4. Ve en qué **fase** está su caso (las 5 del journey, en lenguaje de cliente).
5. Escribe y lee **mensajes** con el equipo. Recibe un correo cuando le responden.
6. Ve y descarga su **informe** cuando se publica. Recibe un correo de aviso.
7. Ve la **oferta de productos** y paga en Stripe sin volver a meter sus datos.
8. Puede pedir la **descarga o el borrado** de sus datos (botón que abre una solicitud; la ejecución es del equipo).

### 1.3 Funciones del equipo (MVP)

En el **back office del portal**, que es la pantalla de informes actual ampliada (misma autenticación, mismo diseño):

1. Lista de casos con fase, fecha, consentimiento (sí/no, versión) y encuesta (pendiente/completa).
2. Ficha del caso: datos de contacto, consentimiento con su prueba, respuestas de la encuesta, hilo de mensajes, informe.
3. Responder mensajes. Plantillas de los 4 hitos ya existen en `mensajes.ts`.
4. Publicar el informe (ya existe: «Validar y publicar»). El publicador pasa a escribir en el portal en lugar de en Healthie.
5. Atender solicitudes ARCO (exportar, borrar) con un botón y un registro.

En **Odoo** sigue todo lo demás: etapas, actividades de Aitor, hitos (test pedido, recibido, realizado, muestra enviada, entregable), código del kit (D8) e incidencias. **No se duplica el kanban en el portal.**

### 1.4 Fuera del MVP (Fase 2)

Citas con agenda, notificaciones push o SMS, chat en tiempo real, app móvil, feedback post-entrega, segundo idioma, carrito con varios productos, suscripciones.

---

## 2. Componentes y despliegue

### 2.1 Decisión: módulo del monolito, no app aparte

| Criterio | Módulo `portal` dentro del monolito | App aparte (Next.js u otro) |
|---|---|---|
| Mantenimiento | Un repositorio, un despliegue, un CI. Lo mantiene una persona | Dos repos, dos despliegues, un contrato de API entre ambos |
| Datos | Misma PostgreSQL y mismo outbox: consentimiento y encuesta transaccionales con el estado del caso | Hace falta una API interna autenticada, o dos bases de datos |
| Seguridad | Un perímetro (Caddy), las mismas cabeceras y sesiones que ya pasaron revisión | Otro perímetro, otra gestión de sesiones, CORS |
| Horas | Reutiliza acceso, sesiones, CSRF, plantillas HTML y el patrón de pantalla de informes | Montar el esqueleto cuesta 8–12 h antes de la primera función |
| Experiencia | HTML servidor, responsive, rápido en móvil. Sin interactividad rica | Más margen para UI rica, que el MVP no necesita |
| Vercel (app de Stripe) | Sigue siendo solo la página de compra y demo | Podría evolucionar, pero infraestructura en EE. UU. y descartada en el ADR |

**Decisión:** módulo `portal` del monolito. Es coherente con el ADR («un solo repositorio que mantener», «datos en la UE, en el servidor del cliente») y con lo que ya funciona en la pantalla de informes.

### 2.2 Frontend

- **HTML renderizado en el servidor** con las mismas plantillas que la pantalla de informes (sin framework de frontend), CSS propio con la marca EPI10 y **HTMX** (un archivo de 14 KB, servido en local) para: refrescar el hilo de mensajes cada 30 s, enviar formularios sin recargar y guardado parcial de la encuesta.
- Sin build de frontend, sin bundler, sin React. Si en Fase 2 hiciera falta algo más rico, el módulo expone ya rutas JSON y se puede poner una SPA delante sin rehacer el backend.
- Accesibilidad básica (etiquetas, contraste, teclado) y móvil primero: el cliente entrará desde el correo en el teléfono.

### 2.3 Componentes

```text
Monolito EPI10 (NestJS + PostgreSQL), servidor de EPI10
├─ core       caso, estados, eventos, outbox              (existe)
├─ stripe     webhook de pago + Checkout de venta adicional (existe + ampliar)
├─ odoo       adaptador y webhook                          (existe)
├─ informes   pantalla, seudonimizador, borrador, publicar (existe; el publicador cambia de destino)
├─ healthie   cliente, webhooks, alternativa manual        (queda inactivo; no se borra)
└─ portal     NUEVO
   ├─ acceso        enlaces mágicos, sesiones del cliente, cierre de sesión
   ├─ consentimiento textos versionados, aceptación con prueba
   ├─ encuesta      definición del formulario (YAML/JSON), respuestas, guardado parcial
   ├─ mensajes      hilo por caso, plantillas de hito, avisos por correo
   ├─ informe       publicador «portal», almacenamiento cifrado, descarga registrada
   ├─ tienda        catálogo mínimo, sesión de Checkout con customer de Stripe
   ├─ correo        adaptador SMTP/API (Scaleway TEM o Brevo), plantillas en español
   ├─ rgpd          registro de accesos, exportación, borrado, retención
   └─ backoffice    ampliación de la pantalla /informes: casos, ficha, chat, ARCO

Externos: Stripe (pago) · proveedor de correo UE · Odoo (back office de operaciones)
```

### 2.4 Despliegue

Igual que el ADR: Docker Compose con app, PostgreSQL y Caddy en el servidor de EPI10. Cambios:

| Punto | Hoy | Con el portal |
|---|---|---|
| Rutas públicas en Caddy | `/webhooks/*` e `/informes/*` | Además `/portal/*` y `/static/*`. El resto sigue en 404 |
| Dominio | Subdominio Unknown | Recomendado un subdominio del cliente, p. ej. `portal.epi10.es` (Unknown: quién gestiona el DNS). Mismo certificado Let's Encrypt |
| Correo saliente | Ninguno | Proveedor UE con dominio verificado (SPF, DKIM, DMARC en `epi10.es`): lo tiene que configurar quien gestione el DNS de EPI10 |
| Copias de seguridad | Volcado diario, destino Unknown | **Pasan a ser obligatorias y cifradas**: ahora hay datos de salud. Destino en la UE y retención acorde con §5.5 |
| Clave de cifrado | No hay | Variable `PORTAL_DATA_KEY` en el `.env` del servidor, fuera del repositorio y de las copias de la base de datos |
| Instancias | Una (la bandeja en memoria lo exige) | Una. Sin cambios |
| Recursos | Unknown | El portal añade poca carga: decenas de clientes al mes. Un servidor pequeño sobra |

**Separación con Odoo:** sigue siendo de acuerdo y de proceso (misma máquina). Con datos de salud en el monolito conviene pactar con Aresoltec que el acceso al servidor queda registrado y limitado (§5.3).

---

## 3. Modelo de entidades

### 3.1 Principio: dos zonas en una base de datos

| Zona | Esquema PostgreSQL | Qué guarda | Cifrado |
|---|---|---|---|
| **Operativa** (existe) | `public`: `cases`, `case_events`, `jobs`, `informes_*`, `odoo_sync_state` | Solo IDs, estados, eventos. Sin datos personales (lo hace cumplir `assertSafeRecord`) | Disco (del servidor) |
| **Portal** (nueva) | `portal`: tablas de abajo | Datos personales y **de salud** del cliente | Columna a columna (AES-256-GCM, clave en `.env`) para respuestas, mensajes, informe y prueba del consentimiento; además disco |

El `case_id` es la única clave que une las dos zonas. Los `jobs` y `case_events` siguen sin llevar datos personales: solo IDs de fila del esquema `portal`.

### 3.2 Tablas

Prefijo `portal.` en todas. Tipos simplificados.

| Tabla | Campos principales | Notas |
|---|---|---|
| `clientes` | `cliente_id` PK, `email` (único, cifrado determinista o hash para búsqueda), `nombre`, `apellidos`, `telefono` (opc.), `stripe_customer_id`, `odoo_partner_id`, `idioma` = `es`, `creado_en`, `borrado_en` | Un cliente puede tener varios casos (recompra). Datos de contacto mínimos. **Sin** fecha de nacimiento ni DNI salvo que el consentimiento lo exija (Unknown) |
| `casos_portal` | `case_id` PK/FK → `public.cases`, `cliente_id` FK, `fase_visible`, `consentimiento_ok_en`, `encuesta_completada_en` | Extiende el caso del `core` con lo que ve el cliente. `fase_visible` se deriva del estado del `core` |
| `enlaces_acceso` | `token_hash` PK, `cliente_id`, `proposito` (`alta`, `login`, `informe`), `expira_en`, `usado_en`, `creado_en` | Enlace mágico. Solo se guarda el SHA-256 del token. Un uso, 24 h para el alta, 15 min para el login |
| `sesiones_cliente` | `token_hash` PK, `cliente_id`, `csrf_token`, `expira_en`, `ultimo_uso_en`, `user_agent_hash` | Misma mecánica que `informes_sesiones`. 30 días con renovación deslizante, cierre al cambiar de dispositivo |
| `consentimientos_version` | `version_id` PK, `codigo` (`salud-genetico`), `version` (`1.0`), `texto_md`, `hash_sha256`, `vigente_desde`, `vigente_hasta`, `aprobado_por` | El texto que vio el cliente queda fijado por hash. El texto lo da EPI10 (SKI2-184: Unknown) |
| `consentimientos` | `consentimiento_id` PK, `case_id`, `cliente_id`, `version_id` FK, `aceptado_en`, `ip_hash`, `user_agent`, `evidencia` (JSON cifrado: hash del texto, casillas marcadas, nombre tecleado), `revocado_en` | **Prueba** del consentimiento (§5.1). Nunca se borra mientras exista el caso; al borrar al cliente se conserva seudonimizado |
| `encuestas_version` | `version_id` PK, `codigo` (`habitos`), `version`, `definicion` (JSON: preguntas, tipos, obligatorias), `vigente_desde` | El formulario de hábitos como dato, no como código. Lo da EPI10 (Unknown) |
| `encuestas_respuesta` | `respuesta_id` PK, `case_id`, `version_id`, `respuestas` (JSON **cifrado**), `estado` (`borrador`, `enviada`), `enviada_en`, `actualizada_en` | Datos de salud. Una por caso. El guardado parcial actualiza `borrador` |
| `hilos` | `hilo_id` PK, `case_id` (único), `ultimo_mensaje_en`, `no_leidos_cliente`, `no_leidos_equipo` | Un hilo por caso |
| `mensajes` | `mensaje_id` PK, `hilo_id`, `autor_tipo` (`cliente`, `equipo`, `sistema`), `autor_id`, `cuerpo` (texto **cifrado**), `plantilla` (opc.), `creado_en`, `leido_en` | El cuerpo puede contener salud. Sin adjuntos en el MVP |
| `informes` | `informe_id` PK, `case_id`, `version`, `pdf` (bytea **cifrado**) o `objeto_url`, `sha256`, `tamano`, `publicado_en`, `publicado_por`, `retirado_en` | Dato de salud. Una fila por publicación; la republicación añade versión y retira la anterior |
| `productos` | `producto_id` PK, `nombre`, `descripcion`, `stripe_price_id`, `activo`, `orden` | Catálogo mínimo. Sin stock |
| `pedidos_adicionales` | `pedido_id` PK, `cliente_id`, `producto_id`, `stripe_checkout_session_id`, `estado`, `creado_en`, `pagado_en` | La venta adicional no abre caso nuevo salvo que el producto sea «test» |
| `registro_accesos` | `acceso_id` PK, `ocurrido_en`, `actor_tipo`, `actor_id`, `cliente_id`, `case_id`, `recurso` (`encuesta`, `informe`, `mensajes`, `consentimiento`, `ficha`), `accion` (`ver`, `descargar`, `editar`, `exportar`, `borrar`), `ip_hash` | **Solo inserción** (sin UPDATE/DELETE para el rol de la app). Lo exige el art. 9 en la práctica (§5.4) |
| `solicitudes_rgpd` | `solicitud_id` PK, `cliente_id`, `tipo` (`acceso`, `borrado`, `rectificacion`, `portabilidad`), `solicitada_en`, `resuelta_en`, `resuelta_por`, `nota` | Plazo legal de un mes. El back office las lista |
| `correos_enviados` | `correo_id` PK, `cliente_id`, `plantilla`, `proveedor_msg_id`, `enviado_en`, `estado` | Trazabilidad del envío, sin el cuerpo |

### 3.3 Qué sigue guardando solo IDs

- `public.cases`: añade `portal_cliente_id` (FK lógica). Nada más.
- `public.case_events`: tipos nuevos (`portal.acceso_enviado`, `portal.consentimiento_aceptado`, `portal.encuesta_enviada`, `portal.mensaje_enviado`, `portal.informe_publicado`, `portal.venta_adicional`) con `metadata` solo de IDs.
- `public.jobs`: payloads solo con IDs (`clienteId`, `mensajeId`, `informeId`).
- Odoo: contacto, hitos, actividades. **Nunca** la encuesta ni el informe. El caso de Odoo enlaza a la ficha del back office del portal (`x_epi10_url_informes` ya existe).
- Stripe: pago, `customer`, método de pago. El monolito guarda `stripe_customer_id` en `portal.clientes` para la venta adicional.

### 3.4 Qué cambia en las reglas de datos del ADR

| Regla del ADR | Antes | Ahora |
|---|---|---|
| «El monolito guarda solo IDs, estados y eventos» | Sí | **Solo la zona operativa.** La zona `portal` guarda datos personales y de salud, cifrados |
| «Nombre y email se leen de Stripe cuando hacen falta» | Sí | El portal los guarda (hay que enviar correos y mostrar la ficha). `CUSTOMER_CONTACT_SOURCE` pasa a leer del portal, con Stripe como respaldo |
| «El informe se publica en Healthie y se borra del monolito» | Sí | El informe **se queda** en el portal mientras dure la retención (§5.5). El borrador seudonimizado se sigue borrando al publicar |
| «El entregable de TellmeGen entra, se usa y se borra» | Sí | **Sin cambios** |
| «Logs sin datos personales» | Sí | **Sin cambios**. El `registro_accesos` es una tabla, no un log |

---

## 4. Flujos del journey con el portal

Convención: **[reutiliza]** = pieza que ya existe en el monolito.

### 4.1 Pago → acceso

```text
Stripe ─webhook─► stripe [reutiliza]: firma, validación, dedupe, caso en pago_confirmado
   └─► outbox [reutiliza]: odoo.create_case [reutiliza] + portal.crear_acceso (NUEVO, sustituye a healthie.create_client)
portal.crear_acceso:
   1. lee nombre y email de la sesión de Stripe (StripeContactSource [reutiliza])
   2. busca o crea portal.clientes por email (candado por hash de email, como hacía healthie.create_client)
   3. crea casos_portal y el hilo del caso
   4. genera enlace mágico «alta» (24 h), guarda solo el hash
   5. encola portal.enviar_correo {clienteId, plantilla: bienvenida, enlaceId}
   6. caso → alta_completada
Cliente: abre el correo → GET /portal/acceso/<token> → sesión de 30 días → /portal (consentimiento)
```

- **Enlace mágico, no contraseña.** Motivo: cero fricción en el móvil, nada que recordar, nada que filtrar. El riesgo es el buzón del cliente, igual que con cualquier «restablecer contraseña». Mitigación: un solo uso, caducidad corta, el enlace no da acceso al informe sin sesión y la descarga del informe pide **re-autenticación por correo** si la sesión tiene más de 24 h (§5.3).
- **Volver a entrar:** `/portal/entrar` pide el email y envía un enlace de 15 min. No se confirma si el email existe (misma respuesta siempre).
- **Alternativa que no se recomienda:** contraseña + email de verificación. Añade 4–6 h (restablecer, política, bloqueo) y peor experiencia.
- **Si el correo no llega:** la página de gracias de Stripe muestra «Revisa tu correo. ¿No llega? Pulsa aquí» que reenvía (límite 3 por hora). Si Aitor lo necesita, el back office tiene «Reenviar acceso». El caso no se pierde: el `core` sigue en `alta_completada`.
- **Fallback manual:** desaparece la actividad «Alta manual en Healthie». Si el correo falla de forma permanente (dominio inválido), se escala a Odoo con «Revisar contacto del cliente» [reutiliza el escalado].

### 4.2 Consentimiento (versionado y con prueba)

```text
GET /portal/consentimiento → muestra consentimientos_version vigente (texto Markdown → HTML) con su hash
POST /portal/consentimiento → requiere: casilla «He leído y acepto», segunda casilla para datos genéticos, nombre tecleado
   transacción: consentimientos (aceptado_en, ip_hash, user_agent, evidencia cifrada) + case_events portal.consentimiento_aceptado
   → siguiente paso: encuesta
```

- **Firma:** «firma electrónica simple» en el sentido de eIDAS (casilla + identidad por el enlace del correo + registro). Suficiente para un consentimiento RGPD, que no exige forma escrita sino que sea **explícito, informado y demostrable**. No hace falta Yousign ni firma cualificada (§6).
- **Prueba:** hash del texto exacto, versión, fecha y hora, IP (hash), agente de usuario, casillas y nombre tecleado. Se puede exportar como PDF de evidencia desde el back office.
- **Cambio de versión:** si EPI10 cambia el texto, los clientes nuevos ven la nueva; a los que están a mitad de caso se les pide aceptar la nueva **solo si el cambio amplía el tratamiento** (decisión legal, Unknown). El sistema lo soporta: `vigente_hasta` y comparación por `version_id`.
- **Revocación:** botón «Retirar mi consentimiento» → `revocado_en` + solicitud RGPD de borrado + actividad en Odoo «Cliente retira consentimiento» para que Carmen decida (devolución, parada del test).
- **Qué dice el consentimiento:** lo redacta EPI10 con su asesor (SKI2-184). Debe cubrir: finalidad (informe nutricional a partir del test epigenético), categorías (salud, genéticos), encargados (TellmeGen, Skilland como desarrollador si tiene acceso, proveedor de correo, hosting), transferencias (TellmeGen: Unknown si trata fuera de la UE), plazo y derechos. **Unknown:** si EPI10 ya tiene un texto con TellmeGen.

### 4.3 Encuesta de hábitos

```text
GET /portal/encuesta → formulario desde encuestas_version.definicion (JSON) · guardado parcial con HTMX cada cambio de sección
POST /portal/encuesta/enviar → valida obligatorias → respuestas cifradas, estado enviada
   transacción: case_events portal.encuesta_enviada + core: alta_completada → onboarding_completado [reutiliza la transición]
   → outbox odoo.set_fields x_epi10_onboarding_ok [reutiliza] + odoo.move_stage «Listo para pedir test» + actividad «Pedir test» [reutiliza, hoy lo hace el webhook de Healthie]
```

- **D3 se cumple dentro del monolito:** consentimiento aceptado **y** encuesta enviada. Desaparece la dependencia del webhook de Healthie y toda la complejidad de `healthie.sync_case`.
- **Definición como dato:** preguntas, tipos (opción única, múltiple, número, texto corto, escala), obligatorias, secciones. Se edita en un YAML del repo y se carga como versión. El contenido lo dan Carmen y Aitor (SKI2-184: **Unknown**). Se arranca con un formulario provisional como en Healthie.
- **El seudonimizador [reutiliza]:** si el Copilot necesita la encuesta para el borrador (Unknown: hoy solo usa el entregable de TellmeGen), la lee del portal, la seudonimiza y no la guarda en el borrador.
- **Edición posterior:** el cliente puede corregir hasta que el caso pase a `test_pedido`. Después, solo pidiendo al equipo por el hilo (rectificación).

### 4.4 Chat y notificaciones por correo

```text
Hilo por caso. Sin WebSocket: HTMX refresca GET /portal/mensajes/fragmento cada 30 s mientras la pestaña está activa.
Cliente POST /portal/mensajes → mensajes (cuerpo cifrado) → outbox portal.avisar_equipo
   → correo a Aitor «Nuevo mensaje de un cliente» (sin el contenido, solo enlace al back office)
   → actividad Odoo «Responder mensaje del cliente» en la tarea del caso [reutiliza ensureActivity], una abierta por caso
Equipo POST /informes/casos/:id/mensajes → mensajes (autor equipo) → outbox portal.enviar_correo
   → correo al cliente «Tienes un mensaje nuevo de EPI10 Salud» (sin el contenido, con enlace)
Hitos de Odoo [reutiliza OdooMilestones] → en vez de healthie.send_message, portal.mensaje_hito {plantilla}
   → mensaje de sistema en el hilo (textos de mensajes.ts) + correo de aviso
```

- **Sin tiempo real**: el volumen (decenas de casos al mes) y el ritmo (horas o días entre mensajes) no lo justifican. Server-Sent Events se puede añadir en Fase 2 sin cambiar el modelo.
- **Los correos nunca llevan contenido de salud**, solo el aviso y el enlace. Así el proveedor de correo no trata datos de salud (simplifica el DPA, §5.8) y un buzón comprometido no expone la conversación.
- **Idempotencia** [reutiliza]: cada mensaje de hito se envía una vez por caso (`message:<caso>:<plantilla>`, hoy en el módulo de Healthie).
- **Plantillas de correo** en español, en el repo (bienvenida, enlace de acceso, mensaje nuevo, informe disponible, 4 hitos, confirmación de compra adicional, confirmación de solicitud RGPD). Diseño con la marca EPI10, texto plano alternativo.

### 4.5 Publicación del informe

```text
Pantalla de informes [reutiliza]: «Validar y publicar» con el PDF final → outbox informes.publicar_informe [reutiliza]
PUBLICADOR_INFORME = «portal» (NUEVO, tercer publicador junto a automático-Healthie y manual):
   1. cifra el PDF y lo inserta en portal.informes (version n, sha256)
   2. retira la versión anterior si la hay (republicación, 5.2)
   3. case_events portal.informe_publicado; caso → informe_publicado [reutiliza]
   4. borra el borrador seudonimizado [reutiliza]
   5. mensaje de sistema «tu informe está disponible» en el hilo + correo de aviso
   6. informes.cerrar_entrega [reutiliza]: Odoo etapa «Informe entregado» + actividad «Revisar cierre» (D10)
Cliente: GET /portal/informe → ficha · GET /portal/informe/v<n>.pdf → re-autenticación si la sesión > 24 h → descifra en memoria → stream → registro_accesos
```

- El publicador es un **puerto que ya existe** (`PUBLICADOR_INFORME`): se añade una implementación y se elige por configuración. La rama manual y la de Healthie se quedan como están.
- **Dónde guardar el PDF:** en PostgreSQL (`bytea` cifrado) para el MVP. Son pocos archivos de 1–5 MB. Si en un año pesa, se mueve a objeto S3 en la UE (§6) sin cambiar el modelo (`objeto_url`).
- **La bandeja en memoria** [reutiliza] sigue valiendo para la subida del PDF final; el portal lo persiste cifrado.

### 4.6 Venta adicional con Stripe

```text
GET /portal/tienda → productos activos
POST /portal/tienda/:producto/comprar → stripe.checkout.sessions.create {customer: stripe_customer_id, price, success_url: /portal/tienda/gracias, metadata: {epi10_cliente_id, epi10_producto_id, epi10_tipo: adicional}}
   → pedidos_adicionales (pendiente)
Stripe webhook [reutiliza]: checkout.session.completed con metadata epi10_tipo = adicional
   → NO crea caso; marca el pedido pagado; correo de confirmación; actividad Odoo «Preparar envío de <producto>» para Aitor
   Si el producto es un segundo test: crea caso nuevo vinculado al mismo cliente (sin repetir alta ni consentimiento si la versión vigente ya está aceptada)
```

- **Reutiliza Stripe** [reutiliza]: el webhook ya verifica firma, cuenta, modo y dedupe. Hay que ampliar la validación de compra (`purchaseState`) para admitir más de un `price` y distinguir por `metadata`.
- **Logística y facturación** del producto: en Odoo, fuera del portal. Odoo puede crear el pedido de venta si Carmen lo quiere (Fase 2).
- **Pagos guardados:** Stripe `customer` permite que el cliente no vuelva a teclear la tarjeta si se activa «guardar método de pago» en el primer Checkout. Decisión de Carmen (Unknown).

### 4.7 Mapa de reutilización

| Pieza del monolito | Estado | Uso en el portal |
|---|---|---|
| `core`: casos, estados, eventos, outbox, escalado | Existe | Sin cambios de diseño. Nuevos tipos de trabajo y evento |
| Máquina de estados | Existe | Sin cambios: `onboarding_completado` lo pone el portal en vez de Healthie |
| `stripe`: webhook, ledger, `StripeContactSource` | Existe | Igual. Se amplía para venta adicional |
| `odoo`: adaptador, hitos, actividades, webhook, reconciliación | Existe (validado contra Odoo 17 real) | Igual. Los efectos de los hitos pasan de `healthie.*` a `portal.*` |
| `informes`: pantalla, sesiones, CSRF, seudonimizador, borrador, publicación, `PUBLICADOR_INFORME` | Existe | La pantalla se amplía a back office del portal; se añade el publicador `portal` |
| `healthie`: cliente, webhooks, alternativa manual | Existe | **Inactivo** (sin `HEALTHIE_API_KEY`). No se borra: si algún día hay API, sigue ahí |
| Caddy, compose, imagen, CI, ensayo E2E, demo visual | Existen | Se amplían rutas, un servicio de correo simulado en el ensayo, y los pasos del portal en el E2E |
| Logs sin datos personales | Existe | Igual. Nuevos tipos de ID en `LoggableIdKind` |

---

## 5. Seguridad y RGPD con datos de salud (art. 9)

**Cambio de fondo:** hoy el monolito es un orquestador de IDs; EPI10 es responsable del tratamiento y Healthie, Odoo y Stripe los encargados. Con el portal, **el monolito trata datos de salud y genéticos** (art. 9.1 RGPD; art. 9 LOPDGDD). EPI10 sigue siendo el **responsable**; Skilland pasa a ser **encargado** si accede al servidor o a los datos (desarrollo, soporte), y hace falta un contrato de encargo (art. 28). Nada de esto es asesoramiento jurídico: EPI10 debe validarlo con su asesor o DPO (Unknown si tiene uno).

### 5.1 Base legal y consentimiento explícito

| Punto | Decisión |
|---|---|
| Base legal del tratamiento general (alta, pago, pedido) | Ejecución de contrato (art. 6.1.b) |
| Datos de salud y genéticos (encuesta, test, informe) | **Consentimiento explícito** (art. 9.2.a). Es la vía habitual para un servicio privado de bienestar que no es asistencia sanitaria |
| Forma | Casilla específica, separada de las condiciones generales, con texto propio para datos genéticos. Sin casillas premarcadas. Nombre tecleado como acto afirmativo adicional |
| Prueba | `portal.consentimientos` (§3.2) con hash del texto exacto y versión |
| Retirada | Tan fácil como darlo: botón en el portal. Efectos definidos por EPI10 (§4.2) |
| Menores | **No se admite**: casilla «Soy mayor de edad». Un test genético a menores exigiría otra base y representante legal |
| Información (arts. 13–14) | Capa 1 en el formulario, capa 2 en la política de privacidad del portal. Textos de EPI10 (Unknown) |

### 5.2 Cifrado

| Capa | Medida |
|---|---|
| En tránsito | TLS 1.2+ con Caddy (ya), HSTS (ya). Correo saliente por TLS al proveedor |
| En reposo, aplicación | AES-256-GCM por columna para encuesta, mensajes, informe, evidencia del consentimiento y teléfono. Clave de 256 bits en `PORTAL_DATA_KEY`, fuera del repo y de las copias. Nonce por fila. Versión de clave en la fila para poder rotar |
| Email | Hash HMAC (`PORTAL_EMAIL_HMAC_KEY`) para buscar por igualdad + cifrado para mostrarlo |
| En reposo, disco | Cifrado de disco del servidor: **Unknown** (preguntar a Aresoltec). Si no lo hay, el cifrado por columna es la protección real |
| Copias de seguridad | `pg_dump` cifrado con `age` o GPG con una clave distinta, en destino UE. Sin la clave de columna la copia no expone salud, pero igualmente cifrada |
| Secretos | `.env` del servidor con permisos 600; rotación anual documentada. Sin gestor de secretos externo en el MVP |

### 5.3 Control de acceso

| Actor | Cómo accede | Alcance |
|---|---|---|
| Cliente | Enlace mágico → sesión `__Host-`, `HttpOnly`, `Secure`, `SameSite=Lax` (Lax, no Strict: el enlace llega desde el correo), 30 días deslizantes. CSRF por sesión [reutiliza] | **Solo sus casos.** Cada consulta filtra por `cliente_id` de la sesión; prueba automática de aislamiento entre clientes |
| Equipo (Aitor, Carmen) | Usuario y contraseña argon2id [reutiliza], bloqueo por intentos [reutiliza]. **Añadir segundo factor TOTP** (3 h): acceso a salud de muchas personas | Todos los casos. Roles: `operaciones` (Aitor: todo), `gerencia` (Carmen: todo + ARCO), `lectura` (opcional) |
| Descarga del informe | Re-autenticación por correo si la sesión tiene más de 24 h | Un informe por descarga, registrado |
| Skilland (desarrollo) | Acceso al servidor por SSH con clave, usuario propio, registrado por el sistema. **Nunca** copia de la base de producción fuera del servidor; depuración con datos ficticios | Encargado del tratamiento (§5.8) |
| Base de datos | Rol de la app sin `DELETE` ni `UPDATE` en `registro_accesos`; sin `SUPERUSER`. Rol de migraciones aparte | — |
| Aresoltec (servidor) | Acceso de administración de la máquina | Encargado o subencargado de EPI10: **Unknown** si ya tiene contrato de encargo por Odoo |

### 5.4 Registro de accesos

- Tabla `portal.registro_accesos` de solo inserción: quién, cuándo, qué cliente, qué recurso, qué acción, IP en hash. Cubre cliente, equipo y trabajos automáticos (`actor_tipo = sistema`).
- Exportable por cliente (forma parte de la respuesta a un derecho de acceso) y por periodo (auditoría).
- Retención: 2 años tras el borrado del cliente (documentar en el registro de actividades).
- Los **logs de la app** siguen sin datos personales [reutiliza]; no sustituyen al registro.

### 5.5 Retención y borrado

| Dato | Retención propuesta | Mecanismo |
|---|---|---|
| Encuesta de hábitos | Mientras el caso esté abierto + 12 meses tras `cerrado` (soporte y recompra) | Trabajo diario `portal.retencion` que borra (`DELETE`) las respuestas vencidas y deja evento |
| Informe PDF | 24 meses tras publicación (el cliente «conserva el acceso», 5.3 del journey). Antes de borrar, correo de aviso a los 30 días | Mismo trabajo. Después, solo `sha256` y fechas |
| Mensajes | Igual que la encuesta | Mismo trabajo |
| Consentimiento (prueba) | Mientras pueda exigirse responsabilidad: 5 años tras el fin de la relación (prescripción general) | Al borrar al cliente se **seudonimiza** (se quita el vínculo con `clientes`), no se borra |
| Datos de contacto | Mientras haya caso abierto o producto en garantía; después, hasta solicitud de borrado o 24 meses de inactividad | Borrado o anonimización |
| Facturación | Lo que exija Hacienda (Odoo/Stripe, fuera del portal) | — |
| Registro de accesos | 2 años tras el borrado del cliente | — |
| Borrador seudonimizado y entregable de TellmeGen | Sin cambios: se borran al publicar o nada más usarse | [reutiliza] |

Los plazos son **propuesta**; los fija EPI10 con su asesor (Unknown). El sistema los lleva en configuración, no en el código.

### 5.6 Derechos ARCO (acceso, rectificación, supresión, oposición, portabilidad, limitación)

| Derecho | Cómo se atiende |
|---|---|
| Acceso y portabilidad | Botón «Descargar mis datos» → `solicitudes_rgpd` → el back office genera un ZIP (JSON de contacto, consentimientos, encuesta, mensajes, informe PDF, registro de accesos). En el MVP la genera el equipo con un botón; no es inmediata |
| Rectificación | Contacto: el cliente edita. Encuesta: edita hasta `test_pedido`, después por el hilo. Informe: republicación (5.2) |
| Supresión | Botón «Borrar mi cuenta» → solicitud → Carmen confirma en el back office → trabajo que borra salud y contacto, seudonimiza consentimiento y accesos, y pide a Odoo anonimizar el contacto (Unknown: cómo lo hace Odoo 17; mínimo, actividad para hacerlo a mano). Stripe conserva lo fiscal. Si hay un caso en curso, antes se cancela |
| Oposición y limitación | Solicitud → gestión manual con nota |
| Plazo | Un mes. El back office muestra las solicitudes abiertas con días restantes |

### 5.7 Alojamiento en la UE

- Monolito y PostgreSQL: servidor de EPI10 en España (ADR). **Unknown:** proveedor y centro de datos del servidor de Odoo (preguntar a Aresoltec).
- Correo: Scaleway (Francia/Países Bajos) o Brevo (Francia). Solo avisos, sin salud.
- Stripe: en la UE para la operación con entidad irlandesa, pero con transferencias a EE. UU. amparadas por el Data Privacy Framework. Trata pago y contacto, no salud. Ya aceptado en el proyecto.
- Copias: destino en la UE (Hetzner Alemania/Finlandia o Scaleway). Unknown hasta decidir.
- Modelo de lenguaje para el borrador: ya decidido en el ADR con datos seudonimizados. Sin cambios.
- TellmeGen: laboratorio en España. **Unknown** si subcontrata fuera de la UE.

### 5.8 Encargados del tratamiento (art. 28)

| Encargado | Qué trata | Contrato |
|---|---|---|
| Skilland | Datos de salud si accede al servidor de producción (soporte, despliegue) | **Hace falta** contrato de encargo Skilland–EPI10 (hoy Unknown si existe). Alternativa: Skilland no accede a producción y EPI10 opera; poco realista en el MVP |
| Aresoltec | Infraestructura con datos de salud | Unknown si ya hay encargo por Odoo; habría que ampliarlo |
| Proveedor de correo | Email, nombre, hecho de ser cliente. **No salud** por diseño | DPA estándar del proveedor (Scaleway y Brevo lo tienen en línea) |
| Stripe | Pago, contacto | Ya existe (condiciones de Stripe) |
| Proveedor del modelo de lenguaje | Texto seudonimizado | Ya decidido en el ADR |
| TellmeGen | Muestra y resultado genético | Relación directa EPI10–TellmeGen. Unknown |
| Healthie | Deja de tratar datos. Hay que **borrar o archivar** los clientes de prueba creados y cerrar la cuenta cuando se decida | — |

### 5.9 ¿Hace falta EIPD (DPIA)?

**Sí, casi con seguridad.** La lista de la AEPD (art. 35.4) obliga a evaluar cuando se cumplen **dos o más** criterios, y aquí se dan al menos tres: datos de categorías especiales (salud y genéticos), tratamiento de datos genéticos como tal, y uso de nuevas tecnologías con perfilado (el borrador del informe generado con un modelo de lenguaje a partir del test). Un test genético directo al consumidor es un caso de libro.

- **Quién la hace:** EPI10 como responsable, con su asesor o DPO. Skilland aporta la descripción técnica (este documento es la base) y las medidas (§5.2–5.6).
- **Cuándo:** antes de tratar datos reales en el portal. No bloquea construir; bloquea **abrir** a clientes reales.
- **Herramienta:** Gestiona EIPD de la AEPD (gratuita) o plantilla propia. Esfuerzo técnico de Skilland: 4–6 h (incluidas en el bloque legal de §7).
- **Nota:** con Healthie la EIPD también hacía falta (EPI10 ya trataba datos genéticos a través de encargados). El portal propio no la crea; la hace más visible y la pone del lado de la infraestructura que controlamos.

### 5.10 Otras medidas

- Registro de actividades de tratamiento (art. 30): EPI10 lo actualiza; Skilland da la ficha del portal.
- Procedimiento de brechas (arts. 33–34): quién avisa a quién en 72 h. Documento de una página.
- Pruebas automáticas de aislamiento entre clientes, de cifrado (nada en claro en la base), de que los logs no llevan datos personales [reutiliza la prueba del ensayo] y de que `registro_accesos` no admite borrados.
- Cabeceras: `Content-Security-Policy` estricta (HTMX en local permite `script-src 'self'`), `X-Frame-Options: DENY`, las ya existentes.
- Límite de peticiones en `/portal/entrar` y `/portal/acceso` (por IP y por email).

---

## 6. Comprar o construir, por pieza

Precios aproximados, consultados el 7 oct 2026 en fuentes públicas; **verificar antes de contratar**. Volumen del MVP: decenas de clientes al mes, menos de 1.000 correos al mes.

| Pieza | Decisión | Opción recomendada | Alternativas UE | Coste aprox. | Por qué |
|---|---|---|---|---|---|
| **Correo transaccional** | **Comprar** | **Scaleway Transactional Email** (FR/NL): 300 correos/mes gratis, después 0,25 €/1.000. API y SMTP, DKIM/SPF, webhooks de entrega | **Brevo** (FR): 300/día gratis, Starter desde ~9 €/mes. Mailjet (FR, Sinch): gratis 200/día. Postmark/Resend: buenos pero con infraestructura en EE. UU. | **0–9 €/mes** | Montar un SMTP propio es la peor opción (entregabilidad, reputación). El proveedor no ve salud por diseño |
| **Chat** | **Construir** (hilo por caso, sin tiempo real) | Tablas `hilos`/`mensajes` + HTMX | Comprar (Crisp, Tawk, Intercom, Chatwoot alojado): todos tratarían datos de salud en el chat y obligan a DPA y a alojamiento UE; Chatwoot autoalojado es otro servicio que mantener | **0 €** | 6–8 h de construcción contra un DPA más, otra marca y datos de salud en un tercero |
| **Formularios (encuesta)** | **Construir** (definición JSON + renderizado) | Módulo `encuesta` | Tally, Typeform, Jotform: enviar respuestas de salud a un tercero y volver a integrarlas vía webhook. Más DPA, menos control | **0 €** | Un formulario de 20–40 preguntas con tipos simples cuesta menos construirlo que integrarlo |
| **Firma del consentimiento** | **Construir** (firma simple con prueba) | Módulo `consentimiento` (§4.2) | **Yousign** (FR, QTSP eIDAS): API desde ~104 €/mes. **Signaturit** (ES): similar. Docuseal autoalojado: otro servicio | **0 €** frente a **~1.250 €/año** | El RGPD no exige firma avanzada ni cualificada para el consentimiento. Si el asesor de EPI10 la exigiera, Yousign por API se integra en 4–6 h |
| **Almacenamiento del informe** | **Construir sobre PostgreSQL** (bytea cifrado) | Misma base de datos | **Hetzner Object Storage** (DE/FI): ~6,5 €/mes por 1 TB. **Scaleway Object Storage** (FR): ~0,015 €/GB. Para Fase 2 si pesa | **0 €** | Decenas de PDF de pocos MB al mes. Una sola copia de seguridad que proteger |
| **Autenticación del cliente** | **Construir** (enlace mágico) | Módulo `acceso` | Keycloak, Authentik, Zitadel (autoalojados): sobredimensionados. Auth0/Clerk: EE. UU. | **0 €** | Ya hay sesiones y CSRF probados en la pantalla de informes. Un enlace mágico son 3–4 h |
| **Segundo factor del equipo** | **Construir** (TOTP) | Librería `otpauth` + códigos de recuperación | — | **0 €** | 3 h. Dos o tres usuarios |
| **Citas (Fase 2)** | **Comprar** | **Cal.com** (alojado en la UE con plan de pago, o autoalojado) o Calendly | Módulo propio: 10–15 h | ~12–15 €/usuario/mes | Fuera del MVP |
| **Cobro adicional** | **Comprar** (ya) | Stripe Checkout con `customer` | — | Comisión por transacción (ya aceptada) | [reutiliza] |
| **Copias de seguridad** | **Comprar** destino | Hetzner Storage Box o Object Storage (DE) | Scaleway, OVH | **~4–7 €/mes** | Obligatorio con datos de salud |

**Coste recurrente nuevo del portal: entre 5 y 20 €/mes.** Frente a los 475–1.900 $/mes de la API de Healthie y lo que ya se pagaba por el plan Group (Unknown si se cancela).

Fuentes de precios: [Scaleway TEM](https://www.scaleway.com/en/pricing/managed-services), [Brevo (guía 2026)](https://ecommerce-platforms.com/email-marketing-services-reviews/sendinblue-pricing), [Hetzner Object Storage (resumen 2026)](https://agentdeals.dev/hetzner-pricing-2026), [Yousign (guía 2026)](https://verdocs.com/?p=13994). La lista de la AEPD sobre EIPD: [listas-dpia-es-35-4.pdf](https://www.aepd.es/documento/listas-dpia-es-35-4.pdf).

---

## 7. Estimación en horas, riesgos y mitigación

### 7.1 Horas por fase

Estimación para un desarrollador con el método actual (agente de Claude por issue, revisión independiente, CI en verde, pruebas unitarias y de integración). Incluye pruebas y documentación; no incluye el contenido (textos legales, preguntas de la encuesta, diseño gráfico) que da EPI10.

| Fase | Qué entra | Horas |
|---|---|---|
| **P0 · Cimientos del portal** | Esquema `portal`, cifrado por columna, migraciones, rol de base de datos, `registro_accesos`, adaptador de correo con simulador, plantillas base HTML con marca, rutas en Caddy, CSP | 10–12 |
| **P1 · Acceso y alta** | `portal.crear_acceso` en lugar de `healthie.create_client`, enlace mágico, sesiones del cliente, `/portal/entrar`, reenvío, límites, página de gracias de Stripe actualizada | 8–10 |
| **P2 · Consentimiento y encuesta** | Versiones, aceptación con prueba, exportación de evidencia, encuesta desde JSON con guardado parcial, D3 dentro del monolito, efectos en Odoo | 10–12 |
| **P3 · Mensajes y correos** | Hilo, mensajes del cliente y del equipo, mensajes de hito desde `OdooMilestones`, avisos por correo, actividad en Odoo, back office del chat | 8–10 |
| **P4 · Informe en el portal** | Publicador `portal`, almacenamiento cifrado, descarga con re-autenticación y registro, republicación, aviso | 5–6 |
| **P5 · Back office** | Lista y ficha del caso, TOTP, roles, solicitudes RGPD (exportar, borrar), retención automática, «Reenviar acceso» | 9–12 |
| **P6 · Venta adicional** | Catálogo, Checkout con `customer`, ampliación del webhook, pedido, correo, actividad en Odoo | 4–6 |
| **P7 · Integración y cierre** | Ensayo E2E con el portal (pasos nuevos, correo simulado), demo visual, despliegue, documentación para Aitor y Carmen | 6–8 |
| **Total MVP mínimo (P0–P5 + P7)** | | **56–70 h** |
| **Con venta adicional (P6)** | | **60–76 h** |
| **Bloque legal (aparte, con EPI10)** | Ficha técnica para la EIPD, registro de actividades, contrato de encargo Skilland–EPI10, revisión del consentimiento y la privacidad, procedimiento de brechas | 8–12 |
| **Fase 2 (orientativo)** | Citas (Cal.com o propio) 6–15, SSE en el chat 3–4, exportación ARCO automática 3–4, objeto S3 para informes 3–4, pedido de venta en Odoo 4–6 | 19–33 |

### 7.2 Frente a las 110 h

- **Horas consumidas a 7 oct: Unknown.** No hay registro de horas en el repo ni en Linear. Lo construido (13 de 15 issues del ADR, ensayo E2E, Odoo real, demo visual) indica que una parte sustancial de las 110 h ya está gastada. **Raúl debe poner la cifra.**
- Con la mejor hipótesis razonable (quedan 30–40 h), el portal **no cabe**: faltan entre 20 y 40 h, más el bloque legal.
- **Lo que se ahorra**, a cambio: toda la validación de Healthie en el sandbox (las 9 comprobaciones del contrato más las 6 del README, estimadas en 6–10 h), la alternativa manual por caso de Aitor, el plan Group de Healthie (Unknown €/mes) y la API (5.700 $ el primer año).
- **Tres salidas**, a decidir por Raúl con Carmen:
  1. **Ampliar el presupuesto** con un módulo «portal del cliente» facturado aparte, como se hizo con Stripe (SKI2-21). Argumento: sustituye un coste recurrente de 5.700–22.800 $/año por uno de ~15 €/mes.
  2. **Recortar el MVP del portal:** sin venta adicional (P6), sin TOTP ni roles (−4 h), encuesta de una sola página sin guardado parcial (−2 h), sin exportación ARCO automática (manual con SQL, −3 h). Queda en **~47–58 h**. Sigue sin caber del todo.
  3. **Puente con la opción A:** arrancar los primeros casos con Healthie a mano (ya construido, SKI2-172) o incluso solo con correo + Odoo, mientras se construye el portal en 4–6 semanas. Riesgo: clientes reales con experiencia en inglés y migración después.

### 7.3 Riesgos y mitigación

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | Las horas no caben en el presupuesto | Alta | Alto | Decidir una de las tres salidas de §7.2 **antes** de empezar P0. No construir «un poco» sin decisión |
| R2 | EPI10 no hace la EIPD ni los textos legales a tiempo | Media | Alto (bloquea abrir a clientes) | Entregar la ficha técnica (bloque legal) en la primera semana. Textos provisionales marcados como tales en el portal de pruebas. Fecha límite en Linear |
| R3 | Datos de salud en nuestro servidor: brecha o acceso indebido | Baja | Muy alto | §5 completo: cifrado por columna, TOTP, registro de accesos, retención, copias cifradas, prueba de aislamiento. Procedimiento de brechas |
| R4 | Correos de acceso que no llegan (spam) | Media | Medio | Dominio propio con SPF/DKIM/DMARC, proveedor con reputación, reenvío desde la página de gracias, «Reenviar acceso» en el back office, texto claro en la página de Stripe |
| R5 | El contenido (encuesta, consentimiento) llega tarde o cambia mucho | Alta | Medio | Formulario y consentimiento como **datos versionados**, no código. Arrancar con provisionales. SKI2-184 ya lo pide |
| R6 | Aitor pierde el «todo en un sitio» de Healthie | Media | Medio | Odoo sigue siendo su kanban; cada tarea enlaza a la ficha del portal. Una actividad por mensaje nuevo. Guía corta |
| R7 | Dependencia de Aresoltec para DNS, correo, copias y acceso | Alta | Medio | Pedir en la llamada técnica de SKI2-104: subdominio, registros de correo, cifrado de disco, destino de copias. Alternativa: dominio y correo gestionados por EPI10 directamente |
| R8 | Una sola instancia y bandeja en memoria | Baja | Bajo | Ya asumido en el ADR. El portal no lo empeora |
| R9 | Clave de cifrado perdida = datos ilegibles | Baja | Muy alto | Copia de la clave en un gestor de contraseñas de EPI10 y otra en el de Skilland; procedimiento escrito; prueba de restauración trimestral |
| R10 | Carmen espera «lo que daba Healthie» (app, citas, vídeo) | Media | Medio | Enseñar la demo visual con el portal propio antes de cerrar el alcance; lista explícita de lo que queda fuera (§1.4) |
| R11 | Odoo no permite anonimizar un contacto con documentos ligados | Media | Bajo | Actividad manual «Anonimizar contacto» hasta verificarlo con Aresoltec |

---

## 8. Plan de ejecución en issues

**No creadas en Linear.** Listas para crearlas si Raúl elige la opción B. Orden = dependencia. Prefijo propuesto: «Portal ·». Cada una lleva el método habitual: agente de Claude con brief, revisión independiente, CI en verde, log del módulo.

| # | Título | Terminado cuando | Horas | Depende de |
|---|---|---|---|---|
| 0 | **Decisión: opción B y marco de horas** (Raúl + Carmen) | Decisión escrita en SKI2-204; salida elegida de §7.2; horas consumidas registradas; Healthie: qué se hace con la cuenta | 1 | — |
| 1 | **Portal · Esquema, cifrado y registro de accesos** | Migración `0004_portal` con todas las tablas de §3.2; `PORTAL_DATA_KEY` y HMAC del email validados al arrancar; cifrado por columna con pruebas (nada legible en la base); `registro_accesos` sin UPDATE/DELETE para el rol de la app; prueba de que `assertSafeRecord` sigue protegiendo la zona operativa | 6–7 | 0 |
| 2 | **Portal · Correo transaccional y plantillas** | Adaptador con interfaz `CORREO` y dos implementaciones: proveedor (Scaleway o Brevo, elegido y configurado) y simulador para pruebas y ensayo; 9 plantillas en español con marca y versión en texto plano; `correos_enviados`; ningún correo lleva contenido de salud (prueba) | 4–5 | 1 |
| 3 | **Portal · Acceso por enlace mágico y sesiones** | `portal.crear_acceso` sustituye a `healthie.create_client` en Stripe (por configuración `PORTAL_ENABLED`); enlace de un uso y 24 h; sesiones `__Host-`, CSRF, 30 días deslizantes; `/portal/entrar` sin revelar emails, con límites; reenvío desde la página de gracias; prueba de aislamiento entre clientes | 8–10 | 1, 2 |
| 4 | **Portal · Consentimiento versionado con prueba** | Versiones con hash; aceptación con dos casillas y nombre; evidencia cifrada; exportación PDF de la evidencia desde el back office; revocación con actividad en Odoo; texto provisional marcado | 5–6 | 3 |
| 5 | **Portal · Encuesta de hábitos** | Definición JSON versionada; renderizado de 5 tipos de pregunta; guardado parcial; validación de obligatorias; al enviar, `onboarding_completado` + efectos en Odoo (etapa, `x_epi10_onboarding_ok`, «Pedir test»); edición hasta `test_pedido`; formulario provisional cargado | 5–6 | 4 |
| 6 | **Portal · Hilo de mensajes y avisos** | Hilo por caso; mensajes del cliente con aviso por correo a Aitor y actividad en Odoo (una abierta por caso); respuesta del equipo con aviso al cliente; mensajes de hito desde `OdooMilestones` con idempotencia por `(caso, plantilla)`; refresco HTMX; cuerpo cifrado | 8–10 | 3 |
| 7 | **Portal · Publicador del informe** | Tercera implementación de `PUBLICADOR_INFORME`; PDF cifrado en `portal.informes`; descarga con re-autenticación tras 24 h y registro; republicación con versión; aviso en hilo y correo; `informes.cerrar_entrega` sin cambios; borrador borrado al publicar | 5–6 | 6 |
| 8 | **Portal · Back office: lista, ficha, roles y TOTP** | `/informes` amplía a lista de casos con fase, consentimiento y encuesta; ficha con contacto, consentimiento, respuestas, hilo e informe; roles `operaciones`/`gerencia`; TOTP con códigos de recuperación; «Reenviar acceso»; cada vista registra el acceso | 6–8 | 4, 5, 6, 7 |
| 9 | **Portal · RGPD: solicitudes, exportación, borrado y retención** | Botones del cliente «Descargar mis datos» y «Borrar mi cuenta» → solicitudes con plazo visible; exportación ZIP desde el back office; borrado que seudonimiza consentimiento y accesos y crea actividad en Odoo para el contacto; trabajo diario de retención por configuración con aviso previo del informe | 5–6 | 8 |
| 10 | **Portal · Venta adicional con Stripe** | Catálogo; Checkout con `customer`; webhook distingue `epi10_tipo`; pedido, correo y actividad «Preparar envío»; segundo test crea caso sin repetir consentimiento vigente; `purchaseState` admite varios precios | 4–6 | 3 |
| 11 | **Portal · Ensayo E2E, demo visual y despliegue** | Ensayo con los pasos del portal y correo simulado, incluidas las búsquedas de datos personales en logs y la prueba de cifrado; demo visual con el portal en lugar del Healthie simulado; Caddy con `/portal`; `.env.example` y README actualizados; guía de 2 páginas para Aitor y Carmen | 6–8 | 8, 9, (10) |
| 12 | **Legal · Ficha técnica para la EIPD, registro de actividades y encargo** (con EPI10) | Ficha técnica entregada a EPI10; borrador de contrato de encargo Skilland–EPI10; lista de encargados y DPA recogidos (correo, hosting); plazos de retención fijados por EPI10 y cargados en configuración; procedimiento de brechas de una página | 8–12 | 0; bloquea abrir a clientes reales |
| 13 | **Journey v3, ADR v2 y backlog ajustados** | Journey con los tramos del portal; ADR con el módulo `portal` y la nueva regla de datos; issues de Healthie (SKI2-101, 173, 174, 175, 176) replanificadas o canceladas; `02_context/01_estado_actual.md` actualizado | 2–3 | 0 |

Total de las issues 1–11: **62–78 h** (coincide con §7.1; la 10 es opcional). Legal: 8–12 h. Documental: 2–3 h.

---

## Unknown

| # | Qué no sabemos | A quién preguntar | Bloquea |
|---|---|---|---|
| U1 | Horas consumidas de las 110 h a 7 oct | Raúl | La decisión de §7.2 |
| U2 | Textos del consentimiento y preguntas de la encuesta (SKI2-184) | Carmen y Aitor | Abrir a clientes reales; no bloquea construir |
| U3 | Si EPI10 tiene DPO o asesor RGPD y si existe ya una EIPD o un registro de actividades | Carmen | La EIPD (issue 12) |
| U4 | Contrato de encargo Skilland–EPI10 y Aresoltec–EPI10 | Raúl, Carmen | Operar con datos reales |
| U5 | Servidor de EPI10: proveedor, país, cifrado de disco, recursos, quién gestiona DNS y correo del dominio | Aresoltec (SKI2-104) | Despliegue, correo transaccional, copias |
| U6 | Si TellmeGen trata datos fuera de la UE y qué contrato tiene con EPI10 | Carmen | Textos del consentimiento |
| U7 | Plazos de retención que acepta EPI10 | Carmen con su asesor | Issue 9 (va por configuración) |
| U8 | Qué hacer con la cuenta Group de Healthie (coste mensual, cancelación, borrado de clientes de prueba) | Carmen | Nada técnico |
| U9 | Si Odoo 17 permite anonimizar un contacto con tareas ligadas | Aresoltec o prueba en el Odoo de pruebas | Issue 9 (hay alternativa manual) |
| U10 | Productos de la venta adicional y si se guarda el método de pago | Carmen | Issue 10 |
| U11 | Si el Copilot necesita la encuesta de hábitos para el borrador | Raúl, Fer | Alcance del seudonimizador |
| U12 | Resultado de SKI2-206 (otra plataforma): podría cambiar la decisión | Agente de SKI2-206 | Decisión B frente a D |

## Siguiente paso

1. Raúl lee este documento junto con el de SKI2-206 y pone la cifra de horas consumidas (U1).
2. Decisión de Raúl: B, D, o A como puente. Si B: elegir la salida de §7.2 y proponérsela a Carmen.
3. Con la decisión: crear las issues 0, 1, 2, 12 y 13 y actualizar journey, ADR y estado.
