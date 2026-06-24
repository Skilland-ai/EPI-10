# insights-preventa-epi10-salud.md

**Proyecto:** EPI10 Salud  
**Uso previsto:** material bruto consolidado para `04_outputs/spec-driving/epi10-salud/raw/`  
**Fecha de compilación:** 2026-06-09  
**Autoría de la compilación:** reconstrucción a partir de conversaciones, emails, reuniones y entregables v1/v2 comentados en preventa.  
**Estado:** material de entrada para Stage 00 del flujo `spec-driving`. No es propuesta comercial final, no es presupuesto y no es blueprint técnico cerrado.

---

## 0. Para qué existe este documento

Este documento consolida, en un único archivo de trabajo, todo lo que se ha descubierto durante la preventa de EPI10 Salud hasta este punto.

Debe servir como **material inicial bruto, pero ordenado**, para que la run `spec-driving` del caso `epi10-salud` pueda arrancar con buen contexto.

La finalidad no es cerrar todavía una propuesta, sino alimentar el flujo de trabajo que debería producir, por etapas:

1. un contexto trazable del caso;
2. una auditoría de problemas reales;
3. una decisión de alcance MVP;
4. un blueprint técnico-funcional de preventa;
5. una propuesta comercial;
6. y solo después, si se habilita, un plan de ejecución.

La idea clave es que este documento recoja tanto los hechos confirmados como los supuestos, intuiciones, contradicciones, riesgos, dolores, deseos del cliente, decisiones tomadas y cambios de criterio que han ido apareciendo.

---

## 1. Resumen ejecutivo brutalmente simple

EPI10 Salud quiere poner en marcha una primera fase operativa de su servicio sin construir una plataforma propia completa desde cero.

La arquitectura ideal inicialmente entendida era:

```text
Web EPI10
  -> Healthie / ContinuousCare / herramienta cliente equivalente
  -> Odoo open source como backoffice
  <- API laboratorio proveedor / TellmeGen para resultados genéticos
```

Tras varias iteraciones y una reunión técnica con Aitor, se entendió mejor el flujo real:

- El cliente entra por una web de EPI10 que todavía está en construcción.
- La web tendrá formulario y pago.
- Odoo existe o está previsto como herramienta de backoffice, pero no está claro que esté configurado como sistema operativo completo.
- TellmeGen se usa actualmente como plataforma profesional/B2B para comprar/gestionar tests, usuarios, barcodes y resultados.
- Actualmente mucho del flujo lo ejecuta Aitor de forma manual.
- El cliente final recibe actualmente información/documentos por canales menos sistemáticos, como correo.
- EPI10 quiere que la experiencia de cliente viva en una herramienta tipo Healthie o ContinuousCare, con Healthie ganando peso como candidato preferido.
- TellmeGen ha respondido que, por ahora, únicamente disponen de plataforma profesional; no tienen API operativa disponible para partners en este momento.

Conclusión actual:

> La falta de API de TellmeGen impide una integración automática de resultados genéticos en Fase 1, pero no mata el proyecto. El MVP sigue siendo viable si se enfoca como portal cliente + backoffice + automatizaciones operativas + entrega de informe final, dejando TellmeGen como sistema externo no integrado en Fase 1.

El valor de Fase 1 no debe venderse como “integración TellmeGen”, sino como:

> Sistema operativo inicial de EPI10 para ordenar la relación con el cliente, reducir carga manual de Aitor/equipo, centralizar formularios, consentimientos, analíticas, comunicación, documentación e informe final en Healthie, y coordinar backoffice/estados/tareas en Odoo.

---

## 2. Fuente de verdad comercial: qué pidió Carmen originalmente

Carmen envió un email bastante explícito en el que pidió una propuesta sencilla, ejecutable y basada en herramientas existentes.

La idea de Carmen era apoyarse en:

1. la web actual o web en desarrollo;
2. Odoo open source como herramienta interna de gestión;
3. la plataforma de resultados de test genéticos del laboratorio proveedor;
4. una posible integración API con TellmeGen/laboratorio;
5. Healthie, ContinuousCare u otra herramienta equivalente para cubrir portal de cliente y flujo operativo.

Los elementos funcionales que Carmen mencionó explícitamente fueron:

- portal cliente;
- formularios;
- consentimientos;
- cuestionarios;
- seguimiento;
- comunicación segura;
- entrega de documentación o informes;
- conexión con la web actual;
- sincronización con Odoo open source;
- integración con API de TellmeGen;
- automatizaciones semiautomatizadas al inicio;
- desarrollos mínimos si realmente fueran necesarios;
- costes de licencias, integración, soporte y mantenimiento;
- infraestructura segura alojada en España o la Unión Europea.

Lectura estratégica de su email:

- Carmen no está pidiendo construir una plataforma sanitaria completa desde cero.
- Carmen no está pidiendo todavía el “gemelo digital” completo.
- Carmen quiere operar EPI10 de forma segura, ordenada y realista.
- Carmen quiere apoyarse en herramientas existentes.
- Carmen quiere una propuesta práctica de Fase 1.
- Carmen es la buyer person funcional/estratégica principal para esta preventa.

---

## 3. Stakeholders detectados y papel de cada uno

### 3.1 Carmen

Rol probable:

- buyer person principal a nivel funcional/estratégico;
- interlocutora clave para entender qué quiere EPI10;
- persona a la que hay que venderle claridad, seguridad, realismo y capacidad de ejecución.

Qué le importa:

- que EPI10 pueda operar pronto;
- que no se sobredimensione el proyecto;
- que no se construya todo desde cero;
- que el sistema sea seguro y ordenado;
- que la experiencia de cliente sea profesional;
- que la propuesta sea clara y defendible;
- que haya control de costes y fases;
- que el proyecto sea viable para el momento actual de EPI10.

Cómo priorizarla:

- Alta prioridad.
- Es la fuente principal para decidir el scope comercial.
- La narrativa de la propuesta debe hablarle directamente a Carmen.

### 3.2 Aitor

Rol:

- Responsable de Calidad.
- Usuario operativo clave.
- Pain owner del flujo actual.
- Persona que conoce de primera mano cómo se usa TellmeGen y Odoo.
- Actualmente parece estar ejecutando o coordinando muchísimas acciones manuales.

Qué le duele:

- tener que coordinar demasiadas cosas manualmente;
- entrar en TellmeGen;
- crear usuarios;
- asociar barcodes;
- gestionar estados;
- coordinar comunicaciones;
- recibir/enviar documentos;
- producir o asistir en la producción del informe final;
- operar con poca automatización y poca trazabilidad.

Cómo priorizarlo:

- Muy importante para auditar problemas y diseñar automatizaciones de calidad de vida.
- No necesariamente decide la compra, pero su dolor operativo justifica gran parte del ROI.
- La propuesta debería mostrar claramente cómo se reducen tareas manuales y errores operativos.

### 3.3 Tomás

Rol probable:

- comprador económico o figura de decisión/pago.

Cómo tratarlo:

- No complicar el análisis pensando demasiado en Tomás.
- Tomás entra sobre todo en la propuesta comercial como destinatario de coste/valor/ROI.
- Puede justificarse con una slide/sección sencilla de ahorro de horas, reducción de errores y capacidad de escalar.

Qué NO hacer:

- No diseñar el producto alrededor de Tomás.
- No crear una matriz consultora excesiva de economic buyer.

### 3.4 Equipo EPI10

Rol:

- operadores del futuro sistema;
- responsables de atención, revisión, informes y seguimiento;
- posibles usuarios de Odoo y Healthie.

Necesidades:

- proceso claro;
- estados visibles;
- responsabilidades asignadas;
- tareas y avisos;
- menos dependencia de memoria individual;
- documentación de operación;
- formación.

### 3.5 Cliente final / paciente / usuario EPI10

Rol:

- persona que compra/contrata el servicio;
- completa formulario, consentimientos y cuestionarios;
- se realiza test genético;
- puede aportar analíticas adicionales;
- recibe informe final de EPI10;
- puede entrar en seguimiento.

Necesidades:

- experiencia clara y profesional;
- un único portal o entorno privado;
- comunicación segura;
- carga sencilla de documentación/analíticas;
- acceso ordenado al informe final;
- confianza en el manejo de datos sensibles.

### 3.6 TellmeGen / laboratorio proveedor

Rol:

- proveedor externo de test genéticos;
- plataforma B2B/profesional donde EPI10 gestiona pedidos, usuarios, barcodes y resultados;
- fuente de resultados genéticos.

Estado actual confirmado:

- No tienen API operativa disponible actualmente para lo que EPI10 necesita.
- Solo disponen de plataforma profesional por ahora.
- Su equipo IT quiere migrar interacciones a APIs en el futuro, pero no hay deadline.
- Existe un presupuesto/API antiguo que debería revisar el nuevo director de IT.

