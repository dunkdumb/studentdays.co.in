import { prisma } from '../prisma';

export const logAudit = async (params: {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: any;
  ipAddress?: string;
}) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        metadata: params.metadata ? JSON.stringify(params.metadata) : undefined,
        ipAddress: params.ipAddress
      }
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
};

export const createNotification = async (params: {
  userId: string;
  title: string;
  message: string;
  type?: string;
  link?: string;
}) => {
  try {
    return await prisma.notification.create({
      data: {
        userId: params.userId,
        title: params.title,
        message: params.message,
        type: params.type || 'GENERAL',
        link: params.link
      }
    });
  } catch (err) {
    console.error('Failed to create notification:', err);
    return null;
  }
};
