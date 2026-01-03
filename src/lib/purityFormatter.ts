/**
 * Format purity code to display label
 * Converts numeric purity codes to human-readable labels
 */
export function formatPurityLabel(purity: string, metal?: string): string {
  const purityMap: Record<string, string> = {
    // Gold
    '999': '24K (999)',
    '916': '22K (916)',
    '750': '18K (750)',
    '585': '14K (585)',
    
    // Silver (999 is "Pure", 925 is "Sterling")
    '925': 'Sterling (925)',
    
    // Platinum
    '950': 'Platinum 950',
    '900': 'Platinum 900'
  };

  // Special case: Silver 999 shows as "Pure (999)"
  if (metal?.toLowerCase() === 'silver' && purity === '999') {
    return 'Pure (999)';
  }

  return purityMap[purity] || `${purity} Purity`;
}

/**
 * Get unit label based on metal and purity
 * Silver (all purities): "per 10 gram"
 * Gold and Platinum: "per gram"
 */
export function getUnitLabel(metal: string, purity?: string): string {
  const lowerMetal = metal.toLowerCase();
  
  if (lowerMetal === 'silver') {
    return 'per 10 gram';
  }
  
  return 'per gram';
}

/**
 * Get short label for purity (e.g., "24K", "22K", "999", "925")
 */
export function getShortPurityLabel(purity: string): string {
  const shortMap: Record<string, string> = {
    '999': '24K',
    '916': '22K',
    '750': '18K',
    '585': '14K',
    '925': '925',
    '950': '950',
    '900': '900'
  };

  return shortMap[purity] || purity;
}