### 3.7 Reboot / Skilland / Raúl / Romina

Rol:

- equipo de preventa, arquitectura e implementación;
- responsables de entender el problema, definir alcance, preparar propuesta y eventualmente ejecutar.

Enfoque de trabajo:

- preventa no cobrada;
- investigación y definición interna antes de presupuesto;
- ejecución solo si el cliente compra Fase 1;
- usar herramientas existentes cuando sea posible;
- evitar prometer integraciones no verificadas.

---

## 4. Cronología resumida de descubrimientos y decisiones

### 4.1 Email inicial de Carmen

Carmen pide propuesta para una Fase 1 práctica basada en:

- web;
- Odoo open source;
- TellmeGen/laboratorio;
- Healthie/ContinuousCare;
- integración API;
- automatizaciones;
- seguridad/infraestructura UE.

Primera interpretación:

> No construir desde cero. Diseñar un sistema operativo inicial apoyado en herramientas existentes.

### 4.2 Primer alineamiento interno

Se acordó que la Fase 0 era interna de preventa, no vendible.

Objetivo de Fase 0:

- investigar herramientas;
- entender arquitectura;
- preparar PRD;
- preparar propuesta/presupuesto;
- no cobrar al cliente por investigar.

### 4.3 Creación del repo y archivo de contexto

Se generó un archivo inicial tipo “What is this repo about.md” para orientar el repositorio.

Idea:

- repo como harness agentic;
- material bruto en inbox/raw;
- specs y outputs;
- investigación y decisiones.

### 4.4 V1 generada

La V1 produjo entregables:

- research tools comparison;
- build vs buy matrix;
- MVP operational flow;
- PRD MVP operativo;
- architecture recommendation;
- budget notes;
- client proposal outline;
- client response email.

Recomendación V1:

> Odoo como backoffice + portal/formularios seguro + n8n + TellmeGen semimanual salvo API.

Problema de V1:

- Rebajaba Healthie/ContinuousCare a “portal/formularios seguro”.
- Introducía “TellmeGen semimanual”.
- No respetaba suficientemente que el cliente quería Healthie/ContinuousCare como capa principal de negocio/cliente.

### 4.5 Corrección conceptual hacia V2

Se decidió corregir:

- Healthie/ContinuousCare deben ser capa principal de relación con cliente.
- Odoo queda como backoffice.
- TellmeGen/laboratorio solo entra si hay API real, documentada y autorizada.
- Nada de integración semimanual.
- Si no hay API, la integración genética queda fuera de Fase 1.

Arquitectura V2:

```text
Web EPI10
  -> Healthie / ContinuousCare / equivalente sanitario
  -> Odoo open source backoffice
  <- API laboratorio / TellmeGen solo si existe y está autorizada
```

### 4.6 Correo a Carmen

Se envió correo a Carmen explicando arquitectura general y pidiendo datos mínimos:

- estado actual de Odoo;
- laboratorio/TellmeGen y API;
- preferencia Healthie vs ContinuousCare.

Se quitó la pregunta del flujo operativo detallado porque se decidió que eso entraría al inicio de Fase 1, no en preventa.

### 4.7 Reunión técnica con Aitor

La reunión se centró en:

- ver el portal de TellmeGen;
- ver Odoo;
- entender cómo está montado el flujo manual;
- entender qué quieren mostrar en el portal cliente;
- aclarar el tema API de TellmeGen.

Hallazgo principal:

> La operación actual depende mucho de acciones manuales de Aitor. El proyecto está muy verde y necesita sistematización.

### 4.8 Correo a Aitor para preguntar a TellmeGen

Se redactó un correo para que Aitor pidiera a su comercial de TellmeGen información sobre APIs, webhooks, endpoints, sandbox, creación de usuarios, barcodes, estados, resultados y descarga de reportes.

Aitor pidió la versión en español porque su comercial de TellmeGen habla español.

Se le envió versión en español.

### 4.9 Respuesta de TellmeGen

Aitor trasladó la respuesta del comercial de TellmeGen:

> Por el momento únicamente disponen de plataforma profesional. El equipo IT quiere migrar estas interacciones a APIs en un futuro, pero no hay deadline porque existen otras prioridades de dirección. Existe un presupuesto de API antiguo que debería revisar el nuevo director de IT.

Conclusión:

- No se puede contar con API TellmeGen ahora.
- No se puede prometer integración genética automática en Fase 1.
- El MVP debe reformularse para seguir siendo valioso sin API TellmeGen.

### 4.10 Cambio de framing tras respuesta TellmeGen

Se decidió que la falta de API de TellmeGen no mata el proyecto.

Mata solo:

- creación automática de usuarios/test en TellmeGen;
- asociación automática de barcode;
- consulta automática de estado;
- extracción automática de resultados;
- descarga automática de PDF;
- dashboard genética alimentada desde TellmeGen.

Pero sigue vivo:

- portal cliente en Healthie;
- formularios;
- consentimientos;
- cuestionarios;
- subida de analíticas;
- comunicación segura;
- entrega de informe final;
- backoffice Odoo;
- estados y tareas;
- automatizaciones de quality-of-life para Aitor;
- sistematización del proceso de generación/entrega de informe.

---

## 5. Estado actual del proyecto EPI10 según lo descubierto

### 5.1 El proyecto está verde operativamente

Expresión usada en conversación: “el proyecto está en bragas”.

Traducción profesional:

- la web está en construcción;
- el flujo de compra/pago no parece completamente consolidado;
- Odoo existe o está previsto, pero no parece estar actuando todavía como sistema operativo robusto;
- Healthie/ContinuousCare aún no están decididos/configurados;
- TellmeGen se usa desde portal B2B;
- las interacciones clave son manuales;
- no hay sistema único de trazabilidad;
- el informe final se produce con inputs diversos y se entrega de forma no centralizada.

### 5.2 Web EPI10

Estado:

- En construcción.
- Tendrá formulario.
- Probablemente tendrá pasarela de pago.
- El cliente podrá comprar/contratar el servicio desde ahí.

Rol previsto:

- captación;
- entrada del cliente;
- formulario inicial;
- pago;
- inicio del flujo operativo.

Dudas:

- tecnología exacta de la web;
- pasarela de pago;
- si el pago ya está conectado con Odoo;
- si el formulario guarda datos sensibles;
- si el formulario puede disparar webhooks/API;
- quién desarrolla o mantiene la web;
- si conviene mantener formulario web propio o derivar a Healthie.

### 5.3 Odoo

Rol deseado:

- backoffice;
- contactos/clientes;
- pedidos/facturación;
- estados de servicio;
- tareas internas;
- responsables;
- seguimiento operativo;
- reporting.

Estado observado:

- Se revisó Odoo con Aitor.
- Hay módulos, pero no hay todavía una imagen completa y cerrada del estado real.
- Parece que EPI10 quiere usarlo para automatizar facturación, envíos, estados y organización.

Dudas:

- versión/modalidad concreta;
- módulos activos;
- si es Community, Enterprise, Online, Odoo.sh o self-hosted;
- dónde está alojado;
- si tiene API activa;
- cómo se conectará con web/pago;
- qué datos deben vivir ahí;
- si debe guardar documentos o solo referencias;
- cómo se gestionarán permisos.

### 5.4 Healthie / ContinuousCare

Estado:

- Son herramientas consideradas por EPI10.
- Parece que Healthie gana peso como candidato principal.
- ContinuousCare queda como alternativa.

Rol deseado:

- portal cliente;
- formularios;
- consentimientos;
- cuestionarios;
- comunicación segura;
- subida de analíticas;
- documentos;
- entrega de informe final;
- seguimiento.

Hipótesis actual:

> Healthie probablemente será el lugar donde vive toda la interacción del cliente con EPI10 después de la captación/pago.

Dudas:

- plan necesario;
- API disponible en el plan;
- coste;
- soporte en español;
- residencia de datos;
- DPA/GDPR;
- capacidad de marca blanca;
- capacidad de vistas/dashboards personalizados;
- posibilidad de recibir datos de web/Odoo;
- cómo entregar documentos/informes;
- cómo gestionar analíticas subidas por cliente.

### 5.5 TellmeGen

Estado:

- EPI10 usa portal B2B/profesional de TellmeGen.
- Aitor entra en la plataforma para gestionar usuarios/tests/barcodes/resultados.
- TellmeGen no tiene API operativa ahora mismo para este caso.
- IT de TellmeGen quiere migrar interacciones a APIs en futuro, sin deadline.
- Hay un presupuesto/API antiguo pendiente de revisión por nuevo director IT.

Rol actual:

- compra/solicitud de tests;
- creación/registro de usuario dentro de organización B2B;
- asociación barcode/test;
- procesamiento de muestras;
- visualización de dashboard/resultados;
- descarga de PDF/resumen.

