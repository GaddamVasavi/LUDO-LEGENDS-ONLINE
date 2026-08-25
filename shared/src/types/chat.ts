import { PlayerColor } from './game.js';

export type ChatMessageType = 'TEXT' | 'EMOTE' | 'SYSTEM' | 'GAME_EVENT';

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderColor?: PlayerColor;
  senderAvatar?: string;
  type: ChatMessageType;
  content: string;
  emoteId?: string;
  timestamp: number;
}
