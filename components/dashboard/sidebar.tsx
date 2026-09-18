'use client';

import { AdminAppRoutes, AppRoutes } from '@/constants/app-routes';
import { getProfile } from '@/lib/auth/get-profile';
import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCircleUser } from 'react-icons/fa6';
import { getProfileDataApiResponseType } from '../profile/profile-card-data';
import { SidebarData } from './sidebar-data';

import { Button } from '@/components/shared';
import { useTutorial } from '@/hooks/use-tutorial';
import MobileMenu from '../mobile-menu';
import ComingSoonModal from '../shared/coming-soon-modal';

export const Sidebar = ({ toggle, setToggle }: any) => {
  const [profileData, setProfileData] = useState<getProfileDataApiResponseType>();
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const { logout } = useAuthStore(state => state.actions);
  const { openTutorial, initializeTutorial } = useTutorial();

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

  useEffect(() => {
    SidebarData.forEach(item => {
      if (!item.comingSoon) {
        router.prefetch(item.link);
      }
    });
    router.prefetch(AppRoutes.profile.my_profile);
    router.prefetch(AppRoutes.profile.my_invoice);
    router.prefetch(AppRoutes.profile.terms);
  }, [router]);

  useEffect(() => {
    if (profileData?.IsFirstLogin === undefined) return;
    initializeTutorial({ isFirstLogin: profileData.IsFirstLogin });
  }, [profileData?.IsFirstLogin, initializeTutorial]);

  return (
    <div className="z-50 overflow-x-hidden lg:overflow-visible">
      {/* desktop */}
      <div className="hidden h-full items-center justify-center md:flex md:p-[0.625rem]">
        <div className="relative hidden h-full w-full flex-shrink-0 flex-col justify-between rounded-lg box-3d p-[0.625rem] lg:flex  lg:w-[193px]">
          <div className="flex w-full flex-col items-center lg:items-start">
            <Image
              src="/images/logo-sm.png"
              alt="logo"
              width={44}
              height={44}
              unoptimized
              className="mx-auto shrink-0 mt-6 w-11 h-11"
              onClick={() => router.push(AppRoutes.dashboard.index)}
            />
            <div className="mb-8 mt-6 h-[2px] w-full bg-brand-gold" />
            <div className="w-full">
              <div className="flex flex-col items-center justify-center gap-2 pb-5">
                {/* {true && (
                  <Link href={AppRoutes.profile.my_profile}>
                    <FaCircleUser className="size-16 text-white" />
                    <Image
                      src={"/images/profile-image.png"}
                      alt="US$"
                      width={73}
                      height={73}
                      className="shrink-0 rounded-full object-cover"
                    />
                  </Link>
                )}
                {false && (
                  <FaCircleUser className="size-16 shrink-0 rounded-full border-2 border-blue-shade-1" />
                )} */}
                <Link href={AppRoutes.profile.my_profile}>
                    <FaCircleUser className="size-16 h-16 w-16 shrink-0 text-white" />
                </Link>
                <div className="flex flex-col gap-6">
                  {profileData && (
                    <Link
                      href={AppRoutes.profile.my_profile}
                      className="flex min-w-max flex-col items-center gap-px  text-sm font-semibold text-white"
                    >
                      {`${profileData?.Name ?? ''} ${profileData?.Surname ?? ''}`}
                      <span
                        className={clsx(
                          'cool-link flex-shrink-0 pt-1 text-xs  font-medium text-white'
                        )}
                      >
                        View Profile
                      </span>
                    </Link>
                  )}

                  <Button title="logout" variant="confirm" size="sm" compact className="w-full" onClick={logoutHandler} />
                </div>
              </div>
            </div>
            <div className="mb-8 mt-10 h-[2px] w-full bg-brand-gold" />
            <div className="justify-left flex w-full flex-col items-start gap-10 pl-2 pb-36">
              {SidebarData.map(item =>
                item.comingSoon ? (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => setIsComingSoonModalOpen(true)}
                    className={clsx(
                      'group flex items-center justify-center gap-3 lg:justify-start'
                    )}
                  >
                    <item.icon className="size-6 h-6 w-6 flex-shrink-0 fill-white" />
                    <p className="lg:group-hover:cool-link h-[1.125rem] flex-shrink-0 text-sm font-medium text-white lg:block">
                      {item.title}
                    </p>
                  </button>
                ) : (
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
                        pathname === item.link ? 'fill-brand-gold' : 'fill-white'
                      )}
                    />
                    <p
                      className={clsx(
                        'h-[1.125rem] flex-shrink-0 text-sm font-medium  lg:block',
                        pathname === item.link
                          ? 'text-gradient'
                          : 'lg:group-hover:cool-link text-white'
                      )}
                    >
                      {item.title}
                    </p>
                  </Link>
                )
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex w-full flex-col gap-3 px-4 pb-6">
              <Button
                title="Switch to Admin"
                variant="confirm"
                size="sm"
                className="w-full text-sm"
                onClick={() => router.push(AdminAppRoutes.dashboard.index)}
              />
              <Button
                title="View Tutorial"
                variant="confirm-secondary"
                size="lg"
                className="w-full text-sm"
                onClick={openTutorial}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileMenu
        toggle={toggle}
        handleClose={handleClose}
        logoutHandler={logoutHandler}
        profileData={profileData}
        onOpenComingSoonModal={() => setIsComingSoonModalOpen(true)}
      />
      <ComingSoonModal
        open={isComingSoonModalOpen}
        onClose={() => setIsComingSoonModalOpen(false)}
        title="Levels To Unlock"
        description="Levels to Unlock is coming soon. Stay tuned!"
      />
    </div>
  );
};
