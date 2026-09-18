import React, { useState } from 'react';
import clsx from 'clsx';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { calculatePasswordStrength, PasswordStrengthMeter } from './strength-meter';
import { RegisterFormType } from '../shared-type';

type StepProps = {
  formMethods: UseFormReturn<RegisterFormType>;
};

export const Step3: React.FC<StepProps> = ({ formMethods }) => {
  const {
    register,
    formState: { errors },
  } = formMethods;
  const { watch } = useFormContext();
  const password = watch('password');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Toggle function for showing/hiding password
  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const passwordStrength = calculatePasswordStrength(password);

  return (
    <div className={clsx(inputMain, 'gap-4')}>
      <div className={inputMain}>
        <div className={clsx('flex items-center', passwordField)}>
          <input
            autoFocus
            autoComplete="off"
            className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
            placeholder="Choose your password"
            type={showPassword1 ? 'text' : 'password'}
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
          />
          <span
            className="size-5 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center"
            onClick={toggleShowPassword1}
          >
            {showPassword1 ? (
              <FaRegEyeSlash className="size-[18px]" />
            ) : (
              <FaRegEye className="size-[18px]" />
            )}
          </span>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-brand-red">{errors.password.message}</p>
        )}
      </div>
      <div className={inputMain}>
        <div className={clsx('flex items-center', passwordField)}>
          <input
            autoComplete="off"
            className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
            placeholder="Confirm your password"
            type={showPassword2 ? 'text' : 'password'}
            {...register('confirm_password', {
              required: 'Confirming password is required',
              validate: (value: any) => value === watch('password') || 'Passwords do not match',
            })}
          />
          <span
            className="size-5 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center"
            onClick={toggleShowPassword2}
          >
            {showPassword2 ? (
              <FaRegEyeSlash className="size-[18px]" />
            ) : (
              <FaRegEye className="size-[18px]" />
            )}
          </span>
        </div>
        {errors.confirm_password && (
          <p className="mt-1 text-xs text-brand-red">{errors.confirm_password.message}</p>
        )}
      </div>
      <PasswordStrengthMeter strength={passwordStrength} />
    </div>
  );
};

const inputMain = 'flex flex-col';
const passwordField =
  'peer relative w-full bg-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:light focus:ring-2 focus:ring-light focus:drop-shadow-lg py-3 rounded-full text-base text-white';
