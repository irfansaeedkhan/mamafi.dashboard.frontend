import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getAvailableBalance = async (): Promise<GetAvailableBalanceResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/v2/assets/balance');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get balance details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getAvailableBalance');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getAvailableBalance');
    }
  }
};

export type GetAvailableBalanceResponse = {
  balance: number;
  balanceInUSD: number;
  withdrawalFeeInUSD: number;
  withdrawalFeeInETH: number;
  withdrawableBalanceInUSD: number;
  withdrawableBalanceInETH: number;
};
