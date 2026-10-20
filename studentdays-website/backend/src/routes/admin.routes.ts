import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma';
import { authenticate, requireRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { paymentProvider } from '../services/paymentService';
import { logAudit } from '../services/auditService';
import { Role, TripStatus, BookingStatus, UserStatus } from '@prisma/client';

const router = Router();

// Apply auth and admin/master_admin role checks
router.use(authenticate);
router.use(requireRole(Role.ADMIN, Role.MASTER_ADMIN));

// GET /api/v1/admin/dashboard - Calculate live dashboard statistics
router.get('/dashboard', async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalStudents,
      totalCoordinators,
      totalTrips,
      publishedTrips,
      totalBookings,
      pendingPayments,
      confirmedBookings,
      cancelledBookings,
      revenueResult,
      recentBookings,
      pendingPaymentList
    ] = await Promise.all([
      prisma.user.count({ where: { role: Role.STUDENT } }),
      prisma.user.count({ where: { role: Role.COORDINATOR } }),
      prisma.trip.count(),
      prisma.trip.count({ where: { status: TripStatus.PUBLISHED } }),
      prisma.booking.count(),
      prisma.payment.count({ where: { status: 'SUBMITTED' } }),
      prisma.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
      prisma.booking.count({ where: { status: BookingStatus.CANCELLED } }),
      prisma.booking.aggregate({
        _sum: { totalAmount: true },
        where: { status: BookingStatus.CONFIRMED }
      }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          trip: { select: { title: true, destination: true } },
          payments: { select: { status: true, referenceNumber: true } }
        }
      }),
      prisma.payment.findMany({
        where: { status: 'SUBMITTED' },
        take: 10,
        orderBy: { submittedAt: 'desc' },
        include: {
          booking: {
            include: {
              user: { select: { name: true, email: true, phone: true } },
              trip: { select: { title: true } }
            }
          }
        }
      })
    ]);

    const totalRevenue = revenueResult._sum.totalAmount || 0;

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalCoordinators,
          totalTrips,
          publishedTrips,
          totalBookings,
          pendingPayments,
          confirmedBookings,
          cancelledBookings,
          totalRevenue
        },
        recentBookings,
        pendingPaymentList
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to calculate dashboard statistics' });
  }
});

// Trip Schemas
const tripCreateSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  destination: z.string().min(2),
  startLocation: z.string().min(2),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  registrationDeadline: z.string().datetime(),
  price: z.number().int().min(100),
  capacity: z.number().int().min(1),
  status: z.nativeEnum(TripStatus).optional(),
  coverImage: z.string().min(1),
  meetingPoint: z.string().optional(),
  includedServices: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  cancellationPolicy: z.string().optional()
});

// GET /api/v1/admin/trips
router.get('/trips', async (req: Request, res: Response): Promise<void> => {
  try {
    const trips = await prisma.trip.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { bookings: true } },
        coordinators: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          }
        }
      }
    });

    res.status(200).json({ success: true, data: { trips } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve trips' });
  }
});

