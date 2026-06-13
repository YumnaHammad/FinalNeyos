import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ContactSection from '../components/Inquiry/ContactSection';
import '../styles/DemoPage.css';

const HERO_BG =
  'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1920';

const HERO_DEVICES =
  'https://www.milesight.com/static/pc/en/online-demo-collection/online-demo-devices.png?t=1744191186348';

const DEMO_CATEGORIES = [
  {
    id: 'video',
    label: 'Video Surveillance',
    icon: 'https://www.milesight.com/static/pc/en/online-demo-collection/network-camera.png',
    featureTitle: 'Enhance Your Video Intelligence',
    featureDesc:
      'Experience AI-powered video surveillance with multi-sensor cameras, PTZ control, NVR management, and real-time analytics. Explore how Nexyos helps you monitor, detect, and respond faster across every site.',
    featureImage:
      'https://www.milesight.com/static/pc/en/online-demo-collection/video-surveillance-screens.png?t=1744191186348',
    ctaTitle: 'Nexyos AI Video Platform',
    learnMoreLink: '/solution',
    mainDemo: {
      title: 'Nexyos AI Video Platform',
      username: 'nexyos',
      password: 'nexyos2024',
      link: 'http://ipc.nexyos.com:18082/',
      bgImage:
        'https://www.milesight.com/static/pc/en/online-demo-collection/network-camera.png',
    },
    scenarios: [
      {
        title: 'Traffic Management',
        image:
          'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
        link: 'http://ipc.nexyos.com:18082/',
      },
      {
        title: 'Retail Analytics',
        image:
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
        link: 'http://ipc.nexyos.com:18082/',
      },
      {
        title: 'Perimeter Security',
        image:
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
        link: 'http://ipc.nexyos.com:18082/',
      },
      {
        title: 'Smart Parking',
        image:
          'https://images.unsplash.com/photo-1506521781263-da8787639f65?auto=format&fit=crop&w=600&q=80',
        link: 'http://ipc.nexyos.com:18082/',
      },
      {
        title: 'Industrial Monitoring',
        image:
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
        link: 'http://ipc.nexyos.com:18082/',
      },
      {
        title: 'Campus Safety',
        image:
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
        link: 'http://ipc.nexyos.com:18082/',
      },
    ],
  },
  {
    id: 'iot',
    label: 'Nexyos IoT Cloud',
    icon: 'https://www.milesight.com/static/pc/en/online-demo-collection/iot-cloud.png?t=1744191186348',
    featureTitle: 'Enhance Your On-Cloud Decision Making',
    featureDesc:
      'Manage LoRaWAN devices, dashboards, and automations in a single interface. Understand how data flows from edge sensors to cloud analytics — and make smarter operational decisions in real time.',
    featureImage:
      'https://www.milesight.com/static/pc/en/online-demo-collection/iot-cloud-screens.png?t=1744191186348',
    ctaTitle: 'Nexyos IoT Cloud',
    learnMoreLink: '/solution/smart-space',
    mainDemo: {
      title: 'Nexyos IoT Cloud',
      username: 'nexyos',
      password: 'nexyos2024',
      link: 'http://iot.nexyos.com:18084/',
      bgImage:
        'https://www.milesight.com/static/pc/en/online-demo-collection/iot-cloud.png?t=1744191186348',
    },
    scenarios: [
      {
        title: 'Indoor Air Quality',
        image:
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
        link: 'http://iot.nexyos.com:18084/',
      },
      {
        title: 'Waste Management',
        image:
          'https://images.unsplash.com/photo-1530587191325-3db51d754f88?auto=format&fit=crop&w=600&q=80',
        link: 'http://iot.nexyos.com:18084/',
      },
      {
        title: 'Smart City',
        image:
          'https://images.unsplash.com/photo-1477959858987-667251144274?auto=format&fit=crop&w=600&q=80',
        link: 'http://iot.nexyos.com:18084/',
      },
      {
        title: 'Smart Agriculture',
        image:
          'https://images.unsplash.com/photo-1625246333195-78d9c038adbc?auto=format&fit=crop&w=600&q=80',
        link: 'http://iot.nexyos.com:18084/',
      },
      {
        title: 'Smart Building',
        image:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
        link: 'http://iot.nexyos.com:18084/',
      },
      {
        title: 'Smart Space & People Counting',
        image:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        link: 'http://iot.nexyos.com:18084/',
      },
    ],
  },
  {
    id: 'gateway',
    label: 'LoRaWAN Gateway',
    icon: 'https://www.milesight.com/static/pc/en/online-demo-collection/ug63-sg50-online-demo.png?t=1744191186348',
    featureTitle: 'Scale Your IoT Network With Confidence',
    featureDesc:
      'Test gateway provisioning, packet inspection, and multi-tenant management. Validate how quickly you can bring LoRaWAN devices online and maintain reliable connectivity across large deployments.',
    featureImage:
      'https://www.milesight.com/static/pc/en/online-demo-collection/ug63-sg50-online-demo.png?t=1744191186348',
    ctaTitle: 'LoRaWAN Gateway Demo',
    learnMoreLink: '/solution',
    mainDemo: {
      title: 'LoRaWAN Gateway Console',
      username: 'nexyos',
      password: 'nexyos2024',
      link: 'http://ptz.nexyos.com:18081/',
      bgImage:
        'https://www.milesight.com/static/pc/en/online-demo-collection/ug63-sg50-online-demo.png?t=1744191186348',
    },
    scenarios: [
      {
        title: 'Gateway Provisioning',
        image:
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
        link: 'http://ptz.nexyos.com:18081/',
      },
      {
        title: 'Network Diagnostics',
        image:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        link: 'http://ptz.nexyos.com:18081/',
      },
      {
        title: 'Multi-Site Deployment',
        image:
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
        link: 'http://ptz.nexyos.com:18081/',
      },
      {
        title: 'Device Onboarding',
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        link: 'http://ptz.nexyos.com:18081/',
      },
      {
        title: 'Packet Monitoring',
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        link: 'http://ptz.nexyos.com:18081/',
      },
      {
        title: 'Edge Integration',
        image:
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        link: 'http://ptz.nexyos.com:18081/',
      },
    ],
  },
  {
    id: 'router',
    label: '5G/4G Router',
    icon: 'https://www.milesight.com/static/pc/en/online-demo-collection/cerllular-router.svg?t=1744191186348',
    featureTitle: 'Connect Every Edge With Reliable Cellular',
    featureDesc:
      'Experience remote management, VPN configuration, and traffic analytics for enterprise edge connectivity. See how Nexyos routers keep critical infrastructure online wherever you deploy.',
    featureImage:
      'https://www.milesight.com/static/pc/en/online-demo-collection/cerllular-router.svg?t=1744191186348',
    ctaTitle: '5G/4G Industrial Router',
    learnMoreLink: '/solution',
    mainDemo: {
      title: '5G/4G Industrial Router',
      username: 'nexyos',
      password: 'nexyos2024',
      link: 'http://nvr.nexyos.com:18089/',
      bgImage:
        'https://www.milesight.com/static/pc/en/online-demo-collection/cerllular-router.svg?t=1744191186348',
    },
    scenarios: [
      {
        title: 'Remote Site Connectivity',
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
        link: 'http://nvr.nexyos.com:18089/',
      },
      {
        title: 'VPN & Security',
        image:
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
        link: 'http://nvr.nexyos.com:18089/',
      },
      {
        title: 'Traffic Analytics',
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        link: 'http://nvr.nexyos.com:18089/',
      },
      {
        title: 'Failover & Redundancy',
        image:
          'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80',
        link: 'http://nvr.nexyos.com:18089/',
      },
      {
        title: 'Fleet Management',
        image:
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
        link: 'http://nvr.nexyos.com:18089/',
      },
      {
        title: 'Industrial IoT Backhaul',
        image:
          'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80',
        link: 'http://nvr.nexyos.com:18089/',
      },
    ],
  },
];

