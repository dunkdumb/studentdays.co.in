import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";
import mapPath from "@assets/ChatGPT_Image_Jun_5,_2026,_11_18_35_PM_1780684309093.png";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function AboutClassic() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="focus:outline-none">
            <img src={logoPath} alt="StudentDays" className="h-8 w-auto object-contain" />
          </button>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="light" />
            <Button onClick={() => setLocation("/")} variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all">
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden bg-blue-50">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none" aria-hidden="true">
            <img src={logoPath} alt="" className="w-[600px] max-w-full" />
          </div>
          <div className="relative container mx-auto px-6 text-center max-w-3xl">
            <motion.p variants={fadeUp} initial="hidden" animate="visible"
              className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
              Travel. Connect. Experience.
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-blue-900 mb-6">
              About Us
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 leading-relaxed">
              StudentDays.co is a student-first Travel Community & Experience platform built to create unforgettable experiences beyond classrooms.
            </motion.p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-6">Who We Are</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  We believe that the best memories of student life are not only made inside colleges but also through adventures, friendships, events, and shared experiences.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Our mission is to bring students together through affordable trips, meaningful connections, and exciting opportunities.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Whether it's exploring new destinations, meeting like-minded people, attending student events, or building lifelong friendships — StudentDays.co is designed to make every student journey more memorable.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-xl">
                <img src={mapPath} alt="Destinations" className="w-full h-auto object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: "🎯", title: "Our Mission", text: "To create affordable, safe, and memorable experiences that help students explore the world, build meaningful connections, and make the most of their student life." },
                { icon: "🚀", title: "Our Vision", text: "To become India's largest student community platform where students can travel, connect, learn, and create lifelong memories together." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-black text-blue-900 mb-4">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-blue-900 mb-12 text-center">What We Do</motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: "✈️", title: "Student Trips", desc: "Curated and budget-friendly trips designed specifically for students." },
                { icon: "🤝", title: "Student Communities", desc: "Building communities where students can connect, collaborate, and grow together." },
                { icon: "🎉", title: "Campus Experiences", desc: "Organizing events, meetups, workshops, and activities that make college life more exciting." },
                { icon: "🌐", title: "Networking Opportunities", desc: "Helping students meet peers from different colleges, cities, and backgrounds." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h4>
                  <p className="text-gray-700">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why StudentDays */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-blue-900 mb-10">Why StudentDays?</motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                "Student-friendly pricing",
                "Safe and organized experiences",
                "Opportunities to make new friends",
                "Community-driven experiences",
                "Memorable adventures and stories",
                "Exclusive experiences designed for students",
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                  <div className="w-7 h-7 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">✓</div>
                  <span className="text-gray-800 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-blue-900 mb-12 text-center">Our Values</motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Community First", desc: "We believe great experiences are created together." },
                { title: "Authentic Experiences", desc: "Every trip, event, and activity is designed to create genuine memories." },
                { title: "Accessibility", desc: "Quality experiences should be affordable and accessible to every student." },
                { title: "Growth Through Exploration", desc: "Travel and experiences help students learn, grow, and discover new perspectives." },
              ].map((v, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">{v.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black mb-8">Our Promise</motion.h2>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="space-y-2 text-xl text-white/90 mb-10">
              <p>At StudentDays.co, we don't just organize trips.</p>
              <p className="font-bold text-white">We create experiences.</p>
              <p className="font-bold text-white">We build friendships.</p>
              <p className="font-bold text-white">We connect students.</p>
              <p className="font-bold text-white">We create stories that last a lifetime.</p>
            </motion.div>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-white/70 italic text-lg mb-8">"Every Trip Becomes a Story."</motion.p>
            <Button onClick={() => setLocation("/")} size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-10 h-14 text-lg shadow-lg">
              Explore Trips
            </Button>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-2xl font-black text-blue-900 mb-8 text-center">Company Information</motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Founded", value: "2026" },
                { label: "Founder", value: "Rohith Banoth & Team" },
                { label: "Headquarters", value: "Hyderabad, India" },
                { label: "Email", value: "hello@studentdays.co.in" },
                { label: "Website", value: "www.studentdays.co.in" },
                { label: "Category", value: "Student Travel & Experiences" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">{item.label}</p>
                  <p className="text-gray-800 font-semibold">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 py-8 text-center text-blue-300 text-sm">
        <p>© 2026 StudentDays.co — Travel. Connect. Experience.</p>
      </footer>
    </div>
  );
}

