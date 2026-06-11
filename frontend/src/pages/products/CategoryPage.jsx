import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import miniCAmeraGroup from "../../assets/images/nexyos/miniCAmeraGroup.png";
import API, { resolveMediaUrl } from "../../api";
import { familyPath, slugify } from "../../utils/slugify";
import ProductCatalog from "../../components/products/ProductCatalog";
import styles from "../../styles/CategoryPage.module.css";

const CARDS_PER_ROW = 4;
const LENSES_IMG =
  "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-lenses.jpg?t=1751621798627";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSub, setSelectedSub] = useState(null);

  const totalPages = Math.max(1, Math.ceil(subCategories.length / CARDS_PER_ROW));
  const pageItems = subCategories.slice(
    currentPage * CARDS_PER_ROW,
    currentPage * CARDS_PER_ROW + CARDS_PER_ROW
  );

  const nextSubCategory = () => {
    setCurrent((prev) => (prev + 1) % subCategories.length);
  };

  const prevSubCategory = () => {
    setCurrent((prev) => (prev - 1 + subCategories.length) % subCategories.length);
  };

  const goPrevPage = () => setCurrentPage((p) => Math.max(0, p - 1));
  const goNextPage = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  useEffect(() => {
    setCurrentPage(0);
    setSelectedSub(null);
  }, [categoryName]);

  useEffect(() => {
    if (subCategories.length > 0) {
      setSelectedSub(subCategories[0]);
    } else {
      setSelectedSub(null);
    }
  }, [subCategories]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);
      setCategory(null);
      setSubCategories([]);
      try {
        const { data } = await API.get(
          `/categories/${encodeURIComponent(categoryName)}`
        );
        if (!data?.slug && data?.message) {
          setError(data.message);
          return;
        }
        setCategory(data);
        setSubCategories(Array.isArray(data.subCategories) ? data.subCategories : []);
      } catch (err) {
        const msg =
          err.response?.status === 404
            ? "Category not found"
            : err.response?.data?.message || "Failed to load category";
        setError(msg);
        console.error("Failed to fetch category data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchCategoryData();
    }
  }, [categoryName]);

  const isSubSelected = (item) =>
    selectedSub &&
    (selectedSub.slug === item.slug ||
      (selectedSub._id && item._id && String(selectedSub._id) === String(item._id)) ||
      selectedSub.name === item.name);

  const handleSubSelect = (item) => {
    setSelectedSub(item);
  };

  const handleSubSubNavigate = (ssub) => {
    const subSubSlug = ssub.slug || slugify(ssub.name);
    if (!subSubSlug || !category?.slug || !selectedSub?.slug) return;
    navigate(familyPath(category.slug, selectedSub.slug, subSubSlug));
  };

  const renderSubcatCards = () => (
    <div className={styles.subcatGrid}>
      {Array.from({ length: CARDS_PER_ROW }).map((_, index) => {
        const item = pageItems[index];
        if (!item) {
          return <div key={`empty-${index}`} className={`${styles.card} ${styles.cardEmpty}`} aria-hidden />;
        }
        return (
          <div
            key={item._id || item.slug || index}
            className={`${styles.card} ${isSubSelected(item) ? styles.cardSelected : ""}`}
            onClick={() => handleSubSelect(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleSubSelect(item)}
            title="Click to view models below"
          >
            <div className={styles.cardImgWrap}>
              <img
                src={item.image ? resolveMediaUrl(item.image) : miniCAmeraGroup}
                alt={item.name}
                className={styles.cardImg}
              />
            </div>
            <span className={styles.cardTitle}>{item.name}</span>
          </div>
        );
      })}
    </div>
  );

  const subSubList = selectedSub?.subSubCategories || [];

  const renderSubSubGrid = () => (
    <div className={styles.subsubSection}>
      <div className={styles.subcatHeader}>
        <span className={styles.subcatLabel}>{selectedSub?.name} — models</span>
        <span className={styles.subcatCount}>
          {subSubList.length} {subSubList.length === 1 ? "model" : "models"}
        </span>
      </div>
      {subSubList.length === 0 ? (
        <p className={styles.emptyMessage}>
          No models for this sub-category. Add sub-sub categories in Admin → Catalogue → Categories.
        </p>
      ) : (
        <div className={styles.subsubGrid}>
          {subSubList.map((ssub, idx) => (
            <div
              key={ssub._id || ssub.slug || idx}
              className={styles.card}
              onClick={() => handleSubSubNavigate(ssub)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleSubSubNavigate(ssub)}
            >
              <div className={styles.cardImgWrap}>
                <img src={miniCAmeraGroup} alt="" className={styles.cardImg} />
              </div>
              <span className={styles.cardTitle}>{ssub.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={`custom-padding ${styles.offerBlock}`}>
        <p className={styles.offerEyebrow} data-aos="fade-up">
          What we offer
        </p>
        <p className={styles.offerText} data-aos="fade-up">
          Explore our {category?.name?.toLowerCase() || "product"} range — precision optics,
          smart devices, and solutions built for modern infrastructure.
        </p>
      </div>

      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle} data-aos="fade-up">
            {category?.name || "Product Category"}
          </h1>
          {category?.description && (
            <p className={styles.heroDesc} data-aos="fade-up">
              {category.description}
            </p>
          )}
          <div className={styles.heroAccent} aria-hidden />
        </header>

        {!error && category?.slug && (
          <ProductCatalog
            categorySlug={category.slug}
            categoryName={category.name}
            categoryData={category}
          />
        )}

        {error && <p className={styles.error}>{error}</p>}

        <section className={styles.section} aria-labelledby="cat-range-title">
          <h2 id="cat-range-title" className={styles.sectionTitle} data-aos="fade-up">
            Sub-Categories &amp; Lenses
          </h2>

          <div className={styles.split}>
            <aside className={styles.lensesCard} data-aos="fade-right">
              <img src={LENSES_IMG} alt="Optical lenses" className={styles.lensesImg} />
              <div className={styles.lensesOverlay}>
                <span className={styles.lensesLabel}>Featured</span>
                <h3 className={styles.lensesTitle}>Lenses</h3>
                <p className={styles.lensesSpec}>
                  4X / 5X / 12X / 36X Optical AF Lens
                  <br />
                  Motorized 2.7~13.5mm / 3.6~10mm @F1.4
                </p>
              </div>
            </aside>

            <div className={styles.subcatPanel}>
              <div className={styles.subcatHeader}>
                <span className={styles.subcatLabel}>
                  {category?.name || "Product"} sub-categories
                </span>
                {!loading && subCategories.length > 0 && (
                  <span className={styles.subcatCount}>
                    {subCategories.length} total
                  </span>
                )}
              </div>

              {loading ? (
                <p className={styles.loadingText}>Loading sub-categories…</p>
              ) : subCategories.length === 0 ? (
                <p className={styles.emptyMessage}>
                  No sub-categories yet. Add them in Admin → Catalogue → Categories.
                </p>
              ) : (
                <>
                  {renderSubcatCards()}
                  {subCategories.length > CARDS_PER_ROW && (
                    <div className={styles.pager}>
                      <button
                        type="button"
                        className={styles.pagerBtn}
                        onClick={goPrevPage}
                        disabled={currentPage === 0}
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`${styles.dot} ${currentPage === i ? styles.dotActive : ""}`}
                          onClick={() => setCurrentPage(i)}
                          aria-label={`Page ${i + 1}`}
                          aria-current={currentPage === i ? "true" : undefined}
                        />
                      ))}
                      <button
                        type="button"
                        className={styles.pagerBtn}
                        onClick={goNextPage}
                        disabled={currentPage >= totalPages - 1}
                        aria-label="Next page"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className={styles.mobilePanel}>
              <div className={styles.mobileCard}>
                <div className={styles.mobileNav}>
                  <span className={styles.subcatLabel}>Sub-categories</span>
                  {subCategories.length > 1 && (
                    <div className={styles.mobileNavBtns}>
                      <button type="button" className={styles.mobileNavBtn} onClick={prevSubCategory} aria-label="Previous">
                        <ChevronLeft size={18} />
                      </button>
                      <button type="button" className={styles.mobileNavBtn} onClick={nextSubCategory} aria-label="Next">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {loading ? (
                  <p className={styles.loadingText}>Loading…</p>
                ) : subCategories.length === 0 ? (
                  <p className={styles.emptyMessage}>No sub-categories yet.</p>
                ) : (
                  <>
                    <div
                      className={styles.mobileItem}
                      onClick={() => handleSubSelect(subCategories[current])}
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src={
                          subCategories[current]?.image
                            ? resolveMediaUrl(subCategories[current].image)
                            : miniCAmeraGroup
                        }
                        alt={subCategories[current]?.name}
                        className={styles.cardImg}
                        style={{ maxHeight: 120 }}
                      />
                      <p className={styles.cardTitle} style={{ fontSize: "1rem" }}>
                        {subCategories[current]?.name}
                      </p>
                    </div>
                    <p className={styles.mobileCounter}>
                      <strong>{current + 1}</strong> of {subCategories.length}
                    </p>
                    {selectedSub?.subSubCategories?.length > 0 && (
                      <div className={styles.subsubGrid} style={{ marginTop: "1rem" }}>
                        {selectedSub.subSubCategories.map((ssub, idx) => (
                          <div
                            key={ssub.slug || idx}
                            className={styles.card}
                            onClick={() => handleSubSubNavigate(ssub)}
                            role="button"
                            tabIndex={0}
                          >
                            <span className={styles.cardTitle}>{ssub.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {!loading && selectedSub && subCategories.length > 0 && renderSubSubGrid()}
        </section>
      </div>
    </>
  );
};

export default CategoryPage;
