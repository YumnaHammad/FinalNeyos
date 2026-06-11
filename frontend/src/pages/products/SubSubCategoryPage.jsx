import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../../api';
import Contact from '../../components/Contact';
import ProductCatalog from '../../components/products/ProductCatalog';
import { familyPath } from '../../utils/slugify';
import styles from '../../styles/SubSubCategoryPage.module.css';

const SubSubCategoryPage = () => {
  const { categorySlug, subCategorySlug, subSubSlug } = useParams();
  const [category, setCategory] = useState(null);
  const [meta, setMeta] = useState({ subName: '', subSubName: '', siblings: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/categories/${encodeURIComponent(categorySlug)}`);
        setCategory(data);
        const sub = (data.subCategories || []).find((s) => s.slug === subCategorySlug);
        const subSub = (sub?.subSubCategories || []).find((ss) => ss.slug === subSubSlug);
        setMeta({
          subName: sub?.name || subCategorySlug?.replace(/-/g, ' '),
          subSubName: subSub?.name || subSubSlug?.replace(/-/g, ' '),
          siblings: (sub?.subSubCategories || []).filter((ss) => ss.slug !== subSubSlug),
        });
      } catch {
        setCategory(null);
        setMeta({ subName: '', subSubName: subSubSlug || '', siblings: [] });
      } finally {
        setLoading(false);
      }
    };
    if (categorySlug) load();
  }, [categorySlug, subCategorySlug, subSubSlug]);

  const trail = [
    { label: 'Home', path: '/' },
    { label: category?.name || 'Products', path: `/category/${categorySlug}` },
    { label: meta.subName, path: `/category/${categorySlug}` },
    { label: meta.subSubName, path: null },
  ];

  return (
    <>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol className={styles.breadcrumbList}>
          {trail.map((item, idx) => (
            <li key={`${item.label}-${idx}`} className={styles.breadcrumbItem}>
              {item.path && idx < trail.length - 1 ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
              {idx < trail.length - 1 && <span className={styles.breadcrumbSep}>/</span>}
            </li>
          ))}
        </ol>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>
          {category?.name} · {meta.subName}
        </p>
        <h1 className={styles.title}>{loading ? 'Loading…' : meta.subSubName}</h1>
        <p className={styles.subtitle}>
          Browse {meta.subSubName?.toLowerCase()} with filters — each product opens its full detail
          page.
        </p>
        {meta.siblings.length > 0 && (
          <div className={styles.siblings}>
            <span className={styles.siblingsLabel}>Also in {meta.subName}:</span>
            {meta.siblings.map((ss) => (
              <Link
                key={ss.slug}
                to={familyPath(categorySlug, subCategorySlug, ss.slug)}
                className={styles.siblingLink}
              >
                {ss.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <ProductCatalog
        categorySlug={categorySlug}
        categoryName={meta.subSubName}
        categoryData={category}
        subCategorySlug={subCategorySlug}
        subSubCategorySlug={subSubSlug}
        hideHierarchyFilters
        title={meta.subSubName || 'Products'}
      />

      <Contact />
    </>
  );
};

export default SubSubCategoryPage;
