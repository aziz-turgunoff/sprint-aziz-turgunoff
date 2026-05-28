# **10-Day Sprint — Developer Brief Pack (v2)**

**Read this fully before Day 1\. Every brief below is self-contained.**

You are being evaluated on **three layers simultaneously**: 1\. **Technical execution** — does the thing work, is the code/Lovable output patched well. 2\. **Business analysis** — do you understand *why* you’re building this, who it’s for, what it costs, what it earns, what to cut. 3\. **Communication** — can you explain what you built, defend your decisions, and demo without wasting the room’s time.

Missing any layer \= lower score. A pixel-perfect app with no business reasoning scores the same as a half-broken app with sharp thinking. We want both.

**Do not ping Javokhir with clarifying questions. All submissions and questions go to Mubina. Self-sufficiency is part of the evaluation.**

---

## **Global Rules (apply every day)**

### **Stack — non-negotiable**

* **Builder:** Lovable (primary). Prompt dialogue logs are 70% of the technical eval — export them.

* **Frontend:** React \+ Vite or Next.js 14 (App Router). TypeScript required.

* **Backend / DB:** Supabase (Postgres \+ Auth \+ Storage \+ Edge Functions).

* **Styling:** Tailwind CSS. shadcn/ui where it fits.

* **Deploy:** Vercel \+ Supabase Cloud. No localhost-only submissions.

* **Repo:** GitHub, naming sprint-day{N}-{your-handle}. Invite Mubina.

### **Daily submission package — every task, no exceptions**

1. **Live URL** (Vercel or Lovable-hosted).

2. **GitHub repo URL** with a working README.md.

3. **Lovable prompt log** exported to /docs/prompts/.

4. **Loom demo video** — 60–120 sec walkthrough. Unlisted link in README. (Day-specific format below.)

5. **Hours-spent** number — honest. We cross-check commit timestamps.

6. **BUSINESS.md** in the repo (template below). Days 1–9.

7. **DECISIONS.md** for any non-obvious technical or product call you made.

### **README must contain (every day)**

* One-paragraph problem statement (who’s the user, what’s the pain, why this).

* Setup steps and env var names (no secrets).

* Feature list with status (✅ done / 🚧 partial / ❌ cut).

* Known issues and what you’d fix next.

* Hours spent.

* Link to your BUSINESS.md and DECISIONS.md.

### **BUSINESS.md template (Days 1–9)**

Copy this structure into every repo. Keep it short — bullets, not essays.

\# Business Analysis — Day {N}

\#\# Who is this for?  
\- Primary user persona: (role, company size, what they do all day)  
\- Why would they use this over what they use now?

\#\# What problem does it solve?  
\- The job-to-be-done in one sentence.  
\- The cost of NOT solving it (time, money, lost deals, etc.).

\#\# Success metrics (how would you measure this in production?)  
\- Activation: (e.g., % of signups who complete first action)  
\- Engagement: (e.g., DAU/MAU, sessions per week)  
\- Retention: (e.g., W1, W4 retention)  
\- Revenue/value driver: (e.g., conversion to paid, time saved per user)

\#\# Monetization or business model  
\- How does this make/save money? Pricing hypothesis if applicable.  
\- Unit economics rough cut: cost per user vs revenue per user.

\#\# Competitors / alternatives  
\- 2–3 named tools or workflows users currently use.  
\- What we do differently or worse.

\#\# Scope tradeoffs  
\- What I cut for time and why it was the right cut.  
\- What I'd build next (top 3, prioritized).

\#\# Risks  
\- Top 2 risks that would kill this in production (technical, legal, market, UX).

### **Deadlines**

23:59 local time. Late is recorded by Mubina. \>24h late \= task may be rejected. Mubina’s call is final.

---

# **Daily Briefs**

---

## **DAY 1 — Warm-up: Landing \+ Form \+ Supabase ⭐**

**Deadline:** Mon 23:59. **Target time:** 4–6 hours (3h build \+ 1h business \+ 1h demo). **Evaluated on:** baseline speed, access works, *can you frame a product in business terms.*

### **Build**

Single-page marketing landing for a **fictional SaaS — “Stacklet”** (no-code internal-tools builder) with a working waitlist form writing to Supabase.

