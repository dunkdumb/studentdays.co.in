import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { Shield, FileText, RefreshCw } from 'lucide-react';

export const Legal: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let activeTab: 'privacy' | 'terms' | 'cancellation' = 'privacy';
  if (path.includes('terms')) activeTab = 'terms';
  else if (path.includes('cancellation')) activeTab = 'cancellation';

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#030a1a' }}>
      <div className="wrap" style={{ maxWidth: '850px' }}>
        <BackButton to="/" />
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <Link
            to="/privacy-policy"
            className={`glass ${activeTab === 'privacy' ? 'blue' : ''}`}
            style={{ fontSize: '14px' }}
          >
            <Shield size={16} />
            <span>Privacy Policy</span>
          </Link>
          <Link
            to="/terms"
            className={`glass ${activeTab === 'terms' ? 'blue' : ''}`}
            style={{ fontSize: '14px' }}
          >
            <FileText size={16} />
            <span>Terms of Service</span>
          </Link>
          <Link
            to="/cancellation-policy"
            className={`glass ${activeTab === 'cancellation' ? 'blue' : ''}`}
            style={{ fontSize: '14px' }}
          >
            <RefreshCw size={16} />
            <span>Cancellation & Refund Policy</span>
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '44px 36px', lineHeight: 1.7 }}>
          {activeTab === 'privacy' && (
            <div>
              <h1 style={{ fontSize: '32px', color: '#ffffff', marginBottom: '8px' }}>Privacy Policy</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '28px' }}>Last updated: October 2026</p>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>1. Information We Collect</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                StudentDays.co collects personal details provided during student registration and trip checkout, including full legal names, college email addresses, mobile phone numbers, university affiliations, emergency contact information, and mock payment reference numbers.
              </p>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>2. How Information is Used</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                Your data is exclusively used to coordinate trip logistics, verify student eligibility, manage bus and accommodation rooming arrangements, ensure traveler emergency safety, and provide critical itinerary updates. We do not sell your personal information to third-party advertisers.
              </p>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>3. Data Security & Storage</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                All user passwords are encrypted using one-way bcrypt hashing. API authentication utilizes secure, signed tokens and protected HttpOnly cookie storage to prevent cross-site scripting (XSS) leaks.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h1 style={{ fontSize: '32px', color: '#ffffff', marginBottom: '8px' }}>Terms & Conditions</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '28px' }}>Last updated: October 2026</p>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>1. Student Code of Conduct</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                StudentDays is built on mutual respect and safety. We maintain a strict zero-tolerance policy against any form of bullying, harassment, discrimination, or substance abuse during trip transit and stay. Violators will be immediately discharged from the expedition without refund and reported to their respective campus authorities.
              </p>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>2. Booking & Seat Allocation</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                A booking is confirmed only upon successful verification of the submitted payment reference by an authorized StudentDays administrator. Capacity reservations without submitted payment references expire after the designated deadline.
              </p>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>3. Trip Lead Instructions</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                Participants must adhere to departure timings, trekking safety instructions, and wildlife park guidelines provided by certified StudentDays coordinators and local guides.
              </p>
            </div>
          )}

          {activeTab === 'cancellation' && (
            <div>
              <h1 style={{ fontSize: '32px', color: '#ffffff', marginBottom: '8px' }}>Cancellation & Refund Policy</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '28px' }}>Last updated: October 2026</p>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>1. Standard Refund Timeline</h2>
              <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>7+ days prior to departure:</strong> 100% full refund credited to original payment source.</li>
                <li><strong>3 to 6 days prior to departure:</strong> 50% refund or option to transfer seat to a verified college peer.</li>
                <li><strong>Within 72 hours of departure:</strong> Non-refundable due to pre-booked vehicle permits and resort rooms.</li>
              </ul>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>2. Organizer Cancellations</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                If a trip is cancelled or rescheduled due to extreme weather warnings, government safety advisories, or unforeseen natural closures, students are offered a choice between a 100% immediate refund or free transfer to the next available departure.
              </p>

              <h2 style={{ fontSize: '20px', color: '#FFD23F', marginTop: '24px', marginBottom: '10px' }}>3. Refund Processing</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                Approved refunds are processed by our accounts desk within 3 to 5 business days. In demo simulation mode, refunds update the booking state locally in the database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
