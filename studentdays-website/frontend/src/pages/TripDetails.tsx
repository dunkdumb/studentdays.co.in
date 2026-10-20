import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trip } from '../types';
import { BookingModal } from '../components/BookingModal';
import { MapPin, Calendar, Users, Check, X as XIcon, Clock, Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import { AUTHENTIC_TRIPS } from '../data/tripsData';
import { BackButton } from '../components/BackButton';
import { ArakuTripDetails } from './ArakuTripDetails';

export const TripDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);

  if (slug === 'araku-vanjangi' || slug === 'araku-vanajangi-clouds') {
    return <ArakuTripDetails />;
  }

  const trip: Trip | undefined = AUTHENTIC_TRIPS.find((t) => t.slug === slug || t.id === slug);

  if (!trip) {
    return (
      <div className="wrap" style={{ minHeight: '80vh', paddingTop: '120px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', color: '#ff6b81', marginBottom: '12px' }}>Trip Not Found</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>This trip does not exist or has been removed.</p>
          <Link to="/trips" className="glass blue">Explore Other Trips</Link>
        </div>
      </div>
    );
  }

  const startDate = new Date(trip.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  const endDate = new Date(trip.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  const deadline = new Date(trip.registrationDeadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '100px', background: '#030a1a', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: '420px', width: '100%', overflow: 'hidden' }}>
        <img
          src={trip.coverImage}
          alt={trip.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/studentdays-hero.jpeg';
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(3,10,26,0.3) 0%, rgba(3,10,26,0.95) 100%)' }} />
        <div className="wrap" style={{ position: 'absolute', bottom: '30px', left: 0, right: 0 }}>
          <BackButton to="/trips" label="Back to Trips" style={{ marginBottom: '16px' }} />

          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span className="badge badge-blue">
              <MapPin size={12} />
              <span>{trip.destination}</span>
            </span>
            <span className="badge badge-yellow">
              <Calendar size={12} />
              <span>{startDate} – {endDate}</span>
            </span>
            {trip.remainingSeats > 0 ? (
              <span className="badge badge-green">{trip.remainingSeats} Seats Available</span>
            ) : (
              <span className="badge badge-red">Fully Booked</span>
            )}
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#ffffff', margin: 0 }}>
            {trip.title}
          </h1>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '36px' }} className="trip-layout-grid">
          {/* Left Column: Details & Itinerary */}
          <div>
            {/* Overview */}
            <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '14px' }}>Overview</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
                {trip.description}
              </p>
            </div>

            {/* Day-by-day Itinerary */}
            <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '24px' }}>Trip Itinerary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {trip.itinerary && trip.itinerary.length > 0 ? (
                  trip.itinerary.map((item) => (
                    <div key={item.id} style={{ borderLeft: '3px solid #1E6BFF', paddingLeft: '20px', position: 'relative' }}>
                      <span className="badge badge-blue" style={{ marginBottom: '8px' }}>Day {item.dayNumber}</span>
                      <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>{item.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.6, marginBottom: '12px' }}>
                        {item.description}
                      </p>
                      {item.activities && item.activities.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {item.activities.map((act, i) => (
                            <span key={i} className="badge badge-gray" style={{ fontSize: '12px' }}>
                              {act}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>Detailed daily schedule available upon confirmation.</p>
                )}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '20px' }}>What's Included & Excluded</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', color: '#2ECC71', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={18} />
                    <span>Included Services</span>
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {trip.includedServices.map((inc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>
                        <span style={{ color: '#2ECC71' }}>✔</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '16px', color: '#ff6b81', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <XIcon size={18} />
                    <span>Not Included</span>
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {trip.exclusions.map((exc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>
                        <span style={{ color: '#ff6b81' }}>✖</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Meeting Point & Cancellation Policy */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '16px' }}>Meeting Point & Safety</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '20px' }}>
                <strong>Meeting Point:</strong> {trip.meetingPoint || trip.startLocation}
              </p>
              <h3 style={{ fontSize: '16px', color: '#FFD23F', marginBottom: '8px' }}>Cancellation Policy</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.6 }}>
                {trip.cancellationPolicy || 'Standard StudentDays refund policy applies. 100% refund up to 7 days before departure.'}
              </p>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Widget */}
          <div>
            <div className="glass-panel" style={{ padding: '28px', position: 'sticky', top: '100px' }}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Student Trip Pass</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff' }}>
                    ₹{trip.price.toLocaleString('en-IN')}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>/ person</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.8)' }}>
                  <span>Start Location:</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{trip.startLocation.split('(')[0]}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.8)' }}>
                  <span>Remaining Seats:</span>
                  <span style={{ fontWeight: 700, color: trip.remainingSeats > 0 ? '#2ECC71' : '#ff6b81' }}>
                    {trip.remainingSeats} of {trip.capacity}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.8)' }}>
                  <span>Registration Ends:</span>
                  <span style={{ fontWeight: 600, color: '#FFD23F' }}>{deadline}</span>
                </div>
              </div>

              {trip.isBookable ? (
                <button
                  onClick={() => {
                    window.open('https://forms.gle/hMsrGxBguR577LyA9', '_blank', 'noopener,noreferrer');
                    setBookingOpen(true);
                  }}
                  className="glass blue big"
                  style={{ width: '100%', fontSize: '16px' }}
                >
                  Book Your Spot Now
                </button>
              ) : (
                <button disabled className="glass" style={{ width: '100%', opacity: 0.5 }}>
                  Bookings Closed
                </button>
              )}

              <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', margin: 0 }}>
                Demo payment simulator enabled. No live bank debit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 768px) {
          .trip-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .trip-layout-grid > div:last-child > .glass-panel {
            position: static !important;
          }
        }
      `}</style>

      {bookingOpen && (
        <BookingModal
          trip={trip}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  );
};
