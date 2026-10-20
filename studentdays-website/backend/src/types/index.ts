import { Request } from 'express';
import { Role, UserStatus } from '@prisma/client';

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: Role;
  status: UserStatus;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface IPaymentProvider {
  name: string;
  createPayment(bookingId: string, amount: number, options?: any): Promise<{ paymentId: string; instructions: any }>;
  verifyPayment(paymentId: string, referenceNumber: string, verifiedByUserId?: string): Promise<{ success: boolean; status: string; notes?: string }>;
  refundPayment(paymentId: string, reason: string): Promise<{ success: boolean; status: string }>;
  handleWebhook?(payload: any, signature?: string): Promise<{ handled: boolean; event: string }>;
}
