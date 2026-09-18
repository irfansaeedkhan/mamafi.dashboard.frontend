import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export interface BulkUploadResult {
  email: string;
  count: number;
  success: boolean;
  message: string;
  user_id?: string;
}

export interface BulkUploadUserMetaAssetResponse {
  success: boolean;
  total_processed: number;
  successful: number;
  failed: number;
  results: BulkUploadResult[];
  message: string;
}

export const bulkUploadUserMetaAsset = async (
  file: File
): Promise<BulkUploadUserMetaAssetResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosAPIBlockchain.post('/v1/user-meta-asset/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to upload meta assets';
    if (error.response?.status === 500) {
      throw new AppError(
        error,
        error.response?.data?.message || errorMessage,
        'bulkUploadUserMetaAsset'
      );
    } else if (error.response?.status === 400) {
      throw new AppError(
        error,
        error.response?.data?.error || errorMessage,
        'bulkUploadUserMetaAsset'
      );
    } else {
      throw new AppError(
        error,
        error.response?.data?.message ?? errorMessage,
        'bulkUploadUserMetaAsset'
      );
    }
  }
};
