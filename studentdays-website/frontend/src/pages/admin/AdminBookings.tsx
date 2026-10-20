import React, { useState, useEffect } from 'react';
import { AdminNav } from '../../components/AdminNav';
import { StatusBadge } from '../../components/StatusBadge';
import { Booking } from '../../types';
import api from '../../services/apiClient';
import { Search, Filter, Calendar, Users, Eye } from 'lucide-react';

export const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBookings = async () => {
    setLoading(true);
    const params: any = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;

    const res = await api.get<{ bookings: Booking[] }>('/admin/bookings', params);
    if (res.success && res.data?.bookings) {
      setBookings(res.data.bookings);
    }
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      fetchBookings();
    }, 250);
    return () => clearTimeout(t);
  }, [search, statusFilter]);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <div style={{ marginBottom: '24px' }}>
          <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Master Registry</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#ffffff', margin: 0 }}>
            All Platform Bookings
          </h1>
        </div>

        <AdminNav />

        <div className="glass-panel" style={{ padding: '32px' }}>
          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '0 14px' }}>
              <Search size={18} color="rgba(255,255,255,0.6)" />
              <input
                type="text"
                className="form-input"
                placeholder="Search booking ref, student name, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none' }}
              />
            </div>

            <select
              className="form-select"
              style={{ width: '200px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="" style={{ background: '#06122b', color: '#fff' }}>All Statuses</option>
              <option value="CONFIRMED" style={{ background: '#06122b', color: '#fff' }}>CONFIRMED</option>
              <option value="PAYMENT_SUBMITTED" style={{ background: '#06122b', color: '#fff' }}>PAYMENT_SUBMITTED</option>
              <option value="PENDING_PAYMENT" style={{ background: '#06122b', color: '#fff' }}>PENDING_PAYMENT</option>
              <option value="CANCELLED" style={{ background: '#06122b', color: '#fff' }}>CANCELLED</option>
            </select>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
              Loading bookings...
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Booking Ref</th>
                    <th>Student Info</th>
                    <th>Trip Name</th>
                    <th>Seats</th>
                    <th>Total</th>
                    <th>Payment Status</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 800, color: '#FFD23F' }}>{b.bookingReference}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{b.user?.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{b.user?.email}</div>
                      </td>
                      <td>{b.trip.title}</td>
                      <td>{b.quantity}</td>
                      <td style={{ fontWeight: 700 }}>₹{b.totalAmount.toLocaleString('en-IN')}</td>
                      <td><StatusBadge status={b.status} /></td>
                      <td style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                        {new Date(b.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