### **Business framing — DO THIS BEFORE YOU BUILD**

Before opening Lovable, write your BUSINESS.md for Stacklet. You’re inventing the company — make it coherent. Who’s the ICP? What’s the pricing? What does Retool cost and why are you cheaper/better? **30 minutes max.** This is the spec your landing must match.

### **Required sections**

1. Sticky nav: logo, anchor links (Features, Pricing, FAQ), CTA “Join waitlist”.

2. Hero: headline, subheadline, primary CTA, secondary CTA.

3. Features grid: 6 cards (lucide-react icons) — features must match your BUSINESS.md.

4. Pricing: 3 tiers consistent with your pricing hypothesis. Highlight one.

5. FAQ: 5 questions — these must reflect real objections your ICP would have.

6. Waitlist form: email \+ role dropdown \+ optional company \+ submit.

7. Footer.

### **Supabase**

* Table waitlist: id uuid pk default uuid\_generate\_v4(), email text not null unique, role text not null, company text, created\_at timestamptz default now().

* RLS: anon insert only, no select.

* Duplicate email → “You’re already on the list” (not raw 409).

### **Acceptance criteria**

* ☐ Landing copy is consistent with BUSINESS.md (no generic AI filler).

* ☐ Email validated client-side.

* ☐ Submit shows confirmation, clears form, button disabled 3 sec.

* ☐ Row appears in Supabase.

* ☐ Lighthouse Performance ≥ 80 desktop.

* ☐ Looks intentional at 375 / 768 / 1440px.

### **Demo video (60–90 sec)**

Structure required: 1\. **5 sec:** “I’m building X for \[ICP\] because \[pain\].” 2\. **30 sec:** Walk the landing page. 3\. **15 sec:** Submit the form, show Supabase row. 4\. **15 sec:** “Top 3 things I’d improve next.”

### **Deliverables**

Standard package \+ BUSINESS.md \+ Loom.

---

## **DAY 2 — MVP \#1: CRUD Todo \+ Auth ⭐⭐**

**Deadline:** Tue 23:59. **Target time:** 6–8 hours. **Evaluated on:** feature completeness, auth flow, *can you reason about user activation and pricing.*

### **Build**

Multi-user todo app, full auth, RLS-isolated data.

### **Business framing**

Todos is a saturated market. In your BUSINESS.md, answer specifically: \- What’s the wedge — who’s underserved by Todoist / Things / Notion? \- What’s the activation moment (the action that turns signup → keeper)? \- How would you charge? Defend free vs $5 vs $15 with reasoning. \- What’s the realistic CAC and LTV for this segment?

### **Auth**

* Supabase Auth: email+password **and** magic link.

* Pages: /login, /signup, /forgot-password, /reset-password.

* Protected /app → redirect to /login if no session.

* Logout in header. Session persists across reloads.

### **Todo features**

* Create: title (max 120 chars), description, due date, priority (low|med|high).

* List: filter by status, filter by priority, sort by due/created.

* Inline edit (title) \+ modal (full).

* Toggle complete. Delete with confirmation.

* Empty state \+ counter “X active, Y completed”.

### **Schema**

**create** **table** todos (  
  **id** uuid **primary** **key** **default** uuid\_generate\_v4(),  
  user\_id uuid **not** **null** **references** auth.users(**id**) **on** **delete** **cascade**,  
  title text **not** **null** **check** (char\_length(title) \<= 120),  
  description text,  
  due\_date date,  
  priority text **not** **null** **default** 'med' **check** (priority **in** ('low','med','high')),  
  completed boolean **not** **null** **default** **false**,  
  created\_at timestamptz **default** now(),  
  updated\_at timestamptz **default** now()  
);

RLS: every operation scoped to user\_id \= auth.uid().

### **Acceptance criteria**

* ☐ User A cannot see User B’s data (test with 2 accounts).

* ☐ No flash of unauthenticated content.

* ☐ Password reset email works end-to-end.

* ☐ Inline form validation, not browser alerts.

* ☐ Optimistic UI on create/complete.

### **Demo video (90 sec)**

1. **10 sec:** “The wedge is X. The activation moment is Y.”