// POST /api/v1/admin/trips
router.post('/trips', validateRequest(tripCreateSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { includedServices, exclusions, ...rest } = req.body;

    const trip = await prisma.trip.create({
      data: {
        ...rest,
        startDate: new Date(rest.startDate),
        endDate: new Date(rest.endDate),
        registrationDeadline: new Date(rest.registrationDeadline),
        status: rest.status || TripStatus.DRAFT,
        includedServices: JSON.stringify(includedServices || []),
        exclusions: JSON.stringify(exclusions || [])
      }
    });

    await logAudit({
      userId: req.user!.userId,
      action: 'TRIP_CREATED',
      entityType: 'Trip',
      entityId: trip.id,
      metadata: { title: trip.title, slug: trip.slug }
    });

    res.status(201).json({ success: true, data: { trip } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to create trip' });
  }
});

// PUT /api/v1/admin/trips/:id
router.put('/trips/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { includedServices, exclusions, startDate, endDate, registrationDeadline, ...rest } = req.body;

    const updated = await prisma.trip.update({
      where: { id },
      data: {
        ...rest,
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(registrationDeadline && { registrationDeadline: new Date(registrationDeadline) }),
        ...(includedServices && { includedServices: JSON.stringify(includedServices) }),
        ...(exclusions && { exclusions: JSON.stringify(exclusions) })
      }
    });

    await logAudit({
      userId: req.user!.userId,
      action: 'TRIP_UPDATED',
      entityType: 'Trip',
      entityId: id,
      metadata: { title: updated.title }
    });

    res.status(200).json({ success: true, data: { trip: updated } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update trip' });
  }
});

// PATCH /api/v1/admin/trips/:id/status
router.patch('/trips/:id/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    if (!Object.values(TripStatus).includes(status)) {
      res.status(400).json({ success: false, error: 'Invalid trip status' });
      return;
    }

    const updated = await prisma.trip.update({
      where: { id },
      data: { status }
    });

    await logAudit({
      userId: req.user!.userId,
      action: 'TRIP_STATUS_CHANGED',
      entityType: 'Trip',
      entityId: id,
      metadata: { status }
    });

    res.status(200).json({ success: true, data: { trip: updated } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update trip status' });
  }
});

// POST /api/v1/admin/trips/:id/assign-coordinator
router.post('/trips/:id/assign-coordinator', async (req: Request, res: Response): Promise<void> => {
  try {
    const tripId = String(req.params.id);
    const { userId, notes } = req.body;

    const assignment = await prisma.coordinatorTripAssignment.upsert({
      where: { tripId_userId: { tripId, userId } },
      update: { notes },
      create: { tripId, userId, notes }
    });

    await logAudit({
      userId: req.user!.userId,
      action: 'COORDINATOR_ASSIGNED',
      entityType: 'Trip',
      entityId: tripId,
      metadata: { coordinatorUserId: userId }
    });

    res.status(200).json({ success: true, data: { assignment } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to assign coordinator' });
  }
});

// GET /api/v1/admin/bookings
router.get('/bookings', async (req: Request, res: Response): Promise<void> => {
  try {
    const status = req.query.status as any;
    const tripId = req.query.tripId ? String(req.query.tripId) : undefined;
    const search = req.query.search ? String(req.query.search) : undefined;

    const where: any = {};
    if (status) where.status = status;
    if (tripId) where.tripId = tripId;
    if (search) {
      where.OR = [
        { bookingReference: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } }
      ];
    }

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        trip: { select: { id: true, title: true, destination: true } },
        participants: true,
        payments: true
      }
    });

    res.status(200).json({ success: true, data: { bookings } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve bookings' });
  }
});

// GET /api/v1/admin/payments/pending
router.get('/payments/pending', async (req: Request, res: Response): Promise<void> => {
  try {
    const payments = await prisma.payment.findMany({
      where: { status: 'SUBMITTED' },
      orderBy: { submittedAt: 'desc' },
      include: {
        booking: {
          include: {
            user: { select: { id: true, name: true, email: true, phone: true, collegeName: true } },
            trip: { select: { id: true, title: true, price: true } },
            participants: true
          }
        }
      }
    });

    res.status(200).json({ success: true, data: { payments } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch pending payments' });
  }
});

// POST /api/v1/admin/payments/:id/verify - Approve or reject payment reference
router.post('/payments/:id/verify', async (req: Request, res: Response): Promise<void> => {
  try {
    const paymentId = String(req.params.id);
    const { decision, adminNotes } = req.body;

    if (decision !== 'APPROVED' && decision !== 'REJECTED') {
      res.status(400).json({ success: false, error: 'Decision must be APPROVED or REJECTED' });
      return;
    }

    // Security: Student cannot verify their own payment
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { booking: true }
    });

    if (!payment) {
      res.status(404).json({ success: false, error: 'Payment not found' });
      return;
    }

    if (payment.booking.userId === req.user!.userId) {
      res.status(403).json({
        success: false,
        error: 'Security violation: You cannot verify payment for your own booking.'
      });
      return;
    }

    const verificationResult = await paymentProvider.verifyPayment(
      paymentId,
      decision,
      req.user!.userId,
      adminNotes
    );

    res.status(200).json({
      success: true,
      message: `Payment has been successfully ${decision.toLowerCase()}.`,
      data: verificationResult
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Payment verification failed' });
  }
});

// GET /api/v1/admin/users
router.get('/users', async (req: Request, res: Response): Promise<void> => {
  try {
    const role = req.query.role as any;
    const where: any = {};
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        phone: true,
        collegeName: true,
        studentId: true,
        createdAt: true,
        _count: { select: { bookings: true, assignedTrips: true } }
      }
    });

    res.status(200).json({ success: true, data: { users } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve users' });
  }
});

// PATCH /api/v1/admin/users/:id/role
router.patch('/users/:id/role', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { role } = req.body;

    if (!Object.values(Role).includes(role)) {
      res.status(400).json({ success: false, error: 'Invalid role' });
      return;
    }

    if (role === Role.MASTER_ADMIN && req.user!.role !== Role.MASTER_ADMIN) {
      res.status(403).json({ success: false, error: 'Only Master Admin can assign Master Admin role.' });
      return;
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, name: true, role: true }
    });

    await logAudit({
      userId: req.user!.userId,
      action: 'USER_ROLE_CHANGED',
      entityType: 'User',
      entityId: id,
      metadata: { newRole: role }
    });

    res.status(200).json({ success: true, data: { user: updated } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to change user role' });
  }
});

