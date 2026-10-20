import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGES } from '../config/images';

export const Footer: React.FC = () => {
  const location = useLocation();

  // Home page renders its own interactive footer
  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          {/* Brand Info */}
          <div>
            <img
              src={IMAGES.logoFooter}
              alt="StudentDays.co"
              style={{ height: '44px', width: 'auto', marginBottom: '14px', display: 'block' }}
            />
            <p className="ft">Travel. Connect. Experience.</p>
            <p style={{ color: '#8fa3c7', fontSize: '14px', margin: '8px 0 0' }}>
              Every trip becomes a story.
            </p>
          </div>

          {/* Quick Links: Explore */}
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/trips">Trips</Link>
            <Link to="/#app">The App</Link>
            <Link to="/colleges">University Chapters</Link>
            <Link to="/about">About Us</Link>
          </div>

          {/* Policies */}
          <div>
            <h4>Policies</h4>
            <Link to="/faq">FAQs</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/cancellation-policy">Refund & Cancellation Policy</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        {/* Footer Divider & Bottom Bar */}
        <div className="fb">
          <span>© 2026 StudentDays.co. All rights reserved.</span>
          <span>hello@studentdays.co.in · +91 9640389230</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