Rol en Fase 1 tras respuesta API:

- sistema externo no integrado;
- fuente manual/externa de input genético para el equipo EPI10;
- no debe aparecer como integración automatizada en presupuesto.

Rol posible en Fase 2:

- integración API si TellmeGen habilita API real;
- o cambio/valoración de laboratorio alternativo con API si la integración genética automática se vuelve imprescindible.

---

## 6. Flujo manual actual descubierto con Aitor

Este es el flujo reconstruido a partir de la reunión con Aitor.

### 6.1 Entrada y compra

1. Cliente llega a la web de EPI10 Salud.
2. La web está actualmente en construcción.
3. El cliente rellena un formulario indicando que quiere comprar/contratar el servicio.
4. Desde ahí pasa a una pasarela de pago.
5. El cliente paga por adelantado.
6. El pago debería generar algún registro o activación en Odoo, o al menos EPI10 quiere que lo haga.
7. El sistema debería avisar al equipo, especialmente a Aitor, de que hay un nuevo servicio/test que gestionar.

Problemas:

- No está claro si la integración web/pago/Odoo ya existe o está por hacer.
- No está claro qué datos recoge la web y dónde quedan.
- No está claro cómo se dispara hoy la notificación a Aitor.
- Riesgo de que la entrada del cliente no cree de forma automática un flujo operativo.

### 6.2 Elección de modalidad de test

El cliente puede hacerse el test:

- en instalaciones de EPI10;
- o en su casa.

Implicaciones:

- hay que gestionar cita o coordinación logística;
- hay que comunicar instrucciones al cliente;
- hay que controlar estados diferentes;
- hay que saber si el kit está pendiente, enviado, recogido o realizado.

### 6.3 Compra/gestión de test en TellmeGen

Tras recibir un cliente pagado:

1. Aitor entra en TellmeGen.
2. Compra o solicita un test.
3. Pasa un tiempo hasta que el test/kit está disponible o llega.
4. Aitor comunica al cliente que puede pasarse o coordinar el test.
5. Se agenda o coordina la toma de muestra.

Problemas:

- acción manual de Aitor;
- dependencia del portal TellmeGen;
- posible falta de trazabilidad centralizada;
- comunicación con cliente no necesariamente centralizada;
- estados operativos no necesariamente sincronizados con Odoo.

### 6.4 Barcode y creación de usuario en TellmeGen

Cada test tiene un barcode único.

Cuando el test está hecho y EPI10 tiene el test con barcode:

1. Aitor entra en TellmeGen B2B.
2. Dentro de la organización de EPI10/TellmeGen, crea un nuevo usuario.
3. Introduce datos del usuario.
4. Asocia el barcode del kit/test a ese usuario.
5. Esto indica a TellmeGen que hay un usuario con test realizado pendiente de procesamiento.

Problemas:

- creación manual de usuario en TellmeGen;
- posible duplicación de datos con web/Odoo/Healthie;
- riesgo de errores al copiar datos;
- riesgo de errores con barcode;
- no hay API actual para automatizar.

### 6.5 Envío y procesamiento de muestra

1. EPI10 coordina el envío de tests ya realizados a TellmeGen.
2. TellmeGen recibe y procesa la muestra.
3. Tras un periodo, TellmeGen marca que el test está procesado/resultados disponibles.

Problemas:

- estado de muestra/resultados vive en TellmeGen;
- sin API no se puede consultar automáticamente;
- EPI10 depende de revisar el portal o de comunicaciones del proveedor;
- Odoo/Healthie no pueden actualizarse automáticamente desde TellmeGen.

### 6.6 Consumo de resultados TellmeGen

Dentro de TellmeGen, EPI10 puede ver:

- dashboard o mini-dashboard de resultados;
- varios ejes de análisis;
- información del análisis genético;
- PDF resumen / roundup con resultados en formato esquemático y codificado;
- tablas/resultados.

EPI10 usa estos outputs como input para producir su informe propio.

Problemas:

- resultados encerrados en portal TellmeGen;
- sin API;
- PDF se obtiene desde plataforma;
- no se puede alimentar automáticamente Healthie/Odoo;
- no se puede crear dashboard genética propia sin extracción manual o API futura.

### 6.7 Inputs adicionales del cliente

Además del resultado TellmeGen, EPI10 puede usar otros inputs opcionales.

Ejemplo mencionado:

- analítica del cliente.

Características:

- no se puede obligar al cliente a subir analítica;
- puede ser opcional;
- actualmente parece que se pide y recibe de forma manual;
- se procesa manualmente como input adicional.

Oportunidad:

- Healthie podría centralizar la subida de analíticas/documentos;
- el sistema podría notificar al equipo cuando una analítica está subida;
- Odoo podría marcar estado “analítica recibida”;
- se reduciría correo/documentación suelta.

### 6.8 Producción del informe final EPI10

EPI10 produce un informe final propio, con:

- datos/resultados de TellmeGen;
- PDF/resumen de TellmeGen;
- análisis discrecional del equipo EPI10;
- inputs adicionales opcionales como analíticas;
- plantilla/marca propia EPI10;
- dossier/informe final “bonito”.

El informe final es probablemente el entregable por el que el cliente paga.

Estado actual:

- se envía por correo.

Oportunidad:

- sistematizar producción del informe;
- usar plantillas;
- reducir pasos manuales;
- entregar el informe final dentro de Healthie;
- registrar entrega en Odoo;
- activar seguimiento.

### 6.9 Entrega y seguimiento

Actualmente:

- informe se envía por correo;
- comunicaciones pueden estar dispersas;
- seguimiento no está claro que esté centralizado.

Deseado:

- entregar informe en Healthie;
- que el cliente consulte documentos en un portal único;
- comunicación segura en Healthie;
- seguimiento en Healthie/Odoo;
- estados y tareas en Odoo;
- menos email suelto.

---

## 7. Dolor operativo principal

El dolor principal no es solo “no tenemos API TellmeGen”.

El dolor principal es:

> Aitor está actuando como middleware humano entre web, pago, Odoo, TellmeGen, cliente, documentos, analíticas, producción de informe y seguimiento.

Esto genera:

- dependencia de una persona;
- riesgo de errores;
- lentitud;
- falta de trazabilidad;
- difícil escalabilidad;
- operaciones repetitivas;
- dificultad para medir estados;
- experiencia cliente menos profesional;
- pérdida de tiempo en tareas administrativas;
- dificultad para crecer volumen.

La propuesta debe vender que el MVP reduce esa dependencia, aunque TellmeGen no pueda automatizarse todavía.

---

## 8. Problemas detectados / inventario inicial para Stage 01

Esta sección no decide todavía scope, pero lista problemas candidatos.

### P1. Web en construcción y entrada de cliente no cerrada

Descripción:

La web EPI10 está en desarrollo. Tendrá formulario y pago, pero aún no está claro cómo queda conectada con Odoo, Healthie o el flujo interno.

Quién lo sufre:

- Carmen, porque necesita operar;
- Aitor, porque recibe tareas manuales;
- cliente final, si la experiencia es confusa;
- equipo técnico, porque no hay sistema claro.

Impacto:

- riesgo de duplicar datos;
- riesgo de no disparar onboarding;
- retrasos tras el pago;
- mala trazabilidad de origen/estado.

Resoluble en MVP:

Sí, mediante integración web/pago -> Odoo/Healthie.

### P2. No hay portal cliente único

Descripción:

Actualmente la interacción parece estar fragmentada entre web, email, TellmeGen, posibles formularios, documentos y comunicaciones manuales.

Quién lo sufre:

- Carmen: mala experiencia cliente;
- Aitor: coordinación manual;
- cliente: dispersión y falta de claridad.

Impacto:

- experiencia poco profesional;
- pérdida de documentos;
- comunicaciones inseguras o dispersas;
- difícil seguimiento.

Resoluble en MVP:

Sí, con Healthie como portal cliente.

### P3. Formularios, consentimientos y cuestionarios no centralizados

Descripción:

Carmen quiere formularios, consentimientos y cuestionarios. Healthie/ContinuousCare pueden cubrirlo, pero aún no está configurado.

Impacto:

- riesgo legal/operativo;
- falta de trazabilidad;
- carga manual;
- experiencia fragmentada.

Resoluble en MVP:

Sí.

### P4. Analíticas opcionales llegan de forma manual

Descripción:

El cliente puede aportar analíticas, pero actualmente se piden/reciben/procesan manualmente.

Impacto:

- pérdida de tiempo;
- riesgo de pérdida documental;
- uso de canales inseguros;
- falta de trazabilidad.

Resoluble en MVP:

Sí, con subida de documentos en Healthie y notificaciones/estados.

### P5. Informe final se produce y entrega de forma poco sistematizada

