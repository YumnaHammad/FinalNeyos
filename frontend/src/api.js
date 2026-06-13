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

/** Resolve product document paths (public PDFs, uploads, external URLs). */
export function resolveDocumentUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed || trimmed === '/contact' || trimmed === '#') return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/uploads/') || trimmed.startsWith('/datasheets/')) return trimmed;
  const uploadMatch = trimmed.match(/\/uploads\/[^/?#]+/);
  if (uploadMatch) return uploadMatch[0];
  if (trimmed.startsWith('/')) return trimmed;
  return `/${trimmed}`;
}

export function documentFileName(url, fallback = 'document.pdf') {
  if (!url) return fallback;
  const name = url.split('/').pop()?.split('?')[0];
  return name && name.includes('.') ? name : fallback;
}

/** Download a Nexyos-generated product data sheet PDF (Hikvision-style). */
export async function downloadProductDataSheet(product) {
  if (!product?.slug) throw new Error('Product slug is required');
  const res = await fetch(
    `/api/products/${encodeURIComponent(product.slug)}/datasheet`
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to generate data sheet');
  }
  const blob = await res.blob();
  const fileName = `${(product.model || product.slug).replace(/[^a-z0-9.-]+/gi, '_')}_Datasheet.pdf`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default API;
