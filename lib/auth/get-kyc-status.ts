import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getKYCStatus = async (): Promise<KYCStatusResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/users/kyc');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get kyc status';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getKYCStatus');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getKYCStatus');
    }
  }
};

export type KYCStatusResponse = {
  status: 'pending' | 'approved' | 'rejected' | 'not_submitted';
};

export enum KYCEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  NOT_SUBMITTED = 'not_submitted',
}
