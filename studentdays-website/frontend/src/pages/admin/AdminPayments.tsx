import React, { useState, useEffect } from 'react';
import { AdminNav } from '../../components/AdminNav';
import api from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';
import { CreditCard, CheckCircle, XCircle, Clock, Search, AlertCircle } from 'lucide-react';

export const AdminPayments: React.FC = () => {
  const { showToast } = useToast();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminNotes, setAdminNotes] = useState<{ [id: string]: string }>({});
  const [processingId, setProcessingId] = useState<string>('');

  const fetchPayments = async () => {
    setLoading(true);
    const res = await api.get<{ payments: any[] }>('/admin/payments/pending');
    if (res.success && res.data?.payments) {
      setPayments(res.data.payments);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleAction = async (paymentId: string, decision: 'APPROVED' | 'REJECTED') => {
    setProcessingId(paymentId);
    try {
      const res = await api.post(`/admin/payments/${paymentId}/verify`, {
        decision,
        adminNotes: adminNotes[paymentId] || (decision === 'APPROVED' ? 'Approved by Admin' : 'Rejected by Admin')
      });

      if (res.success) {
        showToast(`Payment reference successfully ${decision.toLowerCase()}!`, 'success');
        fetchPayments();
      } else {
        alert(res.error || 'Verification failed');
      }
    } finally {
      setProcessingId('');
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Financial Operations</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#ffffff', margin: 0 }}>
              Payment Verification Desk
            </h1>
          </div>
          <button onClick={fetchPayments} className="glass sm">
            Refresh Queue
          </button>
        </div>

        <AdminNav />

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', color: '#ffffff', margin: '0 0 6px 0' }}>
              Pending Reference Submissions ({payments.length})
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
              Review mock UPI reference numbers submitted by students to confirm their reservations.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
              Loading pending submissions...
            </div>
          ) : payments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <CheckCircle size={48} color="#2ECC71" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '6px' }}>Queue is Clear!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                There are no pending payment references waiting for verification.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {payments.map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFD23F' }}>
                          {p.booking.bookingReference}
                        </span>
                        <span className="badge badge-yellow">Awaiting Review</span>
                      </div>

                      <h3 style={{ fontSize: '19px', color: '#ffffff', margin: '0 0 4px 0' }}>
                        {p.booking.trip.title}
                      </h3>

                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                        Booked by <strong>{p.booking.user.name}</strong> ({p.booking.user.email} • {p.booking.user.phone})
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Amount</span>
                      <span style={{ fontSize: '24px', fontWeight: 800, color: '#2ECC71' }}>
                        ₹{p.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', fontSize: '13px' }}>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>Submitted UTR / Ref:</span>
                      <strong style={{ color: '#FFD23F', fontSize: '14px' }}>{p.referenceNumber}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>Payer UPI ID:</span>
                      <strong>{p.payerUpiId || 'N/A'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>Submitted At:</span>
                      <span>{new Date(p.submittedAt).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Admin Notes & Verification Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', paddingTop: '8px' }}>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Optional internal verification note..."
                        value={adminNotes[p.id] || ''}
                        onChange={(e) => setAdminNotes({ ...adminNotes, [p.id]: e.target.value })}
                        style={{ padding: '8px 12px', fontSize: '13px' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleAction(p.id, 'APPROVED')}
                        disabled={processingId === p.id}
                        className="glass"
                        style={{ background: 'rgba(46, 204, 113, 0.25)', borderColor: '#2ECC71', color: '#2ECC71', fontWeight: 700 }}
                      >
                        <CheckCircle size={16} />
                        <span>Approve & Confirm Booking</span>
                      </button>

                      <button
                        onClick={() => handleAction(p.id, 'REJECTED')}
                        disabled={processingId === p.id}
                        className="glass danger"
                      >
                        <XCircle size={16} />
                        <span>Reject Reference</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