Descripción:

El informe final se construye con resultados TellmeGen + criterio EPI10 + inputs opcionales. Actualmente se envía por correo.

Impacto:

- carga manual;
- riesgo de errores;
- poca trazabilidad de versión/entrega;
- experiencia cliente mejorable.

Resoluble en MVP:

Parcialmente sí:

- sistematizar plantilla/proceso;
- centralizar entrega en Healthie;
- registrar estado en Odoo;
- posiblemente automatizar partes del ensamblaje del informe si hay inputs estructurados suficientes.

No resoluble plenamente en MVP:

- generación automática completa del informe genético si TellmeGen no tiene API.

### P6. TellmeGen no tiene API disponible

Descripción:

TellmeGen confirmó que actualmente solo tienen plataforma profesional. API futura sin fecha.

Impacto:

- no se pueden integrar resultados genéticos automáticamente;
- no se pueden crear usuarios/barcodes automáticamente;
- no se puede recibir estado/resultados por API;
- no se puede hacer dashboard genética automatizada;
- el flujo TellmeGen seguirá externo.

Resoluble en MVP:

No como integración.

Mitigación:

- dejar TellmeGen fuera de integración Fase 1;
- centrar Fase 1 en portal/backoffice/automatizaciones alrededor;
- dejar API TellmeGen como Fase 2 condicionada;
- valorar proveedor alternativo con API si en futuro es crítico.

### P7. Odoo no actúa todavía como sistema operativo claro

Descripción:

Odoo debería ser backoffice, pero no está claro que actualmente concentre estados, tareas, responsables, pedidos y reporting.

Impacto:

- falta de control operativo;
- dependencia de Aitor;
- difícil seguimiento;
- poca visibilidad de dirección.

Resoluble en MVP:

Sí, configurando pipeline, estados, tareas, responsables, reporting y sincronización con Healthie/web.

### P8. Aitor recibe/ejecuta demasiadas acciones manuales

Descripción:

Aitor coordina compra/gestión de tests, comunicación, seguimiento, asociación de barcodes, revisión de resultados, inputs y entrega.

Impacto:

- cuello de botella humano;
- escalabilidad limitada;
- riesgo de errores;
- fatiga operativa.

Resoluble en MVP:

Parcialmente sí:

- automatizaciones web/pago/Odoo/Healthie;
- estados/tareas;
- notificaciones;
- centralización documental;
- menos emails;
- procesos claros.

No resoluble en MVP:

- eliminar completamente su trabajo en TellmeGen mientras no haya API.

### P9. Falta dashboard operativo

Descripción:

No parece existir una vista central donde ver todos los clientes por estado, próximos pasos, documentos pendientes, informes pendientes y seguimiento.

Impacto:

- baja visibilidad;
- tareas olvidadas;
- dependencia de memoria;
- dificultad para dirección.

Resoluble en MVP:

Sí, probablemente en Odoo, con vistas por estado/tareas y quizá dashboard simple.

### P10. Riesgo de datos sensibles en canales inadecuados

Descripción:

Se manejan datos de salud/genéticos y documentos como analíticas. Algunos intercambios actuales pueden ir por correo o procesos manuales.

Impacto:

- riesgo de protección de datos;
- mala trazabilidad;
- confianza baja;
- necesidad de DPA/roles/retención.

Resoluble en MVP:

Parcialmente:

- Healthie como canal más adecuado;
- minimización en Odoo;
- no copiar raw genético;
- control de permisos;
- documentación de procesos.

Debe tener revisión legal/DPO aparte.

### P11. Healthie/ContinuousCare aún no decidido

Descripción:

Healthie parece ganar, pero aún no hay decisión formal de plan, coste, API, residencia, soporte, marca blanca, etc.

Impacto:

- no se puede cerrar presupuesto exacto;
- riesgo de incompatibilidad;
- riesgo de coste Enterprise/API.

Resoluble en preventa:

Sí, con shortlist/validación.

### P12. Falta definición final del flujo operativo detallado

Descripción:

Aunque ya se conoce bastante el flujo actual, el flujo operativo definitivo del MVP debe diseñarse con EPI10 al inicio de ejecución.

Impacto:

- no conviene cerrar microdetalles en preventa;
- se necesita workshop de Fase 1.

Resoluble:

Sí, como primer bloque de ejecución.

---

## 9. Evolución de arquitectura: de ideal API-first a MVP realista sin TellmeGen API

### 9.1 Arquitectura ideal previa a confirmación TellmeGen

```text
Web EPI10
  -> Healthie / ContinuousCare
  -> Odoo backoffice
  <- TellmeGen/lab API
```

Esta arquitectura asumía que TellmeGen podía ofrecer API para:

- crear usuario;
- asociar barcode;
- consultar estado;
- recuperar resultados;
- descargar PDF;
- recibir webhooks.

### 9.2 Confirmación de restricción

TellmeGen no ofrece API actual.

Por tanto, la integración automática TellmeGen no se puede presupuestar como Fase 1.

### 9.3 Arquitectura MVP viable tras restricción

```text
Cliente
  -> Web EPI10 + pago
  -> Healthie como portal cliente
  -> Odoo como backoffice
  -> Equipo EPI10 produce informe final
  -> Healthie entrega informe final

TellmeGen
  = sistema externo no integrado en Fase 1
  = fuente de resultados consultada fuera del sistema
```

### 9.4 Qué significa “TellmeGen externo no integrado”

Significa:

- no se promete integración;
- no se vende automatización de resultados;
- no se diseña dashboard genética alimentada por API;
- TellmeGen sigue usándose por EPI10 como herramienta externa;
- el resultado final EPI10 sí puede entregarse en Healthie;
- Odoo puede trackear estados operativos de forma interna, pero no recibe datos de TellmeGen automáticamente.

### 9.5 Frase comercial recomendada

> Hemos validado que TellmeGen no dispone actualmente de una API operativa para partners. Por ello, no recomendamos condicionar el MVP a esa integración. La Fase 1 debe centrarse en ordenar y automatizar el flujo operativo alrededor del cliente: portal Healthie, formularios, consentimientos, analíticas, comunicación, entrega del informe final, Odoo como backoffice y tareas/estados internos. La integración con TellmeGen queda como Fase 2 condicionada a que el proveedor habilite API o a valorar un proveedor alternativo.

---

## 10. Qué NO se puede prometer ahora

Debido a la ausencia de API TellmeGen:

- no se puede crear automáticamente usuarios en TellmeGen;
- no se puede crear automáticamente tests en TellmeGen;
- no se puede asociar barcode automáticamente;
- no se puede consultar estado del test automáticamente;
- no se puede recibir notificación automática de resultado disponible;
- no se puede descargar automáticamente PDF TellmeGen;
- no se pueden extraer resultados genéticos estructurados;
- no se puede alimentar una dashboard genética en Healthie desde TellmeGen;
- no se puede generar el informe final automáticamente con datos TellmeGen si los datos no son accesibles por API;
- no se puede vender “integración TellmeGen Fase 1”.

Además, no se debe prometer:

- gemelo digital;
- interpretación genética automática;
- diagnóstico automatizado;
- plataforma sanitaria propia completa;
- app propia si Healthie cubre portal/app;
- cumplimiento legal absoluto sin asesoría especializada;
- automatización total del servicio.

---

## 11. Qué sí se puede proponer como Fase 1 viable

### 11.1 Portal cliente Healthie

Healthie como capa principal de relación con cliente:

- creación de perfil cliente/paciente;
- onboarding;
- formularios;
- consentimientos;
- cuestionarios;
- comunicación segura;
- subida de analíticas;
- documentos;
- entrega de informe final;
- seguimiento.

Valor:

- experiencia cliente centralizada;
- menos correo;
- trazabilidad documental;
- percepción profesional;
- base escalable.

### 11.2 Odoo como backoffice

Odoo como sistema interno:

- contactos;
- pedidos/pagos/facturación si aplica;
- estados del servicio;
- tareas internas;
- responsables;
- pipeline;
- reporting;
- seguimiento operativo.

Valor:

- visibilidad interna;
- control de cada cliente;
- tareas y estados claros;
- menos dependencia de memoria/Excel/email;
- base para dirección.

### 11.3 Integración web/pago -> Odoo/Healthie

Cuando un cliente compra o completa formulario:

- crear/actualizar contacto en Odoo;
- crear perfil en Healthie;
- lanzar onboarding;
- crear tarea interna;
- registrar estado inicial;
- enviar comunicación de bienvenida.

Valor:

- elimina pasos manuales iniciales;
- reduce errores;
- acelera arranque del servicio;
- mejora experiencia post-pago.

### 11.4 Healthie -> Odoo

Eventos posibles:

- onboarding iniciado;
- consentimiento completado;
- cuestionario completado;
- analítica subida;
- documento entregado;
- seguimiento activo.

