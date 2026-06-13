import { Link } from 'react-router-dom';
import Contact from '../../components/Contact';
import PartnerDetailLayout, {
  PartnerBenefitsGrid,
  PartnerHighlightSection,
  PartnerSolutionsStrip,
  PartnerStatsRow,
  PartnerWhySection,
} from '../../components/Partner/PartnerDetailLayout';
import { DEVELOPER_CONTENT } from '../../config/partnerContent';
import { getPartnerMeta } from '../../config/partnerNav';

const META = getPartnerMeta('/Partner/DeveloperPartner');
const { program, why, solutions, benefits } = DEVELOPER_CONTENT;

export default function DeveloperPartner() {
  return (
    <PartnerDetailLayout
      title="Developer Partner Program"
      shortTitle={META.label}
      subtitle="Build innovative solutions with Nexyos APIs, SDKs, and developer resources for IoT and video analytics."
      image={META.heroImage}
      badge={META.groupTitle}
      relatedGroupId="programs"
      actions={
        <>
          <Link to="/contact" className="partner-detail__btn partner-detail__btn--primary">
            Get API access
          </Link>
          <Link to="/Partner/IotCollaboration" className="partner-detail__btn partner-detail__btn--ghost">
            IoT start guide
          </Link>
        </>
      }
    >
      <PartnerStatsRow
        stats={[
          { value: '30+', label: 'APIs' },
          { value: '12', label: 'SDKs' },
          { value: '24/7', label: 'Dev support' },
        ]}
      />

      <PartnerHighlightSection
        badge={program.badge}
        heading={program.heading}
        description={program.description}
        image={program.image}
        stats={program.stats}
      />

      <PartnerWhySection heading={why.heading} items={why.subHeadings} image={why.image} />

      <PartnerSolutionsStrip
        title="Developer Tools & Resources"
        lead="APIs, SDKs, documentation, and testing tools to help developer partners build innovative solutions quickly."
        items={solutions}
      />

      <PartnerBenefitsGrid
        title="Developer Partner Benefits"
        subtitle="Exclusive benefits designed to accelerate your growth in the Nexyos ecosystem"
        items={benefits}
      />

      <Contact interestMode="area" />
    </PartnerDetailLayout>
  );
}
