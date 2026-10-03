from pathlib import Path
R=Path.cwd();M='04_outputs/modulos/stripe/';old='https://epi10-nutriwell-demo.raulreboot.chatgpt.site';new='https://epi10-nutriwell-demo.vercel.app'
for p in [M+'README.md',M+'docs/pantalla_demo.md',M+'docs/guia_cliente.md','02_context/01_estado_actual.md']:
 f=R/p;f.write_text(f.read_text().replace(old,new))
f=R/'01_harness/STACK.md';s=f.read_text().replace('Vinext/App Router, React 19, CSS y\n  Sites; publicación pública por petición de Raúl.','Next.js/App Router para Vercel, React 19\n  y CSS. Ruta anterior Vinext/Sites conservada. Publicación pública en Vercel\n  por petición de Raúl.');s=s.replace('- Publicación: Sites, configuración en `.openai/hosting.json`; Git local dentro de app/.','- Desarrollo Vercel: `npm run dev:vercel`.\n- Build Vercel: `npm run build:vercel` (incluye TypeScript).\n- Publicación actual: `vercel --prod --scope raul-1873s-projects`, desde app/.\n- Configuración: `vercel.json`; vinculación `.vercel/project.json` ignorada.\n- Publicación anterior Sites: `.openai/hosting.json`; Git local dentro de app/.');f.write_text(s)
f=R/'README.md';f.write_text(f.read_text().replace('pantalla de demo publicada con acceso público','pantalla de demo publicada con acceso público en Vercel'))
f=R/M/'docs/pantalla_demo.md';s=f.read_text().replace('**Publicada con acceso público el 2026-09-15 · SKI-37**','**Publicada en Vercel con acceso público el 2026-09-15 · SKI-37**').replace('Estado de despliegue: `succeeded`. [Evidencia E15](../evidencias/2026-09-15_pantalla_publica_legibilidad.json).','Estado de despliegue: `READY`. [Evidencia E16](../evidencias/2026-09-15_vercel_publicacion.json).\nLa revisión anterior de legibilidad consta en [E15](../evidencias/2026-09-15_pantalla_publica_legibilidad.json).');s+='\n## Publicación en Vercel — 18:58 UTC\n\nRaúl solicita una dirección más neutra para presentar a Carmen. La URL vigente\nes '+new+'. Se conserva el mismo componente, CSS,\nimágenes y checkout. Next.js compila la vista para Vercel con el mismo App Router;\nlos metadatos sociales usan ahora el nuevo origen.\n\nHTTP 200 anónimo, imágenes/estilos y dos enlaces correctos. Fuente y CSS\ncomparados por SHA256 con la versión revisada. Navegación desde el CTA inferior\nal checkout de NutriWell de 100 EUR verificada. Ningún pago ejecutado.\n[Procedimiento y comprobaciones de Vercel](vercel.md).\n';f.write_text(s)
f=R/M/'README.md';f.write_text(f.read_text().replace('pantalla de entrada publicada con acceso público.','pantalla de entrada publicada con acceso público en Vercel.').replace('## Documentación','## Documentación\n\n- [Publicación en Vercel](docs/vercel.md): URL, procedimiento y verificación.',1))
f=R/M/'docs/speedrun_demo.md';f.write_text(f.read_text().replace('pantalla de entrada publicada con acceso público','pantalla de entrada publicada con acceso público en Vercel').replace('Publicada con acceso público;','Publicada con acceso público en Vercel;'))
f=R/'02_context/01_estado_actual.md';s=f.read_text().replace('La URL pública queda desplegada para compartir con Carmen.','La URL pública de Vercel queda desplegada para compartir con Carmen.\nMigración solicitada y verificada en E16: contenido/CSS/activos conservados,\nmetadatos con el nuevo origen y CTA al checkout de prueba comprobado.');f.write_text(s)
f=R/'03_specs/now/011_now.md';s=f.read_text().replace('- [ ] Publicar la misma demo en Vercel','- [x] Publicar la misma demo en Vercel');s+='\n### Publicación en Vercel — 2026-09-15, 18:58 UTC\n\nPetición de Raúl ejecutada: '+new+' pública y\nREADY. Componente, CSS e imágenes idénticos por SHA256; Next.js compila para\nVercel, metadatos sociales actualizados. Build y TypeScript correctos, HTTP 200\nsin autenticación, activos accesibles y CTA al checkout NutriWell de 100 EUR\nverificado en navegador. E16 y detalle en `05_scratch/stripe-vercel/`.\nNingún pago realizado; firma/eventos y recorrido completo siguen pendientes.\n';f.write_text(s)
f=R/M/'evidencias/README.md';lines=f.read_text().splitlines();i=next(i for i,x in enumerate(lines) if x.startswith('| E15 '));lines.insert(i+1,'| E16 | [Publicación Vercel](2026-09-15_vercel_publicacion.json) | READY, acceso público sin sesión, diseño conservado, metadatos y CTA al checkout comprobados | Pago completo y aceptación de Carmen pendientes |');f.write_text('\n'.join(lines)+'\n')
f=R/M/'docs/bitacora.md';s=f.read_text().replace('## Plantilla para el siguiente paso\n\n### S21','## S21',1);s=s.replace('### S22 — Fecha y acción concreta','''## S22 — Publicación en Vercel

- **Petición:** Raúl prefiere Vercel para presentar una dirección más neutra.
- **Acción:** reutilizar la sesión CLI de Raúl, crear el proyecto NutriWell,
  añadir compilación Next.js y actualizar el origen de metadatos sociales.
- **Resultado:** publicación de producción READY y URL pública
  https://epi10-nutriwell-demo.vercel.app. Build/TypeScript y HTTP 200 anónimo
  correctos; imágenes/estilos accesibles y CTA al checkout de 100 EUR comprobado.
- **Evidencia:** E16, qa-conservacion.json y qa-publicacion.json en stripe-vercel/.
- **Decisión:** Vercel es el enlace vigente de presentación. No se volvió a
  publicar en Sites; la publicación anterior conserva su estado.
- **Límite:** sin pago ejecutado; la comprobación de logs no devolvió errores,
  pero no constituye monitorización continua ni auditoría de dependencias.
- **Siguiente paso:** resultado/recuperación y eventos, después pago completo.

## Plantilla para el siguiente paso

### S23 — Fecha y acción concreta''');f.write_text(s)
f=R/M/'docs/linear_speedrun.md';f.write_text(f.read_text()+'\n18:58 UTC: publicación trasladada a Vercel por petición de Raúl.\nURL vigente: '+new+'. E16 verifica despliegue,\nacceso público, conservación del diseño y navegación al checkout. SKI-37\nconserva Done; ninguna tarea de pago se da por terminada.\n')
f=R/M/'docs/decisiones.md';f.write_text(f.read_text()+'\n## D24 — Vercel como enlace de presentación\n\nRaúl prefiere una dirección de Vercel para compartir con Carmen. Se publica\nla misma vista y se actualizan metadatos y documentación. La versión de Sites\nse conserva como histórico; Vercel pasa a ser la URL vigente. Evidencia E16.\n')
print('Documentación de continuidad actualizada')
