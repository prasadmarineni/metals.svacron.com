"use client";

import { HistoryEntry } from '@/types';

interface MultiPurityHistoryTableProps {
  history: HistoryEntry[];
  title?: string;
  purities: Array<{
    label: string;
    multiplier: number;
  }>;
}

export default function MultiPurityHistoryTable({ 
  history, 
  title = "30-Day Price History",
  purities
}: MultiPurityHistoryTableProps) {
  // Sort by date descending (newest first) and take last 30 days
  const historyData = [...history]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 30);
  
  // Calculate 30-day overall change for each purity
  const oldestEntry = historyData[historyData.length - 1];
  const latestEntry = historyData[0];

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      {/* 30-Day Overall Summary for all purities */}
      {historyData.length > 0 && oldestEntry && latestEntry && (
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700">
          <p className="text-sm text-gray-400 mb-3">30-Day Overall Change</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {purities.map((purity, index) => {
              const oldestPrice = oldestEntry.price * purity.multiplier;
              const latestPrice = latestEntry.price * purity.multiplier;
              const overallChange = latestPrice - oldestPrice;
              const overallChangePercent = oldestPrice > 0 ? (overallChange / oldestPrice) * 100 : 0;
              const isPositive = overallChange >= 0;
              
              return (
                <div key={index} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{purity.label}</p>
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}₹{overallChange.toFixed(2)}
                    </span>
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      ({isPositive ? '+' : ''}{overallChangePercent.toFixed(2)}%)
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      ₹{oldestPrice.toFixed(2)} → ₹{latestPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Period: {oldestEntry?.date} to {latestEntry?.date}
          </p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              {purities.map((purity, index) => (
                <th key={index}>{purity.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{new Date(entry.date).toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</td>
                  {purities.map((purity, purityIndex) => {
                    const price = entry.price * purity.multiplier;
                    const change = entry.change * purity.multiplier;
                    const isPositive = change >= 0;
                    
                    return (
                      <td key={purityIndex}>
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            ₹{price.toFixed(2)}
                          </span>
                          <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            ({isPositive ? '+' : ''}₹{change.toFixed(2)})
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
