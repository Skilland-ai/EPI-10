# What is this repo about.md

# EPI10 Salud — Research, PRD y propuesta de implantación MVP operativo

## 1. Resumen ejecutivo

Este repo existe para preparar, de forma interna y ordenada, la respuesta técnica/comercial a la petición de EPI10 Salud.

La clienta ha pedido una propuesta sencilla, práctica y ejecutable para poner en marcha una primera fase operativa de EPI10 Salud, apoyándose en herramientas ya existentes del mercado, evitando construir una plataforma completa desde cero.

La necesidad principal no es todavía desarrollar el “gemelo digital” avanzado de EPI10, sino diseñar e implantar un sistema operativo inicial que permita gestionar clientes, consentimientos, cuestionarios, resultados genéticos, seguimiento, comunicación, documentación e integración con herramientas internas.

Este repo debe servir para:

1. Entender bien el problema.
2. Investigar herramientas viables.
3. Comparar opciones.
4. Definir un PRD del MVP operativo.
5. Diseñar una arquitectura inicial.
6. Estimar esfuerzo, costes, riesgos y dependencias.
7. Preparar una propuesta comercial/presupuesto defendible.

## 2. Principio clave: la Fase 0 es interna y de preventa

La Fase 0 NO se vende al cliente.

La Fase 0 es trabajo interno de preventa.

Sirve para hacer research, entender viabilidad, revisar herramientas, identificar riesgos y poder presentar después un presupuesto serio.

No debemos plantear al cliente: “te cobramos por investigar”.

El enfoque correcto es:

> Hacemos internamente una fase de análisis y research para poder presentarles una propuesta de implantación clara, realista y presupuestada.

La venta al cliente empezará realmente con la futura Fase 1: implantación del MVP operativo.

## 3. Contexto del cliente

Cliente: EPI10 Salud.

EPI10 Salud está construyendo una línea de negocio relacionada con salud, genética, suplementación/nutracéuticos y posible evolución hacia un modelo de “gemelo digital” basado en datos genéticos, hábitos, analíticas y seguimiento personalizado.

En esta fase inicial, el cliente quiere algo mucho más aterrizado:

- Empezar a operar cuanto antes.
- No desarrollar todo desde cero.
- Utilizar herramientas existentes.
- Integrar sistemas.
- Mantener el alcance acotado.
- Asegurar una operación ordenada.
- Trabajar con datos sensibles de forma segura.
- Tener infraestructura alojada en España o la Unión Europea.
- Prever costes reales de licencias, soporte, integración y mantenimiento.

## 4. Petición recibida del cliente

La clienta ha indicado que quieren apoyarse en:

1. Su web actual o web en desarrollo.
2. Odoo open source como herramienta interna de gestión.
3. La plataforma de resultados de test genéticos de su laboratorio proveedor.
4. La API de TellmeGen, si efectivamente está disponible y permite integración.
5. Herramientas tipo Healthie o Continuous Care para cubrir parte del flujo operativo con el cliente.

Necesitan cubrir, como mínimo:

- Portal de cliente.
- Formularios.
- Consentimientos.
- Cuestionarios.
- Seguimiento.
- Comunicación segura.
- Entrega de documentación o informes.
- Sincronización con Odoo.
- Integración con resultados genéticos.
- Automatizaciones semiautomáticas.
- Desarrollos mínimos necesarios.
- Seguridad e infraestructura en España/UE.
- Costes de licencias, integración, soporte y mantenimiento.

## 5. Interpretación estratégica

EPI10 no está pidiendo ahora una gran plataforma propia.

Está pidiendo una primera solución operativa, segura y realista.

El flujo conceptual sería:

Web actual / nueva web
→ entrada o captación del cliente
→ portal cliente / formularios / consentimientos / cuestionarios
→ gestión interna en Odoo
→ conexión con resultados genéticos de TellmeGen
→ revisión interna
→ entrega de informes/documentación
→ comunicación y seguimiento del cliente.

La clave del proyecto es diseñar el sistema operativo inicial de EPI10 Salud.

No vender humo.

No prometer un desarrollo gigante.

No construir desde cero si existen herramientas que cubren el 70-80% del flujo.

No asumir que Healthie, Continuous Care, Odoo o TellmeGen sirven sin validar APIs, costes, privacidad, hosting y límites funcionales.

## 6. Objetivo del repo

El objetivo de este repo es producir los materiales internos necesarios para llegar a una propuesta/presupuesto de implantación.

Outputs principales esperados:

