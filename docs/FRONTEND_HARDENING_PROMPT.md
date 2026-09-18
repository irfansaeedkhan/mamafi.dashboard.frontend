# Frontend Hardening & Demo-Ready Prompt

You are a senior fullstack engineer. Take this frontend from “rough / broken / incomplete” to a clean, buildable, demo-ready app **in one continuous pass**. Do not redesign the UI.

## How to work (critical)

* Treat this as **one job**, not a phased project. Do **not** stop after inspection, cleanup, mocks, or “phase N”.
* Keep going until **every item below is done or explicitly marked N/A** for this repo.
* Do not ask “ready for the next phase?” — finish the full checklist, then report once.
* Prefer logic/layout/alignment fixes over redesign. Do not change colors, borders, spacing system, or layout structure unless needed to fix a clear bug.
* Use the repo’s package manager (yarn / npm / pnpm). Prefer `yarn` when the repo already uses it.
* Never commit secrets (`.env`). Public demo env is OK only if values are non-secret.
* When asked to push/deploy: run production build, fix until green, **then** commit/push. Never push a failed build.

## Fill in before starting (project brief)

* **Product type:** (landing / marketing / SaaS dashboard / e-commerce / docs / other)
* **Package manager:** (yarn / npm / pnpm)
* **Framework:** (Next.js App Router / Pages / Vite+React / other)
* **Priority routes/screens:** (list 3–8)
* **Deploy URLs:** landing = `…` · app = `…` (or N/A)
* **Contact for demo CTAs:** email / form URL (not social unless asked)
* **Demo mode:** mock API path (example `/api/mock`) · or static-only
* **Git remote / branch:** (example `origin main`)
* **Do not redesign UI:** yes

---

## Complete all of the following (continue until done)

### Inspect (do this first, then keep working — do not stop)

Map `app/` or `src/`, `components/`, `lib/`, `stores/`, `utils/`, `public/`. Note framework/React/TS versions, package manager, Node `engines` vs installed Node. Find auth, tables, modals, pagination, forms, charts, marketing sections, API clients, hidden/disabled routes (`*-disabled`, commented nav, feature flags). Check `.gitignore`, env files, README, remotes, and current build/dev errors.

### Cleanup & stability

Remove noisy `console.log` in hot paths; keep useful error logs. Fix broken imports that block build or cause bugs. Align TypeScript/ESLint/framework config with current versions. Fix deprecated config (example: Next `images.domains` → `images.remotePatterns`). Fix image aspect-ratio warnings (`width`/`height` match render size; use height + `width: auto` when CSS changes one side). Keep auth/middleware working; prefer the project’s current convention (example: Next 16 `proxy.ts`) over speculative renames. Auth in demo must work: protected routes → login; auth pages when logged in → app; `/` resolves correctly. Align Node `engines` with real runtime (avoid `20.x`-only if machine is 22/24); add `.nvmrc` if helpful. Do not delete framework-owned stubs (example: `next-env.d.ts`). Refresh README: purpose, stack, scripts, env, structure, run/build, deploy URLs.

### Framework upgrade (only if asked)

Upgrade carefully without UI redesign; update peers; preserve bundler/image/SVG behavior; keep auth working; fix type breakages minimally; prove with production build. If risky, stop the upgrade, report blockers, and continue the rest of this checklist on the stable version.

### UI accuracy (desktop + mobile)

Fix positioning/alignment on priority surfaces: icon+value alignment; value columns; modal/form groups that must not overlap (amount + chip + MAX/suffix); long decimals/strings; float noise like `7.800000000000001` via `toFixed` or shared formatter; label-left/value-right list rows; status badges for all known statuses; clear empty states; no overlapping controls on small screens; landing hero/nav/footer/CTAs must not collide. Fix with flex/grid/`items-center`/`justify-between`/`shrink-0`/`min-w-0` (or existing utilities). Do not invent new styles. Check desktop and mobile.

### Interactions must work

