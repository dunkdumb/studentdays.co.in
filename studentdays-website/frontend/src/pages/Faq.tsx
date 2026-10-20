import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { HelpCircle, FileText, Shield, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string | string[];
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export const Faq: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '1-0': true,
    '2-0': true
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories: FaqCategory[] = [
    {
      title: 'Trip Related Questions',
      items: [
        {
          q: 'How do I book a trip?',
          a: 'You can book a trip directly through our website by selecting your preferred trip and completing the registration and payment process.'
        },
        {
          q: 'How will I know if my booking is confirmed?',
          a: 'Once your payment is successfully completed, you will receive a confirmation through WhatsApp, email, or a phone call from our team.'
        },
        {
          q: 'What is included in the trip package?',
          a: 'Trip inclusions vary by destination. Generally, transportation, accommodation, trip coordination, planned activities, and sightseeing are included.'
        },
        {
          q: 'What is not included in the trip cost?',
          a: 'Personal expenses, shopping, additional meals, travel insurance, and activities not listed in the itinerary.'
        },
        {
          q: 'Can I join alone?',
          a: 'Yes. Many students join solo and make new friends during the trip.'
        },
        {
          q: 'Will there be trip coordinators?',
          a: 'Yes. Every trip is managed by StudentDays.co coordinators.'
        },
        {
          q: 'Do I need to arrange my own transportation?',
          a: 'Trip details will clearly mention whether transportation is included.'
        },
        {
          q: 'Can I bring friends?',
          a: 'Yes, provided they complete the registration process.'
        },
        {
          q: 'What should I carry for the trip?',
          a: [
            'Valid ID proof',
            'Comfortable clothes',
            'Personal medicines',
            'Charger / power bank',
            'Water bottle',
            'Personal essentials'
          ]
        }
      ]
    },
    {
      title: 'Payments & Refunds',
      items: [
        {
          q: 'What payment methods are accepted?',
          a: 'We accept secure online payments through approved payment gateways.'
        },
        {
          q: 'Is the booking amount refundable?',
          a: 'Refund eligibility depends on the cancellation timeline. Please refer to the Refund & Cancellation Policy.'
        },
        {
          q: 'How long does a refund take?',
          a: 'Approved refunds are usually processed within 3 to 7 business days.'
        }
      ]
    },
    {
      title: 'Safety & Security',
      items: [
        {
          q: 'Is StudentDays.co safe?',
          a: 'Yes. Safety is our top priority. Trips are carefully planned and managed by coordinators.'
        },
        {
          q: 'Are female travelers welcome?',
          a: 'Absolutely. StudentDays.co promotes a safe, respectful, and inclusive environment for all participants.'
        },
        {
          q: 'What should I do during an emergency?',
          a: 'Immediately contact the assigned trip coordinator. Emergency contact details are shared before departure.'
        }
      ]
    },
    {
      title: 'Community & Experiences',
      items: [
        {
          q: 'Can I become a StudentDays Campus Ambassador?',
          a: 'Yes. Students can apply through our website or contact our team.'
        },
        {
          q: 'Do you organize college-specific trips?',
          a: 'Yes. We collaborate with colleges, clubs, and student communities.'
        },
        {
          q: 'Do you organize events apart from trips?',
          a: 'Yes. We conduct meetups, workshops, networking sessions, and student experiences.'
        }
      ]
    },
    {
      title: 'Contact & Support',
      items: [
        {
          q: 'How can I contact StudentDays.co?',
          a: 'Email hello@studentdays.co.in or visit www.studentdays.co.in.'
        },
        {
          q: 'How can I stay updated about upcoming trips?',
          a: 'Follow StudentDays.co on Instagram and regularly check our website for announcements.'
        }
      ]
    }
  ];

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: 'radial-gradient(120% 70% at 50% 0, #0b2a66, #030a1a 70%)' }}>
      <div className="wrap" style={{ maxWidth: '880px' }}>
        <BackButton to="/" />

        {/* Header */}
        <div className="ctop" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', color: '#ffffff', marginBottom: '12px' }}>
            Frequently Asked Questions
          </h1>
          <p className="sub" style={{ color: '#cfe0ff', fontSize: '18px', margin: 0 }}>
            Everything you need to know before you travel.
          </p>
        </div>

        {/* Quick Nav Links between Policies */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '36px', flexWrap: 'wrap' }}>
          <Link to="/terms" className="glass" style={{ fontSize: '14px' }}>
            <FileText size={16} />
            <span>Terms &amp; Conditions</span>
          </Link>
          <Link to="/privacy-policy" className="glass" style={{ fontSize: '14px' }}>
            <Shield size={16} />
            <span>Privacy Policy</span>
          </Link>
          <Link to="/cancellation-policy" className="glass" style={{ fontSize: '14px' }}>
            <RefreshCw size={16} />
            <span>Refund &amp; Cancellation</span>
          </Link>
          <Link to="/faq" className="glass blue" style={{ fontSize: '14px' }}>
            <HelpCircle size={16} />
            <span>FAQs</span>
          </Link>
        </div>

        {/* Categories & Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="glass-panel" style={{ padding: '32px 28px' }}>
              <h2 style={{ fontSize: '22px', color: '#8fb3f5', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                {cat.title}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cat.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <details
                      key={itemIdx}
                      open={isOpen}
                      className="faq"
                      style={{
                        border: '1px solid rgba(255,255,255,0.18)',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '16px 20px',
                        cursor: 'pointer'
                      }}
                    >
                      <summary
                        onClick={(e) => {
                          e.preventDefault();
                          toggleItem(key);
                        }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontWeight: 700,
                          fontSize: '16px',
                          color: '#ffffff',
                          listStyle: 'none',
                          userSelect: 'none'
                        }}
                      >
                        <span>{item.q}</span>
                        {isOpen ? <ChevronUp size={18} color="#FFD23F" /> : <ChevronDown size={18} color="#8fb3f5" />}
                      </summary>

                      {isOpen && (
                        <div style={{ marginTop: '12px', color: '#cfe0ff', fontSize: '15px', lineHeight: 1.6 }}>
                          {Array.isArray(item.a) ? (
                            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                              {item.a.map((bullet, bIdx) => (
                                <li key={bIdx} style={{ marginBottom: '4px' }}>
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ margin: 0 }}>{item.a}</p>
                          )}
                        </div>
                      )}
                    </details>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Footer Branding Notice */}
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ color: '#FFD23F', fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0' }}>
              Travel. Connect. Experience.<br />Every Trip Becomes a Story.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
              Need more assistance? Reach us at <a href="mailto:hello@studentdays.co.in" style={{ color: '#6ea2ff' }}>hello@studentdays.co.in</a> or WhatsApp (+91 9640389230).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
