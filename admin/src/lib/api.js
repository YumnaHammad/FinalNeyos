import axios from 'axios';
import { API_BASE, API_ORIGIN, absoluteUrl } from './apiBase';

export { API_ORIGIN };
export const API_URL = `${API_BASE.replace(/\/api$/, '')}/api`;

export const api = axios.create({
  baseURL: API_BASE,
});

export function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads/')) return absoluteUrl(url);
  const match = url.match(/\/uploads\/[^/?#]+/);
  if (match) return absoluteUrl(match[0]);
  return url;
}

export async function uploadImageFile(file) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post('/upload', formData);
  return resolveMediaUrl(res.data.url);
}
