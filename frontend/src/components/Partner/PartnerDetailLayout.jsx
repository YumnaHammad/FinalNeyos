import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Loader2, Phone, PlayCircle } from 'lucide-react';
import { partnerNavGroups } from '../../config/partnerNav';
import '../../styles/Partner.css';

const DEFAULT_HERO =
  'https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309';

export default function PartnerDetailLayout({
  title = 'Partner',
  shortTitle = '',
  subtitle = '',
  image = '',
  badge = 'Partners',
  loading = false,
  children,
  actions = null,
  relatedGroupId = '',
  showCta = true,
  isLanding = false,
}) {
  const heroImage = image || DEFAULT_HERO;
  const label = shortTitle || title;
  const relatedGroup = partnerNavGroups.find((g) => g.id === relatedGroupId);
  const relatedLinks =
    relatedGroup?.items.filter((i) => i.label !== label).slice(0, 4) || [];

  if (loading) {
    return (
      <div className="partner-detail partner-detail--loading">
        <Loader2 className="animate-spin text-[#006071]" size={40} />
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="partner-detail">
      <div className="partner-detail__breadcrumb-bar">
        <nav className="partner-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} aria-hidden />
          <Link to="/partner">Partner</Link>
          {!isLanding && (
            <>
              <ChevronRight size={14} aria-hidden />
              <span className="partner-detail__breadcrumb-current" title={title}>
                {label}
              </span>
            </>
          )}
        </nav>
      </div>

      <header
        className="partner-detail__hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="partner-detail__hero-overlay" />
        <div className="partner-detail__hero-inner">
          {badge && <p className="partner-detail__badge">{badge}</p>}
          <h1 className="partner-detail__title">{title}</h1>
          {subtitle && <p className="partner-detail__subtitle">{subtitle}</p>}
          {actions && (
            <div className="partner-detail__hero-actions">{actions}</div>
          )}
        </div>
      </header>

      <main className="partner-detail__main">{children}</main>

      {showCta && (
      <section className="partner-detail__cta" aria-labelledby="partner-cta-heading">
        <div className="partner-detail__cta-glow" aria-hidden />
        <div className="partner-detail__cta-inner">
          <div className="partner-detail__cta-copy">
            <p className="partner-detail__cta-eyebrow">Partner with Nexyos</p>
            <p className="partner-detail__cta-heading" id="partner-cta-heading">
              Ready to grow with {label}?
            </p>
            <p className="partner-detail__cta-text">
              Talk to our partner team about onboarding, project support, and program benefits.
            </p>
            {relatedLinks.length > 0 && (
              <div className="partner-detail__cta-related">
                <span>Explore:</span>
                {relatedLinks.map((item) => (
                  <Link key={item.path} to={item.path}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="partner-detail__cta-panel">
            <div className="partner-detail__cta-actions">
              <Link
                to="/Partner/BecomePartner"
                className="partner-detail__btn partner-detail__btn--primary"
              >
                Become a partner
                <ArrowRight size={16} />
              </Link>
              <Link to="/sales-inquiry" className="partner-detail__btn partner-detail__btn--secondary">
                Contact sales
              </Link>
              <Link to="/contact" className="partner-detail__btn partner-detail__btn--ghost">
                <Phone size={16} />
                Talk to an expert
              </Link>
              <Link to="/partner" className="partner-detail__btn partner-detail__btn--link">
                All partner programs
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}

export function PartnerDetailSection({ title, lead, children, alt = false, id }) {
  return (
    <section
      id={id}
      className={`partner-detail-section ${alt ? 'partner-detail-section--alt' : ''}`}
    >
      <div className="partner-detail-section__inner">
        {title && <h2 className="partner-detail-section__title">{title}</h2>}
        {lead && <p className="partner-detail-section__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function PartnerStatsRow({ stats = [] }) {
  if (!stats.length) return null;
  return (
    <div className="partner-stats">
      {stats.map((stat) => (
        <div className="partner-stats__item" key={stat.label}>
          <span className="partner-stats__value">{stat.value}</span>
          <span className="partner-stats__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export function PartnerStepsGrid({ steps = [] }) {
  return (
    <div className="partner-steps">
      {steps.map((step, index) => (
        <div className="partner-steps__item" key={step.title}>
          <span className="partner-steps__num">{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
}

export function PartnerHighlightSection({ badge, heading, description, image, stats = [] }) {
  return (
    <section className="partner-highlight">
      <div className="partner-highlight__inner">
        <div className="partner-highlight__image">
          <img src={image} alt={heading} loading="lazy" />
          {badge && <span className="partner-highlight__badge">{badge}</span>}
        </div>
        <div className="partner-highlight__body">
          <h2 className="partner-highlight__title">{heading}</h2>
          <p className="partner-highlight__desc">{description}</p>
          {stats.length > 0 && (
            <div className="partner-highlight__stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="partner-highlight__stat-value">{s.value}</span>
                  <span className="partner-highlight__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PartnerWhySection({ heading, items = [], image }) {
  return (
    <PartnerDetailSection title={heading}>
      <div className="partner-why">
        <ul className="partner-why__list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {image && (
          <div className="partner-why__image">
            <img src={image} alt="" loading="lazy" />
          </div>
        )}
      </div>
    </PartnerDetailSection>
  );
}

export function PartnerBenefitsGrid({ title, subtitle, items = [] }) {
  return (
    <PartnerDetailSection alt title={title} lead={subtitle}>
      <div className="partner-benefits">
        {items.map((item) => (
          <article key={item.id || item.title} className="partner-benefits__card">
            <h3>{item.heading || item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </PartnerDetailSection>
  );
}

export function PartnerSolutionsStrip({ title, lead, items = [] }) {
  return (
    <section className="partner-solutions">
      <div className="partner-solutions__inner">
        {title && <h2 className="partner-solutions__title">{title}</h2>}
        {lead && <p className="partner-solutions__lead">{lead}</p>}
        <div className="partner-solutions__grid">
          {items.map((item) => (
            <article key={item.id || item.heading} className="partner-solutions__card">
              {item.image && <img src={item.image} alt={item.heading} loading="lazy" />}
              <h3>{item.heading}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerTypeCards({ items = [] }) {
  return (
    <div className="partner-types">
      {items.map((item) => (
        <Link key={item.title} to={item.path} className="partner-types__card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className="partner-types__link">Learn more →</span>
        </Link>
      ))}
    </div>
  );
}
