# Portal de clientes de EPI10 · propuesta v0.2

17 de noviembre de 2026 · Skilland para EPI10 Salud · CON-578 · documento interno, base del workshop de diciembre

Cómo leerlo: la sección 1 basta para conocer la propuesta. La maqueta se abre con doble clic en `maqueta/index.html`, que tiene el índice de pantallas y el recorrido guiado. Las capturas para el dosier están en `capturas/`.

---

## 1. En una página

**Qué es la v0.2.** El portal de la v0.1 servía para comprar, firmar, esperar y descargar un informe. La v0.2 lo convierte en el sitio donde se cumple el plan. Es lo que pide la estrategia (CON-577, §1): «un plan personal que se cumple». La pantalla principal deja de ser «Tu espacio» y pasa a ser **Mi plan**.

**Lo nuevo, por orden de importancia:**

1. **Mi plan.** Recuento de áreas, tres prioridades, la semana de hábitos con semáforo, la suplementación (tomar, mantener, revisar y dejar) con recompra y la próxima revisión.
2. **Revisión mensual.** Son seis preguntas con pulsador. Al terminar, los semáforos cambian y se decide la suplementación del mes siguiente. Lo que baja avisa al equipo.
3. **Mi informe en versión visual.** El resumen va delante: rueda, prioridades, «lo que traes y lo que haces», mapa del cuerpo y complementación. El PDF se descarga abajo y lo sensible lleva candado.
4. **Puerta B.** Chatbot en la web sobre el cuestionario multifórmula de Aitor, más una cuenta gratuita que resulta útil y no se ve vacía.
5. **Puerta C.** Un formulario «Ya tengo mi test», con subida de archivo y atención a mano.
6. **Espera del informe** con hábitos y «qué vas a descubrir».
7. **Consentimiento para investigación.** Va aparte del consentimiento del servicio, por finalidades y con registro de exportaciones.
8. **Back office**, con dos cambios mínimos. En «Hoy», un bloque de planes: alertas, revisiones, recompras y la métrica principal. En la ficha, una pestaña nueva, «Plan».

**Lo que se mantiene.** Compra con Stripe, alta, onboarding guiado (consentimiento, cuestionario y «Tu test»), kit, mensajes, citas, documentos y visor de PDF. Todo eso ya está construido sobre OpenEMR y no se toca.

**Un solo sistema visual con el informe** (CON-582). La maqueta usa los mismos tokens, iconos, rueda, mapa genética × hábitos, mapa del cuerpo, semáforo y escala neutra que la skill `epi10-informe-visual`. El plan llega del informe como datos, no como texto.

**Lo que bloquea la recompra.** No tenemos el catálogo de EPI10. Las seis fórmulas aparecen con sus nombres reales, pero su ficha, dosis, precio y canal de venta son de ejemplo y van marcados así.

---

## 2. Qué cambia respecto a la v0.1 y por qué

