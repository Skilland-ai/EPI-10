# Fuente primaria — Brief inicial de Carmen sobre EPI10 Salud

> **Uso recomendado dentro del flujo `spec-driving`:** colocar este archivo en `04_outputs/spec-driving/epi10-salud/raw/` junto con `insights-preventa-epi10-salud.md`.
>
> Este documento debe tratarse como **fuente primaria de requisitos comerciales y estratégicos**, porque recoge el mensaje más ordenado recibido directamente de Carmen. Las conclusiones posteriores de reuniones, research o auditoría deben contrastarse contra este brief.

---

## 1. Contexto del documento

- **Origen:** mensaje enviado por Carmen a Romina y Raúl.
- **Rol de Carmen:** buyer/persona funcional principal del proyecto.
- **Función del texto:** precisar el enfoque que EPI10 Salud necesita en esta fase inicial.
- **Valor para el proyecto:** define claramente qué espera EPI10: una solución práctica, acotada, basada en herramientas existentes, no una plataforma construida desde cero.

---

## 2. Texto original de Carmen

Buenos días, Romina y Raúl

Espero que estén bien.

Tras el último email, te escribo para precisar mejor el enfoque de lo que necesitamos ahora desde EPI10 Salud.

Después de revisarlo internamente, y como ya les habíamos comentado, en esta fase inicial lo que necesitamos es algo práctico y acotado que suponga el implantar e integrar herramientas ya existentes en el mercado, y que nos permitan ser operativos cuanto antes.

La idea sería apoyarnos en nuestra web actual, en Odoo open source como herramienta interna de gestión, y en la plataforma de resultados de test genéticos de nuestro Laboratorio proveedor, donde tenemos como distribuidores un acceso a nuestros clientes, y donde nos indican que disponen de posibilidad de integración mediante API.

También hemos estado valorando herramientas existentes tipo Healthie o Continuous Care como posible solución para cubrir parte del flujo operativo con el cliente: portal, formularios, consentimientos, cuestionarios, seguimiento, comunicación segura y entrega de documentación o informes. Las webs: Healthie https://www.gethealthie.com, y Continuous Care  https://www.gethealthie.com/https://www.continuouscare.io/?utm_source=chatgpt.com

Aclararles también que no tenemos cerrada ninguna herramienta concreta, pero sí que nos gustaría trabajar sobre soluciones ya desarrolladas, y no construir todo desde cero, por lo que nos gustaría pedirles una propuesta sencilla y ejecutable para esta primera fase, centrada en la integración con: 

La herramienta Healthie, Continuous Care u otra que consideren más adecuadas o viables para el negocio, para cubrir el portal de cliente y la gestión del servicio. 
Conectarse con nuestra web actual (en fase de desarrollo).
Sincronizar lo necesario con Odoo open source. 
Integración con la API de TellmeGen para utilizar los resultados dentro de nuestra operativa.
Automatizar partes que tendría sentido mantener semiautomatizadas al inicio.
Desarrollos mínimos que serían necesarios, si realmente los hubiera.
Costes de licencias, integración, soporte y mantenimiento que deberíamos prever.
Además, por el tipo de datos que vamos a tratar, nos gustaría que la propuesta contemple una opción de servidor o infraestructura segura, alojada en España o en la Unión Europea.
Nuestro objetivo es claro en este momento, y se centra en poder operar EPI10 de forma segura, ordenada y realista por la fase en la que nos encontramos. 

Si lo ven viable, podemos aclarar cualquier duda y compartir la información técnica interna disponible que tenemos actualmente, el estado actual de Odoo y el flujo previsto del servicio para que puedan prepararnos una propuesta ajustada.

---

## 3. Señales clave extraídas del mensaje

### 3.1. Tipo de proyecto que Carmen está pidiendo

Carmen no pide una plataforma completa desde cero.

Pide una **primera fase práctica y acotada** para que EPI10 pueda operar cuanto antes usando herramientas existentes.

