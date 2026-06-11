import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Loader2,
  Download,
  ChevronDown,
  ChevronUp,
  Filter,
  FileText,
} from 'lucide-react';

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const emptyFilterGroup = () => ({
  attribute: '',
  slug: '',
  sortOrder: 0,
  items: [],
  categorySlug: '',
  subCategorySlug: '',
  subSubCategorySlug: '',
});

const familyLabel = (categorySlug, subCategorySlug, subSubCategorySlug, categories) => {
  const cat = categories.find((c) => c.slug === categorySlug);
  const sub = cat?.subCategories?.find((s) => s.slug === subCategorySlug);
  const ss = sub?.subSubCategories?.find((x) => x.slug === subSubCategorySlug);
  if (!subSubCategorySlug) return 'Global (all families)';
  return [cat?.name, sub?.name, ss?.name || subSubCategorySlug].filter(Boolean).join(' → ');
};

const emptySpecRow = () => ({ label: '', value: '' });

const SpecificationsManager = () => {
  const [activeTab, setActiveTab] = useState('filters');

  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [scopeCategory, setScopeCategory] = useState('');
  const [scopeSub, setScopeSub] = useState('');
  const [scopeSubSub, setScopeSubSub] = useState('');
  const [filterModal, setFilterModal] = useState(null);
  const [filterForm, setFilterForm] = useState(emptyFilterGroup());
  const [filterSaving, setFilterSaving] = useState(false);
  const [filterSeeding, setFilterSeeding] = useState(false);
  const [filterDelete, setFilterDelete] = useState(null);
  const [newFilterItem, setNewFilterItem] = useState('');

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [specGroups, setSpecGroups] = useState({});
  const [filterTags, setFilterTags] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newTag, setNewTag] = useState('');
  const [specSaving, setSpecSaving] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);

  const fetchFilters = async () => {
    try {
      setFiltersLoading(true);
      const params = {};
      if (scopeCategory) params.categorySlug = scopeCategory;
      if (scopeSub) params.subCategorySlug = scopeSub;
      if (scopeSubSub) params.subSubCategorySlug = scopeSubSub;
      const res = await axios.get('/api/filter-config', { params });
      setFilters(Array.isArray(res.data) ? res.data : []);
    } catch {
      setFilters([]);
      toast.error('Failed to load filters');
    } finally {
      setFiltersLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch {
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      const list = Array.isArray(res.data) ? res.data : [];
      setProducts(list);
      if (!selectedProductId && list.length > 0) {
        setSelectedProductId(list[0]._id);
        loadProductSpecs(list[0]);
      }
    } catch {
      setProducts([]);
    }
  };

  const loadProductSpecs = (product) => {
    if (!product) {
      setSpecGroups({});
      setFilterTags([]);
      return;
    }
    setSpecGroups(
      product.specifications && typeof product.specifications === 'object'
        ? { ...product.specifications }
        : {}
    );
    setFilterTags(Array.isArray(product.filterTags) ? [...product.filterTags] : []);
    const keys = Object.keys(product.specifications || {});
    setExpandedGroup(keys[0] || null);
  };

  const scopeCategoryObj = categories.find((c) => c.slug === scopeCategory);
  const scopeSubList = scopeCategoryObj?.subCategories || [];
  const scopeSubObj = scopeSubList.find((s) => s.slug === scopeSub);
  const scopeSubSubList = scopeSubObj?.subSubCategories || [];

  const modalCategoryObj = categories.find((c) => c.slug === filterForm.categorySlug);
  const modalSubList = modalCategoryObj?.subCategories || [];
  const modalSubObj = modalSubList.find((s) => s.slug === filterForm.subCategorySlug);
  const modalSubSubList = modalSubObj?.subSubCategories || [];

  const filterGroupsByFamily = useMemo(() => {
    const map = new Map();
    for (const group of filters) {
      const key = `${group.categorySlug || ''}|${group.subCategorySlug || ''}|${group.subSubCategorySlug || ''}`;
      if (!map.has(key)) {
        map.set(key, {
          key,
          label: familyLabel(
            group.categorySlug,
            group.subCategorySlug,
            group.subSubCategorySlug,
            categories
          ),
          groups: [],
        });
      }
      map.get(key).groups.push(group);
    }
    return Array.from(map.values());
  }, [filters, categories]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [scopeCategory, scopeSub, scopeSubSub]);

  useEffect(() => {
    const product = products.find((p) => p._id === selectedProductId);
    loadProductSpecs(product);
  }, [selectedProductId, products]);

  const openFilterModal = (mode, item = null) => {
    setFilterModal(mode);
    setFilterForm(
      item
        ? { ...item, items: [...(item.items || [])] }
        : emptyFilterGroup()
    );
    setNewFilterItem('');
  };

  const addFilterItem = () => {
    const text = newFilterItem.trim();
    if (!text) return;
    setFilterForm((prev) => ({
      ...prev,
      items: [...(prev.items || []), { item: text, sortOrder: (prev.items || []).length }],
    }));
    setNewFilterItem('');
  };

  const removeFilterItem = (idx) => {
    setFilterForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
  };

  const saveFilterGroup = async (e) => {
    e.preventDefault();
    if (!filterForm.attribute.trim()) {
      toast.error('Attribute name is required');
      return;
    }
    if (!filterForm.subSubCategorySlug) {
      toast.error('Product family (3rd sub-category) is required for filter groups');
      return;
    }
    setFilterSaving(true);
    const loadingToast = toast.loading('Saving filter group...');
    try {
      const payload = {
        ...filterForm,
        slug: filterForm.slug || slugify(filterForm.attribute),
      };
      if (filterModal === 'edit' && filterForm._id) {
        await axios.put(`/api/filter-config/${filterForm._id}`, payload);
      } else {
        await axios.post('/api/filter-config', payload);
      }
      toast.success('Filter group saved', { id: loadingToast });
      setFilterModal(null);
      fetchFilters();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed', { id: loadingToast });
    } finally {
      setFilterSaving(false);
    }
  };

  const deleteFilterGroup = async () => {
    if (!filterDelete) return;
    const loadingToast = toast.loading('Deleting...');
    try {
      await axios.delete(`/api/filter-config/${filterDelete}`);
      toast.success('Deleted', { id: loadingToast });
      setFilterDelete(null);
      fetchFilters();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed', { id: loadingToast });
    }
  };

  const seedFilters = async () => {
    setFilterSeeding(true);
    try {
      await axios.post('/api/filter-config/seed');
      toast.success('Default filters loaded');
      fetchFilters();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Seed failed — restart backend');
    } finally {
      setFilterSeeding(false);
    }
  };

  const addSpecGroup = () => {
    const name = newGroupName.trim();
    if (!name) return;
    if (specGroups[name]) {
      toast.error('Group already exists');
      return;
    }
    setSpecGroups((prev) => ({ ...prev, [name]: [] }));
    setExpandedGroup(name);
    setNewGroupName('');
  };

  const removeSpecGroup = (groupName) => {
    setSpecGroups((prev) => {
      const next = { ...prev };
      delete next[groupName];
      return next;
    });
  };

  const addSpecRow = (groupName) => {
    setSpecGroups((prev) => ({
      ...prev,
      [groupName]: [...(prev[groupName] || []), emptySpecRow()],
    }));
  };

  const updateSpecRow = (groupName, idx, field, value) => {
    setSpecGroups((prev) => {
      const rows = [...(prev[groupName] || [])];
      rows[idx] = { ...rows[idx], [field]: value };
      return { ...prev, [groupName]: rows };
    });
  };

  const removeSpecRow = (groupName, idx) => {
    setSpecGroups((prev) => ({
      ...prev,
      [groupName]: prev[groupName].filter((_, i) => i !== idx),
    }));
  };

  const addFilterTag = () => {
    const tag = newTag.trim();
    if (!tag) return;
    if (filterTags.includes(tag)) return;
    setFilterTags((prev) => [...prev, tag]);
    setNewTag('');
  };

  const saveProductSpecs = async () => {
    if (!selectedProductId) return;
    setSpecSaving(true);
    const loadingToast = toast.loading('Saving specifications...');
    try {
      await axios.put(`/api/products/${selectedProductId}/specifications`, {
        specifications: specGroups,
        filterTags,
      });
      toast.success('Specifications saved', { id: loadingToast });
      const res = await axios.get('/api/products');
      const list = Array.isArray(res.data) ? res.data : [];
      setProducts(list);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed', { id: loadingToast });
    } finally {
      setSpecSaving(false);
    }
  };

  const selectedProduct = products.find((p) => p._id === selectedProductId);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('filters')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'filters'
              ? 'bg-[#006071] text-white shadow-lg'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-[#006071]/30'
          }`}
        >
          <Filter size={16} />
          Search Filters
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('specs')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'specs'
              ? 'bg-[#006071] text-white shadow-lg'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-[#006071]/30'
          }`}
        >
          <FileText size={16} />
          Product Specifications
        </button>
      </div>

      {activeTab === 'filters' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden"
        >
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-gray-900">Search List Filters</h3>
              <p className="text-gray-500 text-sm mt-1">
                Each filter group belongs to one product family (3rd sub-category). Dome and Bullet
                cameras have separate filter sets on the website.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={seedFilters}
                disabled={filterSeeding}
                className="px-4 py-2 rounded-xl border border-[#006071]/30 text-[#006071] font-bold text-sm flex items-center gap-2"
              >
                {filterSeeding ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                Load Defaults
              </button>
              <button
                type="button"
                onClick={() => openFilterModal('add')}
                className="px-4 py-2 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2"
              >
                <Plus size={16} />
                Add Filter Group
              </button>
            </div>
          </div>

          <div className="px-8 pb-6 grid md:grid-cols-3 gap-3">
            <select
              value={scopeCategory}
              onChange={(e) => {
                setScopeCategory(e.target.value);
                setScopeSub('');
                setScopeSubSub('');
              }}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={scopeSub}
              onChange={(e) => {
                setScopeSub(e.target.value);
                setScopeSubSub('');
              }}
              disabled={!scopeCategory}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none disabled:opacity-50"
            >
              <option value="">All sub-categories</option>
              {scopeSubList.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={scopeSubSub}
              onChange={(e) => setScopeSubSub(e.target.value)}
              disabled={!scopeSub}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none disabled:opacity-50"
            >
              <option value="">All product families</option>
              {scopeSubSubList.map((ss) => (
                <option key={ss.slug} value={ss.slug}>
                  {ss.name}
                </option>
              ))}
            </select>
          </div>

          {filtersLoading ? (
            <div className="p-16 flex justify-center">
              <Loader2 className="animate-spin text-[#006071]" size={32} />
            </div>
          ) : filters.length === 0 ? (
            <p className="p-12 text-center text-gray-400">
              No filters for this scope. Click &quot;Load Defaults&quot; to seed dome &amp; bullet
              families.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {filterGroupsByFamily.map((section) => (
                <section key={section.key}>
                  <div className="px-8 py-4 bg-gray-50 border-y border-gray-100">
                    <h4 className="font-black text-gray-900">{section.label}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {section.groups.length} filter group{section.groups.length === 1 ? '' : 's'}
                    </p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {section.groups.map((group) => (
                      <div
                        key={group._id}
                        className="p-6 flex flex-col md:flex-row md:items-center gap-4"
                      >
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{group.attribute}</h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {(group.items || []).length} options · slug: {group.slug}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {(group.items || []).slice(0, 8).map((item, i) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"
                              >
                                {item.item}
                              </span>
                            ))}
                            {(group.items || []).length > 8 && (
                              <span className="text-xs text-gray-400">
                                +{group.items.length - 8} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openFilterModal('edit', group)}
                            className="p-2.5 rounded-xl bg-gray-100 hover:bg-[#006071]/10 text-gray-600"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setFilterDelete(group._id)}
                            className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'specs' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden"
        >
          <div className="p-8 border-b border-gray-50">
            <h3 className="text-xl font-black text-gray-900">Product Specifications</h3>
            <p className="text-gray-500 text-sm mt-1">
              Edit spec tables shown on product detail pages (Camera, Lens, Network, etc.).
            </p>
            <div className="mt-6 max-w-xl">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Select Product
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="mt-2 w-full p-4 bg-gray-50 rounded-xl border border-transparent focus:border-[#006071]/30 outline-none font-medium"
              >
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.model || p.title} — {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedProduct && (
            <div className="p-8 space-y-8">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Filter Tags (match search filters)
                </label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {filterTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 bg-[#006071]/10 text-[#006071] px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => setFilterTags((t) => t.filter((x) => x !== tag))}
                        className="hover:text-rose-500"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g. 4MP, Dome"
                    className="flex-1 p-3 bg-gray-50 rounded-xl outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFilterTag())}
                  />
                  <button
                    type="button"
                    onClick={addFilterTag}
                    className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-sm"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="New group name (e.g. Camera)"
                  className="flex-1 p-3 bg-gray-50 rounded-xl outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecGroup())}
                />
                <button
                  type="button"
                  onClick={addSpecGroup}
                  className="px-4 py-2 bg-[#006071] text-white rounded-xl font-bold text-sm flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Group
                </button>
              </div>

              {Object.keys(specGroups).length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No specification groups. Add Camera, Lens, Network, etc.
                </p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(specGroups).map(([groupName, rows]) => (
                    <div key={groupName} className="border border-gray-100 rounded-2xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedGroup(expandedGroup === groupName ? null : groupName)
                        }
                        className="w-full flex items-center justify-between p-4 bg-gray-50 font-bold text-gray-800"
                      >
                        <span>{groupName}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400 font-normal">
                            {(rows || []).length} rows
                          </span>
                          {expandedGroup === groupName ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </div>
                      </button>
                      {expandedGroup === groupName && (
                        <div className="p-4 space-y-3">
                          {(rows || []).map((row, idx) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={row.label}
                                onChange={(e) =>
                                  updateSpecRow(groupName, idx, 'label', e.target.value)
                                }
                                placeholder="Label"
                                className="p-3 bg-gray-50 rounded-xl outline-none text-sm"
                              />
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={row.value}
                                  onChange={(e) =>
                                    updateSpecRow(groupName, idx, 'value', e.target.value)
                                  }
                                  placeholder="Value"
                                  className="flex-1 p-3 bg-gray-50 rounded-xl outline-none text-sm"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeSpecRow(groupName, idx)}
                                  className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="flex gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => addSpecRow(groupName)}
                              className="text-sm font-bold text-[#006071] flex items-center gap-1"
                            >
                              <Plus size={14} />
                              Add row
                            </button>
                            <button
                              type="button"
                              onClick={() => removeSpecGroup(groupName)}
                              className="text-sm font-bold text-rose-500 ml-auto"
                            >
                              Remove group
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={saveProductSpecs}
                disabled={specSaving}
                className="w-full md:w-auto px-8 py-4 bg-[#006071] text-white rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {specSaving ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Save size={20} />
                )}
                Save Specifications
              </button>
            </div>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {filterModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={() => setFilterModal(null)}
            />
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={saveFilterGroup}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-8 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">
                  {filterModal === 'edit' ? 'Edit Filter Group' : 'New Filter Group'}
                </h3>
                <button type="button" onClick={() => setFilterModal(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="grid gap-3">
                <select
                  value={filterForm.categorySlug}
                  onChange={(e) =>
                    setFilterForm({
                      ...filterForm,
                      categorySlug: e.target.value,
                      subCategorySlug: '',
                      subSubCategorySlug: '',
                    })
                  }
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none text-sm"
                >
                  <option value="">Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  value={filterForm.subCategorySlug}
                  onChange={(e) =>
                    setFilterForm({
                      ...filterForm,
                      subCategorySlug: e.target.value,
                      subSubCategorySlug: '',
                    })
                  }
                  disabled={!filterForm.categorySlug}
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none text-sm disabled:opacity-50"
                >
                  <option value="">Sub-category</option>
                  {modalSubList.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <select
                  required
                  value={filterForm.subSubCategorySlug}
                  onChange={(e) =>
                    setFilterForm({ ...filterForm, subSubCategorySlug: e.target.value })
                  }
                  disabled={!filterForm.subCategorySlug}
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none text-sm disabled:opacity-50"
                >
                  <option value="">Product family (3rd sub) *</option>
                  {modalSubSubList.map((ss) => (
                    <option key={ss.slug} value={ss.slug}>
                      {ss.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                required
                value={filterForm.attribute}
                onChange={(e) =>
                  setFilterForm({
                    ...filterForm,
                    attribute: e.target.value,
                    slug: slugify(e.target.value),
                  })
                }
                placeholder="Attribute name (e.g. Resolution)"
                className="w-full p-4 bg-gray-50 rounded-xl outline-none"
              />
              <input
                type="number"
                value={filterForm.sortOrder}
                onChange={(e) =>
                  setFilterForm({ ...filterForm, sortOrder: Number(e.target.value) })
                }
                placeholder="Sort order"
                className="w-full p-4 bg-gray-50 rounded-xl outline-none"
              />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Filter options</p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newFilterItem}
                    onChange={(e) => setNewFilterItem(e.target.value)}
                    placeholder="Add option..."
                    className="flex-1 p-3 bg-gray-50 rounded-xl outline-none text-sm"
                    onKeyDown={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addFilterItem())
                    }
                  />
                  <button
                    type="button"
                    onClick={addFilterItem}
                    className="px-3 bg-gray-100 rounded-xl"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {(filterForm.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg text-sm"
                    >
                      <span>{item.item}</span>
                      <button type="button" onClick={() => removeFilterItem(idx)}>
                        <X size={14} className="text-rose-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={filterSaving}
                className="w-full py-4 bg-[#006071] text-white rounded-2xl font-black flex justify-center gap-2"
              >
                {filterSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                Save
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {filterDelete && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-gray-900/50"
              onClick={() => setFilterDelete(null)}
            />
            <div className="relative bg-white rounded-2xl p-8 max-w-sm text-center space-y-4">
              <p className="font-bold">Delete this filter group?</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFilterDelete(null)}
                  className="flex-1 py-3 bg-gray-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={deleteFilterGroup}
                  className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpecificationsManager;
