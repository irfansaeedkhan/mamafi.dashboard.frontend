import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const getLeaderBoard = async (page: number = 1) => {
  try {
    const payload = {
      Page: page,
    };
    const res = await axiosAPI.post('/LeaderBoard', payload);
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get LeaderBoard details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'LeaderBoard');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'LeaderBoard');
    }
  }
};

export interface LeaderBoardList {
  LeaderBoard: LeaderBoardType[];
  Number_of_Pages: number;
}

export type LeaderBoardType = {
  ImageProfileUrl: string;
  Position: number;
  Score: number;
  Username: string;
  WalletAddress: string;
};