| Pantalla | v0.1 | v0.2 | Por qué |
|---|---|---|---|
| Inicio tras el informe | «Tu espacio»: stepper en el paso 5 y tres tarjetas | **Mi plan** (nuevo) | Estrategia §1.3 y §8: la v1 es «Mi plan». Investigación, idea 1: resumen primero (P6) |
| Navegación | Cabecera con logo y menú de usuario | Barra con Mi plan, Hábitos, Suplementación, Mi informe y Mensajes. En el móvil, pestañas inferiores. Citas y Documentos pasan al menú (cambia) | Móvil primero (para los siguientes agentes, criterios). La clienta vuelve a tres sitios, no a cinco |
| Prioridades | No existían | Tres tarjetas con origen (genética o hábitos), qué hacer, con qué te ayudamos y cuándo se revisa. Mapa genética × hábitos (nuevo) | Informe CON-582, componentes 3 y 6. «Al menos una prioridad se resuelve sin producto» (recomendaciones §3b) |
| Hábitos | No existían | Rejilla semanal con sí, no y saltar. «7 de 8» y «tu mes: 78 %», sin rachas. Tira de evolución, ritmo de 1, 3 o 5 hábitos y pausa del plan (nuevo) | P11, P15 y P16. Evitar rachas y registro diario (investigación §4) |
| Suplementación | No existía | Tarjetas tomar, mantener, revisar y dejar con el mismo peso. «Te lo recomendamos porque», chips de origen, evidencia en texto y declaración literal. «No lo vendemos» con la misma tarjeta. Recompra cuando quedan unos días, «Ajustar» con cuatro salidas y «dónde comprarlo» (nuevo) | P22 a P25. Regla de marca «recomendamos también lo que no vendemos» (estrategia §5). La recompra cae entre el segundo y el tercer pedido (§6) |
| Revisión mensual | No existía | Seis preguntas, de ellas cuatro áreas, la fórmula y la seguridad. Ruedas antes → ahora, «sigue así» y «merece una mirada», suplementación del mes siguiente y foco (nuevo) | P17 a P21. Es el motivo para volver y la pieza clave del banco de datos (estrategia §9) |
| Mi informe | Banda «Informe listo» y lista con un PDF | Resumen visual con rueda tocable, recuento, prioridades, «lo que traes y lo que haces», mapa del cuerpo estático, línea de tiempo, capa 2 plegada y lo sensible con «Sí, quiero verlo». El PDF se mantiene abajo (cambia) | CON-582: dos capas y salida doble. P12 para lo sensible. Canon §9 y §13.6 |
| Espera | Stepper en el paso 4 y tres tarjetas | Lo mismo, más dos hábitos activos, rueda gris «en camino» y tres tarjetas de «qué vas a descubrir» (cambia) | Recomendaciones §3, punto 9: el portal no puede estar vacío durante semanas |
| Puerta B | No existía | Chatbot en la web y cuenta gratuita (nuevo) | Estrategia §4: B es la entrada gratuita. P1 a P5 |
| Puerta C | No existía | Formulario «Ya tengo mi test», solo para TellmeGen (nuevo) | Estrategia §4: C no se construye, se atiende |
| Datos y permisos | Consentimiento único del servicio | Consentimiento de investigación aparte: cuatro finalidades, todas desactivadas por defecto, registro de exportaciones y descarga JSON o CSV (nuevo) | Estrategia §9. Datos estructurados y exportables |
| Back office · Hoy | Tarjetas y «Casos que esperan al equipo» | Tarjeta «Planes», cifras con la métrica principal y una lista filtrable: semáforos que bajan, revisiones pendientes, recompras, puerta C y planes por publicar (cambia) | Estrategia §7: segunda compra en 90 días. Recomendaciones §3, punto 10 |
| Back office · Ficha | Pestañas Resumen, Documentos, Mensajes, Citas y Datos | Pestaña **Plan**: alerta con acciones, ruedas antes → ahora, tabla de áreas y hábitos, prioridades con «Editar plan», suplementación y compras, revisiones e investigación. Sexto tramo «Plan · mes 1» (cambia) | El equipo ve lo mismo que la clienta. No se rediseña el resto |

---

## 3. Mapa de pantallas

```
WEB DE EPI10
├── chatbot.html ··············· Puerta B: conversación → 3 semáforos → fórmula orientativa → correo
│     └── gratuita.html ········ Cuenta gratuita: semáforos, 2 hábitos, fórmula, invitación al informe
└── ya-tengo-mi-test.html ······ Puerta C: solicitud con subida (TellmeGen), atención a mano

PORTAL · PUERTA A
├── se-mantiene.html ··········· Compra, consentimiento, cuestionario, kit, mensajes, citas, documentos, visor (v0.1)
├── espera.html ················ Espera del informe: stepper + hábitos + «qué vas a descubrir»
├── mi-informe.html ············ Informe visual + PDF + capa 2 + sensible con candado
└── mi-plan.html ··············· MI PLAN (inicio tras el informe)
      ├── prioridades.html ····· Las tres prioridades y el mapa genética × hábitos
      ├── habitos.html ········· Rejilla semanal, semáforo y evolución por hábito, ritmo y pausa
      ├── suplementacion.html ·· Tomar · mantener · revisar · dejar, pedido, ajustar, catálogo
      ├── revision.html ········ Revisión mensual: preguntas → resultado
      └── investigacion.html ··· Tus datos y permisos (consentimiento de investigación)

BACK OFFICE
├── equipo-hoy.html ············ Hoy + bloque «Planes» (alertas, revisiones, recompras, métrica)
└── equipo-ficha.html ·········· Ficha de la clienta, pestaña «Plan»
```

**Recorrido del workshop** (14 pasos, barra oscura con «anterior · índice · siguiente» y nota por pantalla): chatbot, cuenta gratuita, lo que se mantiene, espera, informe, Mi plan, prioridades, hábitos, suplementación, revisión, investigación, puerta C, equipo «Hoy» y ficha. El chatbot y la revisión tienen un atajo, «Responder como Marta», para enseñarlos en pocos segundos.

