# Business Analysis — Day 2

## Who is this for?
- **Primary user persona:** Solo entrepreneurs, freelancers, and small team leads (1-5 people) who need a simple, reliable task manager without the bloat of enterprise tools
- **Why would they use this over what they use now?** 
  - Todoist/Things power users find them too expensive ($48-80/year) for basic features
  - Notion users frustrated by slow load times and over-complexity for simple task tracking
  - Spreadsheet users ready to graduate to a proper tool but intimidated by feature overload
  - Privacy-conscious users who want data ownership (self-hostable with Supabase)

## What problem does it solve?
- **The job-to-be-done:** Capture, organize, and complete daily tasks without friction or distraction
- **The cost of NOT solving it:**
  - 30-60 minutes/day lost to mental overhead of remembering tasks
  - Missed deadlines costing $500-5000 in lost opportunities or client trust
  - Cognitive load reducing focus time by 20-30%
  - Switching between multiple tools (notes, calendar, email) wastes 15+ min/day

## Success metrics (how would you measure this in production?)
- **Activation:** 70% of signups create their first todo within 5 minutes
- **Engagement:** 
  - DAU/MAU ratio of 0.4+ (users return 3+ days/week)
  - Average 8-12 todos created per active week
  - 65%+ completion rate on created todos
- **Retention:** 
  - W1: 60% (return within 7 days)
  - W4: 35% (still active after 1 month)
  - W12: 20% (core retained users)
- **Revenue/value driver:** 
  - Free → Paid conversion at 8-12% after 30 days
  - Time saved: 45 min/week = $15-30/week value at $20-40/hr rates

## Monetization or business model
- **Freemium model:**
  - **Free:** Up to 50 active todos, basic features, email support
  - **Pro ($5/mo or $48/yr):** Unlimited todos, priority support, advanced filters, recurring tasks, team sharing (up to 3 people)
  - **Team ($15/mo or $144/yr):** Everything in Pro + unlimited team members, admin controls, activity logs
  
- **Why $5 and not $9 or $15?**
  - Todoist charges $4/mo (annual) or $5/mo (monthly) — we match their pricing
  - Things is $49.99 one-time but iOS-only — we're cross-platform
  - Target market (freelancers/solos) has $5-10/mo SaaS budget for productivity
  - Lower barrier = faster growth, make up volume in conversions

- **Unit economics (rough cut):**
  - **Cost per user:** $0.15/mo (Supabase: $0.10 DB + $0.05 auth/storage)
  - **Revenue per paid user:** $5/mo
  - **Gross margin:** 97% ($4.85 profit per paid user)
  - **Break-even:** 1 paid user covers 33 free users
  - **Target:** 10% conversion = sustainable at 1000 users (100 paid, 900 free)

## Competitors / alternatives
1. **Todoist** ($48/yr)
   - **Better:** More mature, better integrations (Gmail, Slack, etc.), natural language input
   - **Worse:** Expensive for casual users, cluttered UI, no self-hosting option
   - **Our wedge:** 50% cheaper, cleaner UI, data ownership

2. **Notion** (Free / $10/mo)
   - **Better:** All-in-one workspace, databases, wikis, collaboration
   - **Worse:** Slow, overwhelming for simple todos, steep learning curve
   - **Our wedge:** 10x faster for task management, zero learning curve

3. **Microsoft To Do** (Free)
   - **Better:** Free, Microsoft ecosystem integration, My Day feature
   - **Worse:** Basic features, no priority levels, limited customization
   - **Our wedge:** Better UX, priority/filtering, modern design, not locked to Microsoft

## Scope tradeoffs
**What I cut for time and why it was the right cut:**
- **Recurring tasks:** 30% of users need this, but adds complexity. Phase 2.
- **Team collaboration:** Only 15% of initial users need multi-user. Start solo-focused.
- **Mobile apps:** Web-first, mobile-responsive. Native apps are Phase 3.
- **Integrations:** Email/calendar sync is high-value but 40+ hours. Phase 2.
- **Tags/labels:** Nice-to-have, but priority + filters cover 80% of use cases.

**What I'd build next (top 3, prioritized):**
1. **Recurring tasks** — High user demand, clear activation driver, 8-12 hours
2. **Email integration** — Forward emails → todos. Reduces friction, 16-20 hours
3. **Quick add (keyboard shortcut)** — Power user feature, increases engagement, 4-6 hours

## Risks
**Top 2 risks that would kill this in production:**

1. **Activation failure** — If users don't create 3+ todos in first session, retention drops to <10%
   - **Mitigation:** Onboarding flow with sample todos, "Import from [competitor]" feature, empty state CTAs
   
2. **Supabase costs spiral** — Free tier is 500MB DB + 2GB bandwidth. At 10K users with avg 50 todos each:
   - **Math:** 10K users × 50 todos × 1KB/todo = 500MB (at limit)
   - **Bandwidth:** 10K DAU × 100 requests/day × 5KB/response = 5GB/day = 150GB/mo (75x over limit)
   - **Cost:** Would jump to $25/mo Supabase Pro immediately
   - **Mitigation:** Aggressive caching, pagination, CDN for static assets, monitor usage weekly
