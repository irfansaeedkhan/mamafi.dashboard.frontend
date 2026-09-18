'use client';

import { ReferralTable } from '@/components/dashboard/affiliates/referral-table';
import { ReferralTableMobile } from '@/components/dashboard/affiliates/referral-table-mobile';
import { RewardsCard } from '@/components/rewards';
import { AffiliateStatus, AffiliatesListType, getAffiliates } from '@/lib/auth/get-affiliates-list';
import { RewardsDetailsResp, getRewardsDetails } from '@/lib/auth/get-rewards';
import { useCallback, useEffect, useState } from 'react';

const Affiliates = () => {
  const [affiliatesList, setAffiliatesList] = useState<AffiliatesListType[]>();
  const [refferalRewards, setRefferalRewards] = useState<RewardsDetailsResp | null>(null);
  const [isLoading, setIsLoading] = useState('idle');
  const [selectedFilter, setSelectedFilter] = useState<AffiliateStatus>('ALL');

  const getReward = useCallback(async () => {
    try {
      const res = await getRewardsDetails();
      if (!res) return;
      setRefferalRewards(res);
    } catch (error: any) {
      console.log('error', error);
    }
  }, []);

  const getAffiliatesDetails = useCallback(async () => {
    setIsLoading('pending');
    try {
      const res = await getAffiliates(selectedFilter);
      setAffiliatesList(res);
      setIsLoading('resolved');
    } catch (error) {
      setIsLoading('rejected');
      console.log(error);
    }
  }, [selectedFilter]);

  useEffect(() => {
    getReward();
  }, [getReward]);

  useEffect(() => {
    getAffiliatesDetails();
  }, [getAffiliatesDetails]);

  const handleFilterChange = (value: AffiliateStatus | string) => {
    setSelectedFilter(value as AffiliateStatus);
  };

  return (
    <div className="z-10 flex flex-col gap-4">
      <div className="grid gap-3 lg:grid-cols-1">
        <RewardsCard refferalRewards={refferalRewards} />
      </div>
      <div className="z-10 hidden lg:block ">
        <ReferralTable
          affiliatesList={affiliatesList}
          isLoading={isLoading}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="z-10 block lg:hidden ">
        <ReferralTableMobile
          affiliatesList={affiliatesList}
          isLoading={isLoading}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Affiliates;
