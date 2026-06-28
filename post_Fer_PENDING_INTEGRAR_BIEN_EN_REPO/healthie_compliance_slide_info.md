Si hablamos de Healthie —gethealthie.com—, sí hay bastante material público para defenderlo como proveedor serio, bastante más que una herramienta genérica de portal/CRM.

Healthie declara oficialmente que cumple o dispone de: HIPAA, SOC 2 Type 2, HITRUST R2 Certification, ONC Certification, GDPR, PIPEDA/PHIPA, FERPA, CCPA, PCI vía Stripe y accesibilidad WCAG 2.1 A/AA. Además, su propia documentación dice que tienen Trust Center con documentación de aseguramiento como SOC 2 Report y HITRUST letter, y que realizan assessments de seguridad, vendor assessments y pentest anual.

Para venderlo internamente: sí, Healthie pasa un primer filtro de credibilidad como proveedor sanitario/healthtech. Los sellos más fuertes para nuestra narrativa son:

SOC 2 Type II: auditoría de controles de seguridad, disponibilidad, confidencialidad, privacidad, etc.
HITRUST R2: certificación muy potente en entorno healthcare, más específica que un simple “cumplo RGPD”.
HIPAA + BAA: muy relevante en EE. UU.; no sustituye RGPD, pero demuestra madurez en tratamiento de información sanitaria.
ONC Certification: certificación estadounidense de tecnología sanitaria/EHR. Healthie indica incluso certificación 2015 compliant por un ONC-ACB.

Pero la frase fina es esta: esto nos da confianza inicial, no aprobación automática. Para EPI10, al estar en España/UE y tratar potencialmente datos de salud y genética, hay que pedirles antes de cerrar configuración: DPA/GDPR, subencargados, ubicación de datos, transferencias internacionales, medidas técnicas y organizativas, retención/borrado, exportación de datos, logs/auditoría, y el informe SOC 2/HITRUST actualizado desde su Trust Center. El RGPD exige diligencia en la elección del encargado del tratamiento; la AEPD lo plantea precisamente como una obligación del responsable al seleccionar proveedores.

Además, encaja con lo que ya habíamos dejado protegido en la propuesta: Healthie queda pendiente de validación final de plan, API/add-ons, DPA/GDPR, idioma y condiciones, y Odoo no debe funcionar como repositorio clínico/genético, sino como backoffice operativo. También dejamos escrito el criterio de no almacenar datos genéticos crudos en Odoo ni en PostgreSQL técnico, con minimización, pseudonimización, logs limpios y control de accesos