Odoo podría recibir:

- estado;
- tarea;
- fecha;
- responsable;
- referencia/documento si procede;
- flag operativo sin duplicar datos sensibles.

Valor:

- Odoo no necesita contener todo el dato sensible;
- equipo ve estados;
- menos seguimiento manual.

### 11.5 Subida de analíticas y documentos

Cliente sube analíticas en Healthie.

Sistema:

- notifica al equipo;
- marca estado en Odoo;
- permite usar analítica como input del informe;
- evita correo.

Valor:

- reducción de riesgo documental;
- mejor experiencia cliente;
- trazabilidad.

### 11.6 Producción y entrega del informe final

Fase 1 puede sistematizar:

- estructura de plantilla;
- checklist de inputs;
- estados de producción;
- tareas internas;
- entrega en Healthie;
- notificación al cliente;
- registro en Odoo.

Puede explorar automatizaciones parciales:

- generación de portada/plantilla;
- ensamblaje de secciones fijas;
- control de versiones;
- tareas por estado;
- subida automática del PDF final a Healthie si se genera en una carpeta/sistema conectado.

Cuidado:

- no prometer generación automática del análisis genético si los datos TellmeGen no son accesibles;
- el criterio experto de EPI10 sigue siendo humano.

### 11.7 Seguimiento y comunicaciones

Healthie puede centralizar:

- mensajes;
- recordatorios;
- documentación;
- seguimiento posterior;
- posibles planes o recomendaciones.

Odoo puede centralizar:

- tareas internas;
- fechas clave;
- responsables;
- estados;
- reporting.

### 11.8 Dashboard operativo

No dashboard genética.

Sí dashboard operativo:

- clientes por estado;
- pendientes de onboarding;
- pendientes de consentimiento;
- pendientes de test;
- pendientes de analítica;
- pendientes de informe;
- informes entregados;
- seguimiento activo;
- tareas por responsable.

Probablemente en Odoo.

Valor:

- mucho ROI operativo;
- visibilidad para Carmen/equipo;
- menos caos.

---

## 12. Scope candidate: Fase 1 / Fase 2 / Fuera

Esta sección anticipa Stage 02, pero no debe considerarse decisión final hasta que el flujo lo revise.

### 12.1 Fase 1 candidata

Entra probablemente:

1. Workshop inicial de flujo operativo con EPI10.
2. Selección final Healthie vs ContinuousCare, con preferencia probable por Healthie.
3. Configuración Healthie como portal cliente.
4. Formularios de onboarding.
5. Consentimientos.
6. Cuestionarios.
7. Subida de analíticas/documentos por cliente.
8. Comunicación segura dentro del portal.
9. Entrega de informe final dentro de Healthie.
10. Configuración Odoo como backoffice operativo.
11. Pipeline/estados del servicio en Odoo.
12. Tareas internas y responsables.
13. Integración web/pago -> Odoo/Healthie.
14. Sincronización Healthie -> Odoo de estados/flags/tareas.
15. Automatizaciones de quality-of-life para Aitor/equipo.
16. Dashboard operativo básico.
17. Documentación interna del flujo.
18. Formación al equipo.
19. Soporte inicial.
20. Dejar TellmeGen registrado como sistema externo no integrado.

### 12.2 Fase 2 candidata

Podría entrar más adelante:

1. API TellmeGen si aparece.
2. Revisión del presupuesto/API antiguo de TellmeGen.
3. Integración con proveedor genético alternativo que sí tenga API.
4. Automatización avanzada de generación de informes.
5. Ingesta estructurada de resultados genéticos.
6. Dashboard genética/insights si hay datos estructurados.
7. Reporting avanzado.
8. BI o data warehouse.
9. Automatizaciones más profundas entre Odoo y Healthie.
10. Productización parcial del proceso.
11. Gemelo digital en fase futura, si tiene sentido.

### 12.3 Fuera de alcance explícito en Fase 1

1. Integración TellmeGen por API.
2. Extracción automática de resultados TellmeGen.
3. Descarga automática de PDF TellmeGen.
4. Dashboard genética alimentada por TellmeGen.
5. Interpretación genética automática.
6. Diagnóstico automatizado.
7. Gemelo digital.
8. Plataforma propia completa.
9. App móvil propia si Healthie cubre portal/app.
10. Sustituir asesoría legal/DPO.
11. Garantizar cumplimiento legal absoluto sin revisión especializada.
12. Cambiar de laboratorio sin decisión de negocio.

---

## 13. Objetivos de negocio probables

### 13.1 Operar cuanto antes

El objetivo principal de Carmen era empezar a operar de forma segura, ordenada y realista.

El MVP debe permitir que EPI10 pueda vender/operar el servicio con menos caos, aunque no tenga automatización genética completa.

### 13.2 No sobredimensionar

No crear plataforma desde cero.

No construir gemelo digital.

No hacer app propia.

No prometer integración que el proveedor no soporta.

### 13.3 Profesionalizar la experiencia cliente

Pasar de correo/formularios sueltos a un portal:

- onboarding;
- documentos;
- comunicación;
- informe;
- seguimiento.

### 13.4 Reducir carga manual del equipo

Especialmente Aitor.

No se podrá eliminar toda la operación TellmeGen, pero sí mucha operación alrededor:

- alta;
- onboarding;
- consentimientos;
- analíticas;
- tareas;
- entrega;
- seguimiento.

### 13.5 Tener trazabilidad

Estados claros:

- nuevo cliente;
- pago realizado;
- perfil creado;
- onboarding pendiente/completo;
- consentimiento pendiente/completo;
- analítica pendiente/recibida;
- test pendiente/en curso/resultados externos;
- informe en preparación;
- informe entregado;
- seguimiento activo;
- cerrado.

### 13.6 Preparar evolución futura

Aunque TellmeGen no tenga API ahora, el sistema debe quedar listo para conectar una API futura o un laboratorio alternativo.

---

## 14. Objetivos técnicos probables

1. Integrar web/pago con Odoo y/o Healthie.
2. Configurar Healthie como portal operativo del cliente.
3. Configurar Odoo como backoffice operativo.
4. Definir modelo de estados compartido.
5. Automatizar tareas y notificaciones.
6. Minimizar duplicación de datos sensibles.
7. Centralizar subida/entrega documental en Healthie.
8. Crear dashboard operativo en Odoo.
9. Documentar procesos.
10. Dejar puntos de extensión para API TellmeGen futura.

---

## 15. Posible arquitectura funcional tras confirmación sin API TellmeGen

```text
[Cliente]
   |
   v
[Web EPI10 + pago]
   |
   | payment_success / lead_created
   v
[Middleware / API sync]
   |                  \
   |                   \
   v                    v
[Odoo Backoffice]     [Healthie Portal Cliente]
   |                    |
   |                    | formularios, consentimientos,
   |                    | cuestionarios, analíticas,
   |                    | mensajes, informe final
   |                    v
   |                  [Cliente]
   |
   v
[Dashboard operativo / tareas / estados]

[TellmeGen B2B]
   = sistema externo no integrado en Fase 1
   = usado por EPI10 para gestionar tests/resultados hasta API futura
```

### 15.1 Módulos funcionales Fase 1

#### M1. Entrada web/pago

- captura lead;
- procesa pago;
- confirma compra;
- dispara creación de cliente.

#### M2. Portal cliente Healthie

- perfil cliente;
- formulario;
- consentimiento;
- cuestionario;
- documentos;
- analíticas;
- comunicación;
- informe final;
- seguimiento.

#### M3. Backoffice Odoo

- cliente;
- pedido;
- estado;
- tareas;
- responsable;
- fechas;
- reporting.

#### M4. Automatizaciones / middleware

- web -> Healthie;
- web -> Odoo;
- Healthie -> Odoo;
- Odoo -> Healthie si procede;
- notificaciones internas;
- actualización de estados.

#### M5. Informe final

- plantilla/proceso;
- checklist de inputs;
- estado de producción;
- entrega en Healthie;
- registro en Odoo.

#### M6. Seguimiento

- recordatorios;
- tareas;
- comunicación;
- estados post-informe.

### 15.2 TellmeGen como módulo externo no integrado

En Fase 1:

- no se integra;
- no se automatiza;
- no se usan APIs inexistentes;
- puede haber estado interno en Odoo tipo “pendiente resultado externo” o “resultado externo disponible”, pero esa actualización dependerá de operación humana fuera del sistema.

Esto debe explicarse con cuidado:

- no como “vamos a hacer semimanual”;
- sino como “TellmeGen queda fuera de integración al no disponer de API”.

---

## 16. Estados operativos sugeridos para Odoo

Estados posibles:

