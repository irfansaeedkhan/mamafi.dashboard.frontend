import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';
import { User } from '@/models/user.model';
import { getProfileDataApiResponseType } from '@/components/profile/profile-card-data';

export const getProfile = async (): Promise<getProfileDataApiResponseType> => {
  try {
    const res = await axiosAPI.get('/profile/profile');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get profile details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getProfile');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getProfile');
    }
  }
};
