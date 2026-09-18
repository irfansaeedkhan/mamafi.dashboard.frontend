import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export interface AllUsersReportResponse {
  allUsersCount: number;
  totalDepositeAmounts: number;
  totalDepositeAmountsInUSD: number;
}

export const getAllUsersReport = async (): Promise<AllUsersReportResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/v1/report/all-users-report');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get all users report';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message || errorMessage, 'getAllUsersReport');
    } else if (error.response?.status === 400) {
      throw new AppError(error, error.response?.data?.error || errorMessage, 'getAllUsersReport');
    } else {
      throw new AppError(error, error.response?.data?.message ?? errorMessage, 'getAllUsersReport');
    }
  }
};
