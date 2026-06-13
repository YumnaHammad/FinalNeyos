import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import API, { resolveMediaUrl } from '../../api';
import Contact from '../../components/Contact';
import '../../styles/BlogPage.css';

const PAGE_SIZE = 9;

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function stripHtml(html) {
  return String(html || '')
    .replace(/(<([^>]+)>)/gi, '')
    .trim();
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [catRes, featuredRes] = await Promise.all([
          API.get('/blogs/categories/list'),
          API.get('/blogs', { params: { featured: 1, limit: 1 } }),
        ]);
        setCategories(Array.isArray(catRes.data) ? catRes.data.map((c) => c.name) : []);
        const featuredItems = featuredRes.data.items || [];
        setFeatured(featuredItems[0] || null);
      } catch {
        setCategories(['Product', 'Solutions', 'Innovation', 'Campaign']);
      }
    };
    loadMeta();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await API.get('/blogs', {
          params: {
            page,
            limit: PAGE_SIZE,
            category: activeCategory,
            search: searchTerm || undefined,
            sort: sort === 'oldest' ? 'oldest' : undefined,
          },
        });
        let items = res.data.items || [];
        if (featured) {
          items = items.filter((p) => p._id !== featured._id && p.slug !== featured.slug);
        }
        setPosts(items);
        setTotalPages(res.data.pages || 1);
      } catch (err) {
        console.error('Failed to load blogs', err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [page, activeCategory, searchTerm, sort, featured]);

  const tabs = useMemo(() => ['All', ...categories], [categories]);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1 className="blog-hero__title">BLOG</h1>
          <p className="blog-hero__subtitle">
            Stay up to date with Nexyos product news, solution insights, innovation stories, and
            partner campaigns from our global AIoT team.
          </p>
        </div>
      </section>

      {featured && page === 1 && activeCategory === 'All' && !searchTerm && (
        <section className="blog-featured">
          <div className="container">
            <Link to={`/company/blog/${featured.slug}`} className="blog-featured__link">
              <div className="blog-featured__image">
                <img src={resolveMediaUrl(featured.image)} alt={featured.title} loading="lazy" />
              </div>
              <div>
                <span className="blog-featured__badge">Featured</span>
                <h2 className="blog-featured__title">{featured.title}</h2>
                <p className="blog-featured__excerpt">
                  {featured.excerpt || stripHtml(featured.content).slice(0, 180)}…
                </p>
                <div className="blog-featured__meta">
                  <span>{formatDate(featured.publishedAt)}</span>
                  {(featured.categories || []).slice(0, 2).map((c) => (
                    <span key={c} className="blog-card__tag">
                      {c}
                    </span>
                  ))}
                </div>
                <span className="blog-featured__arrow" aria-hidden>
                  <ArrowRight size={20} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <div className="container">
        <div className="blog-toolbar">
          <ul className="blog-tabs" role="tablist">
            {tabs.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  role="tab"
                  className={`blog-tabs__btn${activeCategory === cat ? ' blog-tabs__btn--active' : ''}`}
                  onClick={() => handleCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <div className="blog-toolbar__actions">
            <div className="blog-search">
              <Search size={16} />
              <input
                type="search"
                placeholder="Search blog…"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="blog-sort">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
              </select>
            </div>
          </div>
        </div>

        <section className="blog-grid-section">
          {loading ? (
            <div className="blog-empty">
              <Loader2 className="animate-spin text-[#006071]" size={32} />
            </div>
          ) : posts.length === 0 ? (
            <div className="blog-empty">
              <h3>No blogs found</h3>
              <p>Try another category or search term.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <Link key={post._id} to={`/company/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card__image">
                    <img
                      src={resolveMediaUrl(post.image)}
                      alt={post.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">
                      {post.excerpt || `${stripHtml(post.content).slice(0, 140)}…`}
                    </p>
                    <div className="blog-card__footer">
                      <span className="blog-card__date">{formatDate(post.publishedAt)}</span>
                      <div className="blog-card__tags">
                        {(post.categories || []).slice(0, 1).map((c) => (
                          <span key={c} className="blog-card__tag">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Blog pagination">
              <button
                type="button"
                className="blog-pagination__btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(0, 7)
                .map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`blog-pagination__btn${page === n ? ' blog-pagination__btn--active' : ''}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
              <button
                type="button"
                className="blog-pagination__btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                ›
              </button>
            </nav>
          )}
        </section>
      </div>

      <section className="blog-newsletter">
        <div className="container">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest Nexyos product updates, solution guides, and event invitations.</p>
          <Link to="/contact" className="blog-newsletter__btn">
            Subscribe
          </Link>
        </div>
      </section>

      <Contact interestMode="area" />
    </div>
  );
}