**Interactivo en la maqueta:**
- el chatbot completo, con la puntuación y las reglas de seguridad del cuestionario;
- las celdas de hábitos;
- la rueda y la lista de áreas;
- la revisión, que recalcula los semáforos;
- el pedido, «Ajustar» y «dónde comprarlo»;
- los permisos de investigación;
- «Sí, quiero verlo»;
- la subida de la puerta C;
- los filtros del back office y «Editar plan».

---

## 4. Decisiones de diseño y supuestos

| # | Decisión o supuesto | Por qué | Se valida en |
|---|---|---|---|
| 1 | Clienta **Marta Gil Prieto**, ficticia, de la demo. Fecha de la maqueta: jueves 3 de diciembre, semana 4 del plan | El brief lo pide. Así una sola historia une las tres puertas | — |
| 2 | **Palabras del semáforo: «Vas bien · Mejorable · Prioridad · Sin datos todavía»**, las del informe de CON-582 | Portal e informe deben decir lo mismo. La investigación proponía «En marcha · A mejorar» | Workshop (P3) |
| 3 | **Cuatro estados de suplementación: tomar (cian), mantener (verde), revisar (ámbar) y dejar (rojo)** | La estrategia habla de tres. El informe de Aitor usa «revisar» y lo necesita (magnesio, melatonina). El cian es el «añadir» del informe | Workshop |
| 4 | Rojo apagado del informe (`#d6453d`), siempre con palabra | Recomendaciones, decisión 2. Nunca un color solo | Workshop |
| 5 | **Catálogo de ejemplo.** Seis fórmulas con nombre y foco del cuestionario multifórmula. Composición, dosis, precio (24,90 € a 30 días), declaración y canal: marcados «ejemplo» o «por confirmar» | Catálogo pedido al cliente. No inventamos composición ni declaraciones de salud | Catálogo real de EPI10 |
| 6 | El plan de Marta: prioridades en descanso, estrés y movimiento. Nocticum en «tomar»; omega-3, magnesio y melatonina sin vender. El quemagrasas con cafeína en «dejar» | Hace visible la regla «recomendamos también lo que no vendemos» y el «te sobra» del informe I. Dos de las tres prioridades no tienen producto | Aitor |
| 7 | **Chatbot.** Preguntas, puntuación, bloques de afinado, umbrales y reglas de seguridad del cuestionario multifórmula **tal cual**. Los tres **semáforos son una regla propuesta por Skilland**, porque el cuestionario no los define | Se usan las reglas de Aitor sin tocarlas. La regla del semáforo se explica en la propia pantalla | Aitor |
| 8 | El chatbot dice que es una IA y que no diagnostica. El correo se pide **después** del resultado, con la casilla de privacidad sin marcar | Estrategia §9 (Reglamento de IA). P5 | Asesor legal |
| 9 | **Recompra manual** con aviso «te quedan unos 6 días». «Recibirlo cada mes» es opcional, está desmarcado y lleva aviso 15 días antes de cada cobro | Recomendaciones, decisión 4. Ley 10/2025, citada en la investigación | Workshop |
| 10 | «Ajustar» antes que la baja: cambiar, espaciar, saltar o dejar, con el mismo peso y sin descuento | P25. Recharge: el cambio retiene mucho más que el descuento | Workshop |
| 11 | La revisión compara con su propio punto de partida, nunca con otras personas. Lo que baja lleva una acción, un plazo y dos salidas | P17 a P21. Recomendaciones §5: sin comparaciones con otros usuarios | — |
| 12 | Mapa del cuerpo **estático**, en escala neutra, y solo en Mi informe. Sin cuerpo como menú | La estrategia congela el cuerpo interactivo. La investigación lo desaconseja como navegación. Responde a «imágenes del cuerpo» sin coste | Workshop |
| 13 | Los resultados sensibles, ocultos por defecto: «Sí, quiero verlo», aviso previo y «Mejor en mi sesión» | Canon §9. P12. Comentario de Aitor sobre ver o no lo sensible | Carmen y asesor |
| 14 | Consentimiento de investigación con cuatro finalidades. «Guardar resultados genéticos estructurados» aparece marcado como **cambio de arquitectura** | Hoy los resultados de TellmeGen se procesan y se borran (propuesta del 27 oct) | Workshop (estrategia, pregunta 17) |
| 15 | En el portal no se nombra a personas reales del equipo de EPI10: se dice «Tu profesional de EPI10» | Regla de datos ficticios | — |
| 16 | Cifras del back office (41 %, 18 planes, 64 cuentas): de ejemplo | Enseñan dónde se ve la métrica principal | — |

