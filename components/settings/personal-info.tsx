import { GlobeIcon, ProfileUserIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { UpdateProfileApi } from '@/lib/auth/update-profile';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import countryList from 'react-select-country-list';
import { getProfileDataApiResponseType } from '../profile/profile-card-data';
import { CountryDropdown } from './country-dropdown';

interface Props extends getProfileDataApiResponseType {
  getProfileData: () => void;
}

export const PersonalInfo: React.FC<Props> = ({
  Name,
  Surname,
  Email,
  Phone,
  Country,
  getProfileData,
}) => {
  const countries = useMemo(() => countryList().getData(), []);
  const [isLoading, setIsLoading] = useState<'loading' | 'success' | 'error'>();
  const [userInfo, setUserInfo] = useState({
    personalInfo: {
      name: Name,
      surname: Surname,
      email: Email,
    },
    phonecountry: {
      phone: Phone,
      country: Country,
    },
  });

  const handleChangePersonalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setIsLoading('loading');
    try {
      await UpdateProfileApi(
        userInfo.personalInfo.name,
        userInfo.personalInfo.surname,
        userInfo.phonecountry.country,
        userInfo.phonecountry.phone
      );
      toast.success('Profile updated successfully');
      getProfileData();
      setIsLoading('success');
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading('error');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className={clsx(inputMain, 'w-full flex-grow gap-4')}>
          <div
            className={`flex items-center gap-3 rounded-xl py-3
                      text-white`}
          >
            <ProfileUserIcon className={`shrink-0 scale-125 [&>path]:fill-white`} />
            <span className="z-10 flex flex-col">
              <span className="text-xs sm:text-sm">Personal Information</span>
              <span className="text-xxs">Set your identity informations</span>
            </span>
          </div>

          <div className={inputMain}>
            <label htmlFor="name" className={inputLabel}>
              First Name
            </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              value={userInfo.personalInfo.name}
              className={clsx(inputField)}
              placeholder="First Name"
              onChange={handleChangePersonalInfo}
            />
          </div>
          <div className={inputMain}>
            <label htmlFor="surname" className={inputLabel}>
              Last Name
            </label>
            <input
              autoComplete="off"
              type="text"
              id="surname"
              name="surname"
              value={userInfo.personalInfo.surname}
              className={clsx(inputField)}
              placeholder="Last Name"
              onChange={handleChangePersonalInfo}
            />
          </div>
          <div className={inputMain}>
            <label htmlFor="email" className={inputLabel}>
              Email
            </label>
            <input
              readOnly
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              value={userInfo.personalInfo.email}
              className={clsx(inputField)}
              placeholder="Email"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex w-full max-w-[276px] items-center gap-4">
          <GlobeIcon className="size-6 h-6 w-6 shrink-0" />
          <div className="w-full">
            <h1 className="text-sm tracking-[-0.28px] text-white">Phone & country</h1>
            <p className="text-xxs tracking-[-0.28px] text-gray">Set your country and phone</p>
          </div>
        </div>
        <div className={clsx('flex w-full flex-grow flex-col gap-4 md:flex-row')}>
          <div className={clsx(inputMain, 'flex-1')}>
            <label className={inputLabel}>Country</label>
            <CountryDropdown
              placeholder="Select Country"
              options={countries}
              selectedValue={userInfo.phonecountry.country}
              onSelect={(country: string) => {
                setUserInfo(prev => ({
                  ...prev,
                  phonecountry: {
                    ...prev.phonecountry,
                    country: country,
                  },
                }));
              }}
              className='!bg-light box-3d'
            />
          </div>
          <div className={clsx(inputMain, 'flex-1')}>
            <label className={inputLabel}>Phone Number</label>
            <PhoneInput
              placeholder="Enter phone number"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={userInfo.phonecountry.phone as any}
              onChange={value => {
                if (value === undefined) {
                  return;
                }
                setUserInfo(prev => ({
                  ...prev,
                  phonecountry: {
                    ...prev.phonecountry,
                    phone: value,
                  },
                }));
              }}
              className={clsx(
                inputField,
                ' py-[0.938rem] focus:[&>input]:border-0 focus:[&>input]:outline-none focus:[&>input]:ring-0 !bg-light box-3d [&>input]:!bg-light'
              )}
            />
          </div>
        </div>
      </div>
      <Button
        title="Save"
        type="submit"
        variant="confirm"
        size="lg"
        compact
        className="mt-4 w-full"
        loaderIcon={
          isLoading === 'loading' && (
            <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
          )
        }
        onClick={handleSubmit}
        disabled={isLoading === 'loading' ? true : false}
      />
    </div>
  );
};

const inputMain = 'flex flex-col gap-1';
const inputLabel = 'text-sm text-white';
const inputField =
  'peer relative w-full bg-dark pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:primary focus:ring-2 focus:ring-primary focus:drop-shadow-lg py-3 rounded-full text-base text-white [&>input]:border-0 [&>input]:outline-none [&>input]:ring-0 [&>input]:bg-primary bg-light box-3d';
