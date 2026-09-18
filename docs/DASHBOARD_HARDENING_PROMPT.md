# Dashboard Frontend Hardening & Demo-Ready Prompt

You are a senior fullstack engineer. Take this dashboard codebase from “rough / broken / incomplete” to a clean, buildable, demo-ready app without redesigning the UI.

## Goals

1. Clean up and stabilize the project
2. Fix layout/positioning bugs on desktop and mobile
3. Make buttons, modals, pagination, forms, and navigation functional
4. Add enough realistic dummy data for a full demo
5. Create local mock APIs so the app works without a real backend
6. Fix performance issues where safe
7. Run production build and fix every build/runtime blocker
8. Push only after build succeeds (always for this project once asked)
9. Show hidden / disabled / “coming soon” pages and finish remaining demo paths
10. Point public site URLs at the real deploy hosts (landing + dashboard)
11. Use a real developer contact email in demo copy (not a fake brand inbox)
12. Keep API env vars on the mock layer for offline demo (no leftover real API hosts)

Do **not** change visual design, colors, borders, spacing system, or layout structure unless needed to fix a clear bug. Prefer logic/layout/alignment fixes over redesign.

***

## Phase 0 — Inspect First

Before editing:

* Map project structure (`app/`, `components/`, `lib/`, `stores/`, `utils/`)
* Identify framework versions (Next.js / React / TS / package manager / Node engines)
* Find auth, dashboard, tables, modals, pagination, forms, charts
* Find existing API layer / axios / fetch wrappers
* Find hidden/disabled routes (`*-disabled`, `*-not-available`, commented nav links)
* Check `.gitignore`, env files, README, git remotes
* Note current build/dev warnings and errors
* Note package `engines` vs the machine’s Node version (Yarn will refuse to run if incompatible)

Never commit secrets (`.env`). Public demo env like `.env.development` is OK only if values are non-secret.

Prefer `yarn` if the project uses Yarn.

***

## Phase 1 — Cleanup & Stability

* Remove dead debug noise (noisy `console.log` in hot paths)
* Keep useful error logs only
* Fix broken imports / unused dangerous leftovers only if they block build or cause bugs
* Ensure TypeScript, ESLint, and Next config are coherent with current framework version
* Fix deprecated config that causes warnings/build risk (example: `images.domains` → `images.remotePatterns`)
* Fix Next/Image aspect-ratio warnings:
  * match `width`/`height` props to rendered size
  * if CSS changes one dimension, use `h-* w-auto` (or equivalent)
* Keep middleware/auth guards working; for Next 16 prefer the `proxy.ts` convention over deprecated `middleware.ts` when both cannot coexist
* Auth redirects that must work in demo:
  * unauthenticated users hitting `/dashboard/**` → login
  * authenticated users on auth pages → dashboard
  * `/` → login or dashboard based on cookie
* Align Node `engines` with the runtime actually used (support current LTS lines; avoid `20.x`-only if the machine is Node 22/24)
* Add `.nvmrc` when helpful
* Do **not** delete `next-env.d.ts` — Next generates it for TypeScript; leave it alone
* Write/refresh README with:
  * project purpose
  * tech stack
  * scripts
  * env vars
  * folder structure
  * run/build notes
  * deployed landing + dashboard URLs

***

## Phase 2 — Framework Upgrade (Only If Safe)

If asked to upgrade (example: Next.js latest):

* Upgrade carefully without UI redesign
* Update peer packages needed for compatibility (React, types, related libs)
* Preserve custom webpack/SVGR/image behavior
* Prefer keeping working auth middleware/`proxy` over forced renames that change runtime behavior
* Fix type breakages from React/ref/hooks upgrades with minimal casts/refactors
* Prove upgrade with successful `yarn build` (or project package manager build)

If upgrade risks breaking core flows, stop, report blockers, and keep the app stable.

***

## Phase 3 — UI Accuracy (Desktop + Mobile)