2. **40 sec:** Signup → first todo → filter/sort → complete.

3. **20 sec:** Log in as second user, prove isolation.

4. **20 sec:** “Pricing would be $X because… first thing I’d add next is Z.”

### **Deliverables**

Standard package \+ 2 test accounts in README \+ BUSINESS.md.

---

## **DAY 3 — MVP \#2: Dashboard with Charts \+ Filters ⭐⭐**

**Deadline:** Wed 23:59. **Target time:** 7–9 hours. **Evaluated on:** data handling, UI density, *do you know what metrics matter to whom.*

### **Build**

Admin sales dashboard for a fictional e-commerce company.

### **Business framing — critical for this day**

A dashboard is only useful if it answers the questions the user actually asks. In BUSINESS.md: \- Who’s the user? (Founder? Head of Sales? CFO? Marketing lead?) Pick ONE. \- List the 5 questions they ask every Monday morning. \- Map each KPI/chart on your dashboard to one of those questions. \- If a chart doesn’t answer a question, cut it.

You will be evaluated on whether your dashboard answers your stated user’s questions, not whether it has the most charts.

### **Seed data**

500 rows in orders, seed script at /supabase/seed.sql:

**create** **table** orders (  
  **id** uuid **primary** **key** **default** uuid\_generate\_v4(),  
  order\_number text **not** **null** **unique**,  
  customer\_name text **not** **null**,  
  customer\_email text **not** **null**,  
  product text **not** **null**,  
  **category** text **not** **null**,           *\-- Electronics, Apparel, Home, Books*  
  amount numeric(10,2) **not** **null**,  
  status text **not** **null** **check** (status **in** ('pending','paid','refunded','cancelled')),  
  region text **not** **null**,             *\-- NA, EU, APAC, LATAM*  
  created\_at timestamptz **not** **null**  
);

### **Dashboard**

**KPI cards (4):** Total revenue, Orders count, AOV, Refund rate. Each with % change vs previous period. **Charts:** Revenue over time (line), Revenue by category (bar), Orders by status (donut), Top 5 products by revenue (horizontal bar). **Global filters:** Date range (7d/30d/90d/180d/custom), region multi-select, category multi-select, status. “Clear filters”. **Table:** All order fields, sortable, paginated (25/page), debounced search, CSV export of filtered view.

### **Acceptance criteria**

* ☐ All filters update KPIs \+ charts \+ table simultaneously.

* ☐ Loading skeletons, not spinners.

* ☐ Empty state when 0 results.

* ☐ No layout shift on filter change.

* ☐ Handles 500 rows without lag.

* ☐ Mobile: charts stack, table scrolls horizontally.

* ☐ Every visible element traces back to a question in BUSINESS.md.

### **Demo video (2 min)**

1. **15 sec:** “This is for \[user\]. They ask 5 questions every Monday. Here they are.”

2. **60 sec:** Walk the dashboard, answering each question by pointing to the relevant widget.

3. **20 sec:** Demonstrate filters changing the picture.

4. **25 sec:** “What I cut and why. What I’d add for the CFO version.”

### **Deliverables**

Standard package \+ seed.sql \+ BUSINESS.md with the question→widget mapping.

---

## **DAY 4 — MVP \#3: Multi-Step Form \+ Email Sending ⭐⭐**

**Deadline:** Thu 23:59. **Target time:** 7–9 hours. **Evaluated on:** integrations, *can you think about conversion funnels.*

### **Build**

4-step B2B onboarding wizard. On submit, send 2 emails (user \+ admin) via Resend or SendGrid.

### **Business framing**

Multi-step forms have a measurable conversion problem: every step drops 20–40% of users. In BUSINESS.md: \- Calculate expected step-by-step drop-off (your assumption). \- Justify why each field exists — what business decision does it enable? \- For each field, ask: “Could we ask this later?” Cut what you can. \- What’s the cost of one lost lead at this stage? Frame the UX decisions in that number.

### **Wizard steps**

1. **Company:** name, website (URL validated), size (1-10 / 11-50 / 51-200 / 200+), industry (8 options).

2. **Contact:** full name, work email, role, phone (country code).

