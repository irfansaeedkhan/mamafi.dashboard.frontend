'use client';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/stores/auth.store';
import { User } from '@/models/user.model';

interface UseUser {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDemo: boolean;
  isRewardsEnabled: boolean;
  loading: 'idle' | 'loading' | 'loaded' | 'failed';
}

export const useUser = (): UseUser => {
  const { user, loading } = useAuthStore(
    useShallow(state => ({
      user: state.user,
      loading: state.loading,
    }))
  );

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin === true,
    isDemo: user?.is_demo === true,
    isRewardsEnabled: user?.is_rewards_enabled === true,
    loading,
  };
};

export const useIsAuthenticated = (): boolean => {
  return useAuthStore(useShallow(state => !!state.user));
};

export const useIsAdmin = (): boolean => {
  return useAuthStore(useShallow(state => state.user?.is_admin === true));
};

export const useIsDemo = (): boolean => {
  return useAuthStore(useShallow(state => state.user?.is_demo === true));
};

export const useIsRewardsEnabled = (): boolean => {
  return useAuthStore(useShallow(state => state.user?.is_rewards_enabled === true));
};
