import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { BackButton } from '../components/BackButton';
import CONTACT_INFO from '../data/contactInfo';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [dispatchType, setDispatchType] = useState<'whatsapp' | 'email'>('whatsapp');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const fullMessage = `StudentDays Inquiry\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nCollege: ${formData.college || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;

    if (dispatchType === 'whatsapp') {
      const waUrl = CONTACT_INFO.getWhatsAppUrl(fullMessage);
      setSubmitted(true);
      showToast('Opening WhatsApp with your message...', 'success');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        setSubmitting(false);
      }, 800);
    } else {
      const mailtoUrl = CONTACT_INFO.getMailtoUrl(formData.subject || 'StudentDays Inquiry', fullMessage);
      setSubmitted(true);
      showToast('Opening your email client...', 'success');
      window.location.href = mailtoUrl;
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#030a1a' }}>
      <div className="wrap">
        <BackButton to="/" />
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
          <span className="badge badge-yellow" style={{ marginBottom: '12px' }}>Get in Touch</span>
          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', color: '#ffffff', marginBottom: '16px' }}>
            Say hello.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', margin: 0 }}>
            Have questions about trips, dates, custom college batches, or safety? Drop us a note or message our student operations team directly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', maxWidth: '1000px', margin: '0 auto' }} className="contact-grid">
          {/* Left: Contact Info */}
          <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '26px', color: '#ffffff', marginBottom: '20px' }}>
                StudentDays Operations HQ
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
                We work directly with student councils, campus coordinators, and adventurous university travelers across India.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* WhatsApp */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(46,204,113,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2ECC71' }}>
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>WhatsApp Hotline</span>
                    <a
                      href={CONTACT_INFO.getWhatsAppUrl('Hi StudentDays Team! I have an inquiry about upcoming trips.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '16px', fontWeight: 700, color: '#2ECC71' }}
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(30,107,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E6BFF' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Email Support</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} style={{ fontSize: '16px', fontWeight: 700, color: '#6ea2ff' }}>
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hubs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,210,63,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD23F' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Hub Cities</span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>
                      {CONTACT_INFO.hubs.join(' • ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '30px' }}>
              <span className="badge badge-green">Response within 2-4 hours via WhatsApp</span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <CheckCircle size={54} color="#2ECC71" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '10px' }}>Message Dispatched!</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                  Your inquiry has been formatted and transferred to our student coordination desk. You can also message us directly anytime on WhatsApp.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <a
                    href={CONTACT_INFO.getWhatsAppUrl(`Hi, this is ${formData.name}. Following up on my inquiry.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass blue"
                    style={{ textDecoration: 'none' }}
                  >
                    Open WhatsApp Chat
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', college: '', subject: '', message: '' });
                    }}
                    className="glass"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h2 style={{ fontSize: '22px', color: '#ffffff', marginBottom: '4px' }}>Send Us a Message</h2>
                <p style={{ fontSize: '13px', color: '#aab6cc', margin: '0 0 10px 0' }}>
                  Fills your message directly into WhatsApp or email for instant coordination.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-input"
                      placeholder="Rohan Sharma"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-input"
                      placeholder="rohan@college.edu"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="form-label">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="form-label">College / University</label>
                    <input
                      type="text"
                      name="college"
                      className="form-input"
                      placeholder="VNR VJIET / CBIT"
                      value={formData.college}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="form-input"
                    placeholder="Batch Booking / Custom College Itinerary"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="form-input"
                    placeholder="Tell us about your trip plans, student count, preferred dates..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Dispatch Choice */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setDispatchType('whatsapp')}
                    className={`glass ${dispatchType === 'whatsapp' ? 'blue' : ''}`}
                    style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  >
                    Send via WhatsApp 💬
                  </button>
                  <button
                    type="button"
                    onClick={() => setDispatchType('email')}
                    className={`glass ${dispatchType === 'email' ? 'blue' : ''}`}
                    style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  >
                    Send via Email ✉️
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="glass blue"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Send size={16} />
                  <span>{submitting ? 'Connecting...' : dispatchType === 'whatsapp' ? 'Proceed to WhatsApp' : 'Open in Email Client'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
