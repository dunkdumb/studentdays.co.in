import { Router, Request, Response } from 'express';
import { authenticate, requireRole } from '../middleware/auth';
import { uploadMiddleware, storageService } from '../services/storageService';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);
router.use(requireRole(Role.ADMIN, Role.MASTER_ADMIN, Role.COORDINATOR));

// POST /api/v1/uploads
router.post('/', uploadMiddleware.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No file uploaded or file was rejected by filter.' });
      return;
    }

    const folder = req.body.folder || 'trips';
    const relativeUrl = await storageService.saveFile(req.file, folder);

    res.status(201).json({
      success: true,
      message: 'File successfully uploaded.',
      data: {
        url: relativeUrl,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'File upload failed' });
  }
});

export default router;
