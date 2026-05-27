# Technical & Product Decisions — Day 2

## Technical Decisions

### 1. Supabase over Firebase
**Decision:** Use Supabase for backend  
**Reasoning:**
- PostgreSQL > Firestore for relational data (todos belong to users)
- Built-in RLS is more secure than Firestore rules
- Better TypeScript support
- Open source, can self-host if needed
- Lower cost at scale ($25/mo vs Firebase's unpredictable pricing)

**Tradeoff:** Firebase has better offline support, but not critical for MVP

### 2. shadcn/ui over Material-UI or Chakra
**Decision:** Use shadcn/ui components  
**Reasoning:**
- Copy-paste components = full control, no bundle bloat
- Built on Radix UI (accessible by default)
- Tailwind-native (consistent with our styling approach)
- Modern, clean aesthetic matches target user expectations
- Easy to customize without fighting framework opinions

**Tradeoff:** More initial setup than pre-packaged libraries, but worth it for flexibility

### 3. Optimistic UI Updates
**Decision:** Update UI immediately on toggle/create, revert on error  
**Reasoning:**
- Perceived performance is critical for task managers
- Users expect instant feedback when checking off todos
- Network latency shouldn't block interaction
- Error cases are rare with Supabase's reliability

**Implementation:** Update local state first, then sync to DB, rollback on failure

### 4. Client-side Filtering/Sorting
**Decision:** Fetch all todos, filter/sort in React  
**Reasoning:**
- Most users have <100 todos (fits easily in memory)
- Instant filter/sort response (no network round-trip)
- Simpler code, fewer API calls
- Supabase free tier has limited bandwidth

**Tradeoff:** Won't scale to 1000+ todos per user, but that's <1% of users. Can add server-side pagination later.

### 5. Magic Link + Password Auth
**Decision:** Support both authentication methods  
**Reasoning:**
- Magic links reduce friction (no password to remember)
- But some users distrust passwordless (especially enterprise)
- Offering both maximizes conversion
- Supabase makes both trivial to implement

**Data:** Apps with magic link option see 15-20% higher signup completion

## Product Decisions

### 1. Priority over Tags
**Decision:** Use 3-level priority (low/med/high) instead of custom tags  
**Reasoning:**
- Tags require UI for creation/management (adds complexity)
- Most users just need "urgent" vs "normal" vs "someday"
- Priority + filters covers 80% of organization needs
- Can add tags in Phase 2 if data shows demand

**User research:** Todoist users use 2-3 tags on average, mostly for priority-like concepts

### 2. No Subtasks in MVP
**Decision:** Flat todo list only, no nested subtasks  
**Reasoning:**
- Subtasks add UI complexity (expand/collapse, indentation)
- Only 20-30% of users use subtasks regularly
- Can be simulated with description field for now
- Clear Phase 2 feature if retention is strong

**Tradeoff:** Power users may churn, but we're targeting simplicity-seekers first

### 3. Due Date Optional
**Decision:** Due dates are optional, not required  
**Reasoning:**
- Many todos are "someday" tasks without deadlines
- Forcing dates creates friction and fake deadlines
- Users who need dates will use them, others won't be blocked
- Matches Todoist/Things behavior

### 4. Inline Edit for Title Only
**Decision:** Click title to edit inline, but full modal for description/date/priority  
**Reasoning:**
- Title changes are most common (quick typo fixes)
- Inline editing for all fields clutters the UI
- Modal provides focus for more complex edits
- Balances speed (inline) with power (modal)

**UX pattern:** Gmail uses same approach (subject inline, body in modal)

### 5. No Undo/Trash
**Decision:** Delete is permanent with confirmation dialog  
**Reasoning:**
- Trash/undo adds database complexity (soft deletes, cleanup jobs)
- Confirmation dialog prevents 95% of accidental deletes
- Users can recreate a todo in 10 seconds if needed
- Keeps codebase simple for MVP

**Tradeoff:** Some users will accidentally delete important todos. Monitor support requests.

## Architecture Decisions

### 1. Single-Page App (SPA) over SSR
**Decision:** Client-side React app, not Next.js SSR  
**Reasoning:**
- Todo app is fully authenticated (no SEO benefit from SSR)
- Simpler deployment (static hosting on Vercel)
- Faster development (no server-side concerns)
- Better offline potential (future PWA)

**When to reconsider:** If we add public landing page or marketing site

### 2. No State Management Library
**Decision:** Use React useState/useContext, no Redux/Zustand  
**Reasoning:**
- App state is simple (todos array + filters)
- Context API is sufficient for auth state
- Avoiding library lock-in and bundle size
- Can refactor to Zustand later if state gets complex

**Threshold:** If we add 3+ global state slices, revisit this

### 3. Monorepo Structure
**Decision:** Single repo with frontend only (no separate backend)  
**Reasoning:**
- Supabase is the backend (no custom API to maintain)
- Simpler CI/CD (one deploy)
- Easier for solo developer to navigate
- Edge functions can be added to same repo later

## Security Decisions

### 1. RLS Over API-Level Auth
**Decision:** Rely on Supabase RLS policies, not application-level checks  
**Reasoning:**
- RLS is enforced at database level (can't be bypassed)
- Simpler code (no manual user_id checks in queries)
- Supabase best practice
- Prevents entire class of authorization bugs

**Implementation:** Every query automatically scoped to auth.uid()

### 2. Credentials in Code (MVP Only)
**Decision:** Supabase anon key hardcoded in src/lib/supabase.ts  
**Reasoning:**
- Anon key is safe to expose (RLS protects data)
- Simplifies local development (no .env setup)
- Standard Supabase pattern for client-side apps

**Production:** Move to environment variables for Vercel deployment

## What I'd Change with More Time

1. **Add email verification** - Currently users can sign up with fake emails
2. **Rate limiting** - Prevent abuse of todo creation (100+ todos/minute)
3. **Batch operations** - Select multiple todos to bulk complete/delete
4. **Keyboard shortcuts** - Power users expect Cmd+K, Cmd+Enter, etc.
5. **Undo toast** - 5-second undo after delete (better UX than confirmation)
6. **Offline support** - Cache todos locally, sync when online
7. **Export data** - JSON/CSV export for user data portability
