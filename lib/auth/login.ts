import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';
import { User } from '@/models/user.model';
import { setAuthTokens } from '@/lib/auth/auth-tokens-storage';
interface LoginParams {
  email: string;
  password: string;
}

export const login = async (
  data: LoginParams
): Promise<
  User & {
    accessToken: string;
    refreshToken: string;
  }
> => {
  try {
    const res = await axiosAPI.post('/auth/login', data);

    if (res.data.accessToken && res.data.refreshToken) {
      setAuthTokens({
        access_token: res.data.accessToken,
        refresh_token: res.data.refreshToken,
      });
    }
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to login';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message, 'login');
    } else if (error.response?.status === 400) {
      if (Array.isArray(error.response?.data?.data)) {
        throw new AppError(error, error.response?.data?.data[0], 'login');
      }
      throw new AppError(error, error.response.data, 'login');
    } else {
      throw new AppError(error, error.response?.data?.message ?? errorMessage, 'login');
    }
  }
};
