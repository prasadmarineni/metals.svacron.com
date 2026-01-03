"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PriceCard from '@/components/PriceCard';
import HistoryTable from '@/components/HistoryTable';
import WeightPriceTable from '@/components/WeightPriceTable';
import MultiPurityHistoryTable from '@/components/MultiPurityHistoryTable';
import PriceChart from '@/components/PriceChart';
import { getMetalData } from '@/lib/metalData';
import { MetalData, ChartDataPoint } from '@/types';
import Head from 'next/head';

const SILVER_COLOR = '#C0C0C0';

export default function SilverPage() {
  const [silverData, setSilverData] = useState<MetalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMetalData('silver');
        setSilverData(data);
      } catch (error) {
        console.error('Error loading silver data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // No need for mock data - using real history data in PriceChart

  const updateDate = silverData ? new Date(silverData.lastUpdated || new Date().toISOString()) : new Date();
  const jsonLd = silverData ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Silver Rate Today in India",
    "description": "Live silver rates in India for 999 and Sterling (925) purity. Updated daily with accurate per gram rates, 30-day history, and price charts.",
    "keywords": "silver rate today, silver rate today in India, 999 silver rate, 925 silver rate, sterling silver rate, silver price per gram, today silver rate, live silver rate India",
    "brand": {
      "@type": "Brand",
      "name": "Svacron Metals"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": silverData.rates[silverData.rates.length - 1].price,
      "highPrice": silverData.rates[0].price,
      "priceValidUntil": new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "url": "https://metals.svacron.com/silver-rate-today"
    },
    "dateModified": silverData.lastUpdated,
    "updateFrequency": "Daily"
  } : undefined;

  return (
    <>
      {/* JSON-LD for SEO */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="container py-20">
        {/* Update Notice for SEO */}
        {silverData && (
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Updated Daily</p>
                  <p className="text-lg font-semibold text-gray-300">
                    {updateDate.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="sr-only">
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-300">
                  {updateDate.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header - Show immediately */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🥈</span>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                Silver Rate Today in India
              </span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Track real-time silver rates in India for 999 and Sterling (925) purity. Live per gram rates updated daily with 30-day history and price trends.
          </p>
        </motion.div>

      {/* Loading State or Price Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[1, 2].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-32 bg-gray-700/50 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : !silverData ? (
        <div className="text-center text-red-400 py-12">
          <p>Error loading silver data. Please try again later.</p>
        </div>
      ) : (
        <>
      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {silverData.rates.map((rate, index) => (
          <PriceCard
            key={index}
            metal="Silver"
            rate={rate}
            metalColor={SILVER_COLOR}
          />
        ))}
      </div>

      {/* Weight-based Price Table for Last 10 Days */}
      <div className="mb-12">
        <WeightPriceTable 
          history={silverData.history.oneMonth}
          title="Silver Price by Weight - Last 10 Days (999 Purity)"
        />
      </div>

      {/* 30-Day History with Multiple Purities */}
      <div className="mb-12">
        <MultiPurityHistoryTable 
          history={silverData.history.oneMonth} 
          title="30-Day Price History(per 10 grams)"
          purities={[
            { label: 'Pure (999) Price', multiplier: 1 },
            { label: 'Sterling (925) Price', multiplier: 0.925 }
          ]}
        />
      </div>

      {/* Chart - Moved to last */}
      <div className="mb-12">
        {silverData && (
          <PriceChart
            history={silverData.history.oneMonth}
            metalColor={SILVER_COLOR}
            metalName="Silver"
          />
        )}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card mt-12"
      >
        <h2 className="text-2xl font-bold mb-4">Understanding Silver Purity</h2>
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-300 mb-2">999 Fine Silver</h3>
            <p>Pure silver with 99.9% silver content. Also known as &quot;three nines fine&quot;, this is the highest grade of silver commonly available. Ideal for investment and industrial use.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-300 mb-2">Sterling Silver (925)</h3>
            <p>Contains 92.5% silver alloyed with 7.5% other metals (usually copper). More durable than pure silver, making it perfect for jewelry and silverware. Most commonly used standard for silver jewelry worldwide.</p>
          </div>
          <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
            <h3 className="font-semibold text-blue-400 mb-2">💡 Investment Tip</h3>
            <p>Silver is often considered a more affordable alternative to gold while still maintaining its value as a precious metal. It&apos;s widely used in both investment and industrial applications.</p>
          </div>
        </div>
      </motion.div>
        </>
      )}
    </div>
    </>
  );
}

// Helper function to generate mock yearly data
function generateYearlyData(days: number, basePrice: number): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i -= Math.max(1, Math.floor(days / 100))) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Simulate price variation
    const variation = (Math.random() - 0.5) * (basePrice * 0.2);
    const price = basePrice + variation;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
    });
  }
  
  return data;
}
