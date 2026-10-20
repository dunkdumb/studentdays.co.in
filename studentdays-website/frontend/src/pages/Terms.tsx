import React from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { FileText, Shield, RefreshCw, HelpCircle } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: 'radial-gradient(120% 70% at 50% 0, #0b2a66, #030a1a 70%)' }}>
      <div className="wrap" style={{ maxWidth: '880px' }}>
        <BackButton to="/" />

        {/* Header */}
        <div className="ctop" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', color: '#ffffff', marginBottom: '12px' }}>
            Terms &amp; Conditions
          </h1>
          <p className="sub" style={{ color: '#cfe0ff', fontSize: '18px', margin: 0 }}>
            Please read these before making any booking.
          </p>
        </div>

        {/* Quick Nav Links between Policies */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '36px', flexWrap: 'wrap' }}>
          <Link to="/terms" className="glass blue" style={{ fontSize: '14px' }}>
            <FileText size={16} />
            <span>Terms &amp; Conditions</span>
          </Link>
          <Link to="/privacy-policy" className="glass" style={{ fontSize: '14px' }}>
            <Shield size={16} />
            <span>Privacy Policy</span>
          </Link>
          <Link to="/cancellation-policy" className="glass" style={{ fontSize: '14px' }}>
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
            Welcome to StudentDays.co. By accessing our website, registering for trips, events, or services, you agree to comply with the following Terms &amp; Conditions. Please read them carefully before making any booking.
          </p>

          {/* Section 1 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>1. Acceptance of terms</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              By using StudentDays.co, you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions. If you do not agree, please refrain from using our services.
            </p>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>2. Eligibility</h3>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>StudentDays.co experiences are primarily designed for students and young adults.</li>
              <li>Participants must provide accurate information during registration.</li>
              <li>Participants under 18 years of age may require parental or guardian consent.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>3. Bookings &amp; registrations</h3>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>All bookings are subject to availability.</li>
              <li>A booking is confirmed only after successful payment and confirmation from StudentDays.co.</li>
              <li>StudentDays.co reserves the right to reject or cancel any registration if necessary.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>4. Payments</h3>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>Trip and event fees must be paid through approved payment methods.</li>
              <li>Prices displayed on the website are subject to change without prior notice.</li>
              <li>Any applicable taxes, convenience fees, or third-party charges may be added during checkout.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>5. Participant responsibilities</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>Participants are expected to:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Follow trip coordinators' instructions.</li>
              <li>Respect fellow travelers and organizers.</li>
              <li>Maintain appropriate behavior during trips and events.</li>
              <li>Comply with local laws and regulations.</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              StudentDays.co reserves the right to remove any participant whose behavior is disruptive, unsafe, or harmful to others.
            </p>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>6. Travel &amp; event changes</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>StudentDays.co may modify:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Itineraries</li>
              <li>Schedules</li>
              <li>Accommodation arrangements</li>
              <li>Transportation plans</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              Such changes may occur due to weather conditions, operational requirements, safety concerns, government regulations, or unforeseen circumstances.
            </p>
          </div>

          {/* Section 7 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>7. Cancellation by participant</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              Cancellation and refund policies may vary depending on the trip or event. Please refer to the <Link to="/cancellation-policy" style={{ color: '#6ea2ff', textDecoration: 'underline' }}>Refund &amp; Cancellation Policy</Link> page for complete details.
            </p>
          </div>

          {/* Section 8 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>8. Cancellation by StudentDays.co</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>StudentDays.co reserves the right to cancel or postpone any trip or event due to:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Insufficient registrations</li>
              <li>Natural disasters</li>
              <li>Government restrictions</li>
              <li>Safety concerns</li>
              <li>Unforeseen operational issues</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              In such cases, participants will be informed and eligible compensation or refunds will be handled according to the Refund Policy.
            </p>
          </div>

          {/* Section 9 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>9. Liability disclaimer</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>
              StudentDays.co acts as an organizer and facilitator of experiences. While every effort is made to ensure safety and quality, StudentDays.co shall not be held responsible for:
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Personal injuries</li>
              <li>Loss of belongings</li>
              <li>Accidents</li>
              <li>Delays</li>
              <li>Third-party service failures</li>
              <li>Natural disasters</li>
              <li>Circumstances beyond our reasonable control</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              Participants join trips and events at their own risk.
            </p>
          </div>

          {/* Section 10 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>10. Photography &amp; media consent</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>
              By participating in StudentDays.co trips or events, you grant permission for photographs, videos, and other media captured during the experience to be used for:
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Marketing</li>
              <li>Social media promotions</li>
              <li>Website content</li>
              <li>Future promotional campaigns</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: '8px 0 0 0' }}>
              The StudentDays team captures moments throughout the whole trip, and you may be recorded during the journey and sightseeing. If you wish to opt out, please notify the organizing team before the event begins.
            </p>
          </div>

          {/* Section 11 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>11. Intellectual property</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              All website content, branding, logos, graphics, videos, and materials are the property of StudentDays.co and may not be copied, reproduced, or distributed without written permission.
            </p>
          </div>

          {/* Section 12 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>12. Prohibited activities</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>Users must not:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '8px' }}>
              <li>Provide false information</li>
              <li>Misuse the platform</li>
              <li>Engage in unlawful activities</li>
              <li>Harass participants or organizers</li>
              <li>Damage property during trips or events</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              Violation may result in immediate removal from services without refund.
            </p>
          </div>

          {/* Section 13 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>13. Privacy</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              Your use of StudentDays.co is also governed by our <Link to="/privacy-policy" style={{ color: '#6ea2ff', textDecoration: 'underline' }}>Privacy Policy</Link>, which explains how we collect, use, and protect your information.
            </p>
          </div>

          {/* Section 14 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>14. Changes to terms</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              StudentDays.co reserves the right to update these Terms &amp; Conditions at any time. Updated versions will be posted on this page.
            </p>
          </div>

          {/* Section 15 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>15. Contact us</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '16px' }}>
              For any questions regarding these Terms &amp; Conditions, please contact:
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

            <p style={{ color: '#FFD23F', fontSize: '15px', fontWeight: 700, marginTop: '20px', textAlign: 'center' }}>
              Travel. Connect. Experience.<br />Every Trip Becomes a Story.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
