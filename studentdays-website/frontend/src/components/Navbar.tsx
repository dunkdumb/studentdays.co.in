import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IMAGES } from '../config/images';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Home page renders its own interactive animated navbar
  if (location.pathname === '/') {
    return null;
  }

  const scrollTo = (id: string, fallbackPath: string) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(fallbackPath);
  };

  return (
    <nav id="nav">
      <div className="wrap">
        {/* Existing StudentDays logo */}
        <Link
          to="/"
          aria-label="StudentDays.co home"
          onClick={() => scrollTo('hero', '/')}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src={IMAGES.logo}
            alt="StudentDays.co"
            style={{ height: '42px', display: 'block' }}
          />
        </Link>

        {/* Main Navigation: Home | Trips | About | Menu */}
        <Link
          to="/"
          className="glass nav-hide-sm"
          onClick={() => scrollTo('hero', '/')}
        >
          Home
        </Link>

        <Link
          to="/trips"
          className="glass nav-hide-sm"
          onClick={() => scrollTo('trips', '/trips')}
        >
          Trips
        </Link>

        <Link
          to="/about"
          className="glass ab nav-hide-sm"
          data-go="about"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        {/* Menu button */}
        <button
          className="glass mb"
          id="mb"
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu ▾
        </button>

        {/* Dropdown Menu */}
        <div
          className={`links ${menuOpen ? 'open' : ''}`}
          id="links"
          style={{ display: menuOpen ? 'flex' : 'none' }}
        >
          <a
            className="glass"
            href="#app"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('app', '/#app');
            }}
          >
            The App
          </a>

          <a
            className="glass"
            href="#colleges"
            data-go="colleges"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('colleges', '/colleges');
            }}
          >
            College partners
          </a>

          <a
            className="glass"
            href="#memories"
            data-go="doc"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('memories', '/gallery');
            }}
          >
            Documentary Stories
          </a>

          <a
            className="glass"
            href="#partner"
            id="pw"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('partner', '/contact');
            }}
          >
            Partner with us!
          </a>
        </div>
      </div>

      <style>{`
        nav {
          position: fixed;
          top: env(safe-area-inset-top, 0px);
          left: 0;
          right: 0;
          z-index: 50;
        }
        nav .wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 66px;
          background: rgba(0, 0, 0, 0.35);
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          border-radius: 0 0 22px 22px;
          gap: 10px;
          position: relative;
        }
        nav img {
          height: 42px;
          display: block;
        }
        nav .glass {
          padding: 10px 18px;
          font-size: 15px;
        }
        nav .ab {
          margin-left: 6px;
        }
        nav .j {
          margin-left: auto;
        }
        nav .mb {
          display: inline-flex;
        }
        .links {
          display: none;
          position: absolute;
          top: 74px;
          right: 0;
          width: min(300px, 100%);
          flex-direction: column;
          gap: 6px;
          padding: 12px;
          border-radius: 24px;
          background: rgba(6, 18, 43, 0.92);
          -webkit-backdrop-filter: blur(22px);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
          z-index: 60;
        }
        .links.open {
          display: flex !important;
        }
        .links .glass {
          justify-content: flex-start;
          padding: 14px 18px;
          font-size: 16px;
          opacity: 1;
        }
        @media (max-width: 820px) {
          nav .glass {
            padding: 9px 14px;
            font-size: 14px;
          }
          .links .glass {
            font-size: 16px;
            padding: 14px 18px;
          }
        }
        @media (max-width: 640px) {
          nav img {
            height: 36px;
          }
          nav .ab {
            margin-left: auto;
          }
          nav .j {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
