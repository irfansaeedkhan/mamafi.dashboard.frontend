import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const UpdateActivateAccountApi = async (email: string, token: string) => {
  try {
    const res = await axiosAPI.put(`/auth/verify-email/${token}`);
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to activate account';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message, 'UpdateActivateAccountApi');
    } else {
      throw new AppError(
        error,
        error.response.data.error ?? errorMessage,
        'UpdateActivateAccountApi'
      );
    }
  }
};