1. Research de herramientas.
2. Matriz comparativa build vs buy.
3. Mapa funcional del flujo EPI10.
4. PRD del MVP operativo.
5. Arquitectura técnica recomendada.
6. Estimación de esfuerzo.
7. Estimación de costes externos.
8. Riesgos, dependencias y preguntas abiertas.
9. Propuesta comercial de Fase 1.
10. Posible roadmap Fase 2 / Fase 3.

## 7. Cómo trabajar este repo

Este repo se trabajará como un agentic repo harness.

El trabajo se coejecutará entre:

- ChatGPT: criterio estratégico, PRD, estructura comercial, priorización, redacción y síntesis.
- Codex/Claude Code en terminal: research técnico, lectura de documentación, comparación de herramientas, APIs, posibles prototipos, estructura de outputs.
- Raúl: validación de negocio, decisión comercial, criterio de qué se promete y qué no.

Idioma de trabajo: español.

Tono de outputs: claro, ejecutivo, práctico, sin verborrea.

## 8. Estructura esperada del repo

Usar la estructura habitual del scaffold.

### 00_inbox/

Materia prima sin procesar.

Meter aquí:

- Email de la clienta.
- Notas de reuniones.
- Capturas.
- Links de Healthie.
- Links de Continuous Care.
- Información sobre TellmeGen.
- Información sobre Odoo actual.
- Flujos que comparta EPI10.
- Documentación técnica o comercial.
- Cualquier material bruto.

### 01_harness/

Instrucciones de trabajo del repo.

No tocar salvo que haga falta adaptar algún workflow.

### 02_context/

Contexto refinado.

Aquí deben acabar documentos como:

- `client_context.md`
- `business_context.md`
- `technical_context.md`
- `tooling_context.md`
- `constraints_and_assumptions.md`
- `open_questions.md`

### 03_specs/

Especificaciones vivas.

Especialmente:

- `03_specs/now/001_now.md`
- `03_specs/now/prd_mvp_operativo.md`
- `03_specs/now/architecture_spec.md`
- `03_specs/now/research_plan.md`

Solo debe haber una spec activa principal en `03_specs/now/`.

### 04_outputs/

Entregables finales o semi-finales.

Aquí deben acabar:

- Research final.
- Matriz comparativa.
- PRD final.
- Arquitectura recomendada.
- Estimación.
- Propuesta comercial.
- Email de respuesta a cliente.
- Brief para presupuesto.

### 05_scratch/

Notas, experimentos, pruebas, borradores sucios.

Usar para exploración libre sin contaminar outputs.

### runners/

Scripts, notebooks o utilidades si se necesitan.

Puede incluir:

- Scrapers simples.
- Scripts de comparación.
- Tests de APIs.
- Prototipos de integración.
- Pruebas con Odoo.
- Pruebas con n8n.
- Pruebas con endpoints mock.

### shared/

Prompts, plantillas, skills o instrucciones reutilizables.

## 9. Fases internas de trabajo

## Paso 1 — Research técnico-comercial de herramientas

Objetivo: entender qué herramientas existentes pueden cubrir el flujo de EPI10.

Investigar como mínimo:

### Healthie

Preguntas clave:

- ¿Sirve para mercado europeo?
- ¿Permite hosting o tratamiento de datos compatible con GDPR?
- ¿Está demasiado orientado a EEUU/HIPAA?
- ¿Tiene API?
- ¿Tiene portal cliente?
- ¿Tiene formularios?
- ¿Tiene consentimientos?
- ¿Tiene cuestionarios?
- ¿Tiene mensajería segura?
- ¿Permite entrega de documentos/informes?
- ¿Permite integraciones con terceros?
- ¿Qué costes tiene?
- ¿Qué limitaciones tiene?
- ¿Es viable para una empresa española que trabaja con datos de salud/genéticos?

### Continuous Care

Preguntas clave:

- ¿Qué funcionalidades cubre?
- ¿Tiene portal de paciente/cliente?
- ¿Tiene formularios y consentimientos?
- ¿Tiene comunicación segura?
- ¿Tiene API?
- ¿Dónde aloja los datos?
- ¿Cumple con GDPR?
- ¿Tiene costes públicos o hay que pedir demo?
- ¿Es viable para el caso EPI10?
- ¿Es más clínica/hospitalaria o adaptable a negocio wellness/genética/nutracéuticos?

### Alternativas

Buscar alternativas europeas o más viables si Healthie/Continuous Care no encajan.

Posibles categorías:

