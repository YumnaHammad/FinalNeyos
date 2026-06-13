import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Search,
  RotateCcw,
  Loader2,
  ExternalLink,
  Edit2,
  Download,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  X,
  Settings2,
} from 'lucide-react';
import { resolveMediaUrl } from '../../lib/api';

const slugify = (t) =>
  String(t || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const familyKey = (f) =>
  `${f.categorySlug}|${f.subCategorySlug}|${f.subSubCategorySlug}`;

const familyPath = (f) =>
  `/category/${f.categorySlug}/${f.subCategorySlug}/${f.subSubCategorySlug}`;

const flattenFamilies = (categories) => {
  const list = [];
  for (const cat of categories) {
    for (const sub of cat.subCategories || []) {
      for (const ss of sub.subSubCategories || []) {
        list.push({
          categorySlug: cat.slug,
          categoryName: cat.name,
          subCategorySlug: sub.slug,
          subName: sub.name,
          subSubCategorySlug: ss.slug,
          subSubName: ss.name,
        });
      }
    }
  }
  return list;
};

const FamilySearchSection = ({ family, allProducts, onProductsChange, onEditProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeApiFilters, setActiveApiFilters] = useState({});
  const [apiFilters, setApiFilters] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [manageOpen, setManageOpen] = useState(false);
  const [filterSaving, setFilterSaving] = useState(false);
  const [newFilterGroupName, setNewFilterGroupName] = useState('');
  const [newFilterItemText, setNewFilterItemText] = useState({});
  const [tagSavingId, setTagSavingId] = useState(null);

  const familyProducts = useMemo(
    () =>
      allProducts.filter(
        (p) =>
          p.categorySlug === family.categorySlug &&
          p.subCategorySlug === family.subCategorySlug &&
          p.subSubCategorySlug === family.subSubCategorySlug
      ),
    [allProducts, family]
  );

  const familyScope = useCallback(
    () => ({
      categorySlug: family.categorySlug,
      subCategorySlug: family.subCategorySlug,
      subSubCategorySlug: family.subSubCategorySlug,
    }),
    [family]
  );

  const fetchFilters = useCallback(async () => {
    try {
      const res = await axios.get('/api/filter-config', { params: familyScope() });
      setApiFilters(Array.isArray(res.data) ? res.data : []);
    } catch {
      setApiFilters([]);
    }
  }, [familyScope]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const filteredProducts = useMemo(() => {
    let list = familyProducts;
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.slug?.toLowerCase().includes(q)
      );
    }
    const activeTags = Object.values(activeApiFilters).filter(Boolean);
    if (activeTags.length > 0) {
      list = list.filter((p) => {
        const tags = Array.isArray(p.filterTags) ? p.filterTags : [];
        return activeTags.every((tag) =>
          tags.some((t) => t.toLowerCase() === tag.toLowerCase())
        );
      });
    }
    return list;
  }, [familyProducts, searchTerm, activeApiFilters]);

  const reset = () => {
    setSearchTerm('');
    setActiveApiFilters({});
  };

  const toggleApiFilter = (groupSlug, itemText) => {
    setActiveApiFilters((prev) => {
      const current = prev[groupSlug];
      return {
        ...prev,
        [groupSlug]: current === itemText ? '' : itemText,
      };
    });
  };

  const addFilterGroup = async () => {
    const name = newFilterGroupName.trim();
    if (!name) return toast.error('Filter group name is required');
    setFilterSaving(true);
    try {
      await axios.post('/api/filter-config', {
        attribute: name,
        slug: slugify(name),
        ...familyScope(),
        items: [],
        sortOrder: apiFilters.length,
      });
      toast.success(`"${name}" added — applies to all products in this family`);
      setNewFilterGroupName('');
      fetchFilters();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add group');
    } finally {
      setFilterSaving(false);
    }
  };

  const addFilterItem = async (group) => {
    const text = (newFilterItemText[group._id] || '').trim();
    if (!text) return;
    setFilterSaving(true);
    try {
      await axios.put(`/api/filter-config/${group._id}`, {
        ...group,
        items: [...(group.items || []), { item: text, sortOrder: (group.items || []).length }],
        ...familyScope(),
      });
      setNewFilterItemText((prev) => ({ ...prev, [group._id]: '' }));
      toast.success('Filter option added for this family');
      fetchFilters();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add option');
    } finally {
      setFilterSaving(false);
    }
  };

  const removeFilterItem = async (group, idx) => {
    const items = group.items.filter((_, i) => i !== idx);
    setFilterSaving(true);
    try {
      await axios.put(`/api/filter-config/${group._id}`, {
        ...group,
        items,
        ...familyScope(),
      });
      toast.success('Option removed from this family');
      fetchFilters();
      onProductsChange?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove option');
    } finally {
      setFilterSaving(false);
    }
  };

  const deleteFilterGroup = async (groupId) => {
    if (!window.confirm('Delete this filter group for the whole family?')) return;
    setFilterSaving(true);
    try {
      await axios.delete(`/api/filter-config/${groupId}`);
      toast.success('Filter group deleted for this family');
      fetchFilters();
      onProductsChange?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setFilterSaving(false);
    }
  };

  const toggleProductTag = async (product, tag) => {
    const tags = Array.isArray(product.filterTags) ? [...product.filterTags] : [];
    const has = tags.some((t) => t.toLowerCase() === tag.toLowerCase());
    const nextTags = has
      ? tags.filter((t) => t.toLowerCase() !== tag.toLowerCase())
      : [...tags, tag];
    setTagSavingId(product._id);
    try {
      await axios.put(`/api/products/${product._id}`, { ...product, filterTags: nextTags });
      onProductsChange?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product tags');
    } finally {
      setTagSavingId(null);
    }
  };

  return (
    <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
      <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          {family.categoryName} → {family.subName}
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-1">
          <h3 className="text-xl font-black text-gray-900">{family.subSubName}</h3>
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <span className="font-bold text-[#006071] bg-[#006071]/10 px-3 py-1 rounded-full">
              {filteredProducts.length} of {familyProducts.length} products
            </span>
            <span className="font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {apiFilters.length} filter group{apiFilters.length === 1 ? '' : 's'} (family-wide)
            </span>
            <a
              href={`http://localhost:5173${familyPath(family)}`}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-[#006071] flex items-center gap-1 font-bold"
            >
              <ExternalLink size={12} /> Live list
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-gray-900">Search List</h4>
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1.5 text-xs font-bold text-[#006071] hover:underline"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for Product Models"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#006071]/40"
            />
          </div>

          {apiFilters.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                className="w-full flex items-center justify-between text-xs font-black text-gray-400 uppercase tracking-widest mb-2"
              >
                Filters
                {filtersOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {filtersOpen &&
                apiFilters.map((group) => (
                  <div key={group._id || group.slug} className="mb-4">
                    <p className="text-xs font-bold text-gray-600 mb-2">{group.attribute}</p>
                    <ul className="space-y-1.5">
                      {(group.items || []).map((item) => {
                        const slug = group.slug || group.attribute;
                        const checked = activeApiFilters[slug] === item.item;
                        return (
                          <li key={item.item}>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleApiFilter(slug, item.item)}
                                className="rounded border-gray-300 text-[#006071]"
                              />
                              <span>{item.item}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
            </div>
          )}

          <div className="border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setManageOpen((v) => !v)}
              className="w-full flex items-center justify-between text-xs font-black text-[#006071] uppercase tracking-widest"
            >
              <span className="flex items-center gap-2">
                <Settings2 size={14} />
                Edit family filters
              </span>
              {manageOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <p className="text-[10px] text-gray-400 mt-1">
              Changes apply to every product in {family.subSubName}.
            </p>

            {manageOpen && (
              <div className="mt-4 space-y-4">
                <div className="flex gap-2">
                  <input
                    value={newFilterGroupName}
                    onChange={(e) => setNewFilterGroupName(e.target.value)}
                    placeholder="New group (e.g. Resolution)"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none"
                    onKeyDown={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addFilterGroup())
                    }
                  />
                  <button
                    type="button"
                    onClick={addFilterGroup}
                    disabled={filterSaving}
                    className="px-3 py-2 bg-[#006071] text-white rounded-xl disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {apiFilters.map((group) => (
                  <div
                    key={`edit-${group._id}`}
                    className="border border-gray-100 rounded-xl p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-gray-500 uppercase">{group.attribute}</p>
                      <button
                        type="button"
                        onClick={() => deleteFilterGroup(group._id)}
                        disabled={filterSaving}
                        className="text-rose-500 p-1"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(group.items || []).map((item, idx) => (
                        <span
                          key={item.item}
                          className="inline-flex items-center gap-1 bg-gray-100 text-xs px-2 py-0.5 rounded-full"
                        >
                          {item.item}
                          <button
                            type="button"
                            onClick={() => removeFilterItem(group, idx)}
                            disabled={filterSaving}
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <input
                        value={newFilterItemText[group._id] || ''}
                        onChange={(e) =>
                          setNewFilterItemText((prev) => ({
                            ...prev,
                            [group._id]: e.target.value,
                          }))
                        }
                        placeholder="Add option"
                        className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-xs outline-none"
                        onKeyDown={(e) =>
                          e.key === 'Enter' && (e.preventDefault(), addFilterItem(group))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => addFilterItem(group)}
                        disabled={filterSaving}
                        className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-bold"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        <div className="flex-1 p-6">
          {familyProducts.length === 0 ? (
            <p className="text-center text-gray-400 py-12">
              No products in this family yet. Add them under Catalogue → Products.
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-400 py-12">
              No products match your search or filters.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <article
                  key={p._id}
                  className="border border-gray-100 rounded-2xl p-4 hover:border-[#006071]/30 hover:shadow-md transition-all"
                >
                  <div className="h-28 flex items-center justify-center bg-gray-50 rounded-xl mb-3">
                    {p.image ? (
                      <img
                        src={resolveMediaUrl(p.image)}
                        alt=""
                        className="max-h-24 max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-300">No image</span>
                    )}
                  </div>
                  <p className="font-black text-gray-900">{p.model || p.slug}</p>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{p.title}</p>

                  {apiFilters.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-gray-50 pt-3">
                      <p className="text-[10px] font-black text-gray-400 uppercase">
                        Match filters
                      </p>
                      {apiFilters.map((group) => (
                        <div key={`${p._id}-${group._id}`}>
                          <p className="text-[10px] text-gray-400 mb-1">{group.attribute}</p>
                          <div className="flex flex-wrap gap-1">
                            {(group.items || []).map((item) => {
                              const tag = item.item;
                              const active = (p.filterTags || []).some(
                                (t) => t.toLowerCase() === tag.toLowerCase()
                              );
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  disabled={tagSavingId === p._id}
                                  onClick={() => toggleProductTag(p, tag)}
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold border transition-colors ${
                                    active
                                      ? 'bg-[#006071] text-white border-[#006071]'
                                      : 'bg-white text-gray-500 border-gray-200 hover:border-[#006071]/40'
                                  }`}
                                >
                                  {tag}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <a
                      href={`http://localhost:5173/products/${p.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 text-xs font-bold bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Preview
                    </a>
                    <button
                      type="button"
                      onClick={() => onEditProduct?.(p)}
                      className="p-2 rounded-lg bg-[#006071]/10 text-[#006071] hover:bg-[#006071]/20"
                      title="Edit product page"
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const SearchListManager = ({ onEditProduct }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSub, setFilterSub] = useState('');
  const [filterSubSub, setFilterSubSub] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [cRes, pRes] = await Promise.all([
        axios.get('/api/categories'),
        axios.get('/api/products'),
      ]);
      setCategories(Array.isArray(cRes.data) ? cRes.data : []);
      setProducts(Array.isArray(pRes.data) ? pRes.data : []);
    } catch {
      toast.error('Failed to load search lists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const allFamilies = useMemo(() => flattenFamilies(categories), [categories]);

  const filterCategoryObj = categories.find((c) => c.slug === filterCategory);
  const filterSubList = filterCategoryObj?.subCategories || [];
  const filterSubObj = filterSubList.find((s) => s.slug === filterSub);
  const filterSubSubList = filterSubObj?.subSubCategories || [];

  const visibleFamilies = useMemo(() => {
    let list = allFamilies;
    if (filterCategory) list = list.filter((f) => f.categorySlug === filterCategory);
    if (filterSub) list = list.filter((f) => f.subCategorySlug === filterSub);
    if (filterSubSub) list = list.filter((f) => f.subSubCategorySlug === filterSubSub);
    return list;
  }, [allFamilies, filterCategory, filterSub, filterSubSub]);

  const seedFilters = async () => {
    setSeeding(true);
    try {
      await axios.post('/api/filter-config/seed');
      toast.success('Default filters loaded for all families');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Seed failed');
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 flex justify-center">
        <Loader2 className="animate-spin text-[#006071]" size={36} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-gray-500">
            Each <strong>3rd sub-category</strong> has one fixed filter set shared by all its
            products. Edit filters here — changes apply to the whole family on the website.
          </p>
          <button
            type="button"
            onClick={seedFilters}
            disabled={seeding}
            className="self-start px-4 py-2 rounded-xl border border-[#006071]/30 text-[#006071] font-bold text-sm flex items-center gap-2"
          >
            {seeding ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            Load Default Filters
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setFilterSub('');
              setFilterSubSub('');
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
            value={filterSub}
            onChange={(e) => {
              setFilterSub(e.target.value);
              setFilterSubSub('');
            }}
            disabled={!filterCategory}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none disabled:opacity-50"
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
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none disabled:opacity-50"
          >
            <option value="">All product families</option>
            {filterSubSubList.map((ss) => (
              <option key={ss.slug} value={ss.slug}>
                {ss.name}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-gray-400">
          {visibleFamilies.length} search list{visibleFamilies.length === 1 ? '' : 's'} shown
        </p>
      </div>

      {visibleFamilies.length === 0 ? (
        <p className="text-center text-gray-400 py-16">
          No product families found. Add sub-sub categories under Catalogue → Categories first.
        </p>
      ) : (
        visibleFamilies.map((family) => (
          <FamilySearchSection
            key={familyKey(family)}
            family={family}
            allProducts={products}
            onProductsChange={load}
            onEditProduct={onEditProduct}
          />
        ))
      )}
    </div>
  );
};

export default SearchListManager;
