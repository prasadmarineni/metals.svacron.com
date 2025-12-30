"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDataPoint } from '@/types';

interface PriceChartProps {
  data: Record<string, ChartDataPoint[]>;
  metalColor: string;
  metalName: string;
}

const timeframes = ['1Y', '3Y', '5Y', '10Y', 'ALL'];

export default function PriceChart({ data, metalColor, metalName }: PriceChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  
  const chartData = data[selectedTimeframe] || [];
  
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