---

## 5. Qué se construye sobre OpenEMR y qué hay que desarrollar

Punto de partida: `epi10-oe-module` en `main` (dos módulos, `oe-module-epi10` con el contrato y `oe-module-epi10-ui` con la interfaz) y el monolito `epi10-orquestador`. Solo lectura en este trabajo.

### Se reutiliza tal cual

| Pieza | Dónde está hoy |
|---|---|
| Acceso, primer acceso, onboarding guiado (consentimiento, cuestionario, «Tu test», envío del kit) | `oe-module-epi10-ui/src/Onboarding`, `Tareas`; contrato `crear_acceso` y `asignar_formularios` |
| Mensajes con plantillas del equipo | `src/Chat`, `Backoffice/Plantillas.php` (tabla `epi10_plantillas_mensaje`) |
| Citas de la clienta y calendario del equipo | `src/Citas`, `Backoffice/CalendarioEquipo.php` |
| Documentos, visor PDF y publicación del informe | `src/Biblioteca`, `public/ui/islas/visor-pdf.mjs`; contrato `publicar_informe` |
| Base de interfaz: tokens, Manrope, CSS `epi-`, islas Preact sin build, stepper | `oe-module-epi10-ui/public/ui` |
| Ficha del back office con pestañas y fases del caso | `Backoffice/Ficha.php`, `FaseCaso.php`; contrato `actualizar_caso` |
| Compra con Stripe, Odoo y avisos | Monolito |

### Hay que desarrollar

Tamaño relativo: P (pequeño), M (mediano) o G (grande). Las horas van en el presupuesto nuevo tras el workshop.

| Pieza | Qué es | Dónde | Tamaño |
|---|---|---|---|
| **Modelo del plan** | Tablas propias `epi10_plan`, `epi10_plan_prioridad`, `epi10_plan_habito`, `epi10_plan_suplemento`, `epi10_habito_marca`, `epi10_revision` y `epi10_revision_respuesta`. Mismo patrón que las `epi10_*` actuales: sin tocar el núcleo, con un `pid` y datos codificados | `oe-module-epi10-ui` (o un módulo nuevo `oe-module-epi10-plan`) | M |
| **Del informe al plan** | El JSON de la skill del informe (`areas`, `prioridades`, `habitos`, `complementos`) se publica junto al PDF. Operación nueva del contrato (v1.3): `publicar_plan` | Contrato + monolito + skill CON-582 | M |
| **Vistas de la clienta** | Mi plan, prioridades, hábitos, suplementación, revisión, informe visual y datos y permisos. Twig con islas para la rejilla, la rueda (SVG, como en `render.py`) y la revisión | `oe-module-epi10-ui/templates/epi10/paginas`, `public/ui/islas` | G |
| **Revisión mensual** | Cálculo del semáforo por área según la regla que firme Aitor, alertas al equipo y programación (unos 10 días antes de que se acabe el bote). Alternativa: el cuestionario FHIR del portal (ya se usa para hábitos), aunque la experiencia con pulsadores pide una isla propia | Módulo + monolito (programación y correo) | M |
| **Pedido y recompra de fórmulas** | Productos y precios en Odoo, cobro con Stripe (ya está para el test), aviso «te quedan X días» y «Ajustar». La suscripción, si se aprueba, aparte | Monolito + Odoo + vista | M (G con suscripción) |
| **Back office: bloque Planes y pestaña Plan** | Consultas sobre las tablas del plan, lista filtrable, «Editar plan» con aviso a la clienta y métrica de segunda compra en 90 días | `Backoffice/Aterrizaje.php`, `Ficha.php` | M |
| **Cuenta gratuita (B)** | Alta sin compra (`crear_acceso` con tipo «gratuita»), portal reducido y paso a A sin perder respuestas | Contrato + monolito + vistas | M |
| **Chatbot de la web (B)** | Conversación con reglas en la web nueva, no en OpenEMR. El lenguaje puede ser de IA; la puntuación y la seguridad, deterministas. Entrega el resultado al monolito, que crea la cuenta | Web nueva + monolito | M–G |
| **Puerta C** | Formulario con subida a una cola del back office. Sin automatizar | Web o portal + back office | P |
| **Consentimiento de investigación y exportación** | Tabla de permisos por finalidad con histórico, vista de exportación seudonimizada (CSV o JSON con diccionario) y registro de cada exportación | Módulo + monolito | M |
| **Avisos** | Correo semanal, recordatorio de revisión y de recompra. WhatsApp, si se decide | Monolito | P–M |

