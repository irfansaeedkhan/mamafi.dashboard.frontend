import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getTransactionDetail = async (): Promise<GetTransactionDetailResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/transactions');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get transaction detail';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getTransactionDetail');
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        'getTransactionDetail'
      );
    }
  }
};

export type GetTransactionDetailResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  hash: string;
  from: string;
  to: string;
  contract: string;
  value: string;
  value_in_eth: string;
  token: string;
  blockNumber: number;
  type: string;
  status: string;
  eth_price: number;
  changed_eth_price: number;
  changed_eth_price_percentage: number;
}[];
