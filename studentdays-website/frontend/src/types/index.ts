export type Role = 'MASTER_ADMIN' | 'ADMIN' | 'COORDINATOR' | 'STUDENT';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';
export type TripStatus = 'DRAFT' | 'PUBLISHED' | 'FULLY_BOOKED' | 'CANCELLED' | 'COMPLETED';
export type BookingStatus = 'PENDING_PAYMENT' | 'PAYMENT_SUBMITTED' | 'CONFIRMED' | 'CANCELLED' | 'REFUND_PENDING' | 'REFUNDED' | 'REJECTED';
export type PaymentStatus = 'PENDING' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED' | 'REFUNDED';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  collegeName?: string;
  studentId?: string;
  avatarUrl?: string;
  role: Role;
  status: UserStatus;
  createdAt?: string;
}

export interface TripItineraryItem {
  id: string;
  tripId?: string;
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
  timeSlots?: string;
}

export interface Trip {
  id: string;
  title: string;
  slug: string;
  description: string;
  destination: string;
  startLocation: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  price: number;
  preBookingAmount?: number;
  balanceAmount?: number;
  pdfUrl?: string;
  pdfDownloadUrl?: string;
  capacity: number;
  confirmedCount: number;
  reservedCount: number;
  remainingSeats: number;
  isBookable: boolean;
  status: TripStatus;
  coverImage: string;
  durationDays?: number;
  meetingPoint?: string;
  includedServices: string[];
  exclusions: string[];
  cancellationPolicy?: string;
  itinerary?: TripItineraryItem[];
  coordinators?: {
    user: {
      id: string;
      name: string;
      avatarUrl?: string;
      collegeName?: string;
    };
  }[];
}

export interface BookingParticipant {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  collegeName?: string;
  studentId?: string;
  age?: number;
  gender?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  referenceNumber?: string;
  payerUpiId?: string;
  submittedAt?: string;
  notes?: string;
  verification?: {
    decision: 'APPROVED' | 'REJECTED';
    verifiedAt: string;
    adminNotes?: string;
    verifiedBy?: {
      name: string;
    };
  };
}

export interface Booking {
  id: string;
  bookingReference: string;
  tripId: string;
  userId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: BookingStatus;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  specialRequirements?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  trip: Trip;
  participants: BookingParticipant[];
  payments: Payment[];
  user?: User;
}

export interface College {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  isPartner?: boolean;
  activeStudents?: number;
  tripsCompleted?: number;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string;
  tripLocation?: string;
  displayOrder?: number;
  tags?: string[];
  aspectRatio?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalCoordinators: number;
  totalTrips: number;
  publishedTrips: number;
  totalBookings: number;
  pendingPayments: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: { field: string; message: string }[];
  meta?: any;
}