1. Lead recibido.
2. Pago pendiente.
3. Pago confirmado.
4. Cliente creado en Healthie.
5. Onboarding enviado.
6. Onboarding iniciado.
7. Consentimiento pendiente.
8. Consentimiento completado.
9. Cuestionario pendiente.
10. Cuestionario completado.
11. Analítica opcional pendiente.
12. Analítica recibida.
13. Test pendiente de coordinación.
14. Test en instalaciones.
15. Test en domicilio.
16. Kit/test pendiente.
17. Muestra realizada.
18. Muestra enviada a laboratorio.
19. Resultado externo pendiente.
20. Resultado externo disponible.
21. Informe en preparación.
22. Informe en revisión.
23. Informe entregado en Healthie.
24. Seguimiento activo.
25. Cerrado.
26. Incidencia.

Nota:

- Algunos estados dependen de TellmeGen y no podrán actualizarse automáticamente sin API.
- Aun así, Odoo puede servir para trazabilidad operativa interna.
- Se debe evitar convertir Odoo en repositorio de datos genéticos crudos.

---

## 17. Eventos/automatizaciones candidatas

### 17.1 Pago confirmado

Trigger:

- payment_success desde web/pasarela.

Acciones:

- crear/actualizar contacto en Odoo;
- crear pedido/factura si aplica;
- crear cliente en Healthie;
- enviar email de bienvenida o invitación Healthie;
- crear tarea interna “nuevo cliente pagado”; 
- cambiar estado a “Pago confirmado / onboarding enviado”.

### 17.2 Cliente completa formulario Healthie

Trigger:

- formulario completado.

Acciones:

- actualizar estado Odoo;
- crear tarea de revisión;
- notificar a Aitor/equipo;
- registrar fecha.

### 17.3 Consentimiento completado

Trigger:

- consentimiento firmado/aceptado.

Acciones:

- marcar consentimiento completado;
- bloquear siguientes pasos si falta;
- registrar versión/fecha si Healthie lo permite;
- actualizar Odoo.

### 17.4 Analítica subida

Trigger:

- documento subido en Healthie.

Acciones:

- notificar equipo;
- marcar “analítica recibida”; 
- crear tarea de revisión;
- asociar referencia en Odoo.

### 17.5 Informe final listo

Trigger:

- informe final generado/aprobado.

Acciones:

- subir documento a Healthie;
- avisar cliente;
- actualizar Odoo a “informe entregado”; 
- crear tarea de seguimiento;
- registrar fecha y versión.

### 17.6 Seguimiento

Trigger:

- informe entregado + calendario/reglas.

Acciones:

- recordatorios;
- tareas internas;
- mensajes al cliente;
- estado “seguimiento activo”.

---

## 18. Producción del informe final: área de oportunidad clave

El informe final es central porque es el entregable del producto.

### 18.1 Inputs del informe

- resultados/dashboard/PDF TellmeGen;
- tabla/resumen de resultados;
- analíticas opcionales;
- formularios/cuestionarios Healthie;
- criterio experto del equipo EPI10;
- plantilla/marca EPI10;
- posibles recomendaciones.

### 18.2 Problema actual

- producción manual;
- Aitor/equipo hacen mucho a mano;
- informe se envía por correo;
- proceso no parece trazado en sistema;
- riesgo de errores/versiones.

### 18.3 Qué se puede mejorar sin API TellmeGen

- crear checklist de inputs;
- organizar estados de informe en Odoo;
- centralizar inputs de cliente en Healthie;
- definir plantilla de informe;
- automatizar partes fijas del documento;
- facilitar subida/entrega en Healthie;
- registrar versiones;
- notificar cliente;
- activar seguimiento.

### 18.4 Qué no se puede automatizar sin API TellmeGen

- ingerir datos genéticos estructurados;
- generar automáticamente gráficos/resultados desde TellmeGen;
- descargar PDF de TellmeGen automáticamente;
- producir informe completo sin intervención humana.

### 18.5 Potencial comercial

Esta área puede ser uno de los grandes valores de la propuesta:

> Aunque TellmeGen siga externo, podemos profesionalizar el proceso de producción y entrega del informe final, reduciendo fricción, dispersión y errores.

---

## 19. Healthie vs ContinuousCare: lectura actual

### 19.1 Healthie

Percepción actual:

- parece favorito o “gana entera” según la reunión;
- encaja como portal cliente;
- tiene API más clara según research previo;
- ofrece formularios, portal, comunicación, documentos;
- puede servir para centralizar la experiencia cliente.

Riesgos:

- coste/plan;
- API posiblemente en planes superiores;
- residencia de datos/GDPR;
- orientación a mercado US/HIPAA;
- idioma/UX;
- datos genéticos y DPA.

### 19.2 ContinuousCare

Percepción actual:

- alternativa;
- potencialmente más alineada con nubes regionales/UE;
- API pública menos clara;
- requiere demo/validación.

Riesgos:

- no saber si su API cubre lo necesario;
- pricing no claro;
- capacidades específicas de formularios/documentos/consentimientos.

### 19.3 Decisión probable

Para Fase 1, probablemente conviene priorizar Healthie si:

- encaja comercialmente;
- acepta tratamiento de datos requerido;
- tiene plan/API adecuados;
- permite portal y documentos;
- permite integrarse con Odoo/web.

ContinuousCare queda como backup si Healthie falla por coste, residencia o condiciones.

---

## 20. Seguridad, privacidad y datos sensibles

EPI10 maneja:

- datos personales;
- datos de salud;
- datos genéticos;
- analíticas;
- informes/recomendaciones.

Principios a mantener:

1. Minimización.
2. No duplicar datos genéticos crudos en Odoo.
3. Usar Healthie/portal para documentos sensibles si cumple condiciones.
4. Odoo debe guardar estado operativo, no necesariamente todo el contenido clínico/genético.
5. Control de accesos por roles.
6. MFA si está disponible.
7. DPA con proveedores.
8. Revisión legal/DPO si EPI10 lo requiere.
9. Infraestructura UE/España cuando sea posible.
10. No prometer cumplimiento legal absoluto desde preventa.

Posible distribución de datos:

| Dato | Sistema preferente | Nota |
| --- | --- | --- |
| Contacto cliente | Odoo + Healthie | sincronización mínima |
| Pago/pedido | Odoo/web | según pasarela |
| Consentimiento | Healthie | Odoo puede recibir estado/fecha |
| Cuestionarios | Healthie | Odoo recibe flag/resumen operativo |
| Analíticas | Healthie | evitar correo |
| Resultados TellmeGen | TellmeGen externo | no integrar Fase 1 |
| Informe final EPI10 | Healthie | Odoo registra estado/versión |
| Tareas internas | Odoo | responsables/fechas |

---

## 21. Preguntas abiertas críticas

### 21.1 Sobre Healthie

1. ¿Qué plan necesitarían para API, formularios, documentos, comunicación y soporte?
2. ¿Cuánto cuesta por usuario/cliente/paciente?
3. ¿Incluye marca blanca?
4. ¿Incluye portal/app?
5. ¿Permite español o personalización de idioma?
6. ¿Permite subir documentos/analíticas por parte del cliente?
7. ¿Permite entregar informes finales al cliente?
8. ¿Permite webhooks o API para crear cliente desde web/Odoo?
9. ¿Permite exportar datos?
10. ¿Qué DPA/GDPR/residencia ofrece?
11. ¿Puede usarse con datos genéticos/informes genéticos?

### 21.2 Sobre Odoo

1. ¿Qué versión/modalidad usan?
2. ¿Qué módulos tienen activos?
3. ¿Está en producción?
4. ¿Dónde está alojado?
5. ¿Tienen API disponible?
6. ¿Quién lo configura/mantiene?
7. ¿Está conectado a web/pago?
8. ¿Debe gestionar facturación/pedidos?
9. ¿Debe gestionar envíos/logística?
10. ¿Qué reporting quieren?

### 21.3 Sobre web/pago

1. ¿En qué tecnología está la web?
2. ¿Quién la desarrolla?
3. ¿Qué pasarela de pago?
4. ¿El pago ya está implementado?
5. ¿El formulario recoge datos sensibles?
6. ¿Puede disparar webhooks/API?
7. ¿La web debe derivar a Healthie después del pago?
8. ¿Se mantiene formulario web o se mueve onboarding a Healthie?

### 21.4 Sobre TellmeGen

Aunque ya sabemos que no hay API actual:

1. ¿Pueden compartir el presupuesto/API antiguo?
2. ¿Qué alcance tenía esa API propuesta?
3. ¿Cuál sería coste/plazo si se retomara?
4. ¿Qué endpoints contemplaba?
5. ¿Quién decide en TellmeGen?
6. ¿Hay posibilidad real a corto/medio plazo?
7. ¿Hay alternativa de exportación estructurada no manual?
8. ¿Hay partner premium con API?

