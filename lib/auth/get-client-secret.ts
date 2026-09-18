import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getClientSecret = async (amount: number) => {
  try {
    const res = await axiosAPIBlockchain.post('/v1/payment/stripe', {
      amount,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get client secret';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getClientSecret');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getClientSecret');
    }
  }
};
