'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { MyProfileCard, ProfileCommonTop } from '@/components/profile';
import { getProfileDataApiResponseType } from '@/components/profile/profile-card-data';
import { getProfile } from '@/lib/auth/get-profile';
import { DepositAddressCard } from '@/components/profile/deposit-address-card';
import { ReferralAddressCard } from '@/components/profile/referrals-address-card';
import { DepositAddressMobileCard } from '@/components/profile/deposit-address-mobile-card';
import PersonalInfoCard from '@/components/profile/personal-info-card';

const MyProfile = () => {
  const [profileData, setProfileData] = useState<getProfileDataApiResponseType>();

  const getProfileData = useCallback(async () => {
    try {
      const res = await getProfile();
      setProfileData(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="z-10 flex w-full flex-col gap-5 lg:max-w-[40%]">
        <ProfileCommonTop />
        <PersonalInfoCard {...profileData} />
        <ReferralAddressCard {...profileData} />
      </div>
      <div className="hidden w-full flex-1 lg:flex">
        <DepositAddressCard />
      </div>
      <div className="z-10 block flex-1 lg:hidden">
        <DepositAddressMobileCard />
      </div>
    </div>
  );
};

export default MyProfile;
