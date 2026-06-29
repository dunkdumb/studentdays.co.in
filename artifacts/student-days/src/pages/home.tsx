import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Brand Assets
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";
import mapPath from "@assets/ChatGPT_Image_Jun_5,_2026,_11_18_35_PM_1780684309093.png";
import videoPath from "@assets/remove_the_pen_in_viedo_and_k_1780684303486.mp4";

// Trip Assets
import vizagArakuPath from "@/assets/vizag-araku-poster.png";
import storiesBgPath from "@/assets/stories-bg.jpg";

type Trip = { title: string; collab: string; price: string };

export default function Home() {
  const [, setLocation] = useLocation();
  const shouldShowLoader = () => {
    const last = sessionStorage.getItem("sd_loader_time");
    if (!last) return true;
    return Date.now() - Number(last) > 10 * 60 * 1000; // 10 minutes
  };
  const [loading, setLoading] = useState(shouldShowLoader);
  const [scrolled, setScrolled] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [form, setForm] = useState({ name: "", college: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [storiesOpen, setStoriesOpen] = useState(false);

  const [joinOpen, setJoinOpen] = useState(false);
  const [tripAlert, setTripAlert] = useState(() => {
    return !sessionStorage.getItem("sd_trip_alert_seen");
  });
  const [joinForm, setJoinForm] = useState({ name: "", college: "", phone: "", trip: "" });
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  const openReserve = (trip: Trip) => {
    setSelectedTrip(trip);
    setForm({ name: "", college: "", phone: "" });
    setSubmitted(false);
  };

  const submitToGoogleForm = (name: string, college: string, phone: string) => {
    const formId = "1FAIpQLSdVqzBW-qdhJEg5KUshyKfWVjAAVlmmxD8boNkZKlibtJo67A";
    const body = new FormData();
    body.append("entry.270489629", name);
    body.append("entry.1341388790", college);
    body.append("entry.1577862662", phone);
    fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
      method: "POST", mode: "no-cors", body,
    }).catch(() => {}); // silent — no-cors means we can't read response, that's expected
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitToGoogleForm(form.name, form.college, form.phone);
    setSubmitted(true);
  };

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
    if (!loading) return;
    sessionStorage.setItem("sd_loader_time", String(Date.now()));
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={logoPath}
              alt="StudentDays Logo"
              className="h-24 w-auto mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="tracking-[0.2em] text-sm font-medium text-gray-800 uppercase mb-6"
            >
              LIVE IT • LOVE IT • REMEMBER IT
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 1.8 } } }}
              className="flex flex-wrap justify-center"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              {"Every Trip Becomes A Story".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 12, rotate: -4 },
                    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                  className="text-3xl font-bold"
                  style={{ color: "#1a6bff", display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b border-transparent ${
          scrolled ? "bg-background/80 backdrop-blur-md border-border/50 py-3 shadow-lg" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="focus:outline-none" data-testid="button-logo-home">
            <img src={logoPath} alt="StudentDays" className="h-22 w-auto object-contain" />
          </button>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
            <button onClick={() => scrollTo("upcoming")} className="hover:text-primary transition-colors" data-testid="nav-upcoming">Upcoming Trips</button>
            <button onClick={() => scrollTo("stories")} className="hover:text-primary transition-colors" data-testid="nav-stories">Documentary Stories</button>
            <button onClick={() => scrollTo("partners")} className="hover:text-primary transition-colors" data-testid="nav-partners">College Partners</button>
            <button onClick={() => setLocation("/about")} className="hover:text-primary transition-colors" data-testid="nav-about">About Us</button>
          </nav>

          <Button data-testid="button-join" onClick={openJoin} className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-[0_0_20px_rgba(26,107,255,0.3)] hover:shadow-[0_0_30px_rgba(26,107,255,0.5)] transition-all">
            May I Join?
          </Button>
        </div>
      </header>
      <main>
        <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              src={videoPath}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6"
            >
              India's First Student <br className="hidden md:block"/> Experience Platform
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 text-[19px] text-center"
            >StudentDays.co brings students from across India together through curated trips, shared experiences, and cinematic storytelling.</motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button data-testid="button-explore" onClick={() => scrollTo("upcoming")} size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white text-lg px-8 h-14 shadow-[0_0_30px_rgba(26,107,255,0.4)]">
                Explore Trips
              </Button>
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50"
          >
            <span className="text-sm font-medium tracking-widest uppercase mb-2">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </section>

        <section className="py-24 bg-background relative z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-12">Where We Go</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 text-left">
                {[
                  "Handpicked destinations",
                  "Student-friendly budgets",
                  "Pick your vibe",
                  "We handle everything"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-200 touch-manipulation"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      ✓
                    </div>
                    <span className="text-sm md:text-lg font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,107,255,0.1)_0%,transparent_70%)]" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <img src={mapPath} alt="Destinations Map" className="w-full h-auto object-cover" />
            </motion.div>
          </div>
        </section>

        <section id="upcoming" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-16 text-center"
            >
              Upcoming Trips
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <Card className="bg-card/50 border-white/10 overflow-hidden group hover:border-primary/50 transition-colors shadow-xl">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={vizagArakuPath}
                    alt="Beach, Chills & Hills – Vizag & Araku"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">🎓 Students Only</Badge>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Vizag • Araku Valley</Badge>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Beach, Chills &amp; Hills</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Experience beaches, scenic valleys, waterfalls, coffee plantations, and unforgettable student memories with fellow travelers.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                    <span>📅 <strong className="text-gray-800">11th &amp; 12th July</strong></span>
                    <span>🚆 <strong className="text-gray-800">Departing 10th July Evening</strong></span>
                    <span>🎟️ <strong className="text-gray-800">30 Seats Only</strong></span>
                  </div>
                  <Button
                    data-testid="button-reserve-vizag"
                    onClick={() => setLocation("/trips/vizag-araku")}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto shadow-[0_0_20px_rgba(26,107,255,0.3)]"
                  >
                    🎟️ Book Your Slot
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="stories" className="relative overflow-hidden" style={{ minHeight: "520px" }}>
          <div className="absolute inset-0">
            <img src={storiesBgPath} alt="StudentDays filmmaker" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight drop-shadow-lg"
            >
              The Coldest Journey.<br/>The Warmest Memory.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10"
            >
              Every StudentDays journey comes with a dedicated filmmaker. You live it. We film it. You rewatch it forever.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button data-testid="button-watch-stories" onClick={() => setStoriesOpen(true)} size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white transition-colors px-8 h-14 text-lg shadow-[0_0_30px_rgba(26,107,255,0.5)]">
                Watch Stories
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-6 mb-12">
            <h2 className="text-3xl font-bold text-center">What Students Say</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 px-6 snap-x hide-scrollbar">
            {[
              { name: "Rahul Kumar", uni: "Anurag University", quote: "Best trip of my college life." },
              { name: "Priya Sharma", uni: "GNU", quote: "The documentary film made me relive everything." },
              { name: "Harsha Reddy", uni: "MLRITM", quote: "Never thought student travel could feel this premium." },
              { name: "Ayesha Khan", uni: "Sreenidhi Institute", quote: "Met amazing people and created lifelong memories." }
            ].map((review, i) => (
              <Card key={i} className="min-w-[300px] snap-center bg-white border-blue-200 shrink-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 border border-primary/30">
                      <AvatarFallback className="bg-primary/10 text-primary">{review.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.uni}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3 text-yellow-500">
                    {'⭐⭐⭐⭐⭐'}
                  </div>
                  <p className="text-gray-700 italic">"{review.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="py-32 bg-blue-50 relative">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-5xl font-black mb-4 text-blue-900">Your Turn.</h2>
            <p className="text-2xl font-medium text-gray-800 mb-6">Ready To Travel Like A Student?</p>
            <p className="text-gray-700 mb-12 text-lg">Drop us a hello. We'll get you on the next trip that matches your vibe and budget.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?mode=gi_t" target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp">
                <Button size="lg" className="rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white w-full sm:w-auto h-14 px-8 text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                  Join WhatsApp Community
                </Button>
              </a>
              <a href="https://www.instagram.com/studentdays.co?igsh=MWg2cDBtN2NjYXJuaQ==" target="_blank" rel="noopener noreferrer" data-testid="button-instagram">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 text-white w-full sm:w-auto h-14 px-8 text-lg border-0 shadow-[0_0_20px_rgba(253,29,29,0.3)]">
                  Follow Instagram
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white pt-20 pb-10 border-t border-blue-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <img src={logoPath} alt="StudentDays" className="h-20 w-auto mb-6" />
              <p className="text-primary font-medium tracking-wide">Live It. Love It. Remember It.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-blue-900">Quick Links</h4>
              <ul className="space-y-4 text-gray-600">
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
              <h4 className="font-bold text-lg mb-6 text-blue-900">Contact</h4>
              <ul className="space-y-4 text-gray-600">
                <li><a href="mailto:hello@studentdays.co.in" className="hover:text-primary transition-colors" data-testid="footer-email">hello@studentdays.co.in</a></li>
                <li><a href="https://www.instagram.com/studentdays.co?igsh=MWg2cDBtN2NjYXJuaQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="footer-instagram">Instagram</a></li>
                <li><a href="https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?mode=gi_t" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="footer-whatsapp">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 StudentDays.co</p>
            <p>Made for students across India</p>
            <p>A Banoth Rohith's & Team Vision</p>
          </div>
        </div>
      </footer>

{/* Trip Registration Popup */}
      <AnimatePresence>
        {tripAlert && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[360px] z-50 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-blue-100 overflow-hidden"
          >
            <div className="h-1 w-full bg-gradient-to-r from-primary to-orange-400" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">🌊</div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">Registrations Open!</p>
                    <p className="font-black text-gray-900 leading-snug">Beach, Chills &amp; Hills</p>
                    <p className="text-xs text-gray-500">Vizag &amp; Araku · 11–12 July</p>
                  </div>
                </div>
                <button
                  onClick={() => { setTripAlert(false); sessionStorage.setItem("sd_trip_alert_seen", "1"); }}
                  className="text-gray-400 hover:text-gray-600 text-xl leading-none mt-0.5 shrink-0"
                  aria-label="Close"
                >×</button>
              </div>
              <p className="text-sm text-gray-600 mt-3 mb-4">Limited seats available. Book your slot before they fill up! 🎟️</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => { setTripAlert(false); sessionStorage.setItem("sd_trip_alert_seen", "1"); setLocation("/trips/vizag-araku"); }}
                  className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white h-10 text-sm font-bold shadow-[0_0_15px_rgba(26,107,255,0.3)]"
                >
                  Book My Slot
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setTripAlert(false); sessionStorage.setItem("sd_trip_alert_seen", "1"); }}
                  className="rounded-full h-10 text-sm px-4 border-gray-200"
                >
                  Later
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

{/* Stories Releasing Soon Modal */}
      <Dialog open={storiesOpen} onOpenChange={setStoriesOpen}>
        <DialogContent className="sm:max-w-sm bg-white text-center" data-testid="stories-dialog">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">🎬</div>
            </div>
            <DialogTitle className="text-2xl font-black text-blue-900 text-center">Stories Releasing Soon</DialogTitle>
            <DialogDescription className="text-gray-600 text-center mt-2">
              Our documentary stories are in the making. Every trip, every moment — captured for you to relive forever. Stay tuned!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-3">
            <a href="https://www.instagram.com/studentdays.co?igsh=MWg2cDBtN2NjYXJuaQ==" target="_blank" rel="noopener noreferrer">
              <Button className="w-full rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white border-0 h-11">
                Follow us on Instagram
              </Button>
            </a>
            <Button variant="outline" onClick={() => setStoriesOpen(false)} className="rounded-full h-11">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
        <DialogContent className="sm:max-w-md bg-white" data-testid="join-dialog">
          {!joinSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-blue-900">May I Join? 🙋</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Tell us a bit about yourself and we'll match you with the perfect trip.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleJoinSubmit} className="flex flex-col gap-4 mt-2" data-testid="join-form">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="join-name" className="text-gray-700 font-medium">Full Name</Label>
                  <Input
                    id="join-name"
                    data-testid="join-input-name"
                    placeholder="e.g. Priya Sharma"
                    required
                    value={joinForm.name}
                    onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="join-college" className="text-gray-700 font-medium">College Name</Label>
                  <Input
                    id="join-college"
                    data-testid="join-input-college"
                    placeholder="e.g. Anurag University"
                    required
                    value={joinForm.college}
                    onChange={(e) => setJoinForm({ ...joinForm, college: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="join-phone" className="text-gray-700 font-medium">Phone Number</Label>
                  <Input
                    id="join-phone"
                    data-testid="join-input-phone"
                    type="tel"
                    placeholder="e.g. xxxxx43210"
                    required
                    value={joinForm.phone}
                    onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-gray-700 font-medium">Preferred Trip</Label>
                  <Select value={joinForm.trip} onValueChange={(val) => setJoinForm({ ...joinForm, trip: val })}>
                    <SelectTrigger data-testid="join-select-trip" className="w-full">
                      <SelectValue placeholder="Pick your vibe..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vizag-araku">Beach, Chills &amp; Hills — Vizag &amp; Araku</SelectItem>
                      <SelectItem value="manali">Manali</SelectItem>
                      <SelectItem value="kashmir">Kashmir</SelectItem>
                      <SelectItem value="ooty">Ooty</SelectItem>
                      <SelectItem value="darjeeling">Darjeeling</SelectItem>
                      <SelectItem value="surprise">Surprise me!</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button data-testid="join-submit" type="submit" className="rounded-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold mt-2">
                  Count Me In!
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-6 gap-4" data-testid="join-success">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">✈️</div>
              <h3 className="text-2xl font-black text-blue-900">Welcome aboard, {joinForm.name.split(" ")[0]}!</h3>
              <p className="text-gray-600 max-w-xs">
                We've got your interest noted. Our team will call you at <span className="font-semibold text-gray-800">{joinForm.phone}</span> to sort your trip details.
              </p>
              <p className="text-sm text-gray-500">Meanwhile, join our WhatsApp community for trip updates and early-bird offers!</p>
              <a href="https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?mode=gi_t" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button data-testid="join-success-whatsapp" className="w-full rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white h-12 text-base">
                  Join WhatsApp Community
                </Button>
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedTrip} onOpenChange={(open) => !open && setSelectedTrip(null)}>
        <DialogContent className="sm:max-w-md bg-white" data-testid="reserve-dialog">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-blue-900">Reserve My Seat</DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedTrip && (
                    <span className="flex flex-col gap-1 mt-1">
                      <span className="font-semibold text-primary text-base">{selectedTrip.title}</span>
                      <span>Collaborated with: {selectedTrip.collab} · <span className="font-bold text-gray-800">{selectedTrip.price}</span></span>
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2" data-testid="reserve-form">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="res-name" className="text-gray-700 font-medium">Full Name</Label>
                  <Input
                    id="res-name"
                    data-testid="input-name"
                    placeholder="e.g. Rahul Kumar"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="res-college" className="text-gray-700 font-medium">College Name</Label>
                  <Input
                    id="res-college"
                    data-testid="input-college"
                    placeholder="e.g. Anurag University"
                    required
                    value={form.college}
                    onChange={(e) => setForm({ ...form, college: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="res-phone" className="text-gray-700 font-medium">Phone Number</Label>
                  <Input
                    id="res-phone"
                    data-testid="input-phone"
                    type="tel"
                    placeholder="e.g xxxxx43210"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <Button data-testid="button-submit-reserve" type="submit" className="rounded-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold mt-2">
                  Confirm My Seat
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-6 gap-4" data-testid="reserve-success">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">🎉</div>
              <h3 className="text-2xl font-black text-blue-900">You're in, {form.name.split(" ")[0]}!</h3>
              <p className="text-gray-600 max-w-xs">
                We've noted your interest for <span className="font-semibold text-primary">{selectedTrip?.title}</span>. Our team will reach out to you shortly on <span className="font-semibold text-gray-800">{form.phone}</span>.
              </p>
              <a href="https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?mode=gi_t" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button data-testid="button-success-whatsapp" className="w-full rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white h-12 text-base">
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