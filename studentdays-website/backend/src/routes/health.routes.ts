import { Router } from 'express';
import { prisma } from '../prisma';
import { config } from '../config';

const router = Router();

router.get('/', async (req, res) => {
  try {
    // Check DB connectivity
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'studentdays-backend',
      version: '1.0.0',
      database: 'connected',
      paymentMode: config.paymentMode,
      storageMode: config.storageMode
    });
  } catch (error: any) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

export default router;
