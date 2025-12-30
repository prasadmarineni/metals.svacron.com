"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MetalCard from '@/components/MetalCard';
import { getAllMetalsData } from '@/lib/metalData';
import { MetalData } from '@/types';

export default function Home() {
  const [metalsData, setMetalsData] = useState<Record<string, MetalData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllMetalsData();
        setMetalsData(data);
      } catch (error) {
        console.error('Error loading metals data:', error);
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
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading rates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-yellow-400 via-gray-300 to-gray-400 bg-clip-text text-transparent">
            Live Precious Metal Prices
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
          Track real-time prices for Gold, Silver, and Platinum in India with historical trends. 
          Get accurate rates across multiple purities with historical data and interactive charts.
        </p>
        <p className="text-sm text-gray-400">
          Last updated: {metalsData?.gold ? new Date(metalsData.gold.lastUpdated).toLocaleString('en-IN') : 'Loading...'}
        </p>
      </motion.div>

      {/* Metal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {metalsData && (
          <>
            <MetalCard
              data={metalsData.gold}
              href="/gold-rate-today"
              gradient="gold-gradient"
              icon="🏆"
            />
            <MetalCard
              data={metalsData.silver}
              href="/silver-rate-today"
              gradient="silver-gradient"
              icon="🥈"
            />
            <MetalCard
              data={metalsData.platinum}
              href="/platinum-rate-today"
              gradient="platinum-gradient"
              icon="💎"
            />
          </>
        )}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">About Our Prices</h2>
        <div className="space-y-3 text-gray-300">
          <p>
            Our platform provides accurate and up-to-date precious metal prices sourced from reliable market data. 
            All prices are displayed in Indian Rupees (₹) per gram.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Gold:</strong> Available in 24K, 22K, and 18K purities</li>
            <li><strong>Silver:</strong> Available in 999 and Sterling Silver (925) purities</li>
            <li><strong>Platinum:</strong> Available in 999 and 950 purities</li>
          </ul>
          <p>
            Click on any metal card above to view detailed information, including 30-day price history, 
            interactive charts, and long-term price trends.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
