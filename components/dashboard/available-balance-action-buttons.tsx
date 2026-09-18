'use client';

import { ETHIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import ReinvestInfoIconWithTooltip from '@/components/shared/reinvest-info-icon-tooltip';
import { getAutoReinvest } from '@/lib/auth/get-auto-reinvest';
import { GetAvailableBalanceResponse } from '@/lib/auth/get-available-balance';
import { updateAutoReinvest } from '@/lib/auth/update-auto-reinvest';
import cn from '@/utils/cn';
import { formatNumber } from '@/utils/format-numbers-dash';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  onOpen: () => void;
  onOpenWithdrawalModal: () => void;
  onOpenRewardListModal: () => void;
  isDemo: boolean;
}

function formatBalance(availableBalance: GetAvailableBalanceResponse | null | undefined) {
  if (availableBalance?.balance == null) {
    return { eth: '0.00', usd: '0.00' };
  }
  return {
    eth: Math.abs(availableBalance.balance).toFixed(2),
    usd: formatNumber(Math.abs(availableBalance.balanceInUSD ?? 0)),
  };
}

const AvailableBalanceActionButtons: React.FC<Props> = ({
  availableBalance,
  onOpenWithdrawalModal,
  onOpenRewardListModal,
  onOpen,
  isDemo,
}) => {
  const { eth: balanceDisplay, usd: balanceDisplayInUSD } = formatBalance(availableBalance);

  const [autoReinvest, setAutoReinvest] = useState(false);
  const [autoReinvestLoading, setAutoReinvestLoading] = useState(false);
  const [autoReinvestReady, setAutoReinvestReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setAutoReinvestLoading(true);
        const res = await getAutoReinvest();
        if (mounted) setAutoReinvest(Boolean(res.isAutoReinvestEnabled));
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Failed to fetch auto-reinvest status';
        toast.error(message);
      } finally {
        if (mounted) {
          setAutoReinvestLoading(false);
          setAutoReinvestReady(true);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleToggleAutoReinvest = useCallback(async () => {
    if (autoReinvestLoading || !autoReinvestReady) return;

    const nextValue = !autoReinvest;
    setAutoReinvestLoading(true);
    // Optimistic UI so the switch feels responsive
    setAutoReinvest(nextValue);

    try {
      const res = await updateAutoReinvest(nextValue);
      setAutoReinvest(Boolean(res.isAutoReinvestEnabled));
      toast.success(
        res.isAutoReinvestEnabled ? 'Auto-Reinvest enabled' : 'Auto-Reinvest disabled'
      );
    } catch (e: unknown) {
      setAutoReinvest(!nextValue);
      const message = e instanceof Error ? e.message : 'Failed to update auto-reinvest';
      toast.error(message);
    } finally {
      setAutoReinvestLoading(false);
    }
  }, [autoReinvest, autoReinvestLoading, autoReinvestReady]);

  return (
    <div className="w-full rounded-xl box-3d p-6 text-white lg:max-w-[30%]">
      <div className="flex flex-col justify-between gap-2">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Available Balance</p>
            <div className="flex flex-wrap items-center justify-start gap-2 text-xl text-white">
              <ETHIcon className="size-6 h-6 w-6 shrink-0 text-center" />
              <span className="flex items-center justify-center">
                {balanceDisplay}
                <span className="ml-1 mt-1 text-center text-xs"> ETH</span>
              </span>
              <span className="flex items-center justify-center text-sm text-white">
                <span className="mr-1">(</span>~{balanceDisplayInUSD}
                <span className="ml-1 text-center text-xs"> USD </span>
                <span className="ml-1">)</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-1 xl:grid-cols-2">
            <div className="relative w-full">
              <Button
                title="Withdraw"
                variant="confirm"
                size="sm"
                className={cn('w-full', isDemo ? 'cursor-not-allowed !opacity-30' : '')}
                onClick={!isDemo ? onOpenWithdrawalModal : undefined}
                disabled={isDemo}
              />
            </div>
            <Button
              title="Reward List"
              variant="confirm-secondary"
              size="sm"
              className="w-full"
              onClick={onOpenRewardListModal}
            />
          </div>
          <Button
            title="Deposit Address"
            variant="underline"
            size="sm"
            className="w-full text-xs capitalize"
            onClick={onOpen}
          />
        </div>
      </div>
      <hr className="border-gray-800 mx-auto w-[80%]" />

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium">Auto-Reinvest Option</p>
          <button
            type="button"
            className={cn(
              'relative h-[1.375rem] w-10 rounded-full border border-white transition-colors duration-300 focus:outline-none',
              autoReinvest ? 'bg-white' : 'bg-[#181F20]',
              (autoReinvestLoading || !autoReinvestReady) && 'cursor-wait opacity-70'
            )}
            onClick={handleToggleAutoReinvest}
            disabled={autoReinvestLoading || !autoReinvestReady}
            aria-checked={autoReinvest}
            aria-label="Toggle auto-reinvest"
            role="switch"
          >
            <span
              className={cn(
                'absolute left-[0.045rem] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full shadow-md transition-transform duration-300',
                autoReinvest
                  ? 'translate-x-5 bg-gradient-pattern'
                  : 'translate-x-[0.188rem] bg-white',
                autoReinvestLoading && 'opacity-60'
              )}
            />
          </button>
        </div>
        <ReinvestInfoIconWithTooltip
          text="When enabled, your weekly earnings are automatically added to your existing Sigillum."
          color="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default AvailableBalanceActionButtons;
