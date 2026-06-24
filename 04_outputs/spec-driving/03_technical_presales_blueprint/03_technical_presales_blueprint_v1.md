# 03 - Technical Pre-Sales Blueprint v1

## Blueprint Summary

Este blueprint traduce la decisión MVP aprobada en Stage 02 v2 a una solución técnico-funcional de preventa.

La Fase 1 propuesta para EPI10 Salud debe construir un sistema operativo inicial alrededor de:

- portal cliente, con Healthie como hipótesis principal y ContinuousCare/equivalente como alternativa;
- Odoo como backoffice operativo;
- integración mínima web/pago -> Odoo/portal;
- automatizaciones operativas para reducir carga manual de Aitor/equipo;
- proceso sistematizado de informe final;
- trazabilidad documental y de estados;
- estimación preliminar de costes externos recurrentes;
- TellmeGen como sistema externo no integrado en Fase 1. [SRC-001, SRC-002]

Este documento no es un plan de ejecución detallado. No incluye backlog, issues atómicos, estructura de repositorio ni despliegue completo. Su función es dar suficiente claridad para preparar propuesta comercial, fases, riesgos, dependencias y estimación de coste.

## Grounding in Approved Scope

| Decisión Stage 02 v2 | Traducción en blueprint | Fuente |
| --- | --- | --- |
| Healthie como candidato principal de portal cliente | Diseñar portal cliente sobre Healthie como hipótesis base, dejando ContinuousCare/equivalente como alternativa si falla coste/API/DPA/residencia/idioma | SRC-001, SRC-002 |
| Odoo como backoffice | Odoo concentra estados, tareas, responsables, reporting operativo y referencias, no datos genéticos crudos | SRC-001, SRC-002 |
| Web/pago integrado con Odoo/portal | Definir un contrato mínimo de evento post-lead/post-pago para crear/actualizar cliente, caso, tareas e invitación al portal | SRC-002 |
| Automatizaciones QoL para Aitor/equipo | Automatizar altas, estados, tareas, recordatorios, avisos documentales e informe final, sin prometer automatización TellmeGen | SRC-002 |
| Informe final sistematizado | Definir checklist, estados, responsables, revisión, entrega en portal y registro en Odoo | SRC-002 |
| TellmeGen fuera de integración Fase 1 | Mantener TellmeGen como sistema externo operado manualmente; no presupuestar API ni dashboard genética en Fase 1 | SRC-002 |
| Workshop de arranque acotado | Incluir una única sesión de 3 horas al inicio de Fase 1 con checklist previo y outputs concretos | SRC-002 |
| Estimación preliminar de licencias | Incluir baseline de costes externos, separando licencias, API/add-ons, Odoo, middleware, soporte y legal/DPO | SRC-001 |

## Target Architecture

Arquitectura objetivo de Fase 1:

```text
[Cliente final]
   |
   v
[Web EPI10 + formulario/pago]
   |
   | lead_created / payment_success
   v
[Capa de integración / automatizaciones]
   |                         |
   |                         |
   v                         v
[Odoo Backoffice]       [Healthie / Portal cliente]
   |                    onboarding, formularios,
   |                    consentimientos, cuestionarios,
   |                    analíticas, comunicación,
   |                    informe final, seguimiento
   |
   v
[Estados, tareas, responsables, dashboard operativo]

[TellmeGen B2B]
   = sistema externo no integrado en Fase 1
   = usado por EPI10 para gestionar tests/resultados
```

Principios de arquitectura:

- Healthie/portal gestiona la interacción sensible con cliente.
- Odoo gestiona operación interna, estados, tareas y reporting.
- La capa de integración sincroniza eventos mínimos y evita doble entrada.
- TellmeGen se mantiene fuera de integración automática hasta que exista API real.
- Odoo no debe almacenar datos genéticos crudos.
- El informe final EPI10 se entrega en el portal y queda registrado operativamente en Odoo.

## Systems and Modules

### M1. Workshop de arranque operativo

Una única sesión de 3 horas dentro de Fase 1.

Entradas esperadas de EPI10:

- flujo actual resumido;
- estados deseados;
- formularios/cuestionarios existentes;
- consentimientos o textos legales disponibles;
- plantilla o ejemplo de informe final;
- documentos/analíticas habituales;
- datos actuales de Odoo, web y pago;
- usuarios/roles implicados.

Outputs:

- mapa operativo Fase 1;
- estados definitivos;
- responsables;
- puntos de automatización;
- datos/documentos por sistema;
- decisiones iniciales de configuración.

### M2. Web EPI10 + pago

Rol:

