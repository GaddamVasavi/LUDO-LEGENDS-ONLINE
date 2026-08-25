import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  code: string;
  name: string;
  hostId: string;
  mode: string;
  isPrivate: boolean;
  password?: string;
  maxPlayers: number;
  currentPlayers: number;
  status: 'OPEN' | 'FULL' | 'IN_GAME';
}

const RoomSchema = new Schema<IRoom>(
  {
    code: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    hostId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mode: { type: String, default: 'CLASSIC' },
    isPrivate: { type: Boolean, default: false },
    password: { type: String },
    maxPlayers: { type: Number, default: 4 },
    currentPlayers: { type: Number, default: 1 },
    status: { type: String, enum: ['OPEN', 'FULL', 'IN_GAME'], default: 'OPEN' },
  },
  { timestamps: true }
);

export const Room = mongoose.model<IRoom>('Room', RoomSchema);
