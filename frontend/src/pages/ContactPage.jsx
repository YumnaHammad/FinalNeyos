import { Link } from 'react-router-dom';
import {
  Building2,
  ChevronRight,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Users,
} from 'lucide-react';
import ContactSection from '../components/Inquiry/ContactSection';
import '../styles/ContactPage.css';

const HERO_BG =
  'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920';

const CHANNELS = [
  {
    icon: ShoppingBag,
    title: 'Sales Inquiry',
    description: 'Product quotes, pricing, and project discussions.',
    href: '/sales-inquiry',
    linkText: 'Contact sales',
    external: false,
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    description: 'Installation help, troubleshooting, and RMA requests.',
    href: 'mailto:support@nexyos.com',
    linkText: 'support@nexyos.com',
    external: true,
  },
  {
    icon: Users,
    title: 'Partner Program',
    description: 'Become a reseller, integrator, or technology partner.',
    href: '/Partner/becomePartner',
    linkText: 'Partner with us',
    external: false,
  },
  {
    icon: Mail,
    title: 'General Inquiry',
    description: 'Press, careers, and other general questions.',
    href: 'mailto:info@nexyos.com',
    linkText: 'info@nexyos.com',
    external: true,
  },
];

const OFFICES = [
  {
    region: 'Middle East',
    name: 'Nexyos — Qatar Office',
    address: '4th Floor, Office 4, Building 20, Muntazah, Zone 24, Doha, Qatar',
    phone: '+974 0000 0000',
    email: 'info@nexyos.com',
    hours: 'Sun – Thu, 9:00 – 18:00',
    image:
      'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  },
  {
    region: 'South Asia',
    name: 'Nexyos — India Office',
    address: 'Near Police Station Road, Koyilandy, Kerala 673305, India',
    phone: '+91 8008008841',
    email: 'info@nexyos.com',
    hours: 'Mon – Sat, 10:00 – 18:00',
    image:
      'https://images.pexels.com/photos/1486223/pexels-photo-1486223.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  },
];

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <img src={HERO_BG} alt="" className="contact-hero__bg" aria-hidden />
        <div className="contact-hero__overlay" aria-hidden />
        <div className="container contact-hero__inner">
          <p className="contact-hero__eyebrow">Get in touch</p>
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__desc">
            Whether you need product information, technical support, or partnership details — our
            global team is ready to help you find the right AIoT solution.
          </p>
        </div>
      </section>

      <section className="contact-channels">
        <div className="container">
          <div className="contact-channels__grid">
            {CHANNELS.map(({ icon: Icon, title, description, href, linkText, external }) =>
              external ? (
                <a key={title} href={href} className="contact-channel">
                  <div className="contact-channel__icon">
                    <Icon size={22} />
                  </div>
                  <h2 className="contact-channel__title">{title}</h2>
                  <p className="contact-channel__desc">{description}</p>
                  <span className="contact-channel__link">{linkText}</span>
                </a>
              ) : (
                <Link key={title} to={href} className="contact-channel">
                  <div className="contact-channel__icon">
                    <Icon size={22} />
                  </div>
                  <h2 className="contact-channel__title">{title}</h2>
                  <p className="contact-channel__desc">{description}</p>
                  <span className="contact-channel__link">
                    {linkText} <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <div className="container contact-form-intro">
        <h2 className="contact-form-intro__title">Send Us a Message</h2>
        <p className="contact-form-intro__desc">
          Fill out the form below and a Nexyos representative will respond within one business day.
        </p>
      </div>

      <ContactSection interestMode="area" />

      <section className="contact-offices">
        <div className="container">
          <div className="contact-offices__head">
            <p className="contact-offices__label">Our Offices</p>
            <h2 className="contact-offices__title">Visit or Reach Us Globally</h2>
            <p className="contact-offices__desc">
              Nexyos serves partners and customers across 90+ countries with regional offices and
              dedicated support channels.
            </p>
          </div>
          <div className="contact-offices__grid">
            {OFFICES.map((office) => (
              <article key={office.name} className="contact-office">
                <div className="contact-office__image">
                  <img src={office.image} alt={office.name} loading="lazy" />
                </div>
                <div className="contact-office__body">
                  <p className="contact-office__region">{office.region}</p>
                  <h3 className="contact-office__name">{office.name}</h3>
                  <div className="contact-office__row">
                    <MapPin size={16} />
                    <span>{office.address}</span>
                  </div>
                  <div className="contact-office__row">
                    <Phone size={16} />
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a>
                  </div>
                  <div className="contact-office__row">
                    <Mail size={16} />
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </div>
                  <div className="contact-office__row">
                    <Clock size={16} />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-help">
        <div className="container">
          <Building2 size={32} style={{ margin: '0 auto 1rem', opacity: 0.9 }} />
          <h2 className="contact-help__title">Need Something Else?</h2>
          <p className="contact-help__desc">
            Explore our online demo, partner programs, or browse product documentation for
            self-service resources.
          </p>
          <div className="contact-help__links">
            <Link to="/demo" className="contact-help__btn contact-help__btn--primary">
              Online Demo
            </Link>
            <Link to="/Partner/becomePartner" className="contact-help__btn contact-help__btn--outline">
              Become a Partner
            </Link>
            <Link to="/company/aboutUs" className="contact-help__btn contact-help__btn--outline">
              About Nexyos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
