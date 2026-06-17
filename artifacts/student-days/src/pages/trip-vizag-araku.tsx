import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";
import heroBgPath from "@/assets/studentdays-bus.png";

const highlights = [
  { icon: "🏖️", label: "Vizag Beach Experience" },
  { icon: "🎵", label: "Night Beach Jamming Session" },
  { icon: "🚠", label: "Kailasagiri Ropeway" },
  { icon: "⚓", label: "INS Kurusura Submarine Museum" },
  { icon: "✈️", label: "TU Aircraft Museum" },
  { icon: "🏞️", label: "Araku Valley Adventure" },
  { icon: "🕳️", label: "Borra Caves" },
  { icon: "☕", label: "Coffee Plantation" },
  { icon: "🏛️", label: "Tribal Museum" },
  { icon: "🌄", label: "Galikonda View Point" },
  { icon: "💦", label: "Katiki Waterfalls" },
  { icon: "🍗", label: "Bamboo Chicken Experience" },
  { icon: "🎥", label: "Cinematic Travel Documentary" },
];

const day1 = [
  "Reach Vizag & Check-in",
  "Breakfast",
  "Kailasagiri Ropeway",
  "Tenneti Park",
  "INS Kurusura Submarine Museum",
  "TU Aircraft Museum",
  "Beach Sunset",
  "Dinner",
  "Night Beach Jamming Session",
  "Overnight Stay",
];

const day2 = [
  "Sunrise & Breakfast",
  "Checkout",
  "AC Bus to Araku",
  "Borra Caves",
  "Coffee Plantation",
  "Tribal Museum",
  "Bamboo Chicken",
  "Galikonda View Point",
  "Katiki Waterfalls",
  "Shopping (If Time Permits)",
  "Return to Vizag",
  "Board Train to Hyderabad",
];

const day3 = ["Reach Hyderabad"];

const included = [
  "Transportation",
  "Stay Accommodation",
  "Breakfast & Dinner",
  "Sightseeing & Entry Tickets",
  "StudentDays Trip Coordination",
  "Cinematic Documentary Coverage",
];

const notIncluded = ["Lunch", "Personal Expenses", "Shopping"];

const faqs = [
  {
    q: "Can I join alone?",
    a: "Absolutely! Most students join solo and leave with a group of friends. You'll never feel alone on a StudentDays trip.",
  },
  {
    q: "Is this only for students?",
    a: "Yes, StudentDays trips are exclusively for college students. You'll be surrounded by people your age with similar energy.",
  },
  {
    q: "Are boys and girls separate?",
    a: "Stay arrangements are gender-separated with full privacy. The trip activities are all together as a group.",
  },
  {
    q: "Is transport included?",
    a: "Yes! Train tickets and AC bus for sightseeing are included in the package.",
  },
  {
    q: "What happens after booking?",
    a: "After you pay the ₹2,000 slot amount via the form, our team will contact you with full details, group links, and packing guidelines.",
  },
];

