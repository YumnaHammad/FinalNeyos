import { useState } from 'react';
import { Link } from 'react-router-dom';
import Contact from '../../components/Contact';
import PartnerDetailLayout, {
  PartnerBenefitsGrid,
  PartnerDetailSection,
  PartnerSolutionsStrip,
  PartnerStatsRow,
} from '../../components/Partner/PartnerDetailLayout';
import { getPartnerMeta } from '../../config/partnerNav';

const META = getPartnerMeta("/Partner/ChannelPartner");

const BENEFITS = [
  { id: 1, title: 'Sales enablement', description: 'Training, collateral, and lead-sharing to win more deals.' },
  { id: 2, title: 'Marketing support', description: 'Co-branded campaigns, event kits, and digital assets.' },
  { id: 3, title: 'Technical backing', description: 'Pre-sales engineering, demos, and deployment guidance.' },
  { id: 4, title: 'Protected margins', description: 'Competitive pricing tiers and project registration options.' },
];

const INNOVATIONS = [
  { id: 1, heading: 'AI Video Analytics', description: 'Edge AI for real-time detection and classification.', image: 'https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309' },
  { id: 2, heading: 'Heat Mapping', description: 'Visualize occupancy and traffic patterns.', image: 'https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309' },
  { id: 3, heading: 'IoT Sensors', description: 'LoRaWAN devices for smart environments.', image: 'https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309' },
  { id: 4, heading: 'Smart Buildings', description: 'Integrated sensing for modern facilities.', image: 'https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309' },
];

export default function ChannelPartner() {
  const [currentImage, setCurrentImage] = useState('default');

  const images = {
    default: META.heroImage,
    sensing: META.heroImage,
    exhibitions: "https://www.milesight.com/static/pc/en/company/partner-program/milesight-at-glance.png?t=1746582988309",
    industries: "https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703",
  };

  const whyItems = [
    { key: "sensing", title: "Cutting-Edge Sensing Products", desc: "Serving millions worldwide with IoT and video solutions." },
    { key: "exhibitions", title: "Global Industry Presence", desc: "Active at leading security and IoT exhibitions." },
    { key: "industries", title: "Multi-Industry Expertise", desc: "Proven deployments across cities, retail, healthcare, and more." },
  ];

  return (
    <PartnerDetailLayout
      title="Nexyos Channel Partner Program"
      shortTitle={META.label}
      subtitle="A flexible platform for profitable growth with committed sales, marketing, and technical support."
      image={META.heroImage}
      badge={META.groupTitle}
      relatedGroupId="ecosystem"
      actions={
        <>
          <Link to="/Partner/BecomePartner" className="partner-detail__btn partner-detail__btn--primary">
            Apply now
          </Link>
          <Link to="/Partner/FindChannel" className="partner-detail__btn partner-detail__btn--ghost">
            Find a partner
          </Link>
        </>
      }
    >
      <PartnerStatsRow
        stats={[
          { value: "1200+", label: "Global partners" },
          { value: "80+", label: "Countries" },
          { value: "24/7", label: "Partner support" },
        ]}
      />

      <PartnerDetailSection alt title="Built for channel success" lead="Nexyos partners access a broad portfolio of IoT and video surveillance products designed to outperform in competitive markets.">
        <div className="row align-items-center g-4">
          <div className="col-lg-5">
            <img src={images.default} alt="Nexyos Partner" className="img-fluid rounded-4 shadow-sm" />
          </div>
          <div className="col-lg-7">
            <p className="text-muted mb-0 lh-lg">
              The Nexyos Partner Program supports distributors and resellers with insights across Internet of Things and video surveillance. Partners receive committed sales, marketing, and technical support to address customer challenges and scale profitably.
            </p>
          </div>
        </div>
      </PartnerDetailSection>

      <PartnerDetailSection title="Why Nexyos?">
        <div className="row g-4">
          <div className="col-lg-5">
            {whyItems.map((item) => (
              <div
                key={item.key}
                className={`p-3 rounded-3 mb-2 cursor-pointer ${currentImage === item.key ? "bg-light border border-primary" : "border border-transparent"}`}
                onClick={() => setCurrentImage(item.key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setCurrentImage(item.key)}
              >
                <h3 className="h6 fw-bold mb-1">{item.title}</h3>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="col-lg-7">
            <img src={images[currentImage]} alt="" className="img-fluid rounded-4 shadow-sm" />
          </div>
        </div>
      </PartnerDetailSection>

      <PartnerBenefitsGrid
        title="Partner benefits"
        subtitle="Everything you need to win and deliver Nexyos solutions"
        items={BENEFITS}
      />

      <PartnerSolutionsStrip
        title="Technology innovations"
        lead="Strong R&D helps partners introduce innovative products and maximize business potential."
        items={INNOVATIONS}
      />

      <Contact interestMode="area" />
    </PartnerDetailLayout>
  );
}
