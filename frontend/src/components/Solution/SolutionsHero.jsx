import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../../styles/Solutions.css';

const HERO_VIDEO =
  'https://static.vecteezy.com/system/resources/previews/011/389/863/mp4/moving-cars-on-the-motorway-during-sunset-busy-traffic-on-a-freeway-or-highway-top-view-of-the-road-the-golden-rays-of-the-evening-sun-illuminate-the-transport-ukraine-kyiv-october-3-2021-free-video.mp4';

const HERO_POSTER =
  'https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/road-traffic-management.jpg?t=1751621798627';

export default function SolutionsHero() {
  return (
    <section className="solutions-hero">
      <video
        className="solutions-hero__media"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="solutions-hero__overlay" aria-hidden="true" />
      <div className="solutions-hero__content">
        <p className="solutions-hero__eyebrow">Nexyos Solutions</p>
        <h1 className="solutions-hero__title">Powering Smart Surveillance</h1>
        <p className="solutions-hero__subtitle">
          Explore how cutting-edge AI and IoT solutions transform security landscapes globally.
        </p>
        <div className="solutions-hero__actions">
          <a href="#featured" className="solutions-hero__btn solutions-hero__btn--primary">
            Explore solutions
          </a>
          <Link
            to="/solution/IntelligentTrafficSolution"
            className="solutions-hero__btn solutions-hero__btn--ghost"
          >
            Intelligent Traffic
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