La frase nuclear es:

> “algo práctico y acotado que suponga el implantar e integrar herramientas ya existentes en el mercado, y que nos permitan ser operativos cuanto antes.”

Esto debe guiar toda la preventa.

---

### 3.2. Arquitectura deseada por Carmen

La arquitectura implícita que Carmen describe es:

```text
Web actual / web en desarrollo
  -> herramienta cliente tipo Healthie / Continuous Care / equivalente
  -> Odoo open source como herramienta interna de gestión
  <- plataforma de resultados genéticos del laboratorio proveedor / TellmeGen vía API
```

Con responsabilidades diferenciadas:

| Componente | Rol esperado por Carmen |
| --- | --- |
| Web EPI10 | Entrada/captación del cliente; actualmente en fase de desarrollo |
| Healthie / Continuous Care / equivalente | Portal de cliente y gestión del servicio |
| Odoo open source | Herramienta interna de gestión/backoffice |
| Laboratorio proveedor / TellmeGen | Plataforma de resultados genéticos, idealmente integrable por API |
| Infraestructura segura | Alojamiento en España o Unión Europea por sensibilidad de datos |

---

### 3.3. Funcionalidades esperadas en la capa cliente

Carmen menciona explícitamente que Healthie, Continuous Care o una alternativa deberían cubrir:

- portal de cliente,
- formularios,
- consentimientos,
- cuestionarios,
- seguimiento,
- comunicación segura,
- entrega de documentación,
- entrega de informes,
- gestión del servicio.

Conclusión para el spec-driving:

> Healthie / Continuous Care / equivalente no debe tratarse como un simple formulario. Debe tratarse como la **capa principal de relación con cliente**.

---

### 3.4. Integraciones esperadas

Carmen pide centrar la propuesta en integración con:

1. **Healthie / Continuous Care / herramienta equivalente** para portal cliente y gestión del servicio.
2. **Web actual** en fase de desarrollo.
3. **Odoo open source** para sincronizar lo necesario.
4. **API de TellmeGen** para utilizar resultados dentro de la operativa.
5. **Automatizaciones** en las partes que tenga sentido mantener semiautomatizadas al inicio.

---

### 3.5. Restricciones de alcance

Carmen insiste en:

- no construir todo desde cero,
- usar soluciones ya desarrolladas,
- hacer una propuesta sencilla,
- hacer una propuesta ejecutable,
- mantener la primera fase acotada,
- prever solo desarrollos mínimos si realmente hacen falta.

Esto implica que cualquier propuesta debe evitar:

- gemelo digital completo,
- app propia innecesaria,
- plataforma sanitaria propia completa,
- automatización genética avanzada no validada,
- desarrollo a medida si una herramienta existente lo cubre razonablemente.

---

### 3.6. Requisitos económicos/comerciales

Carmen pide que la propuesta contemple:

- costes de licencias,
- costes de integración,
- costes de soporte,
- costes de mantenimiento,
- desarrollos mínimos necesarios si los hubiera,
- infraestructura segura.

La propuesta comercial debe separar claramente:

```text
Costes externos
  - Healthie / Continuous Care / equivalente
  - Odoo / hosting
  - infraestructura
  - herramientas de automatización
  - soporte de proveedores
  - posibles costes legales/DPO

Trabajo propio
  - análisis final
  - configuración
  - integración
  - automatizaciones
  - documentación
  - formación
  - soporte inicial
  - mantenimiento opcional
```

---

### 3.7. Requisito de infraestructura y datos sensibles

Carmen menciona explícitamente:

> “por el tipo de datos que vamos a tratar, nos gustaría que la propuesta contemple una opción de servidor o infraestructura segura, alojada en España o en la Unión Europea.”

Esto debe aparecer como requisito no funcional del MVP:

