import { Link } from 'react-router-dom';
import { FiPhoneCall } from 'react-icons/fi';
import { PiEnvelopeFill } from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';
import { HiClock } from 'react-icons/hi2';

export default function GetInTouch() {
  return (
    <div className="inquiry-sidebar">
      <h3 className="inquiry-sidebar__title">Get In Touch</h3>

      <div className="inquiry-sidebar__item">
        <span className="inquiry-sidebar__icon" aria-hidden>
          <FiPhoneCall />
        </span>
        <div>
          <Link to="tel:+918008008841">+918008008841</Link>
          <span>, </span>
          <Link to="tel:8008008841">8008008841</Link>
        </div>
      </div>

      <div className="inquiry-sidebar__item">
        <span className="inquiry-sidebar__icon" aria-hidden>
          <PiEnvelopeFill />
        </span>
        <Link to="mailto:info@nexyos.com">info@nexyos.com</Link>
      </div>

      <div className="inquiry-sidebar__item">
        <span className="inquiry-sidebar__icon" aria-hidden>
          <FaLocationDot />
        </span>
        <p>
          <strong>Address (Qatar):</strong> 4TH Floor, office num 4 Building number 20 Muntazah,
          zone 24, Doha Qatar
        </p>
      </div>

      <div className="inquiry-sidebar__item">
        <span className="inquiry-sidebar__icon" aria-hidden>
          <FaLocationDot />
        </span>
        <p>
          <strong>Address (India):</strong> Near, police station road, Koyilandy, Kerala 673305,
          India
        </p>
      </div>

      <div className="inquiry-sidebar__item">
        <span className="inquiry-sidebar__icon" aria-hidden>
          <HiClock />
        </span>
        <p>
          <strong>Hours:</strong> 10:00 - 18:00, Mon - Sat
        </p>
      </div>
    </div>
  );
}
