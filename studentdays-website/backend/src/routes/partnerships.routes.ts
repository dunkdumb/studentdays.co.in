import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Role } from '@prisma/client';
import prisma from '../prisma';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

const partnershipSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  contact: z.string().min(8, 'Contact is required'),
  type: z.string().min(1, 'Partnership type is required'),
  others: z.string().optional(),
  page: z.string().optional(),
  ref: z.string().optional(),
  about: z.string().min(2, 'About information is required')
});

// POST /api/v1/partnerships/inquire
router.post('/inquire', async (req: Request, res: Response) => {
  try {
    const parsed = partnershipSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input fields',
          details: parsed.error.format()
        }
      });
    }

    const { name, contact, type, others, page, ref, about } = parsed.data;

    const inquiry = await prisma.partnershipInquiry.create({
      data: {
        name,
        contact,
        partnershipType: type,
        otherDetails: others || null,
        pageContext: page || null,
        reference: ref || null,
        about
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Partnership inquiry recorded successfully',
      data: { id: inquiry.id }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Failed to submit partnership inquiry'
      }
    });
  }
});

// GET /api/v1/partnerships (Admin only)
router.get('/', authenticate, requireRole(Role.ADMIN, Role.MASTER_ADMIN), async (_req: Request, res: Response) => {
  try {
    const inquiries = await prisma.partnershipInquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, data: { inquiries } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
