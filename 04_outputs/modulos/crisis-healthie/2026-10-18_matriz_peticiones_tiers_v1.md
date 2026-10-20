# Matriz de peticiones y tiers de viabilidad del portal de cliente (v1)

Fecha: 2026-10-18 · Linear: SKI2-288, documento 05 del proyecto · Construida a partir de las notas de los investigadores y del repaso del 18 oct. Script de tiers: reglas del §2.

> **Qué es.** Las 137 plataformas que revisamos para el portal de cliente, evaluadas una a una contra **la lista de peticiones de EPI10 al portal** y ordenadas en tiers de viabilidad, de la más viable a la menos. Sustituye a la versión anterior de este documento, que daba cifras pero no decía qué cumple y qué no cada opción.
>
> **Datos:** fuentes públicas consultadas el 18 oct 2026 (SKI2-288), con su revisión independiente. **No se ha probado ninguna plataforma.** ❓ significa que el dato no está en ninguna fuente, no que no exista.
>
> **Actualización 19 oct:** Tellescope pasa a rojo. Respondió a nuestro correo el mismo día: no atiende a organizaciones con pacientes fuera de EE. UU.
>
> **Actualización 20 oct:** Pabau pasa a rojo por su respuesta escrita: sin buzón por API en ningún sentido y el informe se comparte a mano. Practice Better confirma que su interfaz es solo en inglés, sin forma de cambiar los textos del sistema.

---

## 1. La lista de peticiones (las columnas)

| Columna | Petición al portal de cliente | ¿Crítica? |
|---|---|---|
| **ES** | La **interfaz** del portal y la app en español (si solo el contenido propio va en español, es ◐) | ✅ crítica |
| **Marca** | Marca EPI10 y personalización: marca blanca, dominio propio, sin la marca del proveedor | importante |
| **Alta** | Alta automática tras pagar en Stripe e invitación al portal | ✅ crítica |
| **Firma** | Consentimiento con firma en el portal | ✅ crítica |
| **Form** | Encuesta de hábitos y formularios propios, con aviso cuando se completan | ✅ crítica |
| **Chat** | Chat con el equipo, que el sistema pueda escribir y leer | ✅ crítica |
| **PDF** | La clienta ve y descarga su informe en PDF, publicado por el sistema | ✅ crítica |
| **Venta** | Venta adicional (paquetes, productos y pagos) usable desde España | importante |
| **BO** | Back office para el equipo (Aitor, Carmen) | importante |
| **API** | API o webhooks que una pyme pueda usar hoy | ✅ crítica |
| **€** | Coste a 3 años asumible (referencia: Healthie con API ≈ 43.300 €) | importante |
| **UE** | Datos de salud en la UE con un DPA que **acepte** los datos del art. 9 | ✅ crítica |
| **Estable** | Madurez y estabilidad: sin cambios de precio anunciados, producto vivo | importante |

**Leyenda:**
- ✅ sí, y el sistema lo puede automatizar.
- ◐ parcial o con concesión: a mano, solo por Zapier, solo en inglés, en un plan superior…
- ❌ no lo tiene, o lo prohíbe.
- ❓ desconocido.
- — no aplica.

## 2. Cómo se asigna el tier

Reglas fijas, aplicadas igual a las 137:
- 🟢 **Verde, superviable:** ninguna petición crítica en ❌ y al menos 6 de las 8 críticas en ✅.
- 🟡 **Naranja, viable con concesiones:** tiene una API que **automatiza el flujo**, sin trabajo manual en cada caso, y como mucho una crítica en ❌.
- 🔴 **Rojo, no viable:** se cumple alguna de estas condiciones:
  - prohíbe los datos de salud;
  - precio inasumible;
  - no es un portal de cliente;
  - no tiene API, o la API **no automatiza el flujo**: deja mensajes, informe o formularios a mano en cada caso, o no está documentada y no se puede comprobar (Raúl, 18 oct);
  - dos o más críticas en ❌.
- ⚪ **Sin datos:** 5 o más críticas desconocidas.
- **Tope naranja (Raúl, 18 oct):** una plataforma que no es software de salud, por ejemplo una herramienta para freelancers o agencias, no pasa de naranja aunque cumpla las peticiones. Pesan el riesgo con los datos de salud y la confianza.

**Lo rojo no se contacta** (Raúl, 18 oct).

Dentro de cada tier se ordena por puntuación. Cada crítica vale el doble: ✅ = 1, ◐ = 0,5, ❓ = 0,25, ❌ = 0.

## 3. Resultado

| Tier | Plataformas |
|---|---|
| 🟢 Verde | **1** |
| 🟡 Naranja | **11** |
| 🔴 Rojo | **121** |
| ⚪ Sin datos | **4** |

1. **Verde solo queda el portal propio sobre OpenEMR**, ya construido: cumple las 13 peticiones salvo la venta, que va por Stripe.
2. **En el naranja quedan 11 plataformas, y solo 2 son software de salud:** Practice Better y Marley Health. Tellescope se descartó el 19 oct (solo pacientes en EE. UU.). Pabau pasó a rojo el 20 oct por su propia respuesta escrita: sin buzón por API y el informe se comparte a mano. Las otras 9 no son de salud y no pasan de naranja: Plutio (la que más peticiones cubre), Assembly y los constructores sin código.
3. **Las 2 sanitarias que quedan:**
   - **Practice Better:** automatiza bien, pero su soporte confirmó el 19 oct que la interfaz es solo en inglés y que no hay forma de cambiar los textos del sistema; datos en EE. UU.; API que pasará a ser de pago.
   - **Marley Health:** código abierto, alojable en la UE, pero es otro ERP al lado de Odoo y no tiene chat.
4. **Pasan a rojo 13 que no automatizan:** IntakeQ, Carepatron, Simply.Coach, DriCloud, CoachAccountable, SuiteDash, Halaxy, Delenta, Everfit y MN program, porque dejan mensajes, informe o formularios a mano en cada caso. Docline, BridgeInteract y Nutrilog, porque su API no está documentada.
5. **Ninguna plataforma de mercado tiene a la vez español ✅, datos en la UE ✅ y automatización ✅ confirmados.**
6. **Motivos del rojo:**
   - 40: sin API o no automatizan (Pabau desde el 20 oct);
   - 56: no son un portal de cliente;
   - 8: precio inasumible;
   - 7: prohíben o excluyen los datos de salud;
   - 8: archivadas, no contratables o descartadas por decisión (Tellescope desde el 19 oct);
   - 2: fallan dos o más críticas.

---

## 4. Los tiers

+++ 🟢 Tier verde · superviable · 1

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | Por confirmar | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **OpenEMR + módulo EPI10 (propio, ya construido)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ | ✅ | ✅ | ✅ | 0–480 ×3 | — | Venta solo por Stripe desde web/monolito; sin webhooks (consulta periódica); parches 2–4 h/mes; 39–62 h hasta producción. |

+++

