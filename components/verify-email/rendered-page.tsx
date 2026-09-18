'use client';
import { Button } from '@/components/shared';
import { AppRoutes } from '@/constants/app-routes';
import { UpdateActivateAccountApi } from '@/lib/auth/update-activation-token';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const RenderedPageEmail = () => {
  const [isLoading, setIsLoading] = useState('idle');
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const email = params.get('Email');
  const token = params.get('ActivationToken');

  const updateActivateAccount = async () => {
    try {
      setIsLoading('loading');
      await UpdateActivateAccountApi(email!, token!);
      setIsLoading('loaded');
    } catch (error: any) {
      setError(error.message ?? 'Failed to activate account');
      setIsLoading('loaded');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(updateActivateAccount, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-center font-kanit text-xl font-semibold leading-normal text-white md:text-[34px]">
        {error
          ? 'Verification Failed!'
          : isLoading === 'loading' || isLoading === 'idle'
            ? 'Verification is underway'
            : 'Verified!'}
      </h2>
      <p className="text-center text-sm font-medium text-white md:text-base">
        {error
          ? error
          : isLoading === 'loading' || isLoading === 'idle'
            ? 'Thanks for verifying at mamafi. This process may take 15-30 mins to complete.'
            : 'Yahooo! You have successfully verified your email. Click the button to go to the login page.'}
      </p>
      <Link href={AppRoutes.auth.login} className="w-full max-w-[220px] mx-auto mt-4">
        <Button title="Login" variant="confirm" size="lg" compact fullWidth />
      </Link>
    </div>
  );
};
