import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { College } from '../types';
import { STATIC_COLLEGES } from '../data/collegesData';
import { IMAGES } from '../config/images';
import CONTACT_INFO from '../data/contactInfo';
import { MapPin, ExternalLink, Award, Search, Users } from 'lucide-react';

export const Colleges: React.FC = () => {
  const [colleges] = useState<College[]>(STATIC_COLLEGES);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = colleges.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <BackButton to="/" />
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px auto' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', color: '#ffffff', marginBottom: '16px' }}>
            These colleges said let's go. We said bet. 🫡
          </h1>
          <p style={{ color: '#FFD23F', fontSize: '20px', fontWeight: 700, margin: '0 0 16px 0' }}>
            your college not here? that's on you fr 💀
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', margin: '0 0 28px 0' }}>
            Explore university student chapters partnering with StudentDays for weekend treks, semester breaks, and campus tours.
          </p>

          {/* Search Bar */}
          <div style={{ position: 'relative', maxWidth: '440px', margin: '0 auto' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#8fa3c7' }} />
            <input
              type="text"
              placeholder="Search by college name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass"
              style={{
                width: '100%',
                padding: '12px 18px 12px 46px',
                borderRadius: '30px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filtered.map((col) => (
            <div key={col.id} className="glass-panel" style={{ padding: '30px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={IMAGES.logoBadge} alt={col.name} style={{ width: '38px', height: 'auto' }} />
                  </div>
                  <span className="badge badge-blue">
                    <Award size={12} />
                    <span>Partner Chapter</span>
                  </span>
                </div>

                <h3 style={{ fontSize: '22px', color: '#ffffff', marginBottom: '8px' }}>{col.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFD23F', fontSize: '13px', fontWeight: 600, marginBottom: '14px' }}>
                  <MapPin size={13} />
                  <span>{col.city}, {col.state}</span>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: '14px 0 0 0' }}>
                  {col.activeStudents && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Users size={14} color="#1E6BFF" />
                      <span>{col.activeStudents}+ students</span>
                    </div>
                  )}
                  {col.tripsCompleted && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Award size={14} color="#2ECC71" />
                      <span>{col.tripsCompleted} cohorts completed</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a
                  href={CONTACT_INFO.getWhatsAppUrl(`Hi StudentDays, I am from ${col.name} and want to inquire about college batch trips.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass sm blue"
                  style={{ textDecoration: 'none' }}
                >
                  Join Chapter WhatsApp
                </a>

                <Link to="/contact" className="glass sm">
                  Contact Lead
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bring StudentDays to your campus banner */}
        <div
          className="glass-panel"
          style={{
            marginTop: '60px',
            padding: '40px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(30, 107, 255, 0.2), rgba(6, 18, 43, 0.8))'
          }}
        >
          <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '12px' }}>
            Want StudentDays at your university?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
            Become an official StudentDays Campus Lead. Unlock free trips, exclusive swag, leadership certificates, and curate journeys for your college cohort.
          </p>
          <a
            href={CONTACT_INFO.getWhatsAppUrl('Hi! I want to apply as a StudentDays Campus Ambassador for my university.')}
            target="_blank"
            rel="noopener noreferrer"
            className="glass yellow big"
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            Apply as Campus Ambassador ✨
          </a>
        </div>
      </div>
    </div>
  );
};

export default Colleges;
