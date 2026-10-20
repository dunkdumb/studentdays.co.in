import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Home } from '../pages/Home';

describe('Footer Component and Homepage Footer Verification', () => {
  it('renders the clean footer on other routes without unwanted buttons', () => {
    render(
      <MemoryRouter initialEntries={['/trips']}>
        <Footer />
      </MemoryRouter>
    );

    // Required content checks:
    // 1. Logo
    const logoImg = screen.getByAltText('StudentDays.co');
    expect(logoImg).toBeInTheDocument();

    // 2. "Travel. Connect. Experience."
    expect(screen.getByText('Travel. Connect. Experience.')).toBeInTheDocument();

    // 3. "Every trip becomes a story."
    expect(screen.getByText('Every trip becomes a story.')).toBeInTheDocument();

    // 4. Explore section and its normal text links
    expect(screen.getByRole('heading', { name: /explore/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^trips$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^the app$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^university chapters$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^about us$/i })).toBeInTheDocument();

    // 5. Policies section and its normal text links
    expect(screen.getByRole('heading', { name: /policies/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^faqs$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^terms & conditions$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^refund & cancellation policy$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^privacy policy$/i })).toBeInTheDocument();

    // 6. Copyright info
    expect(screen.getByText(/© 2026 StudentDays\.co\. All rights reserved\./i)).toBeInTheDocument();

    // 7. Contact info
    expect(screen.getByText(/hello@studentdays\.co\.in · \+91 9640389230/i)).toBeInTheDocument();

    // Unwanted buttons / elements verification:
    expect(screen.queryByText(/WhatsApp Community/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Instagram \(/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/STUDENTDAYS STATIC DEPLOYMENT/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('Footer component yields to Home page on route / to avoid duplicate footers', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('Home page displays the clean footer matching requirement specifications', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    // Verify Home footer elements
    expect(screen.getByText('Travel. Connect. Experience.')).toBeInTheDocument();
    expect(screen.getByText('Every trip becomes a story.')).toBeInTheDocument();
    expect(screen.getByText(/hello@studentdays\.co\.in · \+91 9640389230/)).toBeInTheDocument();
    expect(screen.getByText(/© 2026 StudentDays\.co\. All rights reserved\./)).toBeInTheDocument();

    // Unwanted footer buttons should NOT be present on Home
    expect(screen.queryByText(/WhatsApp Community/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/STUDENTDAYS STATIC DEPLOYMENT/i)).not.toBeInTheDocument();
  });
});