Audit and fix positioning/alignment issues across dashboard surfaces:

* icon + number alignment (crypto/token amounts especially)
* right-align value columns consistently with labels
* modal input groups (example: amount field + currency chip + MAX) must not overlap
* long decimals should not break layout (format to sensible precision when needed)
* float noise like `7.800000000000001` must be formatted (`toFixed(2)` or shared formatter)
* table/mobile list rows should keep label left / value right
* status badges must render for all known statuses (Approved / Pending / Rejected / Completed / etc.)
* empty states should be clear
* no overlapping buttons/chips on small screens

Rules:

* Fix alignment with flex/grid/`items-center`/`justify-between`/`shrink-0`/`min-w-0`
* Do not invent new visual styles
* Check both desktop and mobile variants of each component

***

## Phase 4 — Make Interactions Functional

Ensure core UI actions actually work in demo mode:

* Login / logout / protected route redirects
* Open/close modals
* Forms submit with loading + success/error feedback
* MAX / calculate fee / amount received style derived fields
* Tabs, filters, dropdowns
* Copy buttons
* Download/export if present (invoice PDF can be client-generated in demo)
* Sidebar navigation
* Restore commented / hidden demo paths when they have real pages:
  * My Invoice
  * Rental Miners
  * KYC / bank-transfer purchase entry
  * any other route referenced in constants but 404 or “coming soon” blocked
* Pagination Previous/Next:
  * disable Previous on first page
  * disable Next on last page or when no more data
  * never leave Next enabled when `Number_of_Pages <= 1` or current page is last
  * **critical:** if a table uses “external pagination”, either:
    * parent must pass already-sliced page rows, **or**
    * use the table’s internal slice with full data — never pass the full list with external page controls (that shows the same rows on every page)

If a button is visible, it should either:

1. perform a real local/demo action, or
2. show a clear toast/message that the feature is demo-only

No dead clickable controls in the main demo path.

***

## Phase 5 — Dummy Data + Local Mock APIs

Create a complete local mock layer so the dashboard runs fully offline/demo.

Preferred pattern:

* Keep existing API client (axios/fetch)
* Add a mock adapter or route handlers
* Put mock data generators / handlers in a clear place:
  * `lib/mock-data.ts` and/or
  * `app/api/mock/[...path]/route.ts` (App Router catch-all)
* Support query/body page params (`Page`, `offset`, `limit`, path-style `users/:start/:limit`)
* Point env hosts at mock for demo:
  * `NEXT_PUBLIC_API_HOST=/api/mock`
  * `NEXT_PUBLIC_BLOCKCHAIN_HOST=/api/mock`
  * `INTERNAL_API_HOST=/api/mock`
  * do **not** leave production/dev API hosts like `mamafi-api-dev.*` active in demo env

Dummy data requirements:

* Enough records for multi-page pagination (at least 2 pages for major tables; prefer 12+ rows at page size 5)
* Realistic dates, amounts, statuses, hashes, names
* Consistent page size (example: 5)
* Slice data by page in the mock layer **and** verify UI page buttons change the visible rows
* Include edge cases:
  * pending/approved/rejected
  * long decimals (formatted in UI)
  * empty optional fields handled safely
* Dashboard cards, charts, affiliates, rewards, invoices, leaderboard, profile should all have coherent demo values
* Admin login path: email containing `admin` can receive an admin JWT for admin dashboard demo

Wire pages to mock responses so refresh/pagination updates lists correctly.

***

## Phase 6 — Performance (Practical, Not Over-engineered)

Improve performance without architecture theater:

* Avoid unnecessary re-renders / repeated fetches on mount loops
* Keep page-change fetches scoped to page dependencies
* Avoid giant inline hardcoded response objects in page components; use shared mock helpers
* Prefer static generation where already used; don’t break it casually
* Lazy-load heavy charts only if already aligned with project patterns
* Do **not** wrap critical above-the-fold cards in `React.lazy` + full-page Suspense if that can leave the UI stuck on a skeleton
* Dashboard initial load must always leave the skeleton:
  * axios `timeout` (example: 12s)
  * safety timer to clear loading (example: 8s)
  * never lock `document.body` overflow forever while loading
