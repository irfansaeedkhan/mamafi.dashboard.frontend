import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export interface AddUserMetaAssetParams {
  user_id: string;
  count: number;
}

export interface AddUserMetaAssetResponse {
  success: boolean;
  message?: string;
}

export const addUserMetaAsset = async (
  data: AddUserMetaAssetParams
): Promise<AddUserMetaAssetResponse> => {
  try {
    const res = await axiosAPIBlockchain.post('/v1/user-meta-asset', {
      user_id: data.user_id,
      count: data.count,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to add meta asset';
    if (error.response?.status === 500) {
      throw new AppError(error, error.response?.data?.message || errorMessage, 'addUserMetaAsset');
    } else if (error.response?.status === 400) {
      throw new AppError(error, error.response?.data?.error || errorMessage, 'addUserMetaAsset');
    } else {
      throw new AppError(error, error.response?.data?.message ?? errorMessage, 'addUserMetaAsset');
    }
  }
};
