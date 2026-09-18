import { GetAvailableBalanceResponse } from '@/lib/auth/get-available-balance';
import { BuySigillumDetailResponse } from '@/lib/auth/get-buy-meta-asset-detail';
import { SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';
import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ModalContainer from '../shared/modal-container';
import { CreateSigillumDashboard } from './create-meta-assets-dashboard';

interface Props {
  open: boolean;
  onClose: () => void;
  buySigillumDetail: BuySigillumDetailResponse;
  SigillumDetails: SigillumDetailsResponse | null | undefined;
  setSuccessPurchase: any;
  onRefreshCardsData: () => Promise<void>;
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  onOpenNotEnoughBalanceModal: () => void;
}

export const BuySigillumModal: React.FC<Props> = ({
  open,
  onClose,
  buySigillumDetail,
  setSuccessPurchase,
  onRefreshCardsData,
  SigillumDetails,
  availableBalance,
  onOpenNotEnoughBalanceModal,
}) => {
  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl sm:max-w-[566px] max-w-[343px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white sm:text-xl">Buy Sigillum</h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        {buySigillumDetail && (
          <CreateSigillumDashboard
            setSuccessPurchase={setSuccessPurchase}
            onRefreshCardsData={onRefreshCardsData}
            buySigillumDetail={buySigillumDetail}
            SigillumDetails={SigillumDetails}
            availableBalance={availableBalance}
            onOpenNotEnoughBalanceModal={onOpenNotEnoughBalanceModal}
            mainModelClose={onClose}
          />
        )}
      </div>
    </ModalContainer>
  );
};
