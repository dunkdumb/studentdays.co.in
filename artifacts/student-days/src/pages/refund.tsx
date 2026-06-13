import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import logoPath from "@assets/WhatsApp_Image_2026-05-18_at_12.12.18_AM-removebg-preview_1780684297152.png";

const refundTiers = [
  {
    timing: "More than 15 days before departure",
    refund: "Up to 75% Refund",
    note: "Processing charges & third-party fees deducted",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
    bar: "bg-green-400",
    width: "w-3/4",
  },
  {
    timing: "8–14 days before departure",
    refund: "Up to 50% Refund",
    note: "Processing charges & third-party fees deducted",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
    bar: "bg-yellow-400",
    width: "w-1/2",
  },
  {
    timing: "3–7 days before departure",
    refund: "Up to 25% Refund",
    note: "Processing charges & third-party fees deducted",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    bar: "bg-orange-400",
    width: "w-1/4",
  },
  {
    timing: "Less than 72 hours before departure",
    refund: "No Refund",
    note: "",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
    bar: "bg-red-400",
    width: "w-0",
  },
  {
    timing: "No Show",
    refund: "No Refund",
    note: "",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
    bar: "bg-red-400",
    width: "w-0",
  },
];

const sections = [
  {
    title: "2. Cancellation Request Process",
    content: [
      "To initiate a cancellation, please send an email to hello@studentdays.co.in with the following details:",
    ],
    list: [
      "Full Name",
      "Registered Phone Number",
      "Trip / Event Name",
      "Booking Details",
      "Reason for Cancellation",
    ],
    footer:
      "Cancellations will be processed only after verification of the above information. Requests made through any other channel may not be considered.",
  },
  {
    title: "3. Refund Processing Time",
    content: [
      "Once a cancellation is verified and approved, refunds will be processed within 7–15 business days. The actual credit timeline may vary depending on your payment provider or banking institution.",
    ],
  },
  {
    title: "4. Transfer of Booking",
    content: [
      "In certain cases, StudentDays.co may allow the transfer of your booking to another eligible participant. Transfers are subject to availability, verification of the new participant's eligibility, and operational feasibility.",
      "Transfer requests must be made before the specified deadline communicated by the team. StudentDays.co reserves the right to approve or decline any transfer request.",
    ],
  },
  {
    title: "5. Cancellation by StudentDays.co",
    content: [
      "StudentDays.co reserves the right to cancel, postpone, or reschedule any trip or event due to the following reasons:",
    ],
    list: [
      "Insufficient registrations",
      "Extreme weather conditions",
      "Government restrictions or orders",
      "Natural disasters or force majeure events",
      "Safety concerns for participants",
      "Transportation disruptions",
      "Other unforeseen circumstances beyond our control",
    ],
    footer:
      "In such cases, affected participants may receive a full refund or a credit note towards a future StudentDays.co trip, at the discretion of the management.",
  },
  {
    title: "6. Non-Refundable Charges",
    content: [
      "The following charges are non-refundable under any circumstances:",
    ],
    list: [
      "Booking convenience fees",
      "Payment gateway charges",
      "Government taxes",
      "Third-party reservation charges",
      "Customized add-ons and special requests",
    ],
  },
  {
    title: "7. Participant Removal During Trip",
    content: [
      "StudentDays.co reserves the right to remove a participant from an ongoing trip or event if their behaviour threatens the safety of others, violates local laws or regulations, involves harassment of fellow participants or staff, or significantly disrupts the overall experience.",
      "In such cases, no refund will be issued for the remaining portion of the trip. The removed participant may also be held responsible for any additional expenses incurred as a result of their behaviour.",
    ],
  },
  {
    title: "8. Force Majeure",
    content: [
      "StudentDays.co shall not be held liable for any cancellations, delays, or disruptions caused by events beyond our reasonable control, including but not limited to:",
    ],
    list: [
      "Natural disasters (floods, earthquakes, landslides)",
      "Political unrest or civil disturbances",
      "Government-imposed travel restrictions",
      "Pandemic or public health emergencies",
      "Transportation strikes or failures",
    ],
    footer:
      "In force majeure situations, any refunds will be subject to recoveries from third-party vendors and service providers. StudentDays.co will make every reasonable effort to assist affected participants.",
  },
  {
    title: "9. Contact Us",
    content: [
      "For any queries related to cancellations, refunds, or bookings, please reach out to us.",
      "Email: hello@studentdays.co.in\nWebsite: www.studentdays.co.in",
    ],
  },
];

export default function Refund() {
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
              Refund &amp; Cancellation Policy
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
              Please read this policy carefully before booking any trip or event with StudentDays.co. By completing a booking, you agree to the terms outlined below.
            </motion.p>
          </div>
        </section>

        {/* Section 1 — Cancellation by Participant with visual refund tiers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-8 border bg-blue-50 border-blue-100 mb-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">
                1. Cancellation by Participant
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                If you wish to cancel your booking, the following refund structure applies based on the time of cancellation relative to the departure date:
              </p>

              {/* Refund Tier Cards */}
              <div className="space-y-4">
                {refundTiers.map((tier, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`rounded-xl border p-5 ${tier.color}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <p className="font-semibold text-gray-800 text-sm md:text-base">
                        {tier.timing}
                      </p>
                      <span
                        className={`inline-block shrink-0 rounded-full px-4 py-1 text-sm font-bold ${tier.badge}`}
                      >
                        {tier.refund}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`${tier.bar} ${tier.width} h-2 rounded-full transition-all`}
                      />
                    </div>
                    {tier.note && (
                      <p className="text-xs text-gray-500 mt-1">{tier.note}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Advance booking note */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="mt-6 rounded-xl border border-blue-200 bg-white p-5"
              >
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold text-blue-800">Note: </span>
                  Advance booking amounts are non-refundable but may be adjusted against future StudentDays.co trips at management discretion.
                </p>
              </motion.div>
            </motion.div>

            {/* Remaining Sections */}
            {sections.map((section, i) => {
              const isAlt = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * (i % 6) }}
                  className={`rounded-2xl p-8 border mb-6 ${
                    isAlt
                      ? "bg-white border-gray-100 shadow-sm"
                      : "bg-blue-50 border-blue-100"
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
                    {section.list && (
                      <ul className="mt-2 space-y-2">
                        {section.list.map((item, k) => (
                          <li key={k} className="flex items-start gap-2 text-gray-700">
                            <span className="mt-1.5 shrink-0 h-2 w-2 rounded-full bg-blue-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.footer && (
                      <p className="text-gray-700 leading-relaxed mt-3">
                        {section.footer}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Closing statement + CTA */}
        <section className="py-20 bg-blue-900 text-white text-center">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/90 leading-relaxed mb-6"
            >
              We strive to keep our cancellation and refund process fair while ensuring the sustainability of student-friendly experiences. Thank you for being a part of the StudentDays.co community.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-2xl md:text-3xl font-black tracking-wide mb-8"
            >
              Travel. Connect. Experience. Every Trip Becomes a Story.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
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
