import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IntroHero } from '../components/IntroHero';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

describe('IntroHero Component Requirements', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Requirement 2: Uses ONLY the supplied lake photo for intro and hero', () => {
    render(
      <BrowserRouter>
        <IntroHero />
      </BrowserRouter>
    );

    const heroImages = screen.getAllByRole('img');
    const lakePhotos = heroImages.filter(img =>
      img.getAttribute('src')?.includes('studentdays-hero.jpeg')
    );

    expect(lakePhotos.length).toBeGreaterThan(0);
    expect(lakePhotos[0].getAttribute('src')).toBe('/assets/studentdays-hero.jpeg');
  });

  it('Requirement 2: Completely removes old cinematic video intro', () => {
    const { container } = render(
      <BrowserRouter>
        <IntroHero />
      </BrowserRouter>
    );

    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelector('#v')).toBeNull();
  });

  it('Requirement 2: Intro transition is skippable and saves session state', () => {
    render(
      <BrowserRouter>
        <IntroHero />
      </BrowserRouter>
    );

    const skipBtn = screen.getByText(/Skip Intro/i);
    expect(skipBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(skipBtn);
      vi.advanceTimersByTime(500);
    });

    expect(sessionStorage.getItem('sd_intro_shown')).toBe('true');
  });

  it('Requirement 6: Renders authentic reference headline, script tagline, buttons, and airplane flight', () => {
    render(
      <BrowserRouter>
        <IntroHero />
      </BrowserRouter>
    );

    const taglines = screen.getAllByText(/Here every Experience becomes a story/i);
    expect(taglines.length).toBeGreaterThan(0);
    const headlines = screen.getAllByText(/India's first/i);
    expect(headlines.length).toBeGreaterThan(0);
    expect(screen.getByText(/Lets Bunk Bro !/i)).toBeInTheDocument();
    expect(screen.getByText(/See the memories/i)).toBeInTheDocument();
    expect(screen.getByTestId('airplane-flight')).toBeInTheDocument();
  });

  it('Flight State Machine: Starts in IDLE, never autoplays, and does not trigger on hover or timer', () => {
    sessionStorage.setItem('sd_intro_shown', 'true');
    render(
      <BrowserRouter>
        <IntroHero />
      </BrowserRouter>
    );

    const plane = screen.getByTestId('airplane-flight');
    expect(plane).toBeInTheDocument();
    expect(plane.getAttribute('data-flight-state')).toBe('IDLE');
    expect(plane.style.visibility).toBe('hidden');

    // TEST A: Wait 10+ seconds: plane must remain IDLE
    act(() => {
      vi.advanceTimersByTime(12000);
    });
    expect(plane.getAttribute('data-flight-state')).toBe('IDLE');
    expect(plane.style.visibility).toBe('hidden');

    // TEST B: Hover over buttons: plane must remain IDLE
    const bunkBtn = screen.getByText(/Lets Bunk Bro !/i);
    const memoriesBtn = screen.getByText(/See the memories/i);
    act(() => {
      fireEvent.mouseEnter(bunkBtn);
      fireEvent.mouseOver(bunkBtn);
      fireEvent.mouseEnter(memoriesBtn);
      fireEvent.mouseOver(memoriesBtn);
    });
    expect(plane.getAttribute('data-flight-state')).toBe('IDLE');

    // TEST C: Secondary button click must NOT trigger flight
    act(() => {
      fireEvent.click(memoriesBtn);
    });
    expect(plane.getAttribute('data-flight-state')).toBe('IDLE');
  });

  it('Primary button click: starts flight, scales progressively, and guards against repeated clicks', () => {
    sessionStorage.setItem('sd_intro_shown', 'true');
    render(
      <BrowserRouter>
        <IntroHero />
      </BrowserRouter>
    );

    const plane = screen.getByTestId('airplane-flight');
    const bunkBtn = screen.getByText(/Lets Bunk Bro !/i);

    expect(plane.getAttribute('data-flight-state')).toBe('IDLE');

    // TEST D: Primary button click triggers upward flight from button
    act(() => {
      fireEvent.click(bunkBtn);
    });

    expect(plane.getAttribute('data-flight-state')).toBe('FLYING');
    expect(plane.style.visibility).toBe('visible');
    expect(plane.style.transform).toContain('scale(0.55)');

    // TEST E: Repeated clicks while flying are ignored
    act(() => {
      fireEvent.click(bunkBtn);
      fireEvent.click(bunkBtn);
    });
    expect(plane.getAttribute('data-flight-state')).toBe('FLYING');
  });
});
