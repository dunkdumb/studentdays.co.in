import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  color: string;
  badge: string;
  items: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    title: "Trip Related Questions",
    color: "blue",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    items: [
      {
        q: "How do I book a trip?",
        a: "Book directly through our website. Simply select your preferred trip, complete the registration process, and make your payment to confirm your spot.",
      },
      {
        q: "How will I know if my booking is confirmed?",
        a: "You will receive a confirmation via WhatsApp, email, or phone call after your payment is successfully processed.",
      },
      {
        q: "What is included in the trip package?",
        a: "Inclusions vary by destination. Generally, the package covers transportation, accommodation, trip coordination, planned activities, and sightseeing as specified in the trip details.",
      },
      {
        q: "What is not included in the trip cost?",
        a: "Personal expenses, shopping, additional meals outside the itinerary, travel insurance, and any activities not listed in the trip itinerary are not included.",
      },
      {
        q: "Can I join alone?",
        a: "Absolutely! Many students join our trips solo and end up making great new friends along the way. You will never feel alone on a StudentDays trip.",
      },
      {
        q: "Will there be trip coordinators?",
        a: "Yes. Every trip is managed by dedicated StudentDays.co coordinators who are present throughout the journey to ensure everything runs smoothly.",
      },
      {
        q: "Do I need to arrange my own transportation?",
        a: "Each trip's details clearly mention whether transportation is included or not. Please refer to the specific trip page for accurate information.",
      },
      {
        q: "Can I bring friends?",
        a: "Yes! Feel free to bring friends along, provided they complete the full registration and payment process individually.",
      },
      {
        q: "What should I carry for the trip?",
        a: "We recommend bringing: Valid ID Proof, Comfortable Clothes, Personal Medicines, Charger/Power Bank, Water Bottle, and all Personal Essentials.",
      },
    ],
  },
  {
    title: "Payments & Refunds",
    color: "green",
    badge: "bg-green-100 text-green-700 border-green-200",
    items: [
      {
        q: "What payment methods are accepted?",
        a: "We accept secure online payments through our approved payment gateways. All transactions are encrypted and safe.",
      },
      {
        q: "Is the booking amount refundable?",
        a: "Refund eligibility depends on the cancellation timeline. Please refer to our Refund & Cancellation Policy for full details.",
      },
      {
        q: "How long does a refund take?",
        a: "Approved refunds are processed within 3–7 business days from the date of approval.",
      },
    ],
  },
  {
    title: "Safety & Security",
    color: "orange",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    items: [
      {
        q: "Is StudentDays.co safe?",
        a: "Yes. Safety is our top priority. All trips are carefully planned and managed by experienced coordinators to ensure a secure and enjoyable experience for every participant.",
      },
      {
        q: "Are female travelers welcome?",
        a: "Absolutely. StudentDays.co is committed to creating a safe, respectful, and inclusive environment for all participants, regardless of gender.",
      },
      {
        q: "What should I do during an emergency?",
        a: "Immediately contact your assigned trip coordinator. Emergency contact details and a safety briefing are shared with all participants before departure.",
      },
    ],
  },
  {
    title: "Community & Experiences",
    color: "purple",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    items: [
      {
        q: "Can I become a StudentDays Campus Ambassador?",
        a: "Yes! Students can apply to become Campus Ambassadors through our website or by reaching out to our team directly.",
      },
      {
        q: "Do you organize college-specific trips?",
        a: "Yes. We collaborate with colleges, clubs, and student communities to organise tailored trips and experiences.",
      },
      {
        q: "Do you organize events apart from trips?",
        a: "Yes! Beyond travel, we organise meetups, workshops, networking sessions, and various other student experiences throughout the year.",
      },
    ],
  },
  {
    title: "Contact & Support",
    color: "pink",
    badge: "bg-pink-100 text-pink-700 border-pink-200",
    items: [
      {
        q: "How can I contact StudentDays.co?",
        a: "You can reach us at hello@studentdays.co.in or visit our website at www.studentdays.co.in. We are always happy to help!",
      },
      {
        q: "How can I stay updated about upcoming trips?",
        a: "Follow StudentDays.co on Instagram and check our website regularly for the latest trips, events, and announcements.",
      },
    ],
  },
];

const headerColors: Record<string, string> = {
  blue: "bg-blue-50 border-blue-100",
  green: "bg-green-50 border-green-100",
  orange: "bg-orange-50 border-orange-100",
  purple: "bg-purple-50 border-purple-100",
  pink: "bg-pink-50 border-pink-100",
};

const titleColors: Record<string, string> = {
  blue: "text-blue-800",
  green: "text-green-800",
  orange: "text-orange-800",
  purple: "text-purple-800",
  pink: "text-pink-800",
};

export default function Faqs() {
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
              FAQs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
              Got questions? We have answers. Everything you need to know about booking, safety, payments, and more — all in one place.
            </motion.p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl space-y-14">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.08 }}
              >
                {/* Category Header */}
                <div
                  className={`flex items-center gap-3 rounded-2xl px-5 py-4 mb-4 border ${headerColors[category.color]}`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${category.badge}`}
                  >
                    {catIndex + 1 < 10 ? `0${catIndex + 1}` : catIndex + 1}
                  </span>
                  <h2 className={`text-xl md:text-2xl font-black ${titleColors[category.color]}`}>
                    {category.title}
                  </h2>
                </div>

                {/* Accordion */}
                <Accordion type="multiple" className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`${catIndex}-${itemIndex}`}
                      className="px-5 last:border-b-0"
                    >
                      <AccordionTrigger className="text-base font-semibold text-gray-800 hover:no-underline hover:text-primary py-5">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed text-base">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA — WhatsApp Community */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-4">Still have questions?</h2>
              <p className="text-white/80 text-lg mb-3">
                Join our WhatsApp community and connect with fellow students, ask questions, and stay updated on upcoming trips.
              </p>
              <p className="text-white/60 text-base italic mb-8">Travel. Connect. Experience.</p>
              <a
                href="https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-8 h-14 text-lg shadow-lg"
                >
                  Join WhatsApp Community
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-white pt-10 pb-6 border-t border-blue-100 text-center text-sm text-gray-500">
        <p>© 2026 StudentDays.co — Live It. Love It. Remember It.</p>
      </footer>
    </div>
  );
}
