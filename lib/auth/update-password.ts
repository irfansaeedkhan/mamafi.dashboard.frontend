import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const UpdatePasswordApi = async (
  current: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    const res = await axiosAPI.post('/auth/reset-password', {
      currentPassword: current,
      password: newPassword,
      confirmPassword: confirmPassword,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to update password';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'UpdatePasswordApi');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'UpdatePasswordApi');
    }
  }
};