- captación;
- formulario inicial;
- pago;
- disparo del flujo operativo.

Contrato mínimo esperado:

- evento de lead o pago confirmado;
- datos mínimos de contacto;
- identificador de pedido/pago si existe;
- consentimiento para derivar a onboarding si aplica;
- endpoint/webhook/export compatible con integración.

Estado actual: web en construcción y contrato de integración Unknown. [SRC-002]

### M3. Portal cliente

Hipótesis principal: Healthie.

Alternativa: ContinuousCare/equivalente si Healthie falla en coste, residencia, DPA, idioma, API o requisitos funcionales.

Responsabilidades:

- perfil cliente/paciente;
- onboarding;
- formularios;
- consentimientos;
- cuestionarios;
- subida de analíticas/documentos;
- comunicación segura;
- entrega del informe final;
- seguimiento.

### M4. Odoo backoffice

Responsabilidades:

- cliente/contacto;
- pedido/pago/facturación si aplica;
- caso/servicio EPI10;
- estados operativos;
- tareas internas;
- responsables;
- fechas clave;
- reporting y dashboard operativo;
- referencias a documentos sensibles sin duplicar contenido clínico/genético.

Estado actual: Odoo existe o está previsto, pero versión, módulos, hosting, API, permisos y preparación real son Unknown. [SRC-002]

### M5. Capa de integración / automatizaciones

Puede implementarse con middleware, automatización low-code o integración ligera, según lo que permitan web, Odoo y portal.

Responsabilidades:

- recibir evento desde web/pago;
- crear/actualizar contacto/caso en Odoo;
- crear/invitar cliente en portal;
- sincronizar estados operativos portal -> Odoo;
- crear tareas y notificaciones internas;
- registrar hitos operativos;
- mantener trazabilidad sin replicar datos sensibles innecesarios.

### M6. Proceso de informe final

Responsabilidades:

- checklist de inputs;
- estado de producción;
- responsable de preparación;
- revisión interna;
- generación o ensamblaje manual/semiautomatizado de partes no genéticas si procede;
- entrega en portal cliente;
- registro de entrega y fecha en Odoo;
- activación de seguimiento.

Limitación: no automatizar análisis genético ni ingesta TellmeGen sin API/datos estructurados. [SRC-002]

### M7. Seguridad, datos y proveedor

Responsabilidades:

- minimización de datos;
- control de accesos;
- MFA si proveedores lo permiten;
- DPA/GDPR con proveedores;
- preferencia España/UE o condiciones contractuales adecuadas;
- evitar email como canal principal para documentos sensibles;
- evitar datos genéticos crudos en Odoo;
- revisión legal/DPO separada si EPI10 la requiere.

## Roles and Users

| Rol | Uso esperado | Sistemas |
| --- | --- | --- |
| Cliente final | Completa onboarding, formularios, consentimientos, cuestionarios, sube analíticas/documentos, recibe informe y seguimiento | Web, portal cliente |
| Carmen / dirección funcional | Valida experiencia, alcance, control operativo, seguridad, costes y propuesta | Odoo/reporting, propuesta comercial |
| Aitor / equipo operativo | Gestiona casos, revisa estados, coordina TellmeGen externo, controla documentos, informe y seguimiento | Odoo, portal cliente, TellmeGen externo |
| Equipo administrativo | Apoya facturación, pedidos, tareas o soporte operativo si aplica | Odoo |
| Administrador técnico/proyecto | Configura permisos, integraciones, automatizaciones y soporte | Odoo, portal, middleware |
| Tomás / comprador económico | Evalúa coste, valor, ROI y capacidad de escalar | Propuesta comercial, estimación de costes |

## Core Workflows

### W1. Alta post-formulario/pago

1. Cliente completa formulario o pago en web.
2. Web/pago emite evento o export mínimo.
3. Integración crea/actualiza contacto y caso en Odoo.
4. Integración crea/invita perfil en portal cliente.
5. Odoo crea tarea interna de revisión/seguimiento.
6. Cliente recibe instrucciones de onboarding.

### W2. Onboarding, consentimientos y cuestionarios

1. Cliente entra en portal.
2. Completa formularios, consentimientos y cuestionarios.
3. Portal registra completitud.
4. Integración actualiza Odoo con estado/fecha/flag.
5. Odoo crea tarea si falta información o si requiere revisión.

### W3. Coordinación del test y TellmeGen externo

1. Odoo marca necesidad de coordinar test.
2. Aitor/equipo gestiona TellmeGen en plataforma B2B externa.
3. Estados relacionados con muestra/resultados se actualizan en Odoo manualmente o mediante tarea interna.
4. TellmeGen no envía datos automáticos a Odoo/portal en Fase 1.

