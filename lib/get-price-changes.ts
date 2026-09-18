import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const getPriceChanges = async ({
  base,
  quote,
}: {
  base: string;
  quote: string;
}): Promise<ChangeRateResponse> => {
  try {
    const { data } = await axiosAPI.get(`v1/pricing/change/${base}/${quote}`);

    return data;
  } catch (error: unknown) {
    throw new AppError(
      error instanceof Error ? error : new Error('Unknown error'),
      'Failed to validate token',
      'getPrice'
    );
  }
};

export interface ChangeRateResponse {
  dailyChange: number;
  dailyChangeInUSD: number;
}
