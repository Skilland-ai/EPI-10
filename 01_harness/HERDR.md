# HERDR — dinámica de trabajo

Validada por Raúl el 2026-10-03. Aplica a toda ejecución del roadmap de EPI10.

## Workspace «EPI-10»

Directorio de trabajo: `~/Escritorio/Skilland.ai/Skilland.ai-CONSULTING/EPI-10`.

| Pestaña | Quién | Para qué |
|---|---|---|
| 1 · orquestador | Claude Code (sesión principal) | Habla con Raúl, gobierna Linear, escribe el brief de cada issue, revisa entregas y cierra issues. |
| 2 · ejecución | Un agente Claude Code por issue, con nombre `ski2-<n>` | Ejecuta la issue. Si toca código, trabaja en su propio git worktree (`herdr worktree create --branch ski2-<n>`). |
| 3 · revisión | Agente revisor Claude Code | Contrasta la entrega con los criterios de la issue antes de cerrarla. |
| 4 · servicios | Paneles normales | Logs y túneles hacia hermes-node. Los servidores, builds y tests pesados corren allí. |

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
- Paralelismo máximo mientras el PC aguante (autorizado por Raúl el 2026-10-03). Antes de lanzar cada agente, comprobar con `free -h` y `uptime`:
  - lanzar solo si quedan **más de 3 GB de RAM disponible** y la **carga está por debajo de 12** (el equipo tiene 16 núcleos);
  - si no se cumple, esperar a que termine algún agente;
  - contar también los agentes de otros workspaces de Herdr.
  Una issue por agente, cada una en su worktree. Las que dependen de otra issue esperan a que esta esté cerrada. Los builds y servidores pesados siguen yendo a hermes-node.
- Si un agente se bloquea en una aprobación o pregunta, se escala a Raúl. El orquestador no responde en su nombre.
- Nada de datos reales de pacientes ni secretos en prompts. Las claves van en archivos (p. ej. la API de Linear en `~/.config/linear/key`).
- Fase 3 (customer journey): la lleva el orquestador directamente con Raúl. Los agentes de ejecución entran en la fase 4.
