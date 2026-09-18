import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  mobile: string | null;
  name: string;
  countryCode: string | null;
  surName: string;
  referralCode: string;
  referredBy: string;
  hasResetPasswordRequest: boolean;
  hasBeenBlocked: boolean;
  verificationEmailSeed: string;
  lastVerificationEmailSentAt: string | null;
  hasPassedEmailVerificationForChangePasswordAt: string | null;
  lastChangePasswordAt: string;
  emailVerified: boolean;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  lastLoginLocation: string | null;
  is_verified: boolean;
  is_admin: boolean;
  is_demo: boolean;
  is_rewards_enabled: boolean;
  stripe_customer_id: string | null;
  received_rewards_steps: string;
  is_reinvesting_enabled: boolean;
  meta_assets_count: number;
  noOfAffiliates: number;
}

export interface GetUsersResponse {
  data: User[];
  count: number;
  page: number;
  limit: number;
}

export interface SearchUsersResponse {
  data: User[];
  count: number;
  start: number;
  limit: number;
}

export const getUsers = async (
  page: number = 1,
  limit: number = 5
): Promise<GetUsersResponse> => {
  try {
    // Calculate start index: page 1 = start 1, page 2 = start 6 (if limit=5)
    const start = (page - 1) * limit + 1;

    const res = await axiosAPIBlockchain.get(`/v3/users/${start}/${limit}`);

    // Check if API returns data in wrapped format { data: [...], count: ... }
    // or if it returns array directly
    let employees: User[] = [];
    let totalCount = 0;

    if (res.data && typeof res.data === 'object' && 'data' in res.data && 'count' in res.data) {
      employees = Array.isArray(res.data.data) ? res.data.data : [];
      totalCount = res.data.count || 0;
    } else if (Array.isArray(res.data)) {
      employees = res.data;
      totalCount = res.headers['x-total-count']
        ? parseInt(res.headers['x-total-count'], 10)
        : employees.length; // Fallback to current page count
    } else {
      employees = [];
      totalCount = 0;
    }

    return {
      data: employees,
      count: totalCount,
      page,
      limit,
    };
  } catch (error: any) {
    const errorMessage = 'Failed to get employees list';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message || errorMessage, 'getUsers');
    } else if (error.response?.status === 400) {
      throw new AppError(error, error.response?.data?.error || errorMessage, 'getUsers');
    } else {
      throw new AppError(error, error.response?.data?.message ?? errorMessage, 'getUsers');
    }
  }
};

export const searchUsers = async (
  search: string = '',
  start: number = 1,
  limit: number = 20
): Promise<SearchUsersResponse> => {
  try {
    const params = new URLSearchParams({
      search,
      start: String(start),
      limit: String(limit),
    });

    const res = await axiosAPIBlockchain.get(`/v1/users/search?${params.toString()}`);

    let users: User[] = [];
    let totalCount = 0;

    if (res.data && typeof res.data === 'object' && 'data' in res.data) {
      users = Array.isArray(res.data.data) ? res.data.data : [];
      totalCount = Number(res.data.count ?? users.length);
    } else if (Array.isArray(res.data)) {
      users = res.data;
      totalCount = users.length;
    }

    return {
      data: users,
      count: totalCount,
      start,
      limit,
    };
  } catch (error: any) {
    const errorMessage = 'Failed to search users';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message || errorMessage, 'searchUsers');
    } else if (error.response?.status === 400) {
      throw new AppError(error, error.response?.data?.error || errorMessage, 'searchUsers');
    } else {
      throw new AppError(error, error.response?.data?.message ?? errorMessage, 'searchUsers');
    }
  }
};
