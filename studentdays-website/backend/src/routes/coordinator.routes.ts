import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { authenticate, requireRole } from '../middleware/auth';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);
router.use(requireRole(Role.COORDINATOR, Role.ADMIN, Role.MASTER_ADMIN));

// GET /api/v1/coordinator/assigned-trips - List only assigned trips
router.get('/assigned-trips', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const isMasterOrAdmin = req.user!.role === Role.ADMIN || req.user!.role === Role.MASTER_ADMIN;

    let trips;
    if (isMasterOrAdmin) {
      trips = await prisma.trip.findMany({
        orderBy: { startDate: 'asc' },
        include: {
          _count: { select: { bookings: true } }
        }
      });
    } else {
      const assignments = await prisma.coordinatorTripAssignment.findMany({
        where: { userId },
        include: {
          trip: {
            include: {
              _count: { select: { bookings: true } }
            }
          }
        }
      });
      trips = assignments.map(a => ({
        ...a.trip,
        assignmentNotes: a.notes,
        assignedAt: a.assignedAt
      }));
    }

    res.status(200).json({
      success: true,
      data: { trips }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve assigned trips' });
  }
});

// GET /api/v1/coordinator/trips/:tripId/participants - List participants of an assigned trip
router.get('/trips/:tripId/participants', async (req: Request, res: Response): Promise<void> => {
  try {
    const tripId = String(req.params.tripId);
    const userId = req.user!.userId;
    const isMasterOrAdmin = req.user!.role === Role.ADMIN || req.user!.role === Role.MASTER_ADMIN;

    if (!isMasterOrAdmin) {
      const assignment = await prisma.coordinatorTripAssignment.findUnique({
        where: {
          tripId_userId: { tripId, userId }
        }
      });

      if (!assignment) {
        res.status(403).json({
          success: false,
          error: 'Access denied. You are not assigned as a coordinator for this trip.'
        });
        return;
      }
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      select: { id: true, title: true, destination: true, startDate: true, capacity: true, confirmedCount: true, reservedCount: true }
    });

    if (!trip) {
      res.status(404).json({ success: false, error: 'Trip not found.' });
      return;
    }

    const bookings = await prisma.booking.findMany({
      where: { tripId },
      include: {
        participants: true,
        user: { select: { id: true, name: true, email: true, phone: true } },
        payments: { select: { status: true, amount: true, referenceNumber: true } }
      },
      orderBy: { createdAt: 'asc' }
    });

    res.status(200).json({
      success: true,
      data: {
        trip,
        bookings
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve trip participants' });
  }
});

export default router;
