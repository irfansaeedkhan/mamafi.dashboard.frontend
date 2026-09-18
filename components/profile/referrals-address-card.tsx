import { APPBaseURL } from '@/constants/base-urls';
import { copyText } from '@/utils/copy-text';
import { sliceReferalAddress } from '@/utils/slice-referal-address';
import React from 'react';
import toast from 'react-hot-toast';
import { ProfileCopyButton } from './profile-copy-button';

type ReferralAddressProps = {
  WalletAddress?: string;
  AffiliateCode?: string;
};

export const ReferralAddressCard: React.FC<ReferralAddressProps> = ({
  WalletAddress = '',
  AffiliateCode = '',
}) => {
  return (
    <div className="w-full rounded-xl box-3d p-4 text-white lg:p-6">
      <h2 className="text-lg tracking-[-0.28px] text-white lg:text-xl">Referrals Address</h2>
      <div className="flex w-full flex-col gap-4 pt-4">
        <div className="flex items-center gap-5">
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-xs tracking-[-0.28px] text-white lg:text-sm">
              Scan QR code or copy address
            </h3>
            <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-dark p-3">
              <input
                className="focus:primary w-full cursor-pointer overflow-hidden !bg-dark text-xs font-semibold text-white transition-colors duration-100 ease-in-out hover:text-brand-mint hover:underline focus:ring-2 focus:ring-primary focus:drop-shadow-lg
        lg:text-sm"
                onClick={() => {
                  copyText(AffiliateCode);
                  toast.success('Copied to clipboard');
                }}
                type="text"
                value={AffiliateCode}
              />
              <ProfileCopyButton value={AffiliateCode} />
            </div>
          </div>
        </div>
        {/* peer relative w-full bg-dark-light pl-6 pr-4 font-thin outline-none
        drop-shadow-sm transition-all duration-200 ease-in-out
        focus:light focus:ring-2 focus:ring-light
        focus:drop-shadow-lg py-3 rounded-full text-base text-white */}
        <div className="flex items-center gap-5">
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-xs tracking-[-0.28px] text-white lg:text-sm">Referral Link</h3>
            <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-dark p-3">
              <input
                className="focus:primary w-full cursor-pointer overflow-hidden !bg-dark text-xs font-semibold text-white transition-colors duration-100 ease-in-out hover:text-brand-mint hover:underline focus:ring-2 focus:ring-primary
        focus:drop-shadow-lg lg:text-sm"
                onClick={() => {
                  copyText(`${APPBaseURL}/auth/register?ref=${AffiliateCode}`);
                  toast.success('Copied to clipboard');
                }}
                type="text"
                // value={`${APPBaseURL}/auth/register?ref=${AffiliateCode}`}
                value={sliceReferalAddress(`${APPBaseURL}/auth/register?ref=${AffiliateCode}`)}
              />
              <ProfileCopyButton value={`${APPBaseURL}/auth/register?ref=${AffiliateCode}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
