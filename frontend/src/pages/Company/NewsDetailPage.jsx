import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import API, { resolveMediaUrl } from '../../api';
import Contact from '../../components/Contact';
import '../../styles/NewsPage.css';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await API.get(`/news/${encodeURIComponent(slug)}`);
        setArticle(res.data);
      } catch {
        setError('News article not found.');
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) load();
  }, [slug]);

  if (loading) {
    return (
      <div className="news-detail__loading">
        <Loader2 className="animate-spin text-[#006071]" size={36} />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container news-detail">
        <Link to="/company/news" className="news-detail__back">
          <ArrowLeft size={16} /> Back to News
        </Link>
        <p>{error || 'Article not found.'}</p>
      </div>
    );
  }

  return (
    <>
      <article className="news-detail">
        <div className="container">
          <Link to="/company/news" className="news-detail__back">
            <ArrowLeft size={16} /> Back to News
          </Link>

          <header className="news-detail__header">
            {(article.productLine || article.topic) && (
              <div className="news-detail__meta">
                {article.productLine && (
                  <span className="news-detail__tag">{article.productLine}</span>
                )}
                {article.topic && <span className="news-detail__tag">{article.topic}</span>}
              </div>
            )}
            <h1 className="news-detail__title">{article.title}</h1>
            <p className="news-detail__date">Published on {formatDate(article.publishedAt)}</p>
          </header>

          {article.image && (
            <div className="news-detail__image">
              <img src={resolveMediaUrl(article.image)} alt={article.title} />
            </div>
          )}

          <div
            className="news-detail__body"
            dangerouslySetInnerHTML={{ __html: article.content || article.excerpt || '' }}
          />
        </div>
      </article>

      <Contact interestMode="area" />
    </>
  );
}
