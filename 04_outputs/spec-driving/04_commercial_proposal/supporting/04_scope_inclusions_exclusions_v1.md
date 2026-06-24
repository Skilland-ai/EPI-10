# 04 - Scope Inclusions and Exclusions v1

## Purpose

Este anexo resume qué incluye y qué no incluye Fase 1 para que la propuesta sea
comercialmente clara y no venda alcance no aprobado.

## Includes

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

- Desarrollo de software propio de EPI10.
- Despliegue AWS España.
- Integración web/pago.
- Integración Healthie API/webhooks.
- Integración Odoo API.
- Motor de estados/tareas.
- Trazabilidad técnica.
- PostgreSQL técnico mínimo.

### Bloque 5 — EPI10 Informe Final Copilot

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

## Excludes

No incluye en Fase 1:

- integración automática TellmeGen;
- creación automática de usuarios/tests/barcodes en TellmeGen;
- consulta automática de estado/resultados TellmeGen;
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

## TellmeGen Rationale

TellmeGen queda como sistema externo no integrado en Fase 1 porque no hay API
operativa actual confirmada. La integración puede plantearse como Fase 2 solo si
el proveedor habilita API real, documentada, autorizada y económicamente viable.

## Handoff to Next Stage

Este anexo debe usarse como control de alcance durante revisión humana y
negociación comercial. No habilita nuevas funcionalidades fuera de Fase 1.
