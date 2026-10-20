import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, AlertCircle, MessageSquare } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import CONTACT_INFO from '../data/contactInfo';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [statusNotice, setStatusNotice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(
      'Notice: Password reset workflows require automated mail delivery servers which are disconnected in this static frontend deployment. If you need assistance regarding an existing booking or trip confirmation, please contact our student coordinators on WhatsApp (+91 96403 89230).'
    );
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#06122b' }}>
      <div className="wrap" style={{ width: '100%', maxWidth: '480px' }}>
        <BackButton to="/login" style={{ marginBottom: '16px' }} />
        <div className="glass-panel" style={{ padding: '36px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(30,107,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E6BFF', margin: '0 auto 16px auto' }}>
              <KeyRound size={24} />
            </div>
            <h1 style={{ fontSize: '26px', color: '#ffffff', marginBottom: '8px' }}>Reset Password</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
              Enter your student email address to receive recovery instructions
            </p>
          </div>

          {statusNotice && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: 'rgba(255, 210, 63, 0.12)',
                border: '1px solid rgba(255, 210, 63, 0.35)',
                color: '#fff',
                fontSize: '13px',
                lineHeight: 1.5,
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFD23F', fontWeight: 700, marginBottom: '6px' }}>
                <AlertCircle size={16} />
                <span>Static Build Notice</span>
              </div>
              {statusNotice}
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <a
                  href={CONTACT_INFO.getWhatsAppUrl(`Hi StudentDays Team! I need help verifying my booking for email: ${email || 'student'}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass blue sm"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageSquare size={13} />
                  <span>Contact Coordinator</span>
                </a>
                <Link to="/login" className="glass sm" style={{ textDecoration: 'none' }}>
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="form-label">Registered Student Email</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="rohan@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="glass blue big" style={{ width: '100%' }}>
              Send Reset Link
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link to="/login" style={{ color: '#1E6BFF', fontSize: '14px', fontWeight: 600 }}>
              ← Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
