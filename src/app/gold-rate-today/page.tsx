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

const GOLD_COLOR = '#FFD700';

// Note: For client components, metadata is handled via JSON-LD and Head tags in the component
// For SSR/SSG, you would export metadata here

export default function GoldPage() {
  const [goldData, setGoldData] = useState<MetalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMetalData('gold');
        setGoldData(data);
      } catch (error) {
        console.error('Error loading gold data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container py-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading gold rates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!goldData) {
    return (
      <div className="container py-20">
        <div className="text-center text-red-400">
          <p>Error loading gold data. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Generate yearly chart data
  const chartData: Record<string, ChartDataPoint[]> = {
    '1Y': generateYearlyData(365, goldData.rates[0].price),
    '3Y': generateYearlyData(365 * 3, goldData.rates[0].price),
    '5Y': generateYearlyData(365 * 5, goldData.rates[0].price),
    '10Y': generateYearlyData(365 * 10, goldData.rates[0].price),
    'ALL': generateYearlyData(365 * 15, goldData.rates[0].price),
  };

  const updateDate = new Date(goldData.lastUpdated || new Date().toISOString());
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Gold Rate Today in India",
    "description": "Live gold rates in India for 24K, 22K, 18K, and 14K purity. Updated daily with accurate per gram rates, 30-day history, and price charts.",
    "keywords": "gold rate today, gold rate today in India, 24 karat gold rate, 22 karat gold rate, gold price per gram, today gold rate, live gold rate India",
    "brand": {
      "@type": "Brand",
      "name": "Svacron Metals"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": goldData.rates[goldData.rates.length - 1].price,
      "highPrice": goldData.rates[0].price,
      "priceValidUntil": new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "url": "https://metals.svacron.com/gold-rate-today"
    },
    "dateModified": goldData.lastUpdated,
    "updateFrequency": "Daily"
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container py-20">
        {/* Update Notice for SEO */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-sm text-gray-400 mb-1">Updated Daily</p>
                <p className="text-lg font-semibold text-yellow-400">
                  {updateDate.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🏆</span>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Gold Rate Today in India
              </span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Track real-time gold rates in India for 24K, 22K, 18K, and 14K purity. Live per gram rates updated daily with 30-day history and price trends.
          </p>
        </motion.div>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {goldData.rates.map((rate, index) => (
          <PriceCard
            key={index}
            metal="Gold"
            rate={rate}
            metalColor={GOLD_COLOR}
          />
        ))}
      </div>

      {/* Weight-based Price Table for Last 10 Days */}
      <div className="mb-12">
        <WeightPriceTable 
          history={goldData.history.oneMonth}
          title="Gold Price by Weight - Last 10 Days (24K)"
        />
      </div>

      {/* 30-Day History with Multiple Purities */}
      <div className="mb-12">
        <MultiPurityHistoryTable 
          history={goldData.history.oneMonth} 
          title="30-Day Price History"
          purities={[
            { label: '24K Price', multiplier: 1 },
            { label: '22K Price', multiplier: 0.9166666667 },
            { label: '18K Price', multiplier: 0.75 }
          ]}
        />
      </div>

      {/* Chart - Moved to last */}
      <div className="mb-12">
        <PriceChart
          data={chartData}
          metalColor={GOLD_COLOR}
          metalName="Gold"
        />
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card mt-12"
      >
        <h2 className="text-2xl font-bold mb-4">Understanding Gold Purity</h2>
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">24 Karat Gold (999)</h3>
            <p>Pure gold with 99.9% gold content. Softest and most expensive form of gold, ideal for investment.</p>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">22 Karat Gold (916)</h3>
            <p>Contains 91.6% gold mixed with other metals for durability. Most commonly used for jewelry in India.</p>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">18 Karat Gold (750)</h3>
            <p>Contains 75% gold. More affordable and durable, popular for designer and fashion jewelry.</p>
          </div>
        </div>
      </motion.div>
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
    const variation = (Math.random() - 0.5) * (basePrice * 0.15);
    const price = basePrice + variation;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
    });
  }
  
  return data;
}
