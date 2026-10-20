import React, { useState, useEffect } from 'react';
import { AdminNav } from '../../components/AdminNav';
import api from '../../services/apiClient';
import { ShieldCheck, Clock, User } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get<{ logs: any[] }>('/admin/audit-logs').then((res) => {
      if (res.success && res.data?.logs) {
        setLogs(res.data.logs);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: '#06122b' }}>
      <div className="wrap">
        <div style={{ marginBottom: '24px' }}>
          <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Security & Compliance</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#ffffff', margin: 0 }}>
            Audit Log Trail
          </h1>
        </div>

        <AdminNav />

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', color: '#ffffff', margin: '0 0 4px 0' }}>
              System Activity & Verification Events
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
              Immutable record of security events, administrative decisions, and booking state transitions.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.6)' }}>
              Loading audit logs...
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Action</th>
                    <th>Entity</th>
                    <th>Actor</th>
                    <th>Metadata</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                        {new Date(log.createdAt).toLocaleString('en-IN')}
                      </td>
                      <td>
                        <span className="badge badge-blue">{log.action}</span>
                      </td>
                      <td>
                        {log.entityType} {log.entityId ? `(#${log.entityId.substring(0, 8)})` : ''}
                      </td>
                      <td>
                        {log.user ? (
                          <div>
                            <span style={{ fontWeight: 600 }}>{log.user.name}</span>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{log.user.email}</div>
                          </div>
                        ) : (
                          <span style={{ color: 'rgba(255,255,255,0.4)' }}>System / Guest</span>
                        )}
                      </td>
                      <td style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', maxWidth: '300px', wordBreak: 'break-all' }}>
                        {log.metadata || '—'}
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
