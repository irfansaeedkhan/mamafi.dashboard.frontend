import React from 'react';
import { ProfileCopyButton } from './profile-copy-button';
import { getProfileDataApiResponseType } from './profile-card-data';
import { sliceAccountAddress } from '@/utils/slice-account-address';
import { APPBaseURL } from '@/constants/base-urls';
import { copyText } from '@/utils/copy-text';
import toast from 'react-hot-toast';
import { sliceReferalAddress } from '@/utils/slice-referal-address';

interface Props extends getProfileDataApiResponseType {
  card_title: string;
  card_data: {
    title: string;
    value: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    button?: string;
  }[];
}

export const MyProfileCard: React.FC<Props> = ({
  card_title,
  card_data,
  Name,
  Email,
  Phone,
  Country,
  WalletAddress,
  AffiliateCode,
  Surname,
}) => {
  const updatedCardData = card_data.map(data => {
    switch (data.title) {
      case 'Email':
        return { ...data, value: Email };
      case 'Name':
        return { ...data, value: Name + ' ' + Surname };
      case 'Country':
        return { ...data, value: Country };
      case 'Phone Number':
        return { ...data, value: Phone };
      case 'Deposit Address':
        return { ...data, value: WalletAddress };
      case 'Referrals Address':
        return {
          ...data,
          value: `${APPBaseURL}/auth/register?ref=${AffiliateCode}`,
        };
      default:
        return data;
    }
  });

  return (
    <div className="w-full rounded-xl box-3d p-6 text-white">
      <h2 className="text-xl font-medium tracking-[-0.28px] text-white">{card_title}</h2>
      <div className="flex w-full flex-col gap-4">
        {updatedCardData.map((data, index) => (
          <div className="flex items-center gap-5" key={index}>
            <div className="border-gray-shade-1/10 flex size-11 flex-shrink-0 items-center justify-center rounded-full border bg-transparent">
              <data.icon />
            </div>
            <div className="flex w-full flex-col gap-1">
              <h3 className="text-xs font-medium tracking-[-0.28px] opacity-60">{data.title}</h3>
              <div className="flex w-full flex-wrap items-center justify-between gap-5">
                <p
                  className="cursor-pointer overflow-hidden text-xs font-semibold text-white transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm"
                  onClick={() => {
                    copyText(data.value);
                    toast.success('Copied to clipboard');
                  }}
                >
                  {data.button
                    ? data.title === 'Referrals Address'
                      ? sliceReferalAddress(data.value)
                      : sliceAccountAddress(data.value)
                    : data.value}
                </p>
                {data.button && <ProfileCopyButton value={data.value} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
