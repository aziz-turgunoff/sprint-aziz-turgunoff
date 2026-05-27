# Technical Decisions — Day 2

## Architecture Decisions

### 1. React Router for Client-Side Routing

**Decision:** Use React Router v6 for navigation between auth pages and app

**Rationale:**
- Standard in React ecosystem
- Handles protected routes elegantly
- Supports programmatic navigation (redirect after login)
- Smaller bundle than Next.js for this use case

**Alternative considered:** Next.js App Router
- Would add 2-3 hours of setup
- Overkill for a single-page app with simple routing
- Better for SEO (not needed for authenticated app)

---

### 2. Supabase Auth with Email + Magic Link

**Decision:** Support both password and magic link authentication

**Rationale:**
- **Password:** Familiar to users, works offline
- **Magic link:** Passwordless, reduces friction, better security (no password reuse)
- Supabase handles both natively, no extra work

**Alternative considered:** OAuth (Google, GitHub)
- Would reduce signup friction
- But adds complexity (OAuth flow, account linking)
- Better to add after core auth is proven

---

### 3. Row-Level Security (RLS) for Data Isolation

**Decision:** Use Supabase RLS policies to enforce user isolation at database level

**Rationale:**
- **Security:** Even if API is compromised, users can't access each other's data
- **Simplicity:** No need for server-side authorization logic
- **Performance:** Database enforces rules, no extra API calls
- **Compliance:** Meets GDPR/privacy requirements

**RLS Policies:**
```sql
-- Users can only see their own todos
create policy "Users can view their own todos"
  on todos for select
  using (auth.uid() = user_id);
```

**Alternative considered:** Server-side authorization
- Would require backend API
- More complex, more points of failure
- Slower (extra API call per request)

---

### 4. Context API for Auth State

**Decision:** Use React Context API to manage auth state globally

**Rationale:**
- Built into React, no extra dependencies
- Sufficient for this app's complexity
- Avoids prop drilling (passing auth through 5+ components)
- Easy to test

**Alternative considered:** Redux or Zustand
- Overkill for a single auth context
- Would add 2+ hours of setup
- Better for apps with 10+ global state slices

---

### 5. Tailwind CSS for Styling

**Decision:** Use Tailwind CSS for all styling

**Rationale:**
- Utility-first approach is fast for prototyping
- Consistent design system (colors, spacing, typography)
- Small bundle size (tree-shaking removes unused utilities)
- Responsive design built-in (mobile-first)

**Alternative considered:** shadcn/ui
- Would add pre-built components (Button, Input, etc.)
- But adds 1-2 hours of setup
- Tailwind is sufficient for this app

---

## Feature Decisions

### 1. Inline Title Editing vs Modal

**Decision:** Support both inline editing (title) and modal editing (full form)

**Rationale:**
- **Inline:** Fast for quick edits, reduces clicks
- **Modal:** Better for complex edits (description, due date, priority)
- Users can choose based on their workflow

---

### 2. Filter + Sort Separately

**Decision:** Separate filter controls (status, priority) from sort controls

**Rationale:**
- Clearer UX: Users understand what each control does
- More flexible: Can filter by status AND sort by priority
- Alternative (combined): Would be confusing (e.g., "Sort by: Active + High Priority")

---

### 3. Confirmation Dialog for Delete

**Decision:** Show browser confirm() dialog before deleting

**Rationale:**
- Prevents accidental deletion
- Simple, no extra UI needed
- Alternative (custom modal): Would add 30 minutes of work for minimal UX gain

---

### 4. Counter in Header

**Decision:** Show "X active, Y completed" counter in header

**Rationale:**
- Gives users a sense of progress
- Motivates completion (gamification)
- Reduces need to scroll to see stats

---

## Performance Decisions

### 1. Fetch All Todos on Load

**Decision:** Load all todos on app mount, then filter/sort client-side

**Rationale:**
- Simpler implementation (no pagination logic)
- Faster filtering/sorting (no API calls)
- Works for <1000 todos (typical user has 50-200)

**When to change:** If users have 10k+ todos, implement pagination or infinite scroll

---

### 2. Refetch After Every Mutation

**Decision:** After create/update/delete, refetch all todos from server

**Rationale:**
- Ensures UI stays in sync with server
- Handles edge cases (concurrent edits, server-side validation)
- Simple, no optimistic update bugs

**Alternative considered:** Optimistic updates
- Would feel faster (instant UI update)
- But adds complexity (rollback on error, conflict resolution)
- Better to add after core functionality is proven

---

## Security Decisions

### 1. API Key in Frontend

**Decision:** Use Supabase anon key in frontend (public)

**Rationale:**
- Supabase anon key is intentionally public
- RLS policies enforce authorization at database level
- No sensitive data in frontend code

**What NOT to do:** Never put service role key in frontend (would bypass RLS)

---

### 2. Password Reset Flow

**Decision:** Use Supabase's built-in password reset (email link)

**Rationale:**
- Secure: Token is time-limited and one-time use
- User-friendly: No need to remember old password
- Supabase handles all the complexity

---

## Testing Decisions

### 1. Manual Testing with 2 Accounts

**Decision:** Test data isolation by creating 2 accounts and verifying User A can't see User B's todos

**Rationale:**
- Catches RLS bugs early
- Simple, no test framework needed
- Critical for security

**When to add:** Automated tests after product-market fit

---

## What I'd Do Differently

1. **Add optimistic updates** — Would make the app feel faster
2. **Add pagination** — For users with 1000+ todos
3. **Add real-time sync** — Using Supabase subscriptions, so edits from other tabs/devices appear instantly
4. **Add offline support** — Using service workers, so users can create todos offline
5. **Add analytics** — Track activation, engagement, churn to validate business hypotheses
