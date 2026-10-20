import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public Pages
import { Home } from './pages/Home';
import { ExploreTrips } from './pages/ExploreTrips';
import { TripDetails } from './pages/TripDetails';
import { ArakuTripDetails } from './pages/ArakuTripDetails';
import { Gallery } from './pages/Gallery';
import { Colleges } from './pages/Colleges';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Terms } from './pages/Terms';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CancellationPolicy } from './pages/CancellationPolicy';
import { Faq } from './pages/Faq';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public Working Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<ExploreTrips />} />
          <Route path="/trips/araku-vanjangi" element={<ArakuTripDetails />} />
          <Route path="/trips/araku-vanajangi-clouds" element={<ArakuTripDetails />} />
          <Route path="/trips/:slug" element={<TripDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/faqs" element={<Faq />} />

          {/* Removed Portal/Login Routes: Redirect safely to Home/Trips */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/student/login" element={<Navigate to="/" replace />} />
          <Route path="/coordinator/login" element={<Navigate to="/" replace />} />
          <Route path="/admin/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/trips" replace />} />
          <Route path="/forgot-password" element={<Navigate to="/" replace />} />
          <Route path="/student/*" element={<Navigate to="/" replace />} />
          <Route path="/coordinator/*" element={<Navigate to="/" replace />} />
          <Route path="/admin/*" element={<Navigate to="/" replace />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
