# PROPUESTA TÉCNICA Y ECONÓMICA

## EPI10 Salud MVP 1.0

**Software propio para operación, portal cliente, backoffice e informe final asistido**

| Concepto | Detalle |
| --- | --- |
| Precio del proyecto | `[[PENDIENTE_RAUL_PRECIO_IMPLANTACION]]` |
| Plazo estimado | `[[PENDIENTE_RAUL_PLAZO]]` |
| Soporte incluido | Hasta final de año / aproximadamente 6 meses |
| Dirigida a | Carmen Sosa / EPI10 Salud |
| Elaborado por | Reboot / Skilland / equipo responsable |
| Fecha | `[[FECHA]]` |

Documento base para revisión comercial y posterior maquetación visual.

## 1. El problema

EPI10 Salud está en el momento de convertir una propuesta de alto valor en una
operación real, repetible y controlada. El objetivo no es diseñar una plataforma
sanitaria completa desde cero, sino poner en marcha una primera fase práctica,
segura y suficientemente sólida para operar cuanto antes con herramientas ya
existentes y una base software propia.

Hoy el flujo operativo depende de demasiadas piezas que todavía no están
orquestadas entre sí: la web y el pago, Odoo, una capa cliente tipo Healthie,
TellmeGen, la recepción de analíticas y documentos, la producción del informe
final y el seguimiento posterior.

Cuando esas piezas no están conectadas por un sistema claro, el equipo acaba
actuando como middleware humano. Aitor y el equipo operativo tienen que vigilar
estados, mover información, recordar próximos pasos, coordinar herramientas y
asegurarse de que cada cliente avanza correctamente. Esto funciona al principio,
pero introduce tres riesgos importantes:

- dependencia excesiva de personas concretas;
- riesgo de errores, olvidos o doble entrada;
- dificultad para escalar sin aumentar carga operativa de forma lineal.

Además, la experiencia cliente puede quedar fragmentada si formularios,
consentimientos, cuestionarios, analíticas, comunicación e informe final se
gestionan por canales separados. Para Carmen, la prioridad de Fase 1 debe ser
práctica: ordenar el servicio, profesionalizar la relación con el cliente,
reducir manualidad y construir una operación más segura y trazable.

Hay una restricción crítica: TellmeGen no dispone actualmente de una API
operativa para partners. Por tanto, la integración genética automática no puede
ser el núcleo de Fase 1. Intentar venderla ahora generaría una promesa técnica
que depende de un proveedor externo y que hoy no está disponible.

El problema real de Fase 1 es otro: construir un sistema operativo inicial para
EPI10 Salud. Un sistema que permita lanzar el servicio con más orden, más
trazabilidad y menos carga manual, sin sobredimensionar el proyecto.

## 2. La solución

# EPI10 Salud MVP 1.0

Proponemos desarrollar **EPI10 Salud MVP 1.0**: una primera aplicación/capa
software propia de EPI10, desarrollada a medida y desplegada en **AWS España**,
que conecta web/pago, Healthie y Odoo, automatiza estados y tareas, centraliza
parte del flujo operativo y habilita la entrega trazable del informe final.

La Fase 1 no consiste únicamente en configurar herramientas SaaS. Incluye el
desarrollo de una primera capa propia de software para EPI10 Salud, alojada en
AWS España, que orquesta la web, el portal cliente Healthie y Odoo, automatiza
estados y tareas, reduce carga operativa y habilita la entrega trazable del
informe final.

Esta capa queda diseñada como una **base ampliable** para futuras fases. A
diferencia de una simple conexión puntual entre herramientas, permite ir
incorporando progresivamente nuevas capacidades: más automatizaciones,
integración genética si TellmeGen habilita API, evolución del portal cliente,
automatización avanzada del informe, reporting, módulos de análisis y, a largo
plazo, capacidades propias relacionadas con el gemelo digital de EPI10.

La idea es usar herramientas existentes para acelerar el MVP, pero construir
desde el inicio una base software propia que pueda ir absorbiendo capacidades
críticas del negocio conforme EPI10 crezca.

En esta arquitectura:

- **Healthie** actúa como hipótesis principal para portal/capa cliente.
- **Odoo** actúa como backoffice operativo.
- **AWS España** aloja la primera capa propia de software.
- **EPI10 Informe Final Copilot** asiste la producción del informe final.
- **TellmeGen como sistema externo no integrado en Fase 1**: se mantiene fuera
  de integración automática hasta que el proveedor habilite una API real,
  documentada y viable.

