import React from 'react';
import { Link } from 'react-router-dom';
import { Role } from '../types';
import { ShieldCheck, ArrowLeft, MessageSquare } from 'lucide-react';
import CONTACT_INFO from '../data/contactInfo';

interface AuthGuardProps {
  children?: React.ReactNode;
  allowedRoles?: Role[];
  portal?: 'student' | 'coordinator' | 'admin';
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ portal = 'student' }) => {
  const portalName =
    portal === 'admin'
      ? 'Master Administration Console'
      : portal === 'coordinator'
      ? 'Trip Coordinator Desk'
      : 'Student Traveler Dashboard';

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030a1a', padding: '30px 20px' }}>
      <div
        className="fcard"
        style={{
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(30, 107, 255, 0.4)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          padding: '44px 32px'
        }}
      >
        <div style={{ display: 'grid', placeItems: 'center', width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(30, 107, 255, 0.15)', margin: '0 auto 20px' }}>
          <ShieldCheck size={36} color="#1E6BFF" />
        </div>

        <span className="badge badge-yellow" style={{ marginBottom: '12px' }}>Static Build Notice</span>
        <h2 style={{ fontSize: '26px', color: '#ffffff', marginBottom: '12px' }}>{portalName}</h2>
        <p style={{ color: '#cfd8ea', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          Account authentication and database logins are disabled in this static frontend deployment.
          <br /><br />
          For trip seat bookings, college cohort schedules, and reservation inquiries, our coordination team is available directly on WhatsApp and Email.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={CONTACT_INFO.getWhatsAppUrl(`Hi StudentDays Team, I would like to inquire about my trip booking.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="glass blue"
            style={{ padding: '12px 22px', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={16} />
            <span>Chat on WhatsApp</span>
          </a>
          <Link to="/trips" className="glass" style={{ padding: '12px 22px', fontSize: '14px' }}>
            Explore Trips
          </Link>
          <Link to="/" className="glass" style={{ padding: '12px 22px', fontSize: '14px' }}>
            <ArrowLeft size={16} />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthGuard;
