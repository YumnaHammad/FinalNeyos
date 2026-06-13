import axios from 'axios';
import { API_BASE, API_ORIGIN, absoluteUrl } from './lib/apiBase';

const API = axios.create({
  baseURL: API_BASE,
});

export { API_ORIGIN };

export function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads/') || url.startsWith('/datasheets/')) {
    return absoluteUrl(url);
  }
  const match = url.match(/\/uploads\/[^/?#]+/);
  if (match) return absoluteUrl(match[0]);
  return url;
}

export function resolveDocumentUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed || trimmed === '/contact' || trimmed === '#') return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/uploads/') || trimmed.startsWith('/datasheets/')) {
    return absoluteUrl(trimmed);
  }
  const uploadMatch = trimmed.match(/\/uploads\/[^/?#]+/);
  if (uploadMatch) return absoluteUrl(uploadMatch[0]);
  if (trimmed.startsWith('/')) return absoluteUrl(trimmed);
  return absoluteUrl(`/${trimmed}`);
}

export function documentFileName(url, fallback = 'document.pdf') {
  if (!url) return fallback;
  const name = url.split('/').pop()?.split('?')[0];
  return name && name.includes('.') ? name : fallback;
}

export async function downloadProductDataSheet(product) {
  if (!product?.slug) throw new Error('Product slug is required');
  const url = absoluteUrl(`/api/products/${encodeURIComponent(product.slug)}/datasheet`);
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to generate data sheet');
  }
  const blob = await res.blob();
  const fileName = `${(product.model || product.slug).replace(/[^a-z0-9.-]+/gi, '_')}_Datasheet.pdf`;
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
}

export default API;
