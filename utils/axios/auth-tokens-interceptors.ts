import { AxiosHeaders, AxiosInstance } from 'axios';
import { getAuthTokens, refreshTokens, setAuthTokens } from '@/lib/auth';

const refreshTokenPath = '/auth/refresh-token';

export const registerAuthTokenRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async config => {
    const authTokens = getAuthTokens();

    if (authTokens && config.url !== refreshTokenPath) {
      if (!config.headers) config.headers = new AxiosHeaders();
      config.headers['Authorization'] = `Bearer ${authTokens.access_token}`;
    }

    return config;
  });
};

export const registerAuthTokenResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    response => response,

    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest.url?.includes(refreshTokenPath)) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newTokens = await refreshTokens();
          if (newTokens) {
            setAuthTokens(newTokens);
            originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
