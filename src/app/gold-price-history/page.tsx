"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

const GOLD_COLOR = '#FFD700';

// Historical gold price data (24K per 10 grams in INR)
const historicalData = [
  { year: 1964, price: 63.25 },
  { year: 1965, price: 71.75 },
  { year: 1966, price: 83.75 },
  { year: 1967, price: 102.50 },
  { year: 1968, price: 162.00 },
  { year: 1969, price: 176.00 },
  { year: 1970, price: 184.00 },
  { year: 1971, price: 193.00 },
  { year: 1972, price: 202.00 },
  { year: 1973, price: 278.50 },
  { year: 1974, price: 506.00 },
  { year: 1975, price: 540.00 },
  { year: 1976, price: 432.00 },
  { year: 1977, price: 486.00 },
  { year: 1978, price: 685.00 },
  { year: 1979, price: 937.00 },
  { year: 1980, price: 1330.00 },
  { year: 1981, price: 1670.00 },
  { year: 1982, price: 1645.00 },
  { year: 1983, price: 1800.00 },
  { year: 1984, price: 1970.00 },
  { year: 1985, price: 2130.00 },
  { year: 1986, price: 2140.00 },
  { year: 1987, price: 2570.00 },
  { year: 1988, price: 3130.00 },
  { year: 1989, price: 3140.00 },
  { year: 1990, price: 3200.00 },
  { year: 1991, price: 3466.00 },
  { year: 1992, price: 4334.00 },
  { year: 1993, price: 4140.00 },
  { year: 1994, price: 4598.00 },
  { year: 1995, price: 4680.00 },
  { year: 1996, price: 5160.00 },
  { year: 1997, price: 4725.00 },
  { year: 1998, price: 4045.00 },
  { year: 1999, price: 4234.00 },
  { year: 2000, price: 4400.00 },
  { year: 2001, price: 4300.00 },
  { year: 2002, price: 4990.00 },
  { year: 2003, price: 5600.00 },
  { year: 2004, price: 5850.00 },
  { year: 2005, price: 7000.00 },
  { year: 2006, price: 9265.00 },
  { year: 2007, price: 10800.00 },
  { year: 2008, price: 12500.00 },
  { year: 2009, price: 14500.00 },
  { year: 2010, price: 18500.00 },
  { year: 2011, price: 26400.00 },
  { year: 2012, price: 31050.00 },
  { year: 2013, price: 29600.00 },
  { year: 2014, price: 28006.50 },
  { year: 2015, price: 26343.50 },
  { year: 2016, price: 28623.50 },
  { year: 2017, price: 29667.50 },
  { year: 2018, price: 31438.00 },
  { year: 2019, price: 35220.00 },
  { year: 2020, price: 48651.00 },
  { year: 2021, price: 48720.00 },
  { year: 2022, price: 52670.00 },
  { year: 2023, price: 65330.00 },
  { year: 2024, price: 77913.00 },
  { year: 2025, price: 138000.00, note:''} // projected
];

export default function GoldPriceHistoryPage() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Calculate statistics
  const firstYear = historicalData[0];
  const lastYear = historicalData[historicalData.length - 1];
  const totalGrowth = lastYear.price - firstYear.price;
  const growthPercentage = ((totalGrowth / firstYear.price) * 100).toFixed(2);
  const yearSpan = lastYear.year - firstYear.year;

  // Sort data based on selected order
  const sortedData = [...historicalData].sort((a, b) => 
    sortOrder === 'desc' ? b.year - a.year : a.year - b.year
  );

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gold Price History in India (1964-2024)",
    "description": "Complete historical gold price data in India from 1964 to 2024. Track 60 years of 24 karat gold rate trends per 10 grams.",
    "keywords": "gold price history, gold rate history India, historical gold prices, gold price trend, 24k gold price history"
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">📊</span>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Gold Price History in India
              </span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Historical gold rate data in India from 1964 to 2024. Track 60 years of 24 karat gold price trends per 10 grams.
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
            style={{ borderLeft: `4px solid ${GOLD_COLOR}` }}
          >
            <p className="text-sm text-gray-400 mb-2">Starting Price (1964)</p>
            <p className="text-3xl font-bold" style={{ color: GOLD_COLOR }}>
              ₹{firstYear.price.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-400 mt-1">per 10 grams</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ borderLeft: `4px solid ${GOLD_COLOR}` }}
          >
            <p className="text-sm text-gray-400 mb-2">Current Price (2024)</p>
            <p className="text-3xl font-bold" style={{ color: GOLD_COLOR }}>
              ₹{lastYear.price.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-400 mt-1">per 10 grams</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ borderLeft: `4px solid ${GOLD_COLOR}` }}
          >
            <p className="text-sm text-gray-400 mb-2">Total Growth ({yearSpan} years)</p>
            <p className="text-3xl font-bold text-green-400">
              +{growthPercentage}%
            </p>
            <p className="text-sm text-gray-400 mt-1">₹{totalGrowth.toLocaleString('en-IN')} increase</p>
          </motion.div>
        </div>

        {/* Table Controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Year-by-Year Data</h2>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-sm"
          >
            Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </button>
        </div>

        {/* Historical Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Price (24K per 10g)</th>
                  <th>Year-on-Year Change</th>
                  <th>Change %</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((entry, index) => {
                  // Calculate year-on-year change - find the nearest previous year
                  const prevEntry = sortedData.find(e => e.year < entry.year && e.year === Math.max(...sortedData.filter(x => x.year < entry.year).map(x => x.year)));
                  const yoyChange = prevEntry ? entry.price - prevEntry.price : null;
                  const yoyChangePercent = prevEntry && prevEntry.price > 0
                    ? ((yoyChange! / prevEntry.price) * 100).toFixed(2)
                    : null;
                  const isPositive = yoyChange ? yoyChange >= 0 : true;
                  const yearGap = prevEntry ? entry.year - prevEntry.year : null;

                  return (
                    <tr key={entry.year}>
                      <td className="font-semibold">
                        {entry.year}
                        {entry.note && (
                          <span className="text-xs text-gray-500 block">{entry.note}</span>
                        )}
                      </td>
                      <td className="font-bold" style={{ color: GOLD_COLOR }}>
                        ₹{entry.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={yoyChange ? (isPositive ? 'text-green-400' : 'text-red-400') : 'text-gray-500'}>
                        {yoyChange ? (
                          <>
                            {isPositive ? '+' : ''}₹{yoyChange.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            {yearGap && yearGap > 1 && <span className="text-xs text-gray-500 ml-1">({yearGap} years)</span>}
                          </>
                        ) : '—'}
                      </td>
                      <td className={yoyChange ? (isPositive ? 'text-green-400' : 'text-red-400') : 'text-gray-500'}>
                        {yoyChangePercent ? `${parseFloat(yoyChangePercent) >= 0 ? '+' : ''}${yoyChangePercent}%` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20"
        >
          <h3 className="text-xl font-bold mb-4">About This Data</h3>
          <div className="space-y-2 text-gray-300">
            <p>• All prices are for <strong>24 Karat (999) gold</strong> per 10 grams in Indian Rupees (₹)</p>
            <p>• Data spans <strong>{yearSpan} years</strong> from {firstYear.year} to {lastYear.year}</p>
            <p>• Gold has appreciated by <strong>{growthPercentage}%</strong> over this period</p>
            <p>• Prices reflect average annual rates in the Indian market</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
