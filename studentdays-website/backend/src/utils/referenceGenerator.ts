import crypto from 'crypto';

export const generateBookingReference = (prefix = 'SD-2026'): string => {
  const randomChars = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${randomChars}`;
};

export const generatePaymentReference = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `PAY-${timestamp}-${random}`;
};
