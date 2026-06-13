import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";

const sections = [
  {
    title: "1. Information We Collect",
    content: null,
    subsections: [
      {
        subtitle: "Personal Information",
        items: [
          "Full Name",
          "Email Address",
          "Phone Number",
          "College / University Name",
          "City & State",
          "Emergency Contact Details",
          "Date of Birth (if required for the trip)",
        ],
      },
      {
        subtitle: "Booking Information",
        items: [
          "Trip registrations and event registrations",
          "Payment details (processed securely through trusted third-party payment gateways — we do not store card information)",
        ],
      },
      {
        subtitle: "Technical Information",
        items: [
          "Device information and browser type",
          "IP address",
          "Website usage patterns and pages visited",
          "Cookies and analytics data",
        ],
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: null,
    bullets: [
      "Process trip and event registrations",
      "Communicate updates, reminders, and important notices",
      "Provide customer support and resolve queries",
      "Improve our website and service offerings",
      "Personalise your experience on our platform",
      "Send announcements, offers, and trip-related communications",
      "Maintain safety standards during trips and events",
      "Comply with legal and regulatory requirements",
    ],
  },
  {
    title: "3. Information Sharing",
    content:
      "StudentDays.co does NOT sell, rent, or trade your personal information to third parties. We may share your information with the following partners solely for the purpose of delivering our services:",
    bullets: [
      "Trip partners and activity service providers",
      "Transportation providers (buses, trains, flights)",
      "Accommodation partners (hotels, hostels, resorts)",
      "Payment processors for secure transaction handling",
      "Government or legal authorities when required by law",
    ],
    footer:
      "All third-party partners are expected to maintain appropriate data protection standards.",
  },
  {
    title: "4. Cookies & Analytics",
    content:
      "We use cookies and analytics tools to:",
    bullets: [
      "Improve website performance and loading speed",
      "Understand visitor behaviour and preferences",
      "Enhance user experience and navigation",
      "Measure the effectiveness of our marketing campaigns",
    ],
    footer:
      "You may disable cookies through your browser settings. Please note that some features of our website may not function correctly if cookies are disabled.",
  },
  {
    title: "5. Data Security",
    content:
      "We take reasonable technical and organisational measures to protect your personal information against unauthorised access, misuse, disclosure, alteration, or loss. However, no online system can guarantee complete security, and we encourage you to keep your login credentials confidential.",
  },
  {
    title: "6. Communications",
    content:
      "By registering on StudentDays.co, you may receive the following types of communications:",
    bullets: [
      "Trip updates and itinerary details",
      "Booking confirmations and payment receipts",
      "Event notifications and announcements",
      "Community news and StudentDays updates",
      "Promotional offers and new trip launches",
    ],
    footer:
      "You may unsubscribe from marketing and promotional emails at any time by clicking the unsubscribe link or contacting us directly.",
  },
  {
    title: "7. Media & Photography",
    content:
      "During StudentDays trips and events, our team may capture photos and videos of participants for promotional and documentation purposes. These may be used on our website, social media channels, marketing materials, and promotional content. If you do not wish to be photographed or filmed, please notify the organising team before the event begins.",
  },
  {
    title: "8. Third-Party Links",
    content:
      "Our website may contain links to external websites, social media platforms, or partner pages. StudentDays.co is not responsible for the privacy practices of these third-party websites. We encourage you to review their individual privacy policies before sharing any personal information.",
  },
  {
    title: "9. Children's Privacy",
    content:
      "StudentDays.co is primarily designed for college students and young adults. If you are under 18 years of age, we require parental or guardian consent before you register for any trip or event. We do not knowingly collect personal information from children under 13.",
  },
  {
    title: "10. Changes to This Privacy Policy",
    content:
      "We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. Any updates will be published on this page with a revised effective date. We encourage you to review this page regularly to stay informed.",
  },
  {
    title: "11. Your Rights",
    content:
      "You have the right to access, correct, update, or request the deletion of your personal information held by StudentDays.co. To exercise any of these rights, please reach out to us using the contact details below.",
  },
  {
    title: "12. Contact Us",
    content:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:",
    contact: [
      { label: "Email", value: "hello@studentdays.co.in" },
      { label: "Website", value: "www.studentdays.co.in" },
    ],
  },
];

function Section({
  section,
  index,
}: {
  section: (typeof sections)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="mb-10"
    >
      <h2 className="text-xl md:text-2xl font-black text-blue-900 mb-3">
        {section.title}
      </h2>

      {section.content && (
        <p className="text-gray-700 leading-relaxed mb-3">{section.content}</p>
      )}

      {"subsections" in section &&
        section.subsections?.map((sub, si) => (
          <div key={si} className="mb-4">
            <h3 className="font-bold text-blue-800 mb-2">{sub.subtitle}</h3>
            <ul className="list-disc list-inside space-y-1">
              {sub.items.map((item, ii) => (
                <li key={ii} className="text-gray-700 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

      {"bullets" in section && section.bullets && (
        <ul className="list-disc list-inside space-y-1 mb-3">
          {section.bullets.map((b, bi) => (
            <li key={bi} className="text-gray-700 leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      )}

      {"footer" in section && section.footer && (
        <p className="text-gray-700 leading-relaxed">{section.footer}</p>
      )}

      {"contact" in section && section.contact && (
        <ul className="mt-2 space-y-1">
          {section.contact.map((c, ci) => (
            <li key={ci} className="text-gray-700">
              <span className="font-semibold text-blue-900">{c.label}:</span>{" "}
              {c.value}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="focus:outline-none">
            <img
              src={logoPath}
              alt="StudentDays"
              className="h-8 w-auto object-contain"
            />
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
        <section className="relative py-20 overflow-hidden bg-blue-50">
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
              className="text-5xl md:text-6xl font-black text-blue-900 mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-500 text-sm uppercase tracking-widest font-semibold"
            >
              Last Updated: June 2026
            </motion.p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-10 bg-white border-b border-blue-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              At <span className="font-semibold text-blue-900">StudentDays.co</span>, we
              value your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, share, and
              safeguard the data you provide when you use our website, register for trips,
              or interact with our services. By using StudentDays.co, you agree to the
              terms described in this policy.
            </motion.p>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            {sections.map((section, i) => (
              <Section key={i} section={section} index={i} />
            ))}
          </div>
        </section>

        {/* Closing Statement */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={logoPath}
                alt="StudentDays"
                className="h-12 w-auto mx-auto mb-6 opacity-80"
              />
              <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
                Your trust is important to us.{" "}
                <span className="font-semibold text-blue-900">StudentDays.co</span> is
                committed to creating safe, memorable, and meaningful experiences while
                protecting your privacy.
              </p>
              <p className="mt-6 text-blue-900 font-black text-xl tracking-wide">
                Travel. Connect. Experience.
              </p>
              <p className="text-gray-500 font-medium mt-1">
                Every Trip Becomes a Story.
              </p>
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
