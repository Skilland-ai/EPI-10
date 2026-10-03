import { cookies } from 'next/headers';
import Link from 'next/link';
import { decodeOrder, ORDER_COOKIE, orderReference } from '../../lib/order';
import { firstAttemptExpired, readPurchase, type PurchaseState } from '../../lib/purchase';
import { continuePurchase, startNewPurchase } from '../actions/purchase';
import { SubmitButton } from '../components/purchase-button';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Tu compra de prueba · NutriWell · EPI10' };
type View = PurchaseState | 'missing' | 'unavailable' | 'ready' | 'not-started';
const copy: Record<View, { title: string; text: string; label: string; icon: string }> = {
  paid: { title: 'Prueba completada.', text: 'Stripe ha confirmado tu pago de prueba de NutriWell. No se ha realizado ningún cobro real ni contratado el servicio.', label: 'PAGO DE PRUEBA CONFIRMADO', icon: '✓' },
  refunded: { title: 'Prueba devuelta.', text: 'Stripe ha confirmado la devolución completa de los 100 € de esta demostración.', label: 'DEVOLUCIÓN CONFIRMADA', icon: '↶' },
  pending: { title: 'Puedes continuar.', text: 'La compra de prueba sigue pendiente. Retoma el mismo checkout para completarla; si la tarjeta fue rechazada, podrás probar con otra tarjeta de prueba.', label: 'COMPRA PENDIENTE', icon: '↗' },
  expired: { title: 'Retomamos cuando quieras.', text: 'El checkout anterior ha caducado sin completar el pago. Puedes abrir otro intento para esta misma compra de prueba.', label: 'INTENTO CADUCADO', icon: '↻' },
  processing: { title: 'Estamos comprobando tu pago.', text: 'Todavía no hay un resultado definitivo. Espera y vuelve a comprobar el estado antes de iniciar otro intento.', label: 'CONFIRMACIÓN PENDIENTE', icon: '…' },
  ready: { title: 'Tu prueba empieza aquí.', text: 'Continúa a Stripe para probar la compra de NutriWell con un importe ficticio de 100 €.', label: 'NUTRIWELL · DEMO', icon: '↗' },
  'not-started': { title: 'Empezamos de nuevo.', text: 'La demostración anterior no llegó a abrir un checkout. Inicia otra prueba para continuar.', label: 'PRUEBA SIN INICIAR', icon: '↻' },
  missing: { title: 'Volvamos al principio.', text: 'No encontramos una compra de prueba en este navegador. Vuelve a NutriWell para empezar o abre el navegador donde la iniciaste.', label: 'SIN COMPRA ASOCIADA', icon: '↶' },
  unavailable: { title: 'Aún no podemos confirmarlo.', text: 'No hemos podido consultar el estado de la compra. Vuelve a comprobarlo antes de repetir el pago.', label: 'COMPROBACIÓN NO DISPONIBLE', icon: '…' },
};
export default async function PurchasePage({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const order = decodeOrder((await cookies()).get(ORDER_COOKIE)?.value);
  const { aviso } = await searchParams;
  let state: View = order ? 'ready' : 'missing';
  try {
    if (order) {
      const purchase = await readPurchase(order);
      if (purchase) state = purchase.state;
      else if (firstAttemptExpired(order)) state = 'not-started';
      else if (aviso === 'conexion') state = 'unavailable';
    }
  } catch { state = 'unavailable'; }
  const content = copy[state];
  const canContinue = ['pending', 'expired', 'ready'].includes(state);
  const finished = state === 'paid' || state === 'refunded';
  return <>
    <div className="demo-bar"><span className="status-dot" />Vista de demostración<span className="demo-bar__detail">Sin cobros reales</span></div>
    <header className="site-header shell"><Link href="/" prefetch={false} className="brand" aria-label="EPI10 Salud, inicio"><img src="/images/epi10-blue.png" alt="EPI10" width="132" height="47" /></Link><Link className="header-link" href="/" prefetch={false}>Volver a NutriWell <span aria-hidden="true">↗</span></Link></header>
    <main className="result-shell shell" id="contenido">
      <section className="result-card" aria-labelledby="result-title" data-payment-state={state}>
        <div className={`result-icon${finished ? ' result-icon--complete' : ''}`} aria-hidden="true">{content.icon}</div>
        <p className="eyebrow">{content.label}</p>
        <h1 id="result-title">{content.title}</h1>
        <p className="result-description">{content.text}</p>
        {order && <dl className="result-summary"><div><dt>Producto</dt><dd>NutriWell · DEMO</dd></div><div><dt>Importe de prueba</dt><dd>100,00 €</dd></div><div><dt>Referencia</dt><dd>{orderReference(order)}</dd></div></dl>}
        {finished && <div className="result-next"><h2>El siguiente paso.</h2><p>La demostración termina aquí. En el servicio real, EPI10 explicará cómo comenzar la experiencia NutriWell después de la compra.</p></div>}
        <div className="result-actions">
          {canContinue && <form action={continuePurchase}><SubmitButton>Continuar al pago de prueba <span aria-hidden="true">↗</span></SubmitButton></form>}
          {['processing', 'unavailable'].includes(state) && <a className="button button--blue" href="/compra">Comprobar de nuevo <span aria-hidden="true">↻</span></a>}
          {(finished || state === 'missing') && <Link className="button button--blue" href="/" prefetch={false}>Volver a NutriWell <span aria-hidden="true">↗</span></Link>}
          {(finished || state === 'not-started') && <form action={startNewPurchase}><SubmitButton className={finished ? 'result-secondary' : 'button button--blue'}>Iniciar otra prueba</SubmitButton></form>}
          {canContinue && <Link className="result-secondary" href="/" prefetch={false}>Volver a NutriWell</Link>}
        </div>
        <p className="result-disclosure">Demostración preparada por Skilland. Sin cobros reales ni prestación del servicio.</p>
      </section>
      <aside className="result-aside"><img src="/images/nutriwell-editorial.jpg" alt="Portada del informe NutriWell" width="1055" height="1491" /><p>Conocerte es<br /><em>el primer paso.</em></p></aside>
    </main>
  </>;
}
