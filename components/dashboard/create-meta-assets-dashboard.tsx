import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr';

import { CarretDownIcon, CarretUpIcon, ExclaimationIcon } from '@/assets/svgs';
import { GetAvailableBalanceResponse } from '@/lib/auth/get-available-balance';
import { BuySigillumDetailResponse } from '@/lib/auth/get-buy-meta-asset-detail';
import { SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';
import { Button } from '../shared';

import { getPrice } from '@/lib/get-price';
import { getPriceChanges } from '@/lib/get-price-changes';
import { AppRoutes } from '@/constants/app-routes';
import { CustomNumberInput } from '../shared/custom-number-input';
import { CreateOrderModal } from './meta-assets/create-order-modal';
import { CreateOrderUsingCardModal } from './meta-assets/create-order-using-card-modal';

interface Props {
  buySigillumDetail: BuySigillumDetailResponse;
  setSuccessPurchase: any;
  onRefreshCardsData: () => Promise<void>;
  mainModelClose: () => void;
  SigillumDetails: SigillumDetailsResponse | null | undefined;
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  onOpenNotEnoughBalanceModal: () => void;
}
export const CreateSigillumDashboard: React.FC<Props> = ({
  buySigillumDetail,
  setSuccessPurchase,
  onRefreshCardsData,
  mainModelClose,
  SigillumDetails,
  availableBalance,
  onOpenNotEnoughBalanceModal,
}) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [ethPriceChanges, setEthPriceChanges] = useState<{
    dailyChange: number;
    dailyChangeInUSD: number;
  }>({ dailyChange: 0, dailyChangeInUSD: 0 });
  const { duration, price, id, price_in_eth } = buySigillumDetail;

  // todays day
  const today = new Date();
  const StartDate = dayjs(today).format('DD MMM, YYYY');

  const handleChange = (value: number) => {
    setValue(value);
  };

  const GetPriceChanges = useCallback(async () => {
    try {
      const res = await getPriceChanges({ base: 'ETH', quote: 'USDT' });
      setEthPriceChanges(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const GetPrice = useCallback(async () => {
    try {
      const res = await getPrice({ base: 'ETH', quote: 'USDT' });
      setEthPrice(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleBuyMetaWithBalanceClick() {
    if (
      !availableBalance ||
      availableBalance?.balance === 0 ||
      availableBalance?.balance < price_in_eth
    ) {
      onOpenNotEnoughBalanceModal();
    } else {
      setOpenModal(true);
    }
  }

  useEffect(() => {
    GetPrice();
  }, [GetPrice]);

  useEffect(() => {
    GetPriceChanges();
  }, [GetPriceChanges]);

  return (
    <div className="col-span-1 flex h-auto w-full flex-col gap-4 rounded-xl box-3d px-2 py-6 md:p-6">
      <div className="flex flex-col items-center justify-between gap-3">
        <h6 className="text-base font-normal text-white">Buy Sigillum</h6>
        <div className="lg:max-w-[20 0px] flex h-10 w-full max-w-[160px] items-center justify-between gap-3 rounded-full bg-dark p-1 px-3">
          <button onClick={() => handleChange(value - 1)} disabled={value === 0}>
            <GrSubtractCircle className="size-6 h-6 w-6  flex-shrink-0 stroke-white" />
          </button>
          <CustomNumberInput
            className="focus:ring-blue-shade-1 flex h-8 w-16 items-center justify-center rounded-md bg-transparent text-center text-base font-semibold text-white focus:outline-none focus:ring-1"
            value={value === 0 ? '' : value}
            placeholder="0"
            onChange={e => handleChange(+e.target.value)}
          />
          <button onClick={() => handleChange(value + 1)}>
            <GrAddCircle className="size-6  h-6 w-6  flex-shrink-0 stroke-white" />
          </button>
        </div>
      </div>
      {SigillumDetails?.owned_offices ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-light p-4">
          <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
          <h3 className="pt-1 font-kanit text-xs font-normal text-white sm:text-sm">
            You already have an opened position, these Sigillum will be added to the cycle of your
            currently opened position.
          </h3>
        </div>
      ) : null}
      <div className="mt-1 flex h-full flex-col justify-between gap-[14px]">
        <div className="mt-1 flex flex-col gap-[14px]">
          <div className={mainWrap}>
            <h3 className={firstChild}>Start Date</h3>
            <h3 className={secondChild}>{StartDate}</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Duration Lockup</h3>
            <h3 className={secondChild}>{duration} weeks</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Single Pack Cost</h3>
            <h3 className={secondChild}>{price} US$</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={`${firstChild} font-semibold`}>Total Amount</h3>
            <h3 className={`${secondChild} font-semibold`}>{price * value} US$</h3>
          </div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-white">ETH equivalent</h3>
            <div className="flex flex-col items-end gap-2">
              <h3 className="text-bold text-base text-white">
                {(value * price_in_eth).toFixed(4)} ETH
              </h3>
              <div className="flex flex-col items-end gap-5 lg:flex-row lg:items-start">
                <h5 className="-mt-1 text-sm font-medium text-white">Current ETH price</h5>
                <div className="flex flex-col gap-1">
                  <h6 className="text-xs font-bold text-white">1ETH = US$ {ethPrice.toFixed(2)}</h6>
                  {ethPriceChanges.dailyChange >= 0 ? (
                    <div className="flex items-center gap-1 text-xxs font-medium">
                      <h6 className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-mint">
                        <CarretUpIcon className="size-4 fill-brand-mint stroke-brand-mint" />{' '}
                        {ethPriceChanges.dailyChange}%
                      </h6>
                      <h6 className="text-sm text-xxs font-medium text-white/50">
                        (~ US$ {ethPriceChanges.dailyChangeInUSD})
                      </h6>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xxs font-medium">
                      <h6 className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-red">
                        <CarretDownIcon className="size-4 fill-brand-red stroke-brand-red" />{' '}
                        {ethPriceChanges.dailyChange}%
                      </h6>
                      <h6 className="text-sm text-xxs font-medium text-white/50">
                        (~ US$ {ethPriceChanges.dailyChangeInUSD})
                      </h6>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Button
            title="Pay with card"
            variant="confirm"
            size="lg"
            compact
            disabled={value === 0}
            onClick={() => setOpenCardModal(true)}
            className="w-full"
          />
          <Button
            variant="confirm"
            outlineBG="light"
            title="Pay with Balance"
            size="lg"
            compact
            disabled={value === 0}
            onClick={handleBuyMetaWithBalanceClick}
            className="w-full"
          />
          <Button
            title="Pay with Bank transfer"
            variant="underline-gradient"
            size="lg"
            compact
            disabled={value === 0}
            onClick={() => router.push(AppRoutes.dashboard.kyc)}
            className="w-full [&>span]:uppercase"
          />
        </div>
      </div>
      <CreateOrderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        mainModelClose={mainModelClose}
        totalamount={price * value}
        id={id}
        numberOfUnits={value}
        StartDate={StartDate}
        duration={duration}
        setSuccessPurchase={setSuccessPurchase}
        SigillumDetails={SigillumDetails}
      />
      <CreateOrderUsingCardModal
        open={openCardModal}
        onClose={() => setOpenCardModal(false)}
        mainModelClose={mainModelClose}
        totalamount={price * value}
        singleamount={price}
        id={id}
        numberOfUnits={value}
        StartDate={StartDate}
        duration={duration}
        setSuccessPurchase={setSuccessPurchase}
        onRefreshCardsData={onRefreshCardsData}
        SigillumDetails={SigillumDetails}
      />
    </div>
  );
};

const mainWrap = 'flex items-center justify-between gap-3';
const firstChild = 'text-white text-sm font-medium';
const secondChild = 'text-white text-sm font-medium';
