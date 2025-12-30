import { MetalData, MetalType } from '@/types';

// API URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://us-central1-metals-svacron-com.cloudfunctions.net/api';

// Fetch metal data from API
export async function getMetalData(metal: MetalType): Promise<MetalData> {
  try {
    const response = await fetch(`${API_BASE_URL}/metals/${metal}`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${metal} data`);
    }

    const data = await response.json();
    
    // Transform API response to match our MetalData type
    return {
      metal: data.name,
      lastUpdated: data.lastUpdated,
      rates: data.rates.map((rate: any) => ({
        purity: rate.purity,
        price: rate.price,
        unit: '₹/gram',
        change: rate.change,
        changePercent: rate.changePercent
      })),
      history: {
        oneMonth: data.history.map((entry: any) => ({
          date: entry.date,
          price: entry.price,
          change: entry.change,
          changePercent: 0 // Calculate if needed
        })),
        yearly: {
          '1Y': data.chartData['1Y'] || [],
          '3Y': data.chartData['3Y'] || [],
          '5Y': data.chartData['5Y'] || [],
          '10Y': data.chartData['10Y'] || [],
          'ALL': data.chartData['ALL'] || []
        }
      }
    };
  } catch (error) {
    console.error(`Error fetching ${metal} data from API:`, error);
    // Fallback to mock data
    return getMockMetalData(metal);
  }
}

// Fetch all metals data
export async function getAllMetalsData(): Promise<Record<MetalType, MetalData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/metals`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch metals data');
    }

    const data = await response.json();
    
    return {
      gold: transformApiData(data.gold),
      silver: transformApiData(data.silver),
      platinum: transformApiData(data.platinum)
    };
  } catch (error) {
    console.error('Error fetching all metals data from API:', error);
    // Fallback to mock data
    return {
      gold: getMockMetalData('gold'),
      silver: getMockMetalData('silver'),
      platinum: getMockMetalData('platinum')
    };
  }
}

// Transform API response to MetalData type
function transformApiData(data: any): MetalData {
  return {
    metal: data.name,
    lastUpdated: data.lastUpdated,
    rates: data.rates.map((rate: any) => ({
      purity: rate.purity,
      price: rate.price,
      unit: '₹/gram',
      change: rate.change,
      changePercent: rate.changePercent
    })),
    history: {
      oneMonth: data.history.map((entry: any) => ({
        date: entry.date,
        price: entry.price,
        change: entry.change,
        changePercent: 0
      })),
      yearly: {
        '1Y': data.chartData['1Y'] || [],
        '3Y': data.chartData['3Y'] || [],
        '5Y': data.chartData['5Y'] || [],
        '10Y': data.chartData['10Y'] || [],
        'ALL': data.chartData['ALL'] || []
      }
    }
  };
}

// Mock data for fallback (when API fails)
const mockData: Record<MetalType, MetalData> = {
  gold: {
    metal: 'Gold',
    lastUpdated: new Date().toISOString(),
    rates: [
      { purity: '24K (999)', price: 6450, unit: '₹/gram', change: 50, changePercent: 0.78 },
      { purity: '22K (916)', price: 5910, unit: '₹/gram', change: 45, changePercent: 0.77 },
      { purity: '18K (750)', price: 4840, unit: '₹/gram', change: 35, changePercent: 0.73 },
    ],
    history: {
      oneMonth: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: 6400 + Math.random() * 100,
        change: Math.random() * 50 - 25,
        changePercent: Math.random() * 1 - 0.5,
      })),
      yearly: {
        '1Y': [],
        '3Y': [],
        '5Y': [],
        '10Y': [],
        'ALL': [],
      },
    },
  },
  silver: {
    metal: 'Silver',
    lastUpdated: new Date().toISOString(),
    rates: [
      { purity: '999', price: 78, unit: '₹/gram', change: 1.2, changePercent: 1.56 },
      { purity: '925 (Sterling)', price: 72, unit: '₹/gram', change: 1.1, changePercent: 1.55 },
    ],
    history: {
      oneMonth: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: 75 + Math.random() * 5,
        change: Math.random() * 2 - 1,
        changePercent: Math.random() * 2 - 1,
      })),
      yearly: {
        '1Y': [],
        '3Y': [],
        '5Y': [],
        '10Y': [],
        'ALL': [],
      },
    },
  },
  platinum: {
    metal: 'Platinum',
    lastUpdated: new Date().toISOString(),
    rates: [
      { purity: '999', price: 3200, unit: '₹/gram', change: -15, changePercent: -0.47 },
      { purity: '950', price: 3040, unit: '₹/gram', change: -14, changePercent: -0.46 },
    ],
    history: {
      oneMonth: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: 3200 + Math.random() * 100 - 50,
        change: Math.random() * 30 - 15,
        changePercent: Math.random() * 1 - 0.5,
      })),
      yearly: {
        '1Y': [],
        '3Y': [],
        '5Y': [],
        '10Y': [],
        'ALL': [],
      },
    },
  },
};

// Helper function to get mock data
function getMockMetalData(metal: MetalType): MetalData {
  return mockData[metal];
}
