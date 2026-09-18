import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const resendEmailVerificationApi = async (email: string) => {
  try {
    const res = await axiosAPI.post(`/auth/resend-verification-email?email=${email}`);
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to resend email verification';
    if (error.response?.status === 500) {
      if (error.response.data.message) {
        throw new AppError(error, error.response.data.message, 'resendEmailVerificationApi');
      }
      throw new AppError(error, errorMessage, 'resendEmailVerificationApi');
    } else {
      throw new AppError(
        error,
        error.response.data.error ?? errorMessage,
        'resendEmailVerificationApi'
      );
    }
  }
};
