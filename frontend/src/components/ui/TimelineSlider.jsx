import React, { useState, useEffect } from 'react';
import API from '../../api';
import SectionHeader from '../ui/SectionHeader';

const DEFAULT_BLOCK = {
  title: 'Success Stories',
  desc: 'Real-World Impact Of Our IoT Solutions.',
  image:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',
};

const TimelineSlider = () => {
  const [block, setBlock] = useState(DEFAULT_BLOCK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/sec/4')
      .then((res) => {
        const content = res.data?.content;
        const item = Array.isArray(content) ? content[0] : content;
        if (item) {
          setBlock({
            title: item.title || item.head || DEFAULT_BLOCK.title,
            desc:
              item.desc ||
              item.description ||
              item.subtitle ||
              DEFAULT_BLOCK.desc,
            image: item.image || DEFAULT_BLOCK.image,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="landing-section landing-section--muted">
        <div className="landing-loader">
          <div className="landing-spinner" />
        </div>
      </section>
    );
  }

  return (
    <section className="landing-section landing-section--muted">
      <div className="landing-container">
        <SectionHeader
          badge="Case Studies"
          title="Success Stories"
          subtitle="Nexyos has built a strong reputation with success stories across industries worldwide."
        />

        <article className="landing-success-card">
          <div className="landing-success-card__media">
            <img src={block.image} alt={block.title} />
          </div>
          <div className="landing-success-card__body">
            <h3>{block.title}</h3>
            <p>{block.desc}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default TimelineSlider;
