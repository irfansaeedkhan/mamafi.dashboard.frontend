export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type DashboardApiResponse = {
  Available_Balance: number;
  Company_Lands_Value: number;
  Contract_Start_Date: string;
  Contract_Expiry_Date: string;
  Equity_Percentage: number;
  Lands_Value: number;
  Minted_Lands: number;
  Onwhitdraw_balance: number;
  Number_of_Pages: number;
  Page_size: number;
  Owned_Lands: number;
  ROI_Last_Month: number;
  ROI_Until_Now: number;
  Supply_Max: number;
  Wallet_Address: string;
  return_stats_arrays:
    | {
        percentages: { [key: string]: number }[];
        year: string;
      }[]
    | null
    | [];
  transactions_list:
    | {
        Amount: number;
        Status: 'Pending' | 'Approved' | 'Rejected';
        Transaction_Date: string;
        Transaction: string;
        TxHash: string;
        Type: string;
      }[]
    | null
    | [];
};
