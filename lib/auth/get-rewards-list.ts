import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getShowRewardListDetails = async (): Promise<GetRewardListItemResponse> => {
  try {
    const res = await axiosAPIBlockchain.get('/reward/list');
    return Array.isArray(res.data) ? res.data : res.data?.data ?? res.data?.RewardList ?? [];
  } catch (error: any) {
    const errorMessage = 'Failed to get reward list details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getRewardListDetails');
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        'getRewardListDetails'
      );
    }
  }
};

export type GetRewardListItemResponse = {
  amount: number;
  date: string;
  type: string;
  from: string;
}[];

// export type GetRewardListResponse = {
//   RewardListItem: RewardListItem[];
// } | null;

// kept it for future pagination
// import { AppError } from "@/utils/app-error";
// import { axiosAPI } from "@/utils/axios";

// export const getShowRewardListDetails = async (
//   page: number = 1,
// ): Promise<GetRewardListResponse> => {
//   try {
//     const payload = {
//       Page: page,
//     };

//     const res = await axiosAPI.post("/RevenuesHistory", payload);
//     return res.data;
//   } catch (error: any) {
//     const errorMessage = "Failed to get reward list details";
//     if (error.response?.status === 500) {
//       throw new AppError(error, errorMessage, "getRewardListDetails");
//     } else {
//       throw new AppError(
//         error,
//         error.response?.data?.error ?? errorMessage,
//         "getRewardListDetails",
//       );
//     }
//   }
// };

// interface RevenuesHistory {
//   Amount: number;
//   Date: string;
//   Type: string;
// }

// export type GetRewardListResponse = {
//   Number_of_Pages: number;
//   Page_size: number;
//   RevenuesHistory: RevenuesHistory[];
// } | null;
