import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { ExclaimationIcon } from '@/assets/svgs';
import { NETWORKS } from '@/constants/network';
import { copyText } from '@/utils/copy-text';
import { sliceAccountAddress } from '@/utils/slice-account-address';

import Dropdown from '../profile/drop-down';
import { NetworkOption } from '../profile/profile-card-data';
import { ProfileCopyButton } from '../profile/profile-copy-button';
import ModalContainer from '../shared/modal-container';

import {
    getDepositAddress,
    GetDepositAddressResponse,
    GetNETWORKTYPE,
} from '@/lib/auth/get-deposit-address';
interface Props {
  open: boolean;
  onClose: () => void;
}

export const NotEnoughBalanceModel: React.FC<Props> = ({ open, onClose }) => {
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
  }, [open]);
  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl sm:max-w-[566px] max-w-[343px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white sm:text-xl">Buy Sigillum</h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer [&>path]:fill-white" />
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <ExclaimationIcon className="size-8 mx-auto h-8 w-8 shrink-0 cursor-pointer [&>path]:fill-white" />
            <h3 className="text-white pt-2 text-base font-semibold sm:text-xl">
              Opps! you don&apos;t have enough balance
            </h3>
            <p className="pt-1 text-sm font-normal text-white">
              You don&apos;t have enough balance to purchase this office, Please deposit first and
              try again to buy.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 pt-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium tracking-[-0.28px] text-white">Network</h3>
              <Dropdown bgColor="bg-light" items={NETWORKS} onSelect={handleNetworkSelect} />
            </div>
            <div className="flex w-full flex-col gap-1">
              <h3 className="text-sm font-medium tracking-[-0.28px] text-white">Copy Address</h3>
              <div className="flex w-full items-center justify-between gap-5 rounded-full  bg-light p-3 text-xs">
                <div className="flex w-full flex-col">
                  <input
                    className="w-full cursor-pointer overflow-hidden border-0 bg-transparent text-xs font-medium text-white ring-0 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline focus:ring-0"
                    onClick={() => {
                      copyText(depositAddress?.public_key ?? '');
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
              <h6 className="pt-4 text-xs font-normal text-[#666666]">
                The minimum usable deposit for purchasing Sigillum is 100 US$
              </h6>
            </div>
          </div>

       <div className="flex flex-col mt-6">
       <div className=" flex items-center gap-2 p-3">
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
          <div className=" flex items-center gap-2 p-3">
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
    </ModalContainer>
  );
};