- infraestructura segura,
- preferencia España/UE,
- tratamiento cuidadoso de datos de salud/genéticos,
- minimización de datos,
- control de accesos,
- contratos/DPA con proveedores,
- no prometer cumplimiento legal sin revisión profesional.

---

## 4. Cómo debe usarse este brief en decisiones posteriores

Este documento debe actuar como **marco de alineamiento**.

Cuando haya duda sobre scope, priorizar lo que Carmen pidió:

1. Operar cuanto antes.
2. Herramientas existentes.
3. Primera fase acotada.
4. Healthie/Continuous Care/equivalente como capa cliente.
5. Odoo como backoffice.
6. Web actual conectada.
7. API de laboratorio/TellmeGen si existe.
8. Automatizaciones útiles, no automatización total.
9. Desarrollos mínimos.
10. Costes claros.
11. Infraestructura segura en España/UE.

---

## 5. Contraste con descubrimientos posteriores

Este brief refleja la expectativa inicial de Carmen. Posteriormente, en reuniones con Aitor y en el contacto con TellmeGen, se descubrieron matices importantes:

- La operativa actual depende mucho de trabajo manual de Aitor.
- La web de EPI10 todavía está en construcción.
- Odoo existe o está en uso parcial, pero debe validarse su estado real.
- Healthie parece ganar peso como candidato principal de portal cliente, aunque Continuous Care sigue como alternativa.
- TellmeGen dispone de plataforma profesional/B2B, pero el comercial ha indicado que por el momento no disponen de API operativa; el equipo IT quiere migrar estas interacciones a APIs en el futuro, sin deadline claro.
- Por tanto, la integración automática con TellmeGen no debe incluirse como parte cerrada de Fase 1 si no hay API disponible.

Consecuencia:

> La ausencia actual de API de TellmeGen no invalida el MVP completo, pero sí obliga a excluir la integración genética automática de Fase 1 y centrar el MVP en portal cliente, Odoo, automatizaciones operativas, entrega de informe final, analíticas adicionales y trazabilidad.

---

## 6. Implicación para el MVP vendible

A partir de este brief y de los descubrimientos posteriores, el MVP más defendible parece orientarse a:

```text
Web EPI10 / pago / captación
  -> Odoo como backoffice operativo
  -> Healthie como portal cliente
  -> formularios, consentimientos, cuestionarios
  -> subida de analíticas opcionales
  -> comunicación segura
  -> producción y entrega del informe final EPI10
  -> seguimiento y trazabilidad
```

Con TellmeGen como:

```text
TellmeGen B2B
  = fuente externa de datos genéticos no integrada en Fase 1 mientras no exista API disponible
```

Y con Fase 2 condicionada a:

- API futura de TellmeGen,
- integración B2B oficial,
- proveedor alternativo con API,
- automatización avanzada de resultados genéticos.

---

## 7. Criterios para Stage 00 / Stage 01 / Stage 02

### Stage 00 — Intake Context Pack

Debe incluir este brief como fuente primaria de requisitos de Carmen.

### Stage 01 — Problem Audit

Debe contrastar los problemas detectados con el objetivo de Carmen:

> operar EPI10 de forma segura, ordenada y realista.

### Stage 02 — Scope Decision

Debe priorizar scope según:

1. encaje con lo pedido por Carmen,
2. valor operativo real para EPI10,
3. viabilidad sin API de TellmeGen,
4. uso de herramientas existentes,
5. posibilidad de presupuestar y ejecutar pronto.

### Stage 03 — Technical Pre-Sales Blueprint

Debe explicar cómo la arquitectura propuesta resuelve el brief de Carmen sin prometer integración TellmeGen no disponible.

### Stage 04 — Commercial Proposal

Debe traducir este brief a una propuesta comercial clara:

- práctica,
- acotada,
- ejecutable,
- basada en herramientas existentes,
- con costes externos separados,
- con Fase 1 y Fase 2 bien diferenciadas.