- Patient portal.
- Practice management.
- Digital health platform.
- Secure forms and consent management.
- Client portal GDPR healthcare.
- Odoo healthcare modules.
- Odoo + portal propio mínimo.
- N8n + Odoo + herramienta de formularios segura.
- Plataformas de telemedicina/seguimiento con API.

No asumir que las primeras dos opciones son las mejores.

### Odoo open source

Investigar rol posible de Odoo:

- CRM.
- Contactos/clientes.
- Pipeline de servicio.
- Pedidos.
- Facturación.
- Tareas internas.
- Estados del servicio.
- Documentos.
- Automatizaciones.
- Portal.
- Módulos existentes de salud si los hubiera.
- Posibilidades de integración vía API.
- Hosting seguro.
- Backups.
- Permisos y roles.

Preguntas clave:

- ¿Odoo debe ser el sistema central?
- ¿Odoo debe ser solo backoffice?
- ¿El portal cliente debe vivir fuera de Odoo?
- ¿Cuánto desarrollo requiere adaptar Odoo?
- ¿Qué módulos open source conviene revisar?

### TellmeGen

Preguntas clave:

- ¿Existe API real disponible para distribuidores?
- ¿Qué documentación técnica hay?
- ¿Qué endpoints existen?
- ¿Qué autenticación usa?
- ¿Qué datos devuelve?
- ¿Qué formato de resultados entrega?
- ¿Puede integrarse con Odoo?
- ¿Puede integrarse con portal cliente?
- ¿Existen restricciones legales o contractuales?
- ¿Qué datos pueden almacenarse fuera de TellmeGen?
- ¿Se deben mostrar resultados completos o solo usarlos como input operativo?

### Infraestructura

Investigar opciones:

- VPS en España/UE.
- Hosting gestionado.
- Odoo self-hosted.
- PostgreSQL gestionado o self-hosted.
- Backups.
- Cifrado.
- Control de accesos.
- Logs.
- Separación de entornos.
- Cumplimiento básico para datos sensibles.
- Posible uso de proveedor europeo.

## Paso 2 — Definir PRD del MVP operativo

Objetivo: convertir la necesidad en requisitos funcionales y técnicos.

El PRD debe responder:

- Qué problema resolvemos.
- Para quién.
- Qué flujo mínimo debe funcionar.
- Qué roles existen.
- Qué datos se recogen.
- Qué datos se sincronizan.
- Qué herramienta gestiona cada parte.
- Qué se automatiza.
- Qué queda manual o semiautomático.
- Qué integraciones son imprescindibles.
- Qué desarrollos mínimos hacen falta.
- Qué queda fuera del MVP.

Roles posibles:

- Cliente/paciente.
- Equipo EPI10.
- Administrador.
- Laboratorio/proveedor.
- Sistema Odoo.
- Sistema portal cliente.
- Sistema TellmeGen.
- Web pública.

Flujo posible:

1. Usuario llega desde web.
2. Usuario solicita información o compra/contrata servicio.
3. Se crea o actualiza contacto en Odoo.
4. Se inicia onboarding.
5. Cliente completa formularios.
6. Cliente acepta consentimientos.
7. Cliente completa cuestionarios.
8. Equipo EPI10 revisa datos.
9. Se asocia test genético o resultado de TellmeGen.
10. Se genera o entrega documentación/informe.
11. Se realiza seguimiento.
12. Se actualiza estado del servicio en Odoo.
13. Se mantienen comunicaciones y trazabilidad.

## Paso 3 — Diseñar arquitectura MVP

Objetivo: decidir cómo se conectan las piezas.

Arquitectura conceptual a validar:

Web EPI10
→ formulario/landing/contacto
→ portal cliente o herramienta sanitaria
→ Odoo como backoffice
→ TellmeGen como proveedor de resultados
→ middleware/automatizaciones
→ equipo EPI10.

Opciones de arquitectura a comparar:

### Opción A — Healthie/Continuous Care como portal principal + Odoo backoffice

Ventajas:

- Rápido si la herramienta encaja.
- Menos desarrollo propio.
- Portal, formularios y comunicación ya resueltos.

Riesgos:

- Costes.
- GDPR.
- Hosting fuera de UE.
- API limitada.
- Vendor lock-in.
- Mala adaptación al caso español/europeo.

### Opción B — Odoo como núcleo + portal externo mínimo

Ventajas:

- Control.
- Menos dependencias.
- Odoo puede centralizar CRM/backoffice.
- Posibilidad de desarrollo gradual.

Riesgos:

