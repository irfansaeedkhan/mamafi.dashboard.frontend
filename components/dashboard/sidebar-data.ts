import {
  Affiliate,
  Dashboard,
  LeaderBoardIcon,
  RentalMinersIcon,
} from '@/assets/svgs';
import { AppRoutes } from '@/constants/app-routes';

export interface IconProps {
  className?: string;
}

export type SidebarDataType = {
  title: string;
  link: string;
  icon: React.FC<IconProps>;
  comingSoon?: boolean;
};

export const SidebarData: SidebarDataType[] = [
  {
    title: 'Dashboard',
    link: AppRoutes.dashboard.index,
    icon: Dashboard,
  },
  {
    title: 'Affiliates',
    link: AppRoutes.dashboard.affiliates,
    icon: Affiliate,
  },
  {
    title: 'Levels To Unlock',
    link: AppRoutes.dashboard.levels_to_unlock,
    icon: LeaderBoardIcon,
  },
  { title: 'Leaderboard', link: AppRoutes.dashboard.leaderboard, icon: LeaderBoardIcon },
  {
    title: 'Rental Miners',
    link: AppRoutes.dashboard.rental_miners,
    icon: RentalMinersIcon,
  },
];

export const SidebarDataMobile: SidebarDataType[] = [
  {
    title: 'Dashboard',
    link: AppRoutes.dashboard.index,
    icon: Dashboard,
  },
  {
    title: 'Affiliates',
    link: AppRoutes.dashboard.affiliates,
    icon: Affiliate,
  },
  {
    title: 'Levels To Unlock',
    link: AppRoutes.dashboard.levels_to_unlock,
    icon: LeaderBoardIcon,
  },
  { title: 'Leaderboard', link: AppRoutes.dashboard.leaderboard, icon: LeaderBoardIcon },
  {
    title: 'Rental Miners',
    link: AppRoutes.dashboard.rental_miners,
    icon: RentalMinersIcon,
  },
];
