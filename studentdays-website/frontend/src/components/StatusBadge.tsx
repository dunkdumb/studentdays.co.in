import React from 'react';
import { BookingStatus, PaymentStatus, TripStatus } from '../types';

export const StatusBadge: React.FC<{ status: BookingStatus | PaymentStatus | TripStatus | string }> = ({ status }) => {
  let badgeClass = 'badge-gray';
  let label = status.replace(/_/g, ' ');

  switch (status) {
    case 'CONFIRMED':
    case 'VERIFIED':
    case 'PUBLISHED':
    case 'ACTIVE':
      badgeClass = 'badge-green';
      break;

    case 'PENDING_PAYMENT':
    case 'PAYMENT_SUBMITTED':
    case 'PENDING':
    case 'SUBMITTED':
      badgeClass = 'badge-yellow';
      break;

    case 'DRAFT':
    case 'REFUND_PENDING':
      badgeClass = 'badge-blue';
      break;

    case 'CANCELLED':
    case 'REJECTED':
    case 'SUSPENDED':
    case 'FULLY_BOOKED':
      badgeClass = 'badge-red';
      break;

    default:
      badgeClass = 'badge-gray';
  }

  return <span className={`badge ${badgeClass}`}>{label}</span>;
};