El resultado no es un setup SaaS ni una automatización low-code. Es el primer
activo tecnológico propio de EPI10 para operar, medir, controlar y evolucionar
el servicio.

## 3. Arquitectura funcional

La arquitectura se puede entender así:

```text
Cliente final
   |
   v
Web EPI10 + pago
   |
   v
EPI10 Salud MVP 1.0 en AWS España
   |                         |
   v                         v
Healthie                     Odoo
Portal cliente               Backoffice operativo
   |                         |
   v                         v
formularios                  estados
consentimientos              tareas
cuestionarios                responsables
analíticas/documentos        dashboard operativo
informe final                seguimiento

Y aparte:

EPI10 Informe Final Copilot
   |
   v
inputs anonimizados/pseudonimizados
   |
   v
borrador asistido
   |
   v
revisión humana obligatoria
   |
   v
informe final validado
   |
   v
entrega en Healthie
   |
   v
estado actualizado en Odoo
```

La web capta y cobra. Healthie centraliza la relación con el cliente. Odoo
ordena la operación interna. EPI10 Salud MVP 1.0 orquesta eventos, estados,
tareas y trazabilidad. El Copilot asiste la producción del informe final.

TellmeGen no se integra automáticamente en Fase 1 porque el proveedor no dispone
de API operativa actual. El equipo EPI10 seguirá usando TellmeGen como sistema
externo y sus resultados como input del proceso, pero no se venderá como una
integración automática hasta que exista una API real, documentada y viable.

## 4. EPI10 Salud MVP 1.0

EPI10 Salud MVP 1.0 es el entregable tecnológico central del proyecto.

Consiste en una primera capa de orquestación con lógica de negocio propia,
desarrollada específicamente para EPI10. Su función es coordinar los eventos y
estados críticos entre web/pago, Healthie y Odoo, manteniendo trazabilidad sin
convertirse en una plataforma sanitaria completa.

Componentes previstos:

| Componente | Función |
| --- | --- |
| Backend propio | Servicio TypeScript / NestJS para ejecutar la lógica de negocio. |
| Base técnica | PostgreSQL técnico mínimo para IDs, estados, trazabilidad e idempotencia. |
| AWS España | Infraestructura de despliegue de la capa propia. |
| Endpoints web/pago | Recepción de eventos como lead creado o pago confirmado. |
| Healthie API/Webhooks | Alta/invitación de cliente, eventos de onboarding, documentos e informe si el plan lo permite. |
| Odoo API | Contactos, casos, estados, tareas, responsables y dashboard operativo. |
| Motor de estados | Seguimiento del avance operativo de cada cliente. |
| Motor de tareas | Creación de tareas y avisos para Aitor/equipo. |
| Trazabilidad | Registro técnico minimizado de eventos, errores y sincronizaciones. |
| Control de errores | Reintentos, idempotencia y detección de incidencias. |
| Mapeo de IDs | Relación entre IDs de web/pago, Healthie, Odoo y caso interno. |
| Módulo informe final | Subida o registro del informe final si Healthie API lo permite. |

Este bloque debe dejar a EPI10 con una base propia. No sustituye Healthie ni
Odoo en Fase 1. Se apoya en esas herramientas para acelerar el lanzamiento,
pero concentra en software propio la lógica que da valor diferencial y permite
evolucionar el sistema.

## 5. Healthie como portal cliente

Healthie se plantea como hipótesis principal para la capa cliente, porque cubre
un conjunto de necesidades cercanas al servicio EPI10:

- perfil cliente;
- onboarding;
- formularios;
- consentimientos;
- cuestionarios;
- subida de analíticas y documentos;
- comunicación segura;
- entrega de informes;
- seguimiento.

La propuesta no asume que Healthie esté cerrado al 100%. Antes de confirmarlo
como herramienta definitiva deben validarse plan, coste, idioma, API/webhooks,
DPA/GDPR, residencia de datos, límites funcionales y condiciones de uso.

Si Healthie no encaja por coste, DPA, residencia, idioma o API, se mantiene
ContinuousCare o una herramienta equivalente como alternativa.

El coste de Healthie, sus usuarios adicionales, API/add-ons, white-label o
funciones premium no está incluido dentro del precio de implantación salvo
decisión expresa. Debe tratarse como coste externo recurrente de EPI10.

