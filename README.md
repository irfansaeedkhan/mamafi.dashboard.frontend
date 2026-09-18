# Mamafi Dashboard Frontend

Invitation-only member dashboard for the Mamafi meme-coin club. Members can review balances, rewards, affiliates, invoices, and leaderboard data. Admins can manage users, transactions, assets, and platform monitoring.

This repo is wired to a **local mock API** so the app is demo-ready without a live backend.

## Deployed URLs

| Surface | URL |
| --- | --- |
| Landing | https://mamafi.vercel.app/ |
| Dashboard (this app) | https://mamafi-app.vercel.app/ |

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
| `NEXT_PUBLIC_LANDING_URL` | Landing site (`https://mamafi.vercel.app`) |
| `NEXT_PUBLIC_BASE_URL` | Dashboard app URL used for referral links (`https://mamafi-app.vercel.app`) |
| `NEXT_PUBLIC_API_HOST` | Mock API base (`/api/mock`) |
| `NEXT_PUBLIC_BLOCKCHAIN_HOST` | Mock blockchain API base (`/api/mock`) |
| `INTERNAL_API_HOST` | Mock API host reference |
| `INTERNAL_API_BASE_URL` | Absolute mock API URL for server helpers |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe publishable test key for card checkout UI |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Support contact shown in KYC / forms |

Axios uses `/api/mock` via `constants/base-urls.ts`. All demo traffic stays on the local Next mock layer.

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
- After code changes: `yarn build`, then push to `main` only when the build is green.
