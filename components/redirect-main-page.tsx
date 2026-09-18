'use client';
import { AppRoutes } from '@/constants/app-routes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const RedirectMainPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (pathname === '/') {
        router.replace(AppRoutes.dashboard.index);
      }
    }
  }, [pathname, router]);
  return null;
};
