import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /api/v1/gallery - Public gallery photos
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        imageUrl: true,
        caption: true,
        tripLocation: true,
        displayOrder: true
      }
    });

    res.status(200).json({
      success: true,
      data: { images }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch gallery images' });
  }
});

export default router;
