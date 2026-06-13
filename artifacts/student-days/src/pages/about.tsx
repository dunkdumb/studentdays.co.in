import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";
import mapPath from "@assets/ChatGPT_Image_Jun_5,_2026,_11_18_35_PM_1780684309093.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="focus:outline-none">
            <img src={logoPath} alt="StudentDays" className="h-8 w-auto object-contain" />
          </button>
          <Button onClick={() => setLocation("/")} variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all">
            ← Back to Home
          </Button>
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