3. **Use case:** primary goal (multi-select chips, min 1), expected volume (radio), free-text “anything else” (500-char counter).

4. **Review:** read-only summary, “Edit” buttons per step, terms checkbox, submit.

### **Behavior**

* Progress bar showing N of 4\.

* Per-step validation.

* Refresh-safe: state in localStorage until success, then clear.

* Success screen \+ “Start over”.

### **Backend**

* Supabase Edge Function /submit-onboarding.

* Insert into onboarding\_submissions, call email provider twice.

* API key **only** in env vars.

**create** **table** onboarding\_submissions (  
  **id** uuid **primary** **key** **default** uuid\_generate\_v4(),  
  payload jsonb **not** **null**,  
  status text **not** **null** **default** 'received',  
  created\_at timestamptz **default** now()  
);

### **Emails**

* **User:** “Welcome — next steps”, HTML, includes their summary, dummy “Book a call” CTA.

* **Admin:** \[New onboarding\] {company\_name}, full payload.

### **Acceptance criteria**

* ☐ Both emails arrive (screenshots in /docs/emails/).

* ☐ Refresh mid-wizard restores progress.

* ☐ Submit shows loading, can’t double-click.

* ☐ Network failure → retry CTA, not dead screen.

* ☐ Invalid payload → 4xx from edge function.

### **Demo video (90 sec)**

1. **15 sec:** “Each step costs us X% drop-off. Here’s how I designed against that.”

2. **40 sec:** Walk the wizard, complete a submission.

3. **15 sec:** Show both emails arriving.

4. **20 sec:** “Two fields I cut and why. One I’d A/B test.”

### **Deliverables**

Standard package \+ email screenshots \+ BUSINESS.md with drop-off model.

---

## **DAY 5 — Code Review \#1 \+ Retro \+ Business Review**

**Time slots:** assigned by Mubina. **Not rated as an MVP — this is feedback day.**

### **Prep before your slot**

1. RETRO.md in any repo:

   * What went fast / what broke.

   * One prompt pattern that worked, one that didn’t (paste examples).

   * One business assumption that changed as you built.

   * What you’ll change for Days 6–9.

2. Be ready to walk through any file in Days 1–4 repos.

3. Be ready to defend any business decision in your BUSINESS.md files. Specifically: “Why is the price $X and not $Y?” “Who said the user wants this?”

### **Review covers**

* Code quality after your patches (not raw Lovable output).

* Prompt logs.

* Git hygiene.

* **Business reasoning quality across all 4 BUSINESS.md files.**

* How well you justified decisions vs guessed.

### **Output**

Mubina sends written scorecard within 24h. Read it before Day 6\.

---

## **DAY 6 — MVP \#4: Stripe Checkout \+ Thank-You Flow ⭐⭐⭐**

**Deadline:** Sat 23:59. **Target time:** 8–11 hours. **Evaluated on:** payments, webhooks, edge cases, *do you understand unit economics.*

### **Build**

3-product pricing page → Stripe Checkout (test mode) → webhook-confirmed thank-you. **Test mode only.**

### **Business framing — unit economics required**

Payments are where business reasoning becomes math. In BUSINESS.md: \- For each plan, calculate gross margin (price − Stripe fees − your assumed COGS). \- Stripe fees: 2.9% \+ $0.30 per successful charge. \- What’s your assumed CAC? Defend it. \- LTV calculation: assume churn rate and lifetime in months. \- LTV:CAC ratio — is this business viable? \- Why these prices? Why not $9 / $99 / $499? Cite a comparable.

### **Products**

* **Starter** $19/mo subscription

* **Pro** $49/mo subscription

* **Lifetime** $299 one-time

### **Pages**

* /pricing — 3 cards, logged-in users only.

* /thank-you?session\_id=... — confirm only **after** webhook marks paid (poll Supabase max 10 sec, then “still processing”).

* /billing — current plan \+ “Manage billing” → Stripe Customer Portal.

### **Integration**

* Server endpoint creates checkout session with client\_reference\_id \= user.id, customer\_email \= user.email.

* Webhook handles: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, invoice.payment\_failed.

* Verify webhook signature. Reject unsigned.

### **Schema**

