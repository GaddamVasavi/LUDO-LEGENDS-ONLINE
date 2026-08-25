import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  roomId: string;
  senderId: string;
  senderName: string;
  senderColor?: string;
  type: 'TEXT' | 'EMOTE' | 'SYSTEM';
  content: string;
  emoteId?: string;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    roomId: { type: String, required: true, index: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderColor: { type: String },
    type: { type: String, enum: ['TEXT', 'EMOTE', 'SYSTEM'], default: 'TEXT' },
    content: { type: String, required: true },
    emoteId: { type: String },
  },
  { timestamps: true }
);

export const ChatMessageModel = mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
