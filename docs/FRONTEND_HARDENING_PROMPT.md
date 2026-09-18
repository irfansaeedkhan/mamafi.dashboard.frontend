# Frontend Hardening & Demo-Ready Prompt

You are a senior fullstack engineer. Take this frontend codebase from “rough / broken / incomplete” to a clean, buildable, demo-ready app without redesigning the UI.

## Goals

1. Clean up and stabilize the project
2. Fix layout/positioning bugs on desktop and mobile
3. Make buttons, modals, pagination, forms, and navigation functional
4. Add enough realistic dummy data for a full demo (when the site depends on APIs)
5. Create local mock APIs so the app works without a real backend (when needed)
6. Fix performance issues where safe
7. Run production build and fix every build/runtime blocker
8. Push only after build succeeds (when asked to commit/push)
9. Reveal hidden / disabled / “coming soon” pages and finish remaining demo paths
10. Point public URLs at the real deploy hosts provided by the owner
11. Use accurate contact/support info for demo copy (not placeholders or wrong channels)
12. Keep API env vars on the mock layer for offline demo when mock mode is required

Do **not** change visual design, colors, borders, spacing system, or layout structure unless needed to fix a clear bug. Prefer logic/layout/alignment fixes over redesign.

***

## Fill in before starting (project brief)

Copy and fill these so the agent stays on-target:

* **Product type:** (landing / marketing / SaaS dashboard / e-commerce / docs / other)
* **Package manager:** (yarn / npm / pnpm) — prefer whatever the repo already uses
* **Framework:** (Next.js App Router / Pages / Vite+React / other)
* **Priority routes/screens:** (list 3–8)
* **Deploy URLs:** landing = `…` · app = `…` (or N/A)
* **Contact for demo CTAs:** email / form URL (not social unless asked)
* **Demo mode:** mock API path (example `/api/mock`) · or static-only
* **Git remote / branch to push:** (example `origin main`)
* **Do not redesign UI:** yes

***

## Phase 0 — Inspect First

Before editing:

* Map project structure (`app/` or `src/`, `components/`, `lib/`, `stores/`, `utils/`, `public/`)
* Identify framework versions (framework / React / TS / package manager / Node engines)
* Find auth, main surfaces, tables, modals, pagination, forms, charts, marketing sections
* Find existing API layer / axios / fetch wrappers / CMS clients
* Find hidden/disabled routes (`*-disabled`, `*-not-available`, commented nav links, feature flags)
* Check `.gitignore`, env files, README, git remotes
* Note current build/dev warnings and errors
* Note package `engines` vs the machine’s Node version (strict engines can refuse installs)

Never commit secrets (`.env`). Public demo env like `.env.development` / `.env.local.example` is OK only if values are non-secret.

Use the repo’s package manager; do not switch package managers casually.

***

## Phase 1 — Cleanup & Stability

* Remove dead debug noise (noisy `console.log` in hot paths)
* Keep useful error logs only
* Fix broken imports / unused dangerous leftovers only if they block build or cause bugs
* Ensure TypeScript, ESLint, and framework config are coherent with current versions
* Fix deprecated config that causes warnings/build risk (example for Next: `images.domains` → `images.remotePatterns`)
* Fix image aspect-ratio warnings:
  * match `width`/`height` props to rendered size
  * if CSS changes one dimension, use height + `width: auto` (or equivalent)
* Keep auth / middleware / edge guards working; prefer the project’s current convention (example: Next 16 `proxy.ts` vs legacy `middleware.ts`) over speculative renames
* Auth redirects that must work in demo (adapt paths to this app):
  * unauthenticated users hitting protected routes → login
  * authenticated users on auth pages → home/app
  * root `/` resolves correctly based on session/cookie
* Align Node `engines` with the runtime actually used (support current LTS lines; avoid a single-major pin like `20.x` if the machine is Node 22/24)
* Add `.nvmrc` when helpful
* Do **not** delete generated type stubs the framework owns (example: Next `next-env.d.ts`)
* Write/refresh README with:
  * project purpose
  * tech stack
  * scripts
  * env vars
  * folder structure
  * run/build notes
  * deployed public URLs (if any)

***