### 21.5 Sobre informe final

1. ¿Cuál es la plantilla actual?
2. ¿En qué formato se produce?
3. ¿Quién lo genera?
4. ¿Cuánto tarda?
5. ¿Qué partes son fijas?
6. ¿Qué partes dependen de TellmeGen?
7. ¿Qué partes dependen de criterio experto?
8. ¿Se puede parametrizar parcialmente?
9. ¿Qué input exacto del PDF TellmeGen se usa?
10. ¿Dónde se guarda el informe final?
11. ¿Qué versión se entrega al cliente?

### 21.6 Sobre volumen y ROI

1. ¿Cuántos clientes iniciales esperan al mes?
2. ¿Cuántos clientes a 6 meses?
3. ¿Cuántas horas dedica Aitor por cliente?
4. ¿Cuántas horas se dedican a comunicaciones/documentos?
5. ¿Cuántas horas a informe?
6. ¿Cuánto valor tiene reducir errores?
7. ¿Qué capacidad adicional permitiría el MVP?

---

## 22. Buyer priority simplificada

No complicar con una matriz consultora excesiva.

Prioridad:

1. Carmen.
2. Aitor.
3. Tomás solo para ROI/coste.

### 22.1 Carmen

Usar su email como fuente principal de expectativas.

Preguntar siempre:

- ¿esto ayuda a operar de forma segura y ordenada?
- ¿esto evita construir desde cero?
- ¿esto es vendible como Fase 1 práctica?
- ¿esto cabe en una propuesta clara?

### 22.2 Aitor

Usar su flujo real para detectar problemas.

Preguntar:

- ¿esto reduce pasos manuales?
- ¿esto reduce dependencia de Aitor?
- ¿esto evita errores?
- ¿esto mejora trazabilidad?

### 22.3 Tomás

Usar solo para justificar ROI.

Una slide/sección puede decir:

- reducción de horas administrativas;
- menos errores manuales;
- capacidad de gestionar más clientes;
- entrega más profesional;
- base escalable.

No hace falta modelar todo con precisión extrema antes de presupuesto. Puede hacerse un ROI razonable con supuestos explícitos.

---

## 23. ROI operativo: ideas para propuesta

No inventar cifras cerradas si no hay datos.

Sí se puede plantear un ROI cualitativo/cuantitativo estimado con supuestos.

Áreas de ahorro:

1. Alta de cliente/pedido.
2. Envío de onboarding.
3. Seguimiento de consentimiento/cuestionario.
4. Recepción de analíticas.
5. Comunicación con cliente.
6. Entrega de informe.
7. Recordatorios y seguimiento.
8. Control de estados.
9. Menos búsqueda de información.
10. Menos errores de copia/duplicación.

Ejemplo de framing:

> Si actualmente Aitor dedica X minutos por cliente a coordinación manual, y el MVP reduce un porcentaje relevante de esas tareas, EPI10 gana capacidad operativa sin aumentar equipo y reduce riesgo de error.

Cuidado:

- No prometer ahorro por automatización TellmeGen porque no hay API.
- Sí prometer ahorro alrededor de portal/backoffice/documentos/comunicaciones.

---

## 24. Propuesta comercial: narrativa recomendada

Narrativa central:

> Tras revisar el flujo real de EPI10, la Fase 1 debe centrarse en profesionalizar la relación con el cliente y ordenar la operación interna, no en construir una plataforma propia completa ni en condicionar el MVP a una API de TellmeGen que hoy no está disponible.

Estructura de propuesta:

1. Diagnóstico.
2. Qué hemos descubierto.
3. Restricción TellmeGen.
4. Nuevo enfoque viable.
5. Arquitectura Fase 1.
6. Alcance.
7. Fuera de alcance.
8. Fases.
9. Timeline.
10. Costes.
11. ROI operativo.
12. Próximos pasos.

Mensajes clave:

- “No construimos desde cero.”
- “Healthie centraliza la experiencia cliente.”
- “Odoo organiza la operación interna.”
- “TellmeGen queda como sistema externo hasta que exista API.”
- “El MVP reduce el caos operativo aunque no integre TellmeGen.”
- “La integración genética queda como Fase 2 condicionada al proveedor.”

---

## 25. Blueprint técnico de preventa: qué debería contener

El blueprint debe ir antes que la propuesta comercial.

Motivo:

- la propuesta comercial debe apoyarse en una solución técnica concreta;
- no se puede vender bien sin saber módulos, flujos, datos, integraciones y exclusiones;
- el blueprint de preventa no debe ser plan de implementación completo.

Debe incluir:

1. Arquitectura funcional.
2. Sistemas implicados.
3. Roles de usuario.
4. Flujos principales.
5. Estados operativos.
6. Automatizaciones candidatas.
7. Datos y dónde viven.
8. Integraciones.
9. Dependencias.
10. Restricciones.
11. Riesgos.
12. Fases.
13. Entregables.
14. Supuestos.
15. Qué queda para ejecución.

No debe incluir todavía:

- lista exhaustiva de issues;
- estructura definitiva de repositorio;
- tareas atómicas;
- código;
- implementación detallada.

---

## 26. Proceso de trabajo acordado para `spec-driving`

El curso de acción validado:

```text
1. Problem Audit
   Qué problemas reales hemos detectado y cuáles podemos resolver.

2. Scope Decision
   Qué entra en Fase 1 y qué no.
   Prioridad: Carmen.
   Aitor como dolor operativo.
   Tomás solo para ROI.

3. Technical Pre-Sales Blueprint
   Diseño funcional-técnico suficiente para vender y cotizar.

4. Commercial Proposal
   Traducción del blueprint a narrativa, fases, precio, timing y ROI.

5. Execution Plan
   Solo si se vende o está muy caliente.
```

Esto coincide con el enfoque del flujo `spec-driving`.

Notas de decisión:

- El blueprint técnico de preventa debe ir antes que la propuesta comercial.
- El ROI entra en la propuesta comercial.
- El plan de ejecución completo no se hace gratis antes de cerrar venta.
- Stage 06 debe permanecer deshabilitado salvo decisión explícita.

---

## 27. Riesgos principales

### R1. Healthie no encaja por coste/residencia/contrato

Mitigación:

- validar plan/coste/DPA;
- mantener ContinuousCare/equivalente como alternativa;
- no construir propio salvo necesidad.

### R2. Odoo está menos preparado de lo esperado

Mitigación:

- incluir configuración Odoo como parte de Fase 1;
- acotar módulos;
- no sobrepersonalizar.

### R3. Web/pago no está lista

Mitigación:

- coordinar con quien desarrolla web;
- definir contrato de integración;
- quizá usar Healthie para onboarding tras pago.

### R4. TellmeGen sin API limita automatización genética

Mitigación:

- dejar fuera de Fase 1;
- no vender integración;
- Fase 2 condicionada;
- valorar API futura/presupuesto antiguo.

### R5. El cliente espera más automatización genética de la que es viable

Mitigación:

- explicar con claridad;
- enseñar valor alternativo;
- separar Fase 1 de Fase 2.

### R6. Datos sensibles mal ubicados

Mitigación:

- minimización;
- Healthie como repositorio cliente/documental;
- Odoo solo estados/referencias;
- revisión legal.

### R7. Scope creep hacia gemelo digital

Mitigación:

- declarar fuera de alcance;
- roadmap futuro;
- no incluir en Fase 1.

### R8. Demasiada dependencia de Aitor incluso tras MVP

Mitigación:

- automatizar alrededor;
- documentar proceso;
- dashboard/tareas;
- formación de equipo;
- no prometer eliminar TellmeGen manual.

---

## 28. Supuestos actuales

### Confirmados o muy probables

- EPI10 quiere no construir desde cero.
- Carmen prioriza Fase 1 práctica.
- Healthie/ContinuousCare son herramientas candidatas.
- Healthie parece preferida tras reunión.
- Odoo es backoffice deseado.
- TellmeGen es proveedor/plataforma genética usada actualmente.
- TellmeGen no tiene API disponible ahora.
- La operación actual tiene mucha manualidad.
- El informe final EPI10 es entregable clave.
- Healthie podría ser portal para formularios, analíticas e informes.

### Supuestos razonables pero no cerrados

- Web tendrá pago integrado.
- Odoo gestionará pedidos/facturación.
- Healthie tendrá API suficiente para integrarse.
- EPI10 aceptará dejar TellmeGen fuera de integración Fase 1.
- Aitor quiere reducir manualidad.
- Carmen aceptará el nuevo framing si se explica bien.

### Desconocidos

- coste real Healthie;
- plan Healthie necesario;
- disponibilidad de API Healthie en plan;
- DPA/residencia Healthie;
- estado exacto Odoo;
- tecnología web;
- volumen clientes;
- horas manuales actuales;
- estructura actual de informe;
- plazo/coste API TellmeGen futura.

