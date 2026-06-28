# EPI10 Salud — Journey operativo Odoo + Healthie v1.0

## Estado del documento

Documento de trabajo cerrado tras la exploración funcional y técnica preliminar del nuevo journey EPI10 Salud.

Este documento consolida los 5 tramos del proceso objetivo, integrando:

```text
Odoo = centro operativo del caso.
Healthie = capa de experiencia cliente.
TellmeGen / laboratorio = sistema externo manual.
Copilot = generación asistida de borradores con revisión humana obligatoria.
```

## Principios rectores

```text
1. Odoo gobierna el caso operativo.
2. Healthie gobierna la experiencia cliente.
3. Aitor deja de funcionar como middleware humano para tareas repetitivas.
4. TellmeGen queda manual en Fase 1.
5. La logística física queda como caja negra salvo hitos mínimos.
6. El cliente solo recibe comunicación cuando hay algo útil para él.
7. El informe final solo se publica tras validación humana.
8. Fase 1 debe ser ejecutable, trazable y no convertirse en una gran arquitectura nueva.
```

## Healthie / Healthy v1.0 — decisión congelada

**Frase eje:**

> Healthie no tiene por qué ser solo el sitio donde dejamos el informe final. Puede convertirse en la capa de experiencia cliente de EPI10.

### Nivel 1 — Seguro para Fase 1

Esto entra sí o sí, o se usa como argumento de decisión:

```text
- Perfil cliente en Healthie.
- Portal/app para el cliente.
- Entrega del informe final PDF.
- Documentos asociados.
- Audit logs / trazabilidad / compliance como perk de plataforma.
- Gestión de equipo, roles y permisos como perk de plataforma.
- Reporting nativo como perk, no como entregable custom.
```

### Nivel 2 — Decisión workshop

Esto queda como menú de candidatos. En el workshop decidimos qué sube a Fase 1 y qué baja a Fase 2:

```text
- Onboarding ampliado en Healthie.
- Formularios adicionales para enriquecer informe.
- Comunicación segura vía Healthie.
- Agenda para cita del test.
- User Groups y automatizaciones por grupo/estado.
- Tareas internas en Healthie solo si aportan valor.
- Lab Orders como posibilidad estructural/documental.
- Patient Encounters si usamos citas Healthie.
- Webhooks Healthie → Odoo como pegamento técnico.
```

### Nivel 3 — Fase 2 / modelo de negocio

Esto no entra ahora, pero queda como evolución funcional y comercial:

```text
- Pagos dentro de Healthie.
- Programs / Courses.
- Goals.
- Care Plans.
- Journal Entries.
- Metrics.
- Video chat / seguimiento experto.
- Membresías.
- Servicios recurrentes.
- Episodes of Care como visión avanzada.
```

### Fuera por ahora

```text
- Fullscript.
- Prometer integración automática TellmeGen vía Healthie.
- Checkout completo en Healthie para Fase 1 salvo decisión muy fuerte en workshop.
```

---

# Tramo 1 — Entrada, formulario, pago y alta operativa

## Decisión base del tramo

Hay dos paquetes cerrados para workshop:

```text
Vía A = Web/pago actual + Odoo + Healthie desde el principio.
Vía B = Healthie-first: cuenta/formulario/pago/onboarding en Healthie + Odoo como backoffice.
```

La decisión del workshop aquí es solo: **A o B**.

---

## Vía A — Híbrida, prudente, probablemente recomendada

```text
Web EPI10
→ formulario principal web
→ pago en pasarela actual
→ Odoo crea caso
→ Odoo crea/linka cliente en Healthie automáticamente
→ Healthie invita al cliente
→ cliente entra al portal/app Healthie
```

### Experiencia del cliente

```text
1. Entra en la web de EPI10.
2. Rellena el formulario principal.
3. Paga en la pasarela actual.
4. Al terminar el pago, recibe acceso/invitación a Healthie.
5. Desde Healthie continúa la experiencia: portal, app, formularios adicionales, comunicaciones, documentos, cita, etc.
```

Aquí **Healthie se crea siempre**. No hay decisión posterior. Si el cliente paga, se le crea/vincula Healthie automáticamente y se le invita.

### Qué ocurre en Odoo

```text
1. Web/pago envía evento a Odoo.
2. Módulo `epi10_intake` recibe el evento.
3. Se guarda staging de entrada.
4. Se deduplica por payment_id / submission_id / email.
5. Se crea/actualiza contacto.
6. Se crea caso EPI10.
7. Se marca estado: pago confirmado / nuevo caso.
8. Se lanza job: crear o vincular cliente en Healthie.
9. Se guarda `healthie_user_id`.
10. Se crea primera tarea operativa para Aitor.
```

### Qué ocurre en Healthie

```text
1. Odoo busca si ya existe cliente.
2. Si existe match claro, vincula.
3. Si no existe, crea cliente.
4. Asigna grupo inicial EPI10 si aplica.
5. Envía invitación / activación al cliente.
6. Deja el portal preparado para onboarding, formularios, comunicación y documentos.
```

### Rol de Aitor

Aitor ya no pica el cliente a mano.

Aitor ve en Odoo:

```text
Nuevo caso creado
Pago confirmado
Healthie creado/vinculado
Siguiente paso operativo
```

---

## Vía B — Healthie-first, más ambiciosa

```text
Web EPI10
→ CTA comercial
→ Healthie crea cuenta cliente
→ Healthie recoge formulario/intake
→ Healthie gestiona pago/checkout
→ Healthie inicia onboarding
→ Odoo recibe datos y crea caso operativo
```

### Experiencia del cliente

```text
1. Entra en la web de EPI10.
2. Hace clic en “comenzar/comprar”.
3. Pasa a Healthie.
4. Crea cuenta cliente.
5. Completa formulario/intake.
6. Paga en Healthie.
7. Continúa en Healthie con onboarding, comunicaciones, documentos, cita, etc.
```

Aquí Healthie es la puerta de entrada real. La web queda como captación/marketing.

### Qué ocurre en Healthie

