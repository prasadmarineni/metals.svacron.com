import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platinum Rate Today - Live Platinum Price per Gram in India',
  description: 'Check today\'s platinum rate in India. Get live prices for 999 and 950 platinum per gram with historical data and price charts.',
  keywords: [
    'platinum rate today',
    'platinum price India',
    'platinum price per gram',
    '999 platinum rate',
    '950 platinum price',
    'live platinum rate',
    'platinum rate history',
  ],
  openGraph: {
    title: 'Platinum Rate Today - Live Platinum Price in India',
    description: 'Check live platinum rates for 999 and 950 platinum in India with historical data.',
    url: 'https://metals.svacron.com/platinum-rate-today',
    type: 'website',
  },
};

export default function PlatinumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
