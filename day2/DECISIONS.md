# Technical Decisions — Day 2

## Architecture Decisions

### 1. Auth Strategy: Supabase Auth vs Custom JWT

**Decision:** Use Supabase Auth (email+password + magic link)

**Rationale:**
- Built-in session management (no need to handle refresh tokens manually)
- Magic link support out of the box (would take 3-4 hours to build custom)
- Password reset flow included (email templates, secure token generation)
- RLS integration (auth.uid() works seamlessly with Postgres policies)
- Time savings: ~6 hours vs building custom JWT system

**Tradeoff:** Vendor lock-in to Supabase. If we migrate to another backend, auth needs rewrite.

**Alternative considered:** Custom JWT with bcrypt + nodemailer. Rejected because it's reinventing the wheel and adds 6+ hours to Day 2 scope.

---

### 2. State Management: React Context vs Zustand/Redux

**Decision:** React Context for auth, local state for todos

**Rationale:**
- Auth state is simple (user object + session) and changes infrequently
- Todo state is fetched fresh on every filter change (no complex client-side cache needed)
- Context API is sufficient for passing auth down the tree
- Zustand/Redux adds 200KB+ bundle size and learning curve for minimal benefit

**Tradeoff:** If we add real-time sync or offline support, we'd need a more robust state solution (e.g., Zustand + Immer for optimistic updates).

**Alternative considered:** Zustand for global state. Rejected because Day 2 scope doesn't justify the complexity.

---

### 3. Inline Edit: Click-to-Edit vs Always-Editable

**Decision:** Click title to edit, blur/Enter to save, Escape to cancel

**Rationale:**
- Prevents accidental edits (always-editable fields are error-prone on mobile)
- Clear visual distinction between view and edit modes
- Familiar pattern (Notion, Todoist, Asana all use click-to-edit)

**Tradeoff:** Requires one extra click to edit. Power users might prefer always-editable.

**Alternative considered:** Always-editable title field (like Google Docs). Rejected because mobile users would accidentally trigger edits while scrolling.

---

### 4. Filters: Client-Side vs Server-Side

**Decision:** Server-side filtering via Supabase query builder

**Rationale:**
- Scales better (if user has 1000+ todos, client-side filtering would be slow)
- Reduces data transfer (only fetch filtered results, not all todos)
- Leverages Postgres indexes (faster than JS array filtering)

**Tradeoff:** Every filter change triggers a network request. Feels slightly slower than instant client-side filtering.

**Alternative considered:** Fetch all todos once, filter client-side. Rejected because it doesn't scale and wastes bandwidth.

---

### 5. Real-Time Updates: Supabase Subscriptions vs Manual Refresh

**Decision:** Manual refresh (no real-time for MVP)

**Rationale:**
- Day 2 brief doesn't require real-time
- Supabase subscriptions add complexity (need to handle insert/update/delete events separately)
- Solo users don't need real-time (they're the only one editing their todos)
- Time savings: ~2 hours

**Tradeoff:** If user has app open in multiple tabs, changes in one tab won't reflect in the other until refresh.

**Alternative considered:** Supabase real-time subscriptions. Deferred to Phase 2 (would add for teams feature).

---

### 6. Delete Confirmation: Dialog vs Undo Toast

**Decision:** AlertDialog confirmation before delete

**Rationale:**
- Prevents accidental deletes (especially on mobile where tap targets are small)
- Familiar pattern (most apps use confirmation dialogs for destructive actions)
- shadcn/ui AlertDialog is already installed

**Tradeoff:** Adds friction (two clicks to delete). Power users might find it annoying.

**Alternative considered:** Delete immediately + show "Undo" toast for 5 seconds. Rejected because it requires soft delete (deleted_at column) and undo logic, adding 2-3 hours.

---

### 7. Form Validation: Client-Side Only vs Client + Server

**Decision:** Client-side validation only (HTML5 + React state)

