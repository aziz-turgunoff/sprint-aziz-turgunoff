# Day 3 Submission — Sales Dashboard

## Summary

A comprehensive sales dashboard for e-commerce operations, built for the Head of Sales to answer 5 critical Monday morning questions: revenue performance, category breakdown, order status, regional growth, and top products. Features real-time filtering, interactive charts, and CSV export capabilities with 500 orders seeded across 180 days.

---

## Primary Submission Links

| Item | Link |
| --- | --- |
| Live app | https://sprint-aziz-turgunoff-day3.vercel.app |
| GitHub repo | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/tree/master/day3 |
| Demo video | https://drive.google.com/file/d/190-aSRqieiUe-dXa8sEu9v-o283j67mQ/view?usp=sharing |
| Business analysis | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/master/day3/BUSINESS.md |
| Technical decisions | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/master/day3/DECISIONS.md |
| Development log | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/master/day3/README.md |

---

## What Was Built

**Dashboard Components:**
- **KPI Cards (4)** — Total revenue, order count, average order value (AOV), and refund rate with percentage change vs previous period
- **Revenue Over Time Chart** — Line chart showing revenue trends across selected date range
- **Revenue by Category Chart** — Bar chart comparing Electronics, Apparel, Home, and Books performance
- **Orders by Status Chart** — Donut chart visualizing pending, paid, refunded, and cancelled orders
- **Top Products Table** — Sortable, searchable table with all order details and CSV export
- **Global Filters** — Date range (7d/30d/90d/180d/custom), region multi-select, category multi-select, status filter with active filter counter and clear all button

**Technical Implementation:**
- React 19 + TypeScript + Vite
- Recharts for data visualization
- Tailwind CSS for responsive design
- Supabase for database with 500 seeded orders
- Real-time filter synchronization across all widgets
- Loading skeletons for better UX
- Mobile-responsive with stacked charts and horizontal table scroll
- CSV export of filtered data

---

## Supabase Setup

**Database Schema:**
```sql
create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  product text not null,
  category text not null,
  amount numeric(10,2) not null,
  status text not null check (status in ('pending','paid','refunded','cancelled')),
  region text not null,
  created_at timestamptz not null
);
```

**RLS Policy:**
```sql
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
-- OR for production:
-- CREATE POLICY "Allow anonymous read access to orders"
-- ON orders FOR SELECT TO anon USING (true);
```

**Seed Data:**
- 500 realistic orders across 180 days
- 4 categories: Electronics, Apparel, Home, Books
- 4 regions: NA, EU, APAC, LATAM
- 4 statuses: pending, paid, refunded, cancelled (weighted toward paid)
- Realistic pricing based on category
- 20 different customer names

---

## Performance & Quality

**Acceptance Criteria:**
- ✅ All filters update KPIs + charts + table simultaneously
- ✅ Loading skeletons, not spinners
- ✅ Empty state when 0 results
- ✅ No layout shift on filter change
- ✅ Handles 500 rows without lag
- ✅ Mobile: charts stack, table scrolls horizontally
- ✅ Every visible element traces back to a business question

**Build Verification:**
```bash
npm run build
npm run preview
```

All builds pass successfully with no errors.

---

## Business Reasoning

**Target User:**
Head of Sales at a 50-200 person e-commerce company who needs to answer 5 questions every Monday morning:
1. What's our revenue this month vs last month?
2. Which categories are performing best?
3. How many orders are stuck in pending?
4. Which regions are growing?
5. What are our top products by revenue?

**Core Problem:**
Sales leaders waste 2-3 hours every Monday pulling data from multiple sources (Shopify exports, Stripe dashboard, Google Sheets) to answer basic performance questions. By the time they have answers, the team standup is over.

**Product Positioning:**
This dashboard consolidates all sales metrics in one view with instant filtering. Every widget answers a specific business question the Head of Sales asks weekly.

**Widget → Question Mapping:**
- **Total Revenue KPI** → "What's our revenue this month vs last month?"
- **Category Bar Chart** → "Which categories are performing best?"
- **Status Donut Chart** → "How many orders are stuck in pending?"
- **Region Filter + Charts** → "Which regions are growing?"
- **Sortable Table** → "What are our top products by revenue?"

**What Was Cut:**
- Customer drill-down pages (Phase 2)
- Real-time updates via websockets (Phase 2)
- Forecast projections (Phase 2)
- Cohort analysis (CFO version)

**Why These Cuts:**
The core job-to-be-done is answering those 5 Monday morning questions. Everything else is nice-to-have but doesn't solve the immediate pain point.

---

## Development Process

**Time Spent:** 8 hours

**Approach:**
1. Wrote BUSINESS.md first to define the 5 questions and map widgets
2. Set up React + Vite + TypeScript + Recharts project
3. Created Supabase schema and seed-500.sql script
4. Built dashboard layout with KPI cards and charts
5. Implemented global filter system with state management
6. Added CSV export functionality
7. Made responsive for mobile (stacked charts, scrollable table)
8. Deployed to Vercel with environment variables
9. Fixed RLS policy for anonymous read access
10. Verified all filters work together correctly

**Tools Used:**
- GitHub Copilot for development assistance
- Recharts for data visualization
- Supabase for database and seeding
- Vercel for hosting and deployment

---

## Known Notes

- Dashboard uses client-side filtering since 500 rows is manageable
- At 10K+ rows, would need server-side pagination and aggregation
- RLS policy allows anonymous read access for demo purposes
- In production, would add user authentication and row-level filtering
- Fallback data included for development without Supabase connection

---

## Self-Assessment

**Expected Score:** 9/10

**Strengths:**
- ✅ Every widget maps to a specific business question
- ✅ All filters work together seamlessly
- ✅ Clean, production-ready code
- ✅ 500 realistic seed data for demo
- ✅ Mobile-responsive design
- ✅ CSV export functionality
- ✅ Complete business analysis with question mapping
- ✅ Loading states and empty states handled

**Areas for Improvement:**
- Could add date range picker for custom ranges
- Could add chart export (PNG/PDF)
- Could add saved filter presets

---

## Quick Reference

```csv
Day,Project,Live URL,GitHub URL,Demo Video,Business Doc,Decisions Doc,Status,Hours,Notes
3,Sales Dashboard,https://sprint-aziz-turgunoff-day3.vercel.app,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/tree/master/day3,[TO BE ADDED],https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/master/day3/BUSINESS.md,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/master/day3/DECISIONS.md,Submitted,8,500 orders seeded; All filters working; Mobile responsive
```

---

**Submitted by:** Aziz Turgunoff  
**Submission Date:** May 29, 2026  
**Status:** ✅ Complete and Verified
