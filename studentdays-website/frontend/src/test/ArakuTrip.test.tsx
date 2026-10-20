import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { ArakuTripDetails } from '../pages/ArakuTripDetails';
import { ExploreTrips } from '../pages/ExploreTrips';
import { AUTHENTIC_TRIPS } from '../data/tripsData';
import { TripReferenceCard } from '../components/TripReferenceCard';
import { ToastProvider } from '../context/ToastContext';

describe('Araku & Vanjangi Travel Package Implementation', () => {
  it('verifies Araku trip exists in AUTHENTIC_TRIPS with exact pricing and data', () => {
    const araku = AUTHENTIC_TRIPS.find((t) => t.slug === 'araku-vanjangi' || t.id === 'araku-vanjangi');
    expect(araku).toBeDefined();
    expect(araku?.title).toBe('Araku & Vanjangi Escape');
    expect(araku?.destination).toBe('Vizag, Araku Valley & Vanjangi');
    expect(araku?.durationDays).toBe(3);
    expect(araku?.price).toBe(7499);
    expect(araku?.preBookingAmount).toBe(1999);
    expect(araku?.balanceAmount).toBe(5500);
  });

  it('renders Araku trip card in ExploreTrips with inclusions and dual buttons', () => {
    render(
      <BrowserRouter>
        <ExploreTrips />
      </BrowserRouter>
    );

    // Verify trip card heading and destination
    expect(screen.getByText('Araku & Vanjangi Escape')).toBeInTheDocument();
    expect(screen.getByText('Vizag, Araku Valley & Vanjangi')).toBeInTheDocument();
    expect(screen.getByText('2 Nights / 3 Days')).toBeInTheDocument();

    // Verify inclusions on the card
    expect(screen.getByText(/Accommodation included/i)).toBeInTheDocument();
    expect(screen.getByText(/Local transport included/i)).toBeInTheDocument();
    expect(screen.getByText(/Jeep rides included/i)).toBeInTheDocument();
    expect(screen.getByText(/Train tickets included/i)).toBeInTheDocument();
    expect(screen.getByText(/Breakfast & dinner included/i)).toBeInTheDocument();
    expect(screen.getByText(/Photos & videos included/i)).toBeInTheDocument();

    // Verify action buttons
    const viewItineraryBtn = screen.getByRole('link', { name: /VIEW ITINERARY/i });
    expect(viewItineraryBtn).toBeInTheDocument();
    expect(viewItineraryBtn.getAttribute('href')).toBe('/trips/araku-vanjangi');

    const viewPdfBtn = screen.getByRole('link', { name: /VIEW FULL PDF/i });
    expect(viewPdfBtn).toBeInTheDocument();
    expect(viewPdfBtn.getAttribute('href')).toContain('1q0RAVRFtUEsx5numGp1r65kTAK73RSYw');
  });

  it('renders all sections of ArakuTripDetails page according to PDF specification', () => {
    render(
      <ToastProvider>
        <BrowserRouter>
          <ArakuTripDetails />
        </BrowserRouter>
      </ToastProvider>
    );

    // SECTION A: Hero
    expect(screen.getByRole('heading', { level: 1, name: 'ARAKU & VANJANGI' })).toBeInTheDocument();
    expect(screen.getAllByText(/Travel\. Connect\. Experience\./i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/₹7,499/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /EXPLORE ITINERARY/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /VIEW FULL ITINERARY PDF/i }).length).toBeGreaterThan(0);

    // SECTION B: Overview
    expect(screen.getByText(/Experience the beauty of Araku Valley and Vanjangi/i)).toBeInTheDocument();

    // SECTION C: Day-wise Itinerary
    expect(screen.getByText(/DAY 1 — VIZAG TO ARAKU VALLEY/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Borra Caves/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Katiki Waterfalls/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Coffee Plants & Plantations/i)).toBeInTheDocument();
    expect(screen.getByText(/Galikonda Viewpoint/i)).toBeInTheDocument();

    expect(screen.getByText(/DAY 2 — EXPLORE ARAKU VALLEY/i)).toBeInTheDocument();
    expect(screen.getByText(/Padmapuram Gardens/i)).toBeInTheDocument();
    expect(screen.getByText(/Chocolate Factory/i)).toBeInTheDocument();
    expect(screen.getByText(/Tribal Museum/i)).toBeInTheDocument();
    expect(screen.getByText(/Chaparai Waterfalls/i)).toBeInTheDocument();

    expect(screen.getByText(/DAY 3 — VANJANGI SUNRISE & RETURN TO VIZAG/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Vanjangi Sunrise/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Modhakondamma Temple/i)).toBeInTheDocument();

    // SECTION D: Accommodation
    expect(screen.getAllByText(/Aaradhya Hotel/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Nirvana Resorts/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Deluxe AC Rooms/i).length).toBeGreaterThan(0);

    // SECTION E: Package Inclusions and Exclusions
    expect(screen.getAllByText(/PACKAGE INCLUSIONS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Train Tickets to and from Hyderabad/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Photography & Videography/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PACKAGE EXCLUSIONS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Lunch is not included in the package on any day/i).length).toBeGreaterThan(0);

    // SECTION F: Meal Plan
    expect(screen.getByText(/Mysore Bajji/i)).toBeInTheDocument();
    expect(screen.getByText(/Andhra Chicken Curry/i)).toBeInTheDocument();
    expect(screen.getByText(/Cashew Paneer Curry/i)).toBeInTheDocument();

    // SECTION G: Pricing & 3-step calculation
    expect(screen.getAllByText(/BALANCE TO PAY/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Rs\. 5,500/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pre-book your seat/i).length).toBeGreaterThan(0);

    // SECTION H: Full Itinerary PDF
    expect(screen.getByRole('heading', { name: /FULL ITINERARY PDF/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /DOWNLOAD ITINERARY PDF/i }).length).toBeGreaterThan(0);
    const iframe = screen.getByTitle(/Araku & Vanjangi Travel Itinerary PDF/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute('src')).toContain('1q0RAVRFtUEsx5numGp1r65kTAK73RSYw');

    // SECTION I: Booking CTA
    const preBookBtn = screen.getByRole('button', { name: /Pre-Book Spot \(₹1,999\)/i });
    expect(preBookBtn).toBeInTheDocument();
    fireEvent.click(preBookBtn);
    expect(screen.getByText(/Trip Reservation/i)).toBeInTheDocument();
  });
});
