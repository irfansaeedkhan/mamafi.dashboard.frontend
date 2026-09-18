import { AppRoutes } from './app-routes';

// Routes that require authentication (both admin and user can access)
export const AUTHENTICATED_ROUTES = [
  AppRoutes.dashboard.index,
  AppRoutes.dashboard.affiliates,
  AppRoutes.profile.my_profile,
  AppRoutes.profile.my_invoice,
];

// Routes that only admin users can access
export const ADMIN_ONLY_ROUTES = [
  '/dashboard/admin',
  '/dashboard/admin/meta-assets-management',
  '/dashboard/admin/user-management',
  '/dashboard/admin/transaction-management',
  '/dashboard/admin/platform-monitoring',
  '/dashboard/admin/notifications-alerts',
  '/dashboard/admin/security-access',
];

// Routes that only regular users can access (admin cannot access these)
export const USER_ONLY_ROUTES: string[] = [
  // Add any user-only routes here if needed
];

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/passwords/forgot-password',
  '/passwords/reset-password',
  '/email-sent',
  '/verify-email',
  '/privacy-policy',
  '/',
];

// Helper functions
export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
};

export const isAuthenticatedRoute = (pathname: string): boolean => {
  return AUTHENTICATED_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
};

export const isAdminOnlyRoute = (pathname: string): boolean => {
  return ADMIN_ONLY_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
};

export const isUserOnlyRoute = (pathname: string): boolean => {
  return USER_ONLY_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
};

export const requiresAuthentication = (pathname: string): boolean => {
  return !isPublicRoute(pathname);
};

export const canUserAccessRoute = (pathname: string, isAdmin: boolean): boolean => {
  // Public routes - everyone can access
  if (isPublicRoute(pathname)) {
    return true;
  }

  // Admin-only routes - only admins can access
  if (isAdminOnlyRoute(pathname)) {
    return isAdmin;
  }

  // User-only routes - only regular users can access (not admins)
  if (isUserOnlyRoute(pathname)) {
    return !isAdmin;
  }

  // Authenticated routes - both admin and regular users can access
  if (isAuthenticatedRoute(pathname)) {
    return true;
  }

  // Default: allow access to other routes
  return true;
};
