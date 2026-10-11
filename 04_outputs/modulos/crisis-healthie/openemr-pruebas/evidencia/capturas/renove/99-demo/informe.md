# Recorrido final de la demo del renove (99-demo)

> **Estado final de la demo (11 oct, tras la limpieza):** la instancia solo tiene a Lucía (pid 1). Las capturas de esta carpeta son del recorrido sobre la instancia limpia (sección «Recorrido tras la limpieza»). Abajo se conserva el primer recorrido, con las pacientes de prueba aún presentes.

Instancia hermes-node, OpenEMR 8.4.1 · instalado `Skilland-ai/epi10-oe-module` main **b013569** con `instalar_demo.sh` (contrato + interfaz + configuración del área 7) · 2026-10-11 20:57 · solo datos ficticios.

| Cara | Pantalla | Comprobación | Resultado | Detalle |
|---|---|---|---|---|
| Portal | escritorio | Login con el shell EPI10 | ✅ | login-portal |
| Portal | escritorio | Login sin pedir correo | ✅ |  |
| Portal | escritorio | Entra al inicio | ✅ | /portal/home.php |
| Portal | escritorio | Cabecera EPI10 y saludo | ✅ |  |
| Portal | escritorio | Inicio sin desbordar | ✅ |  |
| Portal | escritorio | Menú de usuario: Ajustes, Ayuda y Cerrar sesión | ✅ |  |
| Portal | escritorio | Tarjeta documents-go → mis-documentos (isla tareas) | ✅ | vista=mis-documentos |
| Portal | escritorio | mis-documentos sin desbordar | ✅ |  |
| Portal | escritorio | Tarjeta appointments-go → citas (isla calendario) | ✅ | vista=citas |
| Portal | escritorio | citas sin desbordar | ✅ |  |
| Portal | escritorio | Tarjeta messages-go → mensajes (isla chat) | ✅ | vista=mensajes |
| Portal | escritorio | mensajes sin desbordar | ✅ |  |
| Portal | escritorio | Tarjeta reports-go → mi-informe | ✅ | vista=mi-informe |
| Portal | escritorio | mi-informe sin desbordar | ✅ |  |
| Portal | escritorio | Vuelta al inicio muestra el panel | ✅ |  |
| Portal | escritorio | Sin errores de JS ni 5xx | ✅ |  |
| Portal | escritorio | Primer acceso en español | ✅ |  |
| Back office | escritorio | Login con el shell EPI10 | ✅ |  |
| Back office | escritorio | operaciones.prueba: primera pestaña = inicio EPI10 (no el calendario) | ✅ |  |
| Back office | escritorio | operaciones.prueba: main.php sin desbordar | ✅ |  |
| Back office | escritorio | clientes: carga con EPI10 UI | ✅ | HTTP 200 · vista=clientes |
| Back office | escritorio | clientes: sin desbordar | ✅ |  |
| Back office | escritorio | ficha: carga con EPI10 UI | ✅ | HTTP 200 · vista=ficha-cliente |
| Back office | escritorio | ficha: sin desbordar | ✅ |  |
| Back office | escritorio | mensajes: carga con EPI10 UI | ✅ | HTTP 200 · vista=mensajes-equipo |
| Back office | escritorio | mensajes: sin desbordar | ✅ |  |
| Back office | escritorio | kit: carga con EPI10 UI | ✅ | HTTP 200 · vista=kit |
| Back office | escritorio | kit: sin desbordar | ✅ |  |
| Back office | escritorio | Calendario del núcleo carga | ✅ |  |
| Back office | escritorio | operaciones.prueba: sin errores de JS ni 5xx | ✅ |  |
| Back office | escritorio | admin: primera pestaña = inicio EPI10 (no el calendario) | ✅ |  |
| Back office | escritorio | admin: main.php sin desbordar | ✅ | menú completo de OpenEMR (decisión del área 7: admin lo conserva) |
| Back office | escritorio | admin: sin errores de JS ni 5xx | ✅ |  |
| Portal | movil | Login con el shell EPI10 | ✅ | login-portal |
| Portal | movil | Login sin pedir correo | ✅ |  |
| Portal | movil | Entra al inicio | ✅ | /portal/home.php |
| Portal | movil | Cabecera EPI10 y saludo | ✅ |  |
| Portal | movil | Inicio sin desbordar | ✅ |  |
| Portal | movil | Menú de usuario: Ajustes, Ayuda y Cerrar sesión | ✅ |  |
| Portal | movil | Tarjeta documents-go → mis-documentos (isla tareas) | ✅ | vista=mis-documentos |
| Portal | movil | mis-documentos sin desbordar | ✅ |  |
| Portal | movil | Tarjeta appointments-go → citas (isla calendario) | ✅ | vista=citas |
| Portal | movil | citas sin desbordar | ✅ |  |
| Portal | movil | Tarjeta messages-go → mensajes (isla chat) | ✅ | vista=mensajes |
| Portal | movil | mensajes sin desbordar | ✅ |  |
| Portal | movil | Tarjeta reports-go → mi-informe | ✅ | vista=mi-informe |
| Portal | movil | mi-informe sin desbordar | ✅ |  |
| Portal | movil | Vuelta al inicio muestra el panel | ✅ |  |
| Portal | movil | Sin errores de JS ni 5xx | ✅ |  |
| Portal | movil | Primer acceso en español | ✅ |  |
| Back office | movil | Login con el shell EPI10 | ✅ |  |
| Back office | movil | operaciones.prueba: primera pestaña = inicio EPI10 (no el calendario) | ✅ |  |
| Back office | movil | operaciones.prueba: main.php sin desbordar | ✅ |  |
| Back office | movil | clientes: carga con EPI10 UI | ✅ | HTTP 200 · vista=clientes |
| Back office | movil | clientes: sin desbordar | ✅ |  |
| Back office | movil | ficha: carga con EPI10 UI | ✅ | HTTP 200 · vista=ficha-cliente |
| Back office | movil | ficha: sin desbordar | ✅ |  |
| Back office | movil | mensajes: carga con EPI10 UI | ✅ | HTTP 200 · vista=mensajes-equipo |
| Back office | movil | mensajes: sin desbordar | ✅ |  |
| Back office | movil | kit: carga con EPI10 UI | ✅ | HTTP 200 · vista=kit |
| Back office | movil | kit: sin desbordar | ✅ |  |
| Back office | movil | Calendario del núcleo carga | ✅ |  |
| Back office | movil | operaciones.prueba: sin errores de JS ni 5xx | ✅ |  |

