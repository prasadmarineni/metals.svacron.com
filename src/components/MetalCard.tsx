"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MetalData } from '@/types';

interface MetalCardProps {
  data: MetalData;
  href: string;
  gradient: string;
  icon: string;
}

export default function MetalCard({ data, href, gradient, icon }: MetalCardProps) {
  const primaryRate = data.rates[0];
  const isPositive = primaryRate.change >= 0;
  
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="card cursor-pointer"
      >
        <div className={`text-4xl mb-3 ${gradient}`} style={{ 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {icon}
        </div>
        
        <h2 className="text-2xl font-bold mb-2">{data.metal}</h2>
        
        <div className="mb-4">
          <div className="text-3xl font-bold text-white">
            ₹{primaryRate.price.toLocaleString('en-IN')}
          </div>
          <div className="text-sm text-gray-400">per gram ({primaryRate.purity})</div>
        </div>
        
        <div className={`flex items-center gap-2 text-sm font-medium ${isPositive ? 'price-up' : 'price-down'}`}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{isPositive ? '+' : ''}{primaryRate.change.toFixed(2)}</span>
          <span>({isPositive ? '+' : ''}{primaryRate.changePercent.toFixed(2)}%)</span>
        </div>
        
        <div className="sr-only">
          Last updated: {new Date(data.lastUpdated).toLocaleString('en-IN')}
        </div>
        
        <div className="mt-4 text-blue-400 font-medium flex items-center">
          View Details →
        </div>
      </motion.div>
    </Link>
  );
}
