import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export async function connectDatabase(): Promise<void> {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGODB_URI);
    logger.info('✅ Successfully connected to MongoDB database');
  } catch (error) {
    logger.error('❌ Failed to connect to MongoDB:', error);
    // In dev mode, keep running even if database connection fails initially
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}
