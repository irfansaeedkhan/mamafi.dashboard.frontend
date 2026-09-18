import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { LayoutComponent } from '@/components/auth/layout-component';
import { LogoLink } from '@/components/shared';
import { ArrowDownIcon } from '@/assets/svgs';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
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
      <div className="flex h-full items-center justify-center">{children}</div>
    </div>
  );
}
