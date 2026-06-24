# 02 - MVP Scope Decision v2

## Decision Summary

Decisión: la Fase 1 / MVP de EPI10 Salud debe venderse como un sistema operativo inicial para ordenar la experiencia cliente y la operación interna, no como una integración genética automatizada.

El MVP debe incluir:

- portal cliente con Healthie como candidato principal, manteniendo ContinuousCare/equivalente como alternativa si Healthie falla por coste, DPA, residencia, idioma o API;
- Odoo como backoffice operativo para estados, tareas, responsables, reporting y seguimiento;
- integración mínima web/pago -> Odoo/portal para arrancar el servicio sin depender de avisos manuales;
- centralización de formularios, consentimientos, cuestionarios, analíticas/documentos, comunicación e informe final;
- automatizaciones operativas alrededor de altas, estados, tareas, documentos y entrega;
- dashboard operativo básico, no dashboard genética;
- estimación preliminar de costes recurrentes externos para que Stage 03/04 puedan aterrizar licencias, API/add-ons, hosting, soporte y mantenimiento;
- TellmeGen como sistema externo no integrado en Fase 1, mientras no haya API real disponible.

Esta decisión prioriza a Carmen como buyer funcional/estratégica: una propuesta práctica, acotada, basada en herramientas existentes y ejecutable. Usa el dolor de Aitor para definir qué manualidad reducir. Tomás queda para la justificación de coste/valor/ROI dentro de la propuesta, no para sobrediseñar el producto. [SRC-001, SRC-002]

Cambios v2:

- acota el workshop de arranque a una única sesión de 3 horas dentro de Fase 1;
- añade obligación explícita de estimar costes recurrentes externos en Stage 03/04, con Healthie como hipótesis principal de coste.

## Phase 1 / MVP Scope

### 1. Workshop de arranque operativo acotado

Incluir una única sesión de arranque operativo, estimada en 3 horas.

No es una fase larga de consultoría ni una preventa infinita. Es una sesión inicial de Fase 1 para convertir la decisión de scope en configuración operativa concreta.

Participantes:

- Carmen;
- Aitor;
- equipo operativo clave de EPI10;
- equipo técnico/proyecto.

Antes del workshop se enviará un checklist de preparación. EPI10 debe traer:

- flujo actual resumido;
- estados deseados;
- formularios/cuestionarios existentes;
- consentimientos o textos legales disponibles;
- plantilla o ejemplo de informe final;
- documentos/analíticas que suelen pedir;
- datos actuales de Odoo, web y pago;
- usuarios/roles implicados.

Output esperado del workshop:

- mapa operativo de Fase 1;
- estados definitivos;
- responsables;
- puntos de automatización;
- datos/documentos por sistema;
- decisiones de configuración inicial.

Rationale: Stage 01 detecta que el flujo definitivo no está cerrado y que cerrar microdetalle en preventa sería arriesgado. La solución es una sesión de arranque acotada al inicio de Fase 1, no una consultoría abierta antes de vender. [SRC-002]

### 2. Validación y selección de herramienta cliente

Incluir una validación breve y cerrada de Healthie vs ContinuousCare/equivalente, con Healthie como candidato principal.

Validar:

- plan necesario;
- coste;
- API/webhooks;
- idioma/UX;
- formularios, consentimientos, documentos e informes;
- comunicación segura;
- DPA/GDPR;
- residencia o condiciones de tratamiento de datos;
- capacidad de integrarse con web/Odoo.

Decisión de principio: no construir portal propio si Healthie/ContinuousCare/equivalente cubre razonablemente la necesidad. [SRC-001, SRC-002]

### 3. Portal cliente

Configurar la herramienta seleccionada como capa principal de relación con cliente:

- perfil cliente/paciente;
- onboarding;
- formularios;
- consentimientos;
- cuestionarios;
- subida de analíticas/documentos;
- comunicación segura;
- entrega del informe final;
- seguimiento.

Rationale: Carmen pidió explícitamente portal, formularios, consentimientos, cuestionarios, seguimiento, comunicación segura y entrega documental/informes. [SRC-001]

### 4. Odoo como backoffice operativo

Configurar Odoo como sistema interno de control operativo:

- contactos/clientes;
- pedido/pago/facturación si aplica;
- pipeline de estados;
- tareas internas;
- responsables;
- fechas clave;
- reporting operativo;
- vista/dashboard de clientes por estado.

Rationale: Stage 01 detecta que Odoo no está confirmado como backoffice robusto, pero es el sistema interno deseado y un lugar natural para estados/tareas/reporting. [SRC-001, SRC-002]

### 5. Integración web/pago -> Odoo/portal

Incluir una integración mínima tras lead o pago confirmado:

