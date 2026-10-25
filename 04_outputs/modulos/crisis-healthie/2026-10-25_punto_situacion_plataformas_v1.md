# Punto de situación de las plataformas externas (v1)

Fecha: 2026-10-25 · Linear: SKI2-304 (matriz y fichas), SKI2-289 (Pabau), SKI2-204 · Fuentes: correo de direccion@ hasta el 25 oct, reunión del 23 oct y la matriz del 18 oct.

> **Qué es.** Qué sabemos de cada plataforma con la que hemos hablado o que hemos descartado en la ronda de contactos, **de dónde sale cada dato** y qué falta. La matriz completa, con las 137 plataformas, está en `2026-10-18_matriz_peticiones_tiers_v1.md`.
>
> **Corte de respuestas de la ronda:** lunes 26 oct.

## Resumen

| Plataforma | Color | Decisión de Raúl (25 oct) | Qué falta |
|---|---|---|---|
| Portal propio sobre OpenEMR | 🟢 | Se deja tal cual | — |
| Pabau | 🔴 | Se mantiene la demo del **vie 30 oct, 9:15** | Ver el portal por dentro y las 11 respuestas pendientes |
| Practice Better | 🟡 | Correo nuevo sobre la API y su coste | Precio y fecha de la API, cobertura, acceso de desarrollo, precio del plan |
| Plutio | 🟡 | No se insiste | Respuesta: no ha contestado nada desde el 18 oct |
| Tellescope | 🔴 | Descartada | — |
| IntakeQ | 🔴 | Descartada | — |
| Marley Health | 🔴 | Descartada (antes, naranja) | — |
| Healthie | 🔴 | Documentar la corrección del relato de la API | — |

## 1. Portal propio sobre OpenEMR · 🟢

- Ya construido y funcionando en hermes-node. Cumple las 13 peticiones; la venta va por Stripe.
- Faltan 39–62 h hasta producción (SKI2-239 a 242 y 173). Licencias a 3 años: 0–480 €.
- **Cómo lo sabemos:** lo hemos construido y probado nosotros. Detalle en `04_outputs/modulos/integracion/2026-10-12_arquitectura_sistema_v1.md`.
- Sin cambios.

## 2. Pabau · 🔴 · demo el viernes 30 de octubre a las 9:15

**Por qué es roja.** Por la regla de Raúl del 18 oct: si no automatiza el recorrido, es roja. La API cubre el alta, los formularios, las etiquetas y las citas, pero **no tiene endpoints de mensajes** y **el informe se entrega a mano**.

**Qué hace la API** (REST, la colección de Postman «Pabau Legacy»):

| Paso | ¿Por API? | Cómo |
|---|---|---|
| Crear la clienta | ✅ | `POST /clients/create`. Sin clave de idempotencia: se busca antes con `GET /clients`, por correo o por un campo propio. |
| Acceso al portal | ◐ | No hay endpoint de invitación. Se genera un **enlace mágico** a un formulario o una cita y lo mandamos con nuestro correo. Ella entra con un código por correo, y ese correo sale en inglés. |
| Consentimiento y cuestionario | ✅ | `GET /clients/{id}/medical-forms/magic-link`. El formulario condicional (envío o cita) necesita Care Plus, con precio sin confirmar. |
| Formulario completado | ✅ | `GET /clients/{id}/medical-forms` devuelve las respuestas, y hay webhook al crearse o actualizarse. |
| Etiquetas y estado del caso | ✅ | Etiquetas y campos propios al crear o editar. |
| Citas | ✅ | Leer (con filtro por fecha de cambio), crear, cambiar, cancelar y reprogramar. La clienta reserva desde el portal. |
| **Mensajes de hito al portal** | ❌ | No hay buzón en el que escribir. Lo más parecido es `POST /clients/{id}/send/email`: un correo de ida desde Pabau que queda en el historial. |
| **Leer mensajes de la clienta** | ❌ | No hay endpoint ni webhook de mensajes entrantes. La mensajería en los dos sentidos es otro producto, Pabau Engage. |
| **Informe en PDF** | ◐ | `POST /clients/{id}/documents/upload` lo guarda en la ficha, pero **no se ve en el portal ni avisa**. Se comparte a mano con «Share Securely». |