## 6. Odoo como backoffice operativo

Odoo actuará como backoffice operativo de EPI10, no como portal cliente ni como
repositorio clínico/genético.

Su papel en Fase 1 será ordenar internamente:

- contactos y clientes;
- casos o servicios EPI10;
- estados;
- tareas;
- responsables;
- fechas clave;
- dashboard operativo básico;
- seguimiento;
- facturación o pedidos si aplica.

Odoo debe recibir estados, tareas, referencias y trazabilidad operativa. No debe
convertirse en repositorio de datos genéticos crudos.

La integración se plantea vía API y configuración de modelos, campos y vistas.
No se propone de entrada un módulo custom de Odoo salvo que durante la ejecución
se demuestre necesario.

## 7. EPI10 Informe Final Copilot

El informe final es una de las piezas centrales del modelo de negocio de EPI10.
Por eso Fase 1 no debe limitarse a entregar el informe por un canal más cómodo:
debe empezar a convertir su producción en un sistema asistido, trazable y
propio.

**EPI10 Informe Final Copilot** será un sistema asistido para preparar
borradores internos del informe final EPI10, usando inputs
anonimizados/pseudonimizados y con **revisión humana obligatoria**.

Debe incluir:

- checklist de inputs;
- script propio de anonimización/pseudonimización;
- prompts, skills, subagentes y scripts;
- generación de borrador preliminar;
- revisión humana obligatoria;
- export final;
- subida a Healthie si API lo permite;
- actualización de estado en Odoo;
- formación a Aitor/equipo.

El Copilot no es diagnóstico automático. No es interpretación genética autónoma.
No genera el informe final sin revisión. El output inicial es un borrador
interno y la versión final la valida EPI10.

El valor estratégico es claro: si EPI10 empieza a sistematizar el informe final
desde Fase 1, reduce carga manual ahora y construye una capacidad diferencial a
futuro.

## 8. Anonimización y tratamiento de datos sensibles

El proyecto se diseñará con una lógica de minimización de datos, trazabilidad y
control de acceso.

Para el Copilot y los procesos asociados se incluirá:

- checklist de anonimización;
- script propio anonimizador;
- eliminación de identificadores directos;
- pseudonimización por case ID;
- revisión previa antes de usar inputs en el Copilot;
- no almacenar datos genéticos crudos en Odoo;
- no almacenar datos genéticos crudos en PostgreSQL técnico;
- logs sin datos sensibles;
- retención mínima de paquetes temporales;
- revisión legal/DPO si EPI10 lo requiere.

La implementación técnica se diseñará orientada a minimización, trazabilidad y
control de acceso. La validación legal/GDPR debe realizarla el equipo legal/DPO
correspondiente si EPI10 lo considera necesario.

No se promete cumplimiento legal absoluto como resultado automático del
desarrollo técnico.

## 9. Tecnología e infraestructura

| Capa | Tecnología / Herramienta |
| --- | --- |
| Portal cliente | Healthie como hipótesis principal |
| Alternativa portal | ContinuousCare o herramienta equivalente si Healthie no encaja |
| Backoffice | Odoo como backoffice operativo |
| Backend propio | TypeScript / NestJS |
| Base técnica | PostgreSQL |
| Infraestructura | AWS España |
| Integraciones | Healthie API/Webhooks, Odoo API, Web/Pago |
| Informe final | EPI10 Informe Final Copilot |
| IA / LLM | Claude/OpenAI/Codex/Claude Code según entorno autorizado |
| Seguridad | Minimización, control de accesos, logs técnicos, anonimización |

AWS España será un coste externo recurrente. La cuenta AWS debe ser propiedad o
estar bajo control de EPI10, con soporte técnico nuestro durante el periodo
incluido.

Healthie, Odoo, AWS y posibles APIs LLM pueden tener costes externos separados
del precio de implantación. Estos costes deben quedar visibles en la propuesta
económica final.

## 10. Sobre el equipo responsable del desarrollo

El proyecto será liderado por un equipo con experiencia en software a medida,
AWS, integración de APIs, sistemas con IA, orquestación multi-LLM, productos
propios, documentación y handoff técnico.

Fernando Martín Santana es un líder técnico con más de 20 años de experiencia
en desarrollo de software, arquitectura cloud e inteligencia artificial.

Experiencia relevante:

