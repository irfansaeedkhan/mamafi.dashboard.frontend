'use client';

import { ArrowDownIcon } from '@/assets/svgs';
import { LayoutComponent } from '@/components/auth/layout-component';
import { AppRoutes } from '@/constants/app-routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute left-0 top-0 flex h-20 items-center pl-6 lg:pl-12">
          <Image
            src="/images/logo-sm.png"
            alt="logo"
            width={44}
            height={44}
            unoptimized
            className="flex-shrink-0 cursor-pointer object-cover w-11 h-11"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
        </div>
        <div className="absolute bottom-[-5%] left-[40%] z-0 h-[27vw] w-[40vw] rounded-full bg-brand-gold/80 blur-[150px] sm:bottom-[-50%]"></div>
        <div className="absolute bottom-[-5%] right-[40%] z-0 h-[27vw] w-[40vw] rounded-full bg-brand-rust/80 blur-[150px] sm:bottom-[-50%]"></div>
        <div className="flex w-full lg:w-[85%]">
          <LayoutComponent />
          <div className="relative z-10 flex w-full flex-col lg:w-1/2">
            <div className="flex h-24 items-center justify-between px-6 sm:px-12 md:hidden lg:justify-end">
              <div className="--flex hidden items-center gap-2">
                <Image
                  src="/images/british_flag.png"
                  alt="flag"
                  width={33}
                  height={22}
                  className="flex-shrink-0"
                />
                <ArrowDownIcon />
              </div>
            </div>
            <div className="flex h-full items-center justify-center lg:h-[calc(100vh-80px)]">
              {children}
            </div>
          </div>
        </div>{' '}
      </section>
    </>
  );
}
