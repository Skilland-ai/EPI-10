# Requisitos legales para operar la plataforma EPI10 (OpenEMR propio) frente a Healthie

Briefing para Raúl · demo con Carmen y Romi · 13 oct 2026 · SKI2-274

## TL;DR

**Responsable de los tres tipos de dato, antes y ahora: EPI10.** Lo que cambia es dónde viven y quién los custodia técnicamente.

| Dato | Antes · con Healthie | Ahora · EPI10 Salud MVP v0.5 | ¿Trabajo extra frente a Healthie? |
|---|---|---|---|
| **Personales** (nombre, email, dirección, pago) | Healthie (EE. UU.) + Stripe + Odoo. Custodia: Healthie y Stripe | Stripe + Odoo + plataforma EPI10 (UE). Custodia: Stripe, Odoo y Skilland | **Poco.** Contrato con Skilland y con el proveedor de correo. Stripe y Odoo, igual que antes |
| **Salud y hábitos** (consentimiento, cuestionario, mensajes, informe) | Healthie, en EE. UU. Custodia: Healthie (sin contrato de datos firmado) | Plataforma EPI10, en el servidor de EPI10 (UE). Custodia: Skilland (+ hosting) | **Sí, es lo nuevo.** Seguridad del servidor (copias, doble factor, accesos, logs) y contrato con Skilland y el hosting. A cambio, deja de haber envío a EE. UU. |
| **Genéticos** (resultado de TellmeGen) | TellmeGen → el orquestador lo usa en memoria y lo borra; a la IA, solo texto seudonimizado; el informe final, en Healthie (EE. UU.) | Igual, pero el informe final queda en la plataforma EPI10 (UE) | **No por la arquitectura.** Lo pendiente (consentimiento genético, papel de TellmeGen, evaluación de impacto) ya hacía falta con Healthie |

**Certificaciones:** ninguna obligatoria, ni antes ni ahora. Las de Healthie eran suyas y para EE. UU.

> **Aviso.** Esto es orientación de consultoría tecnológica, no asesoramiento jurídico. Sirve para preparar la conversación y ordenar el trabajo; las decisiones (bases jurídicas, EIPD, DPD, contratos) las valida el abogado o DPD de EPI10.
>
> Leyenda: **[seguro]** = lo dice la norma de forma directa · **[interpretación]** = criterio razonable nuestro · **[abogado]** = hay que confirmarlo.

---

## A. Respuesta corta (para decir en voz alta)

1. **No hace falta ninguna certificación para operar.** Ni en España ni en la UE se exige al responsable del tratamiento estar certificado. **[seguro]**
2. Lo que exige el RGPD es **cumplir unas obligaciones y poder demostrarlo** (responsabilidad proactiva, art. 5.2). Es cumplimiento documentado, no un sello. **[seguro]**
3. Esas obligaciones **ya las tenía EPI10 con Healthie**: la responsable de los datos de sus clientas siempre ha sido EPI10, no Healthie. **[seguro]**
4. Las certificaciones de Healthie (HIPAA, SOC 2, HITRUST) eran **del proveedor y para el mercado de EE. UU.**; en España no acreditan cumplimiento del RGPD. **[seguro]**
5. Con la plataforma propia, esas garantías se sustituyen por **control propio**: servidor en la UE, contratos con cada proveedor, medidas de seguridad escritas y una evaluación de impacto. **[interpretación]**
6. Ganamos algo importante: **los datos de salud dejan de viajar a EE. UU.** y con Healthie el contrato de protección de datos nunca llegó a firmarse. **[seguro]**
7. Lo nuevo es que EPI10 asume el alojamiento y la seguridad; **se delega** en un hosting UE y en Skilland como encargada, con contrato. **[interpretación]**
8. Antes de usarlo con clientas reales hay una lista corta de deberes (sección G): contrato de encargo, evaluación de impacto, textos de consentimiento revisados y endurecer el servidor. **[interpretación]**
9. Hoy es un experimento con datos ficticios: **no hay ningún incumplimiento** porque no hay datos reales. **[seguro]**

---

## B. Lo que ya tenía EPI10 con Healthie y sigue igual

