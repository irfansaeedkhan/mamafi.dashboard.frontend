import React, { useState } from 'react';
import { Button } from '@/components/shared';
import ModalContainer from '@/components/shared/modal-container';
import { resendEmailVerificationApi } from '@/lib/auth/resend-email-verification';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { IoIosCloseCircleOutline } from 'react-icons/io';
interface Props {
  open: boolean;
  onClose: () => void;
  email: string;
}

export const VerifyAccountPopup: React.FC<Props> = ({ open, onClose, email }) => {
  const [isLoading, setIsLoading] = useState('idle');
  const handleResendEmail = async () => {
    setIsLoading('pending');
    try {
      await resendEmailVerificationApi(email);
      toast.success('Email verification sent successfully');
      setIsLoading('resolved');
      onClose();
    } catch (error: any) {
      setIsLoading('rejected');
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <ModalContainer
      modalId="verify-account-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl max-w-[518px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col items-center gap-6">
        <div className="relative flex w-full justify-center">
          <h3 className="text-base font-normal text-white sm:text-xl">Verify your account</h3>
          <span onClick={onClose} className="absolute right-0 top-0">
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        <p className="text-center text-sm font-medium text-white md:text-base">
          Please check your email( <span className="text-white">{email ?? 'N/A'}</span>) for the
          verification link or you can resend token by clicking on the button.
        </p>
        <div className="flex w-full items-center justify-center gap-3">
          <Button
          title="Close"
          variant="confirm-secondary"
          size="sm"
          compact
          className="mt-2 w-full"
          onClick={onClose}
        />
          <Button
            title="Send Verification Email"
            className="mt-2 w-full"
            loaderIcon={
              isLoading === 'pending' && (
                <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
              )
            }
            onClick={handleResendEmail}
          />
        </div>
      </div>
    </ModalContainer>
  );
};
