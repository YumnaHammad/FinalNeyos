import { Link } from 'react-router-dom';
import {
  Building2,
  Camera,
  Car,
  ChevronRight,
  Droplets,
  Eye,
  Globe,
  Handshake,
  Heart,
  Lightbulb,
  Radio,
  Shield,
  Sparkles,
  Thermometer,
  Users,
  Wind,
  Zap,
} from 'lucide-react';
import Contact from '../../components/Contact';
import '../../styles/BrandPage.css';

const HERO_BG =
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920';

const IDENTITY_IMG =
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900&h=560&fit=crop';

const WORLD_MAP =
  'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1920';

const MATTER_PILLARS = [
  {
    icon: Building2,
    text: 'Businesses make smarter, data-driven decisions',
  },
  {
    icon: Shield,
    text: 'Cities become safer and more efficient',
  },
  {
    icon: Heart,
    text: 'People live in healthier environments',
  },
];

const BRAND_PILLARS = [
  {
    icon: Eye,
    title: 'See Clearly',
    text: 'High-fidelity video and sensing capture what matters — from edge to cloud — with clarity you can act on.',
  },
  {
    icon: Radio,
    title: 'Connect Seamlessly',
    text: 'LoRaWAN, cellular, and IP networks unite devices and platforms into one intelligent ecosystem.',
  },
  {
    icon: Zap,
    title: 'Act Intelligently',
    text: 'AI analytics turn raw data into automated responses, alerts, and insights that drive real outcomes.',
  },
];

const SENSING_APPS = [
  { icon: Wind, label: 'Indoor Air Quality Monitoring' },
  { icon: Users, label: 'Occupancy & People Counting' },
  { icon: Car, label: 'License Plate Recognition' },
  { icon: Camera, label: 'Motion Detection' },
  { icon: Droplets, label: 'Water Leak Detection' },
  { icon: Radio, label: 'Distance Detection' },
  { icon: Thermometer, label: 'Temperature & Humidity' },
  { icon: Sparkles, label: 'And More' },
];

const BRAND_VALUES = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    text: 'We push boundaries in AIoT sensing, edge computing, and connectivity to stay ahead of industry needs.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    text: 'Products engineered for 24/7 operation in demanding environments — trusted by partners worldwide.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    text: 'We grow together with integrators, distributors, and technology allies who share our vision.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    text: 'Energy-efficient design and responsible manufacturing for a smarter, greener tomorrow.',
  },
];

const INNOVATION_HIGHLIGHTS = [
  {
    year: '2024',
    title: 'AI Edge Analytics Platform',
    text: 'Launched next-gen on-camera AI for real-time object detection and event classification.',
    image:
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=360&fit=crop',
  },
  {
    year: '2023',
    title: 'LoRaWAN 2.0 Ecosystem',
    text: 'Expanded IoT sensor portfolio with long-range, low-power connectivity for smart cities.',
    image:
      'https://images.pexels.com/photos/1486223/pexels-photo-1486223.jpeg?auto=compress&cs=tinysrgb&w=600&h=360&fit=crop',
  },
  {
    year: '2022',
    title: 'Global Partner Program',
    text: 'Scaled channel network to 90+ countries with dedicated support and co-marketing resources.',
    image:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600&h=360&fit=crop',
  },
];

const GLOBAL_STATS = [
  { value: '92+', label: 'Countries & Regions' },
  { value: '1M+', label: 'Devices Deployed' },
  { value: '100+', label: 'Technology Partners' },
  { value: '15+', label: 'Years of Innovation' },
];

const BRAND_COLORS = [
  { name: 'Nexyos Teal', hex: '#006071', bg: '#006071' },
  { name: 'Deep Navy', hex: '#0a1628', bg: '#0a1628' },
  { name: 'Sky Blue', hex: '#38bdf8', bg: '#38bdf8' },
  { name: 'Mint Accent', hex: '#5eead4', bg: '#5eead4' },
];