```text
1. Se crea cliente/paciente.
2. Se recoge intake/formulario principal.
3. Se gestiona pago/checkout.
4. Se asigna grupo inicial.
5. Se activa onboarding.
6. Se generan eventos para que Odoo cree el caso operativo.
```

### Qué ocurre en Odoo

```text
1. Odoo recibe evento/sincronización desde Healthie.
2. Crea contacto si no existe.
3. Crea caso EPI10.
4. Guarda `healthie_user_id`.
5. Registra pago confirmado.
6. Crea tarea inicial para Aitor.
7. Pasa a gobernar la logística operativa del caso.
```

### Rol de Aitor

Aitor tampoco pica el cliente. Entra en Odoo ya como caso operativo creado desde Healthie.

---

## Comparativa para workshop

```text
Vía A — Web/pago actual + Odoo + Healthie
Más prudente.
Menos cambio en la captación actual.
Mantiene formulario y pago actuales.
Healthie entra inmediatamente después del pago.
Recomendable si quieren minimizar riesgo.

Vía B — Healthie-first
Más limpia como experiencia cliente.
Unifica más cosas en Healthie.
Puede reducir integraciones web/pago.
Más ambiciosa y más cambio operativo/comercial.
Recomendable si quieren rediseñar la experiencia desde el portal.
```

## Decisión única del workshop

```text
¿Queremos que la entrada siga siendo la web/pasarela actual y Healthie empiece justo después del pago?

O

¿Queremos que Healthie absorba desde el principio cuenta, formulario, pago y onboarding?
```

Nada más en este tramo.

---

## Inventario de implementación — común a ambas vías

```text
1. Modelo/caso EPI10 en Odoo.
2. Campos de vínculo:
   - healthie_user_id
   - healthie_sync_status
   - healthie_last_sync_at
   - healthie_error_message

3. Cliente GraphQL Healthie desde Odoo.
4. Cola interna de sincronización:
   - create_or_link_healthie_client
   - update_healthie_client
   - assign_healthie_group
   - send_healthie_invite
   - process_healthie_webhook

5. Dedupe:
   - email
   - teléfono
   - payment_id
   - submission_id
   - healthie_user_id

6. Estados técnicos:
   - pendiente Healthie
   - Healthie creado
   - Healthie vinculado
   - error Healthie
   - requiere revisión manual

7. Botón fallback en Odoo:
   - crear/vincular Healthie manualmente
   - reintentar sincronización
```

## Inventario específico — Vía A

```text
1. Módulo Odoo `epi10_intake`.
2. Endpoint Odoo o cron de absorción web/pago.
3. Staging de submissions web.
4. Integración con evento de pago confirmado.
5. Creación caso Odoo.
6. Job Odoo → Healthie create/link client.
7. Invitación Healthie post-pago.
8. Página post-pago web:
   - “Gracias, revisa tu correo / accede a tu portal Healthie”
   - o redirección controlada si técnicamente encaja.
```

## Inventario específico — Vía B

```text
1. Configuración Healthie como entrada:
   - cliente/paciente
   - intake/formulario inicial
   - checkout/pago
   - onboarding flow
   - grupo inicial EPI10

2. Web EPI10 pasa a ser captación/landing.
3. Evento Healthie → Odoo para crear caso.
4. Odoo intake desde Healthie, no desde web.
5. Mapeo Healthie → Odoo:
   - cliente
   - pago
   - formulario
   - estado inicial
   - healthie_user_id
```

## Versión limpia del tramo 1

```text
Tramo 1: Entrada y activación del caso

Opción A:
Web EPI10 + pago actual → Odoo → Healthie.

Opción B:
Web EPI10 → Healthie → Odoo.

En ambos casos:
Odoo gobierna el caso operativo.
Healthie gobierna la experiencia cliente.
Aitor deja de crear el cliente manualmente.
El cliente entra en Healthie desde el inicio de la experiencia post-compra.
```

---

# Tramo 2 — Activación Healthie + onboarding/formularios + preparación del test

## Punto de entrada del tramo

Venimos de aquí:

```text
Caso EPI10 creado en Odoo
Cliente creado/vinculado en Healthie
Cliente invitado a Healthie
Aitor ya no ha tenido que crear el cliente a mano
```

A partir de este punto, la lógica es:

```text
Odoo organiza el caso.
Healthie activa la experiencia cliente.
Aitor solo interviene donde haga falta revisión o acción física.
```

---

# 1. Cliente recibe acceso a Healthie

## Qué ve el cliente

```text
Recibe email / invitación / enlace de activación a Healthie.
Activa su cuenta.
Puede entrar en portal web o app.
Ve su espacio EPI10.
```

## Qué ocurre en Odoo

Odoo debe tener el caso en estado algo así:

```text
Pago confirmado
Healthie creado
Invitación enviada
Portal pendiente de activación
```

## Qué ocurre en Healthie

```text
Cliente/patient creado.
Asignado a grupo inicial EPI10.
Invitación enviada.
Portal listo.
```

Grupo inicial candidato:

```text
EPI10 - nuevo cliente
```

---

# 2. Healthie lanza onboarding inicial o ampliado

Aquí metemos el primer gran candidato de Nivel 2.

## Si el onboarding ampliado entra en Fase 1

Healthie muestra al cliente una serie de pasos:

```text
Completar consentimiento.
Completar formulario adicional.
Completar cuestionario de hábitos.
Subir documento si aplica.
Confirmar datos básicos.
```

## Si no entra en Fase 1

Healthie se queda como portal activo, pero sin onboarding pesado:

```text
Cliente tiene cuenta creada.
Puede recibir mensajes.
Puede recibir documentos.
Puede agendar si agenda entra.
Puede recibir formularios puntuales más adelante.
```

Mi recomendación: **en el mapa lo dejamos como módulo enchufable**. No rompe el flujo.

---

# 3. Formularios adicionales en Healthie

Este es de los candidatos más fuertes.

## Qué ve el cliente

```text
“Tienes un formulario pendiente para completar tu perfil EPI10.”
“Esta información nos ayuda a personalizar mejor tu informe.”
```