| Obligación | Norma | Qué significa para EPI10 |
|---|---|---|
| Ser **responsable del tratamiento** | RGPD art. 4.7, 24 | EPI10 decide para qué y cómo se usan los datos; responde ante la clienta y la AEPD. |
| **Base jurídica** + excepción del art. 9 | RGPD arts. 6 y 9.2.a | Datos genéticos y de salud = categoría especial. Base habitual: **consentimiento explícito** (o ejecución del contrato + consentimiento explícito para lo genético). **[abogado]** |
| **Informar** a la clienta | RGPD arts. 13-14; LOPDGDD art. 11 | Política de privacidad por capas: quién trata, para qué, cuánto tiempo, proveedores, derechos. |
| **Derechos** (acceso, rectificación, supresión, portabilidad…) | RGPD arts. 15-22 | Procedimiento para responder en 1 mes. |
| **Registro de actividades** | RGPD art. 30 | Obligatorio aunque sea pyme, porque trata categorías especiales (la excepción del 30.5 no aplica). **[seguro]** |
| **Seguridad** adecuada al riesgo | RGPD art. 32 | Medidas técnicas y organizativas, documentadas. |
| **Brechas**: notificar a la AEPD en 72 h y, si el riesgo es alto, a las clientas | RGPD arts. 33-34 | Procedimiento y registro de incidencias. Ya aplicaba con Healthie (Healthie avisaba a EPI10; EPI10 notificaba). |
| **DPD** si procede | RGPD art. 37; LOPDGDD art. 34 | Ver H.7. Probablemente sí. **[abogado]** |
| Normativa sectorial del **test genético** | Ley 14/2007 de Investigación Biomédica (análisis genéticos, consentimiento escrito, consejo genético) | No depende de la plataforma: aplica igual con Healthie u OpenEMR. **[abogado]** |

Mensaje: **cambiar de herramienta no cambia quién es responsable**. Lo que cambia es quién hace el trabajo técnico.

---

## C. Lo que cambia al pasar a OpenEMR propio

**1. Desaparece la transferencia internacional de los datos de salud.** **[seguro]**
Con Healthie, la ficha completa (consentimiento, cuestionario, informe) vivía en EE. UU. (AWS/Aptible). Eso obligaba a apoyarse en el **EU-US Data Privacy Framework** (si Healthie estaba adherido) o en **cláusulas contractuales tipo** más evaluación de la transferencia. El DPF sigue vigente: el Tribunal General lo validó el 3 sep 2025 (asunto Latombe), pero está **recurrido ante el TJUE** (C-703/25 P, pendiente). Es un riesgo que con OpenEMR en la UE deja de afectar a los datos de salud.

Matiz importante: **quedan transferencias menores** que hay que cubrir igualmente:
- **Proveedor LLM** (Anthropic, EE. UU.) recibe el texto del informe **seudonimizado**. Seudonimizado sigue siendo dato personal (y de salud). Necesita DPA con cláusulas tipo/DPF. Alternativa: proveedor o región UE. **[interpretación]**
- **Stripe** (entidad europea, con transferencias a EE. UU. cubiertas por sus propias cláusulas): solo datos de pago y contacto, no de salud.

**2. Aparece la responsabilidad de alojamiento y seguridad.** **[seguro]**
Antes la seguridad de la plataforma era de Healthie. Ahora es de EPI10, que la delega:
- **Hosting UE** (o servidor propio de EPI10): encargado del tratamiento si es un proveedor externo → DPA.
- **Skilland**: encargada del tratamiento para mantenimiento → **contrato de encargo** (art. 28).

**3. Evaluación de impacto (EIPD): muy probablemente obligatoria.** **[interpretación sólida]**
- La lista de la AEPD (art. 35.4, 2019) incluye, entre otros: tratamientos de **datos genéticos** para cualquier fin; categorías especiales **a gran escala**; **perfilado/evaluación** de aspectos personales (salud, hábitos); uso de **tecnologías nuevas** (aquí, IA para el borrador); datos de personas **vulnerables**.
- Criterio AEPD/CEPD: cumplir **dos o más** criterios implica, por regla general, EIPD; el CEPD (dictamen 6/2019) matizó que lo genético por sí solo no basta, pero aquí se suman genético + salud + perfilado nutricional + IA.
- Conclusión: **hacerla antes de operar**. Además es el mejor documento para enseñar «cumplimos» sin certificación.
- Era igual de necesaria con Healthie; la diferencia es que ahora la hacemos sobre una arquitectura que controlamos.

**4. Contratos con cada proveedor (art. 28).**

