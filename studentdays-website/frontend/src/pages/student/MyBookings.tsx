import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Booking } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import api from '../../services/apiClient';
import { Compass, Calendar, MapPin, ArrowRight } from 'lucide-react';

export const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get<{ bookings: Booking[] }>('/me/bookings').then((res) => {
      if (res.success && res.data?.bookings) {
        setBookings(res.data.bookings);
      }
      setLoading(false);
    });
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'ALL') return true;
    if (filter === 'CONFIRMED') return b.status === 'CONFIRMED';
    if (filter === 'PENDING') return b.status === 'PENDING_PAYMENT' || b.status === 'PAYMENT_SUBMITTED';
    if (filter === 'CANCELLED') return b.status === 'CANCELLED' || b.status === 'REJECTED';
    return true;
  });

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-yellow" style={{ marginBottom: '8px' }}>History & Reservations</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#ffffff', margin: 0 }}>
              My Bookings
            </h1>
          </div>

          <Link to="/trips" className="glass blue">
            <Compass size={16} />
            <span>Discover More Trips</span>
          </Link>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`glass sm ${filter === tab ? 'blue' : ''}`}
            >
              {tab === 'ALL' ? 'All Bookings' : tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
            Loading your bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '500px', margin: '40px auto' }}>
            <Compass size={40} color="#FFD23F" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>No Bookings Found</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' }}>
              No reservations found under this filter category.
            </p>
            <Link to="/trips" className="glass blue">
              Explore Trips
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredBookings.map((booking) => {
              const startDate = new Date(booking.trip.startDate).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric'
              });
              const endDate = new Date(booking.trip.endDate).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div key={booking.id} className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
                        <img
                          src={booking.trip.coverImage}
                          alt={booking.trip.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/studentdays-hero.jpeg';
                          }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFD23F' }}>
                            {booking.bookingReference}
                          </span>
                          <StatusBadge status={booking.status} />
                        </div>

                        <h3 style={{ fontSize: '20px', color: '#ffffff', margin: '0 0 6px 0' }}>
                          {booking.trip.title}
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={13} />
                            <span>{startDate} – {endDate}</span>
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={13} />
                            <span>{booking.trip.destination}</span>
                          </span>
                          <span>
                            {booking.quantity} {booking.quantity === 1 ? 'Seat' : 'Seats'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Total Amount</span>
                        <span style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
                          ₹{booking.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <Link to={`/student/bookings/${booking.id}`} className="glass blue">
                        <span>Manage / Status</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