- **CTO en ComplexChaos.ai, San Francisco (2023-2025).** Empresa de IA
  respaldada por Village Global. Plataforma de IA para negociaciones
  multipartitas con NLP a gran escala. Arquitectura full-stack y despliegue en
  AWS.
- **CTO Fractional en Mottum Analytica (2026-presente).** Líder técnico de
  Noetia.io, plataforma de IA para análisis de licitaciones públicas en España,
  asistentes especializados, análisis documental automatizado y scoring.
- **Fundador de Reboot Academy (2019-2025).** Empresa de educación tecnológica
  con más de 600 graduados y 93% de empleabilidad. Desarrollo de edukami.ai,
  plataforma con IA adoptada por Universidad de La Laguna, Gobierno de Canarias
  e ITC. Equipo de 12 ingenieros y orquestación multi-LLM.
- **Product Manager en Telefónica I+D.** Bluevia.com, APIs para desarrolladores
  en 16 países y 260 millones de clientes móviles.
- **CTO en PCCW Solutions, Hong Kong.** Equipo de más de 25 ingenieros,
  plataforma e-commerce a gran escala y migración a microservicios en AWS.
- **Investigador AI en NTT Emergent Technologies Lab, Japón.** Investigación en
  computación ubicua con MIT Media Lab / Vulcanus.
- **Consultor Senior en Fusion Systems, Japón/Singapur.** Sistemas de trading
  de alta frecuencia y consultoría de software delivery.

Formación relevante:

- Ingeniero en Informática, ULPGC.
- Máster en Inteligencia de Negocio y Gestión del Conocimiento, UOC.
- Machine Learning, Stanford University.
- Deep Learning, EOI.
- Data Science, GA.

La combinación de experiencia en arquitectura cloud, APIs, productos propios e
inteligencia artificial encaja especialmente bien con la naturaleza de EPI10
Salud MVP 1.0: un primer activo tecnológico propio, operativo y ampliable.

## 11. Qué incluye este proyecto

### Bloque 1 — Arranque y diseño operativo

- Workshop de arranque operativo de 3 horas.
- Checklist previo para EPI10.
- Mapa operativo de Fase 1.
- Estados, responsables y puntos de automatización.

### Bloque 2 — Portal cliente

- Validación Healthie vs alternativa.
- Configuración inicial de Healthie si se valida.
- Formularios, consentimientos y cuestionarios.
- Documentos y analíticas.
- Entrega de informe final.
- Comunicación y seguimiento según capacidades de la herramienta.

### Bloque 3 — Backoffice Odoo

- Configuración de Odoo como backoffice operativo.
- Contactos, casos y servicios.
- Estados.
- Tareas.
- Responsables.
- Dashboard operativo básico.

### Bloque 4 — EPI10 Salud MVP 1.0

- Desarrollo de capa software propia.
- Despliegue en AWS España.
- Integración web/pago.
- Integración Healthie API/webhooks.
- Integración Odoo API.
- Motor de estados y tareas.
- Trazabilidad técnica.
- PostgreSQL técnico mínimo.

### Bloque 5 — Informe Final Copilot

- Checklist de inputs.
- Script anonimizador.
- Prompts, skills, subagentes y scripts.
- Borrador asistido.
- Revisión humana obligatoria.
- Export/subida a Healthie si API lo permite.
- Actualización de estado en Odoo.

### Bloque 6 — Documentación, formación y soporte

- Documentación técnica.
- Documentación operativa.
- Formación inicial.
- Soporte hasta final de año / aproximadamente 6 meses.

## 12. Qué no incluye esta fase

No incluye en Fase 1:

- integración automática TellmeGen;
- creación automática de usuarios, tests o barcodes en TellmeGen;
- consulta automática de estado o resultados TellmeGen;
- descarga automática de PDF TellmeGen;
- ingesta estructurada de resultados genéticos;
- dashboard genética;
- interpretación genética automática;
- diagnóstico automatizado;
- gemelo digital;
- plataforma sanitaria propia completa;
- app móvil propia si Healthie/equivalente cubre portal/app;
- garantía legal/GDPR absoluta;
- nuevas features fuera del alcance;
- mantenimiento posterior al periodo incluido, salvo nuevo acuerdo.

TellmeGen queda fuera no por una decisión arbitraria de diseño, sino porque el
proveedor no dispone actualmente de una API operativa disponible para esta
integración. Si TellmeGen habilita una API real, documentada y viable, la
integración podrá plantearse como Fase 2.

