# Day 4 - Multi-Step Onboarding Form

A B2B enterprise onboarding wizard with 4 steps, localStorage persistence, and automated email notifications.

## Problem Statement

B2B SaaS companies (10-200 employees) need to qualify enterprise leads efficiently. Current solutions like Typeform and HubSpot forms lack intelligent qualification and personalized follow-up automation. Sales reps waste 3-5 hours/week chasing unqualified leads, and 40-60% of inbound leads go cold due to slow or generic follow-up.

This tool captures high-intent enterprise leads with enough context to route them to the right sales rep and personalize the first touchpoint.

## Live Demo

- **Live URL**: [To be deployed]
- **Demo Video**: [To be recorded]

## Features

### ✅ Completed Features

- **4-Step Wizard Form**
  - Step 1: Company Information (name, website, size, industry)
  - Step 2: Contact Information (name, email, role, phone)
  - Step 3: Use Case (goals, expected volume, additional info)
  - Step 4: Review & Submit (editable summary)

- **Form Validation**
  - Per-step validation with inline error messages
  - URL validation for website field
  - Email validation for work email
  - Phone number format validation (optional field)
  - Character counter for additional info (500 char limit)

- **localStorage Persistence**
  - Auto-saves form data on every change
  - Restores progress on page refresh
  - Clears data after successful submission

- **Progress Tracking**
  - Visual progress bar showing step N of 4
  - Percentage completion indicator
  - Smooth step transitions

- **Responsive Design**
  - Mobile-first approach
  - Works on 375px, 768px, and 1440px viewports
  - Tailwind CSS styling

- **Supabase Integration**
  - Database schema for submissions
  - Edge Function for form processing
  - RLS policies for security

- **Email Notifications**
  - User confirmation email with submission summary
  - Admin notification email with full payload
  - HTML email templates with styling
  - Resend API integration

### 🚧 Partial Features

- Email sending (requires Resend API key configuration)

### ❌ Cut Features

- Conditional logic (show/hide fields based on answers)
- Progress save via email ("Resume later" link)
- Real-time email validation API
- Multi-language support

## Setup

### Prerequisites

- Node.js 18+
- Supabase account
- Resend account (for email sending)

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For Supabase Edge Function, set these secrets:

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL schema:

```bash
# Apply schema
psql -h your-db-host -U postgres -d postgres -f supabase-schema.sql
```

3. Deploy the Edge Function:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy function
supabase functions deploy submit-onboarding

# Set secrets
supabase secrets set RESEND_API_KEY=your_resend_api_key
```

## Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| 4-step wizard | ✅ Done | All steps implemented |
| Per-step validation | ✅ Done | Inline error messages |
| localStorage persistence | ✅ Done | Auto-save on change |
| Progress bar | ✅ Done | Visual indicator |
| Review step with edit | ✅ Done | Edit buttons per section |
| Supabase integration | ✅ Done | Schema + Edge Function |
| Email sending | ✅ Done | User + Admin emails |
| Success screen | ✅ Done | With "Start Over" button |
| Responsive design | ✅ Done | Mobile-first |
| Loading states | ✅ Done | Submit button disabled |
| Error handling | ✅ Done | Network failure retry |

## Known Issues

1. **Email delivery requires configuration**: Resend API key must be set in Supabase secrets
2. **Admin email hardcoded**: Update `admin@example.com` in Edge Function to actual admin email
3. **No rate limiting**: Production should add rate limiting to prevent abuse
4. **No CAPTCHA**: Consider adding reCAPTCHA for spam prevention

## What I'd Fix Next

1. **Add rate limiting**: Prevent form spam (max 3 submissions per IP per hour)
2. **Implement CAPTCHA**: Add reCAPTCHA v3 for bot protection
3. **Email deliverability monitoring**: Track bounce rates and spam complaints
4. **A/B testing framework**: Test phone field optional vs required
5. **Partial submission recovery**: Email users who dropped at Step 3+ with completion link

## Hours Spent

**Target**: 7-9 hours  
**Actual**: [To be recorded]

## Links

- **BUSINESS.md**: [./BUSINESS.md](./BUSINESS.md)
- **DECISIONS.md**: [To be created if needed]
- **Supabase Schema**: [./supabase-schema.sql](./supabase-schema.sql)
- **Edge Function**: [./supabase/functions/submit-onboarding/index.ts](./supabase/functions/submit-onboarding/index.ts)

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Postgres + Edge Functions)
- **Email**: Resend API
- **Icons**: Lucide React
- **Deployment**: Vercel (frontend) + Supabase Cloud (backend)

## Conversion Funnel Analysis

Based on industry benchmarks, expected drop-off per step:

- Step 1 (Company): 100% → 75% (25% drop)
- Step 2 (Contact): 75% → 60% (20% drop)
- Step 3 (Use case): 60% → 50% (17% drop)
- Step 4 (Review): 50% → 45% (10% drop)

**Final conversion: 45% complete all 4 steps**

See [BUSINESS.md](./BUSINESS.md) for detailed analysis of field justification and scope tradeoffs.
