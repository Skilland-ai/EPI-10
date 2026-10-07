# HERDR — dinámica de trabajo

Validada por Raúl el 2026-10-03. Aplica a toda ejecución del roadmap de EPI10.

## Workspace «EPI-10»

Directorios de trabajo:
- Documentación: `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/EPI-10`
- Código del orquestador: `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/epi10-orquestador` (GitHub `Skilland-ai/epi10-orquestador`, privado)

Patrón de la skill de Herdr (actualizado el 2026-10-03):

- **Pestaña «Orquestador»:** solo el orquestador. A su derecha, un panel de un tercio del ancho con `watch -t -n 2 cat` de `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10-project/EPI10_PENDIENTES.md`, fuera de los repos. Ese archivo recoge **solo lo que bloquea a un agente**: credenciales, decisiones sin las que construiría algo equivocado o diálogos de aprobación. Cada entrada dice qué agente espera. Las tareas generales de Raúl (correos, comunicación con el cliente) van en Linear, no aquí. Cada bloqueo nuevo se avisa con `herdr notification show "Raúl, te necesito" ... --sound request`. Es el **único sonido** permitido: los sonidos automáticos de los agentes están apagados en la config de Herdr, y los subagentes nunca lanzan notificaciones.
- **Agentes:** en pestañas agrupadas por hito o función (p. ej. «P1 · Monolito», «P2 · Informes», «Revisión»), con 2–4 agentes por pestaña como paneles divididos. Nunca dentro de la pestaña del orquestador.
- Los servidores, builds y Docker pesados se ejecutan en hermes-node.

## Modelos

- **Solo Claude Code. Nunca Codex**, ni para ejecutar ni para revisar.
- Implementación: `--model claude-opus-5-5 --effort medium`.
- Complejidad o arquitectura: `--model claude-opus-5-5 --effort high`.

Lanzamiento:

```bash
herdr agent start ski2-<n> --kind claude --pane <pane-id> -- --model claude-opus-5-5 --effort medium
```

## Ciclo de una issue

1. El orquestador elige la siguiente issue en Linear y escribe en ella el brief: objetivo, criterios de terminado, archivos y guardrails.
2. Lanza el agente en la pestaña 2 con el brief (`herdr agent prompt ... --wait`).
3. El revisor de la pestaña 3 comprueba la entrega contra los criterios. El orquestador verifica la evidencia.
4. Cierre:
   - **Issues internas o técnicas:** el orquestador las cierra con la evidencia en un comentario.
   - **Issues que afectan al cliente** (Carmen, Healthie, mantenedor de Odoo, entregables a EPI10): se proponen a Raúl y se cierran solo con su OK.
5. Actualizar `02_context/01_estado_actual.md`, integrar la rama del worktree y hacer push.

## Reglas

- Linear es la fuente de verdad. Solo el orquestador crea o reorganiza issues.
- Solo Raúl envía comunicaciones a terceros. Los agentes redactan borradores.
- Paralelismo según necesidad (Raúl, 2026-10-03): no hay tope fijo de 2, pero tampoco se lanzan agentes porque haya recursos. Se añade un agente solo cuando una issue concreta lo justifica: trabajo independiente que gana yendo en paralelo.
  - Techo de recursos antes de cada lanzamiento: más de 3 GB de RAM disponible y carga por debajo de 12. Se cuentan también los agentes de otros workspaces de Herdr.
  - Una issue por agente, cada una en su worktree. Las dependientes esperan. Los builds y servidores pesados van a hermes-node.
- Si un agente se bloquea en una aprobación o pregunta, se escala a Raúl. El orquestador no responde en su nombre.
- Nada de datos reales de pacientes ni secretos en prompts. Las claves van en archivos (p. ej. la API de Linear en `~/.config/linear/key`).
- Fase 3 (customer journey): la lleva el orquestador directamente con Raúl. Los agentes de ejecución entran en la fase 4.
