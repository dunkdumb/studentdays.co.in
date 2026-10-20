import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IMAGES } from '../config/images';

export type FlightState = 'IDLE' | 'FLYING' | 'COMPLETED';

export const IntroHero: React.FC = () => {
  const [showIntroOverlay, setShowIntroOverlay] = useState<boolean>(false);
  const [introExiting, setIntroExiting] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [flightState, setFlightState] = useState<FlightState>('IDLE');

  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const flightStateRef = useRef<FlightState>('IDLE');

  // Keep flightStateRef in sync with flightState
  flightStateRef.current = flightState;

  // 1. Check intro session state
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('sd_intro_shown');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!alreadyShown && !prefersReducedMotion) {
      setShowIntroOverlay(true);
      const timer = setTimeout(() => {
        handleDismissIntro();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissIntro = () => {
    setIntroExiting(true);
    setTimeout(() => {
      setShowIntroOverlay(false);
      sessionStorage.setItem('sd_intro_shown', 'true');
    }, 450);
  };

  // Clean up any running animation frame and guarantee clean state on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      canvas.style.display = 'none';
    }
    const plane = planeRef.current;
    if (plane) {
      plane.style.opacity = '0';
      plane.style.display = 'none';
      plane.style.transform = '';
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // 2. Upward Flight animation matching authentic reference (starts at clicked button and climbs upwards into sky)
  const fly = useCallback((btn: HTMLElement, mid: () => void) => {
    if (flightStateRef.current === 'FLYING') return;
    flightStateRef.current = 'FLYING';
    setFlightState('FLYING');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      mid();
      flightStateRef.current = 'COMPLETED';
      setFlightState('COMPLETED');
      return;
    }

    const W = window.innerWidth;
    const H = window.innerHeight;
    const r = btn.getBoundingClientRect();
    const x0 = r.left + r.width / 2;
    const y0 = r.top + r.height / 2;

    const canvas = canvasRef.current;
    const plane = planeRef.current;

    if (!canvas || !plane) {
      mid();
      flightStateRef.current = 'COMPLETED';
      setFlightState('COMPLETED');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      mid();
      flightStateRef.current = 'COMPLETED';
      setFlightState('COMPLETED');
      return;
    }

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.display = 'block';

    // Upward flight curve starting directly from the button coordinates
    const P: [number, number][] =
      y0 > H * 0.5
        ? [
            [x0, y0],
            [x0 + W * 0.05, y0 - H * 0.5],
            [W * 0.5, H * 0.05],
            [W * 1.2, -H * 0.2]
          ]
        : [
            [x0, y0],
            [x0 + W * 0.28, y0 + H * 0.3],
            [W * 0.5, H * 0.02],
            [W * 1.18, -H * 0.12]
          ];

    const B = (t: number): [number, number] => {
      const u = 1 - t;
      return [
        u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0],
        u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1]
      ];
    };

    const D = (t: number): [number, number] => {
      const u = 1 - t;
      return [
        3 * u * u * (P[1][0] - P[0][0]) + 6 * u * t * (P[2][0] - P[1][0]) + 3 * t * t * (P[3][0] - P[2][0]),
        3 * u * u * (P[1][1] - P[0][1]) + 6 * u * t * (P[2][1] - P[1][1]) + 3 * t * t * (P[3][1] - P[2][1])
      ];
    };

    const DUR = 2600;
    const t0 = performance.now();
    const pts: [number, number][] = [];
    let did = false;

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    plane.style.display = 'block';
    plane.style.visibility = 'visible';
    plane.style.opacity = '0';

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    const frame = (now: number) => {
      if (flightStateRef.current !== 'FLYING') return;

      const k = Math.min(1, (now - t0) / DUR);
      const e = ease(k);
      const p = B(e);
      const d = D(e);
      const a = Math.atan2(d[1], d[0]);

      pts.push(p);
      if (pts.length > 70) pts.shift();

      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = 'round';

      for (let i = 1; i < pts.length; i++) {
        const f = i / pts.length;
        ctx.strokeStyle = `rgba(255, 255, 255, ${f * 0.85})`;
        ctx.lineWidth = 0.6 + f * 2.2;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1][0], pts[i - 1][1]);
        ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      }

      // Airplane size increases naturally as per flight speed (peaks at e=0.5 where speed is highest)
      const s = 0.55 + Math.sin(Math.PI * e) * 0.7;
      const op = Math.min(1, k / 0.06) * (k > 0.86 ? Math.max(0, (1 - k) / 0.14) : 1);

      plane.style.opacity = String(op);
      plane.style.transform = `translate(${p[0] - 32}px, ${p[1] - 32}px) rotate(${a}rad) scale(${s})`;

      // Seamless transition when flight ascends past midpoint into the sky
      if (!did && k > 0.55) {
        did = true;
        mid();
      }

      if (k < 1) {
        animationFrameId.current = requestAnimationFrame(frame);
      } else {
        plane.style.opacity = '0';
        plane.style.display = 'none';
        canvas.style.display = 'none';
        ctx.clearRect(0, 0, W, H);
        flightStateRef.current = 'COMPLETED';
        setFlightState('COMPLETED');
      }
    };

    // Initialize plane position and orientation at button
    const initialD = D(0);
    const initialAngle = Math.atan2(initialD[1], initialD[0]);
    plane.style.transform = `translate(${P[0][0] - 32}px, ${P[0][1] - 32}px) rotate(${initialAngle}rad) scale(0.55)`;

    animationFrameId.current = requestAnimationFrame(frame);
  }, []);

  // 3. Primary Button Click: trigger upward flight transition to #trips
  const handleLetsBunkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (flightStateRef.current === 'FLYING') return;

    const btn = e.currentTarget;
    const mid = () => {
      const tripsEl = document.getElementById('trips');
      if (tripsEl) {
        tripsEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = '#trips';
      }
    };

    fly(btn, mid);
  };

  // 4. Secondary Button Action: preserves existing scroll behavior, NEVER starts flight
  const handleSeeMemoriesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const memEl = document.getElementById('memories');
    if (memEl) {
      memEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#memories';
    }
  };

  return (
    <>
      {/* 1. Fullscreen Intro Sequence (Preserved, Skippable, reduced-motion compliant) */}
      {showIntroOverlay && (
        <div
          role="dialog"
          aria-label="Welcome to StudentDays"
          onClick={handleDismissIntro}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#06122b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: introExiting ? 0 : 1,
            transform: introExiting ? 'scale(1.04)' : 'scale(1)',
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer'
          }}
        >
          <img
            src={IMAGES.heroAlternate}
            alt="StudentDays travellers by a lake wearing StudentDays branded hoodies"
            onError={() => setImageError(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
              filter: 'brightness(0.92)'
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(6,18,43,0.2) 0%, rgba(0,0,0,0.7) 100%)'
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              padding: '0 20px',
              animation: 'fadeInUp 0.6s ease forwards'
            }}
          >
            <img
              src={IMAGES.logo}
              alt="StudentDays.co"
              style={{
                height: '56px',
                width: 'auto',
                margin: '0 auto 20px auto',
                filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))'
              }}
            />
            <p
              className="script-font"
              style={{
                fontSize: 'clamp(28px, 5vw, 44px)',
                color: '#ffffff',
                margin: '0 0 10px 0',
                textShadow: '0 2px 14px rgba(0,0,0,0.9)'
              }}
            >
              Here every Experience becomes a story.
            </p>
            <p
              style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.85)',
                margin: 0,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              India's First Student Experience Platform
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismissIntro();
            }}
            className="glass"
            style={{
              position: 'absolute',
              bottom: '36px',
              zIndex: 3,
              fontSize: '13px',
              padding: '8px 20px'
            }}
          >
            Skip Intro
          </button>
        </div>
      )}

      {/* 2. Main Homepage Hero Section */}
      <header
        id="hero"
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#06122b'
        }}
      >
        {/* Background Image: Two travelers wearing StudentDays branded hoodies by the lake */}
        <div
          className="bg"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden'
          }}
        >
          <img
            src={IMAGES.heroAlternate}
            alt="Two StudentDays travelers by a mountain lake wearing StudentDays branded hoodies"
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom'
            }}
          />
          {/* Authentic gradient overlay from reference */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0, 15, 60, 0.3) 0%, rgba(0, 15, 60, 0.12) 50%, rgba(0, 0, 0, 0.25) 100%)'
            }}
          />
        </div>

        {/* Upward Airplane Flight Canvas for subtle curved trail */}
        <canvas
          id="fx"
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 70,
            pointerEvents: 'none',
            display: 'none'
          }}
        />

        {/* Animated Airplane Element (z-index 71 in foreground, pointer-events none) */}
        <div
          id="plane"
          ref={planeRef}
          data-testid="airplane-flight"
          data-flight-state={flightState}
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 71,
            pointerEvents: 'none',
            opacity: 0,
            display: 'none',
            visibility: flightState === 'FLYING' ? 'visible' : 'hidden',
            willChange: 'transform',
            filter: 'drop-shadow(0 2px 6px rgba(0, 20, 80, 0.35))'
          }}
        >
          <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" style={{ display: 'block' }}>
            <path
              d="M62 32 40 26 28 8h-6l6 18-16-2-6-8H2l4 16-4 16h4l6-8 16-2-6 18h6l12-18Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div
          className="wrap hc"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '80px',
            paddingBottom: '40px'
          }}
        >
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(34px, 8vw, 96px)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
              textShadow: '0 2px 30px rgba(0, 0, 0, 0.4)'
            }}
          >
            India's first<br />
            student experience<br />
            platform
          </h1>

          <p
            className="tag"
            style={{
              fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: 0,
              margin: '20px 0 28px',
              textShadow: '0 1px 14px rgba(0, 0, 0, 0.55)'
            }}
          >
            Here every Experience becomes a story.
          </p>

          <div
            className="row"
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <a
              ref={primaryBtnRef}
              className="glass blue"
              href="#trips"
              data-trip
              onClick={handleLetsBunkClick}
            >
              Lets Bunk Bro !
            </a>
            <a
              className="glass"
              href="#memories"
              onClick={handleSeeMemoriesClick}
            >
              See the memories
            </a>
          </div>
        </div>
      </header>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #fx, #plane {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
