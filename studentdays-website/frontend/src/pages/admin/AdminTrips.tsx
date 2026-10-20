import React, { useState, useEffect } from 'react';
import { AdminNav } from '../../components/AdminNav';
import { StatusBadge } from '../../components/StatusBadge';
import { Trip, TripStatus } from '../../types';
import api from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';
import { Compass, Plus, Edit, Eye, EyeOff, X } from 'lucide-react';

export const AdminTrips: React.FC = () => {
  const { showToast } = useToast();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    destination: '',
    startLocation: '',
    startDate: '2026-11-20T06:00:00.000Z',
    endDate: '2026-11-23T20:00:00.000Z',
    registrationDeadline: '2026-11-15T23:59:59.000Z',
    price: 5499,
    capacity: 40,
    coverImage: '/assets/studentdays-hero.jpeg',
    status: 'PUBLISHED' as TripStatus
  });

  const fetchTrips = async () => {
    setLoading(true);
    const res = await api.get<{ trips: Trip[] }>('/admin/trips');
    if (res.success && res.data?.trips) {
      setTrips(res.data.trips);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleStatusChange = async (tripId: string, newStatus: string) => {
    const res = await api.patch(`/admin/trips/${tripId}/status`, { status: newStatus });
    if (res.success) {
      showToast(`Trip status updated to ${newStatus}`, 'success');
      fetchTrips();
    }
  };

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/admin/trips', formData);
      if (res.success) {
        showToast('New trip successfully created!', 'success');
        setModalOpen(false);
        fetchTrips();
      } else {
        alert(res.error || 'Failed to create trip');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Inventory Management</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#ffffff', margin: 0 }}>
              Trip Management
            </h1>
          </div>
          <button onClick={() => setModalOpen(true)} className="glass blue">
            <Plus size={16} />
            <span>Create New Trip</span>
          </button>
        </div>

        <AdminNav />

        <div className="glass-panel" style={{ padding: '32px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
              Loading inventory...
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Trip Details</th>
                    <th>Destination</th>
                    <th>Dates</th>
                    <th>Price</th>
                    <th>Capacity / Booked</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: '#ffffff' }}>{t.title}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>/{t.slug}</div>
                      </td>
                      <td>{t.destination}</td>
                      <td style={{ fontSize: '13px' }}>
                        {new Date(t.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} – {new Date(t.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </td>
                      <td style={{ fontWeight: 700 }}>₹{t.price.toLocaleString('en-IN')}</td>
                      <td>
                        <div style={{ fontSize: '13px' }}>
                          Confirmed: <strong>{t.confirmedCount}</strong> / {t.capacity}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                          Reserved: {t.reservedCount}
                        </div>
                      </td>
                      <td>
                        <StatusBadge status={t.status} />
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {t.status === 'PUBLISHED' ? (
                            <button
                              onClick={() => handleStatusChange(t.id, 'DRAFT')}
                              className="glass sm"
                              title="Unpublish"
                            >
                              <EyeOff size={13} />
                              <span>Draft</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(t.id, 'PUBLISHED')}
                              className="glass sm blue"
                              title="Publish"
                            >
                              <Eye size={13} />
                              <span>Publish</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Trip Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', color: '#ffffff', margin: 0 }}>Create New Student Departure</h2>
              <button onClick={() => setModalOpen(false)} className="glass sm"><X size={18} /></button>
            </div>

            <form onSubmit={handleCreateTrip} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Trip Title</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Kasol & Kheerganga Trek"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">URL Slug</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Destination</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Parvati Valley, Himachal"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  required
                  rows={3}
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">Start Location / Hub</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Delhi Kashmiri Gate"
                    value={formData.startLocation}
                    onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Price per Seat (INR)</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value, 10) })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">Total Seat Capacity</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value, 10) })}
                  />
                </div>
                <div>
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as TripStatus })}
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="glass">Cancel</button>
                <button type="submit" disabled={submitting} className="glass blue big">
                  {submitting ? 'Creating...' : 'Create Trip Departure'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
