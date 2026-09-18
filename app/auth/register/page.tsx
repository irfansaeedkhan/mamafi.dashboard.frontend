import { RegisterForm } from '@/components/auth/register/register-form';
import { AppRoutes } from '@/constants/app-routes';
import Link from 'next/link';
import { Suspense } from 'react';
import { CgSpinner } from 'react-icons/cg';

const Register = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="size-14 mx-auto mt-20 h-14 w-14 shrink-0 animate-spin text-white" />
        </div>
      }
    >
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-gradient font-kanit text-[1.85rem] font-normal leading-[2.62rem]">
            Create Account
          </h2>
          <span className="font-nexa text-sm font-normal text-white">Sign up to mamafi</span>
        </div>
        <div className="mx-auto w-full max-w-[566px] px-6">
          <RegisterForm />
        </div>
        <div className="flex justify-center gap-0.5 pb-6 text-sm text-white md:text-base">
          <span className="text-white/80">I already have an account? </span>{' '}
          <Link href={AppRoutes.auth.login} className="cool-link cursor-pointer text-gradient">
            Log In
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default Register;