- crear/actualizar contacto en Odoo;
- crear pedido/tarea/estado inicial si aplica;
- crear o invitar perfil en el portal cliente;
- lanzar onboarding;
- notificar al equipo;
- registrar origen y fecha.

Condición: depende de que la web/pago pueda emitir datos, webhooks, API o al menos un mecanismo integrable. [SRC-002]

### 6. Sincronización portal -> Odoo de estados operativos

Incluir sincronización o actualización operativa entre portal y Odoo para eventos como:

- onboarding iniciado/completado;
- consentimiento completado;
- cuestionario completado;
- analítica/documento subido;
- informe final entregado;
- seguimiento activo.

Regla: Odoo debe recibir estados, flags, tareas o referencias operativas, no convertirse en repositorio de datos genéticos crudos. [SRC-002]

### 7. Proceso de informe final EPI10

Incluir sistematización del proceso de informe final:

- checklist de inputs;
- estados de producción;
- responsables;
- plantilla o estructura base;
- revisión;
- entrega en portal cliente;
- registro de entrega en Odoo;
- tarea o evento de seguimiento.

No incluir generación automática completa del análisis genético ni ingesta estructurada automática de TellmeGen. [SRC-002]

### 8. Automatizaciones de calidad de vida para Aitor/equipo

Incluir automatizaciones acotadas para reducir manualidad:

- creación de tareas internas;
- notificaciones por evento;
- cambio de estado;
- avisos de documentos pendientes;
- aviso de informe pendiente o entregado;
- recordatorios de seguimiento.

Rationale: el dolor operativo principal es Aitor/equipo actuando como middleware humano. [SRC-002]

### 9. Seguridad y minimización de datos

Incluir como requisito transversal:

- minimización de datos;
- control de accesos;
- evitar datos genéticos crudos en Odoo;
- canal cliente/documental más adecuado que email;
- revisión de DPA/GDPR/proveedores;
- preferencia por infraestructura o condiciones de tratamiento España/UE cuando sea posible.

No prometer cumplimiento legal absoluto sin revisión especializada. [SRC-001, SRC-002]

### 10. Documentación, formación y soporte inicial

Incluir:

- documentación operativa básica;
- guía de estados/tareas;
- handoff al equipo;
- formación inicial;
- soporte inicial acotado.

Rationale: el proyecto está verde operativamente y necesita proceso claro para que el sistema no dependa solo de configuración técnica. [SRC-002]

## License Cost Estimate Requirement

Carmen pidió explícitamente que la propuesta contemple costes de licencias, integración, soporte y mantenimiento. Por tanto, Stage 03 y Stage 04 deben incluir una estimación preliminar de costes recurrentes externos, aunque no se cierre precio definitivo de licencias sin cotización vigente. [SRC-001]

La estimación debe separar:

- coste de implantación propio;
- licencias Healthie/ContinuousCare/equivalente;
- coste API/add-ons;
- Odoo hosting/licencias/mantenimiento;
- middleware/hosting si aplica;
- soporte y mantenimiento;
- revisión legal/DPO si aplica.

Healthie debe usarse como hipótesis principal de coste porque es el candidato más probable. ContinuousCare/equivalente debe aparecer como alternativa pendiente de cotización.

Referencia orientativa verificada sobre pricing público Healthie el 2026-06-09:

- Healthie publica planes Core, Essentials, Plus, Group y Enterprise en sus páginas públicas de pricing y ayuda.
- Healthie Group aparece como baseline orientativo desde `$149.99+/mes` en facturación mensual o `$135+/mes` en facturación anual.
- Los miembros clínicos adicionales aparecen como coste orientativo de `$50/mes` por clinician.
- Healthie API está disponible como add-on para planes Group y Enterprise.
- El coste del API add-on no debe inventarse; debe marcarse como pendiente de cotización.
- White-label, soporte enterprise, premium integrations y revisiones de seguridad/datos deben tratarse como pendientes de confirmación.

Fuentes públicas a validar de nuevo en Stage 03/04 antes de presupuestar:

- `https://www.gethealthie.com/healthie-pricing`
- `https://help.gethealthie.com/article/773-healthie-pricing`
- `https://help.gethealthie.com/article/943-healthies-api`
- `https://help.gethealthie.com/article/1230-healthie-group-plan-vs-enterprise-plan`

Esto no es presupuesto final. Es una obligación de estimación para que Stage 03/04 no omitan costes recurrentes relevantes.

## Phase 2 Candidates

Estos elementos quedan como candidatos de Fase 2, no como promesa de Fase 1:

