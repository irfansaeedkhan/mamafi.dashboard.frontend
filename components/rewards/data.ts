'use client';
import React from 'react';
import { PersonalRewardsIcon, ReferralRewardsIcon } from '@/assets/svgs';
import { IconProps } from '../dashboard/sidebar-data';

export type RewardsType = {
  title: string;
  amount: number;
  amountCoin: string;
  amount_description: string;
  metaData: {
    title: string;
    value: string;
  }[];
  icon: React.JSXElementConstructor<IconProps>;
};
export const RewardsData: RewardsType[] = [
  {
    title: 'Personal Rewards',
    amount: 2000,
    amountCoin: 'US$',
    amount_description: 'Total Personal Rewards from Staking activity',
    metaData: [
      {
        title: 'Sigillum',
        value: '20',
      },
      {
        title: 'Royalty',
        value: '400,00 US$',
      },
      {
        title: 'Total Assets Value',
        value: ' 10.000,00  US$',
      },
    ],
    icon: PersonalRewardsIcon,
  },
  {
    title: 'Referral Rewards',
    amount: 2000,
    amountCoin: 'US$',
    amount_description: 'Total Personal Rewards derived from your Referrals',
    metaData: [
      {
        title: 'Referrals',
        value: '3',
      },
      {
        title: 'Sigillum',
        value: '10',
      },
      {
        title: 'Total Assets Value',
        value: ' 5.000,00 US$ ',
      },
      {
        title: 'Reward Percentage',
        value: '7%',
      },
      {
        title: 'Sales Commission',
        value: '350,00 US$ ',
      },
    ],
    icon: ReferralRewardsIcon,
  },
];
