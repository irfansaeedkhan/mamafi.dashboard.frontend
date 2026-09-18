import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const addMetaAssts = async (id: string, val: number) => {
  try {
    const res = await axiosAPIBlockchain.post('/orders/create', {
      meta_asset_id: id,
      count: val,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to add Sigillum';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'addMetaAssts');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'addMetaAssts');
    }
  }
};