## 13. Plan de trabajo

El plazo final queda pendiente de confirmación comercial:
`[[PENDIENTE_RAUL_PLAZO_ESTIMADO]]`.

La estructura orientativa de trabajo es:

| Hito | Semana | Descripción | Entregable / criterio de aceptación |
| --- | --- | --- | --- |
| M0 | Semana 1 | Kick-off y workshop operativo | Sesión 3h, checklist revisado, estados iniciales cerrados |
| M1 | Semana 1-2 | Validación Healthie/Odoo/Web | Decisiones de herramienta, accesos, APIs y restricciones |
| M2 | Semana 2-3 | Configuración portal y backoffice | Healthie/Odoo preparados para flujo base |
| M3 | Semana 3-5 | Desarrollo EPI10 Salud MVP 1.0 | Backend propio, AWS España, eventos y sincronizaciones base |
| M4 | Semana 5-6 | Informe Final Copilot | Checklist, script anonimizador, flujo de borrador y revisión |
| M5 | Semana 6-7 | Integración, QA y ajustes | Flujo end-to-end validado con casos de prueba |
| M6 | Semana 7-8 | Formación y salida controlada | Equipo formado, documentación entregada, soporte activado |

Esta tabla no es un backlog atómico ni un plan de ejecución Stage 06. Es una
estructura comercial de hitos para que EPI10 entienda el recorrido del proyecto.

## 14. Precio y condiciones

| Concepto | Detalle | Importe |
| --- | --- | --- |
| Desarrollo e implantación EPI10 Salud MVP 1.0 | Software propio, configuración, integraciones, Copilot, documentación y formación | `[[PENDIENTE_RAUL_PRECIO_IMPLANTACION]]` |
| IGIC / impuestos | Según corresponda | `[[PENDIENTE_RAUL_IGIC]]` |
| Total |  | `[[PENDIENTE_RAUL_TOTAL]]` |

### Costes externos no incluidos en el precio de implantación

| Coste externo | Tratamiento |
| --- | --- |
| Healthie licencia | Baseline público orientativo, pendiente de cotización vigente |
| Healthie API/add-on | Necesario si Healthie se confirma; coste pendiente de cotización |
| Healthie usuarios/add-ons | Pendiente de plan real y número de usuarios |
| Odoo | Depende de modalidad real, hosting, licencias y mantenimiento |
| AWS España | Coste mensual recurrente estimado por infraestructura |
| LLM/API Copilot | Coste variable según uso, modelo y proveedor |
| Legal/DPO | Si EPI10 requiere revisión especializada |

Referencia pública Healthie revisada el 2026-06-11:

- Healthie Group desde `149.99 USD+/mes` en facturación mensual o `135
  USD+/mes` en facturación anual como referencia pública orientativa.
- Clínicos adicionales: `50 USD/mes` por clinician.
- Healthie API: add-on para Group/Enterprise; coste pendiente de cotización.

Para AWS España se deja preparado el placeholder:
`[[PENDIENTE_RAUL_AWS_RANGO_MENSUAL]]`.

Se incluirá una estimación mensual orientativa en la versión económica final una
vez confirmado el nivel de infraestructura requerido.

## 15. Forma de pago

| Pago | Momento | Importe |
| --- | --- | --- |
| 40% | Firma del contrato | `[[PENDIENTE_RAUL_40]]` |
| 30% | Hito intermedio validado | `[[PENDIENTE_RAUL_30_A]]` |
| 30% | Entrega formal | `[[PENDIENTE_RAUL_30_B]]` |

Los importes se completarán cuando Raúl confirme el precio final de
implantación, impuestos y condiciones comerciales.

## 16. Soporte incluido

El proyecto incluye soporte hasta final de año / aproximadamente 6 meses.

Este soporte cubre:

- incidencias;
- soporte sobre EPI10 Salud MVP 1.0;
- soporte sobre EPI10 Informe Final Copilot;
- soporte de despliegue AWS;
- soporte de integraciones Healthie/Odoo/Web;
- acompañamiento inicial;
- formación y dudas operativas.

No incluye:

- nuevas funcionalidades;
- integración TellmeGen;
- rediseño completo;
- cambios legales/regulatorios;
- soporte 24/7 salvo pacto expreso;
- mantenimiento posterior al periodo incluido.

