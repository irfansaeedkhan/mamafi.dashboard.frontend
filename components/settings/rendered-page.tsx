'use client';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { PersonalInfo } from './personal-info';
import { UpdatePassword } from './update-password';
import { getProfile } from '@/lib/auth/get-profile';
import { getProfileDataApiResponseType } from '../profile/profile-card-data';
import { CgSpinner } from 'react-icons/cg';

export const RenderedPage = () => {
  const params = useSearchParams();
  const [current_tab, setCurrentTab] = useState('personal_info');
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
    setCurrentTab(params.get('tab' as string) ?? 'update_password');
    getProfileData();
  }, [getProfileData, params]);

  return current_tab === 'personal_info' && profileData ? (
    <PersonalInfo {...profileData} getProfileData={getProfileData} />
  ) : current_tab === 'update_password' ? (
    <UpdatePassword getProfileData={getProfileData} />
  ) : (
    <div className="mt-20 flex w-full items-center justify-center">
      <CgSpinner className="size-10 animate-spin text-white" />
    </div>
  );
};
