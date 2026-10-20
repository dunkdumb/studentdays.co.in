import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Booking, NotificationItem } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import api from '../../services/apiClient';
import { Compass, Calendar, Clock, Bell, User, MapPin, ArrowRight } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      api.get<{ bookings: Booking[] }>('/me/bookings'),
      api.get<{ notifications: NotificationItem[]; unreadCount: number }>('/me/notifications')
    ]).then(([bookingsRes, notifsRes]) => {
      if (bookingsRes.success && bookingsRes.data?.bookings) {
        setBookings(bookingsRes.data.bookings);
      }
      if (notifsRes.success && notifsRes.data) {
        setUnreadNotifications(notifsRes.data.unreadCount || 0);
      }
      setLoading(false);
    });
  }, []);

  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const pendingCount = bookings.filter((b) => b.status === 'PENDING_PAYMENT' || b.status === 'PAYMENT_SUBMITTED').length;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        {/* Welcome Header */}
        <div className="glass-panel" style={{ padding: '36px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="badge badge-yellow" style={{ marginBottom: '8px' }}>Student Traveler Portal</span>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#ffffff', margin: '0 0 6px 0' }}>
                Hey, {user?.name.split(' ')[0]}! 👋
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', margin: 0 }}>
                {user?.collegeName ? `${user.collegeName} • ` : ''}Ready for your next weekend escape?
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/trips" className="glass blue">
                <Compass size={16} />
                <span>Explore Trips</span>
              </Link>
              <Link to="/student/profile" className="glass">
                <User size={16} />
                <span>My Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
              Confirmed Journeys
            </span>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#2ECC71' }}>
              {confirmedCount}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
              Action Required (Pending)
            </span>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#FFD23F' }}>
              {pendingCount}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
              Total Bookings
            </span>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1E6BFF' }}>
              {bookings.length}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '6px' }}>
              Unread Notifications
            </span>
            <Link to="/student/notifications" style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: unreadNotifications > 0 ? '#ff6b81' : '#ffffff' }}>
                {unreadNotifications}
              </span>
              <span style={{ fontSize: '12px', color: '#6ea2ff' }}>View all →</span>
            </Link>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', color: '#ffffff', margin: 0 }}>My Recent Bookings</h2>
            <Link to="/student/bookings" className="glass sm">
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.6)' }}>
              Loading bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <Compass size={40} color="#FFD23F" style={{ margin: '0 auto 14px auto' }} />
              <h3 style={{ fontSize: '18px', color: '#ffffff', marginBottom: '8px' }}>No Bookings Yet</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' }}>
                You haven't reserved any college trips yet. Explore upcoming journeys and book your spot!
              </p>
              <Link to="/trips" className="glass blue">
                Browse Departures
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#FFD23F', fontWeight: 700 }}>
                          {booking.bookingReference}
                        </span>
                        <StatusBadge status={booking.status} />
                      </div>
                      <h3 style={{ fontSize: '17px', color: '#ffffff', margin: '0 0 4px 0' }}>
                        {booking.trip.title}
                      </h3>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                        {booking.quantity} {booking.quantity === 1 ? 'Seat' : 'Seats'} • Total: ₹{booking.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <Link to={`/student/bookings/${booking.id}`} className="glass sm blue">
                    View Details & Payment
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
