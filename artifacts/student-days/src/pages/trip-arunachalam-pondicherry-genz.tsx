import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";

import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";
import heroBgPath from "@/assets/pondicherry-bus.png";

const highlights = [
  { icon: "🛕", label: "Arunachalam Temple" },
  { icon: "🧘", label: "Spiritual Experience" },
  { icon: "🌇", label: "Sacred Town Evening" },
  { icon: "🏊", label: "Swimming Pool Resort" },
  { icon: "🏖️", label: "Rock Beach" },
  { icon: "🇫🇷", label: "French Colony" },
  { icon: "⛪", label: "Sacred Heart Basilica" },
  { icon: "🌴", label: "Paradise Beach" },
  { icon: "🚣", label: "Mangrove Boat Ride" },
  { icon: "🌿", label: "Mangrove Forest" },
  { icon: "📸", label: "Professional Cameraman" },
  { icon: "🚌", label: "Premium AC Private Bus" },
];

const day0 = [
  "Evening departure from Hyderabad Railway Station",
  "Overnight journey to Chennai by Train / Bus",
];

const day1 = [
  "Morning arrival at Chennai Railway Station",
  "Board our Private AC Bus",
  "Breakfast in Chennai",
  "Journey to Arunachalam (Tiruvannamalai)",
  "Visit Temple & explore the spiritual town",
  "Spend the evening in the spiritual town",
  "Dinner",
  "Night departure to Pondicherry",
  "Check-in & overnight stay at Swimming Pool Resort",
];

const day2 = [
  "Breakfast",
  "French Colony, Rock Beach, White Town",
  "Serenity Beach, Sacred Heart Basilica",
  "Paradise Beach & Mahatma Gandhi Statue",
  "Visit the Mangrove Forest",
  "Mangrove Boat Ride & Island visit",
  "Capture memorable moments with our travel cameraman",
  "Dinner",
  "Check out from stay",
  "Evening departure to Chennai",
  "Board Train / Bus for return journey to Hyderabad",
];

const included = [
  "Day 1: Breakfast & Dinner",
  "Day 2: Breakfast & Dinner",
  "Arunachalam Stay for Freshups",
  "Stay in Pondicherry (Swimming Pool Property)",
  "Mangrove Forest Boat Ride Tickets",
  "Entry Tickets",
  "Professional Camera Photos",
  "Private AC Bus for Local Sightseeing",
  "Train Tickets – Both Sides (Student Saver)",
];

const notIncluded = ["Lunches", "Personal Expenses"];

const packages = [
  {
    name: "🚆 Student Saver",
    transport: "Sleeper Train (Subject to availability)",
    price: "₹7,499",
    highlight: true,
    note: "Limited – closes 10 days before departure. Pre-registration mandatory.",
    travelItem: "Sleeper Train (Subject to availability)",
  },
  {
    name: "🚌 Comfort Student Travel",
    transport: "AC Bus + Premium AC Bus (from Chennai)",
    price: "₹7,999",
    highlight: false,
    note: "Available until seats are filled.",
    travelItem: "AC Bus Travel",
  },
];

const faqs = [
  { q: "Can I join alone?", a: "Absolutely! Most students join solo and leave with a group of friends. You'll never feel alone on a StudentDays trip." },
  { q: "Is this only for students?", a: "Yes, StudentDays trips are exclusively for college students. You'll be surrounded by people your age with similar energy." },
  { q: "Are boys and girls separate?", a: "Stay arrangements are gender-separated with full privacy. Trip activities are all together as a group." },
  { q: "What if train tickets aren't confirmed?", a: "If sleeper train tickets cannot be confirmed, your booking will be upgraded to Comfort Student Travel. You'll need to pay an additional ₹500 in that case." },
  { q: "When does Student Saver close?", a: "Student Saver bookings close exactly 10 days before departure to allow train ticket confirmation. After that, only Comfort Student Travel is available." },
  { q: "What happens after pre-booking?", a: "After paying the ₹3,000 pre-booking amount, our team will contact you with full trip details, group links, and packing guidelines." },
];

