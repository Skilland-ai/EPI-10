# EPI10 Salud — Customer journey MVP v2

Fecha: 2026-10-03 · Linear: SKI2-106 · Estado: **borrador.** Validadas el 3 oct: D1, D2, D3 y D6. D2 se decidió en la sesión de arquitectura (SKI2-159, [ADR](../integracion/2026-10-03_adr_orquestador_v1.md)). D4, D5 y D7–D10 quedan como propuesta mientras Raúl no las cambie.

Base: journey operativo v1.0 de junio (`post_Fer_PENDING_INTEGRAR_BIEN_EN_REPO/epi10_journey_operativo_odoo_healthie_v1.md`), que sigue siendo la referencia detallada por tramo. Este v2 solo recoge lo que cambia y lo que hay que decidir para empezar a construir.

## Qué ha cambiado desde junio

| Hecho nuevo | Efecto en el journey |
|---|---|
| Stripe construido y aprobado por Carmen (checkout, webhook firmado, pruebas) | El tramo 1 deja de estar abierto: el pago es nuestro checkout de Stripe. |
| La propuesta firmada vende una capa propia, **EPI10 Salud MVP 1.0**, como orquestador. AWS queda descartado por el cliente | La lógica de integración vive en un monolito propio (NestJS + PostgreSQL) desplegado en el servidor de Odoo, no en módulos de Odoo como decía el v1 (D2). |
| Alcance cerrado: 110 h / 4.700 € (sin contar el módulo Stripe, que se factura aparte en SKI2-21) | Cada paso tiene que justificar su coste. Lo opcional va a Fase 2. |
| Healthie Group contratado. La API es un add-on. El white label solo existe en Enterprise | Sin API no hay automatización. Sin Enterprise, el cliente verá la marca Healthie. |
| Odoo: mantenedor y acceso desconocidos | El diseño de Odoo queda a la espera de SKI2-104, pero el journey no depende de ello. |

## Arquitectura del recorrido

```text
Cliente → Web EPI10 → Checkout Stripe
                          ↓ (webhook)
              EPI10 Salud MVP 1.0 · monolito en el servidor de Odoo
              orquesta: IDs, estados, tareas, trazabilidad
                 ↓                         ↓
          Healthie (cliente)          Odoo (equipo)
          portal, formularios,        caso, checklist,
          mensajes, cita, informe     tareas de Aitor

TellmeGen: manual (Aitor) · Copilot: borrador interno → revisión humana → informe final
```

Reglas de datos:
- **Healthie** guarda los datos del cliente.
- **Odoo** guarda solo hitos y tareas, nunca datos genéticos.
- **La capa MVP** guarda solo IDs, estados y eventos. Excepción temporal: el borrador seudonimizado del informe, que se borra al publicarlo. El entregable de TellmeGen se borra tras generar el borrador.

## Los 5 tramos

Columnas: **Cliente** = qué vive el cliente · **Sistema** = qué pasa automáticamente · **Equipo** = qué hace una persona (Aitor o Carmen).

### Tramo 1 — Compra y alta

| # | Cliente | Sistema | Equipo |
|---|---|---|---|
| 1.1 | Elige el servicio en la web y paga en Stripe | Stripe confirma el pago y avisa a la capa MVP con un webhook firmado y deduplicado | — |
| 1.2 | Ve la confirmación: «revisa tu correo para acceder a tu portal» | La capa MVP crea el caso en Odoo y crea o vincula al cliente en Healthie | — |
| 1.3 | Recibe la invitación a Healthie | Healthie envía la invitación y asigna el grupo «EPI10 · nuevo cliente» | Ve en Odoo «Nuevo caso · pago confirmado» |

**Fallback:** si falla Healthie u Odoo, la capa reintenta. Si sigue fallando, abre una tarea en Odoo y el caso no se pierde.

### Tramo 2 — Activación y preparación del test

| # | Cliente | Sistema | Equipo |
|---|---|---|---|
| 2.1 | Activa la cuenta en el portal o la app | Al entrar tras el pago, Healthie lanza automáticamente el onboarding (D3) | — |
| 2.2 | Completa los pasos del onboarding de Healthie | Healthie avisa de lo completado (webhook) → la capa marca los checks del caso en Odoo | — |
| 2.3 | — | Cuando se cumple la regla de «listo para pedir test» (D3), Odoo crea la tarea | Aitor: «Pedir test» |

### Tramo 3 — Test, recepción y cita

