export interface MetalRate {
  purity: string;
  price: number;
  unit: string;
  change: number;
  changePercent: number;
}

export interface HistoryEntry {
  date: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface MetalData {
  metal: string;
  lastUpdated: string;
  rates: MetalRate[];
  history: {
    oneMonth: HistoryEntry[];
    yearly: {
      [key: string]: HistoryEntry[];
    };
  };
}

export type MetalType = 'gold' | 'silver' | 'platinum';

export interface ChartDataPoint {
  date: string;
  price: number;
}
