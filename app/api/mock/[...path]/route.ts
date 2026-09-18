import { NextResponse } from 'next/server';
import {
  adminProfile,
  adminUsers,
  affiliates,
  assets,
  balance,
  cardTransactions,
  DEMO_ETH_ADDRESS,
  DEMO_PAGE_SIZE,
  graph,
  invoices,
  leaderboard,
  makeDemoToken,
  paginate,
  parsePage,
  profile,
  purchaseAsset,
  rewards,
  sigillum,
  transactions,
} from '@/lib/mock-data';

/** Module-level demo state so PATCH/GET stay in sync during the session */
let autoReinvestEnabled = true;

function isAdminLogin(body?: Record<string, unknown>) {
  return String(body?.email ?? '').toLowerCase().includes('admin');
}

function response(
  path: string,
  method: string,
  body?: Record<string, unknown>,
  search?: URLSearchParams
) {
  const page = parsePage(search?.get('Page') ?? search?.get('page') ?? body?.Page ?? body?.page);
  const limit = parsePage(
    search?.get('limit') ?? search?.get('Limit') ?? body?.limit ?? body?.Limit,
    DEMO_PAGE_SIZE
  );

  if (path.includes('login')) {
    const admin = isAdminLogin(body);
    const user = admin ? adminProfile : profile;
    return { ...user, accessToken: makeDemoToken(admin), refreshToken: makeDemoToken(admin) };
  }
  if (path.includes('check-token')) {
    return { ...profile, access_token_valid: true, generate_access_token: false };
  }
  if (path.includes('refresh-token')) {
    return { accessToken: makeDemoToken(false), refreshToken: makeDemoToken(false) };
  }
  if (path.includes('profile')) return profile;
  if (path.includes('balance')) return balance;
  if (path.includes('pricing/change')) {
    return { dailyChange: 2.4, dailyChangeInUSD: 74.12 };
  }
  if (path.includes('pricing/')) return 3142.86;
  if (path.includes('affiliate-report')) {
    return {
      referrals: 14,
      is_eligable_for_reward: true,
      meta_assets: 12,
      total_assets_value: 18942,
      reward_percentage: 2.4,
      sales_comission: 428.4,
      last_month_rewards: 184.2,
      userlevel: 'Signal Finder',
      level1Count: 8,
      level2Count: 4,
      level3Count: 2,
    };
  }
  if (path.includes('affiliate-list')) {
    const status = String(search?.get('status') ?? body?.status ?? 'ALL').toUpperCase();
    const filtered =
      status === 'ALL' ? affiliates : affiliates.filter(item => item.status === status);
    return filtered;
  }
  if (path.includes('users/affiliate')) {
    return {
      data: affiliates.map(a => ({
        name: a.name,
        email: `${a.name.split(' ')[0].toLowerCase()}@mamafi.demo`,
        reward: a.weekly_comission,
      })),
      count: affiliates.length,
    };
  }
  if (path.includes('user-meta-asset/report') || path.includes('v1/user-meta-asset/report')) {
    return assets;
  }
  if (path === 'meta-assets' || path.endsWith('/meta-assets')) return purchaseAsset;
  if (path.includes('user-meta-asset')) return sigillum;
  if (path.includes('stripe-history')) return cardTransactions;
  if (path.includes('transaction') || path === 'transactions') return transactions;
  if (path.includes('reward/list') || path.includes('rewards')) return rewards;
  if (path.includes('reward/chart') || path.includes('graph')) return graph;
  if (path.includes('leaderboard') || path.includes('LeaderBoard')) {
    const sliced = paginate(leaderboard, page, limit);
    return {
      LeaderBoard: sliced.items,
      Number_of_Pages: sliced.Number_of_Pages,
      count: sliced.count,
    };
  }

  if (path.includes('auto-reinvest')) {
    if (method === 'PATCH' || method === 'PUT' || method === 'POST') {
      if (typeof body?.enabled === 'boolean') {
        autoReinvestEnabled = body.enabled;
      } else if (typeof body?.isAutoReinvestEnabled === 'boolean') {
        autoReinvestEnabled = body.isAutoReinvestEnabled;
      } else {
        autoReinvestEnabled = !autoReinvestEnabled;
      }
    }
    return { isAutoReinvestEnabled: autoReinvestEnabled };
  }

  if (path.includes('withdraw')) {
    return {
      success: true,
      message: 'Withdrawal request submitted successfully',
      txHash: '0xdemo_withdraw_a1b2c3d4e5f6789012345678abcdef',
      amount: body?.amount ?? 0,
      address: body?.address ?? DEMO_ETH_ADDRESS,
      network: body?.Network ?? body?.network ?? 'ETH',
    };
  }

  if (path.includes('deposit')) {
    return {
      public_key: DEMO_ETH_ADDRESS,
      address: DEMO_ETH_ADDRESS,
      network: 'Ethereum',
    };
  }

  if (path.includes('all-users-report') || path.includes('report/all-users')) {
    return {
      allUsersCount: adminUsers.length,
      totalDepositeAmounts: 18.64,
      totalDepositeAmountsInUSD: 58620.4,
    };
  }

  const usersPathMatch = path.match(/(?:v3\/users|users)\/(\d+)\/(\d+)/);
  if (usersPathMatch || path.includes('v3/users') || path.includes('users/search') || path.includes('all-users')) {
    const start = usersPathMatch ? Number(usersPathMatch[1]) : parsePage(search?.get('start'), 1);
    const pageLimit = usersPathMatch ? Number(usersPathMatch[2]) : limit;
    const startIndex = Math.max(0, start - 1);
    const searchTerm = String(search?.get('search') ?? body?.search ?? '').toLowerCase();
    const filtered = searchTerm
      ? adminUsers.filter(
          user =>
            user.email.toLowerCase().includes(searchTerm) ||
            user.name.toLowerCase().includes(searchTerm) ||
            user.surName.toLowerCase().includes(searchTerm)
        )
      : adminUsers;
    return {
      data: filtered.slice(startIndex, startIndex + pageLimit),
      count: filtered.length,
      page: Math.floor(startIndex / pageLimit) + 1,
      limit: pageLimit,
      start,
    };
  }

  if (path.includes('fees')) return { ethFeePercent: 0.5, stripeFeePercent: 2.5 };
  if (path.includes('stripe')) return { clientSecret: 'demo_client_secret', id: 'demo-payment' };
  if (path.includes('Dashboard')) {
    return { balance: balance.balance, totalRewards: 1240.5, totalReferrals: 14 };
  }
  if (path.includes('ShowOrders')) return { data: [], count: 0 };
  if (path.includes('unlock-levels') || path.includes('levels')) {
    return {
      data: [
        { level: 1, title: 'Seed member', unlocked: true },
        { level: 2, title: 'Signal finder', unlocked: true },
        { level: 3, title: 'Culture builder', unlocked: false },
        { level: 4, title: 'Narrative lead', unlocked: false },
      ],
    };
  }
  if (path.includes('invoice')) {
    const sliced = paginate(invoices, page, limit);
    return {
      Invoices: sliced.items,
      Number_of_Pages: sliced.Number_of_Pages,
      data: sliced.items,
      count: sliced.count,
    };
  }
  if (path.includes('kyc')) return { status: 'approved', verified: true };
  if (path.includes('users')) {
    const sliced = paginate(adminUsers, page, limit);
    return { data: sliced.items, count: sliced.count, page: sliced.page, limit: sliced.pageSize };
  }

  if (method !== 'GET') return { success: true, message: 'Demo action completed' };
  return { data: [], count: 0 };
}

async function handler(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const pathStr = path.join('/');
  const url = new URL(request.url);

  let body: Record<string, unknown> | undefined;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      body = undefined;
    }
  }

  return NextResponse.json(response(pathStr, request.method, body, url.searchParams));
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
