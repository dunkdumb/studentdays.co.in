import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { config } from './config';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import tripsRoutes from './routes/trips.routes';
import bookingsRoutes from './routes/bookings.routes';
import meRoutes from './routes/me.routes';
import coordinatorRoutes from './routes/coordinator.routes';
import adminRoutes from './routes/admin.routes';
import collegesRoutes from './routes/colleges.routes';
import galleryRoutes from './routes/gallery.routes';
import contactRoutes from './routes/contact.routes';
import uploadRoutes from './routes/upload.routes';
import customTripsRoutes from './routes/customTrips.routes';
import earlyAccessRoutes from './routes/earlyAccess.routes';
import partnershipsRoutes from './routes/partnerships.routes';
import mediaRoutes from './routes/media.routes';
import reviewsRoutes from './routes/reviews.routes';

export const createServer = () => {
  const app = express();

  // Security & Parser Middlewares
  app.use(cors({
    origin: [config.frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Serve static uploaded files locally
  app.use('/uploads', express.static(config.uploadDir));

  // Mount API Routes
  const prefix = config.apiPrefix;
  app.use(`${prefix}/health`, healthRoutes);
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/trips`, tripsRoutes);
  app.use(`${prefix}/bookings`, bookingsRoutes);
  app.use(`${prefix}/me`, meRoutes);
  app.use(`${prefix}/coordinator`, coordinatorRoutes);
  app.use(`${prefix}/admin`, adminRoutes);
  app.use(`${prefix}/colleges`, collegesRoutes);
  app.use(`${prefix}/gallery`, galleryRoutes);
  app.use(`${prefix}/contact`, contactRoutes);
  app.use(`${prefix}/uploads`, uploadRoutes);
  app.use(`${prefix}/custom-trips`, customTripsRoutes);
  app.use(`${prefix}/app`, earlyAccessRoutes);
  app.use(`${prefix}/partnerships`, partnershipsRoutes);
  app.use(`${prefix}/media`, mediaRoutes);
  app.use(`${prefix}/reviews`, reviewsRoutes);


  // 404 and Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
