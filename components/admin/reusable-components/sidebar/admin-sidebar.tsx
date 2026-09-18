'use client';

import axios from 'axios';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCircleUser } from 'react-icons/fa6';

import { AdminAppRoutes, AppRoutes } from '@/constants/app-routes';
import { getProfile } from '@/lib/auth/get-profile';
import { useAuthStore } from '@/stores/auth.store';

import { getProfileDataApiResponseType } from '@/components/profile/profile-card-data';
import { Button } from '@/components/shared';
import AdminMobileMenu from './admin-mobile-menu';
import { AdminSidebarData } from './admin-sidebar-data';

export const AdminSidebar = ({ toggle, setToggle }: any) => {
  const [profileData, setProfileData] = useState<getProfileDataApiResponseType>();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore(state => state.actions);

  const logoutHandler = async () => {
    try {
      logout();
      toast.success('Logged out successfully');
      await axios.delete('/auth/logout');
      router.push(AppRoutes.auth.login);
    } catch (error) {
      router.push(AppRoutes.auth.login);
    }
  };

  const handleClose = () => {
    setToggle(false);
  };

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
    <div className="z-50 w-full max-w-[260px] overflow-x-hidden lg:overflow-visible">
      <div className="hidden h-full items-center justify-center md:mx-6 md:flex md:py-[0.625rem]">
        <div className="relative hidden h-[calc(100%-16px)] w-full flex-shrink-0 flex-col justify-between rounded-lg box-3d p-[0.625rem] lg:flex">
          <div className="flex w-full flex-col items-center lg:items-start">
            <Image
              src="/images/logo-sm.png"
              alt="logo"
              width={44}
              height={44}
              unoptimized
              className="mx-auto shrink-0 object-cover mt-6 w-11 h-11"
              onClick={() => router.push(AdminAppRoutes.dashboard.index)}
            />
            <div className="mb-8 mt-6 h-[2px] w-full bg-primary" />
            <div className="w-full">
              <div className="flex flex-col items-center justify-center gap-2 pb-5">
                <FaCircleUser className="size-16 h-16 w-16 shrink-0 text-white" />
                <div className="flex flex-col gap-6">
                  {profileData && (
                    <span className="flex min-w-max flex-col items-center gap-px text-sm font-semibold text-white">
                      {`${profileData?.Name ?? ''} ${profileData?.Surname ?? ''}`}
                    </span>
                  )}
              
                  <Button title="logout" variant="confirm" size="sm" className="w-full" onClick={logoutHandler} />
                  <Button
                    title="Switch to User"
                    variant="confirm-secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push(AppRoutes.dashboard.index)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-8 mt-10 h-[2px] w-full bg-primary" />
            <div className="flex w-full flex-col gap-10 px-4 pb-4">
              {AdminSidebarData.map(item => {
                const isActive = pathname.startsWith(item.link);

                return (
                  <Link
                    href={item.link}
                    key={item.link}
                    className={clsx(
                      'group flex items-center justify-center gap-3 lg:justify-start'
                    )}
                  >
                    <item.icon
                      className={clsx(
                        'size-6 h-6 w-6 flex-shrink-0',
                        isActive ? 'fill-gradient' : 'fill-white'
                      )}
                    />
                    <p
                      className={clsx(
                        'text-sm font-medium lg:block',
                        isActive ? 'text-gradient' : 'lg:group-hover:cool-link text-white'
                      )}
                    >
                      {item.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AdminMobileMenu
        toggle={toggle}
        handleClose={handleClose}
        logoutHandler={logoutHandler}
        profileData={profileData}
      />
    </div>
  );
};
