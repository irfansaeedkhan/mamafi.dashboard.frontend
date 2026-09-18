'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { getProfile } from '@/lib/auth/get-profile';
import { getProfileDataApiResponseType } from '../profile/profile-card-data';

export const HeaderTitleSmallScreen = () => {
  const [profileData, setProfileData] = useState<getProfileDataApiResponseType>();
  const pathname = usePathname();
  let path = pathname.split('/').pop();
  if (path === '') {
    path = 'Dashboard';
  } else if (path?.includes('-')) {
    path = path?.split('-').join(' ');
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
    // also capitalize next word first letter
    const index = path.indexOf(' ');
    path = path.slice(0, index + 1) + path.charAt(index + 1).toUpperCase() + path.slice(index + 2);
  } else {
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
  }

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
    <div className="flex flex-col gap-6">
      <h2 className="font-kanit text-2xl font-normal md:hidden">
        {profileData && pathname === '/dashboard' && (
          <>
            <span className="text-white">Welcome Back,</span>{' '}
            <span className="text-gradient">{profileData?.Name}</span>{' '}
            <span className="bg-gradient">👋</span>
          </>
        )}
      </h2>
      <h2
        className={clsx(
          '--block mb-5 hidden font-kanit text-2xl font-black uppercase leading-8 text-white sm:mb-6 md:mb-8'
        )}
      >
        {path}
      </h2>
    </div>
  );
};
