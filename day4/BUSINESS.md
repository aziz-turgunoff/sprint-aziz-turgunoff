# Business Analysis — Day 4

## Who is this for?
- Primary user persona: B2B SaaS companies (10-200 employees) looking to qualify enterprise leads
- Decision makers: Head of Sales, VP of Marketing, Revenue Operations
- Why would they use this over what they use now? Current solutions (Typeform, HubSpot forms) lack intelligent qualification and personalized follow-up automation

## What problem does it solve?
- The job-to-be-done: Capture high-intent enterprise leads with enough context to route them to the right sales rep and personalize the first touchpoint
- The cost of NOT solving it: 
  - Sales reps waste 3-5 hours/week chasing unqualified leads
  - 40-60% of inbound leads go cold due to slow/generic follow-up
  - Average lost deal value: $15K-50K per mishandled enterprise lead

## Success metrics (how would you measure this in production?)
- Activation: 75% of visitors who start the form complete all 4 steps
- Engagement: Average time-to-complete < 3 minutes
- Retention: 60% of submitted leads respond to first email within 48h
- Revenue/value driver: 25% conversion from qualified lead → sales call booked

## Monetization or business model
- Pricing hypothesis: $199/mo for up to 500 submissions, $499/mo for 2,000 submissions
- Unit economics:
  - Cost per submission: ~$0.15 (email sending + storage + compute)
  - Revenue per submission: $0.40 (at $199/500) or $0.25 (at $499/2000)
  - Gross margin: 62% (Starter) / 40% (Growth)
- Upsell: Custom integrations (Salesforce, HubSpot) at $99/mo

## Competitors / alternatives
- **Typeform**: Beautiful UI, but $35-70/mo, no native email automation, requires Zapier ($20+/mo)
- **HubSpot Forms**: Free but generic, poor mobile UX, requires HubSpot CRM lock-in
- **Jotform**: Cheap ($34/mo) but dated UI, slow load times, limited customization
- What we do differently: Native email automation, localStorage persistence (no lost progress), mobile-first design, transparent pricing

## Scope tradeoffs

### Conversion Funnel Analysis
**Expected drop-off per step (industry baseline: 25-35% per step):**
- Step 1 (Company): 100% → 75% (25% drop) — Reason: Commitment threshold, asking for company details
- Step 2 (Contact): 75% → 60% (20% drop) — Reason: Personal info (phone number friction)
- Step 3 (Use case): 60% → 50% (17% drop) — Reason: Cognitive load (multi-select + free text)
- Step 4 (Review): 50% → 45% (10% drop) — Reason: Terms checkbox, final hesitation
- **Final conversion: 45% complete all 4 steps**

### Field Justification (every field must earn its place)
**Step 1 - Company:**
- ✅ Company name: Required for personalization, sales routing
- ✅ Website: Validates legitimacy, enables pre-call research (cost: 1 lost lead per 100)
- ✅ Company size: Critical for pricing tier, sales rep assignment
- ✅ Industry: Enables use-case personalization, competitive positioning
- ❌ CUT: Revenue range (too invasive at this stage, ask during sales call)

**Step 2 - Contact:**
- ✅ Full name: Required for email personalization
- ✅ Work email: Required, validates B2B intent
- ✅ Role: Determines decision-making authority, urgency
- ⚠️ Phone: High friction (causes 15-20% drop), but required for high-value follow-up
  - **Decision: Keep it, but make it optional** — reduces drop to 5-8%
- ❌ CUT: LinkedIn URL (could ask later, adds 10% drop)

**Step 3 - Use case:**
- ✅ Primary goals (multi-select): Enables product positioning, demo customization
- ✅ Expected volume: Pricing tier indicator, capacity planning
- ✅ Free text "anything else": Captures edge cases, shows engagement level (500-char limit prevents essay fatigue)
- ❌ CUT: "When do you need this by?" (ask during call, adds 8% drop)

**Step 4 - Review:**
- ✅ Read-only summary: Reduces errors, builds trust (increases completion by 5-7%)
- ✅ Edit buttons: Reduces abandonment from "I made a mistake" (saves 3-5%)
- ✅ Terms checkbox: Legal requirement
- ❌ CUT: "How did you hear about us?" (move to Step 1 or post-submit survey)

### What I cut for time and why it was the right cut
1. **Conditional logic** (show/hide fields based on answers) — Adds complexity, 2-3 hours dev time, marginal conversion lift (2-3%)
2. **Progress save via email** ("Resume later" link) — Nice-to-have, localStorage covers 90% of use cases
3. **Real-time email validation API** (NeverBounce, ZeroBounce) — Costs $0.01/check, adds latency, use regex for now
4. **Multi-language support** — Targeting English-speaking markets first, adds 4-6 hours

### What I'd build next (top 3, prioritized)
1. **Conditional logic engine** — Show "Expected volume" only if company size > 50, reduces cognitive load for SMBs
2. **A/B testing framework** — Test phone field optional vs required, test step order (Contact before Company?)
3. **Partial submission recovery** — Email users who dropped at Step 3+ with "Complete your submission" link (recovers 10-15%)

## Risks

### Top 2 risks that would kill this in production

1. **Email deliverability failure** (Technical + Market risk)
   - **Problem**: Transactional emails land in spam (30-40% of cold domains), user never gets confirmation, admin never gets lead
   - **Impact**: Lost leads, damaged brand trust, support overhead
   - **Mitigation**: 
     - Warm up sending domain (2-4 weeks before launch)
     - SPF, DKIM, DMARC records configured correctly
     - Use established provider (Resend, SendGrid) with good reputation
     - Monitor bounce rate, spam complaints daily
     - Fallback: Show submission ID on success screen, "Didn't get email? Contact us"

2. **Form abandonment rate > 60%** (UX + Market risk)
   - **Problem**: If actual drop-off exceeds 60% (vs projected 55%), cost-per-qualified-lead becomes unsustainable
   - **Impact**: CAC too high, users frustrated, competitors win
   - **Mitigation**:
     - A/B test step order (some users prefer Contact first, Company second)
     - Add "Why we ask this" tooltips for high-friction fields (phone, company size)
     - Implement exit-intent popup on Step 2+ ("Save progress before you go?")
     - Monitor drop-off per field with analytics, cut worst offenders
     - Consider reducing to 3 steps (merge Company + Contact) if drop-off > 65%

### Cost of one lost lead at this stage
- Assumption: 5% of qualified leads → closed deals
- Average deal value: $25K (mid-market SaaS)
- Expected value per qualified lead: $25K × 5% = $1,250
- **Every 1% improvement in completion rate = $12.50 per 100 visitors**
- At 10K visitors/month, 1% = $1,250/month recovered revenue

This math justifies aggressive UX optimization and A/B testing budget.