**0 fallos en 63 comprobaciones bloqueantes** (más 0 informativas). Capturas en `capturas/renove/99-demo`.

## Detector de inglés (`scripts/detectar-ingles.mjs todo`, back office como operaciones.prueba)

| Vista | Textos con palabras en inglés |
|---|---|
| Portal · acceso | — |
| Portal · inicio | — |
| Portal · mensajes | — |
| Portal · citas | — |
| Portal · mi informe | — |
| Portal · ajustes | — |
| Portal · documentos | — |
| Back office · acceso | — |
| Back office · inicio (main.php) | «Portal» · «Marta Portal Ficticia 20261011192312» · «Marta Portal Ficticia 20261011192221» · «Marta Portal Ficticia 20261011192710» · «Marta Portal Ficticia 20261011182947» |

«Portal» es una entrada del menú de operaciones (área 7). Los «Marta Portal Ficticia …» son nombres de pacientes ficticias: falsos positivos.

Log de la instalación:

```
== Instalando origin/main (b013569)
oe-module-epi10 1.x instalado en epi10-openemr-prueba-openemr-1
apcu vaciada
traducciones aplicadas: 57
oe-module-epi10-ui 0.1.x instalado en epi10-openemr-prueba-openemr-1
menús copiados
Grupo «EPI10 Operaciones» ya existe (18)
ACL 'write' al día (30)
  · global allow_custom_report = 0
  · global ccda_alt_service_enable = 0
  · operaciones.prueba → epi10_operaciones
  · operaciones.prueba: main_menu_role = EPI10 Operaciones.json
  · operaciones.prueba: patient_menu_role = EPI10 Operaciones.json
Hecho
/portal/index.php?site=default → 200
/interface/login/login.php?site=default → 200
/interface/modules/custom_modules/oe-module-epi10-ui/public/portal/kit.php → 302
== Instalado b013569. Siguiente: node recorrido_demo.mjs <carpeta> > informe.md
```


## Recorrido tras la limpieza de pacientes de prueba

`openemr-pruebas/scripts/limpieza_demo/limpiar_pacientes_prueba.sh limpiar` borró las pacientes de prueba (pids 2–35), con copia de cada fila en `epi10_limpieza_bak_*`. Antes, SKI2-210 había confirmado `probar` + `limpiar`: 0 casos en el monolito.

