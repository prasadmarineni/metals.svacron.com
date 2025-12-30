// Update the Next.js app to fetch from the Firebase API instead of directly from Firebase

import { MetalData } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://metals-svacron-com.web.app/api';

export async function getMetalData(metal: 'gold' | 'silver' | 'platinum'): Promise<MetalData> {
  try {
    const response = await fetch(`${API_BASE_URL}/metals/${metal}`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${metal} data`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${metal} data:`, error);
    
    // Fallback to mock data if API fails
    return getMockMetalData(metal);
  }
}

export async function getAllMetalsData(): Promise<Record<string, MetalData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/metals`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch metals data');
    }

    const data = await response.json();
    return {
      gold: data.gold,
      silver: data.silver,
      platinum: data.platinum
    };
  } catch (error) {
    console.error('Error fetching all metals data:', error);
    
    // Fallback to mock data if API fails
    return {
      gold: getMockMetalData('gold'),
      silver: getMockMetalData('silver'),
      platinum: getMockMetalData('platinum')
    };
  }
}

// Mock data fallback (same structure as before)
function getMockMetalData(metal: 'gold' | 'silver' | 'platinum'): MetalData {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  // Generate 30 days of history
  const history = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (29 - i));
    const basePrice = metal === 'gold' ? 6850 : metal === 'silver' ? 82 : 3200;
    const variance = (Math.random() - 0.5) * 100;
    const price = basePrice + variance;
    
    return {
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2)),
      change: Number((Math.random() - 0.5) * 50),
      changePercent: Number(((Math.random() - 0.5) * 2).toFixed(2))
    };
  });

  // Generate chart data for yearly history
  const generateChartData = (years: number) => {
    const dataPoints = years * 12; // Monthly data points
    return Array.from({ length: dataPoints }, (_, i) => {
      const date = new Date(now);
      date.setMonth(date.getMonth() - (dataPoints - 1 - i));
      const basePrice = metal === 'gold' ? 6850 : metal === 'silver' ? 82 : 3200;
      const variance = (Math.random() - 0.5) * 200;
      const price = Number((basePrice + variance).toFixed(2));
      
      return {
        date: date.toISOString().split('T')[0],
        price: price,
        change: Number(((Math.random() - 0.5) * 50).toFixed(2)),
        changePercent: Number(((Math.random() - 0.5) * 2).toFixed(2))
      };
    });
  };

  const rates = metal === 'gold' 
    ? [
        { purity: '24K', price: 6850, unit: '₹/gram', change: 45, changePercent: 0.66 },
        { purity: '22K', price: 6280, unit: '₹/gram', change: 41, changePercent: 0.66 },
        { purity: '18K', price: 5140, unit: '₹/gram', change: 34, changePercent: 0.67 }
      ]
    : metal === 'silver'
    ? [
        { purity: '999', price: 82, unit: '₹/gram', change: 0.5, changePercent: 0.61 },
        { purity: 'Sterling (925)', price: 76, unit: '₹/gram', change: 0.46, changePercent: 0.61 }
      ]
    : [
        { purity: '999', price: 3200, unit: '₹/gram', change: 20, changePercent: 0.63 },
        { purity: '950', price: 3040, unit: '₹/gram', change: 19, changePercent: 0.63 }
      ];

  return {
    metal: metal.charAt(0).toUpperCase() + metal.slice(1),
    lastUpdated: now.toISOString(),
    rates,
    history: {
      oneMonth: history,
      yearly: {
        '1Y': generateChartData(1),
        '3Y': generateChartData(3),
        '5Y': generateChartData(5),
        '10Y': generateChartData(10),
        'ALL': generateChartData(15)
      }
    }
  };
}
