# Day 3 — Sales Dashboard

This project is the Day 3 sprint build: a sales dashboard for an e-commerce company with filterable KPIs, charts, and a paginated orders table.

## Setup

### Install

```bash
cd day3
npm install
```

### Run

```bash
npm run dev
```

### Environment

Create a `day3/.env` file from `.env.example` and add your Supabase credentials.

```env
VITE_SUPABASE_URL=https://uddicwpqucfpovwifefg.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Features

- KPI cards for revenue, order count, average order value, refund rate
- Global filters: date range, region, category, status
- Charts: revenue over time, revenue by category, status donut, top products by revenue
- Orders table with responsive horizontal scrolling
- Clear filters button

### Supabase behavior

The dashboard loads from the Supabase `orders` table if available. If the table is missing or the request fails, the UI falls back to seeded sample data so the page remains interactive.

## Notes

This is the initial implementation scaffold. The app currently uses sample data in `src/pages/Dashboard.tsx` and will be updated to query Supabase once the backend schema is prepared.
