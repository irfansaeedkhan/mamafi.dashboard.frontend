import { redirect } from 'next/navigation';
import { AppRoutes } from '@/constants/app-routes';

export default function AffiliatesRedirect() {
  redirect(AppRoutes.dashboard.affiliates);
}
