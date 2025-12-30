import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Svacron Metals',
    default: 'Live Gold, Silver & Platinum Rates Today - Svacron Metals',
  },
  description:
    "Check live rates for Gold, Silver, and Platinum in India. Get real-time market rates per gram for 24K, 22K, 18K gold, 999 silver, and platinum. Updated daily with accurate investment insights.",
  keywords: [
    "gold rate today",
    "gold rate today in India",
    "gold price today",
    "silver rate today",
    "silver rate today in India",
    "platinum rate today",
    "platinum rate today in India",
    "gold rate per gram",
    "silver rate per gram",
    "24 karat gold rate",
    "22 karat gold rate",
    "18 karat gold rate",
    "14 karat gold rate",
    "999 silver rate",
    "925 silver rate",
    "sterling silver rate",
    "platinum rate per gram",
    "today gold rate",
    "today silver rate",
    "live gold rate",
    "live silver rate",
    "gold rate India",
    "silver rate India",
    "gold price per gram India",
    "gold investment India",
    "silver investment India",
    "metal rates India",
    "precious metal rates",
    "gold rate chart",
    "gold rate history",
    "22 carat gold rate today",
    "24 carat gold rate today",
  ],
  authors: [{ name: "Svacron" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://metals.svacron.com",
    siteName: "Svacron Metals",
    title: "Live Gold, Silver & Platinum Prices Today - India",
    description:
      "Check live prices for Gold, Silver, and Platinum in India. Get real-time market prices, historical data, and price charts for informed investment decisions.",
    images: [
      {
        url: "https://metals.svacron.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Svacron Metals - Live Precious Metal Prices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Gold, Silver & Platinum Prices Today - India",
    description:
      "Check live prices for Gold, Silver, and Platinum in India. Get real-time market prices, historical data, and investment insights.",
    images: ["https://metals.svacron.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://metals.svacron.com",
  },
  verification: {
    google: "ca-pub-1264547202948640",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Svacron Metals",
    url: "https://metals.svacron.com",
    description:
      "Live prices for Gold, Silver, and Platinum in India with historical data and market analysis.",
    publisher: {
      "@type": "Organization",
      name: "Svacron",
      logo: {
        "@type": "ImageObject",
        url: "https://metals.svacron.com/svacron-logo.svg",
      },
    },
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1264547202948640"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="page-wrapper">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
