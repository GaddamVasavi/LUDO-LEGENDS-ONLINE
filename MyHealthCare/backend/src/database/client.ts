import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient();

// In-memory data store for fallback execution when PostgreSQL is disconnected
export const memoryStore = {
  users: new Map<string, any>(),
  patients: new Map<string, any>(),
  doctors: new Map<string, any>(),
  specializations: new Map<string, any>(),
  appointments: new Map<string, any>(),
  medicalRecords: new Map<string, any>(),
  prescriptions: new Map<string, any>(),
  labOrders: new Map<string, any>(),
  invoices: new Map<string, any>(),
  insurancePolicies: new Map<string, any>(),
  notifications: new Map<string, any>(),
  auditLogs: new Map<string, any>(),
};

export async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info('✅ Connected to PostgreSQL database via Prisma ORM');
  } catch (error: any) {
    logger.warn('⚠️ PostgreSQL database not connected. Operating in high-performance in-memory mode.');
  }
}
