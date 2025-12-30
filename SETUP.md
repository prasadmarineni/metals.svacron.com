# Svacron Precious Metal Rates - Setup Guide

## Prerequisites
- Node.js 18+ installed
- Firebase project with Realtime Database

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Copy `.env.example` to `.env.local`
   - Add your Firebase credentials from Firebase Console

3. Add logo file:
   - Copy `svacron-logo.svg` from the main svacron.com project to `public/svacron-logo.svg`

## Firebase Database Structure

Your Firebase Realtime Database should follow this structure:

```json
{
  "rates": {
    "gold": {
      "metal": "Gold",
      "lastUpdated": "2025-12-30T10:00:00.000Z",
      "rates": [
        {
          "purity": "24K (999)",
          "price": 6450,
          "unit": "₹/gram",
          "change": 50,
          "changePercent": 0.78
        },
        {
          "purity": "22K (916)",
          "price": 5910,
          "unit": "₹/gram",
          "change": 45,
          "changePercent": 0.77
        }
      ],
      "history": {
        "oneMonth": [
          {
            "date": "2025-12-01",
            "price": 6400,
            "change": 25,
            "changePercent": 0.39
          }
        ]
      }
    },
    "silver": { /* similar structure */ },
    "platinum": { /* similar structure */ }
  }
}
```

## Development

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002)

## Production Build

```bash
npm run build
npm start
```

## Features Implemented

✅ 4 Pages: Home, Gold, Silver, Platinum
✅ Multiple purities for each metal
✅ Price comparison with yesterday
✅ 30-day price history table
✅ Interactive charts (1Y, 3Y, 5Y, 10Y, All Time)
✅ Firebase integration with fallback mock data
✅ SEO optimized (metadata, schema, sitemap, robots)
✅ Responsive design
✅ Header from svacron.com
✅ Footer from calculators.svacron.com

## Notes

- The app includes mock data that will be used if Firebase is not configured
- Update Firebase data daily for accurate real-time rates
- Charts use simulated data - connect to actual historical data in production
