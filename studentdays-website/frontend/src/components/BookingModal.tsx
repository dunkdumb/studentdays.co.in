import React from 'react';
import { Trip } from '../types';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  trip: Trip | null;
  onClose: () => void;
}

const GOOGLE_FORM_URL = 'https://forms.gle/hMsrGxBguR577LyA9';

export const BookingModal: React.FC<BookingModalProps> = ({ trip, onClose }) => {
  if (!trip) return null;

  const handleOpenGoogleForm = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const isAraku = trip.id === 'araku-vanjangi' || trip.slug === 'araku-vanjangi';
  const preBookingAmount = isAraku ? 1999 : (trip.preBookingAmount || 1999);
  const remainingBalance = isAraku ? 5500 : (trip.price - preBookingAmount);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Trip Reservation &amp; Pre-Booking</span>
            <h2 style={{ fontSize: '24px', color: '#ffffff', margin: 0 }}>{trip.title}</h2>
          </div>
          <button onClick={onClose} className="glass" style={{ padding: '8px' }} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Trip Overview Card */}
        <div
          className="glass-panel"
          style={{
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>Destination:</span>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#ffffff' }}>{trip.destination}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>Duration:</span>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#ffffff' }}>{trip.durationDays} Days</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#FFD23F', fontWeight: 600 }}>Pre-booking Amount:</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#FFD23F' }}>₹{preBookingAmount.toLocaleString('en-IN')}/-</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
            <span>Remaining Balance:</span>
            <span>₹{remainingBalance.toLocaleString('en-IN')}/- (before departure)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
            <span>Total Package Price:</span>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>₹{trip.price.toLocaleString('en-IN')}/- per person</span>
          </div>
        </div>

        {/* Notice: Pre-booking handled exclusively via Google Form */}
        <div
          style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(30, 107, 255, 0.14)',
            border: '1px solid rgba(30, 107, 255, 0.3)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <ShieldCheck size={22} color="#6ea2ff" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '13px', color: '#cfe0ff', lineHeight: 1.6 }}>
            <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>
              Official StudentDays Pre-Booking
            </strong>
            Pre-booking and seat reservations are handled exclusively via our official Google Form. No prior data entry or account creation is required on this website.
          </div>
        </div>

        {/* Direct Action: Redirect to Google Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenGoogleForm}
            className="glass blue"
            style={{
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              textAlign: 'center',
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(30, 107, 255, 0.5)',
              borderRadius: '14px'
            }}
          >
            <span>Complete Pre-Booking on Google Form</span>
            <ExternalLink size={18} />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="glass"
            style={{ padding: '12px', fontSize: '14px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
