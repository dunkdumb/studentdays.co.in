import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma';
import { validateRequest } from '../middleware/validation';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email is required').toLowerCase().trim(),
  phone: z.string().optional(),
  college: z.string().optional(),
  subject: z.string().min(3, 'Subject is required').max(150),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000)
});

// POST /api/v1/contact - Public contact submission
router.post('/', rateLimiter({ windowMs: 15 * 60 * 1000, max: 10, keyPrefix: 'contact_submit' }), validateRequest(contactSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, college, subject, message } = req.body;

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        college,
        subject,
        message,
        status: 'NEW'
      }
    });

    console.log(`[Contact Submission] Received message from ${name} (${email}): ${subject}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received by the StudentDays team. We will get back to you soon.',
      data: {
        id: submission.id,
        status: 'received'
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to submit contact message' });
  }
});

export default router;
