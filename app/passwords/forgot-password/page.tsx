'use client';
import EmailSent from '@/components/passwords/email-sent';
import { Button } from '@/components/shared';
import { AppRoutes } from '@/constants/app-routes';
import { getResetPasswordLink } from '@/lib/auth/get-reset-password-link';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';

interface IFormInput {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const { email } = data;
    setIsLoading('loading');
    try {
      await getResetPasswordLink(email);
      setEmailSent(true);
      setIsLoading('success');
    } catch (error) {
      setIsLoading('loaded');
      console.log(error);
    }
  };

  return emailSent ? (
    <EmailSent
      title="Check your email"
      description={`An email has been sent to ${watch('email')} with instructions to reset your password.`}
    />
  ) : (
    <div className="z-10 flex w-full max-w-[65ch] flex-col gap-4 px-6">
      <div className="mt-8 flex flex-col items-center justify-center gap-3 pb-10">
        <h2 className="text-white pb-4 font-kanit text-[2.25rem] font-normal  leading-[2.62rem]">
          Forgot Password
        </h2>
        <span className="font-nexa text-sm font-normal text-white">
          Enter your email below, you will receive an email with instructions on how to reset your
          password in a few minutes. You can also set a new password if you&apos;ve never set one
          before.
        </span>
      </div>
      <div className="mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(inputMain, 'gap-4')}>
            <div className={inputMain}>
              <input
                autoComplete="off"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                className={clsx(inputField, errors.email && '!border-brand-red')}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-xs font-medium text-brand-red">
                  {errors.email.type === 'required' ? 'Email is required' : 'Invalid email address'}
                </p>
              )}
            </div>
            <Button
              type="submit"
              title="Send Instructions"
              fullWidth
              disabled={
                isLoading === 'loading' || errors.email || watch('email') === '' ? true : false
              }
              loaderIcon={
                isLoading === 'loading' && (
                  <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
                )
              }
              variant="confirm"
              size="lg"
              compact
              className="mt-4 w-full max-w-[220px] mx-auto"
            />
          </div>
        </form>
      </div>
      <div className="flex justify-center gap-0.5 text-sm text-white">
        <span className="text-white/80">Back to </span>{' '}
        <Link
          href={AppRoutes.auth.login}
          className="cool-link cursor-pointer font-semibold text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

const inputMain = 'flex flex-col gap-0.5';
const inputField =
  'peer relative w-full bg-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:light focus:ring-2 focus:ring-light focus:drop-shadow-lg py-3 rounded-full text-base text-white';
