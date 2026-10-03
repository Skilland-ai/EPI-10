from pathlib import Path
import json,datetime,shutil,hashlib,subprocess,re
root=Path.cwd(); mod=root/'04_outputs/modulos/stripe'; docs=mod/'docs'; scratch=root/'05_scratch/stripe-pruebas'; now=datetime.datetime.now(datetime.timezone.utc).isoformat()
def replace(p,old,new):
 s=p.read_text(); assert old in s,(str(p),old);p.write_text(s.replace(old,new))
def append(p,s): p.write_text(p.read_text().rstrip()+'\n\n'+s.strip()+'\n')
def load(name):return json.loads((scratch/name).read_text())
failed=load('3ds-failed.json'); paid=load('3ds-paid.json'); refunded=load('3ds-refund-created.json'); mobile=load('mobile-paid.json'); mobile_refund=load('mobile-refund.json'); dom=load('qa-navegador.json')
assert failed['payment_status']=='unpaid' and not failed['ledger'] and failed['last_payment_error']['code']=='payment_intent_authentication_failure'
assert paid['charge']['three_d_secure']['result']=='authenticated' and paid['charge']['three_d_secure']['authentication_flow']=='challenge'
assert paid['payment_id']==failed['payment_id']
assert len(paid['sessions_for_order'])==1 and len({i['session'] for i in dom['double_attempt_before']})==1
assert 'Prueba completada.' in dom['double_attempt_after'] and 'NW-60E20C9B' in dom['double_attempt_after']
for before,after in [(paid,refunded),(mobile,mobile_refund)]:
 assert before['state']=='paid' and after['state']=='refunded' and after['refund']['status']=='succeeded'
 assert after['ledger']['order:'+after['order_id']]['status']=='refunded'
 assert after['ledger']['payment:'+after['payment_id']]['status']=='refunded'
 assert after['ledger']['effect:'+after['order_id']]==before['ledger']['effect:'+before['order_id']]
 assert len([v for k,v in after['ledger'].items() if k.startswith('effect:')])==1
old=json.loads((root/'05_scratch/stripe-webhook/source-manifest.json').read_text()); unchanged=all(hashlib.sha256((mod/'app'/f).read_bytes()).hexdigest()==h for f,h in old.items());assert unchanged
captures=['landing-desktop.png','landing-mobile.png','checkout-mobile.png','checkout-mobile-review.png','paid-mobile.png','paid-desktop.png','refunded-mobile.png']
dest=mod/'evidencias/2026-09-15_pruebas';dest.mkdir(exist_ok=True)
images=[]
for name in captures:
 shutil.copy2(scratch/name,dest/name);images.append({'file':'2026-09-15_pruebas/'+name,'sha256':hashlib.sha256((dest/name).read_bytes()).hexdigest()})
