import { addWeeks, format, parse } from 'date-fns';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { Alert, Check, DollarCoin, ExclaimationIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import ModalContainer from '@/components/shared/modal-container';
import { AppRoutes } from '@/constants/app-routes';
import { addMetaAssts } from '@/lib/auth/add-meta-asset';
import { SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';

interface Props {
  open: boolean;
  onClose: () => void;
  mainModelClose: () => void;
  numberOfUnits: number;
  id: string;
  totalamount: number;
  StartDate: string;
  duration: number;
  setSuccessPurchase: any;
  SigillumDetails: SigillumDetailsResponse | null | undefined;
}

export const CreateOrderModal: React.FC<Props> = ({
  open,
  onClose,
  mainModelClose,
  totalamount,
  numberOfUnits,
  id,
  StartDate,
  duration,
  setSuccessPurchase,
  SigillumDetails,
}) => {
  const [isLoading, setIsLoading] = useState('idle');
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const handleConfirm = async () => {
    if (!checkbox) {
      toast.error('Please confirm the checkbox');
      return;
    }
    setIsLoading('pending');
    try {
      const res = await addMetaAssts(id, numberOfUnits);
      if (res) {
        setSuccess(true);
        setFailure(false);
        setIsLoading('resolved');
        toast.success('Order created successfully');
        setSuccessPurchase(true);
        setCheckbox(false);
      } else {
        setFailure(true);
        setSuccess(false);
        setIsLoading('rejected');
        toast.error('Failed to create order');
        setSuccessPurchase(false);
      }
    } catch (error: any) {
      setFailure(true);
      setSuccess(false);
      toast.error(error.message);
      setIsLoading('rejected');
      setSuccessPurchase(false);
      setCheckbox(false);
    }
  };

  const handleClose = () => {
    onClose();
    mainModelClose();
    setFailure(false);
    setSuccess(false);
    setIsLoading('idle');
    setCheckbox(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(e.target.checked);
  };

  // Convert the string to a Date object
  const StartDateUpdated = parse(StartDate, 'dd MMM, yyyy', new Date());

  // Add the specified number of weeks
  const endDate = addWeeks(StartDateUpdated, duration);

  // Format the result to the desired output
  const formattedEndDateForFirstPurchase = format(endDate, 'dd MMM yyyy');

  const expiryDateFromAPI = SigillumDetails?.contract_expiry_date;

  const finalExpiraryDate = format(
    expiryDateFromAPI ? expiryDateFromAPI : formattedEndDateForFirstPurchase,
    'dd MMM yyyy'
  );

  return (
    <ModalContainer
      modalId="create-order-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl max-w-[518px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white sm:text-xl">Your Order</h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        {!success && !failure && (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-sm text-white">Amount</p>
                <div className="flex items-center gap-1">
                  <DollarCoin className="size-6 h-6 w-6 shrink-0" />
                  <p className="text-xl text-brand-mint">{totalamount} US$</p>
                </div>

                <p className="rounded-md border border-[#E38800] bg-[#FFD79B] px-2 py-0.5 text-[11px] font-medium text-[#9F5F00]">
                  To be paid
                </p>
              </div>
              {!!SigillumDetails?.owned_offices && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-light p-4">
                  <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
                  <h3 className="pt-1 font-kanit text-xs font-normal text-white sm:text-sm">
                    You already have an opened position, these Sigillum will be added to the cycle
                    of your currently opened position.
                  </h3>
                </div>
              )}
              <div className="flex flex-col gap-[14px] rounded-[20px] border border-white/[0.04] bg-light p-4">
                {/* <div className={mainWrap}>
                  <h3 className={firstChild}>UUID</h3>
                  <h3 className={secondChild}> {id} </h3>
                </div> */}
                <div className={mainWrap}>
                  <h3 className={firstChild}>Sigillum Purchased</h3>
                  <h3 className={secondChild}>{numberOfUnits}</h3>
                </div>
                <div className={mainWrap}>
                  <h3 className={firstChild}>Start Date</h3>
                  <h3 className={secondChild}>{dayjs(StartDate).format('DD MMM YYYY')}</h3>
                </div>
                <div className={mainWrap}>
                  <h3 className={firstChild}>End Date</h3>
                  <h3 className={secondChild}>{finalExpiraryDate}</h3>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:items-center">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={checkbox}
                onChange={handleCheckboxChange}
                className="border-gray-shade-1/10 block h-5 w-5 rounded border bg-light focus:ring-0"
              />
              <label htmlFor="checkbox" className="block text-xs font-normal text-white">
                By proceeding the the purchase of Sigillum, you agree to mamafi&apos;s{' '}
                <Link href={AppRoutes.profile.terms} className="font-semibold underline">
                  Terms and conditions
                </Link>
              </label>
            </div>
            <Button
              title="Confirm"
              variant="confirm"
              size="lg"
              compact
              className="mt-4 w-full"
              loaderIcon={
                isLoading === 'pending' && <CgSpinner className="size-5 mx-auto animate-spin" />
              }
              onClick={handleConfirm}
              disabled={!checkbox}
            />
          </>
        )}
        {success && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Check />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg text-white">Order Created Successfully</h3>
              <p className="text-sm text-gray">
                Your order has been created ,{' '}
                <Link
                  href={AppRoutes.profile.my_invoice}
                  className="font-semibold-1 cursor-pointer text-white underline"
                >
                  View your invoice
                </Link>
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
              <h3 className="text-lg text-white">Failure Creating Order</h3>
              <p className="text-sm text-gray">
                Unable to place order. Insufficient balance for the corresponding quantity of
                sigillum. Try again by reducing the amount.
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
      </div>
    </ModalContainer>
  );
};

const mainWrap = 'flex items-center justify-between gap-3';
const firstChild = 'text-white text-sm font-medium';
const secondChild = 'text-white text-sm font-medium';