### W4. Analíticas y documentos opcionales

1. Cliente sube analítica/documento en portal.
2. Portal notifica o expone evento.
3. Odoo recibe estado/flag/tarea de revisión.
4. Equipo revisa input y lo incorpora al proceso del informe si aplica.

### W5. Producción y entrega de informe final

1. Odoo marca caso como listo para informe cuando inputs mínimos están disponibles.
2. Equipo EPI10 prepara informe con criterio experto e inputs disponibles.
3. Estado pasa a informe en revisión.
4. Informe aprobado se entrega en portal.
5. Odoo registra fecha/versión/estado de entrega.
6. Se activa tarea o flujo de seguimiento.

### W6. Seguimiento y cierre

1. Informe entregado activa seguimiento.
2. Portal centraliza comunicación con cliente.
3. Odoo mantiene tareas, fechas y estado.
4. Caso se marca como seguimiento activo, cerrado o incidencia.

## Integrations

| Integration | Direction | Purpose | Status |
| --- | --- | --- | --- |
| Web/pago -> Odoo | inbound to Odoo | Crear/actualizar cliente, caso, pedido/tarea y estado inicial | Requiere validar tecnología web/pago |
| Web/pago -> portal cliente | inbound to portal | Crear/invitar cliente y lanzar onboarding | Requiere API/webhook/import de portal |
| Portal cliente -> Odoo | portal to backoffice | Sincronizar flags/estados/tareas: onboarding, consentimiento, cuestionario, documento, informe | Depende de API/webhooks/add-ons |
| Odoo -> portal cliente | backoffice to portal | Opcional para invitaciones, mensajes o entrega según capacidad | Pendiente de validación |
| Odoo -> notificaciones internas | backoffice to equipo | Avisar tareas, documentos pendientes, informe pendiente, seguimiento | Probablemente viable |
| TellmeGen -> Odoo/portal | none in Fase 1 | No integrar resultados, barcodes, usuarios ni PDF automáticamente | Fuera de scope Fase 1 |

## Automations

Automatizaciones candidatas de Fase 1:

- crear caso Odoo tras formulario/pago confirmado;
- crear/invitar cliente en portal;
- crear tarea "nuevo cliente pagado";
- marcar onboarding enviado;
- actualizar estado por consentimiento completado;
- actualizar estado por cuestionario completado;
- crear tarea por analítica/documento subido;
- crear tarea "coordinar test";
- crear tarea "resultado externo pendiente";
- crear tarea "preparar informe";
- registrar informe entregado;
- activar seguimiento;
- alertar incidencias o campos faltantes.

No automatizar:

- creación de usuario/test/barcode en TellmeGen;
- consulta de estado TellmeGen;
- descarga PDF TellmeGen;
- ingesta estructurada de resultados genéticos;
- dashboard genética;
- interpretación genética automática.

## Data Objects

| Object | Preferred System | Notes |
| --- | --- | --- |
| Cliente/contacto | Odoo + portal | Datos mínimos sincronizados; evitar duplicación innecesaria |
| Pedido/pago | Web/pasarela + Odoo | Según alcance real de facturación/pago |
| Caso/servicio EPI10 | Odoo | Unidad operativa principal |
| Formulario onboarding | Portal cliente | Odoo recibe estado/fecha si procede |
| Consentimiento | Portal cliente | Odoo puede guardar estado/fecha/referencia |
| Cuestionario | Portal cliente | Odoo recibe flag/resumen operativo, no necesariamente contenido completo |
| Analítica/documento | Portal cliente | Evitar email; Odoo recibe referencia/estado |
| Resultado TellmeGen | TellmeGen externo | No integrar ni duplicar en Fase 1 |
| Informe final EPI10 | Portal cliente | Odoo registra versión/fecha/estado de entrega |
| Tarea interna | Odoo | Responsable, fecha, estado, prioridad |
| Estado operativo | Odoo | Fuente principal de dashboard interno |

## States and Status Model

Modelo sugerido para Stage 03/04, a cerrar en workshop de 3 horas:

1. Lead recibido.
2. Pago pendiente.
3. Pago confirmado.
4. Cliente creado/invitado en portal.
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
16. Muestra realizada.
17. Muestra enviada a laboratorio.
18. Resultado externo pendiente.
19. Resultado externo disponible.
20. Informe en preparación.
21. Informe en revisión.
22. Informe entregado en portal.
23. Seguimiento activo.
24. Cerrado.
25. Incidencia.

