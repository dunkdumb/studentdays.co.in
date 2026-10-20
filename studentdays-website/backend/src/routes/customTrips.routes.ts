import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Role } from '@prisma/client';
import prisma from '../prisma';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

const customTripSchema = z.object({
  planner: z.string().min(2, 'Planner name is required'),
  contact: z.string().min(8, 'Valid contact number is required'),
  college: z.string().min(2, 'College name and year are required'),
  cap: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  male: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  female: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  dest: z.string().min(2, 'Destination is required'),
  travel: z.string().min(1, 'Preferred travel mode is required')
});

// POST /api/v1/custom-trips
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = customTripSchema.safeParse(req.body);
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

    const { planner, contact, college, cap, male, female, dest, travel } = parsed.data;

    if (cap < 10) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MIN_CAPACITY_REQUIRED',
          message: 'Minimum group size for custom trips is 10 students'
        }
      });
    }

    const request = await prisma.customTripRequest.create({
      data: {
        plannerName: planner,
        contactPhone: String(contact),
        collegeYear: college,
        groupCapacity: cap,
        maleCount: male || 0,
        femaleCount: female || 0,
        destinations: dest,
        preferredTravel: travel,
        ipAddress: req.ip
      }
    });

    const msg = `Create Trip request (College/Group)\n\nTrip planner: ${planner}\nContact: ${contact}\nCollege & year: ${college}\nGroup capacity: ${cap}\nMales: ${male}\nFemales: ${female}\nDestinations: ${dest}\nPreferred travel: ${travel}`;
    const whatsappUrl = `https://wa.me/919640389230?text=${encodeURIComponent(msg)}`;

    return res.status(201).json({
      success: true,
      message: 'Custom trip request created successfully',
      data: {
        id: request.id,
        whatsappUrl
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Failed to submit custom trip request'
      }
    });
  }
});

// GET /api/v1/custom-trips (Admin only)
router.get('/', authenticate, requireRole(Role.ADMIN, Role.MASTER_ADMIN), async (_req: Request, res: Response) => {
  try {
    const requests = await prisma.customTripRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, data: { requests } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
