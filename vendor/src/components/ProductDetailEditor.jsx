import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Loader2,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { api, uploadImageFile, resolveMediaUrl } from '../lib/api';

const slugify = (t) =>
  String(t || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const emptyDoc = () => ({ title: '', url: '', type: 'PDF' });
const emptyFirmware = () => ({ title: '', url: '', date: '' });
const emptySpecRow = () => ({ label: '', value: '' });

const emptyProduct = () => ({
  title: '',
  model: '',
  slug: '',
  description: '',
  image: '',
  images: [],
  categorySlug: '',
  subCategorySlug: '',
  subSubCategorySlug: '',
  isNew: false,
  isHot: false,
  isActive: true,
  sortOrder: 0,
  keyFeatures: [],
  featureIcons: [],
  variants: [],
  filterTags: [],
  dataSheetUrl: '',
  specifications: {},
  resources: { documents: [], firmware: [] },
});

const lines = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
const fromLines = (text) =>
  text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

const familyPath = (categorySlug, subCategorySlug, subSubCategorySlug) =>
  categorySlug && subCategorySlug && subSubCategorySlug
    ? `/category/${categorySlug}/${subCategorySlug}/${subSubCategorySlug}`
    : null;

const familyKey = (p) =>
  `${p.categorySlug || ''}|${p.subCategorySlug || ''}|${p.subSubCategorySlug || ''}`;

const ProductDetailEditor = ({ readOnly = false }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyProduct());
  const [formTab, setFormTab] = useState('basic');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [expandedSpec, setExpandedSpec] = useState(null);
  const [newSpecGroup, setNewSpecGroup] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSub, setFilterSub] = useState('');
  const [filterSubSub, setFilterSubSub] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
      ]);
      setProducts(Array.isArray(pRes.data) ? pRes.data : []);
      setCategories(Array.isArray(cRes.data) ? cRes.data : []);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const selectedCategory = categories.find((c) => c.slug === form.categorySlug);
  const subCategories = selectedCategory?.subCategories || [];
  const selectedSub = subCategories.find((s) => s.slug === form.subCategorySlug);
  const subSubList = selectedSub?.subSubCategories || [];

  const filterCategoryObj = categories.find((c) => c.slug === filterCategory);
  const filterSubList = filterCategoryObj?.subCategories || [];
  const filterSubObj = filterSubList.find((s) => s.slug === filterSub);
  const filterSubSubList = filterSubObj?.subSubCategories || [];

  const resolveFamily = (p) => {
    const cat = categories.find((c) => c.slug === p.categorySlug);
    const sub = cat?.subCategories?.find((s) => s.slug === p.subCategorySlug);
    const ss = sub?.subSubCategories?.find((x) => x.slug === p.subSubCategorySlug);
    return {
      categoryName: cat?.name || p.categorySlug || 'Uncategorized',
      subName: sub?.name || p.subCategorySlug || '—',
      subSubName: ss?.name || p.subSubCategorySlug || 'Unassigned',
      categorySlug: p.categorySlug || '',
      subCategorySlug: p.subCategorySlug || '',
      subSubCategorySlug: p.subSubCategorySlug || '',
    };
  };

  const openModal = (mode, item = null) => {
    setModal(mode);
    setFormTab('basic');
    if (item) {
      setForm({
        ...emptyProduct(),
        ...item,
        images: item.images || [],
        keyFeatures: item.keyFeatures || [],
        featureIcons: item.featureIcons || [],
        variants: item.variants || [],
        filterTags: item.filterTags || [],
        specifications: item.specifications || {},
        resources: {
          documents: item.resources?.documents || [],
          firmware: item.resources?.firmware || [],
        },
      });
      const groups = Object.keys(item.specifications || {});
      setExpandedSpec(groups[0] || null);
    } else {
      setForm(emptyProduct());
      setExpandedSpec(null);
    }
  };

  const saveProduct = async (e) => {
    e?.preventDefault?.();
    if (!form.title?.trim()) {
      toast.error('Product title is required — open Basic & Category tab');
      setFormTab('basic');
      return;
    }
    if (!form.slug?.trim()) {
      toast.error('URL slug is required — open Basic & Category tab');
      setFormTab('basic');
      return;
    }
    if (!form.subSubCategorySlug) {
      toast.error('Product family (3rd sub-category) is required — open Basic & Category tab');
      setFormTab('basic');
      return;
    }

    setSaving(true);
    const toastId = toast.loading('Saving product…');
    try {
      const payload = {
        ...form,
        slug: slugify(form.slug),
        resources: form.resources || { documents: [], firmware: [] },
      };
      if (modal === 'edit' && form._id) {
        await api.put(`/products/${form._id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      toast.success('Product saved — visible on site immediately', { id: toastId });
      setModal(null);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/products/${deleteId}`);
      toast.success('Product deleted');
      setDeleteId(null);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const addSpecGroup = () => {
    const name = newSpecGroup.trim();
    if (!name || form.specifications[name]) return;
    setForm((f) => ({
      ...f,
      specifications: { ...f.specifications, [name]: [] },
    }));
    setExpandedSpec(name);
    setNewSpecGroup('');
  };

  const updateSpecRow = (group, idx, field, val) => {
    setForm((f) => {
      const rows = [...(f.specifications[group] || [])];
      rows[idx] = { ...rows[idx], [field]: val };
      return { ...f, specifications: { ...f.specifications, [group]: rows } };
    });
  };

  const filteredProducts = useMemo(() => {
    let list = products;
    if (filterCategory) list = list.filter((p) => p.categorySlug === filterCategory);
    if (filterSub) list = list.filter((p) => p.subCategorySlug === filterSub);
    if (filterSubSub) list = list.filter((p) => p.subSubCategorySlug === filterSubSub);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.model, p.title, p.slug, p.description]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }
    return list;
  }, [products, filterCategory, filterSub, filterSubSub, search]);

  const productGroups = useMemo(() => {
    const map = new Map();
    for (const p of filteredProducts) {
      const key = familyKey(p);
      if (!map.has(key)) map.set(key, { ...resolveFamily(p), products: [] });
      map.get(key).products.push(p);
    }
    return Array.from(map.values())
      .sort((a, b) =>
        `${a.categoryName}|${a.subName}|${a.subSubName}`.localeCompare(
          `${b.categoryName}|${b.subName}|${b.subSubName}`
        )
      )
      .map((g) => ({
        ...g,
        products: [...g.products].sort(
          (a, b) =>
            (a.sortOrder || 0) - (b.sortOrder || 0) ||
            String(a.model || '').localeCompare(String(b.model || ''))
        ),
      }));
  }, [filteredProducts, categories]);

  const totalFiltered = filteredProducts.length;

  const tabs = [
    { id: 'basic', label: 'Basic & Category' },
    { id: 'hero', label: 'Hero & Gallery' },
    { id: 'specs', label: 'Specifications' },
    { id: 'resources', label: 'Resources' },
  ];

  if (loading) {
    return (
      <div className="p-16 flex justify-center">
        <Loader2 className="animate-spin text-[#006071]" size={36} />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-900">Product Detail Pages</h3>
            <p className="text-gray-500 text-sm mt-1">
              {readOnly
                ? 'Browse the full product catalogue. Contact admin to request changes.'
                : 'Full long-page data (gallery, features, specs, resources). Each product opens at'}{' '}
              {!readOnly && (
                <>
                  <code className="text-[#006071]">/products/[slug]</code> on the website.
                </>
              )}
            </p>
          </div>
          {!readOnly && (
          <button
            type="button"
            onClick={() => openModal('add')}
            className="px-5 py-2.5 bg-[#006071] text-white rounded-xl font-bold text-sm flex items-center gap-2"
          >
            <Plus size={16} /> Add Product
          </button>
          )}
        </div>

        <div className="p-6 border-b border-gray-50 space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setFilterSub('');
                setFilterSubSub('');
              }}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#006071]/40"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={filterSub}
              onChange={(e) => {
                setFilterSub(e.target.value);
                setFilterSubSub('');
              }}
              disabled={!filterCategory}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#006071]/40 disabled:opacity-50"
            >
              <option value="">All sub-categories</option>
              {filterSubList.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={filterSubSub}
              onChange={(e) => setFilterSubSub(e.target.value)}
              disabled={!filterSub}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#006071]/40 disabled:opacity-50"
            >
              <option value="">All product families (3rd sub)</option>
              {filterSubSubList.map((ss) => (
                <option key={ss.slug} value={ss.slug}>
                  {ss.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search within selected family…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#006071]/40"
            />
          </div>
          <p className="text-xs text-gray-500">
            {totalFiltered} product{totalFiltered === 1 ? '' : 's'} in{' '}
            {productGroups.length} famil{productGroups.length === 1 ? 'y' : 'ies'}
            {filterSubSub ? ' (filtered to one sub-sub category)' : ''}
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {productGroups.length === 0 ? (
            <p className="p-12 text-center text-gray-400">No products match this filter.</p>
          ) : (
            productGroups.map((group) => {
              const listPath = familyPath(
                group.categorySlug,
                group.subCategorySlug,
                group.subSubCategorySlug
              );
              const isUnassigned = !group.subSubCategorySlug;
              return (
                <section key={familyKey(group)} className="bg-gray-50/40">
                  <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {group.categoryName} → {group.subName}
                      </p>
                      <h4 className="text-lg font-black text-gray-900 flex items-center gap-2 flex-wrap">
                        {group.subSubName}
                        <span className="text-xs font-bold bg-[#006071]/10 text-[#006071] px-2 py-0.5 rounded-full">
                          {group.products.length} card{group.products.length === 1 ? '' : 's'}
                        </span>
                        {isUnassigned && (
                          <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            Assign a product family
                          </span>
                        )}
                      </h4>
                      {listPath ? (
                        <p className="text-xs text-[#006071] mt-1">
                          List page:{' '}
                          <a
                            href={`http://localhost:5173${listPath}`}
                            target="_blank"
                            rel="noreferrer"
                            className="underline"
                          >
                            {listPath}
                          </a>
                        </p>
                      ) : (
                        <p className="text-xs text-amber-600 mt-1">
                          No list page until 3rd sub-category is set on each product.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="divide-y divide-gray-50 bg-white">
                    {group.products.map((p) => (
                      <div
                        key={p._id}
                        className="p-6 flex flex-col md:flex-row md:items-center gap-4"
                      >
                        <img
                          src={p.image ? resolveMediaUrl(p.image) : ''}
                          alt=""
                          className="w-16 h-16 object-contain bg-gray-50 rounded-lg border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900">{p.model || p.slug}</p>
                          <p className="text-sm text-gray-500 truncate">{p.title}</p>
                          <p className="text-xs text-[#006071] mt-1">/products/{p.slug}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <a
                            href={`http://localhost:5173/products/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-2 text-xs font-bold text-gray-600 bg-gray-100 rounded-lg flex items-center gap-1"
                          >
                            <ExternalLink size={14} /> Preview
                          </a>
                          <button
                            type="button"
                            onClick={() => openModal(readOnly ? 'view' : 'edit', p)}
                            className="p-2.5 rounded-xl bg-gray-100 hover:bg-[#006071]/10"
                            title={readOnly ? 'View product' : 'Edit product'}
                          >
                            <Edit2 size={16} />
                          </button>
                          {!readOnly && (
                          <button
                            type="button"
                            onClick={() => setDeleteId(p._id)}
                            className="p-2.5 rounded-xl bg-rose-50 text-rose-500"
                          >
                            <Trash2 size={16} />
                          </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={() => setModal(null)}
            />
            <motion.form
              noValidate
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              onSubmit={(e) => {
                e.preventDefault();
                if (!readOnly) saveProduct(e);
              }}
              className="relative bg-white w-full md:max-w-4xl max-h-[92vh] overflow-hidden rounded-t-[2rem] md:rounded-[2rem] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex justify-between items-center shrink-0">
                <div>
                  <p className="text-[10px] font-black text-[#006071] uppercase tracking-widest">
                    {readOnly ? 'View Product' : modal === 'edit' ? 'Edit Product' : 'New Product'}
                  </p>
                  <h3 className="text-xl font-black text-gray-900">
                    {form.model || form.title || 'Product detail page'}
                  </h3>
                </div>
                <button type="button" onClick={() => setModal(null)}>
                  <X size={22} />
                </button>
              </div>

              <div className="flex gap-1 px-6 pt-4 overflow-x-auto shrink-0 border-b pb-0">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormTab(t.id)}
                    className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-t-lg border-b-2 ${
                      formTab === t.id
                        ? 'border-[#006071] text-[#006071]'
                        : 'border-transparent text-gray-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <fieldset disabled={readOnly} className="flex flex-col flex-1 min-h-0 border-0 m-0 p-0">
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {formTab === 'basic' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label="Product Title *">
                        <input
                          className="admin-input"
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          placeholder="2 MP AcuSense Fixed Cube Network Camera"
                        />
                      </Field>
                      <Field label="Model Number *">
                        <input
                          className="admin-input"
                          value={form.model}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              model: e.target.value,
                              slug: form.slug || slugify(e.target.value),
                            })
                          }
                          placeholder="NX-DS2143"
                        />
                      </Field>
                    </div>
                    <Field label="URL Slug *">
                      <input
                        className="admin-input"
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        placeholder="nx-ds2143-dome"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Website: /products/{slugify(form.slug) || '…'}
                      </p>
                    </Field>
                    <Field label="Short Description">
                      <textarea
                        className="admin-input min-h-[80px]"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                    </Field>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Field label="Category">
                        <select
                          className="admin-input"
                          value={form.categorySlug}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              categorySlug: e.target.value,
                              subCategorySlug: '',
                              subSubCategorySlug: '',
                            })
                          }
                        >
                          <option value="">Select category</option>
                          {categories.map((c) => (
                            <option key={c._id} value={c.slug}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Sub-category">
                        <select
                          className="admin-input"
                          value={form.subCategorySlug}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              subCategorySlug: e.target.value,
                              subSubCategorySlug: '',
                            })
                          }
                        >
                          <option value="">Select sub-category</option>
                          {subCategories.map((s) => (
                            <option key={s.slug} value={s.slug}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Product family (3rd sub-category) *">
                        <select
                          className="admin-input"
                          value={form.subSubCategorySlug}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              subSubCategorySlug: e.target.value,
                            })
                          }
                        >
                          <option value="">Select product family</option>
                          {subSubList.map((ss) => (
                            <option key={ss.slug} value={ss.slug}>
                              {ss.name}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    {form.subSubCategorySlug && (
                      <p className="text-xs text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
                        This product appears on the family list page{' '}
                        <code className="text-[#006071]">
                          {familyPath(
                            form.categorySlug,
                            form.subCategorySlug,
                            form.subSubCategorySlug
                          )}
                        </code>
                        . Each model must be unique within this family. Manage search filters under{' '}
                        <a href="/search-list" className="text-[#006071] font-bold underline">
                          Catalogue → Search List
                        </a>
                        .
                      </p>
                    )}
                    <div className="flex flex-wrap gap-6">
                      <label className="flex items-center gap-2 text-sm font-semibold">
                        <input
                          type="checkbox"
                          checked={form.isNew}
                          onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                        />
                        NEW badge
                      </label>
                      <label className="flex items-center gap-2 text-sm font-semibold">
                        <input
                          type="checkbox"
                          checked={form.isHot}
                          onChange={(e) => setForm({ ...form, isHot: e.target.checked })}
                        />
                        HOT badge
                      </label>
                      <label className="flex items-center gap-2 text-sm font-semibold">
                        <input
                          type="checkbox"
                          checked={form.isActive}
                          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                        />
                        Active on site
                      </label>
                    </div>
                  </>
                )}

                {formTab === 'hero' && (
                  <>
                    <ImageUploadField
                      label="Main product image"
                      value={form.image}
                      onChange={(url) => setForm({ ...form, image: url })}
                    />
                    <Field label="Gallery images (one URL per line)">
                      <textarea
                        className="admin-input min-h-[100px] font-mono text-xs"
                        value={lines(form.images)}
                        onChange={(e) =>
                          setForm({ ...form, images: fromLines(e.target.value) })
                        }
                        placeholder="/uploads/… or https://…"
                      />
                    </Field>
                    <Field label="Key features (one bullet per line)">
                      <textarea
                        className="admin-input min-h-[140px]"
                        value={lines(form.keyFeatures)}
                        onChange={(e) =>
                          setForm({ ...form, keyFeatures: fromLines(e.target.value) })
                        }
                        placeholder="High quality imaging with 4 MP resolution"
                      />
                    </Field>
                    <Field label="Feature icons (short labels, one per line — e.g. PIR, SD, IR)">
                      <textarea
                        className="admin-input min-h-[60px]"
                        value={lines(form.featureIcons)}
                        onChange={(e) =>
                          setForm({ ...form, featureIcons: fromLines(e.target.value) })
                        }
                      />
                    </Field>
                    <Field label="Available models (comma or line separated)">
                      <textarea
                        className="admin-input min-h-[60px]"
                        value={lines(form.variants)}
                        onChange={(e) =>
                          setForm({ ...form, variants: fromLines(e.target.value) })
                        }
                      />
                    </Field>
                    <Field label="Data Sheet URL">
                      <input
                        className="admin-input"
                        value={form.dataSheetUrl}
                        onChange={(e) => setForm({ ...form, dataSheetUrl: e.target.value })}
                        placeholder="/contact or /uploads/datasheet.pdf"
                      />
                    </Field>
                  </>
                )}

                {formTab === 'specs' && (
                  <>
                    <div className="flex gap-2">
                      <input
                        className="admin-input flex-1"
                        value={newSpecGroup}
                        onChange={(e) => setNewSpecGroup(e.target.value)}
                        placeholder="New group: Camera, Lens, Network…"
                      />
                      <button
                        type="button"
                        onClick={addSpecGroup}
                        className="px-4 py-2 bg-[#006071] text-white rounded-xl font-bold text-sm"
                      >
                        Add Group
                      </button>
                    </div>
                    {Object.keys(form.specifications || {}).length === 0 ? (
                      <p className="text-gray-400 text-sm text-center py-8">
                        No specification groups. Add Camera, Lens, DORI, etc.
                      </p>
                    ) : (
                      Object.entries(form.specifications).map(([group, rows]) => (
                        <div key={group} className="border border-gray-100 rounded-xl overflow-hidden">
                          <button
                            type="button"
                            className="w-full flex justify-between items-center p-4 bg-gray-50 font-bold"
                            onClick={() =>
                              setExpandedSpec(expandedSpec === group ? null : group)
                            }
                          >
                            {group}
                            {expandedSpec === group ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                          {expandedSpec === group && (
                            <div className="p-4 space-y-2">
                              {(rows || []).map((row, idx) => (
                                <div key={idx} className="grid md:grid-cols-2 gap-2">
                                  <input
                                    className="admin-input text-sm"
                                    value={row.label}
                                    placeholder="Label"
                                    onChange={(e) =>
                                      updateSpecRow(group, idx, 'label', e.target.value)
                                    }
                                  />
                                  <div className="flex gap-2">
                                    <input
                                      className="admin-input text-sm flex-1"
                                      value={row.value}
                                      placeholder="Value"
                                      onChange={(e) =>
                                        updateSpecRow(group, idx, 'value', e.target.value)
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="text-rose-500 px-2"
                                      onClick={() =>
                                        setForm((f) => ({
                                          ...f,
                                          specifications: {
                                            ...f.specifications,
                                            [group]: f.specifications[group].filter(
                                              (_, i) => i !== idx
                                            ),
                                          },
                                        }))
                                      }
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="text-sm font-bold text-[#006071]"
                                onClick={() =>
                                  setForm((f) => ({
                                    ...f,
                                    specifications: {
                                      ...f.specifications,
                                      [group]: [...(f.specifications[group] || []), emptySpecRow()],
                                    },
                                  }))
                                }
                              >
                                + Add row
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </>
                )}

                {formTab === 'resources' && (
                  <>
                    <p className="text-sm font-bold text-gray-700">Technical Documents</p>
                    {(form.resources?.documents || []).map((doc, idx) => (
                      <div key={idx} className="grid md:grid-cols-3 gap-2">
                        <input
                          className="admin-input text-sm"
                          placeholder="Title"
                          value={doc.title}
                          onChange={(e) => {
                            const docs = [...form.resources.documents];
                            docs[idx] = { ...docs[idx], title: e.target.value };
                            setForm({ ...form, resources: { ...form.resources, documents: docs } });
                          }}
                        />
                        <input
                          className="admin-input text-sm"
                          placeholder="URL"
                          value={doc.url}
                          onChange={(e) => {
                            const docs = [...form.resources.documents];
                            docs[idx] = { ...docs[idx], url: e.target.value };
                            setForm({ ...form, resources: { ...form.resources, documents: docs } });
                          }}
                        />
                        <button
                          type="button"
                          className="text-rose-500 text-sm"
                          onClick={() =>
                            setForm({
                              ...form,
                              resources: {
                                ...form.resources,
                                documents: form.resources.documents.filter((_, i) => i !== idx),
                              },
                            })
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-sm font-bold text-[#006071]"
                      onClick={() =>
                        setForm({
                          ...form,
                          resources: {
                            ...form.resources,
                            documents: [...(form.resources?.documents || []), emptyDoc()],
                          },
                        })
                      }
                    >
                      + Add document
                    </button>

                    <p className="text-sm font-bold text-gray-700 pt-4">Firmware</p>
                    {(form.resources?.firmware || []).map((fw, idx) => (
                      <div key={idx} className="grid md:grid-cols-3 gap-2">
                        <input
                          className="admin-input text-sm"
                          placeholder="Title"
                          value={fw.title}
                          onChange={(e) => {
                            const list = [...form.resources.firmware];
                            list[idx] = { ...list[idx], title: e.target.value };
                            setForm({ ...form, resources: { ...form.resources, firmware: list } });
                          }}
                        />
                        <input
                          className="admin-input text-sm"
                          placeholder="URL"
                          value={fw.url}
                          onChange={(e) => {
                            const list = [...form.resources.firmware];
                            list[idx] = { ...list[idx], url: e.target.value };
                            setForm({ ...form, resources: { ...form.resources, firmware: list } });
                          }}
                        />
                        <input
                          className="admin-input text-sm"
                          placeholder="Date"
                          value={fw.date}
                          onChange={(e) => {
                            const list = [...form.resources.firmware];
                            list[idx] = { ...list[idx], date: e.target.value };
                            setForm({ ...form, resources: { ...form.resources, firmware: list } });
                          }}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-sm font-bold text-[#006071]"
                      onClick={() =>
                        setForm({
                          ...form,
                          resources: {
                            ...form.resources,
                            firmware: [...(form.resources?.firmware || []), emptyFirmware()],
                          },
                        })
                      }
                    >
                      + Add firmware
                    </button>
                  </>
                )}

              </div>
              </fieldset>

              <div className="p-6 border-t shrink-0 flex gap-3">
                {readOnly ? (
                  <button
                    type="button"
                    onClick={() => setModal(null)}
                    className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold"
                  >
                    Close
                  </button>
                ) : (
                  <>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-4 bg-[#006071] text-white rounded-2xl font-black flex justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                  Save Product Page
                </button>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="px-6 py-4 bg-gray-100 rounded-2xl font-bold"
                >
                  Cancel
                </button>
                  </>
                )}
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {!readOnly && deleteId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-sm text-center space-y-4">
            <p className="font-bold">Delete this product?</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 bg-gray-100 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteProduct}
                className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border: 1px solid transparent;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          outline: none;
        }
        .admin-input:focus {
          background: #fff;
          border-color: rgba(0, 96, 113, 0.3);
        }
      `}</style>
    </>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
      {label}
    </label>
    {children}
  </div>
);

const ImageUploadField = ({ label, value, onChange }) => (
  <Field label={label}>
    <div className="flex items-center gap-4 flex-wrap">
      <input
        className="admin-input flex-1 min-w-[200px]"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL or upload"
      />
      <label className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold cursor-pointer">
        Upload
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            e.target.value = '';
            try {
              const url = await uploadImageFile(file);
              onChange(url);
              toast.success('Image uploaded');
            } catch {
              toast.error('Upload failed');
            }
          }}
        />
      </label>
      {value && (
        <img src={resolveMediaUrl(value)} alt="" className="h-14 w-14 object-contain border rounded-lg" />
      )}
    </div>
  </Field>
);

export default ProductDetailEditor;
