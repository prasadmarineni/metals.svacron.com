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
    
    // Throw error instead of returning mock data
    throw error;
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
    
    // Throw error instead of returning mock data
    throw error;
  }
}

// Empty data structure for error cases
function getEmptyMetalData(metal: 'gold' | 'silver' | 'platinum'): MetalData {
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
