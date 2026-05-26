# Client Proposal Outline v1 - EPI10 Salud

Fecha: 2026-05-26

## 1. Diagnostico

EPI10 no necesita en esta primera etapa una plataforma propia completa ni un gemelo digital. Necesita un sistema operativo inicial que permita empezar a trabajar con clientes de forma ordenada, segura y escalable: captacion, onboarding, consentimientos, cuestionarios, resultados geneticos, documentacion, comunicacion y seguimiento.

## 2. Enfoque Recomendado

Proponemos una implantacion MVP basada en herramientas existentes, con Odoo como backoffice y una capa segura de portal/formularios para la relacion con cliente. La integracion con TellmeGen se plantea de forma progresiva: semimanual al inicio y automatizable solo si la API disponible lo permite.

## 3. Alcance De Fase 1

- Configuracion de Odoo como backoffice operativo.
- Definicion del pipeline de servicio y estados del cliente.
- Portal/formularios para onboarding, consentimientos y cuestionarios.
- Entrega segura de documentos/informes.
- Automatizaciones iniciales entre web, portal y Odoo.
- Gestion operativa del estado del test genetico.
- Integracion semimanual o basica con TellmeGen.
- Documentacion interna del flujo.
- Formacion al equipo.
- Soporte inicial de arranque.

## 4. Arquitectura Propuesta

```text
Web EPI10
  -> Portal/formularios seguros
  -> Automatizaciones n8n
  -> Odoo backoffice
  -> Documentacion y seguimiento
  -> TellmeGen como proveedor externo de resultados
```

## 5. Qué Queda Manual O Semiautomatico

- Revision de cuestionarios y datos sensibles.
- Asociacion de resultados TellmeGen si no hay API usable.
- Generacion o validacion de informes.
- Decisiones sanitarias, legales o de tratamiento de datos.
- Correccion de incidencias operativas.

## 6. Qué Queda Fuera

- Gemelo digital.
- App movil propia.
- Plataforma sanitaria completa desde cero.
- Interpretacion genetica automatizada.
- Diagnostico medico automatizado.
- Promesa de cumplimiento legal sin revision especializada.
- Automatizacion total del proceso desde el primer dia.

## 7. Costes A Separar

- Trabajo de implantacion: configuracion, integracion, automatizacion, documentacion, formacion y soporte.
- Costes externos: Odoo/hosting, portal SaaS si se usa, n8n/infraestructura, SMS/email, almacenamiento, backups, firma/consentimiento si aplica.
- Costes futuros: soporte mensual, mantenimiento, nuevas automatizaciones y evolucion del producto.

## 8. Riesgos Y Mitigaciones

| Riesgo | Mitigacion |
| --- | --- |
| API TellmeGen no disponible | Flujo semimanual de asociacion de resultados |
| SaaS sanitario sin residencia UE suficiente | Portal propio minimo o proveedor europeo alternativo |
| Exceso de automatizacion inicial | MVP con pasos manuales explicitados |
| Datos geneticos en sistemas no adecuados | Minimizar datos y centralizar solo referencias/estados |
| Odoo sobrepersonalizado | Configuracion acotada y modulos estandar siempre que sea posible |

## 9. Roadmap

- Fase 1: MVP operativo implantado.
- Fase 2: optimizacion, reporting y automatizaciones avanzadas.
- Fase 3: producto digital/gemelo digital si la operacion real lo justifica.

## 10. Cierre Comercial

El mensaje clave es que EPI10 puede empezar a operar sin esperar a una plataforma completa. La propuesta debe transmitir control, seguridad, realismo y capacidad de evolucion.