incidents=[{'id':'QA52-01','result':'Resuelta en herramientas de QA','detail':'La captura IAB falla con target closed. Se usa una sesión independiente de Chromium con Agent Browser; requiere --no-sandbox en este entorno Linux. No se modifica la aplicación.'},{'id':'QA52-02','result':'Resuelta en comprobación','detail':'La primera comprobación de imágenes se ejecutó antes de que el logo lazy del pie entrara en pantalla. Tras desplazarse al pie y esperar su carga, las imágenes y cuatro anchos pasan.'},{'id':'QA52-03','result':'Observación no bloqueante para demo con tarjeta','detail':'Apple Pay aparece recortado en una captura y ausente en otra en Chromium automatizado. No se determina la causa ni se certifican wallets. No afecta al formulario ni al pago de tarjeta probado. Verificar Apple Pay/Link en dispositivos compatibles si se habilitan para el servicio real.'}]
e={'id':'E19','verified_at':now,'scope':'SKI-52 — matriz funcional y visual de demo con tarjeta','result':'PASS con observación QA52-03 sobre wallets no validados','url':'https://epi10-nutriwell-demo.vercel.app','livemode':False,'deployment_id':'dpl_357Xo8829MwqA4qNyx57XQR1on2u','source_files_compared':len(old),'source_unchanged_from_SKI51':unchanged,'new_payments_this_step':2,'full_refunds_this_step':2,'authentication_failed':failed,'authenticated_payment':paid,'double_attempt':{'same_session_in_two_browser_tabs':True,'before':dom['double_attempt_before'],'later_purchase_click_returns_confirmation':True,'one_checkout_one_payment_one_business_record':True},'authenticated_refund':refunded,'mobile_payment':mobile,'mobile_refund':mobile_refund,'responsive_landing':load('responsive-landing.json'),'captures':images,'incidents':incidents,'previous_evidence':{'E17':'Rechazo de tarjeta, abandono, recuperación y confirmación','E18':'Firma válida/inválida, reentrega real y concurrencia; suite de 21 tests PASS antes de esta matriz'},'acceptance_criteria':{'payment_confirmation_stripe_event':'PASS — dos pagos con su evento automático y referencia en pantalla','failure_abandonment_retry_authentication':'PASS — E17 más fallo y reintento 3DS en E19','double_attempt_replay_invalid_signature':'PASS — dos pestañas/un checkout en E19; reentrega/firma en E18','refund_stripe_ledger_ui':'PASS — dos devoluciones completas y estado coherente','desktop_mobile_visual':'PASS para recorrido con tarjeta; capturas revisadas y sin desbordamiento en 320/390/768/1440 px; observación no bloqueante QA52-03'},'limitations':['Revisión móvil en viewport de Chromium, no en teléfono físico ni Safari','Apple Pay y Link no probados como métodos de pago; observación visual QA52-03','Sin cobros reales, datos sanitarios ni altas en Healthie/Odoo','Guion/paquete SKI-53 y aceptación de Carmen SKI-74 pendientes','No nueva auditoría de dependencias ni nueva publicación: código conservado del despliegue SKI-51'],'detail_directory':'05_scratch/stripe-pruebas/'}
(mod/'evidencias/2026-09-15_pruebas_funcionales.json').write_text(json.dumps(e,indent=2,ensure_ascii=False)+'\n')
(docs/'validacion_demo.md').write_text('''# Validación funcional y visual — SKI-52

**15 de septiembre de 2026 · Demo de pruebas · Resultado: PASS del recorrido con tarjeta.**
[Evidencia E19](../evidencias/2026-09-15_pruebas_funcionales.json) · [Matriz](pruebas.md) · [Módulo](../README.md).

## Qué se ha comprobado

| Caso | Resultado observado |
| --- | --- |
| Autenticación 3DS fallida | La pantalla de verificación aparece; al pulsar Fail, Stripe devuelve payment_intent_authentication_failure. Compra open/unpaid y sin registro de cobro. |
| Reintento 3DS correcto | Al repetir y pulsar Complete, la misma sesión y PaymentIntent pasan a paid/succeeded. El cargo registra challenge/authenticated, 3DS 2.1.0. |
| Dos pestañas | Los CTA superior e inferior abren la misma sesión para la misma compra. Un clic posterior al pago vuelve a su confirmación; una sesión, un pago y un registro de negocio. |
| Notificación automática | Cada nuevo pago llega por webhook a Vercel y coincide con la referencia de la pantalla, importe y PaymentIntent. |
| Devolución completa | Dos pagos de 100 EUR devueltos en el sandbox; refund succeeded, registro actualizado a refunded y pantalla «Prueba devuelta». Se conserva el registro del pago original. |
| Compra móvil | Entrada por CTA inferior, checkout de tarjeta, pago con 4242, regreso a confirmación y devolución. |
| Vista adaptable | Página sin desbordamientos en 320, 390, 768 y 1440 px. Botones de compra de al menos 62,8 px de alto; imágenes cargadas. |
| Resultados | Capturas de confirmación en móvil/escritorio y devolución en móvil revisadas; texto principal móvil de 18 px. |

Rechazo de tarjeta, abandono y recuperación ya comprobados en E17. Firma inválida,
repetición y concurrencia comprobadas en E18. Se conserva el mismo código y el
mismo despliegue de SKI-51; no fue necesario corregir ni republicar la aplicación.
Las 21 pruebas automatizadas de ese paso siguen siendo la base técnica, sin
presentarlas como una ejecución nueva de esta matriz.

## Referencias de estas pruebas

| Dato | Compra con 3DS | Compra desde vista móvil |
| --- | --- | --- |
| Compra | NW-60E20C9B | NW-F9F117C9 |
| PaymentIntent | pi_3UG3LdRrJS0VSqzs0JzNNa2f | pi_3UG3R2RrJS0VSqzs0PeXc4bY |
| Evento de pago | evt_1UG3O1RrJS0VSqzsjO4Tasle | evt_1UG3R3RrJS0VSqzs1UPYAxIm |
| Devolución | re_3UG3LdRrJS0VSqzs0EAY0YAZ | re_3UG3R2RrJS0VSqzs0V4KOezp |
| Importe | 100 EUR ficticios, devueltos íntegros | 100 EUR ficticios, devueltos íntegros |

## Capturas revisadas

- [Página completa en escritorio](../evidencias/2026-09-15_pruebas/landing-desktop.png).
- [Página completa en móvil](../evidencias/2026-09-15_pruebas/landing-mobile.png).
- [Checkout móvil](../evidencias/2026-09-15_pruebas/checkout-mobile.png).
- [Confirmación móvil](../evidencias/2026-09-15_pruebas/paid-mobile.png).
- [Confirmación escritorio](../evidencias/2026-09-15_pruebas/paid-desktop.png).
- [Devolución móvil](../evidencias/2026-09-15_pruebas/refunded-mobile.png).

## Incidencias y límites

- **QA52-01, resuelta:** falla la captura del navegador integrado. Capturas obtenidas
  con Agent Browser en una sesión independiente de Chromium.
- **QA52-02, resuelta:** se esperaba cargar el logo del pie antes de entrar en
  pantalla. La comprobación ahora desplaza la vista y espera su carga diferida.
- **QA52-03, observación no bloqueante:** el botón de Apple Pay aparece recortado
  en una captura y ausente en [otra revisión](../evidencias/2026-09-15_pruebas/checkout-mobile-review.png)
  del navegador automatizado. Causa sin determinar. El formulario de tarjeta funciona;
  Apple Pay y Link no se han validado como métodos de pago. Si se habilitan en el
  servicio real, comprobarlos en dispositivos compatibles durante SKI-77.
- Los anchos móviles se han probado en Chromium; no equivalen a un teléfono
  físico ni a una prueba de Safari. Los pagos son ficticios y no inician servicios.

## Repetir las comprobaciones

Usar la [URL pública](https://epi10-nutriwell-demo.vercel.app), iniciar una prueba
y pagar con una tarjeta de test. Para 3DS: **4000 0000 0000 3220**, fecha futura y
CVC de tres cifras. El simulador permite Fail o Complete. Tras una devolución,
actualizar `/compra` para consultar el estado vigente. «Iniciar otra prueba»
prepara una compra nueva; volver al CTA de una compra pagada recupera su resultado.
[Tarjetas de prueba oficiales](https://docs.stripe.com/testing#test-3d-secure-authentication).

Las devoluciones se realizaron por API, con verificación previa de cuenta, importe,
modo y estado, y clave de idempotencia por pago. [API de devoluciones](https://docs.stripe.com/api/refunds/create).
Script y comprobaciones reproducibles: `05_scratch/stripe-pruebas/check-payment.mjs`
y `responsive.py`; los secretos se leen del entorno local, nunca de esta guía.

**Siguiente:** preparar guion, recorrido de presentación y preguntas para Carmen
(SK​​I-53). El feedback y la aprobación externa solo se registran cuando ocurran.
'''.replace('SK​​I','SKI'))
replace(mod/'README.md','Firma y repetición verificadas con registro persistente; quedan las pruebas finales.','Firma y repetición verificadas con registro persistente; matriz de tarjeta, 3DS,\ndoble intento, devolución y revisión móvil completada. Siguiente: guion para Carmen.')
replace(mod/'README.md','## Documentación\n','## Documentación\n\n- [Validación de la demo](docs/validacion_demo.md): matriz cerrada para tarjeta, capturas y límites de la revisión.\n')
replace(mod/'README.md','P02–P05 y P07–P09 verificados; resto de matriz pendiente.','recorrido con tarjeta verificado; guion y aceptación externa pendientes.')
replace(mod/'README.md','5. Completar las pruebas restantes (SKI-52) y preparar el guion para Carmen (SKI-53).','5. Pruebas funcionales y visuales completadas (SKI-52). Preparar el guion para Carmen (SKI-53).')
replace(mod/'README.md','SKI-37, SKI-50 y SKI-51 **Done**; cinco **Todo**.','SKI-37, SKI-50, SKI-51 y SKI-52 **Done**; cuatro **Todo**.')
replace(docs/'pruebas.md','P02–P05 ejecutados en SKI-50; P07–P09 en SKI-51. Devolución, 3DS y revisión completa siguen pendientes.','Matriz funcional con tarjeta completada en SKI-50/51/52. Guion y revisión de presentación P11 en SKI-53.\n[Validación, capturas y límites](validacion_demo.md); móvil probado en viewport de Chromium.')
replace(docs/'pruebas.md','Parcial: clic posterior al pago vuelve a su confirmación; concurrencia y segundo pago de la misma compra probados con datos sintéticos y Redis real. Falta el recorrido completo de doble intento en SKI-52','PASS: dos pestañas abren la misma sesión; un clic posterior al pago vuelve a su confirmación. Una sesión, un pago y una actuación; concurrencia/segundo pago sintéticos en E18, recorrido real en E19')
replace(docs/'pruebas.md','| P10 — Reembolso | Devolver un pago de prueba correcto | Devolución vinculada al pago, importe revisado y estado reflejado en la demo | Pendiente / Unknown |','| P10 — Reembolso | Devolver un pago de prueba correcto | Devolución vinculada al pago, importe revisado y estado reflejado en la demo | PASS: dos devoluciones de 100 EUR ficticios succeeded; registro refunded y pantalla Prueba devuelta; E19 |')
replace(docs/'pruebas.md','| P11 — Revisión de demo | Recorrer compra, resultado y excepción representativa | Guion reproducible, evidencias revisables y límites de demo claros | Pendiente / Unknown |','| P11 — Revisión de demo | Recorrer compra, resultado y excepción representativa | Guion reproducible, evidencias revisables y límites de demo claros | Pendiente de SKI-53: preparar guion y paquete de presentación; recorrido técnico verificado en E19 |\n| P12 — 3DS | Fallar la autenticación y reintentar con Complete | Sin pago al fallar; misma compra pagada al completar | PASS: authentication_failure → challenge/authenticated, mismo PaymentIntent, confirmación y evento; E19 |\n| P13 — Móvil y escritorio | Revisar marca, textos, botones y recorrido | Contenido legible, sin desbordamientos, pago/resultado operativos | PASS con observación QA52-03 sobre Apple Pay no validado; capturas y geometría 320/390/768/1440, compra y devolución móvil; E19 |')
replace(docs/'pruebas.md','**Pendientes:** recorrido completo de doble intento, devolución,\n3DS, revisión completa de móvil y aceptación externa.','**Pendientes:** guion de presentación (SKI-53) y aceptación externa. Apple Pay/Link\ny dispositivos físicos se validarán si forman parte del servicio real (SKI-77).')
append(docs/'pruebas.md','''## Cierre de la matriz SKI-52

E19: [pruebas funcionales y visuales](../evidencias/2026-09-15_pruebas_funcionales.json).
P06, P10, P12 y P13 comprobados. P02/P05 reforzados con dos nuevos pagos y sus
eventos automáticos; ambos pagos devueltos íntegramente. [Detalle y capturas](validacion_demo.md).
Sin cambios de código ni nueva publicación; las pruebas anteriores se conservan.
La observación QA52-03 afecta a la representación de Apple Pay en Chromium automatizado;
no bloquea el recorrido de demo con tarjeta. P11 pertenece al guion SKI-53.''')
replace(docs/'speedrun_demo.md','Siguiente: pruebas restantes y guion.','Matriz de tarjeta, 3DS, doble intento y devolución comprobada, con capturas.\nSiguiente: guion de presentación.')
replace(docs/'speedrun_demo.md','| 8 · Pruebas | Ejecutar compra correcta, rechazo, reintento, abandono, doble intento, repetición de evento y devolución. Revisar también autenticación de tarjeta y experiencia móvil. | Matriz con evidencia y resultado por caso; sin defectos que bloqueen la demo. |','| 8 · Pruebas | Ejecutar compra correcta, rechazo, reintento, abandono, doble intento, repetición, devolución, 3DS y revisión móvil. | **Hecho — SKI-52:** [validación y capturas](validacion_demo.md). Recorrido con tarjeta operativo; observación no bloqueante de Apple Pay en navegador automatizado. |')
replace(docs/'speedrun_demo.md','- [x] Doble intento y repetición de evento tienen tratamiento documentado; recorrido completo del doble intento aún en SKI-52.','- [x] Doble intento y repetición de evento comprobados y documentados.')
replace(docs/'speedrun_demo.md','- [ ] Devolución de prueba comprobada.','- [x] Devolución de prueba comprobada.')
replace(docs/'speedrun_demo.md','- [ ] Vista móvil, textos y logo revisados.','- [x] Vista móvil, textos y logo revisados en Chromium; límites de wallets documentados.')
replace(docs/'linear_speedrun.md','tras verificar la notificación de pago.','tras cerrar la matriz funcional y visual con tarjeta.')
replace(docs/'linear_speedrun.md','**Done** por [firma, recepción y repetición verificadas](webhook_stripe.md); cinco tareas\nsiguen **Todo**. Quedan la matriz final y el guion de demo.','**Done** por [firma, recepción y repetición verificadas](webhook_stripe.md). SKI-52 está\n**Done** por la [matriz funcional y visual](validacion_demo.md); cuatro tareas\nsiguen **Todo**. Queda el guion de demo antes de Carmen.')
replace(docs/'linear_speedrun.md','| [SKI-52](https://linear.app/skilland/issue/SKI-52) | Probar NutriWell: pago, rechazo, reintento, duplicados, devolución y móvil | Demo · OL3 | Todo | SKI-37, SKI-50, SKI-51 |','| [SKI-52](https://linear.app/skilland/issue/SKI-52) | Probar NutriWell: pago, rechazo, reintento, duplicados, devolución y móvil | Demo · OL3 | Done | SKI-37, SKI-50, SKI-51 |')
append(docs/'linear_speedrun.md','''## Verificación de SKI-52 — 2026-09-15

3DS fallido/correcto, dos pestañas con una sesión, dos nuevos pagos y devoluciones
completas, eventos automáticos y revisión visual en Chromium. E19 y
[detalle](validacion_demo.md). Observación de Apple Pay no bloqueante para tarjeta.
Ocho Done y cuatro Todo; siguiente SKI-53. Relectura remota:
`05_scratch/stripe-pruebas/linear_ski52.json`.''')
replace(docs/'bitacora.md','### S26 — Próxima ejecución\n\nRegistrar acción, resultado, evidencia, decisión y siguiente paso al ejecutar SKI-52.','''### S26 — Matriz funcional y visual — SKI-52

- **Acción:** ejecutar 3DS fallido/correcto, dos pestañas, devoluciones y recorrido
  móvil contra el despliegue público; verificar Stripe y registro persistente.
- **Resultado:** dos pagos nuevos de 100 EUR ficticios, dos devoluciones completas,
  confirmaciones coherentes y notificaciones automáticas. Una sesión/pago por compra.
- **Visual:** capturas de página, checkout, confirmación y devolución; geometría
  sin desbordamientos en cuatro anchos. Móvil emulado en Chromium, no teléfono físico.
- **Incidencias:** captura IAB fallida resuelta con Agent Browser; carga diferida
  del logo verificada tras desplazamiento. Apple Pay irregular en capturas, causa
  sin determinar; observación QA52-03 no bloqueante para la demo con tarjeta.
- **Evidencia:** E19 y validacion_demo.md; detalle en `05_scratch/stripe-pruebas/`.
- **Código:** conservado el despliegue SKI-51; no se han requerido correcciones
  ni nueva publicación. La suite de 21 tests anterior se conserva como evidencia previa.
- **Siguiente:** SKI-53, guion y paquete; después ensayo del usuario y Carmen.

### S27 — Próxima ejecución

Registrar acción, resultado, evidencia, decisión y siguiente paso al ejecutar SKI-53.''')
replace(docs/'guia_cliente.md','También están comprobadas las notificaciones y su repetición. Quedan el recorrido\ncompleto de doble intento, devolución y 3DS. Antes de usar la','También están comprobadas las notificaciones, repetición, doble intento,\ndevolución y 3DS. La vista móvil se ha revisado en Chromium. La demo validada usa\ntarjeta; Apple Pay y Link requieren sus propias pruebas si se incluyen. Antes de usar la')
replace(docs/'configuracion_entornos.md','Confirmación/abandono/reintento y receptor con firma/deduplicación probados; quedan las pruebas finales de SKI-52','Confirmación/abandono/reintento, firma/deduplicación, 3DS, doble intento, devolución y revisión visual comprobados; guion en SKI-53')
append(docs/'configuracion_entornos.md','''## Métodos de pago y dispositivos — observación de QA

La matriz SKI-52 valida tarjeta en Chromium, incluidos 3DS y anchos móviles.
Apple Pay/Link no se han probado como métodos de pago. El botón de Apple Pay
apareció irregular en capturas automatizadas (QA52-03). Si EPI10 los habilita,
verificar disponibilidad, representación y pago en dispositivos compatibles en
SKI-77. [Evidencia y límites](validacion_demo.md).''')
replace(docs/'confirmacion_recuperacion.md','Devolución y autenticación 3DS siguen pendientes de SKI-52. La revisión de\ngeometría no sustituye una captura visual.','Devolución, autenticación 3DS y capturas visuales se completaron después en\n[SKI-52](validacion_demo.md), con los límites de dispositivos allí indicados.')
replace(docs/'producto_demo.md','Devolución y recorrido completo de doble intento pendientes en SKI-52.','Devolución y doble intento comprobados en [SKI-52](validacion_demo.md).')
replace(docs/'decisiones.md','- Recorrido completo de doble intento y devolución: pendientes en SKI-52.\n  Recuperación, receptor de eventos y deduplicación probados en SKI-50/51.','- Validación de wallets y dispositivos físicos, si se incluyen en el servicio real.\n  Recuperación, receptor, deduplicación, doble intento, 3DS y devolución probados en SKI-50/51/52.')
append(docs/'webhook_stripe.md','''## Validación posterior — SKI-52

Dos pagos nuevos han generado sus notificaciones automáticas y se han devuelto
íntegramente. Los eventos charge.refunded actualizan compra/pago a refunded y
conservan la actuación original. Confirmación, registro y Stripe coinciden.
La devolución real del sandbox ya está comprobada; [E19 y detalle](validacion_demo.md).''')
replace(root/'02_context/01_estado_actual.md','SKI-49, SKI-37, SKI-50 y SKI-51 Done; cinco Todo.','SKI-49, SKI-37, SKI-50, SKI-51 y SKI-52 Done; cuatro Todo.')
replace(root/'02_context/01_estado_actual.md','**Siguiente: SKI-52**, resto de pruebas (devolución, 3DS, recorrido completo de\ndoble intento y revisión final); después, paquete/guion SKI-53.','''SKI-52 completada: 3DS fallido y correcto, dos pestañas con una sesión, dos pagos
nuevos y devoluciones completas, notificaciones automáticas y capturas de móvil/
escritorio. Sin cambios de código; E19 y [validación](../04_outputs/modulos/stripe/docs/validacion_demo.md).
Móvil probado en viewport de Chromium. Observación no bloqueante: Apple Pay aparece
irregular en capturas; wallets y dispositivos físicos no certificados.

**Siguiente: SKI-53**, paquete y guion para Carmen; después, ensayo del usuario.''')
spec=root/'03_specs/now/011_now.md'
for item in ['Fallo, abandono, reintento, duplicado y devolución tratados con evidencia.','SKI-52: completar autenticación 3DS y correlacionar confirmación, pago y evento.','SKI-52: dos intentos de la misma compra conservan una sesión y un pago;','SKI-52: revisión visual y de navegación en móvil y escritorio, con evidencia']:
 replace(spec,'- [ ] '+item,'- [x] '+item)
