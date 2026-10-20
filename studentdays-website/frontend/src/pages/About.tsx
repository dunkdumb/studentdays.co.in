import React from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { Target, Globe, Compass, Users, Sparkles, Network, CheckCircle, Shield, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: 'radial-gradient(120% 70% at 50% 0, #0b2a66, #030a1a 70%)' }}>
      <div className="wrap" style={{ maxWidth: '960px' }}>
        <BackButton to="/" />

        {/* Header */}
        <div className="ctop" style={{ textAlign: 'center', margin: '0 auto 50px auto' }}>
          <span className="pill">Travel. Connect. Experience.</span>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', margin: '20px auto 14px' }}>
            About Us
          </h1>
          <p className="sub" style={{ color: '#cfe0ff', fontSize: 'clamp(16px, 2.2vw, 20px)', maxWidth: '52ch', margin: '0 auto', lineHeight: 1.6 }}>
            StudentDays.co is a student-first Travel Community &amp; Experience platform built to create unforgettable experiences beyond classrooms.
          </p>
        </div>

        {/* Who We Are */}
        <div className="glass-panel" style={{ padding: '36px 32px', marginBottom: '40px', lineHeight: 1.7 }}>
          <h2 style={{ fontSize: '26px', color: '#ffffff', marginBottom: '16px' }}>Who we are</h2>
          <p style={{ color: '#e3ecff', fontSize: '16px', margin: '0 0 16px 0' }}>
            We believe that the best memories of student life are not only made inside colleges but also through adventures, friendships, events, and shared experiences.
          </p>
          <p style={{ color: '#e3ecff', fontSize: '16px', margin: '0 0 16px 0' }}>
            Our mission is to bring students together through affordable trips, meaningful connections, and exciting opportunities.
          </p>
          <p style={{ color: '#e3ecff', fontSize: '16px', margin: 0 }}>
            Whether it's exploring new destinations, meeting like-minded people, attending student events, or building lifelong friendships, StudentDays.co is designed to make every student journey more memorable.
          </p>
        </div>

        {/* Mission & Vision */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(30,107,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E6BFF', marginBottom: '18px' }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '22px', color: '#ffffff', marginBottom: '12px' }}>🎯 Our Mission</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
              To create affordable, safe, and memorable experiences that help students explore the world, build meaningful connections, and make the most of their student life.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,210,63,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD23F', marginBottom: '18px' }}>
              <Globe size={24} />
            </div>
            <h3 style={{ fontSize: '22px', color: '#ffffff', marginBottom: '12px' }}>🚀 Our Vision</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
              To become India's largest student community platform where students can travel, connect, learn, and create lifelong memories together.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="glass-panel" style={{ padding: '36px 32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '26px', color: '#ffffff', textAlign: 'center', marginBottom: '28px' }}>
            What we do
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>✈️</div>
              <h4 style={{ fontSize: '18px', color: '#6ea2ff', marginBottom: '8px' }}>Student Trips</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Curated and budget-friendly trips designed specifically for students.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>🤝</div>
              <h4 style={{ fontSize: '18px', color: '#FFD23F', marginBottom: '8px' }}>Student Communities</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Building communities where students can connect, collaborate, and grow together.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>🎉</div>
              <h4 style={{ fontSize: '18px', color: '#2ECC71', marginBottom: '8px' }}>Campus Experiences</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Organizing events, meetups, workshops, and activities that make college life more exciting.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>🌐</div>
              <h4 style={{ fontSize: '18px', color: '#a9cbff', marginBottom: '8px' }}>Networking Opportunities</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Helping students meet peers from different colleges, cities, and backgrounds.
              </p>
            </div>
          </div>
        </div>

        {/* Why StudentDays? */}
        <div className="glass-panel" style={{ padding: '36px 32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '26px', color: '#ffffff', textAlign: 'center', marginBottom: '24px' }}>
            Why StudentDays?
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {[
              'Student-friendly pricing',
              'Safe and organized experiences',
              'Opportunities to make new friends',
              'Community-driven experiences',
              'Memorable adventures and stories',
              'Exclusive experiences designed for students'
            ].map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#e3ecff' }}>
                <CheckCircle size={18} color="#2ECC71" style={{ flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Values */}
        <div className="glass-panel" style={{ padding: '36px 32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '26px', color: '#ffffff', textAlign: 'center', marginBottom: '28px' }}>
            Our values
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ fontSize: '18px', color: '#FFD23F', marginBottom: '8px' }}>Community First</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                We believe great experiences are created together.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ fontSize: '18px', color: '#6ea2ff', marginBottom: '8px' }}>Authentic Experiences</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Every trip, event, and activity is designed to create genuine memories.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ fontSize: '18px', color: '#2ECC71', marginBottom: '8px' }}>Accessibility</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Quality experiences should be affordable and accessible to every student.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ fontSize: '18px', color: '#ff6b81', marginBottom: '8px' }}>Growth Through Exploration</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Travel and experiences help students learn, grow, and discover new perspectives.
              </p>
            </div>
          </div>
        </div>

        {/* Our Promise & Tagline */}
        <div
          className="glass-panel"
          style={{
            padding: '36px 32px',
            marginBottom: '40px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(30,107,255,0.2), rgba(3,10,26,0.8))'
          }}
        >
          <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '14px' }}>Our promise</h2>
          <p style={{ color: '#cfe0ff', fontSize: '17px', margin: '0 0 16px 0', fontWeight: 600 }}>
            At StudentDays.co, we don't just organize trips.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: 1.8, margin: '0 0 20px 0' }}>
            We create experiences.<br />
            We build friendships.<br />
            We connect students.<br />
            We create stories that last a lifetime.
          </p>
          <p style={{ color: '#FFD23F', fontSize: '22px', fontWeight: 800, margin: '0 0 8px 0' }}>
            "Every Trip Becomes a Story."
          </p>
          <p style={{ color: '#6ea2ff', fontSize: '15px', fontWeight: 700, margin: 0 }}>
            Travel. Connect. Experience.
          </p>
        </div>

        {/* Company Information */}
        <div className="glass-panel" style={{ padding: '36px 32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', color: '#ffffff', textAlign: 'center', marginBottom: '24px' }}>
            Company information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', textAlign: 'center' }}>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Founded</small>
              <b style={{ color: '#ffffff', fontSize: '16px' }}>2026</b>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Founders</small>
              <b style={{ color: '#ffffff', fontSize: '16px' }}>Rohith Banoth &amp; Lohith Ajmeera</b>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Headquarters</small>
              <b style={{ color: '#ffffff', fontSize: '16px' }}>Hyderabad, India</b>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Email</small>
              <b style={{ color: '#6ea2ff', fontSize: '15px' }}><a href="mailto:hello@studentdays.co.in" style={{ color: '#6ea2ff' }}>hello@studentdays.co.in</a></b>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Website</small>
              <b style={{ color: '#ffffff', fontSize: '16px' }}>www.studentdays.co.in</b>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Category</small>
              <b style={{ color: '#ffffff', fontSize: '16px' }}>Student Travel &amp; Experiences</b>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/trips" className="glass blue big">
            Explore Upcoming Trips →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
