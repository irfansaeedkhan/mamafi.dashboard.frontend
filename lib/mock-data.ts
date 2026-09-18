export const DEMO_PAGE_SIZE = 5;
export const DEMO_ETH_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1';

export function paginate<T>(items: T[], page = 1, pageSize = DEMO_PAGE_SIZE) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    Number_of_Pages: total === 0 ? 0 : totalPages,
    count: total,
    page: safePage,
    pageSize,
  };
}

export function parsePage(value: unknown, fallback = 1) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

const isoDaysAgo = (days: number) => new Date(Date.now() - days * 86400000).toISOString();
const unixSecondsAgo = (days: number) => Math.floor(Date.now() / 1000) - days * 86400;

export const profile = {
  id: 'demo-user-001',
  email: 'alex@mamafi.demo',
  Email: 'alex@mamafi.demo',
  firstName: 'Alex',
  lastName: 'Morgan',
  name: 'Alex',
  surName: 'Morgan',
  Name: 'Alex',
  Surname: 'Morgan',
  username: 'alexm',
  Phone: '+1 415 555 0198',
  Country: 'United States',
  IsFirstLogin: false,
  is_admin: false,
  IsAdmin: false,
  image: '',
  WalletAddress: DEMO_ETH_ADDRESS,
  AffiliateCode: 'ALEXMFI',
  PasswordResetAt: 0,
  LastLogin: Date.now(),
  emailVerified: true,
  is_demo: false,
  IsDemo: false,
  is_rewards_enabled: true,
  IsRewardsEnabled: true,
};

export const adminProfile = {
  ...profile,
  id: 'demo-admin-001',
  email: 'admin@mamafi.demo',
  Email: 'admin@mamafi.demo',
  firstName: 'Admin',
  lastName: 'Mamafi',
  name: 'Admin',
  surName: 'Mamafi',
  Name: 'Admin',
  Surname: 'Mamafi',
  username: 'admin',
  is_admin: true,
  IsAdmin: true,
  AffiliateCode: 'MAMAFI',
};

export function makeDemoToken(isAdmin = false) {
  const source = isAdmin ? adminProfile : profile;
  return `eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.${Buffer.from(
    JSON.stringify({
      sub: source.id,
      email: source.email,
      emailVerified: true,
      is_admin: isAdmin,
      is_demo: false,
      is_rewards_enabled: true,
      iat: 1700000000,
      exp: 4102444800,
    })
  ).toString('base64url')}.demo`;
}

export const balance = {
  balance: 4.28064,
  balanceInUSD: 18942.18,
  withdrawalFeeInUSD: 3.5,
  withdrawalFeeInETH: 0.001,
  withdrawableBalanceInUSD: 18938.68,
  withdrawableBalanceInETH: 4.279,
};

export const sigillum = {
  id: 'sigillum-demo-001',
  createdAt: isoDaysAgo(240),
  updatedAt: isoDaysAgo(1),
  weekly_roi: 2.4,
  referrer_roi: 0.8,
  contract_start_date: '2025-01-01',
  contract_expiry_date: '2027-01-01',
  last_reward_date: isoDaysAgo(2),
  owned_offices: 12,
  usdt_earned_untill_now: 1240.5,
  usdt_earned_last_month: 184.2,
  minted_offices_in_usd: 12000,
  minted_offices: 12,
  owned_offices_in_usd: 18942,
  equity_percentage: 4.8,
  received_rewards: 1240.5,
};

export const purchaseAsset = {
  id: 'meta-asset-demo',
  available_inventory: 840,
  taken_inventory: 160,
  duration: 24,
  price: 100,
  referrer_roi: 0.8,
  weekly_roi: 2.4,
  price_in_eth: 0.0318,
};

const TX_TYPES = ['reward', 'referral', 'deposit', 'purchase', 'withdraw'] as const;
const TX_STATUSES = ['CONFIRMED', 'CONFIRMED', 'CONFIRMED', 'PENDING', 'REJECTED'] as const;

