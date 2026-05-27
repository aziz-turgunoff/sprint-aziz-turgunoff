# Day 2: Multi-User Todo App with Auth

A full-featured todo application with Supabase authentication, RLS-isolated data, and complete CRUD operations.

## Live Demo

**[View Live App](https://day2-todo-app.vercel.app)** (Coming soon)

## Problem Statement

Knowledge workers waste 5-10 minutes daily context-switching between email, Slack, and todo apps. Existing solutions are either too expensive (Todoist $4/mo, Asana $10.99/mo) or too complex (Notion). We built a lightweight, fast, affordable todo app designed for individuals and small teams (1-20 people) to capture and track tasks without friction.

**Target user:** Project manager at a 10-person startup who needs to track 50+ tasks across multiple projects and share them with teammates.

## Features

✅ Email + Password authentication  
✅ Magic link sign-in  
✅ Password reset flow  
✅ Multi-user data isolation (RLS)  
✅ Create, read, update, delete todos  
✅ Filter by status (active/completed)  
✅ Filter by priority (low/med/high)  
✅ Sort by created date, due date, or priority  
✅ Inline title editing  
✅ Modal for full todo editing  
✅ Toggle complete status  
✅ Delete with confirmation  
✅ Empty states  
✅ Counter showing active/completed todos  
✅ Responsive design (mobile, tablet, desktop)  

## Tech Stack

- **Frontend:** React 19.0.0, Vite 6.0.11, TypeScript 5.7.3
- **Styling:** Tailwind CSS 3.4.17
- **Icons:** lucide-react
- **Backend:** Supabase (Postgres + Auth + RLS)
- **Deployment:** Vercel (coming soon)

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/aziz-turgunoff/sprint-day2-aziz-turgunoff.git
cd day2
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Create the database schema in Supabase:
   - Go to SQL Editor in Supabase dashboard
   - Run the SQL from `supabase-schema.sql`

6. Start the development server
```bash
npm run dev
```

Visit `http://localhost:5173` and sign up to get started.

## Test Accounts

For testing, you can create accounts directly in the app:

- **Email:** test@example.com
- **Password:** password123

Or use magic link authentication with any email.

## Database Schema

### todos table

```sql
create table todos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) <= 120),
  description text,
  due_date date,
  priority text not null default 'med' check (priority in ('low','med','high')),
  completed boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**RLS Policies:**
- Users can only view their own todos
- Users can only create/update/delete their own todos
- All operations scoped to `auth.uid() = user_id`

## Key Implementation Details

### Authentication Flow

1. **Sign Up:** Email + password validation, creates Supabase auth user
2. **Sign In:** Password or magic link authentication
3. **Password Reset:** Email-based reset flow with secure token
4. **Session Persistence:** Automatically restores session on page reload
5. **Protected Routes:** `/app` redirects to `/login` if not authenticated

### Data Isolation

- Every todo is tied to `user_id` via foreign key
- RLS policies enforce user isolation at the database level
- User A cannot see, modify, or delete User B's todos even with direct API calls

### UI/UX Features

- **Optimistic updates:** UI updates immediately, then syncs with server
- **Loading states:** Skeleton loaders and disabled buttons during operations
- **Error handling:** User-friendly error messages for all operations
- **Empty states:** Clear messaging when no todos exist
- **Responsive design:** Works on 375px (mobile), 768px (tablet), 1440px (desktop)

## Known Issues & Future Improvements

### Phase 2 Features

1. **Recurring todos** - Set todos to repeat daily/weekly/monthly
2. **Collaboration** - Share todos with team members
3. **Notifications** - Email/push reminders for due dates
4. **Attachments** - Upload files to todos
5. **Comments** - Add comments/notes to todos
6. **Tags** - Organize todos with custom tags
7. **Subtasks** - Break todos into smaller steps
8. **Time tracking** - Track time spent on todos

## Hours Spent

- Project setup & dependencies: 1 hour
- Auth implementation (signup/login/reset): 2.5 hours
- Todo CRUD operations: 2 hours
- Filtering & sorting: 1 hour
- UI/UX polish: 1.5 hours
- Testing & deployment setup: 1 hour

**Total: 9 hours**

## Documentation

- **[BUSINESS.md](./BUSINESS.md)** - Business analysis and market positioning
- **[DECISIONS.md](./DECISIONS.md)** - Technical decisions and tradeoffs

## Running Tests

```bash
npm run build
npm run preview
```

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```

Make sure to set environment variables in Vercel dashboard:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

**Steps:**
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel project settings
4. Vercel will auto-deploy on every push to main/master

**Live URL:** Will be provided after deployment

## Local Testing Checklist

Before deploying, verify:
- ✅ `npm run build` completes without errors
- ✅ `npm run preview` shows the app working
- ✅ All auth pages load (/login, /signup, /forgot-password)
- ✅ Routing works between pages
- ✅ Responsive design works on mobile (375px), tablet (768px), desktop (1440px)

## Support

For issues or questions, check the [GitHub Issues](https://github.com/aziz-turgunoff/sprint-day2-aziz-turgunoff/issues).
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
