import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";

import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";
import mapPath from "@assets/ChatGPT_Image_Jun_5,_2026,_11_18_35_PM_1780684309093.png";
import videoPath from "@assets/remove_the_pen_in_viedo_and_k_1780684303486.mp4";
import lonavlaPosterPath from "@/assets/lonavla-poster.png";
import storiesBgPath from "@/assets/stories-bg.jpg";

const reviews = [
  { name: "Rahul Kumar", uni: "Anurag University", quote: "Best trip of my college life." },
  { name: "Priya Sharma", uni: "GNU", quote: "The documentary film made me relive everything." },
  { name: "N Varadarajulu", uni: "Rao Institute", quote: "Never thought student travel could feel this premium." },
  { name: "Ayesha Khan", uni: "Sreenidhi Institute", quote: "Met amazing people and created lifelong memories." },
];

const formId = "1FAIpQLSdVqzBW-qdhJEg5KUshyKfWVjAAVlmmxD8boNkZKlibtJo67A";

function submitToGoogleForm(name: string, college: string, phone: string) {
  const body = new FormData();
  body.append("entry.270489629", name);
  body.append("entry.1341388790", college);
  body.append("entry.1577862662", phone);
  fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
    method: "POST", mode: "no-cors", body,
  }).catch(() => {});
}