1. Integración API TellmeGen si TellmeGen habilita una API real, documentada, autorizada y económicamente viable. [SRC-002]
2. Revisión del presupuesto/API antiguo de TellmeGen con el nuevo director IT. [SRC-002]
3. Proveedor genético alternativo con API si la integración genética automática se vuelve crítica. [SRC-002]
4. Automatización avanzada de generación de informes si existen inputs estructurados suficientes. [SRC-002]
5. Ingesta estructurada de resultados genéticos. [SRC-002]
6. Dashboard genética o insights genéticos alimentados por datos integrados. [SRC-002]
7. Reporting avanzado o BI. [SRC-002]
8. Automatizaciones más profundas entre Odoo, portal cliente, web y sistemas externos. [SRC-002]
9. Productización parcial del proceso si el volumen lo justifica. [SRC-002]
10. Gemelo digital solo como exploración futura, no como extensión automática del MVP. [SRC-002]

## Explicitly Out of Scope

Fuera de Fase 1:

- integración automática TellmeGen por API;
- creación automática de usuarios en TellmeGen;
- creación automática de tests en TellmeGen;
- asociación automática de barcodes;
- consulta automática de estado de muestra/test;
- descarga automática de PDF TellmeGen;
- extracción estructurada automática de resultados genéticos;
- dashboard genética alimentada por TellmeGen;
- interpretación genética automática;
- diagnóstico automatizado;
- gemelo digital;
- plataforma sanitaria propia completa;
- app móvil propia si la herramienta cliente ya cubre portal/app;
- vender "semimanual TellmeGen" como integración;
- garantía de cumplimiento legal absoluto sin revisión legal/DPO;
- plan de ejecución detallado Stage 06 mientras `execution_plan_enabled` siga en `false`.

Rationale: estos puntos contradicen el enfoque acotado de Carmen, dependen de capacidades no disponibles o pertenecen a una fase posterior. [SRC-001, SRC-002]

## Rationale

### Por qué esta Fase 1 es la correcta

1. Responde a Carmen: permite operar pronto, con herramientas existentes, sin construir plataforma completa y con una propuesta vendible. [SRC-001]
2. Responde a Aitor: reduce la manualidad alrededor de altas, documentos, estados, comunicación, informe y seguimiento. [SRC-002]
3. No depende de una API TellmeGen que hoy no existe. [SRC-002]
4. Ataca el problema operativo real detectado en Stage 01: falta de sistema operativo mínimo y trazable. [SRC-002]
5. Evita vender una promesa técnica no soportada. [SRC-002]
6. Mantiene a Tomás en el lugar correcto: valorar coste, ROI y capacidad de escalar, sin convertirlo en eje del producto. [SRC-002]
7. Atiende la petición comercial de Carmen de contemplar costes de licencias, integración, soporte y mantenimiento, sin convertir estimaciones preliminares en presupuesto final. [SRC-001]

### Qué NO se está decidiendo todavía

- No se decide definitivamente Healthie si falla en coste, API, DPA, residencia o idioma.
- No se decide el detalle técnico de cada integración; eso corresponde al blueprint de Stage 03.
- No se cierra presupuesto exacto de licencias ni infraestructura, aunque Stage 03/04 deben estimarlos de forma preliminar.
- No se produce plan de ejecución.

## Dependency Notes

Dependencias que Stage 03 debe tratar antes de cerrar blueprint/precio:

| Dependency | Why It Matters | Current Status |
| --- | --- | --- |
| Healthie/ContinuousCare plan, API, coste, DPA, residencia e idioma | Determina viabilidad de portal, integración, tratamiento documental y coste recurrente | Healthie parece candidato principal; Group puede usarse como baseline orientativo, API/add-ons pendientes de cotización |
| Estado real de Odoo | Determina cuánto es configuración vs integración/desarrollo y qué costes recurrentes aplicar | Unknown; se sabe que existe o está previsto, pero no su estado completo |
| Web/pago | Determina si se puede automatizar alta post-pago y onboarding | Unknown; web en construcción |
| Proceso de informe final | Determina qué se puede sistematizar y qué sigue siendo humano | Unknown; se sabe que es entregable clave |
| Datos sensibles/legal/DPO | Determina límites de almacenamiento, proveedor, permisos, contratos y costes de revisión | Requisito real, revisión especializada pendiente |
| Volumen y horas actuales | Determina ROI cuantitativo y priorización de automatizaciones | Unknown |
| TellmeGen presupuesto/API antiguo | Puede informar Fase 2, no Fase 1 | Existe referencia, no documentación disponible |

