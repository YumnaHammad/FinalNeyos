import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Loader2, Phone, PlayCircle } from 'lucide-react';
import { solutionNavGroups } from '../../config/solutionNav';
import '../../styles/Solutions.css';

const DEFAULT_HERO =
  'https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/road-traffic-management.jpg?t=1751621798627';

export default function SolutionDetailLayout({
  title = 'Solution',
  shortTitle = '',
  subtitle = '',
  image = '',
  badge = 'Solutions',
  loading = false,
  children,
  actions = null,
  relatedGroupId = '',
}) {
  const heroImage = image || DEFAULT_HERO;
  const label = shortTitle || title;
  const relatedGroup = solutionNavGroups.find((g) => g.id === relatedGroupId);
  const relatedLinks = relatedGroup?.items.filter((i) => i.label !== label).slice(0, 4) || [];

  if (loading) {
    return (
      <div className="solution-detail solution-detail--loading">
        <Loader2 className="animate-spin text-[#006071]" size={40} />
        <p>Loading solution…</p>
      </div>
    );
  }

  return (
    <div className="solution-detail">
      <div className="solution-detail__breadcrumb-bar">
        <nav className="solution-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} aria-hidden />
          <Link to="/solution">Solutions</Link>
          <ChevronRight size={14} aria-hidden />
          <span className="solution-detail__breadcrumb-current" title={title}>
            {label}
          </span>
        </nav>
      </div>

      <header
        className="solution-detail__hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="solution-detail__hero-overlay" />
        <div className="solution-detail__hero-inner">
          {badge && <p className="solution-detail__badge">{badge}</p>}
          <h1 className="solution-detail__title">{title}</h1>
          {subtitle && <p className="solution-detail__subtitle">{subtitle}</p>}
          {actions && <div className="solution-detail__hero-actions">{actions}</div>}
        </div>
      </header>

      <main className="solution-detail__main">{children}</main>

      <section className="solution-detail__cta" aria-labelledby="solution-cta-heading">
        <div className="solution-detail__cta-glow" aria-hidden />
        <div className="solution-detail__cta-inner">
          <div className="solution-detail__cta-copy">
            <p className="solution-detail__cta-eyebrow">Next step</p>
            <p className="solution-detail__cta-heading" id="solution-cta-heading">
              Ready to deploy {label}?
            </p>
            <p className="solution-detail__cta-text">
              Talk to our specialists for a tailored demo, deployment plan, and pricing for your environment.
            </p>
            {relatedLinks.length > 0 && (
              <div className="solution-detail__cta-related">
                <span>Also explore:</span>
                {relatedLinks.map((item) => (
                  <Link key={item.path} to={item.path}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="solution-detail__cta-panel">
            <div className="solution-detail__cta-actions">
              <Link to="/sales-inquiry" className="solution-detail__btn solution-detail__btn--primary">
                Contact sales
                <ArrowRight size={16} />
              </Link>
              <Link to="/demo" className="solution-detail__btn solution-detail__btn--secondary">
                <PlayCircle size={16} />
                Request demo
              </Link>
              <Link to="/contact" className="solution-detail__btn solution-detail__btn--ghost">
                <Phone size={16} />
                Talk to an expert
              </Link>
              <Link to="/solution" className="solution-detail__btn solution-detail__btn--link">
                Browse all solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SolutionDetailSection({ title, lead, children, alt = false, id }) {
  return (
    <section
      id={id}
      className={`solution-detail-section ${alt ? 'solution-detail-section--alt' : ''}`}
    >
      <div className="solution-detail-section__inner">
        {title && <h2 className="solution-detail-section__title">{title}</h2>}
        {lead && <p className="solution-detail-section__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