Formulario candidato:

```text
Hábitos alimentarios
Estilo de vida
Objetivos personales
Actividad física
Restricciones o preferencias
Síntomas/contexto
Medicación/suplementos si aplica
Consentimientos específicos
```

## Qué ocurre en Healthie

```text
Se solicita formulario.
Cliente lo completa.
Healthie registra la respuesta.
Healthie puede disparar evento/webhook.
```

## Qué ocurre en Odoo

Odoo no tiene que almacenar todo el contenido si no queremos. Puede guardar marcadores operativos:

```text
Formulario Healthie solicitado
Formulario Healthie completado
Consentimiento completado
Documento adicional recibido
Pendiente revisión
```

Y, si hace falta, crear una tarea:

```text
Revisar formulario ampliado antes de pedir/generar informe
```

---

# 4. Odoo actualiza checklist operativo del caso

Este tramo debe convertir acciones del cliente en **estado visible para Aitor**.

En Odoo, yo montaría una checklist del caso:

```text
Pago confirmado
Cliente Healthie creado
Cliente Healthie invitado
Portal activado
Consentimiento completado
Formulario principal recibido
Formulario adicional recibido
Documentos adicionales recibidos
Listo para pedir test
Test pedido
```

No todos tienen que ser “estados principales”. Muchos son **checks/hitos** dentro del caso.

## Estado principal candidato

```text
Nuevo caso / onboarding pendiente
```

Cuando se completa lo necesario:

```text
Onboarding listo / preparar test
```

---

# 5. Tareas automáticas para Aitor

Cuando el cliente queda listo para pasar a operación, Odoo crea tareas.

## Tareas candidatas

```text
Revisar nuevo caso.
Validar datos mínimos.
Revisar consentimiento/formulario si aplica.
Pedir test al laboratorio.
Añadir caso a lote de pedido si se agrupan envíos.
Confirmar pedido del test.
Registrar tracking cuando exista.
```

La clave: **Healthie recoge experiencia cliente; Odoo le dice a Aitor cuál es el siguiente paso operativo.**

---

# 6. Preparación del pedido del test

Aquí empezamos a entrar en logística, pero todavía no en toda la logística del envío.

## Qué ocurre en Odoo

Cuando el caso está listo:

```text
Estado: listo para pedir test
Owner: Aitor
Acción: pedir test / añadir a lote
```

Campos útiles:

```text
test_required = sí
test_order_status = pendiente / pedido / recibido
test_order_batch
provider_lab
pedido_fecha
tracking_url
fecha_estimada_llegada
barcode todavía vacío
```

## Qué hace Aitor

```text
Revisa casos listos.
Decide si pide test individual o espera a lote.
Hace pedido al proveedor/laboratorio.
Marca en Odoo “test pedido”.
Añade tracking si lo tiene.
```

## Qué ve el cliente

Depende de si queremos comunicarlo ya.

Opción simple:

```text
No se comunica nada hasta que el test llegue.
```

Opción más pro:

```text
Healthie envía mensaje:
“Tu caso ya está en marcha. Te avisaremos cuando tu test esté listo para agendar.”
```

---

# 7. Qué queda en Odoo y qué queda en Healthie

## Odoo

```text
Caso operativo.
Estados/hitos.
Checklist.
Tareas de Aitor.
Pedido del test.
Tracking.
Lote.
Responsable.
Incidencias.
```

## Healthie

```text
Cuenta cliente.
Portal/app.
Onboarding.
Formularios.
Consentimientos.
Mensajes al cliente.
Documentos que el cliente suba si aplica.
```

---

# Inventario de implementación del Tramo 2

## Odoo

```text
1. Modelo caso EPI10 con checklist.
2. Estados:
   - onboarding pendiente
   - onboarding listo
   - listo para pedir test
   - test pendiente de pedido
   - test pedido

3. Campos:
   - healthie_user_id
   - healthie_group_id
   - healthie_onboarding_status
   - consent_status
   - additional_forms_status
   - test_order_status
   - test_order_batch
   - tracking_url
   - expected_arrival_date

4. Actividades automáticas:
   - revisar nuevo caso
   - pedir test
   - revisar formulario
   - registrar tracking
```

## Healthie

```text
1. Grupo “EPI10 - nuevo cliente”.
2. Onboarding Flow si entra.
3. Formularios adicionales.
4. Consentimientos/cuestionarios.
5. Mensaje de bienvenida.
6. Posible mensaje “caso en marcha”.
```

## Integración Odoo ↔ Healthie

```text
1. Odoo asigna grupo Healthie.
2. Odoo solicita formularios/onboarding.
3. Healthie notifica formularios completados.
4. Odoo actualiza checklist.
5. Odoo crea tareas para Aitor.
```

## Fallback

```text
Si falla Healthie:
Odoo marca error Healthie.
Aitor puede reintentar.
Aitor puede crear/vincular manualmente.
El caso no se pierde.
```

---

# Decisión de workshop para este tramo

Aquí sí reduciría a una decisión principal:

```text
¿Queremos que Healthie tenga onboarding ampliado en Fase 1 o solo formularios/comunicaciones puntuales?
```

Y, si entra onboarding:

```text
¿Qué pasos mínimos debe completar el cliente antes de que Aitor pida el test?
```

No más.

# Versión limpia del Tramo 2

```text
Tramo 2: Activación Healthie y preparación del test

Caso creado en Odoo
→ cliente invitado a Healthie
→ cliente activa portal/app
→ Healthie lanza onboarding/formularios si aplica
→ Healthie avisa a Odoo de completados
→ Odoo actualiza checklist del caso
→ Odoo crea tarea para Aitor
→ Aitor pide test o lo añade a lote
→ Odoo marca test pedido y empieza tracking
```

---

# Tramo 3 — Pedido del test, caja negra logística, recepción y agenda en Healthie

## Punto de entrada del tramo

Venimos de aquí:

```text
Caso creado en Odoo
Cliente activado en Healthie
Onboarding/formularios completados o en marcha
Caso marcado como listo para pedir test
Aitor tiene tarea operativa en Odoo
```

