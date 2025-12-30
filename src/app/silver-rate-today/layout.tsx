import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Silver Rate Today - Live Silver Price per Gram in India',
  description: 'Check today\'s silver rate in India. Get live prices for 999 and Sterling Silver (925) per gram with historical data and price charts.',
  keywords: [
    'silver rate today',
    'silver price India',
    'silver price per gram',
    '999 silver rate',
    'sterling silver price',
    'live silver rate',
    'silver rate history',
  ],
  openGraph: {
    title: 'Silver Rate Today - Live Silver Price in India',
    description: 'Check live silver rates for 999 and Sterling Silver in India with historical data.',
    url: 'https://metals.svacron.com/silver-rate-today',
    type: 'website',
  },
};

export default function SilverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
