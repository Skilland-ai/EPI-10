import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
const sans = DM_Sans({ variable: '--font-sans', subsets: ['latin'], display: 'swap' });
const editorial = Instrument_Serif({ variable: '--font-editorial', weight: '400', style: ['normal', 'italic'], subsets: ['latin'], display: 'swap' });
export const metadata: Metadata = {
  title: 'NutriWell — Comprende lo que te hace único | EPI10',
  description: 'Genética, hábitos e interpretación profesional. Descubre NutriWell en esta demostración de EPI10 y prueba el recorrido de pago sin cargos reales.',
  metadataBase: new URL('https://epi10-nutriwell-demo.vercel.app'),
  openGraph: { title: 'NutriWell — Tu biología. Tu próximo capítulo.', description: 'Una experiencia EPI10. Genética, hábitos e interpretación profesional. Demostración sin cobros reales.', siteName: 'EPI10 Salud', locale: 'es_ES', type: 'website', images: [{ url: '/og.png', width: 1730, height: 909, alt: 'NutriWell — Tu biología. Tu próximo capítulo.' }] },
  twitter: { card: 'summary_large_image', title: 'NutriWell — Tu biología. Tu próximo capítulo.', description: 'Una experiencia EPI10 · Demostración sin cobros reales.', images: ['/og.png'] },
  robots: { index: false, follow: false },
  icons: { icon: '/images/epi10-blue.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${sans.variable} ${editorial.variable}`}>{children}</body></html>;
}
