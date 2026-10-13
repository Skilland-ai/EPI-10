# Spot «EPI10 · el recorrido en 2 minutos» — guion

SKI2-277 · 13 oct 2026 · para el artefacto que verá Carmen en la demo del 14 oct.

- **Duración:** 134 s.
- **Formato:** H.264, 1280×720 a 30 fps, voz en off en AAC.
- **Tono:** anuncio en presente que cuenta qué pasa y en qué pantalla. Salta entre entornos y cada escena lleva su faldón («NN · entorno» + rótulo).
- **Datos:** grabación real del recorrido completo con una clienta ficticia, Marta Spot Ficticia. Todos los datos son inventados.

| # | Entorno | Rótulo | Locución | Qué se ve |
|---|---|---|---|---|
| — | Tarjeta | **Así funciona EPI10** · Del pago al informe, en un solo recorrido | Así funciona EPI10: del pago al informe, en un solo recorrido. | Logo EPI10 sobre azul noche |
| 01 | Web NutriWell | **Compra en la web** | Todo empieza en la web de NutriWell. | Portada de la web y scroll hasta «Probar compra» |
| 02 | Stripe | **Pago seguro con Stripe** | La clienta paga con Stripe, en un entorno seguro. Pago confirmado. | Checkout de prueba relleno (4242…) y «Prueba completada» |
| 03 | Correo de la clienta | **Tu espacio, listo en segundos** | En segundos le llega el correo de bienvenida. Un botón, y ya está en su espacio. | Correo «Tu espacio EPI10 Salud ya está listo» → «Entrar en mi espacio» → bienvenida del portal |
| 04 | Portal de la clienta | **Tres pasos y ya está** | Tres pasos y ya está. Primero, su fecha de nacimiento y el consentimiento, firmado en pantalla. | Bienvenida, fecha de nacimiento, casillas y firma con el ratón |
| 05 | Portal de la clienta | **Cuestionario y test en casa** | Después, el cuestionario de hábitos y el test, que recibe en casa. Todo listo. | Cuestionario, «En casa» con la dirección y «Todo listo» |
| 06 | Portal de la clienta | **Su espacio la guía paso a paso** | Su espacio le enseña en qué paso está, y puede escribir al equipo cuando quiera. | Inicio «Tu espacio EPI10» con el stepper y Mensajes («Hola, acabo de registrarme») |
| 07 | Back office | **Aitor lo ve todo desde el back office** | Aitor lo ve todo desde el back office: los casos que le esperan y la ficha de cada clienta. | Inicio con «Casos que esperan a Aitor» y la ficha de Marta con la etapa y el siguiente paso |
| 08 | Back office | **Revisa y responde en un clic** | Revisa sus documentos y le responde con una plantilla. | Documentos → «Marcar como revisado» y Mensajes → plantilla «Bienvenida» |
| 09 | Odoo | **El kit se sigue en Odoo** | El kit se sigue en Odoo: test pedido, recibido, realizado, muestra en el laboratorio y entregable disponible. | Kanban «Casos EPI10», tarea de Marta, etapas y código de barras SPOT123 en la pestaña EPI10 |
| 10 | Portal de la clienta | **Cada avance, un aviso a la clienta** | Cada avance le llega a la clienta como un mensaje en su portal. | Mensajes «Tu caso está en marcha», «Tu test está listo», «Hemos enviado tu muestra» |
| 11 | Pantalla de informes | **El informe, en un clic** | Desde la ficha, Aitor prepara el informe: sube el entregable del laboratorio y obtiene un borrador seudonimizado. | Ficha → «Preparar el informe de Marta» (sin segundo login) → subida → borrador |
| 12 | Pantalla de informes | **Validado y publicado** | Lo revisa, lo valida y lo publica. | Informe final, confirmación y «Validar y publicar» → «Informe publicado» |
| 13 | Portal de la clienta | **Su informe, en su espacio** | Y la clienta ya tiene su informe en su espacio, listo para leer. | Inicio en el paso 5, «Mi informe» y el PDF abierto en el portal |
| 14 | Back office | **Entregado** | En el back office, el caso queda cerrado: informe entregado. | Ficha de Marta con la etapa «Informe entregado» |
| — | Tarjeta | **De la compra al informe, sin fricción** · EPI10 Salud · NutriWell | EPI10 Salud. De la compra al informe, sin fricción. | Logo y «Demostración con datos ficticios» |

## Notas de producción

- **Voz en off:** Piper (TTS local y sin conexión), voz `es_ES-sharvard-medium`, hablante femenina. Va instalada en un entorno virtual del scratchpad, nada en el sistema. Para que suene bien, la locución usa una grafía fonética que no cambia el texto: «Épi diez», «Estráip», «bak ófis», «Nutriuél», «Odú». No lleva música.
- **Rótulos:** Manrope, la tipografía del portal EPI10, en faldón azul noche (`#0B1B3D`) con acento cielo (`#4DA9D9`) y el logo EPI10 arriba a la derecha.
- **Ritmo:** los tramos lentos van de ×1,5 a ×8. Las esperas de Odoo (~70 s por etapa, mientras el monolito aplica el hito) están recortadas. Entre escenas hay fundidos de 0,45 s.
- **Privacidad:** el enlace mágico del correo no sale en pantalla. El texto con URL va difuminado y el vídeo no muestra la barra de direcciones. Las horas y los identificadores que aparecen son de la instancia de pruebas, y no hay datos reales.
