import { Request, Response, NextFunction } from 'express';
import { Role, UserStatus } from '@prisma/client';
import { verifyAccessToken } from '../utils/tokens';
import { prisma } from '../prisma';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // Check Authorization header first
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.access_token) {
      // Fallback to cookie
      token = req.cookies.access_token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Authentication required. Please log in.'
      });
      return;
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired session token. Please log in again.'
      });
      return;
    }

    // Verify user exists and is active in DB
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, status: true }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'User account not found.'
      });
      return;
    }

    if (user.status !== UserStatus.ACTIVE) {
      res.status(403).json({
        success: false,
        error: 'Account is currently suspended or inactive.'
      });
      return;
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Authentication failed.'
    });
  }
};

export const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.access_token) {
      token = req.cookies.access_token;
    }

    if (token) {
      const payload = verifyAccessToken(token);
      if (payload) {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: { id: true, email: true, role: true, status: true }
        });
        if (user && user.status === UserStatus.ACTIVE) {
          req.user = {
            userId: user.id,
            email: user.email,
            role: user.role,
            status: user.status
          };
        }
      }
    }
    next();
  } catch (error) {
    next();
  }
};

export const requireRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required.'
      });
      return;
    }

    // MASTER_ADMIN has access to all ADMIN routes
    const userRole = req.user.role;
    const hasRole = allowedRoles.includes(userRole) || (userRole === Role.MASTER_ADMIN && allowedRoles.includes(Role.ADMIN));

    if (!hasRole) {
      res.status(403).json({
        success: false,
        error: 'Access denied. You do not have permission to perform this action.'
      });
      return;
    }

    next();
  };
};
