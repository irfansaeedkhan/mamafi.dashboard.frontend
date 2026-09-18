'use client';
import { TransactionTable } from '@/components/dashboard';
import DashboardCards from '@/components/dashboard/dashboard-cards';
import { DashboardPageSkeleton } from '@/components/dashboard/page-skeleton';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

import { CardTransactionTable } from '@/components/dashboard/card-transaction-table';
import { CardTransactionTableMobile } from '@/components/dashboard/card-transaction-table-mobile';
import { TransactionTableMobile } from '@/components/dashboard/transaction-table-mobile';

import { getAvailableBalance, GetAvailableBalanceResponse } from '@/lib/auth/get-available-balance';
import { TABLE_PAGE_SIZE, getPageCount } from '@/utils/table-pagination';
import {
  BuySigillumDetailResponse,
  getBuySigillumDetail,
} from '@/lib/auth/get-buy-meta-asset-detail';
import { getSigillumDetails, SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';
import {
  getTransactionDetail,
  GetTransactionDetailResponse,
} from '@/lib/auth/get-transaction-details';

import { getProfileDataApiResponseType } from '@/components/profile/profile-card-data';
import { useTutorial } from '@/hooks/use-tutorial';
import {
  getCardTransactionDetail,
  GetCardTransactionDetailResponse,
} from '@/lib/auth/get-card-transaction-details';
import { getProfile } from '@/lib/auth/get-profile';
import { GetRewardListItemResponse, getShowRewardListDetails } from '@/lib/auth/get-rewards-list';

const RevenueGraph = dynamic(() => import('@/components/dashboard/graph'), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] rounded-xl box-3d p-5">
      <div className="h-full w-full animate-pulse rounded-lg bg-light/70" />
    </div>
  ),
});

