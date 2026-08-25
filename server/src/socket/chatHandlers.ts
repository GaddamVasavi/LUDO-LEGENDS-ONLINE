import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS, ChatMessage } from '@ludo/shared';

export function registerChatHandlers(io: Server, socket: Socket) {
  socket.on(SOCKET_EVENTS.SEND_CHAT, ({ roomId, text }) => {
    const message: ChatMessage = {
      id: `msg_${Date.now()}`,
      roomId,
      senderId: (socket as any).userId || socket.id,
      senderName: (socket as any).username || 'Player',
      type: 'TEXT',
      content: text,
      timestamp: Date.now(),
    };

    io.to(roomId).emit(SOCKET_EVENTS.CHAT_MESSAGE, message);
  });

  socket.on(SOCKET_EVENTS.SEND_EMOTE, ({ roomId, emoteId }) => {
    io.to(roomId).emit(SOCKET_EVENTS.EMOTE_BROADCAST, {
      senderColor: (socket as any).playerColor || 'RED',
      emoteId,
    });
  });
}
