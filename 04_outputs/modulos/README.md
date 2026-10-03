# Sandbox por módulos

Este espacio reúne el trabajo de desarrollo de EPI10 y la documentación que se
genera al ejecutarlo. El foco de la sesión del 2026-09-15 es Stripe.

[Planificación de Linear](../planificacion/linear/README.md) ·
[Spec activa 011](../../03_specs/now/011_now.md)

## Módulos

| Módulo | Propósito | Estado de este espacio |
| --- | --- | --- |
| [Stripe](stripe/README.md) | Compra, cobro, resultado y trazabilidad del pago | Activo: acceso al panel y entorno de pruebas observados; catálogo, checkout y pruebas pendientes |
| [Healthie](healthie/README.md) | Experiencia y portal del cliente | Punto de entrada al discovery existente |
| [Odoo](odoo/README.md) | Seguimiento operativo del caso | Espacio preparado; implementación por iniciar |
| [Copilot](copilot/README.md) | Borrador del informe y revisión humana | Espacio preparado; implementación por iniciar |
| [Journey](journey/README.md) | Recorrido del cliente y del equipo | Espacio preparado; flujo vigente por enlazar y validar |
| [Integración](integracion/README.md) | Intercambio de estados y pruebas del recorrido completo | Espacio preparado; contratos por definir |

Crear una carpeta no acredita que el módulo esté construido. Los módulos distintos
de Stripe sirven de entrada y continuidad; su ejecución se abordará según la
planificación y las siguientes instrucciones del usuario.

## Dónde guardar cada cosa

- `README.md` de cada módulo: objetivo, estado verificado, enlaces y próximo paso.
- `docs/bitacora.md`: acciones, resultados, incidencias y contexto interno.
- `docs/decisiones.md`: decisión o propuesta, motivo, alcance y estado.
- `docs/guia_cliente.md`: instrucciones reutilizables para el equipo cliente.
- `docs/pruebas.md`: casos, resultado esperado, resultado obtenido y evidencia.
- `evidencias/`: capturas y registros seleccionados, fechados y descritos.
- `app/` o `src/`: código cuando exista una implementación concreta; crear solo
  la estructura que esta necesite. Los comandos reales de ejecución irán en su README.
- Trabajo temporal y exportaciones de herramientas: `05_scratch/`, fuera de este árbol.

Stripe inaugura el formato. Los demás módulos añadirán documentos cuando tengan
trabajo que registrar, sin generar plantillas vacías en bloque.

## Documentar mientras trabajamos

Después de cada paso significativo:

1. Añadir a la bitácora **acción → resultado → evidencia → decisión → siguiente paso**.
2. Indicar si el dato está **observado**, **recomendado** o **pendiente de verificar**.
   Usar `Unknown` cuando falta el dato; una captura previa a guardar no prueba el guardado.
3. Guardar evidencia útil con nombre `YYYY-MM-DD_NN_descripcion.ext`, sin credenciales
   ni datos personales o sanitarios reales.
4. Actualizar la guía con instrucciones verificadas. Las instrucciones preparadas
   para pasos aún no ejecutados deben identificarse como pendientes de validar.
5. Actualizar las pruebas solo con resultados obtenidos y enlazar las tareas
   relacionadas. El avance local no cambia por sí solo los estados de Linear.
6. Dejar el próximo paso en el README del módulo para retomar sin reconstruir el chat.

## Guías con marca

La guía de cada módulo será la fuente editable para una futura entrega Skilland.
Las notas operativas internas se conservan aparte. El PDF breve —por ejemplo, tres
páginas— y una posible skill de maquetación quedan como siguientes formatos a
producir cuando se soliciten. Esta base documental todavía no es una entrega de
implementación aceptada por el cliente.
