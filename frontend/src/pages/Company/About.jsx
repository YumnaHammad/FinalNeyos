import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Building2,
  Sprout,
  TrafficCone,
  ChevronDown,
  Play,
  Newspaper,
  Calendar,
  Trophy,
  BookOpen,
  FileText,
  MessageSquare,
  Leaf,
  X,
} from 'lucide-react';
import Contact from '../../components/Contact';
import '../../styles/AboutUs.css';

const HERO_BG =
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920';

const VIDEO_THUMB =
  'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop';

/* IoT & smart connectivity overview — replace with Nexyos official video when available */
const VIDEO_URL = 'https://www.youtube.com/embed/QSIPBdQo0CY';

const STATS_VISUAL =
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';

const WORLD_MAP_IMAGE =
  'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=900&h=560&fit=crop';

const WHAT_WE_DO = [
  {
    icon: Camera,
    title: 'AIoT Video Surveillance & Software',
  },
  {
    icon: Building2,
    title: 'AIoT Smart Building & Occupancy',
  },
  {
    icon: Sprout,
    title: 'AIoT Smart Agriculture & Environment',
  },
  {
    icon: TrafficCone,
    title: 'AIoT Smart Traffic & ITS',
  },
];

const STATS = [
  { value: '38%+', label: 'CAGR', desc: 'Compound annual growth in IoT deployments' },
  { value: '278+', label: 'Employees', desc: 'Engineering, sales, and support worldwide' },
  { value: '92+', label: 'Countries & Regions', desc: 'Global partner and customer network' },
  { value: '15+', label: 'Years', desc: 'Innovation in sensing and connectivity' },
  { value: '1M+', label: 'Devices', desc: 'Deployed across smart city and enterprise' },
  { value: '100+', label: 'Partners', desc: 'Channel and technology alliances' },
];

const MVV = {
  mission: {
    title: 'Mission',
    text: 'To empower organizations with intelligent sensing and connectivity solutions that transform data into actionable insight — making every environment safer, smarter, and more sustainable.',
  },
  vision: {
    title: 'Vision',
    text: 'To be the global leader in AIoT video and sensing technology, recognized for innovation, reliability, and the positive impact we create for communities and industries worldwide.',
  },
  values: {
    title: 'Values',
    text: 'We operate with integrity, customer focus, and continuous innovation. We believe in collaboration with partners, responsible manufacturing, and delivering technology that truly matters.',
  },
};

const IMPACT_ITEMS = [
  {
    id: 'welfare',
    title: 'Social Welfare',
    text: 'Nexyos supports community initiatives and educational programs that promote technology literacy and digital inclusion in underserved regions.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'green',
    title: 'Green Manufacturing',
    text: 'We are committed to reducing environmental impact through energy-efficient product design, recyclable packaging, and responsible supply chain practices.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'minerals',
    title: 'Conflict Minerals Policy & Statement',
    text: 'Nexyos maintains strict policies to ensure our products do not contain conflict minerals sourced from regions that fund violence or human rights abuses.',
    image:
      'https://images.unsplash.com/photo-1518173946687-a12627bb3905?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sourcing',
    title: 'Ethical Sourcing',
    text: 'We work with suppliers who share our commitment to fair labor practices, environmental stewardship, and transparent business conduct.',
    image:
      'https://images.unsplash.com/photo-1502082554558-9163a5aad137?auto=format&fit=crop&w=800&q=80',
  },
];

const PARTNERS = [
  'AWS', 'Microsoft', 'Semtech', 'LoRa Alliance',
  'Intel', 'NVIDIA', 'Cisco', 'Honeywell',
  'Schneider', 'Siemens', 'Hikvision', 'Dell',
];

const KNOW_LINKS = [
  { label: 'News', path: '/company/news', icon: Newspaper },
  { label: 'Events', path: '/company/events', icon: Calendar },
  { label: 'Success Stories', path: '/success', icon: Trophy },
  { label: 'Blog', path: '/company/blog', icon: BookOpen },
  { label: 'Marketing Materials', path: '/partner', icon: FileText },
  { label: 'Feedback Report', path: '/contact', icon: MessageSquare },
  { label: 'Join the Discussion', path: '/Partner/becomePartner', icon: MessageSquare },
  { label: 'IoT For Better Tomorrow', path: '/solution', icon: Leaf },
];

