import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react';
import API, { resolveMediaUrl } from '../../api';
import Contact from '../../components/Contact';
import '../../styles/NewsPage.css';

const PAGE_SIZE = 10;
const HERO_BG =
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function stripHtml(html) {
  return String(html || '')
    .replace(/(<([^>]+)>)/gi, '')
    .trim();
}

function buildPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const result = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push('…');
    }
    result.push(page);
  });

  return result;
}

export default function NewsPage() {
  const [items, setItems] = useState([]);
  const [years, setYears] = useState(['All']);
  const [productLines, setProductLines] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('All');
  const [productLine, setProductLine] = useState('All');
  const [topic, setTopic] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [metaRes, yearsRes] = await Promise.all([
          API.get('/news/meta'),
          API.get('/news/years'),
        ]);
        const meta = metaRes.data || {};
        const yearList = yearsRes.data?.length ? yearsRes.data : meta.years || [];
        setYears(['All', ...yearList.map(String)]);
        setProductLines(meta.productLines || []);
        setTopics(meta.topics || []);
      } catch {
        setYears(['All', '2025', '2024', '2023', '2022', '2021']);
      }
    };
    loadMeta();
  }, []);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const res = await API.get('/news', {
          params: {
            page,
            limit: PAGE_SIZE,
            year: selectedYear,
            productLine: productLine !== 'All' ? productLine : undefined,
            topic: topic !== 'All' ? topic : undefined,
            search: searchTerm || undefined,
          },
        });
        setItems(res.data.items || []);
        setTotalPages(res.data.pages || 1);
      } catch (err) {
        console.error('Failed to load news', err);
        setItems([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [page, selectedYear, productLine, topic, searchTerm]);

  const pageNumbers = useMemo(() => buildPageNumbers(page, totalPages), [page, totalPages]);

  const handleYear = (year) => {
    setSelectedYear(year);
    setPage(1);
  };

  return (
    <div className="news-page">
      <section
        className="news-hero"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="container">
          <h1 className="news-hero__title">News</h1>
          <p className="news-hero__subtitle">
            Find out the latest news from Nexyos and stay up to date with new product launches,
            events, and more.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="news-toolbar">
          <div className="news-years" role="tablist">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                role="tab"
                className={`news-years__btn${selectedYear === year ? ' news-years__btn--active' : ''}`}
                onClick={() => handleYear(year)}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="news-toolbar__actions">
            {productLines.length > 0 && (
              <div className="news-filter">
                <select
                  value={productLine}
                  onChange={(e) => {
                    setProductLine(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Filter by product line"
                >
                  <option value="All">By Product Line</option>
                  {productLines.map((line) => (
                    <option key={line} value={line}>
                      {line}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {topics.length > 0 && (
              <div className="news-filter">
                <select
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Filter by topic"
                >
                  <option value="All">By Topic</option>
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="news-search">
              <Search size={16} />
              <input
                type="search"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>

        <section className="news-list-section">
          {loading ? (
            <div className="news-empty">
              <Loader2 className="animate-spin text-[#006071]" size={32} />
            </div>
          ) : items.length === 0 ? (
            <div className="news-empty">
              <h3>No news found for this filter.</h3>
              <p>Try another year, filter, or search term.</p>
            </div>
          ) : (
            <div className="news-list">
              {items.map((item) => (
                <Link
                  key={item._id}
                  to={`/company/news/${item.slug}`}
                  className="news-card"
                >
                  <div className="news-card__image">
                    {item.image ? (
                      <img
                        src={resolveMediaUrl(item.image)}
                        alt={item.title}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#0f172a' }} />
                    )}
                  </div>
                  <div>
                    <h2 className="news-card__title">{item.title}</h2>
                    <p className="news-card__excerpt">
                      {item.excerpt || `${stripHtml(item.content).slice(0, 220)}…`}
                    </p>
                    <time className="news-card__date" dateTime={item.publishedAt}>
                      {formatDate(item.publishedAt)}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="news-pagination" aria-label="News pagination">
              <button
                type="button"
                className="news-pagination__btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>
              {pageNumbers.map((n, idx) =>
                n === '…' ? (
                  <span key={`ellipsis-${idx}`} className="news-pagination__ellipsis">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    type="button"
                    className={`news-pagination__btn${page === n ? ' news-pagination__btn--active' : ''}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                )
              )}
              <button
                type="button"
                className="news-pagination__btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          )}
        </section>
      </div>

      <Contact interestMode="area" />
    </div>
  );
}
