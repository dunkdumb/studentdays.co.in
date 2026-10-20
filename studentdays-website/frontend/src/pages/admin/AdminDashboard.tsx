import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminNav } from '../../components/AdminNav';
import { StatusBadge } from '../../components/StatusBadge';
import { DashboardStats } from '../../types';
import api from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  Compass,
  CreditCard,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processingPaymentId, setProcessingPaymentId] = useState<string>('');

  const fetchDashboardData = async () => {
    setLoading(true);
    const res = await api.get<{
      stats: DashboardStats;
      recentBookings: any[];
      pendingPaymentList: any[];
    }>('/admin/dashboard');

    if (res.success && res.data) {
      setStats(res.data.stats);
      setPendingPayments(res.data.pendingPaymentList || []);
      setRecentBookings(res.data.recentBookings || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleVerify = async (paymentId: string, decision: 'APPROVED' | 'REJECTED') => {
    setProcessingPaymentId(paymentId);
    try {
      const res = await api.post(`/admin/payments/${paymentId}/verify`, {
        decision,
        adminNotes: decision === 'APPROVED' ? 'Approved from Master Dashboard' : 'Rejected by admin'
      });

      if (res.success) {
        showToast(`Payment reference ${decision.toLowerCase()}!`, 'success');
        fetchDashboardData();
      } else {
        alert(res.error || 'Verification failed');
      }
    } finally {
      setProcessingPaymentId('');
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Executive Management</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#ffffff', margin: 0 }}>
              Master Admin Dashboard
            </h1>
          </div>
          <button onClick={fetchDashboardData} className="glass sm">
            Refresh Data
          </button>
        </div>

        <AdminNav />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
            Calculating database metrics...
          </div>
        ) : (
          <div>
            {/* Live Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
                  Confirmed Revenue
                </span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#2ECC71' }}>
                  ₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
                  Pending Verifications
                </span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFD23F' }}>
                  {stats?.pendingPayments || 0}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
                  Confirmed Bookings
                </span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#1E6BFF' }}>
                  {stats?.confirmedBookings || 0}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
                  Active Students
                </span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>
                  {stats?.totalStudents || 0}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
                  Published Trips
                </span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>
                  {stats?.publishedTrips || 0} / {stats?.totalTrips || 0}
                </div>
              </div>
            </div>

            {/* Pending Payments Action Card */}
            <div className="glass-panel" style={{ padding: '32px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '22px', color: '#ffffff', margin: '0 0 4px 0' }}>
                    Payment Verification Queue
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
                    Submitted mock UPI reference numbers requiring authorized administrator approval
                  </p>
                </div>
                <Link to="/admin/payments" className="glass sm">
                  <span>View Full Queue</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {pendingPayments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: 'rgba(255,255,255,0.6)' }}>
                  ✔ All payment references are currently verified. No pending submissions.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Booking Ref</th>
                        <th>Student</th>
                        <th>Trip</th>
                        <th>Amount</th>
                        <th>Submitted UTR / Ref</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingPayments.map((p) => (
                        <tr key={p.id}>
                          <td style={{ fontWeight: 700, color: '#FFD23F' }}>
                            {p.booking.bookingReference}
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{p.booking.user.name}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{p.booking.user.email}</div>
                          </td>
                          <td>{p.booking.trip.title}</td>
                          <td style={{ fontWeight: 700 }}>₹{p.amount.toLocaleString('en-IN')}</td>
                          <td>
                            <span className="badge badge-yellow">{p.referenceNumber}</span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleVerify(p.id, 'APPROVED')}
                                disabled={processingPaymentId === p.id}
                                className="glass sm"
                                style={{ background: 'rgba(46, 204, 113, 0.25)', borderColor: '#2ECC71', color: '#2ECC71' }}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleVerify(p.id, 'REJECTED')}
                                disabled={processingPaymentId === p.id}
                                className="glass sm danger"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Bookings Table */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '22px', color: '#ffffff', margin: 0 }}>Recent System Bookings</h2>
                <Link to="/admin/bookings" className="glass sm">All Bookings</Link>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ref Code</th>
                      <th>Student</th>
                      <th>Trip</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 700, color: '#FFD23F' }}>{b.bookingReference}</td>
                        <td>{b.user.name}</td>
                        <td>{b.trip.title}</td>
                        <td>₹{b.totalAmount.toLocaleString('en-IN')}</td>
                        <td><StatusBadge status={b.status} /></td>
                        <td style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                          {new Date(b.createdAt).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