**Condiciones:**
- Claves de API en todos los planes.
- Webhooks solo con Marketing Plus (124 €/mes), y sin firma HMAC.
- Límites: 110 peticiones por minuto y 25.000 al día por clave, ampliables.
- La clave es de clínica: todo corre en nuestro servidor.
- Preparan una API nueva, sin fecha ni política de versiones.

**Precio:**
- Team: 195 €/mes + IVA; Marketing Plus: 124 €/mes. En total, ≈ 319 €/mes + IVA, o ≈ 9.200–11.500 € a 3 años.
- Descuentos por pago adelantado: 10 % a 12 meses, 15 % a 24 y 20 % a 36. El pago a 24 o 36 meses fija el precio.
- El pie «Powered by Pabau» se queda en el portal aunque pagues Marketing Plus.

**Idioma:**
- En español: portal, reservas, pantallas de acceso, correos y SMS estándar, y los botones de los formularios.
- Las plantillas de correo son editables.
- En inglés: el correo del código de acceso, algunos mensajes del sistema y las etiquetas de factura hasta renombrarlas.
- No admite CSS/JS propio ni un archivo de traducción.

**Datos:**
- El DPA cubre el RGPD de la UE y el del Reino Unido, y los datos de salud.
- Pueden alojar en la UE, pero solo como cláusula específica. Algunas funciones de IA pueden tratar datos fuera de la UE.
- Sin ISO 27001 ni SOC 2. MFA para su personal, 2FA para usuarios y registro de auditoría exportable.
- Copia diaria; restauración en menos de 24 h.

**Cuenta de prueba:** «bajo petición». Su respuesta lleva una nota interna sin borrar: *«[Confirm set-up with product before sending.]»*. **No está confirmada.**

**Cómo lo sabemos:**
- Respuesta escrita de Danny G. (Senior Account Executive), 20 oct a las 9:28, a nuestras preguntas del 19 oct, con Carmen en copia.
- La colección de Postman: confirmó que no hay ruta de invitación ni de buzón.
- Cambio de la demo: correo de Raúl del 22 oct y nueva invitación de Danny del 23 oct.

**Pendiente.** El 22 oct Raúl mandó 11 preguntas. Danny contestó el 23: «I'll review the questions and get back to you». Aún no ha respondido. Las preguntas:
1. DPA de la UE con SCC.
2. Subencargados y su ubicación.
3. Si se puede desactivar la IA.
4. Exportación y borrado de una clienta por API.
5. Precio por escrito de Team, Marketing Plus y Care Plus, y si se puede quitar el pie.
6. Cuenta de prueba.
7. Fecha de la API nueva y política de versiones.
8. **Mensajes y documentos en su hoja de ruta, API de Engage y «Share Securely» por API.** De esta respuesta depende que vuelva a naranja.
9. Lista de textos que quedan en inglés.
10. Cláusula de alojamiento en la UE.
11. SLA.

**Lectura de Raúl (25 oct):** con Pabau tenemos casi todo; falta ver el portal por dentro, y eso es la demo del 30.

## 3. Practice Better · 🟡 · correo nuevo sobre la API y el coste

**Lo que sabemos:**
- **La interfaz es solo en inglés:** menús, botones, etiquetas, app móvil y pantallas de acceso e invitación. No hay archivo de traducción, CSS/JS ni API para cambiar esos textos. Solo el contenido propio va en español.
- Datos en AWS EE. UU.
- La API está en **beta pública gratuita**, con revisión del soporte, y «pricing will be introduced once the beta period has concluded». No hay precio ni fecha.
- Plan Plus: 89 $/mes en pago anual, ≈ 985 €/año.
- Automatiza bien según la documentación pública: alta, formularios, mensajes y documentos por API. Los webhooks solo constan en una guía de terceros de 2024.

