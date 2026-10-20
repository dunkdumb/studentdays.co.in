import { Router, Request, Response } from 'express';
import { z } from 'zod';
import crypto from 'crypto';
import { prisma } from '../prisma';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken, setAuthCookies, clearAuthCookies } from '../utils/tokens';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { rateLimiter } from '../middleware/rateLimiter';
import { Role, UserStatus } from '@prisma/client';
import { logAudit } from '../services/auditService';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid college or personal email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  collegeName: z.string().optional(),
  studentId: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required')
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim()
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// POST /api/v1/auth/register
router.post('/register', rateLimiter({ windowMs: 15 * 60 * 1000, max: 10, keyPrefix: 'auth_register' }), validateRequest(registerSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone, collegeName, studentId } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: 'An account with this email address already exists. Please log in.'
      });
      return;
    }

    const passwordHash = await hashPassword(password);

    // Self-registration is strictly STUDENT role
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phone,
        collegeName,
        studentId,
        role: Role.STUDENT,
        status: UserStatus.ACTIVE
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        collegeName: true,
        createdAt: true
      }
    });

    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Save refresh token
    await prisma.user.update({
      where: { id: newUser.id },
      data: { refreshToken }
    });

    setAuthCookies(res, accessToken, refreshToken);

    await logAudit({
      userId: newUser.id,
      action: 'USER_REGISTERED',
      entityType: 'User',
      entityId: newUser.id,
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Account successfully registered.',
      data: {
        user: newUser,
        accessToken
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Registration failed' });
  }
});

// POST /api/v1/auth/login
router.post('/login', rateLimiter({ windowMs: 15 * 60 * 1000, max: 20, keyPrefix: 'auth_login' }), validateRequest(loginSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true,
        role: true,
        status: true,
        collegeName: true,
        phone: true,
        studentId: true,
        avatarUrl: true
      }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password credentials.'
      });
      return;
    }

    if (user.status !== UserStatus.ACTIVE) {
      res.status(403).json({
        success: false,
        error: 'Your account is currently suspended or pending verification.'
      });
      return;
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password credentials.'
      });
      return;
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    setAuthCookies(res, accessToken, refreshToken);

    await logAudit({
      userId: user.id,
      action: 'USER_LOGIN',
      entityType: 'User',
      entityId: user.id,
      ipAddress: req.ip
    });

    const { passwordHash: _, ...safeUser } = user;

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        user: safeUser,
        accessToken
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Login failed' });
  }
});

// POST /api/v1/auth/logout
router.post('/logout', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.user) {
      await prisma.user.update({
        where: { id: req.user.userId },
        data: { refreshToken: null }
      });
    }

    clearAuthCookies(res);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  } catch (error: any) {
    clearAuthCookies(res);
    res.status(200).json({ success: true, message: 'Logged out.' });
  }
});

// POST /api/v1/auth/refresh
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refresh_token || req.body.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ success: false, error: 'Refresh token required' });
      return;
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      res.status(401).json({ success: false, error: 'Invalid or expired refresh token' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, status: true, refreshToken: true }
    });

    if (!user || user.refreshToken !== refreshToken || user.status !== UserStatus.ACTIVE) {
      res.status(401).json({ success: false, error: 'Token revoked or user inactive' });
      return;
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    setAuthCookies(res, newAccessToken);

    res.status(200).json({
      success: true,
      data: { accessToken: newAccessToken }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Could not refresh token' });
  }
});

// POST /api/v1/auth/forgot-password
router.post('/forgot-password', rateLimiter({ windowMs: 15 * 60 * 1000, max: 5, keyPrefix: 'auth_forgot' }), validateRequest(forgotPasswordSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return safe success message to prevent user enumeration
    if (!user) {
      res.status(200).json({
        success: true,
        message: 'If an account exists with this email, password reset instructions have been generated.'
      });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires
      }
    });

    // In local dev mode, return the token for testing convenience
    console.log(`[Dev Password Reset] Token for ${email}: ${resetToken}`);

    res.status(200).json({
      success: true,
      message: 'Password reset instructions have been sent.',
      data: {
        demoResetToken: resetToken,
        notice: 'In local development, the reset token is returned here and logged to the server console.'
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Password reset request failed' });
  }
});

// POST /api/v1/auth/reset-password
router.post('/reset-password', validateRequest(resetPasswordSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() }
      }
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: 'Invalid or expired password reset token.'
      });
      return;
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    await logAudit({
      userId: user.id,
      action: 'PASSWORD_RESET_COMPLETED',
      entityType: 'User',
      entityId: user.id,
      ipAddress: req.ip
    });

    res.status(200).json({
      success: true,
      message: 'Password has been successfully reset. Please log in with your new password.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Password reset failed' });
  }
});

// GET /api/v1/auth/me
router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        phone: true,
        collegeName: true,
        studentId: true,
        avatarUrl: true,
        createdAt: true
      }
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve profile' });
  }
});

export default router;
