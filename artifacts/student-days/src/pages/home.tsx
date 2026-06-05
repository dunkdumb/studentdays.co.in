import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Brand Assets
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";
import mapPath from "@assets/ChatGPT_Image_Jun_5,_2026,_11_18_35_PM_1780684309093.png";
import videoPath from "@assets/remove_the_pen_in_viedo_and_k_1780684303486.mp4";

// Generated Images
import goaPath from "@/assets/goa.png";
import pondicherryPath from "@/assets/pondicherry.png";
import hampiPath from "@/assets/hampi.png";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
              className="tracking-[0.2em] text-sm font-medium text-gray-800 uppercase"
            >
              LIVE IT • LOVE IT • REMEMBER IT
            </motion.p>
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
            <img src={logoPath} alt="StudentDays" className="h-8 w-auto object-contain" />
          </button>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
            <button onClick={() => scrollTo("upcoming")} className="hover:text-primary transition-colors" data-testid="nav-upcoming">Upcoming Trips</button>
            <button onClick={() => scrollTo("stories")} className="hover:text-primary transition-colors" data-testid="nav-stories">Documentary Stories</button>
            <button onClick={() => scrollTo("partners")} className="hover:text-primary transition-colors" data-testid="nav-partners">College Partners</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors" data-testid="nav-contact">About Us</button>
          </nav>

          <Button data-testid="button-join" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-[0_0_20px_rgba(26,107,255,0.3)] hover:shadow-[0_0_30px_rgba(26,107,255,0.5)] transition-all">
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
            >Create student-only trips across India.                                                                         Live it. Love it. Remember it.                                                                                        Take home a cinematic documentary film of your journey.                                  Here Every Trip Becomes a Story</motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button data-testid="button-explore" size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white text-lg px-8 h-14 shadow-[0_0_30px_rgba(26,107,255,0.4)]">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
                    className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl border border-blue-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      ✓
                    </div>
                    <span className="text-lg font-medium">{item}</span>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: goaPath, title: "Goa Escape", collab: "Anurag University", price: "₹5,999" },
                { img: pondicherryPath, title: "Pondicherry Diaries", collab: "GNU", price: "₹4,999" },
                { img: hampiPath, title: "Hampi Backpacking", collab: "MLRITM", price: "₹3,999" }
              ].map((trip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 border-white/10 overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="relative h-64 overflow-hidden">
                      <img src={trip.img} alt={trip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-none mb-2">
                          {trip.collab}
                        </Badge>
                        <h3 className="text-2xl font-bold text-white">{trip.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <p className="text-2xl font-bold text-primary">{trip.price}</p>
                      </div>
                      <Button data-testid={`button-reserve-${i}`} className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                        Reserve
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="py-32 relative overflow-hidden bg-blue-50">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-6 text-blue-900 tracking-tight"
            >
              The Coldest Journey.<br/>The Warmest Memory.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-700 max-w-2xl mx-auto mb-10"
            >
              Every StudentDays journey comes with a dedicated filmmaker. You live it. We film it. You rewatch it forever.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button data-testid="button-watch-reels" size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white transition-colors px-8 h-14 text-lg">
                Watch Trip Reels
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
              <a href="https://chat.whatsapp.com/HLAUVsG1Kv9LGiIXgj0DuV?mode=gi_t" target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp">
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
              <img src={logoPath} alt="StudentDays" className="h-10 w-auto mb-6" />
              <p className="text-primary font-medium tracking-wide">Live It. Love It. Remember It.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-blue-900">About Us</h4>
              <ul className="space-y-4 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-story">Our Story</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-partners">College Partnerships</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-communities">Student Communities</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-blue-900">Contact</h4>
              <ul className="space-y-4 text-gray-600">
                <li><a href="mailto:hello@studentdays.co" className="hover:text-primary transition-colors" data-testid="footer-email">hello@studentdays.co</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-instagram">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-whatsapp">WhatsApp</a></li>
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
    </div>
  );
}