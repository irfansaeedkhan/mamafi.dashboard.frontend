'use client';
import { AppRoutes } from '@/constants/app-routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const LogoLink = () => {
  const router = useRouter();
  return (
    <Image
      src="/images/logo-sm.png"
      alt="logo"
      width={44}
      height={44}
      unoptimized
      className="flex-shrink-0 cursor-pointer object-cover w-11 h-11"
      onClick={() => router.push(AppRoutes.dashboard.index)}
    />
  );
};