Principio clave de este tramo:

```text
Odoo registra hitos operativos mínimos.
Healthie gestiona comunicación y agenda con cliente.
La logística física entre pedido y recepción queda fuera de Fase 1.
```

---

# 1. Aitor ve casos listos para pedir test

## Qué ocurre en Odoo

Odoo tiene una vista operativa tipo:

```text
Casos EPI10 → Listos para pedir test
```

Cada caso muestra lo mínimo para actuar:

```text
cliente
fecha de pago
estado Healthie
estado onboarding/formularios
estado operativo
siguiente acción
owner
```

## Qué hace Aitor

```text
Revisa casos listos.
Decide pedir el test al proveedor.
Marca en Odoo “test pedido”.
```

Estado de Odoo:

```text
Listo para pedir test
→ Test pedido / esperando recepción
```

---

# 2. Pedido del test al proveedor

Aquí **no vamos a registrar toda la logística**.

## Qué hace Aitor

```text
Pide el test fuera de Odoo, en el sistema/proceso del proveedor.
Si agrupa varios pedidos, lo gestiona como lo haga hoy.
Cuando termina, marca en Odoo “test pedido”.
```

## Qué ocurre en Odoo

Odoo solo registra el hito:

```text
test_order_status = pedido
test_ordered_at = fecha/hora
owner = Aitor
next_step = esperar recepción física
```

No obligamos a Aitor a registrar:

```text
tracking
lote
proveedor de envío
fecha estimada
revisión de tracking
actualizaciones intermedias
```

Eso queda **fuera de Fase 1**.

## Frontera explícita

```text
Desde que Aitor marca “test pedido”
hasta que Aitor marca “test recibido”,
la logística física queda como caja negra.
```

Si en el workshop descubren que esto es un dolor enorme, se apunta como **Fase 2: módulo de tracking/logística física**. Pero no lo metemos ahora porque consume scope y depende de proveedores, transportistas y procesos físicos.

---

# 3. Comunicación al cliente: “tu caso está en marcha”

Cuando Aitor marca “test pedido”, podemos disparar una comunicación simple desde Healthie.

## Qué ocurre técnicamente

```text
Aitor marca “test pedido” en Odoo
→ Odoo actualiza estado operativo
→ Odoo dispara mensaje/plantilla en Healthie
→ cliente recibe comunicación en portal/app
```

## Mensaje candidato

```text
“Tu caso EPI10 ya está en marcha. Te avisaremos desde aquí cuando tu test esté disponible para agendar la cita.”
```

Esto reduce ansiedad sin meternos en tracking.

---

# 4. Comunicaciones intermedias sin tracking

Quitamos el seguimiento de tracking como funcionalidad, pero sí podemos preparar **plantillas de respuesta** para preguntas frecuentes.

## Caso típico

Cliente escribe:

```text
“¿Dónde está mi test?”
“¿Cuándo estará?”
“¿Cuánto falta?”
```

## Qué hacemos

Healthie canaliza la comunicación. Aitor no tiene que escribir desde cero cada vez.

Plantillas candidatas:

```text
“Tu test está solicitado y estamos esperando su recepción en sede. Te avisaremos en cuanto esté disponible para agendar.”

“Los tiempos pueden variar por logística externa, pero no necesitas hacer nada por ahora. Te avisaremos desde este canal.”

“Estamos revisando el estado de tu caso y te actualizaremos si hay alguna incidencia.”
```

## Escalado humano

Si la plantilla no resuelve:

```text
Healthie/Odoo crea tarea:
“Revisar comunicación de cliente sobre test”
```

Esa tarea puede vivir en Healthie si está ligada al chat, o en Odoo si queremos mantener toda la operación ahí.

---

# 5. Test recibido físicamente en sede

Este es el siguiente hito real.

## Qué hace Aitor

```text
Recibe el test físicamente.
Identifica a qué caso corresponde.
Marca en Odoo “test recibido”.
Introduce barcode solo si decidimos que es imprescindible para trazabilidad.
```

## Qué ocurre en Odoo

Odoo actualiza el estado:

```text
Test pedido / esperando recepción
→ Test recibido / pendiente de cita
```

Campos mínimos:

```text
test_received_at
physical_test_status = recibido
barcode = opcional / si aplica
ready_for_appointment = sí
```

Nada más.

---

# 6. Odoo dispara aviso para agendar cita en Healthie

Este es el momento fuerte del tramo.

## Qué ocurre

```text
Aitor marca “test recibido” en Odoo
→ Odoo actualiza el estado del caso
→ Odoo actualiza grupo/estado del cliente en Healthie
→ Healthie dispara comunicación al cliente
→ cliente recibe aviso para agendar
```

## Grupo Healthie candidato

```text
EPI10 - test listo para cita
```

## Mensaje candidato

```text
“Tu test EPI10 ya está disponible. Puedes agendar tu cita para realizarlo desde aquí.”
```

---

# 7. Cliente agenda cita en Healthie

Esto ya lo damos como parte de la experiencia objetivo.

## Qué ve el cliente

```text
Entra en Healthie.
Ve el mensaje.
Accede a la agenda.
Consulta disponibilidad.
Elige día y hora.
Confirma cita.
Recibe confirmación.
```

## Qué ocurre en Healthie

```text
Se crea appointment.
Se asocia al cliente.
Se asocia al tipo de cita “Realización test EPI10”.
Se confirma la cita.
Se programan recordatorios si aplica.
```

## Qué ocurre en Odoo

Healthie informa a Odoo o Odoo sincroniza:

```text
healthie_appointment_id
appointment_date
appointment_status = agendada
```

Estado Odoo:

```text
Test recibido / pendiente de cita
→ Cita agendada
```

---

# 8. Notificación interna al equipo

Esto faltaba y es importante.

Cuando el cliente agenda, el equipo tiene que enterarse.

## Qué debe ocurrir

```text
Cliente agenda en Healthie
→ Healthie crea appointment
→ Odoo recibe evento/sincroniza
→ Odoo actualiza el caso
→ Odoo crea actividad o notificación interna
```

