import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import logo from '../../assets/images/logo/logo.png';
import '../../styles/Auth.css';

const AUTH_HERO_IMAGE =
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600';

function AuthLogo({ className = '' }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Link to="/" className={`auth-page__logo ${className}`.trim()}>
      {!imgFailed ? (
        <img src={logo} alt="Nexyos" onError={() => setImgFailed(true)} />
      ) : (
        <span className="auth-page__logo-text">NEXYOS</span>
      )}
    </Link>
  );
}

export default function AuthLayout({ children, alternateLink = null }) {
  return (
    <div className="auth-page">
      <div className="auth-page__visual" aria-hidden="true">
        <AuthLogo />
        <div className="auth-page__visual-overlay" />
        <img src={AUTH_HERO_IMAGE} alt="" />
      </div>

      <div className="auth-page__panel">
        <div className="auth-page__topbar">
          <span className="auth-page__lang">
            <Globe size={16} />
            English
          </span>
          {alternateLink && (
            <span className="auth-page__alt-link">
              {alternateLink.prefix}{' '}
              <Link to={alternateLink.to}>{alternateLink.label}</Link>
            </span>
          )}
        </div>

        <div className="auth-page__content">
          <div className="auth-page__mobile-logo">
            <AuthLogo />
          </div>
          {children}
        </div>

        <footer className="auth-page__footer">
          © {new Date().getFullYear()} Nexyos. All Rights Reserved.
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </footer>
      </div>
    </div>
  );
}
