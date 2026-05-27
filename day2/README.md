# Day 2 - Multi-User Todo App

A full-stack todo application with authentication, built with React, TypeScript, Supabase, and shadcn/ui.

## 🚀 Live Demo

[Live URL will be added after Vercel deployment]

## ✨ Features

### Authentication
- ✅ Email + Password signup and login
- ✅ Magic link (passwordless) authentication
- ✅ Password reset flow
- ✅ Session persistence across page reloads
- ✅ Protected routes with automatic redirect

### Todo Management
- ✅ Create todos with title, description, due date, and priority
- ✅ Mark todos as complete/incomplete
- ✅ Edit todos inline or via modal
- ✅ Delete todos with confirmation dialog
- ✅ Filter by status (All / Active / Completed)
- ✅ Sort by date created, due date, or priority
- ✅ Real-time updates from Supabase
- ✅ User-isolated data with Row Level Security (RLS)

### UI/UX
- ✅ Clean, modern interface with shadcn/ui components
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and empty states
- ✅ Form validation with helpful error messages
- ✅ Priority badges with color coding
- ✅ Optimistic UI updates

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Routing**: React Router v7
- **Deployment**: Vercel

## 📦 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Git

### 1. Clone the repository
```bash
git clone https://github.com/aziz-turgunoff/sprint-aziz-turgunoff.git
cd sprint-aziz-turgunoff/day2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy your project URL and anon key
4. Run the SQL schema from `supabase-schema.sql` in the SQL Editor

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for production

```bash
npm run build
npm run preview
```

## 🗄️ Database Schema

The app uses a single `todos` table with Row Level Security:

```sql
- id: uuid (primary key)
- user_id: uuid (references auth.users)
- title: text (max 120 chars)
- description: text (optional)
- due_date: date (optional)
- priority: 'low' | 'med' | 'high'
- completed: boolean
- created_at: timestamptz
- updated_at: timestamptz
```

**RLS Policies**: Users can only view, create, update, and delete their own todos.

## 🏗️ Project Structure

```
day2/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Global auth state
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   └── AppPage.tsx      # Main todo app
│   ├── App.tsx              # Router setup
│   └── main.tsx
├── supabase-schema.sql      # Database schema
└── package.json
```

## 🔐 Authentication Flow

1. **Signup**: User creates account → Email confirmation sent → Redirect to login
2. **Login**: Email + password OR magic link → Redirect to /app
3. **Password Reset**: Request reset → Email sent → Click link → Set new password
4. **Session**: Persisted in localStorage, auto-refresh on page load

## 🎨 UI Components

Built with shadcn/ui for consistency and accessibility:
- Button, Input, Label, Textarea
- Card, Dialog, AlertDialog
- Select, Checkbox
- All components are customizable via Tailwind

## 📝 Known Issues

None currently. All features tested and working.

## 🚀 Deployment

### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
4. Deploy

## 📊 Time Investment

**Estimated**: 6-8 hours
**Actual**: [To be filled after completion]

## 📄 Documentation

- [BUSINESS.md](./BUSINESS.md) - Business analysis and pricing strategy
- [DECISIONS.md](./DECISIONS.md) - Technical decisions and rationale
- [supabase-schema.sql](./supabase-schema.sql) - Database schema

## 🧪 Test Accounts

After deployment, create test accounts:
- User A: usera@test.com / password123
- User B: userb@test.com / password123

Verify data isolation between users.

## 🤝 Contributing

This is a sprint project for evaluation. Not accepting contributions.

## 📜 License

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
