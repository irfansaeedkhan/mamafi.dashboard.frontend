import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

interface ToggleDemoParams {
  userId: string;
}

interface ToggleDemoResponse {
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

export const toggleDemo = async (data: ToggleDemoParams): Promise<ToggleDemoResponse> => {
  try {
    const res = await axiosAPIBlockchain.post('/v1/users/toggle-demo', data);
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to toggle demo mode';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message || errorMessage, 'toggleDemo');
    } else if (error.response?.status === 400) {
      throw new AppError(error, error.response?.data?.error || errorMessage, 'toggleDemo');
    } else {
      throw new AppError(error, error.response?.data?.message ?? errorMessage, 'toggleDemo');
    }
  }
};
