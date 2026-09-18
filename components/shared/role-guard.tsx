'use client';
import React from 'react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/app-routes';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user'; // 'user' means any authenticated user
  fallbackRoute?: string;
  showFallback?: boolean; // If true, shows fallback content instead of redirecting
  fallbackContent?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole = 'user', // Default to requiring any authenticated user
  fallbackRoute = AppRoutes.auth.login,
  showFallback = false,
  fallbackContent,
}) => {
  const { isAuthenticated, isAdmin, loading } = useUser();
  const router = useRouter();

  // Show loading state while checking authentication
  if (loading === 'loading') {
    return <div className="flex items-center justify-center p-4">Loading...</div>;
  }

  // Check authentication
  if (!isAuthenticated) {
    if (showFallback && fallbackContent) {
      return <>{fallbackContent}</>;
    }
    router.replace(fallbackRoute);
    return null;
  }

  // Check role requirements
  if (requiredRole === 'admin' && !isAdmin) {
    if (showFallback && fallbackContent) {
      return <>{fallbackContent}</>;
    }
    // If admin role is required but user is not admin, redirect to user dashboard
    router.replace(AppRoutes.dashboard.index);
    return null;
  }

  // All checks passed, render children
  return <>{children}</>;
};