El mantenimiento posterior se valorará al final del periodo incluido si procede.

## 17. Propiedad del código y documentación

Todo el código desarrollado específicamente para EPI10 Salud se entregará a
EPI10 y pasará a formar parte de sus activos tecnológicos.

Esto incluye:

- código EPI10 Salud MVP 1.0;
- EPI10 Informe Final Copilot;
- script anonimizador;
- integraciones propias;
- documentación técnica;
- documentación operativa;
- handoff para que cualquier equipo autorizado por EPI10 pueda trabajar sobre
  el sistema.

Esta cesión se refiere al software específico desarrollado para EPI10.
Librerías open source, frameworks, servicios de terceros y herramientas
preexistentes mantienen sus propias licencias y condiciones.

## 18. Roadmap

### Fase 1 — EPI10 Salud MVP 1.0

- Portal cliente.
- Odoo backoffice.
- Software propio en AWS España.
- Automatizaciones operativas.
- EPI10 Informe Final Copilot.
- Soporte inicial.

### Fase 2 — Automatización y ampliación

- Integración TellmeGen si habilita API real, documentada y viable.
- Mejora del Copilot.
- Automatización documental avanzada.
- Reporting operativo avanzado.
- Más eventos Healthie/Odoo.
- Validaciones internas.

### Fase 3 — Capacidades propias / gemelo digital

- Evolución del portal cliente propio.
- Posible reducción progresiva de dependencia de Healthie.
- Posible reducción progresiva de dependencia de Odoo.
- Research médico asistido.
- Integración de papers/evidencia científica.
- Módulos propios de análisis.
- Base futura para gemelo digital.

Fase 3 es visión futura. No está incluida en Fase 1.

## 19. ROI y valor operativo

El valor de EPI10 Salud MVP 1.0 no depende solo de ahorrar horas. También
depende de reducir fricción, errores, dispersión documental y dependencia de
procesos manuales.

Valor esperado:

- reducción de manualidad de Aitor/equipo;
- menor doble entrada;
- menos errores operativos;
- mejor trazabilidad;
- entrega más profesional del informe;
- menor dependencia de email;
- base escalable;
- capacidad de atender más clientes sin aumentar linealmente la carga
  operativa.

La fórmula de estimación puede ser:

```text
horas ahorradas al mes = horas ahorradas por cliente x clientes al mes
```

Si el equipo ahorra `X` horas por cliente y procesa `Y` clientes al mes, el
ahorro mensual estimado sería `X x Y` horas. Esta cifra se podrá concretar al
inicio de Fase 1 cuando EPI10 comparta volumen y tiempos actuales.

Tomás puede usar esta sección para valorar coste, ROI y capacidad de escalar,
pero el diseño funcional sigue priorizando a Carmen como buyer principal y a
Aitor/equipo como fuente del dolor operativo.

## 20. Supuestos y dependencias

Esta propuesta asume:

- Healthie pendiente de validación final de plan, coste, API, DPA, residencia e
  idioma.
- Odoo pendiente de revisar modalidad, API y configuración real.
- Web/pago pendiente de confirmar eventos o mecanismo de integración.
- AWS a contratar/pagar por EPI10.
- API Healthie/add-on pendiente de cotización.
- LLM/API Copilot pendiente de proveedor, volumen y entorno autorizado.
- Legal/DPO si EPI10 lo requiere.
- TellmeGen sin API actual, fuera de Fase 1.

Estos puntos no bloquean la propuesta, pero deben quedar visibles para no
convertir incógnitas en promesas.

## 21. Cierre comercial

Con **EPI10 Salud MVP 1.0**, EPI10 no solo implanta herramientas existentes:
empieza a construir su primera base software propia para operar, escalar y
evolucionar el servicio.

La Fase 1 permite salir al mercado con una operación más ordenada, un portal
cliente profesional, un backoffice trazable y un proceso asistido de producción
del informe final, sin sobredimensionar el proyecto ni depender de
integraciones genéticas que hoy el proveedor no ofrece.

El objetivo es pragmático: lanzar antes, operar mejor y construir desde el
principio un activo tecnológico propio que pueda crecer con EPI10.

## Handoff to Next Stage

Stage 04 queda preparado para revisión humana, ajuste de precio/plazo por Raúl
y maquetación posterior. No se debe avanzar a Stage 06 salvo activación expresa
de `execution_plan_enabled`.
