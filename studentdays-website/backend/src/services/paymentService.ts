import { IPaymentProvider } from '../types';
import { prisma } from '../prisma';
import { PaymentStatus, BookingStatus } from '@prisma/client';

export class MockUpiPaymentProvider implements IPaymentProvider {
  name = 'mock-upi';

  async createPayment(bookingId: string, amount: number, options?: any) {
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        currency: 'INR',
        provider: this.name,
        paymentMethod: 'UPI_REFERENCE',
        status: PaymentStatus.PENDING,
        notes: 'Awaiting student demo UPI reference submission'
      }
    });

    return {
      paymentId: payment.id,
      instructions: {
        demoUpiId: 'demo-studentdays@icici-sandbox',
        amount,
        currency: 'INR',
        notice: 'DEMO MODE ONLY: Do NOT send real money. Submit any fictional 12-digit UTR/reference number (e.g. DEMO-UTR-123456789012) to simulate payment.'
      }
    };
  }

  async verifyPayment(paymentId: string, decision: 'APPROVED' | 'REJECTED', verifiedByUserId: string, adminNotes?: string) {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { booking: true }
    });

    if (!payment) {
      throw new Error('Payment record not found.');
    }

    if (payment.status === PaymentStatus.VERIFIED) {
      throw new Error('Payment has already been verified and approved.');
    }

    const nextPaymentStatus = decision === 'APPROVED' ? PaymentStatus.VERIFIED : PaymentStatus.REJECTED;
    const nextBookingStatus = decision === 'APPROVED' ? BookingStatus.CONFIRMED : BookingStatus.REJECTED;

    // Concurrency-safe atomic transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update Payment
      const updatedPayment = await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: nextPaymentStatus,
          notes: adminNotes || (decision === 'APPROVED' ? 'Approved by admin' : 'Rejected by admin')
        }
      });

      // 2. Record Verification Audit Record
      await tx.paymentVerification.upsert({
        where: { paymentId },
        update: {
          decision,
          verifiedById: verifiedByUserId,
          adminNotes: adminNotes || '',
          verifiedAt: new Date()
        },
        create: {
          paymentId,
          decision,
          verifiedById: verifiedByUserId,
          adminNotes: adminNotes || '',
          verifiedAt: new Date()
        }
      });

      // 3. Update Booking Status
      const updatedBooking = await tx.booking.update({
        where: { id: payment.bookingId },
        data: { status: nextBookingStatus }
      });

      // 4. Update Trip Capacity Counts if approved
      if (decision === 'APPROVED') {
        await tx.trip.update({
          where: { id: payment.booking.tripId },
          data: {
            confirmedCount: { increment: payment.booking.quantity },
            reservedCount: { decrement: payment.booking.quantity }
          }
        });
      } else {
        // If rejected, release the reserved count back to available
        await tx.trip.update({
          where: { id: payment.booking.tripId },
          data: {
            reservedCount: { decrement: payment.booking.quantity }
          }
        });
      }

      // 5. Send Student in-app Notification
      await tx.notification.create({
        data: {
          userId: payment.booking.userId,
          title: decision === 'APPROVED' ? '🎉 Booking Confirmed!' : '❌ Payment Reference Rejected',
          message: decision === 'APPROVED'
            ? `Your booking ${payment.booking.bookingReference} has been verified and confirmed! Pack your bags!`
            : `Your payment reference for booking ${payment.booking.bookingReference} could not be verified. Note: ${adminNotes || 'Invalid reference'}.`,
          type: decision === 'APPROVED' ? 'BOOKING_CONFIRMED' : 'PAYMENT_REJECTED',
          link: `/student/bookings/${payment.booking.id}`
        }
      });

      // 6. Record Audit Log
      await tx.auditLog.create({
        data: {
          userId: verifiedByUserId,
          action: decision === 'APPROVED' ? 'PAYMENT_VERIFIED_APPROVED' : 'PAYMENT_VERIFIED_REJECTED',
          entityType: 'Payment',
          entityId: payment.id,
          metadata: JSON.stringify({
            bookingReference: payment.booking.bookingReference,
            referenceNumber: payment.referenceNumber,
            adminNotes
          })
        }
      });

      return { updatedPayment, updatedBooking };
    });

    return {
      success: true,
      status: nextPaymentStatus,
      bookingStatus: nextBookingStatus,
      result
    };
  }

  async refundPayment(paymentId: string, reason: string) {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { booking: true }
    });

    if (!payment) throw new Error('Payment not found.');

    const result = await prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: PaymentStatus.REFUNDED,
          notes: `Refund processed: ${reason}`
        }
      });

      await tx.booking.update({
        where: { id: payment.bookingId },
        data: { status: BookingStatus.REFUNDED }
      });

      // Decrement confirmed count
      await tx.trip.update({
        where: { id: payment.booking.tripId },
        data: {
          confirmedCount: { decrement: payment.booking.quantity }
        }
      });

      return updatedPayment;
    });

    return { success: true, status: 'REFUNDED', result };
  }

  async handleWebhook(payload: any, signature?: string) {
    // Webhook handler stub for future Razorpay / Cashfree / Stripe live gateway
    return { handled: true, event: 'MOCK_EVENT_STUB' };
  }
}

export const paymentProvider = new MockUpiPaymentProvider();
