import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import API, { resolveMediaUrl } from '../../api';
import Contact from '../../components/Contact';
import miniCAmeraGroup from '../../assets/images/nexyos/miniCAmeraGroup.png';
import styles from '../../styles/ProductLongPage.module.css';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('spec');
  const [activeSpecGroup, setActiveSpecGroup] = useState(null);
  const [categoryTrail, setCategoryTrail] = useState([]);

  const specRef = useRef(null);
  const resourcesRef = useRef(null);
  const specContentRef = useRef(null);
  const groupRefs = useRef({});

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await API.get(`/products/${encodeURIComponent(slug)}`);
        setProduct(data);
        const groups = Object.keys(data?.specifications || {});
        setActiveSpecGroup(groups[0] || null);
        setImageIndex(0);
        if (data?.categorySlug) {
          try {
            const catRes = await API.get(
              `/categories/${encodeURIComponent(data.categorySlug)}`
            );
            const cat = catRes.data;
            const sub = cat?.subCategories?.find((s) => s.slug === data.subCategorySlug);
            const trail = [{ label: 'Home', path: '/' }];
            if (cat?.name) trail.push({ label: cat.name, path: `/category/${cat.slug}` });
            if (sub?.name) trail.push({ label: sub.name, path: `/category/${cat.slug}` });
            if (data.model) trail.push({ label: data.model, path: null });
            setCategoryTrail(trail);
          } catch {
            setCategoryTrail([]);
          }
        } else {
          setCategoryTrail([]);
        }
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'Product not found'
            : err.response?.data?.message || 'Failed to load product'
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  const galleryImages = (() => {
    if (!product) return [miniCAmeraGroup];
    const imgs = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
    if (imgs.length > 0) return imgs.map((u) => resolveMediaUrl(u));
    if (product.image) return [resolveMediaUrl(product.image)];
    return [miniCAmeraGroup];
  })();

  const specGroups = product?.specifications
    ? Object.keys(product.specifications)
    : [];

  const keyFeatures =
    Array.isArray(product?.keyFeatures) && product.keyFeatures.length > 0
      ? product.keyFeatures
      : product?.description
        ? [product.description]
        : [];

  const documents = product?.resources?.documents || [];
  const firmware = product?.resources?.firmware || [];

  const scrollToSection = (tab) => {
    setActiveTab(tab);
    const ref = tab === 'spec' ? specRef : resourcesRef;
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToGroup = (group) => {
    setActiveSpecGroup(group);
    groupRefs.current[group]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const container = specContentRef.current;
    if (!container || specGroups.length === 0) return;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      let current = specGroups[0];
      for (const group of specGroups) {
        const el = groupRefs.current[group];
        if (el && el.offsetTop - container.offsetTop <= scrollTop + 80) {
          current = group;
        }
      }
      setActiveSpecGroup(current);
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, [specGroups, product]);

  const prevImage = () =>
    setImageIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const nextImage = () =>
    setImageIndex((i) => (i + 1) % galleryImages.length);

  if (loading) {
    return (
      <>
        <ProductBreadcrumb trail={[]} />
        <p className={styles.message}>Loading product…</p>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <ProductBreadcrumb trail={[]} />
        <p className={styles.error}>{error || 'Product not found'}</p>
      </>
    );
  }

  return (
    <>
      <ProductBreadcrumb trail={categoryTrail} />

      <div className={styles.page}>
        <div className={styles.heroWrap}>
          <div className={styles.heroGrid}>
            <div className={styles.gallery} data-aos="fade-right">
              <div className={styles.mainImgWrap}>
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${styles.galleryNav} ${styles.galleryNavLeft}`}
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.galleryNav} ${styles.galleryNavRight}`}
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                <img
                  src={galleryImages[imageIndex]}
                  alt={product.title}
                  className={styles.mainImg}
                />
              </div>
              {galleryImages.length > 1 && (
                <div className={styles.thumbs}>
                  {galleryImages.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.thumb} ${idx === imageIndex ? styles.thumbActive : ''}`}
                      onClick={() => setImageIndex(idx)}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.info} data-aos="fade-left">
              <div className={styles.modelRow}>
                <span className={styles.modelCode}>{product.model || product.slug}</span>
                {product.isNew && <span className={styles.badgeNew}>NEW</span>}
                {product.isHot && <span className={styles.badgeHot}>HOT</span>}
              </div>

              <h1 className={styles.productTitle}>{product.title}</h1>

              {product.featureIcons?.length > 0 && (
                <div className={styles.iconRow}>
                  {product.featureIcons.map((icon, idx) => (
                    <span key={idx} className={styles.featureIcon} title={icon}>
                      {icon}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.featuresGrid}>
                {keyFeatures.map((feature, idx) => (
                  <p key={idx} className={styles.featureItem}>
                    {feature}
                  </p>
                ))}
              </div>

              <div className={styles.actions}>
                <Link
                  to={product.dataSheetUrl || '/contact'}
                  className={styles.btnPrimary}
                >
                  Data Sheet
                </Link>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() =>
                    navigate('/sales-inquiry', {
                      state: {
                        productModel: product.model,
                        productTitle: product.title,
                        productSlug: product.slug,
                      },
                    })
                  }
                >
                  Sales Inquiry
                </button>
              </div>

              {product.variants?.length > 0 && (
                <p className={styles.variants}>
                  <strong>Available Models:</strong>{' '}
                  {product.variants.join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.tabBar}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'spec' ? styles.tabActive : ''}`}
            onClick={() => scrollToSection('spec')}
          >
            Specification
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'resources' ? styles.tabActive : ''}`}
            onClick={() => scrollToSection('resources')}
          >
            Resources
          </button>
        </div>

        <section ref={specRef} className={styles.section} id="specification">
          <h2 className={styles.sectionTitle}>Specification</h2>
          {specGroups.length > 0 ? (
            <div className={styles.specLayout}>
              <nav className={styles.specNav}>
                {specGroups.map((group) => (
                  <button
                    key={group}
                    type="button"
                    className={`${styles.specNavBtn} ${
                      activeSpecGroup === group ? styles.specNavActive : ''
                    }`}
                    onClick={() => scrollToGroup(group)}
                  >
                    {group}
                  </button>
                ))}
              </nav>
              <div className={styles.specContent} ref={specContentRef}>
                {specGroups.map((group) => (
                  <div
                    key={group}
                    className={styles.specGroup}
                    ref={(el) => {
                      groupRefs.current[group] = el;
                    }}
                  >
                    <h3 className={styles.specGroupTitle}>{group}</h3>
                    <table className={styles.specTable}>
                      <tbody>
                        {(product.specifications[group] || []).map((row, idx) => (
                          <tr key={idx}>
                            <th>{row.label}</th>
                            <td>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className={styles.message}>
              Specifications coming soon. Add them in Admin → Catalogue → Products.
            </p>
          )}
        </section>

        <section
          ref={resourcesRef}
          className={`${styles.section} ${styles.resourcesSection}`}
          id="resources"
        >
          <h2 className={styles.sectionTitle}>Resources</h2>

          <div className={styles.resourceBlock}>
            <div className={styles.resourceHead}>Technical Documents</div>
            {documents.length > 0 ? (
              <div className={styles.docGrid}>
                {documents.map((doc, idx) => (
                  <Link
                    key={idx}
                    to={doc.url || '/contact'}
                    className={styles.docItem}
                  >
                    <span>{doc.title}</span>
                    <Download size={16} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className={styles.message} style={{ padding: '1.5rem' }}>
                No documents available yet.
              </p>
            )}
          </div>

          <div className={styles.resourceBlock}>
            <div className={styles.resourceHead}>Firmware</div>
            {firmware.length > 0 ? (
              <ul className={styles.firmwareList}>
                {firmware.map((item, idx) => (
                  <li key={idx} className={styles.firmwareItem}>
                    <Link to={item.url || '/contact'}>{item.title}</Link>
                    {item.date && <span className={styles.firmwareDate}>{item.date}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.message} style={{ padding: '1.5rem' }}>
                No firmware listed yet.
              </p>
            )}
          </div>
        </section>
      </div>

      <Contact />
    </>
  );
};

const ProductBreadcrumb = ({ trail }) => (
  <nav className={styles.breadcrumb} aria-label="Breadcrumb">
    <ol className={styles.breadcrumbList}>
      {(trail.length > 0 ? trail : [{ label: 'Home', path: '/' }, { label: 'Products', path: '/all-products' }]).map(
        (item, idx, arr) => (
          <li key={`${item.label}-${idx}`} className={styles.breadcrumbItem}>
            {item.path && idx < arr.length - 1 ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < arr.length - 1 && <span className={styles.breadcrumbSep}>/</span>}
          </li>
        )
      )}
    </ol>
  </nav>
);

export default ProductDetailPage;