**create** **table** subscriptions (  
  user\_id uuid **primary** **key** **references** auth.users(**id**) **on** **delete** **cascade**,  
  stripe\_customer\_id text **unique**,  
  stripe\_subscription\_id text **unique**,  
  **plan** text,  
  status text,  
  current\_period\_end timestamptz,  
  updated\_at timestamptz **default** now()  
);

RLS: user can select own row. Writes only via service role from webhook.

### **Edge cases — must handle**

* Closes Checkout tab → can retry without dup subscription.

* Webhook before /thank-you lands.

* Webhook after /thank-you lands (poll).

* Failed payment → past\_due, /billing warns.

* Already-active subscription → “Switch plan” or disabled.

### **Acceptance criteria**

* ☐ Test card 4242 4242 4242 4242 works end-to-end.

* ☐ Unsigned webhook POST → 400\.

* ☐ No client-side path to mark sub active.

* ☐ /thank-you waits for webhook confirmation.

* ☐ Stripe CLI command documented in README.

### **Demo video (2 min)**

1. **20 sec:** Show your LTV:CAC math from BUSINESS.md. “This is viable / not viable because…”

2. **60 sec:** Complete a Pro subscription. Show Stripe dashboard event, Supabase row, /thank-you, /billing.

3. **20 sec:** Demo one edge case (failed payment or duplicate prevention).

4. **20 sec:** “If I had a real CFO, the question I’d push back on is X.”

### **Deliverables**

Standard package \+ screenshots (checkout, Stripe event log, Supabase row) \+ BUSINESS.md with unit economics.

---

## **DAY 7 — MVP \#5: AI Chat with History ⭐⭐⭐**

**Deadline:** Sun 23:59. **Target time:** 8–11 hours. **Evaluated on:** LLM integration, streaming, state, *do you understand AI product economics.*

### **Build**

Multi-conversation chat app, ChatGPT-style. Auth required.

### **Business framing — AI cost analysis required**

LLM apps die on token economics. In BUSINESS.md: \- Pick your model (gpt-4o-mini or claude-haiku-4-5). Cite current input/output token prices. \- Estimate average tokens per message in/out (defend your assumption). \- Cost per “average user session” (5 turns? 20?). \- Cost per user per month at three usage tiers (light/medium/heavy). \- What you’d charge to keep gross margin ≥ 70%. \- What’s the abuse vector and how would you rate-limit?

### **Provider**

OpenAI gpt-4o-mini or Anthropic claude-haiku-4-5. API key server-side **only**.

### **Features**

* Sidebar: conversations list (recent first), “New chat”, rename, delete.

* Auto-title from first user message (LLM call: “summarize in 5 words”).

* Message stream: tokens render as they arrive. Typing indicator before first token.

* Stop button that actually cancels upstream.

* Markdown rendering, code blocks with copy button \+ syntax highlighting.

* Per-conversation editable system prompt (gear in header).

* Token usage shown in footer (running total this conversation).

### **Schema**

**create** **table** conversations (  
  **id** uuid **primary** **key** **default** uuid\_generate\_v4(),  
  user\_id uuid **not** **null** **references** auth.users(**id**) **on** **delete** **cascade**,  
  title text,  
  system\_prompt text **default** 'You are a helpful assistant.',  
  created\_at timestamptz **default** now(),  
  updated\_at timestamptz **default** now()  
);  
**create** **table** messages (  
  **id** uuid **primary** **key** **default** uuid\_generate\_v4(),  
  conversation\_id uuid **not** **null** **references** conversations(**id**) **on** **delete** **cascade**,  
  **role** text **not** **null** **check** (**role** **in** ('user','assistant','system')),  
  content text **not** **null**,  
  tokens int,  
  created\_at timestamptz **default** now()  
);

RLS on both, scoped to auth.uid().

### **Streaming**

* SSE or fetch streaming. Pick one, justify in README.

* Persist assistant message **after** stream completes (or on stop, partial). Re-fetch from DB on refresh.

### **Acceptance criteria**

* ☐ Refresh during stream doesn’t corrupt conversation.

* ☐ Switching conversation mid-stream cancels prior stream.

* ☐ Long conversations (\>20 turns) load fast (pagination or virtualization).

