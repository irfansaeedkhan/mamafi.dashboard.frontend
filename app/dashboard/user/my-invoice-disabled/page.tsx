import { redirect } from 'next/navigation';
import { AppRoutes } from '@/constants/app-routes';

export default function MyInvoiceDisabledRedirect() {
  redirect(AppRoutes.profile.my_invoice);
}
