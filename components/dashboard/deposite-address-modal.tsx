import { CopyIcon, ExclaimationIcon } from '@/assets/svgs';
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
import { IoIosCloseCircleOutline } from 'react-icons/io';
import QRCode from 'react-qr-code';
import Dropdown from '../profile/drop-down';
import { NetworkOption } from '../profile/profile-card-data';
import ModalContainer from '../shared/modal-container';
interface Props {
  open: boolean;
  onClose: () => void;
}

export const DepositeAddressModal: React.FC<Props> = ({ open, onClose }) => {
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
      modalId="deposite-address-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl max-w-[566px] bg-dark"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base text-gradient sm:text-xl">Deposit Address</h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        <div className="flex flex-col gap-1 pt-10">
          <h3 className="text-xs font-medium tracking-[-0.28px] text-white">Network</h3>
          <Dropdown bgColor="bg-light" items={NETWORKS} onSelect={handleNetworkSelect} />
        </div>
        <div className="flex items-center justify-center py-4 sm:py-8">
          <QRCode
            size={180}
            level="L"
            className="h-[120px] w-full max-w-[120px] object-contain sm:h-[180px] sm:max-w-[180px]"
            value={depositAddress?.public_key ? String(depositAddress.public_key) : ''}
            fgColor="#FFFFFF"
            bgColor="#000000"
            viewBox="0 0 180 180"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-normal tracking-[-0.28px] text-white">
          Scan QR code or copy address
        </h3>
        <div className="flex h-12 w-full items-center justify-between gap-8 rounded-full bg-light px-[18px] py-[14px]">
          <p className="text-xs font-medium text-white">
            {sliceAccountAddress(depositAddress?.public_key ?? 'N/A')}
          </p>
          <button
            onClick={e => {
              e.stopPropagation();
              copyText(depositAddress?.public_key ?? 'N/A');
              toast.success('Copied to clipboard');
            }}
          >
            <CopyIcon className="size-6 h-6 w-6 shrink-0 cursor-pointer stroke-white hover:stroke-brand-mint" />
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6">
      <div className="flex items-center gap-2 p-3">
        <ExclaimationIcon className="size-8 h-8 w-8 shrink-0 cursor-pointer stroke-2" />
        <div className="flex flex-col gap-1">
          <h3 className="pt-1 font-kanit text-xs font-black text-white sm:text-sm">
            Pay in current network to this deposit address.
          </h3>
          <p className="text-xxs font-normal text-white">
            Paying other than selected network to this deposit may result in the loss of your assets
            and we are not responsible for this.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3">
        <ExclaimationIcon className="size-8 h-8 w-8 shrink-0 cursor-pointer stroke-2" />
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
    </ModalContainer>
  );
};
