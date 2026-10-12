# Onboarding guiado del portal · diseño acordado con Raúl

Fecha: 2026-10-12, 20:30 · Linear: SKI2-267 · Estado: aprobado por Raúl («está todo tal cual lo queremos»)

## Tramo 1 · Compra y alta (existe)
1. La clienta compra en la web de NutriWell y paga en Stripe Checkout.
2. El monolito, con el pago confirmado: paciente en OpenEMR con usuario del portal y las tareas asignadas (consentimiento, cuestionario) + contacto y tarea del caso en Odoo («Nuevo · pago confirmado»), enlazados.
3. Correo con enlace mágico de un solo uso: entra y solo crea su contraseña. Si ya tenía cuenta (mismo correo), no se duplica; entra a su espacio.
4. **Nuevo:** la página de éxito de NutriWell tras Stripe dice «Hecho. Revisa tu correo: te hemos enviado el acceso a tu espacio EPI10».

## Tramo 2 · Carril de onboarding (nuevo, forzado)
Al entrar, si faltan pasos obligatorios, el portal no muestra el inicio: muestra el **onboarding**.
1. **Bienvenida:** «Hola, Lucía. Antes de empezar necesitamos tres cosas», stepper de 3 pasos, botón «Empezar». Sin tarjetas ni menú; el chat siempre accesible.
2. **Paso 1 · Consentimiento.** Al firmar y enviar pasa directo al paso 2.
3. **Paso 2 · Cuestionario de hábitos.** Al enviar pasa al paso 3.
4. **Paso 3 · Tu test.** «¿Dónde prefieres hacer el test?»: **En casa** (formulario de envío: nombre y apellidos del destinatario, dirección, código postal, ciudad, teléfono, franja horaria preferida, observaciones) o **En la sede** (reserva de cita con el calendario existente, dentro del carril).
5. **Todo listo:** «El equipo ya tiene lo que necesita. Te avisaremos cuando salga tu kit» → inicio normal, que desde entonces es lo que ve siempre.
- Si sale a medias y vuelve, el carril la devuelve al paso donde lo dejó.
- Componente propio, moderno, «que no sea aburrido»: stepper siempre visible (arriba o abajo) con el estado de completitud en tiempo real. Referencias: steppers y transiciones de HextaUI, Arc UI y AlignUI del inventario de la batida, reescritos en la base.

## Lo que ve el equipo
- **Odoo:** la tarea pasa a «Listo para pedir test» solo con los **tres** pasos (D3 pasa a ser consentimiento + cuestionario + test). Campos propios en la tarea: modalidad (casa/sede), dirección, código postal, ciudad, teléfono, franja, observaciones; visibles en la tarjeta del kanban y en la actividad «Pedir test». Si eligió sede: fecha de la cita y etapa «Cita».
- **OpenEMR (ficha):** modalidad y datos de envío en Datos y en la cabecera; el bloque «Hoy» cuenta las clientas a medio onboarding.
- **Chat:** plantilla «Dirección de envío del kit» para que Aitor la pida si falta (plantillas: SKI2-266).

## Reparto técnico
- **Módulo UI (portal):** vistas del carril, estado del onboarding (calculado desde OpenEMR: formularios + tabla propia `epi10_onboarding` con modalidad y envío), formulario de envío, integración con citas.
- **Contrato v1 (oe-module-epi10):** `estado_formularios` devuelve también `test` (modalidad, envío, cita) y `completos` exige los tres; nueva lectura mínima, sin romper v1.
- **Monolito:** D3 con tres pasos; campos de Odoo nuevos (`odoo:setup` los crea); actividad «Pedir test» con los datos; etapa «Cita» si hay cita.
- **NutriWell:** texto de la página de éxito.

## Tramo 3 · Espera del kit y test (acordado con Raúl, 12 oct, 20:50)
1. **Mientras llega el kit** (a casa o a la sede): en el chat del portal, un acceso rápido «¿Quieres preguntar por tu pedido?» que responde solo con la plantilla común de plazos («Tu kit sale en 3–5 días laborables…», texto de EPI10) y añade «Si tienes otra pregunta, escribe al equipo». Lo mismo si la clienta pregunta por el pedido: se le ofrece esa respuesta antes de molestar al equipo.
2. **Llega el kit a la sede** (modalidad sede): plantilla para Aitor, un clic: «Tu test ya está aquí: reserva tu cita para hacértelo».
3. **Llega el kit a casa**: plantilla para Aitor, un clic: pedir el código de barras. La clienta, cuando se lo haga, lo dice por el chat.
4. **Guía del kit**: plantilla de indicaciones con la marca EPI10, muy visual (hisopo por la lengua, cerrar, enviar el código de barras: foto o escrito por el chat). Un documento con marca que se adjunta o se enlaza desde la plantilla.
5. **Código de barras recibido** (foto o texto por el chat): el código se registra (D8, SKI2-185) y salta una tarea a Aitor: gestionar con el proveedor la recogida en casa o en la sede y el envío al laboratorio.
6. **Laboratorio**: sin automatización por ahora; Aitor marca «Entregable disponible» cuando llegan los resultados.

Reparto: plantillas (1–4) → SKI2-266 (sembrarlas y el acceso rápido del portal); registro del código y tarea de recogida (5) → SKI2-185 + monolito, después de la demo; guía del kit con marca (4) → documento de diseño, SKI2-268.
