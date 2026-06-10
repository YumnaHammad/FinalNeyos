import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import API, { resolveMediaUrl } from '../../api';
import SectionHeader from '../ui/SectionHeader';
import miniCAmeraGroup from '../assets/images/nexyos/miniCAmeraGroup.png';

const ITEMS_PER_PAGE = 8;

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/product/categories')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setCategories(data);
      })
      .catch(() => {
        API.get('/categories?legacy=1')
          .then((res) => setCategories(Array.isArray(res.data) ? res.data : []))
          .catch(() => setCategories([]));
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(categories.length / ITEMS_PER_PAGE));
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visible = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToCategory = (item) => {
    const name = item.category || item.name;
    const slug = item.slug || name;
    navigate(`/category/${encodeURIComponent(slug)}`, {
      state: { categoryId: item.id || item._id },
    });
  };

  return (
    <section className="landing-section landing-section--white">
      <div className="landing-container">
        <SectionHeader
          badge="Explore"
          title="Product Categories"
          subtitle="Browse our full range of network, security, access control and smart building solutions."
        />

        {loading ? (
          <div className="landing-loader">
            <div className="landing-spinner" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-400 font-medium py-12">No categories available yet.</p>
        ) : (
          <>
            <div className="relative">
              {totalPages > 1 && (
                <>
                  <button
                    type="button"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-[#006071] text-white flex items-center justify-center shadow-lg hover:bg-[#004d5a] transition-colors hidden md:flex"
                    onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
                    aria-label="Previous categories"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-[#006071] text-white flex items-center justify-center shadow-lg hover:bg-[#004d5a] transition-colors hidden md:flex"
                    onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
                    aria-label="Next categories"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="landing-categories-grid">
                {visible.map((item) => {
                  const label = item.category || item.name;
                  const img = item.image ? resolveMediaUrl(item.image) : miniCAmeraGroup;
                  return (
                    <article
                      key={item.id || item._id || label}
                      className="landing-category-card"
                      onClick={() => goToCategory(item)}
                      onKeyDown={(e) => e.key === 'Enter' && goToCategory(item)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="landing-category-card__img-wrap">
                        <img src={img} alt={label} className="landing-category-card__img" />
                      </div>
                      <h3 className="landing-category-card__title">
                        {label}
                        <span className="landing-category-card__arrow">
                          <ChevronRight size={14} />
                        </span>
                      </h3>
                    </article>
                  );
                })}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="landing-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`landing-pagination__dot ${i === currentPage ? 'landing-pagination__dot--active' : ''}`}
                    onClick={() => setCurrentPage(i)}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
