import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
  roomCode: string;
  mode: 'CLASSIC' | 'QUICK' | 'POWERUP' | 'TOURNAMENT' | 'PRACTICE';
  status: 'WAITING' | 'STARTING' | 'IN_PROGRESS' | 'FINISHED' | 'ABANDONED';
  players: any[];
  winners: string[];
  durationSeconds: number;
  moveCount: number;
  startedAt?: Date;
  endedAt?: Date;
}

const GameSchema = new Schema<IGame>(
  {
    roomCode: { type: String, required: true, index: true },
    mode: { type: String, enum: ['CLASSIC', 'QUICK', 'POWERUP', 'TOURNAMENT', 'PRACTICE'], required: true },
    status: { type: String, enum: ['WAITING', 'STARTING', 'IN_PROGRESS', 'FINISHED', 'ABANDONED'], default: 'WAITING' },
    players: [{ type: Schema.Types.Mixed }],
    winners: [{ type: String }],
    durationSeconds: { type: Number, default: 0 },
    moveCount: { type: Number, default: 0 },
    startedAt: { type: Date },
    endedAt: { type: Date },
  },
  { timestamps: true }
);

export const Game = mongoose.model<IGame>('Game', GameSchema);
