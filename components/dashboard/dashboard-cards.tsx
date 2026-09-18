'use client';
import { GetAvailableBalanceResponse } from '@/lib/auth/get-available-balance';
import { BuySigillumDetailResponse } from '@/lib/auth/get-buy-meta-asset-detail';
import { SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';
import { GetRewardListItemResponse } from '@/lib/auth/get-rewards-list';
import React, { useState } from 'react';
import AvailableBalanceActionButtons from './available-balance-action-buttons';
import { BuySigillumModal } from './buy-meta-asset-modal';
import { DepositeAddressModal } from './deposite-address-modal';
import SigillumDetailComponent from './meta-assets-detail-component';
import { NotEnoughBalanceModel } from './not-enough-balance-modal';
import { RewardListlModal } from './rewardlist-modal';
import { WithdrawalModal } from './withdrawal-modal';

interface Props {
  rewardListData: GetRewardListItemResponse | null | undefined;
  handleRewardLlistNextPage: () => void;
  handleRewardlistPrevPage: () => void;
  // handleNetworkSelect: (selectedNetwork: NetworkOption) => void;
  rewardListpage: number;
  SigillumDetails: SigillumDetailsResponse | null | undefined;
  buySigillumDetail: BuySigillumDetailResponse | null | undefined;
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  setSuccessPurchase: any;
  onRefreshCardsData: () => Promise<void>;
  isDemo: boolean;
}

const DashboardCards: React.FC<Props> = ({
  rewardListData,
  handleRewardLlistNextPage,
  handleRewardlistPrevPage,
  rewardListpage,
  SigillumDetails,
  buySigillumDetail,
  availableBalance,
  setSuccessPurchase,
  onRefreshCardsData,
  isDemo,
}) => {
  const [open, setOpen] = useState(false);
  const [openBuySigillumModal, setOpenBuySigillumModal] = useState(false);
  const [openNotEnoughBalanceModal, setOpenNotEnoughBalanceModal] = useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);
  const [onOpenRewardListModal, setOnOpenRewardListModal] = useState(false);

  return (
    <div className="z-10">
      <div className="z-10 flex flex-col gap-5 lg:flex-row">
        <AvailableBalanceActionButtons
          availableBalance={availableBalance}
          onOpenWithdrawalModal={() => setOpenWithdrawalModal(true)}
          onOpenRewardListModal={() => setOnOpenRewardListModal(true)}
          onOpen={() => setOpen(true)}
          isDemo={isDemo}
        />
        <SigillumDetailComponent
          SigillumDetails={SigillumDetails}
          buySigillumDetail={buySigillumDetail}
          onOpenBuySigillumModal={() => setOpenBuySigillumModal(true)}
          onOpen={() => setOpen(true)}
        />
      </div>
      <DepositeAddressModal open={open} onClose={() => setOpen(false)} />
      <WithdrawalModal
        open={openWithdrawalModal}
        availableBalance={availableBalance}
        onClose={() => setOpenWithdrawalModal(false)}
        isDemo={isDemo}
      />
      {!!buySigillumDetail && (
        <BuySigillumModal
          open={openBuySigillumModal}
          setSuccessPurchase={setSuccessPurchase}
          onRefreshCardsData={onRefreshCardsData}
          buySigillumDetail={buySigillumDetail}
          SigillumDetails={SigillumDetails}
          onOpenNotEnoughBalanceModal={() => setOpenNotEnoughBalanceModal(true)}
          availableBalance={availableBalance}
          onClose={() => setOpenBuySigillumModal(false)}
        />
      )}

      <NotEnoughBalanceModel
        open={openNotEnoughBalanceModal}
        onClose={() => setOpenNotEnoughBalanceModal(false)}
      />

      <RewardListlModal
        open={onOpenRewardListModal}
        rewardListData={rewardListData}
        onClose={() => setOnOpenRewardListModal(false)}
        handlePrevPage={handleRewardlistPrevPage}
        handleNextPage={handleRewardLlistNextPage}
        page={rewardListpage}
      />
    </div>
  );
};

export default DashboardCards;
