import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';
import { DashboardApiResponse } from '.';

export const getDashboard = async (page: number = 1): Promise<DashboardApiResponse> => {
  try {
    const payload = {
      Page: page,
    };

    const res = await axiosAPI.post('/Dashboard', payload);
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get dashboard details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getDashboard');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getDashboard');
    }
  }
};
