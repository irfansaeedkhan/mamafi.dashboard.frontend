import { ExclaimationIcon } from '@/assets/svgs';
import { NETWORKS } from '@/constants/network';
import {
    GetDepositAddressResponse,
    GetNETWORKTYPE,
    getDepositAddress,
} from '@/lib/auth/get-deposit-address';
import { copyText } from '@/utils/copy-text';
import { sliceAccountAddress } from '@/utils/slice-account-address';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import Dropdown from './drop-down';
import { NetworkOption } from './profile-card-data';
import { ProfileCopyButton } from './profile-copy-button';

export const DepositAddressMobileCard: React.FC = () => {
  const [depositAddress, setDepositAddress] = useState<GetDepositAddressResponse>();

  const GetDepositAddressData = useCallback(async (networkType: GetNETWORKTYPE['networkType']) => {
    try {
      const res = await getDepositAddress(networkType);
      setDepositAddress(res);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const handleNetworkSelect = (selectedNetwork: NetworkOption) => {
    GetDepositAddressData(selectedNetwork?.value);
  };

  useEffect(() => {
    GetDepositAddressData('ETH');
  }, [GetDepositAddressData]);
  return (
    <div className="col-span-1 flex w-full flex-col gap-5 rounded-3xl box-3d p-4 lg:p-6">
      <h2 className="text-lg tracking-[-0.28px] text-white lg:text-xl">Deposit Address</h2>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs tracking-[-0.28px] text-white lg:text-sm">Network</h3>
          <Dropdown bgColor="bg-dark" items={NETWORKS} onSelect={handleNetworkSelect} />
        </div>
        <div className="flex w-full items-center justify-between gap-3 rounded-xl bg-dark p-3">
          {depositAddress?.public_key && (
            <QRCode
              size={60}
              level="L"
              fgColor="#FFFFFF"
              bgColor="#000000"
              className="h-[60px] w-full max-w-[60px] object-contain sm:h-[60px] sm:max-w-[60px]"
              value={depositAddress?.public_key ? String(depositAddress.public_key) : ''}
              viewBox="0 0 60 60"
            />
          )}

          <div className=" flex w-full items-center justify-between gap-3 text-sm">
            <div className="flex w-full flex-col">
              <h3 className="text-xs tracking-[-0.28px] text-white lg:text-sm">Public key</h3>
              <input
                className=" w-full cursor-pointer overflow-hidden truncate bg-transparent font-medium text-white transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm"
                onClick={() => {
                  copyText(depositAddress?.public_key ?? 'N/A');
                  toast.success('Copied to clipboard');
                }}
                type="text"
                value={
                  depositAddress?.public_key
                    ? sliceAccountAddress(depositAddress?.public_key)
                    : 'N/A'
                }
              />
            </div>
            <ProfileCopyButton value={depositAddress?.public_key ?? 'N/A'} />
          </div>
        </div>
        <p className="pt-4 text-xs font-normal text-[#666666]">
          The minimum usable deposit for purchasing Sigillum is 100 US$
        </p>
        <div className="flex flex-col mt-6">
        <div className="flex items-center gap-2 py-3">
          <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
          <div className="flex flex-col gap-1">
            <h3 className="pt-1 font-kanit text-xs font-black text-white sm:text-sm">
              Pay in current network to this deposit address.
            </h3>
            <p className="text-xxs font-normal text-white">
              Paying other than selected network to this deposit may result in the loss of your
              assets and we are not responsible for this.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 py-3">
          <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
          <div className="flex flex-col gap-1">
            <h3 className="pt-1 font-kanit text-xs font-black text-white sm:text-sm">
              Address Validity
            </h3>
            <p className="text-xxs font-normal text-white">
              This address is valid for 1 hour. If you could not make the deposit till then, try to fetch deposit address again.
            </p>
          </div>
        </div>
        </div>
        </div>
    </div>
  );
};
