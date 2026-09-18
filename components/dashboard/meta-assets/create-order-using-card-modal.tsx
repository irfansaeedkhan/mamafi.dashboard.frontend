'use client';

import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import { addWeeks, format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { ExclaimationIcon, GradientCancelIcon, GradientCheckIcon, LockIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import ModalContainer from '@/components/shared/modal-container';
import { AppRoutes } from '@/constants/app-routes';
import { SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';
import { getPurchaseFees } from '@/lib/auth/get-purchase-fees';

import { getClientSecret } from '@/lib/auth/get-client-secret';
import dayjs from 'dayjs';
import CheckoutPage from './checkout';

interface Props {
  open: boolean;
  onClose: () => void;
  mainModelClose: () => void;
  numberOfUnits: number;
  id: string;
  totalamount: number;
  singleamount: number;
  StartDate: string;
  duration: number;
  setSuccessPurchase: any;
  onRefreshCardsData: () => Promise<void>;
  SigillumDetails: SigillumDetailsResponse | null | undefined;
}

// Lazy load Stripe - only initialize when actually needed (not during build)
// During build time, if key is missing, use a placeholder to allow build to continue
const getStripePromise = () => {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  if (!stripeKey) {
    // During build (server-side), use placeholder to prevent build failure
    if (typeof window === 'undefined') {
      return loadStripe('pk_test_placeholder_for_build');
    }
    // Client-side runtime - throw error
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
  }
  return loadStripe(stripeKey);
};

export const CreateOrderUsingCardModal: React.FC<Props> = ({
  open,
  onClose,
  mainModelClose,
  totalamount,
  singleamount,
  numberOfUnits,
  duration,
  StartDate,
  setSuccessPurchase,
  onRefreshCardsData,
  SigillumDetails,
}) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
  const [stripeFeePercent, setStripeFeePercent] = useState<number>(0);
  const isDemoPayment = clientSecret?.startsWith('demo_') || !process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

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
  const stripeFeeAmount = (totalamount * stripeFeePercent) / 100;
  const totalAmountWithStripeFee = totalamount + stripeFeeAmount;

  const appearance: Appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#FFFFFF',
      colorBackground: '#0a0a0a',
      colorText: '#FFFFFF',
      colorDanger: '#FF0000',
      spacingUnit: '4px',
      borderRadius: '0.75rem',
    },
  };

  const handlePaymentSuccess = () => {
    setSuccess(true);
    setSuccessPurchase(true);
  };
  const handleClose = () => {
    const shouldRefreshOnClose = success;
    onClose();
    mainModelClose();
    setFailure(false);
    setSuccess(false);
    setClientSecret(undefined);
    setSuccessPurchase(false);

    if (shouldRefreshOnClose) {
      // backend can update ownership slightly after Stripe reports success. so lets give it bit of time
      setTimeout(() => {
        void onRefreshCardsData();
      }, 900);
    }
  };

  const tryAgain = () => {
    setSuccess(false);
    setFailure(false);
    setClientSecret(undefined);
    fetchClientSecret();
  };

  const fetchClientSecret = async () => {
    try {
      const data = await getClientSecret(totalAmountWithStripeFee);
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        console.error('No client secret returned:', data);
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  useEffect(() => {
    if (totalAmountWithStripeFee > 0) {
      fetchClientSecret();
    }
  }, [totalAmountWithStripeFee]);

  useEffect(() => {
    const fetchPurchaseFees = async () => {
      try {
        const fees = await getPurchaseFees();
        setStripeFeePercent(fees.stripeFeePercent ?? 0);
      } catch (error) {
        console.error('Error fetching purchase fees:', error);
        setStripeFeePercent(0);
      }
    };

    fetchPurchaseFees();
  }, []);

  if (success) {
    return (
      <ModalContainer
        modalId="create-order-modal-success"
        isOpen={open}
        onClose={handleClose}
        modalContentClassName="h-auto rounded-xl w-full md:max-w-max md:!px-20"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-6 text-center">
            <GradientCheckIcon />
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-white text-lg md:text-xl">Payment successful</h3>
              <p className="max-w-[40ch] text-sm text-gray">
                Your payment has been successfully processed. You will receive a confirmation email
                shortly. Thank you for your purchase!
              </p>
            </div>
            <div className="mt-4 flex w-full flex-col gap-2">
              <Button
                title="Back to home"
                variant="confirm"
                size="lg"
                compact
                className="w-full"
                onClick={handleClose}
              />
              <Link href={AppRoutes.profile.my_invoice} className="w-full">
                <Button
                  title="Go to invoice"
                  variant="confirm"
                  outlineBG="light"
                  size="lg"
                  compact
                  className="w-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </ModalContainer>
    );
  }

  if (failure) {
    return (
      <ModalContainer
        modalId="create-order-modal-failure"
        isOpen={open}
        onClose={handleClose}
        modalContentClassName="h-auto rounded-xl w-full md:max-w-max md:!px-20"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-6 text-center">
            <GradientCancelIcon />
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-lg text-white md:text-xl">Payment failed</h3>
              <p className="max-w-[40ch] text-sm text-gray">
                Your payment could not be processed. Please provide an alternate payment method or
                contact your bank
              </p>
            </div>
            <div className="mt-4 flex w-full flex-col gap-2">
              <Button
                title="Try again"
                variant="confirm"
                size="lg"
                compact
                className="w-full"
                onClick={tryAgain}
              />
              <Button
                title="Back to Home"
                variant="confirm-secondary"
                size="lg"
                compact
                className="w-full"
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      modalId="create-order-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl w-full md:max-w-[70%]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white md:text-xl">Review Sigillum and Pay</h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        <div className="custom-scrollbar h-[80vh] overflow-y-auto p-3 sm:h-auto">
          <div className="flex w-full flex-col gap-10 pt-10 lg:flex-row">
            <div className="flex flex-col justify-between gap-8 rounded-xl  text-white">
              {SigillumDetails && SigillumDetails.owned_offices > 0 && (
                <div className="flex items-center gap-2 rounded-xl bg-light p-3">
                  <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
                  <h3 className="pt-1 font-kanit text-xs font-normal text-white md:text-sm">
                    You already have an opened position, these Sigillum will be added to the cycle
                    of your currently opened position.
                  </h3>
                </div>
              )}
              <div className="flex h-full flex-col justify-center">
                <div className="form flex flex-col gap-4">
                  {clientSecret && !isDemoPayment && (
                    <Elements stripe={getStripePromise()} options={{ clientSecret, appearance }}>
                      <CheckoutPage
                        onPaymentSuccess={handlePaymentSuccess}
                        clientSecret={clientSecret}
                      />
                    </Elements>
                  )}
                  {clientSecret && isDemoPayment && (
                    <div className="flex flex-col gap-4 rounded-xl bg-light p-5">
                      <p className="text-sm text-white">
                        Demo payment mode is active. No real payment provider is connected.
                      </p>
                      <Button
                        title="Complete demo payment"
                        variant="confirm"
                        size="lg"
                        compact
                        onClick={handlePaymentSuccess}
                      />
                    </div>
                  )}
                  {!clientSecret && (
                    <div className="flex h-full flex-1 items-center justify-center">
                      <div
                        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* right card */}
            <div className="flex min-w-[300px] flex-col justify-between rounded-xl bg-primary p-6 text-white">
              <div className="flex flex-col">
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-base text-white md:text-xl">Summary</h3>
                  <h6 className="text-sm text-white opacity-60">USD</h6>
                </div>
                <div className="flex flex-col gap-2 pb-4 pt-8">
                  <div className="flex w-full items-center justify-between">
                    <h6 className="text-sm text-white">Your Pack</h6>
                    <h6 className="text-sm text-white">{numberOfUnits}</h6>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <h6 className="text-sm text-white">Single Pack Cost</h6>
                    <h6 className="text-sm text-white">{singleamount}</h6>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <h6 className="text-sm text-white">Start Date</h6>
                    <h6 className="text-sm text-white">{dayjs(StartDate).format('DD MMM YYYY')}</h6>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <h6 className="text-sm text-white">End Date</h6>
                    <h6 className="text-sm text-white">{finalExpiraryDate}</h6>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <h6 className="text-sm text-white">Stripe fee ({stripeFeePercent}%)</h6>
                  <h6 className="text-sm text-white">{stripeFeeAmount.toFixed(2)} USD</h6>
                </div>
                <div className="flex w-full items-center justify-between border-t border-[#0E1F30] pt-4 font-nexablack font-black">
                  <h6 className="text-sm text-white">Total</h6>
                  <h6 className="text-sm text-white">{totalAmountWithStripeFee.toFixed(2)} USD</h6>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-10">
                <div className="flex items-center gap-2">
                  <LockIcon className="shrink-0" />
                  <p className="mt-1 text-xs text-[#CCCCCC]">
                    We use 3D Secure to protect your payment
                  </p>
                </div>
                <Image
                  src={'/images/security-card.png'}
                  alt="security card icon"
                  width={71}
                  height={21}
                  className="shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
