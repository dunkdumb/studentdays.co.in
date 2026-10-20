import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Role } from '@prisma/client';
import prisma from '../prisma';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

const earlyAccessSchema = z.object({
  nm: z.string().min(2, 'Name is required'),
  age: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  col: z.string().min(2, 'College name is required'),
  gen: z.string().min(1, 'Gender is required'),
  mob: z.string().min(8, 'Valid mobile number is required')
});

// POST /api/v1/app/early-access
router.post('/early-access', async (req: Request, res: Response) => {
  try {
    const parsed = earlyAccessSchema.safeParse(req.body);
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

    const { nm, age, col, gen, mob } = parsed.data;

    if (age < 14 || age > 60) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_AGE',
          message: 'Age must be between 14 and 60'
        }
      });
    }

    // Upsert or create entry
    const entry = await prisma.earlyAccessWaitlist.create({
      data: {
        name: nm,
        age,
        collegeName: col,
        gender: gen,
        mobilePhone: String(mob)
      }
    });

    const msg = `App early access request\n\nName: ${nm}\nAge: ${age}\nCollege: ${col}\nGender: ${gen}\nMobile: ${mob}`;
    const whatsappUrl = `https://wa.me/919640389230?text=${encodeURIComponent(msg)}`;

    return res.status(201).json({
      success: true,
      message: "You're on the early access list!",
      data: {
        id: entry.id,
        whatsappUrl
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Failed to register for early access'
      }
    });
  }
});

// GET /api/v1/app/early-access (Admin only)
router.get('/early-access', authenticate, requireRole(Role.ADMIN, Role.MASTER_ADMIN), async (_req: Request, res: Response) => {
  try {
    const waitlist = await prisma.earlyAccessWaitlist.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, data: { waitlist } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
