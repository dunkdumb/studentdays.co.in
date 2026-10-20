import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createServer } from '../src/server';
import { prisma } from '../src/prisma';
import { config } from '../src/config';

const app = createServer();

describe('Requirement 16: Complete End-to-End Workflow & Acceptance Scenario', () => {
  const testStudentEmail = `e2e_student_${Date.now()}@test.edu`;
  const testPassword = 'TestPassword123!';
  let studentToken = '';
  let studentUserId = '';
  let adminToken = '';
  let tripId = '';
  let bookingId = '';
  let paymentId = '';
  let initialCapacity = 0;
  let initialReserved = 0;
  let initialConfirmed = 0;

  it('1. Register demo student account via API', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Aarav Patel',
        email: testStudentEmail,
        password: testPassword,
        phone: '+91 91234 56789',
        collegeName: 'BITS Pilani',
        studentId: '2023A7PS001P'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testStudentEmail);
    expect(res.body.data.user.role).toBe('STUDENT');
  });

  it('2. Login as newly registered student', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: testPassword
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    studentToken = res.body.data.accessToken;
    studentUserId = res.body.data.user.id;
  });

  it('3. Explore trips and retrieve Gokarna departure details', async () => {
    const res = await request(app).get('/api/v1/trips/gokarna-dandeli-expedition');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const trip = res.body.data.trip;
    tripId = trip.id;
    initialCapacity = trip.capacity;
    initialReserved = trip.reservedCount;
    initialConfirmed = trip.confirmedCount;
    expect(trip.remainingSeats).toBeGreaterThan(2);
  });

  it('4. Student books 2 seats on the trip -> Verifies DB persistence & reserved capacity', async () => {
    const res = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        tripId,
        quantity: 2,
        emergencyContactName: 'Sanjay Patel',
        emergencyContactPhone: '+91 98888 77777',
        specialRequirements: 'One vegetarian, one non-vegetarian',
        participants: [
          {
            fullName: 'Aarav Patel',
            email: testStudentEmail,
            phone: '+91 91234 56789',
            collegeName: 'BITS Pilani',
            age: 21,
            gender: 'Male'
          },
          {
            fullName: 'Varun Joshi',
            email: 'varun.joshi@bits.edu',
            phone: '+91 91234 56780',
            collegeName: 'BITS Pilani',
            age: 21,
            gender: 'Male'
          }
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    const b = res.body.data.booking;
    bookingId = b.id;
    paymentId = b.payments[0].id;
    expect(b.status).toBe('PENDING_PAYMENT');
    expect(b.quantity).toBe(2);

    // Verify DB Trip reserved count incremented
    const updatedTrip = await prisma.trip.findUnique({ where: { id: tripId } });
    expect(updatedTrip?.reservedCount).toBe(initialReserved + 2);
  });

  it('5. Student submits mock payment reference (UTR)', async () => {
    const refNum = `DEMO-UTR-E2E-${Date.now()}`;
    const res = await request(app)
      .post(`/api/v1/bookings/${bookingId}/payments`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        referenceNumber: refNum,
        payerUpiId: 'aarav@okhdfcbank',
        notes: 'Simulated payment from Google Pay'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.booking.status).toBe('PAYMENT_SUBMITTED');

    // Verify payment in DB
    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    expect(payment?.status).toBe('SUBMITTED');
    expect(payment?.referenceNumber).toBe(refNum);
  });

  it('6. Security: Student CANNOT self-verify or approve payment', async () => {
    const res = await request(app)
      .post(`/api/v1/admin/payments/${paymentId}/verify`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ decision: 'APPROVED' });

    expect(res.status).toBe(403);
  });

  it('7. Admin logs in and approves mock payment', async () => {
    // Admin login
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: config.seed.adminEmail,
        password: config.seed.adminPassword
      });
    expect(loginRes.status).toBe(200);
    adminToken = loginRes.body.data.accessToken;

    // Approve payment
    const res = await request(app)
      .post(`/api/v1/admin/payments/${paymentId}/verify`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        decision: 'APPROVED',
        adminNotes: 'Demo verification test approved'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('VERIFIED');
    expect(res.body.data.bookingStatus).toBe('CONFIRMED');

    // Verify trip capacity updated in DB: confirmed incremented, reserved decremented
    const updatedTrip = await prisma.trip.findUnique({ where: { id: tripId } });
    expect(updatedTrip?.confirmedCount).toBe(initialConfirmed + 2);
    expect(updatedTrip?.reservedCount).toBe(initialReserved);
  });

  it('8. Student checks booking status -> Confirms CONFIRMED status', async () => {
    const res = await request(app)
      .get(`/api/v1/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.booking.status).toBe('CONFIRMED');
    expect(res.body.data.booking.payments[0].status).toBe('VERIFIED');
  });

  it('9. Rejection Scenario: Admin rejects invalid reference & capacity is released', async () => {
    // Create separate test booking to test rejection
    const bookRes = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        tripId,
        quantity: 1,
        emergencyContactName: 'Emergency Person',
        emergencyContactPhone: '+91 99999 88888',
        participants: [
          {
            fullName: 'Aarav Patel',
            email: testStudentEmail,
            phone: '+91 91234 56789'
          }
        ]
      });

    const rejectBookingId = bookRes.body.data.booking.id;
    const rejectPaymentId = bookRes.body.data.booking.payments[0].id;

    // Submit payment
    await request(app)
      .post(`/api/v1/bookings/${rejectBookingId}/payments`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        referenceNumber: `DEMO-INVALID-${Date.now()}`,
        payerUpiId: 'test@upi'
      });

    // Admin rejects payment
    const rejectRes = await request(app)
      .post(`/api/v1/admin/payments/${rejectPaymentId}/verify`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        decision: 'REJECTED',
        adminNotes: 'Transaction ID not found in bank statement'
      });

    expect(rejectRes.status).toBe(200);
    expect(rejectRes.body.data.status).toBe('REJECTED');
    expect(rejectRes.body.data.bookingStatus).toBe('REJECTED');

    // Verify reserved seat released
    const tripAfterReject = await prisma.trip.findUnique({ where: { id: tripId } });
    expect(tripAfterReject?.reservedCount).toBe(initialReserved);
  });
});