Actividad candidata:

```text
“Cita de test agendada para [fecha/hora]. Revisar preparación.”
```

También puede crearse una tarea en Healthie para Aitor/Carmen si prefieren trabajar desde ahí, pero mi recomendación sigue siendo:

```text
Odoo = notificación operativa principal.
Healthie = cita, calendario y comunicación cliente.
```

---

# 9. Sincronización calendario

Healthie puede sincronizar con Google Calendar, Outlook y feed ICS.

## Para EPI10

Podrían tener:

```text
Calendario “EPI10 - citas test”
```

Y ahí ver todas las citas agendadas.

## Qué gana Aitor

```text
No persigue mensajes.
No agenda manualmente.
No duplica citas en otro calendario.
Ve el calendario de citas de test.
Recibe actividad/notificación en Odoo.
```

---

# 10. Recordatorios al cliente

Healthie gestiona recordatorios de cita.

## Recordatorios candidatos

```text
24 horas antes.
2 horas antes.
```

## Qué ve el cliente

```text
Recordatorio en Healthie/app/email según configuración.
```

## Qué hace Odoo

Nada especial. Odoo solo mantiene:

```text
appointment_status = agendada
appointment_date = fecha/hora
```

---

# Qué queda explícitamente fuera

```text
Tracking del envío.
Integración con transportistas.
Gestión de lotes.
Alertas automáticas por retraso físico.
Actualización automática de ubicación del test.
Traqueador logístico físico.
```

Todo eso puede ser Fase 2 si descubren que el dolor justifica un módulo propio.

---

# Qué queda en Odoo y qué queda en Healthie

## Odoo

```text
vista de casos listos para pedir test
estado “test pedido”
estado “test recibido”
barcode opcional si aplica
estado “pendiente de cita”
estado “cita agendada”
actividad para Aitor cuando se agenda cita
estado operativo del caso
```

## Healthie

```text
mensajes al cliente
plantillas de comunicación
agenda de cita
confirmación de cita
recordatorios
calendario
appointment asociado al cliente
posible tarea de comunicación si hay escalado
```

---

# Inventario de implementación del Tramo 3

## Odoo

```text
1. Vista “casos listos para pedir test”.

2. Estados/hitos:
   - listo para pedir test
   - test pedido / esperando recepción
   - test recibido / pendiente de cita
   - cita agendada
   - incidencia manual si aplica

3. Campos mínimos:
   - test_ordered_at
   - test_received_at
   - barcode opcional
   - ready_for_appointment
   - healthie_appointment_id
   - appointment_date
   - appointment_status

4. Acciones/botones:
   - marcar test pedido
   - marcar test recibido
   - reenviar mensaje Healthie
   - reintentar sync de cita

5. Actividades automáticas:
   - pedir test
   - registrar recepción
   - cita agendada / preparar recepción del cliente
   - revisar comunicación si cliente escala pregunta
```

## Healthie

```text
1. Appointment Type:
   “Realización test EPI10”

2. Disponibilidad:
   horarios de P10 para realización de test

3. Grupo:
   “EPI10 - test listo para cita”

4. Plantillas de comunicación:
   - caso en marcha
   - test disponible / agenda aquí
   - respuesta general a dudas sobre espera
   - escalado a revisión humana

5. Recordatorios:
   - 24h antes
   - 2h antes

6. Calendar sync:
   Google / Outlook / ICS
```

## Integración Odoo → Healthie

```text
1. Al marcar “test pedido”:
   Odoo envía mensaje “caso en marcha”.

2. Al marcar “test recibido”:
   Odoo actualiza grupo/estado Healthie.
   Odoo envía mensaje “agenda tu cita”.

3. Si cliente pregunta y se usa plantilla:
   Healthie gestiona respuesta.
   Si requiere humano, se crea tarea.
```

## Integración Healthie → Odoo

```text
1. Appointment creada:
   Odoo guarda fecha/cita y marca “cita agendada”.

2. Appointment reprogramada:
   Odoo actualiza fecha.

3. Appointment cancelada:
   Odoo marca “pendiente de reagendar”.

4. Appointment confirmada/recordada:
   Healthie lo gestiona, Odoo no duplica.
```

---

# Versión limpia del Tramo 3

```text
Tramo 3: Pedido, recepción y cita

Odoo muestra casos listos para pedir test
→ Aitor pide test fuera del sistema
→ Aitor marca en Odoo “test pedido”
→ Odoo avisa al cliente vía Healthie: “tu caso está en marcha”
→ logística física queda como caja negra
→ si el cliente pregunta, Healthie usa plantillas y escala si hace falta
→ test llega físicamente a sede
→ Aitor marca en Odoo “test recibido”
→ Odoo actualiza grupo/estado en Healthie
→ Healthie avisa al cliente: “agenda tu cita”
→ cliente agenda en Healthie
→ Healthie confirma, recuerda y sincroniza calendario
→ Odoo recibe la cita y notifica al equipo
→ caso pasa a “cita agendada”
```

---

# Tramo 4 — Cita, muestra, laboratorio, Copilot e informe final

## Punto de entrada

```text
Cliente agendó cita en Healthie
Odoo tiene la cita asociada al caso
Aitor/equipo sabe cuándo viene el cliente
```

Principio clave:

```text
Healthie informa al cliente solo de hitos de experiencia.
Odoo gobierna el estado operativo.
TellmeGen sigue manual.
Copilot genera borradores, pero la validación humana es obligatoria.
El cliente solo ve algo cuando el informe final está validado.
```

# 1. Cliente acude a la cita y se realiza el test

## Qué hace Aitor

```text
Recibe al cliente.
Realiza el test.
Confirma/asocia barcode si aplica.
Marca en Odoo “test realizado”.
```

## Qué ocurre en Odoo

```text
Cita agendada
→ Test realizado / muestra pendiente de envío
```

Campos mínimos:

```text
test_performed_at
barcode
sample_status = pendiente_envio_laboratorio
```

## Qué ocurre en Healthie

