import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const getResetPasswordLink = async (email: string) => {
  try {
    const res = await axiosAPI.post(`auth/forget-password/${email}`, {
      email: email,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to send reset password link';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message, 'forget-password');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'forget-password');
    }
  }
};
