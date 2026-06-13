import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By registering for, booking, or participating in any trip or event organised by StudentDays.co, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not proceed with registration or participation.",
    ],
  },
  {
    title: "2. Eligibility",
    content: [
      "Our trips and experiences are designed for students and young adults. By registering, you confirm that the information provided is accurate and complete.",
      "Participants under the age of 18 must obtain written parental or guardian consent before registering for any trip or event organised by StudentDays.co.",
    ],
  },
  {
    title: "3. Bookings & Registrations",
    content: [
      "All bookings are subject to availability. A booking is confirmed only after full or partial payment has been received as per the applicable payment schedule.",
      "StudentDays.co reserves the right to reject any registration at its sole discretion without being required to provide a reason.",
    ],
  },
  {
    title: "4. Payments",
    content: [
      "Payments must be made through the approved methods specified during registration. All prices are subject to change without prior notice.",
      "Additional taxes, service fees, or other applicable charges may be added at the time of booking or invoicing.",
    ],
  },
  {
    title: "5. Participant Responsibilities",
    content: [
      "All participants are expected to follow the instructions of trip coordinators and organising team members at all times, treat fellow participants and local communities with respect, and comply with all applicable local laws and regulations.",
      "StudentDays.co reserves the right to remove any participant whose behaviour is deemed disruptive, unsafe, or harmful to others, without refund.",
    ],
  },
  {
    title: "6. Travel & Event Changes",
    content: [
      "StudentDays.co may modify trip itineraries, schedules, accommodation, or transportation arrangements due to weather conditions, safety concerns, government directives, or other unforeseen circumstances.",
      "We will make every reasonable effort to communicate changes in advance and provide suitable alternatives where possible.",
    ],
  },
  {
    title: "7. Cancellation by Participant",
    content: [
      "If you wish to cancel your booking, please refer to our Refund and Cancellation Policy for applicable timelines, conditions, and refund amounts. Cancellations must be submitted in writing to the organising team.",
    ],
  },
  {
    title: "8. Cancellation by StudentDays.co",
    content: [
      "StudentDays.co reserves the right to cancel a trip or event due to insufficient registrations, natural disasters, government-imposed restrictions, safety concerns, or other unforeseen circumstances beyond our control.",
      "In such cases, participants will be eligible for refunds in accordance with our Refund and Cancellation Policy.",
    ],
  },
  {
    title: "9. Liability Disclaimer",
    content: [
      "StudentDays.co acts solely as an organiser and facilitator of travel experiences. We are not responsible for personal injuries, loss or damage to belongings, accidents, travel delays, failures by third-party service providers, natural disasters, or any other circumstances beyond our reasonable control.",
      "All participants acknowledge that travel involves inherent risks and agree to join trips and events entirely at their own risk.",
    ],
  },
  {
    title: "10. Photography & Media Consent",
    content: [
      "By participating in a StudentDays.co trip or event, you provide consent for photographs and videos captured during the trip to be used for marketing, social media, website content, and promotional campaigns.",
      "The StudentDays team captures moments throughout the trip as part of the experience. If you do not wish to appear in any media produced by StudentDays.co, please notify the organising team in writing before the event begins.",
    ],
  },
  {
    title: "11. Intellectual Property",
    content: [
      "All content, branding, logos, graphics, and videos associated with StudentDays.co are the exclusive intellectual property of StudentDays.co. No content may be copied, reproduced, distributed, or used in any form without prior written permission from StudentDays.co.",
    ],
  },
  {
    title: "12. Prohibited Activities",
    content: [
      "Participants must not provide false or misleading information during registration, misuse the platform or its services, engage in unlawful activities, harass or harm fellow participants or staff, or cause damage to property.",
      "Violation of any of these terms may result in immediate removal from the trip without any refund.",
    ],
  },
  {
    title: "13. Privacy",
    content: [
      "The collection, use, and storage of your personal information is governed by our Privacy Policy. By registering with StudentDays.co, you acknowledge and agree to the terms outlined in our Privacy Policy.",
    ],
  },
  {
    title: "14. Changes to Terms",
    content: [
      "StudentDays.co reserves the right to update or modify these Terms and Conditions at any time without prior notice. Updated terms will be posted on this page with the revised date. Continued use of our services after any changes constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "15. Contact Us",
    content: [
      "If you have any questions, concerns, or require clarification regarding these Terms and Conditions, please reach out to us.",
      "Email: hello@studentdays.co.in\nWebsite: www.studentdays.co.in",
    ],
  },
];

export default function Terms() {
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
            Back to Home
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
              Terms &amp; Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-500 text-base"
            >
              Last Updated: June 2026
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-gray-700 text-lg leading-relaxed mt-4"
            >
              Please read these Terms and Conditions carefully before registering for or participating in any trip or experience organised by StudentDays.co.
            </motion.p>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-4xl space-y-6">
            {sections.map((section, i) => {
              const isAlt = i % 2 === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * (i % 6) }}
                  className={`rounded-2xl p-8 border ${
                    isAlt
                      ? "bg-blue-50 border-blue-100"
                      : "bg-white border-gray-100 shadow-sm"
                  }`}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((para, j) => (
                      <p
                        key={j}
                        className="text-gray-700 leading-relaxed whitespace-pre-line"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Tagline CTA */}
        <section className="py-20 bg-blue-900 text-white text-center">
          <div className="container mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-black tracking-wide"
            >
              Travel. Connect. Experience. Every Trip Becomes a Story.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Button
                size="lg"
                onClick={() => setLocation("/")}
                className="rounded-full bg-white text-blue-900 hover:bg-white/90 font-bold px-8 h-14 text-lg shadow-lg"
              >
                Back to Home
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 pt-10 pb-6 border-t border-blue-800 text-center text-sm text-blue-300">
        <p>© 2026 StudentDays.co — Live It. Love It. Remember It.</p>
      </footer>
    </div>
  );
}
