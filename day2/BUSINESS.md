# Business Analysis — Day 2

## Who is this for?

**Primary user persona:** Freelance consultants and agency owners (1-5 person teams) managing 10-30 active client projects simultaneously.

- **Role:** Solo freelancers, small agency owners, independent consultants
- **Company size:** Self-employed or 1-5 person teams
- **What they do all day:** Client calls, project delivery, follow-ups, invoicing, context-switching between 5-10 clients

**Why would they use this over what they use now?**

Current solutions fail this segment:
- **Todoist/Things:** Generic task lists don't map to client relationships. No way to see "all tasks for Client X" without manual tagging. $4-10/mo per person.
- **Notion:** Too flexible = decision paralysis. Takes 2-3 hours to set up a system. Overkill for simple task tracking. $10/mo per person.
- **Asana/ClickUp:** Built for internal teams, not client-facing work. Complex permissions, heavy UI. $10-15/mo per person.
- **Spreadsheets:** What most freelancers actually use. No reminders, no mobile access, manual sorting.

**Our wedge:** Client-centric task view. Every todo belongs to a client context. See all tasks for a client in one view. Simple, fast, no setup required.

---

## What problem does it solve?

**The job-to-be-done in one sentence:**  
Help freelancers remember and prioritize follow-ups across multiple clients without losing track or missing deadlines.

**The cost of NOT solving it:**
- **Time cost:** 30-60 min/day searching for "what did I promise Client X?" across email, Slack, notes
- **Money cost:** Missed follow-ups = lost deals. One missed proposal follow-up = $5K-50K lost revenue
- **Reputation cost:** Forgotten commitments damage client trust, reduce referrals
- **Mental cost:** Constant anxiety about "what am I forgetting?"

**Real scenario:** Freelancer finishes client call, promises to "send that proposal by Friday." No system to capture it → relies on memory → Friday passes → client emails Monday asking "where's the proposal?" → looks unprofessional.

---

## Success metrics (how would you measure this in production?)

**Activation:** % of signups who create their first todo within 24 hours  
- Target: 60% (industry standard for task apps: 40-50%)
- Key action: First todo with due date set = activated user

**Engagement:** Tasks completed per week (active users)  
- Target: 8-12 tasks/week (2-3 per workday)
- Segment: Power users (15+ tasks/week) vs casual (3-5 tasks/week)

**Retention:**  
- W1 (Week 1): 50% return rate
- W4 (Week 4): 30% return rate
- M3 (Month 3): 20% still active
- Churn trigger: 14 days no login = at-risk, send re-engagement email

**Revenue/value driver:** Conversion to paid after hitting free tier limit (10 todos)  
- Target: 15% of activated users convert to $5/mo within 30 days
- Upgrade trigger: "You've hit 10 todos. Upgrade to unlimited for $5/mo."

**Leading indicator:** Time-to-first-completed-todo  
- Hypothesis: Users who complete a todo within 2 hours of signup have 3x higher W4 retention

---

## Monetization or business model

**Pricing hypothesis:**

| Tier | Price | Limit | Target User |
|------|-------|-------|-------------|
| **Free** | $0/mo | 10 active todos | Tire-kickers, very light users |
| **Pro** | $5/mo | Unlimited todos | Solo freelancers (1-3 clients) |
| **Teams** | $15/mo | Unlimited + sharing | Small agencies (3-5 people) |

**Why $5 and not $9?**
- Todoist is $4/mo, Things is $50 one-time (~$4/mo amortized over 1 year)
- Freelancers are price-sensitive, especially early-stage
- $5 is impulse-buy territory (no approval needed)
- $9 crosses psychological threshold ("is this worth it?")

**Why not free forever?**
- 10-todo limit forces decision point: "Is this useful enough to pay?"
- Prevents free-tier abuse (spam accounts)
- Aligns incentives: we only make money if users get value

**Unit economics (rough cut):**

**Cost per user:**
- Supabase: $0.50/mo (assuming 1GB storage, 50K reads, 10K writes per user)
- Hosting (Vercel): $0.10/mo (amortized across users)
- Email (transactional): $0.05/mo (password resets, notifications)
- **Total COGS:** ~$0.65/mo per active user

**Revenue per user (blended):**
- Assume 20% conversion to paid (80% stay free)
- Paid users: $5/mo × 20% = $1.00
- Free users: $0 × 80% = $0
- **Blended ARPU:** $1.00/mo

**Gross margin:** ($1.00 - $0.65) / $1.00 = **35% gross margin**

**Problem:** 35% is too low. Need 70%+ for SaaS viability.

**Fix options:**
1. Increase paid conversion to 30% → $1.50 ARPU → 57% margin (still low)
2. Increase price to $8/mo → $1.60 ARPU → 59% margin (better)
3. Reduce free tier to 5 todos → force earlier conversion → 35% conversion → $1.75 ARPU → 63% margin
4. **Best:** Combination of #2 + #3 → $8/mo + 5-todo limit → 35% conversion → $2.80 ARPU → 77% margin ✅

**Revised pricing:**
- Free: 5 active todos
- Pro: $8/mo unlimited
- Teams: $20/mo (not $15) for 3 seats

