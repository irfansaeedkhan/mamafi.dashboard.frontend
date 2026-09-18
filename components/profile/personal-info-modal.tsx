'use client';
import { getProfile } from '@/lib/auth/get-profile';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { getProfileDataApiResponseType } from '../profile/profile-card-data';
import { PersonalInfo } from '../settings/personal-info';
import ModalContainer from '../shared/modal-container';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const PersonalInfoModal: React.FC<Props> = ({ open, onClose }) => {
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
      modalId="personal-info-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto max-h-[90vh] w-full rounded-xl sm:max-w-[566px] max-w-[670px] overflow-y-auto"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between gap-5">
          <h3 className="text-base font-normal text-white sm:text-xl">Edit Personal Information</h3>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6  h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>

        {profileData && <PersonalInfo {...profileData} getProfileData={getProfileData} />}
      </div>
    </ModalContainer>
  );
};
