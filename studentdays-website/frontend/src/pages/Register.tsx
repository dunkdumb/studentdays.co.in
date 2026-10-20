import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { IMAGES } from '../config/images';
import CONTACT_INFO from '../data/contactInfo';
import { UserPlus, AlertCircle, MessageSquare } from 'lucide-react';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    collegeName: '',
    studentId: ''
  });
  const [statusNotice, setStatusNotice] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(
      'Notice: Online student account registration and database persistence are disabled in this static build. You do NOT need an account to travel with us! Simply connect directly on WhatsApp (+91 96403 89230) to reserve seats for yourself or your college batch.'
    );
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#06122b' }}>
      <div className="wrap" style={{ width: '100%', maxWidth: '520px' }}>
        <BackButton to="/" style={{ marginBottom: '16px' }} />
        <div className="glass-panel" style={{ padding: '36px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <Link to="/">
              <img src={IMAGES.logo} alt="StudentDays.co" style={{ height: '42px', width: 'auto', marginBottom: '14px' }} />
            </Link>
            <h1 style={{ fontSize: '26px', color: '#ffffff', marginBottom: '8px' }}>Create Student Account</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
              Join thousands of college explorers traveling with StudentDays
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
                  href={CONTACT_INFO.getWhatsAppUrl(`Hi StudentDays Team! My name is ${formData.name || 'a student'} from ${formData.collegeName || 'college'}. I want to join upcoming trips!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass blue sm"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageSquare size={13} />
                  <span>Join via WhatsApp</span>
                </a>
                <Link to="/trips" className="glass sm" style={{ textDecoration: 'none' }}>
                  Explore Trips
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                className="form-input"
                placeholder="Rohan Sharma"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder="rohan@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">College / University *</label>
                <input
                  type="text"
                  name="collegeName"
                  required
                  className="form-input"
                  placeholder="VNR VJIET / CBIT"
                  value={formData.collegeName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Student ID / Roll No</label>
                <input
                  type="text"
                  name="studentId"
                  className="form-input"
                  placeholder="22071A05XX"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Choose Password *</label>
              <input
                type="password"
                name="password"
                required
                className="form-input"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="glass yellow big" style={{ width: '100%', marginTop: '8px' }}>
              <UserPlus size={18} />
              <span>Register for StudentDays</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1E6BFF', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
