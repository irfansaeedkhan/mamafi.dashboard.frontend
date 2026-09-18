# Mamafi Dashboard Frontend

Invitation-only member dashboard for the Mamafi meme-coin club. Members can review balances, rewards, affiliates, invoices, and leaderboard data. Admins can manage users, transactions, assets, and platform monitoring.

This repo is wired to a **local mock API** so the app is demo-ready without a live backend.

## Tech stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS
- Zustand
- Axios
- ApexCharts
- Yarn 1.22
- Node.js 20, 22, or 24

## Scripts

```bash
yarn install
yarn dev
yarn build
yarn start
yarn lint
yarn type-check
```

## Local demo

1. Install with Yarn: `yarn install`
2. Start the app: `yarn dev`
3. Open [http://localhost:3000](http://localhost:3000)
4. Sign in with any email/password. The mock login accepts all credentials.
   - Member: `alex@mamafi.demo`
   - Admin: `admin@mamafi.demo` (email containing `admin` receives an admin token)

The production build is `yarn build` then `yarn start`.

## Environment

Committed public demo values live in `.env.development`. Secret `.env` files are gitignored.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_HOST` | Real backend host (not used while mock mode is on) |
| `NEXT_PUBLIC_BASE_URL` | App/base URL metadata |
| `NEXT_PUBLIC_BLOCKCHAIN_HOST` | Real blockchain host (not used in mock mode) |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe publishable test key for card checkout UI |
| `INTERNAL_API_HOST` | Internal host reference |

Axios currently points at `/api/mock`. To use a real backend later, change `constants/base-urls.ts`.

## Folder structure

```
app/            App Router pages, layouts, and mock API routes
components/     Dashboard, admin, auth, profile, and shared UI
lib/            Auth API helpers and mock datasets
stores/         Zustand stores
utils/          Axios client, pagination, formatting
constants/      Routes and base URLs
hooks/          Auth/tutorial hooks
```

Key mock files:

- `lib/mock-data.ts` — demo records
- `app/api/mock/[...path]/route.ts` — catch-all mock handlers with pagination

## Notes

- Protected dashboard routes require an `access_token` cookie set at login.
- Major tables paginate at 5 rows per page and include at least two pages of demo data.
- GET responses are cached in-memory for 30 seconds to keep page-to-page navigation fast.
