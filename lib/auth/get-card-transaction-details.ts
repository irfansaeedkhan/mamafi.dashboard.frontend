import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getCardTransactionDetail = async (): Promise<GetCardTransactionDetailResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/v1/payment/stripe-history');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get card transaction detail';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getCardTransactionDetail');
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        'getCardTransactionDetail'
      );
    }
  }
};

export type GetCardTransactionDetailResponse = {
  amount: number;
  currency: string;
  brand: string;
  last4: string;
  timestamp: number;
}[];
