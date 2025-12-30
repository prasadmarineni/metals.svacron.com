"use client";

import { motion } from 'framer-motion';
import { MetalRate } from '@/types';
import { formatPurityLabel } from '@/lib/purityFormatter';

interface PriceCardProps {
  metal: string;
  rate: MetalRate;
  metalColor: string;
}

export default function PriceCard({ metal, rate, metalColor }: PriceCardProps) {
  const isPositive = rate.change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card"
      style={{ borderLeft: `4px solid ${metalColor}` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-300">{metal}</h3>
          <p className="text-sm text-gray-400">{formatPurityLabel(rate.purity)}</p>
        </div>
        <div className={`text-sm font-medium ${isPositive ? 'price-up' : 'price-down'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(rate.changePercent).toFixed(2)}%
        </div>
      </div>
      
      <div className="mb-2">
        <div className="text-3xl font-bold" style={{ color: metalColor }}>
          {rate.unit.startsWith('₹') ? '₹' : ''}{rate.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </div>
        <div className="text-sm text-gray-400">per gram</div>
      </div>
      
      <div className={`text-sm ${isPositive ? 'price-up' : 'price-down'}`}>
        {isPositive ? '+' : ''}{rate.change.toFixed(2)} vs yesterday
      </div>
    </motion.div>
  );
}
