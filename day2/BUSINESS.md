# Business Analysis — Day 2

## Who is this for?

- **Primary user persona:** Knowledge workers (project managers, developers, designers, consultants) who need to manage personal and team tasks but find existing tools either too complex or too expensive
- **Company size:** Individuals and small teams (1-20 people)
- **What they do all day:** Juggle multiple projects, deadlines, and priorities. Spend time in Slack, email, and meetings. Need a lightweight way to track what needs to be done without context-switching to a heavy tool
- **Why would they use this over what they use now?**
  - **Current state:** Using Todoist ($4/mo), Things ($50 one-time), Notion (free but slow), or just email/Slack threads
  - **Our advantage:** 
    - Faster than Notion (no page load lag)
    - Cheaper than Things ($0 free tier, $5/mo for teams)
    - Better UX than Todoist (cleaner, modern design)
    - Built for teams (Todoist is personal-first)
    - No vendor lock-in (open data, can export)

## What problem does it solve?

- **The job-to-be-done:** Enable individuals and small teams to capture, organize, and track tasks without friction or cognitive overhead
- **The cost of NOT solving it:**
  - **Time cost:** 5-10 minutes per day lost to context-switching between tools (email, Slack, todo app, calendar)
  - **Missed deadlines:** Tasks slip through cracks because they're scattered across platforms
  - **Team friction:** No shared visibility into who's doing what, leading to duplicate work or blocked tasks
  - **Burnout:** Constant mental load of remembering what needs to be done

## Success metrics (how would you measure this in production?)

- **Activation:** % of signups who create their first todo within 24 hours (target: 60%)
- **Engagement:** Average todos created per active user per week (target: 8-12)
- **Retention:** W1 retention (target: 50%), W4 retention (target: 30%)
- **Revenue/value driver:**
  - Free tier: 1 user, 50 todos/month, basic features
  - Paid tier: Unlimited users, unlimited todos, team collaboration, integrations
  - Conversion to paid: 5-10% of free users within 30 days

## Monetization or business model

**Pricing hypothesis:**
- **Free tier:** Personal use, 1 user, 50 todos/month, basic features (land the user, prove value)
- **Pro ($5/month):** Unlimited todos, recurring tasks, priority support, custom themes
- **Team ($15/month):** Up to 5 users, shared workspaces, team collaboration, audit logs
- **Enterprise ($50/month):** Unlimited users, SSO, API access, SLA

**Why these prices vs competitors?**
- Todoist Personal: $4/month → we match at $5 but with better UX
- Todoist Team: $6/user/month → we undercut at $15 for 5 users ($3/user)
- Things: $50 one-time → we offer free tier + $5/mo for ongoing features
- Notion: Free but slow → we're faster and more focused

**Unit economics rough cut:**
- **Cost per user:** ~$0.50/month (hosting, database, support amortized)
- **Revenue per user (Free):** $0 (but valuable for network effects)
- **Revenue per user (Pro):** $5/1 user = $5/user → 90% gross margin
- **Revenue per user (Team):** $15/5 users = $3/user → 83% gross margin
- **Target:** Move users to Team tier where we get more revenue per user

## Competitors / alternatives

1. **Todoist** ($4/month personal, $6/user/month team)
   - **What they do better:** Mature product, 15+ years, massive integrations, AI features, mobile apps
   - **What we do differently:** Simpler UX, faster, cheaper for teams, built for collaboration from day 1
   
2. **Things** ($50 one-time, Mac/iOS only)
   - **What they do better:** Beautiful design, offline-first, no subscriptions
   - **What we do differently:** Cross-platform, team collaboration, free tier, web-first
   
3. **Notion** (free)
   - **What they do better:** All-in-one workspace, databases, templates, community
   - **What we do differently:** Faster, focused on todos (not bloated), better UX for task management

4. **Asana** ($10.99/month)
   - **What they do better:** Enterprise features, complex workflows, reporting
   - **What we do differently:** Simpler, cheaper, faster for small teams, no learning curve