La cita puede quedar marcada como realizada/occurred si usamos la agenda Healthie.

---

# 2. Aitor envía la muestra al laboratorio

## Qué hace Aitor

```text
Prepara el envío.
Envía la muestra al laboratorio/TellmeGen/Termillén.
Marca en Odoo “muestra enviada”.
```

## Qué ocurre en Odoo

```text
Test realizado / muestra pendiente de envío
→ Muestra enviada / esperando laboratorio
```

Campos mínimos:

```text
sample_sent_at
lab_status = esperando_resultados
```

## Qué queda fuera

```text
tracking físico
transportistas
ubicación de muestra
fecha estimada automatizada
seguimiento automático de envío
```

Caja negra logística, igual que en el tramo anterior.

---

# 3. Comunicación al cliente: muestra enviada

Aquí sí podemos comunicar algo sencillo.

## Healthie

Mensaje candidato:

```text
“Tu muestra ya ha sido enviada al laboratorio. Ahora estamos esperando el procesamiento. Te avisaremos desde este canal cuando tu informe esté disponible.”
```

Importante: no decimos “te avisaremos cuando estén los resultados”, sino **cuando tu informe esté disponible**.

---

# 4. Espera de laboratorio

## Qué ocurre

TellmeGen/laboratorio procesa la muestra.

## Odoo

Mantiene el estado:

```text
Muestra enviada / esperando laboratorio
```

Puede crear recordatorio interno:

```text
Revisar disponibilidad de entregable TellmeGen
```

## Healthie

Si el cliente pregunta, usamos plantillas:

```text
“Tu muestra está en fase de análisis. No necesitas hacer nada por ahora. Te avisaremos cuando tu informe esté disponible.”
```

Si no se resuelve con plantilla, tarea para Aitor.

---

# 5. TellmeGen/laboratorio indica que el entregable está listo

Aquí está el cambio importante.

## Qué NO ocurre

```text
No se avisa al cliente.
No se publica nada en Healthie.
No se cambia a “cliente listo”.
```

## Qué ocurre en Odoo

Aitor marca o recibe una tarea:

```text
Muestra enviada / esperando laboratorio
→ Entregable laboratorio disponible / pendiente Copilot
```

Tarea para Aitor:

```text
Descargar entregable TellmeGen y ejecutar Copilot de informe
```

Campos mínimos:

```text
lab_deliverable_available_at
lab_status = entregable_disponible
report_generation_status = pendiente
```

---

# 6. Aitor descarga el entregable TellmeGen y lo sube a Odoo/Copilot

## Qué hace Aitor

```text
Entra manualmente en TellmeGen.
Crea/completa perfil si hace falta.
Descarga el entregable/PDF/export.
Lo sube a la interfaz que le demos.
Ejecuta Copilot.
```

## Qué ocurre en Odoo

```text
Entregable laboratorio disponible / pendiente Copilot
→ Copilot en ejecución
```

Archivos/hitos:

```text
lab_original_file_uploaded = sí
lab_original_file_id
copilot_run_started_at
```

---

# 7. Copilot genera borrador(es) de informe

## Qué ocurre

```text
Copilot procesa el entregable TellmeGen + inputs disponibles.
Genera uno o varios borradores/tandas de informe.
Guarda los borradores asociados al caso.
```

## Estado Odoo

```text
Copilot en ejecución
→ Borradores generados / pendiente revisión humana
```

Campos/hitos:

```text
draft_count
latest_draft_id
copilot_run_status = completado
report_review_status = pendiente
```

---

# 8. Odoo activa tarea de revisión para Aitor

## Qué ocurre

```text
Copilot termina
→ Odoo crea tarea para Aitor
→ “Revisar borrador(es) de informe”
```

## Qué hace Aitor

```text
Revisa los borradores.
Corrige si hace falta.
Descarta versiones malas.
Marca una versión como válida.
```

Aquí la responsabilidad profesional sigue en humano.

---

# 9. Aitor valida el informe final

## Qué ocurre en Odoo

```text
Borradores generados / pendiente revisión humana
→ Informe final validado
```

Campos/hitos:

```text
final_report_id
final_report_validated_at
validated_by
report_status = validado
```

Este es el verdadero hito “cliente listo”.

---

# 10. Odoo publica el informe en Healthie

Cuando el informe final se valida:

```text
Odoo sube/publica PDF final en Healthie
Odoo cambia grupo/estado del cliente en Healthie
Healthie dispara comunicación
```

## Healthie

Grupo candidato:

```text
EPI10 - informe entregado
```

Documento:

```text
Informe final EPI10.pdf
```

Mensaje candidato:

```text
“Tu informe EPI10 ya está disponible en tu portal. Puedes acceder desde aquí para consultarlo cuando quieras.”
```

---

# 11. Cliente accede al informe

## Qué ve el cliente

```text
Notificación/mensaje en Healthie.
Accede al portal/app.
Ve su informe final.
Puede consultarlo cuando quiera.
```

## Qué ocurre en Odoo

```text
Informe final validado
→ Informe publicado en Healthie
→ Caso entregado / pendiente cierre o seguimiento
```

Campos:

```text
healthie_document_id
healthie_published_at
client_notified_at
delivery_status = entregado
```

---

# Qué queda en Odoo y qué queda en Healthie

## Odoo

```text
estado operativo completo
barcode
muestra enviada
laboratorio pendiente
entregable laboratorio disponible
archivo original TellmeGen
ejecución Copilot
borradores
tarea de revisión
informe final validado
publicación Healthie
cierre del caso
```

## Healthie

```text
cita realizada
mensajes al cliente
canal de dudas
documento final publicado
grupo “informe entregado”
notificación de informe disponible
```

# Qué queda fuera

```text
API TellmeGen.
Descarga automática TellmeGen.
Polling automático de resultados.
Interpretación autónoma sin humano.
Publicar resultados brutos al cliente.
Avisar al cliente cuando solo están los datos de laboratorio.
```

---

# Inventario de implementación del Tramo 4

## Odoo

