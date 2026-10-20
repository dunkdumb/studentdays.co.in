import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /api/v1/colleges - Public list of partner colleges
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const colleges = await prisma.college.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        state: true,
        description: true,
        logoUrl: true,
        website: true,
        isPartner: true
      }
    });

    res.status(200).json({
      success: true,
      data: { colleges },
      meta: {
        note: 'Seeded college records are demo samples for testing.'
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch colleges' });
  }
});

export default router;
