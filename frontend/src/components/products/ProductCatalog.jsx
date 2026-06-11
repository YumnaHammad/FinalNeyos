import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, RotateCcw } from 'lucide-react';
import API, { resolveMediaUrl } from '../../api';
import miniCAmeraGroup from '../../assets/images/nexyos/miniCAmeraGroup.png';
import styles from '../../styles/ProductCatalog.module.css';

const DEFAULT_PER_PAGE = 12;

const ProductCatalog = ({
  categorySlug,
  categoryName,
  categoryData = null,
  subCategorySlug: fixedSubCategorySlug = '',
  subSubCategorySlug: fixedSubSubCategorySlug = '',
  hideHierarchyFilters = false,
  excludeSlug = null,
  title = 'Product Categories',
  showTitle = true,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(categoryData);
  const [apiFilters, setApiFilters] = useState([]);
  const [activeApiFilters, setActiveApiFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [compareItems, setCompareItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_PER_PAGE);
  const [openFilters, setOpenFilters] = useState({ sub: true, subSub: true });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const selectedSub = fixedSubCategorySlug || searchParams.get('sub') || '';
  const selectedSubSub = fixedSubSubCategorySlug || searchParams.get('subSub') || '';

  useEffect(() => {
    const params = {};
    const cat = categorySlug || searchParams.get('category') || '';
    const sub = fixedSubCategorySlug || searchParams.get('sub') || '';
    const subSub = fixedSubSubCategorySlug || searchParams.get('subSub') || '';
    if (cat) params.categorySlug = cat;
    if (sub) params.subCategorySlug = sub;
    if (subSub) params.subSubCategorySlug = subSub;

    API.get('/filter-config', { params })
      .then((res) => setApiFilters(Array.isArray(res.data) ? res.data : []))
      .catch(() => setApiFilters([]));
  }, [categorySlug, fixedSubCategorySlug, fixedSubSubCategorySlug, searchParams]);

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
      return;
    }
    if (!categorySlug) {
      setCategory(null);
      return;
    }
    API.get(`/categories/${encodeURIComponent(categorySlug)}`)
      .then((res) => setCategory(res.data))
      .catch(() => setCategory(null));
  }, [categorySlug, categoryData]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        const slug = categorySlug || searchParams.get('category') || '';
        if (slug) params.categorySlug = slug;
        const sub = selectedSub || searchParams.get('sub') || '';
        const subSub = selectedSubSub || searchParams.get('subSub') || '';
        if (sub) params.subCategorySlug = sub;
        if (subSub) params.subSubCategorySlug = subSub;

        const { data } = await API.get('/products', { params });
        let list = Array.isArray(data) ? data : [];
        if (excludeSlug) {
          list = list.filter((p) => p.slug !== excludeSlug);
        }
        setProducts(list);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, selectedSub, selectedSubSub, excludeSlug, searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSub, selectedSubSub, activeApiFilters, itemsPerPage]);

  const subCategories = category?.subCategories || [];

  const subSubOptions = useMemo(() => {
    if (!selectedSub) {
      return subCategories.flatMap((sub) =>
        (sub.subSubCategories || []).map((ss) => ({
          ...ss,
          parentSlug: sub.slug,
          parentName: sub.name,
        }))
      );
    }
    const sub = subCategories.find((s) => s.slug === selectedSub);
    return (sub?.subSubCategories || []).map((ss) => ({
      ...ss,
      parentSlug: sub.slug,
      parentName: sub.name,
    }));
  }, [subCategories, selectedSub]);

  const filteredProducts = useMemo(() => {
    let list = products;
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
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
  }, [products, searchTerm, activeApiFilters]);

  const visibleApiFilters = useMemo(() => {
    const usedTags = new Set();
    products.forEach((p) => {
      (p.filterTags || []).forEach((t) => usedTags.add(t.toLowerCase()));
    });
    return apiFilters
      .map((group) => ({
        ...group,
        items: (group.items || []).filter((item) => {
          if (products.length === 0) return true;
          return usedTags.has(String(item.item).toLowerCase());
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [apiFilters, products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const displayed = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageNumbers = () => {
    const pages = [];
    const max = 5;
    if (totalPages <= max) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  const updateFilter = (key, value) => {
    if (hideHierarchyFilters) return;
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === 'sub') next.delete('subSub');
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setActiveApiFilters({});
    if (!hideHierarchyFilters) {
      setSearchParams({}, { replace: true });
    }
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

  const toggleCompare = (id) => {
    setCompareItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const goToProduct = (product) => {
    navigate(`/products/${product.slug}`, {
      state: {
        parentCategory: categoryName || category?.name,
        categorySlug: categorySlug || product.categorySlug,
      },
    });
  };

  const toggleFilterSection = (key) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className={styles.catalog}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.mobileFilterBtn}
          onClick={() => setMobileFiltersOpen((v) => !v)}
        >
          {mobileFiltersOpen ? 'Close filters' : 'Search & filters'}
        </button>

        <aside
          className={`${styles.sidebar} ${mobileFiltersOpen ? styles.sidebarOpen : ''}`}
        >
          <div className={styles.sidebarHead}>
            <h2 className={styles.sidebarTitle}>Search List</h2>
            <button type="button" className={styles.resetBtn} onClick={resetFilters}>
              <RotateCcw size={14} />
              Reset
            </button>
          </div>

          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for Product Models"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {!hideHierarchyFilters && subCategories.length > 0 && (
            <div className={styles.filterGroup}>
              <button
                type="button"
                className={styles.filterHead}
                onClick={() => toggleFilterSection('sub')}
              >
                <span>Sub-Categories</span>
                <span>{openFilters.sub ? '−' : '+'}</span>
              </button>
              {openFilters.sub && (
                <ul className={styles.filterList}>
                  {subCategories.map((sub) => (
                    <li key={sub.slug}>
                      <label className={styles.filterItem}>
                        <input
                          type="checkbox"
                          checked={selectedSub === sub.slug}
                          onChange={() =>
                            updateFilter('sub', selectedSub === sub.slug ? '' : sub.slug)
                          }
                        />
                        <span>{sub.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!hideHierarchyFilters && subSubOptions.length > 0 && (
            <div className={styles.filterGroup}>
              <button
                type="button"
                className={styles.filterHead}
                onClick={() => toggleFilterSection('subSub')}
              >
                <span>Series / Models</span>
                <span>{openFilters.subSub ? '−' : '+'}</span>
              </button>
              {openFilters.subSub && (
                <ul className={styles.filterList}>
                  {subSubOptions.map((ss) => (
                    <li key={ss.slug}>
                      <label className={styles.filterItem}>
                        <input
                          type="checkbox"
                          checked={selectedSubSub === ss.slug}
                          onChange={() =>
                            updateFilter(
                              'subSub',
                              selectedSubSub === ss.slug ? '' : ss.slug
                            )
                          }
                        />
                        <span>{ss.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {visibleApiFilters.map((group) => (
            <div key={group._id || group.slug} className={styles.filterGroup}>
              <button
                type="button"
                className={styles.filterHead}
                onClick={() =>
                  toggleFilterSection(group.slug || group.attribute)
                }
              >
                <span>{group.attribute}</span>
                <span>
                  {openFilters[group.slug || group.attribute] ? '−' : '+'}
                </span>
              </button>
              {(openFilters[group.slug || group.attribute] ?? true) && (
                <ul className={styles.filterList}>
                  {(group.items || []).map((item, idx) => (
                    <li key={item._id || idx}>
                      <label className={styles.filterItem}>
                        <input
                          type="checkbox"
                          checked={
                            activeApiFilters[group.slug || group.attribute] ===
                            item.item
                          }
                          onChange={() =>
                            toggleApiFilter(group.slug || group.attribute, item.item)
                          }
                        />
                        <span>{item.item}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>

        <div className={styles.main}>
          {showTitle && (
            <h2 className={styles.pageTitle}>{categoryName || category?.name || title}</h2>
          )}

          <p className={styles.matchCount}>
            <strong>{filteredProducts.length}</strong> Products Matches
          </p>

          {loading ? (
            <div className={styles.stateBox}>Loading products…</div>
          ) : displayed.length === 0 ? (
            <div className={styles.stateBox}>
              No products found. Add products in Admin → Catalogue → Products.
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {displayed.map((product) => (
                  <article key={product._id || product.slug} className={styles.card}>
                    <div className={styles.cardBadges}>
                      {product.isNew && <span className={styles.badgeNew}>NEW</span>}
                      {product.isHot && <span className={styles.badgeHot}>HOT</span>}
                    </div>
                    <Link
                      to={`/products/${product.slug}`}
                      className={styles.cardImgLink}
                      onClick={(e) => {
                        e.preventDefault();
                        goToProduct(product);
                      }}
                    >
                      <img
                        src={
                          product.image ? resolveMediaUrl(product.image) : miniCAmeraGroup
                        }
                        alt={product.title}
                        className={styles.cardImg}
                      />
                    </Link>
                    <div className={styles.cardBody}>
                      <Link
                        to={`/products/${product.slug}`}
                        className={styles.cardModel}
                        onClick={(e) => {
                          e.preventDefault();
                          goToProduct(product);
                        }}
                      >
                        {product.model || product.title}
                      </Link>
                      <p className={styles.cardDesc}>{product.title}</p>
                      {product.description && (
                        <p className={styles.cardSub}>{product.description}</p>
                      )}
                      <label className={styles.compare}>
                        <input
                          type="checkbox"
                          checked={compareItems.includes(product._id || product.slug)}
                          onChange={() => toggleCompare(product._id || product.slug)}
                        />
                        <span>Compare</span>
                      </label>
                    </div>
                  </article>
                ))}
              </div>

              {(totalPages > 1 || filteredProducts.length > DEFAULT_PER_PAGE) && (
                <div className={styles.pagination}>
                  <button
                    type="button"
                    className={styles.pageArrow}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  {pageNumbers().map((n, i) =>
                    n === '...' ? (
                      <span key={`e-${i}`} className={styles.pageEllipsis}>
                        …
                      </span>
                    ) : (
                      <button
                        key={n}
                        type="button"
                        className={`${styles.pageNum} ${
                          currentPage === n ? styles.pageNumActive : ''
                        }`}
                        onClick={() => setCurrentPage(n)}
                      >
                        {n}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    className={styles.pageArrow}
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    aria-label="Next page"
                  >
                    ›
                  </button>
                  <select
                    className={styles.perPage}
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={12}>12 / page</option>
                    <option value={24}>24 / page</option>
                    <option value={48}>48 / page</option>
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
