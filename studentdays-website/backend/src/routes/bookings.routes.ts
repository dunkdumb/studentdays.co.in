import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { generateBookingReference } from '../utils/referenceGenerator';
import { TripStatus, BookingStatus, PaymentStatus, Role } from '@prisma/client';
import { logAudit, createNotification } from '../services/auditService';

const router = Router();

const createBookingSchema = z.object({
  tripId: z.string().uuid('Invalid trip ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(10, 'Maximum 10 seats per booking'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(10, 'Valid emergency contact phone required'),
  specialRequirements: z.string().optional(),
  participants: z.array(z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Valid participant email required'),
    phone: z.string().min(10, 'Valid phone required'),
    collegeName: z.string().optional(),
    studentId: z.string().optional(),
    age: z.number().int().min(15).max(40).optional(),
    gender: z.string().optional()
  })).min(1, 'At least one participant is required')
});

const submitPaymentSchema = z.object({
  referenceNumber: z.string().min(6, 'Valid transaction reference / UTR is required').max(50).trim(),
  payerUpiId: z.string().min(3, 'Payer UPI ID is required').max(50).trim(),
  notes: z.string().optional()
});

// POST /api/v1/bookings - Create a new booking
router.post('/', authenticate, validateRequest(createBookingSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { tripId, quantity, emergencyContactName, emergencyContactPhone, specialRequirements, participants } = req.body;

    if (participants.length !== quantity) {
      res.status(400).json({
        success: false,
        error: `Participant count (${participants.length}) must match the requested seat quantity (${quantity}).`
      });
      return;
    }

    // Atomic transaction for concurrency safety and capacity reservation
    const booking = await prisma.$transaction(async (tx) => {
      // 1. Fetch trip and lock/verify availability
      const trip = await tx.trip.findUnique({
        where: { id: tripId }
      });

      if (!trip) {
        throw new Error('Trip not found.');
      }

      if (trip.status !== TripStatus.PUBLISHED) {
        throw new Error('This trip is not currently open for bookings.');
      }

      if (new Date() > new Date(trip.registrationDeadline)) {
        throw new Error('The registration deadline for this trip has passed.');
      }

      const availableSeats = trip.capacity - (trip.confirmedCount + trip.reservedCount);
      if (availableSeats < quantity) {
        throw new Error(`Only ${availableSeats} seat(s) remaining on this trip.`);
      }

      // 2. Reserve capacity
      await tx.trip.update({
        where: { id: tripId },
        data: {
          reservedCount: { increment: quantity }
        }
      });

      // 3. Calculate server-enforced total amount (immune to client tampering)
      const unitPrice = trip.price;
      const totalAmount = unitPrice * quantity;
      const bookingReference = generateBookingReference();

      // 4. Create Booking
      const newBooking = await tx.booking.create({
        data: {
          bookingReference,
          tripId,
          userId,
          quantity,
          unitPrice,
          totalAmount,
          status: BookingStatus.PENDING_PAYMENT,
          emergencyContactName,
          emergencyContactPhone,
          specialRequirements,
          participants: {
            create: participants.map((p: any) => ({
              fullName: p.fullName,
              email: p.email,
              phone: p.phone,
              collegeName: p.collegeName || null,
              studentId: p.studentId || null,
              age: p.age || null,
              gender: p.gender || null
            }))
          },
          payments: {
            create: {
              amount: totalAmount,
              currency: 'INR',
              provider: 'mock',
              paymentMethod: 'UPI_REFERENCE',
              status: PaymentStatus.PENDING,
              notes: 'Booking created. Awaiting demo UPI reference submission.'
            }
          }
        },
        include: {
          trip: {
            select: {
              id: true,
              title: true,
              slug: true,
              destination: true,
              startDate: true,
              endDate: true,
              coverImage: true
            }
          },
          participants: true,
          payments: true
        }
      });

      return newBooking;
    });

    await createNotification({
      userId,
      title: 'Booking Created (Action Required)',
      message: `Your booking ${booking.bookingReference} for ${booking.trip.title} is reserved. Please submit your mock payment reference to confirm your seats.`,
      type: 'BOOKING_CREATED',
      link: `/student/bookings/${booking.id}`
    });

    await logAudit({
      userId,
      action: 'BOOKING_CREATED',
      entityType: 'Booking',
      entityId: booking.id,
      metadata: { bookingReference: booking.bookingReference, totalAmount: booking.totalAmount, quantity },
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Booking successfully reserved! Please complete the payment step.',
      data: {
        booking,
        paymentInstructions: {
          demoUpiId: 'demo-studentdays@icici-sandbox',
          amount: booking.totalAmount,
          currency: 'INR',
          bookingReference: booking.bookingReference,
          instructions: 'In local development, transfer simulation is mock. Enter any 12-digit transaction number (UTR) to submit for verification.'
        }
      }
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to create booking' });
  }
});

// GET /api/v1/bookings/:id - Get booking details
router.get('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const userId = req.user!.userId;
    const userRole = req.user!.role;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        trip: {
          select: {
            id: true,
            title: true,
            slug: true,
            destination: true,
            startLocation: true,
            startDate: true,
            endDate: true,
            price: true,
            coverImage: true,
            meetingPoint: true
          }
        },
        participants: true,
        payments: {
          include: {
            verification: {
              include: {
                verifiedBy: {
                  select: { name: true }
                }
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            collegeName: true
          }
        }
      }
    });

    if (!booking) {
      res.status(404).json({ success: false, error: 'Booking not found' });
      return;
    }

    const isOwner = booking.userId === userId;
    const isStaff = userRole === Role.ADMIN || userRole === Role.MASTER_ADMIN || userRole === Role.COORDINATOR;

    if (!isOwner && !isStaff) {
      res.status(403).json({ success: false, error: 'Access denied. You cannot view this booking.' });
      return;
    }

    res.status(200).json({
      success: true,
      data: { booking }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve booking' });
  }
});

