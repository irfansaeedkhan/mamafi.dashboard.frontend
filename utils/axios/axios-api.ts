import axios from 'axios';
import { APIBaseURL, APIBaseURLBlockchain } from '@/constants/base-urls';
import {
  registerAuthTokenRequestInterceptor,
  registerAuthTokenResponseInterceptor,
} from './auth-tokens-interceptors';
import { registerGetCache } from './get-cache';

export const axiosAPI = axios.create({
  baseURL: APIBaseURL,
});
export const axiosAPIBlockchain = axios.create({
  baseURL: APIBaseURLBlockchain,
});

registerAuthTokenRequestInterceptor(axiosAPI);
registerAuthTokenRequestInterceptor(axiosAPIBlockchain);

registerAuthTokenResponseInterceptor(axiosAPI);
registerAuthTokenResponseInterceptor(axiosAPIBlockchain);

registerGetCache(axiosAPI);
registerGetCache(axiosAPIBlockchain);