+++ 🟡 Tier naranja · viable con concesiones · 11

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | ¿Software de salud? | Para subir a verde (críticas no ✅) | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Plutio (UK)** | ❓ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ | ✅ | ◐ | ◐ | 550–640 ×3 | ❌ (tope naranja, Raúl 18 oct) | ES ❓, UE ◐ | Archivos en EE. UU.; DPA desaconseja art. 9; español sin verificar; webhooks sin confirmar (sondeo); EUR sin confirmar |
| 2 | Assembly (EE. UU.) | ◐ | ✅ | ◐ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ◐ | ◐ | ≈ 1.090 ×3 | ❌ (tope naranja) | ES ◐, Alta ◐, UE ◐ | Interfaz solo inglés; pagos no disponibles en España; región no publicada (prob. EE. UU.); invitación por API sin confirmar |
| 3 | Practice Better (CA) | ❌ | ◐ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ | ❌ | 985 / 985+API / 985+API | ✅ | ES ❌, Chat ◐, UE ◐ | **Interfaz solo en inglés, confirmado por soporte el 19 oct:** sin archivo de traducción, CSS/JS ni API para los textos del sistema; solo el contenido propio va en español. Datos en AWS EE. UU.; API beta de pago sin precio. Para el resto nos derivan a Sarah Ray (Director of Practice Growth). |
| 4 | Marley Health / Frappe (IN) | ◐ | ✅ | ✅ | ◐ | ✅ | ❌ | ◐ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 55–442 ×3 | ✅ | ES ◐, Firma ◐, Chat ❌, PDF ◐ | Segundo ERP junto a Odoo; sin buzón; textos de Marley sin traducir; firma fuera del portal; 70–110 h. |
| 5 | Memberstack + Webflow (EE. UU.) | ✅ | ✅ | ◐ | ◐ | ◐ | ◐ | ◐ | ✅ | ◐ | ✅ | ✅ | ◐ | ❓ | 500–900 + Webflow ×3 | ❌ (tope naranja) | Alta ◐, Firma ◐, Form ◐, Chat ◐, PDF ◐, UE ◐ | Portal entero por construir (80–150 h); EE. UU.; desaconseja datos sensibles; sin invitación por API; coste de Webflow ❓ |
| 6 | Clinked (UK) | ❓ | ✅ | ✅ | ◐ | ❌ | ✅ | ✅ | ❌ | ◐ | ◐ | ✅ | ◐ | ◐ | ≈ 2.110 ×3 | ❌ (tope naranja) | ES ❓, Firma ◐, Form ❌, API ◐, UE ◐ | Sin formularios propios (Jotform/Tally); firma vía DocuSign; sin webhooks (sondeo) ni venta; ES sin reverificar; DPA ambiguo en salud |
| 7 | Budibase (UK) | ◐ | ◐ | ✅ | ◐ | ◐ | ◐ | ◐ | ❌ | ◐ | ✅ | ✅ | ◐ | ◐ | 100–300 ×3 | ❌ (tope naranja) | ES ◐, Firma ◐, Form ◐, Chat ◐, PDF ◐, UE ◐ | Nube prohíbe salud: autoalojar y operar (50–90 h); sin traducciones ni marca en edición libre; sin Stripe |
| 8 | Zite (EE. UU.) | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ✅ | ◐ | ✅ | ✅ | ◐ | ◐ | ≈ 830 ×3 | ❌ (tope naranja) | ES ◐, Alta ◐, Firma ◐, Form ◐, Chat ◐, PDF ◐, UE ◐ | Sin UE para apps y datos; página de acceso en inglés; sin API de invitación; P4–P7 construibles; producto joven |
| 9 | Noloco (IE) | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ✅ | ✅ | ◐ | ◐ | 720 ×3 | ❌ (tope naranja) | ES ◐, Alta ◐, Firma ◐, Form ◐, Chat ◐, PDF ◐, UE ◐ | Sin localización (ES a mano); DPA no publicado ni postura art. 9; chat = comentarios; P4–P7 construibles; empresa pequeña |
| 10 | Trainerize (CA) | ❓ | ✅ | ◐ | ❌ | ◐ | ◐ | ◐ | ◐ | ✅ | ◐ | ✅ | ❓ | ❓ | ≈ 1.600 ×3 | ❌ (tope naranja) | ES ❓, Alta ◐, Firma ❌, Form ◐, Chat ◐, PDF ◐, API ◐, UE ❓ | API solo en Studio Plus; Zapier sin aviso de formulario ni mensaje nuevo; sin firma; fitness sin DPA visible. |
| 11 | Appsmith (EE. UU./IN) | ◐ | ◐ | ❌ | ◐ | ◐ | ◐ | ◐ | ❌ | ◐ | ◐ | ◐ | ◐ | ❓ | ≈ 8.800 cloud / 0 autoalojado | ❌ (tope naranja) | ES ◐, Alta ❌, Firma ◐, Form ◐, Chat ◐, PDF ◐, API ◐, UE ◐ | Solo inglés; pensado para uso interno; autoalojar y construir firma y chat (60–100 h); nube ≈ 26.400 € |

**Ficha de Plutio, verificada en sus fuentes oficiales (18 oct, noche).**