export const transactions = Array.from({ length: 12 }, (_, i) => {
  const type = TX_TYPES[i % TX_TYPES.length];
  const status = TX_STATUSES[i % TX_STATUSES.length];
  const value = i === 7 ? '0.123456789012' : ((12.4 - i * 0.85) * (type === 'deposit' ? 20 : 1)).toFixed(2);
  return {
    id: `tx-${String(i + 1).padStart(3, '0')}`,
    createdAt: isoDaysAgo(i * 3),
    updatedAt: isoDaysAgo(i * 3),
    hash: `0x${(8 + i).toString(16).padStart(2, '0')}41a72c9d3f4b1e6a0c5d8f2b7e9a1c3d5f7b9e${i}`,
    from: type === 'deposit' ? `0xdepositor${String(i).padStart(8, '1')}8888` : DEMO_ETH_ADDRESS,
    to: type === 'deposit' ? DEMO_ETH_ADDRESS : `0x88a2cd441f9b3e7c6d0a5e8f1b4c7d9e2a5f8b${i}c`,
    contract: type === 'deposit' ? 'ETH' : 'MFI',
    value,
    value_in_eth: (Number(value) / 3140).toFixed(6),
    token: type === 'deposit' ? 'ETH' : 'MFI',
    blockNumber: 1824012 - i * 40,
    type,
    status,
    eth_price: 3140 + i * 2,
    changed_eth_price: i % 3 === 0 ? -4.2 : 8.4 - i * 0.3,
    changed_eth_price_percentage: i % 3 === 0 ? -1.12 : 2.1 - i * 0.08,
  };
});

export const rewards = Array.from({ length: 12 }, (_, i) => ({
  amount: i === 4 ? 12.3456789 : Number((15.2 - i * 1.15).toFixed(2)),
  date: isoDaysAgo(i * 4),
  type: i % 3 === 1 ? 'referral' : 'reward',
  from: i % 3 === 1 ? `0x55a4aa882c1d6e9f3b0a7c4e8d2f5a1b6c9e3d${i}f` : DEMO_ETH_ADDRESS,
}));

export const cardTransactions = Array.from({ length: 12 }, (_, i) => ({
  amount: [1200, 500, 300, 150, 80, 2200, 75, 410, 90, 640, 125, 1800][i],
  currency: 'USD',
  brand: i % 2 === 0 ? 'visa' : 'mastercard',
  last4: i % 2 === 0 ? '4242' : '5555',
  timestamp: unixSecondsAgo(i * 6),
}));

const AFFILIATE_NAMES = [
  'Sam Rivera',
  'Jordan Lee',
  'Casey Quinn',
  'Riley Chen',
  'Morgan Blake',
  'Taylor Brooks',
  'Avery Patel',
  'Quinn Nguyen',
  'Reese Alvarez',
  'Harper Singh',
  'Cameron Diaz',
  'Skyler Jones',
];

export const affiliates = AFFILIATE_NAMES.map((name, i) => {
  const inactive = i === 3 || i === 9;
  return {
    name,
    asset_value: inactive ? 0 : 8400 - i * 620,
    meta_assets_owned: inactive ? 0 : 7 - Math.floor(i / 2),
    weekly_comission: inactive ? 0 : Number((82.4 - i * 6.1).toFixed(2)),
    open_position_date: isoDaysAgo(200 - i * 12).slice(0, 10),
    close_position_date: inactive ? isoDaysAgo(40).slice(0, 10) : '',
    status: inactive ? 'INACTIVE' : 'ACTIVE',
    level: (i % 3) + 1,
  };
});