```text
1. Estados/hitos:
   - cita agendada
   - test realizado
   - muestra enviada / esperando laboratorio
   - entregable laboratorio disponible / pendiente Copilot
   - Copilot en ejecución
   - borradores generados / pendiente revisión humana
   - informe final validado
   - informe publicado en Healthie

2. Campos:
   - test_performed_at
   - barcode
   - sample_sent_at
   - lab_deliverable_available_at
   - lab_original_file_id
   - copilot_run_status
   - draft_count
   - final_report_id
   - final_report_validated_at
   - validated_by
   - healthie_document_id
   - healthie_published_at

3. Acciones/botones:
   - marcar test realizado
   - marcar muestra enviada
   - marcar entregable laboratorio disponible
   - subir archivo TellmeGen
   - ejecutar Copilot
   - marcar borrador como válido
   - publicar en Healthie
   - reintentar publicación Healthie

4. Actividades automáticas:
   - revisar disponibilidad TellmeGen
   - ejecutar Copilot
   - revisar borradores
   - publicar informe
   - revisar error de publicación si falla
```

## Healthie

```text
1. Plantillas de comunicación:
   - muestra enviada / esperando procesamiento
   - seguimos esperando informe
   - informe disponible

2. Grupo:
   - EPI10 - informe entregado

3. Documento:
   - PDF final compartido con cliente

4. Portal/app:
   - acceso del cliente al informe
```

## Integración Odoo → Healthie

```text
1. Al marcar muestra enviada:
   enviar mensaje informativo.

2. Al validar informe final:
   subir PDF final a Healthie.
   cambiar grupo/estado Healthie.
   enviar mensaje “informe disponible”.

3. Si falla la publicación:
   Odoo crea incidencia/tarea.
```

# Versión limpia del Tramo 4

```text
Tramo 4: Cita, laboratorio, Copilot e informe

Cliente acude a la cita
→ Aitor realiza el test y confirma barcode
→ Aitor marca en Odoo “test realizado”
→ Aitor envía muestra al laboratorio
→ Aitor marca en Odoo “muestra enviada”
→ Healthie informa al cliente: “esperando informe”
→ TellmeGen/laboratorio indica que el entregable está listo
→ Odoo avisa/activa tarea para Aitor, no para el cliente
→ Aitor descarga entregable TellmeGen
→ Aitor lo sube a la interfaz Copilot/Odoo
→ Copilot genera borrador(es) de informe
→ Odoo crea tarea de revisión
→ Aitor revisa y valida informe final
→ Odoo publica el PDF final en Healthie
→ Healthie cambia grupo/estado y avisa al cliente
→ cliente accede al informe final en su portal/app
```

---

# Tramo 5 — Entrega consumida, cierre operativo, incidencias y continuidad

## Punto de entrada

Venimos de aquí:

```text
Informe final validado en Odoo
PDF final publicado en Healthie
Cliente avisado vía Healthie
Cliente puede acceder al informe desde portal/app
```

Principio clave:

```text
Healthie mantiene la experiencia post-entrega.
Odoo cierra y gobierna el caso operativo.
La Fase 1 no convierte EPI10 en un programa recurrente, pero deja la puerta preparada.
```

---

# 1. Cliente accede al informe en Healthie

## Qué ve el cliente

```text
Notificación/mensaje:
“Tu informe EPI10 ya está disponible.”

Accede a Healthie.
Abre el documento.
Consulta su informe.
Puede volver a verlo cuando quiera.
```

## Qué ocurre en Healthie

```text
Documento final disponible.
Cliente puede consultarlo.
Comunicación queda centralizada en el portal/app.
```

## Qué ocurre en Odoo

Odoo ya tiene:

```text
healthie_document_id
healthie_published_at
client_notified_at
delivery_status = publicado
```

Si Healthie expone evento/lectura del documento, lo podemos registrar. Si no, **no hacemos depender el cierre de saber si el cliente abrió el PDF**.

---

# 2. Soporte o dudas post-entrega

Es normal que el cliente pueda preguntar algo tras recibir el informe.

## Canal principal

```text
Healthie messaging
```

## Plantillas candidatas

```text
“Gracias por tu mensaje. Revisaremos tu consulta y te responderemos desde este canal.”

“Tu informe ya está disponible en el portal. Puedes acceder a él cuando quieras desde la sección de documentos.”

“Si tienes alguna duda sobre el contenido del informe, la trasladaremos al equipo para revisión.”
```

## Escalado humano

Si el mensaje requiere revisión:

```text
Healthie/Odoo crea tarea:
“Revisar consulta post-informe”
```

Mi recomendación:

```text
Healthie gestiona el canal.
Odoo registra si hay incidencia o tarea operativa.
```

---

# 3. Cierre operativo del caso en Odoo

El caso no se cierra cuando el PDF se genera. Se cierra cuando:

```text
informe validado
informe publicado en Healthie
cliente notificado
no hay incidencia abierta
```

## Estado Odoo

```text
Informe publicado en Healthie
→ Pendiente cierre
→ Cerrado
```

## Cierre manual o semi-automático

Yo no cerraría automáticamente en el mismo segundo de publicar.

Mejor:

```text
Odoo crea actividad:
“Revisar cierre del caso”
```

Y Aitor/Carmen pueden cerrar tras confirmar que no hay error evidente.

También se puede plantear:

```text
cierre automático tras X días sin incidencia
```

Pero lo dejaría como mejora posterior.

---

# 4. Encuesta o feedback ligero

Esto puede aportar valor sin convertirse en un producto nuevo.

## Opción Fase 1 si quieren

Healthie puede enviar un formulario sencillo post-entrega:

```text
¿Has podido acceder al informe?
¿Cómo valorarías la experiencia?
¿Te gustaría recibir seguimiento adicional?
¿Hay algo que no haya quedado claro?
```

## Qué ocurre si se activa

```text
Odoo marca caso como “feedback solicitado”
Healthie envía formulario
Cliente responde si quiere
Odoo registra “feedback recibido”
Si hay alerta o interés comercial, se crea tarea
```