Nota: los estados relacionados con TellmeGen/laboratorio no se actualizarán automáticamente en Fase 1 salvo que aparezca nueva capacidad técnica. [SRC-002]

## Event Triggers

| Trigger | Source | Result |
| --- | --- | --- |
| Lead creado | Web | Crear/actualizar contacto y caso si hay datos suficientes |
| Pago confirmado | Pasarela/web | Crear caso activo, tarea interna e invitación portal |
| Cliente invitado al portal | Portal/integración | Estado onboarding enviado en Odoo |
| Formulario completado | Portal | Estado/tarea de revisión en Odoo |
| Consentimiento completado | Portal | Estado de consentimiento en Odoo |
| Cuestionario completado | Portal | Estado/tarea de revisión en Odoo |
| Analítica/documento subido | Portal | Tarea de revisión y estado documental |
| Test coordinado | Odoo/manual | Estado operativo interno |
| Resultado externo disponible | Odoo/manual | Tarea de preparar informe |
| Informe aprobado | Odoo/equipo | Entrega en portal y registro de versión/fecha |
| Informe entregado | Portal/Odoo | Activar seguimiento |
| Incidencia | Cualquier sistema/equipo | Crear tarea y bloquear siguiente paso si aplica |

## Dependencies and Constraints

### Functional and Technical Dependencies

| Dependency | Impact |
| --- | --- |
| Healthie plan/API/add-ons/DPA/residencia | Determina si Healthie puede ser portal definitivo e integrarse con web/Odoo |
| ContinuousCare/equivalente | Alternativa si Healthie falla por coste, contrato o requisitos |
| Odoo version/modalidad/módulos/API | Determina esfuerzo de configuración e integración |
| Web/pago technology and events | Determina viabilidad de alta automática post-pago |
| Report template and process | Determina alcance real de sistematización del informe |
| Legal/DPO review | Determina límites de datos, proveedores, consentimientos y contratos |
| Client volume and manual hours | Determina ROI cuantitativo y priorización comercial |

### License and External Cost Estimate Inputs

Stage 04 debe presentar costes externos como estimación preliminar, no como presupuesto final cerrado.

| Cost Area | Baseline for Proposal | Status |
| --- | --- | --- |
| Healthie license | Healthie Group como hipótesis principal: `$149.99+/mes` mensual o `$135+/mes` anual; clinicians adicionales `$50/mes` | Baseline público orientativo, revalidar antes de enviar |
| Healthie API/add-on | API disponible como add-on para Group/Enterprise | Coste pendiente de cotización; no inventar |
| Healthie white-label/enterprise support/security review | Posibles add-ons o Enterprise | Pendiente de cotización |
| ContinuousCare/equivalente | Alternativa | Pricing/API/DPA pendiente |
| Odoo | Hosting/licencia/mantenimiento según modalidad real | Unknown |
| Middleware/hosting | Depende de stack elegido y volumen | Unknown |
| Soporte/mantenimiento | Debe separarse de implantación | Pendiente de modelo comercial |
| Legal/DPO | Revisión especializada si aplica | No incluida salvo decisión comercial |

Referencias públicas Healthie a revalidar antes de enviar propuesta:

- `https://www.gethealthie.com/healthie-pricing`
- `https://help.gethealthie.com/article/773-healthie-pricing`
- `https://help.gethealthie.com/article/943-healthies-api`
- `https://help.gethealthie.com/article/1230-healthie-group-plan-vs-enterprise-plan`

### Hard Constraints

- No construir plataforma completa desde cero. [SRC-001]
- No vender TellmeGen API Fase 1. [SRC-002]
- No usar Odoo como repositorio de datos genéticos crudos. [SRC-002]
- No prometer cumplimiento legal absoluto sin revisión especializada. [SRC-001, SRC-002]
- No crear Stage 06 execution plan mientras `execution_plan_enabled: false`.

## Risks

| Risk | Severity | Handling |
| --- | --- | --- |
| Healthie no cumple coste/API/DPA/residencia | High | Validar rápido; mantener alternativa ContinuousCare/equivalente |
| API Healthie/add-ons elevan coste recurrente | Medium | Separar como pendiente de cotización; no cerrar precio sin oferta |
| Odoo requiere más configuración de la prevista | Medium | Auditar estado real antes de cerrar esfuerzo |
| Web/pago no puede emitir eventos integrables | High | Definir contrato mínimo; proponer alternativa puente explícita si hace falta |
| Cliente espera TellmeGen integrado | High | Explicar restricción y valor de Fase 1 sin API |
| Datos sensibles en sistemas inadecuados | High | Minimización, DPA, permisos, portal documental, revisión legal |
| Informe final requiere más trabajo experto del esperado | Medium | Mantener automatización parcial y proceso trazable, no promesa de generación completa |
| ROI cuantitativo débil por falta de datos | Medium | Usar supuestos explícitos y pedir horas/volumen |
| Scope creep hacia app/plataforma/gemelo digital | High | Mantener exclusiones de Stage 02 v2 |

