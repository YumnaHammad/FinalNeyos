import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="footer py-80"
      style={{
        backgroundColor: "#f7f7f7",
      }}
    >
      <div className="container">
        <div className="footer-item-two-wrapper">
          <div className="row">
            <div className="col-lg-3 footer-item">
              <div className="footer-item__logo">
                <Link to="/">
                  <img src="assets/images/logo/logo.png" alt="Nexyos Logo" />
                </Link>
              </div>
              <p className="mb-24">
                At Nexyos, we transform security and automation with AI, IoT,
                and smart solutions.
              </p>
            </div>

            <div className="col-lg-3 footer-item">
              <h6 className="footer-item__title">Company</h6>
              <ul className="footer-menu">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/profile">Company Profile</Link>
                </li>
                <li>
                  <Link to="/investors">Investor Relations</Link>
                </li>
                <li>
                  <Link to="/cybersecurity">Cybersecurity</Link>
                </li>
                <li>
                  <Link to="/compliance">Compliance</Link>
                </li>
                <li>
                  <Link to="/sustainability">Sustainability</Link>
                </li>
                <li>
                  <Link to="/quality">Focused on Quality</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 footer-item">
              <h6 className="footer-item__title">Quick Links</h6>
              <ul className="footer-menu">
                <li>
                  <Link to="/elearning">Nexyos eLearning</Link>
                </li>
                <li>
                  <Link to="/where-to-buy">Where to Buy</Link>
                </li>
                <li>
                  <Link to="/discontinued">Discontinued Products</Link>
                </li>
                <li>
                  <Link to="/technologies">Core Technologies</Link>
                </li>
                <li>
                  <Link to="/sitemap">Sitemap</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 footer-item address-footer">
              <h6 className="footer-item__title">Contact</h6>
              <ul className="footer-menu">
                <div className="flex-align gap-16 mb-16">
                  <span className="w-32 h-32 flex-center rounded-circle border border-gray-100  text-md flex-shrink-0">
                    <i className="ph-fill ph-map-pin" />
                  </span>
                  <span className="text-md text-gray-900">
                    4TH Floor, Office num 4, Building 20, Muntazah, Doha, Qatar
                  </span>
                </div>
                <div className="flex-align gap-16 mb-16">
                  <span className="w-32 h-32 flex-center rounded-circle border border-gray-100  text-md flex-shrink-0">
                    <i className="ph-fill ph-map-pin" />
                  </span>
                  <span className="text-md text-gray-900">
                    Near, police station road, Koyilandy, Kerala 673305, India
                  </span>
                </div>
                <div className="flex-align gap-16 mb-16">
                  <span className="w-32 h-32 flex-center rounded-circle border border-gray-100  text-md flex-shrink-0">
                    <i className="ph-fill ph-phone-call" />
                  </span>
                  <Link
                    to="tel:+918008008841"
                    className="text-md text-gray-900"
                  >
                    +91 8008008841
                  </Link>
                </div>
                <div className="flex-align gap-16 mb-16">
                  <span className="w-32 h-32 flex-center rounded-circle border border-gray-100  text-md flex-shrink-0">
                    <i className="ph-fill ph-envelope" />
                  </span>
                  <Link
                    to="mailto:info@nexyos.com"
                    className="text-md text-gray-900 "
                  >
                    info@nexyos.com
                  </Link>
                </div>
                <div className="flex-align gap-16 mb-16">
                  <span className="w-32 h-32 flex-center rounded-circle border border-gray-100  text-md flex-shrink-0">
                    <i className="ph-fill ph-clock" />
                  </span>
                  <span className="text-md text-gray-900">
                    10:00 - 18:00, Mon - Sat
                  </span>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
