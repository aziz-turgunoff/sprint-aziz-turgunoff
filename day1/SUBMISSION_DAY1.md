# Day 1 Submission — Stacklet Landing Page

## Summary

Stacklet is a no-code platform that helps operations teams build internal workflow tools without waiting for engineering. This Day 1 deliverable includes a complete landing page with business positioning, pricing tiers, FAQ section, a working waitlist form connected to Supabase, and full deployment to Vercel.

---

## Primary Submission Links

| Item | Link |
| --- | --- |
| Live app | https://sprint-aziz-turgunoff-3kje.vercel.app |
| GitHub repo | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff |
| Demo video | https://drive.google.com/file/d/1wfLhYwr5rGk-4aXSuKj_f8i19VIJ0dvN/view?usp=drive_link |
| Business analysis | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day1/BUSINESS.md |
| Technical decisions | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day1/DECISIONS.md |
| Development log | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day1/README.md |

---

## What Was Built

**Landing Page Components:**
- **Sticky Navigation** — Smooth scroll links to Features, Pricing, FAQ, and Waitlist sections
- **Hero Section** — Clear value proposition for operations teams, primary CTA button, and product preview
- **Features Grid** — Six feature cards highlighting drag-and-drop builder, permissions, database integration, templates, approval workflows, and safe rollouts
- **Pricing Section** — Three tiers (Starter $39/mo, Team $129/mo, Scale $399/mo) with workspace-based pricing model
- **FAQ Section** — Five questions addressing common concerns about Retool comparison, technical requirements, data ownership, pricing, and product maturity
- **Waitlist Form** — Email validation, role selection, optional company field, duplicate email detection, success messaging, and 3-second submit cooldown
- **Footer** — Product links, company info, and legal pages

**Technical Implementation:**
- React 19 + TypeScript + Vite for fast development
- Tailwind CSS for responsive design (mobile-first approach)
- shadcn/ui components for consistent UI
- Supabase for database and waitlist storage
- Row Level Security (RLS) policies: anonymous users can insert only, no read/update/delete access
- Custom Stacklet branding with logo favicon
- Vercel deployment with environment variables

---

## Supabase Setup

The app uses browser-safe public Supabase credentials only:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

No service role key is exposed or committed to the repository.

**Database Schema:**
- Table: `waitlist`
- Columns: `id` (uuid), `email` (text, unique), `role` (text), `company` (text), `created_at` (timestamptz)
- RLS Policy: Anonymous insert only, no select permissions

**Verified on May 26, 2026:**
- ✅ Live site returns HTTP 200
- ✅ Vercel production deployment successful
- ✅ Waitlist form submission works end-to-end
- ✅ Data appears in Supabase dashboard
- ✅ Duplicate email detection working
- ✅ Success message displays correctly

---

## Performance & Quality

**Lighthouse Scores (Desktop):**
- Performance: 100
- Accessibility: 95
- Best Practices: 96
- SEO: 100

**Build Verification:**
```bash
npm run build
npm run preview
```

All builds pass successfully with no errors.

---

## Business Reasoning

**Target Customer:**
Operations leads at 50-500 person B2B SaaS companies who need internal tools but can't wait months for engineering resources.

**Core Problem:**
Operations teams run critical workflows through spreadsheets, Airtable, Slack threads, and manual handoffs because engineering is too busy building customer-facing features.

**Product Positioning:**
Stacklet is not a generic app builder — it's specifically designed for operations teams to build secure approval workflows and admin tools on top of their existing Supabase/Postgres databases.

**Competitive Landscape:**
- **vs Retool:** Retool requires technical skills and is engineer-focused. Stacklet is built for non-technical ops teams.
- **vs Airtable Interfaces:** Airtable is easier but lacks production-grade database integration and granular permissions.
- **vs Spreadsheets + Zapier:** Cheap initially but becomes brittle, hard to audit, and breaks easily.

**Pricing Strategy:**
Workspace-based pricing instead of per-seat because internal tools need broad access. Per-seat pricing discourages teams from inviting everyone who needs the workflow.

---

## Development Process

**Time Spent:** 4 hours

**Approach:**
1. Set up React + Vite + TypeScript + Tailwind project structure
2. Built all landing page components with shadcn/ui
3. Integrated Supabase client and created waitlist table
4. Deployed to Vercel and configured environment variables
5. Fixed TypeScript build errors (baseUrl deprecation, verbatimModuleSyntax)
6. Added custom Stacklet branding and favicon
7. Verified end-to-end functionality and performance

**Tools Used:**
- GitHub Copilot for development assistance
- Vite for fast development and building
- Supabase for backend database
- Vercel for hosting and deployment

---

## Known Notes

- TypeScript 5.7.3 required `ignoreDeprecations: "6.0"` flag for baseUrl warning
- All imports use type-only syntax for verbatimModuleSyntax compliance
- Environment variables properly configured in Vercel dashboard
- Custom favicon created for Stacklet brand identity
- All code follows React 19 and TypeScript best practices

---

## Self-Assessment

**Expected Score:** 9/10

**Strengths:**
- ✅ Clean, production-ready code
- ✅ Live deployment working perfectly
- ✅ Supabase integration fully functional
- ✅ Perfect Lighthouse performance score (100)
- ✅ Complete business analysis and technical documentation
- ✅ Custom branding and professional design
- ✅ All sprint requirements met

**Areas for Improvement:**
- Could add loading skeletons for better UX
- Could implement email verification flow
- Could add analytics tracking

---

## Quick Reference

```csv
Day,Project,Live URL,GitHub URL,Demo Video,Business Doc,Decisions Doc,Status,Hours,Notes
1,Stacklet Landing Page,https://sprint-aziz-turgunoff-3kje.vercel.app,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff,https://drive.google.com/file/d/1wfLhYwr5rGk-4aXSuKj_f8i19VIJ0dvN/view?usp=drive_link,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day1/BUSINESS.md,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day1/DECISIONS.md,Submitted and verified,4,Lighthouse 100/95/96/100; Vercel deployment successful; Supabase working
```

---

**Submitted by:** Aziz Turgunoff  
**Submission Date:** May 26, 2026  
**Status:** ✅ Complete and Verified