**Riesgos técnicos:**
- El núcleo de OpenEMR no sabe nada de planes. Todo vive en tablas propias, y eso obliga a mantenerlas en cada actualización.
- Guardar resultados genéticos estructurados cambia la arquitectura de datos de la fase 1 y la EIPD.
- El chatbot fuera del portal depende del alcance de la web nueva.

---

## 6. Preguntas para el workshop

**Las que bloquean**

1. **¿Dónde y cómo se venden hoy las seis fórmulas?** Online, farmacia o ambos. Sin esto, «Pedir de nuevo» no tiene destino. Catálogo, precio, composición y declaraciones autorizadas de cada una.
2. ¿Las fórmulas se venden **desde el portal** con Stripe? ¿Recompra manual o suscripción en la v1?
3. ¿Aitor firma las **reglas del semáforo**: del cuestionario del chatbot, de la revisión mensual y de cada hábito?

**Sobre lo que se ve**

4. Palabras del semáforo: ¿«Vas bien · Mejorable · Prioridad», como el informe, o «En marcha · A mejorar · Prioridad»? ¿Rojo puro o apagado?
5. ¿Cuatro estados de suplementación (tomar, mantener, revisar y dejar) o tres?
6. ¿Áreas de la rueda: nutrición, movimiento, descanso, estrés y energía, y complementación?
7. ¿Cuántos hábitos el primer mes: dos, tres o lo que elija la clienta?
8. ¿Qué incluye la cuenta gratuita? ¿La fórmula orientativa se puede comprar sin informe?
9. ¿El mapa del cuerpo estático basta como respuesta a «imágenes del cuerpo humano»?

**Sobre el servicio**

10. ¿Quién revisa las alertas («un semáforo ha bajado») y en qué plazo contesta?
11. ¿Hay revisión a seis meses con sesión? ¿Se cobra?
12. ¿Canal de avisos: correo, WhatsApp o ambos?
13. Puerta C: ¿precio del plan sin kit y plazo de respuesta?

**Datos y legal**

14. ¿Se guardan los resultados genéticos estructurados de quien consienta? (Cambio de arquitectura.)
15. ¿Quién valida los textos del consentimiento de investigación, del chatbot y de la suscripción?
16. ¿Qué resultados sensibles entran en el portal, y solo con «Sí, quiero verlo»?

---

## 7. Lo que falta (Unknown)

- Catálogo real: composición, dosis, precios, declaraciones autorizadas y canal de venta de las seis fórmulas.
- Plazo real del informe tras el laboratorio. Precio del plan sin kit (C). Precio del test (399 € según el brochure, por confirmar).
- Reglas firmadas por Aitor: semáforo por área y por hábito, indicadores de la revisión y estados de suplementación.
- Textos legales: consentimiento de investigación, aviso de IA, condiciones de suscripción y declaraciones de salud.
- Si existe hoy alguna relación entre el magnesio o la melatonina y la composición de Nocticum. En la maqueta es solo un ejemplo de «revisar».

## 8. Cómo verla y regenerarla

- **Ver:** doble clic en `maqueta/index.html`. Funciona sin conexión: fuentes, iconos y datos van en `maqueta/assets/`. Los datos de ejemplo están en `assets/datos.js`, con la misma forma que el JSON del informe.
- **Capturas:** `node herramientas/capturar.cjs [pagina.html]`. Usa Chromium sin interfaz sobre los ficheros locales, sin servidor. Genera 19 vistas en escritorio (1440 px) y en móvil (390 px a 2×). Cada una es una página completa y avisa si algo se desborda a lo ancho. La última pasada no dio desbordes ni errores de JavaScript.
- **Fuentes:**
  - estrategia: `../01_estrategia/estrategia_app_epi10_v1.md` y `para_los_siguientes_agentes.md`;
  - investigación: `../02_investigacion-apps/recomendaciones_portal_e_informe.md` (patrones P1 a P25);
  - sistema visual: `../03_informe/skill/` (tokens, iconos y la geometría de la rueda, el mapa y el cuerpo);
  - v0.1: `../../entrega-epi10-2026-10-27/05_propuesta-portal-propio/`;
  - cuestionario: `DOCUMENTOS-AITOR-GENERADOR-BORRADORES-INFORMES/Cuestionarios/Cuestionario_EPI10_recomendacion_multiformula.pdf`.
- No se ha tocado `epi10-oe-module`, ningún despliegue, Linear ni el cliente.
