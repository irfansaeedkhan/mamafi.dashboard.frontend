import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '@/models/user.model';
import { LoadingState } from '@/models/common';
import { clearAuthTokens } from '@/lib/auth/client-auth-tokens';
import { getMe, login } from '@/lib/auth';

export interface AuthStore {
  loading: LoadingState;
  user: User | null;

  actions: {
    fetchUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    setUser: (user: User | null) => void;
    logout: () => void;
  };
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      loading: 'idle',
      user: null,

      actions: {
        fetchUser: async () => {
          set({ loading: 'loading' });
          try {
            const user = await getMe();
            set({
              loading: 'loaded',
            });
            get().actions.setUser(user);
          } catch (error: any) {
            set({ loading: 'failed' });
            if (error.response?.status === 401) {
              set({ user: null });
              //TODO : Uncomment
              clearAuthTokens();
            }
            throw error;
          }
        },
        login: async (email: string, password: string) => {
          set({ loading: 'loading' });
          try {
            const user = await login({ email: email, password: password });
            set({
              loading: 'loaded',
            });
            get().actions.setUser(user);
          } catch (error: any) {
            set({ loading: 'failed' });
            throw error;
          }
        },
        logout: () => {
          set({ user: null });
          clearAuthTokens();
        },
        setUser: (user: User | null) => {
          set({
            user: user
              ? {
                  Email: user.Email,
                  Name: user.Name,
                  Surname: user.Surname,
                  AffiliateCode: user.AffiliateCode,
                  WalletAddress: user.WalletAddress,
                  PasswordResetAt: user.PasswordResetAt,
                  // Include JWT payload data
                  sub: user.sub,
                  emailVerified: user.emailVerified,
                  is_admin: user.is_admin,
                  is_demo: user.is_demo,
                  is_rewards_enabled: user.is_rewards_enabled,
                  iat: user.iat,
                  exp: user.exp,
                }
              : null,
          });
        },
      },
    }),
    {
      name: 'AuthStore',
      enabled: process.env.NEXT_PUBLIC_APP_ENV !== 'production',
    }
  )
);
