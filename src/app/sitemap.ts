import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://metals.svacron.com';
  
  // Get current time in IST (UTC+5:30)
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const istTime = new Date(now.getTime() + istOffset);
  
  // Get current IST hour and minute
  const istHour = istTime.getUTCHours();
  const istMinute = istTime.getUTCMinutes();
  
  // Determine last update time based on current IST time
  const lastUpdate = new Date(istTime);
  lastUpdate.setUTCMilliseconds(0);
  lastUpdate.setUTCSeconds(0);
  
  if (istHour > 11 || (istHour === 11 && istMinute >= 55)) {
    // After 11:55 AM IST - use today 11:55 AM IST
    lastUpdate.setUTCHours(11);
    lastUpdate.setUTCMinutes(55);
  } else if (istHour >= 9) {
    // After 9:00 AM but before 11:55 AM IST - use today 9:00 AM IST
    lastUpdate.setUTCHours(9);
    lastUpdate.setUTCMinutes(0);
  } else {
    // Before 9:00 AM IST - use yesterday 11:55 PM IST
    lastUpdate.setUTCDate(lastUpdate.getUTCDate() - 1);
    lastUpdate.setUTCHours(23);
    lastUpdate.setUTCMinutes(55);
  }
  
  // Convert back to UTC for sitemap
  const lastModified = new Date(lastUpdate.getTime() - istOffset);

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/gold-rate-today`,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/silver-rate-today`,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/platinum-rate-today`,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gold-price-history`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
