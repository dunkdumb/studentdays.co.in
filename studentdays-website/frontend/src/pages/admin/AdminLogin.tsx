import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import CONTACT_INFO from '../../data/contactInfo';
import { Lock, Mail, KeyRound, AlertCircle, MessageSquare } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusNotice, setStatusNotice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(
      'Notice: The Master Administrative Console and database authentication are disabled in this static frontend deployment. Database records, server endpoints, and elevated privileges require server infrastructure which has been decoupled.'
    );
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020712' }}>
      <div className="wrap" style={{ width: '100%', maxWidth: '460px' }}>
        <BackButton to="/" style={{ marginBottom: '16px' }} />
        <div
          className="fcard"
          style={{
            padding: '38px 32px',
            border: '1px solid rgba(255, 210, 63, 0.4)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 210, 63, 0.15)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'grid', placeItems: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255, 210, 63, 0.15)', margin: '0 auto 14px' }}>
              <KeyRound size={28} color="#FFD23F" />
            </div>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: 'rgba(255, 210, 63, 0.2)',
                color: '#FFD23F',
                border: '1px solid rgba(255, 210, 63, 0.35)',
                marginBottom: '10px'
              }}
            >
              Master Console
            </span>
            <h1 style={{ fontSize: '26px', color: '#ffffff', margin: '8px 0' }}>Administration</h1>
            <p style={{ color: '#aab6cc', fontSize: '14px', margin: 0 }}>
              Encrypted 256-bit StudentDays command interface
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
                <Link to="/trips" className="glass sm" style={{ textDecoration: 'none' }}>
                  Explore Trips
                </Link>
                <Link to="/" className="glass sm" style={{ textDecoration: 'none' }}>
                  Homepage
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#cfe0ff', marginBottom: '6px' }}>
                Root Admin Identifier
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8fa3c7' }} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@studentdays.co"
                  style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '15px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#cfe0ff', marginBottom: '6px' }}>
                Cryptographic Secret Key
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

            <button
              type="submit"
              className="glass"
              style={{
                width: '100%',
                marginTop: '6px',
                background: 'linear-gradient(135deg, rgba(255,210,63,0.3), rgba(255,210,63,0.1))',
                borderColor: '#FFD23F',
                color: '#FFD23F',
                fontWeight: 700
              }}
            >
              Initialize Master Session
            </button>
          </form>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '24px', paddingTop: '16px', textAlign: 'center', fontSize: '12px', color: '#8fa3c7', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/login" style={{ color: '#8fc0ff', textDecoration: 'none' }}>
              ← Student Sign In
            </Link>
            <span>·</span>
            <Link to="/coordinator/login" style={{ color: '#8fc0ff', textDecoration: 'none' }}>
              Coordinator Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
