import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getDepositAddress = async (
  networkType: GetNETWORKTYPE['networkType']
): Promise<GetDepositAddressResponse> => {
  try {
    const res = await axiosAPIBlockchain.get(`/assets/deposit/${networkType}`);
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get balance details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getDepositAddress');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getDepositAddress');
    }
  }
};

export type GetDepositAddressResponse = {
  public_key: string;
};
export type GetNETWORKTYPE = {
  // networkType: 'TRX' | 'ETH' | 'BSC';
  // for now we are only supporting ETH
  // changed the type to ETH only so if by mistake someone passes TRX or BSC, it will throw an error
  networkType: 'ETH';
};
