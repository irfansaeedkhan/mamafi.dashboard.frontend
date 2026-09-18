import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const getShowOrders = async () => {
  try {
    const res = await axiosAPI.get('/ShowOrders');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get orders';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getShowOrders');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getShowOrders');
    }
  }
};
