import type { AxiosAdapter, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const GET_CACHE_TTL_MS = 30_000;
const cache = new Map<string, { value: unknown; expiry: number }>();

function cacheKey(config: InternalAxiosRequestConfig) {
  return `${config.method}:${config.baseURL ?? ''}${config.url ?? ''}?${JSON.stringify(config.params ?? {})}`;
}

export function registerGetCache(instance: AxiosInstance) {
  instance.interceptors.request.use(config => {
    const method = (config.method ?? 'get').toLowerCase();
    if (method !== 'get') {
      cache.clear();
      return config;
    }

    const key = cacheKey(config);
    const hit = cache.get(key);
    if (hit && hit.expiry > Date.now()) {
      const adapter: AxiosAdapter = async adapterConfig => ({
        data: hit.value,
        status: 200,
        statusText: 'OK (cache)',
        headers: {},
        config: adapterConfig,
        request: {},
      });
      config.adapter = adapter;
    }
    (config as InternalAxiosRequestConfig & { __cacheKey?: string }).__cacheKey = key;
    return config;
  });

  instance.interceptors.response.use(response => {
    const key = (response.config as InternalAxiosRequestConfig & { __cacheKey?: string }).__cacheKey;
    if (key && (response.config.method ?? 'get').toLowerCase() === 'get') {
      cache.set(key, { value: response.data, expiry: Date.now() + GET_CACHE_TTL_MS });
    }
    return response;
  });
}

export function invalidateApiGetCache() {
  cache.clear();
}
