import { useLocation } from "wouter";
import { motion } from "framer-motion";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";

const COLLEGES = [
  "Anurag University",
  "University of Hyderabad",
  "JNTUH",
  "Osmania University",
  "BVRIT",
  "Malla Reddy Group (MLRIT)",
  "Bhoj Reddy Engineering College",
  "KMIT",
  "GRIET",
  "VNR VJIET",
];

// duplicate for seamless marquee loop
const MARQUEE = [...COLLEGES, ...COLLEGES];

export default function Partners() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
      {/* Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-20 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.15] blur-[100px]"
            style={{ background: "radial-gradient(circle, #1a6bff 0%, #a855f7 60%, transparent 80%)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70 mb-5">
            🎓 no cap, these are our people
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6">
            These colleges<br />
            <span className="text-white/20">said let's go.</span><br />
            We said bet. 🫡
          </h1>

          <p className="text-white/40 text-lg max-w-md mx-auto">
            Hyderabad's top colleges have been eating with us. Their students went on a trip and lowkey never recovered (in a good way).
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 w-full overflow-hidden"
        >
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #050510, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #050510, transparent)" }} />

          <div className="flex gap-4 animate-marquee whitespace-nowrap w-max">
            {MARQUEE.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] text-white/70 text-sm font-semibold shrink-0 hover:border-primary/40 hover:text-white transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Vertical list */}
        <div className="relative z-10 mt-20 w-full max-w-xl mx-auto">
          <div className="h-px w-full bg-white/10 mb-10" />
          {COLLEGES.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.5, ease: "easeOut" }}
              className="flex items-center justify-between py-4 border-b border-white/[0.06] group"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/20 font-mono w-5 text-right">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-white/80 group-hover:text-white font-semibold transition-colors">{name}</span>
              </div>
              <span className="text-white/20 text-xs font-medium tracking-widest uppercase group-hover:text-primary/60 transition-colors">they ate 🔥</span>
            </motion.div>
          ))}
          <div className="h-px w-full bg-white/10 mt-0" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center bottom, rgba(26,107,255,0.12) 0%, transparent 60%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-lg mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">your college not here? that's on you fr 💀</h2>
          <p className="text-white/40 mb-8">lock in, book a trip, put your college on the map. no cap.</p>
          <button
            onClick={() => setLocation("/")}
            className="px-10 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-[0_0_40px_rgba(26,107,255,0.4)]"
          >
            ok i'm in, let's go →
          </button>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-white/20 text-sm border-t border-white/5">
        © 2026 StudentDays.co · Made for students across India
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
