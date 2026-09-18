import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getGraphDetails = async (): Promise<GetGraphDetailsResponse[]> => {
  try {
    const res = await axiosAPIBlockchain.get('/reward/chart');
    return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
  } catch (error: any) {
    const errorMessage = 'Failed to get balance details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getGraphDetails');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getGraphDetails');
    }
  }
};

export type Percentage = {
  [month: string]: number;
};
export type GetGraphDetailsResponse = {
  percentages: Percentage[];
  year: string;
};
