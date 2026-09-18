import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export type PurchaseFeesResponse = {
  ethFeePercent: number;
  stripeFeePercent: number;
};

export const getPurchaseFees = async (): Promise<PurchaseFeesResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/v1/orders/fees');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get purchase fees';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getPurchaseFees');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getPurchaseFees');
    }
  }
};
