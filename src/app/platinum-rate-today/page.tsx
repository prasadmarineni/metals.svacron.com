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

const PLATINUM_COLOR = '#E5E4E2';

export default function PlatinumPage() {
  const [platinumData, setPlatinumData] = useState<MetalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMetalData('platinum');
        setPlatinumData(data);
      } catch (error) {
        console.error('Error loading platinum data:', error);
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
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-300 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading platinum rates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!platinumData) {
    return (
      <div className="container py-20">
        <div className="text-center text-red-400">
          <p>Error loading platinum data. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Generate yearly chart data
  const chartData: Record<string, ChartDataPoint[]> = {
    '1Y': generateYearlyData(365, platinumData.rates[0].price),
    '3Y': generateYearlyData(365 * 3, platinumData.rates[0].price),
    '5Y': generateYearlyData(365 * 5, platinumData.rates[0].price),
    '10Y': generateYearlyData(365 * 10, platinumData.rates[0].price),
    'ALL': generateYearlyData(365 * 15, platinumData.rates[0].price),
  };

  const updateDate = new Date(platinumData.lastUpdated || new Date().toISOString());
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Platinum Rate Today in India",
    "description": "Live platinum rates in India for 999, 950, and 900 purity. Updated daily with accurate per gram rates, 30-day history, and price charts.",
    "keywords": "platinum rate today, platinum rate today in India, 999 platinum rate, 950 platinum rate, platinum price per gram, today platinum rate, live platinum rate India",
    "brand": {
      "@type": "Brand",
      "name": "Svacron Metals"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": platinumData.rates[platinumData.rates.length - 1].price,
      "highPrice": platinumData.rates[0].price,
      "priceValidUntil": new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "url": "https://metals.svacron.com/platinum-rate-today"
    },
    "dateModified": platinumData.lastUpdated,
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
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-gray-400/10 to-gray-500/10 border border-gray-400/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-sm text-gray-400 mb-1">Updated Daily</p>
                <p className="text-lg font-semibold text-gray-200">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">💎</span>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                Platinum Rate Today in India
              </span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Track real-time platinum rates in India for 999, 950, and 900 purity. Live per gram rates updated daily with 30-day history and price trends.
          </p>
        </motion.div>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {platinumData.rates.map((rate, index) => (
          <PriceCard
            key={index}
            metal="Platinum"
            rate={rate}
            metalColor={PLATINUM_COLOR}
          />
        ))}
      </div>

      {/* Weight-based Price Table for Last 10 Days */}
      <div className="mb-12">
        <WeightPriceTable 
          history={platinumData.history.oneMonth}
          title="Platinum Price by Weight - Last 10 Days (999 Purity)"
        />
      </div>

      {/* 30-Day History with Multiple Purities */}
      <div className="mb-12">
        <MultiPurityHistoryTable 
          history={platinumData.history.oneMonth} 
          title="30-Day Price History"
          purities={[
            { label: '999 Price', multiplier: 1 },
            { label: '950 Price', multiplier: 0.95 },
            { label: '900 Price', multiplier: 0.90 }
          ]}
        />
      </div>

      {/* Chart - Moved to last */}
      <div className="mb-12">
        <PriceChart
          data={chartData}
          metalColor={PLATINUM_COLOR}
          metalName="Platinum"
        />
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card mt-12"
      >
        <h2 className="text-2xl font-bold mb-4">Understanding Platinum Purity</h2>
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-200 mb-2">999 Pure Platinum</h3>
            <p>Pure platinum with 99.9% platinum content. The highest grade of platinum, extremely rare and valuable. Primarily used for investment purposes and high-end industrial applications.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-200 mb-2">950 Platinum</h3>
            <p>Contains 95% platinum alloyed with 5% other metals (typically ruthenium, iridium, or cobalt). This is the standard for fine platinum jewelry. More durable than pure platinum while maintaining its prestigious appearance and hypoallergenic properties.</p>
          </div>
          <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
            <h3 className="font-semibold text-purple-400 mb-2">💎 Why Platinum?</h3>
            <p>Platinum is rarer than gold and has unique properties making it highly valued:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>30 times rarer than gold</li>
              <li>Hypoallergenic - ideal for sensitive skin</li>
              <li>Extremely durable and resistant to wear</li>
              <li>Maintains its natural white color without plating</li>
              <li>Used in automotive, medical, and jewelry industries</li>
            </ul>
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
    const variation = (Math.random() - 0.5) * (basePrice * 0.18);
    const price = basePrice + variation;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
    });
  }
  
  return data;
}
