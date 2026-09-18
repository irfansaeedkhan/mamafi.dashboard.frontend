import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const UpdateProfileApi = async (
  name: string,
  surname: string,
  country: string,
  phone: string
) => {
  try {
    const res = await axiosAPI.put('/profile/update-profile', {
      name: name,
      surName: surname,
      countryCode: country,
      mobile: phone,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to update profile';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'UpdateProfileApi');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'UpdateProfileApi');
    }
  }
};
