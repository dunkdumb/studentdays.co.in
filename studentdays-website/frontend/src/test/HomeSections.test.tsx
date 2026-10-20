import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock apiClient to return sample data
vi.mock('../services/apiClient', () => ({
  default: {
    get: vi.fn().mockImplementation((url: string) => {
      if (url.includes('/trips')) {
        return Promise.resolve({
          success: true,
          data: {
            trips: [
              {
                id: '1',
                title: 'Kerala Expedition',
                slug: 'kerala-gods-own-country',
                destination: 'Kerala',
                price: 7999,
                totalSeats: 30,
                confirmedCount: 12,
                reservedCount: 2,
                description: 'A magical journey through Gods Own Country with houseboats and bonfires.',
                status: 'PUBLISHED',
                coverImage: '/assets/1_two-studentdays-travellers-by-a-lake.jpg',
                departureDate: '2026-11-10T00:00:00Z',
                durationDays: 5
              }
            ]
          }
        });
      }
      if (url.includes('/colleges')) {
        return Promise.resolve({
          success: true,
          data: {
            colleges: [
              { id: '1', name: 'IIT Madras', city: 'Chennai', state: 'Tamil Nadu' }
            ]
          }
        });
      }
      if (url.includes('/gallery')) {
        return Promise.resolve({
          success: true,
          data: { images: [] }
        });
      }
      return Promise.resolve({ success: true, data: {} });
    })
  }
}));

describe('Home Page Layout Verification', () => {
  beforeEach(() => {
    sessionStorage.setItem('sd_intro_shown', 'true');
  });

  it('verifies Experience Platform section is completely removed from Home', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });

    // "Experience Platform" heading banner must not be present
    expect(screen.queryByRole('heading', { name: /Experience Platform/i })).toBeNull();
    // Old Pillars "Live it", "Love it", "Remember it" must not be present
    expect(screen.queryByText(/Live it/i)).toBeNull();
    expect(screen.queryByText(/Love it/i)).toBeNull();
    expect(screen.queryByText(/Remember it/i)).toBeNull();
  });

  it('verifies "What students say" is rendered on Home', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });

    // Headline exists
    expect(screen.getByText(/What students say/i)).toBeInTheDocument();
  });

  it('renders authentic student reviews in the marquee track', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });

    // Verify authentic reference reviews are rendered
    expect(screen.getAllByText(/Rahul Kumar/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Priya Sharma/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Anurag University/i).length).toBeGreaterThan(0);
  });
});