| Petición | Qué hay | Prueba | Fuente |
|---|---|---|---|
| **ES** | ◐ «Available in 25 languages, including Spanish». No consta que el portal de la clienta y los correos salgan en español. Una reseña antigua dice que la traducción de algunos términos es pobre. | Documentado a medias | [features](https://www.plutio.com/features) |
| **Marca** | ✅ Marca blanca por 9 $/mes: dominio propio, logo, colores y correos desde tu dominio. «Clients never see the Plutio name». | Documentado | [portal](https://www.plutio.com/features/client-portal) |
| **Alta** | ✅ Alta por `POST /people` (nombre, correo y rol). La URL de invitación se puede pedir por API (`GET /people/invitation-code`, changelog del 1 oct 2024). **Encaja con lo que ya hacemos:** el monolito manda su propio correo de acceso con la marca EPI10. | Existe; el detalle del endpoint no está documentado | [API](https://docs.plutio.com) |
| **Firma** | ✅ Contratos con firma electrónica, «legally binding»: enlace único por firmante y PDF firmado al terminar. Se crean y envían por API (`POST /contracts`, `/contracts/email`). No menciona eIDAS ni registro de auditoría. | Documentado | [contratos](https://www.plutio.com/help/contracts-overview) |
| **Form** | ✅ Formularios por enlace o incrustados. La respuesta se asocia a la clienta por su correo. **Webhook de formulario enviado**, con todos los campos. No consta que se le pueda asignar un formulario dentro del portal. | Documentado | [respuestas](https://www.plutio.com/help/form-responses), [webhooks](https://help.plutio.com/help/webhook-integration) |
| **Chat** | ✅ Hilo de mensajes con la clienta en el portal, con aviso por correo. La API tiene Conversations y Messengers. No hay webhook de mensaje nuevo documentado: se leería por consulta periódica, como hoy con OpenEMR. | Existe; el detalle no se ha leído | [API](https://docs.plutio.com) |
| **PDF** | ✅ La clienta descarga los archivos compartidos desde su portal. `POST /files/share` (jun 2026). **Los archivos se guardan en AWS S3, EE. UU.** | Documentado | [subencargados](https://www.plutio.com/legal/sub-processors) |
| **Venta** | ◐ Facturas y cobro en el portal con Stripe, PayPal o transferencia, sin comisión de Plutio. No es una tienda de productos. | Documentado | [precios](https://www.plutio.com/pricing) |
| **BO** | ✅ Workspace completo: contactos, proyectos, tareas y estados, hasta 30 colaboradores en Pro. | Documentado | [precios](https://www.plutio.com/pricing) |
| **API** | ✅ REST con OAuth2 **en todos los planes, sin coste aparte**, hasta 1.500 peticiones/h. Webhooks salientes `{entidad}.create/edit/remove` (facturas, tareas, proyectos, contactos, propuestas, contratos y formularios), con 10 reintentos. **No documenta firma HMAC.** | Documentado | [API](https://docs.plutio.com), [webhooks](https://help.plutio.com/help/webhook-integration) |
| **€** | ✅ Pro: 490 $/año + marca blanca 108 $/año ≈ **550 €/año, ≈ 1.650 € a 3 años**. | Documentado | [precios](https://www.plutio.com/pricing) |
| **UE** | ◐ **El punto delicado.** El DPA (4 sep 2026) entra solo al aceptar los términos, con SCC módulo 2 y adenda UK. Sobre el art. 9: «not designed to process special category personal data… should not store such data unless it has satisfied itself» de la base legal. No lo prohíbe. Base de datos: MongoDB «US, EU», sin forma documentada de fijar la UE. **Archivos en EE. UU.** Las funciones de IA envían datos a OpenAI (EE. UU.). | Documentado | [DPA](https://www.plutio.com/legal/data-processing-agreement), [subencargados](https://www.plutio.com/legal/sub-processors) |
| **Estable** | ❓ No hay datos públicos sobre la empresa: tamaño, financiación o antigüedad. Aparece en Capterra y AppSumo. | Sin fuente | — |

**Lectura.** En lo técnico daría verde: la documentación confirma que las peticiones críticas existen y se pueden automatizar. **Está en naranja por tu criterio:** no es software de salud y tiene riesgo con los datos. Prioridad baja frente al propio. El correo con todas las preguntas está en SKI2-299. **Lo que lo puede tumbar no es técnico:**
1. Que las respuestas de salud (encuesta y consentimiento) y los mensajes se guarden en una base de datos que puede estar en EE. UU., con un proveedor que **desaconseja** el art. 9.
2. Que el portal no salga en español de verdad.

Si (1) falla, queda una variante de **«portal fino»**:
- la encuesta y el consentimiento en un formulario de la UE (Tally) o en el orquestador;
- el PDF como enlace firmado del orquestador;
- en Plutio, solo el acceso, el estado y los mensajes de hito, sin datos de salud.

**Siguiente paso:** el correo de SKI2-299. La prueba de 1–2 h solo si la respuesta convence:

1. **Pregunta escrita a soporte.** 0 h; la redacta el orquestador y la envía Raúl.
   - ¿Aceptan datos del art. 9 con su DPA?
   - ¿Se puede fijar la base de datos y los archivos en la UE?
   - ¿Se puede desactivar la IA (OpenAI)?
   - ¿El portal y los correos salen en español por clienta?
   - ¿Los webhooks van firmados?
2. **Prueba sin datos reales, 1–2 h, con tu OK para abrir la cuenta de prueba.** Pasos:
   - crear una clienta por API y sacar su URL de invitación;
   - ver el portal en español;
   - enviar un formulario y recibir el webhook;
   - escribirle un mensaje por API y leer su respuesta;
   - compartir un PDF;
   - firmar un contrato.

**Criterios para descartarla:**
- no aceptan el art. 9 y el «portal fino» no convence;
- el portal no sale en español;
- no se puede sacar la URL de invitación por API.

+++

### 🔴 Tier rojo · no viable · 121

Plegadas por motivo. **Lo rojo no se contacta** (Raúl, 18 oct).

+++ 🔴 Sin API o no automatiza: trabajo manual en cada caso · 40

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | Motivo | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | CoachAccountable (EE. UU.) | ◐ | ◐ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ❓ | 1.325–2.760 ×3 | No automatiza: mensajes sin API | Interfaz solo en inglés; sin dominio propio; mensajes sin API; formularios por sondeo; datos en Chicago; «NOT HIPAA». |
| 2 | SuiteDash (EE. UU.) | ✅ | ✅ | ◐ | ✅ | ◐ | ◐ | ◐ | ✅ | ✅ | ◐ | ✅ | ◐ | ◐ | ≈ 885 ×3 | No automatiza: formularios, mensajes y PDF a mano | API solo contactos: formularios, mensajes y PDF a mano o Zapier; EE. UU. sin BAA; traducción y Stripe sin reverificar |
| 3 | IntakeQ / PracticeQ (EE. UU./CA) | ◐ | ◐ | ◐ | ✅ | ✅ | ◐ | ◐ | ◐ | ✅ | ✅ | ✅ | ◐ | ❓ | ≈ 940 ×3 | No automatiza: mensajes y PDF a mano (pendiente de confirmar por correo) | Invitación no documentada; mensajes y PDF a mano; portal quizá en inglés; datos en Canadá; 500 peticiones/día. |
| 4 | Carepatron (NZ) | ✅ | ◐ | ◐ | ✅ | ◐ | ◐ | ◐ | ◐ | ✅ | ◐ | ✅ | ◐ | ✅ | 515–1.030 / 1.030 / 1.030 | No automatiza: todo a mano | API solo exporta contactos, sin webhooks: todo manual (15–25 min/caso); región sin publicar; white label en Advanced. |
| 5 | Simply.Coach (IN/EE. UU.) | ✅ | ✅ | ◐ | ✅ | ◐ | ◐ | ◐ | ✅ | ✅ | ◐ | ✅ | ❓ | ❓ | 980–1.530 ×3 | No automatiza: mensajes y PDF a mano | Sin API, solo Zapier; mensajes y PDF a mano (5–10 min/caso); región AWS y DPA no publicados. |
| 6 | DriCloud (ES) | ✅ | ❓ | ◐ | ✅ | ◐ | ❓ | ◐ | ✅ | ✅ | ◐ | ✅ | ◐ | ❓ | 2.810 / 2.510 / 2.510 | No automatiza: formularios, mensajes y PDF a mano | API solo pacientes y citas, sin webhooks: formularios, mensajes y PDF a mano; marca y DPA desconocidos. |
| 7 | Nutrium (PT) | ✅ | ❓ | ◐ | ❓ | ◐ | ◐ | ◐ | ◐ | ✅ | ❌ | ✅ | ✅ | ✅ | 299–948 / 599–948 / 599–948 | Sin API: solo puente manual | Sin API ni Zapier: alta, formularios, mensajes y PDF a mano; marca blanca y firma sin mencionar; sin tienda. |
| 8 | Halaxy (AU) | ❓ | ✅ | ◐ | ✅ | ◐ | ◐ | ❓ | ◐ | ✅ | ✅ | ❓ | ❓ | ◐ | U | No automatiza: API sin formularios, mensajes ni documentos | API sin formularios, mensajes ni documentos; invitación U; precio, alojamiento y DPA U; español U; opaca. |
| 9 | Delenta (UK) | ❓ | ◐ | ◐ | ✅ | ◐ | ❓ | ◐ | ✅ | ✅ | ◐ | ✅ | ❓ | ◐ | ≈ 645 ×3 | No automatiza: mensajes y PDF a mano | API solo en Enterprise; Zapier parcial; mensajes y PDF a mano; español y región U; empresa pequeña. |
| 10 | Jane (CA) | ❓ | ◐ | ◐ | ✅ | ◐ | ◐ | ❓ | ◐ | ✅ | ❌ | ✅ | ◐ | ✅ | ≈ 790 / 790 / 790 | Sin API: solo puente manual | API solo para partners (no crea pacientes, sin formularios ni mensajes); español sin confirmar; datos en Londres por confirmar. |
| 11 | SimplePractice (EE. UU.) | ◐ | ❓ | ◐ | ✅ | ◐ | ◐ | ◐ | ◐ | ✅ | ❌ | ✅ | ❌ | ✅ | ≈ 870 / 870 / 870 | Sin API: solo puente manual | Sin API ni webhooks: todo manual; datos en EE. UU., RGPD U; solo USD y CAD; documentos en inglés. |
| 12 | Kalix (AU) | ◐ | ◐ | ◐ | ✅ | ◐ | ◐ | ◐ | ◐ | ✅ | ❌ | ◐ | ◐ | ❓ | 432 sin API / ≈ 9.340 con API | Sin API: solo puente manual | API y marca blanca solo Enterprise (846 $/mes); Zapier sin acciones; idioma del portal desconocido; datos en EE. UU. |
| 13 | Docline (ES) | ✅ | ✅ | ❓ | ❓ | ❓ | ◐ | ◐ | ◐ | ✅ | ◐ | ❓ | ◐ | ❓ | U | API sin documentar: no se puede comprobar | API declarada sin docs; precio enterprise por demo; firma no mencionada; región hoy no indicada. |
| 14 | Zanda (AU) | ❓ | ◐ | ◐ | ✅ | ◐ | ❌ | ◐ | ◐ | ✅ | ❌ | ✅ | ◐ | ✅ | 405 / 540 / 540 | Sin API: solo puente manual | API en beta cerrada y solo lectura: todo manual; sin chat en el portal; español U; región del 7 oct sin reverificar. |
| 15 | Dietopro (ES) | ✅ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ❌ | ◐ | ❌ | ✅ | ◐ | ◐ | 960 ×3 + IVA | Sin API: solo puente manual | Sin API: todo a mano; marca solo en informes; firma, venta y DPA sin confirmar; negocio unipersonal. |
| 16 | Doctoralia / Docplanner (ES) | ✅ | ❌ | ◐ | ❓ | ◐ | ◐ | ◐ | ◐ | ✅ | ❌ | ✅ | ◐ | ❓ | ≈ 1.308 ×3 + IVA | Sin API: solo puente manual | Marca Doctoralia, no EPI10; API solo de agenda para proveedores; nada automatizable; DPA sin confirmar. |
| 17 | Harbiz (ES) | ✅ | ◐ | ◐ | ❓ | ◐ | ◐ | ◐ | ◐ | ✅ | ❌ | ✅ | ❓ | ❓ | 1.068–1.788 ×3 + IVA | Sin API: solo puente manual | Sin API ni Zapier: puente manual; app propia en plan superior; consentimiento y región desconocidos. |
| 18 | MN program (ES) | ✅ | ❓ | ◐ | ◐ | ◐ | ❌ | ◐ | ❓ | ✅ | ◐ | ❓ | ◐ | ❓ | ≥ 365 ×3 | No automatiza: SOAP de 3 operaciones, sin portal | SOAP de 3 operaciones sin webhooks ni acceso al portal; sin chat; firma y formularios en planes superiores. |
| 19 | Everfit (EE. UU./VN) | ❓ | ◐ | ◐ | ❓ | ◐ | ◐ | ◐ | ◐ | ✅ | ◐ | ✅ | ❓ | ❓ | 600–1.300 ×3 | No automatiza: chat y PDF a mano | API solo en Enterprise; Zapier sin aviso de formulario; chat y PDF a mano; fitness; español y datos U. |
| 20 | indya (ES) | ✅ | ◐ | ◐ | ❓ | ◐ | ◐ | ◐ | ❓ | ◐ | ❌ | ✅ | ❓ | ◐ | ≈ 588 ×3 (terciaria) | Sin API: solo puente manual | Sin API; marca blanca solo >100 clientes/mes; web oficial caída; firma, venta y hosting desconocidos. |
| 21 | Medesk (UK) | ✅ | ◐ | ◐ | ❓ | ◐ | ❓ | ❓ | ◐ | ✅ | ❌ | ✅ | ◐ | ❓ | 0–450 ×3 | Sin API: solo puente manual | API sin docs; portal centrado en citas; firma, chat y PDF al paciente desconocidos; DPA contradictorio. |
| 22 | Clinic Cloud (ES) | ◐ | ❌ | ◐ | ✅ | ❓ | ❌ | ◐ | ◐ | ✅ | ❌ | ✅ | ◐ | ◐ | ≈ 588 ×3 (terciaria) | Sin API: solo puente manual | Sin API ni chat; portal con marca Doctoralia; web oficial redirige a otra; DPA sin confirmar. |
| 23 | Podia (EE. UU.) | ✅ | ✅ | ◐ | ❌ | ◐ | ◐ | ❌ | ✅ | ❓ | ❌ | ✅ | ◐ | ❓ | ≈ 930 ×3 | Sin API: solo puente manual | Sin API ni webhooks (solo Zapier); sin firma ni PDF privado; datos en EE. UU. |
| 24 | Upcoach (EE. UU.) | ❓ | ◐ | ◐ | ❌ | ◐ | ◐ | ◐ | ✅ | ✅ | ❌ | ✅ | ❓ | ❓ | ≈ 1.090 ×3 | Sin API: solo puente manual | Sin API, Zapier ni webhooks: todo manual; sin firma; sin mensajería directa explícita; español y datos U. |
| 25 | NutriAdmin (UK) | ◐ | ◐ | ◐ | ❓ | ◐ | ❌ | ◐ | ◐ | ✅ | ❌ | ✅ | ❓ | ❓ | ≈ 690 ×3 | Sin API: solo puente manual | Sin API ni chat; interfaz en inglés traducible a mano; firma, región y DPA desconocidos. |
| 26 | WriteUpp (UK) | ❓ | ❓ | ◐ | ❓ | ◐ | ◐ | ❓ | ◐ | ✅ | ❌ | ✅ | ❓ | ❓ | ≈ 395 ×3 | Sin API: solo puente manual | Sin API, webhooks ni Zapier: todo manual; chat solo por SMS; probablemente en inglés; datos U. |
| 27 | Physitrack (UK/NL) | ❓ | ✅ | ◐ | ❓ | ◐ | ◐ | ❓ | ❌ | ❓ | ❌ | ❓ | ◐ | ◐ | U | Sin API: solo puente manual | Sin API: todo manual; centrada en ejercicios de fisioterapia; contrato de 2 años; región sin indicar. |
| 28 | Ofimedic (ES) | ❓ | ❓ | ◐ | ✅ | ❓ | ❓ | ❓ | ❓ | ✅ | ❌ | ❓ | ❓ | ❓ | U | Sin API: solo puente manual | Sin API pública; precio no publicado; chat, PDF, venta y región desconocidos. |
| 29 | BridgeInteract (EE. UU.) | ❓ | ✅ | ❓ | ◐ | ◐ | ◐ | ❓ | ◐ | ❓ | ❓ | ❓ | ❌ | ❓ | U | API sin documentar: no se puede comprobar | Empresarial para grupos con EHR: sin precio ni docs de API; datos en Dallas, sin RGPD; español desconocido. |
| 30 | Clinni (ES) | ❓ | ❓ | ◐ | ◐ | ❓ | ❌ | ◐ | ❌ | ✅ | ❌ | ✅ | ❓ | ❓ | ≈ 155 ×3 + IVA | Sin API: solo puente manual | Sin API; portal de reservas e historial; firma en tableta; sin chat ni venta; región desconocida. |
| 31 | Heads Up Health (EE. UU.) | ❓ | ◐ | ◐ | ❓ | ❓ | ◐ | ❓ | ❌ | ✅ | ❌ | ◐ | ❓ | ❓ | 3.680 / 2.760 / 2.760 sin API | Sin API: solo puente manual | API y marca blanca solo en Enterprise (alta ≥ 7.000 $); firma, PDF propio, español y UE sin confirmar. |
| 32 | Nutrilog (FR) | ❌ | ❓ | ❓ | ❓ | ◐ | ◐ | ◐ | ❌ | ❓ | ◐ | ❓ | ❓ | ❓ | U | API sin documentar y solo en francés | Solo francés; API para plataformas sin docs públicas; precio y región desconocidos. |
| 33 | Nubimed (ES) | ❓ | ❓ | ❓ | ◐ | ❓ | ❌ | ◐ | ❌ | ✅ | ❌ | ✅ | ❓ | ❓ | ≈ 600 ×3 + IVA | Sin API: solo puente manual | Sin API; portal de paciente no descrito; firma solo Premium; sin chat ni venta; región desconocida. |
| 34 | Dietowin (ES) | ❓ | ❓ | ◐ | ❓ | ❓ | ❓ | ❓ | ❓ | ✅ | ❌ | ❓ | ❓ | ❓ | U | Sin API: solo puente manual | Escritorio con nube; portal solo citado (terciaria); sin API; precio y datos desconocidos. |
| 35 | Owl Practice (CA) | ❌ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ✅ | ❌ | ✅ | ❓ | ❓ | ≈ 300–540 ×3 (terciaria) | Sin API: solo puente manual | Interfaz en inglés y francés; portal como extra; sin API conocida; el resto sin fuente (solo terciaria). |
| 36 | TherapyNotes (EE. UU.) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ✅ | ❌ | ❓ | ❓ | ❓ | U | Sin API: solo puente manual | Sin API pública oficial (solo integración no oficial de terceros); precio, idioma, portal y datos sin fuente. |
| 37 | Dietbox (BR) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❌ | ❓ | ❓ | ◐ | U | Sin API: solo puente manual | No evaluable: web con error 500; sin API; RGPD no verificado; orientado a Brasil. |
| 38 | Doctolib (FR/DE) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❌ | ❓ | ❓ | ❓ | U | Sin API: solo puente manual | API solo para partners (Francia), sin programa público en España; portal y precio desconocidos. |
| 39 | Nutrimind (MX/ES) | ❓ | ❌ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❌ | ❓ | ❓ | ❓ | U | Sin API: solo puente manual | Portal dudoso (fuentes contradictorias); sin marca blanca ni API; precio desconocido. |
| 40 | Pabau (UK) | ◐ | ◐ | ◐ | ✅ | ✅ | ❌ | ◐ | ✅ | ✅ | ✅ | ❌ | ◐ | ✅ | ≈ 9.200–11.500 + IVA | No automatiza: sin buzón por API y el informe se comparte a mano (respuesta escrita de Pabau, 20 oct) | Sin mensajes por API en ningún sentido (la bidireccional es Pabau Engage, otro producto); el PDF subido por API no se ve en el portal ni avisa: se comparte a mano con Share Securely; «Powered by Pabau» se queda aunque pagues Marketing Plus (124 €/mes, necesario también para webhooks); correo del código de acceso solo en inglés; sin CSS/JS ni archivo de traducción; Team 195 €/mes + IVA. A favor: portal, correos y botones en español; DPA que cubre EU GDPR y art. 9; UE posible por cláusula; firma y formularios por enlace mágico con webhook; cuenta de prueba bajo petición. Antes, naranja 6. Lo único que lo devolvería a naranja: que send/email admita el PDF adjunto y aceptar mensajes de ida por correo sin respuesta en el portal. |

+++

+++ 🔴 Prohíbe o excluye datos de salud · 7

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | Motivo | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Softr (DE) | ◐ | ✅ | ✅ | ◐ | ◐ | ◐ | ◐ | ✅ | ◐ | ✅ | ✅ | ❌ | ◐ | 1.200–1.700 / 1.300–1.900 / 1.300–1.900 | Rechaza datos de salud | «PHI cannot be… stored inside Softr»; ES a mano, login en inglés; chat = comentarios; P4–P7 construibles; cambia planes a menudo |
| 2 | Knack (EE. UU., región UE a elegir) | ✅ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ✅ | ✅ | ❌ | ❓ | 1.215 ×3 | Excluye el art. 9 | Términos §3(a) excluyen art. 9 sin excepción, ni con HIPAA; Frankfurt sin confirmar; chat = comentarios; P4–P7 construibles |
| 3 | Bubble (EE. UU.) | ✅ | ✅ | ◐ | ◐ | ◐ | ◐ | ◐ | ✅ | ◐ | ✅ | — | ❌ | ❓ | n/a | DPA prohíbe art. 9 | DPA §13.4 prohíbe categorías especiales; UE solo en Enterprise dedicado; todo construible a mano |
| 4 | Circle (EE. UU.) | ✅ | ✅ | ✅ | ❌ | ✅ | ◐ | ◐ | ✅ | ❓ | ◐ | — | ❌ | ❓ | n/a | DPA prohíbe art. 9 | DPA prohíbe art. 9; sin firma; leer DM solo con webhooks en Scale; PDF como adjunto |
| 5 | Kajabi (EE. UU.) | ✅ | ✅ | ✅ | ❌ | ◐ | ◐ | ◐ | ✅ | ❓ | ◐ | — | ❌ | ❓ | n/a | AUP prohíbe datos de salud | AUP prohíbe datos de salud; sin firma; 1:1 (Backstage, beta) sin API; API solo en Pro o complemento |
| 6 | Dubsado (EE. UU.) | ❓ | ✅ | ◐ | ✅ | ◐ | ❌ | ◐ | ◐ | ✅ | ❌ | ✅ | ❌ | ❓ | ≈ 485 ×3 | Excluye datos sensibles | Términos excluyen información sensible; sin API (Zapier solo Premier); sin chat; casi todo a mano |
| 7 | Glide (EE. UU.) | ◐ | ❓ | ❌ | ◐ | ◐ | ◐ | ❌ | ◐ | ❓ | ◐ | — | ❌ | ❓ | n/a | Prohíbe datos genéticos | Prohíbe datos genéticos; sin servidores UE; API sin usuarios ni archivos; correo del PIN en inglés |

+++

+++ 🔴 Precio inasumible · 8

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | Motivo | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Canvas Medical (EE. UU.) | ❓ | ◐ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ | ❌ | ❌ | ✅ | ≈ 44.160 ×3 | precio inasumible | 4.000 $/mes con contrato de 2 años; AWS EE. UU., sin UE; español del portal desconocido. |
| 2 | Oystehr / Ottehr (EE. UU.) | ✅ | ◐ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ | ◐ | ✅ | ❌ | ❌ | ◐ | ≈ 11.040 ×3 + uso | precio inasumible | Silver 1.000 $/mes; datos en EE. UU. sin DPA; licencia con atribución obligatoria y cláusulas anti-IA. |
| 3 | Healthie (EE. UU.) | ◐ | ◐ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | 7.440 / 12.690 / 23.170 | Precio inasumible | API de pago (≈ 43.300 € a 3 años); interfaz sin español; sin white label; datos en EE. UU. sin DPA; precio ya cambió. |
| 4 | WeWeb + Xano (FR/EE. UU.) | ✅ | ✅ | ◐ | ◐ | ◐ | ◐ | ◐ | ✅ | ◐ | ✅ | ❌ | ◐ | ◐ | 1.160–1.460 (≈ 8.280 con acuerdo de salud) ×3 | Precio con acuerdo de salud | Xano prohíbe salud sin «Health Data Agreement» (≈ 24.800 € a 3 años); WeWeb en EE. UU.; casi portal propio (70–110 h) |
| 5 | Aidbox + Beda EMR (EE. UU.) | ◐ | ❓ | ✅ | ◐ | ✅ | ❓ | ◐ | ❌ | ✅ | ◐ | ❌ | ◐ | ◐ | ≈ 20.976 ×3 (terciaria) | precio inasumible | Licencia de producción ≈ Healthie año 3; la gratuita prohíbe datos reales; portal de paciente sin confirmar. |
| 6 | Moxo (EE. UU.) | ✅ | ◐ | ❓ | ✅ | ◐ | ◐ | ◐ | ❓ | ✅ | ◐ | ❌ | ❓ | ❓ | ≥ 5.000 ×3 | Precio inasumible | API solo en plan a medida, sin precio público; marca en Enterprise; región UE y DPA no publicados |
| 7 | Stackby (IN) | ❓ | ◐ | ❌ | ◐ | ◐ | ❌ | ◐ | ❌ | ◐ | ◐ | ❌ | ❌ | ◐ | ≈ 33.000 ×3 (extrapolación) | Precio inasumible, sin UE | Sin UE ni DPA; no aísla por clienta; sin invitación ni chat; invitados de portal muy caros |
| 8 | Akute Health (EE. UU.) | ❓ | ❓ | ❓ | ❌ | ❓ | ❓ | ❓ | ◐ | ✅ | ◐ | ❌ | ❌ | ◐ | > 6.072 ×3 + API U | precio inasumible | API solo en plan Developer sin precio; sin firma nativa; EE. UU. sin RGPD; empresa de 4 personas. |

+++

+++ 🔴 Falla dos o más peticiones críticas · 2

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | Motivo | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Outseta (EE. UU.) | ✅ | ❓ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ◐ | ❓ | ≈ 410 ×3 | Falla 3 peticiones críticas | Sin formularios, firma ni PDF; necesita web externa; región no indicada (posible EE. UU.); marca y correos ❓ |
| 2 | Teachable (EE. UU.) | ❓ | ✅ | ✅ | ❌ | ◐ | ❌ | ❌ | ✅ | ❓ | ✅ | ✅ | ◐ | ❓ | ≈ 1.535 ×3 | Falla 3 peticiones críticas | Sin mensajes, firma ni PDF privado; español del alumno sin verificar; región no indicada |

+++

+++ 🔴 Archivada, no contratable, no localizada o descartada por decisión · 8

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | Motivo | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Odoo como portal (BE) | ✅ | ◐ | ✅ | ◐ | ✅ | ◐ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | 1.004 / 1.220 / 1.220 (0 € si ya tiene la API) | decisión de Raúl | Estética Odoo; chat como hilo; firma solo Enterprise; DPA no menciona datos de salud; 40–70 h. |
| 2 | HoneyBook (EE. UU.) | ❓ | ❓ | ◐ | ✅ | ◐ | ◐ | ◐ | ❌ | ✅ | ❌ | — | ◐ | ❓ | n/a | No contratable desde España | Alta solo para EE. UU., CA, UK y AU; sin API pública (Zapier limitado); cobros sin EUR |
| 3 | Fullscript (CA/EE. UU.) | — | — | — | — | — | — | — | ❌ | — | ❌ | — | ❌ | ❓ | n/a | No envía a España | Solo envía a EE. UU. y Canadá; API solo para partners EHR; datos en Norteamérica. |
| 4 | Medicapp (FR/ES) | — | — | — | — | — | — | — | — | — | — | — | — | ❓ | U | No verificada | La web no resuelve; según las tiendas, software para el profesional, no portal de paciente. |
| 5 | Fasten Health (EE. UU.) | — | — | — | — | — | — | — | — | — | — | — | — | ❌ | n/a | archivada; no es portal | Registro personal para familias; repositorio archivado el 18 jul 2026. |
| 6 | HospitalRun (EE. UU.) | — | — | — | — | — | — | — | — | — | — | — | — | ❌ | n/a | archivada | Repositorio archivado el 9 ene 2023. |
| 7 | Eugenomic | — | — | — | — | — | — | — | — | — | — | — | — | — | n/a | No localizada | Sin fuente primaria; las búsquedas devuelven Genotica y Mylogy, ninguno es portal configurable. |
| 8 | Tellescope (EE. UU.) | ◐ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ◐ | ❓ | ❌ | ◐ | U | No contratable desde España (correo del 19 oct) | «We currently do not serve organizations that have patients residing outside the U.S.»; avisarán si cambia. Antes, naranja 5: cubría las 7 operaciones por API. |

+++

+++ 🔴 No es un portal de cliente (otro producto: test propio, agenda, chat, backend, consumidor…) · 56

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | Motivo | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Medplum (EE. UU.) | ❌ | ✅ | ◐ | ❓ | ◐ | ◐ | ◐ | ❌ | ◐ | ✅ | ✅ | ✅ | ✅ | 0 autoalojado / ≈ 22.080 cloud | no es un portal | Portal entero por construir (90–160 h), starters en inglés; cloud caro y región desconocida; firma sin componente. |
| 2 | Spruce Health (EE. UU.) | ❓ | ❌ | ✅ | ❌ | ◐ | ✅ | ✅ | ◐ | ◐ | ✅ | ✅ | ❌ | ❓ | ≈ 1.080 ×3 | Solo chat, no portal | Solo capa de chat: formularios y consentimiento fuera de la API; marca Spruce; datos en EE. UU. |
| 3 | Tally (BE) | ✅ | ✅ | — | ◐ | ✅ | — | — | ◐ | — | ✅ | ✅ | ◐ | ❓ | 0–240 ×3 | No es un portal | Complemento: solo consentimiento y encuesta; firma simple sin auditoría; salud no mencionada |
| 4 | Jotform (EE. UU./UK) | ◐ | ◐ | — | ✅ | ✅ | — | — | ◐ | — | ✅ | ✅ | ◐ | ❓ | 375–1.420 ×3 | No es un portal | Complemento; cláusula «highly sensitive» ambigua; dominio propio solo Gold; un usuario; textos del sistema en ES sin verificar |
| 5 | Koibox (ES) | ✅ | ✅ | ◐ | ◐ | ❌ | ❌ | ❌ | ✅ | ✅ | ◐ | ✅ | ❓ | ❓ | 550 ×3 + IVA | No es un portal (belleza) | Sin formularios, chat ni PDF; firma solo por QR en el centro; datos de salud no contemplados. |
| 6 | Fillout (EE. UU.) | ✅ | ◐ | — | ◐ | ✅ | — | — | ◐ | — | ✅ | ◐ | ◐ | ❓ | ≈ 3.310 ×3 | No es un portal | Complemento; UE solo en Team (300 $/mes, ≈ 9.900 € a 3 años); firma sin auditoría; salud no mencionada |
| 7 | Typeform (ES) | ✅ | ◐ | — | ◐ | ✅ | — | — | ◐ | — | ✅ | ◐ | ◐ | ❓ | > 3.000 ×3 (U) | No es un portal | Complemento; UE, firma y dominio propio solo en planes altos o a medida; firma simple |
| 8 | Cliniko (AU) | ❌ | — | ❌ | ◐ | ◐ | ❌ | ❌ | ◐ | ✅ | ✅ | ✅ | ✅ | ✅ | 960–1.050 ×3 (2–5 profesionales; 495 con 1) | No es un portal | Sin portal de cliente ni chat; en inglés; API sin webhooks; habría que construir el portal igualmente. |
| 9 | Awell Health (BE/EE. UU.) | ❓ | ✅ | ◐ | ❓ | ✅ | ❌ | ❓ | ❌ | ❓ | ✅ | ❓ | ◐ | ❓ | U | no es un portal | Solo cubre ops. 1–3; sin buzón ni respuesta de la clienta; enlaces caducan a 60 min; precio y DPA desconocidos. |
| 10 | Bahmni (IN) | ❓ | ❓ | ❓ | ❌ | ❌ | ❌ | ◐ | ◐ | ✅ | ◐ | ✅ | ✅ | ✅ | 0 + > 120 h | portal solo PoC | Portal en prueba de concepto, «not ready for real-world use»; REST sin webhooks; venta solo Odoo interno. |
| 11 | Systeme.io (IE) | ❓ | ✅ | ◐ | ❌ | ◐ | ❌ | ❌ | ◐ | ❓ | ✅ | ✅ | ◐ | ❓ | 190–1.070 ×3 | No es un portal | Web y tienda UE: sin firma, mensajes ni PDF privado; DPA no publicado; área de miembros y EUR sin verificar |
| 12 | MediQuo (ES) | ✅ | ◐ | ◐ | ❌ | ❌ | ✅ | ❓ | ❌ | ❓ | ◐ | ❓ | ❓ | ❓ | U | Solo chat, no portal | Solo cubre el chat; API con caso de uso validado; quizá solo médicos de MediQuo; precio desconocido. |
| 13 | Dolibarr CabinetMed (FR) | ❓ | ❓ | ❓ | ❌ | ❌ | ❌ | ❌ | ◐ | ✅ | ✅ | ✅ | ✅ | ◐ | 0 + > 120 h | no es un portal | Sin portal de paciente documentado; módulo médico casi parado (2023–2024); portal por construir (> 120 h). |
| 14 | LibreHealth EHR (EE. UU.) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❌ | ❓ | ❓ | ✅ | ✅ | ◐ | n/a | sin portal abierto | Fork de OpenEMR con actividad dudosa; casi todo desconocido; OpenEMR lo da mejor. |
| 15 | GNU Health + Tryton (AR/UE) | — | — | — | — | — | — | — | ◐ | ✅ | ◐ | ✅ | ✅ | ✅ | 0 + horas | no es un portal | Sin portal web para la clienta (> 120 h); JSON-RPC sin webhooks; venta solo interna del ERP. |
| 16 | Ozone HIS (FR) | — | — | — | — | — | — | — | ◐ | ✅ | ◐ | ✅ | ✅ | ✅ | 0 + > 120 h | no es un portal | Sin portal de paciente; cuatro sistemas (OpenMRS, Odoo, SENAITE, Superset); solo autoalojado. |
| 17 | Cronometer Pro (CA) | ✅ | ◐ | — | ❌ | ❌ | ◐ | ❌ | ❌ | ◐ | ❌ | ✅ | ◐ | ❓ | 440–700 ×3 | No es un portal | Sin consentimiento, formularios ni PDF; sin marca blanca; API solo socios; datos en EE. UU. |
| 18 | Muhdo Helix (UK) | ❓ | ✅ | ❓ | ❓ | ❓ | ❓ | ❌ | ❌ | ❓ | ◐ | ❌ | ◐ | ◐ | ≈ 6.325 / 3.450 / 3.450 | Solo vende su test | Portal de sus tests: cambiar el kit, no muestra el informe EPI10; ≈ 13.200 €; «Sold out»; Muhdo es responsable. |
| 19 | Paperbell (EE. UU.) | ❓ | ❓ | ❌ | ❓ | ❓ | ❓ | ❓ | ✅ | ❓ | ◐ | ❓ | ❓ | ❓ | U | Solo tienda, no portal | Zapier solo de salida: el alta no puede venir del orquestador; precio, formularios, idioma y datos U. |
| 20 | OpenMRS O3 | — | — | — | — | — | — | — | ❌ | ✅ | ◐ | ✅ | ✅ | ✅ | 0 + > 120 h | no es un portal | Sin portal de paciente (> 120 h); REST/FHIR sin webhooks; sin venta. |
| 21 | Patients Know Best (UK) | ❓ | ❓ | — | — | — | ◐ | ◐ | — | — | ◐ | ❓ | ◐ | ✅ | U | No es portal de marca | Historia clínica personal del NHS; marca, español, alojamiento y venta a clínicas privadas desconocidos. |
| 22 | Heallist (UK) | ❓ | ❌ | ◐ | ❌ | ❌ | ◐ | ❌ | ◐ | ◐ | ❌ | ✅ | ❓ | ❓ | 220–265 ×3 | Marketplace, no portal | Marketplace sin formularios, firma ni PDF; sin marca propia; sin API; español y datos U. |
| 23 | Juno EMR (CA) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❌ | ✅ | ❓ | ❓ | ❌ | ❓ | U | sin portal abierto | Servicio canadiense con datos en Canadá; portal, API y precio desconocidos. |
| 24 | Directus (EE. UU.) | — | — | — | — | — | — | — | — | ✅ | ✅ | ✅ | ◐ | ❓ | 0–1.090 ×3 | No es un portal | Backend/CMS: portal por construir (90–140 h), duplica el orquestador; DPA sin categorías especiales («None») |
| 25 | TellmeGen B2B (ES) | — | ◐ | ◐ | ❌ | ❌ | ❌ | ◐ | ❌ | ◐ | ❌ | ✅ | ◐ | ❓ | 0 ×3 | No es un portal | Complemento: marca blanca solo del PDF genético; alta manual sin API; alojamiento y DPA desconocidos. |
| 26 | Luscii (NL) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❌ | ❓ | ❌ | ❓ | ◐ | ❓ | U | Solo hospitales | Telemonitorización hospitalaria; sin API pública; idiomas, marca y precio desconocidos. |
| 27 | Portant (AU) | — | — | — | ◐ | ❌ | ❌ | — | ◐ | — | ✅ | — | ◐ | ❓ | n/a | No es un portal | Automatiza documentos para HubSpot/Google Docs; firma sin garantía legal; sin encuesta ni chat; EE. UU. |
| 28 | InsideTracker / Terra (EE. UU.) | ❓ | ❌ | ◐ | ❌ | ◐ | ❌ | ❌ | ❌ | ◐ | ◐ | ❓ | ❌ | ◐ | U | No es un portal | Motor de sangre y wearables: crea usuario sin invitación, solo sus cuestionarios; sin chat, firma ni PDF propio; EE. UU. |
| 29 | Evry (NL) | ❌ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❌ | ❓ | ❌ | ❓ | ◐ | ❓ | U | Solo mercado NL | Portal solo en neerlandés; sin API; precio desconocido. |
| 30 | EHRbase (DE) | — | — | — | — | — | — | — | ❌ | ❌ | ◐ | ✅ | ✅ | ❓ | 0 + horas | no es un portal | Solo backend openEHR (interfaz Swagger); todo por construir (> 150 h); webhooks desconocidos. |
| 31 | Semble (UK) | — | — | — | — | — | — | — | ◐ | ✅ | ◐ | ❓ | ❓ | ❓ | U | No es un portal | Sin portal de paciente ni español; webhooks activados por soporte; precio por demo; región no indicada. |
| 32 | Luma Health (EE. UU.) | ◐ | — | — | — | — | — | — | — | — | ❌ | ❓ | ◐ | ❓ | U | Atada a un EHR | Se vende a sistemas de salud integrada con Epic/athena; sin API pública ni precio. |
| 33 | i-Diet (ES) | — | — | — | — | — | — | — | — | — | ❌ | ✅ | ❓ | ❓ | 180 ×3 + IVA | No es un portal | Sin portal, chat ni consentimiento; informes por correo o impresos. |
| 34 | LifeNome (EE. UU.) | — | — | — | — | — | — | — | ❌ | — | ◐ | ❓ | ❌ | ◐ | U | No es un portal | Motor genómico con API pública de precio desconocido; datos en Google Cloud EE. UU. sin SCC. |
| 35 | Doctena (LU/DE) | — | — | — | — | — | — | — | — | ❓ | ❌ | ❓ | ❓ | ❓ | U | Solo agenda, no portal | Agenda; la API de Okta es solo identidad del personal. |
| 36 | Jameda (DE) | — | — | — | — | — | — | — | — | ❓ | ❌ | ❓ | ❓ | ❓ | U | Solo agenda, no portal | Solo interfaces de agenda con software alemán. |
| 37 | NutriSoft (EE. UU.) | — | — | — | — | — | — | — | — | — | ❓ | — | ❓ | ❓ | n/a | No es un portal | Programa de análisis nutricional, no portal. |
| 38 | Open Health Stack (Google) | — | — | — | — | — | — | — | ❌ | ❌ | — | ✅ | — | ❓ | 0 + horas | no es un portal | SDK Android para apps offline; ni portal ni servidor; app por construir (> 200 h). |
| 39 | Nutrigenomix (CA) | — | — | — | — | — | — | — | ❌ | — | ❓ | — | ❓ | ❓ | n/a | Solo vende su test | Solo entrega su test; web sin contenido legible, API y datos desconocidos. |
| 40 | ADNTRO (ES) | — | — | — | — | — | — | — | ❌ | — | ❌ | — | ◐ | ❓ | n/a | Solo vende su test | Test de consumo sin programa de profesionales visible; Google Cloud UE, DPA desconocido. |
| 41 | Vitagene / 1health.io (EE. UU.) | — | — | — | — | — | — | — | ❌ | — | ❓ | — | ❌ | ◐ | n/a | Solo vende su test | Solo sus pruebas en EE. UU.; sanción de la FTC por seguridad y borrado de ADN. |
| 42 | That Clean Life (CA) | — | — | — | — | — | — | — | — | — | ❌ | — | ❓ | ❓ | n/a | No es un portal | Solo menús; integrado en Practice Better. |
| 43 | Portal.io (EE. UU.) | — | — | — | — | — | — | — | — | — | ❌ | — | ❓ | ❓ | n/a | Otro sector (AV) | Propuestas para integradores AV/TI; sin API; región desconocida |
| 44 | GenoPalate (EE. UU.) | — | — | — | — | — | — | — | ❌ | — | ❌ | — | ❓ | ❓ | n/a | Solo vende su test | Portal de profesional para su propio test (fuente terciaria); EE. UU. |
| 45 | Xcode Life (IN) | — | — | — | — | — | — | — | ❌ | — | ❓ | — | ❌ | ❓ | n/a | Solo vende su test | Solo su análisis de datos brutos; API citada sin docs; datos en India. |
| 46 | Fagron Genomics (ES) | — | — | — | — | — | — | — | ❌ | — | ❌ | — | ❓ | ❓ | n/a | Solo vende su test | Solo su test NutriGen; sin API; alojamiento desconocido. |
| 47 | LetsGetChecked (IE/EE. UU.) | — | — | — | — | — | — | — | — | — | ❌ | — | ❓ | ❓ | n/a | Solo vende su test | Solo sus pruebas; sin API pública ni marca blanca; datos solo en fuente terciaria. |
| 48 | Vibrant Wellness (EE. UU.) | — | — | — | — | — | — | — | — | — | — | — | ❓ | ❓ | n/a | Laboratorio, no portal | Laboratorio con portal de pedidos; expansión a Europa solo en fuente terciaria. |
| 49 | Klara / ModMed (EE. UU.) | — | — | — | — | — | — | — | — | — | — | ❓ | — | ◐ | U | Solo con EHR ModMed | Absorbida por ModMed; solo se vende junto a su EHR. |
| 50 | Metriport (EE. UU.) | — | — | — | — | — | — | — | — | — | — | — | ❌ | ❓ | n/a | no es un portal | API de historiales de redes de EE. UU.; no aplica a España. |
| 51 | 3X4 Genetics (EE. UU./ZA) | — | — | — | — | — | — | — | ❌ | — | ❌ | — | ❌ | ❓ | n/a | Solo vende su test | Solo entrega su test, analizado en EE. UU.; sin API ni marca blanca. |
| 52 | Nutrition Genome (EE. UU.) | — | — | — | — | — | — | — | ❌ | — | ❌ | ❌ | ❌ | ❓ | n/a | Solo vende su test | Marca blanca de sus informes con mínimo de 500 muestras/mes; servidor en EE. UU. |
| 53 | Function Health (EE. UU.) | — | — | — | — | — | — | — | — | — | ❌ | — | — | ❓ | n/a | Solo consumidor, EE. UU. | Membresía de consumo solo en EE. UU.; sin B2B, API ni marca blanca. |
| 54 | Lifeforce (EE. UU.) | — | — | — | — | — | — | — | — | — | ❌ | — | — | ❓ | n/a | Solo consumidor, EE. UU. | Programa de consumo por estados de EE. UU.; sin API ni marca blanca visibles. |
| 55 | Nourish (EE. UU.) | — | — | — | — | — | — | — | — | — | ❌ | — | — | ❓ | n/a | Servicio, no software | Red de dietistas con seguro de EE. UU.; sin API ni marca blanca. |
| 56 | Rupa Health (EE. UU.) | — | — | — | — | — | — | — | — | — | — | — | — | ❌ | n/a | Solo laboratorios EE. UU. | Pedido de análisis con NPI de EE. UU.; se integra en Fullscript durante 2026. |

+++
+++ ⚪ Sin datos suficientes · 4

| # | Plataforma | ES | Marca | Alta | Firma | Form | Chat | PDF | Venta | BO | API | € | UE | Estable | € 3 años | Qué le falta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Elation (EE. UU.) | ✅ | ❓ | ❓ | ✅ | ❓ | ❓ | ❓ | ◐ | ✅ | ❓ | ❓ | ❌ | ✅ | U | Precio y API solo por presupuesto; contrato no verificable sin docs de partner; datos en EE. UU. |
| 2 | Flowww (ES) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ✅ | ◐ | ◐ | ❓ | ❓ | 708–2.988 ×3 + IVA (terciaria) | Estética; API «abierta» sin docs públicas; portal, firma y datos desconocidos; techo con IVA ≈ 10.800 €. |
| 3 | CharmHealth (EE. UU.) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ✅ | ◐ | ❓ | ❓ | ❓ | U | Programa de API, HL7 y FHIR sin utilidad probada para el contrato; webhooks, precio, idioma y datos U. |
| 4 | Tebra / Kareo (EE. UU.) | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ❓ | ✅ | ❓ | ❓ | ❓ | ❓ | U | Portal y API citados sin detalle; mercado de EE. UU.; precio, idioma y datos sin fuente. |

+++

---

## 5. Qué cambia frente a la versión anterior

- **Plutio sale de la sombra.** Antes era una fila del inventario. Con la matriz se ve que cumple más peticiones que cualquier otra plataforma de mercado. Estuvo en verde hasta que Raúl fijó el tope naranja para lo que no es software de salud.
- **Pabau, a rojo (20 oct).** Danny contestó por escrito a las 8 preguntas del flujo: alta, firma, formularios, estado de formularios, etiquetas y citas, sí; **mensajes al portal y lectura de mensajes, no** (solo correo de ida desde Pabau, que queda en el historial); **el PDF por API no se ve en el portal** y se comparte a mano. Español casi completo (el correo del código de acceso, en inglés). Coste real ≈ 319 €/mes + IVA con Marketing Plus, muy por encima de la estimación. Por la regla «si deja mensajes o informe a mano, rojo», baja de naranja 6 a rojo. La demo del viernes 23 sigue reservada; Raúl decide si la mantiene.
- **Practice Better, interfaz solo en inglés (19 oct).** Soporte lo confirma y descarta cualquier mecanismo para cambiar los textos del sistema. Sigue en naranja por la regla (una sola crítica en ❌), pero el español era el bloqueo principal. Derivan a Sarah Ray para precio de la API, DPA y hoja de ruta.
- **Odoo como portal** sale bien en la matriz, pero sigue en rojo por tu decisión del 18 oct.
- **Healthie** cumple casi todo, pero está en rojo por el precio de la API.
- **Regla nueva (Raúl, 18 oct):** si la API no automatiza el flujo, la plataforma va a rojo, y lo rojo no se contacta. 13 plataformas pasan de naranja a rojo, IntakeQ entre ellas.
- **Tellescope, fuera (19 oct).** Era la sanitaria que más peticiones cubría. Contestó a nuestro correo el mismo día: no atienden a organizaciones con pacientes fuera de EE. UU. Pasa a rojo por no contratable desde España.

+++ Dudas de datos entre fuentes

- **Practice Better:** los webhooks solo los respalda una guía terciaria de 2024. Los datos han pasado de Quebec a AWS EE. UU.
- **Carepatron:** el alcance del español (interfaz o solo contenido) es Unknown. Que la API vaya en Advanced no es concluyente.
- **Pabau:** el portal no menciona firma, pero la API tiene `quotes/sign`. El precio está extrapolado de fuentes terciarias con 1 usuario.
- **Tellescope:** la firma sale de campos de la API (`esignatureTermsCompanyName`). Hay traducción de formularios, pero no consta la de la interfaz.
- **Softr y Dubsado:** su exclusión de datos sensibles es menos explícita de lo que decía el §5 del repaso. El DPA de Softr no se pudo leer.
- **Knack:** el art. 9 está excluido sin excepción (corrección de la revisión). Frankfurt no está confirmado.
- **Xano:** admite datos de salud con un «Health Data Agreement» de pago (≈ 24.800 € a 3 años).
- **Clinic Cloud, Kalix, Docline y Zanda:** sus datos de región y DPA son del 7 oct, sin reverificar.
- **Muhdo Helix:** figura como «Sold out»; puede no estar contratable.

+++

## 6. Documentos completos

- Repaso con fuentes, fila a fila: `04_outputs/modulos/crisis-healthie/2026-10-18_repaso_plataformas_mercado_v1.md` ([GitHub](https://github.com/Skilland-ai/EPI-10/blob/master/04_outputs/modulos/crisis-healthie/2026-10-18_repaso_plataformas_mercado_v1.md))
- Revisión independiente: `05_scratch/ski2-288/revision_v1.md` ([GitHub](https://github.com/Skilland-ai/EPI-10/blob/master/05_scratch/ski2-288/revision_v1.md))
- Matriz de peticiones (esta tabla, en el repo): `04_outputs/modulos/crisis-healthie/2026-10-18_matriz_peticiones_tiers_v1.md`
- Issues: SKI2-288 · SKI2-289 (demo de Pabau, vie 23 a las 9:15) · SKI2-204
