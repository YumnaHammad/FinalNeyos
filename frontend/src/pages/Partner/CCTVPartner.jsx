import { Link } from 'react-router-dom';
import Contact from '../../components/Contact';
import PartnerDetailLayout, {
  PartnerBenefitsGrid,
  PartnerDetailSection,
  PartnerHighlightSection,
  PartnerSolutionsStrip,
  PartnerStatsRow,
  PartnerWhySection,
} from '../../components/Partner/PartnerDetailLayout';
import { CCTV_CONTENT } from '../../config/partnerContent';
import { getPartnerMeta } from '../../config/partnerNav';

const META = getPartnerMeta('/Partner/CCTVChannel');
const { highlight, why, solutions, benefits } = CCTV_CONTENT;

export default function CCTVPartner() {
  return (
    <PartnerDetailLayout
      title="CCTV Channel Partner Program"
      shortTitle={META.label}
      subtitle="Deliver cutting-edge video surveillance solutions with Nexyos cameras, NVRs, analytics, and channel support."
      image={META.heroImage}
      badge={META.groupTitle}
      relatedGroupId="programs"
      actions={
        <>
          <Link to="/Partner/BecomePartner" className="partner-detail__btn partner-detail__btn--primary">
            Become a partner
          </Link>
          <Link to="/Partner/FindChannel" className="partner-detail__btn partner-detail__btn--ghost">
            Find a partner
          </Link>
        </>
      }
    >
      <PartnerStatsRow
        stats={[
          { value: '200+', label: 'Camera models' },
          { value: '92+', label: 'Countries' },
          { value: '24/7', label: 'Partner support' },
        ]}
      />

      <PartnerHighlightSection {...highlight} />

      <PartnerWhySection heading={why.heading} items={why.subHeadings} image={why.image} />

      <PartnerSolutionsStrip
        title="CCTV Solutions & Products"
        lead="HD IP cameras, NVR systems, intelligent video analytics, and cloud solutions for every deployment size."
        items={solutions}
      />

      <PartnerBenefitsGrid
        title="Channel Partner Benefits"
        subtitle="Advantages of becoming a Nexyos CCTV channel partner"
        items={benefits}
      />

      <Contact interestMode="area" />
    </PartnerDetailLayout>
  );
}