| Cara | Pantalla | Comprobación | Resultado | Detalle |
|---|---|---|---|---|
| Portal | escritorio | Login con el shell EPI10 | ✅ | login-portal |
| Portal | escritorio | Login sin pedir correo | ✅ |  |
| Portal | escritorio | Entra al inicio | ✅ | /portal/home.php |
| Portal | escritorio | Cabecera EPI10 y saludo | ✅ |  |
| Portal | escritorio | Inicio sin desbordar | ✅ |  |
| Portal | escritorio | Menú de usuario: Ajustes, Ayuda y Cerrar sesión | ✅ |  |
| Portal | escritorio | Tarjeta documents-go → mis-documentos (isla tareas) | ✅ | vista=mis-documentos |
| Portal | escritorio | mis-documentos sin desbordar | ✅ |  |
| Portal | escritorio | Tarjeta appointments-go → citas (isla calendario) | ✅ | vista=citas |
| Portal | escritorio | citas sin desbordar | ✅ |  |
| Portal | escritorio | Tarjeta messages-go → mensajes (isla chat) | ✅ | vista=mensajes |
| Portal | escritorio | mensajes sin desbordar | ✅ |  |
| Portal | escritorio | Tarjeta reports-go → mi-informe | ✅ | vista=mi-informe |
| Portal | escritorio | mi-informe sin desbordar | ✅ |  |
| Portal | escritorio | Vuelta al inicio muestra el panel | ✅ |  |
| Portal | escritorio | Sin errores de JS ni 5xx | ✅ |  |
| Portal | escritorio | Primer acceso en español | ✅ |  |
| Back office | escritorio | Login con el shell EPI10 | ✅ |  |
| Back office | escritorio | operaciones.prueba: primera pestaña = inicio EPI10 (no el calendario) | ✅ |  |
| Back office | escritorio | operaciones.prueba: main.php sin desbordar | ✅ |  |
| Back office | escritorio | clientes: carga con EPI10 UI | ✅ | HTTP 200 · vista=clientes |
| Back office | escritorio | clientes: sin desbordar | ✅ |  |
| Back office | escritorio | ficha: carga con EPI10 UI | ✅ | HTTP 200 · vista=ficha-cliente |
| Back office | escritorio | ficha: sin desbordar | ✅ |  |
| Back office | escritorio | mensajes: carga con EPI10 UI | ✅ | HTTP 200 · vista=mensajes-equipo |
| Back office | escritorio | mensajes: sin desbordar | ✅ |  |
| Back office | escritorio | kit: carga con EPI10 UI | ✅ | HTTP 200 · vista=kit |
| Back office | escritorio | kit: sin desbordar | ✅ |  |
| Back office | escritorio | Calendario del núcleo carga | ✅ |  |
| Back office | escritorio | operaciones.prueba: sin errores de JS ni 5xx | ✅ |  |
| Back office | escritorio | admin: primera pestaña = inicio EPI10 (no el calendario) | ✅ |  |
| Back office | escritorio | admin: main.php sin desbordar | ✅ | menú completo de OpenEMR (decisión del área 7: admin lo conserva) |
| Back office | escritorio | admin: sin errores de JS ni 5xx | ✅ |  |
| Portal | movil | Login con el shell EPI10 | ✅ | login-portal |
| Portal | movil | Login sin pedir correo | ✅ |  |
| Portal | movil | Entra al inicio | ✅ | /portal/home.php |
| Portal | movil | Cabecera EPI10 y saludo | ✅ |  |
| Portal | movil | Inicio sin desbordar | ✅ |  |
| Portal | movil | Menú de usuario: Ajustes, Ayuda y Cerrar sesión | ✅ |  |
| Portal | movil | Tarjeta documents-go → mis-documentos (isla tareas) | ✅ | vista=mis-documentos |
| Portal | movil | mis-documentos sin desbordar | ✅ |  |
| Portal | movil | Tarjeta appointments-go → citas (isla calendario) | ✅ | vista=citas |
| Portal | movil | citas sin desbordar | ✅ |  |
| Portal | movil | Tarjeta messages-go → mensajes (isla chat) | ✅ | vista=mensajes |
| Portal | movil | mensajes sin desbordar | ✅ |  |
| Portal | movil | Tarjeta reports-go → mi-informe | ✅ | vista=mi-informe |
| Portal | movil | mi-informe sin desbordar | ✅ |  |
| Portal | movil | Vuelta al inicio muestra el panel | ✅ |  |
| Portal | movil | Sin errores de JS ni 5xx | ✅ |  |
| Portal | movil | Primer acceso en español | ✅ |  |
| Back office | movil | Login con el shell EPI10 | ✅ |  |
| Back office | movil | operaciones.prueba: primera pestaña = inicio EPI10 (no el calendario) | ✅ |  |
| Back office | movil | operaciones.prueba: main.php sin desbordar | ✅ |  |
| Back office | movil | clientes: carga con EPI10 UI | ✅ | HTTP 200 · vista=clientes |
| Back office | movil | clientes: sin desbordar | ✅ |  |
| Back office | movil | ficha: carga con EPI10 UI | ✅ | HTTP 200 · vista=ficha-cliente |
| Back office | movil | ficha: sin desbordar | ✅ |  |
| Back office | movil | mensajes: carga con EPI10 UI | ✅ | HTTP 200 · vista=mensajes-equipo |
| Back office | movil | mensajes: sin desbordar | ✅ |  |
| Back office | movil | kit: carga con EPI10 UI | ✅ | HTTP 200 · vista=kit |
| Back office | movil | kit: sin desbordar | ✅ |  |
| Back office | movil | Calendario del núcleo carga | ✅ |  |
| Back office | movil | operaciones.prueba: sin errores de JS ni 5xx | ✅ |  |

**0 fallos en 63 comprobaciones bloqueantes** (más 0 informativas). Capturas en `capturas/renove/99-demo`.
