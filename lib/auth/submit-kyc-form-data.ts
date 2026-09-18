import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const submitKYCFormData = async (formData: KYCFormTypeForAPI) => {
  try {
    const res = await axiosAPIBlockchain.post('/users/kyc', formData);
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to submit KYC form data.';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'submitKYCFormData');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'submitKYCFormData');
    }
  }
};

interface KYCFormTypeForAPI {
  first_name: string;
  last_name: string;
  middle_name: string;
  birth_date: string;
  birth_place: string;
  birth_country: string;
  nationality: string;
  document_type: string;
  profession: string;
  street_no: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
  mobile: string;
  email: string;
  source_of_wealth: string;
  about_wealth: string;
}
