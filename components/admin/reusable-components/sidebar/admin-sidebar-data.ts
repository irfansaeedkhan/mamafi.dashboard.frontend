import {
  AdminSigillumIcon,
  AdminTransactionManagementIcon,
  HealthIcon,
  NotificationIcon,
  SecurityIcon,
  UserManagementIcon,
} from '@/assets/svgs';
import { AdminAppRoutes } from '@/constants/app-routes';

export interface IconProps {
  className?: string;
}

export type AdminSidebarDataType = {
  title: string;
  link: string;
  icon: React.FC<IconProps>;
};

export const AdminSidebarData: AdminSidebarDataType[] = [
  {
    title: 'User Management',
    link: AdminAppRoutes.dashboard.user_management,
    icon: UserManagementIcon,
  },
  {
    title: 'Transaction Management',
    link: AdminAppRoutes.dashboard.transaction_management,
    icon: AdminTransactionManagementIcon,
  },
  {
    title: 'Sigillum Management',
    link: AdminAppRoutes.dashboard.meta_assets_management,
    icon: AdminSigillumIcon,
  },
  {
    title: 'Platform Monitoring & Analytics',
    link: AdminAppRoutes.dashboard.platform_monitoring,
    icon: HealthIcon,
  },
  {
    title: 'Notifications & Alerts',
    link: AdminAppRoutes.dashboard.notifications_alerts,
    icon: NotificationIcon,
  },
  {
    title: 'Security & Access Control',
    link: AdminAppRoutes.dashboard.security_access,
    icon: SecurityIcon,
  },
  {
    title: 'Failed Transactions',
    link: '/dashboard/admin/transaction-management/failed-transaction',
    icon: AdminTransactionManagementIcon,
  },
  {
    title: 'Wallet Balance',
    link: '/dashboard/admin/transaction-management/wallet-balance',
    icon: AdminTransactionManagementIcon,
  },
  {
    title: 'Event Tracking',
    link: '/dashboard/admin/platform-monitoring/event-tracking',
    icon: HealthIcon,
  },
  {
    title: 'Track Rewards',
    link: '/dashboard/admin/platform-monitoring/track-rewards',
    icon: HealthIcon,
  },
  {
    title: 'Active Sessions',
    link: '/dashboard/admin/security-access/active-sessions',
    icon: SecurityIcon,
  },
];
