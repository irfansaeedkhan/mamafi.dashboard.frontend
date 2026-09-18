'use client';

import { DollarCoin } from '@/assets/svgs';
import { RewardsDetailsResp } from '@/lib/auth/get-rewards';
import { formatNumber } from '@/utils/format-numbers-dash';
import React from 'react';
import InfoIconWithTooltip from '../shared/info-icon-tooltip';

interface Props {
  refferalRewards: RewardsDetailsResp | null;
}

export const RewardsCard: React.FC<Props> = ({ refferalRewards }) => {
  return (
    <div className="flex w-full flex-col justify-between lg:gap-8 gap-4 rounded-xl box-3d p-6 text-white md:flex-row">
      <div className="flex-1 md:px-6">
        <h3 className="text-base text-white md:text-xl">Referral Details</h3>
        <p className="pt-1 text-xs text-[#666666] md:text-sm">
          Total Personal Rewards derived from your Referrals
        </p>
      </div>
      <hr className="w-full border border-light md:hidden" />
      {/* Users Joined You Section - Center */}
      <div className="flex-1 md:px-6">
        <div className="flex items-center justify-between gap-4">
        <h3 className=" text-white text-sm font-semibold">Users Joined You</h3>
        <p className="pt-1 text-sm font-medium text-white md:text-base">
          {refferalRewards?.referrals ?? 'N/A'}
        </p>
        </div>
     
                <div className="mt-4 flex flex-col gap-2 pl-4">
            <div className="flex items-center justify-between gap-4">
             <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-white mt-[-1px]"></div>
             <span className="text-xs text-white md:text-sm">Level 1</span>
             </div>
              <span className="text-sm font-medium text-white md:text-base">
                {refferalRewards?.level1Count ?? 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-white mt-[-1px]"></div>
             <span className="text-xs text-white md:text-sm">Level 2</span>
             </div>
              <span className="text-sm font-medium text-white md:text-base">
                {refferalRewards?.level2Count ?? 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-white mt-[-1px]"></div>
             <span className="text-xs text-white md:text-sm">Level 3</span>
             </div>
              <span className="text-sm font-medium text-white md:text-base">
                {refferalRewards?.level3Count ?? 'N/A'}
              </span>
            </div>
        </div>
      </div>
      <hr className="w-full border border-light md:hidden" />
      <div className="flex flex-1 flex-col gap-[14px] md:px-6">
        <div className={mainWrap}>
          <h3 className={firstChild}>Elegible For Referral Rewards</h3>
          <h3 className={`${secondChild} !text-brand-mint`}>
            <InfoIconWithTooltip color="#FFAA21" text="Referral Rewards will be paid to you only if you have purchased at least one Sigillum." />
            {refferalRewards?.is_eligable_for_reward ? 'Yes' : 'No'}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Sigillum</h3>
          <h3 className={secondChild}>
            {refferalRewards?.meta_assets !== -1 ? refferalRewards?.meta_assets : 'N/A'}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Assets Value</h3>
          <h3 className={secondChild}>
            {refferalRewards?.total_assets_value !== undefined &&
            refferalRewards?.total_assets_value !== null &&
            refferalRewards?.total_assets_value !== -1 ? (
              <span className="flex items-center gap-1">
                <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                {formatNumber(refferalRewards?.total_assets_value)}
                &nbsp;US$
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Weekly Percentage</h3>
          <h3 className={secondChild}>{refferalRewards?.reward_percentage ?? 'N/A'}%</h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Weekly Commission</h3>
          <h3 className={secondChild}>
            {refferalRewards?.sales_comission !== undefined &&
            refferalRewards?.sales_comission !== null &&
            refferalRewards?.sales_comission !== -1 ? (
              <span className="flex items-center gap-1">
                <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                {formatNumber(refferalRewards?.sales_comission)}
                &nbsp;US$
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Last Month Rewards</h3>
          <h3 className={secondChild}>
            {refferalRewards?.last_month_rewards !== undefined &&
            refferalRewards?.last_month_rewards !== null &&
            refferalRewards?.last_month_rewards !== -1 ? (
              <span className="flex items-center gap-1">
                <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                {formatNumber(refferalRewards?.last_month_rewards)}
                &nbsp;US$
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

const mainWrap = 'flex items-center justify-between gap-3';
const firstChild = 'text-white sm:text-sm text-sm font-medium capitalize';
const secondChild = 'flex items-center gap-1 text-white text-sm font-medium min-w-max';
