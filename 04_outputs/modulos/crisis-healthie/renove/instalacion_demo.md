# Instalación final de la demo del renove en hermes-node

Fecha: 2026-10-11 · Linear: SKI2-230 / SKI2-209 · Responsable de la instalación: área 0
Instancia: OpenEMR 8.4.1 en hermes-node, `http://localhost:4896` (túnel `hn open 4896`). Sin reiniciar OpenEMR.

## Cuándo

Cuando `main` de `Skilland-ai/epi10-oe-module` tenga los PR de las seis áreas: #2, #3, #4, #5, #6, #7, #8, #9 y el del área 4. Hasta entonces la instancia corre `renove-demo` 2bb052b (`main` 28c48b7 + rama del área 4), verificado con el mismo recorrido.

## Comando

En el ASUS, desde la carpeta de scripts de pruebas:

```bash
cd EPI-10/04_outputs/modulos/crisis-healthie/openemr-pruebas/scripts
./instalar_demo.sh                     # instala origin/main
```

Hace, en este orden:
1. Copia exacta del commit al HP (`git archive`, nunca el árbol de trabajo).
2. `oe-module-epi10` (contrato v1) con `scripts/instalar-en-contenedor.sh`.
3. `oe-module-epi10-ui` con `scripts/instalar-ui.sh`: rechaza marcas de conflicto y PHP que no compile, aplica las traducciones y vacía APCu.
4. La configuración del back office del área 7: `config-instancia/area-7/aplicar.sh --menu-principal`, con ACL, menús y globals. Es idempotente.
5. Prueba de humo con curl: portal y login del back office 200; vista propia 302 al login sin sesión.

Variables: `REPO` (clon del módulo; por defecto, el worktree `epi10-oe-module-wt/integracion`), `OE` y `DB` (contenedores) y `SIN_CONTRATO=1` (salta el paso 2, para ensayos).

**Configuración que no toca y ya está aplicada en la base**: `enforce_signin_email = 0` y `default_open_tabs` con el inicio EPI10 (área 1, respaldo en `epi10ui_respaldo`), la agenda de demo y la categoría «Cita EPI10» (área 5). No hay que reejecutar sus SQL.

## Recorrido de comprobación

```bash
OE_BASE=http://localhost:4896 PORTAL_PASS=… OE_PASS=… OPS_PASS=… \
  node recorrido_demo.mjs ../evidencia/capturas/renove/99-demo > ../evidencia/capturas/renove/99-demo/informe.md
```

Las contraseñas están en `~/Projects/epi10-openemr-prueba/.env` del HP. El script sale con código 1 si falla algo bloqueante.

| Cara | Comprobaciones (escritorio a 1366 px y móvil a 390 px) |
|---|---|
| Portal · Lucía | Login con el shell EPI10 y sin pedir correo · entra al inicio · cabecera y «Hola, Lucía» · menú de usuario con Ajustes, Ayuda y Cerrar sesión · cada tarjeta abre su vista: «Mis documentos» (isla tareas), «Citas» (isla calendario), «Mensajes» (isla chat) y «Mi informe» (biblioteca) · ninguna pantalla desborda · volver al inicio muestra el panel · cero errores de JS y cero 5xx |
| Portal · primer acceso | `index.php?password_update=1` en español («Crea tu contraseña»), sin «Account Name» ni «New Password» |
| Back office · operaciones.prueba | Login con el shell EPI10 · primera pestaña = inicio EPI10, nunca el calendario · main.php sin desbordar en móvil · clientes, ficha (pid 1), mensajes y kit cargan con EPI10 UI · calendario del núcleo carga · cero errores |
| Back office · admin (escritorio) | Primera pestaña = inicio EPI10. **Informativo**: el menú completo de OpenEMR desborda a 1366 px y sigue en inglés («Finder», «Recalls», «Modules»…). Es decisión del área 7: admin conserva todo y no es la persona de la demo |

Además, el detector de inglés: `node <repo>/scripts/detectar-ingles.mjs todo` (con `OE_USER=operaciones.prueba OE_PASS=$OPS_PASS`). Resultado esperado: portal sin inglés; en el back office solo «Portal» y nombres de pacientes ficticias (falsos positivos).

Ensayo del 11 oct sobre `renove-demo` 2bb052b: **62 de 63 correctas**. La que falla es la informativa de admin.

## Vuelta atrás

```bash
SIN_CONTRATO=1 ./instalar_demo.sh origin/renove-demo   # último estado verificado (2bb052b), sin tocar el contrato
```

Configuración del área 7: `config-instancia/area-7/aplicar.sh --revertir`. Configuración del área 1: `oe-module-epi10-ui/sql/*_quitar.sql`.

## Riesgos conocidos

- **APCu**: si una página da 500 con «Class … not found» y la CLI sí encuentra la clase, vacía APCu reinstalando con `instalar-ui.sh`.
- **Caché del navegador**: OpenEMR versiona los assets inyectados con la versión del sitio, que no cambia al desplegar. Antes de la demo, recarga forzada o ventana privada.
- **Una paciente nueva por enlace mágico** entra directamente al inicio, sin crear contraseña. Si en la demo se quiere enseñar la pantalla de primer acceso, hay que abrir `index.php?password_update=1`.
