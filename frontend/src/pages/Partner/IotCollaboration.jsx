import { useState } from 'react';
import { Link } from 'react-router-dom';
import Contact from '../../components/Contact';
import PartnerDetailLayout, {
  PartnerDetailSection,
  PartnerSolutionsStrip,
} from '../../components/Partner/PartnerDetailLayout';
import { getPartnerMeta } from '../../config/partnerNav';

const META = getPartnerMeta('/Partner/IotCollaboration');

const IOT_SOLUTIONS = [
  {
    id: 1,
    heading: 'LoRaWAN Sensors',
    description: 'Environmental, occupancy, and asset tracking devices.',
    image: 'https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309',
  },
  {
    id: 2,
    heading: 'Smart Buildings',
    description: 'Integrated sensing for HVAC, lighting, and space management.',
    image: 'https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309',
  },
  {
    id: 3,
    heading: 'Data Analytics',
    description: 'Dashboards and alerts powered by Nexyos IoT Cloud.',
    image: 'https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309',
  },
  {
    id: 4,
    heading: 'Edge Gateway',
    description: 'Bridge field devices to cloud platforms securely.',
    image: 'https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309',
  },
];

const GUIDE_STEPS = [
  {
    title: 'Assess your use case',
    description: 'Identify sensing requirements, connectivity, and deployment scale for your IoT project.',
  },
  {
    title: 'Select Nexyos hardware',
    description: 'Choose from LoRaWAN sensors, gateways, and integration options aligned to your vertical.',
  },
  {
    title: 'Integrate & deploy',
    description: 'Use APIs, documentation, and partner support to go from pilot to production.',
  },
  {
    title: 'Scale with Nexyos Cloud',
    description: 'Monitor devices, configure rules, and manage fleets from a unified platform.',
  },
];

const tabContent = {
  sensing: {
    title: 'Cutting-Edge Sensing',
    text: 'Nexyos — leading provider of innovative IoT products for smart buildings, cities, and industry.',
    image:
      'https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/milesight-building.jpg',
  },
  exhibitions: {
    title: 'Global Exhibitions',
    text: 'Nexyos regularly exhibits at IoT World, ISC, and regional security events worldwide.',
    image:
      'https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703',
  },
  industries: {
    title: 'Industry Applications',
    text: 'Deploy across smart cities, retail, healthcare, agriculture, and industrial sites.',
    image:
      'https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/data.jpg',
  },
};

export default function IotCollaboration() {
  const [activeTab, setActiveTab] = useState('sensing');
  const content = tabContent[activeTab];

  return (
    <PartnerDetailLayout
      title="IoT Collaboration Start Guide"
      shortTitle={META.label}
      subtitle="Start building IoT solutions with Nexyos sensors, gateways, and open APIs — from pilot to production."
      image={META.heroImage}
      badge={META.groupTitle}
      relatedGroupId="ecosystem"
      actions={
        <Link to="/Partner/DeveloperPartner" className="partner-detail__btn partner-detail__btn--primary">
          Developer resources
        </Link>
      }
    >
      <PartnerDetailSection
        alt
        title="Collaborate with Nexyos IoT"
        lead="Access products, documentation, and partner support to deliver connected solutions faster."
      >
        <div className="row align-items-center g-4">
          <div className="col-lg-5">
            <img
              src="https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703"
              alt="Nexyos IoT"
              className="img-fluid rounded-4 shadow-sm"
            />
          </div>
          <div className="col-lg-7">
            <p className="text-muted mb-0 lh-lg">
              Nexyos provides a flexible platform for IoT partners with sales, marketing, and
              technical support. Build on our sensing portfolio and outperform in competitive
              markets with proven hardware and open integrations.
            </p>
          </div>
        </div>
      </PartnerDetailSection>

      <PartnerDetailSection title="Getting started in four steps">
        <div className="partner-steps">
          {GUIDE_STEPS.map((step, i) => (
            <div className="partner-steps__item" key={step.title}>
              <span className="partner-steps__num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </PartnerDetailSection>

      <PartnerDetailSection alt title="Why Nexyos for IoT?">
        <div className="row g-4">
          <div className="col-md-4">
            {Object.entries(tabContent).map(([key, item]) => (
              <button
                type="button"
                key={key}
                className={`d-block w-100 text-start p-3 rounded-3 mb-2 border ${activeTab === key ? 'border-primary bg-light' : 'border-transparent bg-white'}`}
                onClick={() => setActiveTab(key)}
              >
                <h3 className="h6 fw-bold mb-0">{item.title}</h3>
              </button>
            ))}
          </div>
          <div className="col-md-8">
            <img src={content.image} alt={content.title} className="img-fluid rounded-3 mb-3" />
            <p className="text-muted mb-0">{content.text}</p>
          </div>
        </div>
      </PartnerDetailSection>

      <PartnerSolutionsStrip
        title="IoT Technology Stack"
        lead="Hardware, connectivity, and cloud tools to accelerate your IoT deployments."
        items={IOT_SOLUTIONS}
      />

      <PartnerDetailSection title="Resources & documentation">
        <div className="row g-3">
          {[
            { title: 'Product catalog', desc: 'Browse LoRaWAN sensors, gateways, and accessories.' },
            { title: 'Integration guides', desc: 'Step-by-step docs for MQTT, HTTP, and cloud connectors.' },
            { title: 'Partner portal', desc: 'Access pricing, training, and marketing assets.' },
            { title: 'Technical support', desc: '24/7 assistance for registered IoT partners.' },
          ].map((r) => (
            <div className="col-md-6 col-lg-3" key={r.title}>
              <div className="partner-benefits__card h-100">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </PartnerDetailSection>

      <Contact interestMode="area" />
    </PartnerDetailLayout>
  );
}
