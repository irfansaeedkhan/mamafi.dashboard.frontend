import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_STORAGE_KEY, AuthTokens, REFRESH_TOKEN_STORAGE_KEY } from '@/lib/auth';
import { validateTokens } from './validate-tokens';

export const isAuthenticated = async (request: NextRequest) => {
  try {
    const authTokens = getAuthTokensFromRequest(request);
    if (!authTokens) return false;

    const payload = await validateTokens(authTokens);
    return !!payload;
  } catch {
    return false;
  }
};

const getAuthTokensFromRequest = (request: NextRequest): AuthTokens | null => {
  const accessToken = request.cookies.get(ACCESS_TOKEN_STORAGE_KEY);
  const refreshToken = request.cookies.get(REFRESH_TOKEN_STORAGE_KEY);

  if (!accessToken || !refreshToken) return null;
  return {
    access_token: accessToken.value,
    refresh_token: refreshToken.value,
  };
};

export const getUserRoleFromRequest = async (
  request: NextRequest
): Promise<'admin' | 'user' | null> => {
  try {
    const authTokens = getAuthTokensFromRequest(request);
    if (!authTokens) return null;

    // Decode JWT token to get user role
    const payload = JSON.parse(atob(authTokens.access_token.split('.')[1]));
    console.log('[Middleware] User role from token:', payload.is_admin ? 'admin' : 'user');
    return payload.is_admin === true ? 'admin' : 'user';
  } catch (error) {
    console.error('Error getting user role from request:', error);
    return null;
  }
};
