import { Link } from 'react-router-dom';
import PartnerChannelFinder from '../../components/Partner/PartnerChannelFinder';
import Contact from '../../components/Contact';
import PartnerDetailLayout, {
  PartnerDetailSection,
  PartnerStepsGrid,
} from '../../components/Partner/PartnerDetailLayout';
import { getPartnerMeta } from '../../config/partnerNav';

const META = getPartnerMeta('/Partner/FindChannel');

const STEPS = [
  {
    title: 'Search by region',
    description: 'Browse authorized partners filtered by country, city, or territory.',
  },
  {
    title: 'Compare capabilities',
    description: "Review each partner's focus areas — surveillance, IoT, integration, and support.",
  },
  {
    title: 'Connect directly',
    description: 'Reach out for quotes, demos, and local project assistance.',
  },
];

export default function FindChannel() {
  return (
    <PartnerDetailLayout
      title="Find a Channel Partner"
      shortTitle={META.label}
      subtitle="Locate Nexyos authorized resellers and integrators worldwide for local sales, deployment, and support."
      image={META.heroImage}
      badge={META.groupTitle}
      relatedGroupId="ecosystem"
      actions={
        <a href="#partners" className="partner-detail__btn partner-detail__btn--primary">
          Browse partners
        </a>
      }
    >
      <PartnerDetailSection
        title="How to find the right partner"
        lead="Work with certified Nexyos partners who know your market and can deliver end-to-end solutions."
      >
        <PartnerStepsGrid steps={STEPS} />
      </PartnerDetailSection>

      <div id="partners">
        <PartnerChannelFinder />
      </div>

      <PartnerDetailSection alt title="Not listed yet?">
        <p className="text-center text-muted mb-4">
          Become an authorized partner or register a project for dedicated support.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/Partner/BecomePartner" className="partner-detail__btn partner-detail__btn--primary" style={{ width: 'auto' }}>
            Become a partner
          </Link>
          <Link to="/Partner/ProjectRegistration" className="partner-detail__btn partner-detail__btn--ghost" style={{ width: 'auto', color: '#006071', border: '1.5px solid #006071', background: '#fff' }}>
            Project registration
          </Link>
        </div>
      </PartnerDetailSection>

      <Contact interestMode="area" />
    </PartnerDetailLayout>
  );
}
