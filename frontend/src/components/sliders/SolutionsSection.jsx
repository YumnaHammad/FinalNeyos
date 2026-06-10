import React, { useState, useEffect } from 'react';
import API, { resolveMediaUrl } from '../../api';
import SectionHeader from '../ui/SectionHeader';

const DEFAULT_SOLUTIONS = [
  {
    key: 0,
    title: 'Smart Office',
    description:
      'Enhancing workplace efficiency with smart technology solutions by integrating AI-driven automation and real-time data monitoring.',
    image:
      'https://www.milesight.com/static/pc/en/index-new/solution/people-counting.jpg?t=1742785778708',
  },
  {
    key: 1,
    title: 'Smart Restroom',
    description:
      'Improving hygiene, reducing waste, and facilitating maintenance through sensor-based monitoring and real-time occupancy tracking.',
    image:
      'https://www.milesight.com/static/pc/en/index-new/solution/indoor-air-quality.jpg?t=1742785778708',
  },
  {
    key: 2,
    title: 'Video Surveillance',
    description:
      'Advanced monitoring solutions with AI-powered video analytics, facial recognition, and 24/7 surveillance.',
    image: '/assets/images/bg/smart-restroom.jpg',
  },
];

const normalizeSolutions = (content) => {
  if (!Array.isArray(content) || content.length === 0) return DEFAULT_SOLUTIONS;
  return content
    .filter((item) => item?.title)
    .map((item, index) => ({
      key: item._id || index,
      title: item.title,
      description: item.description || item.desc || '',
      image: resolveMediaUrl(item.image || ''),
    }));
};

const SolutionsSection = () => {
  const [data, setData] = useState(DEFAULT_SOLUTIONS);
  const [selected, setSelected] = useState(DEFAULT_SOLUTIONS[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/sec/5')
      .then((res) => {
        const items = normalizeSolutions(res.data?.content);
        if (items.length > 0) {
          setData(items);
          setSelected(items[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="landing-section landing-section--white">
        <div className="landing-loader">
          <div className="landing-spinner" />
        </div>
      </section>
    );
  }

  if (data.length === 0) return null;

  return (
    <section className="landing-section landing-section--white">
      <div className="landing-container">
        <SectionHeader
          badge="What We Offer"
          title="Solutions"
          subtitle="Nexyos provides a range of solutions to empower a more productive and effective society."
        />

        <div className="landing-solutions-layout">
          <div className="landing-solution-tabs">
            {data.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`landing-solution-tab ${selected.key === item.key ? 'landing-solution-tab--active' : ''}`}
                onClick={() => setSelected(item)}
              >
                {item.image && (
                  <img src={item.image} alt="" className="landing-solution-tab__thumb" />
                )}
                <span className="landing-solution-tab__title">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="landing-solution-feature">
            {selected.image && (
              <img src={selected.image} alt={selected.title} className="landing-solution-feature__img" />
            )}
            <div className="landing-solution-feature__content">
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
