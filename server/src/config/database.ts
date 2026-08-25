import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

export async function connectDatabase(): Promise<void> {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    logger.info('✅ Successfully connected to MongoDB database');
  } catch (error) {
    logger.warn('⚠️ MongoDB not detected. Operating with in-memory database fallback.');
  }
}