function makeAdminUser(
  overrides: Partial<{
    id: string;
    email: string;
    name: string;
    surName: string;
    mobile: string;
    countryCode: string;
    referredBy: string;
    meta_assets_count: number;
    noOfAffiliates: number;
    is_demo: boolean;
    is_admin: boolean;
    is_rewards_enabled: boolean;
    hasBeenBlocked: boolean;
    emailVerified: boolean;
    lastLoginAt: string;
    lastLoginIp: string;
  }>
) {
  const id = overrides.id ?? 'demo-user-001';
  return {
    id,
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: isoDaysAgo(1),
    email: overrides.email ?? 'alex@mamafi.demo',
    mobile: overrides.mobile ?? '+14155550198',
    name: overrides.name ?? 'Alex',
    countryCode: overrides.countryCode ?? 'US',
    surName: overrides.surName ?? 'Morgan',
    referralCode: 'ALEXMFI',
    referredBy: overrides.referredBy ?? 'MAMAFI',
    hasResetPasswordRequest: false,
    hasBeenBlocked: overrides.hasBeenBlocked ?? false,
    verificationEmailSeed: 'seed',
    lastVerificationEmailSentAt: isoDaysAgo(2),
    hasPassedEmailVerificationForChangePasswordAt: null,
    lastChangePasswordAt: isoDaysAgo(30),
    emailVerified: overrides.emailVerified ?? true,
    lastLoginAt: overrides.lastLoginAt ?? isoDaysAgo(0),
    lastLoginIp: overrides.lastLoginIp ?? '203.0.113.42',
    lastLoginLocation: 'San Francisco, US',
    is_verified: true,
    is_admin: overrides.is_admin ?? false,
    is_demo: overrides.is_demo ?? false,
    is_rewards_enabled: overrides.is_rewards_enabled ?? true,
    stripe_customer_id: 'cus_demo_001',
    received_rewards_steps: '12',
    is_reinvesting_enabled: true,
    meta_assets_count: overrides.meta_assets_count ?? 12,
    noOfAffiliates: overrides.noOfAffiliates ?? 5,
  };
}

export const adminUsers = [
  makeAdminUser({}),
  makeAdminUser({
    id: 'demo-user-002',
    email: 'sam@mamafi.demo',
    name: 'Sam',
    surName: 'Rivera',
    mobile: '+14155550111',
    meta_assets_count: 7,
    noOfAffiliates: 2,
    lastLoginIp: '198.51.100.10',
  }),
  makeAdminUser({
    id: 'demo-user-003',
    email: 'jordan@mamafi.demo',
    name: 'Jordan',
    surName: 'Lee',
    mobile: '+14155550222',
    countryCode: 'CA',
    meta_assets_count: 5,
    noOfAffiliates: 1,
    referredBy: 'ALEXMFI',
  }),
  makeAdminUser({
    id: 'demo-user-004',
    email: 'casey@mamafi.demo',
    name: 'Casey',
    surName: 'Quinn',
    mobile: '+442071234567',
    countryCode: 'GB',
    meta_assets_count: 3,
    noOfAffiliates: 0,
    is_rewards_enabled: false,
  }),
  makeAdminUser({
    id: 'demo-user-005',
    email: 'riley@mamafi.demo',
    name: 'Riley',
    surName: 'Chen',
    mobile: '+8613800138000',
    countryCode: 'CN',
    meta_assets_count: 0,
    noOfAffiliates: 0,
    emailVerified: false,
  }),
  makeAdminUser({
    id: 'demo-user-006',
    email: 'morgan@mamafi.demo',
    name: 'Morgan',
    surName: 'Blake',
    mobile: '+61412345678',
    countryCode: 'AU',
    meta_assets_count: 2,
    noOfAffiliates: 1,
  }),
  makeAdminUser({
    id: 'demo-user-007',
    email: 'taylor@mamafi.demo',
    name: 'Taylor',
    surName: 'Brooks',
    mobile: '+4915123456789',
    countryCode: 'DE',
    meta_assets_count: 9,
    noOfAffiliates: 3,
  }),
  makeAdminUser({
    id: 'demo-user-008',
    email: 'avery@mamafi.demo',
    name: 'Avery',
    surName: 'Patel',
    mobile: '+14155550888',
    meta_assets_count: 4,
    noOfAffiliates: 2,
  }),
  makeAdminUser({
    id: 'demo-user-009',
    email: 'quinn@mamafi.demo',
    name: 'Quinn',
    surName: 'Nguyen',
    mobile: '+14155550777',
    countryCode: 'VN',
    meta_assets_count: 6,
    noOfAffiliates: 1,
    hasBeenBlocked: true,
  }),
  makeAdminUser({
    id: 'demo-user-010',
    email: 'reese@mamafi.demo',
    name: 'Reese',
    surName: 'Alvarez',
    mobile: '+34911222333',
    countryCode: 'ES',
    meta_assets_count: 1,
    noOfAffiliates: 0,
  }),
  makeAdminUser({
    id: 'demo-user-011',
    email: 'harper@mamafi.demo',
    name: 'Harper',
    surName: 'Singh',
    mobile: '+919876543210',
    countryCode: 'IN',
    meta_assets_count: 8,
    noOfAffiliates: 4,
  }),
  makeAdminUser({
    id: 'demo-admin-001',
    email: 'admin@mamafi.demo',
    name: 'Admin',
    surName: 'Mamafi',
    mobile: '+14155550999',
    meta_assets_count: 0,
    noOfAffiliates: 0,
    is_admin: true,
  }),
];