No lo metería como obligatorio, pero es un buen candidato ligero.

---

# 5. Incidencias post-entrega

Hay que tener estados claros para no perder casos.

## Incidencias típicas

```text
cliente no puede acceder a Healthie
cliente no ve el informe
PDF equivocado
cliente pide corrección
cliente tiene dudas clínicas/funcionales
fallo de publicación
fallo de notificación
```

## Odoo

Estados o flags:

```text
incidencia_abierta = sí/no
tipo_incidencia
owner
fecha_apertura
fecha_resolución
```

## Healthie

Canal de comunicación y documento corregido si aplica.

Si hay que corregir un informe:

```text
Aitor/Carmen revisa
se genera/valida nueva versión
se publica nuevo PDF en Healthie
Odoo registra versión corregida
cliente recibe aviso
```

---

# 6. Continuidad y Fase 2: dejar la puerta abierta

Aquí no implementamos modelo recurrente, pero sí dejamos preparado el discurso.

## Mensaje suave opcional

Después de entregar el informe, se podría enviar algo tipo:

```text
“Tu informe ya está disponible. Si más adelante quieres profundizar en seguimiento, hábitos o acompañamiento personalizado, podremos ofrecerte nuevas opciones desde este mismo portal.”
```

Pero cuidado: no convertiría Fase 1 en campaña comercial.

## Lo que dejamos como Fase 2

```text
Programs / Courses
Goals
Care Plans
Journal Entries
Metrics
Video seguimiento
Membresías
Pagos recurrentes o servicios adicionales
```

La idea estratégica:

```text
EPI10 deja de ser solo un test one-off
y puede evolucionar hacia seguimiento, educación, acompañamiento y servicios recurrentes.
```

---

# 7. Cierre final del ciclo

Cuando todo está correcto:

## Odoo

```text
Caso cerrado
fecha de cierre
informe publicado
sin incidencias abiertas
siguiente oportunidad futura opcional
```

## Healthie

```text
Cliente mantiene acceso a informe/documentos
historial de mensajes
posible grupo “EPI10 - informe entregado”
posible grupo “EPI10 - seguimiento futuro”
```

Grupo Healthie candidato:

```text
EPI10 - informe entregado
```

Si hay interés futuro:

```text
EPI10 - interesado seguimiento
```

---

# Qué queda en Odoo y qué queda en Healthie

## Odoo

```text
estado de entrega
estado de cierre
incidencias
tareas internas
versionado de informe si hay corrección
fecha de publicación
fecha de cierre
posible interés futuro
```

## Healthie

```text
documento final
comunicación post-entrega
formulario feedback si aplica
acceso continuado del cliente
posibles grupos para evolución futura
```

---

# Inventario de implementación del Tramo 5

## Odoo

```text
1. Estados/hitos:
   - informe publicado en Healthie
   - pendiente cierre
   - incidencia post-entrega
   - cerrado
   - interesado seguimiento opcional

2. Campos:
   - healthie_document_id
   - healthie_published_at
   - client_notified_at
   - case_closed_at
   - closed_by
   - issue_status
   - issue_type
   - report_version

3. Acciones/botones:
   - cerrar caso
   - abrir incidencia
   - resolver incidencia
   - republicar informe corregido
   - marcar interés futuro

4. Actividades:
   - revisar cierre
   - revisar consulta post-informe
   - corregir informe si aplica
   - responder al cliente
```

## Healthie

```text
1. Documento final publicado.
2. Mensaje “informe disponible”.
3. Plantillas de soporte post-entrega.
4. Formulario feedback opcional.
5. Grupo “EPI10 - informe entregado”.
6. Grupo “EPI10 - interesado seguimiento” opcional.
```

## Integración Odoo → Healthie

```text
1. Al publicar informe:
   Healthie notifica al cliente.

2. Al corregir informe:
   Healthie publica nueva versión/documento.

3. Al cerrar caso:
   Healthie puede cambiar grupo a “informe entregado”.

4. Si se solicita feedback:
   Healthie envía formulario.
```

## Integración Healthie → Odoo

```text
1. Cliente responde formulario feedback.
2. Cliente envía mensaje post-entrega.
3. Cliente muestra interés en seguimiento.
4. Healthie evento/mensaje crea tarea o marca en Odoo.
```

---

# Qué queda fuera de Fase 1

```text
Programa recurrente completo.
Membresías.
Pagos recurrentes.
Seguimiento clínico automatizado.
Dashboard avanzado de resultados.
Care plans personalizados.
Goals y métricas como producto activo.
Campañas comerciales complejas.
```

Todo eso va a **Nivel 3 / Fase 2**.

---

# Versión limpia del Tramo 5

```text
Tramo 5: Entrega, cierre y continuidad

Cliente recibe aviso en Healthie
→ accede al informe final en portal/app
→ Healthie queda como canal de dudas post-entrega
→ si hay consulta o incidencia, se crea tarea para revisión
→ Odoo mantiene estado “informe publicado / pendiente cierre”
→ Aitor/Carmen revisan si hay incidencias
→ si todo está correcto, Odoo cierra el caso
→ Healthie mantiene el informe disponible para el cliente
→ opcionalmente se solicita feedback
→ si hay interés futuro, se marca para Fase 2 / seguimiento
```

---

# Resumen ejecutivo del journey completo

```text
Tramo 1:
Entrada y activación del caso.
Web/pago actual + Odoo + Healthie, o Healthie-first + Odoo.

Tramo 2:
Activación Healthie, onboarding/formularios y preparación para pedir test.

Tramo 3:
Pedido del test, caja negra logística, recepción física y agenda de cita en Healthie.

Tramo 4:
Cita, muestra, laboratorio, TellmeGen manual, Copilot, revisión humana e informe final.

Tramo 5:
Entrega en Healthie, soporte post-entrega, cierre operativo y puerta a Fase 2.
```

## Frase final para workshop

> Odoo gobierna el caso operativo. Healthie gobierna la experiencia cliente. TellmeGen queda manual. Copilot ayuda a generar borradores, pero la validación humana sigue siendo obligatoria.

