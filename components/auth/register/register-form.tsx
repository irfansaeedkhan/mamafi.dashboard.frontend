'use client';
import React, { useState, createContext, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiMiniArrowLeft } from 'react-icons/hi2';
import { CgSpinner } from 'react-icons/cg';
import { AppRoutes } from '@/constants/app-routes';
import { Button } from '@/components/shared';
import { register } from '@/lib/auth';

import { useMultistepForm } from './useMultistepForm';
import { RegisterFormType, initialRegisterForm } from '../shared-type';
import { Step1 } from './step-1';
import { Step2 } from './step-2';
import { Step3 } from './step-3';

export const FormContext = createContext({} as { formState: RegisterFormType; setFormState: any });

export const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const formMethods = useForm<RegisterFormType>({
    defaultValues: initialRegisterForm,
  });
  const { handleSubmit, reset } = formMethods;

  const { steps, currentStepIndex, isFirstStep, isLastStep, step, goTo, next, back } =
    useMultistepForm([
      <Step1 key={1} formMethods={formMethods} />,
      <Step2 key={2} formMethods={formMethods} />,
      <Step3 key={3} formMethods={formMethods} />,
    ]);

  async function onSubmit(data: RegisterFormType) {
    if (isLastStep) {
      setIsLoading(true);

      try {
        const res = await register({
          email: data.email,
          password: data.password,
          referralCode: data.referral_code,
          name: data.name,
          surName: data.surname,
          mobile: data.phone_number,
          countryCode: data.country_code,
          confirmPassword: data.confirm_password,
        });

        if (res) {
          toast.success(res.message);
          router.push(AppRoutes.email.email_sent);
          setError('');
          reset();
          goTo(0);
        } else {
          throw new Error('Failed to Register');
        }
      } catch (error: any) {
        toast.error('Failed to Register');
        setError(error.message ?? 'Failed to Register');
        goTo(0);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setError('');
        }, 6000);
      }
    } else {
      next();
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-6">
          {!isFirstStep && (
            <div
              className="border-gray-shade-1/40 hover:bg-gray-shade-1/10 size-10 group flex cursor-pointer items-center justify-center rounded-full border transition-all duration-100 hover:border-white"
              onClick={back}
            >
              <HiMiniArrowLeft className="text-xl text-white/30 group-hover:text-white" />
            </div>
          )}

          <div className="relative flex w-full flex-col items-center">
            <div className="mb-4 flex w-full items-center justify-center">
              <div className="-ml-6 flex-1"></div>
              {Array.from({ length: steps.length }).map((_, index) => (
                <div key={index} className="flex-1">
                  {/* Line between steps */}
                  <div
                    className={`relative z-10 flex items-center ${index !== 0 ? 'justify-start' : 'justify-center'}`}
                  >
                    {index !== 0 && (
                      <div
                        className={`absolute left-0 top-3 h-0.5 w-full -translate-x-[95%]  transform bg-light ${currentStepIndex >= index ? 'bg-gradient-pattern' : ''}`}
                      ></div>
                    )}
                  </div>
                  {/* Step circle */}
                  <div
                    className={`relative z-20 flex h-6 w-6 items-center justify-center rounded-full text-sm ${currentStepIndex >= index ? 'bg-gradient-pattern text-white' : 'text-gray-800 bg-light'}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          {step}
          <Button
            variant="confirm"
            size="lg"
            compact
            fullWidth
            className="mt-4 w-full max-w-[220px] mx-auto"
            title={isLastStep ? 'Register' : 'Next'}
            type="submit"
          />
        </div>
        {error && <p className="mt-2 text-brand-red">{error}</p>}
      </form>
      {isLoading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur">
          <CgSpinner className="size-14 mx-auto mt-20 h-14 w-14 shrink-0 animate-spin text-white" />
        </div>
      )}
    </FormProvider>
  );
};
