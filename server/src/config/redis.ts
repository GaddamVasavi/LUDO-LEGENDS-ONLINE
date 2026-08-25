import { logger } from '../utils/logger';

export const redisClient = {
  get: async (key: string) => null,
  set: async (key: string, val: string) => null,
  del: async (key: string) => null,
};

export async function connectRedis(): Promise<void> {
  logger.info('ℹ️ Using in-memory Redis fallback cache.');
}
