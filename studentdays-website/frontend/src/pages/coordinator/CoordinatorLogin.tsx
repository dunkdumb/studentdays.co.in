import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import CONTACT_INFO from '../../data/contactInfo';
import { Compass, Lock, Mail, MessageSquare, AlertCircle } from 'lucide-react';

export const CoordinatorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusNotice, setStatusNotice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(
      'Notice: Trip Coordinator operational sessions and database authentication are decoupled in this static frontend build. Field roster updates and student cohort communications are coordinated directly via WhatsApp (+91 96403 89230).'
    );
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030a1a' }}>
      <div className="wrap" style={{ width: '100%', maxWidth: '460px' }}>
        <BackButton to="/" style={{ marginBottom: '16px' }} />
        <div className="fcard" style={{ padding: '36px 30px', border: '1px solid rgba(30, 107, 255, 0.4)', boxShadow: '0 20px 60px rgba(30, 107, 255, 0.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'grid', placeItems: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(30,107,255,0.2)', margin: '0 auto 14px' }}>
              <Compass size={28} color="#1E6BFF" />
            </div>
            <span className="pill" style={{ marginBottom: '10px' }}>Field Operations</span>
            <h1 style={{ fontSize: '26px', color: '#ffffff', margin: '8px 0' }}>Coordinator Sign In</h1>
            <p style={{ color: '#aab6cc', fontSize: '14px', margin: 0 }}>
              On-ground operations, rosters & emergency dispatch
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
                  href={CONTACT_INFO.getWhatsAppUrl('Hi! I am a StudentDays trip coordinator inquiring about trip rosters.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass blue sm"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageSquare size={13} />
                  <span>Coordinator Hotline</span>
                </a>
                <Link to="/" className="glass sm" style={{ textDecoration: 'none' }}>
                  Homepage
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#cfe0ff', marginBottom: '6px' }}>
                Coordinator Official Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8fa3c7' }} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="coordinator@studentdays.co"
                  style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '15px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#cfe0ff', marginBottom: '6px' }}>
                Security Access Key
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8fa3c7' }} />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '15px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="glass blue big" style={{ width: '100%', marginTop: '6px' }}>
              <Compass size={18} />
              <span>Access Coordinator Console</span>
            </button>
          </form>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '24px', paddingTop: '16px', textAlign: 'center', fontSize: '12px', color: '#8fa3c7', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/login" style={{ color: '#8fc0ff', textDecoration: 'none' }}>
              ← Student Sign In
            </Link>
            <span>·</span>
            <Link to="/admin/login" style={{ color: '#8fc0ff', textDecoration: 'none' }}>
              Admin Console →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorLogin;
