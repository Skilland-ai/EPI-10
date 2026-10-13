SKI2-268 · Tramo 3, punto 5: el código de barras que la clienta envía desde su portal de OpenEMR (guía del kit, módulo `v13-kit`) llega al caso (D8, SKI2-185) y salta la tarea de recogida para Aitor.

## Qué trae

- **Contrato 1.1** (`openemr/contrato.ts`): `estado_formularios` acepta `kit: {codigo, enviado_en, foto}`, **opcional** (un módulo 1.0 no lo manda). El monolito solo comprueba la versión mayor.
- **`openemr/kit.ts`** (puro): `decidirKit` (Odoo vacío → registrar; igual sin espacios/mayúsculas → nada; distinto → conflicto), `modalidadKit` (manda `estado_formularios.test.modalidad` del onboarding; si es null, casa por defecto y sede con `cita_agendada` o cita no cancelada en la tarea), notas para Aitor sin datos personales.
- **Consulta periódica** (`openemr.sync.ts`): nuevo trabajo `openemr.sync_kit` por caso en `test_pedido`, `test_recibido`, `cita_agendada`, `pendiente_reagendar` o `falta_codigo_barras`. Con código nuevo, en este orden: actividad **«Gestionar recogida con el proveedor»** (modalidad, foto sí/no, fecha; datos de envío «en la pestaña EPI10 de la tarea», que escribe el onboarding) → `x_epi10_codigo_barras` → cierre de la actividad D8 «Completar código de barras» si estaba abierta → evento `openemr.kit_received`. Repetible: con el campo ya igual no hace nada.
- **`falta_codigo_barras` deja de saltar**: con el código ya en Odoo, «Test realizado» lleva a `test_realizado` (`stage-rules` sin cambios). Si llega tarde, la reconciliación ve el campo relleno y el caso sigue.
- **Conflicto**: si Odoo ya tiene otro código, no se pisa; actividad `revisar_caso` «Revisar código del kit», una sola vez por código (evento `openemr.kit_conflict`).
- **Odoo**: tipo de actividad nuevo `EPI10 · Gestionar recogida con el proveedor` → **hay que ejecutar `npm run odoo:setup`** (idempotente) en cada instancia antes de desplegar; sin él, la actividad falla con `OdooNotConfiguredError` y se escala.
- Simulador de OpenEMR a 1.1.0 con `enviarKit()`.

## Evidencia (hermes-node, `mise exec node@22`)

- `npm run typecheck` y `npm run lint`: limpios. `prettier --check`: limpio.
- `npm test`: tras rebasar sobre master c015d7b (#26, onboarding): unit **659 passed, 1 skipped (62 ficheros)**; integración **372 passed, 3 skipped (28 ficheros + openemr-real omitido)**. [salida](https://github.com/Skilland-ai/EPI-10/blob/9f02c8e/04_outputs/modulos/crisis-healthie/renove/batida/capturas/v13/kit/evidencia_vitest.txt) (EPI-10 commit 9f02c8e, pendiente de push)
- Integración nueva en `openemr-flow.int-spec.ts`: kit en casa (paso 3 con envío; D8 + recogida una vez + «Test realizado» sin `falta_codigo_barras`), kit tarde con test en la sede elegido en el onboarding (nota «Modalidad: sede», D8 resuelta y caso a `test_realizado`), y código distinto en Odoo (no se pisa, revisión una vez).

## A revisar con lupa
- Orden actividad → campo (si falla entre medias, la pasada siguiente lo completa sin duplicar).
- Modalidad: manda la del onboarding (`test.modalidad`); la deducción por cita solo queda para módulos 1.0 o clientas sin paso 3.
- Módulo de OpenEMR: PR de `v13-kit` en `epi10-oe-module` (contrato 1.1.0 junto al bloque `test` del onboarding).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