const UserDashboard = () => {
  // const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rewardListpage, setRewardListPage] = useState(1);
  const [rewardListTotalPages, setRewardListTotalPages] = useState(0);
  const [profileData, setProfileData] = useState<getProfileDataApiResponseType | null>(null);

  // Tutorial state
  const { initializeTutorial } = useTutorial();

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleRewardLlistNextPage = () => {
    if (rewardListpage < rewardListTotalPages) {
      setRewardListPage(prevPage => prevPage + 1);
    }
  };

  const handleRewardlistPrevPage = () => {
    if (rewardListpage > 1) {
      setRewardListPage(prevPage => prevPage - 1);
    }
  };

  // States
  const [successPurchase, setSuccessPurchase] = useState<boolean>(false);
  const [SigillumDetails, setSigillumDetails] = useState<SigillumDetailsResponse>();
  const [buySigillumDetail, setBuySigillumDetail] = useState<BuySigillumDetailResponse>();
  const [transactionDetailList, setTransactionDetailList] =
    useState<GetTransactionDetailResponse>();
  const [cardTransactionDetailList, setCardTransactionDetailList] =
    useState<GetCardTransactionDetailResponse>();
  const [availableBalance, setAvailableBalance] = useState<GetAvailableBalanceResponse>();
  const [rewardList, setRewardList] = useState<GetRewardListItemResponse>();
  const [selectedTransactionTab, setSelectedTransactionTab] = useState<string>('balance');

  // API CALLS
  const GetSigillumDetails = useCallback(async () => {
    try {
      const res = await getSigillumDetails();
      setSigillumDetails(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const GetBuySigillumDetail = useCallback(async () => {
    try {
      const res = await getBuySigillumDetail();
      setBuySigillumDetail(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const GetTransactionDetail = useCallback(async () => {
    try {
      const res = await getTransactionDetail();
      setTransactionDetailList(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const GetCardTransactionDetail = useCallback(async () => {
    try {
      const res = await getCardTransactionDetail();
      setCardTransactionDetailList(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const GetBalanceData = useCallback(async () => {
    try {
      const res = await getAvailableBalance();
      setAvailableBalance(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetRewardsListDetails = useCallback(async () => {
    try {
      const res = await getShowRewardListDetails();
      setRewardList(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Load all data on mount — never leave the skeleton up if a request hangs.
  useEffect(() => {
    let cancelled = false;
    const safetyTimer = window.setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 8_000);

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const results = await Promise.allSettled([
          getProfile().then(res => {
            if (!cancelled) setProfileData(res);
          }),
          getAvailableBalance().then(res => {
            if (!cancelled) setAvailableBalance(res);
          }),
          getSigillumDetails().then(res => {
            if (!cancelled) setSigillumDetails(res);
          }),
          getBuySigillumDetail().then(res => {
            if (!cancelled) setBuySigillumDetail(res);
          }),
          getTransactionDetail().then(res => {
            if (cancelled) return;
            setTransactionDetailList(res);
            setTotalPages(getPageCount(res?.length ?? 0, TABLE_PAGE_SIZE));
          }),
          getCardTransactionDetail().then(res => {
            if (cancelled || !res) return;
            setCardTransactionDetailList(res);
            setTotalPages(current => Math.max(current, getPageCount(res.length, TABLE_PAGE_SIZE)));
          }),
          getShowRewardListDetails().then(res => {
            if (cancelled) return;
            setRewardList(res);
            setRewardListTotalPages(getPageCount(res?.length ?? 0, TABLE_PAGE_SIZE));
          }),
        ]);

        results.forEach(result => {
          if (result.status === 'rejected') {
            console.error(result.reason);
          }
        });
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        if (!cancelled) setLoading(false);
        window.clearTimeout(safetyTimer);
      }
    };

    fetchAllData();
    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
    };
  }, []);

  // Function to refresh data after successful purchase
  const refreshDataAfterPurchase = useCallback(async () => {
    try {
      await Promise.allSettled([
        GetBalanceData(),
        GetSigillumDetails(),
        GetTransactionDetail(),
        GetCardTransactionDetail(),
      ]);
    } catch (error) {
      console.error('Error refreshing data after purchase:', error);
    }
  }, [GetBalanceData, GetSigillumDetails, GetTransactionDetail, GetCardTransactionDetail]);

  // Explicit refresh for top dashboard cards after card payment success-close
  const refreshCardsData = useCallback(async () => {
    try {
      await Promise.allSettled([GetBalanceData(), GetSigillumDetails()]);
    } catch (error) {
      console.error('Error refreshing dashboard cards data:', error);
    }
  }, [GetBalanceData, GetSigillumDetails]);

  // Handle successful purchase
  useEffect(() => {
    if (successPurchase) {
      refreshDataAfterPurchase();
      setSuccessPurchase(false);
    }
  }, [successPurchase, refreshDataAfterPurchase]);

  useEffect(() => {
    if (profileData?.IsFirstLogin === undefined) return;
    initializeTutorial({ isFirstLogin: profileData.IsFirstLogin });
  }, [profileData?.IsFirstLogin, initializeTutorial]);

  if (loading) {
    return <DashboardPageSkeleton />;
  }

  return (
    <div className="z-10 flex flex-col gap-5">
      <DashboardCards
        availableBalance={availableBalance}
        SigillumDetails={SigillumDetails}
        buySigillumDetail={buySigillumDetail}
        rewardListData={rewardList}
        handleRewardLlistNextPage={handleRewardLlistNextPage}
        handleRewardlistPrevPage={handleRewardlistPrevPage}
        rewardListpage={rewardListpage}
        setSuccessPurchase={setSuccessPurchase}
        onRefreshCardsData={refreshCardsData}
        isDemo={profileData?.IsDemo ?? false}
      />

      <RevenueGraph />

      {/* transaction history */}
      <div className="z-10 flex w-full flex-col rounded-xl box-3d">
        <div className="flex flex-col items-start gap-4 px-6 py-5">
          <span className="text-base font-normal leading-7 text-white md:text-xl">
            Transaction History
          </span>
          {/* tabs */}
          <div className="flex items-center gap-4">
            <button
              className={`${
                selectedTransactionTab === 'balance' ? 'text-brand-mint' : 'text-white/50'
              } flex items-center gap-2`}
              onClick={() => {
                setSelectedTransactionTab('balance');
                setPage(1);
              }}
            >
              <span className="text-sm font-medium leading-7">Balance</span>
            </button>
            <button
              className={`${
                selectedTransactionTab === 'card' ? 'text-brand-mint' : 'text-white/50'
              } flex items-center gap-2`}
              onClick={() => {
                setSelectedTransactionTab('card');
                setPage(1);
              }}
            >
              <span className="text-sm font-medium leading-7">Card</span>
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          {/* balance transaction */}
          {selectedTransactionTab === 'balance' && (
            <div className="w-full">
              <div className="hidden lg:block">
                <TransactionTable
                  transactionDetailList={transactionDetailList}
                  page={page}
                  setPage={setPage}
                />
              </div>
              <div className="block lg:hidden">
                <TransactionTableMobile
                  transactionDetailList={transactionDetailList}
                  // transactionDetailList={undefined}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  page={page}
                />
              </div>
            </div>
          )}
          {/* card transaction */}

          {selectedTransactionTab === 'card' && (
            <div className="w-full">
              <div className="hidden lg:block">
                <CardTransactionTable
                  cardTransactionDetailList={cardTransactionDetailList}
                  page={page}
                  setPage={setPage}
                />
              </div>
              <div className="block lg:hidden">
                <CardTransactionTableMobile
                  cardTransactionDetailList={cardTransactionDetailList}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  page={page}
                />
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;
