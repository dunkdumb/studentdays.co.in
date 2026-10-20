import React from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { RefreshCw, Shield, FileText, HelpCircle } from 'lucide-react';

export const CancellationPolicy: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: 'radial-gradient(120% 70% at 50% 0, #0b2a66, #030a1a 70%)' }}>
      <div className="wrap" style={{ maxWidth: '880px' }}>
        <BackButton to="/" />

        {/* Header */}
        <div className="ctop" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', color: '#ffffff', marginBottom: '12px' }}>
            Refund &amp; Cancellation Policy
          </h1>
          <p className="sub" style={{ color: '#cfe0ff', fontSize: '18px', margin: 0 }}>
            How cancellations and refunds work.
          </p>
        </div>

        {/* Quick Nav Links between Policies */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '36px', flexWrap: 'wrap' }}>
          <Link to="/terms" className="glass" style={{ fontSize: '14px' }}>
            <FileText size={16} />
            <span>Terms &amp; Conditions</span>
          </Link>
          <Link to="/privacy-policy" className="glass" style={{ fontSize: '14px' }}>
            <Shield size={16} />
            <span>Privacy Policy</span>
          </Link>
          <Link to="/cancellation-policy" className="glass blue" style={{ fontSize: '14px' }}>
            <RefreshCw size={16} />
            <span>Refund &amp; Cancellation</span>
          </Link>
          <Link to="/faq" className="glass" style={{ fontSize: '14px' }}>
            <HelpCircle size={16} />
            <span>FAQs</span>
          </Link>
        </div>

        {/* Content Panel */}
        <div className="glass-panel" style={{ padding: '40px 36px', lineHeight: 1.7 }}>
          <p style={{ color: '#8fa3c7', fontSize: '14px', marginBottom: '16px' }}>Last updated: June 2026</p>
          <p style={{ color: '#e3ecff', fontSize: '15px', marginBottom: '28px' }}>
            At StudentDays.co, we work closely with transportation providers, accommodation partners, activity organizers, and vendors to create memorable experiences for students. Since many arrangements are booked in advance, the following Refund &amp; Cancellation Policy applies to all trip registrations.
          </p>

          {/* Section 1: Refund Schedule */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '12px' }}>1. Cancellation by participant</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '16px' }}>
              If a participant wishes to cancel their booking, the refund amount will depend on the timing of the cancellation request relative to the scheduled departure:
            </p>

            <div style={{ display: 'grid', gap: '12px', margin: '20px 0' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>More than 15 days before departure</span>
                <span style={{ color: '#2ECC71', fontWeight: 800, fontSize: '16px' }}>Up to 75% refund</span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>8 to 14 days before departure</span>
                <span style={{ color: '#FFD23F', fontWeight: 800, fontSize: '16px' }}>Up to 50% refund</span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>3 to 7 days before departure</span>
                <span style={{ color: '#FFA502', fontWeight: 800, fontSize: '16px' }}>Up to 25% refund</span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>Less than 72 hours before departure</span>
                <span style={{ color: '#ff6b81', fontWeight: 800, fontSize: '16px' }}>No refund</span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>No-show on trip day</span>
                <span style={{ color: '#ff6b81', fontWeight: 800, fontSize: '16px' }}>No refund</span>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>
              * Refund percentages are calculated after deducting non-refundable advance bookings, transport permits, and third-party reservation costs.
            </p>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>2. Cancellation request process</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>To request a cancellation, participants must:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Send an email to <a href="mailto:hello@studentdays.co.in" style={{ color: '#6ea2ff' }}>hello@studentdays.co.in</a> or message the official StudentDays WhatsApp desk.</li>
              <li>Include: Full Name, Booking ID / Trip Name, Registered Contact Number, and Reason for Cancellation.</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              The cancellation request date and timestamp will be officially considered as the time of receipt.
            </p>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>3. Refund processing time</h3>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>Approved refunds will be processed within 5 to 7 business days from confirmation.</li>
              <li>Refunds will be credited to the original payment source / bank account used during booking.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>4. Transfer of booking</h3>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>Participants may transfer their seat to another student up to 48 hours prior to trip departure, subject to approval and verification.</li>
              <li>A nominal administrative or name-change fee may apply depending on transport booking policies.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>5. Cancellation by StudentDays.co</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>StudentDays.co reserves the right to cancel or postpone a trip due to:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Insufficient participants</li>
              <li>Adverse weather conditions</li>
              <li>Government restrictions</li>
              <li>Natural disasters</li>
              <li>Safety concerns</li>
              <li>Transport disruptions</li>
              <li>Other unforeseen circumstances</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>In such cases, participants may receive:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Full refund, or</li>
              <li>Credit towards a future trip/event, depending on the situation.</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              The final decision will be communicated to all registered participants.
            </p>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>6. Non-refundable charges</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>The following may be non-refundable:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>Booking convenience fees</li>
              <li>Payment gateway charges</li>
              <li>Government taxes</li>
              <li>Third-party reservation charges</li>
              <li>Customized add-ons or special requests</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>7. Participant removal during trip</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>StudentDays.co reserves the right to remove any participant whose behavior:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Threatens safety</li>
              <li>Violates local laws</li>
              <li>Harasses others</li>
              <li>Disrupts the experience</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>In such cases:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>No refund will be provided.</li>
              <li>Additional expenses incurred may be charged to the participant.</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>8. Force majeure</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>
              StudentDays.co shall not be held liable for cancellations, delays, or changes caused by circumstances beyond reasonable control, including:
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Natural disasters</li>
              <li>Floods</li>
              <li>Earthquakes</li>
              <li>Political unrest</li>
              <li>Government restrictions</li>
              <li>Pandemic-related restrictions</li>
              <li>Transportation strikes</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              Refunds in such situations will depend on recoveries from third-party vendors and service providers.
            </p>
          </div>

          {/* Section 9 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>9. Contact us</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '16px' }}>
              For cancellation requests or refund-related queries:
            </p>

            <div style={{ padding: '18px 20px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <b style={{ display: 'block', fontSize: '16px', color: '#ffffff', marginBottom: '4px' }}>StudentDays.co</b>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>
                Email: <a href="mailto:hello@studentdays.co.in" style={{ color: '#6ea2ff' }}>hello@studentdays.co.in</a>
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                Website: <span style={{ color: '#ffffff' }}>www.studentdays.co.in</span>
              </div>
            </div>
          </div>

          {/* Our goal */}
          <div>
            <h3 style={{ fontSize: '20px', color: '#2ECC71', marginBottom: '8px' }}>Our goal</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: '0 0 20px 0' }}>
              We strive to keep our cancellation and refund process fair while ensuring the sustainability of student-friendly experiences. Thank you for being a part of the StudentDays.co community.
            </p>
            <p style={{ color: '#FFD23F', fontSize: '15px', fontWeight: 700, margin: 0, textAlign: 'center' }}>
              Travel. Connect. Experience.<br />Every Trip Becomes a Story.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
