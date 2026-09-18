import { ExclaimationIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { GetRewardListItemResponse } from '@/lib/auth/get-rewards-list';
import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ModalContainer from '../shared/modal-container';
import TotalNumberField from '../shared/total-number-field';
import { RewardListTable } from './reward-list-table';
import { RewardListTableMobile } from './reward-list-table-mobile';
interface Props {
  open: boolean;
  onClose: () => void;
  rewardListData: GetRewardListItemResponse | null | undefined;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  page: number;
}

export const RewardListlModal: React.FC<Props> = ({
  open,
  onClose,
  rewardListData,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  if (!rewardListData) {
    return (
      <ModalContainer
        modalId="withdrawal-modal"
        isOpen={open}
        onClose={onClose}
        modalContentClassName="h-auto rounded-xl sm:max-w-[560px] max-w-[343px]"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex w-full flex-col items-center text-center">
          <ExclaimationIcon className="size-8 mx-auto shrink-0 cursor-pointer" />
          <div className="content pb-8 pt-3 text-center">
            <h3 className="text-white mx-auto pb-2 pt-1 text-center text-base font-semibold capitalize sm:text-lg">
              No reward available
            </h3>
            <p className="text-sm font-normal text-white">
              Unfortunately, you have no reward available now.
            </p>
          </div>
          <Button
            title="Got it"
            variant="confirm"
            size="lg"
            compact
            className="w-full"
            onClick={onClose}
          />
        </div>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="max-h-[90dvh] overflow-hidden rounded-xl sm:max-w-[800px] max-w-[343px] pb-1 md:pb-20"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex max-h-[80dvh] w-full max-w-[343px] flex-col gap-8  sm:max-w-[800px]">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white sm:text-xl">Rewards List</h3>
            {rewardListData && (
              <TotalNumberField bgColor="bg-light" length={rewardListData.length} />
            )}
          </div>

          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        {rewardListData && (
          <div className="custom-scrollbar flex max-h-[80dvh] w-full max-w-[343px] flex-col gap-8 sm:max-w-[800px] md:overflow-y-auto">
            <div className="hidden lg:block">
              <RewardListTable rewardListData={rewardListData} page={page} />
            </div>
            <div className="block lg:hidden">
              <RewardListTableMobile
                rewardListData={rewardListData}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                page={page}
              />
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};