append(spec,'''### QA SKI-52 — 2026-09-15

PASS del recorrido de demo con tarjeta. 3DS fallido/correcto conserva sesión y
PaymentIntent; dos pestañas reutilizan la misma compra y un clic tras pagar
vuelve a la confirmación. Dos nuevos pagos de 100 EUR ficticios y dos devoluciones
completas contrastados con sus eventos automáticos, registro y pantallas.
Capturas de móvil/escritorio revisadas, geometría sin desbordamientos en cuatro
anchos. E19 y `docs/validacion_demo.md`. Sin cambios de aplicación ni despliegue.
Se reutiliza la evidencia previa de rechazo/abandono, firma y 21 tests de E17/E18.
Observación no bloqueante QA52-03: Apple Pay irregular en navegador automatizado;
causa sin determinar, wallets y dispositivos físicos fuera de la validación de
esta demo con tarjeta. Guion SKI-53, Carmen y cuenta productiva siguen pendientes.
La spec permanece activa.''')
index=mod/'evidencias/README.md';lines=index.read_text().splitlines(); pos=next(i for i,l in enumerate(lines) if l.startswith('| E18 |')); lines.insert(pos+1,'| E19 | [Matriz funcional y visual](2026-09-15_pruebas_funcionales.json) | 3DS fallido/correcto, dos pestañas, dos pagos/devoluciones, eventos y capturas móvil/escritorio; mismo código publicado | Guion SKI-53, Carmen y cuenta real; wallets/dispositivos físicos no validados, observación QA52-03 |'); index.write_text('\n'.join(lines)+'\n')
print(json.dumps({'evidence':'E19','screenshots':len(images),'source_unchanged':unchanged,'payment_checks':'PASS','new_payments':2,'full_refunds':2},ensure_ascii=False))
