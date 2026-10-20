import React from 'react';
import { Link } from 'react-router-dom';
import { Trip } from '../types';
import { IMAGES } from '../config/images';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  onBookClick?: (trip: Trip) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onBookClick }) => {
  const startDate = new Date(trip.startDate).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric'
  });
  const endDate = new Date(trip.endDate).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        height: '100%'
      }}
    >
      {/* Cover Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
        <img
          src={trip.coverImage}
          alt={trip.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = IMAGES.heroAlternate;
          }}
        />

        {/* Floating Badges */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px' }}>
          <span className="badge badge-blue">
            <MapPin size={12} />
            <span>{trip.destination.split(',')[0]}</span>
          </span>
        </div>

        <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
          {trip.remainingSeats > 0 ? (
            <span className="badge badge-green">
              {trip.remainingSeats} Seats Left
            </span>
          ) : (
            <span className="badge badge-red">Fully Booked</span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFD23F', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
            <Calendar size={14} />
            <span>{startDate} – {endDate}</span>
          </div>

          <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#ffffff' }}>
            {trip.title}
          </h3>

          <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '14px', lineHeight: 1.5, margin: '0 0 20px 0' }}>
            {trip.description && trip.description.length > 115 ? `${trip.description.substring(0, 115)}...` : (trip.description || '')}
          </p>
        </div>

        {/* Price & Action */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Starting from</span>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
              ₹{trip.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to={`/trips/${trip.slug}`}
              className="glass"
              style={{ padding: '8px 14px', fontSize: '13px' }}
            >
              Details
            </Link>

            {trip.isBookable ? (
              <button
                onClick={() => onBookClick ? onBookClick(trip) : null}
                className="glass blue"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Book
              </button>
            ) : (
              <button disabled className="glass" style={{ padding: '8px 14px', fontSize: '13px', opacity: 0.5 }}>
                Closed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
