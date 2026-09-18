import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getAutoReinvest = async (): Promise<GetAutoReinvestResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/users/auto-reinvest');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get auto-reinvest status';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getAutoReinvest');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getAutoReinvest');
    }
  }
};

export type GetAutoReinvestResponse = {
  isAutoReinvestEnabled: boolean;
};
