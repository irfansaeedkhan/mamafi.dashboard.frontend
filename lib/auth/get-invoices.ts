import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getInvoicesList = async (page: number = 1) => {
  try {
    const res = await axiosAPIBlockchain.get('/invoices/list', {
      params: { Page: page, limit: 5 },
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get Invoices details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'Invoices');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'Invoices');
    }
  }
};

export interface InvoicesListResponse {
  Invoices: InvoicesType[];
  Number_of_Pages: number;
}

export type InvoicesType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  date: string;
  duration: number;
  meta_asset_price: number;
  quantity: number;
};