**Rationale:**
- Supabase handles server-side validation via CHECK constraints (title max 120 chars, priority enum)
- Client-side validation provides instant feedback (no network round-trip)
- Day 2 scope doesn't require complex validation (no credit cards, phone numbers, etc.)

**Tradeoff:** If someone bypasses client-side validation (e.g., via API), Supabase will reject it, but error message is less user-friendly.

**Alternative considered:** Zod schema validation on both client and server. Rejected because it's overkill for simple forms.

---

### 8. Routing: react-router-dom vs TanStack Router

**Decision:** react-router-dom v7

**Rationale:**
- Already installed in package.json (Day 2 scaffold included it)
- Mature, stable, well-documented
- Supports all required features (protected routes, redirects, params)

**Tradeoff:** TanStack Router has better TypeScript support and type-safe routes, but it's newer and less familiar.

**Alternative considered:** TanStack Router. Rejected because react-router-dom is already set up and works fine.

---

### 9. Styling: Tailwind v3 vs v4

**Decision:** Tailwind v3 (downgraded from v4)

**Rationale:**
- shadcn/ui doesn't support Tailwind v4 yet (init command fails)
- v3 is stable and well-supported
- v4 is still in beta (as of May 2026)

**Tradeoff:** Missing v4 features (e.g., new color palette, improved JIT). Not critical for Day 2.

**Alternative considered:** Wait for shadcn/ui to support v4. Rejected because it would block Day 2 progress.

---

### 10. Priority Field: Enum vs Freeform Text

**Decision:** Enum with 3 values (low, med, high)

**Rationale:**
- Prevents typos (user can't enter "meduim" or "urgent")
- Enables filtering (can't filter freeform text reliably)
- Postgres CHECK constraint enforces valid values
- Simple UI (dropdown with 3 options)

**Tradeoff:** Less flexible (can't add custom priority levels like "critical" or "someday"). Good enough for MVP.

**Alternative considered:** Freeform text field. Rejected because it's error-prone and hard to filter.

---

## Product Decisions

### 11. Activation Moment: First Todo Created vs First Todo Completed

**Decision:** First todo with due date set = activated user

**Rationale:**
- Creating a todo with a due date shows intent (user is planning ahead, not just testing)
- Completing a todo requires waiting (user might sign up, create todo, then leave before completing)
- Faster feedback loop (can measure activation within minutes of signup)

**Tradeoff:** Some users might create a todo with due date but never return. Completion is a stronger signal of engagement.

**Alternative considered:** First completed todo. Deferred to W1 retention metric instead.

---

### 12. Free Tier Limit: 5 vs 10 vs 15 Todos

**Decision:** 5 active todos (completed todos don't count)

**Rationale:**
- Forces decision point within 1-2 weeks (freelancers typically have 5-10 active tasks)
- Encourages completion (users will complete tasks to free up slots, not delete them)
- Aggressive enough to drive conversion (10-15 is too generous, users stay free forever)

**Tradeoff:** Might feel too restrictive for power users. Risk of churn if limit feels arbitrary.

**Alternative considered:** 10 active todos. Rejected because unit economics don't work (need 35% conversion, 10-todo limit would drop it to 15%).

---

### 13. Pricing: $5/mo vs $8/mo vs $10/mo

**Decision:** $8/mo for unlimited todos

**Rationale:**
- Todoist is $4/mo (we need to be higher to signal more value)
- $10/mo crosses psychological threshold ("is this worth it?")
- $8/mo is impulse-buy territory (no approval needed for freelancers)
- Unit economics: 35% conversion at $8/mo = 77% gross margin (viable)

**Tradeoff:** Might be too expensive for very light users (1-2 todos/week). But those users aren't our target market.

**Alternative considered:** $5/mo. Rejected because gross margin drops to 63% (too low for SaaS).

---

## Summary

Key decisions prioritized **speed** (use Supabase Auth, skip real-time, client-side validation) and **simplicity** (Context over Zustand, enum over freeform, 3 priority levels). Tradeoffs are acceptable for Day 2 MVP—most can be revisited in Phase 2 based on user feedback.