export default function AboutUs() {
  const [mvvTab, setMvvTab] = useState('mission');
  const [impactOpen, setImpactOpen] = useState('welfare');
  const [videoOpen, setVideoOpen] = useState(false);

  const activeImpact = IMPACT_ITEMS.find((i) => i.id === impactOpen) || IMPACT_ITEMS[0];
  const activeMvv = MVV[mvvTab];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <img src={HERO_BG} alt="" className="about-hero__bg" aria-hidden />
        <div className="about-hero__overlay" aria-hidden />
        <div className="container about-hero__inner">
          <div data-aos="fade-right">
            <p className="about-hero__eyebrow">About Nexyos</p>
            <h1 className="about-hero__title">MAKE SENSING MATTER</h1>
            <p className="about-hero__desc">
              Nexyos is a global AIoT solution provider specializing in video surveillance, smart
              sensing, and connectivity. We help businesses and cities sense, connect, and act on
              real-world data — turning complexity into clarity.
            </p>
          </div>
          <div className="about-hero__video-wrap" data-aos="fade-left" data-aos-delay="100">
            <div className="about-hero__video-bar">
              Nexyos: Sense the Infinity in the Real World
            </div>
            <div className="about-hero__video-thumb">
              <img src={VIDEO_THUMB} alt="Nexyos company video" />
              <button
                type="button"
                className="about-hero__play"
                aria-label="Play company video"
                onClick={() => setVideoOpen(true)}
              >
                <Play fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-section__title" data-aos="fade-up">What We Do</h2>
          <p className="about-section__subtitle" data-aos="fade-up" data-aos-delay="50">
            From AI-powered cameras to LoRaWAN sensors and edge routers, Nexyos delivers end-to-end
            solutions for video intelligence, smart buildings, agriculture, and intelligent traffic.
          </p>
          <div className="about-what-grid">
            {WHAT_WE_DO.map((item, i) => {
              const Icon = item.icon;
              return (
                <div className="about-what-item" key={item.title} data-aos="fade-up" data-aos-delay={i * 80}>
                  <div className="about-what-item__icon">
                    <Icon size={38} strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3>{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-section about-section--gray">
        <div className="container">
          <div className="about-stats">
            <div className="about-stats__grid">
              {STATS.map((stat, i) => (
                <div key={stat.label} data-aos="fade-up" data-aos-delay={i * 60}>
                  <p className="about-stat__value">{stat.value}</p>
                  <p className="about-stat__label">{stat.label}</p>
                  <p className="about-stat__desc">{stat.desc}</p>
                </div>
              ))}
            </div>
            <div className="about-stats__visual" data-aos="fade-left">
              <div className="about-stats__visual-frame">
                <img src={STATS_VISUAL} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="about-section about-section--dark">
        <div className="container about-mvv">
          <div className="about-mvv__tabs" role="tablist">
            {Object.keys(MVV).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mvvTab === key}
                className={`about-mvv__tab${mvvTab === key ? ' about-mvv__tab--active' : ''}`}
                onClick={() => setMvvTab(key)}
              >
                {MVV[key].title}
              </button>
            ))}
          </div>
          <div className="about-mvv__panel" role="tabpanel">
            <h3 className="about-mvv__heading">{activeMvv.title}</h3>
            <p data-aos="fade-up">{activeMvv.text}</p>
            <Link to="/company/aboutUs" className="about-mvv__btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Worldwide Coverage */}
      <section className="about-section">
        <div className="container">
          <div className="about-world">
            <div className="about-world__content" data-aos="fade-right">
              <h2>Worldwide Coverage</h2>
              <p>
                With offices and partners across Asia, Europe, the Middle East, and the Americas,
                Nexyos delivers local support with global expertise. Our network ensures fast
                deployment, responsive service, and region-specific solutions.
              </p>
              <div className="about-world__actions">
                <Link to="/Partner/becomePartner" className="about-world__btn">
                  Join our global network
                </Link>
                <Link to="/Partner/findChannel" className="about-world__btn about-world__btn--outline">
                  Find a distributor
                </Link>
              </div>
            </div>
            <div className="about-world__map" data-aos="fade-left">
              <div className="about-world__map-frame">
                <img src={WORLD_MAP_IMAGE} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="about-section about-section--gray">
        <div className="container">
          <h2 className="about-section__title" data-aos="fade-up">
            Cooperation and Compatibility
          </h2>
          <p className="about-section__subtitle" data-aos="fade-up" data-aos-delay="50">
            Nexyos integrates seamlessly with leading cloud platforms, chip vendors, and industry
            alliances to deliver open, scalable AIoT solutions.
          </p>
          <div className="about-eco">
            <div className="about-eco__info" data-aos="fade-right">
              <h3>Nexyos IoT Ecosystem</h3>
              <ul>
                <li>Cloud-ready integrations with major platforms</li>
                <li>LoRaWAN® certified gateways and sensors</li>
                <li>ONVIF-compliant video products</li>
                <li>API and SDK for custom deployments</li>
                <li>Partner certification programs</li>
              </ul>
            </div>
            <div className="about-eco__logos" data-aos="fade-left">
              {PARTNERS.map((name) => (
                <div className="about-eco__logo" key={name}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-section__title" data-aos="fade-up">
            Global Impact &amp; Responsibility
          </h2>
          <div className="about-impact">
            <div className="about-impact__list" data-aos="fade-right">
              {IMPACT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className={`about-impact__item${impactOpen === item.id ? ' about-impact__item--open' : ''}`}
                >
                  <button
                    type="button"
                    className="about-impact__trigger"
                    aria-expanded={impactOpen === item.id}
                    onClick={() => setImpactOpen(item.id)}
                  >
                    {item.title}
                    <ChevronDown size={20} />
                  </button>
                  {impactOpen === item.id && (
                    <div className="about-impact__body">
                      <p>{item.text}</p>
                      <Link to="/contact" className="about-impact__link">
                        Read More
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="about-impact__image" data-aos="fade-left">
              <img src={activeImpact.image} alt={activeImpact.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="about-section about-section--gray">
        <div className="container">
          <h2 className="about-section__title" data-aos="fade-up">
            Brands Under Nexyos
          </h2>
          <div className="about-brands">
            <div className="about-brand-card about-brand-card--green" data-aos="fade-up">
              <h3>NexLink</h3>
              <p>
                Professional networking and connectivity solutions for enterprise edge deployments
                and industrial IoT backhaul.
              </p>
            </div>
            <div className="about-brand-card about-brand-card--orange" data-aos="fade-up" data-aos-delay="80">
              <h3>ComThink</h3>
              <p>
                Smart sensing and environmental monitoring products for buildings, agriculture, and
                smart city applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get to Know */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-section__title" data-aos="fade-up">
            Get to Know Nexyos Better
          </h2>
          <div className="about-know-grid">
            {KNOW_LINKS.map((link, i) => (
              <Link
                key={link.label}
                to={link.path}
                className="about-know-card"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <link.icon size={28} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <h2 className="about-cta__title" data-aos="fade-right">
            Take the Next Step
          </h2>
          <div className="about-cta__actions" data-aos="fade-left">
            <Link to="/sales-inquiry" className="about-cta__btn">
              Contact Sales
            </Link>
            <Link to="/Partner/becomePartner" className="about-cta__btn">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      <Contact />

      {videoOpen && (
        <div
          className="about-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Company video"
          onClick={() => setVideoOpen(false)}
        >
          <div className="about-video-modal__box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="about-video-modal__close"
              aria-label="Close video"
              onClick={() => setVideoOpen(false)}
            >
              <X size={24} />
            </button>
            <iframe
              src={`${VIDEO_URL}?autoplay=1`}
              title="Nexyos company video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
