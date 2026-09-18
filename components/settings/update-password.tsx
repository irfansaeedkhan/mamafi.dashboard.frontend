import { ProfilePasswordIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { UpdatePasswordApi } from '@/lib/auth/update-password';
import { useAuthStore } from '@/stores/auth.store';
import clsx from 'clsx';
import moment from 'moment';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface IFormInput {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{12,}$/;

interface Props {
  getProfileData: () => void;
}

export const UpdatePassword: React.FC<Props> = ({ getProfileData }) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    setIsLoading('loading');
    const { current_password, new_password, confirm_password } = data;
    try {
      await UpdatePasswordApi(current_password, new_password, confirm_password);
      Object.keys(data).forEach(key => {
        data[key as keyof IFormInput] = '';
      });
      getProfileData();
      toast.success('Password updated successfully');
      setErrorMessage('');
      reset();
      setIsLoading('success');
    } catch (error: any) {
      setIsLoading('error');
      setErrorMessage(error.message);
      toast.error('Failed to update password');
    }
  };
  const newPassword = watch('new_password');


  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex items-center gap-3 rounded-xl py-3
                      text-white`}
      >
        <ProfilePasswordIcon className={`shrink-0 scale-125 [&>path]:fill-white`} />
        <span className="z-10 flex flex-col">
          <span className="text-xs sm:text-sm">Account Password</span>
          <span className="text-xxs">
            Last updated {moment(user?.PasswordResetAt).startOf('day').fromNow()}
          </span>
        </span>
      </div>
      <div className="w-full flex-grow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(inputMain, 'gap-4')}>
            <div className={inputMain}>
              <label className={inputLabel}>Current Password</label>

              <div
                className={clsx(
                  'flex items-center',
                  passwordField,
                  errors.current_password && '!border-brand-red'
                )}
              >
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  {...register('current_password', {
                    required: true,
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Current Password"
                />
                <span
                  className="size-5 flex h-5 w-5 flex-shrink-0 shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.current_password && (
                <p className="text-xs font-medium text-brand-red">
                  {errors.current_password.message}
                </p>
              )}
            </div>
            <div className={inputMain}>
              <label className={inputLabel}>New Password</label>

              <div
                className={clsx(
                  'flex items-center',
                  passwordField,
                  errors.new_password && '!border-brand-red'
                )}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('new_password', {
                    required: 'New Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                      message: 'Password must include upper, lower, number, and special character',
                    },
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="New Password"
                />
                <span
                  className="size-5 flex h-5 w-5 flex-shrink-0 shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.new_password && (
                <p className="text-xs font-medium text-brand-red">{errors.new_password.message}</p>
              )}
            </div>
            <div className={inputMain}>
              <label className={inputLabel}>Confirm Password</label>

              <div
                className={clsx(
                  'flex items-center',
                  passwordField,
                  errors.confirm_password && '!border-brand-red'
                )}
              >
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirm_password', {
                    required: 'Confirming password is required',
                    validate: (value: any) =>
                      value === watch('new_password') || 'Passwords do not match',
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Confirm Password"
                />
                <span
                  className="size-5 flex h-5 w-5 flex-shrink-0 shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.confirm_password && (
                <p className="text-xs font-medium text-brand-red">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            {/* <PasswordStrengthMeter strength={passwordStrength} /> */}
            {errorMessage && (
              <p className="mt-2 text-xs font-medium text-brand-red">{errorMessage}</p>
            )}
            <Button
              title="Save"
              type="submit"
              variant="confirm"
              size="lg"
              compact
              className="mt-4 w-full"
              loaderIcon={
                isLoading === 'loading' && (
                  <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
                )
              }
              disabled={
                errors.current_password ||
                watch('current_password') === '' ||
                errors.new_password ||
                watch('new_password') === '' ||
                watch('confirm_password') === '' ||
                errors.confirm_password ||
                isLoading === 'loading'
                  ? true
                  : false
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const inputMain = 'flex flex-col gap-1';
const inputLabel = 'text-sm text-white pl-1';
const passwordField =
  'peer relative w-full bg-dark pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:dark focus:ring-2 focus:ring-dark focus:drop-shadow-lg py-3 rounded-full text-base text-white bg-light box-3d';
