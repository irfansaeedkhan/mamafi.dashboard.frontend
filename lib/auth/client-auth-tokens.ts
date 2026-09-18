import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { AuthTokens } from './types';

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

export const getAuthTokens = (): AuthTokens | null => {
  const access_token = getCookie(ACCESS_TOKEN_STORAGE_KEY);
  const refresh_token = getCookie(REFRESH_TOKEN_STORAGE_KEY);
  if (!access_token || !refresh_token) return null;

  //   return {
  //     access_token: access_token.toString(),
  //     refresh_token: refresh_token.toString(),
  //   };
  return { access_token, refresh_token };
};

export const setAuthTokens = (tokens: AuthTokens): void => {
  setCookie(ACCESS_TOKEN_STORAGE_KEY, tokens.access_token, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days (match JWT expiration)
  });

  setCookie(REFRESH_TOKEN_STORAGE_KEY, tokens.refresh_token, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
};

export const clearAuthTokens = (): void => {
  deleteCookie(ACCESS_TOKEN_STORAGE_KEY);
  deleteCookie(REFRESH_TOKEN_STORAGE_KEY);
};
