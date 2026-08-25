import { Server, Socket } from 'socket.io';
import { registerGameHandlers } from './gameHandlers.js';
import { registerChatHandlers } from './chatHandlers.js';
import { logger } from '../utils/logger.js';

export function setupSocketServer(io: Server): void {
  io.on('connection', (socket: Socket) => {
    logger.info(`🔌 Socket Client Connected: ${socket.id}`);

    registerGameHandlers(io, socket);
    registerChatHandlers(io, socket);

    socket.on('disconnect', () => {
      logger.info(`🔌 Socket Client Disconnected: ${socket.id}`);
    });
  });
}
