import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gold Rate Today - Live 24K, 22K, 18K Gold Price per Gram',
  description: 'Check today\'s gold rate in India. Get live prices for 24K, 22K, and 18K gold per gram with historical data and price charts.',
  keywords: [
    'gold rate today',
    '24 karat gold price',
    '22 karat gold rate',
    'gold price per gram',
    'gold rate India',
    'today gold rate',
    'live gold price',
  ],
  openGraph: {
    title: 'Gold Rate Today - Live Gold Price in India',
    description: 'Check live gold rates for 24K, 22K, and 18K gold in India with historical data.',
    url: 'https://metals.svacron.com/gold-rate-today',
    type: 'website',
  },
};

export default function GoldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
