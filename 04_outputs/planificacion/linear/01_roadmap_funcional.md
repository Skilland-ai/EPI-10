> **Procedencia:** copia íntegra del contenido de [01. EPI10 Salud MVP Fase 1 — Roadmap lógico-funcional jerárquico](https://linear.app/skilland/document/01-epi10-salud-mvp-fase-1-roadmap-logico-funcional-jerarquico-306fd8f19985).
> **Proyecto:** [EPI10 Salud MVP](https://linear.app/skilland/project/epi10-salud-mvp-928812c268de).
> **ID del documento:** `707a9518-5470-4d04-bb09-8320d6ce30ae`.
> **Creado en Linear:** 2026-09-07T05:11:57.078Z. **Última actualización fuente:** 2026-09-07T05:11:57.907Z.
> **Consulta MCP de solo lectura:** 2026-09-15 16:35:05 UTC.
> El bloque siguiente conserva el contenido original sin reinterpretación. Este encabezado es local.

---

# Roadmap v1 — Vista lógico-funcional jerárquica

## Resultado compartido

MVP integrado, validado y preparado para la demo de cierre.

## 1. Stripe

### 1.1 Diseño del flujo de cobro

* **T001 · OL1** — `OL1 [Stripe] Definir alcance funcional del mockup de cobro | EPI10 MVP Fase 1`
  Delimitar qué debe demostrar el mockup de Stripe, qué recorrido verá Carmen y qué queda fuera antes de tocar configuración.
* **T002 · OL1** — `OL1 [Stripe] Inventariar escenarios y reglas de pago | EPI10 MVP Fase 1`
  Identificar pago correcto, cancelado, fallido, reintento, duplicado y reembolso, junto con sus efectos operativos.
* **T013 · OL2** — `OL2 [Stripe] Especificar flujo de compra y estados de pago | EPI10 MVP Fase 1`
  Convertir el alcance inicial en una secuencia verificable desde la selección del producto hasta el resultado del pago.
* **T015 · OL2** — `OL2 [Stripe] Definir matriz de pruebas y excepciones de pago | EPI10 MVP Fase 1`
  Traducir escenarios de pago en casos de prueba reproducibles y criterios de aceptación.

### 1.2 Mockup funcional en entorno Skilland

* **T003 · OL1** — `OL1 [Stripe] Preparar entorno Stripe de pruebas de Skilland | EPI10 MVP Fase 1`
  Disponer de un entorno de pruebas independiente donde construir el mockup sin esperar al alta de EPI10.
* **T014 · OL2** — `OL2 [Stripe] Diseñar wireframes y copy del checkout | EPI10 MVP Fase 1`
  Diseñar la experiencia que se enseñará a Carmen antes de replicarla en su cuenta.
* **T024 · OL3** — `OL3 [Stripe] Configurar catálogo, producto y precio de prueba | EPI10 MVP Fase 1`
  Crear en modo test la estructura comercial mínima que alimentará el checkout demo.
* **T025 · OL3** — `OL3 [Stripe] Implementar checkout de prueba en entorno Skilland | EPI10 MVP Fase 1`
  Construir un recorrido funcional de pago demostrable sin depender del entorno EPI10.
* **T026 · OL3** — `OL3 [Stripe] Configurar páginas de éxito, cancelación y reintento | EPI10 MVP Fase 1`
  Cerrar la experiencia visible después de cada resultado principal del checkout.
* **T027 · OL3** — `OL3 [Stripe] Preparar evento o webhook de pago para el mockup | EPI10 MVP Fase 1`
  Demostrar que el resultado del pago puede producir un evento consumible por el journey posterior.
* **T028 · OL3** — `OL3 [Stripe] Ejecutar pruebas funcionales del mockup | EPI10 MVP Fase 1`
  Validar el mockup contra la matriz de escenarios antes de enseñarlo al cliente.
* **T029 · OL3** — `OL3 [Stripe] Preparar evidencia y guion de demo para Carmen | EPI10 MVP Fase 1`
  Preparar una explicación breve que permita validar decisiones funcionales sin entrar en detalle técnico innecesario.
* **T049 · OL4** — `OL4 [Stripe] Revisar internamente el mockup completo | EPI10 MVP Fase 1`
  Hacer un gate interno de calidad antes de presentar la solución a Carmen.

### 1.3 Validación y alta de EPI10

* **T050 · OL4** — `OL4 [Stripe] Presentar mockup a Carmen y solicitar feedback | EPI10 MVP Fase 1`
  Validar con Carmen el recorrido de pago antes de replicarlo en el entorno del cliente.
* **T051 · OL4** — `OL4 [Stripe] Incorporar feedback aprobado | EPI10 MVP Fase 1`
  Aplicar únicamente cambios validados que mantengan el alcance del módulo Stripe.
* **T052 · OL4** — `OL4 [Stripe] Acompañar alta y verificación de la cuenta EPI10 | EPI10 MVP Fase 1`
  Ayudar a EPI10 a completar el alta, verificación y roles necesarios sin asumir titularidad de la cuenta.

### 1.4 Implantación en entorno EPI10

* **T053 · OL4** — `OL4 [Stripe] Replicar catálogo y configuración en EPI10 | EPI10 MVP Fase 1`
  Trasladar al entorno de EPI10 la estructura aprobada en el mockup.
* **T054 · OL4** — `OL4 [Stripe] Configurar credenciales, enlaces y webhooks del entorno EPI10 | EPI10 MVP Fase 1`
  Dejar conectados los elementos técnicos del entorno cliente con gestión segura de secretos.
* **T055 · OL4** — `OL4 [Stripe] Ejecutar pruebas de aceptación en EPI10 | EPI10 MVP Fase 1`
  Validar la réplica en el entorno EPI10 antes de declarar entregado el módulo.
* **T056 · OL4** — `OL4 [Stripe] Entregar y documentar el módulo Stripe | EPI10 MVP Fase 1`
  Cerrar la entrega con configuración, operación, pruebas y responsabilidades entendibles.

### 1.5 Facturación del módulo adicional

* **T057 · OL4** — `OL4 [Stripe] Emitir y registrar la factura del módulo adicional | EPI10 MVP Fase 1`
  Facturar el trabajo separado de Stripe una vez entregado conforme al acuerdo comercial.

## 2. Diseño ejecutable del journey

### 2.1 Consolidación funcional

* **T011 · OL1** — `OL1 [Journey] Consolidar fuentes vigentes y baseline del journey | EPI10 MVP Fase 1`
  Unificar workshop, decisiones posteriores y alcance firmado en una única baseline funcional sin contradicciones.
* **T030 · OL3** — `OL3 [Journey] Congelar journey MVP end-to-end | EPI10 MVP Fase 1`
  Cerrar el recorrido desde entrada y pago hasta informe, soporte y cierre operativo.

### 2.2 Distribución de responsabilidades entre sistemas

* **T022 · OL2** — `OL2 [Journey] Mapear actores, owners y fuentes de verdad | EPI10 MVP Fase 1`
  Asignar responsable humano y sistema fuente para cada tramo, dato, documento, estado y comunicación.
* **T034 · OL3** — `OL3 [Journey] Asignar responsabilidades entre Stripe, Healthie, Odoo y Copilot | EPI10 MVP Fase 1`
  Evitar solapamientos definiendo qué sistema crea, conserva, muestra y actualiza cada elemento del journey.

### 2.3 Modelo operativo del caso

* **T031 · OL3** — `OL3 [Journey] Definir estados, hitos y transiciones del caso | EPI10 MVP Fase 1`
  Traducir el journey a estados principales, checks e hitos operativos utilizables en Odoo.
* **T032 · OL3** — `OL3 [Journey] Definir modelo operativo y próximos pasos | EPI10 MVP Fase 1`
  Especificar cómo cada caso muestra qué falta, qué toca hacer, quién actúa y cuándo.
* **T045 · OL3** — `OL3 [Journey] Definir excepciones y recuperación manual del journey | EPI10 MVP Fase 1`
  Mapear fallos frecuentes para que ningún caso quede invisible o bloqueado sin owner.

### 2.4 Contratos de datos e integración

* **T033 · OL3** — `OL3 [Journey] Definir campos, IDs y referencias mínimas | EPI10 MVP Fase 1`
  Definir los datos mínimos para vincular pago, cliente Healthie, caso Odoo y ejecución Copilot sin duplicación innecesaria.
* **T035 · OL3** — `OL3 [Journey] Clasificar datos, documentos y ubicaciones permitidas | EPI10 MVP Fase 1`
  Fijar data boundaries para datos personales, salud, genética, documentos, logs y paquetes Copilot.

### 2.5 Preparación de la ejecución

* **T046 · OL4** — `OL4 [Journey] Redactar specs ejecutables de Healthie | EPI10 MVP Fase 1`
  Traducir el journey asignado a Healthie en paquetes de implementación verificables.
* **T047 · OL4** — `OL4 [Journey] Redactar specs ejecutables de Odoo | EPI10 MVP Fase 1`
  Traducir estados, checks, tareas, owners, vistas y excepciones a implementación Odoo.
* **T048 · OL4** — `OL4 [Journey] Cerrar contratos de datos e integración | EPI10 MVP Fase 1`
  Cerrar eventos, payloads mínimos, IDs, ownership, idempotencia y fallbacks entre sistemas.

## 3. Healthie

### 3.1 Contratación y habilitación

* **T004 · OL1** — `OL1 [Healthie] Coordinar contratación inicial del plan Group | EPI10 MVP Fase 1`
  Acompañar a Carmen en el cierre del plan Group para disponer cuanto antes del entorno real de Healthie.
* **T005 · OL1** — `OL1 [Healthie] Solicitar cotización Enterprise y Mobile White Label | EPI10 MVP Fase 1`
  Abrir en paralelo la vía Enterprise para conocer coste y condiciones de Mobile White Label sin bloquear el plan Group.
* **T006 · OL1** — `OL1 [Healthie] Ordenar accesos, owners y soporte de contratación | EPI10 MVP Fase 1`
  Definir quién compra, quién administra, quién implementa y por qué canal se resuelven dudas con Healthie.
* **T016 · OL2** — `OL2 [Healthie] Validar plan, API, DPA, residencia y límites de cuenta | EPI10 MVP Fase 1`
  Confirmar qué permite realmente el plan contratado y qué gates legales/técnicos condicionan el MVP.

### 3.2 Configuración base del entorno

* **T017 · OL2** — `OL2 [Healthie] Inventariar módulos y capacidades disponibles | EPI10 MVP Fase 1`
  Mapear en el entorno real las capacidades necesarias para el journey y separar incluido, add-on, Enterprise y fuera de alcance.
* **T036 · OL3** — `OL3 [Healthie] Crear estructura demo de grupos, tags y clientes | EPI10 MVP Fase 1`
  Preparar la organización base que permitirá segmentar y operar clientes EPI10.
* **T037 · OL3** — `OL3 [Healthie] Configurar branding base, idioma y experiencia de entrada | EPI10 MVP Fase 1`
  Alinear la primera impresión del portal con EPI10 dentro de los límites del plan contratado.
* **T038 · OL3** — `OL3 [Healthie] Definir roles y permisos del entorno | EPI10 MVP Fase 1`
  Aplicar mínimo privilegio a administradores, profesionales, soporte y cliente demo.
* **T039 · OL3** — `OL3 [Healthie] Prototipar invitación y onboarding inicial | EPI10 MVP Fase 1`
  Probar la activación del cliente y su primera entrada antes de configurar todo el journey.
* **T059 · OL5** — `OL5 [Healthie] Configurar cuenta, organización y preferencias base | EPI10 MVP Fase 1`
  Dejar la cuenta real organizada para operar el journey EPI10 con nomenclatura y preferencias consistentes.

### 3.3 Implantación del journey en Healthie

* **T060 · OL5** — `OL5 [Healthie] Configurar grupos, tags y segmentación operativa | EPI10 MVP Fase 1`
  Implementar la segmentación necesaria para onboarding, test, informe entregado e interés futuro.
* **T061 · OL5** — `OL5 [Healthie] Configurar ficha de cliente y campos necesarios | EPI10 MVP Fase 1`
  Representar en Healthie solo los datos de cliente necesarios para la experiencia y operación.
* **T062 · OL5** — `OL5 [Healthie] Implementar consentimientos y formulario principal | EPI10 MVP Fase 1`
  Digitalizar las piezas de onboarding que bloquean o habilitan el avance del caso.
* **T063 · OL5** — `OL5 [Healthie] Implementar cuestionarios adicionales de Fase 1 | EPI10 MVP Fase 1`
  Configurar únicamente los cuestionarios adicionales aprobados para enriquecer el informe.
* **T064 · OL5** — `OL5 [Healthie] Configurar subida y gestión de documentos | EPI10 MVP Fase 1`
  Permitir que el cliente/equipo aporte documentos aprobados sin recurrir a canales dispersos.
* **T065 · OL5** — `OL5 [Healthie] Configurar comunicaciones, emails y notificaciones | EPI10 MVP Fase 1`
  Centralizar comunicaciones repetibles de activación, espera, cita, informe y soporte.
* **T066 · OL5** — `OL5 [Healthie] Configurar agenda y citas del test | EPI10 MVP Fase 1`
  Permitir que el cliente agende la cita cuando el test está disponible, con confirmación y recordatorios.
* **T079 · OL6** — `OL6 [Healthie] Configurar soporte post-informe y escalado | EPI10 MVP Fase 1`
  Centralizar dudas simples y escalar incidencias que requieren revisión del equipo.

### 3.4 Preparación para la integración

* **T080 · OL6** — `OL6 [Healthie] Configurar publicación del informe final | EPI10 MVP Fase 1`
  Preparar la superficie donde el cliente recibirá únicamente el informe validado.

### 3.5 QA funcional de Healthie

* **T077 · OL6** — `OL6 [Healthie] Validar invitación, activación y onboarding | EPI10 MVP Fase 1`
  Probar de forma aislada la experiencia completa desde invitación hasta onboarding mínimo completado.
* **T078 · OL6** — `OL6 [Healthie] Validar formularios, documentos y agenda | EPI10 MVP Fase 1`
  Comprobar que los módulos de experiencia cliente funcionan juntos y respetan permisos.

## 4. Odoo

### 4.1 Onboarding técnico de Odoo

* **T007 · OL1** — `OL1 [Odoo] Solicitar ficha técnica y accesos del entorno actual | EPI10 MVP Fase 1`
  Pedir la información necesaria para entender el Odoo de EPI10 antes de diseñar o modificar nada.
* **T008 · OL1** — `OL1 [Odoo] Coordinar sesión técnica con el mantenedor de Odoo | EPI10 MVP Fase 1`
  Alinear con la persona que mantiene Odoo el acceso, límites, despliegue y forma segura de colaborar.
* **T018 · OL2** — `OL2 [Odoo] Diagnosticar versión, módulos, hosting y permisos | EPI10 MVP Fase 1`
  Obtener un diagnóstico reproducible del entorno actual y de las restricciones para implementar el MVP.

### 4.2 Entorno seguro de desarrollo

* **T009 · OL1** — `OL1 [Odoo] Definir estrategia de copia, backup y sandbox | EPI10 MVP Fase 1`
  Decidir cómo trabajar sobre una copia controlada sin desarrollar directamente en producción ni exponer datos sensibles.
* **T019 · OL2** — `OL2 [Odoo] Obtener y restaurar una copia sanitizada de desarrollo | EPI10 MVP Fase 1`
  Disponer de una copia funcional y segura del entorno para desarrollar y probar sin afectar producción.
* **T040 · OL3** — `OL3 [Odoo] Crear entorno seguro de desarrollo | EPI10 MVP Fase 1`
  Dejar disponible una instancia reproducible para construir y probar el MVP.
* **T041 · OL3** — `OL3 [Odoo] Validar estrategia de configuración y módulos custom mínimos | EPI10 MVP Fase 1`
  Decidir qué se resuelve con configuración nativa y qué requiere desarrollo mínimo mantenible.

### 4.3 Implantación del journey en Odoo

* **T067 · OL5** — `OL5 [Odoo] Implementar modelo de caso EPI10 y pipeline | EPI10 MVP Fase 1`
  Crear la entidad/vista operativa que centraliza el seguimiento de cada cliente EPI10.
* **T068 · OL5** — `OL5 [Odoo] Implementar estados, hitos y checklist operativo | EPI10 MVP Fase 1`
  Representar el avance sin convertir cada check en un estado principal ni duplicar Healthie.
* **T069 · OL5** — `OL5 [Odoo] Implementar tareas automáticas, owners y próximos pasos | EPI10 MVP Fase 1`
  Generar acciones operativas claras cuando el caso alcanza hitos relevantes.
* **T070 · OL5** — `OL5 [Odoo] Implementar vistas, filtros y tablero operativo | EPI10 MVP Fase 1`
  Dar al equipo una vista accionable de casos por estado, owner, bloqueo y siguiente acción.
* **T071 · OL5** — `OL5 [Odoo] Implementar hitos manuales de test y laboratorio | EPI10 MVP Fase 1`
  Controlar la logística externa mediante hitos mínimos sin simular una integración TellmeGen inexistente.
* **T072 · OL5** — `OL5 [Odoo] Implementar documentos, informe y marcadores de entrega | EPI10 MVP Fase 1`
  Representar el archivo de origen autorizado, borradores, versión validada y publicación sin convertir Odoo en repositorio genético bruto.
* **T073 · OL5** — `OL5 [Odoo] Implementar incidencias, bloqueos y cierre del caso | EPI10 MVP Fase 1`
  Gestionar excepciones y cerrar el caso solo cuando entrega, notificación y correcciones estén resueltas.

### 4.4 Seguridad, permisos y QA

* **T081 · OL6** — `OL6 [Odoo] Implementar entrada desde web y pago | EPI10 MVP Fase 1`
  Crear/actualizar contacto y caso desde un evento de entrada/pago de forma idempotente.
* **T082 · OL6** — `OL6 [Odoo] Implementar referencias y sincronización con Healthie | EPI10 MVP Fase 1`
  Vincular caso y cliente Healthie y reflejar solo hitos relevantes sin replicar datos clínicos.
* **T083 · OL6** — `OL6 [Odoo] Implementar regla de listo para pedir test y tareas asociadas | EPI10 MVP Fase 1`
  Activar el paso operativo del test cuando los checks mínimos están completos.
* **T084 · OL6** — `OL6 [Odoo] Implementar acción de publicación del informe | EPI10 MVP Fase 1`
  Permitir publicar en Healthie únicamente una versión marcada como validada por una persona autorizada.
* **T085 · OL6** — `OL6 [Odoo] Validar seguridad, permisos, auditoría y backup | EPI10 MVP Fase 1`
  Verificar la configuración Odoo antes de la integración completa.

## 5. Copilot del informe

### 5.1 Cierre del discovery con Aitor

* **T010 · OL1** — `OL1 [Copilot] Preparar discovery operativo del informe con Aitor | EPI10 MVP Fase 1`
  Preparar una sesión centrada en cómo se construye, revisa y valida hoy el informe final.
* **T020 · OL2** — `OL2 [Copilot] Realizar entrevista de discovery con Aitor | EPI10 MVP Fase 1`
  Capturar el proceso real del informe, las decisiones expertas, inputs, excepciones y puntos automatizables.
* **T021 · OL2** — `OL2 [Copilot] Recopilar plantillas e informes anonimizados | EPI10 MVP Fase 1`
  Reunir material representativo y autorizado para especificar y evaluar borradores sin usar datos identificables.

### 5.2 Especificación del informe

* **T042 · OL3** — `OL3 [Copilot] Sintetizar discovery y decisiones del informe | EPI10 MVP Fase 1`
  Convertir la entrevista y ejemplos en un mapa claro de proceso, criterios expertos y unknowns.
* **T043 · OL3** — `OL3 [Copilot] Definir inputs, outputs y límites del Copilot | EPI10 MVP Fase 1`
  Cerrar qué recibe el Copilot, qué genera, qué nunca decide y qué debe revisar una persona.
* **T058 · OL4** — `OL4 [Copilot] Cerrar especificación funcional y rúbrica del informe | EPI10 MVP Fase 1`
  Dejar una especificación implementable y evaluable del borrador asistido y su revisión humana.

### 5.3 Construcción del Copilot

* **T074 · OL5** — `OL5 [Copilot] Crear estructura base del harness y repositorio | EPI10 MVP Fase 1`
  Preparar una base versionada y auditable para ejecutar el flujo asistido del informe.
* **T075 · OL5** — `OL5 [Copilot] Implementar ingesta y pseudonimización | EPI10 MVP Fase 1`
  Preparar inputs autorizados para generación minimizando identificadores y contenido no necesario.
* **T076 · OL5** — `OL5 [Copilot] Implementar flujo inicial de generación de borradores | EPI10 MVP Fase 1`
  Generar uno o varios borradores internos asociados a un caso sin publicarlos al cliente.

### 5.4 Evaluación e integración

* **T086 · OL6** — `OL6 [Copilot] Implementar plantilla, checklist y rúbrica | EPI10 MVP Fase 1`
  Convertir la especificación del informe en controles ejecutables de generación y revisión.
* **T087 · OL6** — `OL6 [Copilot] Configurar agentes, skills y prompts | EPI10 MVP Fase 1`
  Separar responsabilidades del proceso de borrador en componentes revisables y mantenibles.
* **T088 · OL6** — `OL6 [Copilot] Implementar revisión humana y control de versiones | EPI10 MVP Fase 1`
  Garantizar que borrador, correcciones y versión final validada no se confundan.
* **T089 · OL6** — `OL6 [Copilot] Construir dataset de evaluación y ejecutar evals | EPI10 MVP Fase 1`
  Medir el comportamiento del Copilot con casos anonimizados y criterios acordados.
* **T090 · OL6** — `OL6 [Copilot] Configurar logs seguros, errores y retención | EPI10 MVP Fase 1`
  Hacer observable y recuperable el flujo sin registrar datos sensibles innecesarios.

## 6. Integración y QA end-to-end

### 6.1 Integraciones del sistema

* **T091 · OL7** — `OL7 [INT QA] Integrar alta desde Stripe/web hacia Odoo y Healthie | EPI10 MVP Fase 1`
  Conectar el arranque del journey para crear/vincular cliente y caso tras el evento acordado.
* **T092 · OL7** — `OL7 [INT QA] Integrar onboarding Healthie con hitos Odoo | EPI10 MVP Fase 1`
  Traducir activación, consentimiento y formularios completados en hitos operativos mínimos.
* **T093 · OL7** — `OL7 [INT QA] Integrar preparación y pedido manual del test | EPI10 MVP Fase 1`
  Encadenar onboarding completo, regla de listo, tarea del equipo y registro manual de test pedido.
* **T094 · OL7** — `OL7 [INT QA] Integrar agenda Healthie con estado de cita en Odoo | EPI10 MVP Fase 1`
  Reflejar cita elegida, confirmación y cambios relevantes en el caso operativo.
* **T095 · OL7** — `OL7 [INT QA] Integrar hitos de laboratorio con activación del Copilot | EPI10 MVP Fase 1`
  Conectar el tramo manual de laboratorio con la preparación controlada del borrador.
* **T096 · OL7** — `OL7 [INT QA] Integrar borrador, revisión y aprobación del informe | EPI10 MVP Fase 1`
  Vincular generación Copilot, versiones y validación humana con el estado operativo Odoo.
* **T097 · OL7** — `OL7 [INT QA] Integrar publicación final en Healthie y cierre en Odoo | EPI10 MVP Fase 1`
  Entregar el informe validado, notificar al cliente y completar los marcadores de cierre.

### 6.2 Fiabilidad transversal

* **T098 · OL7** — `OL7 [INT QA] Implementar idempotencia, reintentos y recuperación | EPI10 MVP Fase 1`
  Evitar duplicados y casos perdidos cuando fallan o se repiten eventos entre sistemas.
* **T101 · OL8** — `OL8 [INT QA] Completar QA de seguridad, privacidad y datos sensibles | EPI10 MVP Fase 1`
  Realizar el gate final sobre permisos, datos, logs, documentos, secretos y revisión humana.

### 6.3 QA end-to-end

* **T099 · OL7** — `OL7 [INT QA] Ejecutar replay end-to-end del caso demo | EPI10 MVP Fase 1`
  Recorrer el caso EPI10-DEMO-001 completo para validar journey, operación, Copilot, entrega y recuperación.
* **T100 · OL8** — `OL8 [INT QA] Ejecutar regresión consolidada y corregir bloqueos | EPI10 MVP Fase 1`
  Revalidar los flujos críticos después del replay y cerrar defectos bloqueantes del MVP.
* **T102 · OL8** — `OL8 [INT QA] Cerrar documentación técnica, runbook y evidencias | EPI10 MVP Fase 1`
  Dejar el MVP comprensible, operable y recuperable para el equipo que realizará la demo y el handoff posterior.

## 7. Project Management

### 7.1 Gobernanza y control de alcance

* **T012 · OL1** — `OL1 [PM] Abrir control de alcance, decisiones, riesgos y dependencias | EPI10 MVP Fase 1`
  Crear los registros transversales que permitan gobernar el proyecto sin perder decisiones ni bloqueos.

### 7.2 Dependencias, accesos y riesgos

* **T023 · OL2** — `OL2 [PM] Actualizar registro de accesos, bloqueos y unknowns | EPI10 MVP Fase 1`
  Consolidar lo aprendido en contratación, Odoo, Stripe y Copilot para hacer visibles las dependencias reales.

### 7.3 Coordinación de actores

* **T044 · OL3** — `OL3 [PM] Celebrar checkpoint de alineación y desbloqueo | EPI10 MVP Fase 1`
  Revisar con los actores adecuados decisiones funcionales, accesos y bloqueos antes de cerrar specs.

### 7.4 Seguimiento de ejecución

* **T103 · OL8** — `OL8 [PM] Cerrar blockers y pendientes imprescindibles del MVP | EPI10 MVP Fase 1`
  Revisar el tablero final y asegurar que ningún bloqueo imprescindible queda oculto o sin decisión.

### 7.5 Cierre del horizonte actual

* **T104 · OL8** — `OL8 [PM] Consolidar release notes y paquete de aceptación | EPI10 MVP Fase 1`
  Sintetizar qué se ha construido, probado, limitado y dejado preparado para la demo.
* **T105 · OL8** — `OL8 [PM] Preparar guion, datos y entorno de demo del MVP | EPI10 MVP Fase 1`
  Dejar lista una demo coherente que muestre valor y trazabilidad sin depender de datos reales ni pasos improvisados.
* **T106 · OL8** — `OL8 [PM] Realizar go-no-go interno y declarar MVP listo para demo | EPI10 MVP Fase 1`
  Tomar la decisión interna final sobre la preparación técnica del MVP para la demo de cierre.

---

**Totales:** 7 bloques · 31 subbloques · 106 Tasks.