- Más configuración/desarrollo.
- Portal cliente puede quedarse corto.
- Requiere más criterio técnico.

### Opción C — Odoo + n8n + formularios/portal seguro de terceros

Ventajas:

- Modular.
- Flexible.
- Coste potencialmente menor.
- Buen enfoque para MVP semiautomatizado.

Riesgos:

- Más piezas.
- Más responsabilidad técnica.
- Hay que cuidar seguridad y trazabilidad.

### Opción D — Desarrollo propio mínimo

Ventajas:

- Control total.
- Adaptación exacta al flujo.
- Evita herramientas que no encajan.

Riesgos:

- Más tiempo.
- Más coste.
- Más mantenimiento.
- Riesgo de construir demasiado pronto.

La recomendación debe salir del research, no de una intuición inicial.

## Paso 4 — Preparar presupuesto y propuesta comercial

Objetivo: transformar el research y PRD en propuesta vendible.

La propuesta comercial debe incluir:

- Diagnóstico breve.
- Enfoque recomendado.
- Alcance de Fase 1.
- Qué herramientas se usarán.
- Qué integraciones se harán.
- Qué queda manual/semiautomático.
- Qué desarrollos mínimos se incluyen.
- Qué costes externos debe prever EPI10.
- Qué coste tiene nuestro trabajo.
- Qué plazo estimado hay.
- Qué dependencias existen.
- Qué información necesitamos de ellos.
- Qué queda fuera de alcance.

No presupuestar antes de tener criterios mínimos.

## 10. Posible estructura comercial futura

No presentar todavía al cliente hasta terminar research.

Pero la estructura probable será:

### Fase 1 — Implantación MVP operativo

Incluye:

- Configuración de herramienta portal/formularios.
- Configuración/adaptación de Odoo.
- Integración básica web.
- Integración o semintegración con TellmeGen.
- Automatizaciones iniciales.
- Flujo operativo.
- Documentación interna.
- Formación al equipo.
- Soporte inicial.

### Fase 2 — Optimización y automatización avanzada

Incluye:

- Más automatizaciones.
- Mejor reporting.
- Mejor experiencia cliente.
- Integraciones más profundas.
- Dashboards.
- Analítica.
- Reducción de trabajo manual.

### Fase 3 — Producto digital / gemelo digital

Solo cuando haya operación real, datos, aprendizaje y validación.

No vender esta fase ahora como alcance principal.

## 11. Reglas de decisión

1. No construir desde cero si una herramienta existente resuelve bien el problema.
2. No depender de una herramienta si no cumple GDPR o no permite uso serio en Europa.
3. No asumir que HIPAA equivale a GDPR.
4. No meter datos genéticos en sistemas inseguros.
5. No presupuestar integraciones sin validar APIs.
6. No prometer automatización total desde el inicio.
7. Priorizar sistema operativo funcional frente a producto perfecto.
8. Mantener el MVP acotado.
9. Separar costes externos de trabajo propio.
10. Dejar claro qué queda manual o semiautomático.
11. Identificar dependencias del cliente antes de cerrar presupuesto.
12. Diseñar algo que pueda evolucionar hacia producto propio si EPI10 escala.

## 12. Preguntas abiertas críticas

Para EPI10:

- ¿Cuál es el flujo exacto del servicio desde captación hasta seguimiento?
- ¿Qué parte de la web está ya desarrollada?
- ¿Qué stack usa la web?
- ¿Qué Odoo tienen actualmente?
- ¿Está Odoo instalado, configurado o solo previsto?
- ¿Qué módulos de Odoo están usando?
- ¿Dónde está alojado Odoo?
- ¿Qué documentación tienen de la API de TellmeGen?
- ¿Qué datos concretos necesitan usar desde TellmeGen?
- ¿Se necesita mostrar resultados al cliente o solo usarlos internamente?
- ¿Qué documentos/informes se entregan al cliente?
- ¿Quién los genera?
- ¿Qué consentimiento legal usan?
- ¿Qué cuestionarios necesitan?
- ¿Qué comunicación con cliente necesitan?
- ¿Correo, mensajería interna, videollamada, WhatsApp, portal?
- ¿Qué volumen inicial de clientes esperan?
- ¿Qué equipo interno operará el sistema?
- ¿Qué datos deben sincronizarse con Odoo?
- ¿Qué país/mercado inicial cubre EPI10?
- ¿Tienen DPO/asesoría legal de protección de datos?
- ¿Hay requisitos clínicos/regulatorios específicos?

Para research:

