import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import TripLonavlaGenz from "./trip-lonavla-genz";

import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";
import heroBgPath from "@/assets/lonavla-poster.png";

const highlights = [
  { icon: "🏰", label: "Lohagad Fort" },
  { icon: "🏯", label: "Tikona Fort" },
  { icon: "🕌", label: "Bhaja Caves" },
  { icon: "🐯", label: "Tiger Point" },
  { icon: "🦁", label: "Lion's Point" },
  { icon: "🦅", label: "Duke's Nose" },
  { icon: "💧", label: "Kataldhar Waterfall" },
  { icon: "🏞️", label: "Pawna Lake View" },
  { icon: "🌧️", label: "Rain Dance in Nature" },
  { icon: "🔥", label: "Bonfire Night" },
  { icon: "📸", label: "Professional Photography" },
  { icon: "🚌", label: "Premium AC Private Bus" },
];

const day0 = [
  "Evening departure from Hyderabad Railway Station",
  "Overnight journey towards Pune by Train / AC Bus",
];

const day1 = [
  "Reach Pune — board our Private Premium AC Bus",
  "Scenic drive through the Western Ghats towards Lonavala",
  "Breakfast",
  "Hotel Check-in & Freshen Up",
  "Lohagad Fort Trek",
  "Bhaja Caves",
  "Tiger Point",
  "Local Lunch (Self)",
  "Sunset Photography",
  "Hot Tea & Maggi Stop",
  "Dinner",
  "Bonfire (Weather Permitting)",
  "Ice Breaking Games & Music Jamming Session",
  "Overnight Stay",
];

const day2 = [
  "Sunrise View (If Weather Permits)",
  "Breakfast",
  "Kataldhar Waterfall Trek",
  "Hidden Monsoon Trails",
  "Waterfall Photography",
  "Rain Dance in Nature",
  "Lunch (Self)",
  "Duke's Nose View Point",
  "Lion's Point & Valley Views",
  "Scenic Road Stops",
  "Local Market & Chikki Shopping",
  "Café Stop",
  "Dinner",
  "Friendship Circle & Memory Sharing",
  "Overnight Stay",
];

const day3 = [
  "Breakfast & Check-out",
  "Tikona Fort",
  "Pawna Lake View",
  "Scenic Mountain Roads",
  "Lunch (Self)",
  "Rajmachi View Point (Time Permitting)",
  "Evening — departure towards Pune",
  "Board Train / AC Bus to Hyderabad",
  "Overnight Journey",
];

const day4 = [
  "Morning arrival in Hyderabad",
  "Trip Ends… but the memories stay forever ❤️",
];

const included = [
  "Train Travel (Both Sides) / AC Bus (Based on Package)",
  "Private Premium AC Bus for Sightseeing",
  "Hotel Stay (Day 1 & Day 2 Nights)",
  "Day 1: Breakfast & Dinner",
  "Day 2: Breakfast & Dinner",
  "Day 3: Breakfast",
  "Entry Tickets",
  "Trek Guide",
  "Professional Photography",
  "Cinematic Videos",
  "StudentDays Trip Experience",
];

const notIncluded = ["Lunches", "Personal Expenses", ];

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
    a: "Stay arrangements are gender-separated with full privacy. Trip activities are all together as a group.",
  },
  {
    q: "What if waterfalls are restricted?",
    a: "Some waterfall and trekking routes may be restricted during heavy rainfall. Suitable alternative locations will be arranged.",
  },
  {
    q: "What happens after I register?",
    a: "After submitting the form, our team will contact you with full trip details, pricing, group links, and packing guidelines.",
  },
];

function TripLonavlaClassic() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bookUrl = "https://forms.gle/9ZmCQMqDrx87b7E17";

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
          <ThemeToggle variant="light" />
          <a href={bookUrl} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 shadow-[0_0_20px_rgba(22,163,74,0.3)]">
              Register Now
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative min-h-[90vh] flex items-end pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgPath}
            alt="Backpack to Heaven – Lonavla Monsoon Special"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-green-600/90 text-white border-0 text-sm px-3 py-1">🌧️ Monsoon Special</Badge>
              <Badge className="bg-primary/90 text-white border-0 text-sm px-3 py-1">👨‍🎓 Students Only</Badge>
              <Badge className="bg-orange-500/90 text-white border-0 text-sm px-3 py-1">🎒 Limited Seats</Badge>
            </div>

            <p className="text-lg text-white/70 mb-1 font-medium uppercase tracking-widest">StudentDays.co Presents</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 leading-tight">
              Backpack to Heaven
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-medium">
              Lonavla — Heaven in Monsoon
            </p>

            <div className="flex flex-wrap gap-4 text-base md:text-lg mb-10">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                🚆 <strong>Departing soon</strong>
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                🏔️ <strong>Western Ghats</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="rounded-full bg-green-600 hover:bg-green-700 text-white h-14 px-8 text-lg font-bold shadow-[0_0_30px_rgba(22,163,74,0.5)] w-full sm:w-auto"
                >
                  🎒 Register Now
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
                className="flex flex-col items-center text-center gap-2 bg-green-50 border border-green-100 rounded-2xl p-4 hover:border-green-400/40 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{h.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{h.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-14 text-gray-900"
          >
            Day-by-Day Itinerary
          </motion.h2>

          {[
            { day: "Day 0", date: "", title: "Departure", items: day0, color: "bg-gray-100 border-gray-300" },
            { day: "Day 1", date: "", title: "Forts • Waterfalls • Sunset", items: day1, color: "bg-green-50 border-green-200" },
            { day: "Day 2", date: "", title: "Heaven in Monsoon", items: day2, color: "bg-blue-50 border-blue-200" },
            { day: "Day 3", date: "", title: "Peaks • Memories • Return", items: day3, color: "bg-orange-50 border-orange-200" },
            { day: "Day 4", date: "", title: "Home", items: day4, color: "bg-rose-50 border-rose-200" },
          ].map(({ day, date, title, items, color }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-2xl p-6 mb-6 ${color}`}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{day} · {date}</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="mt-1 text-green-500 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Includes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12"
          >
            What's Included
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-lg font-black text-green-700 mb-4">✅ Included</h3>
              <ul className="space-y-2">
                {included.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="text-lg font-black text-red-600 mb-4">❌ Not Included</h3>
              <ul className="space-y-2">
                {notIncluded.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12"
          >
            FAQs
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <span className="text-xl text-gray-400 ml-4 shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-green-700 to-green-900 text-white text-center">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4"
          >
            Pack Your Bag. Adventure is Calling! 🎒
          </motion.h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Limited seats. Unlimited memories. Register now before they're gone.
          </p>
          <a href={bookUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="rounded-full bg-white text-green-700 hover:bg-white/90 h-14 px-10 text-lg font-black shadow-xl"
            >
              🎒 Register Now
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400 bg-white border-t border-gray-100">
        <p>© 2026 StudentDays.co · Every Trip Becomes A Story</p>
      </footer>
    </div>
  );
}

export default function TripLonavla() {
  const { theme } = useTheme();
  return theme === "genz" ? <TripLonavlaGenz /> : <TripLonavlaClassic />;
}
