import React, { useState, useEffect } from 'react';
import { AdminNav } from '../../components/AdminNav';
import { User, Role } from '../../types';
import api from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';
import { Users, Shield, UserCheck, UserX } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    setLoading(true);
    const params: any = {};
    if (roleFilter) params.role = roleFilter;
    const res = await api.get<{ users: User[] }>('/admin/users', params);
    if (res.success && res.data?.users) {
      setUsers(res.data.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    const res = await api.patch(`/admin/users/${userId}/role`, { role: newRole });
    if (res.success) {
      showToast('User role updated successfully', 'success');
      fetchUsers();
    } else {
      alert(res.error || 'Failed to update role');
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    const res = await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
    if (res.success) {
      showToast(`User status changed to ${newStatus}`, 'success');
      fetchUsers();
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <div style={{ marginBottom: '24px' }}>
          <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Identity & Access</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#ffffff', margin: 0 }}>
            User & Role Management
          </h1>
        </div>

        <AdminNav />

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            {['', 'STUDENT', 'COORDINATOR', 'ADMIN'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`glass sm ${roleFilter === r ? 'blue' : ''}`}
              >
                {r === '' ? 'All Roles' : r}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
              Loading users...
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User Details</th>
                    <th>Email</th>
                    <th>College / ID</th>
                    <th>Current Role</th>
                    <th>Status</th>
                    <th>Manage Role</th>
                    <th>Account Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td style={{ fontWeight: 600 }}>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.collegeName || 'N/A'}</td>
                      <td>
                        <span className={`badge ${u.role === 'MASTER_ADMIN' ? 'badge-yellow' : u.role === 'ADMIN' ? 'badge-blue' : u.role === 'COORDINATOR' ? 'badge-green' : 'badge-gray'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${u.status === 'ACTIVE' ? 'badge-green' : 'badge-red'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          style={{ padding: '4px 8px', fontSize: '12px', width: '130px' }}
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                        >
                          <option value="STUDENT" style={{ background: '#06122b', color: '#fff' }}>STUDENT</option>
                          <option value="COORDINATOR" style={{ background: '#06122b', color: '#fff' }}>COORDINATOR</option>
                          <option value="ADMIN" style={{ background: '#06122b', color: '#fff' }}>ADMIN</option>
                        </select>
                      </td>
                      <td>
                        {u.status === 'ACTIVE' ? (
                          <button
                            onClick={() => handleStatusChange(u.id, 'SUSPENDED')}
                            className="glass sm danger"
                            style={{ fontSize: '11px', padding: '4px 10px' }}
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(u.id, 'ACTIVE')}
                            className="glass sm"
                            style={{ fontSize: '11px', padding: '4px 10px', color: '#2ECC71' }}
                          >
                            Activate
                          </button>
                        )}
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
