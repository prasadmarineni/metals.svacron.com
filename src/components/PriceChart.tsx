"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HistoryEntry } from '@/types';

interface PriceChartProps {
  history: HistoryEntry[];
  metalColor: string;
  metalName: string;
}

interface ChartPoint {
  date: string;
  price: number;
}

const timeframes = ['1M', '3M', '6M', '1Y', 'ALL'];

// Group data by month and get average price
function groupByMonth(history: HistoryEntry[], months: number): ChartPoint[] {
  if (!history || history.length === 0) return [];
  
  const now = new Date();
  const cutoffDate = new Date(now);
  cutoffDate.setMonth(cutoffDate.getMonth() - months);
  
  const filtered = history.filter(h => new Date(h.date) >= cutoffDate);
  
  const grouped: Record<string, number[]> = {};
  
  filtered.forEach(entry => {
    const date = new Date(entry.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(entry.price);
  });
  
  return Object.entries(grouped)
    .map(([key, prices]) => {
      const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
      const [year, month] = key.split('-');
      const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('en-IN', { month: 'short', year: '2-digit' });
      return {
        date: monthName,
        price: Math.round(avgPrice * 100) / 100
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export default function PriceChart({ history, metalColor, metalName }: PriceChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  
  const chartData = useMemo(() => {
    const monthsMap: Record<string, number> = {
      '1M': 1,
      '3M': 3,
      '6M': 6,
      '1Y': 12,
      'ALL': 120  // 10 years
    };
    return groupByMonth(history, monthsMap[selectedTimeframe] || 12);
  }, [history, selectedTimeframe]);
  
  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-4">{metalName} Price Chart</h3>
        <div className="flex gap-2 flex-wrap">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedTimeframe === timeframe
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-80 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#e5e7eb' }}
                formatter={(value) => `₹${value}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={metalColor} 
                strokeWidth={2}
                dot={false}
                name={`${metalName} Price (₹/gram)`}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No data available for {selectedTimeframe}
          </div>
        )}
      </div>
    </div>
  );
}