| Proveedor | Papel probable | Qué hace falta |
|---|---|---|
| **Skilland** | Encargada (mantenimiento, acceso técnico) | Contrato de encargo Skilland-EPI10: objeto, instrucciones, confidencialidad, medidas, subencargados, devolución/borrado. |
| **Hosting UE** | Encargado | DPA del proveedor + ubicación UE garantizada. Si es servidor físico de EPI10, no hay encargado, pero sí más medidas propias. |
| **TellmeGen** | **Depende** **[abogado]** | Si analiza por cuenta de EPI10 con sus instrucciones → encargado (DPA). Si la clienta acepta también condiciones de TellmeGen y este decide sobre sus muestras → **responsable independiente** (o corresponsable, art. 26). Hay que leer su contrato. |
| **Odoo** | Encargado si es Odoo Online (Odoo S.A., Bélgica); nada si es autoalojado por EPI10 | DPA de Odoo S.A. si es SaaS. Solo contacto, envío e hitos: nunca datos genéticos. |
| **Stripe** | Responsable independiente para su parte regulada (pagos) y encargado en lo demás | Aceptar su DPA (está en sus condiciones). |
| **Correo** (SMTP) | Encargado | DPA del proveedor (preferible UE). Solo envía el enlace de acceso. |
| **Proveedor LLM** | Encargado (con transferencia a EE. UU.) | DPA + cláusulas tipo/DPF; confirmar que no entrena con los datos ni los retiene. |

**5. Portabilidad y salida: ganamos.** Los datos están en una base de datos de EPI10 en formato abierto; no hay que pedírselos a nadie.

**6. Historia clínica: punto abierto.** **[abogado]** Si el servicio se considera asistencia sanitaria (dietista-nutricionista, profesión sanitaria regulada), podría aplicar la Ley 41/2002 (conservación de la historia clínica, al menos 5 años) y la autorización de centro sanitario en Canarias. Esto afecta a los plazos de borrado y **es igual con o sin Healthie**.

---

## D. Qué cubre OpenEMR de serie y qué hay que hacer

**De serie en OpenEMR (hay que activarlo y comprobarlo, no venderlo como automático):**
- **Cifrado de documentos en disco** (en nuestra instancia, activado). La base de datos no va cifrada por defecto → cifrar el disco del servidor.
- **Registro de auditoría** de accesos y cambios (activado).
- **Roles y permisos** (ACL): cada perfil del equipo ve solo lo suyo.
- **Doble factor** (TOTP/U2F) para el equipo: **existe, pero hoy nadie lo tiene activado** → obligatorio antes de operar.
- Bloqueo por intentos fallidos, sesiones con caducidad.
- Cifrado en tránsito: lo da el servidor (HTTPS/TLS), no OpenEMR por sí solo.
- Copias: OpenEMR no hace copias por sí mismo; se montan en el servidor.

**Lo que hay que hacer en el servidor:**
1. **Ubicación UE** (contrato con la ubicación por escrito).
2. **Endurecimiento**: sistema y OpenEMR actualizados, solo puertos necesarios, cortafuegos, disco cifrado.
3. **Acceso de administración** solo por VPN y con doble factor; cuentas nominales, nada compartido.
4. **Copias de seguridad** cifradas, fuera del servidor (en la UE) y con **restauración probada**.
5. **Plan de retención y borrado** (cuánto se guarda cada dato y quién lo borra).
6. **Registro de incidencias** y procedimiento de brecha (72 h).
7. **Corregir antes de producción** lo ya detectado en la arquitectura: el log de la API de OpenEMR guarda respuestas completas (incluye enlace de acceso, nombre y email) y el log de Apache guarda el token del enlace; desactivar clientes OAuth del prototipo.

**HIPAA y ONC no aplican en España.** OpenEMR tiene certificación ONC (EE. UU.) en algunas versiones: es un dato de calidad del software, **no un cumplimiento del RGPD**. No lo vendamos así.

---

## E. Certificaciones y marcos opcionales (dan garantías, no son obligatorios)

| Marco | Qué es | ¿Tiene sentido aquí? |
|---|---|---|
| **ISO 27001** | Sistema de gestión de seguridad certificado | **Sí, del hosting**: elegir un proveedor UE con ISO 27001. Certificar a Skilland o a EPI10 es caro para una pyme; no ahora. |
| **ENS** (Esquema Nacional de Seguridad) | Obligatorio solo para el sector público y sus proveedores | Solo si EPI10 trabaja con el Servicio Canario de Salud u otra administración. Hosting con ENS = plus. |
| **Certificación RGPD (art. 42)** | Sellos aprobados por las autoridades (p. ej. Europrivacy, sello europeo) | Existen pocos y son voluntarios; casi nadie los usa en pymes. No recomendable ahora. |
| **Códigos de conducta** (art. 40) | Adhesión a un código sectorial aprobado | Interesante si aparece uno aplicable a salud/nutrición; vigilar. |
| **Sellos de confianza** (comercio electrónico) | Confianza Online y similares | Más de marketing que de protección de datos. |

