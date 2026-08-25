import { createClient } from 'redis';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export const redisClient = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
  password: env.REDIS_PASSWORD || undefined,
});

redisClient.on('error', (err) => logger.warn('Redis Client Warning:', err.message));
redisClient.on('connect', () => logger.info('✅ Connected to Redis cache'));

export async function connectRedis(): Promise<void> {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.warn('⚠️ Redis connection failed. Falling back to in-memory caching.');
  }
}
