import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Navbar } from '../components/Navbar';
import { ExploreTrips } from '../pages/ExploreTrips';
import { About } from '../pages/About';
import { Terms } from '../pages/Terms';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { CancellationPolicy } from '../pages/CancellationPolicy';
import { Faq } from '../pages/Faq';
import { BookingModal } from '../components/BookingModal';
import { ToastProvider } from '../context/ToastContext';
import { AUTHENTIC_TRIPS } from '../data/tripsData';

describe('PROJECT: StudentDays.co Website - 5 Major Changes Verification', () => {
  beforeEach(() => {
    sessionStorage.setItem('sd_intro_shown', 'true');
  });

  // =========================================================================
  // CHANGE 1: NAVIGATION
  // =========================================================================
  describe('CHANGE 1: Navigation Order & Functionality', () => {
    it('verifies Home navbar displays Home | Trips | About | Menu in exact order', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      );

      // Main nav buttons
      const homeBtn = screen.getByRole('button', { name: /^home$/i });
      const tripsBtn = screen.getByRole('button', { name: /^trips$/i });
      const aboutBtn = screen.getByRole('button', { name: /^about$/i });
      const menuBtn = screen.getByRole('button', { name: /^menu/i });

      expect(homeBtn).toBeInTheDocument();
      expect(tripsBtn).toBeInTheDocument();
      expect(aboutBtn).toBeInTheDocument();
      expect(menuBtn).toBeInTheDocument();

      // Ensure Trips is positioned between Home and About in DOM order
      expect(homeBtn.compareDocumentPosition(tripsBtn) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(tripsBtn.compareDocumentPosition(aboutBtn) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(aboutBtn.compareDocumentPosition(menuBtn) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

      // Ensure no duplicate Trips button in Menu dropdown
      const allTripsButtons = screen.getAllByRole('button', { name: /^trips$/i });
      expect(allTripsButtons).toHaveLength(1);
    });

    it('verifies Navbar on other routes displays Home | Trips | About | Menu', () => {
      render(
        <MemoryRouter initialEntries={['/trips']}>
          <Navbar />
        </MemoryRouter>
      );

      const homeLink = screen.getByRole('link', { name: /^home$/i });
      const tripsLink = screen.getByRole('link', { name: /^trips$/i });
      const aboutLink = screen.getByRole('link', { name: /^about$/i });
      const menuBtn = screen.getByRole('button', { name: /^menu/i });

      expect(homeLink).toBeInTheDocument();
      expect(tripsLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(menuBtn).toBeInTheDocument();

      // Ensure Trips is between Home and About
      expect(homeLink.compareDocumentPosition(tripsLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(tripsLink.compareDocumentPosition(aboutLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  // =========================================================================
  // CHANGE 2: TRIPS SECTION
  // =========================================================================
  describe('CHANGE 2: Trips Section Updates', () => {
    it('verifies Kerala card has HOUSEFULL badge and is not presented for booking', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      );

      // Navigate to trips catalog view
      const tripsNavBtn = screen.getByRole('button', { name: /^trips$/i });
      fireEvent.click(tripsNavBtn);

      // Kerala card with HOUSEFULL badge
      expect(screen.getByText(/HOUSEFULL/i)).toBeInTheDocument();
      expect(screen.getByText(/Kerala, God's Own Country/i)).toBeInTheDocument();

      // Click Kerala card to open modal
      const keralaCard = screen.getByText(/Kerala, God's Own Country/i).closest('.tc');
      expect(keralaCard).toBeInTheDocument();
      fireEvent.click(keralaCard!);

      // In Kerala modal, ensure "Pre-booking form" is removed and "Bookings Closed" is shown
      expect(screen.getByText(/Bookings Closed/i)).toBeInTheDocument();
      expect(screen.queryByText(/Pre-booking form/i)).not.toBeInTheDocument();
    });

    it('verifies Gokarna & Dandeli card is removed from visible trip listings in Home', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      );

      // Navigate to trips catalog view
      const tripsNavBtn = screen.getByRole('button', { name: /^trips$/i });
      fireEvent.click(tripsNavBtn);

      // In Home carousel, Gokarna & Dandeli Expedition should NOT be present
      expect(screen.queryByText(/Gokarna & Dandeli Expedition/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Gokarna – Dandeli/i)).not.toBeInTheDocument();
    });

    it('verifies Gokarna & Dandeli card is removed in ExploreTrips', () => {
      render(
        <MemoryRouter initialEntries={['/trips']}>
          <ExploreTrips />
        </MemoryRouter>
      );

      expect(screen.queryByText(/Gokarna & Dandeli Expedition/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Gokarna – Dandeli/i)).not.toBeInTheDocument();
    });

    it('verifies Vizag / Araku has UPCOMING badge clearly visible', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      );

      // Navigate to trips catalog view
      const tripsNavBtn = screen.getByRole('button', { name: /^trips$/i });
      fireEvent.click(tripsNavBtn);

      // Vizag/Araku card with UPCOMING badge
      const upcomingBadges = screen.getAllByText(/UPCOMING/i);
      expect(upcomingBadges.length).toBeGreaterThan(0);
      expect(screen.getByText(/Araku & Vanjangi Escape/i)).toBeInTheDocument();
    });

    it('verifies Custom Trip card is preserved in Home carousel', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      );

      // Navigate to trips catalog view
      const tripsNavBtn = screen.getByRole('button', { name: /^trips$/i });
      fireEvent.click(tripsNavBtn);

      expect(screen.getByText(/Design a Custom Trip/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Build Custom Trip/i })).toBeInTheDocument();
    });
  });

  // =========================================================================
  // CHANGE 3: PRE-BOOKING VIA GOOGLE FORM ONLY
  // =========================================================================
  describe('CHANGE 3: Pre-Booking Exclusively Via Google Form', () => {
    const arakuTrip = AUTHENTIC_TRIPS.find((t) => t.id === 'araku-vanjangi') || AUTHENTIC_TRIPS[0];

    it('displays trip destination, duration, and pre-booking amount in BookingModal', () => {
      render(
        <MemoryRouter>
          <BookingModal trip={arakuTrip} onClose={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByText(/Trip Reservation & Pre-Booking/i)).toBeInTheDocument();
      expect(screen.getByText(/Vizag, Araku Valley & Vanjangi/i)).toBeInTheDocument();
      expect(screen.getByText(/3 Days/i)).toBeInTheDocument();
      expect(screen.getByText(/Pre-booking Amount:/i)).toBeInTheDocument();
      expect(screen.getByText(/₹1,999\/-/i)).toBeInTheDocument();
    });

    it('verifies data entry inputs are completely removed from pre-booking', () => {
      render(
        <MemoryRouter>
          <BookingModal trip={arakuTrip} onClose={() => {}} />
        </MemoryRouter>
      );

      // No text inputs for traveler details or emergency contact
      expect(screen.queryByPlaceholderText(/Rahul Sharma/i)).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/rahul@college.edu/i)).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/Parent \/ Guardian Name/i)).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/Vegetarian meal preference/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('verifies WhatsApp is completely removed from pre-booking', () => {
      render(
        <MemoryRouter>
          <BookingModal trip={arakuTrip} onClose={() => {}} />
        </MemoryRouter>
      );

      expect(screen.queryByText(/WhatsApp Enquiry/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Send Details on WhatsApp/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/919640389230/i)).not.toBeInTheDocument();
    });

    it('redirects to official Google Form URL', () => {
      render(
        <MemoryRouter>
          <BookingModal trip={arakuTrip} onClose={() => {}} />
        </MemoryRouter>
      );

      const googleFormLink = screen.getByRole('link', { name: /Complete Pre-Booking on Google Form/i });
      expect(googleFormLink).toBeInTheDocument();
      expect(googleFormLink).toHaveAttribute('href', 'https://forms.gle/hMsrGxBguR577LyA9');
      expect(googleFormLink).toHaveAttribute('target', '_blank');
    });
  });

  // =========================================================================
  // CHANGE 4: POLICY PAGES
  // =========================================================================
  describe('CHANGE 4: Separate Dedicated Policy Pages', () => {
    it('renders About Us page with complete PDF content', () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 1, name: /About Us/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Who we are/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Our Mission/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Our Vision/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /What we do/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Why StudentDays\?/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Our values/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Our promise/i })).toBeInTheDocument();
      expect(screen.getByText(/"Every Trip Becomes a Story\."/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Travel\. Connect\. Experience\./i).length).toBeGreaterThan(0);
      expect(screen.getByRole('heading', { name: /Company information/i })).toBeInTheDocument();
      expect(screen.getByText(/Rohith Banoth & Lohith Ajmeera/i)).toBeInTheDocument();
    });

    it('renders Terms & Conditions page with all 15 sections', () => {
      render(
        <MemoryRouter>
          <Terms />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 1, name: /Terms & Conditions/i })).toBeInTheDocument();
      expect(screen.getByText(/1\. Acceptance of terms/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. Eligibility/i)).toBeInTheDocument();
      expect(screen.getByText(/3\. Bookings & registrations/i)).toBeInTheDocument();
      expect(screen.getByText(/4\. Payments/i)).toBeInTheDocument();
      expect(screen.getByText(/5\. Participant responsibilities/i)).toBeInTheDocument();
      expect(screen.getByText(/6\. Travel & event changes/i)).toBeInTheDocument();
      expect(screen.getByText(/7\. Cancellation by participant/i)).toBeInTheDocument();
      expect(screen.getByText(/8\. Cancellation by StudentDays\.co/i)).toBeInTheDocument();
      expect(screen.getByText(/9\. Liability disclaimer/i)).toBeInTheDocument();
      expect(screen.getByText(/10\. Photography & media consent/i)).toBeInTheDocument();
      expect(screen.getByText(/11\. Intellectual property/i)).toBeInTheDocument();
      expect(screen.getByText(/12\. Prohibited activities/i)).toBeInTheDocument();
      expect(screen.getByText(/13\. Privacy/i)).toBeInTheDocument();
      expect(screen.getByText(/14\. Changes to terms/i)).toBeInTheDocument();
      expect(screen.getByText(/15\. Contact us/i)).toBeInTheDocument();
    });

    it('renders Privacy Policy page with all sections and commitment', () => {
      render(
        <MemoryRouter>
          <PrivacyPolicy />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 1, name: /Privacy Policy/i })).toBeInTheDocument();
      expect(screen.getByText(/1\. Information we collect/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. How we use your information/i)).toBeInTheDocument();
      expect(screen.getByText(/3\. Information sharing/i)).toBeInTheDocument();
      expect(screen.getByText(/4\. Cookies & analytics/i)).toBeInTheDocument();
      expect(screen.getByText(/5\. Data security/i)).toBeInTheDocument();
      expect(screen.getByText(/6\. Communications/i)).toBeInTheDocument();
      expect(screen.getByText(/7\. Media & photography/i)).toBeInTheDocument();
      expect(screen.getByText(/8\. Third-party links/i)).toBeInTheDocument();
      expect(screen.getByText(/9\. Children's privacy/i)).toBeInTheDocument();
      expect(screen.getByText(/10\. Changes to this privacy policy/i)).toBeInTheDocument();
      expect(screen.getByText(/11\. Your rights/i)).toBeInTheDocument();
      expect(screen.getByText(/12\. Contact us/i)).toBeInTheDocument();
      expect(screen.getByText(/Our commitment/i)).toBeInTheDocument();
    });

    it('renders Refund & Cancellation Policy page with exact refund schedule', () => {
      render(
        <MemoryRouter>
          <CancellationPolicy />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 1, name: /Refund & Cancellation Policy/i })).toBeInTheDocument();
      // Check the exact refund schedule percentages
      expect(screen.getByText(/More than 15 days before departure/i)).toBeInTheDocument();
      expect(screen.getByText(/Up to 75% refund/i)).toBeInTheDocument();
      expect(screen.getByText(/8 to 14 days before departure/i)).toBeInTheDocument();
      expect(screen.getByText(/Up to 50% refund/i)).toBeInTheDocument();
      expect(screen.getByText(/3 to 7 days before departure/i)).toBeInTheDocument();
      expect(screen.getByText(/Up to 25% refund/i)).toBeInTheDocument();
      expect(screen.getByText(/Less than 72 hours before departure/i)).toBeInTheDocument();
      expect(screen.getAllByText(/No refund/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/No-show on trip day/i)).toBeInTheDocument();
    });

    it('renders FAQs page with all 5 categories and accessible accordions', () => {
      render(
        <MemoryRouter>
          <Faq />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 1, name: /Frequently Asked Questions/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Trip Related Questions/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Payments & Refunds/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Safety & Security/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Community & Experiences/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Contact & Support/i })).toBeInTheDocument();

      // Check specific Q&A
      expect(screen.getByText(/How do I book a trip\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Is StudentDays\.co safe\?/i)).toBeInTheDocument();
    });
  });

  // =========================================================================
  // CHANGE 5: WALL OF MEMORIES
  // =========================================================================
  describe('CHANGE 5: Wall of Memories & Two Videos', () => {
    it('verifies heading reads exactly "A wall of memories" with descriptive paragraph removed', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      );

      // Exact heading
      expect(screen.getByRole('heading', { level: 2, name: /^A wall of memories$/i })).toBeInTheDocument();

      // Old lead subtitle must NOT be present
      expect(screen.queryByText(/From the misty tea gardens of Munnar/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/A wall of lifetime memories/i)).not.toBeInTheDocument();
    });

    it('verifies two different video cards exist and neither autoplays on load', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      );

      // Video 1: 4E648bz2aR4 (Arunachalam & Pondicherry)
      const playBtn1 = screen.getByLabelText(/Play Video 1: Between Soul & Shore/i);
      expect(playBtn1).toBeInTheDocument();
      const img1 = screen.getByAltText(/Between Soul & Shore — Arunachalam & Pondicherry/i);
      expect(img1).toHaveAttribute('src', expect.stringContaining('4E648bz2aR4'));

      // Video 2: lN502PsnETI (Vizag & Araku)
      const playBtn2 = screen.getByLabelText(/Play Video 2: Beach, Chills & Hills/i);
      expect(playBtn2).toBeInTheDocument();
      const img2 = screen.getByAltText(/Beach, Chills & Hills — Vizag & Araku/i);
      expect(img2).toHaveAttribute('src', expect.stringContaining('lN502PsnETI'));

      // Ensure no iframes are rendered initially (no autoplay)
      expect(screen.queryByTitle(/Between Soul & Shore — Arunachalam & Pondicherry/i)).not.toBeInTheDocument();
      expect(screen.queryByTitle(/Beach, Chills & Hills — Vizag & Araku/i)).not.toBeInTheDocument();

      // Clicking Card 1 play button begins Video 1 only
      fireEvent.click(playBtn1);
      const iframe1 = screen.getByTitle(/Between Soul & Shore — Arunachalam & Pondicherry/i);
      expect(iframe1).toBeInTheDocument();
      expect(iframe1).toHaveAttribute('src', expect.stringContaining('4E648bz2aR4'));

      // Video 2 is still not playing
      expect(screen.queryByTitle(/Beach, Chills & Hills — Vizag & Araku/i)).not.toBeInTheDocument();
    });

    it('verifies photo gallery images remain intact in Wall of Memories', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      );

      expect(screen.getByAltText(/Munnar hill camp/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Tea estates sunrise/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Houseboat deck/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Campfire vibes/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Kolukkumalai peak/i)).toBeInTheDocument();
    });
  });
});