## Scope tradeoffs

**What I cut for time and why it was the right cut:**
- **Cut:** Recurring todos (daily/weekly/monthly)
  - **Why:** Complex logic (cron jobs, timezone handling), low activation impact (most users don't need it day 1)
  - **When to add:** After 100+ active users request it
  
- **Cut:** Team collaboration (sharing, comments, @mentions)
  - **Why:** Requires real-time sync, presence indicators, notification system (3+ days of work)
  - **When to add:** After single-user activation is proven
  
- **Cut:** Mobile app (native iOS/Android)
  - **Why:** Web app is responsive and works on mobile; native apps are 2-3x dev time
  - **When to add:** After 10k+ users on web

- **Cut:** Integrations (Slack, Google Calendar, Zapier)
  - **Why:** Each integration is 4-6 hours; better to nail core product first
  - **When to add:** After product-market fit

**What I'd build next (top 3, prioritized):**
1. **Team collaboration** — Share workspaces, assign todos, see who's working on what (activation driver for teams)
2. **Recurring todos** — Daily/weekly/monthly repeats (engagement driver, reduces friction)
3. **Slack integration** — Create todos from Slack, get reminders in Slack (reduces context-switching)

## Risks

**Top 2 risks that would kill this in production:**

1. **Market risk: Todoist's dominance**
   - **The risk:** Todoist is entrenched, has 10M+ users, and can easily copy our features or drop prices
   - **Why it kills us:** If we're only competing on price/UX and they match us, we lose (they have brand, integrations, mobile apps)
   - **Mitigation:** Differentiate on team collaboration (Todoist is personal-first). Build community. Focus on SMB segment (1-20 people) where we can win

2. **Technical risk: Data isolation bugs**
   - **The risk:** RLS policies have a bug, User A can see User B's todos, or data gets corrupted during migration
   - **Why it kills us:** Privacy breach = legal liability, user trust destroyed, product dead
   - **Mitigation:** Comprehensive RLS testing (test with 2+ accounts), audit logs, regular security reviews, bug bounty program

## Activation Hypothesis

The key to Day 2 success is **activation**: getting users to create their first todo and feel the value.

**Activation moment:** User creates first todo, marks it complete, sees the satisfaction of checking it off.

**Activation funnel:**
1. Sign up (email + password or magic link)
2. See empty state with "Create your first todo" CTA
3. Create a simple todo (e.g., "Review Day 2 brief")
4. Mark it complete
5. See counter update ("1 active, 1 completed")
6. Feel the dopamine hit of productivity

**Conversion hypothesis:** If users complete this flow, 60% will return within 7 days.

## Pricing Rationale

Why $5/month for Pro and not $9.99 or $2.99?

- **$2.99:** Too cheap, signals low value, hard to scale support
- **$5:** Sweet spot for SMB, matches Todoist, easy to remember, feels fair
- **$9.99:** Too expensive for personal use, better for team tier

Why $15/month for Team and not $10 or $20?

- **$10:** Undercuts Todoist ($6/user × 5 = $30), but feels too cheap for team features
- **$15:** $3/user for 5 people, competitive with Asana ($10.99/month), feels premium
- **$20:** Too expensive for small teams, better for enterprise

## Churn Risk

**Why users churn:**
1. **Activation failure:** Never create a todo (40% of signups)
2. **Feature ceiling:** Hit limitations (can't share, no recurring, no integrations)
3. **Competitor switch:** Todoist adds a feature we don't have
4. **Forgotten:** Didn't get email reminder, fell out of habit

**Mitigation:**
- Onboarding email: "Create your first todo" CTA
- In-app prompts: "Invite a teammate" when user has 5+ todos
- Feature roadmap: Show users what's coming (recurring, sharing, integrations)
- Retention email: Weekly digest of completed todos (dopamine hit)
