# Day 2 - Todo App with Authentication

A full-stack todo application with multi-user authentication, built with React, TypeScript, Vite, Tailwind CSS, shadcn/ui, and Supabase.

## Problem Statement

Solo entrepreneurs and small team leads need a simple, fast task manager without the complexity of Notion or the cost of Todoist. This app provides a clean, focused todo experience with proper authentication and data isolation.

## Live Demo

🚀 **Live URL:** [Coming soon - will be deployed to Vercel]

## Features

### Authentication ✅
- [x] Email + password signup/login
- [x] Magic link authentication (passwordless)
- [x] Password reset flow
- [x] Protected routes with session persistence
- [x] No flash of unauthenticated content

### Todo Management ✅
- [x] Create todos with title (max 120 chars), description, due date, priority
- [x] Inline title editing
- [x] Full modal editing for all fields
- [x] Toggle completion with optimistic UI
- [x] Delete with confirmation dialog
- [x] Character counter on title input

### Filtering & Sorting ✅
- [x] Filter by status (all/active/completed)
- [x] Filter by priority (all/low/med/high)
- [x] Sort by created date, due date, or priority
- [x] Real-time counter showing active/completed todos

### UI/UX ✅
- [x] Clean, modern interface with shadcn/ui components
- [x] Responsive design (mobile, tablet, desktop)
- [x] Empty state messaging
- [x] Loading states and skeletons
- [x] Priority color coding (red/yellow/green)
- [x] Optimistic UI updates

### Security ✅
- [x] Row Level Security (RLS) - users can only see their own todos
- [x] User isolation verified with 2 test accounts
- [x] Secure session management

## Tech Stack

- **Frontend:** React 19.0.0, TypeScript 6.0.2, Vite 8.0.12
- **Styling:** Tailwind CSS 4.3.0
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Backend:** Supabase (PostgreSQL + Auth + RLS)
- **Routing:** React Router DOM 7.15.1
- **Deployment:** Vercel

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

```bash
# Install dependencies
npm install

# Run database schema
# Go to Supabase SQL Editor and run the contents of supabase-schema.sql

# Start development server
npm run dev

# Build for production
npm run build
```

### Database Setup

1. Go to your Supabase project SQL Editor
2. Run the SQL from `supabase-schema.sql`
3. This creates the `todos` table with RLS policies

## Test Accounts

Create your own test accounts by signing up at `/signup`

**Test isolation:**
1. Sign up as user1@test.com
2. Create some todos
3. Sign out
4. Sign up as user2@test.com
5. Verify you cannot see user1's todos

## Known Issues

- [ ] Magic link redirect needs production URL configuration in Supabase
- [ ] No mobile app (web-responsive only)
- [ ] No recurring tasks
- [ ] No team collaboration features

## What I'd Fix Next

1. **Add recurring tasks** - High user demand, clear value
2. **Email integration** - Forward emails to create todos
3. **Keyboard shortcuts** - Quick add with Cmd+K
4. **Bulk operations** - Select multiple todos to complete/delete
5. **Dark mode** - Already have Tailwind setup, just need toggle

## Hours Spent

**Estimated:** 6-8 hours  
**Actual:** [To be filled after completion]

- Planning & business analysis: 1h
- Database schema & RLS setup: 0.5h
- Authentication system: 1.5h
- Todo CRUD operations: 2h
- UI/UX with shadcn/ui: 1.5h
- Testing & bug fixes: 1h
- Documentation: 0.5h

## Documentation

- [BUSINESS.md](./BUSINESS.md) - Business analysis and monetization strategy
- [DECISIONS.md](./DECISIONS.md) - Technical and product decisions
- [supabase-schema.sql](./supabase-schema.sql) - Database schema with RLS

## Repository

**GitHub:** [Coming soon - will be pushed after local testing]

## License

MIT
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
