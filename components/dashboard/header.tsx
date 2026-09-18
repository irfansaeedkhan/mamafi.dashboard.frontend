'use client';
import { BurgerIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { AppRoutes } from '@/constants/app-routes';
import { getProfile } from '@/lib/auth/get-profile';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getProfileDataApiResponseType } from '../profile/profile-card-data';
import { SidebarContext } from './sidebar-context';

export const Header = ({ toggle, setToggle }: any) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const [profileData, setProfileData] = useState<getProfileDataApiResponseType>();
  const router = useRouter();
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

  const handleClick = () => {
    setToggle((prev: any) => !prev);
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
    <SidebarContext.Provider value={{ isOpen, setIsOpen: setIsOpen }}>
      <div className="bg-transparent backdrop-blur-sm">
        <div className="flex h-16 w-full items-center justify-between px-4 py-3 pt-6 lg:px-6 ">
          <h2 className="hidden font-kanit text-2xl font-normal md:block">
            {(pathname === AppRoutes.dashboard.index ||
              pathname === AppRoutes.dashboard.rental_miners) && (
              <>
                <span className="text-white">Welcome Back,</span>{' '}
                <span className="text-gradient"> {profileData?.Name}</span>{' '}
                <span className="bg-gradient">👋</span>
              </>
            )}

            {(pathname === AppRoutes.profile.my_profile ||
              pathname === AppRoutes.profile.my_invoice ||
              pathname === AppRoutes.dashboard.affiliates ||
             pathname === AppRoutes.dashboard.levels_to_unlock ||
              pathname === AppRoutes.dashboard.leaderboard ||
              pathname === AppRoutes.profile.terms) && (
              <>
                <span className="text-gradient capitalize">{path}</span>
              </>
            )}
            {pathname === AppRoutes.dashboard.kyc && (
              <>
                <span className="text-gradient">Purchase with Bank transfer</span>
              </>
            )}
          </h2>
          <Image
            src="/images/logo-sm.png"
            alt="logo"
            width={44}
            height={44}
            unoptimized
            className="flex-shrink-0 object-cover md:hidden w-11 h-11"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
          <button className="block md:hidden" onClick={handleClick}>
            {/* {toggle ? <X /> : <BurgerIcon />} */}
            <BurgerIcon />
          </button>
          {(pathname === AppRoutes.profile.my_profile ||
            pathname === AppRoutes.profile.my_invoice ||
            pathname === AppRoutes.profile.terms) && (
            <div className="hidden items-center justify-between md:flex">
              <div className="flex flex-wrap items-center gap-5">
                <Link href={AppRoutes.profile.my_profile}>
                  <Button
                    variant={pathname === AppRoutes.profile.my_profile ? 'confirm' : 'confirm-secondary'}
                    size="sm"
                    compact
                    title="Profile"
                  />
                </Link>
                <Link href={AppRoutes.profile.terms}>
                  <Button
                    variant={pathname === AppRoutes.profile.terms ? 'confirm' : 'confirm-secondary'}
                    size="sm"
                    compact
                    title="Terms and conditions"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
