'use client';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/stores/auth.store';
import { getAuthTokens } from '@/lib/auth/client-auth-tokens';

const UserProvider = () => {
  const { fetchUser } = useAuthStore(useShallow(state => state.actions));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only fetch user if tokens exist
    const tokens = getAuthTokens();
    if (tokens) {
      fetchUser().catch(error => {
        console.error(error);
      });

      // Refresh user data every 4 minutes to prevent token expiration
      intervalRef.current = setInterval(
        () => {
          const currentTokens = getAuthTokens();
          if (currentTokens) {
            fetchUser().catch(error => {
              console.error('Token refresh failed:', error);
            });
          } else {
            // Clear interval if tokens are gone
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
        },
        4 * 60 * 1000
      ); // 4 minutes
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchUser]);

  return null;
};

export default UserProvider;
