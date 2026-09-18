import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';
import toast from 'react-hot-toast';
import { showValidationResponse } from '@/utils/axios/validation-response';

interface SignupData {
  email: string;
  password: string;
  referralCode: string;
  surName: string;
  mobile: string;
  countryCode: string;
  confirmPassword: string;
  name: string;
}

interface RegisterResponse {
  message: string;
}

export const register = async (data: SignupData): Promise<RegisterResponse | undefined> => {
  try {
    const res = await axiosAPI.post('auth/register', data);

    return { message: 'Registration successful. Please verify your email id' };
  } catch (error: any) {
    const errorMessage = 'Failed to register';
    if (error.response?.status === 500) {
      toast.error(error.response?.data?.message ?? errorMessage);
      throw new AppError(error, error.response?.data?.message, 'register');
    } else if (error.response?.status === 400) {
      await showValidationResponse(error.response, toast, errorMessage);
    } else {
      throw new AppError(error, error.response?.data?.message, 'register');
    }
  }
};