## Phase 2 — Framework Upgrade (Only If Safe / Asked)

If asked to upgrade:

* Upgrade carefully without UI redesign
* Update peer packages needed for compatibility (React, types, related libs)
* Preserve custom bundler/image/SVG behavior
* Prefer keeping working auth/middleware over forced renames that change runtime behavior
* Fix type breakages from React/ref/hooks upgrades with minimal casts/refactors
* Prove upgrade with a successful production build

If upgrade risks breaking core flows, stop, report blockers, and keep the app stable.

***

## Phase 3 — UI Accuracy (Desktop + Mobile)

Audit and fix positioning/alignment issues across key surfaces:

* icon + number / value alignment
* right-align value columns consistently with labels when that is the existing pattern
* modal/form input groups (amount + chip + MAX / suffix / helper) must not overlap
* long decimals and long strings should not break layout (truncate or format sensibly)
* float noise like `7.800000000000001` must be formatted (`toFixed` or a shared formatter)
* table / mobile list rows should keep label left / value right when that is the pattern
* status badges must render for all known statuses in the domain
* empty states should be clear
* no overlapping buttons/chips on small screens
* landing/marketing: hero, nav, footer, CTAs should not collide or overflow

Rules:

* Fix alignment with flex/grid/`items-center`/`justify-between`/`shrink-0`/`min-w-0` (or the project’s existing layout utilities)
* Do not invent new visual styles
* Check both desktop and mobile variants of each component

***

## Phase 4 — Make Interactions Functional

Ensure core UI actions actually work in demo mode:

* Login / logout / protected route redirects (if auth exists)
* Open/close modals and drawers
* Forms submit with loading + success/error feedback
* Derived fields (fees, totals, MAX, “amount received”, etc.) when present
* Tabs, filters, dropdowns, search
* Copy / share buttons
* Download/export if present (client-generated files are fine for demo)
* Primary navigation (sidebar, header, footer, mobile menu)
* Restore commented / hidden demo paths when real pages already exist:
  * any route referenced in nav/constants but 404 or “coming soon” blocked
* Pagination Previous/Next (when tables/lists exist):
  * disable Previous on first page
  * disable Next on last page or when no more data
  * never leave Next enabled when total pages ≤ 1 or current page is last
  * **critical:** if a table uses “external pagination”, either:
    * parent must pass already-sliced page rows, **or**
    * use the table’s internal slice with full data — never pass the full list with external page controls (that shows the same rows on every page)

If a button is visible, it should either:

1. perform a real local/demo action, or
2. show a clear toast/message that the feature is demo-only

No dead clickable controls in the main demo path.

***

## Phase 5 — Dummy Data + Local Mock APIs (When the App Needs a Backend)

Create a complete local mock layer so the site runs fully offline/demo.

Preferred pattern:

* Keep existing API client (axios/fetch)
* Add a mock adapter or route handlers
* Put mock data generators / handlers in a clear place, for example:
  * `lib/mock-data.ts` and/or
  * `app/api/mock/[...path]/route.ts` (or Vite/Express mock server if not Next)
* Support the query/body/path page params this app already uses (`page`, `Page`, `offset`, `limit`, path-style ranges, etc.)
* Point env hosts at mock for demo:
  * public/internal API base URLs → mock base
  * do **not** leave staging/production API hosts active in demo env

Dummy data requirements:

* Enough records for multi-page pagination (at least 2 pages for major lists; prefer 12+ rows at the app’s page size)
* Realistic dates, amounts, statuses, IDs, names for this domain
* Consistent page size matching the UI
* Slice data by page in the mock layer **and** verify UI page buttons change the visible rows
* Include edge cases: pending/approved/rejected (or domain equivalents), long decimals, empty optional fields
* Cards, charts, lists, profile, and related screens should have coherent demo values
* Role-based demo login if the app has admin/user roles (document the demo credentials)

Wire pages to mock responses so refresh/pagination updates lists correctly.

For static marketing sites with no API: skip mocks; still fix broken links, forms (mailto/success state), and content placeholders.

***

## Phase 6 — Performance (Practical, Not Over-engineered)

Improve performance without architecture theater:

