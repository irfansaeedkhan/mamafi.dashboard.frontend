import React, { useMemo } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import countryList from 'react-select-country-list';
import clsx from 'clsx';
import { CustomDropdown } from '@/components/shared';
import 'react-phone-number-input/style.css';
import { RegisterFormType } from '../shared-type';

type StepProps = {
  formMethods: UseFormReturn<RegisterFormType>;
};

export const Step2: React.FC<StepProps> = ({ formMethods }) => {
  const countries = useMemo(() => countryList().getData(), []);
  const { setValue, watch } = useFormContext();

  const {
    register,
    formState: { errors },
  } = formMethods;

  const country_code = watch('country_code');
  const phoneNumber = watch('phone_number');

  return (
    <div className="flex flex-col gap-4">
      <div className={inputMain}>
        <CustomDropdown
          placeholder="Select Country"
          enableFilter={true}
          options={countries}
          selectedValue={country_code}
          {...register('country_code', {
            required: 'Country is required',
            maxLength: {
              value: 50,
              message: 'Country cannot exceed 50 characters',
            },
          })}
          onSelect={(country_code: string) => {
            setValue('country_code', country_code);
          }}
          // error={errors?.country_code?.message}
        />
        {errors.country_code && (
          <p className="mt-1 text-xs text-brand-red">{errors.country_code.message}</p>
        )}
      </div>

      <div className={inputMain}>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          id="phone_number"
          {...register('phone_number', {
            required: 'Phone number is required',
            maxLength: {
              value: 50,
              message: 'Phone number cannot exceed 50 characters',
            },
            // pattern: {
            //   value: /^\+?[1-9]\d{1,14}$/,
            //   message: "Invalid phone number",
            // },
          })}
          onChange={value => {
            setValue('phone_number', value);
          }}
          className={clsx(
            inputField,
            'focus:[&>input]:border-0 focus:[&>input]:outline-none focus:[&>input]:ring-0'
          )}
        />
        {errors.phone_number?.message && (
          <p className="mt-1 text-xs text-brand-red">{String(errors.phone_number.message)}</p>
        )}
      </div>
    </div>
  );
};
const inputMain = 'flex flex-col';
const inputField =
  'peer relative w-full bg-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:light focus:ring-2 focus:ring-light focus:drop-shadow-lg py-3 rounded-full text-base text-white [&>input]:border-0 [&>input]:outline-none [&>input]:ring-0 [&>input]:bg-light';
