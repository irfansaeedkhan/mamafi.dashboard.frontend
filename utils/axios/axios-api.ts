import axios from 'axios';
import { APIBaseURL, APIBaseURLBlockchain } from '@/constants/base-urls';
import {
  registerAuthTokenRequestInterceptor,
  registerAuthTokenResponseInterceptor,
} from './auth-tokens-interceptors';

const REQUEST_TIMEOUT_MS = 12_000;

export const axiosAPI = axios.create({
  baseURL: APIBaseURL,
  timeout: REQUEST_TIMEOUT_MS,
});
export const axiosAPIBlockchain = axios.create({
  baseURL: APIBaseURLBlockchain,
  timeout: REQUEST_TIMEOUT_MS,
});

registerAuthTokenRequestInterceptor(axiosAPI);
registerAuthTokenRequestInterceptor(axiosAPIBlockchain);

registerAuthTokenResponseInterceptor(axiosAPI);
registerAuthTokenResponseInterceptor(axiosAPIBlockchain);