Login/logout/redirects (if auth). Modals/drawers. Forms with loading + success/error. Derived fields (fees, totals, MAX). Tabs/filters/dropdowns/search. Copy/share. Download/export (client-generated OK for demo). Primary nav (sidebar/header/footer/mobile). Restore hidden routes when real pages already exist (nav/constants pointing at 404 or “coming soon”). Pagination: disable Previous on first page; disable Next on last page or when no more data; never enable Next when total pages ≤ 1. **Critical:** with “external pagination”, either pass already-sliced rows **or** use internal slice — never full list + external page controls (same rows every page). Every visible button either does a real demo action or shows a clear demo-only toast. No dead controls on the main demo path.

### Dummy data + local mocks (skip if static-only)

Keep existing API client. Add mock adapter or route handlers in a clear place (`lib/mock-data.ts`, `app/api/mock/[...path]/route.ts`, or equivalent). Support the app’s real page params (`page`, `Page`, `offset`, `limit`, path ranges). Point demo env API bases at mock — no leftover staging/production hosts. Enough rows for ≥2 pages on major lists (prefer 12+ at the UI page size). Realistic domain data; consistent page size; slice in mock **and** verify UI rows change per page. Edge cases: statuses, long decimals, empty optionals. Coherent values across cards/charts/lists/profile. Document demo credentials if roles exist. Wire refresh/pagination to mocks. For static marketing sites: skip mocks; still fix links, forms, and placeholders.

### Performance (practical)

No mount-loop refetches. Scope page fetches to page deps. Shared mock helpers instead of giant inline fixtures. Don’t casually break existing SSG/caching. Lazy-load heavy charts only if it matches project patterns. Do **not** wrap above-the-fold content in `React.lazy` + full-page Suspense if that sticks the UI on a skeleton. Initial load must always leave loading states: HTTP timeout (~12s), safety timer (~8s), never lock `document.body` overflow forever. Prefer timeouts + `Promise.allSettled` over fragile GET caches. Prefetch primary nav when supported. Fix duplicate data-setting races. Size images correctly. Do not sprinkle `useMemo`/`useCallback` unless it clearly helps or matches existing style.

### Build, prove, fix

Install deps → `dev` boots key routes → production `build` succeeds → fix every TS/build blocker → re-test: auth, primary screen (not stuck on skeleton), main modals/tables/forms, pagination with **different rows per page**, restored hidden pages, mobile + desktop. On build failure: diagnose, minimal fix, rebuild until green. On port/lock conflicts: kill conflicting PIDs, remove stale locks (example `.next/dev/lock`), restart one clean dev server. Watch for: bad cache, React 19 RefObject typing, image warnings, pagination mismatches, missing statuses, overlapping controls, engines mismatch.

### Git / deploy (when requested)

`.env` ignored; demo env non-secret only. Meaningful README. Commit with why-focused message. **Always production-build, then push only if green.** Deploy warnings non-blocking unless they fail deploy. Pin Node engines to a workable range (example `>=20 <25`) unless team pins one major. Optional Cursor rule: build-then-push.

When the owner provides deploy URLs, update them everywhere: env vars, metadata/OG/canonical, share/referral bases, legal/footer old hosts, README.

Contact copy: use the owner’s real email/support URL. Do not invent brand inboxes or send support to social unless asked. Optional `NEXT_PUBLIC_CONTACT_EMAIL` (or equivalent).

---

## Done only when

1. Priority screens work on desktop and mobile without layout breakers
2. Interactions on the main demo path are live (or clearly demo-toasted)
3. Mocks (if required) power lists with real multi-page pagination
4. Hidden pages that already exist are restored where relevant
5. Primary screen does not stick on a loader/skeleton
6. Production build is green
7. Code is pushed only if requested (and only after green build)
8. You have written the final report below — **one report at the end**, not after each section

## Final report (single message at the end)

1. What was broken
2. What you fixed (cleanup, UI, functionality, mocks, performance, build, URLs/contact)
3. How to run locally
4. Remaining warnings (if any) and whether safe
5. Confirmation production build passed
6. Confirmation push happened (if requested)

## Hard constraints

* Do not redesign UI or invent brand styling
* Do not delete/alter major layout structure without asking
* Do not commit secrets
* Do not leave pagination/buttons half-working
* Do not ship without a successful production build when asked to push/deploy
* Do not leave the primary screen stuck on a loader/skeleton
* Do not leave real backend hosts in demo env when mock mode is required
* Do not stop mid-checklist to “await next phase”
