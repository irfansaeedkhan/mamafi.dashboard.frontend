import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const updateAutoReinvest = async (enabled: boolean): Promise<UpdateAutoReinvestResponse> => {
  try {
    const res = await axiosAPIBlockchain.patch('/users/auto-reinvest', { enabled: enabled });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to update auto-reinvest status';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'updateAutoReinvest');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'updateAutoReinvest');
    }
  }
};

export type UpdateAutoReinvestResponse = {
  isAutoReinvestEnabled: boolean;
};
