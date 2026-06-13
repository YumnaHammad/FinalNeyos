/** Backend origin without trailing slash. Empty in local dev (Vite proxy). */
export const API_ORIGIN = (import.meta.env.VITE_API_ORIGIN || '').replace(/\/$/, '');

export const API_BASE = API_ORIGIN ? `${API_ORIGIN}/api` : '/api';

export function absoluteUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return API_ORIGIN ? `${API_ORIGIN}${normalized}` : normalized;
}