**Recomendación realista:** hosting UE con ISO 27001 (y ENS si sale barato), contrato de encargo con Skilland, EIPD hecha, y un dossier de cumplimiento de 10-15 páginas. Eso es más defendible ante la AEPD que cualquier sello.

---

## F. Comparativa

| Dimensión | Con Healthie | Con OpenEMR propio | Qué hay que hacer |
|---|---|---|---|
| Ubicación de los datos | EE. UU. (AWS/Aptible) | Servidor de EPI10 o hosting UE | Fijar la ubicación UE por contrato |
| Transferencia internacional | Sí, de toda la ficha de salud (DPF o cláusulas tipo) | No para la ficha; sí, menor, para LLM (seudonimizado) | DPA con cláusulas tipo del LLM, o proveedor UE |
| Encargado del tratamiento | Healthie (DPA nunca firmado) | Skilland + hosting + correo + LLM | Contrato art. 28 con cada uno |
| Certificaciones del proveedor | HIPAA, SOC 2, HITRUST (EE. UU.) | Ninguna obligatoria; ISO 27001 del hosting | Elegir hosting certificado |
| Control de accesos y auditoría | Lo que Healthie ofreciera, sin visibilidad | Roles, auditoría y doble factor de OpenEMR, bajo control de EPI10 | Activar doble factor, revisar roles |
| Copias y continuidad | Del proveedor | Responsabilidad propia (delegable) | Copias cifradas UE + restauración probada |
| Brechas de seguridad | Healthie avisa, EPI10 notifica | Skilland/hosting avisan, EPI10 notifica | Procedimiento de 72 h y registro |
| Portabilidad y salida | Depende de la exportación de Healthie | Datos en casa, formato abierto | Nada especial |
| Coste de cumplimiento | Oculto en la cuota (y el de la transferencia) | Explícito: EIPD, contratos, mantenimiento | Presupuestar (puntual + mantenimiento) |
| Dependencia del proveedor | Alta: cambió precio y condiciones | Baja: software libre, código de EPI10 | Mantener OpenEMR al día |

---

## G. Checklist antes de operar con clientas reales

Orden sugerido. **Imp.** = imprescindible · **Rec.** = recomendable.

| # | Acción | Responsable | Tipo |
|---|---|---|---|
| 1 | Decidir si EPI10 es (o no) actividad sanitaria: historia clínica, autorización de centro, DPD | Abogado + EPI10 | Imp. |
| 2 | Designar DPD (interno o externo) o documentar por qué no | EPI10 + abogado | Imp. |
| 3 | Aclarar el papel de TellmeGen y firmar el contrato que corresponda | EPI10 + abogado | Imp. |
| 4 | Contrato de encargo Skilland-EPI10 (art. 28) | Skilland + EPI10 | Imp. |
| 5 | Elegir hosting UE y firmar su DPA (o confirmar servidor propio) | EPI10 + Skilland | Imp. |
| 6 | DPA con correo, Odoo (si SaaS), Stripe y proveedor LLM | Skilland prepara, EPI10 firma | Imp. |
| 7 | Evaluación de impacto (EIPD) | Skilland (parte técnica) + DPD/abogado | Imp. |
| 8 | Textos legales: consentimiento explícito genético/salud, política de privacidad, aviso de uso de IA con revisión humana | Abogado | Imp. |
| 9 | Registro de actividades de tratamiento | EPI10 + DPD | Imp. |
| 10 | Endurecer servidor: TLS, disco cifrado, VPN, doble factor, corregir logs de OpenEMR | Skilland | Imp. |
| 11 | Copias cifradas y prueba de restauración | Skilland | Imp. |
| 12 | Plan de retención y borrado | EPI10 + abogado; Skilland lo implementa | Imp. |
| 13 | Procedimiento de brechas y derechos (con plantillas) | DPD + Skilland | Imp. |
| 14 | Formación breve y compromiso de confidencialidad del equipo de EPI10 | EPI10 | Imp. |
| 15 | Dossier de cumplimiento (medidas del art. 32 por escrito) | Skilland | Rec. |
| 16 | Prueba de intrusión externa antes del lanzamiento | Skilland (proveedor externo) | Rec. |
| 17 | Proveedor LLM con región UE | Skilland | Rec. |
| 18 | Revisión anual de medidas y EIPD | DPD + Skilland | Rec. |

