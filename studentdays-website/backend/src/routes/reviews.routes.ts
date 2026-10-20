import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// GET /api/v1/reviews/marquee
router.get('/marquee', async (_req: Request, res: Response) => {
  try {
    const dbReviews = await prisma.review.findMany({
      where: { isFeatured: true },
      orderBy: { displayOrder: 'asc' }
    });

    if (dbReviews.length > 0) {
      return res.json({ success: true, data: { reviews: dbReviews } });
    }

    // Default authentic reviews from reference HTML
    const defaultReviews = [
      {
        id: 'rev-1',
        authorName: 'Rahul Kumar',
        college: 'Anurag University',
        initials: 'RK',
        rating: 5,
        content: 'Best trip of my college life.'
      },
      {
        id: 'rev-2',
        authorName: 'Priya Sharma',
        college: 'GNU',
        initials: 'PS',
        rating: 5,
        content: 'The documentary film made me relive everything.'
      },
      {
        id: 'rev-3',
        authorName: 'N Varadarajulu',
        college: 'Rao Institute',
        initials: 'NV',
        rating: 5,
        content: 'Never thought student travel could feel this good.'
      }
    ];

    return res.json({ success: true, data: { reviews: defaultReviews } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
