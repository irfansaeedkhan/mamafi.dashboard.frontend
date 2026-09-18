import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getBuySigillumDetail = async (): Promise<BuySigillumDetailResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/meta-assets');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get Sigillum details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getBuySigillumDetail');
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        'getBuySigillumDetail'
      );
    }
  }
};

export type BuySigillumDetailResponse = {
  id: string;
  available_inventory: number;
  taken_inventory: number;
  duration: number;
  price: number;
  referrer_roi: number;
  weekly_roi: number;
  price_in_eth: number;
};
