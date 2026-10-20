import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  CreditCard,
  CalendarCheck,
  Users,
  GraduationCap,
  Image,
  Mail,
  ShieldCheck
} from 'lucide-react';

export const AdminNav: React.FC = () => {
  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/payments', label: 'Payment Verifications', icon: CreditCard },
    { to: '/admin/trips', label: 'Trip Management', icon: Compass },
    { to: '/admin/bookings', label: 'All Bookings', icon: CalendarCheck },
    { to: '/admin/users', label: 'Users & Roles', icon: Users },
    { to: '/admin/audit-logs', label: 'Audit Logs', icon: ShieldCheck }
  ];

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `glass sm ${isActive ? 'blue' : ''}`}
            style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
          >
            <Icon size={14} />
            <span>{link.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
