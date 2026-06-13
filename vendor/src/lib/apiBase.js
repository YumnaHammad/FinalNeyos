export const API_ORIGIN = (import.meta.env.VITE_API_ORIGIN || '').replace(/\/$/, '');

export const API_BASE = API_ORIGIN ? `${API_ORIGIN}/api` : '/api';

export function absoluteUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return API_ORIGIN ? `${API_ORIGIN}${normalized}` : normalized;
}

export function installAxiosProxy(axios) {
  if (!API_ORIGIN) return;
  axios.interceptors.request.use((config) => {
    if (typeof config.url === 'string' && config.url.startsWith('/api/')) {
      config.url = `${API_ORIGIN}${config.url}`;
    }
    return config;
  });
}
