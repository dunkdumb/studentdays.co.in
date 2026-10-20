import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '100px', background: '#06122b' }}>
      <div className="wrap" style={{ maxWidth: '500px' }}>
        <div className="glass-panel" style={{ padding: '48px 36px' }}>
          <Compass size={64} color="#FFD23F" style={{ margin: '0 auto 20px auto' }} />
          <h1 style={{ fontSize: '48px', color: '#ffffff', marginBottom: '10px' }}>404</h1>
          <h2 style={{ fontSize: '22px', color: '#6ea2ff', marginBottom: '14px' }}>Off the Trail!</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
            The destination or trail you are looking for doesn't exist or has moved. Let's get you back to the campsite.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/" className="glass blue">
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
            <Link to="/trips" className="glass">
              <span>Explore Trips</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
