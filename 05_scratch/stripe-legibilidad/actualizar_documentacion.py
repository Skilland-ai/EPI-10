from pathlib import Path
R=Path.cwd(); changes={}
def replace(path,a,b):
 s=changes.get(path,(R/path).read_text());assert a in s,path+': '+a[:80];changes[path]=s.replace(a,b,1)
def append(path,s):changes[path]=changes.get(path,(R/path).read_text()).rstrip()+'\n\n'+s.strip()+'\n'
M='04_outputs/modulos/stripe/'
for path in ['README.md',M+'README.md',M+'docs/speedrun_demo.md']:
 s=(R/path).read_text().replace('publicada en privado','publicada con acceso público').replace('Publicada en privado','Publicada con acceso público').replace('abrir demo privada','abrir demo pública')
 changes[path]=s
replace('01_harness/STACK.md','Sites; publicación privada.','Sites; publicación pública por petición de Raúl.')
replace('02_context/01_estado_actual.md','en privado para Raúl:','con acceso público para compartir con Carmen:')
replace('02_context/01_estado_actual.md','Build, TypeScript y enlaces/metadatos del HTML servido correctos. La pantalla se\nabrió para mostrarla; no se ejecutaron pruebas de UI en navegador. Revisión\nvisual escritorio/móvil y pago completo permanecen en SKI-52. El servidor local\nse detuvo después de la publicación; la URL privada sigue desplegada.','Build y TypeScript correctos. Tipografía ampliada a 18 px para contenido, 16 px\npara explicaciones y mínimo 14 px para etiquetas. CTA inferior centrado, de\n64 px de alto, con precio separado. DOM y geometría sin desbordamiento en cinco\nanchos de 320 a 1440 px. HTTP 200 sin cookies/autorización y botón inferior al\ncheckout NutriWell de 100 EUR comprobados. E15 conserva la evidencia.\nCapturas de navegador no disponibles; aprobación visual y pago completo siguen\npendientes. La URL pública queda desplegada para compartir con Carmen.')
replace(M+'docs/pantalla_demo.md','**Publicada en privado el 2026-09-15 · SKI-37**','**Publicada con acceso público el 2026-09-15 · SKI-37**')
replace(M+'docs/pantalla_demo.md','Estado de despliegue: `succeeded`. [Evidencia E14](../evidencias/2026-09-15_pantalla_demo_publicada.json).','Estado de despliegue: `succeeded`. [Evidencia E15](../evidencias/2026-09-15_pantalla_publica_legibilidad.json).\nLa [publicación privada inicial E14](../evidencias/2026-09-15_pantalla_demo_publicada.json) se conserva como historial.')
replace(M+'docs/pantalla_demo.md','## Validación realizada','## Validación de la publicación inicial')
replace(M+'docs/pantalla_demo.md','La publicación inicial es privada para Raúl. No se han invitado usuarios ni\nampliado el acceso. Sirve para presentarla desde su sesión; el acceso externo de\nCarmen se gestionará cuando se solicite.','La publicación inicial fue privada. Raúl solicitó después acceso público para\ncompartir con Carmen. Desde las 18:47:50 UTC cualquiera con el enlace puede abrir\nla página; no requiere invitación ni inicio de sesión. Se verificó HTTP 200 sin\ncookies ni autorización. El contenido sigue marcado como demo y no indexable.')
append(M+'docs/pantalla_demo.md','''## Revisión de legibilidad y compra — 18:48:20 UTC

- Texto principal de 18 px, secundario de 16 px y etiquetas de al menos 14 px;
  tamaños en rem para respetar el tamaño base del lector.
- Precio en una fila propia, condiciones legibles y CTA «Probar compra» centrado,
  de 64 px de alto, con flecha separada y sin repetir el precio en el botón.
- Tarjeta en una columna hasta 1000 px; título ajustado para móviles estrechos.
- Comprobación de DOM y geometría a 320, 390, 768, 1024 y 1440 px: sin
  desbordamiento horizontal ni textos fuera de pantalla; mínimo medido 14 px.
- Botón inferior probado desde la URL pública: abre el checkout de NutriWell,
  muestra 100,00 EUR y «Entorno de prueba». Ningún dato introducido ni pago ejecutado.
- Build y TypeScript correctos. Capturas de navegador no disponibles tras dos
  intentos; no se afirma una revisión visual por imagen. La aprobación estética
  y el recorrido completo de pago siguen pendientes.

Evidencias de detalle en `05_scratch/stripe-legibilidad/`: `qa-responsive.json`,
`qa-publico.json`, `qa-navegacion.json` y `source-pushed.json`.''')
replace(M+'docs/guia_cliente.md','Acceso inicial privado para Raúl. La apertura del checkout desde esta pantalla\nestá preparada; las pruebas completas de pago y recuperación siguen pendientes.','Acceso público: Carmen puede abrir el enlace sin iniciar sesión. El botón\n«Probar compra» abre el checkout de NutriWell por 100 EUR ficticios; la navegación\nya está comprobada. Las pruebas completas de pago y recuperación siguen pendientes.')
replace(M+'docs/pruebas.md','P01 parcial hasta recorrerlos juntos en navegador.','P01 verificado al abrir el checkout desde el CTA inferior de la URL pública.')
replace(M+'docs/pruebas.md','PARCIAL: checkout directo verificado y pantalla publicada (E14); revisión conjunta en navegador pendiente','PASS: URL pública y CTA inferior al checkout NutriWell de 100 EUR comprobados (E15); ningún pago ejecutado')
replace('03_specs/now/011_now.md','- [ ] Revisión solicitada: ampliar textos y aclarar el CTA inferior, comprobar','- [x] Revisión solicitada: ampliar textos y aclarar el CTA inferior, comprobar')
append('03_specs/now/011_now.md','''### Acceso público y legibilidad — 2026-09-15, 18:48:20 UTC

Por petición de Raúl, acceso público verificado y nueva versión publicada.
Texto principal 18 px, secundario 16 px y mínimo 14 px; CTA inferior centrado y
precio separado. DOM y geometría correctos en cinco anchos (320–1440 px), build
y TypeScript correctos. HTTP 200 sin cookies/autorización y navegación desde el
CTA inferior al checkout NutriWell de 100 EUR verificada. Evidencia E15.
Capturas no disponibles; aprobación visual y pago completo siguen pendientes.''')
row='| E15 | [Acceso público y legibilidad](2026-09-15_pantalla_publica_legibilidad.json) | Publicación pública, HTTP 200 anónimo, tipografía ampliada y CTA de 64 px sin desbordamientos en cinco anchos | Captura visual no disponible; pago completo pendiente |'
path=M+'evidencias/README.md';s=(R/path).read_text();lines=s.splitlines();i=next(i for i,l in enumerate(lines) if l.startswith('| E14 '));lines.insert(i+1,row);changes[path]='\n'.join(lines)+'\n'
replace(M+'docs/bitacora.md','### S21 — Fecha y acción concreta','''### S21 — Acceso público, tipografía y CTA de compra

- **Petición:** publicar para compartir con Carmen y ampliar la letra pequeña;
  revisar el bloque de compra inferior.
- **Acción:** texto principal 18 px, secundario 16 px y etiquetas mínimas 14 px;
  precio separado, botón centrado de 64 px y tarjeta adaptada a móvil estrecho.
- **Resultado:** DOM/medidas correctos en cinco anchos; build y TypeScript correctos.
  Acceso público revision 2 y publicación succeeded a las 18:48:20 UTC.
- **Evidencia:** E15, HTTP 200 sin autenticación y navegación real desde el CTA
  inferior al checkout de NutriWell por 100 EUR. Detalle en stripe-legibilidad/.
- **Límite:** capturas no disponibles; ningún pago realizado. La primera lectura
  con urllib devolvió 403; curl sin credenciales devolvió 200 con la versión nueva.
- **Decisión:** compartir mediante enlace público por petición expresa de Raúl;
  conservar indicaciones de demo y la separación respecto a la web del proveedor.
- **Siguiente paso:** resultado/recuperación y eventos, después pago completo.

### S22 — Fecha y acción concreta''')
append(M+'docs/decisiones.md','''## D23 — Publicación pública y legibilidad

Raúl pide que Carmen abra el enlace y solicita ampliar letra y ajustar el CTA
inferior. Se publica con acceso público, se aumenta la escala tipográfica y se
separa el precio del botón. Acceso y geometría verificados en E15. No supone
aceptación de Carmen ni ejecución de un pago.''')
for path,s in changes.items():(R/path).write_text(s)
print('Actualizados',len(changes),'documentos')
