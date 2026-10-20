import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticTrip } from '../data/tripsData';
import { IMAGES } from '../config/images';

interface TripReferenceCardProps {
  trip: AuthenticTrip;
  onSelect?: (trip: AuthenticTrip) => void;
}

export const TripReferenceCard: React.FC<TripReferenceCardProps> = ({ trip, onSelect }) => {
  const navigate = useNavigate();
  const isKerala = trip.slug === 'kerala-gods-own-country' || trip.isHousefull;
  const isAraku = trip.slug === 'araku-vanjangi' || trip.id === 'araku-vanjangi';

  if (isAraku) {
    return (
      <article
        className="tc"
        role="button"
        tabIndex={0}
        onClick={() => navigate('/trips/araku-vanjangi')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate('/trips/araku-vanjangi');
          }
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '26px',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(16px)',
          cursor: 'pointer'
        }}
        aria-label="Araku & Vanjangi Escape trip"
      >
        <div className="ti" style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img
            src={trip.coverImage || '/assets/trips/araku/hero-cover.jpg'}
            alt="Araku & Vanjangi Escape"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = IMAGES.trips.araku;
            }}
          />
          <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px', zIndex: 2 }}>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                background: '#1E6BFF',
                color: '#fff',
                fontWeight: 800,
                fontSize: '12px',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 14px rgba(30, 107, 255, 0.6)'
              }}
            >
              UPCOMING
            </span>
            <span className="badge badge-blue">Vizag, Araku Valley & Vanjangi</span>
          </div>
          <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
            <span className="badge badge-yellow">2 Nights / 3 Days</span>
          </div>
        </div>

        <div className="tb" style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>₹7,499</span>
              <span style={{ fontSize: '13px', color: '#8fb3f5' }}>per person</span>
            </div>

            <h3 style={{ fontSize: '22px', color: '#ffffff', marginBottom: '6px' }}>
              {trip.title}
            </h3>

            <p style={{ color: '#cfe0ff', fontSize: '13px', fontStyle: 'italic', marginBottom: '12px' }}>
              Travel. Connect. Experience.
            </p>

            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: 1.5, marginBottom: '16px' }}>
              {trip.description}
            </p>

            {/* Inclusions Feature List */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '20px',
                fontSize: '12px',
                color: '#e3ecff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#2ECC71' }}>✔</span> Accommodation included
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#2ECC71' }}>✔</span> Local transport included
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#2ECC71' }}>✔</span> Jeep rides included
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#2ECC71' }}>✔</span> Train tickets included
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#2ECC71' }}>✔</span> Breakfast & dinner included
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#2ECC71' }}>✔</span> Photos & videos included
              </div>
            </div>
          </div>

          {/* Action Buttons: VIEW ITINERARY & VIEW FULL PDF */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Link
              to="/trips/araku-vanjangi"
              className="glass blue"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '12px 14px',
                fontSize: '13px',
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '14px'
              }}
            >
              VIEW ITINERARY
            </Link>

            <a
              href="https://drive.google.com/file/d/1q0RAVRFtUEsx5numGp1r65kTAK73RSYw/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="glass"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '12px 14px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '14px'
              }}
            >
              VIEW FULL PDF ↗
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`tc ${isKerala ? 'kcard' : 'lp'}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(trip)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect && onSelect(trip);
        }
      }}
      aria-label={`${trip.title} trip, tap to view details`}
      style={{ cursor: 'pointer' }}
    >
      <div className="ti">
        <img
          src={trip.coverImage}
          alt={trip.title}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = IMAGES.heroAlternate;
          }}
        />
        {isKerala && <span className="hf">HOUSEFULL</span>}
      </div>

      <div className="tb">
        <div>
          <h3>{trip.title}</h3>
          <p>{trip.subtitle || trip.description}</p>
        </div>

        <div>
          {isKerala ? (
            <span className="tl">Tap to view itinerary →</span>
          ) : (
            <span className="tbd">{trip.badgeText || 'In November, Details TBA'}</span>
          )}
        </div>
      </div>
    </article>
  );
};
