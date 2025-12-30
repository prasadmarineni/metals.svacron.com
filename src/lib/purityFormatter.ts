/**
 * Format purity code to display label
 * Converts numeric purity codes to human-readable labels
 */
export function formatPurityLabel(purity: string): string {
  const purityMap: Record<string, string> = {
    // Gold
    '999': '24K (999)',
    '916': '22K (916)',
    '750': '18K (750)',
    '585': '14K (585)',
    
    // Silver
    '925': 'Sterling (925)',
    
    // Platinum
    '950': 'Platinum 950',
    '900': 'Platinum 900'
  };

  return purityMap[purity] || `${purity} Purity`;
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