## Assumptions

- Healthie será la hipótesis principal para portal cliente, pero no decisión final hasta validar plan, coste, DPA, residencia, idioma y API.
- Odoo será backoffice operativo si su estado real permite configurar estados, tareas, responsables y reporting.
- La web/pago podrá emitir algún evento o export integrable para alta post-pago.
- EPI10 aceptará que TellmeGen queda externo en Fase 1 si la propuesta explica el valor operativo alternativo.
- El informe final puede sistematizarse en proceso, estados y entrega, aunque el criterio experto siga siendo humano.
- El workshop de 3 horas será suficiente para cerrar mapa operativo inicial si EPI10 prepara la información requerida.
- Los costes públicos de Healthie son solo baseline orientativo y deben revalidarse antes de enviar propuesta.

## Deliverables

Entregables funcionales/técnicos de Fase 1 a reflejar en propuesta:

1. Workshop de arranque operativo de 3 horas con checklist previo y salida documentada.
2. Recomendación final Healthie vs ContinuousCare/equivalente.
3. Configuración inicial del portal cliente.
4. Configuración inicial de Odoo como backoffice operativo.
5. Modelo de estados y tareas.
6. Integración mínima web/pago -> Odoo/portal, condicionada a capacidad técnica de la web/pasarela.
7. Sincronización básica portal -> Odoo para estados/flags/tareas.
8. Proceso de subida/revisión de analíticas/documentos.
9. Proceso sistematizado de producción, revisión y entrega del informe final.
10. Dashboard operativo básico en Odoo.
11. Automatizaciones operativas acotadas.
12. Reglas de minimización y ubicación de datos por sistema.
13. Documentación operativa básica.
14. Formación/handoff inicial.
15. Estimación de costes recurrentes externos para propuesta.

## Phase Breakdown

### Fase 1A - Arranque y validación corta

- Workshop de 3 horas.
- Validación Healthie vs alternativa.
- Revisión de Odoo/web/pago.
- Confirmación de estados y datos mínimos.

### Fase 1B - Configuración base

- Portal cliente.
- Odoo backoffice.
- Estados, tareas, responsables.
- Estructura de formularios/documentos/informe.

### Fase 1C - Integraciones y automatizaciones mínimas

- Web/pago -> Odoo/portal.
- Portal -> Odoo para estados y tareas.
- Notificaciones y tareas internas.
- Reglas de minimización.

### Fase 1D - Informe, seguimiento y handoff

- Proceso de informe final.
- Entrega en portal.
- Dashboard operativo.
- Documentación.
- Formación y soporte inicial.

Esta división es de preventa. No es backlog ni cronograma de tareas atómicas.

## Intentionally Not Built Yet

No se construye ni se vende en Fase 1:

- integración automática TellmeGen;
- creación de usuarios/tests/barcodes en TellmeGen;
- consulta automática de estados/resultados TellmeGen;
- descarga automática de PDF TellmeGen;
- ingesta estructurada de resultados genéticos;
- dashboard genética;
- interpretación genética automática;
- diagnóstico automatizado;
- gemelo digital;
- plataforma sanitaria propia completa;
- app móvil propia si el portal elegido cubre app/portal;
- plan de ejecución Stage 06;
- backlog, milestones o repo structure como artefactos independientes.

## Handoff to Next Stage

Stage 04 debe convertir este blueprint en propuesta comercial.

Debe mantener:

- narrativa de Fase 1 como sistema operativo inicial de EPI10;
- Healthie como hipótesis principal y ContinuousCare/equivalente como alternativa;
- Odoo como backoffice;
- TellmeGen externo/no integrado en Fase 1;
- workshop de 3 horas como arranque acotado de ejecución;
- estimación preliminar de licencias y costes recurrentes externos;
- ROI operativo basado en reducción de manualidad, errores y dispersión, sin inventar cifras cerradas si faltan horas/volumen;
- riesgos y supuestos visibles.

Stage 04 no debe:

- inventar integración TellmeGen;
- prometer API Healthie sin cotización;
- cerrar precio final de licencias sin cotización vigente;
- vender cumplimiento legal absoluto;
- convertir esta preventa en plan de ejecución detallado.
