import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Booking } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import api from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  QrCode,
  ArrowLeft,
  XCircle,
  Copy
} from 'lucide-react';

export const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Payment form states
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [payerUpiId, setPayerUpiId] = useState<string>('');
  const [submittingPayment, setSubmittingPayment] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string>('');

  // Cancellation state
  const [cancelling, setCancelling] = useState<boolean>(false);

  const fetchBooking = async () => {
    if (!id) return;
    setLoading(true);
    const res = await api.get<{ booking: Booking }>(`/bookings/${id}`);
    if (res.success && res.data?.booking) {
      setBooking(res.data.booking);
    } else {
      setErrorMsg(res.error || 'Booking not found');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setPaymentError('');
    setSubmittingPayment(true);

    try {
      const res = await api.post(`/bookings/${id}/payments`, {
        referenceNumber,
        payerUpiId
      });

      if (res.success) {
        showToast('Payment reference submitted successfully!', 'success');
        fetchBooking();
      } else {
        setPaymentError(res.error || 'Failed to submit reference');
      }
    } catch (err: any) {
      setPaymentError(err.message || 'Payment submission failed');
    } finally {
      setSubmittingPayment(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to cancel this booking? Reserved seats will be released.')) {
      return;
    }

    setCancelling(true);
    try {
      const res = await api.post(`/bookings/${id}/cancel`, {
        reason: 'Cancelled by student from dashboard'
      });

      if (res.success) {
        showToast('Booking cancelled.', 'info');
        fetchBooking();
      } else {
        alert(res.error || 'Cancellation failed');
      }
    } finally {
      setCancelling(false);
    }
  };

  const fillDemoUtr = () => {
    const randomDigits = Math.floor(100000000000 + Math.random() * 900000000000);
    setReferenceNumber(`DEMO-UTR-${randomDigits}`);
    setPayerUpiId('student@okhdfcbank');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#06122b' }}>
        <div className="glass" style={{ padding: '20px 40px' }}>Loading booking record...</div>
      </div>
    );
  }

  if (errorMsg || !booking) {
    return (
      <div className="wrap" style={{ minHeight: '80vh', paddingTop: '120px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', color: '#ff6b81', marginBottom: '12px' }}>Booking Error</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>{errorMsg || 'Booking could not be found.'}</p>
          <Link to="/student/bookings" className="glass blue">Back to My Bookings</Link>
        </div>
      </div>
    );
  }

  const startDate = new Date(booking.trip.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  const paymentRecord = booking.payments && booking.payments.length > 0 ? booking.payments[0] : null;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <Link to="/student/bookings" className="glass sm" style={{ marginBottom: '20px', display: 'inline-flex' }}>
          <ArrowLeft size={14} />
          <span>Back to Bookings</span>
        </Link>

        {/* Header Summary */}
        <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFD23F' }}>
                  {booking.bookingReference}
                </span>
                <StatusBadge status={booking.status} />
              </div>
              <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#ffffff', margin: 0 }}>
                {booking.trip.title}
              </h1>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Total Paid / Due</span>
              <span style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff' }}>
                ₹{booking.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Stepper / Progress Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '32px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(46, 204, 113, 0.15)', border: '1px solid rgba(46, 204, 113, 0.4)', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#2ECC71', fontWeight: 700, display: 'block' }}>Step 1: Done</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Seats Reserved</span>
            </div>

            <div style={{
              padding: '14px',
              borderRadius: '12px',
              textAlign: 'center',
              background: booking.status === 'PENDING_PAYMENT' ? 'rgba(255, 210, 63, 0.15)' : 'rgba(46, 204, 113, 0.15)',
              border: `1px solid ${booking.status === 'PENDING_PAYMENT' ? 'rgba(255, 210, 63, 0.4)' : 'rgba(46, 204, 113, 0.4)'}`
            }}>
              <span style={{ fontSize: '12px', color: booking.status === 'PENDING_PAYMENT' ? '#FFD23F' : '#2ECC71', fontWeight: 700, display: 'block' }}>
                {booking.status === 'PENDING_PAYMENT' ? 'Step 2: Action Needed' : 'Step 2: Submitted'}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Payment Reference</span>
            </div>

            <div style={{
              padding: '14px',
              borderRadius: '12px',
              textAlign: 'center',
              background: booking.status === 'CONFIRMED'
                ? 'rgba(46, 204, 113, 0.15)'
                : booking.status === 'REJECTED' || booking.status === 'CANCELLED'
                ? 'rgba(255, 71, 87, 0.15)'
                : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <span style={{ fontSize: '12px', color: booking.status === 'CONFIRMED' ? '#2ECC71' : 'rgba(255,255,255,0.6)', fontWeight: 700, display: 'block' }}>
                Step 3: Verification
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>
                {booking.status === 'CONFIRMED' ? 'Confirmed & Locked' : 'Admin Review'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }} className="booking-layout-grid">
          {/* Left Column: Participants & Trip details */}
          <div>
            {/* Participants */}
            <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
              <h2 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#FFD23F" />
                <span>Travelers on this Booking ({booking.participants.length})</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {booking.participants.map((p, idx) => (
                  <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', display: 'block' }}>
                        {p.fullName} {idx === 0 ? '(Primary Traveler)' : ''}
                      </span>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                        {p.email} • {p.phone}
                      </span>
                    </div>

                    {p.collegeName && (
                      <span className="badge badge-gray">{p.collegeName}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics & Emergency */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h2 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '18px' }}>Logistics & Emergency Info</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Departure Date</span>
                  <span style={{ fontWeight: 600 }}>{startDate}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Meeting Point</span>
                  <span style={{ fontWeight: 600 }}>{booking.trip.meetingPoint || booking.trip.startLocation}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Emergency Contact</span>
                  <span style={{ fontWeight: 600 }}>{booking.emergencyContactName} ({booking.emergencyContactPhone})</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Special Notes</span>
                  <span style={{ fontWeight: 600 }}>{booking.specialRequirements || 'None specified'}</span>
                </div>
              </div>

              {booking.status !== 'CANCELLED' && booking.status !== 'CONFIRMED' && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '24px' }}>
                  <button
                    onClick={handleCancelBooking}
                    disabled={cancelling}
                    className="glass danger sm"
                  >
                    <XCircle size={14} />
                    <span>Cancel This Booking</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Payment Instructions & Mock Reference Form */}
          <div>
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h2 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '14px' }}>Payment Instructions</h2>

              {/* Status Notice */}
              {booking.status === 'CONFIRMED' ? (
                <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(46, 204, 113, 0.15)', border: '1px solid rgba(46, 204, 113, 0.4)', textAlign: 'center', marginBottom: '20px' }}>
                  <CheckCircle2 size={40} color="#2ECC71" style={{ margin: '0 auto 10px auto' }} />
                  <h3 style={{ fontSize: '18px', color: '#2ECC71', margin: '0 0 6px 0' }}>Payment Verified!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', margin: 0 }}>
                    Your booking is officially confirmed. Keep an eye on your email and notifications for trip group links.
                  </p>
                </div>
              ) : booking.status === 'PAYMENT_SUBMITTED' ? (
                <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255, 210, 63, 0.15)', border: '1px solid rgba(255, 210, 63, 0.4)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFD23F', marginBottom: '8px' }}>
                    <Clock size={18} />
                    <strong style={{ fontSize: '15px' }}>Awaiting Admin Verification</strong>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', margin: '0 0 10px 0' }}>
                    Reference Number: <strong style={{ color: '#ffffff' }}>{paymentRecord?.referenceNumber}</strong>
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', margin: 0 }}>
                    Our student desk verifies references regularly. Status will update once approved.
                  </p>
                </div>
              ) : (
                <>
                  {/* Demo UPI Details */}
                  <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', textAlign: 'center', marginBottom: '20px' }}>
                    <span className="badge badge-yellow" style={{ fontSize: '11px', marginBottom: '8px' }}>
                      DEMO MODE — NO REAL MONEY
                    </span>

                    <div style={{ width: '130px', height: '130px', margin: '10px auto', background: '#ffffff', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={90} color="#000000" />
                      <span style={{ fontSize: '10px', color: '#555', fontWeight: 700 }}>DEMO QR</span>
                    </div>

                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                      UPI ID: <strong style={{ color: '#6ea2ff' }}>demo-studentdays@icici-sandbox</strong>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFD23F', marginTop: '6px' }}>
                      Amount: ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Mock Reference Submission Form */}
                  <form onSubmit={handleSubmitPayment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {paymentError && (
                      <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(235, 77, 75, 0.2)', color: '#ff6b81', fontSize: '12px' }}>
                        {paymentError}
                      </div>
                    )}

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label className="form-label" style={{ margin: 0 }}>Transaction UTR / Reference</label>
                        <button
                          type="button"
                          onClick={fillDemoUtr}
                          style={{ background: 'transparent', border: 'none', color: '#FFD23F', fontSize: '11px', cursor: 'pointer', fontWeight: 700 }}
                        >
                          Auto-fill Demo UTR
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. DEMO-UTR-9876543210"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="form-label">Your UPI ID</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="student@okhdfcbank"
                        value={payerUpiId}
                        onChange={(e) => setPayerUpiId(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingPayment}
                      className="glass blue"
                      style={{ width: '100%', padding: '12px', fontSize: '14px', marginTop: '6px' }}
                    >
                      {submittingPayment ? 'Submitting Reference...' : 'Submit Payment Reference'}
                    </button>
                  </form>
                </>
              )}

              {/* Payment Info Footer */}
              {paymentRecord && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  <div>Provider: <strong>Mock UPI Provider</strong></div>
                  <div>Status: <strong>{paymentRecord.status}</strong></div>
                  {paymentRecord.referenceNumber && (
                    <div>Reference: <strong>{paymentRecord.referenceNumber}</strong></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 850px) {
          .booking-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
