import axios from 'axios';

/** Backend origin (no /api suffix) */
export const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN || 'http://127.0.0.1:5000';

export const API_URL = `${API_ORIGIN}/api`;

export const api = axios.create({
  baseURL: '/api',
});

/** Turn stored absolute upload URLs into same-origin paths for admin preview */
export function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('/uploads/')) return url;
  const match = url.match(/\/uploads\/[^/?#]+/);
  if (match) return match[0];
  return url;
}

export async function uploadImageFile(file) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post('/upload', formData);
  return resolveMediaUrl(res.data.url);
}
