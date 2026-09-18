import { ArrowDownIcon } from '@/assets/svgs';
import { LogoLink } from '@/components/shared';
import Image from 'next/image';
import React from 'react';

export default function AuthLayoutWithoutBackground({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="relative flex min-h-screen w-full overflow-hidden">
        <div className="absolute bottom-[-50%] left-[40%] z-0 h-[30vw] w-[40vw] rounded-full bg-brand-gold/30 blur-[150px]"></div>
        <div className="absolute bottom-[-50%] right-[40%] z-0 h-[30vw] w-[40vw] rounded-full bg-brand-rust/30 blur-[150px]"></div>
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
          <div className="flex h-[calc(100vh-80px)] items-center justify-center">
            <div className="flex h-auto min-h-screen w-full items-center justify-center">
              <div className="mx-4 flex w-full max-w-[566px] flex-col items-center gap-8 rounded-3xl p-8 sm:mx-0">
                <Image
                  src="/images/mail-sent.png"
                  alt="email sent"
                  width={145}
                  height={119}
                  className="mx-auto object-cover"
                />
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
