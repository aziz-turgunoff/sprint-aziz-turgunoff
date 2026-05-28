# DECISIONS.md - Day 1

## Build Approach: Direct Development vs Lovable

**Decision**: Build directly with React + Vite + TypeScript instead of using Lovable.

**Rationale**:
- Lovable account not available at sprint start
- Brief states "Lovable (primary)" but evaluation focuses on three layers: technical execution, business analysis, and communication
- Direct development gives us full control over code quality, architecture, and component structure
- We can still demonstrate all three evaluation layers effectively

**Tradeoff**:
- ❌ No Lovable prompt logs to export (required deliverable #3)
- ✅ Full control over code quality and patterns
- ✅ Faster iteration without AI builder intermediary
- ✅ Better demonstrates coding ability directly
- ✅ Clean, maintainable codebase with proper TypeScript types

**Mitigation**:
- Document all architectural decisions in this file
- Maintain detailed commit messages showing thought process
- Include this conversation log as "prompt log" equivalent
- Flag this deviation clearly in README and submission to Mubina

**Alternative considered**: Wait to set up Lovable account → rejected due to time constraint (6h remaining at start, setup could take 30-60 min)

---

## Component Architecture

**Decision**: Use shadcn/ui for accordion component, custom components for everything else.

**Rationale**:
- shadcn/ui provides accessible, well-tested accordion with Radix UI primitives
- Custom components for landing sections give us full design control
- Keeps bundle size reasonable (only importing what we need)
- Matches the brief's requirement for shadcn/ui usage

**Implementation**:
- Navigation: Custom with mobile hamburger menu
- Hero: Custom with gradient background
- Features: Custom grid with lucide-react icons
- Pricing: Custom cards with highlighted "Most Popular" tier
- FAQ: shadcn/ui Accordion component
- WaitlistForm: Custom with Supabase integration
- Footer: Custom minimal footer

---

## Styling Approach

**Decision**: Tailwind CSS utility-first, no custom CSS files beyond index.css.

**Rationale**:
- Brief requires Tailwind CSS
- Utility-first keeps styles colocated with components
- Easier to maintain and modify
- No CSS specificity issues
- Responsive design with Tailwind breakpoints (sm/md/lg)

**Breakpoints tested**:
- 375px (mobile): Single column, stacked layout, hamburger menu
- 768px (tablet): 2-column grids, expanded navigation
- 1440px (desktop): 3-column grids, full layout

---

## Business Positioning Decisions

**Decision**: Position Stacklet as "ops-team-first" alternative to Retool, not a direct competitor.

**Rationale** (from BUSINESS.md):
- Retool owns the developer market (80% brand awareness)
- Wedge strategy: target ops managers who tried Retool and bounced (too complex)
- Pricing undercuts Retool by 70% for small teams ($49 vs $100/mo for 10 users)
- Differentiate on simplicity and speed, not just price

**Copy decisions**:
- Headline emphasizes speed: "Build internal tools in hours, not months"
- Subheadline targets ops teams: "Stop waiting on engineering"
- Features focus on no-code workflows, not developer tools
- FAQ directly addresses "How is this different from Retool?"

---

## Pricing Strategy

**Decision**: Free / $49 / $199 tiers (not the $29/$79 from initial BUSINESS.md draft).

**Rationale**:
- Aligned with final BUSINESS.md analysis
- Free tier: land users, prove value (1 tool, 2 users)
- Starter $49: undercuts Retool significantly, targets 5-10 person teams
- Pro $199: competitive for 25+ users, includes enterprise features (SSO, audit logs)
- Highlighted "Starter" as most popular (sweet spot for target ICP)

**Alternative considered**: Lower pricing ($29/$79) → rejected because margins too thin at scale, doesn't signal enterprise-ready product

---

## Form Validation Strategy

**Decision**: Client-side validation only for Day 1, server-side validation implicit in Supabase RLS.

**Rationale**:
- HTML5 email validation (type="email", required)
- Role dropdown prevents invalid values
- Supabase unique constraint handles duplicate emails
- Error message for duplicates: "You're already on the list" (not raw 409)
- 3-second button disable after success (per brief requirement)

**What we'd add in production**:
- Server-side email format validation
- Rate limiting (prevent spam submissions)
- CAPTCHA for public forms
- Email verification flow

---

## Icon Library Issue

**Decision**: Removed Github and Linkedin icons from Footer, kept Mail icon only.

**Rationale**:
- lucide-react export names didn't match expected (Github/Linkedin not found)
- Rather than debug icon names, simplified to Mail icon only
- Footer social links are decorative for Day 1 (fictional product)
- Prioritized working page over perfect icon set

**Time saved**: ~10 minutes debugging icon imports, used for testing instead

---

## Supabase Integration

**Decision**: Supabase client-side integration with RLS policies, no Edge Functions for Day 1.

**Rationale**:
- Brief requires waitlist form writing to Supabase
- RLS policies sufficient for Day 1 security (anon insert only, no select)
- Client-side integration simpler and faster to implement
- Edge Functions would add complexity without value for simple insert

**Schema design**:
- UUID primary key with auto-generation
- Email unique constraint (handles duplicates)
- Role required (business requirement)
- Company optional (reduces friction)
- Timestamp for analytics

**Security**:
- RLS enabled on table
- Anonymous users can insert only (no read access)
- Unique constraint prevents duplicate emails
- No sensitive data stored (just email, role, company)

---

## Time Allocation (Actual)

- Business framing: 30 min ✅
- Setup & dependencies: 20 min ✅
- Component development: 90 min ✅
- Debugging (icon imports): 10 min ✅
- Testing (responsive, FAQ accordion): 20 min ✅
- **Total so far**: ~2h 50min
- **Remaining**: Documentation, deployment, demo video (~2h)

**On track for 4-6h target.**