---

## Competitors / alternatives

### 1. **Todoist** ($4/mo Pro, $6/mo Business)
- **What they do better:** Cross-platform (iOS, Android, web, desktop), natural language input ("tomorrow at 3pm"), 50+ integrations
- **What we do better:** Client-centric view (they require manual labels/projects), simpler UI (less overwhelming), faster setup (no project hierarchy needed)

### 2. **Notion** ($10/mo Plus)
- **What they do better:** Infinitely flexible (databases, wikis, docs), powerful for complex workflows, great for teams
- **What we do worse:** We're single-purpose (just todos), no docs/wikis, no databases
- **What we do better:** Zero setup time (Notion requires 2-3 hours to build a system), faster (Notion is slow on mobile), focused (no feature bloat)

### 3. **Spreadsheets** (Google Sheets, Excel) — FREE
- **What they do better:** Free, familiar, flexible, works offline
- **What we do worse:** We cost money
- **What we do better:** Mobile-friendly, reminders/notifications, due date sorting, no manual formatting, faster input

**Competitive positioning:**  
"Simpler than Notion, more client-focused than Todoist, smarter than spreadsheets. For freelancers who need to track client follow-ups without the overhead."

---

## Scope tradeoffs

### What I cut for time and why it was the right cut:

1. **Client entity / grouping** — Would add a "Clients" table and group todos by client. Cut because:
   - Adds 3-4 hours (client CRUD, UI, schema changes)
   - Can simulate with tags/labels in description for MVP
   - Day 2 brief doesn't require it
   - Can validate demand first, add in Phase 2

2. **Recurring todos** — "Follow up with Client X every Monday." Cut because:
   - Complex logic (cron jobs, timezone handling, skip logic)
   - 4-5 hours minimum
   - Low activation impact (power user feature, not core)

3. **Collaboration / sharing** — Assign todos to team members. Cut because:
   - Requires permissions system, notifications, activity feed
   - 6-8 hours
   - Teams tier is 5% of market, solo is 95%
   - Can add later if solo product works

4. **Mobile native app** — iOS/Android apps. Cut because:
   - 40+ hours per platform
   - Web-first is fine for MVP (responsive design)
   - Can wrap in Capacitor later if needed

5. **Integrations** — Zapier, Slack, email sync. Cut because:
   - Each integration = 3-5 hours
   - Low activation impact (users want core product first)
   - Can add top 3 integrations in Phase 2 based on user requests

### What I'd build next (top 3, prioritized):

1. **Client grouping** (Week 2) — Most-requested feature hypothesis. Lets users see "all tasks for Client X." Adds clear value over Todoist.

2. **Email reminders** (Week 3) — "Your task 'Send proposal to Acme Corp' is due in 2 hours." High engagement driver, reduces churn.

3. **Quick add via email** (Week 4) — Forward email to todos@app.com → auto-creates todo. Reduces friction, increases daily usage.

---

## Risks

### Top 2 risks that would kill this in production:

**Risk 1: Activation failure — users sign up but don't create first todo**

- **Why it kills us:** If 60%+ of signups never create a todo, CAC is wasted. At $20 CAC and 40% activation, we need $50 LTV to break even → requires 6+ months retention at $8/mo → hard.
- **Mitigation:**
  - Onboarding flow: "Add your first task" prompt immediately after signup
  - Pre-fill example todo: "Follow up with [Client Name] about [Project]"
  - Email drip: "You haven't added a task yet. Here's how..."
  - Measure time-to-first-todo, optimize for <5 minutes

**Risk 2: Free tier abuse — users stay on free forever, never convert**

- **Why it kills us:** If 95% of users stay on 5-todo free tier, ARPU drops to $0.40 (5% × $8) → gross margin goes negative.
- **Mitigation:**
  - 5-todo limit is aggressive (forces decision within 1-2 weeks)
  - "Completed todos" don't count toward limit (encourages completion, not deletion)
  - Upgrade prompts at 4/5 todos: "You're almost at your limit. Upgrade now to keep going."
  - A/B test limit: 5 vs 10 vs 15 todos, measure conversion rate
  - Fallback: If conversion <20%, increase price to $10/mo or reduce free tier to 3 todos

**Risk 3 (bonus): Churn due to "I forgot to check the app"**

- **Why it matters:** Task apps live or die on daily habit formation. If users don't check daily, they forget tasks exist → defeats the purpose.
- **Mitigation:**
  - Daily email digest: "You have 3 tasks due today"
  - Browser notifications (opt-in)
  - Slack integration (for teams)
  - Measure DAU/MAU ratio, target 40%+ (daily habit)

---

## Summary

**The bet:** Freelancers will pay $8/mo for a dead-simple, client-focused todo app that's faster than Notion and more relevant than Todoist.

**The wedge:** Client-centric task view (not available in competitors without manual setup).

**The activation moment:** First todo with due date set within 24 hours of signup.

**The unit economics:** Need 35% conversion to paid at $8/mo to hit 77% gross margin (viable).

**The biggest risk:** Users sign up but never create first todo (activation failure).

**Next 90 days:** Ship MVP → measure activation rate → optimize onboarding → add client grouping if retention holds.
