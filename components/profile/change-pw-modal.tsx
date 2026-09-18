'use client';
import { getProfile } from '@/lib/auth/get-profile';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { getProfileDataApiResponseType } from '../profile/profile-card-data';
import { UpdatePassword } from '../settings/update-password';
import ModalContainer from '../shared/modal-container';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<Props> = ({ open, onClose }) => {
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
    <ModalContainer
      modalId="change-password-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto max-h-[90vh] w-full rounded-xl sm:max-w-[566px] max-w-[670px] overflow-y-auto"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between gap-5">
          <h3 className="text-base font-normal text-white sm:text-xl">Account Setting</h3>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>

        {profileData && <UpdatePassword getProfileData={getProfileData} />}
      </div>
    </ModalContainer>
  );
};
