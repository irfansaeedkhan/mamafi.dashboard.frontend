import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { LogoLink } from '@/components/shared';
import { ArrowDownIcon } from '@/assets/svgs';

export default function AuthLayoutWithoutBackground({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <div className="flex h-20 items-center justify-between px-6 sm:px-12">
            <LogoLink />
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
          <div className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden">
            <div className="pointer-events-none absolute bottom-[-5%] left-[40%] z-0 h-[27vw] w-[40vw] rounded-full bg-brand-gold/80 blur-[150px] sm:bottom-[-50%]" />
            <div className="pointer-events-none absolute bottom-[-5%] right-[40%] z-0 h-[27vw] w-[40vw] rounded-full bg-brand-rust/80 blur-[150px] sm:bottom-[-50%]" />

            <div className="relative z-10 flex w-full justify-center">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
