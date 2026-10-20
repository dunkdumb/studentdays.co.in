import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createServer } from '../src/server';

const app = createServer();

describe('Reference HTML Endpoints Test Suite', () => {
  it('GET /api/v1/colleges should return authentic partner universities', async () => {
    const res = await request(app).get('/api/v1/colleges');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.colleges.length).toBeGreaterThanOrEqual(10);
    const names = res.body.data.colleges.map((c: any) => c.name);
    expect(names).toContain('Anurag University');
    expect(names).toContain('University of Hyderabad');
    expect(names).toContain('JNTUH');
  });

  it('GET /api/v1/media/documentaries should return authentic documentary episodes', async () => {
    const res = await request(app).get('/api/v1/media/documentaries');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.documentaries.length).toBe(2);
    expect(res.body.data.documentaries[0].youtubeId).toBe('4E648bz2aR4');
  });

  it('GET /api/v1/reviews/marquee should return authentic reviews', async () => {
    const res = await request(app).get('/api/v1/reviews/marquee');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.reviews.length).toBe(3);
    expect(res.body.data.reviews[0].authorName).toBe('Rahul Kumar');
  });

  it('POST /api/v1/custom-trips should reject capacity < 10', async () => {
    const res = await request(app)
      .post('/api/v1/custom-trips')
      .send({
        planner: 'Karthik Rao',
        contact: '+91 9640389230',
        college: 'Anurag University 3rd Year',
        cap: 6, // Under 10
        male: 4,
        female: 2,
        dest: 'Goa & Gokarna',
        travel: 'Train'
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('MIN_CAPACITY_REQUIRED');
  });

  it('POST /api/v1/custom-trips should accept valid group request and return WhatsApp URL', async () => {
    const res = await request(app)
      .post('/api/v1/custom-trips')
      .send({
        planner: 'Karthik Rao',
        contact: '+91 9640389230',
        college: 'Anurag University 3rd Year',
        cap: 25,
        male: 15,
        female: 10,
        dest: 'Kerala (Munnar & Alappuzha)',
        travel: 'Train'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.whatsappUrl).toContain('wa.me/919640389230');
    expect(res.body.data.whatsappUrl).toContain('Karthik');
  });

  it('POST /api/v1/app/early-access should register student on waitlist', async () => {
    const res = await request(app)
      .post('/api/v1/app/early-access')
      .send({
        nm: 'Sneha Reddy',
        age: 20,
        col: 'JNTUH',
        gen: 'Female',
        mob: '9876543210'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.whatsappUrl).toContain('Sneha');
  });

  it('POST /api/v1/partnerships/inquire should store collaboration inquiry', async () => {
    const res = await request(app)
      .post('/api/v1/partnerships/inquire')
      .send({
        name: 'VNR Rotaract Club',
        contact: 'rotaract@vnrvjiet.in',
        type: 'College Club / Council',
        about: 'Want to organize an exclusive college semester expedition for 80 students.'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
  });
});
