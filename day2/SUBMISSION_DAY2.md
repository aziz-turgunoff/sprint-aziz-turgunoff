# Day 2 Submission — Multi-User Todo App with Auth & RLS

## Summary

This Day 2 project is a secure, client-centric, multi-user Todo Application built specifically for freelance consultants. It features full authentication (email/password + magic link), strict row-level security (RLS) data isolation, advanced sorting and filtering, and full deployment to Vercel.

---

## Primary Submission Links

| Item | Link |
| --- | --- |
| Live app | https://sprint-aziz-turgunoff-3kje.vercel.app |
| GitHub repo | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff |
| Demo video | https://drive.google.com/file/d/1iQyu4Q8-pd_d7xS8YCEr5lCOVtBnsxr2/view?usp=sharing |
| Business analysis | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day2/BUSINESS.md |
| Technical decisions | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day2/DECISIONS.md |
| Development log | https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day2/README.md |

---

## What Was Built

**Core Todo Management:**
- **Create Todo** — Fields: title (max 120 chars constraint), description, due date, and priority (low, med, high).
- **Inline Title Edit** — Click directly on a todo title to edit in-place; supports Enter to save and Escape to cancel.
- **Full Edit Modal** — A clean dialog to update all fields (title, description, due date, priority).
- **Toggle Completion & Delete** — Checkbox toggle with optimistic UI updates, and confirmation dialog for deletion to prevent accidental loss.
- **Filters & Sorting** — Filter by status (all/active/completed) and priority (all/low/med/high); sort by creation date or due date.
- **Empty States & Counters** — Visual feedback when there are no tasks, along with counter showing "X active, Y completed" todos.

**Authentication & Security:**
- **Supabase Auth Integration** — Support for email/password signup and login, passwordless magic links, and password recovery flows.
- **Protected Routing** — Router gates `/app` and redirects unauthenticated users to `/login`.
- **Row-Level Security (RLS)** — Postgres security policies ensure that users can only select, insert, update, or delete rows where `user_id = auth.uid()`. Checked and validated across multiple test accounts.

**Technical Execution:**
- React 19 + TypeScript + Vite project compilation.
- Tailwind CSS 3 and Radix UI primitives (via shadcn/ui) for responsive, highly detailed design.
- Non-sensitive public environment variables configured on Vercel to ensure seamless compilation at build-time.

---

## Supabase Setup

The app utilizes standard browser-safe public Supabase environment variables:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

**Database Schema:**
- Table: `todos`
- Columns: `id` (uuid, PK), `user_id` (uuid, references auth.users), `title` (text, max 120 chars), `description` (text), `due_date` (date), `priority` (text, check constraint low/med/high), `completed` (boolean), `created_at` (timestamptz), `updated_at` (timestamptz).
- RLS Policies:
  - Select: `auth.uid() = user_id`
  - Insert: `auth.uid() = user_id`
  - Update: `auth.uid() = user_id`
  - Delete: `auth.uid() = user_id`

---

## Test Account

The following test accounts are pre-configured to test data isolation:

- **Account 1:** `you@company.com` / `123456`

---

## Business Analysis Summary

- **Target Persona:** Freelance consultants managing 10-30 active client projects.
- **Core Wedge:** Client-centric todo context (todos mapped to clients).
- **Pricing Strategy:** Free (limit of 5 active todos) → Pro ($8/mo unlimited).
- **CAC/LTV:** Target CAC of ~$25, LTV of ~$192 (assuming 24-month lifespan at $8/mo).

---

## Quick Reference Table

```csv
Day,Project,Live URL,GitHub URL,Demo Video,Business Doc,Decisions Doc,Status,Hours,Notes
2,Multi-User Todo App,https://sprint-aziz-turgunoff-3kje.vercel.app,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff,[To be recorded on Loom],https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day2/BUSINESS.md,https://github.com/aziz-turgunoff/sprint-aziz-turgunoff/blob/main/day2/DECISIONS.md,Submitted and verified,6,RLS fully configured; Vercel env vars fixed; tailwindcss-animate resolved; compilation successful.
```

---

**Submitted by:** Aziz Turgunoff  
**Submission Date:** May 28, 2026  
**Status:** ✅ Complete and Verified
