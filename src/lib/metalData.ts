import { MetalData, MetalType } from '@/types';

interface ApiRate {
  purity: string;
  price: number;
  change: number;
  changePercent: number;
}

interface ApiHistoryEntry {
  date: string;
  price: number;
  change: number;
}

interface ApiResponse {
  name: string;
  lastUpdated: string;
  rates: ApiRate[];
  history: ApiHistoryEntry[];
  chartData: {
    '1Y': { date: string; price: number }[];
    '3Y': { date: string; price: number }[];
    '5Y': { date: string; price: number }[];
    '10Y': { date: string; price: number }[];
    'ALL': { date: string; price: number }[];
  };
}

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
      rates: data.rates.map((rate: ApiRate) => ({
        purity: rate.purity,
        price: rate.price,
        unit: '₹/gram',
        change: rate.change,
        changePercent: rate.changePercent
      })),
      history: {
        oneMonth: data.history.map((entry: ApiHistoryEntry) => ({
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
    // Return empty data structure instead of mock data
    throw error;
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
    // Return empty data instead of mock data
    throw error;
  }
}

// Transform API response to MetalData type
function transformApiData(data: ApiResponse): MetalData {
  return {
    metal: data.name,
    lastUpdated: data.lastUpdated,
    rates: data.rates.map((rate: ApiRate) => ({
      purity: rate.purity,
      price: rate.price,
      unit: '₹/gram',
      change: rate.change,
      changePercent: rate.changePercent
    })),
    history: {
      oneMonth: data.history.map((entry: ApiHistoryEntry) => ({
        date: entry.date,
        price: entry.price,
        change: entry.change,
        changePercent: 0
      })),
      yearly: {
        '1Y': (data.chartData['1Y'] || []).map((entry: { date: string; price: number }) => ({
          date: entry.date,
          price: entry.price,
          change: 0,
          changePercent: 0
        })),
        '3Y': (data.chartData['3Y'] || []).map((entry: { date: string; price: number }) => ({
          date: entry.date,
          price: entry.price,
          change: 0,
          changePercent: 0
        })),
        '5Y': (data.chartData['5Y'] || []).map((entry: { date: string; price: number }) => ({
          date: entry.date,
          price: entry.price,
          change: 0,
          changePercent: 0
        })),
        '10Y': (data.chartData['10Y'] || []).map((entry: { date: string; price: number }) => ({
          date: entry.date,
          price: entry.price,
          change: 0,
          changePercent: 0
        })),
        'ALL': (data.chartData['ALL'] || []).map((entry: { date: string; price: number }) => ({
          date: entry.date,
          price: entry.price,
          change: 0,
          changePercent: 0
        }))
      }
    }
  };
}

// Empty data structure for error cases
function getEmptyMetalData(metal: MetalType): MetalData {
  return {
    metal: metal.charAt(0).toUpperCase() + metal.slice(1),
    lastUpdated: new Date().toISOString(),
    rates: [],
    history: {
      oneMonth: [],
      yearly: {
        '1Y': [],
        '3Y': [],
        '5Y': [],
        '10Y': [],
        'ALL': [],
      },
    },
  };
}
