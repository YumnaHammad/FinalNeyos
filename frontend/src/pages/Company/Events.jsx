import { useEffect, useMemo, useState } from 'react';
import { Calendar, ChevronRight, Loader2, MapPin, Radio, User, Video } from 'lucide-react';
import API, { resolveMediaUrl } from '../../api';
import Contact from '../../components/Contact';
import '../../styles/EventsPage.css';

const HERO_BG =
  'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1920';

const TAB_ICONS = {
  All: Radio,
  IoT: Radio,
  CCTV: Video,
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(['IoT', 'CCTV']);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const loadMeta = async () => {
      try {
        const res = await API.get('/events/meta');
        setCategories(res.data?.categories || ['IoT', 'CCTV']);
      } catch {
        setCategories(['IoT', 'CCTV']);
      }
    };
    loadMeta();
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const res = await API.get('/events', {
          params: activeTab !== 'All' ? { category: activeTab } : {},
        });
        setEvents(Array.isArray(res.data) ? res.data : res.data.items || []);
      } catch (err) {
        console.error('Failed to load events', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [activeTab]);

  const tabs = useMemo(() => ['All', ...categories], [categories]);

  const renderAction = (event) => {
    if (event.status === 'ended') {
      return (
        <span className="events-card__btn events-card__btn--disabled">Ended</span>
      );
    }
    if (event.status === 'coming_soon') {
      return (
        <span className="events-card__btn events-card__btn--soon">Coming Soon</span>
      );
    }
    if (event.registrationUrl) {
      return (
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="events-card__btn"
        >
          Register Now <ChevronRight size={16} />
        </a>
      );
    }
    return (
      <a href="/contact" className="events-card__btn">
        Register Now <ChevronRight size={16} />
      </a>
    );
  };

  return (
    <div className="events-page">
      <section className="events-hero" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div className="container">
          <h1 className="events-hero__title">
            Nexyos Upcoming <span>Events &amp; Exhibitions</span>
          </h1>
          <p className="events-hero__subtitle">
            Join us to explore leading-industry products and solutions.
          </p>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <div className="events-tabs" role="tablist">
            {tabs.map((tab) => {
              const Icon = TAB_ICONS[tab] || Radio;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  className={`events-tabs__btn${activeTab === tab ? ' events-tabs__btn--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab !== 'All' && <Icon className="events-tabs__icon" size={18} />}
                  {tab}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="events-empty">
              <Loader2 className="animate-spin text-[#006071]" size={32} />
            </div>
          ) : (
            <div className="events-grid">
              {events.length === 0 ? (
                <div className="events-empty">
                  <h3>No events found</h3>
                  <p>Check back soon for upcoming exhibitions and roadshows.</p>
                </div>
              ) : (
                events.map((event) => (
                  <article key={event._id} className="events-card">
                    <div className="events-card__logo">
                      {event.image ? (
                        <img src={resolveMediaUrl(event.image)} alt={event.title} loading="lazy" />
                      ) : (
                        <span style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.85rem' }}>
                          {event.title}
                        </span>
                      )}
                    </div>
                    <div className="events-card__body">
                      <h2 className="events-card__title">{event.title}</h2>
                      <div className="events-card__meta">
                        {event.dateDisplay && (
                          <div className="events-card__meta-row">
                            <Calendar size={15} />
                            <span>{event.dateDisplay}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="events-card__meta-row">
                            <MapPin size={15} />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.booth && (
                          <div className="events-card__meta-row">
                            <User size={15} />
                            <span>{event.booth}</span>
                          </div>
                        )}
                      </div>
                      <div className="events-card__action">{renderAction(event)}</div>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <div className="events-appointment">Make An Appointment Now</div>
      <Contact interestMode="area" />
    </div>
  );
}
