import { Alert, Check } from '@/assets/svgs';
import { Button } from '@/components/shared';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ModalContainer from '../../../shared/modal-container';

interface Props {
  open: boolean;
  onClose: () => void;
}

type AddSigillumFormFields = {
  username: string; // Username input
  email: string; // Email input
  numberOfAssets: number; // Number of Sigillum to add
};

export const AddSigillumModal: React.FC<Props> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddSigillumFormFields>();

  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSubmit = async (data: AddSigillumFormFields) => {
    setSuccess(false);
    setFailure(false);

    // Simulating API request
    try {
      // Example of form data being sent to an API
      const isSuccess = Math.random() > 0.3; // 70% chance of success
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

      if (isSuccess) {
        setSuccess(true);
        reset();
      } else {
        throw new Error('Something went wrong while adding Sigillum.');
      }
    } catch (error: any) {
      setFailure(true);
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  const handleClose = () => {
    reset();
    setSuccess(false);
    setFailure(false);
    setErrorMessage('');
    onClose();
  };

  useEffect(() => {
    if (open) {
      reset();
      setSuccess(false);
      setFailure(false);
      setErrorMessage('');
    }
  }, [open, reset]);

  return (
    <ModalContainer
      modalId="add-meta-assets-modal"
      isOpen={open}
      onClose={handleClose}
      modalContentClassName="h-auto rounded-xl sm:max-w-[566px] max-w-[343px] bg-dark"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-6">
        {!success && !failure && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-normal text-gradient sm:text-xl">Add Sigillum</h3>
              <IoIosCloseCircleOutline
                onClick={handleClose}
                className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  {...register('email', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address.',
                    },
                  })}
                  className="peer relative w-full rounded-xl bg-primary py-3 pl-6 pr-4 text-base font-thin text-white outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:drop-shadow-lg"
                />
                {errors.email && (
                  <p className="text-brand-red-shade-2 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Number of Sigillum Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="numberOfAssets" className="text-xs text-white">
                  Number of Sigillum
                </label>
                <input
                  type="number"
                  id="numberOfAssets"
                  placeholder="Enter the number of Sigillum"
                  {...register('numberOfAssets', {
                    required: 'Number of Sigillum is required.',
                    min: {
                      value: 1,
                      message: 'Minimum Sigillum to add is 1.',
                    },
                  })}
                  className="peer relative w-full rounded-xl bg-primary py-3 pl-6 pr-4 text-base font-thin text-white outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:drop-shadow-lg"
                />
                {errors.numberOfAssets && (
                  <p className="text-brand-red-shade-2 text-xs">{errors.numberOfAssets.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                title="Add Sigillum"
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
        )}

        {success && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Check />
            <h3 className="text-lg text-white">Sigillum Added Successfully</h3>
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
            <h3 className="text-lg text-white">Sigillum Transfer Failed</h3>
            <p className="text-sm text-gray">{errorMessage}</p>
            <Button
              title="Retry"
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