export default function TripArunachalamPondichecherryGenz() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bookUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfHFj7tn0AVfgJOYR4znjH-9qmcgAPgZ_6JsNTWHJsZorYp4g/viewform";

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b border-transparent ${
          scrolled
            ? "bg-[#050510]/90 backdrop-blur-md border-white/10 py-3 shadow-lg"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="focus:outline-none">
            <img src={logoPath} alt="StudentDays" className="h-12 w-auto object-contain" />
          </button>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="dark" />
            <a href={bookUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-[0_0_20px_rgba(26,107,255,0.4)]">
                Book My Seat
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgPath}
            alt="Between Soul & Shore – Arunachalam & Pondicherry"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/95 via-black/50 to-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/90 text-white border-0 text-sm px-3 py-1">👨‍🎓 students only • no cap</Badge>
              <Badge className="bg-orange-500/90 text-white border-0 text-sm px-3 py-1">🎟️ 30 seats. that's it.</Badge>
            </div>

            <p className="text-lg text-white/50 mb-1 font-medium uppercase tracking-widest">StudentDays.co Presents</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 leading-tight">
              Between Soul &amp; Shore
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 font-medium">
              Arunachalam &amp; Pondicherry Trip
            </p>

            <div className="flex flex-wrap gap-4 text-base md:text-lg mb-10">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                🚆 <strong>Departing Soon</strong>
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                💰 <strong>From ₹7,499</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg font-bold shadow-[0_0_30px_rgba(26,107,255,0.5)] w-full sm:w-auto">
                  🔵 secure my spot – ₹3,000
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full border-white/20 text-white bg-white/10 hover:bg-white/20 h-14 px-8 text-lg font-semibold w-full sm:w-auto"
              >
                View Full Itinerary
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trip Highlights */}
      <section className="py-20 bg-[#050510]">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12 text-white"
          >
            what we're hitting 🎯
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-2 bg-white/[0.04] border border-white/10 rounded-2xl p-4 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{h.icon}</span>
                <span className="text-sm font-semibold text-white/70">{h.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-4 text-white"
          >
            pick your travel era ✈️
          </motion.h2>
          <p className="text-center text-white/40 mb-10">Pre-Booking Price: <strong className="text-primary text-xl">₹3,000</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-3xl p-8 border-2 ${
                  pkg.highlight
                    ? "bg-orange-500/10 border-orange-500/60 shadow-lg shadow-orange-500/10"
                    : "bg-white/[0.04] border-white/10"
                }`}
              >
                {pkg.highlight && (
                  <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    ⚠ Limited Offer
                  </span>
                )}
                <h3 className="text-xl font-black text-white mb-1">{pkg.name}</h3>
                <p className="text-white/40 text-sm mb-4">{pkg.transport}</p>
                <p className="text-4xl font-black text-primary mb-4">{pkg.price}</p>
                <ul className="space-y-2 mb-4">
                  {[pkg.travelItem, ...(pkg.highlight ? [] : ["Premium AC Private Bus"]), "Stay", "Food", "All Activities", "StudentDays Trip Experience"].map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/70 text-sm font-medium">
                      <span className="text-green-400">✅</span> {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-white/30 italic mb-4">{pkg.note}</p>
                <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold">
                    grab this era →
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-5 flex items-center gap-4">
              <span className="text-3xl">👥</span>
              <div>
                <p className="font-bold text-white">Total 30 Members</p>
                <p className="text-white/40 text-sm">Female &amp; Male</p>
              </div>
            </div>
            <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-5 flex items-center gap-4">
              <span className="text-3xl">📅</span>
              <div>
                <p className="font-bold text-white">grab it before it's gone ⚡</p>
                <p className="text-orange-400 font-semibold text-sm">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reserve CTA */}
      <section className="py-20 bg-[#050510]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/30 to-blue-700/20 rounded-3xl p-10 text-white shadow-[0_0_60px_rgba(26,107,255,0.15)] border border-primary/20"
          >
            <div className="text-4xl mb-4">🎟️</div>
            <h2 className="text-3xl font-black mb-2">Limited Seats – no cap</h2>
            <p className="text-white/60 text-lg mb-1">Pre-Booking Price: <strong className="text-white text-2xl">₹3,000</strong></p>
            <p className="text-sm text-white/40 mb-8">Remaining amount due before departure</p>
            <a href={bookUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold shadow-[0_0_30px_rgba(26,107,255,0.4)]">
                🔵 secure my spot – ₹3,000
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12 text-white"
          >
            the full arc 🗓️
          </motion.h2>

          {[
            { label: "Day 0 – we move 🚆", items: day0, color: "bg-white/10" },
            { label: "Day 1 – arunachalam arc 🛕", items: day1, color: "bg-orange-500/20" },
            { label: "Day 2 – pondicherry era 🏖️", items: day2, color: "bg-primary/20" },
          ].map((day, di) => (
            <motion.div
              key={di}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: di * 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className={`inline-block ${day.color} text-white font-bold text-lg px-5 py-2 rounded-full mb-4 border border-white/10`}>
                {day.label}
              </div>
              <div className="space-y-2 pl-2">
                {day.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-white/70 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Included / Not Included */}
      <section className="py-20 bg-[#050510]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12 text-white"
          >
            what's included (for real) ✅
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-green-400 mb-6">✅ Included</h3>
              <ul className="space-y-3">
                {included.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 font-medium">
                    <span className="text-green-400 text-lg">✅</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-red-400 mb-6">❌ Not Included</h3>
              <ul className="space-y-3">
                {notIncluded.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 font-medium">
                    <span className="text-red-400 text-lg">❌</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-sm text-white/60">
                <p className="font-semibold text-yellow-400 mb-1">📌 heads up</p>
                <p>Itinerary may change based on weather, traffic, or govt rules. we got you either way.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12 text-white"
          >
            your questions, answered 🙋
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-white bg-white/[0.04] hover:bg-white/[0.07] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-primary text-xl font-bold ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 bg-white/[0.02] text-white/60">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#050510] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,107,255,0.2)_0%,transparent_60%)]" />
        <div className="relative z-10 container mx-auto px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-5xl mb-6">🛕🌊✨</div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Soul &amp; Shore Awaits. fr. ⚡</h2>
            <p className="text-xl text-white/60 mb-2">From ₹7,499 Per Person</p>
            <p className="text-white/40 mb-10">Pre-book your slot with ₹3,000 now.</p>
            <a href={bookUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white h-16 px-10 text-xl font-black shadow-[0_0_40px_rgba(26,107,255,0.5)]">
                🔵 secure my spot – ₹3,000
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#050510]/90 border-t border-white/10 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <a href={bookUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white h-13 text-base font-bold shadow-[0_0_20px_rgba(26,107,255,0.4)]">
            🔵 secure my spot – ₹3,000
          </Button>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-[#050510] text-white/20 py-8 text-center text-sm border-t border-white/5 pb-24 md:pb-8">
        <p>© 2026 StudentDays.co · Made for students across India</p>
      </footer>
    </div>
  );
}
