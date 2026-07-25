import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";

const YT_VIDEO_ID = "lN502PsnETI";
const YT_URL = `https://www.youtube.com/watch?v=${YT_VIDEO_ID}`;

const REELS = [
  { url: "https://www.instagram.com/reel/Da17yG6vTWJ/", label: "Vizag Reel #1" },
  { url: "https://www.instagram.com/reel/Dax--wcv_7H/", label: "Vizag Reel #2" },
];

function CinemaIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"count" | "curtain" | "done">("count");
  const [count, setCount] = useState(3);

  useEffect(() => {
    const ticks = [0, 480, 960].map((delay, i) =>
      setTimeout(() => setCount(3 - i), delay)
    );
    const curtainTimer = setTimeout(() => setPhase("curtain"), 1440);
    const doneTimer = setTimeout(() => { setPhase("done"); onDone(); }, 2100);
    return () => { ticks.forEach(clearTimeout); clearTimeout(curtainTimer); clearTimeout(doneTimer); };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-0 inset-x-0 bg-black"
        style={{ height: "50%" }}
        initial={{ y: 0 }}
        animate={phase === "curtain" ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-black"
        style={{ height: "50%" }}
        initial={{ y: 0 }}
        animate={phase === "curtain" ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <AnimatePresence>
        {phase === "count" && (
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 1.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-6 flex-1 bg-white/10 rounded-sm" />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-6 flex-1 bg-white/10 rounded-sm" />
              ))}
            </div>
            <div className="relative flex items-center justify-center">
              <svg className="absolute" width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <motion.circle
                  cx="70" cy="70" r="60"
                  fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"
                  strokeDasharray={376}
                  initial={{ strokeDashoffset: 376 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.46, ease: "linear" }}
                  transform="rotate(-90 70 70)"
                />
              </svg>
              <span className="text-white font-black text-7xl">{count}</span>
            </div>
            <p className="text-white/30 text-sm tracking-[0.4em] uppercase mt-4">Lights. Camera. Action.</p>
          </motion.div>
        )}
      </AnimatePresence>
      {phase === "curtain" && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0, 0.08, 0] }}
          transition={{ duration: 0.5, times: [0, 0.2, 0.5, 0.7, 1] }}
        />
      )}
    </div>
  );
}

export default function Stories() {
  const [, setLocation] = useLocation();
  const [introComplete, setIntroComplete] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [redirected, setRedirected] = useState(false);
  const [activeReel, setActiveReel] = useState(0);

  useEffect(() => {
    if (!introComplete || redirected || secondsLeft <= 0) {
      if (introComplete && secondsLeft <= 0 && !redirected) {
        setRedirected(true);
        window.open(YT_URL, "_blank");
      }
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [introComplete, secondsLeft, redirected]);

  const progress = ((60 - secondsLeft) / 60) * 100;

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
      <CinemaIntro onDone={() => setIntroComplete(true)} />

      {/* Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={introComplete ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="fixed top-4 inset-x-4 z-50 flex items-center justify-between px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
      >
        <button onClick={() => setLocation("/")} className="focus:outline-none">
          <img src={logoPath} alt="StudentDays" className="h-9 w-auto object-contain" />
        </button>
        <button
          onClick={() => setLocation("/")}
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          ← Back
        </button>
      </motion.header>

      {/* ── VIDEO SECTION – first thing visible ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="min-h-screen flex flex-col justify-center px-4 pt-28 pb-12"
      >
        <div className="container mx-auto max-w-5xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Documentary
            </span>
            <span className="text-white/40 text-sm">Beach, Chills &amp; Hills — Vizag &amp; Araku</span>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={introComplete ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            <div
              className="absolute -inset-[2px] rounded-3xl opacity-70 blur-sm transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "linear-gradient(135deg, #1a6bff, #a855f7, #f97316)" }}
            />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <div style={{ paddingTop: "56.25%" }} className="relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0&color=white`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>

          {/* Redirect bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-4 flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="flex-1 w-full">
              <div className="flex justify-between text-sm mb-2">
                {!redirected ? (
                  <span className="text-white/50">
                    Opening on YouTube in <strong className="text-white">{secondsLeft}s</strong>
                  </span>
                ) : (
                  <span className="text-green-400 font-semibold">✓ Opened in YouTube</span>
                )}
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #1a6bff, #a855f7)" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <a
              href={YT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
            >
              ▶ Watch on YouTube
            </a>
          </motion.div>

          {/* Scroll nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center mt-10 gap-1"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-white/25 text-sm flex flex-col items-center gap-1"
            >
              <span>scroll for reels</span>
              <span>↓</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── REELS SECTION ── */}
      <section id="reels" className="py-24 px-4 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(168,85,247,0.07) 0%, transparent 70%)" }}
        />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span
                className="flex items-center gap-2 border text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest"
                style={{ borderColor: "rgba(168,85,247,0.4)", color: "#c084fc", background: "rgba(168,85,247,0.1)" }}
              >
                📱 Reels
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-center mb-3">Trip Moments</h2>
            <p className="text-center text-white/40 mb-10 text-lg">Raw. Real. Unforgettable.</p>

            {/* Reel tabs */}
            <div className="flex justify-center gap-3 mb-8">
              {REELS.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReel(i)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeReel === i
                      ? "text-white shadow-lg"
                      : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                  style={activeReel === i ? { background: "linear-gradient(135deg, #833AB4, #F56040)", border: "none" } : {}}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeReel}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="flex justify-center"
              >
                <div className="relative group">
                  <div
                    className="absolute -inset-[2px] rounded-3xl opacity-60 blur-sm"
                    style={{ background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F56040)" }}
                  />
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black" style={{ width: 340 }}>
                    <iframe
                      src={`${REELS[activeReel].url}embed/`}
                      className="w-full border-0 block"
                      style={{ height: 580 }}
                      allowTransparency
                      allow="encrypted-media"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6">
              <a
                href={REELS[activeReel].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                Open on Instagram →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center bottom, rgba(26,107,255,0.15) 0%, transparent 60%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl mx-auto"
        >
          <div className="text-5xl mb-6">🎒</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Create Your Story?</h2>
          <p className="text-white/50 mb-8 text-lg">Join the next StudentDays trip and become part of the film.</p>
          <button
            onClick={() => setLocation("/trips/arunachalam-pondicherry")}
            className="px-10 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-all shadow-[0_0_40px_rgba(26,107,255,0.5)] hover:shadow-[0_0_60px_rgba(26,107,255,0.7)]"
          >
            🎟️ Join Next Trip
          </button>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-white/20 text-sm border-t border-white/5">
        © 2026 StudentDays.co · Made for students across India
      </footer>
    </div>
  );
}
