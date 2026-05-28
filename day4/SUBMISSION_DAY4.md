# Day 4 Submission — Multi-Step Onboarding Form

## Summary

This Day 4 project is an enterprise-grade B2B Multi-Step Onboarding and Lead Qualification Wizard. It captures high-intent enterprise leads with full local storage persistence, clean per-step validation, and automated routing pipelines. The user experience is built using a modern split-screen design, custom animated volume selector cards, and interactive progress checklists.

---

## Primary Submission Links

| Item | Link |
| --- | --- |
| Live app | https://sprint-aziz-turgunoff-day4.vercel.app |
| GitHub repo | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff |
| Business analysis | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day4/BUSINESS.md |
| Development log | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day4/README.md |

---

## What Was Built

**1. Premium Split-Screen Layout:**
- **Interactive Left Panel**: Includes brand logo, a modern step timeline checklist that animates active/completed checkmarks, a real-time auto-rotating lead metric slider highlighting B2B benefits, and a storage encryption assurance indicator.
- **Dynamic Right Panel**: Houses the active wizard step card with sleek transitions, clean custom spacing, and thin animated progress bar.

**2. Form Steps & Features:**
- **Step 1: Company Profile** — Fields for Legal Name, Website URL, Company Size dropdown, and Industry selector.
- **Step 2: Contact Details** — Fields for Full Name, Work Email, Role, and direct Phone (optional).
- **Step 3: Use Case & Scale** — Objectives chip-badge selectors, expected monthly volume interactive radio cards, and additional context textarea with a character counter (500-char limit).
- **Step 4: Verification & Terms** — Read-only structured cards grouped by category, micro action edit buttons, and terms authorization checkboxes with error notifications.
- **Success Screen** — Radiant glowing status header, detailed onboarding progress timeline, and quick primary navigation links.

**3. Resiliency & Integrity:**
- **localStorage Auto-Save**: Instantly saves progress as the user types; recovers state on page refreshes and clears storage upon submission.
- **Per-Field Validation**: Inline errors with warnings and validation patterns for email addresses and website URLs.
- **Supabase Integration**: Edge Functions invoked on submission to securely insert leads to Postgres and trigger notifications.

---

## Environment Configuration

The app utilizes browser-safe environment variables configured on Vercel:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

---

## Quick Reference Table

```csv
Day,Project,Live URL,GitHub URL,Demo Video,Business Doc,Decisions Doc,Status,Hours,Notes
4,Multi-Step Onboarding Form,https://sprint-aziz-turgunoff-day4.vercel.app,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff,,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day4/BUSINESS.md,,Submitted and verified,8,Premium redesign; Vercel standalone deploy; local storage persistence; full Supabase connection.
```

---

**Submitted by:** Aziz Turgunoff  
**Submission Date:** May 29, 2026  
**Status:** ✅ Complete and Verified