export default function Brand() {
  return (
    <div className="brand-page">
      {/* Hero */}
      <section className="brand-hero">
        <img src={HERO_BG} alt="" className="brand-hero__bg" aria-hidden />
        <div className="brand-hero__overlay" aria-hidden />
        <div className="container brand-hero__inner">
          <p className="brand-hero__eyebrow">Our Brand</p>
          <h1 className="brand-hero__title">
            Making <span>Sensing Matter</span>
          </h1>
          <p className="brand-hero__desc">
            Nexyos is more than a technology company — we are a brand built on the belief that
            intelligent sensing transforms how the world works, lives, and connects.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="brand-philosophy">
        <div className="container">
          <div className="brand-philosophy__grid">
            <div>
              <h2 className="brand-philosophy__title" data-aos="fade-right">
                A Brand Built on Purpose
              </h2>
              <p className="brand-philosophy__text">
                Since our founding, Nexyos has pursued one guiding idea:{' '}
                <span className="brand-philosophy__highlight">Making Sensing Matter</span>. It
                means every product, partnership, and innovation we deliver must create real value
                — not just data, but insight that drives action.
              </p>
              <p className="brand-philosophy__text">
                From AI-powered cameras to LoRaWAN sensors and cloud platforms, our brand stands
                for technology that is accessible, reliable, and designed for the people who depend
                on it every day — integrators, city planners, facility managers, and end users
                worldwide.
              </p>
              <p className="brand-philosophy__text">
                We believe sensing should be invisible when it works and indispensable when it
                matters most.
              </p>
            </div>

            <div className="brand-matter-card">
              <h3 className="brand-matter-card__title">
                At Nexyos, everything we do is about{' '}
                <strong>Making Sensing Matter</strong> so that:
              </h3>
              <div className="brand-matter-card__pillars">
                {MATTER_PILLARS.map(({ icon: Icon, text }) => (
                  <div key={text} className="brand-matter-card__pillar">
                    <div className="brand-matter-card__icon">
                      <Icon size={24} />
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
              <p className="brand-matter-card__footer">
                To make sensing truly work across challenges, applications, and industries —
                that&apos;s what &ldquo;matter&rdquo; means to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="brand-pillars">
        <div className="container">
          <div className="brand-section-head">
            <p className="brand-section-head__label">Our Approach</p>
            <h2 className="brand-section-head__title">See. Connect. Act.</h2>
            <p className="brand-section-head__desc">
              The Nexyos brand represents a complete AIoT journey — from capturing the world
              around us to delivering intelligent outcomes.
            </p>
          </div>
          <div className="brand-pillars__grid">
            {BRAND_PILLARS.map(({ icon: Icon, title, text }) => (
              <article key={title} className="brand-pillar-card">
                <div className="brand-pillar-card__icon">
                  <Icon size={28} />
                </div>
                <h3 className="brand-pillar-card__title">{title}</h3>
                <p className="brand-pillar-card__text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sensing applications */}
      <section className="brand-sensing">
        <div className="container">
          <div className="brand-section-head">
            <p className="brand-section-head__label">What We Sense</p>
            <h2 className="brand-section-head__title">Sensing for Every Application</h2>
            <p className="brand-section-head__desc">
              Our brand promise extends across a wide range of intelligent sensing solutions —
              empowering smarter spaces, safer cities, and more efficient operations.
            </p>
          </div>
          <div className="brand-sensing__grid">
            {SENSING_APPS.map(({ icon: Icon, label }) => (
              <div key={label} className="brand-sensing__item">
                <div className="brand-sensing__icon">
                  <Icon size={22} />
                </div>
                <p className="brand-sensing__label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand values */}
      <section className="brand-values">
        <div className="container">
          <div className="brand-section-head">
            <p className="brand-section-head__label" style={{ color: '#5eead4' }}>
              What We Stand For
            </p>
            <h2 className="brand-section-head__title">Brand Values</h2>
            <p className="brand-section-head__desc">
              These principles guide every decision we make — from product design to partner
              relationships and customer support.
            </p>
          </div>
          <div className="brand-values__grid">
            {BRAND_VALUES.map(({ icon: Icon, title, text }) => (
              <article key={title} className="brand-value-card">
                <div className="brand-value-card__icon">
                  <Icon size={28} />
                </div>
                <h3 className="brand-value-card__title">{title}</h3>
                <p className="brand-value-card__text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visual identity */}
      <section className="brand-identity">
        <div className="container">
          <div className="brand-identity__grid">
            <div>
              <div className="brand-section-head" style={{ textAlign: 'left', margin: '0 0 1.5rem' }}>
                <p className="brand-section-head__label">Visual Identity</p>
                <h2 className="brand-section-head__title">The Nexyos Look &amp; Feel</h2>
              </div>
              <p className="brand-philosophy__text">
                Our visual identity reflects precision, trust, and forward-thinking technology.
                The Nexyos teal represents connectivity and innovation, while deep navy conveys
                stability and enterprise-grade reliability.
              </p>
              <p className="brand-philosophy__text">
                Clean typography, purposeful spacing, and imagery that showcases real-world
                deployments define how we present the brand across digital and print channels.
              </p>
              <div className="brand-identity__colors">
                {BRAND_COLORS.map(({ name, hex, bg }) => (
                  <div key={hex} className="brand-identity__swatch">
                    <div
                      className="brand-identity__swatch-box"
                      style={{ background: bg }}
                    />
                    <div className="brand-identity__swatch-label">{name}</div>
                    <div className="brand-identity__swatch-hex">{hex}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="brand-identity__image">
              <img src={IDENTITY_IMG} alt="Nexyos team collaboration" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation highlights */}
      <section className="brand-innovation">
        <div className="container">
          <div className="brand-section-head">
            <p className="brand-section-head__label">Innovation</p>
            <h2 className="brand-section-head__title">Brand Milestones</h2>
            <p className="brand-section-head__desc">
              Key moments that shaped the Nexyos brand and expanded our global footprint.
            </p>
          </div>
          <div className="brand-innovation__grid">
            {INNOVATION_HIGHLIGHTS.map(({ year, title, text, image }) => (
              <article key={title} className="brand-innovation__card">
                <img src={image} alt={title} loading="lazy" />
                <div className="brand-innovation__card-body">
                  <p className="brand-innovation__card-year">{year}</p>
                  <h3 className="brand-innovation__card-title">{title}</h3>
                  <p className="brand-innovation__card-text">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Global presence */}
      <section className="brand-global">
        <img src={WORLD_MAP} alt="" className="brand-global__map" aria-hidden />
        <div className="container brand-global__inner">
          <p className="brand-section-head__label" style={{ color: '#5eead4' }}>
            Global Brand
          </p>
          <h2 className="brand-section-head__title" style={{ color: '#fff' }}>
            Trusted Worldwide
          </h2>
          <p className="brand-section-head__desc" style={{ color: 'rgba(255,255,255,0.8)' }}>
            The Nexyos brand reaches partners and customers across continents — united by a
            shared commitment to intelligent sensing.
          </p>
          <div className="brand-global__stats">
            {GLOBAL_STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="brand-global__stat-value">{value}</div>
                <div className="brand-global__stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="brand-cta">
        <div className="container">
          <h2 className="brand-cta__title">Experience the Nexyos Brand</h2>
          <p className="brand-cta__desc">
            Explore our products, partner with us, or get in touch to learn how Making Sensing
            Matter can transform your business.
          </p>
          <div className="brand-cta__links">
            <Link to="/company/aboutUs" className="brand-cta__btn brand-cta__btn--outline">
              About Us
            </Link>
            <Link to="/Partner/becomePartner" className="brand-cta__btn brand-cta__btn--primary">
              Become a Partner <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Contact interestMode="area" />
    </div>
  );
}
