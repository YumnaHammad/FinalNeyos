import React, { useState, useEffect } from 'react';
import API, { resolveMediaUrl } from '../../api';
import SectionHeader from '../ui/SectionHeader';

const DEFAULT_PARTNERS = [
  { head: 'Hikvision' },
  { head: 'Milesight' },
  { head: 'Dahua Technology' },
  { head: 'Nexyos Global' },
  { head: 'IoT Solutions Inc' },
  { head: 'Smart Security Partners' },
];

const normalizePartners = (content) => {
  if (!Array.isArray(content) || content.length === 0) return DEFAULT_PARTNERS;
  return content
    .filter((item) => item?.head || item?.name)
    .map((item, index) => ({
      id: item._id || index,
      head: item.head || item.name,
      logo: resolveMediaUrl(item.logo || ''),
    }));
};

const PartnersSection = () => {
  const [partners, setPartners] = useState(DEFAULT_PARTNERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/sec/6')
      .then((res) => {
        const items = normalizePartners(res.data?.content);
        if (items.length > 0) setPartners(items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="landing-section landing-section--dark">
        <div className="landing-loader">
          <div className="landing-spinner" style={{ borderTopColor: '#5eead4' }} />
        </div>
      </section>
    );
  }

  return (
    <section className="landing-section landing-section--dark">
      <div className="landing-container">
        <SectionHeader
          badge="Global Network"
          title="Channel Partners"
          subtitle="Trusted partners delivering Nexyos solutions worldwide."
          light
        />

        <div className="landing-partners-grid">
          {partners.map((partner, index) => (
            <div key={partner.id ?? index} className="landing-partner-pill">
              {partner.logo ? (
                <img src={partner.logo} alt={partner.head} />
              ) : (
                <span>{partner.head}</span>
              )}
            </div>
          ))}
        </div>

        <div className="landing-partners-stats">
          <div className="landing-partners-stat">
            <span className="landing-partners-stat__num">{partners.length}+</span>
            <span className="landing-partners-stat__label">Partners</span>
          </div>
          <div className="landing-partners-stat">
            <span className="landing-partners-stat__num">50+</span>
            <span className="landing-partners-stat__label">Countries</span>
          </div>
          <div className="landing-partners-stat">
            <span className="landing-partners-stat__num">24/7</span>
            <span className="landing-partners-stat__label">Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
