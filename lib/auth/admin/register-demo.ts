import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';
import toast from 'react-hot-toast';
import { showValidationResponse } from '@/utils/axios/validation-response';

export interface RegisterDemoPayload {
  email: string;
  mobile: string;
  countryCode: string;
  surName: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterDemoResponse {
  message: string;
  userId?: string;
}

export async function registerDemo(
  payload: RegisterDemoPayload
): Promise<RegisterDemoResponse | undefined> {
  try {
    const res = await axiosAPIBlockchain.post<RegisterDemoResponse>('auth/register-demo', payload);
    return res.data || { message: 'Demo account created successfully' };
  } catch (error: any) {
    const errorMessage = 'Failed to create demo account';
    if (error.response?.status === 500) {
      toast.error(error.response?.data?.message ?? errorMessage);
      throw new AppError(error, error.response?.data?.message, 'registerDemo');
    } else if (error.response?.status === 400) {
      await showValidationResponse(error.response, toast, errorMessage);
      throw new AppError(error, error.response?.data?.message, 'registerDemo');
    } else {
      toast.error(errorMessage);
      throw new AppError(error, error.response?.data?.message, 'registerDemo');
    }
  }
}
