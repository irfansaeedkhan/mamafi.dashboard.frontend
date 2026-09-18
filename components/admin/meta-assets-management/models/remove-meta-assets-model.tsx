import { Alert, Check } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { CustomDropdown } from '@/components/shared/custom-dropdown'; // Adjust import path as needed
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ModalContainer from '../../../shared/modal-container';

interface Props {
  open: boolean;
  onClose: () => void;
  userEmail?: string;
  totalAssets?: number;
}

interface FormData {
  numberOfAssets: string;
}

export const RemoveSigillumModal: React.FC<Props> = ({
  open,
  onClose,
  userEmail = 'N/A',
  totalAssets = 0,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const [status, setStatus] = useState<'idle' | 'confirmation' | 'success' | 'failure'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const dropdownOptions = Array.from({ length: totalAssets }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  const resetStates = () => {
    setStatus('idle');
    setErrorMessage('');
    reset();
  };

  useEffect(() => {
    if (open) resetStates();
  }, [open, reset]);

  const handleConfirm = async () => {
    const numberOfAssets = watch('numberOfAssets');
    console.log('data:::', userEmail, numberOfAssets);
    if (!userEmail || !numberOfAssets) {
      setErrorMessage('Invalid data. Please provide all required information.');
      setStatus('failure');
      return;
    }

    try {
      // Simulated API call
      const response = await fetch('/api/remove-meta-assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          assetsToRemove: numberOfAssets,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove Sigillum. Please try again.');
      }

      setStatus('success');
      reset();
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      // setStatus("failure");
      setStatus('success');
    }
  };

  const handleClose = () => {
    resetStates();
    onClose();
  };

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <div className="flex flex-col items-center gap-6 text-center">
            <Check />
            <h3 className="text-lg text-white">Sigillum Removed Successfully</h3>
            <Button
              title="Continue"
              variant="confirm"
              size="lg"
              compact
              className="w-full"
              onClick={handleClose}
            />
          </div>
        );

      case 'failure':
        return (
          <div className="flex flex-col items-center gap-6 text-center">
            <Alert />
            <h3 className="text-lg text-white">Sigillum Removal Failed</h3>
            <p className="text-sm text-gray">{errorMessage}</p>
            <Button
              title="Retry"
              variant="confirm"
              size="lg"
              compact
              className="w-full"
              onClick={handleClose}
            />
          </div>
        );

      case 'confirmation':
        return (
          <div className="flex flex-col items-center gap-6 text-center">
            <Alert />
            <h3 className="text-lg text-white">Are you sure?</h3>
            <p className="text-sm text-gray">
              Are you sure you want to remove{' '}
              <span className="text-white">
                <b>{watch('numberOfAssets')}</b>
              </span>{' '}
              Sigillum from{' '}
              <span className="text-white">
                <b>{userEmail}</b>
              </span>
              ?
            </p>
            <Button
              title="Confirm"
              variant="confirm"
              size="lg"
              compact
              className="w-full"
              onClick={handleConfirm}
            />
          </div>
        );

      default:
        return (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-normal text-white sm:text-xl">Remove Sigillum</h3>
              <IoIosCloseCircleOutline
                onClick={handleClose}
                className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2"
              />
            </div>
            <form
              onSubmit={handleSubmit(() => setStatus('confirmation'))}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white">Number of Sigillum to Remove</label>
                <CustomDropdown
                  placeholder="Select number of Sigillum"
                  options={dropdownOptions}
                  selectedValue={watch('numberOfAssets')}
                  className="!bg-light"
                  onSelect={(value: string) => setValue('numberOfAssets', value)}
                />
                {errors.numberOfAssets && (
                  <p className="text-brand-red-shade-2 text-xs">{errors.numberOfAssets.message}</p>
                )}
              </div>
              <Button
                type="submit"
                title="Remove Sigillum"
                variant="confirm"
                size="lg"
                compact
                className="mt-4 w-full"
                loaderIcon={
                  isSubmitting && (
                    <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
                  )
                }
              />
            </form>
          </>
        );
    }
  };

  return (
    <ModalContainer
      modalId="remove-meta-assets-modal"
      isOpen={open}
      onClose={handleClose}
      modalContentClassName="h-auto rounded-xl sm:max-w-[566px] max-w-[343px] bg-dark"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-6">{renderContent()}</div>
    </ModalContainer>
  );
};
