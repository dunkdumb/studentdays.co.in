import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="focus:outline-none">
            <img src={logoPath} alt="StudentDays" className="h-8 w-auto object-contain" />
          </button>
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all"
          >
            ← Back to Home
          </Button>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden bg-blue-50">
          {/* Background logo watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none"
            aria-hidden="true"
          >
            <img src={logoPath} alt="" className="w-[600px] max-w-full" />
          </div>

          <div className="relative container mx-auto px-6 text-center max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-black text-blue-900 mb-6"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
              StudentDays.co is India's first student-only travel experience platform — built by students, for students. We create curated journeys that go beyond a trip and become a story worth telling.
            </motion.p>
          </div>
        </section>

        {/* About StudentDays */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-4">About StudentDays</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  StudentDays.co was born from a simple idea — college life is short, and memories matter. We organise student-exclusive trips across India, bringing together curious minds from different colleges to explore, bond, and create cinematic stories of their journeys.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mt-4">
                  Every trip comes with a dedicated filmmaker who captures your experience — so you don't just live it, you get to relive it forever.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-blue-100 rounded-3xl flex items-center justify-center shadow-lg">
                  <img src={logoPath} alt="StudentDays" className="w-40 h-auto" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 text-xl leading-relaxed">
                To make travel accessible, meaningful, and unforgettable for every student in India — regardless of budget or background. We believe every student deserves an adventure that shapes who they become.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-6">Our Vision</h2>
              <p className="text-gray-700 text-xl leading-relaxed">
                To become the largest student travel community in India — where every college, every student, and every corner of the country is connected through shared experiences, stories, and memories that last a lifetime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-4">Company Information</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Founded", value: "2026" },
                { label: "Founder", value: "Banoth Rohith & Team" },
                { label: "Headquarters", value: "Hyderabad, India" },
                { label: "Email", value: "hello@studentdays.co" },
                { label: "Instagram", value: "@studentdays.co" },
                { label: "Category", value: "Student Travel & Experiences" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">{item.label}</p>
                  <p className="text-gray-800 font-semibold text-lg">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black mb-4"
            >
              Ready to join the journey?
            </motion.h2>
            <p className="text-white/80 text-lg mb-8">Your next adventure is waiting.</p>
            <Button
              size="lg"
              onClick={() => setLocation("/")}
              className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-8 h-14 text-lg shadow-lg"
            >
              Explore Trips
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white pt-10 pb-6 border-t border-blue-100 text-center text-sm text-gray-500">
        <p>© 2026 StudentDays.co — Live It. Love It. Remember It.</p>
      </footer>
    </div>
  );
}
