import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const CreateNewPassword = async (
  password: string,
  email: string,
  userId: string,
  token: string,
  confirmPassword: string
) => {
  try {
    const res = await axiosAPI.post(`/auth/set-new-password`, {
      password: password,
      email: email,
      seed: token,
      confirmPassword: confirmPassword,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to reset password';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'reset-password');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'reset-password');
    }
  }
};
