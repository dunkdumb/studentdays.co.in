import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { IMAGES } from '../config/images';
import CONTACT_INFO from '../data/contactInfo';
import { LogIn, Lock, Mail, MessageSquare, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusNotice, setStatusNotice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(
      'Notice: Portal authentication and database logins are disabled in this static frontend deployment. All student travel bookings and college cohort coordination are handled directly on WhatsApp (+91 96403 89230).'
    );
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030a1a' }}>
      <div className="wrap" style={{ width: '100%', maxWidth: '460px' }}>
        <BackButton to="/" style={{ marginBottom: '16px' }} />
        <div className="fcard" style={{ padding: '36px 30px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <Link to="/">
              <img src={IMAGES.logo} alt="StudentDays.co" style={{ height: '42px', width: 'auto', marginBottom: '14px' }} />
            </Link>
            <h1 style={{ fontSize: '26px', color: '#ffffff', marginBottom: '8px' }}>Student Sign In</h1>
            <p style={{ color: '#aab6cc', fontSize: '14px', margin: 0 }}>
              Access your trip bookings, passes & certificates
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
                  href={CONTACT_INFO.getWhatsAppUrl('Hi StudentDays Team! I am trying to access my student trip booking.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass blue sm"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageSquare size={13} />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link to="/trips" className="glass sm" style={{ textDecoration: 'none' }}>
                  Explore Trips
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#cfe0ff', marginBottom: '6px' }}>
                Student Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8fa3c7' }} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@college.edu"
                  style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '15px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '14px', color: '#cfe0ff', margin: 0 }}>
                  Password
                </label>
                <Link to="/forgot-password" style={{ fontSize: '12px', color: '#6ea2ff' }}>
                  Forgot Password?
                </Link>
              </div>
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
              <LogIn size={18} />
              <span>Sign In to Student Portal</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#cfd8ea' }}>
            New to StudentDays?{' '}
            <Link to="/register" style={{ color: '#FFD23F', fontWeight: 700 }}>
              Create Account
            </Link>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '24px', paddingTop: '16px', textAlign: 'center', fontSize: '12px', color: '#8fa3c7', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/coordinator/login" style={{ color: '#8fc0ff', textDecoration: 'none' }}>
              Coordinator Login →
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

export default Login;