function AboutGenz() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <button onClick={() => setLocation("/")} className="focus:outline-none">
          <img src={logoPath} alt="StudentDays" className="h-10 w-auto object-contain" />
        </button>
        <div className="flex items-center gap-3">
          <ThemeToggle variant="dark" />
          <button onClick={() => setLocation("/")} className="text-sm text-white/60 hover:text-white transition-colors">
            ← Back
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[80px]"
              style={{ background: "radial-gradient(circle, #1a6bff 0%, #a855f7 60%, transparent 80%)" }} />
          </div>
          <div className="relative container mx-auto max-w-3xl text-center">
            <motion.p variants={fadeUp} initial="hidden" animate="visible"
              className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70 mb-5">
              ✦ no gatekeeping here
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black leading-tight mb-6">
              we're just students<br />
              <span className="text-white/25">who figured out</span><br />
              how to travel. 🗺️
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
              className="text-white/50 text-lg max-w-xl mx-auto">
              StudentDays.co is a student-first travel & experience platform. we make trips that actually slap, fr.
            </motion.p>
          </div>
        </section>

        {/* Who we are — split */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">01 — who we are</p>
                <h2 className="text-3xl md:text-4xl font-black mb-5">
                  not a travel agency.<br /><span className="text-white/30">a student movement.</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-3">
                  college is 4 years. the trips you take during it? those are forever. we started StudentDays because we were tired of generic tours that didn't get student life.
                </p>
                <p className="text-white/50 leading-relaxed">
                  now we run curated trips, build communities, and film documentaries — all for students, by people who've been there.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={mapPath} alt="Destinations" className="w-full h-auto object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* What we actually do — horizontal list */}
        <section className="py-16 px-6 border-t border-white/[0.06]">
          <div className="container mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-8">02 — what we do</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
              {[
                { icon: "✈️", title: "trips that slap", desc: "curated, budget-friendly, students-only. no randos, no boring itineraries." },
                { icon: "🎬", title: "cinematic docs", desc: "every trip gets its own filmmaker. you live it. we film it. you rewatch it forever." },
                { icon: "🤝", title: "community fr", desc: "students from different colleges, one group chat, lifelong homies." },
                { icon: "📍", title: "hyderabad → india", desc: "we started local. now we're taking you everywhere. no cap." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-[#050510] p-8 hover:bg-white/[0.03] transition-colors">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-lg font-black text-white mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The vibe check list */}
        <section className="py-16 px-6 border-t border-white/[0.06]">
          <div className="container mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">03 — why us tho</p>
            <h2 className="text-3xl md:text-4xl font-black mb-8">
              the vibe check ✅
            </h2>
            <div className="space-y-0 divide-y divide-white/[0.06]">
              {[
                ["budget that doesn't make you cry 😭", "student pricing. always."],
                ["safe + organized", "we handle everything so you don't have to stress."],
                ["meet your people 🤝", "every trip is a chance to find your tribe."],
                ["genuine memories", "not a highlight reel. real experiences."],
                ["students only 🎓", "no awkward age gaps. just your people."],
                ["we film it 🎬", "professional cameraman on every trip. lowkey the best part."],
              ].map(([title, sub], i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-5 group">
                  <div className="flex items-center gap-4">
                    <span className="text-primary font-black text-lg">✦</span>
                    <div>
                      <p className="font-semibold text-white group-hover:text-primary transition-colors">{title}</p>
                      <p className="text-white/35 text-sm">{sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise / CTA */}
        <section className="py-24 px-6 border-t border-white/[0.06] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center bottom, rgba(26,107,255,0.12) 0%, transparent 60%)" }} />
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative container mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-5">our promise. no cap. 🤞</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              we don't do boring.<br /><span className="text-white/25">ever.</span>
            </h2>
            <p className="text-white/40 text-lg mb-3">we create experiences. we build friendships.</p>
            <p className="text-white/40 text-lg mb-10">we connect students. <span className="text-white font-semibold">"every trip becomes a story."</span></p>
            <Button onClick={() => setLocation("/")} size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-10 h-14 text-lg shadow-[0_0_40px_rgba(26,107,255,0.4)]">
              ok i'm in, let's go →
            </Button>
          </motion.div>
        </section>

        {/* Company info — minimal */}
        <section className="py-12 px-6 border-t border-white/[0.06]">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-wrap gap-8 text-sm text-white/30">
              {[
                ["founded", "2026"],
                ["founder", "Rohith Banoth & Team"],
                ["based in", "Hyderabad, India"],
                ["email", "hello@studentdays.co.in"],
              ].map(([label, val]) => (
                <div key={label}>
                  <span className="uppercase tracking-widest text-xs text-white/20 block mb-1">{label}</span>
                  <span className="text-white/60 font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-white/20 text-sm border-t border-white/5">
        <p>© 2026 StudentDays.co · Made for students across India</p>
      </footer>
    </div>
  );
}

export default function About() {
  const { theme } = useTheme();
  return theme === "genz" ? <AboutGenz /> : <AboutClassic />;
}
