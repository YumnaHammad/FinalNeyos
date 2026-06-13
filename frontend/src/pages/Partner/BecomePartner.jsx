import { Link } from 'react-router-dom';
import Contact from '../../components/Contact';
import PartnerSection from '../../components/Partner/BecomePartner/PartnerSection';
import Partnership from '../../components/Partner/BecomePartner/Partnership';
import Application from '../../components/Partner/BecomePartner/Application';
import CallToAction from '../../components/Partner/BecomePartner/CallToAction';
import PartnerDetailLayout, {
  PartnerDetailSection,
  PartnerTypeCards,
  PartnerWhySection,
} from '../../components/Partner/PartnerDetailLayout';
import { BECOME_PARTNER_WHY, PARTNER_TYPES } from '../../config/partnerContent';
import { getPartnerMeta } from '../../config/partnerNav';

const META = getPartnerMeta('/Partner/BecomePartner');

export default function BecomePartner() {
  return (
    <PartnerDetailLayout
      title="Become a Nexyos Partner"
      shortTitle={META.label}
      subtitle="Join our global partner network and grow with sales, marketing, and technical support across IoT and video surveillance."
      image={META.heroImage}
      badge={META.groupTitle}
      relatedGroupId="programs"
      actions={
        <a href="#apply" className="partner-detail__btn partner-detail__btn--primary">
          Start application
        </a>
      }
    >
      <PartnerSection />

      <PartnerDetailSection title="Choose your partnership path" lead="Nexyos offers flexible programs tailored to how you go to market.">
        <PartnerTypeCards items={PARTNER_TYPES} />
      </PartnerDetailSection>

      <PartnerWhySection
        heading={BECOME_PARTNER_WHY.heading}
        items={BECOME_PARTNER_WHY.subHeadings}
        image={BECOME_PARTNER_WHY.image}
      />

      <Partnership />

      <div id="apply">
        <Application />
      </div>

      <CallToAction />

      <PartnerDetailSection alt>
        <p className="text-center text-muted mb-3">Looking for a local reseller?</p>
        <div className="text-center">
          <Link to="/Partner/FindChannel" className="partner-detail__btn partner-detail__btn--primary" style={{ width: 'auto', display: 'inline-flex' }}>
            Find a channel partner
          </Link>
        </div>
      </PartnerDetailSection>

      <Contact interestMode="area" />
    </PartnerDetailLayout>
  );
}