- ¿Healthie permite alojamiento de datos en UE?
- ¿Healthie tiene condiciones adecuadas para GDPR?
- ¿Continuous Care permite alojamiento en UE?
- ¿Continuous Care tiene API documentada?
- ¿Hay alternativas europeas mejores?
- ¿Odoo puede cubrir más flujo del esperado?
- ¿TellmeGen API es suficientemente abierta?
- ¿n8n puede ser middleware viable?
- ¿Hace falta desarrollo propio o basta con configuración/integración?

## 13. Entregables internos deseados

Crear como mínimo:

### 02_context/client_context.md

Resumen refinado del cliente, necesidad, contexto y objetivo.

### 02_context/problem_framing.md

Definición del problema real a resolver.

### 02_context/current_assumptions.md

Supuestos actuales, diferenciando confirmados vs no confirmados.

### 02_context/open_questions.md

Preguntas abiertas para cliente y para research.

### 04_outputs/research_tools_comparison.md

Comparativa de Healthie, Continuous Care, Odoo, alternativas y posibles stacks.

### 04_outputs/build_vs_buy_matrix.md

Matriz de decisión entre comprar/configurar, integrar o desarrollar.

### 03_specs/now/prd_mvp_operativo.md

PRD completo del MVP operativo.

### 03_specs/now/architecture_spec.md

Arquitectura recomendada con opciones comparadas.

### 04_outputs/implementation_scope_v1.md

Alcance técnico de implantación de Fase 1.

### 04_outputs/budget_estimation_notes.md

Notas para presupuesto: trabajo propio, costes externos, mantenimiento, soporte.

### 04_outputs/client_proposal_outline.md

Estructura de propuesta comercial para EPI10.

### 04_outputs/client_response_email.md

Correo de respuesta a la clienta cuando tengamos enfoque claro.

## 14. Primeras tareas para Codex/Claude Code

Ejecutar primero una fase de Initial Context Building.

Objetivo:

- Leer este documento.
- Inspeccionar estructura del repo.
- Crear contexto inicial refinado.
- Proponer plan de trabajo.
- Identificar research tracks.
- Crear spec activa en `03_specs/now/001_now.md`.

Después, ejecutar research en bloques:

### Research Track 1 — Healthie

Investigar funcionalidades, API, precios, seguridad, GDPR, hosting, límites.

### Research Track 2 — Continuous Care

Investigar funcionalidades, API, precios, seguridad, GDPR, hosting, límites.

### Research Track 3 — Odoo

Investigar capacidades open source para CRM, portal, formularios, documentos, automatización e integración.

### Research Track 4 — TellmeGen

Buscar documentación pública o indicios de API. Preparar lista de información que hay que pedir a EPI10 si no está disponible públicamente.

### Research Track 5 — Arquitecturas posibles

Comparar stacks realistas para MVP operativo.

## 15. Resultado final buscado

Al final de este repo queremos poder responder a EPI10 con una propuesta clara, tipo:

> Hemos analizado las necesidades de esta primera fase y proponemos una implantación MVP basada en herramientas existentes, con Odoo como backoffice, una solución de portal/formularios/comunicación segura validada, integración con la web actual y una integración progresiva con TellmeGen según disponibilidad real de API. El objetivo es que EPI10 pueda operar de forma segura y ordenada sin construir una plataforma completa desde cero.

Pero antes de llegar ahí, este repo debe ayudarnos a saber:

- Qué herramienta conviene.
- Qué arquitectura tiene sentido.
- Qué es viable.
- Qué no sabemos todavía.
- Qué coste externo habrá.
- Qué trabajo podemos asumir nosotros.
- Qué habría que subcontratar o evitar.
- Qué presupuesto tiene sentido presentar.

## 16. Non-goals

Este repo NO busca:

- Desarrollar ahora el gemelo digital completo.
- Construir una plataforma sanitaria desde cero.
- Hacer una app móvil.
- Resolver toda la estrategia de producto futura.
- Crear una historia comercial inflada.
- Presupuestar sin validar APIs.
- Prometer cumplimiento legal sin revisión profesional.
- Sustituir asesoría legal, sanitaria o de protección de datos.

## 17. Criterio de éxito

Este repo habrá cumplido su función si permite preparar una propuesta que sea:

- Ejecutable.
- Acotada.
- Segura.
- Realista.
- Presupuestable.
- Defendible ante cliente.
- Basada en research.
- Separada en costes externos y trabajo propio.
- Clara sobre riesgos y dependencias.
- Orientada a poner EPI10 en operación cuanto antes.