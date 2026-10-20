import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('[API Error]:', err);

  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
  const isDev = config.nodeEnv === 'development';

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(isDev && { stack: err.stack })
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: `Resource not found: ${req.method} ${req.originalUrl}`
  });
};
