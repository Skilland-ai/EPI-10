# Correo oficial a Carmen (Tomás en copia) · 14 de octubre de 2026 · SKI2-286

Borrador para que lo envíe Raúl. Adjunto: el one-pager «Audentes fortuna iuvat» en PDF (SKI2-287).

**Para:** Carmen Sosa (EPI10 Salud)
**CC:** Tomás · Romina Ojeda (Skilland)
**Asunto:** EPI10 Salud · estado del proyecto, lo que ha cambiado y cómo seguimos (dossier el 21 de octubre)

---

Hola, Carmen:

Te escribo para dejar por escrito, negro sobre blanco, lo que hemos hablado hoy: dónde está el proyecto, qué ha pasado en los últimos días y qué vamos a hacer de aquí al miércoles 21. Pongo a Tomás en copia para que tenga la foto completa.

## 1. Dónde está el proyecto

El proyecto avanza cerca del 60 %. En concreto:

- El orquestador, la pieza central que conecta la compra, el caso y el equipo, está listo.
- El generador de borradores de informe está bastante avanzado.
- Las automatizaciones con Odoo están casi todas hechas.
- Las automatizaciones con Healthie estaban también casi todas hechas.

## 2. Qué pasó la semana pasada

A finales de la semana pasada se juntaron dos noticias que no dependen de nosotros ni de vosotros.

**La primera.** El jueves 8 nuestras automatizaciones con Healthie empezaron a fallar. Escribimos a Healthie y ahí descubrimos que han cambiado las reglas del juego a mitad del proyecto: la API con la que trabajábamos, incluida en vuestro plan cuando la probamos en verano, ha pasado a ser un complemento de pago aparte, con un coste que sube cada año, o bien exige saltar al plan Enterprise. Con esas condiciones, Healthie deja de ser una base razonable sobre la que construir.

**La segunda.** El proveedor de la web de EPI10 parece haberse caído del proyecto y os ha dejado sin esa pieza.

Cronología, para que quede clara: jueves 8 detectamos el fallo y escribimos a Healthie; viernes 9 confirmamos el cambio de condiciones; el lunes 12 era festivo; el martes 13 nos reconectamos y analizamos opciones; hoy, miércoles 14, lo hemos alineado contigo.

## 3. Qué vamos a hacer esta semana

Hemos acordado contigo parar el roadmap tal y como lo teníamos y dedicar las horas de esta semana del proyecto a una investigación en profundidad. Es un reto que cualquier otro proveedor se tomaría con más calma. Nosotros lo asumimos como parte de nuestra forma de trabajar: tomar el toro por los cuernos y convertir una jugarreta de dos proveedores en una oportunidad para que EPI10 dependa menos de terceros.

Dos líneas de trabajo:

**Línea 1 · La pieza del portal de cliente.** Healthie era la mejor opción que habíamos encontrado; si ya no sirve, hay que sustituirla. Estudiaremos dos caminos y los pondremos en números:

- (a) Otra plataforma del mercado. Investigación a fondo de las alternativas, con sus condiciones y sus límites.
- (b) Desarrollo propio, sobre una base de software libre, de forma que la pieza sea de EPI10.

En ambos casos haremos el ejercicio de qué parte absorbe el presupuesto ya comprometido, qué parte no, y qué supone cada opción para el calendario.

**Línea 2 · La web.** Aprovechando que hay que rehacer la web y que el portal puede ser propio, planteamos un sistema integrado: web, portal de cliente y herramientas del equipo con la misma interfaz y la misma imagen de marca, sin saltos bruscos entre una pieza y otra. También lo pondremos en números.

## 4. Cómo seguimos

- **Miércoles 21 de octubre:** os enviamos un dossier en profundidad con las opciones, sus costes y sus plazos, para que lo podáis procesar internamente con calma.
- **Después:** buscamos una fecha para sentarnos todos, resolver dudas y decidir juntos cómo seguir.

Hasta entonces no hay ningún cronómetro encima: lo importante es decidir bien.

Gracias por la confianza y por la conversación de hoy. Cualquier duda, aquí estamos.

Un abrazo,

Raúl Artiles
Skilland

---

## Notas internas (no van en el correo)

- Cifras de Healthie para quien pregunte: la API pasó de estar incluida en el plan Group a ser un add-on de 475 → 950 → 1.900 $/mes, o plan Enterprise. No van en el correo para no abrir ese melón por escrito; están en el one-pager de forma cualitativa.
- No se menciona nada de lo construido sobre OpenEMR, ni demos, ni vídeo. Se presenta como «investigación de esta semana».
- El tramo pagado (primer pago, 2.500 €: orquestador y automatizaciones) se mantiene; lo que se sustituye es la pieza de Healthie, que era el resto del presupuesto del proyecto A.
- Tomás: no tenemos su apellido ni su correo en el repo; los pone Raúl.