**Cómo lo sabemos:**
- Respuesta de Josh Morato, de soporte, del 19 oct (ticket 321185). Sobre el idioma, directo; para el resto nos deriva a Sarah Ray (Director of Practice Growth).
- La documentación pública que revisamos el 18 oct.

**Qué pasó con el ticket:**
- Nuestra respuesta del 20 oct se quedó en borrador.
- Practice Better mandó un recordatorio el 21 oct y cerró el ticket el 24 oct.
- No hay llamada con Sarah.

**Qué falta, y es clave:**
- Precio y fecha de la API después de la beta.
- Si quien entra en la beta mantiene las condiciones.
- Precio del plan para 2–3 profesionales.
- Acceso de desarrollo y documentación completa.
- Cobertura por API de los 8 pasos del recorrido.
- Webhooks oficiales.
- Si el español está en su hoja de ruta.

**Siguiente paso:** correo nuevo a soporte, citando el ticket 321185. Está como borrador en Gmail desde el 25 oct, con Carmen en copia, y lo envía Raúl.

## 4. Plutio · 🟡 · sin respuesta

- **Lo que sabemos** es solo documentación pública, verificada el 18 oct. La ficha completa está en la matriz:
  - en lo técnico, cubre las peticiones críticas: API y webhooks en todos los planes, alta con URL de invitación, firma, formularios, mensajes y archivos;
  - no es software de salud, así que no pasa de naranja;
  - su DPA desaconseja los datos del art. 9;
  - los archivos se guardan en EE. UU.;
  - el español no está verificado.
- **Cómo lo sabemos:** su web, la documentación de la API, el DPA y la lista de subencargados.
- **Contacto:** correo a help@plutio.com el 18 oct, con Carmen en copia. **No hay respuesta ni acuse de recibo a 25 oct.**
- **Decisión de Raúl (25 oct):** no se insiste.

## 5. Tellescope · 🔴 · descartada

- **Solo atiende a organizaciones con pacientes en EE. UU.** No se puede contratar desde España.
- **Cómo lo sabemos:** respuesta de soporte (Derek), 19 oct a las 15:17: «We currently do not serve organizations that have patients residing outside the U.S.». Avisarán si cambia.
- Era la sanitaria que más peticiones cubría por API.

## 6. IntakeQ · 🔴 · descartada

- No automatiza: deja mensajes, informe o formularios a mano en cada caso. Pasó a rojo por la regla del 18 oct.
- Estaba programado un correo, pero no consta ningún envío en Gmail. No se contacta.

## 7. Marley Health · 🔴 · descartada (25 oct)

- Es sanitaria, de código abierto y alojable en la UE. Pero sería **otro desarrollo propio**: un segundo ERP junto a Odoo, sin buzón, con los textos sin traducir, la firma fuera del portal y 70–110 h.
- Nunca se contactó. Pasa de naranja a rojo por decisión de Raúl.

## 8. Healthie · 🔴 · corrección del relato de la API

- **El precio:** la API es un complemento de pago del plan Group: 475 $/mes el primer año, 950 $/mes el segundo y 1.900 $/mes después. EPI10 no lo paga. El white label solo existe en Enterprise. Detalle en `04_outputs/modulos/healthie/2026-10-07_noticias_healthie_v1.md`.
- **Corrección (Raúl, reunión con Romi del 23 oct):**
  - **la API no fue un cambio de condiciones;**
  - en verano la probamos con un acceso de prueba;
  - en las cuentas de empresa, darla gratis o de pago siempre fue **a criterio de Healthie**;
  - eso no se comprobó al principio.
- **Qué choca con esto:** el correo a Carmen del 14 oct, con Tomás en copia, decía que Healthie había «cambiado las reglas del juego». **El dossier debe contarlo así:** el riesgo existía desde el principio y no se verificó.

## Unknown

- Respuestas de Pabau a las 11 preguntas del 22 oct.
- Todo lo de la API de Practice Better: precio, fecha, cobertura y acceso.
- Si Plutio contestará.
- Si se puede quitar el pie «Powered by Pabau» y cuánto cuesta Care Plus.
