import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';
import { User } from '@/models/user.model';
import { clearAuthTokens, getAuthTokens } from './client-auth-tokens';

// Helper function to decode JWT token
const decodeJWTToken = (token: string): { [key: string]: any } | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    // Check if tokens exist before making API call
    const tokens = getAuthTokens();
    if (!tokens) {
      throw new AppError(new Error('No tokens'), 'No authentication tokens found', 'getMe');
    }

    const { data } = await axiosAPI.get('/auth/check-token');

    // Decode JWT token to get additional user data
    const jwtPayload = decodeJWTToken(tokens.access_token);

    return {
      Email: data.email ?? data.Email ?? '',
      Name: data.name ?? data.Name ?? data.firstName ?? '',
      Surname: data.surName ?? data.Surname ?? data.lastName ?? '',
      WalletAddress: data.WalletAddress ?? '',
      AffiliateCode: data.referredBy ?? data.AffiliateCode ?? '',
      PasswordResetAt: data.PasswordResetAt ?? '',
      // Include JWT payload data
      sub: jwtPayload?.sub,
      emailVerified: jwtPayload?.emailVerified,
      is_admin: jwtPayload?.is_admin,
      is_demo: jwtPayload?.is_demo,
      is_rewards_enabled: jwtPayload?.is_rewards_enabled,
      iat: jwtPayload?.iat,
      exp: jwtPayload?.exp,
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      clearAuthTokens();
      throw new AppError(error, 'Unauthorized', 'getMe');
    }

    throw new AppError(error, 'Failed to validate token', 'getMe');
  }
};