export default function HomeGenz() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", college: "", phone: "", trip: "" });
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [tripAlert, setTripAlert] = useState(() => !sessionStorage.getItem("sd_trip_alert_seen"));

  const openJoin = () => {
    setJoinForm({ name: "", college: "", phone: "", trip: "" });
    setJoinSubmitted(false);
    setJoinOpen(true);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitToGoogleForm(joinForm.name, joinForm.college, joinForm.phone);
    setJoinSubmitted(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white selection:bg-primary/30 overflow-x-hidden">
      {/* Navbar */}
      <header className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 border-b ${scrolled ? "bg-[#050510]/90 backdrop-blur-md border-white/10 shadow-sm" : "bg-transparent border-transparent"}`}>
        <button onClick={() => scrollTo("hero")} className="focus:outline-none">
          <img src={logoPath} alt="StudentDays" className="h-10 w-auto object-contain" />
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <button onClick={() => scrollTo("upcoming")} className="hover:text-white transition-colors">Upcoming Trips</button>
          <button onClick={() => setLocation("/stories")} className="hover:text-white transition-colors">Documentary Stories</button>
          <button onClick={() => setLocation("/partners")} className="hover:text-white transition-colors">College Partners</button>
          <button onClick={() => setLocation("/about")} className="hover:text-white transition-colors">About Us</button>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle variant="dark" />
          <Button
            onClick={openJoin}
            className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold px-6 shadow-[0_0_20px_rgba(26,107,255,0.3)] hover:shadow-[0_0_30px_rgba(26,107,255,0.5)] transition-all"
          >
            may i join? 🙋
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <video
            src={videoPath}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/90 via-[#050510]/30 to-[#050510]/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white/70 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              🎓 students only • no cap
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 whitespace-pre-line leading-tight"
          >
            {"we go places.\nyou come with. 🗺️"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/60 max-w-2xl mx-auto mb-10 text-lg md:text-xl text-center"
          >
            StudentDays.co brings students from across India on trips that actually slap — curated experiences, good people, cinematic memories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Button
              onClick={() => scrollTo("upcoming")}
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white text-lg px-8 h-14 shadow-[0_0_40px_rgba(26,107,255,0.5)]"
            >
              ok i'm interested →
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/30"
        >
          <span className="text-sm font-medium tracking-widest uppercase mb-2">scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-[#050510] relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white">what we actually do 💡</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 text-left">
              {[
                "handpicked destinations (not random)",
                "budget that won't make you cry",
                "pick your vibe, we handle the rest",
                "no cap, we do everything",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white/[0.04] border border-white/10 p-4 rounded-2xl"
                >
                  <div className="w-8 h-8 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                  <span className="text-sm md:text-base font-medium text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-[#050510]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10"
          >
            <img src={mapPath} alt="Destinations Map" className="w-full h-auto object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Upcoming Trips */}
      <section id="upcoming" className="py-24 bg-[#050510]">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-white"
          >
            what's cooking 🍳
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden group hover:border-primary/40 transition-colors shadow-xl">
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={lonavlaPosterPath}
                  alt="Backpack to Heaven – Lonavla Monsoon Special"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30 font-bold">new drop 🔥</Badge>
                  <Badge className="bg-white/10 text-white/70 border-white/10">Lonavla • Monsoon</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Backpack to Heaven</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Trek Lohagad Fort, chase waterfalls, vibe in the Western Ghats. it's giving main character energy fr.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/40 mb-6">
                  <span>🚆 <strong className="text-white/70">Departing soon</strong></span>
                  <span>🎟️ <strong className="text-white/70">Limited Seats</strong></span>
                </div>
                <Button
                  onClick={() => setLocation("/trips/lonavla")}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base font-bold w-full sm:w-auto shadow-[0_0_20px_rgba(26,107,255,0.3)]"
                >
                  👀 see the trip
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="relative overflow-hidden" style={{ minHeight: "520px" }}>
        <div className="absolute inset-0">
          <img src={storiesBgPath} alt="StudentDays filmmaker" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight drop-shadow-lg whitespace-pre-line"
          >
            {"the coldest trip.\nthe hottest memory."}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10"
          >
            every trip gets its own filmmaker. you live it. we film it. you rewatch it 100 times.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => setLocation("/stories")}
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white transition-colors px-8 h-14 text-lg shadow-[0_0_30px_rgba(26,107,255,0.5)]"
            >
              watch the docs →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-[#050510] overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-3xl font-bold text-center text-white">what they said (no cap 💬)</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 px-6 snap-x hide-scrollbar">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="min-w-[300px] snap-center bg-white/[0.04] border border-white/10 rounded-2xl shrink-0 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12 border border-primary/30">
                  <AvatarFallback className="bg-primary/10 text-primary">{review.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-xs text-white/40">{review.uni}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3 text-yellow-500">{"⭐⭐⭐⭐⭐"}</div>
              <p className="text-white/60 italic">"{review.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 bg-[#050510]">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">your turn. don't sleep on this. ⏰</h2>
          <p className="text-white/50 mb-12 text-lg">drop in, we'll get you on a trip that fits your vibe and budget. fr.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?mode=gi_t" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white w-full sm:w-auto h-14 px-8 text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                Join WhatsApp Community
              </Button>
            </a>
            <a href="https://www.instagram.com/studentdays.co?igsh=MWg2cDBtN2NjYXJuaQ==" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 text-white w-full sm:w-auto h-14 px-8 text-lg border-0 shadow-[0_0_20px_rgba(253,29,29,0.3)]">
                Follow Instagram
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050510] pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <img src={logoPath} alt="StudentDays" className="h-20 w-auto mb-6" />
              <p className="text-primary font-medium tracking-wide">Live It. Love It. Remember It.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4 text-white/50">
                {[
                  { label: "FAQs", path: "/faqs" },
                  { label: "Terms & Conditions", path: "/terms" },
                  { label: "Refund & Cancellation Policy", path: "/refund" },
                  { label: "Privacy Policy", path: "/privacy" },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <button onClick={() => setLocation(path)} className="hover:text-primary transition-colors text-left">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-white/50">
                <li><a href="mailto:hello@studentdays.co.in" className="hover:text-primary transition-colors">hello@studentdays.co.in</a></li>
                <li><a href="https://www.instagram.com/studentdays.co?igsh=MWg2cDBtN2NjYXJuaQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?mode=gi_t" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 StudentDays.co</p>
            <p>Made for students across India</p>
            <p>A Banoth Rohith's &amp; Team Vision</p>
          </div>
        </div>
      </footer>

      {/* Trip Alert Popup */}
      <AnimatePresence>
        {tripAlert && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[360px] z-50 bg-[#0d0d1f] rounded-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="h-[2px] w-full bg-gradient-to-r from-primary to-orange-400" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">🏔️</div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-0.5">new drop 🔥 seats going fast</p>
                    <p className="font-black text-white leading-snug">Backpack to Heaven</p>
                    <p className="text-xs text-white/40">Lonavla</p>
                  </div>
                </div>
                <button
                  onClick={() => { setTripAlert(false); sessionStorage.setItem("sd_trip_alert_seen", "1"); }}
                  className="text-white/30 hover:text-white text-xl leading-none mt-0.5 shrink-0"
                >×</button>
              </div>
              <p className="text-sm text-white/50 mt-3 mb-4">monsoon magic awaits — limited seats, no cap. 🌧️🎒</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => { setTripAlert(false); sessionStorage.setItem("sd_trip_alert_seen", "1"); setLocation("/trips/lonavla"); }}
                  className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white h-10 text-sm font-bold"
                >
                  lock in now →
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setTripAlert(false); sessionStorage.setItem("sd_trip_alert_seen", "1"); }}
                  className="rounded-full h-10 text-sm px-4 border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  later
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join Modal */}
      <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
        <DialogContent className="sm:max-w-md bg-[#0a0a1a] border border-white/10 text-white">
          {!joinSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-white">may i join? 🙋</DialogTitle>
                <DialogDescription className="text-white/50">
                  tell us about yourself and we'll match you with the perfect trip. no cap.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleJoinSubmit} className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="gz-join-name" className="text-white/70 font-medium">Full Name</Label>
                  <Input
                    id="gz-join-name"
                    placeholder="e.g. Priya Sharma"
                    required
                    value={joinForm.name}
                    onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="gz-join-college" className="text-white/70 font-medium">College Name</Label>
                  <Input
                    id="gz-join-college"
                    placeholder="e.g. Anurag University"
                    required
                    value={joinForm.college}
                    onChange={(e) => setJoinForm({ ...joinForm, college: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="gz-join-phone" className="text-white/70 font-medium">Phone Number</Label>
                  <Input
                    id="gz-join-phone"
                    type="tel"
                    placeholder="e.g. xxxxx43210"
                    required
                    value={joinForm.phone}
                    onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 font-medium">Preferred Trip</Label>
                  <Select value={joinForm.trip} onValueChange={(val) => setJoinForm({ ...joinForm, trip: val })}>
                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Pick your vibe..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d0d1f] border-white/10 text-white">
                      <SelectItem value="arunachalam-pondicherry">Between Soul & Shore — Arunachalam & Pondicherry</SelectItem>
                      <SelectItem value="lonavla">Backpack to Heaven — Lonavla Monsoon Special</SelectItem>
                      <SelectItem value="manali">Manali</SelectItem>
                      <SelectItem value="kashmir">Kashmir</SelectItem>
                      <SelectItem value="ooty">Ooty</SelectItem>
                      <SelectItem value="darjeeling">Darjeeling</SelectItem>
                      <SelectItem value="surprise">Surprise me!</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="rounded-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-bold mt-2 shadow-[0_0_20px_rgba(26,107,255,0.4)]">
                  count me in! ✈️
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl">✈️</div>
              <h3 className="text-2xl font-black text-white">you're locked in, {joinForm.name.split(" ")[0]}!</h3>
              <p className="text-white/50 max-w-xs">
                we got your details. our team will hit you up at <span className="font-semibold text-white">{joinForm.phone}</span> to sort your trip. fr.
              </p>
              <a href="https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?mode=gi_t" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white h-12 text-base font-bold">
                  Join WhatsApp Community
                </Button>
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
