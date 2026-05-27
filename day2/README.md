# Day 2 — Multi-User Todo App

**Live URL:** https://sprint-aziz-turgunoff-3kje.vercel.app  
**Demo Video:** [To be recorded on Loom]  
**GitHub Repo:** https://github.com/aziz-turgunoff/sprint-aziz-turgunoff (in the `day2` subfolder)  
**Hours Spent:** ~6 hours

## Problem Statement

Freelance consultants and agency owners (1-5 person teams) managing 10-30 active client projects waste 30-60 minutes daily searching for "what did I promise Client X?" across email, Slack, and notes. Existing solutions like Todoist ($4/mo) lack client-centric views, Notion ($10/mo) requires 2-3 hours of setup, and Asana ($10-15/mo) is built for internal teams, not client-facing work.

This is a simple, client-focused todo app designed specifically for freelancers. Track follow-ups across multiple clients without the overhead of complex project management tools. The activation moment is creating your first todo with a due date—proving you're serious about staying organized.

## Setup

### Prerequisites
- Node.js 18+
- Supabase account

### Installation

```bash
cd day2
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

1. Go to your Supabase project SQL Editor
2. Run the SQL in `supabase-schema.sql`
3. Verify the `todos` table was created with RLS policies
4. Copy your project URL and anon key to `.env`

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Features

### ✅ Completed

**Authentication:**
- Email + password signup with auto-login
- Email + password login
- Magic link login (passwordless)
- Forgot password flow with email reset link
- Reset password page (from email link)
- Session persistence across page reloads
- Protected routes (redirect to /login if not authenticated)
- No flash of unauthenticated content

**Todo Management:**
- Create todo with title, description, due date, priority (low/med/high)
- Inline edit title (click to edit, blur/Enter to save, Escape to cancel)
- Full edit modal for all fields (title, description, due date, priority)
- Toggle complete with checkbox
- Delete with confirmation dialog
- Filter by status (all/active/completed)
- Filter by priority (all/low/med/high)
- Sort by created date or due date
- Counter showing X active, Y completed
- Empty state when no todos
- Optimistic UI updates (immediate feedback)

**Data Isolation:**
- Row Level Security (RLS) on todos table
- Each user can only see/edit their own todos
- user_id automatically set on create
- All queries scoped to auth.uid()

**UI/UX:**
- Responsive design (mobile, tablet, desktop)
- shadcn/ui components (Button, Input, Card, Dialog, Checkbox, etc.)
- Form validation (title max 120 chars, required fields)
- Loading states on all async operations
- Error handling with user-friendly messages
- Keyboard shortcuts (Enter/Escape in inline edit)

### 🚧 Partial

None - all planned features completed

### ❌ Cut

- **Client grouping** — Would add a "Clients" table to group todos by client. Cut because it adds 3-4 hours and isn't required by Day 2 brief. Can simulate with description field for MVP.
- **Recurring todos** — Complex cron logic, 4-5 hours minimum, low activation impact.
- **Collaboration/sharing** — Requires permissions system, 6-8 hours, only 5% of target market needs this.
- **Real-time sync** — Supabase subscriptions would be nice but not required. Manual refresh works for MVP.
- **Tags/labels** — Nice-to-have, but priority field covers most use cases.
- **Subtasks** — Adds complexity, 3-4 hours, not core to activation.

## Known Issues

- **No real-time updates** — Changes from other devices/tabs require manual refresh. Would add Supabase subscriptions in production.
- **No undo for delete** — Once deleted, todos are gone. Would add soft delete (deleted_at column) in production.
- **No bulk actions** — Can't select multiple todos to delete/complete at once. Low priority for solo users.
- **Date picker UX** — Native HTML5 date input varies by browser. Would use a custom date picker (e.g., react-day-picker) in production.
- **No offline support** — Requires internet connection. Would add service worker + local storage in production.

## What I'd Fix Next

1. **Add client grouping** — Most-requested feature hypothesis. Let users group todos by client name. Adds clear differentiation vs Todoist.

2. **Real-time sync** — Use Supabase subscriptions to update todos across tabs/devices instantly. Better UX, reduces confusion.

3. **Email reminders** — "Your task 'Send proposal to Acme Corp' is due in 2 hours." High engagement driver, reduces churn.

4. **Keyboard shortcuts** — Cmd+K to quick-add todo, Cmd+F to search, arrow keys to navigate. Power user feature.

5. **Export to CSV** — Let users export their todo history. Good for freelancers who need to track billable work.

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite 8
- **Routing:** react-router-dom v7
- **Styling:** Tailwind CSS 3 + shadcn/ui (Radix UI primitives)
- **Icons:** lucide-react
- **Database:** Supabase (Postgres + Auth + RLS)
- **Auth:** Supabase Auth (email+password, magic link, password reset)
- **Deployment:** Vercel (planned)

## Test Accounts

**Account 1:**
- Email: test1@example.com
- Password: test123

**Account 2:**
- Email: test2@example.com
- Password: test123

(Create these accounts via signup page to test data isolation)

## Business Analysis

See `BUSINESS.md` for full market analysis, pricing hypothesis, CAC/LTV calculations, and competitive positioning.

**TL;DR:** Targeting freelance consultants managing 10-30 client projects. Wedge is client-centric task view (not available in Todoist/Notion without manual setup). Pricing: Free (5 todos) → $8/mo unlimited. Need 35% conversion to hit 77% gross margin. Biggest risk: activation failure (users sign up but never create first todo).

## Hours Spent

~6 hours total:
- 0.5h: Business analysis (BUSINESS.md)
- 1h: Setup (Supabase schema, shadcn/ui, env config)
- 1.5h: Auth system (context, pages, protected routes)
- 1.5h: Todo CRUD (data layer, UI components)
- 1h: Integration (/app page, filters, sorting)
- 0.5h: Testing and polish

## Links

- **BUSINESS.md:** Market analysis and pricing strategy
- **DECISIONS.md:** Technical and product decisions
- **supabase-schema.sql:** Database schema with RLS policies
