"use client";

import { HistoryEntry } from '@/types';

interface WeightPriceTableProps {
  history: HistoryEntry[];
  title?: string;
}

export default function WeightPriceTable({ history, title = "Price by Weight - Last 10 Days" }: WeightPriceTableProps) {
  // Sort by date descending (newest first) and take last 10 days
  const last10Days = [...history]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th className="text-right">1 gram</th>
              <th className="text-right">8 grams</th>
              <th className="text-right">100 grams</th>
              <th className="text-right">1 KG</th>
            </tr>
          </thead>
          <tbody>
            {last10Days.map((entry, index) => {
              var gr1 = entry.price/10;
              const price1g = gr1;
              const price8g = gr1 * 8;
              const price10g = gr1 * 100;
              const price1kg = gr1 * 1000;
              
              var change1g = entry.change || 0;
              if(change1g != 0) {
                change1g = change1g / 10;
              }
              const change8g = change1g * 8;
              const change10g = change1g * 100;
              const change1kg = change1g * 1000;
              
              const isPositive = change1g >= 0;
              
              return (
                <tr key={index}>
                  <td className="font-medium">
                    {new Date(entry.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">
                        ₹{price1g.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        ({isPositive ? '+' : ''}₹{change1g.toFixed(2)})
                      </span>
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">
                        ₹{price8g.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        ({isPositive ? '+' : ''}₹{change8g.toFixed(2)})
                      </span>
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">
                        ₹{price10g.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        ({isPositive ? '+' : ''}₹{change10g.toFixed(2)})
                      </span>
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">
                        ₹{price1kg.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        ({isPositive ? '+' : ''}₹{change1kg.toFixed(0)})
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="mt-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
        <p className="text-sm text-gray-400">
          💡 <span className="font-semibold">Note:</span> Prices are calculated based on per-gram rate. 
          Actual retail prices may vary based on making charges, GST, and merchant pricing.
        </p>
      </div>
    </div>
  );
}
