"use client";

import { HistoryEntry } from '@/types';

interface HistoryTableProps {
  history: HistoryEntry[];
  title?: string;
}

export default function HistoryTable({ history, title = "30-Day Price History" }: HistoryTableProps) {
  // Sort by date descending (newest first) and calculate overall 30-day change
  const historyData = [...history]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 30);
  const oldestEntry = historyData[historyData.length - 1];
  const latestEntry = historyData[0];
  
  const overallChange = latestEntry && oldestEntry 
    ? latestEntry.price - oldestEntry.price 
    : 0;
  
  const overallChangePercent = oldestEntry && oldestEntry.price > 0
    ? (overallChange / oldestEntry.price) * 100
    : 0;
  
  const isPositiveOverall = overallChange >= 0;

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      {/* Overall 30-Day Summary */}
      {historyData.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">30-Day Overall Change</p>
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-bold ${isPositiveOverall ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositiveOverall ? '+' : ''}₹{overallChange.toFixed(2)}
                </span>
                <span className={`text-lg font-semibold ${isPositiveOverall ? 'text-green-400' : 'text-red-400'}`}>
                  ({isPositiveOverall ? '+' : ''}{overallChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Period: {oldestEntry?.date} to {latestEntry?.date}</p>
              <p className="text-sm text-gray-500">
                From ₹{oldestEntry?.price.toFixed(2)} → ₹{latestEntry?.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Price (₹/gram)</th>
              <th>Change (₹)</th>
              <th>Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry, index) => {
              const isPositive = entry.change >= 0;
              return (
                <tr key={index}>
                  <td>{new Date(entry.date).toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</td>
                  <td className="font-semibold">
                    ₹{entry.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className={isPositive ? 'price-up' : 'price-down'}>
                    {isPositive ? '+' : ''}{entry.change.toFixed(2)}
                  </td>
                  <td className={isPositive ? 'price-up' : 'price-down'}>
                    {isPositive ? '+' : ''}{entry.changePercent.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