* Avoid fragile GET response-cache adapters unless proven safe; prefer simple timeouts + parallel `Promise.allSettled`
* Prefetch sidebar routes for faster page-to-page navigation
* Add route-level `loading.tsx` skeletons for perceived speed
* Remove accidental duplicate data-setting races
* Keep images correctly sized to avoid layout thrash
* Do not add `useMemo`/`useCallback` everywhere; only where it clearly helps or matches existing style

***

## Phase 7 — Build, Prove, Fix

Always verify:

1. Install deps with project package manager
2. `dev` boots and key routes load
3. `build` succeeds
4. Fix every TypeScript/build blocker
5. Re-test critical flows after fixes:
   * auth entry
   * dashboard cards (must not stay on skeleton)
   * withdraw/reward/transaction modals/tables
   * affiliates/rewards
   * pagination next/prev **with different rows per page**
   * restored hidden pages (invoice, rental miners, KYC)
   * mobile + desktop alignment

If build fails:

* diagnose root cause
* fix minimally
* rebuild until green

If `next dev` fails with lock / port in use:

* kill processes on 3000–3003 (or the conflicting PIDs)
* remove stale `.next/dev/lock`
* restart a single clean `yarn dev`

Common checks:

* corrupted `.next` cache → clean and rebuild
* React 19 RefObject typing with hooks libraries
* Next Image warnings
* pagination page-count mismatches / same data on all pages
* missing status rendering
* overlapping compact modal controls
* Yarn `engines` mismatch with installed Node

***

## Phase 8 — Git / Deploy Readiness (Required for this project)

* Ensure `.env` ignored; `.env.development` only for non-secret public demo values
* Meaningful README and package description
* Commit with clear message focused on why
* **Always `yarn build` then push to `main` after successful green build** (do not push on failed build)
* If deploying (Vercel/etc.), treat warnings as non-blocking unless they fail deploy
* Pin Node engines to a workable range (example: `>=20 <25`), not only `20.x`, unless the team standardizes on one major
* Keep a project Cursor rule if useful: build-then-push

### Deployed public URLs (update everywhere they appear)

| Surface | URL |
| --- | --- |
| Landing | `https://mamafi.vercel.app/` |
| Dashboard | `https://mamafi-app.vercel.app/` |

Update:

* `NEXT_PUBLIC_LANDING_URL` / `NEXT_PUBLIC_BASE_URL`
* metadata / Open Graph / `metadataBase`
* referral link base (`APPBaseURL`)
* legal/privacy copy that mentions old `mamafi.io` / `app.mamafi.io` hosts
* README

### Contact copy for demo

* Prefer a real developer email for KYC/support CTAs (example: `irfansaeedkhan@protonmail.com`)
* Do **not** send users to LinkedIn for document/support flows
* Do **not** keep fake brand inboxes like `contact@mamafi.io` in a personal demo
* Optional: `NEXT_PUBLIC_CONTACT_EMAIL`

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
* Do not leave the main dashboard stuck on a loader/skeleton
* Do not leave real backend hosts in demo env when mock mode is required

## Project-specific notes

* Package manager: yarn
* Framework target: Next.js App Router dashboard
* Keep current visual system exactly
* Priority screens: dashboard, withdraw modal, rewards list, transactions, affiliates/referral rewards
* Mock APIs must power tables with real multi-page pagination (distinct rows per page)
* Restore hidden pages: My Invoice, Rental Miners, KYC/bank transfer when pages exist
* Landing: `https://mamafi.vercel.app/` · Dashboard: `https://mamafi-app.vercel.app/`
* Contact: developer email (ProtonMail), not LinkedIn / fake brand inbox
* API env for demo: `/api/mock` only
* After green build, push to `main`