## Risk Notes

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Healthie no encaja por coste, DPA, residencia, idioma o API | Puede cambiar la herramienta cliente y afectar precio/plazo | Validar antes de cerrar blueprint; mantener ContinuousCare/equivalente como alternativa |
| API/add-ons de Healthie requieren coste no público o plan Enterprise | Puede cambiar presupuesto recurrente y viabilidad de integración | Marcar API add-on y white-label/enterprise support como pendientes de cotización |
| Odoo está menos preparado de lo esperado | Puede aumentar configuración o integración necesaria | Auditar estado real al inicio del blueprint/Fase 1 |
| Web/pago no emite eventos integrables | Puede bloquear automatización post-pago | Definir contrato mínimo con equipo web; contemplar proceso puente temporal sin venderlo como integración completa |
| Cliente espera integración TellmeGen Fase 1 | Riesgo comercial de decepción | Explicar la restricción y reposicionar valor en operación controlable |
| Datos sensibles mal ubicados | Riesgo legal, reputacional y operativo | Minimización, roles, DPA, canal cliente adecuado y revisión legal/DPO |
| Scope creep hacia plataforma propia/gemelo digital | Aumenta coste, plazo y riesgo | Mantener out-of-scope explícito y fasear |
| ROI no cuantificado | Puede debilitar propuesta comercial | Usar ROI cualitativo y supuestos explícitos hasta tener volumen/horas |
| Aitor sigue teniendo carga manual TellmeGen | Puede percibirse como MVP incompleto | Aclarar que Fase 1 reduce manualidad alrededor, pero TellmeGen queda externo por falta de API |

## Unresolved Questions

Estas preguntas no bloquean la decisión de MVP, pero sí deben resolverse para Stage 03/04:

1. ¿Qué plan/coste/API/DPA/residencia/idioma ofrece Healthie para este uso?
2. ¿ContinuousCare u otra alternativa cubre mejor requisitos europeos o sanitarios?
3. ¿Cuál es el coste real de API add-on, white-label, soporte enterprise o revisiones security/data de Healthie?
4. ¿Qué versión/modalidad/módulos/API tiene Odoo actualmente?
5. ¿Qué coste recurrente aplica a Odoo: hosting, licencias, mantenimiento, soporte o desarrollo externo?
6. ¿Quién desarrolla la web y qué eventos puede emitir tras formulario/pago?
7. ¿Qué pasarela de pago se usará?
8. ¿Qué datos sensibles recoge la web y qué datos deben moverse al portal?
9. ¿Cuál es la plantilla actual del informe final y cuánto tarda su producción?
10. ¿Qué partes del informe pueden parametrizarse sin automatizar análisis genético?
11. ¿Cuántos clientes/mes espera EPI10 y cuántas horas manuales dedica Aitor/equipo?
12. ¿Qué revisión legal/DPO exige EPI10 antes de usar Healthie/Odoo/proveedores?
13. ¿Puede TellmeGen compartir el presupuesto/API antiguo y alcance de endpoints?

## Do Not Sell This Yet Warnings

No vender todavía:

- "Integración TellmeGen Fase 1".
- "Automatización genética completa".
- "Dashboard genética".
- "Informe genético generado automáticamente".
- "Cumplimiento legal garantizado".
- "Healthie cerrado como herramienta definitiva" sin validar plan, coste, DPA, residencia, idioma y API.
- "API Healthie incluida" sin cotización o confirmación del add-on correspondiente.
- "Odoo listo" sin auditar su estado real.
- "ROI con cifras cerradas" sin volumen y horas actuales.
- "Licencias definitivas" sin cotización vigente.
- "Plan de ejecución detallado" mientras Stage 06 esté deshabilitado.

Sí se puede vender, con el wording correcto:

> Fase 1 para ordenar y profesionalizar la operación inicial de EPI10: portal cliente, backoffice Odoo, automatizaciones operativas, documentación, comunicación, entrega de informe final y trazabilidad, dejando TellmeGen como sistema externo no integrado hasta que exista una API real.

## Handoff to Next Stage

Stage 03 debe convertir esta decisión en un blueprint técnico-funcional de preventa.

Debe diseñar:

- arquitectura objetivo sin dependencia de API TellmeGen;
- módulos principales: web/pago, portal cliente, Odoo, automatizaciones/middleware, informe final, seguimiento;
- workshop de arranque como una única sesión de 3 horas dentro de Fase 1, con checklist previo y outputs concretos;
- roles de usuario: cliente final, Carmen/equipo dirección, Aitor/equipo operativo, administrador;
- workflows core: alta post-pago, onboarding, consentimientos/cuestionarios, analíticas/documentos, proceso de informe, entrega, seguimiento;
- integraciones mínimas y sus dependencias;
- datos por sistema y regla de minimización;
- estados operativos sugeridos;
- automatizaciones candidatas;
- estimación preliminar de costes recurrentes externos, usando Healthie Group como baseline orientativo y API/add-ons como pendientes de cotización;
- riesgos, supuestos, exclusiones y fases.

Stage 03 no debe:

- reintroducir TellmeGen API como Fase 1;
- crear backlog o tareas atómicas;
- producir plan de ejecución Stage 06;
- inventar precios de API/add-ons, white-label, soporte enterprise, DPO/legal o licencias no cotizadas;
- vender alcance más allá de esta decisión.
