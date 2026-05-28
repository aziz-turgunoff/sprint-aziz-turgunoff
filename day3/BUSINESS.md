# Business Analysis — Day 3

## Who is this for?
- Primary user persona: Head of Sales or e-commerce founder at a mid-market retail brand.
- They run 50–200 orders per day and need a fast way to spot revenue, refunds, and fulfillment issues without opening spreadsheets.

## What problem does it solve?
- It answers the question: "How is sales performance trending right now, and where should I dig first?"
- The cost of not solving it is slower reaction to revenue dips, higher refund exposure, and more time spent manually filtering CSV exports.

## Success metrics
- Activation: % of users who view the dashboard and apply a filter within the first session.
- Engagement: weekly dashboard visits and repeated filter use.
- Retention: weekly return rate for sales review.
- Revenue/value driver: time saved per analyst and faster response to refund spikes.

## Monetization or business model
- Pricing hypothesis: $49/mo for small e-commerce teams, $149/mo for growing brands with multiple regions.
- Unit economics: $49/mo target with gross margin >70% after cloud and analytics cost.

## Competitors / alternatives
- Shopify reports: built into platform but not flexible for cross-region filtering.
- Looker Studio: customizable but requires setup and can be slow for non-technical users.
- Metabase: more powerful but too heavyweight for fast weekly checks.

## Scope tradeoffs
- Cut advanced cohort analysis and cohort comparisons for speed.
- Built first: KPI summary, region/category filters, and an orders table.
- Next: CSV export, saved dashboards, date range custom picker.

## Risks
- Data trust: users need confidence the dashboard matches source-of-truth orders.
- Performance: charts and table must remain fast with 500+ rows.
