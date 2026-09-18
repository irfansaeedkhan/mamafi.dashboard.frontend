import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

// export const getAffiliates = async (offset: number = 0) => {
export const getAffiliates = async (status: string = 'ALL') => {
  try {
    const res = await axiosAPIBlockchain.get('/users/affiliate-list', {
      params: { status },
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get affiliate details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'affiliate');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'affiliate');
    }
  }
};

export interface AffiliatesListType {
  name: string;
  asset_value: number;
  meta_assets_owned: number;
  weekly_comission: number;
  open_position_date: string;
  close_position_date: string;
  status: string;
  level?: number;
}

export type AffiliateStatus = 'ALL' | 'ACTIVE' | 'INACTIVE';
