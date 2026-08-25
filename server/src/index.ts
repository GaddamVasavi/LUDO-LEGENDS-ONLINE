import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { setupSocketServer } from './socket/socketManager';
import { logger } from './utils/logger';

async function startServer() {
  await connectDatabase();
  await connectRedis();

  const app = createApp();
  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  setupSocketServer(io);

  httpServer.listen(env.PORT, () => {
    logger.info(`🚀 LUDO LEGENDS ONLINE Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    logger.info(`📡 API Prefix: ${env.API_PREFIX}`);
  });
}

startServer().catch((err) => {
  logger.error('Fatal Server Startup Error:', err);
});
