import dayjs from 'dayjs';
import React from 'react';

import { DollarCoin, SigillumValue } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { BuySigillumDetailResponse } from '@/lib/auth/get-buy-meta-asset-detail';
import { SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';
import { formatNumber } from '@/utils/format-numbers-dash';

interface Props {
  onOpen: () => void;
  onOpenBuySigillumModal: () => void;
  SigillumDetails: SigillumDetailsResponse | null | undefined;
  buySigillumDetail: BuySigillumDetailResponse | null | undefined;
}

const SigillumDetailComponent: React.FC<Props> = ({
  onOpenBuySigillumModal,
  SigillumDetails,
  buySigillumDetail,
  onOpen,
}) => {
  function handleBuyMetaClick() {
    onOpenBuySigillumModal();
  }

  if (!SigillumDetails) {
    return (
      <div className="w-full rounded-xl box-3d px-6 py-8  text-white">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="border-gray-shade-1/10 size-12 flex flex-shrink-0 items-center justify-center rounded-xl border">
                  <SigillumValue className=" [&>path]:!fill-brand-gold " />
                </div>
                <p className="text-sm text-white  lg:text-lg xl:text-xl">Sigillum Details</p>
              </div>
              <Button
                title="Buy Sigillum"
                variant="confirm"
                size="lg"
                compact
                className="hidden w-full max-w-max lg:block"
                onClick={handleBuyMetaClick}
              />
            </div>

            <Button
              title="Buy Sigillum"
              variant="confirm"
              size="lg"
              compact
              className="mt-2 block w-full lg:hidden"
              onClick={handleBuyMetaClick}
            />
            <div className="bg-gray-shade-1/10 h-[2px] w-full"></div>

            <div className="flex w-full flex-col items-center justify-center gap-4 py-4 text-center sm:py-8">
              <h3 className="font-sm font-normal  capitalize text-white">No Assets Found</h3>
              <p className="max-w-[70ch] text-sm font-normal text-gray">
                It seems that you have not yet purchased any Sigillum. Each Sigillum will cost US$
                100.00 (one hundred) so if you are interested in purchasing one or more Sigillum
                remember to top up multiples of $100 when you make your deposit.
              </p>
            </div>
          </div>
      </div>
    );
  }
  const {
    contract_expiry_date = 'N/A',
    contract_start_date = 'N/A',
    minted_offices = 0,
    minted_offices_in_usd = 0,
    owned_offices = 0,
    owned_offices_in_usd = 0,
    usdt_earned_last_month = 0,
    usdt_earned_untill_now = 0,
    equity_percentage = 0,
    received_rewards = 0,
  } = SigillumDetails;
  const totalRewardsDuration = buySigillumDetail?.duration ?? 0;

  return (
    <div className="w-full rounded-xl box-3d p-6  text-white">
        <div className="flex flex-col gap-6 h-full justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm ">Sigillum Details</p>
            </div>
            <Button
              title="Buy Sigillum"
              variant="confirm"
              size="lg"
              compact
              className="hidden w-full max-w-max"
              onClick={handleBuyMetaClick}
            />
  
          </div>
          <div className="grid grid-cols-1 gap-7 xxl:grid-cols-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">Owned Sigillum</p>
              <p className="text-sm text-white">
                {Number(owned_offices).toFixed(4)}{' '}
                <span className="font-normal">(~ $ {formatNumber(owned_offices_in_usd)})</span>
              </p>
            </div>
            {owned_offices > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-xxs text-white">Position opened on</p>
                <p className="text-sm text-white ">
                  {dayjs(contract_start_date).format('DD MMM YYYY')}
                </p>
              </div>
            )}

            {owned_offices > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-xxs text-white">Position will close on</p>
                <p className="text-sm text-white ">
                  {dayjs(contract_expiry_date).format('DD MMM YYYY')}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">Rewards Received</p>
              <p className="text-sm text-white ">
                {received_rewards} / {totalRewardsDuration || 'N/A'}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">US$ Earned Until Now</p>
              <p className="flex items-center gap-1 text-sm text-white ">
                <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                <span>{usdt_earned_untill_now} US$</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">US$ Earned Last Month</p>
              <p className="flex items-center gap-1 text-sm text-white ">
                <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                <span>{usdt_earned_last_month} US$</span>
              </p>
            </div>
          </div>
          <Button
            title="Buy Sigillum"
            variant="confirm"
            size="lg"
            compact
            className="mt-2 block w-full lg:hidden"
            onClick={handleBuyMetaClick}
            fullWidth
          />
        </div>
    </div>
  );
};

export default SigillumDetailComponent;
