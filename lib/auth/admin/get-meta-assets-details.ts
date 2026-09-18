import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getSigillumDetails = async (
  page: number = 1,
  limit: number = 2
): Promise<{
  data: SigillumDetailsListType[];
  count: number;
}> => {
  try {
    const res = await axiosAPIBlockchain.get('v1/user-meta-asset/report', {
      params: { page, limit },
    });
    return {
      data: res.data.data,
      count: res.data.count,
    };
  } catch (error: any) {
    const errorMessage = 'Failed to get Sigillum details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'Sigillum');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'Sigillum');
    }
  }
};

export interface SigillumDetailsListType {
  id: string;
  createdAt: string;
  updatedAt: string;
  weekly_roi: string;
  referrer_roi: string;
  contract_start_date: string;
  contract_expiry_date: string;
  last_reward_date: string;
  owned_offices: string;
  usdt_earned_untill_now: string;
  usdt_earned_last_month: string;
}