* ☐ Mobile: sidebar → drawer.

* ☐ API key not in Network tab.

* ☐ Token counter visible and accurate.

### **Demo video (2 min)**

1. **25 sec:** Cost math. “At medium usage, this user costs me $X/mo. I’d charge $Y.”

2. **45 sec:** Multi-conversation flow, streaming, stop, switch conversations.

3. **20 sec:** Show token counter, explain context-window strategy (sliding / summarize / full).

4. **30 sec:** “Top abuse risk and how I’d handle it. What I’d build next.”

### **Deliverables**

Standard package \+ BUSINESS.md with token economics \+ context-window strategy explained in README.

---

## **DAY 8 — MVP \#6: Vague Brief — “Lead Tool” ⭐⭐⭐⭐**

**Deadline:** Mon 23:59. **Target time:** 9–13 hours. **Evaluated on:** independence, product thinking, *can you turn a vague ask into a defensible product.*

### **The brief — this is all you get**

“We need a lead tool for our sales team. They keep losing track of who they’ve contacted and what stage everyone is in. Should integrate with email somehow. Make it not suck.”

**Do not ask for more.** Decide everything yourself.

### **Required artifact — PRD.md (write BEFORE you build)**

A one-page product spec: \- Problem statement (your interpretation, in your words). \- Target user — who exactly. Team size, role, current tool. \- Top 3 user stories (“As a SDR, I want to…”). \- Out of scope — what you explicitly will NOT build today and why. \- Success metrics: what would make you say “this worked” in 30 days of real use. \- Minimum viable scope (what ships today) vs Phase 2 (what’s next).

This PRD.md is graded. If we can’t tell what product you decided to build, the points are gone.

### **Minimum bar**

* Auth.

* Lead entity: name, company, email, phone, stage, owner, source, value, notes, last\_contacted.

* Pipeline view (stages as columns or clear status flow).

* List view: filter \+ search.

* Some form of email integration — your call:

  * Log emails sent (manual)

  * Templated email drafts

  * mailto: with prefilled body

  * Gmail OAuth (ambitious) Pick one, ship it well.

* Activity timeline per lead (at least 2 of: calls / emails / notes).

* Clear empty states.

### **BUSINESS.md for this day**

On top of the standard template, add: \- Competitive analysis: pick 3 real CRMs (HubSpot Free, Pipedrive, Folk, Attio, Close — your pick). What does each cost? What 1 thing does each do better than you? What’s your wedge against them? \- Pricing hypothesis with rationale. \- “Build vs buy” — why would a 5-person sales team use your tool over HubSpot’s free tier?

### **Demo video (3 min) — pitch format**

1. **30 sec:** “I built X. The brief was vague. Here’s what I decided it meant and why.”

2. **90 sec:** Walk the tool — pipeline → lead → email integration → activity log.

3. **30 sec:** Competitive position. “Against HubSpot Free I lose on A, win on B.”

4. **30 sec:** “Next 3 features I’d build and why in that order.”

### **Deliverables**

Standard package \+ PRD.md \+ BUSINESS.md \+ 3-min demo.

---

## **DAY 9 — MVP \#7: Real Client Task ⭐⭐⭐⭐**

**Deadline:** Tue 23:59. **Target time:** 9–13 hours. **Evaluated on:** real conditions, real requirements, *can you behave like an agency PM, not a coder.*

### **How this works**

Mubina sends the actual brief from Jay’s backlog at 09:00. The brief will be real-client-messy: incomplete, conflicting, possibly with mismatched assets.

### **Required artifact — INTERPRETATION.md (write BEFORE building)**

1. **What I think the client wants** (in 3 bullets, your words).

2. **What’s ambiguous** — list every place you had to guess. State your guess and the alternative you rejected.

3. **What’s out of scope** for today — and how you’d phase it.

4. **3 clarifying questions** you’d send the client if you had a 15-min call (priority-ranked). You may send max **3** of these to Mubina; she may decline (“decide yourself”).

5. **Risks** — what could the client hate when they see this and why.

### **Build it**

Quality of the slice you ship \> quantity of half-finished features. Mark cut features clearly in README under “Phase 2”.

### **BUSINESS.md for this day**