export const assets = {
  data: adminUsers.slice(0, 8).map((user, i) => ({
    id: `asset-${String(i + 1).padStart(3, '0')}`,
    createdAt: isoDaysAgo(200 - i * 10),
    updatedAt: isoDaysAgo(1),
    weekly_roi: '2.4',
    referrer_roi: '0.8',
    contract_start_date: isoDaysAgo(200 - i * 10).slice(0, 10),
    contract_expiry_date: '2027-01-01',
    last_reward_date: isoDaysAgo(2),
    owned_offices: String(user.meta_assets_count),
    usdt_earned_untill_now: String(1240.5 - i * 80),
    usdt_earned_last_month: String(184.2 - i * 12),
    email: user.email,
    total_assets: user.meta_assets_count,
    user,
  })),
  count: 8,
};

export const graph = [
  {
    year: '2025',
    percentages: [
      { January: 4 },
      { February: 7 },
      { March: 9 },
      { April: 11 },
      { May: 14 },
      { June: 16 },
      { July: 19 },
      { August: 21 },
      { September: 24 },
      { October: 28 },
      { November: 31 },
      { December: 34 },
    ],
  },
  {
    year: '2026',
    percentages: [
      { January: 8 },
      { February: 12 },
      { March: 18 },
      { April: 14 },
      { May: 24 },
      { June: 28 },
      { July: 32 },
      { August: 36 },
      { September: 40 },
      { October: 44 },
      { November: 48 },
      { December: 54 },
    ],
  },
];

export const invoices = Array.from({ length: 12 }, (_, i) => ({
  id: `inv-${String(i + 1).padStart(3, '0')}`,
  createdAt: isoDaysAgo(30 * i),
  updatedAt: isoDaysAgo(30 * i),
  amount: (12 - i) * 100,
  date: isoDaysAgo(30 * i).slice(0, 10),
  duration: 24,
  meta_asset_price: 100,
  quantity: 12 - i,
}));

export const leaderboard = Array.from({ length: 12 }, (_, i) => ({
  Position: i + 1,
  Score: 4280 - i * 210,
  Username: i === 0 ? 'Alex Morgan' : AFFILIATE_NAMES[i - 1] ?? `Member ${i + 1}`,
  WalletAddress:
    i === 0 ? DEMO_ETH_ADDRESS : `0x${(55 + i).toString(16)}a4aa882c1d6e9f3b0a7c4e8d2f5a1b6c9e3d${i}f`,
  ImageProfileUrl: '',
}));
