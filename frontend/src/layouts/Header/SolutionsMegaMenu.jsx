import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { solutionNavGroups } from '../../config/solutionNav';
import '../../styles/Solutions.css';

export default function SolutionsMegaMenu() {
  return (
    <div className="solutions-mega">
      <div className="solutions-mega__header">
        <div>
          <p className="solutions-mega__eyebrow">Nexyos Solutions</p>
          <p className="solutions-mega__subtitle">
            End-to-end security, smart building, and mobility solutions
          </p>
        </div>
        <Link to="/solution" className="solutions-mega__view-all">
          <LayoutGrid size={16} />
          View all solutions
          <ArrowRight size={14} />
        </Link>
      </div>
      <div className="solutions-mega__grid">
        {solutionNavGroups.map((group) => (
          <div key={group.id} className="solutions-mega__column">
            <h6 className="solutions-mega__column-title">{group.title}</h6>
            <ul className="solutions-mega__list">
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} className="solutions-mega__link">
                    <span className="solutions-mega__link-label">{item.label}</span>
                    <span className="solutions-mega__link-desc">{item.desc}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
