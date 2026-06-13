import axios from 'axios';

export const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN || 'http://127.0.0.1:5000';

export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const vendorId = localStorage.getItem('vendorId');
  if (vendorId) {
    config.headers['X-Vendor-Id'] = vendorId;
  }
  return config;
});

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

export function getVendorSession() {
  try {
    const raw = localStorage.getItem('vendorUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setVendorSession(vendor) {
  localStorage.setItem('vendorLoggedIn', 'true');
  localStorage.setItem('vendorId', vendor.id);
  localStorage.setItem('vendorUser', JSON.stringify(vendor));
}

export function clearVendorSession() {
  localStorage.removeItem('vendorLoggedIn');
  localStorage.removeItem('vendorId');
  localStorage.removeItem('vendorUser');
}

export function isVendorLoggedIn() {
  return localStorage.getItem('vendorLoggedIn') === 'true' && !!localStorage.getItem('vendorId');
}
