import React, { useEffect, useMemo, useState } from 'react';
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
} from 'lucide-react';
import { resolveMediaUrl } from '../../lib/api';

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

const FamilySearchSection = ({ family, allProducts, onEditProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeApiFilters, setActiveApiFilters] = useState({});
  const [apiFilters, setApiFilters] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(true);

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

  useEffect(() => {
    axios
      .get('/api/filter-config', {
        params: {
          categorySlug: family.categorySlug,
          subCategorySlug: family.subCategorySlug,
          subSubCategorySlug: family.subSubCategorySlug,
        },
      })
      .then((res) => setApiFilters(Array.isArray(res.data) ? res.data : []))
      .catch(() => setApiFilters([]));
  }, [family]);

  const visibleApiFilters = useMemo(() => {
    const usedTags = new Set();
    familyProducts.forEach((p) => {
      (p.filterTags || []).forEach((t) => usedTags.add(t.toLowerCase()));
    });
    return apiFilters
      .map((group) => ({
        ...group,
        items: (group.items || []).filter((item) => {
          if (familyProducts.length === 0) return true;
          return usedTags.has(String(item.item).toLowerCase());
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [apiFilters, familyProducts]);

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

  return (
    <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
      <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          {family.categoryName} → {family.subName}
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-1">
          <h3 className="text-xl font-black text-gray-900">{family.subSubName}</h3>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-[#006071] bg-[#006071]/10 px-3 py-1 rounded-full">
              {filteredProducts.length} of {familyProducts.length} products
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
        <aside className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 p-6 space-y-4">
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

          {visibleApiFilters.length > 0 && (
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
                visibleApiFilters.map((group) => (
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
        </aside>

        <div className="flex-1 p-6">
          {familyProducts.length === 0 ? (
            <p className="text-center text-gray-400 py-12">
              No products in this family yet. Add them under Catalogue → Products and assign this
              product family.
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No products match your search or filters.</p>
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
                  {(p.filterTags || []).length > 0 && (
                    <p className="text-[10px] text-gray-400 mt-2 truncate">
                      {(p.filterTags || []).join(' · ')}
                    </p>
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
                      title="Edit in Products"
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
      toast.success('Default search filters loaded for all families');
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
            Each product family (3rd sub-category) has its own search list and product cards — same
            as on the website.
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
            onEditProduct={onEditProduct}
          />
        ))
      )}
    </div>
  );
};

export default SearchListManager;