---

## H. Preguntas probables y respuestas

**1. «¿Esto es legal sin certificación?»**
Sí. Ninguna norma exige certificación para tratar datos de salud en España. Exige cumplir y documentarlo; eso es lo que proponemos. **[seguro]**

**2. «¿Qué nos daba Healthie que ahora no tenemos?»**
Un proveedor que se ocupaba de la seguridad de la plataforma y sus sellos americanos. Lo sustituimos con hosting UE certificado, Skilland como encargada y medidas escritas. Y ganamos que los datos no salen a EE. UU. (con Healthie ni siquiera había DPA firmado).

**3. «¿Y si hay una brecha?»**
Skilland o el hosting avisan a EPI10 sin demora; EPI10 evalúa y, si hay riesgo, notifica a la AEPD en 72 h y, si el riesgo es alto, a las clientas. Igual que con Healthie, pero ahora con logs y auditoría propios para investigar. **[seguro]**

**4. «¿Quién responde?»**
Ante las clientas y la AEPD, **EPI10** como responsable (también con Healthie). Skilland y el hosting responden ante EPI10 por contrato, y directamente si incumplen sus obligaciones de encargado (art. 82). **[seguro]**

**5. «¿Podemos usarlo ya con clientas reales?»**
Todavía no. Es un experimento con datos ficticios. Antes hay que cerrar los imprescindibles de la checklist: contratos, EIPD, textos legales y endurecer el servidor. Es trabajo de semanas, no de meses. **[interpretación]**

**6. «¿Qué pasa con los datos genéticos del laboratorio?»**
El resultado de TellmeGen se usa para preparar el borrador y **se borra**: no se guarda en disco ni en base de datos. A la IA solo llega texto seudonimizado. Lo que queda es el informe final en la ficha de la clienta. Falta aclarar si TellmeGen es encargado o responsable propio. **[abogado]**

**7. «¿Necesitamos DPD?»**
Muy probablemente sí: el art. 37 RGPD lo exige si la actividad principal es tratar categorías especiales a gran escala, y la LOPDGDD (art. 34) lo exige a centros sanitarios con historia clínica. Puede ser externo y a tiempo parcial. **[abogado]**

**8. «¿La IA que hace el borrador es un problema?»**
Es un proveedor más: encargado con DPA, recibe texto seudonimizado y una persona valida siempre antes de publicar. Hay que decírselo a la clienta en la política de privacidad y cubrir la transferencia (o usar región UE). **[interpretación]**

**9. «¿Cuánto cuesta cumplir?»**
Una parte puntual (EIPD, contratos, textos: abogado/DPD + Skilland) y una recurrente dentro del mantenimiento (actualizaciones, copias, vigilancia). Con Healthie ese coste existía igual, dividido entre la cuota y lo que EPI10 hacía por su cuenta. Sin cifra hoy: hay que presupuestarlo. **[interpretación]**

**10. «¿Si dejamos Skilland, nos quedamos atrapados?»**
No. El software es libre y el código es de EPI10; cualquier proveedor puede mantenerlo. El contrato de encargo obliga a devolver y borrar los datos al terminar. **[seguro]**

---

## Fuentes consultadas

- RGPD (Reglamento (UE) 2016/679), arts. 4, 5, 6, 9, 13-22, 24, 26, 28, 30, 32-35, 37, 40, 42, 82; LOPDGDD (LO 3/2018), arts. 9, 11, 34.
- AEPD, [listas de tratamientos que requieren EIPD (art. 35.4)](https://www.aepd.es/documento/listas-dpia-es-35-4.pdf) y [nota de prensa](https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-aepd-publica-el-listado-de-tratamientos-en-los-que-es); dictamen 6/2019 del CEPD ([resumen](https://finreg360.com/alerta/el-cepd-publica-su-dictamen-sobre-la-lista-de-tratamientos-que-precisan-evaluacion-de-impacto-enviada-por-la-aepd/)).
- DPF: [recurso Latombe ante el TJUE, C-703/25 P](https://www.wilmerhale.com/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20251201-european-court-of-justice-to-review-challenge-to-eu-us-data-privacy-framework); [estado a junio de 2026](https://ieu-monitoring.com/editorial/microsoft-backs-eu-commission-in-eu-court-case-on-transatlantic-data-flows-and-privacy/1244467/).
- Arquitectura del sistema v1 (12 oct), §7 «Seguridad y datos personales».