* Avoid unnecessary re-renders / repeated fetches on mount loops
* Keep page-change fetches scoped to page dependencies
* Avoid giant inline hardcoded response objects in page components; use shared mock helpers
* Prefer static generation / caching where already used; don’t break it casually
* Lazy-load heavy charts/maps only if already aligned with project patterns
* Do **not** wrap critical above-the-fold content in `React.lazy` + full-page Suspense if that can leave the UI stuck on a skeleton
* Initial load must always leave loading/skeleton states:
  * HTTP client timeout (example: 12s)
  * safety timer to clear loading (example: 8s)
  * never lock `document.body` overflow forever while loading
* Avoid fragile GET response-cache adapters unless proven safe; prefer simple timeouts + parallel `Promise.allSettled`
* Prefetch primary nav routes when the framework supports it
* Add route-level loading UI only if it matches existing patterns
* Remove accidental duplicate data-setting races
* Keep images correctly sized to avoid layout thrash
* Do not add `useMemo`/`useCallback` everywhere; only where it clearly helps or matches existing style

***

## Phase 7 — Build, Prove, Fix

Always verify:

1. Install deps with the project package manager
2. `dev` boots and key routes load
3. Production `build` succeeds
4. Fix every TypeScript/build blocker
5. Re-test critical flows after fixes:
   * auth entry (if any)
   * home / primary screen (must not stay on skeleton)
   * main modals/tables/forms for this product
   * pagination next/prev **with different rows per page** (if applicable)
   * restored hidden pages
   * mobile + desktop alignment

If build fails:

* diagnose root cause
* fix minimally
* rebuild until green

If local dev fails with lock / port in use:

* kill conflicting processes on the app’s ports
* remove stale framework lock files (example: `.next/dev/lock`)
* restart a single clean dev server

Common checks:

* corrupted build cache → clean and rebuild
* React 19 RefObject typing with hooks libraries
* image sizing warnings
* pagination page-count mismatches / same data on all pages
* missing status rendering
* overlapping compact controls
* package `engines` mismatch with installed Node

***

## Phase 8 — Git / Deploy Readiness (When Requested)

* Ensure `.env` ignored; demo env files only for non-secret public values
* Meaningful README and package description
* Commit with clear message focused on why
* **Always run production build, then push only after it is green**
* If deploying (Vercel/Netlify/etc.), treat warnings as non-blocking unless they fail deploy
* Pin Node engines to a workable range (example: `>=20 <25`), not only one major, unless the team standardizes on one
* Optional Cursor rule: build-then-push for this repo

### Deployed public URLs

When the owner provides URLs, update them everywhere they appear:

* env vars (`NEXT_PUBLIC_*` / `VITE_*` / etc.)
* metadata / Open Graph / canonical / `metadataBase`
* referral/share link bases
* legal/privacy/footer copy that still mentions old hosts
* README

### Contact copy for demo

* Prefer a real contact channel provided by the owner (email or support URL)
* Do **not** invent brand inboxes or send support flows to social profiles unless asked
* Optional env: `NEXT_PUBLIC_CONTACT_EMAIL` / equivalent

***

## Output Expectations

While working, keep changes minimal and targeted.  
At the end, report:

1. What was broken
2. What you fixed (grouped: cleanup, UI, functionality, mocks, performance, build, URLs/contact)
3. How to run locally
4. Remaining known warnings (if any) and whether they are safe
5. Confirmation that production build passed
6. Confirmation that code was pushed after green build (when requested)

## Hard Constraints

* Do not redesign UI
* Do not invent new brand styling
* Do not delete/alter major layout structure without asking
* Do not commit secrets
* Do not leave pagination/buttons half-working
* Do not ship without a successful production build when asked to push/deploy
* Do not leave the primary screen stuck on a loader/skeleton
* Do not leave real backend hosts in demo env when mock mode is required

## Defaults (override via project brief)

* Prefer the repo’s existing package manager and framework
* Keep the current visual system exactly
* Priority = whatever the brief lists; otherwise home + main authenticated surfaces
* Mock APIs must power lists with real multi-page pagination when lists exist
* Restore hidden pages when pages already exist in the repo
* After green build, push only if the user asked (or a project rule requires it)