| # | Cliente | Sistema | Equipo |
|---|---|---|---|
| 3.1 | Mensaje: «tu caso está en marcha» | Al marcar «test pedido» en Odoo, la capa envía el mensaje en Healthie | Aitor pide el test fuera del sistema y lo marca en Odoo |
| 3.2 | — | Logística física = caja negra (fuera de Fase 1) | — |
| 3.3 | Mensaje: «tu test está listo, agenda tu cita» | Al marcar «test recibido», la capa cambia el grupo en Healthie y envía el aviso | Aitor marca «test recibido» |
| 3.4 | Agenda la cita en Healthie y recibe recordatorios | La cita se sincroniza con Odoo y el equipo recibe una notificación | Ve la cita en Odoo y en el calendario |

### Tramo 4 — Cita, laboratorio e informe

| # | Cliente | Sistema | Equipo |
|---|---|---|---|
| 4.1 | Acude a la cita | — | Aitor hace el test, registra el código de barras (D8) y marca «test realizado» |
| 4.2 | Mensaje: «muestra enviada, te avisaremos cuando tu informe esté listo» | Mensaje automático al marcar «muestra enviada» | Aitor envía la muestra y la marca en Odoo |
| 4.3 | No se le avisa todavía | Tarea para Aitor: «entregable del laboratorio disponible» | Aitor descarga el entregable de TellmeGen |
| 4.4 | — | El Copilot pseudonimiza los inputs y genera los borradores. Queda la tarea de revisión | Aitor ejecuta el Copilot |
| 4.5 | — | Solo una versión validada por una persona puede publicarse | Aitor revisa, corrige y valida |

### Tramo 5 — Entrega y cierre

| # | Cliente | Sistema | Equipo |
|---|---|---|---|
| 5.1 | Mensaje: «tu informe está disponible» y lo consulta en el portal | La capa publica el PDF en Healthie y cambia el grupo a «informe entregado» | — |
| 5.2 | Dudas por chat de Healthie, con plantillas | Si la duda requiere a una persona, se crea una tarea en Odoo | Responde o corrige y republica |
| 5.3 | Conserva el acceso al informe | — | Aitor o Carmen cierran el caso en Odoo (D10) |

## Decisiones a cerrar

| # | Decisión | Recomendación |
|---|---|---|
| **D1** ✅ | Entrada | **Vía A con Stripe**: web → Stripe → capa → Healthie + Odoo. Validada por Raúl. |
| **D2** ✅ | ¿Dónde vive la integración? | **Monolito propio (NestJS + PostgreSQL) en el servidor donde EPI10 tiene Odoo**, con módulos de Stripe, Healthie, Odoo e informes. Odoo solo por API, sin módulos instalados; sus cambios llegan por webhook. AWS descartado. Validada por Raúl. Detalle en el [ADR](../integracion/2026-10-03_adr_orquestador_v1.md). |
| **D3** ✅ | Regla de «listo para pedir test» | **Onboarding de Healthie completado.** El cliente entra en el onboarding automáticamente tras el pago, y «listo» es haber completado lo que se le pida ahí. El contenido exacto del onboarding se define al configurar Healthie. Validada por Raúl. |
| **D4** | Agenda de la cita en Healthie | **Sí**, con un tipo de cita «Realización test EPI10» y recordatorios a las 24 h y a las 2 h. |
| **D5** | Mensajería con el cliente | **Chat de Healthie con plantillas.** Lo que haga falta escalar se convierte en tarea en Odoo. |
| **D6** ✅ | White label | **Fase 1 con la marca básica del plan Group.** Se decide con la cotización de SKI2-101. Aceptamos que el cliente vea «Healthie» en algunos correos. Validada por Raúl. |
| **D7** | Alcance del Copilot | **El vendido:** checklist de inputs, pseudonimizador, borrador, revisión humana y exportación. Sin interpretación autónoma. |
| **D8** | Código de barras | **Obligatorio al marcar «test realizado»**, para poder trazar la muestra. |
| **D9** | Feedback post-entrega | **Fuera de Fase 1**, para proteger las 110 h. |
| **D10** | Cierre del caso | **Manual**, a partir de la actividad «Revisar cierre» en Odoo. |

## Fuera de Fase 1

- Seguimiento del envío del test (tracking) y logística física.
- API de TellmeGen.
- Cobro dentro de Healthie, programas y membresías.
- App propia o Mobile White Label.
- Feedback post-entrega e interpretación genética automática.

## Siguiente paso

Validar las decisiones que quedan (D4, D5, D7–D10) → congelar el v2 → crear en Linear las issues de implementación por tramo (fase 4).
