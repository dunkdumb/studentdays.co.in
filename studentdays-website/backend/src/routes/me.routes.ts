import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';

const router = Router();

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  collegeName: z.string().optional(),
  studentId: z.string().optional()
});

// GET /api/v1/me/profile
router.get('/profile', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        collegeName: true,
        studentId: true,
        avatarUrl: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    res.status(200).json({ success: true, data: { profile: user } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// PATCH /api/v1/me/profile
router.patch('/profile', authenticate, validateRequest(updateProfileSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, collegeName, studentId } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user!.userId },
      data: {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(collegeName !== undefined && { collegeName }),
        ...(studentId !== undefined && { studentId })
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        collegeName: true,
        studentId: true,
        avatarUrl: true,
        role: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { profile: updated }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// GET /api/v1/me/bookings - Student's own bookings
router.get('/bookings', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        trip: {
          select: {
            id: true,
            title: true,
            slug: true,
            destination: true,
            startDate: true,
            endDate: true,
            price: true,
            coverImage: true,
            status: true
          }
        },
        participants: true,
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            referenceNumber: true,
            submittedAt: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: { bookings }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve bookings' });
  }
});

// GET /api/v1/me/notifications
router.get('/notifications', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const unreadCount = await prisma.notification.count({
      where: { userId: req.user!.userId, isRead: false }
    });

    res.status(200).json({
      success: true,
      data: {
        notifications,
        unreadCount
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve notifications' });
  }
});

// PATCH /api/v1/me/notifications/:id/read
router.patch('/notifications/:id/read', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.notification.updateMany({
      where: { id, userId: req.user!.userId },
      data: { isRead: true }
    });

    res.status(200).json({ success: true, message: 'Notification marked as read' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update notification' });
  }
});

export default router;
