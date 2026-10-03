'use client';
import { useFormStatus } from 'react-dom';
import { continuePurchase } from '../actions/purchase';

export function SubmitButton({ children, className = 'button button--blue' }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" className={className} disabled={pending} aria-busy={pending}>
    {pending ? 'Un momento…' : children}
  </button>;
}
export function PurchaseButton({ wide = false }: { wide?: boolean }) {
  return <form action={continuePurchase} className={wide ? 'purchase-form purchase-form--wide' : 'purchase-form'}>
    <SubmitButton className={`button button--blue${wide ? ' purchase-button' : ''}`}>Probar compra <span aria-hidden="true">↗</span></SubmitButton>
  </form>;
}
