import { redirect } from 'next/navigation';
import { AppRoutes } from '@/constants/app-routes';

export default function RentalMinersRedirect() {
  redirect(AppRoutes.dashboard.rental_miners);
}