* Estimated hours for the full ask (not just today’s slice). Honest number.

* If you were quoting this for a client at $80/hr blended, what’s the invoice?

* What’s the maintenance cost per month after launch?

* One scope-creep risk and how you’d guard against it.

### **Demo video (3 min) — client review format**

Imagine the client is watching this: 1\. **30 sec:** “Here’s what I understood. Here’s what I assumed. Here’s what I cut and why.” 2\. **90 sec:** Walk the built feature against the original brief, point by point. 3\. **30 sec:** “Three questions I’d want to confirm with you before the next round.” 4\. **30 sec:** “Phase 2 scope and rough hours.”

### **Deliverables**

Standard package \+ INTERPRETATION.md \+ BUSINESS.md \+ client-style 3-min demo.

---

## **DAY 10 — Final Demo \+ Decision**

**Time slots assigned by Mubina.** Each developer: **30 minutes — 20 demo \+ 10 Q\&A.**

### **Pre-demo deliverable — PORTFOLIO.md**

One page linking all 7 live URLs \+ 7 repos \+ 7 demo videos. Plus, for each: \- Target hours vs actual. \- Hardest bug. \- One thing you’d redo. \- One business assumption that surprised you.

Submit to Mubina **by Tue 23:59** (same deadline as Day 9). Late portfolio \= your demo slot is forfeited.

### **The 20-min demo — required structure**

You will be timed. Practice this.

| Time | Section | What to cover |
| :---- | :---- | :---- |
| 0:00–2:00 | **Sprint overview** | Hours-per-task chart. Day 1 vs Day 10 comparison. What got faster, what didn’t. |
| 2:00–4:00 | **Prompt evolution** | Show one Lovable prompt from Day 1 vs Day 9\. What you learned about Lovable specifically. |
| 4:00–14:00 | **Project tour** | \~80 sec per project. Don’t walk the full UI — show the ONE thing per project you’re proud of (or the one that taught you most). Each project: pick *either* the technical detail or the business decision to highlight, not both. |
| 14:00–17:00 | **Days 8 & 9 deep dive** | These were the ambiguous ones. Walk your PRD.md and INTERPRETATION.md. Defend the calls you made. |
| 17:00–19:00 | **What you’d do differently** | If you re-ran this sprint tomorrow, what 3 things change? Be specific. |
| 19:00–20:00 | **Pitch yourself** | 60 seconds. Why you for the role. What kind of work you want to be doing in 6 months. |

### **Q\&A (10 min) — what to expect**

* **Live-edit:** we may ask you to add a small feature on the spot in one of your projects. Be ready to open any repo and ship a small change.

* **Defend a business call:** “Why $19 and not $9?” “Why did you cut X on Day 8?”

* **Stack tradeoff question:** “What would you change if you had to redo this in pure Next.js with no Supabase?”

* **Stress question:** something deliberately unfair or vague — we want to see how you handle it.

### **Presentation rules**

* **No more than 5 slides total** if you use slides. Demo \> slides.

* **Don’t read text aloud** — everyone in the room can read.

* **Open the live URL**, not a screenshot. If it’s broken, say so up front — don’t get caught.

* **Time yourself.** Going over time loses points. Going under is fine if you used the time well.

### **What we compare across candidates**

* Day 1 vs Day 10 output quality (stability under load).

* Hours-per-task trend.

* Prompt log evolution.

* Quality of BUSINESS.md files across the 10 days.

* How you handled Days 8 and 9\.

* How you presented and answered Q\&A.

### **After the demo**

Finalist decision within 48h. Mubina sends results. Do not follow up before then.

---

## **Final Rules Recap**

* **Three layers evaluated daily:** technical, business, presentation. Missing one \= lower score.

* **23:59 deadlines, strict.** Late is logged.

* **Mubina is your single point of contact.** Not Javokhir.

* **Self-sufficiency is the test.** Asking questions this doc answers will be noted.

* **BUSINESS.md every day, Days 1–9.** No exceptions.

* **Demo videos every day** with the structure specified. We will watch them.

* **Don’t fake hours.** Commit timestamps \+ Lovable logs are visible to us.

Build something you’d be proud to demo to a real client.