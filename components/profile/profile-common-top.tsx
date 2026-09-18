'use client';
import { Button } from '@/components/shared';
import { AppRoutes } from '@/constants/app-routes';
import { getProfile } from '@/lib/auth/get-profile';
import { useAuthStore } from '@/stores/auth.store';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { IoSettingsOutline } from 'react-icons/io5';
import { getProfileDataApiResponseType } from './profile-card-data';

import { ChangePasswordModal } from './change-pw-modal';

export const ProfileCommonTop = () => {
  const [profileData, setProfileData] = useState<getProfileDataApiResponseType>();
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const pathname = usePathname();

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
    <div className="--max-w-[1081px] mx-auto flex w-full flex-col">
      <div className="flex w-full items-start justify-between rounded-tl-xl rounded-tr-xl box-3d p-4 text-white lg:rounded-xl  lg:p-3">
        <div className="flex  w-full items-center gap-4">
          <FaCircleUser className="size-16 h-16 w-16 shrink-0 text-white" />
          {/* <Image
            src={"/images/profile-image.png"}
            alt="US$"
            width={73}
            height={73}
            className="shrink-0 rounded-full object-cover"
          /> */}
          <div>
            <h3 className="text-xs text-white">
              {profileData ? `${profileData.Name} ${profileData.Surname}` : ''}
            </h3>
            {/* <p className="text-gray text-xs font-medium">
              Tech Master in Block line 🤫
            </p> */}
          </div>
        </div>

        <button onClick={() => setOpen(true)}>
          <IoSettingsOutline className="size-6 h-6 w-6 shrink-0 text-white" />
        </button>

        {/* {pathname === AppRoutes.profile.my_profile && (
          <Link
            href="/profile-settings?tab=personal_info"
            className="hidden lg:block"
          >
            <IoSettingsOutline className="size-6 text-white" />
            <Button
              className={clsx(
                "w-fit !rounded-full border !border-blue-shade-1 border-gray-400/40 px-4 font-kanit  text-white opacity-90 lg:py-2 lg:text-sm [&>span]:text-xs",
              )}
              variant="secondary"
              title="Edit Profile"
            />
          </Link>
        )} */}
      </div>
      <div className="flex w-full items-center justify-between rounded-bl-xl rounded-br-xl box-3d p-4 lg:hidden lg:p-3">
        <Link href={AppRoutes.profile.my_profile}>
          <Button
            variant={pathname === AppRoutes.profile.my_profile ? 'confirm' : 'confirm-secondary'}
            size="sm"
            compact
            title="Profile"
          />
        </Link>
        <Link href={AppRoutes.profile.my_invoice}>
          <Button
            className={clsx(
              'w-fit rounded-xl border-transparent bg-transparent px-2  py-1 !font-nexa text-xs !font-normal capitalize text-white opacity-90 lg:px-4 lg:py-2 [&>span]:!h-[15px] [&>span]:!font-nexa [&>span]:!font-normal lg:[&>span]:text-sm',
              pathname === AppRoutes.profile.my_invoice && 'border !border-brand-gold'
            )}
            variant="secondary"
            title="My Invoice"
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
      <ChangePasswordModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
