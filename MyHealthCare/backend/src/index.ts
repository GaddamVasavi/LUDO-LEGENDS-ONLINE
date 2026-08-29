import http from 'http';
import { createApp } from './app';
import { env } from './config/env';
import { connectDatabase } from './database/client';
import { logger } from './utils/logger';

async function bootstrap() {
  await connectDatabase();

  const app = createApp();
  const httpServer = http.createServer(app);

  httpServer.listen(parseInt(env.PORT, 10), () => {
    logger.info(`🏥 MyHealthCare API Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    logger.info(`📡 API Endpoint Prefix: ${env.API_PREFIX}`);
  });
}

bootstrap().catch((err) => {
  logger.error('Fatal Server Bootstrap Error:', err);
});
