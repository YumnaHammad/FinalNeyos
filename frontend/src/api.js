import axios from 'axios';

export const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN || 'http://127.0.0.1:5000';

const API = axios.create({
  baseURL: '/api',
});

export function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('/uploads/')) return url;
  const match = url.match(/\/uploads\/[^/?#]+/);
  if (match) return match[0];
  return url;
}

export default API;
