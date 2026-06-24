# 03 - EPI10 Informe Final Copilot Blueprint v1

## Purpose

Este anexo define EPI10 Informe Final Copilot como parte central de Fase 1. No
es un "report harness" comercial ni una generacion automatica de informe
genetico. Es un flujo asistido para producir borradores internos del informe
final con inputs anonimizados/pseudonimizados y revisión humana obligatoria.
[CTO-001]

## Definition

EPI10 Informe Final Copilot asiste al equipo EPI10 en la preparacion del
borrador del informe final. Ordena inputs, aplica checklist, anonimiza o
pseudonimiza datos, usa prompts/skills/subagentes/scripts segun entorno
autorizado, genera un borrador preliminar y facilita la exportacion/subida del
informe aprobado. [CTO-001]

La version final del informe requiere siempre revisión y aprobacion humana por
parte de EPI10. [CTO-001]

## Target Flow

```text
EPI10 Informe Final Copilot
   |
   v
inputs anonimizados/pseudonimizados
   |
   v
borrador asistido con LLM / agentes / skills / scripts
   |
   v
revisión humana obligatoria
   |
   v
informe final validado
   |
   v
subida automatica a Healthie si API lo permite
   |
   v
actualizacion de estado en Odoo
```

## Inputs

Inputs esperados, pendientes de cierre operativo en el workshop de Fase 1:

- plantilla o ejemplo de informe final;
- checklist de secciones obligatorias;
- inputs TellmeGen consultados externamente por EPI10;
- analiticas/documentos aportados por cliente;
- cuestionarios y formularios relevantes;
- notas operativas autorizadas;
- criterios internos de EPI10 para revisión;
- version final aprobada por humano.

## Components

| Component | Role |
| --- | --- |
| Checklist de preparacion de inputs | Confirma que el caso tiene material minimo antes de usar el Copilot. |
| Script propio de anonimization/pseudonymization | Elimina identificadores directos y genera un paquete de trabajo minimizado. |
| Prompts/skills/subagentes | Estructuran el borrador sin convertirse en runtime transaccional de negocio. |
| Scripts auxiliares | Preparan carpetas, validan campos, ensamblan borradores o exportan resultados. |
| Draft generator | Produce borrador preliminar interno. |
| Human review gate | Valida contenido, criterio experto, tono, riesgos y version final; es la revisión humana obligatoria. |
| Export/finalization step | Produce output final aprobado para entrega. |
| Healthie upload integration | Sube el informe final a Healthie si API/add-on lo permite. |
| Odoo status update | Actualiza estado, fecha, version o tarea de seguimiento en Odoo. |
| Training assets | Forman a Aitor/equipo en uso correcto del Copilot. |

## Operating Rules

- No vender como generacion automatica de informe genetico.
- No vender como diagnostico automatico.
- No vender como interpretacion genetica autonoma.
- El output del Copilot es borrador interno.
- La version final requiere revisión y aprobacion humana.
- Los inputs deben estar anonimizados o pseudonimizados antes de usarse.
- El script anonimizador es parte del software propio de EPI10.
- Claude, OpenAI, Codex, Claude Code u otras herramientas solo pueden usarse
  segun configuracion, permisos y entorno corporativo de EPI10.
- Costes de API LLM, si aplican, deben estimarse como externos/recurrentes.

## Anonymization Checklist

Antes de enviar inputs al Copilot:

- eliminar nombre, apellidos, email, telefono, direccion, DNI/NIE/pasaporte y
  cualquier identificador directo;
- sustituir identificadores por case id interno;
- separar datos clinicos/documentales del identificador de cliente;
- eliminar metadatos de documentos si procede;
- revisar que el paquete no incluya raw genetic data innecesario;
- confirmar que logs y prompts no contienen datos sensibles no necesarios;
- registrar que la revisión de anonimization/pseudonymization fue completada;
- escalar a revisión legal/DPO si EPI10 lo exige.

## Sensitive Data Guardrails

- No guardar raw genetic data en Odoo.
- No guardar raw genetic data en PostgreSQL tecnico del MVP.
- No usar logs con datos sensibles.
- No usar AWS como repositorio documental principal si Healthie gestiona
  documentos e informe.
- Aplicar retencion minima a paquetes temporales de trabajo.
- Mantener trazabilidad operativa sin duplicar contenido sensible.

## Human Review Gate

Este gate es la revisión humana obligatoria antes de convertir cualquier
borrador en informe final entregable. [CTO-001]

La revisión humana debe comprobar:

- que el borrador usa los inputs correctos;
- que no inventa conclusiones;
- que no afirma diagnosticos no revisados;
- que no sustituye criterio experto de EPI10;
- que se respetan disclaimers o textos aprobados;
- que el informe final puede entregarse al cliente;
- que la version final queda registrada en Odoo y entregada en Healthie si API
  lo permite.

## Training and Adoption

Fase 1 debe incluir formacion inicial para Aitor/equipo:

- preparacion de inputs;
- uso del script anonimizador;
- ejecucion segura del Copilot;
- revision del borrador;
- exportacion de la version final;
- subida o entrega en Healthie;
- actualizacion de estados en Odoo.

## Handoff to Next Stage

Stage 04 debe vender EPI10 Informe Final Copilot como asistencia operativa para
producir borradores internos y reducir carga manual, nunca como diagnostico,
interpretacion genetica autonoma ni generacion automatica del informe final.
