/** Public landing site */
export const LandingBaseURL =
  process.env.NEXT_PUBLIC_LANDING_URL || 'https://mamafi.vercel.app';

/** Public dashboard / app (referral links, metadata) */
export const APPBaseURL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://mamafi-app.vercel.app';

/** Local mock API (axios) — keep relative so the running host is used */
export const APIBaseURL = '/api/mock';
export const APIBaseURLBlockchain = '/api/mock';

/** Server-side mock API base for local middleware helpers */
export const InternalAPIBaseURL =
  process.env.INTERNAL_API_BASE_URL || 'http://localhost:3000/api/mock';
