import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  KERALA_DAYS,
  KERALA_INCLUSIONS,
  PARTNER_COLLEGES,
  REFERENCE_REVIEWS,
  REFERENCE_DOCS
} from '../data/referenceContent';
import { IMAGES } from '../config/images';
import CONTACT_INFO from '../data/contactInfo';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  // Navigation & View State
  const [activeView, setActiveView] = useState<string>('home');
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [introDismissed, setIntroDismissed] = useState<boolean>(false);
  const [introSettled, setIntroSettled] = useState<boolean>(false);
  const [flyingLogo, setFlyingLogo] = useState<{ left: number; top: number; width: number; height: number; go: boolean } | null>(null);

  // Modals state
  const [keralaModalOpen, setKeralaModalOpen] = useState<boolean>(false);
  const [customTripModalOpen, setCustomTripModalOpen] = useState<boolean>(false);
  const [appModalOpen, setAppModalOpen] = useState<boolean>(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [policyView, setPolicyView] = useState<'faq' | 'terms' | 'refund' | 'privacy' | null>(null);

  // Custom Trip Form State & Mood Meter
  const [crewMood, setCrewMood] = useState<number>(0);
  const [crewText, setCrewText] = useState<string>('Your crew is waiting…');
  const [crewFace, setCrewFace] = useState<string>('😐');
  const [customSubmitted, setCustomSubmitted] = useState<boolean>(false);
  const [customWaUrl, setCustomWaUrl] = useState<string>('');
  const [customCapWarning, setCustomCapWarning] = useState<boolean>(false);
  const [customFormData, setCustomFormData] = useState({
    planner: '',
    contact: '',
    college: '',
    cap: '',
    male: '',
    female: '',
    dest: '',
    travel: 'Train'
  });

  // Early Access Form State
  const [appFormData, setAppFormData] = useState({
    nm: '',
    age: '',
    col: '',
    gen: '',
    mob: ''
  });
  const [appSubmitted, setAppSubmitted] = useState<boolean>(false);
  const [appWaUrl, setAppWaUrl] = useState<string>('');

  // Partner Form State
  const [partnerFormData, setPartnerFormData] = useState({
    name: '',
    contact: '',
    type: 'College Club / Council',
    others: '',
    about: ''
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState<boolean>(false);

  // Documentaries State
  const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);
  const [isPlayingDoc, setIsPlayingDoc] = useState<boolean>(false);
  const [activeWallVideo, setActiveWallVideo] = useState<'v1' | 'v2' | null>(null);

  // Confetti helper
  const [confettiActive, setConfettiActive] = useState<boolean>(false);

  // Canvas & Flight Animation Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const navLogoRef = useRef<HTMLImageElement | null>(null);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const tripsTrackRef = useRef<HTMLDivElement | null>(null);

  // Check initial session
  useEffect(() => {
    const shown = sessionStorage.getItem('sd_intro_shown');
    if (shown) {
      setIntroDismissed(true);
      setIntroSettled(true);
      document.body.classList.add('ready', 'settled');
    } else {
      document.body.classList.add('intro');
    }

    return () => {
      document.body.classList.remove('intro', 'ready', 'settled');
    };
  }, []);

  // Finish intro sequence with flying logo
  const finishIntro = () => {
    if (introDismissed) return;
    setIntroDismissed(true);
    sessionStorage.setItem('sd_intro_shown', 'true');

    if (introVideoRef.current) {
      try {
        introVideoRef.current.pause();
      } catch (e) {}
    }

    const videoEl = introVideoRef.current;
    const logoEl = navLogoRef.current;

    if (videoEl && logoEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const r = videoEl.getBoundingClientRect();
      const w = r.width * 0.4227;
      const h = (w * 621) / 1505;
      const navR = logoEl.getBoundingClientRect();

      setFlyingLogo({
        left: r.left + r.width * 0.507 - w / 2,
        top: r.top + r.height * 0.504 - h / 2,
        width: w,
        height: h,
        go: false
      });

      document.body.classList.remove('intro');
      document.body.classList.add('ready');

      setTimeout(() => {
        setFlyingLogo({
          left: navR.left || 24,
          top: navR.top || 14,
          width: navR.width || 140,
          height: navR.height || 42,
          go: true
        });

        setTimeout(() => {
          setFlyingLogo(null);
          setIntroSettled(true);
          document.body.classList.add('settled');
        }, 1300);
      }, 350);
    } else {
      document.body.classList.remove('intro');
      document.body.classList.add('ready', 'settled');
      setIntroSettled(true);
    }
  };

  // Launch Paper Airplane Canvas Physics (Bézier curve)
  const flyToTrips = (btn: HTMLElement, targetView: string = 'trips') => {
    const isTest = Boolean(
      (globalThis as unknown as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === 'test'
    );
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isTest) {
      setActiveView(targetView);
      window.scrollTo({ top: 0, behavior: 'instant' });
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
      setActiveView(targetView);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setActiveView(targetView);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.display = 'block';

    const P = y0 > H * 0.5
      ? [[x0, y0], [x0 + W * 0.05, y0 - H * 0.5], [W * 0.5, H * 0.05], [W * 1.2, -H * 0.2]]
      : [[x0, y0], [x0 + W * 0.28, y0 + H * 0.3], [W * 0.5, H * 0.02], [W * 1.18, -H * 0.12]];

    const B = (t: number) => {
      const u = 1 - t;
      return [
        u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0],
        u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1]
      ];
    };

    const D = (t: number) => {
      const u = 1 - t;
      return [
        3 * u * u * (P[1][0] - P[0][0]) + 6 * u * t * (P[2][0] - P[1][0]) + 3 * t * t * (P[3][0] - P[2][0]),
        3 * u * u * (P[1][1] - P[0][1]) + 6 * u * t * (P[2][1] - P[1][1]) + 3 * t * t * (P[3][1] - P[2][1])
      ];
    };

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const DUR = 2600;
    const t0 = performance.now();
    const pts: number[][] = [];
    let did = false;

    const frame = (now: number) => {
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
        ctx.strokeStyle = `rgba(255,255,255,${f * 0.85})`;
        ctx.lineWidth = 0.6 + f * 2.2;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1][0], pts[i - 1][1]);
        ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      }

      const s = 0.55 + Math.sin(Math.PI * e) * 0.7;
      const op = Math.min(1, k / 0.06) * (k > 0.86 ? Math.max(0, (1 - k) / 0.14) : 1);
      plane.style.opacity = String(op);
      plane.style.transform = `translate(${p[0] - 32}px,${p[1] - 32}px) rotate(${a}rad) scale(${s})`;

      if (!did && k > 0.55) {
        did = true;
        setActiveView(targetView);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      if (k < 1) {
        requestAnimationFrame(frame);
      } else {
        plane.style.opacity = '0';
        canvas.style.display = 'none';
      }
    };

    requestAnimationFrame(frame);
  };

  // Auto-scroll Trips Carousel
  useEffect(() => {
    const el = tripsTrackRef.current;
    if (!el || activeView !== 'trips') return;

    let pos = 0;
    let paused = false;
    let animId: number;

    const step = () => {
      if (!paused && el) {
        pos += 0.7;
        if (pos >= el.scrollWidth / 2) {
          pos = 0;
        }
        el.scrollLeft = pos;
      }
      animId = requestAnimationFrame(step);
    };

    const hold = (ms: number) => {
      paused = true;
      setTimeout(() => {
        paused = false;
      }, ms);
    };

    const onTouch = () => hold(3000);
    el.addEventListener('mouseenter', () => (paused = true));
    el.addEventListener('mouseleave', () => (paused = false));
    el.addEventListener('touchstart', onTouch, { passive: true });

    animId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeView]);

  // Close navigation dropdown on outside click or Escape key
  useEffect(() => {
    if (!navOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const navEl = document.getElementById('nav');
      if (navEl && !navEl.contains(e.target as Node)) {
        setNavOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navOpen]);

  // Update Crew Mood on Custom Trip Form input
  const updateCustomTripMood = (data: typeof customFormData) => {
    let n = 0;
    if (data.planner.trim().length > 1) n++;
    if (data.contact.trim().length >= 8) n++;
    if (data.college.trim().length > 1) n++;
    if (Number(data.cap) >= 10) n++;
    if (data.male !== '') n++;
    if (data.female !== '') n++;
    if (data.dest.trim().length > 1) n++;
    if (data.travel) n++;

    setCustomCapWarning(data.cap !== '' && Number(data.cap) < 10);

    const FACES = ['😐', '🙂', '😊', '😄', '🤩'];
    const CAP = ['Your crew is waiting…', 'Nice start!', 'Looking good!', 'They are getting excited!', 'Extremely excited!!'];
    const score = n ? Math.min(4, Math.ceil(n / 2)) : 0;

    setCrewMood(score);
    setCrewFace(FACES[score]);
    setCrewText(CAP[score]);
  };

  // Submit Custom Trip Request
  const handleCustomTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(customFormData.cap) < 10) {
      setCustomCapWarning(true);
      return;
    }

    // Direct frontend WhatsApp request with full customized trip parameters
    const msg = `Create Trip request (College/Group)\n\nTrip planner: ${customFormData.planner}\nContact: ${customFormData.contact}\nCollege: ${customFormData.college}\nCapacity: ${customFormData.cap}\nMales: ${customFormData.male || 0}\nFemales: ${customFormData.female || 0}\nDestinations: ${customFormData.dest}\nTravel: ${customFormData.travel}`;
    const url = CONTACT_INFO.getWhatsAppUrl(msg);
    setCustomWaUrl(url);
    setCustomSubmitted(true);
    setCrewFace('🥳');
    setCrewText('Opening WhatsApp with your trip details…');
    triggerConfetti();

    setTimeout(() => {
      window.open(url, '_blank');
    }, 1500);
  };

  // Submit Early Access Form (Frontend WhatsApp Integration)
  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `App early access request\n\nName: ${appFormData.nm}\nAge: ${appFormData.age}\nCollege: ${appFormData.col}\nGender: ${appFormData.gen}\nMobile: ${appFormData.mob}`;
    const url = CONTACT_INFO.getWhatsAppUrl(msg);
    setAppWaUrl(url);
    setAppSubmitted(true);
    triggerConfetti();

    setTimeout(() => {
      window.open(url, '_blank');
    }, 1500);
  };

  // Submit Partner Inquiry (Frontend Mailto & WhatsApp Integration)
  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const txt = `Partnership enquiry\n\nName: ${partnerFormData.name}\nContact: ${partnerFormData.contact}\nType: ${partnerFormData.type}\nAbout: ${partnerFormData.about}`;
    const mailtoUrl = CONTACT_INFO.getMailtoUrl('StudentDays Partnership Enquiry', txt);
    setPartnerSubmitted(true);
    window.location.href = mailtoUrl;
    setTimeout(() => setPartnerModalOpen(false), 2000);
  };

  const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3000);
  };

  const showView = (v: string) => {
    setActiveView(v);
    setPolicyView(null);
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openPolicy = (pol: 'faq' | 'terms' | 'refund' | 'privacy') => {
    setNavOpen(false);
    if (pol === 'faq') navigate('/faq');
    else if (pol === 'terms') navigate('/terms');
    else if (pol === 'refund') navigate('/cancellation-policy');
    else if (pol === 'privacy') navigate('/privacy-policy');
  };

  return (
    <div>
      {/* 1. Intro Video Overlay & Flying Logo */}
      {!introDismissed && (
        <div className="ov">
          <video
            ref={introVideoRef}
            id="v"
            src={IMAGES.videos.intro}
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={finishIntro}
          />
          <button id="skip" className="glass skip" onClick={finishIntro} type="button">
            Skip
          </button>
        </div>
      )}

      {/* Cloned Flying Logo Animation */}
      {flyingLogo && (
        <img
          src={IMAGES.logo}
          alt="StudentDays"
          className={`fly ${flyingLogo.go ? 'go' : ''}`}
          style={{
            left: `${flyingLogo.left}px`,
            top: `${flyingLogo.top}px`,
            width: `${flyingLogo.width}px`,
            height: `${flyingLogo.height}px`
          }}
        />
      )}

      {/* 2. Paper Airplane Canvas & SVG Node */}
      <canvas id="fx" ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 60, pointerEvents: 'none', display: 'none' }} />
      <div
        id="plane"
        ref={planeRef}
        style={{
          position: 'fixed',
          width: '64px',
          height: '64px',
          zIndex: 65,
          pointerEvents: 'none',
          opacity: 0,
          transformOrigin: 'center center'
        }}
      >
        <svg
          viewBox="0 0 64 64"
          width="64"
          height="64"
          aria-hidden="true"
          style={{ width: '100%', height: '100%', display: 'block', filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.5))' }}
        >
          <path
            d="M62 32 40 26 28 8h-6l6 18-16-2-6-8H2l4 16-4 16h4l6-8 16-2-6 18h6l12-18Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* 3. Sticky Frosted Navigation Bar */}
      <nav id="nav" className={navOpen ? 'open' : ''}>
        <div className="wrap">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              showView('home');
            }}
            aria-label="StudentDays.co home"
          >
            <img
              ref={navLogoRef}
              src={IMAGES.logo}
              alt="StudentDays.co"
              style={{ height: '42px', display: 'block', visibility: introSettled ? 'visible' : 'hidden' }}
            />
          </a>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="glass" type="button" onClick={() => showView('home')}>
              Home
            </button>
            <button
              className="glass"
              type="button"
              data-trip="1"
              onClick={(e) => flyToTrips(e.currentTarget, 'trips')}
            >
              Trips
            </button>
            <button className="glass" type="button" onClick={() => showView('about')}>
              About
            </button>

            <button
              id="mb"
              className="glass mb"
              type="button"
              aria-label="Menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen(!navOpen)}
            >
              Menu ▾
            </button>
          </div>

          {/* Dropdown Navigation Menu */}
          <div className="links">
            <button
              className="glass"
              type="button"
              onClick={() => {
                setNavOpen(false);
                showView('app');
              }}
            >
              The App
            </button>
            <button
              className="glass"
              type="button"
              onClick={() => {
                setNavOpen(false);
                showView('colleges');
              }}
            >
              Colleges
            </button>
            <button
              className="glass blue"
              type="button"
              onClick={() => {
                setNavOpen(false);
                setPartnerModalOpen(true);
              }}
            >
              Partner with Us
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* VIEW: HOME (Hero + Reviews + Memories Wall + Documentaries)                */}
      {/* ========================================================================= */}
      {activeView === 'home' && (
        <div id="home">
          {/* Main Hero */}
          <section id="hero">
            <div className="bg" style={{ backgroundImage: 'var(--hero)' }} />
            <div className="wrap hc">
              <h1>
                Every trip<br />becomes a story
              </h1>
              <p className="tag">India's first student-only travel experience platform</p>
              <div className="row">
                <button
                  className="glass blue big"
                  type="button"
                  data-trip="1"
                  onClick={(e) => flyToTrips(e.currentTarget, 'trips')}
                >
                  Lets Bunk Bro!
                </button>
                <button
                  className="glass big"
                  type="button"
                  onClick={() => showView('about')}
                >
                  Our Philosophy
                </button>
              </div>
            </div>
          </section>

          {/* Reviews Marquee Section */}
          <section className="rev">
            <div className="rbg a" style={{ backgroundImage: `url(${IMAGES.retroBgA})` }} />
            <div className="rbg b" style={{ backgroundImage: `url(${IMAGES.retroBgB})` }} />
            <div className="wrap" style={{ textAlign: 'center' }}>
              <h2>What students say</h2>
            </div>
            <div className="rmq">
              <div>
                {[...REFERENCE_REVIEWS, ...REFERENCE_REVIEWS, ...REFERENCE_REVIEWS, ...REFERENCE_REVIEWS].map((r, i) => (
                  <div key={i} className="rc">
                    <div className="who2">
                      <span className="av">{r.initials}</span>
                      <div>
                        <b>{r.name}</b>
                        <small>{r.college}</small>
                      </div>
                    </div>
                    <div className="st" aria-label="5 stars">★★★★★</div>
                    <p>“{r.text}”</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Memories Wall Section */}
          {/* Wall of Memories Section */}
          <section className="memories" id="memories">
            <div className="wrap">
              <h2>A wall of memories</h2>

              {/* Two Different Video Cards: Video 1 (4E648bz2aR4) and Video 2 (lN502PsnETI) */}
              <div className="wvid">
                {/* Video Card 1: 4E648bz2aR4 */}
                <figure className="wf v1" style={{ position: 'relative', overflow: 'hidden' }}>
                  {activeWallVideo === 'v1' ? (
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/4E648bz2aR4?autoplay=1&rel=0"
                      title="Between Soul & Shore — Arunachalam & Pondicherry"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      style={{ display: 'block', width: '100%', aspectRatio: '16/9', border: 0 }}
                    />
                  ) : (
                    <div
                      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', cursor: 'pointer', background: '#000' }}
                      onClick={() => setActiveWallVideo('v1')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveWallVideo('v1');
                        }
                      }}
                      aria-label="Play Video 1: Between Soul & Shore (Arunachalam & Pondicherry)"
                    >
                      <img
                        src="https://i.ytimg.com/vi/4E648bz2aR4/hqdefault.jpg"
                        alt="Between Soul & Shore — Arunachalam & Pondicherry"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.35)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <span
                          style={{
                            width: '56px',
                            height: '40px',
                            borderRadius: '12px',
                            background: '#ff0033',
                            color: '#fff',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '20px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
                          }}
                        >
                          ▶
                        </span>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                          Between Soul &amp; Shore
                        </span>
                        <small style={{ color: '#cfe0ff', fontSize: '12px' }}>StudentDays Stories</small>
                      </div>
                    </div>
                  )}
                </figure>

                {/* Video Card 2: lN502PsnETI */}
                <figure className="wf v2" style={{ position: 'relative', overflow: 'hidden' }}>
                  {activeWallVideo === 'v2' ? (
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/lN502PsnETI?autoplay=1&rel=0"
                      title="Beach, Chills & Hills — Vizag & Araku"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      style={{ display: 'block', width: '100%', aspectRatio: '16/9', border: 0 }}
                    />
                  ) : (
                    <div
                      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', cursor: 'pointer', background: '#000' }}
                      onClick={() => setActiveWallVideo('v2')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveWallVideo('v2');
                        }
                      }}
                      aria-label="Play Video 2: Beach, Chills & Hills (Vizag & Araku)"
                    >
                      <img
                        src="https://i.ytimg.com/vi/lN502PsnETI/hqdefault.jpg"
                        alt="Beach, Chills & Hills — Vizag & Araku"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.35)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <span
                          style={{
                            width: '56px',
                            height: '40px',
                            borderRadius: '12px',
                            background: '#ff0033',
                            color: '#fff',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '20px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
                          }}
                        >
                          ▶
                        </span>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                          Beach, Chills &amp; Hills
                        </span>
                        <small style={{ color: '#cfe0ff', fontSize: '12px' }}>StudentDays Stories</small>
                      </div>
                    </div>
                  )}
                </figure>
              </div>

              {/* Photo Polaroids Grid */}
              <div className="wall">
                <figure className="f0">
                  <img src={IMAGES.gallery.munnarHill} alt="Munnar hill camp" />
                </figure>
                <figure className="f1">
                  <img src={IMAGES.gallery.teaSunrise} alt="Tea estates sunrise" />
                </figure>
                <figure className="f2">
                  <img src={IMAGES.gallery.houseboat} alt="Houseboat deck" />
                </figure>
                <figure className="f3">
                  <img src={IMAGES.gallery.campfire} alt="Campfire vibes" />
                </figure>
                <figure className="f4">
                  <img src={IMAGES.gallery.kolukkumalai} alt="Kolukkumalai peak" />
                </figure>
              </div>
            </div>
          </section>

          {/* Documentaries Section */}
          <section className="dc" id="doc">
            <div className="wrap">
              <div style={{ textAlign: 'center' }}>
                <h2>Trip documentaries</h2>
                <p className="lead" style={{ margin: '14px auto 0' }}>
                  Every StudentDays journey is captured on camera and crafted into an authentic documentary film.
                </p>
              </div>

              <div className="tabs" id="dtabs">
                {REFERENCE_DOCS.map((doc, idx) => (
                  <button
                    key={doc.id}
                    className="tab"
                    type="button"
                    aria-selected={selectedDocIndex === idx}
                    onClick={() => {
                      setSelectedDocIndex(idx);
                      setIsPlayingDoc(false);
                    }}
                  >
                    {doc.tab}
                  </button>
                ))}
              </div>

              <p id="dsub" className="scr" style={{ marginBottom: '18px', textAlign: 'center', fontWeight: 600 }}>
                {REFERENCE_DOCS[selectedDocIndex].sub}
              </p>

              <div className="player" id="player">
                {isPlayingDoc ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${REFERENCE_DOCS[selectedDocIndex].id}?autoplay=1&rel=0`}
                    title={REFERENCE_DOCS[selectedDocIndex].title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <button
                    className="ph"
                    type="button"
                    onClick={() => setIsPlayingDoc(true)}
                    aria-label={`Play ${REFERENCE_DOCS[selectedDocIndex].title}`}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${REFERENCE_DOCS[selectedDocIndex].id}/hqdefault.jpg`}
                      alt={REFERENCE_DOCS[selectedDocIndex].title}
                    />
                    <span className="pb2" style={{ position: 'relative' }}>▶</span>
                    <span style={{ position: 'relative' }}>{REFERENCE_DOCS[selectedDocIndex].title}</span>
                    <small style={{ position: 'relative' }}>StudentDays Stories</small>
                  </button>
                )}
              </div>

              <p className="scr" style={{ textAlign: 'center', marginTop: '24px' }}>
                <a
                  className="glass"
                  id="yt"
                  href={`https://youtu.be/${REFERENCE_DOCS[selectedDocIndex].id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶ Watch on YouTube
                </a>
              </p>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: TRIPS CATALOG                                                       */}
      {/* ========================================================================= */}
      {activeView === 'trips' && (
        <div id="trips" className="cp">
          <div className="wrap">
            <button className="glass back" type="button" onClick={() => showView('home')}>
              ← Back to Home
            </button>
            <div className="ctop">
              <span className="pill">Curated Experiences</span>
              <h1>Upcoming Trips</h1>
              <p className="sub">Curated student-only journeys. Safe, verified, unforgettable.</p>
            </div>

            {/* Horizontal Snap Carousel */}
            <div
              className="tg"
              ref={tripsTrackRef}
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'min(86vw, 380px)',
                gap: '24px',
                overflowX: 'auto',
                padding: '40px 0 60px',
                scrollSnapType: 'x mandatory'
              }}
            >
              {/* Card 1: Kerala Housefull */}
              <div
                className="tc kcard"
                id="kcard"
                onClick={() => setKeralaModalOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ti">
                  <span className="hf">HOUSEFULL</span>
                  <img src={IMAGES.trips.kerala} alt="Kerala God's Own Country" />
                </div>
                <div className="tb">
                  <div>
                    <span className="tbd">₹ 7,999/-</span>
                    <h3>Kerala, God's Own Country</h3>
                    <p>Munnar · Kolukkumalai · Alappuzha · Athirapally</p>
                  </div>
                  <div className="tl">View Itinerary Details →</div>
                </div>
              </div>

              {/* Card 2: Vizag & Araku with UPCOMING badge */}
              <div
                className="tc"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/trips/araku-vanjangi')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/trips/araku-vanjangi');
                  }
                }}
              >
                <div className="ti" style={{ position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      padding: '6px 14px',
                      borderRadius: '999px',
                      background: '#1E6BFF',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '13px',
                      letterSpacing: '0.05em',
                      boxShadow: '0 4px 14px rgba(30, 107, 255, 0.6)',
                      zIndex: 2
                    }}
                  >
                    UPCOMING
                  </span>
                  <img src={IMAGES.trips.araku} alt="Araku & Vanjangi Escape" />
                </div>
                <div className="tb">
                  <div>
                    <span className="tbd">UPCOMING · ₹ 7,499/-</span>
                    <h3>Araku & Vanjangi Escape</h3>
                    <p>2 Nights / 3 Days · Vizag, Araku Valley & Vanjangi · Vanjangi Sunrise Viewpoint</p>
                  </div>
                  <div className="tl">View Itinerary Details →</div>
                </div>
              </div>

              {/* Card 3: Custom Trip Card */}
              <div className="tc" style={{ background: 'linear-gradient(180deg, #1E6BFF, #06122b)' }}>
                <div className="tb" style={{ justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
                  <span style={{ fontSize: '44px', display: 'block', marginBottom: '16px' }}>🎒</span>
                  <h3>Design a Custom Trip</h3>
                  <p>Going with your college gang or student club? Build an exclusive itinerary for 10+ students.</p>
                  <button
                    className="glass blue"
                    id="ctb"
                    type="button"
                    onClick={() => setCustomTripModalOpen(true)}
                    style={{ marginTop: '20px' }}
                  >
                    Build Custom Trip ✨
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: THE APP                                                             */}
      {/* ========================================================================= */}
      {activeView === 'app' && (
        <div id="app" className="ap cp" style={{ minHeight: '100vh' }}>
          {/* Animated Background Slideshow */}
          <div className="aps" id="aps">
            <div className="sl" style={{ backgroundImage: `url(${IMAGES.gallery.munnarHill})`, animationDelay: '0s' }} />
            <div className="sl" style={{ backgroundImage: `url(${IMAGES.gallery.teaSunrise})`, animationDelay: '4s' }} />
            <div className="sl" style={{ backgroundImage: `url(${IMAGES.gallery.houseboat})`, animationDelay: '8s' }} />
            <div className="sl" style={{ backgroundImage: `url(${IMAGES.gallery.campfire})`, animationDelay: '12s' }} />
          </div>

          <div className="wrap apc">
            <button className="glass back" type="button" onClick={() => showView('home')}>
              ← Back to Home
            </button>

            <div className="pass">
              <span className="pill" style={{ background: 'rgba(255, 210, 63, 0.2)', color: '#FFD23F', borderColor: 'rgba(255, 210, 63, 0.4)', fontWeight: 700, marginRight: '8px' }}>
                Coming Soon
              </span>
              <span className="pill">StudentDays Passport</span>
              <h1 className="hl2">India's First Student Experience App</h1>
              <p style={{ color: '#FFD23F', fontSize: '18px', fontWeight: 700, margin: '8px 0 20px 0' }}>
                📱 Mobile Application · In Active Development
              </p>
              <img
                className="pimg ph1"
                src={IMAGES.trips.kashmir}
                alt="Student Travel Passport sample"
              />
              <p className="pn">Preview: Student Travel Passport Feature (Coming Soon)</p>
            </div>

            <div className="feat">
              <div className="gc">
                <span className="ic">🏷️</span>
                <h3>Trip discounts</h3>
                <p>Member-only savings on StudentDays.co trips.</p>
              </div>
              <div className="gc">
                <span className="ic">🎒</span>
                <h3>Packages</h3>
                <p>Ready-to-go student travel packages.</p>
              </div>
              <div className="gc">
                <span className="ic">🎉</span>
                <h3>Events</h3>
                <p>Meetups, workshops and experiences for students.</p>
              </div>
            </div>

            <div className="row" style={{ justifyContent: 'center', margin: '44px 0 100px' }}>
              <button
                className="glass blue big"
                type="button"
                id="atb"
                onClick={() => setAppModalOpen(true)}
              >
                Join Early Access List — Coming Soon ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: COLLEGES                                                            */}
      {/* ========================================================================= */}
      {activeView === 'colleges' && (
        <div id="colleges" className="cp">
          <div className="wrap">
            <button className="glass back" type="button" onClick={() => showView('home')}>
              ← Back to Home
            </button>
            <div className="ctop">
              <span className="pill">Campus Communities</span>
              <h1>University Chapters</h1>
              <p className="sub">Over 10+ collegiate communities across Telangana & Andhra Pradesh</p>
            </div>

            {/* Continuous Marquee Chips */}
            <div className="marq">
              <div id="mq">
                {[...PARTNER_COLLEGES, ...PARTNER_COLLEGES].map((col, idx) => (
                  <span key={idx} className="chip">
                    {col}
                  </span>
                ))}
              </div>
            </div>

            {/* Ordered Campus Chapters List */}
            <ul className="list" id="cl">
              {PARTNER_COLLEGES.map((col, idx) => (
                <li key={idx}>
                  <span className="n">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{col}</span>
                  <span className="t">They ate 🔥</span>
                </li>
              ))}
            </ul>

            <div className="cta2">
              <h2>Bring StudentDays to Your Campus</h2>
              <p className="lead">Partner your university club, council, or batch with our field network.</p>
              <button className="glass blue big" type="button" onClick={() => setPartnerModalOpen(true)}>
                Partner with StudentDays
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: ABOUT                                                               */}
      {/* ========================================================================= */}
      {activeView === 'about' && (
        <div id="about" className="ab cp">
          <div className="wrap">
            <button className="glass back" type="button" onClick={() => showView('home')}>
              ← Back to Home
            </button>
            <div className="ctop">
              <span className="pill">Our Story</span>
              <h1>Travel. Connect. Experience.</h1>
              <p className="sub">We believe your college days deserve more than just textbooks and campus canteens.</p>
            </div>

            <section className="who" style={{ marginTop: '50px' }}>
              <div>
                <h2>Who We Are</h2>
                <p>
                  StudentDays.co is India's first student-only travel experience platform. We organize verified,
                  safe, curated adventures where every trip is captured into a documentary film keepsake.
                </p>
                <p>
                  With female and male field coordinators, round-the-clock emergency support, and direct collegiate
                  partnerships, we make discovering India effortless and safe for students.
                </p>
              </div>
              <img className="map" src={IMAGES.maps.keralaRoute} alt="Kerala Journey Route Map" />
            </section>

            <section className="two" style={{ marginTop: '40px' }}>
              <div className="gc">
                <span className="ic">🛡️</span>
                <h3>Safety First</h3>
                <p>Background-checked drivers, verified resorts, separate rooms for girls and boys, and on-ground coordinators on every trip.</p>
              </div>
              <div className="gc">
                <span className="ic">🎥</span>
                <h3>Keepsake Documentaries</h3>
                <p>No phone cameras required. Our media team shoots, edits, and produces a cinematic documentary of your adventure.</p>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: LEGAL POLICIES (FAQ, Terms, Refund, Privacy)                         */}
      {/* ========================================================================= */}
      {activeView === 'policy' && policyView && (
        <div id="policies" className="cp pol">
          <div className="wrap">
            <button className="glass back" type="button" onClick={() => showView('home')}>
              ← Back to Home
            </button>

            {policyView === 'faq' && (
              <div>
                <div className="ctop">
                  <h1>Frequently Asked Questions</h1>
                  <p className="sub">Everything you need to know before you travel</p>
                </div>
                <div className="body">
                  <h3 className="fcat">Trip related questions</h3>
                  <details className="faq">
                    <summary>How do I book a trip?</summary>
                    <p>You can book directly through our website or pre-book your spot via the booking desk.</p>
                  </details>
                  <details className="faq">
                    <summary>How will I know if my booking is confirmed?</summary>
                    <p>Once your payment is verified, you will receive confirmation through WhatsApp, email, or a phone call.</p>
                  </details>
                  <details className="faq">
                    <summary>Can I join alone?</summary>
                    <p>Yes! Many students join solo and make friends for life during the journey.</p>
                  </details>
                  <details className="faq">
                    <summary>Will there be trip coordinators?</summary>
                    <p>Yes. Every trip is accompanied and managed end-to-end by trained StudentDays.co field leads.</p>
                  </details>
                </div>
              </div>
            )}

            {policyView === 'terms' && (
              <div>
                <div className="ctop">
                  <h1>Terms & Conditions</h1>
                  <p className="sub">Please read these before making any booking</p>
                </div>
                <div className="body">
                  <p className="upd">Last updated: June 2026</p>
                  <h3>1. Acceptance of terms</h3>
                  <p>By using StudentDays.co, you agree to comply with all terms, safety instructions, and collegiate policies.</p>
                  <h3>2. Eligibility</h3>
                  <p>StudentDays.co experiences are primarily designed for college students and young adults with valid ID proof.</p>
                  <h3>3. Photography & Media Consent</h3>
                  <p>The StudentDays media team records moments throughout the journey to produce your keepsake documentary.</p>
                </div>
              </div>
            )}

            {policyView === 'refund' && (
              <div>
                <div className="ctop">
                  <h1>Refund & Cancellation Policy</h1>
                  <p className="sub">How cancellations and refunds work</p>
                </div>
                <div className="body">
                  <p className="upd">Last updated: June 2026</p>
                  <h3>1. Cancellation by participant</h3>
                  <div className="rt" style={{ display: 'grid', gap: '12px', margin: '20px 0' }}>
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '14px' }}>
                      <b>More than 15 days before departure</b>: Up to 75% refund.
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '14px' }}>
                      <b>8 to 14 days before departure</b>: Up to 50% refund.
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '14px' }}>
                      <b>3 to 7 days before departure</b>: Up to 25% refund.
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '14px' }}>
                      <b>Less than 72 hours / No Show</b>: No refund provided.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {policyView === 'privacy' && (
              <div>
                <div className="ctop">
                  <h1>Privacy Policy</h1>
                  <p className="sub">How we collect, use, and protect your information</p>
                </div>
                <div className="body">
                  <p className="upd">Last updated: June 2026</p>
                  <h3>1. Information We Collect</h3>
                  <p>Personal information (name, college, phone, emergency contact) and booking information.</p>
                  <h3>2. Information Sharing</h3>
                  <p>We do not sell your personal data. Information is shared only with verified transport and accommodation partners.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: KERALA DETAILED ITINERARY DIALOG (#kd)                           */}
      {/* ========================================================================= */}
      {keralaModalOpen && (
        <dialog id="kd" open style={{ display: 'block', position: 'fixed', inset: 0, zIndex: 100 }}>
          <div className="fcard" style={{ maxWidth: '820px', margin: '30px auto', position: 'relative' }}>
            <button
              type="button"
              className="x"
              id="kx"
              aria-label="Close"
              onClick={() => setKeralaModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
            >
              ✕
            </button>

            <div className="kh">
              <span className="hfb" style={{ background: '#e8192c', padding: '6px 14px', borderRadius: '8px', fontWeight: 800 }}>HOUSEFULL</span>
              <p className="kk" style={{ color: '#ff6b78', margin: '14px 0 6px', fontWeight: 700 }}>God's own country · A trip you'll never forget</p>
              <h2 style={{ fontSize: '36px', marginBottom: '8px' }}>Kerala trip itinerary</h2>
              <p className="kr" style={{ color: '#aab6cc' }}>Munnar · Kolukkumalai · Alappuzha · Athirapally</p>
              <div className="kc" style={{ display: 'flex', gap: '16px', margin: '14px 0', fontSize: '14px', color: '#cfe0ff' }}>
                <span>Pickup & drop: Hyderabad</span>
                <span>Only for college students</span>
              </div>
            </div>

            <div className="kbox kp" style={{ background: 'rgba(30,107,255,0.15)', padding: '20px', borderRadius: '18px', margin: '20px 0' }}>
              <b style={{ display: 'block' }}>All-inclusive package</b>
              <strong style={{ fontSize: '28px', color: '#FFD23F' }}>Rs. 7,999/-</strong>
              <p style={{ margin: '8px 0', fontSize: '14px' }}>Train tickets · Stays · Houseboat night · All meals · Tent stay on peak · Photos, videos & documentary</p>
              <small style={{ color: '#aab6cc' }}>* 5 days including travel days (train journey to and from Kochi).</small>
            </div>

            {/* Days Breakdown */}
            <div style={{ display: 'grid', gap: '16px', margin: '24px 0' }}>
              {KERALA_DAYS.map((d, i) => (
                <div key={i} className="kd1" style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '18px', borderRadius: '18px' }}>
                  <div className="kdh" style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '12px' }}>
                    <i style={{ fontStyle: 'normal', fontWeight: 800, background: '#1E6BFF', padding: '4px 12px', borderRadius: '8px' }}>{d.day}</i>
                    <div>
                      <b>{d.title}</b>
                      <span style={{ display: 'block', color: '#aab6cc', fontSize: '14px' }}>{d.subtitle}</span>
                    </div>
                  </div>
                  {d.timeline.map((item, tIdx) => (
                    <div key={tIdx} style={{ margin: '8px 0 8px 16px', fontSize: '14px' }}>
                      <em style={{ color: '#FFD23F', fontStyle: 'normal', fontWeight: 700 }}>{item[0]}: </em>
                      {item[1].join(', ')}
                    </div>
                  ))}
                  {d.note && <div className="knote" style={{ color: '#8fc0ff', fontSize: '13px', marginTop: '8px' }}>{d.note}</div>}
                  {d.stay && <p className="kst" style={{ color: '#aab6cc', fontSize: '13px', margin: '6px 0 0' }}>{d.stay}</p>}
                </div>
              ))}
            </div>

            {/* What's Included */}
            <div className="kbox" style={{ background: 'rgba(255,255,255,0.06)', padding: '22px', borderRadius: '18px' }}>
              <b>What's included</b>
              <div className="kin" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '14px' }}>
                {KERALA_INCLUSIONS.map((inc, incIdx) => (
                  <div key={incIdx} style={{ fontSize: '13px' }}>
                    <b style={{ display: 'block', color: '#fff' }}>{inc.title}</b>
                    <span style={{ color: '#aab6cc' }}>{inc.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="kact" style={{ display: 'flex', gap: '14px', marginTop: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: 'rgba(232, 25, 44, 0.2)',
                  border: '1px solid #e8192c',
                  color: '#ff6b78',
                  fontWeight: 800,
                  fontSize: '14px'
                }}
              >
                ● HOUSEFULL · Bookings Closed
              </span>
              <button className="glass" type="button" onClick={() => setKeralaModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CREATE CUSTOM TRIP MODAL (#cd)                                   */}
      {/* ========================================================================= */}
      {customTripModalOpen && (
        <dialog id="cd" open style={{ display: 'block', position: 'fixed', inset: 0, zIndex: 100 }}>
          <div className="fcard" id="cdi" style={{ maxWidth: '520px', margin: '30px auto', position: 'relative' }}>
            <button
              type="button"
              className="x"
              id="cx"
              aria-label="Close"
              onClick={() => setCustomTripModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
            >
              ✕
            </button>

            {/* Interactive Crew Mood Meter */}
            <div id="crew" style={{ display: 'flex', gap: '10px', fontSize: '28px', justifyContent: 'center', marginBottom: '8px' }}>
              {[0, 1, 2, 3, 4].map((idx) => (
                <i key={idx} className={idx <= crewMood ? 'j' : 'b'} style={{ fontStyle: 'normal' }}>
                  {crewFace}
                </i>
              ))}
            </div>
            <p id="mood" style={{ textAlign: 'center', color: '#8fc0ff', fontWeight: 700, margin: '4px 0 16px' }}>
              {crewText}
            </p>

            <form id="cf" onSubmit={handleCustomTripSubmit}>
              <label>
                Trip planner name
                <input
                  name="planner"
                  required
                  value={customFormData.planner}
                  onChange={(e) => {
                    const updated = { ...customFormData, planner: e.target.value };
                    setCustomFormData(updated);
                    updateCustomTripMood(updated);
                  }}
                />
              </label>

              <label>
                Contact number / WhatsApp
                <input
                  name="contact"
                  type="tel"
                  required
                  value={customFormData.contact}
                  onChange={(e) => {
                    const updated = { ...customFormData, contact: e.target.value };
                    setCustomFormData(updated);
                    updateCustomTripMood(updated);
                  }}
                />
              </label>

              <label>
                College & passing year
                <input
                  name="college"
                  required
                  value={customFormData.college}
                  onChange={(e) => {
                    const updated = { ...customFormData, college: e.target.value };
                    setCustomFormData(updated);
                    updateCustomTripMood(updated);
                  }}
                />
              </label>

              <label>
                Group capacity (min 10)
                <input
                  name="cap"
                  type="number"
                  min="10"
                  required
                  value={customFormData.cap}
                  onChange={(e) => {
                    const updated = { ...customFormData, cap: e.target.value };
                    setCustomFormData(updated);
                    updateCustomTripMood(updated);
                  }}
                />
              </label>

              {customCapWarning && (
                <div className="capmsg" style={{ background: '#ffe3e3', color: '#a10018', padding: '10px 14px', borderRadius: '12px', fontWeight: 700, marginTop: '8px' }}>
                  Minimum group size for custom trips is 10 students
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label>
                  Male count
                  <input
                    name="male"
                    type="number"
                    value={customFormData.male}
                    onChange={(e) => {
                      const updated = { ...customFormData, male: e.target.value };
                      setCustomFormData(updated);
                      updateCustomTripMood(updated);
                    }}
                  />
                </label>
                <label>
                  Female count
                  <input
                    name="female"
                    type="number"
                    value={customFormData.female}
                    onChange={(e) => {
                      const updated = { ...customFormData, female: e.target.value };
                      setCustomFormData(updated);
                      updateCustomTripMood(updated);
                    }}
                  />
                </label>
              </div>

              <label>
                Dream destinations
                <input
                  name="dest"
                  required
                  placeholder="e.g. Kerala, Goa, Hampi"
                  value={customFormData.dest}
                  onChange={(e) => {
                    const updated = { ...customFormData, dest: e.target.value };
                    setCustomFormData(updated);
                    updateCustomTripMood(updated);
                  }}
                />
              </label>

              <label>
                Preferred travel mode
                <select
                  name="travel"
                  value={customFormData.travel}
                  onChange={(e) => {
                    const updated = { ...customFormData, travel: e.target.value };
                    setCustomFormData(updated);
                    updateCustomTripMood(updated);
                  }}
                >
                  <option>Train</option>
                  <option>Bus</option>
                  <option>Flight</option>
                  <option>Open to options</option>
                </select>
              </label>

              <div className="row" style={{ marginTop: '22px' }}>
                <button className="glass blue" type="submit">
                  Generate Itinerary on WhatsApp 🎉
                </button>
              </div>
            </form>

            {customSubmitted && (
              <p style={{ textAlign: 'center', marginTop: '16px' }}>
                <a id="cwa" href={customWaUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#8fc0ff' }}>
                  Didn't open? Click here to launch WhatsApp
                </a>
              </p>
            )}
          </div>
        </dialog>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: APP EARLY ACCESS & MASCOT (#ad)                                  */}
      {/* ========================================================================= */}
      {appModalOpen && (
        <dialog id="ad" open style={{ display: 'block', position: 'fixed', inset: 0, zIndex: 100 }}>
          <div className="adw" style={{ maxWidth: '440px', margin: '30px auto', position: 'relative' }}>
            {/* Animated SVG Mascot Traveler */}
            <svg className="trv" viewBox="0 0 300 130" aria-hidden="true">
              <path d="M122 108Q90 126 58 112" stroke="#f0c08a" strokeWidth="16" strokeLinecap="round" fill="none" className="arm l" />
              <path d="M178 108Q210 126 242 112" stroke="#f0c08a" strokeWidth="16" strokeLinecap="round" fill="none" className="arm r" />
              <circle className="hand l" cx="56" cy="114" r="15" fill="#f0c08a" />
              <circle className="hand r" cx="244" cy="114" r="15" fill="#f0c08a" />
              <g className="hd">
                <circle cx="150" cy="70" r="40" fill="#f0c08a" />
                <path d="M108 62a42 40 0 0 1 84 0z" fill="#1E6BFF" />
                <path d="M146 58h62a10 7 0 0 1-8 11h-54z" fill="#0a2f8f" />
                <g className="eyes">
                  <ellipse cx="135" cy="76" rx="5.5" ry="6.5" fill="#fff" />
                  <circle cx="136" cy="77" r="3.2" fill="#111" />
                  <ellipse cx="165" cy="76" rx="5.5" ry="6.5" fill="#fff" />
                  <circle cx="166" cy="77" r="3.2" fill="#111" />
                </g>
                <path className="m1" d="M134 90q16 14 32 0" stroke="#111" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path className="m2" d="M132 88q18 26 36 0z" fill="#7a1f1f" style={{ display: appSubmitted ? 'block' : 'none' }} />
              </g>
            </svg>

            <div className="fcard">
              <button
                type="button"
                className="x"
                id="ax"
                aria-label="Close"
                onClick={() => setAppModalOpen(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
              >
                ✕
              </button>

              {!appSubmitted ? (
                <div id="aform">
                  <h3 id="adt">Coming Soon — Get Early Access!</h3>
                  <p className="pds">The StudentDays mobile application is currently in development. Join the early access notification list.</p>
                  <form id="af" onSubmit={handleAppSubmit}>
                    <label>
                      Name
                      <input
                        name="nm"
                        required
                        value={appFormData.nm}
                        onChange={(e) => setAppFormData({ ...appFormData, nm: e.target.value })}
                      />
                    </label>
                    <label>
                      Age
                      <input
                        name="age"
                        type="number"
                        min="14"
                        max="60"
                        required
                        value={appFormData.age}
                        onChange={(e) => setAppFormData({ ...appFormData, age: e.target.value })}
                      />
                    </label>
                    <label>
                      College name
                      <input
                        name="col"
                        required
                        value={appFormData.col}
                        onChange={(e) => setAppFormData({ ...appFormData, col: e.target.value })}
                      />
                    </label>
                    <label>
                      Gender
                      <select
                        name="gen"
                        required
                        value={appFormData.gen}
                        onChange={(e) => setAppFormData({ ...appFormData, gen: e.target.value })}
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <label>
                      Mobile number
                      <input
                        name="mob"
                        type="tel"
                        required
                        value={appFormData.mob}
                        onChange={(e) => setAppFormData({ ...appFormData, mob: e.target.value })}
                      />
                    </label>
                    <div className="row" style={{ marginTop: '22px' }}>
                      <button className="glass blue" type="submit">
                        Notify Me on WhatsApp 🎉
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div id="athx">
                  <h3>You're on the early access list! 🎉</h3>
                  <p className="pds">The app is coming soon. We'll message you on WhatsApp as soon as beta testing opens. Opening WhatsApp to confirm…</p>
                  <p className="pds">
                    <a id="awa" target="_blank" rel="noopener noreferrer" href={appWaUrl} style={{ color: '#8fc0ff' }}>
                      Didn't open? Tap here to confirm on WhatsApp
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </dialog>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: PARTNER WITH US (#pd)                                            */}
      {/* ========================================================================= */}
      {partnerModalOpen && (
        <dialog id="pd" open style={{ display: 'block', position: 'fixed', inset: 0, zIndex: 100 }}>
          <div className="fcard" style={{ maxWidth: '520px', margin: '30px auto', position: 'relative' }}>
            <button
              type="button"
              className="x"
              id="px"
              aria-label="Close"
              onClick={() => setPartnerModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
            >
              ✕
            </button>

            <h3>Partner with StudentDays</h3>
            <p className="pds">Colleges, clubs, operators & creators</p>

            {partnerSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <h3>Inquiry Received! 🤝</h3>
                <p className="pds">Our community partnership team will get in touch with you shortly.</p>
              </div>
            ) : (
              <form id="pf" onSubmit={handlePartnerSubmit}>
                <label>
                  Name
                  <input
                    name="name"
                    required
                    value={partnerFormData.name}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
                  />
                </label>
                <label>
                  Contact (email or phone)
                  <input
                    name="contact"
                    required
                    value={partnerFormData.contact}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, contact: e.target.value })}
                  />
                </label>
                <label>
                  Partnership type
                  <select
                    name="type"
                    value={partnerFormData.type}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, type: e.target.value })}
                  >
                    <option>College Club / Council</option>
                    <option>University / Institute</option>
                    <option>Travel Vendor / Operator</option>
                    <option>Brand / Sponsor</option>
                    <option>Others</option>
                  </select>
                </label>

                {partnerFormData.type === 'Others' && (
                  <label>
                    Your thoughts
                    <input
                      name="others"
                      value={partnerFormData.others}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, others: e.target.value })}
                    />
                  </label>
                )}

                <label>
                  About you or your organization
                  <textarea
                    name="about"
                    rows={4}
                    required
                    value={partnerFormData.about}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, about: e.target.value })}
                  />
                </label>

                <div className="row" style={{ marginTop: '22px' }}>
                  <button className="glass blue" type="submit">
                    Send Proposal ↗
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}

      {/* Confetti Spans */}
      {confettiActive && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 120 }}>
          {Array.from({ length: 46 }).map((_, i) => (
            <span
              key={i}
              className="cfp"
              style={{
                left: `${Math.random() * 100}%`,
                background: ['#FFD23F', '#1E6BFF', '#2ECC71', '#ffffff', '#ff5a7a'][i % 5],
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="wrap">
          <div className="fg">
            <div>
              <img src={IMAGES.logoFooter} alt="StudentDays.co" style={{ height: '44px' }} />
              <p className="ft">Travel. Connect. Experience.</p>
              <p style={{ color: '#8fa3c7', fontSize: '14px', margin: '8px 0 0' }}>
                Every trip becomes a story.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <a href="#hero" onClick={(e) => { e.preventDefault(); showView('home'); }}>Home</a>
              <a href="#trips" onClick={(e) => { e.preventDefault(); showView('trips'); }}>Trips</a>
              <a href="#app" onClick={(e) => { e.preventDefault(); showView('app'); }}>The App</a>
              <a href="#colleges" onClick={(e) => { e.preventDefault(); showView('colleges'); }}>University Chapters</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); showView('about'); }}>About Us</a>
            </div>
            <div>
              <h4>Policies</h4>
              <a href="/faq" onClick={(e) => { e.preventDefault(); navigate('/faq'); }}>FAQs</a>
              <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>Terms & Conditions</a>
              <a href="/cancellation-policy" onClick={(e) => { e.preventDefault(); navigate('/cancellation-policy'); }}>Refund & Cancellation Policy</a>
              <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }}>Privacy Policy</a>
            </div>
          </div>

          <div className="fb">
            <span>© 2026 StudentDays.co. All rights reserved.</span>
            <span>hello@studentdays.co.in · +91 9640389230</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
