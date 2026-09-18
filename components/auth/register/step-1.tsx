'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormType } from '../shared-type';

type StepProps = {
  formMethods: UseFormReturn<RegisterFormType>;
};

export const Step1: React.FC<StepProps> = ({ formMethods }) => {
  const {
    register,
    formState: { errors },
  } = formMethods;
  const searchParams = useSearchParams();
  const [isReferralEditable, setIsReferralEditable] = useState(true);
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      formMethods.setValue('referral_code', ref);
      setIsReferralEditable(false);
    }
  }, [searchParams, formMethods]);

  return (
    <div className={clsx(inputMain, 'gap-4')}>
      <div className={inputMain}>
        <input
          autoFocus
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Email"
          type="email"
          id="email"
          required
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email address',
            },
            maxLength: {
              value: 50,
              message: 'Email cannot exceed 50 characters',
            },
          })}
        />
        {errors.email && <p className="mt-1 text-xs text-brand-red">{errors.email.message}</p>}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="First Name"
          type="text"
          required
          id="name"
          {...register('name', {
            required: 'First Name is required',
            minLength: {
              value: 2,
              message: 'First Name must be at least 2 characters long',
            },
            maxLength: {
              value: 50,
              message: 'First Name cannot exceed 50 characters',
            },
          })}
        />
        {errors.name && <p className="mt-1 text-xs text-brand-red">{errors.name.message}</p>}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Last Name"
          type="text"
          id="surname"
          {...register('surname', {
            required: 'Last Name is required',
            minLength: {
              value: 2,
              message: 'Last Name must be at least 2 characters long',
            },
            maxLength: {
              value: 50,
              message: 'Last Name cannot exceed 50 characters',
            },
          })}
          required
        />
        {errors.surname && <p className="mt-1 text-xs text-brand-red">{errors.surname.message}</p>}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Referral Code"
          type="text"
          required
          readOnly={!isReferralEditable}
          id="referral_code"
          {...register('referral_code', {
            required: 'Referral code is required',
            maxLength: {
              value: 50,
              message: 'Referral code cannot exceed 50 characters',
            },
          })}
        />
        {errors.referral_code && (
          <p className="mt-1 text-xs text-brand-red">{errors.referral_code.message}</p>
        )}
      </div>
      <div className={inputMain}>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="checkbox"
            {...register('terms', { required: 'You must agree to continue' })}
            className="focus:light peer relative h-5 w-5 shrink-0 rounded-sm bg-light text-white outline-none drop-shadow-sm focus:ring-2 focus:ring-light focus:drop-shadow-lg"
          />
          <label
            htmlFor="checkbox"
            className="block min-h-5 text-xs font-normal text-white sm:h-3 md:text-sm"
          >
            By proceeding, you agree to mamafi&apos;s{' '}
            <Link
              href={'/terms'}
              className="cool-link cursor-pointer font-semibold text-gradient"
            >
              Terms & Conditions
            </Link>
          </label>
        </div>
        {errors.terms && <p className="mt-1 text-xs text-brand-red">{errors.terms.message}</p>}
      </div>
    </div>
  );
};

const inputMain = 'flex flex-col';
const inputLabel = 'text-xs font-medium text-white pb-1';
const inputField =
  'peer relative w-full bg-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:light focus:ring-2 focus:ring-light focus:drop-shadow-lg py-3 rounded-full text-base text-white';
