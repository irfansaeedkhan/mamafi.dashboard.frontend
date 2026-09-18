import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

interface ToggleRewardsParams {
  userId: string;
}

interface ToggleRewardsResponse {
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
  password: string;
  hasResetPasswordRequest: boolean;
  hasBeenBlocked: boolean;
  verificationEmailSeed: string;
  lastVerificationEmailSentAt: string | null;
  hasPassedEmailVerificationForChangePasswordAt: string | null;
  lastChangePasswordAt: string;
  refreshToken: string;
  emailVerified: boolean;
  lastLoginAt: string;
  lastLoginIp: string | null;
  lastLoginLocation: string | null;
  is_verified: boolean;
  is_admin: boolean;
  is_demo: boolean;
  is_rewards_enabled: boolean;
  stripe_customer_id: string;
  received_rewards_steps: string;
  is_reinvesting_enabled: boolean;
}

export const toggleRewards = async (data: ToggleRewardsParams): Promise<ToggleRewardsResponse> => {
  try {
    const res = await axiosAPIBlockchain.post('/v1/users/toggle-rewards', data);
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to toggle rewards';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message || errorMessage, 'toggleRewards');
    } else if (error.response?.status === 400) {
      throw new AppError(error, error.response?.data?.error || errorMessage, 'toggleRewards');
    } else {
      throw new AppError(error, error.response?.data?.message ?? errorMessage, 'toggleRewards');
    }
  }
};
