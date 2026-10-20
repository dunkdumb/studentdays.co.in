import React from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { Shield, FileText, RefreshCw, HelpCircle } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: 'radial-gradient(120% 70% at 50% 0, #0b2a66, #030a1a 70%)' }}>
      <div className="wrap" style={{ maxWidth: '880px' }}>
        <BackButton to="/" />

        {/* Header */}
        <div className="ctop" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', color: '#ffffff', marginBottom: '12px' }}>
            Privacy Policy
          </h1>
          <p className="sub" style={{ color: '#cfe0ff', fontSize: '18px', margin: 0 }}>
            How we collect, use and protect your information.
          </p>
        </div>

        {/* Quick Nav Links between Policies */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '36px', flexWrap: 'wrap' }}>
          <Link to="/terms" className="glass" style={{ fontSize: '14px' }}>
            <FileText size={16} />
            <span>Terms &amp; Conditions</span>
          </Link>
          <Link to="/privacy-policy" className="glass blue" style={{ fontSize: '14px' }}>
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
          <p style={{ color: '#e3ecff', fontSize: '15px', marginBottom: '14px' }}>
            At StudentDays.co, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, register for trips, participate in events, or interact with our services.
          </p>
          <p style={{ color: '#e3ecff', fontSize: '15px', marginBottom: '28px' }}>
            By using StudentDays.co, you agree to the practices described in this Privacy Policy.
          </p>

          {/* Section 1 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>1. Information we collect</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Personal information</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '12px' }}>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number / WhatsApp contact</li>
              <li>College / University name</li>
              <li>Year of study</li>
              <li>Age and gender</li>
              <li>Emergency contact information</li>
              <li>Government ID details (when required for travel bookings, permits, or accommodation)</li>
            </ul>

            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Booking &amp; payment information</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', marginBottom: '12px' }}>
              <li>Trip and event preferences</li>
              <li>Payment transaction status (payments are processed securely through third-party payment gateways; we do not store debit/credit card or banking credentials)</li>
            </ul>

            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Technical &amp; usage information</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>IP address</li>
              <li>Browser type and device information</li>
              <li>Pages viewed and website interaction details</li>
              <li>Cookies and analytics data</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>2. How we use your information</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>We use collected information to:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>Process trip registrations and bookings.</li>
              <li>Coordinate transportation, accommodation, permits, and activities.</li>
              <li>Communicate trip updates, itineraries, and important notices.</li>
              <li>Respond to inquiries, support requests, and feedback.</li>
              <li>Ensure participant safety and manage emergency situations.</li>
              <li>Improve website experience, services, and community offerings.</li>
              <li>Share relevant promotional updates (you can opt out anytime).</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>3. Information sharing</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>
              We do not sell, rent, or trade your personal information. Information is shared only with:
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li><strong>Service partners:</strong> Verified travel vendors, bus operators, hotels/resorts, local guides, and activity coordinators for operational purposes.</li>
              <li><strong>Payment gateways:</strong> Authorized payment processors for transaction handling.</li>
              <li><strong>Legal authorities:</strong> When required by applicable law, regulation, legal process, or to protect the safety and rights of participants and the public.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>4. Cookies &amp; analytics</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              StudentDays.co uses basic cookies and web analytics tools to understand site traffic, improve page performance, and enhance user experience. You can disable cookies through your browser settings if preferred.
            </p>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>5. Data security</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              We implement industry-standard security measures to safeguard your personal data from unauthorized access, loss, misuse, or alteration. While we maintain rigorous safeguards, no electronic transmission over the Internet can be guaranteed 100% secure.
            </p>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>6. Communications</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              By registering or submitting an inquiry, you consent to receive trip-related messages, booking confirmations, and service updates via WhatsApp, email, SMS, or phone calls. You may opt out of non-essential promotional messages at any time.
            </p>
          </div>

          {/* Section 7 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>7. Media &amp; photography</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              Photographs, videos, and documentary content captured during StudentDays trips and events may feature participants and may be used across our website, social media channels, and promotional materials. If you prefer not to be included in public media, please notify our team in writing prior to trip departure.
            </p>
          </div>

          {/* Section 8 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>8. Third-party links</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              Our website may contain links to external websites, social platforms, or vendor services. StudentDays.co is not responsible for the privacy practices or content of third-party websites. We encourage you to review their individual privacy policies.
            </p>
          </div>

          {/* Section 9 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>9. Children's privacy</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              StudentDays.co services are designed primarily for college students and young adults. If any participant is under 18 years of age, parental or guardian consent may be required for trip participation.
            </p>
          </div>

          {/* Section 10 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>10. Changes to this privacy policy</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0 }}>
              We may update this Privacy Policy periodically to reflect operational, legal, or regulatory changes. The latest version will always be posted on this page with an updated revision date.
            </p>
          </div>

          {/* Section 11 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>11. Your rights</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '8px' }}>You have the right to:</p>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li>Access and review the personal information we hold about you.</li>
              <li>Request corrections or updates to inaccurate information.</li>
              <li>Request deletion of your data, subject to travel compliance and record-keeping regulations.</li>
              <li>Opt out of marketing communications.</li>
            </ul>
          </div>

          {/* Section 12 */}
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFD23F', marginBottom: '8px' }}>12. Contact us</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '16px' }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:
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

          {/* Section 13 / Commitment */}
          <div>
            <h3 style={{ fontSize: '20px', color: '#2ECC71', marginBottom: '8px' }}>Our commitment</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: '0 0 20px 0' }}>
              We treat your personal information with care, transparency, and respect, ensuring you can focus on making unforgettable memories.
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

export default PrivacyPolicy;
