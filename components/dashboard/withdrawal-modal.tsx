'use client';
import {
    Alert,
    CarretDownIcon,
    CarretUpIcon,
    Check,
    ETHIcon,
    ExclaimationIcon,
} from '@/assets/svgs';
import { Button } from '@/components/shared';
import { GetAvailableBalanceResponse } from '@/lib/auth/get-available-balance';
import { withdrawCrypto } from '@/lib/auth/withdraw-crypto';
import { getPrice } from '@/lib/get-price';
import { getPriceChanges } from '@/lib/get-price-changes';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { LuAlertCircle } from 'react-icons/lu';
import { NetworkOption } from '../profile/profile-card-data';
import ModalContainer from '../shared/modal-container';
interface Props {
  open: boolean;
  onClose: () => void;
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  isDemo: boolean;
}

type WithDrawFormFields = {
  account_address: string | null;
  amount: string | null;
  network: string | null;
  checkbox: boolean;
};

export const WithdrawalModal: React.FC<Props> = ({ open, onClose, availableBalance, isDemo }) => {
  const withdrawableBalanceInETH = availableBalance?.withdrawableBalanceInETH;
  const hasWithdrawableBalance = typeof withdrawableBalanceInETH === 'number';

  const handleNetworkSelect = (selectedNetwork: NetworkOption) => {
    setFormFields({
      ...formFields,
      network: selectedNetwork?.value,
    });
  };

  const [isLoading, setIsLoading] = useState('idle');
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorResponseMessage, setErrorResponseMessage] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [ethPriceChanges, setEthPriceChanges] = useState<{
    dailyChange: number;
    dailyChangeInUSD: number;
  }>({ dailyChange: 0, dailyChangeInUSD: 0 });

  const [formFields, setFormFields] = useState<WithDrawFormFields>({
    account_address: null,
    amount: null,
    network: 'ETH',
    checkbox: false,
  });

  const handleonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      // Allow empty string, numbers, and decimal points
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setFormFields({ ...formFields, [name]: value });
      }
    } else {
      setFormFields({ ...formFields, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, checkbox: e.target.checked });
  };

  const handleWithdraw = async () => {
    setIsLoading('pending');

    if (isDemo) {
      setIsLoading('rejected');
      setErrorMessage('Withdrawals are disabled for demo accounts.');
      toast.error('Withdrawals are not available for demo accounts.');
      return;
    }

    if (!formFields.account_address || !formFields.amount || !formFields.network) {
      setIsLoading('rejected');
      setErrorMessage('All fields are required');
      return;
    }

    const amountNumber = parseFloat(formFields.amount);
    if (isNaN(amountNumber) || amountNumber < 0.0001) {
      setIsLoading('rejected');
      setErrorMessage('Minimum amount is 0.0001');
      return;
    }
    if (formFields.checkbox === false) {
      setIsLoading('rejected');
      setErrorMessage('Kindly confirm the checkbox');
      return;
    }
    try {
      const res = await withdrawCrypto({
        amount: parseFloat(formFields.amount),
        address: formFields.account_address,
        Network: formFields.network,
      });

      if (res) {
        setSuccess(true);
        setFailure(false);
        toast.success('Withdrawal request sent successfully!');
        setIsLoading('resolved');
        setErrorMessage('');
        setErrorResponseMessage('');
        setFormFields({
          account_address: null,
          amount: null,
          network: null,
          checkbox: false,
        });
      } else {
        setSuccess(false);
        setFailure(true);
        setIsLoading('rejected');
        setErrorMessage('something went wrong');
        console.log(res);
      }
    } catch (error: any) {
      // Access the original error information
      const errorMessage = error?.originalError?.response?.data?.message
        ? Array.isArray(error.originalError.response.data.message)
          ? error.originalError.response.data.message.join(', ')
          : error.originalError.response.data.message
        : error?.originalError?.message || 'An unexpected error occurred';

      setErrorResponseMessage(errorMessage);
      setFailure(true);
      setSuccess(false);
      setIsLoading('rejected');
      setErrorMessage('something went wrong');
      console.log(error);
    }
  };

  const handleClose = () => {
    setErrorMessage('');
    onClose();
    setFailure(false);
    setSuccess(false);
    setIsLoading('idle');
    setFormFields({
      account_address: null,
      amount: null,
      network: 'BSC',
      checkbox: false,
    });
  };

  const GetPriceChanges = useCallback(async () => {
    try {
      const res = await getPriceChanges({ base: 'ETH', quote: 'USDT' });
      setEthPriceChanges(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const GetPrice = useCallback(async () => {
    try {
      const res = await getPrice({ base: 'ETH', quote: 'USDT' });
      setPrice(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    GetPrice();
    GetPriceChanges();
    setFormFields({
      account_address: null,
      amount: null,
      network: 'ETH',
      checkbox: false,
    });
    setErrorMessage('');
    setErrorResponseMessage('');
    setFailure(false);
    setSuccess(false);
    setIsLoading('idle');
  }, [GetPrice, open]);

  // Show disabled message if this is a demo account
  if (isDemo) {
    return (
      <ModalContainer
        modalId="withdrawal-modal"
        isOpen={open}
        onClose={onClose}
        modalContentClassName="h-auto rounded-xl sm:max-w-[560px] max-w-[343px]"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex w-full flex-col items-center text-center">
          <LuAlertCircle className="size-8 mx-auto cursor-pointer stroke-brand-red stroke-2" />
          <div className="content pb-8 pt-3">
            <h3 className="text-white mx-auto pb-2 pt-1 text-center text-base font-semibold capitalize sm:text-lg">
              Demo Account
            </h3>
            <p className="text-sm font-normal text-white">
              Withdrawals are not available for demo accounts. Please contact support to upgrade
              your account.
            </p>
          </div>
          <Button
            title="Got it"
            variant="confirm"
            size="lg"
            compact
            className="w-full"
            onClick={onClose}
          />
        </div>
      </ModalContainer>
    );
  }

  if (!hasWithdrawableBalance || withdrawableBalanceInETH <= 0) {
    return (
      <ModalContainer
        modalId="withdrawal-modal"
        isOpen={open}
        onClose={onClose}
        modalContentClassName="h-auto rounded-xl sm:max-w-[560px] max-w-[343px]"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex w-full flex-col items-center text-center">
          <LuAlertCircle className="size-8 mx-auto cursor-pointer stroke-brand-rust stroke-2" />
          <div className="content pb-8 pt-3">
            <h3 className="text-white mx-auto pb-2 pt-1 text-center text-base font-semibold capitalize sm:text-lg">
              No enough funds
            </h3>
            <p className="text-sm font-normal text-white">
              Unfortunately, you have no enough funds to make any withdraw.
            </p>
          </div>
          <Button
            title="Got it"
            variant="confirm"
            size="lg"
            compact
            className="w-full"
            onClick={onClose}
          />
        </div>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl sm:max-w-[566px] max-w-[343px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-6">
        {!success && !failure && (
          <>
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-normal text-gradient sm:text-xl">Withdraw</h3>
              </div>
              <span onClick={onClose}>
                <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-5">
              <h3 className="text-xs font-medium tracking-[-0.28px] text-white">Network</h3>
              <div className="focus:light peer relative flex w-full cursor-pointer rounded-full bg-light py-3 pl-6 pr-4 text-base font-thin text-white outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:drop-shadow-lg">
                <div className="relative">
                  <div className="flex items-center">
                    <div className="size-7 relative mr-2">
                      <ETHIcon className="size-7 h-7 w-7 shrink-0" />
                      {/* 
                      <Image
                        src={"/images/eth.png"}
                        alt="US$"
                        width={14}
                        height={14}
                        className="absolute -right-1 bottom-0 w-[0.86rem] flex-shrink-0"
                      /> */}
                    </div>
                    <span className="flex flex-wrap text-sm">
                      <span className="font-medium text-white">ETH</span>
                      <span className="ml-1 px-2 py-0.5 text-xs capitalize text-[#666666]">
                        ERC-20
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="account_address" className="text-xs text-white">
                Address
              </label>
              <input
                type="text"
                name="account_address"
                id="account_address"
                value={formFields.account_address ?? ''}
                onChange={handleonChange}
                placeholder="Insert your public key"
                className="peer relative w-full rounded-full bg-light py-3 pl-6 pr-4 text-base font-thin text-white outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-xs text-white">
                Amount
              </label>
              <div className="border-gray-shade-1/10 peer relative flex h-12 w-full items-center rounded-full border bg-light px-2 py-3 pl-6 pr-4 text-xs font-thin text-white shadow-1 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus-within:border-primary focus:ring-2 focus:ring-primary focus:drop-shadow-lg">
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={formFields.amount ?? ''}
                  onChange={handleonChange}
                  placeholder="Min. amount: 0.0001"
                  className="w-full bg-light text-base font-thin text-white focus:outline-none"
                  inputMode="decimal"
                />
                <div className="flex items-center justify-end gap-1.5">
                  <span className="rounded-fullp-1.5 flex shrink-0 items-center gap-1.5 text-xs font-medium">
                    <span>ETH</span>
                  </span>
                  <span
                    className="shrink-0 cursor-pointer rounded-full pl-2 text-xs font-medium text-white"
                    onClick={() =>
                      setFormFields({
                        ...formFields,
                        amount: hasWithdrawableBalance ? withdrawableBalanceInETH.toFixed(4) : '0',
                      })
                    }
                  >
                    MAX
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium text-white">US$ equivalent</h3>
              <div className="flex flex-col items-end gap-2">
                <h3 className="text-bold text-base text-white">
                  {formFields.amount && price && !isNaN(parseFloat(formFields.amount))
                    ? (parseFloat(formFields.amount) * price).toFixed(4)
                    : '0.0000'}{' '}
                  US$
                </h3>
                <div className="flex flex-col items-end gap-5 lg:flex-row lg:items-start">
                  <h5 className="-mt-1 text-sm font-medium text-white">Current ETH price</h5>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-xs font-bold text-white">1ETH = US$ {price.toFixed(2)}</h6>
                    {ethPriceChanges.dailyChange >= 0 ? (
                      <div className="flex items-center gap-1 text-xxs font-medium">
                        <h6 className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-mint">
                          <CarretUpIcon className="size-4 fill-brand-mint stroke-brand-mint" />{' '}
                          {ethPriceChanges.dailyChange}%
                        </h6>
                        <h6 className="text-sm text-xxs font-medium text-white/50">
                          (~ US$ {ethPriceChanges.dailyChangeInUSD})
                        </h6>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xxs font-medium">
                        <h6 className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-red">
                          <CarretDownIcon className="size-4 fill-brand-red stroke-brand-red" />{' '}
                          {ethPriceChanges.dailyChange}%
                        </h6>
                        <h6 className="text-sm text-xxs font-medium text-white/50">
                          (~ US$ {ethPriceChanges.dailyChangeInUSD})
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {errorMessage && <p className="mt-1 text-xs text-brand-red">{errorMessage}</p>}

            <div className="flex items-center gap-2 p-3">
              <ExclaimationIcon className="size-8 h-8 w-8 shrink-0 cursor-pointer stroke-2" />
              <div className="flex flex-col gap-1">
                <h3 className="pt-1 font-kanit text-xs font-black text-white sm:text-sm">
                  Reminder
                </h3>
                <p className="text-xxs font-normal text-white">
                  For the safety of your funds, please confirm again that the network and address
                  you wish to use is correct.
                </p>
              </div>
            </div>
            {/* add check box */}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={formFields.checkbox}
                onChange={handleCheckboxChange}
                className="border-gray-shade-1/10 bg-dark-light block h-5 w-5 rounded border focus:ring-0"
              />
              <label htmlFor="checkbox" className="block text-xs font-normal text-white sm:h-3">
                I confirm I double checked network and wallet address
              </label>
            </div>
            <Button
              title="Withdraw"
              variant="confirm"
              size="lg"
              compact
              className="mt-4 w-full"
              disabled={
                isDemo ||
                !formFields.amount ||
                formFields.amount === '' ||
                formFields.amount === '0' ||
                formFields.account_address === '' ||
                formFields.account_address === null ||
                formFields.network === '' ||
                formFields.network === null ||
                formFields.checkbox === false ||
                isLoading === 'pending'
              }
              loaderIcon={
                isLoading === 'pending' && (
                  <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
                )
              }
              onClick={handleWithdraw}
            />
          </>
        )}

        {success && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Check />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg text-white">Withdraw completed successfully</h3>
              <p className="text-sm text-gray">
                Withdrawal expected at your wallet in 3-5 minutes.
              </p>
            </div>
            <Button
              title="Continue"
              variant="confirm"
              size="lg"
              compact
              className="mt-4 w-full"
              onClick={handleClose}
            />
          </div>
        )}
        {failure && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Alert />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg text-white">Withdraw Failed</h3>
              <p className="text-sm text-gray">
                {errorResponseMessage ??
                  'To protect your account, your withdrawal has not been processed. Please try another again later.'}
              </p>
            </div>
            <Button
            title="Ok"
            variant="confirm"
            size="lg"
            compact
            className="mt-4 w-full"
            onClick={handleClose}
          />
          </div>
        )}
      </div>
    </ModalContainer>
  );
};