// POST /api/v1/bookings/:id/payments - Submit mock payment reference (UTR)
router.post('/:id/payments', authenticate, validateRequest(submitPaymentSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const userId = req.user!.userId;
    const { referenceNumber, payerUpiId, notes } = req.body;

    const booking: any = await prisma.booking.findUnique({
      where: { id },
      include: { payments: true, trip: true }
    });

    if (!booking) {
      res.status(404).json({ success: false, error: 'Booking not found.' });
      return;
    }

    if (booking.userId !== userId && req.user!.role !== Role.MASTER_ADMIN && req.user!.role !== Role.ADMIN) {
      res.status(403).json({ success: false, error: 'You are not authorized to submit payments for this booking.' });
      return;
    }

    if (booking.status !== BookingStatus.PENDING_PAYMENT && booking.status !== BookingStatus.REJECTED) {
      res.status(400).json({
        success: false,
        error: `Cannot submit payment reference for booking in state: ${booking.status}`
      });
      return;
    }

    const existingRef = await prisma.payment.findFirst({
      where: {
        referenceNumber,
        bookingId: { not: id }
      }
    });

    if (existingRef) {
      res.status(400).json({
        success: false,
        error: 'This payment reference / UTR number has already been used for another booking.'
      });
      return;
    }

    const updatedBooking = await prisma.$transaction(async (tx) => {
      let payment = (booking.payments && booking.payments.length > 0) ? booking.payments[0] : null;

      if (payment) {
        payment = await tx.payment.update({
          where: { id: payment.id },
          data: {
            referenceNumber,
            payerUpiId,
            status: PaymentStatus.SUBMITTED,
            submittedAt: new Date(),
            notes: notes || 'Demo UPI reference submitted by student'
          }
        });
      } else {
        payment = await tx.payment.create({
          data: {
            bookingId: booking.id,
            amount: booking.totalAmount,
            currency: 'INR',
            provider: 'mock',
            paymentMethod: 'UPI_REFERENCE',
            status: PaymentStatus.SUBMITTED,
            referenceNumber,
            payerUpiId,
            submittedAt: new Date(),
            notes: notes || 'Demo UPI reference submitted by student'
          }
        });
      }

      const updated = await tx.booking.update({
        where: { id },
        data: {
          status: BookingStatus.PAYMENT_SUBMITTED
        },
        include: { payments: true, trip: true }
      });

      return updated;
    });

    await createNotification({
      userId: booking.userId,
      title: 'Payment Reference Submitted',
      message: `Payment reference ${referenceNumber} for ${booking.bookingReference} has been received. Our team will verify it shortly.`,
      type: 'PAYMENT_SUBMITTED',
      link: `/student/bookings/${booking.id}`
    });

    await logAudit({
      userId,
      action: 'PAYMENT_REFERENCE_SUBMITTED',
      entityType: 'Booking',
      entityId: booking.id,
      metadata: { bookingReference: booking.bookingReference, referenceNumber, payerUpiId },
      ipAddress: req.ip
    });

    res.status(200).json({
      success: true,
      message: 'Payment reference successfully submitted and queued for admin verification.',
      data: { booking: updatedBooking }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Payment submission failed' });
  }
});

// POST /api/v1/bookings/:id/cancel - Student or Admin cancellation
router.post('/:id/cancel', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const userId = req.user!.userId;
    const { reason } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { trip: true }
    });

    if (!booking) {
      res.status(404).json({ success: false, error: 'Booking not found' });
      return;
    }

    const isOwner = booking.userId === userId;
    const isAdmin = req.user!.role === Role.ADMIN || req.user!.role === Role.MASTER_ADMIN;

    if (!isOwner && !isAdmin) {
      res.status(403).json({ success: false, error: 'You are not authorized to cancel this booking.' });
      return;
    }

    if (booking.status === BookingStatus.CANCELLED) {
      res.status(400).json({ success: false, error: 'Booking is already cancelled.' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      if (booking.status === BookingStatus.CONFIRMED) {
        await tx.trip.update({
          where: { id: booking.tripId },
          data: { confirmedCount: { decrement: booking.quantity } }
        });
      } else if (booking.status === BookingStatus.PENDING_PAYMENT || booking.status === BookingStatus.PAYMENT_SUBMITTED) {
        await tx.trip.update({
          where: { id: booking.tripId },
          data: { reservedCount: { decrement: booking.quantity } }
        });
      }

      await tx.booking.update({
        where: { id },
        data: {
          status: BookingStatus.CANCELLED,
          cancellationReason: reason || 'Cancelled by user',
          cancelledAt: new Date()
        }
      });
    });

    await logAudit({
      userId,
      action: 'BOOKING_CANCELLED',
      entityType: 'Booking',
      entityId: booking.id,
      metadata: { bookingReference: booking.bookingReference, reason },
      ipAddress: req.ip
    });

    res.status(200).json({
      success: true,
      message: 'Booking successfully cancelled and reserved seats released.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to cancel booking' });
  }
});

export default router;
