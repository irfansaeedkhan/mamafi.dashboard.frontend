'use client';
import EmailSent from '@/components/passwords/email-sent';
import { Button } from '@/components/shared';
import { AppRoutes } from '@/constants/app-routes';
import { CreateNewPassword } from '@/lib/auth/create-new-password';
import { axiosAPI } from '@/utils/axios';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { PasswordStrengthMeter, calculatePasswordStrength } from '../auth/register/strength-meter';
import DisplayMessage from '../display-message';

interface IFormInput {
  password: string;
  confirmPassword: string;
}

export const ResetPasswordComp = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const params = useSearchParams();
  const email = params.get('Email');
  const token = params.get('ResetToken');

  const [isLoading, setIsLoading] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState<string>('');
  //UseEffect to make axios request and check if the token is valid
  const checkToken = useCallback(async () => {
    try {
      const res = await axiosAPI.post(`auth/forget-password/verify-email/${token}`);
      setUserId(res.data);
      toast.success('Token verified');
      setIsTokenVerified(true);
    } catch (error: any) {
      //
      const errorMessage = 'Failed to verify token';
      if (error.response?.status === 500) {
        toast.error(error.response?.data?.message ?? errorMessage);
      } else {
        toast.error('Invalid Token');
      }
      //TODO: Disable the form
      setIsTokenVerified(false);
    }
  }, [token]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const { password, confirmPassword } = data;
    setIsLoading('loading');
    try {
      await CreateNewPassword(password, email!, userId!, token!, confirmPassword!);
      setEmailSent(true);
      setIsLoading('success');
    } catch (error) {
      setIsLoading('loaded');
      console.log(error);
      toast.error('Failed to create new password');
    }
  };

  if (!isTokenVerified) {
    return (
      <DisplayMessage title="Token Not Verified" description="token not verified, please try again">
        <Link href={AppRoutes.passwords.forgot_password} className="w-full">
          <Button
          type="submit"
          title="Reset Password"
          variant="confirm"
          size="lg"
          compact
          className="w-full"
        />
        </Link>
      </DisplayMessage>
    );
  }
  if (emailSent) {
    return (
      <EmailSent
        title="Password Changed"
        description="You have successfully changed your Password."
      />
    );
  }
  const password = watch('password');
  const passwordStrength = calculatePasswordStrength(password);
  const confirmPassword = watch('confirmPassword');
  const confirmFieldMessages = [
    errors.password?.message as string | undefined,
    errors.confirmPassword?.message as string | undefined,
  ].filter(Boolean) as string[];

  return (
    <div className="flex w-full max-w-[566px] flex-col gap-4 px-6">
      <div className="mt-8 flex flex-col items-center justify-center gap-3">
        <h2 className="text-white font-kanit text-[1.85rem] font-normal leading-[2.62rem]">
          Create new pasword
        </h2>
        <span className="font-nexa text-sm font-normal text-white">
          Enter a strong and unique password.
        </span>
      </div>
      <div className="mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(inputMain, 'gap-4')}>
            <div className={inputMain}>
              <div
                className={clsx(
                  'flex items-center',
                  passwordField,
                  errors.password && '!border-brand-red'
                )}
              >
                <input
                  autoComplete="off"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
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
                  placeholder="Enter your new password"
                />
                <span
                  className="size-5 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
            </div>
            <div className={inputMain}>
              <div
                className={clsx(
                  'flex items-center',
                  passwordField,
                  (errors.confirmPassword || (confirmPassword && errors.password)) && '!border-brand-red'
                )}
              >
                <input
                  autoComplete="off"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Confirming password is required',
                    validate: (value: any) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Re-enter your password"
                />
                <span
                  className="size-5 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {confirmFieldMessages.length > 0 && (
                <div className="mt-1 flex flex-col gap-1">
                  {confirmFieldMessages.map((message, idx) => (
                    <p key={`${message}-${idx}`} className="text-xs font-medium text-brand-red">
                      {message}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <PasswordStrengthMeter strength={passwordStrength} />
            <Button
              type="submit"
              title="Reset Password"
              variant="confirm"
              size="lg"
              compact
              className="w-full mt-2"
              disabled={
                isLoading === 'loading' ||
                errors.password ||
                errors.confirmPassword ||
                !watch('password') ||
                !watch('confirmPassword')
                  ? true
                  : false
              }
              loaderIcon={
                isLoading === 'loading' && (
                  <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const inputMain = 'flex flex-col';
const passwordField =
  'peer relative w-full bg-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:light focus:ring-2 focus:ring-light focus:drop-shadow-lg py-3 rounded-full text-base text-white';
