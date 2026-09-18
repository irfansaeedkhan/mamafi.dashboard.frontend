import { axiosAPI } from '@/utils/axios';
import { customLog } from '@/utils/custom-log';
import { getAuthTokens, setAuthTokens } from './auth-tokens-storage';
import { AuthTokens } from './types';

export const refreshTokens = async (): Promise<AuthTokens | null> => {
  try {
    const authTokens = getAuthTokens();

    if (!authTokens) return null;

    const { data } = await axiosAPI.get<{
      accessToken: string;
      refreshToken: string;
    }>(`/auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${authTokens.refresh_token}`,
      },
    });

    const converted: AuthTokens = {
      access_token: data.accessToken,
      refresh_token: data.refreshToken,
    };

    await setAuthTokens(converted);
    return converted;
  } catch (error: any) {
    customLog(['development', 'staging'], error);
    throw error;
  }
};
