import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// GET /api/v1/media/documentaries
router.get('/documentaries', async (_req: Request, res: Response) => {
  try {
    const documentaries = await prisma.documentaryMedia.findMany({
      orderBy: { displayOrder: 'asc' }
    });

    if (documentaries.length > 0) {
      return res.json({ success: true, data: { documentaries } });
    }

    // Default authentic episodes from reference HTML
    const defaultDocs = [
      {
        id: 'doc-1',
        youtubeId: '4E648bz2aR4',
        tabLabel: '1. Arunachalam & Pondicherry',
        subtitle: 'Between Soul & Shore — Arunachalam & Pondicherry',
        title: 'Between Soul & Shore',
        displayOrder: 1
      },
      {
        id: 'doc-2',
        youtubeId: 'lN502PsnETI',
        tabLabel: '2. Vizag & Araku',
        subtitle: 'Beach, Chills & Hills — Vizag & Araku',
        title: 'Beach: Chills & Hills',
        displayOrder: 2
      }
    ];

    return res.json({ success: true, data: { documentaries: defaultDocs } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
