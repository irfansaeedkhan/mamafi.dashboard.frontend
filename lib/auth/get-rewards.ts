import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getRewardsDetails = async (): Promise<RewardsDetailsResp | null> => {
  try {
    const res = await axiosAPIBlockchain.get('/users/affiliate-report');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get reward details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getRewardsDetails');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getRewardsDetails');
    }
  }
};

export type RewardsDetailsResp = {
  referrals: number;
  is_eligable_for_reward: boolean;
  meta_assets: number;
  total_assets_value: number;
  reward_percentage: number;
  sales_comission: number;
  last_month_rewards: number;
  userlevel: string;
  level1Count: number;
  level2Count: number;
  level3Count: number;
};
