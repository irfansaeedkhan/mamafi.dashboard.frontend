'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import LeftSide from './left-side';

export const LayoutComponent = () => {
  const pathname = usePathname();
  return (
    <div className="hidden h-auto w-1/2 items-center lg:flex">
      <LeftSide page_name={pathname.includes('login') ? 'login' : 'register'} />
    </div>
  );
};
