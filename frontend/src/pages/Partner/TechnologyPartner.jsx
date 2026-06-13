import { Link } from 'react-router-dom';
import Contact from '../../components/Contact';
import PartnerDetailLayout, {
  PartnerBenefitsGrid,
  PartnerHighlightSection,
  PartnerSolutionsStrip,
  PartnerStatsRow,
  PartnerWhySection,
} from '../../components/Partner/PartnerDetailLayout';
import { TECHNOLOGY_CONTENT } from '../../config/partnerContent';
import { getPartnerMeta } from '../../config/partnerNav';

const META = getPartnerMeta('/Partner/TechnologyPartner');
const { highlight, why, solutions, benefits } = TECHNOLOGY_CONTENT;

export default function TechnologyPartner() {
  return (
    <PartnerDetailLayout
      title="Technology Partner Program"
      shortTitle={META.label}
      subtitle="Co-innovate with Nexyos across AI, IoT, cloud, and edge to deliver next-generation solutions."
      image={META.heroImage}
      badge={META.groupTitle}
      relatedGroupId="programs"
      actions={
        <>
          <Link to="/Partner/BecomePartner" className="partner-detail__btn partner-detail__btn--primary">
            Partner with us
          </Link>
          <Link to="/contact" className="partner-detail__btn partner-detail__btn--ghost">
            Explore opportunities
          </Link>
        </>
      }
    >
      <PartnerStatsRow
        stats={[
          { value: '50+', label: 'Integrations' },
          { value: '40+', label: 'Countries' },
          { value: '100+', label: 'Tech allies' },
        ]}
      />

      <PartnerHighlightSection {...highlight} />

      <PartnerWhySection heading={why.heading} items={why.subHeadings} image={why.image} />

      <PartnerSolutionsStrip
        title="Technology Solutions & Capabilities"
        lead="Collaborate across AI, IoT, cloud computing, and edge processing to address complex business challenges."
        items={solutions}
      />

      <PartnerBenefitsGrid
        title="Partnership Benefits"
        subtitle="Discover the advantages of partnering with Nexyos"
        items={benefits}
      />

      <Contact interestMode="area" />
    </PartnerDetailLayout>
  );
}
