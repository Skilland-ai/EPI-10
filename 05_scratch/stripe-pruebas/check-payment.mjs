import fs from 'node:fs/promises';
import {stripe, DEMO_ACCOUNT, purchaseState} from '../../04_outputs/modulos/stripe/app/lib/purchase.ts';
import {ledgerClient, LEDGER_KEY} from '../../04_outputs/modulos/stripe/app/lib/stripe-ledger.ts';
const [id, output, action] = process.argv.slice(2);
if (!/^cs_test_[A-Za-z0-9]+$/.test(id) || !output) throw Error('Session de sandbox y salida requeridas');
const client=stripe();
if ((await client.accounts.retrieve()).id!==DEMO_ACCOUNT) throw Error('Cuenta incorrecta');
let session=await client.checkout.sessions.retrieve(id,{expand:['line_items','payment_intent.latest_charge']});
const order={id:session.client_reference_id,attempt:Number(session.metadata.attempt),started:session.created*1000,session:id};
let state=purchaseState(session,order), refund;
if(action==='--refund') {
 if(state!=='paid') throw Error('Solo se devuelve el pago verificado de esta prueba');
 refund=await client.refunds.create({payment_intent:session.payment_intent.id,amount:10000,metadata:{demo:'nutriwell-v1',qa:'SKI-52'}},{idempotencyKey:`ski52-full-refund:${session.payment_intent.id}`});
 if(refund.status!=='succeeded' || refund.amount!==10000 || refund.currency!=='eur') throw Error('Revisar devolución');
 session=await client.checkout.sessions.retrieve(id,{expand:['line_items','payment_intent.latest_charge']});state=purchaseState(session,order);
}
const intent=session.payment_intent;
const charge=intent?.latest_charge;
const all=await client.checkout.sessions.list({created:{gte:session.created-10},limit:100});
const same=all.data.filter(s=>s.client_reference_id===order.id);
const journal=await ledgerClient().hgetall(LEDGER_KEY);
const records=Object.fromEntries(Object.entries(journal??{}).map(([key,value])=>[key,typeof value==='string'?JSON.parse(value):value]).filter(([,value])=>value.order_id===order.id));
const result={checked_at:new Date().toISOString(),account:DEMO_ACCOUNT,livemode:session.livemode,order_id:order.id,reference:`NW-${order.id.slice(0,8).toUpperCase()}`,session_id:id,session_status:session.status,payment_status:session.payment_status,state,amount:session.amount_total,currency:session.currency,payment_id:intent?.id,intent_status:intent?.status,last_payment_error:intent?.last_payment_error?{code:intent.last_payment_error.code,decline_code:intent.last_payment_error.decline_code}:null,charge:charge?{id:charge.id,paid:charge.paid,refunded:charge.refunded,amount_refunded:charge.amount_refunded,three_d_secure:charge.payment_method_details?.card?.three_d_secure}:null,refund:refund?{id:refund.id,status:refund.status,amount:refund.amount,currency:refund.currency}:undefined,sessions_for_order:same.map(s=>({id:s.id,status:s.status,payment_status:s.payment_status})),ledger:records};
await fs.writeFile(output,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
