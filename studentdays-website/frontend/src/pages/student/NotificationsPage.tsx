import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotificationItem } from '../../types';
import api from '../../services/apiClient';
import { Bell, Check, Clock, ArrowRight } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotifs = async () => {
    setLoading(true);
    const res = await api.get<{ notifications: NotificationItem[]; unreadCount: number }>('/me/notifications');
    if (res.success && res.data?.notifications) {
      setNotifications(res.data.notifications);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const markAsRead = async (id: string) => {
    await api.patch(`/me/notifications/${id}/read`);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap" style={{ maxWidth: '750px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <span className="badge badge-yellow" style={{ marginBottom: '8px' }}>Updates & Alerts</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)', color: '#ffffff', margin: 0 }}>
              Notifications
            </h1>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
            Loading alerts...
          </div>
        ) : notifications.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <Bell size={40} color="#FFD23F" style={{ margin: '0 auto 14px auto' }} />
            <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>All Caught Up!</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
              You don't have any notifications right now.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {notifications.map((n) => {
              const time = new Date(n.createdAt).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={n.id}
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    borderLeft: n.isRead ? '1px solid rgba(255,255,255,0.2)' : '4px solid #1E6BFF',
                    background: n.isRead ? 'rgba(255,255,255,0.03)' : 'rgba(30,107,255,0.08)'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '16px', color: '#ffffff', margin: 0 }}>{n.title}</h3>
                      {!n.isRead && <span className="badge badge-blue" style={{ fontSize: '10px' }}>New</span>}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                      {n.message}
                    </p>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      <span>{time}</span>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {n.link && (
                      <Link to={n.link} className="glass sm blue">
                        <span>View</span>
                        <ArrowRight size={12} />
                      </Link>
                    )}
                    {!n.isRead && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="glass sm"
                        title="Mark as read"
                      >
                        <Check size={14} />
                      </button>
                    )}
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
