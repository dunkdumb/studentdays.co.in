import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/apiClient';
import { User, Save, Shield } from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    collegeName: user?.collegeName || '',
    studentId: user?.studentId || ''
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await api.patch('/me/profile', formData);
      if (res.success) {
        showToast('Profile updated successfully!', 'success');
        setSuccess(true);
        refreshUser();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap" style={{ maxWidth: '600px' }}>
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(30,107,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E6BFF' }}>
              <User size={30} />
            </div>
            <div>
              <h1 style={{ fontSize: '26px', color: '#ffffff', margin: '0 0 4px 0' }}>Student Profile</h1>
              <span className="badge badge-blue">{user?.role}</span>
            </div>
          </div>

          {success && (
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(46, 204, 113, 0.2)', border: '1px solid rgba(46, 204, 113, 0.4)', color: '#2ECC71', marginBottom: '20px', fontSize: '14px' }}>
              Profile details successfully saved!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Registered Email (Read Only)</label>
              <input
                type="email"
                disabled
                className="form-input"
                value={user?.email || ''}
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
            </div>

            <div>
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label className="form-label">College / University</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Student ID Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" disabled={saving} className="glass blue big" style={{ marginTop: '10px' }}>
              <Save size={18} />
              <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
