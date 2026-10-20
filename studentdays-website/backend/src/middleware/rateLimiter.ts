import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const stores: { [key: string]: RateLimitStore } = {};

export const rateLimiter = (options: { windowMs: number; max: number; keyPrefix?: string }) => {
  const { windowMs, max, keyPrefix = 'global' } = options;
  if (!stores[keyPrefix]) stores[keyPrefix] = {};
  const store = stores[keyPrefix];

  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    if (!store[ip] || now > store[ip].resetTime) {
      store[ip] = {
        count: 1,
        resetTime: now + windowMs
      };
      return next();
    }

    store[ip].count++;

    if (store[ip].count > max) {
      const retryAfterSec = Math.ceil((store[ip].resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      res.status(429).json({
        success: false,
        error: `Too many requests. Please try again after ${retryAfterSec} seconds.`
      });
      return;
    }

    next();
  };
};
