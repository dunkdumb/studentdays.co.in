import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://studentdays:studentdays_dev_password@localhost:5432/studentdays_dev?schema=public',
  
  jwtSecret: process.env.JWT_SECRET || 'studentdays_dev_jwt_secret_dev_only_2026',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'studentdays_dev_refresh_jwt_secret_dev_only_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  paymentMode: (process.env.PAYMENT_MODE || 'mock') as 'mock' | 'live',
  storageMode: (process.env.STORAGE_MODE || 'local') as 'local' | 'cloud',

  uploadDir: path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads'),
  maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB || '5', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  seed: {
    adminEmail: process.env.INITIAL_ADMIN_EMAIL || 'admin@studentdays.co',
    adminPassword: process.env.INITIAL_ADMIN_PASSWORD || 'AdminStudentDays2026!',
    adminName: process.env.INITIAL_ADMIN_NAME || 'Dev Master Admin',
    
    coordinatorEmail: process.env.INITIAL_COORDINATOR_EMAIL || 'coordinator@studentdays.co',
    coordinatorPassword: process.env.INITIAL_COORDINATOR_PASSWORD || 'CoordStudentDays2026!',
    coordinatorName: process.env.INITIAL_COORDINATOR_NAME || 'Ananya Verma',

    studentEmail: process.env.INITIAL_STUDENT_EMAIL || 'student@studentdays.co',
    studentPassword: process.env.INITIAL_STUDENT_PASSWORD || 'StudentDays2026!',
    studentName: process.env.INITIAL_STUDENT_NAME || 'Rohan Sharma'
  }
};