export default function TripVizagAraku() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bookUrl = "https://forms.gle/kKbv2UrRm6ofH1MUA";

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b border-transparent ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-border/50 py-3 shadow-lg"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="focus:outline-none">
            <img src={logoPath} alt="StudentDays" className="h-12 w-auto object-contain" />
          </button>
          <a href={bookUrl} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold px-6 shadow-[0_0_20px_rgba(26,107,255,0.3)]">
              Book My Seat
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative min-h-[90vh] flex items-end pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgPath}
            alt="Beach, Chills & Hills – Vizag & Araku"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/90 text-white border-0 text-sm px-3 py-1">👨‍🎓 Students Only</Badge>
              <Badge className="bg-orange-500/90 text-white border-0 text-sm px-3 py-1">🎟️ 30 Seats Only</Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 leading-tight">
              Beach, Chills &amp; Hills
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-medium">
              Vizag &amp; Araku Student Trip
            </p>

            <div className="flex flex-wrap gap-4 text-base md:text-lg mb-10">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                📅 <strong>27th &amp; 28th June</strong>
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                🚆 <strong>Departing 26th June Evening</strong>
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                💰 <strong>₹3,999 Only</strong>
              </span>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg font-bold shadow-[0_0_30px_rgba(26,107,255,0.5)] w-full sm:w-auto"
                >
                  🔵 Reserve Your Seat – ₹2,000
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full border-white/40 text-white bg-white/10 hover:bg-white/20 h-14 px-8 text-lg font-semibold w-full sm:w-auto"
              >
                View Full Itinerary
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trip Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900"
          >
            Trip Highlights
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl p-4 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{h.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{h.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900"
          >
            Why Join This Trip?
          </motion.h2>
          <p className="text-center text-gray-600 text-lg mb-10">No Stress For Planning — We plan everything for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Travel", "Stay", "Transport", "Entry Tickets", "Group Coordination", "Travel Documentary"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-white border border-blue-200 rounded-2xl p-4 shadow-sm"
              >
                <span className="text-primary text-xl font-bold">✅</span>
                <span className="font-semibold text-gray-800">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve Your Seat CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-10 text-white shadow-[0_0_60px_rgba(26,107,255,0.25)]"
          >
            <div className="text-4xl mb-4">🎟️</div>
            <h2 className="text-3xl font-black mb-2">Limited Seats Available</h2>
            <p className="text-white/80 text-lg mb-1">Current Price: <strong className="text-white text-2xl">₹3,999</strong></p>
            <p className="text-white/80 mb-2">Reserve Now with <strong className="text-white">₹2,000</strong></p>
            <p className="text-sm text-white/70 mb-8">Remaining ₹1,999 due 4 days before departure</p>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-8">
              🎟️ Seats Left: <strong>23</strong>
            </div>
            <div className="flex flex-col gap-3">
              <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-white text-primary hover:bg-white/90 h-14 text-lg font-bold shadow-xl"
                >
                  🔵 Reserve My Seat
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900"
          >
            Day-wise Itinerary
          </motion.h2>

          {[
            { label: "Day 1 – Vizag (27th June)", items: day1, color: "bg-blue-600" },
            { label: "Day 2 – Araku (28th June)", items: day2, color: "bg-orange-500" },
            { label: "Day 3 – Return (29th June)", items: day3, color: "bg-green-600" },
          ].map((day, di) => (
            <motion.div
              key={di}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: di * 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className={`inline-block ${day.color} text-white font-bold text-lg px-5 py-2 rounded-full mb-4`}>
                {day.label}
              </div>
              <div className="space-y-2 pl-2">
                {day.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Included / Not Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900"
          >
            What's Included
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-green-700 mb-6">✅ Included</h3>
              <ul className="space-y-3">
                {included.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="text-green-500 text-lg">✅</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-red-600 mb-6">❌ Not Included</h3>
              <ul className="space-y-3">
                {notIncluded.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="text-red-400 text-lg">❌</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Details */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white border border-blue-200 rounded-3xl p-8 text-center shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-6">Booking Details</h3>
            <div className="space-y-3 text-gray-700 text-lg">
              <p>💰 Trip Cost: <strong className="text-primary">₹3,999</strong></p>
              <p>🎟️ Slot Booking Amount: <strong className="text-primary">₹2,000</strong></p>
              <p>💳 Remaining Amount: <strong>₹1,999</strong> before 4 days of Departure</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900"
          >
            FAQ
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-blue-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-800 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-primary text-xl font-bold ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 bg-white text-gray-600">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,107,255,0.3)_0%,transparent_70%)]" />
        <div className="relative z-10 container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-6">🌊🏞️✨</div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Ready For Beaches, Hills &amp; New Friends?
            </h2>
            <p className="text-xl text-white/80 mb-2">₹3,999 Per Person</p>
            <p className="text-white/70 mb-10">Reserve your slot with ₹2,000 now.</p>
            <a href={bookUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/90 h-16 px-10 text-xl font-black shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                🔵 Book My Seat
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-blue-100 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <a href={bookUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white h-13 text-base font-bold shadow-[0_0_20px_rgba(26,107,255,0.4)]">
            🔵 Reserve My Seat – ₹2,000
          </Button>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm pb-24 md:pb-8">
        <p>© 2026 StudentDays.co · Made for students across India</p>
      </footer>
    </div>
  );
}
