import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AUTHENTIC_TRIPS, AuthenticTrip } from '../data/tripsData';
import { BookingModal } from '../components/BookingModal';
import { BackButton } from '../components/BackButton';
import {
  MapPin,
  Calendar,
  Check,
  X as XIcon,
  Download,
  ExternalLink,
  Utensils,
  Hotel,
  Compass,
  Sun,
  Shield,
  Clock,
  Camera,
  Car,
  ChevronDown
} from 'lucide-react';

export const ArakuTripDetails: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Retrieve official trip from AUTHENTIC_TRIPS
  const trip = AUTHENTIC_TRIPS.find(
    (t) => t.slug === 'araku-vanjangi' || t.id === 'araku-vanjangi'
  ) || AUTHENTIC_TRIPS[2];

  const PDF_VIEW_URL = 'https://drive.google.com/file/d/1q0RAVRFtUEsx5numGp1r65kTAK73RSYw/preview';
  const PDF_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1q0RAVRFtUEsx5numGp1r65kTAK73RSYw';
  const GOOGLE_FORM_URL = 'https://forms.gle/hMsrGxBguR577LyA9';

  const handlePreBook = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    setBookingOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ paddingTop: '74px', paddingBottom: '100px', background: '#030a1a', minHeight: '100vh', color: '#ffffff' }}>
      {/* ========================================================================= */}
      {/* SECTION A: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '520px',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          paddingBottom: '48px',
          paddingTop: '60px'
        }}
      >
        <img
          src="/assets/trips/araku/hero-cover.jpg"
          alt="Araku & Vanjangi Sunrise"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'brightness(0.7)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(3,10,26,0.35) 0%, rgba(3,10,26,0.8) 65%, #030a1a 100%)'
          }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <BackButton to="/trips" label="Back to All Trips" style={{ marginBottom: '20px' }} />

          {/* Badges */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span className="badge badge-blue">
              <MapPin size={13} />
              <span>Vizag, Araku Valley & Vanjangi</span>
            </span>
            <span className="badge badge-yellow">
              <Calendar size={13} />
              <span>2 Nights / 3 Days</span>
            </span>
            <span className="badge" style={{ background: 'rgba(30,107,255,0.3)', color: '#cfe0ff', border: '1px solid rgba(111,165,255,0.4)' }}>
              Travel. Connect. Experience.
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 10px 0',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
          >
            ARAKU & VANJANGI
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2.2vw, 20px)',
              color: '#cfe0ff',
              maxWidth: '720px',
              margin: '0 0 24px 0',
              lineHeight: 1.5,
              textShadow: '0 2px 10px rgba(0,0,0,0.7)'
            }}
          >
            2 Nights / 3 Days · Travel. Connect. Experience.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              marginBottom: '26px'
            }}
          >
            <div
              style={{
                background: 'rgba(6, 18, 43, 0.85)',
                padding: '12px 20px',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <span style={{ fontSize: '13px', color: '#8fb3f5', display: 'block' }}>Package Price</span>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>₹7,499</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginLeft: '6px' }}>/ person</span>
            </div>

            <div
              style={{
                background: 'rgba(30, 107, 255, 0.18)',
                padding: '12px 20px',
                borderRadius: '18px',
                border: '1px solid rgba(111, 165, 255, 0.35)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <span style={{ fontSize: '13px', color: '#FFD23F', display: 'block' }}>Pre-booking Amount</span>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>₹1,999 to reserve</span>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => scrollToSection('itinerary')}
              className="glass blue"
              style={{
                padding: '14px 26px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              EXPLORE ITINERARY
              <ChevronDown size={16} />
            </button>

            <a
              href={PDF_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass"
              style={{
                padding: '14px 24px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              VIEW FULL ITINERARY PDF
              <ExternalLink size={16} />
            </a>

            <button
              type="button"
              onClick={handlePreBook}
              className="glass"
              style={{
                padding: '14px 24px',
                fontSize: '15px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FFD23F, #ff9f1c)',
                color: '#030a1a',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              PRE-BOOK (₹1,999)
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="wrap" style={{ marginTop: '36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '36px' }} className="araku-layout-grid">
          {/* Main Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {/* ========================================================================= */}
            {/* SECTION B: TRIP OVERVIEW                                                  */}
            {/* ========================================================================= */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <span className="pill" style={{ marginBottom: '12px' }}>Overview</span>
              <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '14px', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Araku & Vanjangi Escape
              </h2>
              <p style={{ color: '#e3ecff', fontSize: '17px', lineHeight: 1.7, marginBottom: '24px' }}>
                Experience the beauty of Araku Valley and Vanjangi through scenic mountains, waterfalls, coffee plantations, local culture, comfortable accommodation, and an unforgettable early-morning sunrise experience.
              </p>

              {/* Quick Feature Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '14px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass size={20} color="#1E6BFF" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Destination</strong>
                    <span style={{ fontSize: '13px', color: '#8fb3f5' }}>Vizag, Araku & Vanjangi</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={20} color="#1E6BFF" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Duration</strong>
                    <span style={{ fontSize: '13px', color: '#8fb3f5' }}>2 Nights / 3 Days</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Hotel size={20} color="#1E6BFF" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Stay Included</strong>
                    <span style={{ fontSize: '13px', color: '#8fb3f5' }}>Deluxe AC Rooms</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Utensils size={20} color="#1E6BFF" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Meals Included</strong>
                    <span style={{ fontSize: '13px', color: '#8fb3f5' }}>Breakfast (all 3d) + Dinner</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Car size={20} color="#1E6BFF" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Jeep Rides Included</strong>
                    <span style={{ fontSize: '13px', color: '#8fb3f5' }}>Katiki Falls & Vanjangi</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Camera size={20} color="#1E6BFF" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Media Coverage</strong>
                    <span style={{ fontSize: '13px', color: '#8fb3f5' }}>Photos & Videos included</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION C: DAY-WISE ITINERARY                                             */}
            {/* ========================================================================= */}
            <div id="itinerary" className="glass-panel" style={{ padding: '32px' }}>
              <span className="pill" style={{ marginBottom: '12px' }}>Day-Wise Schedule</span>
              <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '8px', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Complete Itinerary
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '15px', marginBottom: '32px' }}>
                Follow the official 3-day itinerary through the Eastern Ghats, Borra Caves, coffee plantations, and the Vanjangi sunrise.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* DAY 1 */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '22px',
                    padding: '24px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <span className="badge badge-blue" style={{ fontSize: '13px', padding: '6px 14px' }}>
                      DAY 1 — VIZAG TO ARAKU VALLEY
                    </span>
                    <span style={{ fontSize: '13px', color: '#FFD23F', fontWeight: 600 }}>
                      Scenic journey through the Eastern Ghats
                    </span>
                  </div>

                  <p style={{ color: '#e3ecff', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
                    Pickup from Vizag and begin the scenic journey through the Eastern Ghats.
                  </p>

                  <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8fb3f5', marginBottom: '10px' }}>
                    Sightseeing Attractions:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                    {[
                      '1. Borra Caves',
                      '2. Katiki Waterfalls',
                      '3. Coffee Plants & Plantations',
                      '4. Galikonda Viewpoint',
                      '5. Hilltop Church',
                      '6. Wooden Bridge',
                      '7. Pets and Wings (Added attraction)'
                    ].map((att, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#ffffff' }}>
                        <span style={{ color: '#1E6BFF' }}>✦</span>
                        <span>{att}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlight banner */}
                  <div
                    style={{
                      background: 'rgba(30, 107, 255, 0.2)',
                      border: '1px solid rgba(111, 165, 255, 0.4)',
                      borderRadius: '14px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '16px'
                    }}
                  >
                    <Car size={18} color="#FFD23F" />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                      Package Highlight: Jeep ride for Katiki Waterfalls included in the package.
                    </span>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      paddingTop: '12px',
                      fontSize: '13px',
                      color: '#8fb3f5',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Hotel size={16} color="#8fb3f5" />
                    <span><strong>Night Stay:</strong> Araku Valley (Aaradhya Hotel) · Enjoy a relaxing overnight stay in the cool hills of Araku.</span>
                  </div>
                </div>

                {/* DAY 2 */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '22px',
                    padding: '24px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <span className="badge badge-blue" style={{ fontSize: '13px', padding: '6px 14px' }}>
                      DAY 2 — EXPLORE ARAKU VALLEY
                    </span>
                    <span style={{ fontSize: '13px', color: '#FFD23F', fontWeight: 600 }}>
                      Gardens, tribal culture & coffee heritage
                    </span>
                  </div>

                  <p style={{ color: '#e3ecff', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
                    Discover Araku’s gardens, tribal culture, coffee heritage, and natural beauty.
                  </p>

                  <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8fb3f5', marginBottom: '10px' }}>
                    Sightseeing Attractions:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                    {[
                      '1. Padmapuram Gardens',
                      '2. Chocolate Factory',
                      '3. Tribal Museum',
                      '4. Coffee Factory / Museum',
                      '5. Araku Pineapple Gardens',
                      '6. Chaparai Waterfalls'
                    ].map((att, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#ffffff' }}>
                        <span style={{ color: '#1E6BFF' }}>✦</span>
                        <span>{att}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      paddingTop: '12px',
                      fontSize: '13px',
                      color: '#8fb3f5',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Hotel size={16} color="#8fb3f5" />
                    <span><strong>Night Stay:</strong> Near Vanjangi (Nirvana Resorts, Paderu) · Prepare for the next morning’s sunrise experience.</span>
                  </div>
                </div>

                {/* DAY 3 */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '22px',
                    padding: '24px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <span className="badge badge-yellow" style={{ fontSize: '13px', padding: '6px 14px' }}>
                      DAY 3 — VANJANGI SUNRISE & RETURN TO VIZAG
                    </span>
                    <span style={{ fontSize: '13px', color: '#FFD23F', fontWeight: 600 }}>
                      Sunrise, temple visit and the journey home
                    </span>
                  </div>

                  <p style={{ color: '#e3ecff', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
                    Wake up early for the highlight of the trip.
                  </p>

                  <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8fb3f5', marginBottom: '10px' }}>
                    Scheduled Activities:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                    {[
                      '1. Early-morning Vanjangi Sunrise Viewpoint',
                      '2. Jeep ride to the sunrise viewpoint (Included)',
                      '3. Modhakondamma Temple',
                      '4. Return to Vizag by afternoon'
                    ].map((att, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#ffffff' }}>
                        <span style={{ color: '#FFD23F' }}>✦</span>
                        <span>{att}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Signature Experience Highlight Box */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,210,63,0.18), rgba(255,159,28,0.12))',
                      border: '1px solid rgba(255, 210, 63, 0.45)',
                      borderRadius: '16px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}
                  >
                    <Sun size={24} color="#FFD23F" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '15px', color: '#FFD23F', marginBottom: '4px' }}>
                        SIGNATURE EXPERIENCE: Vanjangi Sunrise
                      </strong>
                      <p style={{ margin: 0, fontSize: '14px', color: '#ffffff', lineHeight: 1.5 }}>
                        The early-morning sunrise viewpoint, with the jeep ride included in the package, is the signature experience of this trip.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION D: ACCOMMODATION SECTION                                          */}
            {/* ========================================================================= */}
            <div id="accommodation" className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                <div>
                  <span className="pill" style={{ marginBottom: '8px' }}>Where You’ll Stay</span>
                  <h2 style={{ fontSize: '28px', color: '#ffffff', margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Verified Accommodations
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('accommodation')}
                  className="glass sm"
                  style={{ fontSize: '13px' }}
                >
                  VIEW ACCOMMODATION DETAILS
                </button>
              </div>

              <p style={{ color: '#8fb3f5', fontSize: '15px', marginBottom: '28px' }}>
                Deluxe AC Rooms | Accommodation is included in the package
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {/* Property 1: Aaradhya Hotel */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '20px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-blue">NIGHT 1 — ARAKU VALLEY</span>
                    <span style={{ fontSize: '12px', color: '#2ECC71', fontWeight: 600 }}>Deluxe AC Rooms</span>
                  </div>

                  <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '4px' }}>Aaradhya Hotel</h3>
                  <p style={{ fontSize: '14px', color: '#cfe0ff', marginBottom: '16px' }}>
                    Location: Araku Valley · Your stay in Araku Valley
                  </p>

                  {/* Photo Grid from PDF */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    {[1, 2, 3, 4].map((num) => (
                      <div
                        key={num}
                        onClick={() => setSelectedPhoto(`/assets/trips/araku/aaradhya-hotel-${num}.jpg`)}
                        style={{
                          height: '110px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={`/assets/trips/araku/aaradhya-hotel-${num}.jpg`}
                          alt={`Aaradhya Hotel Room ${num}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.2s' }}
                        />
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                    Tap any photo to view full resolution
                  </span>
                </div>

                {/* Property 2: Nirvana Resorts */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '20px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-yellow">NIGHT 2 — NEAR VANJANGI</span>
                    <span style={{ fontSize: '12px', color: '#2ECC71', fontWeight: 600 }}>Deluxe AC Rooms</span>
                  </div>

                  <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '4px' }}>Nirvana Resorts</h3>
                  <p style={{ fontSize: '14px', color: '#cfe0ff', marginBottom: '16px' }}>
                    Location: Paderu — near Vanjangi · Your stay near Vanjangi
                  </p>

                  {/* Photo Grid from PDF */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    {[1, 2, 3, 4].map((num) => (
                      <div
                        key={num}
                        onClick={() => setSelectedPhoto(`/assets/trips/araku/nirvana-resorts-${num}.jpg`)}
                        style={{
                          height: '110px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={`/assets/trips/araku/nirvana-resorts-${num}.jpg`}
                          alt={`Nirvana Resorts Room ${num}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.2s' }}
                        />
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                    Tap any photo to view full resolution
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION E: PACKAGE INCLUSIONS AND EXCLUSIONS                             */}
            {/* ========================================================================= */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <span className="pill" style={{ marginBottom: '12px' }}>Package Details</span>
              <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '24px', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                What’s Included & Excluded
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
                {/* Inclusions */}
                <div
                  style={{
                    background: 'rgba(46, 204, 113, 0.06)',
                    border: '1px solid rgba(46, 204, 113, 0.25)',
                    borderRadius: '20px',
                    padding: '24px'
                  }}
                >
                  <h3 style={{ fontSize: '18px', color: '#2ECC71', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={20} />
                    <span>PACKAGE INCLUSIONS</span>
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Accommodation (Deluxe AC Rooms)',
                      'Local Transportation',
                      'Jeep Ride for Katiki Waterfalls',
                      'Jeep Ride for Vanjangi Sunrise Viewpoint',
                      'Train Tickets to and from Hyderabad',
                      'Photography & Videography',
                      'Breakfast on all three days',
                      'Dinner on Days 1 and 2'
                    ].map((inc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#ffffff' }}>
                        <span style={{ color: '#2ECC71', fontWeight: 700 }}>✔</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div
                  style={{
                    background: 'rgba(255, 107, 129, 0.06)',
                    border: '1px solid rgba(255, 107, 129, 0.25)',
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '18px', color: '#ff6b81', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <XIcon size={20} />
                      <span>PACKAGE EXCLUSIONS</span>
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        'Lunch',
                        'Any expenses or services not specifically mentioned in the inclusions'
                      ].map((exc, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#ffffff' }}>
                          <span style={{ color: '#ff6b81', fontWeight: 700 }}>✖</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explicit Lunch Notice from PDF */}
                  <div
                    style={{
                      background: 'rgba(255, 107, 129, 0.15)',
                      border: '1px solid rgba(255, 107, 129, 0.35)',
                      borderRadius: '14px',
                      padding: '14px',
                      fontSize: '14px',
                      color: '#ffffff',
                      fontWeight: 600
                    }}
                  >
                    ⚠️ Lunch is not included in the package on any day.
                  </div>
                </div>
              </div>

              {/* Transit note preserving stated PDF info */}
              <div
                style={{
                  marginTop: '20px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.5
                }}
              >
                <strong>Travel Note:</strong> The package includes train tickets to and from Hyderabad, while Day 1 itinerary begins upon pickup in Vizag. Confirmed boarding details and schedules are shared with registered participants prior to departure.
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION F: MEAL PLAN                                                      */}
            {/* ========================================================================= */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <span className="pill" style={{ marginBottom: '12px' }}>Catering Details</span>
              <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '8px', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Meal Plan
              </h2>
              <p style={{ color: '#8fb3f5', fontSize: '15px', marginBottom: '24px' }}>
                Breakfast on all three days | Dinner on Days 1 and 2
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                {/* Day 1 Meals */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '18px',
                    padding: '20px'
                  }}
                >
                  <span className="badge badge-blue" style={{ marginBottom: '12px' }}>DAY 1 MEALS</span>

                  <div style={{ marginBottom: '14px' }}>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#2ECC71', marginBottom: '6px' }}>
                      BREAKFAST:
                    </strong>
                    <span style={{ fontSize: '14px', color: '#ffffff' }}>Dosa, Idly</span>
                  </div>

                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#1E6BFF', marginBottom: '6px' }}>
                      DINNER:
                    </strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li>• Veg Biryani</li>
                      <li>• Pulka</li>
                      <li>• Andhra Chicken Curry</li>
                      <li>• Rice</li>
                      <li>• Dal</li>
                      <li>• Sambar</li>
                      <li>• Curd</li>
                      <li>• Pickle</li>
                    </ul>
                  </div>
                </div>

                {/* Day 2 Meals */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '18px',
                    padding: '20px'
                  }}
                >
                  <span className="badge badge-blue" style={{ marginBottom: '12px' }}>DAY 2 MEALS</span>

                  <div style={{ marginBottom: '14px' }}>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#2ECC71', marginBottom: '6px' }}>
                      BREAKFAST:
                    </strong>
                    <span style={{ fontSize: '14px', color: '#ffffff' }}>Mysore Bajji, Idly</span>
                  </div>

                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#1E6BFF', marginBottom: '6px' }}>
                      DINNER:
                    </strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li>• Chicken Biryani</li>
                      <li>• Cashew Paneer Curry</li>
                      <li>• Pulka</li>
                      <li>• Rice</li>
                    </ul>
                  </div>
                </div>

                {/* Day 3 Meals */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '18px',
                    padding: '20px'
                  }}
                >
                  <span className="badge badge-yellow" style={{ marginBottom: '12px' }}>DAY 3 MEALS</span>

                  <div style={{ marginBottom: '14px' }}>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#2ECC71', marginBottom: '6px' }}>
                      BREAKFAST:
                    </strong>
                    <span style={{ fontSize: '14px', color: '#ffffff' }}>Set Dosa, Idly</span>
                  </div>

                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                      DINNER:
                    </strong>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                      — (Return to Vizag by afternoon; dinner not scheduled)
                    </span>
                  </div>
                </div>
              </div>

              {/* Explicit Exclusion Bar */}
              <div
                style={{
                  background: 'rgba(255, 107, 129, 0.12)',
                  border: '1px solid rgba(255, 107, 129, 0.3)',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  fontSize: '14px',
                  color: '#ffffff',
                  textAlign: 'center',
                  fontWeight: 600
                }}
              >
                LUNCH IS NOT INCLUDED: Lunch is not part of the package on any day.
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION H: FULL ITINERARY PDF                                             */}
            {/* ========================================================================= */}
            <div id="pdf" className="glass-panel" style={{ padding: '32px' }}>
              <span className="pill" style={{ marginBottom: '12px' }}>Official Document</span>
              <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '8px', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                FULL ITINERARY PDF
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', marginBottom: '24px' }}>
                Explore the complete Araku & Vanjangi itinerary, including day-wise sightseeing, accommodation photographs, package inclusions and exclusions, meal plan, and booking details.
              </p>

              {/* PDF Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <a
                  href={PDF_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass blue"
                  style={{
                    padding: '14px 26px',
                    fontSize: '15px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <ExternalLink size={18} />
                  VIEW FULL ITINERARY PDF
                </a>

                <a
                  href={PDF_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass"
                  style={{
                    padding: '14px 24px',
                    fontSize: '15px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Download size={18} />
                  DOWNLOAD ITINERARY PDF
                </a>
              </div>

              {/* Embedded PDF Preview with Fallback */}
              <div
                style={{
                  width: '100%',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  position: 'relative'
                }}
              >
                <iframe
                  src={PDF_VIEW_URL}
                  title="Araku & Vanjangi Travel Itinerary PDF"
                  style={{
                    width: '100%',
                    height: '620px',
                    border: 'none',
                    display: 'block'
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <span>
                  Having trouble loading the Google Drive preview inside your browser?
                </span>
                <a
                  href={PDF_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8fb3f5', fontWeight: 600, textDecoration: 'underline' }}
                >
                  Open in New Tab ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Widget */}
          <div>
            <div
              id="pricing"
              className="glass-panel"
              style={{
                padding: '30px',
                position: 'sticky',
                top: '90px'
              }}
            >
              <span className="pill" style={{ marginBottom: '14px' }}>Package Pricing</span>

              {/* Pricing Breakdown */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '13px', color: '#8fb3f5', display: 'block' }}>TOTAL PACKAGE PRICE</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '42px', fontWeight: 800, color: '#ffffff' }}>
                    ₹7,499
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>/ person</span>
                </div>
                <p style={{ fontSize: '12px', color: '#cfe0ff', margin: '4px 0 0 0' }}>
                  Stay, jeep rides, train tickets, breakfast & dinner, photos & videos
                </p>
              </div>

              {/* Price Calculation Card */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>Package Price:</span>
                  <strong style={{ color: '#ffffff' }}>Rs. 7,499/-</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ color: '#FFD23F' }}>Pre-booking Amount:</span>
                  <strong style={{ color: '#FFD23F' }}>- Rs. 1,999/-</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '15px',
                    borderTop: '1px solid rgba(255,255,255,0.15)',
                    paddingTop: '10px',
                    marginTop: '8px'
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#ffffff' }}>BALANCE TO PAY:</span>
                  <strong style={{ fontSize: '17px', color: '#2ECC71' }}>= Rs. 5,500/-</strong>
                </div>
              </div>

              {/* How it works: 3 Steps from PDF */}
              <div style={{ marginBottom: '26px' }}>
                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8fb3f5', marginBottom: '14px' }}>
                  How It Works:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#1E6BFF',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '13px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      1
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '14px', color: '#ffffff' }}>Pre-book your seat</strong>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                        Pay the pre-booking amount of Rs. 1,999/- to reserve your place.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#1E6BFF',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '13px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      2
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '14px', color: '#ffffff' }}>Pre-booking is adjusted</strong>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                        The Rs. 1,999/- is deducted from the package price of Rs. 7,499/-.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#1E6BFF',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '13px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      3
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '14px', color: '#ffffff' }}>Pay the balance before the trip</strong>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                        The remaining Rs. 5,500/- is paid shortly before the trip starts.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* SECTION I: BOOKING CALL TO ACTION                                         */}
              {/* ========================================================================= */}
              <button
                type="button"
                onClick={handlePreBook}
                className="glass blue big"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(30,107,255,0.5)',
                  marginBottom: '12px'
                }}
              >
                Pre-Book Spot (₹1,999)
              </button>

              <a
                href={PDF_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <Download size={15} />
                Download Itinerary PDF
              </a>

              <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', margin: '16px 0 0 0' }}>
                Travel. Connect. Experience. · See you in Araku & Vanjangi!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Property Photos */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '800px', width: '100%' }}>
            <img
              src={selectedPhoto}
              alt="Accommodation Deluxe Room"
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px' }}
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="glass sm"
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                cursor: 'pointer'
              }}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingOpen && (
        <BookingModal
          trip={trip}
          onClose={() => setBookingOpen(false)}
        />
      )}

      <style>{`
        @media(max-width: 850px) {
          .araku-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