// PATCH /api/v1/admin/users/:id/status
router.patch('/users/:id/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    if (!Object.values(UserStatus).includes(status)) {
      res.status(400).json({ success: false, error: 'Invalid user status' });
      return;
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { status },
      select: { id: true, email: true, name: true, status: true }
    });

    await logAudit({
      userId: req.user!.userId,
      action: 'USER_STATUS_CHANGED',
      entityType: 'User',
      entityId: id,
      metadata: { status }
    });

    res.status(200).json({ success: true, data: { user: updated } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update user status' });
  }
});

// GET /api/v1/admin/colleges
router.get('/colleges', async (req: Request, res: Response): Promise<void> => {
  try {
    const colleges = await prisma.college.findMany({ orderBy: { name: 'asc' } });
    res.status(200).json({ success: true, data: { colleges } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch colleges' });
  }
});

// POST /api/v1/admin/colleges
router.post('/colleges', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug, city, state, description, logoUrl, website, isPartner } = req.body;
    const college = await prisma.college.create({
      data: { name, slug, city, state, description, logoUrl, website, isPartner: isPartner ?? true }
    });
    res.status(201).json({ success: true, data: { college } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to create college' });
  }
});

// DELETE /api/v1/admin/colleges/:id
router.delete('/colleges/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.college.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'College deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to delete college' });
  }
});

// GET /api/v1/admin/gallery
router.get('/gallery', async (req: Request, res: Response): Promise<void> => {
  try {
    const gallery = await prisma.galleryImage.findMany({ orderBy: { displayOrder: 'asc' } });
    res.status(200).json({ success: true, data: { gallery } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch gallery' });
  }
});

// POST /api/v1/admin/gallery
router.post('/gallery', async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageUrl, caption, tripLocation, displayOrder } = req.body;
    const image = await prisma.galleryImage.create({
      data: { imageUrl, caption, tripLocation, displayOrder: displayOrder || 0 }
    });
    res.status(201).json({ success: true, data: { image } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to add gallery image' });
  }
});

// DELETE /api/v1/admin/gallery/:id
router.delete('/gallery/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.galleryImage.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Image deleted from gallery' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to delete gallery image' });
  }
});

// GET /api/v1/admin/contact
router.get('/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, data: { messages } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// PATCH /api/v1/admin/contact/:id/status
router.patch('/contact/:id/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;
    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { status }
    });
    res.status(200).json({ success: true, data: { message: updated } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update message status' });
  }
});

// GET /api/v1/admin/audit-logs
router.get('/audit-logs', async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = await prisma.auditLog.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { email: true, name: true, role: true } }
      }
    });
    res.status(200).json({ success: true, data: { logs } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch audit logs' });
  }
});

export default router;
