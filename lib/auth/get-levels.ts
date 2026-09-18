import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export type UnlockLevelsResponse = {
  weeklyReward: string;
  level1Reward: string;
  level2Reward: string;
  level3Reward: string;
  level1: boolean;
  level2: boolean;
  level3: boolean;
  remainingToUnlock1: number;
  remainingToUnlock2: number;
  remainingToUnlock3: number;
};

export const getUnlockLevels = async (): Promise<UnlockLevelsResponse> => {
  try {
    const res = await axiosAPIBlockchain.get<UnlockLevelsResponse>('/v1/users/unlock-levels');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get unlock levels';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getUnlockLevels');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getUnlockLevels');
    }
  }
};
