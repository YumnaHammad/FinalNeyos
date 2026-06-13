import { useMemo, useState } from 'react';
import { Globe, Mail, MapPin, Phone, Search } from 'lucide-react';
import { CHANNEL_PARTNERS, FIND_CHANNEL_STATS } from '../../config/partnerContent';

const REGIONS = ['All', 'Asia Pacific', 'Europe', 'North America', 'Middle East', 'Latin America'];

export default function PartnerChannelFinder() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [focus, setFocus] = useState('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CHANNEL_PARTNERS.filter((p) => {
      const matchRegion = region === 'All' || p.region === region;
      const matchFocus = focus === 'All' || p.focus.includes(focus);
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q);
      return matchRegion && matchFocus && matchSearch;
    });
  }, [search, region, focus]);

  return (
    <section className="partner-finder">
      <div className="partner-finder__stats">
        {FIND_CHANNEL_STATS.map((s) => (
          <div key={s.label} className="partner-finder__stat">
            <span className="partner-finder__stat-value">{s.value}</span>
            <span className="partner-finder__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="partner-finder__toolbar">
        <div className="partner-finder__search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search by name, country, or region…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="partner-finder__select"
          aria-label="Filter by region"
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r === 'All' ? 'All regions' : r}
            </option>
          ))}
        </select>
        <select
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          className="partner-finder__select"
          aria-label="Filter by focus"
        >
          <option value="All">All focus areas</option>
          <option value="CCTV">CCTV</option>
          <option value="IoT">IoT</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="partner-finder__empty">
          <Globe size={32} />
          <p>No partners match your search. Try another region or contact us for assistance.</p>
        </div>
      ) : (
        <div className="partner-finder__grid">
          {filtered.map((partner) => (
            <article key={partner.id} className="partner-finder__card">
              <h3 className="partner-finder__name">{partner.name}</h3>
              <div className="partner-finder__meta">
                <span>
                  <MapPin size={14} /> {partner.country}
                </span>
                <span>
                  <Globe size={14} /> {partner.region}
                </span>
              </div>
              <div className="partner-finder__tags">
                {partner.focus.map((f) => (
                  <span key={f} className="partner-finder__tag">
                    {f}
                  </span>
                ))}
              </div>
              <div className="partner-finder__contact">
                <a href={`mailto:${partner.email}`}>
                  <Mail size={14} /> {partner.email}
                </a>
                <a href={`tel:${partner.phone.replace(/\s/g, '')}`}>
                  <Phone size={14} /> {partner.phone}
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
