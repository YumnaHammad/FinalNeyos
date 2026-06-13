import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import API, { resolveMediaUrl } from '../../api';
import Contact from '../../components/Contact';
import '../../styles/BlogPage.css';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await API.get(`/blogs/${encodeURIComponent(slug)}`);
        setBlog(res.data);
      } catch {
        setError('Blog post not found.');
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) load();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail__loading">
        <Loader2 className="animate-spin text-[#006071]" size={36} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container blog-detail">
        <Link to="/company/blog" className="blog-detail__back">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        <p>{error || 'Post not found.'}</p>
      </div>
    );
  }

  return (
    <>
      <article className="blog-detail">
        <div className="container">
          <Link to="/company/blog" className="blog-detail__back">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <header className="blog-detail__header">
            <div className="blog-card__tags" style={{ justifyContent: 'center' }}>
              {(blog.categories || []).map((c) => (
                <span key={c} className="blog-card__tag">
                  {c}
                </span>
              ))}
            </div>
            <h1 className="blog-detail__title">{blog.title}</h1>
            <p className="blog-detail__date">Published on {formatDate(blog.publishedAt)}</p>
          </header>

          {blog.image && (
            <div className="blog-detail__image">
              <img src={resolveMediaUrl(blog.image)} alt={blog.title} />
            </div>
          )}

          <div
            className="blog-detail__content"
            dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt || ''}</p>` }}
          />
        </div>
      </article>
      <Contact interestMode="area" />
    </>
  );
}
