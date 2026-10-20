import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { config } from '../config';
import { AuthUserPayload } from '../types';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateAccessToken = (payload: AuthUserPayload): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn as any });
};

export const generateRefreshToken = (payload: AuthUserPayload): string => {
  return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpiresIn as any });
};

export const verifyAccessToken = (token: string): AuthUserPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as AuthUserPayload;
  } catch (err) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): AuthUserPayload | null => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret) as AuthUserPayload;
  } catch (err) {
    return null;
  }
};

export const setAuthCookies = (res: Response, accessToken: string, refreshToken?: string) => {
  const isProduction = config.nodeEnv === 'production';

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  if (refreshToken) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
};
