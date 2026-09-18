'use client';
import { LoginForm } from '@/components/auth/login/login-form';
import { AppRoutes } from '@/constants/app-routes';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-gradient font-kanit text-[1.85rem] font-normal leading-[2.62rem]">
          Welcome Back
        </h2>
        <span className="font-nexa text-sm font-normal text-white">
          Log in with your credentials{' '}
        </span>
      </div>
      <div className="mx-auto w-full max-w-[566px] px-6">
        <LoginForm />
      </div>
      <div className="flex justify-center gap-0.5 text-sm text-white md:text-base">
        <span className="text-white/80">New to mamafi? </span>{' '}
        <Link
          href={AppRoutes.auth.register}
          className="cool-link ml-[2px] cursor-pointer text-gradient"
        >
          {' '}
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