---

## 29. Frases útiles para propuesta o conversación

### Sobre la ausencia de API TellmeGen

> Hemos confirmado que TellmeGen no dispone actualmente de API operativa para partners. Por tanto, no recomendamos incluir esa integración en Fase 1 ni condicionar el MVP a una capacidad que depende del proveedor.

### Sobre el nuevo enfoque MVP

> La Fase 1 debe centrarse en lo que sí podemos controlar: portal cliente, formularios, consentimientos, subida de analíticas, comunicación, entrega de informe, Odoo como backoffice y automatizaciones operativas.

### Sobre Healthie

> Healthie puede actuar como capa principal de relación con cliente, concentrando onboarding, documentos, comunicación y seguimiento.

### Sobre Odoo

> Odoo debe quedar como backoffice interno, con estados, tareas, responsables, pedidos/facturación y reporting operativo.

### Sobre TellmeGen

> TellmeGen queda como sistema externo no integrado en esta primera fase, y la integración pasa a Fase 2 si el proveedor habilita API o se valora un laboratorio alternativo.

### Sobre valor para Aitor

> Aunque TellmeGen siga siendo externo, podemos reducir una parte importante de la carga manual que hoy recae en Aitor alrededor de altas, seguimiento, documentación, comunicaciones e informe final.

### Sobre Tomás/ROI

> El ROI no viene solo de automatizar datos genéticos; viene de reducir horas manuales, errores y dispersión operativa, y de permitir gestionar más clientes con el mismo equipo.

---

## 30. Qué debería hacer Stage 00 con este documento

Stage 00 debería extraer:

- resumen del proyecto;
- actores;
- hechos confirmados;
- supuestos;
- contradicciones;
- dolores;
- restricciones;
- objetivos;
- preguntas abiertas;
- áreas candidatas de alcance;
- fuera de alcance;
- mapa de fuentes.

Especial atención:

- no confundir “TellmeGen no tiene API” con “el proyecto no es viable”;
- no volver a proponer integración semimanual TellmeGen;
- no rebajar Healthie a formulario;
- no convertir Odoo en portal cliente;
- no hacer propuesta comercial antes del blueprint;
- priorizar Carmen para decisión de scope;
- usar Aitor para problem audit;
- usar Tomás solo para ROI.

---

## 31. Posible material complementario a añadir a `raw/`

Además de este archivo, sería útil añadir si existen:

1. Email original de Carmen.
2. PDF o copia del hilo con Aitor y respuesta TellmeGen.
3. Captura/resumen de respuesta TellmeGen.
4. Entregables v2 previos.
5. Notas de reunión con Aitor si se escriben aparte.
6. Cualquier información sobre Odoo.
7. Cualquier precio/demo de Healthie.
8. Plantilla actual de informe final EPI10.
9. Campos del formulario web.
10. Mapa actual de módulos Odoo.

---

## 32. Recomendación actual para avanzar

No hacer otra arquitectura ideal.

Ahora toca:

1. Stage 00: ordenar contexto.
2. Stage 01: auditar problemas reales.
3. Stage 02: decidir MVP sin TellmeGen API.
4. Stage 03: blueprint técnico de preventa.
5. Stage 04: propuesta comercial con ROI operativo.

La pregunta central ya no es:

> ¿Cómo integramos TellmeGen?

La pregunta correcta ahora es:

> ¿Qué MVP de alto valor podemos entregar para EPI10 aunque TellmeGen no tenga API?

Respuesta probable:

> Portal cliente Healthie + backoffice Odoo + automatizaciones web/pago/Healthie/Odoo + proceso sistematizado de informe final + seguimiento, dejando TellmeGen como fuente externa no integrada hasta Fase 2.

---

## 33. Apéndice A — Wording enviado/adaptado para TellmeGen en español

Este texto fue preparado para que Aitor pudiera consultar a su comercial de TellmeGen:

> Hola,
>
> Estamos trabajando en la mejora y sistematización de nuestra operativa interna alrededor de la plataforma B2B de TellmeGen.
>
> Como parte de este proceso, nos gustaría entender qué opciones de integración están disponibles para partners B2B que necesitan conectar los datos de TellmeGen con sus propios sistemas operativos.
>
> En concreto, nos gustaría saber si TellmeGen ofrece API, webhooks, capa de integración para partners, entorno sandbox o cualquier otro mecanismo técnico que permita acceder y gestionar de forma programática información como la siguiente:
>
> - Crear o registrar usuarios/clientes dentro de nuestra organización B2B.
> - Asociar un usuario/cliente a un kit de test o barcode específico.
> - Consultar o monitorizar el estado de un test.
> - Saber cuándo una muestra ha sido recibida, procesada o completada.
> - Acceder a metadatos de resultados.
> - Recuperar resultados genéticos estructurados, si estuvieran disponibles.
> - Descargar o acceder al PDF/informe final generado por TellmeGen.
> - Recibir notificaciones o webhooks cuando los resultados estén disponibles.
> - Entender qué datos pueden almacenarse o visualizarse en nuestros propios sistemas internos o en nuestro portal de cliente.
>
> También agradeceríamos que nos pudieran compartir cualquier documentación técnica disponible, documentación de API, acceso a sandbox, método de autenticación, límites de uso, permisos, requisitos contractuales o condiciones económicas relacionadas con integraciones B2B.
>
> Nuestro objetivo es evitar la gestión manual de resultados y construir una integración segura, escalable y conforme entre TellmeGen y nuestro propio flujo operativo.
>
> Muchas gracias de antemano.
>
> Un saludo,

Respuesta obtenida:

> Por el momento, únicamente disponemos de la plataforma profesional. También es cierto que el equipo de IT quiere migrar estas interacciones a APIs en un futuro; pero no sabría deciros el deadline sobre el que estaríamos hablando, ya que por el momento existen otras prioridades desde dirección. No obstante, tenemos un presupuesto de API que realizó el equipo de IT hace un tiempo. Tendrían que revisarlo. Lo comparto al nuevo director de IT y os lo paso.

Lectura:

- No hay API actual disponible.
- API futura incierta.
- Puede existir una vía comercial/custom futura, pero no para presupuestar Fase 1 inmediata.

---

## 34. Apéndice B — Decisiones que NO deben olvidarse

1. La Fase 0/preventa no se cobra al cliente.
2. La preventa sirve para poder presupuestar bien.
3. Healthie/ContinuousCare son capa cliente, no accesorio.
4. Odoo es backoffice, no portal sanitario.
5. TellmeGen es fuente externa de datos genéticos, pero sin API actual.
6. No vender integración TellmeGen Fase 1.
7. No vender semimanual como integración.
8. Fase 1 sigue viva sin TellmeGen API.
9. Valor Fase 1 = portal + backoffice + QoL automations + informe final + seguimiento.
10. Blueprint de preventa antes que propuesta comercial.
11. Tomás solo para ROI.
12. Carmen manda en scope.
13. Aitor manda en pain operativo.
14. No ejecutar Stage 06 salvo decisión explícita.

---

## 35. Apéndice C — Output esperado tras el flujo

Si el flujo funciona bien, debería producir algo parecido a:

### Stage 00

Contexto consolidado:

- quién es quién;
- qué quiere Carmen;
- qué hace Aitor;
- qué existe técnicamente;
- qué no existe;
- qué restricciones hay.

### Stage 01

Problemas reales priorizados:

- manualidad operativa;
- falta portal cliente;
- falta backoffice operativo claro;
- informe final no sistematizado;
- datos/documentos dispersos;
- TellmeGen sin API.

### Stage 02

Scope MVP:

- Healthie portal;
- Odoo backoffice;
- web/pago integration;
- automatizaciones operativas;
- informe final en Healthie;
- TellmeGen fuera de integración.

### Stage 03

Blueprint técnico-funcional:

- módulos;
- flujos;
- estados;
- integraciones;
- datos;
- fases;
- riesgos;
- dependencias.

### Stage 04

Propuesta comercial:

- narrativa clara;
- alcance;
- fases;
- timeline;
- pricing placeholders o números;
- ROI operativo;
- riesgos;
- próximos pasos.

---

## 36. Cierre

El proyecto se puede salvar y puede ser comercialmente atractivo.

La clave es no empeñarse en vender la parte que TellmeGen no permite ahora.

El MVP debería venderse como:

> una primera capa operativa profesional para EPI10 basada en Healthie y Odoo, diseñada para ordenar la relación con el cliente, reducir carga manual del equipo, centralizar documentos e informes, y preparar el sistema para una futura integración genética si el proveedor habilita API.

El proyecto no es “API TellmeGen o nada”.

El proyecto es:

> sacar a EPI10 del caos operativo inicial y darle un sistema operativo mínimo, profesional y escalable.

