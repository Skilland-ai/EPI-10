# 03 - EPI10 Salud MVP 1.0 Blueprint v1

## Purpose

Este anexo describe EPI10 Salud MVP 1.0 como aplicacion/capa software propia.
Complementa el blueprint principal de Stage 03 v2 y debe servir de base tecnica
para Stage 04 sin convertirse en plan de ejecucion atomico. [CTO-001]

## Product Definition

EPI10 Salud MVP 1.0 es la primera capa software propia de EPI10 Salud. Se
desarrolla a medida, se despliega en AWS España y orquesta web/pago, Healthie,
Odoo, estados, tareas, documentos, produccion asistida del informe final,
entrega y trazabilidad. [CTO-001]

No sustituye Healthie ni Odoo en Fase 1. Usa esas herramientas para acelerar el
MVP, pero concentra en código propio la logica de negocio que EPI10 puede
mantener, auditar y ampliar en futuras fases. [CTO-001]

## Target Architecture

```text
Cliente final
   |
   v
Web EPI10 + pago
   |
   | lead_created / payment_success
   v
AWS España
   |
   v
EPI10 Salud MVP 1.0
Software propio / capa de orquestacion
TypeScript / NestJS / PostgreSQL
   |                         |
   v                         v
Healthie API/Webhooks         Odoo API
portal cliente                backoffice operativo
   |                         |
   v                         v
formularios                   contactos
consentimientos               casos/servicios
cuestionarios                 estados
analiticas/documentos         tareas
comunicacion                  responsables
informe final                 dashboard operativo
seguimiento                   reporting
```

TellmeGen queda aparte:

```text
TellmeGen B2B
= sistema externo no integrado en Fase 1
= equipo EPI10 lo consulta/usa como input externo
= integracion futura solo si TellmeGen habilita API real
```

## Internal Components

| Component | Role |
| --- | --- |
| Backend TypeScript / NestJS | Runtime operativo propio del MVP 1.0. |
| Endpoints web/pago | Recibir `lead_created`, `payment_success` u otros eventos minimos integrables. |
| Healthie webhook endpoints | Recibir eventos de onboarding, formularios, consentimientos, documentos e informe si Healthie lo permite. |
| Healthie API client | Crear cliente, invitar onboarding, consultar estados y subir informe final si API lo permite. |
| Odoo API client | Crear/actualizar contacto, caso, estados, tareas, responsables y dashboard operativo. |
| State engine | Gestionar estados operativos de Fase 1 de forma trazable. |
| Task engine | Crear tareas internas y avisos para Aitor/equipo. |
| Sync logic | Sincronizar IDs y flags entre web, Healthie y Odoo. |
| Idempotency layer | Evitar duplicados por reintentos de webhooks o eventos repetidos. |
| Retry/error handling | Gestionar fallos de proveedor sin perder trazabilidad. |
| Technical logs | Registrar eventos tecnicos minimizados sin datos sensibles. |
| PostgreSQL technical DB | Guardar mapeos de IDs, estados tecnicos, eventos, errores e idempotencia. |
| Final report upload module | Subir informe aprobado a Healthie si API lo permite y actualizar Odoo. |
| Copilot integration | Integrar el flujo EPI10 Informe Final Copilot como proceso asistido. |

## Healthie Responsibilities

Si Healthie se valida como herramienta seleccionada, Healthie API/Webhooks son
necesarios para el alcance vendido. Deben cubrir, como minimo:

- crear cliente o preparar invitacion;
- lanzar onboarding;
- recibir o consultar eventos de formulario completado;
- recibir o consultar consentimiento completado;
- recibir o consultar documento/analitica subida;
- gestionar entrega del informe final;
- sincronizar estados relevantes con Odoo mediante el MVP 1.0.

Healthie sigue siendo hipotesis principal, no decision cerrada hasta validar
plan, coste, API/add-on, DPA/GDPR, residencia, idioma y condiciones. [SRC-002]

## Odoo Responsibilities

Odoo queda como backoffice operativo via API. El default es API + configuracion
de modelos/campos/vistas; no se presupone modulo custom de Odoo salvo que la
ejecucion demuestre que es necesario. [CTO-001]

Debe cubrir:

- crear/actualizar contacto;
- crear caso/servicio EPI10;
- actualizar estados;
- crear tareas;
- asignar responsables;
- registrar entrega de informe;
- alimentar dashboard operativo basico;
- mantener seguimiento.

## What MVP 1.0 Stores

El MVP 1.0 debe almacenar solo datos tecnicos y operativos minimos:

- identificadores cruzados Web/Healthie/Odoo;
- estado operativo;
- timestamps de eventos;
- resultado tecnico de sincronizacion;
- referencias a documentos o informes cuando proceda;
- logs tecnicos minimizados;
- control de errores, retries e idempotencia.

El MVP 1.0 no debe almacenar datos geneticos crudos ni convertirse en repositorio
documental principal si Healthie gestiona documentos e informe final.

## What MVP 1.0 Is Not

- No es plataforma sanitaria completa.
- No sustituye Healthie ni Odoo en Fase 1.
- No es n8n/Make/Zapier como core.
- No es dashboard genetica.
- No integra TellmeGen en Fase 1.
- No almacena raw genetic data.
- No genera diagnostico ni interpretacion genetica autonoma.
- No es Stage 06 execution plan, backlog atomico ni repo structure.

## Expandability

El diseno debe permitir futuras fases:

- mas eventos Healthie/Odoo;
- automatizaciones documentales;
- Copilot mas avanzado;
- reporting operativo avanzado;
- integracion TellmeGen si aparece API real;
- modulos propios de analisis;
- evolucion del portal cliente;
- reduccion progresiva de dependencia de herramientas externas si EPI10 decide
  internalizar capacidades.

## Handoff to Next Stage

Stage 04 debe presentar EPI10 Salud MVP 1.0 como el entregable tecnologico
central de Fase 1: una base software propia, desplegada en AWS España, que
orquesta herramientas existentes y deja a EPI10 en posicion de crecer.