export default function DemoPage() {
  const [activeId, setActiveId] = useState('iot');

  const active = DEMO_CATEGORIES.find((c) => c.id === activeId) || DEMO_CATEGORIES[1];

  return (
    <div className="demo-page">
      {/* Hero */}
      <section className="demo-hero">
        <img src={HERO_BG} alt="" className="demo-hero__bg" aria-hidden />
        <div className="demo-hero__overlay" aria-hidden />
        <div className="container demo-hero__inner">
          <div data-aos="fade-right">
            <h1 className="demo-hero__title">Online Demo</h1>
            <p className="demo-hero__subtitle">
              Click to experience the powerful performance and explore more possibilities of IoT and
              Video Surveillance.
            </p>
          </div>
          <div data-aos="fade-left" data-aos-delay="100">
            <img
              src={HERO_DEVICES}
              alt="Nexyos demo on laptop, monitor, tablet and phone"
              className="demo-hero__devices"
            />
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="demo-categories">
        <div className="container">
          <ul className="demo-categories__list" role="tablist">
            {DEMO_CATEGORIES.map((cat) => (
              <li key={cat.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeId === cat.id}
                  className={`demo-categories__btn${activeId === cat.id ? ' demo-categories__btn--active' : ''}`}
                  onClick={() => setActiveId(cat.id)}
                >
                  <span className="demo-categories__icon">
                    <img src={cat.icon} alt="" />
                  </span>
                  <span className="demo-categories__label">{cat.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Feature highlight */}
      <section className="demo-feature" key={`feature-${activeId}`}>
        <div className="container">
          <h2 className="demo-feature__title" data-aos="fade-up">
            {active.featureTitle}
          </h2>
          <p className="demo-feature__desc" data-aos="fade-up" data-aos-delay="50">
            {active.featureDesc}
          </p>
          <div className="demo-feature__visual" data-aos="fade-up" data-aos-delay="100">
            <div className="demo-feature__screens">
              <img src={active.featureImage} alt={active.featureTitle} />
            </div>
            <div className="demo-feature__cta-box">
              <h3>{active.ctaTitle}</h3>
              <Link to={active.learnMoreLink} className="demo-feature__learn-more">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo grid */}
      <section className="demo-grid-section">
        <div className="container">
          <div className="demo-grid" key={`grid-${activeId}`}>
            <div className="demo-grid__main" data-aos="fade-right">
              <img
                src={active.mainDemo.bgImage}
                alt=""
                className="demo-grid__main-bg"
                aria-hidden
              />
              <div className="demo-grid__main-content">
                <h3>{active.mainDemo.title}</h3>
                <p className="demo-grid__creds">
                  <strong>Username:</strong> {active.mainDemo.username}
                  <br />
                  <strong>Password:</strong> {active.mainDemo.password}
                </p>
                <a
                  href={active.mainDemo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo-grid__trial"
                >
                  Free Trial <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {active.scenarios.map((scenario, i) => (
              <a
                key={scenario.title}
                href={scenario.link}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-grid__card"
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                <img src={scenario.image} alt={scenario.title} />
                <div className="demo-grid__card-overlay">
                  <p className="demo-grid__card-title">{scenario.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        showSidebar={false}
        interestMode="area"
        defaultInterest={active.label}
      />
    </div>
  );
}
