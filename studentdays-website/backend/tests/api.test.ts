import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createServer } from '../src/server';
import { config } from '../src/config';
import { prisma } from '../src/prisma';

const app = createServer();

describe('StudentDays.co REST API Test Suite', () => {
  let studentToken = '';
  let studentUserId = '';
  let adminToken = '';
  let coordinatorToken = '';
  let testTripId = '';
  let createdBookingId = '';
  let paymentId = '';

  beforeAll(async () => {
    // Ensure test trip exists
    const trip = await prisma.trip.findFirst({
      where: { slug: 'kerala-gods-own-country' }
    });
    if (trip) {
      testTripId = trip.id;
    }
  });

  describe('1. Health & Public Endpoints', () => {
    it('GET /api/v1/health should return 200 healthy status', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.database).toBe('connected');
      expect(res.body.paymentMode).toBe('mock');
    });

    it('GET /api/v1/trips should list published trips', async () => {
      const res = await request(app).get('/api/v1/trips');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.trips)).toBe(true);
      expect(res.body.data.trips.length).toBeGreaterThan(0);
      const first = res.body.data.trips[0];
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('remainingSeats');
      expect(first).toHaveProperty('isBookable');
    });

    it('GET /api/v1/trips/:slug should return trip details and itinerary', async () => {
      const res = await request(app).get('/api/v1/trips/kerala-gods-own-country');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.trip.title).toContain('Kerala');
      expect(Array.isArray(res.body.data.trip.itinerary)).toBe(true);
      expect(res.body.data.trip.itinerary.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/colleges should return seeded college partners', async () => {
      const res = await request(app).get('/api/v1/colleges');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.colleges.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/gallery should return gallery images', async () => {
      const res = await request(app).get('/api/v1/gallery');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.images.length).toBeGreaterThan(0);
    });

    it('POST /api/v1/contact should validate and store message', async () => {
      const res = await request(app)
        .post('/api/v1/contact')
        .send({
          name: 'Priya Sharma',
          email: 'priya.sharma@test.edu',
          phone: '+91 9988776655',
          college: 'IIT Madras',
          subject: 'Question on Kerala Trip Itinerary',
          message: 'Hi, does the Kerala trip include transportation from Ernakulam station?'
        });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });
  });

  describe('2. Authentication & Authorization Security', () => {
    it('POST /api/v1/auth/login should authenticate student and issue JWT', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: config.seed.studentEmail,
          password: config.seed.studentPassword
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.user.role).toBe('STUDENT');
      studentToken = res.body.data.accessToken;
      studentUserId = res.body.data.user.id;
    });

    it('POST /api/v1/auth/login should authenticate admin and issue JWT', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: config.seed.adminEmail,
          password: config.seed.adminPassword
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.role).toBe('MASTER_ADMIN');
      adminToken = res.body.data.accessToken;
    });

    it('POST /api/v1/auth/login should authenticate coordinator', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: config.seed.coordinatorEmail,
          password: config.seed.coordinatorPassword
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.role).toBe('COORDINATOR');
      coordinatorToken = res.body.data.accessToken;
    });

    it('Security: Student CANNOT call admin dashboard route', async () => {
      const res = await request(app)
        .get('/api/v1/admin/dashboard')
        .set('Authorization', `Bearer ${studentToken}`);
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('Admin CAN access admin dashboard with live dynamic stats', async () => {
      const res = await request(app)
        .get('/api/v1/admin/dashboard')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.stats).toHaveProperty('totalStudents');
      expect(res.body.data.stats).toHaveProperty('totalTrips');
      expect(res.body.data.stats).toHaveProperty('totalRevenue');
    });
  });

  describe('3. Booking Lifecycle & Mock Payment Flow', () => {
    it('Student can create a booking with server-calculated price & reserved seats', async () => {
      const res = await request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          tripId: testTripId,
          quantity: 1,
          emergencyContactName: 'Mr. Ramesh',
          emergencyContactPhone: '+91 98765 11223',
          specialRequirements: 'Vegetarian meals',
          participants: [
            {
              fullName: 'Rohan Sharma',
              email: 'student@studentdays.co',
              phone: '+91 98765 00003',
              collegeName: 'IIT Madras',
              age: 21,
              gender: 'Male'
            }
          ]
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.booking.bookingReference).toMatch(/^SD-2026-/);
      expect(res.body.data.booking.status).toBe('PENDING_PAYMENT');
      createdBookingId = res.body.data.booking.id;
      paymentId = res.body.data.booking.payments[0].id;
    });

    it('Student can submit mock payment reference (UTR)', async () => {
      const res = await request(app)
        .post(`/api/v1/bookings/${createdBookingId}/payments`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          referenceNumber: `DEMO-UTR-TEST-${Date.now()}`,
          payerUpiId: 'student@okhdfcbank',
          notes: 'Test transaction simulated from GPay'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.booking.status).toBe('PAYMENT_SUBMITTED');
    });

    it('Security: Student CANNOT verify their own payment', async () => {
      const res = await request(app)
        .post(`/api/v1/admin/payments/${paymentId}/verify`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ decision: 'APPROVED' });

      // Student gets 403 Forbidden
      expect(res.status).toBe(403);
    });

    it('Admin can approve student mock payment and confirm booking', async () => {
      const res = await request(app)
        .post(`/api/v1/admin/payments/${paymentId}/verify`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          decision: 'APPROVED',
          adminNotes: 'Bank transaction confirmed against demo account'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('VERIFIED');
      expect(res.body.data.bookingStatus).toBe('CONFIRMED');
    });

    it('Student can view confirmed booking status under My Bookings', async () => {
      const res = await request(app)
        .get('/api/v1/me/bookings')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const confirmed = res.body.data.bookings.find((b: any) => b.id === createdBookingId);
      expect(confirmed).toBeDefined();
      expect(confirmed.status).toBe('CONFIRMED');
    });
  });

  describe('4. Coordinator Permissions & Trip Isolation', () => {
    it('Coordinator can view assigned trips', async () => {
      const res = await request(app)
        .get('/api/v1/coordinator/assigned-trips')
        .set('Authorization', `Bearer ${coordinatorToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.trips)).toBe(true);
    });

    it('Coordinator can view participants for assigned trip', async () => {
      const res = await request(app)
        .get(`/api/v1/coordinator/trips/${testTripId}/participants`)
        .set('Authorization', `Bearer ${coordinatorToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.trip.id).toBe(testTripId);
      expect(Array.isArray(res.body.data.bookings)).toBe(true);
    });

    it('Coordinator CANNOT access unassigned trip participants', async () => {
      // Find trip where coordinator is NOT assigned
      const unassignedTrip = await prisma.trip.findFirst({
        where: {
          slug: 'araku-vanajangi-clouds'
        }
      });

      if (unassignedTrip) {
        const res = await request(app)
          .get(`/api/v1/coordinator/trips/${unassignedTrip.id}/participants`)
          .set('Authorization', `Bearer ${coordinatorToken}`);

        expect(res.status).toBe(403);
        expect(res.body.success).toBe(false);
      }
    });
  });
});
