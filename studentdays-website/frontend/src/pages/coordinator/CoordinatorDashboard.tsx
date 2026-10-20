import React, { useState, useEffect } from 'react';
import { Trip, Booking } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import api from '../../services/apiClient';
import { Compass, Users, MapPin, Calendar, Phone, Mail, AlertTriangle, CheckCircle } from 'lucide-react';

export const CoordinatorDashboard: React.FC = () => {
  const [assignedTrips, setAssignedTrips] = useState<any[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const [tripDetails, setTripDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingParticipants, setLoadingParticipants] = useState<boolean>(false);

  useEffect(() => {
    api.get<{ trips: any[] }>('/coordinator/assigned-trips').then((res) => {
      if (res.success && res.data?.trips) {
        setAssignedTrips(res.data.trips);
        if (res.data.trips.length > 0) {
          setSelectedTripId(res.data.trips[0].id);
        }
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedTripId) return;
    setLoadingParticipants(true);
    api.get<{ trip: Trip; bookings: Booking[] }>(`/coordinator/trips/${selectedTripId}/participants`).then((res) => {
      if (res.success && res.data) {
        setTripDetails(res.data);
      }
      setLoadingParticipants(false);
    });
  }, [selectedTripId]);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '8px' }}>Field Operations</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#ffffff', margin: '0 0 6px 0' }}>
            Coordinator Portal
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', margin: 0 }}>
            Manage traveler rosters, attendance check-in, and emergency contacts for your assigned journeys.
          </p>
        </div>

        {/* Assigned Trips Selector */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
            Loading assigned journeys...
          </div>
        ) : assignedTrips.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '500px', margin: '40px auto' }}>
            <Compass size={40} color="#FFD23F" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>No Trips Assigned Yet</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
              The Master Admin has not assigned any active trips to your coordinator account yet.
            </p>
          </div>
        ) : (
          <div>
            {/* Trip Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '8px' }}>
              {assignedTrips.map((t) => {
                const isSelected = t.id === selectedTripId;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTripId(t.id)}
                    className={`glass ${isSelected ? 'blue' : ''}`}
                    style={{ whiteSpace: 'nowrap', textAlign: 'left', padding: '12px 20px' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{t.title}</div>
                    <div style={{ fontSize: '12px', opacity: 0.8 }}>{t.destination}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Trip Participant Management */}
            {loadingParticipants || !tripDetails ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
                Loading traveler roster...
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: '6px' }}>Live Roster</span>
                    <h2 style={{ fontSize: '24px', color: '#ffffff', margin: 0 }}>
                      {tripDetails.trip.title}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', fontSize: '14px' }}>
                    <div style={{ padding: '8px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)' }}>
                      Capacity: <strong>{tripDetails.trip.confirmedCount} / {tripDetails.trip.capacity}</strong>
                    </div>
                  </div>
                </div>

                {/* Bookings & Participants Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Booking Ref</th>
                        <th>Student / Booked By</th>
                        <th>Travelers</th>
                        <th>Emergency Contact</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tripDetails.bookings.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
                            No bookings recorded yet for this trip departure.
                          </td>
                        </tr>
                      ) : (
                        tripDetails.bookings.map((b: any) => (
                          <tr key={b.id}>
                            <td style={{ fontWeight: 700, color: '#FFD23F' }}>
                              {b.bookingReference}
                            </td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{b.user.name}</div>
                              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{b.user.phone}</div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {b.participants.map((p: any, i: number) => (
                                  <span key={i} style={{ fontSize: '13px' }}>
                                    • {p.fullName} ({p.collegeName || 'Student'})
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <div>{b.emergencyContactName}</div>
                              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{b.emergencyContactPhone}</div>
                            </td>
                            <td>
                              <StatusBadge status={b.status} />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
